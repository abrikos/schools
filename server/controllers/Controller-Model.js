import Mongoose from "server/db/Mongoose";

const passportLib = require('server/lib/passport');
//const passport = require('passport');

module.exports.controller = function (app) {


    function getSchema(name) {
        const schema = Mongoose[name].schema;
        const ret = {
            formOptions: schema.formOptions,
            fields: Object.keys(schema.paths)
                .filter(key => schema.paths[key].options.label)
                .map(key => {
                    const p = schema.paths[key];
                    //const ref = p.options.ref || p.options.type;
                    return {
                        name: p.path,
                        type: p.instance,
                        options: p.options
                    }
                })

        }
        if (schema.formOptions) {
            ret.fields = ret.fields.concat(schema.formOptions.virtualFields ? schema.formOptions.virtualFields.map(f => {
                const ret = {
                    name: f,
                    type: 'virtual',
                    options: schema.virtuals[f].options
                }
                return ret;
            }) : [])
                .concat(schema.formOptions.hasMany ? schema.formOptions.hasMany.map(f => {
                    const ret = {
                        name: f,
                        type: 'hasMany',
                        options: schema.paths[f].options.type[0]
                    }
                    return ret;
                }) : [])
        }
        return ret;
    }

    app.post('/api/:model/schema', (req, res) => {
        res.send(getSchema(req.params.model))

    });

    app.post('/api/:model/:id/view', (req, res) => {
        Mongoose[req.params.model].findById(req.params.id)
            .populate(Mongoose[req.params.model].population)
            .then(item => {
                item.editable = req.session.admin;
                res.send(item)
            })
            .catch(e => res.send(app.locals.sendError({error: 500, message: e.message})))
    });

    function bodyToWhere(body) {
        if (!body.where) body.where = {};
        for (const f in body.where) {
            if (!body.where[f]) delete body.where[f];
        }
        if (body.regexp) {
            body.where.$or = body.regexp.map(reg => {
                const ret = {}
                for (const k of Object.keys(reg)) {
                    ret[k] = new RegExp(reg[k], 'i')
                }
                return ret;
            })
            delete body.regexp;
        }
        return body.where;
    }

    app.post('/api/:model/list', (req, res) => {
        const filter = bodyToWhere(req.body);
        Mongoose[req.params.model].find(filter)
            .sort(req.body.sort || req.body.order || {createdAt: -1})
            .limit(parseInt(req.body.limit))
            .skip(parseInt(req.body.skip))
            .populate(Mongoose[req.params.model].population)
            .then(list => {
                Mongoose[req.params.model].countDocuments(filter)
                    .then(count => {
                        res.send({count, list})
                    })
            })
            .catch(e => res.send(app.locals.sendError({error: 500, message: e.message})))
    });


    app.post('/api/admin/:model/:id/update', passportLib.isAdmin, (req, res) => {
        Mongoose[req.params.model].findById(req.params.id)
            .populate(Mongoose[req.params.model].population)
            .then(async r => {
                const schema = getSchema(req.params.model);
                for (const f of Object.keys(req.body)) {
                    const field = schema.fields.find(fld => fld.name === f);
                    if (!field) {
                        r[f] = req.body[f]
                        continue;
                    }
                    if (field.type === 'virtual') {
                        const schemaRel = getSchema(field.options.ref.toLowerCase());
                        const fieldRel = schemaRel.fields.find(fld => fld.name === field.options.foreignField);
                        const fieldToUpdate = fieldRel.name;
                        for (const id of r[f].map(r => r.id).filter(r => !req.body[f].includes(r))) {
                            //DELETE
                            const model = await Mongoose[field.options.ref.toLowerCase()].findById(id)
                            model[fieldToUpdate] = model[fieldToUpdate].filter(r => !r.equals(req.params.id))
                            await model.save()
                        }
                        for (const id of req.body[f]) {
                            const model = await Mongoose[field.options.ref.toLowerCase()].findById(id)
                            if (model[fieldToUpdate].id) {
                                model[fieldToUpdate] = req.params.id;
                                await model.save()
                            } else if (!model[fieldToUpdate].includes(req.params.id)) {
                                model[fieldToUpdate].push(req.params.id)
                                await model.save()
                            }
                        }
                    } else {
                        if (field.type === 'ObjectID' && !req.body[f]) continue;
                        r[f] = req.body[f]
                    }

                }
                r.save();
                res.sendStatus(200);
            })
    });
    app.post('/api/admin/:model/:id/delete', passportLib.isAdmin, (req, res) => {
        Mongoose[req.params.model].findById(req.params.id)
            .then(r => {
                r.delete();
                res.sendStatus(200);
            })
    });
    app.post('/api/admin/:model/create', passportLib.isAdmin, (req, res) => {
        Mongoose[req.params.model].create(req.body)
            .then(r => {
                res.send(r);
            })
    });
    app.post('/api/admin/:model/:id/images/add', passportLib.isAdmin, (req, res) => {
        if (!Mongoose.Types.ObjectId.isValid(req.params.id)) return res.send(app.locals.sendError({error: 404, message: 'Wrong Id'}))
        Mongoose[req.params.model].findById(req.params.id)

            .then(model => {
                model.images = model.images.concat(req.body.images);

                model.save()
                model.populate(Mongoose[req.params.model].population).execPopulate((e, m) => {
                    res.send(m)
                })


            })
            .catch(e => res.send(app.locals.sendError({error: 500, message: e.message})))
    });
    app.post('/api/admin/:model/:id/image-preview/:image', passportLib.isAdmin, (req, res) => {
        if (!Mongoose.Types.ObjectId.isValid(req.params.id)) return res.send(app.locals.sendError({error: 404, message: 'Wrong Id'}))
        Mongoose[req.params.model].findById(req.params.id)
            .then(model => {
                model.image = req.params.image;
                model.save();
                model.populate(Mongoose[req.params.model].population).execPopulate((e, m) => {
                    res.send(m)
                })
            })
            .catch(e => res.send(app.locals.sendError({error: 500, message: e.message})))
    });


};
