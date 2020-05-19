import moment from "moment";
import transliterate from "transliterate"

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const modelSchema = new Schema({
        header: {type: String, label: 'Заголовок'},
        path: {type: String, label: 'Путь', unique:true},

        text: {type: String, label: 'Текст', control:'markdown'},
        isHtml: {type: Boolean, label: 'as Html'},
        css: {type: String, label: 'Css', control:'markdown'},
        editable: Boolean,
        published: {type: Boolean, label: 'Опубликовано'},
        user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
        files: [{type: mongoose.Schema.Types.ObjectId, ref: 'File'}],
        photo: {type: mongoose.Schema.Types.ObjectId, ref: 'File'},

    },
    {
        timestamps: {createdAt: 'createdAt', updatedAt: 'updatedAt'},
        //toObject: {virtuals: true},
        // use if your results might be retrieved as JSON
        // see http://stackoverflow.com/q/13133911/488666
        toJSON: {virtuals: true}
    });

modelSchema.statics.population = ['photo', 'files'];

modelSchema.formOptions = {
    label: 'Статичная страница',
    listOrder: {createdAt: -1},
    listFields: ['header', 'date'],
    searchFields: ['header'],
}


modelSchema.virtual('date')
    .get(function () {
        return moment(this.createdAt).format('YYYY-MM-DD HH:mm:ss')
    })
    .set(function (val) {
        this.createdAt = moment(val).format('YYYY-MM-DD HH:mm:ss');

    });

modelSchema.virtual('photoPath')
    .get(function () {
        return this.photo ? this.photo.path : '/noImage.png'
    });

modelSchema.virtual('adminLink')
    .get(function () {
        return `/admin/page/${this.id}/update`
    });

modelSchema.virtual('link')
    .get(function () {
        return `/page/` + this.id + '/' + (this.header ? transliterate(this.header).replace(/[^a-zA-Z0-9]/g, '-') : '')
    });


export default mongoose.model("Page", modelSchema)


