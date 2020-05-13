//import moment from "moment";

import transliterate from "transliterate";

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const modelSchema = new Schema({
        fname: {type: String, label: 'Фамилия', required: true, default: 'Фам'},
        mname: {type: String, label: 'Имя', required: true, default: 'Им'},
        lname: {type: String, label: 'Отчество'},
        phone: {type: String, label: 'Телефон', default: ''},
        email: {type: String, label: 'Эл.почта', default: ''},
        education: {type: String, label: 'Образование', control:'markdown'},
        awards: {type: String, label: 'Награды', control:'markdown'},
        publications: {type: String, label: 'Публикации', control: 'markdown'},
        interest: {type: String, label: 'Научные интересы', control:'markdown'},
        description: {type: String, label: 'Описание', default: '', control: 'markdown'},
        school: {type: mongoose.Schema.Types.ObjectId, ref: 'School'},
        photo: {type: mongoose.Schema.Types.ObjectId, ref: 'File'},
        files: [{type: mongoose.Schema.Types.ObjectId, ref: 'File'}],
        statusId: {type: Number, label: 'Должность', select: [{label: "Директор", value: 1}, {label: "Завуч", value: 2}, {label: "Цчитель", value: 3}]},
    },
    {
        //timestamps: {createdAt: 'createdAt'},
        toObject: {virtuals: true},
        // use if your results might be retrieved as JSON
        // see http://stackoverflow.com/q/13133911/488666
        toJSON: {virtuals: true}
    });

modelSchema.statics.population = ['photo', 'school', 'files'];
modelSchema.formOptions = {
    listOrder: {fio: 1},
    listFields: ['fioShort'],
    //virtualFields: ['divisions', 'councils', 'councilsChief', 'divisionsChief'],
    searchFields: ['fname']
}
modelSchema.virtual('photoPath')
    .get(function () {
        return this.photo ? this.photo.path : '/noImage.png'
    });

modelSchema.virtual('school', {
    ref: 'School',
    label: 'Школа',
    property: 'name',
    readOnly: true,
    localField: '_id',
    foreignField: 'persons',
    justOne: false // set true for one-to-one relationship
});


modelSchema.virtual('fioShort')
    .get(function () {
        return this.lname ? `${this.fname} ${this.mname[0]}. ${this.lname[0]}.` : `${this.mname} ${this.fname[0]}.`
    });

modelSchema.virtual('fio')
    .get(function () {
        return this.lname ? `${this.fname} ${this.mname} ${this.lname}` : `${this.mname} ${this.fname}`
    });

modelSchema.virtual('adminLink')
    .get(function () {
        return `/admin/person/${this.id}/update`
    });

modelSchema.virtual('link')
    .get(function () {
        return `/person/` + this.id + '/' + transliterate(this.fio).replace(/[^a-zA-Z0-9]/g, '-')
    });


export default mongoose.model("Person", modelSchema)


