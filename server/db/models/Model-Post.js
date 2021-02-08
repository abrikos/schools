import moment from "moment";
import transliterate from "transliterate"
import getYouTubeID from 'get-youtube-id';

const util = require('util')
const ogs = require('open-graph');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const modelSchema = new Schema({
        header: {type: String, label: 'Заголовок'},
        text: {type: String, label: 'Текст', control: 'markdown'},
        url: {type: String, label: 'Адрес на сайте СМИ'},
        imgUrl: {type: String, label: 'Фото на сайте СМИ'},
        youtube: {type: String, label: 'ID на YouTube'},
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

modelSchema.statics.fromUrl = async function ({url}, user) {
    const r = await this.urlMeta(url)
    let youtube;
    if(url.toLowerCase().match('youtu')){
        youtube = getYouTubeID(url)
    }
    return await this.create({user, imgUrl: r.image.url[0], header: r.title[1] || r.title[0], text: r.description, published: true, url, youtube})
}

modelSchema.statics.urlMeta = async function (url) {
    const ogsP = util.promisify(ogs)
    try {
        return await ogsP(url)
    }catch (e){
        console.log(e)
    }
    return {}
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
        return this.imgUrl || (this.photo ? this.photo.path : '/noImage.png')
    });

modelSchema.virtual('adminLink')
    .get(function () {
        return `/admin/post/${this.id}/update`
    });

modelSchema.virtual('shareLink')
    .get(function () {
        return `/api/post/share/${this.id}/` + (this.header ? transliterate(this.header).replace(/[^a-zA-Z0-9]/g, '-') : '')
    });

modelSchema.virtual('link')
    .get(function () {
        return this.url || `/news/` + this.id + '/' + (this.header ? transliterate(this.header).replace(/[^a-zA-Z0-9]/g, '-') : '')
    });


export default mongoose.model("Post", modelSchema)


