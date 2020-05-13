//import moment from "moment";

import transliterate from "transliterate";

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const modelSchema = new Schema({
        name: {type: String, required: true, label: 'Название', default:'Новая школа'},
        site: {type: String, label: 'Сайт'},
        address: {type: String, label: 'Адрес'},
        phone: {type: String, label: 'Телефон'},
        email: {type: String, label: 'Email'},
        //path: {type: String, label: 'Путь'},
        description: {type: String, label: 'Описание', control:'markdown'},
        //director: {type: mongoose.Schema.Types.ObjectId, ref: 'Person'},
        photo: {type: mongoose.Schema.Types.ObjectId, ref: 'File'},
        files: [{type: mongoose.Schema.Types.ObjectId, ref: 'File'}],
    },
    {
        //timestamps: {createdAt: 'createdAt'},
        //toObject: {virtuals: true},
        // use if your results might be retrieved as JSON
        // see http://stackoverflow.com/q/13133911/488666
        toJSON: {virtuals: true}
    });


modelSchema.statics.population = [
    'files','photo','persons'
];

modelSchema.formOptions = {
    label: 'Школа',
    listOrder: {name: 1},
    listFields: ['name'],
    searchFields: ['name'],
    virtualFields: ['persons']
}

modelSchema.virtual('adminLink')
    .get(function () {
        return `/admin/school/${this.id}/update`
    });

modelSchema.virtual('persons', {
    ref: 'Person',
    label: 'Сотрудники',
    property: 'fioAndStatus',
    readOnly: true,
    localField: '_id',
    foreignField: 'school',
    justOne: false // set true for one-to-one relationship
});

modelSchema.virtual('photoPath')
    .get(function () {
        return this.photo ? this.photo.path : '/noImage.png'
    });


modelSchema.virtual('personsWithChief')
    .get(function () {
        return [this.chief].concat(this.persons);
    });


modelSchema.virtual('link')
    .get(function () {
        return `/school/` + this.id + '/' + (this.name ? transliterate(this.name).replace(/[^a-zA-Z0-9]/g, '-') : '')
    });


export default mongoose.model("School", modelSchema)


