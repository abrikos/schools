import React, {useEffect, useState} from "react";
import PersonSmall from "client/pages/person/PersonSmall";
import AdminLink from "client/components/AdminLink";
import MarkDown from "react-markdown";
import Email from "client/components/Email";
import Phone from "client/components/Phone";
import ShareButtons from "client/components/share-button/ShareButtons";
import PostList from "client/pages/news/PostList";

export default function (props) {
    const modelName = 'school';
    const [model, setModel] = useState();
    const [news, setNews] = useState([]);
    const newsFilter = {where: {school: props.id}}

    useEffect(() => {
        props.api(`/${modelName}/${props.id}/view`)
            .then(setModel)
        props.api(`/post/list`, {

            where: {
                school: props.id
            }

        })
            .then(r => setNews(r.list))

    }, [])

    if (!model) return <div></div>
    console.log(model)
    const director = model.persons.find(p => p.statusId === 1);
    return <div className={`${modelName}-full p-0`}>
        <h2 className="text-center">{model.name} <AdminLink model={model} {...props}/></h2>
        <div className="row">
            <div className="col-sm-4">
                <img src={model.photoPath} alt={model.name} className="img-fluid"/>
                {model.files.filter(f => f.path !== model.photoPath).map(f => <img key={f.id} src={f.path} alt={model.name} className="img-fluid"/>)}
            </div>
            <div className="col-sm">
                <div className=" p-2">
                    {model.site && <div><a href={model.site}>{model.site}</a></div>}
                    <Email email={model.email}/><br/>
                    <Phone phone={model.phone}/><br/>
                    Адрес: {model.address}
                    <hr/>
                    <div className="text-justify"><MarkDown source={model.description}/></div>
                </div>
            </div>
            {(director || !!model.persons.length || !!news.length) && <div className="col-sm">
                {director && <PersonSmall {...director} {...props}/>}
                {model.persons.filter(p => p.statusId !== 1).map(p => <PersonSmall key={p.id} {...p} {...props}/>)}
                {news.length > 0 && <div>
                    <h3 className="text-center">Новости</h3>
                    <PostList filter={newsFilter} {...props}/>
                    {/*{news.map(n => <div key={n.id}><PostSmall {...n}/></div>)}*/}
                </div>}
            </div>}
        </div>


        {model.educationContent && <div><h3>Содержание образования</h3>
            <hr/>
            <MarkDown source={model.educationContent}/></div>}

        <ShareButtons link={model.shareLink}/>

    </div>
}
