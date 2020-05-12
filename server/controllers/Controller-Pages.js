import Mongoose from "server/db/Mongoose";
const logger = require("logat")



module.exports.controller = function (app) {



    app.post('/api/person/options/list/voices', (req, res) => {
        const f = [
            Mongoose.person.schema.paths.member.options.select[0],
            ...Mongoose.person.schema.paths.voice.options.select
        ]
        res.send(f)
    })
    app.post('/api/person/options/list/members', (req, res) => {
        res.send(Mongoose.person.schema.paths.member.options.select)
    })





    app.get('/api/git/push', (req, res) => {
        console.log('GET', req.body, req.query)
        res.sendStatus(200)
    })


    app.post('/api/git/push', (req, res) => {
        console.log('POST', req.body, req.query)
        res.sendStatus(200)
    })



}
