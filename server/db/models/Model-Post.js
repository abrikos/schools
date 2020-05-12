import moment from "moment";
import transliterate from "transliterate"

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const modelSchema = new Schema({
        header: {type: String, label: 'Заголовок'},
        text: {type: String, label: 'Текст', control:'markdown'},
        url: {type: String, label: 'Адрес на сайте СМИ'},
        isMarkdown: {type: Boolean, label: 'Markdown'},
        editable: Boolean,
        published: {type: Boolean, label: 'Опубликовано'},
        isMassMedia: {type: Boolean, label: 'СМИ о нас'},
        isElection: {type: Boolean, label: 'Выборы'},
        views: {type: Number, default: 0},
        user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
        images: [{type: mongoose.Schema.Types.ObjectId, ref: 'Image'}],
        image: {type: mongoose.Schema.Types.ObjectId, ref: 'Image'},
        preview: {type: mongoose.Schema.Types.ObjectId, ref: 'Image'},

    },
    {
        timestamps: {createdAt: 'createdAt', updatedAt: 'updatedAt'},
        //toObject: {virtuals: true},
        // use if your results might be retrieved as JSON
        // see http://stackoverflow.com/q/13133911/488666
        toJSON: {virtuals: true}
    });

modelSchema.statics.population = ['image', 'images', 'preview'];

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

modelSchema.virtual('previewPath')
    .get(function () {
        const image = this.image || this.preview;
        return image ? image.path : '/noImage.png'
    });

modelSchema.virtual('adminLink')
    .get(function () {
        return `/admin/news/${this.id}/update`
    });

modelSchema.virtual('link')
    .get(function () {
        if (this.isMassMedia) return this.url;
        return `/news/` + this.id + '/' + (this.header ? transliterate(this.header).replace(/[^a-zA-Z0-9]/g, '-') : '')
    });


export default mongoose.model("Post", modelSchema)


