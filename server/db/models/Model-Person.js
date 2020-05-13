//import moment from "moment";

import transliterate from "transliterate";

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const modelSchema = new Schema({
        fname: {type: String, label: 'Фамилия', required: true, default: 'Фам'},
        mname: {type: String, label: 'Имя', required: true, default: 'Им'},
        lname: {type: String, label: 'Отчество'},
        statusId: {type: Number, label: 'Должность', select: [{label: "Директор", value: 1}, {label: "Завуч", value: 2}, {label: "Цчитель", value: 3}]},
        school: {type: mongoose.Schema.Types.ObjectId, ref: 'School', label:'Школа'},
        phone: {type: String, label: 'Телефон', default: ''},
        email: {type: String, label: 'Эл.почта', default: ''},
        description: {type: String, label: 'Описание', default: '', control: 'markdown'},
        education: {type: String, label: 'Образование', control:'markdown'},
        awards: {type: String, label: 'Награды', control:'markdown'},
        publications: {type: String, label: 'Публикации', control: 'markdown'},
        interest: {type: String, label: 'Научные интересы', control:'markdown'},
        photo: {type: mongoose.Schema.Types.ObjectId, ref: 'File'},
        files: [{type: mongoose.Schema.Types.ObjectId, ref: 'File'}],

    },
    {
        //timestamps: {createdAt: 'createdAt'},
        toObject: {virtuals: true},
        // use if your results might be retrieved as JSON
        // see http://stackoverflow.com/q/13133911/488666
        toJSON: {virtuals: true}
    });

modelSchema.statics.population = ['photo', {path: 'school', populate: ['photo']}, 'files'];
modelSchema.formOptions = {
    listOrder: {fio: 1},
    listFields: ['fioShort'],
    //virtualFields: ['school'],
    searchFields: ['fname']
}
modelSchema.virtual('photoPath')
    .get(function () {
        return this.photo ? this.photo.path : '/noImage.png'
    });


modelSchema.virtual('fioShort')
    .get(function () {
        return this.lname ? `${this.fname} ${this.mname[0]}. ${this.lname[0]}.` : `${this.mname} ${this.fname[0]}.`
    });

modelSchema.virtual('statusName')
    .get(function () {
        const option = modelSchema.paths.statusId.options.select.find(o=>o.value === this.statusId)
        return option && option.label;
    });

modelSchema.virtual('fioAndStatus')
    .get(function () {
        return this.fioShort + ' ' + this.statusName;
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


