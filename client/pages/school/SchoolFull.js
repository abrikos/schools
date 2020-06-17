import React, {useEffect, useState} from "react";
import PersonSmall from "client/pages/person/PersonSmall";
import AdminLink from "client/components/AdminLink";
import MarkDown from "react-markdown";
import Email from "client/components/Email";
import Phone from "client/components/Phone";

export default function (props) {
    const modelName = 'school';
    const [model, setModel] = useState();

    useEffect(() => {
        props.api(`/${modelName}/${props.id}/view`)
            .then(setModel)
    }, [])

    if (!model) return <div></div>
    const director = model.persons.find(p => p.statusId === 1);
    return <div className={`${modelName}-full`}>
        <h2 className="text-center">{model.name} <AdminLink model={model} {...props}/></h2>
        <div className="row">
            <div className="col-sm-4"><img src={model.photoPath} alt={model.name} className="img-fluid"/></div>
            <div className="col-sm-4 p-2">
                Сайт: <a href={model.site}>{model.site}</a><br/>
                <Email email={model.email}/><br/>
                <Phone phone={model.phone}/><br/>
                Адрес: {model.address}
            </div>
            <div className="col-sm-4">
                {director && <PersonSmall {...director} {...props}/>}
                {model.persons.filter(p => p.statusId !== 1).map(p => <PersonSmall key={p.id} {...p} {...props}/>)}
            </div>
        </div>

        <MarkDown source={model.description}/>
        {model.educationContent && <div><h3>Содержание образования</h3><hr/><MarkDown source={model.educationContent}/></div>}

    </div>
}
