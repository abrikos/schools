import User from "server/db/models/Model-User";
import file from "server/db/models/Model-File";
import post from "server/db/models/Model-Post";
import video from "server/db/models/Model-Vieo";
import person from "server/db/models/Model-Person";
import school from "server/db/models/Model-School";

const mongoose = require("mongoose");
require('dotenv').config();
mongoose.set('useCreateIndex', true);
// подключение
console.log('Mongoose connect...');
mongoose.connect(process.env.MONGO, {useNewUrlParser: true, useUnifiedTopology: true});
console.log('Mongoose connected!');
//mongoose.connect("mongodb://108.160.143.119:27017/minterEarth", {useNewUrlParser: true});

const Mongoose = {
    close: function (cb) {
        mongoose.disconnect(cb)
    },
    Types: mongoose.Types,
    connection: mongoose.connection,
    checkOwnPassport: function (model, passport) {
        if (!passport) return false;
        return JSON.stringify(passport.user._id) === JSON.stringify(model.user.id);
    },
    checkOwnCookie: function (model, cookie) {
        if (!cookie) return false;
        if (!cookie.length) return false;
        return cookie.indexOf(model.cookieId) !== -1;
    },
    isValidId: function (id) {
        return mongoose.Types.ObjectId.isValid(id)
    },
    User, file, post,  video, person, school

};
export default Mongoose;
