import Mongoose from "server/db/Mongoose";

const passportLib = require('server/lib/passport');
//Mongoose.Post.findOne({_id:'5e6b377260ee8707805367b6'})    .populate('token')    .then(console.log)

module.exports.controller = function (app) {

    app.post('/api/image/upload', async (req, res) => {
        if (req.files && Object.keys(req.files).length) {
            if (!req.files) return res.send(app.locals.sendError({error: 500, message: 'No files uploaded'}));
            if (!req.files.image) return res.send(app.locals.sendError({error: 500, message: 'No files uploaded'}));
            //if (!req.files.image.mimetype.match('image')) return res.send(app.locals.sendError({error: 500, message: 'Wrong images uploaded'}));
            const match = req.files.image.mimetype.match(/\/([a-z]+)/);
            Mongoose.image.create({extension: match[1], name: new Date().valueOf(), description: req.files.image.name, user: req.session.userId})
                .then(file => req.files.image.mv(`.${file.path}`, function (err) {
                    if (err) return res.send({error: 500, message: err})
                    res.send(file)
                    /*post.populate('images').execPopulate((e, p)=>{
                        res.send(p.images)
                    })*/
                }))
                .catch(e => res.send(app.locals.sendError({error: 500, message: e.message})))
        }
    });

    app.post('/api/image/delete/:id', passportLib.isAdmin, async (req, res) => {
        if (!Mongoose.Types.ObjectId.isValid(req.params.id)) return res.send(app.locals.sendError({error: 404, message: 'Wrong ID'}))

        Mongoose.image.findById(req.params.id)
            .then(img => {
                img.delete()
                res.sendStatus(200);
            })
    });

}
;
