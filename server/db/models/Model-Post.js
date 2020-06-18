import moment from "moment";
import transliterate from "transliterate"

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const modelSchema = new Schema({
        header: {type: String, label: 'Заголовок'},
        text: {type: String, label: 'Текст', control: 'markdown'},
        url: {type: String, label: 'Адрес на сайте СМИ'},
        isHtml: {type: Boolean, label: 'as Html'},
        editable: Boolean,
        published: {type: Boolean, label: 'Опубликовано'},
        views: {type: Number, default: 0},
        user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
        files: [{type: mongoose.Schema.Types.ObjectId, ref: 'File'}],
        school: {type: mongoose.Schema.Types.ObjectId, ref: 'School', property: 'name', sort: {name: 1}, label: 'Школа'},
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
    label: 'Новости',
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
        return `/admin/post/${this.id}/update`
    });

modelSchema.virtual('link')
    .get(function () {
        if (this.isMassMedia) return this.url;
        return `/news/` + this.id + '/' + (this.header ? transliterate(this.header).replace(/[^a-zA-Z0-9]/g, '-') : '')
    });


export default mongoose.model("Post", modelSchema)


