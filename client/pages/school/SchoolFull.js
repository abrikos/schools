import React, {useEffect, useState} from "react";
import PersonSmall from "client/pages/person/PersonSmall";
import PersonLarge from "client/pages/person/PersonLarge";
import AdminLink from "client/components/AdminLink";
import MarkDown from "react-markdown";

export default function (props) {
    const modelName = 'school';
    const [model, setModel] = useState();

    useEffect(()=>{
        props.api(`/${modelName}/${props.id}/view`)
            .then(setModel)
    },[])

    if(!model) return <div></div>
    const director = model.persons.find(p=>p.statusId===1);
    return <div className={`${modelName}-full`}>
        <h2 className="text-center">{model.name} <AdminLink model={model} {...props}/></h2>
        <div className="d-sm-flex flex-wrap">
                <PersonSmall {...director} {...props}/>
                {model.persons.filter(p=>p.statusId!==1).map(p=><PersonSmall key={p.id} {...p} {...props}/>)}
        </div>
        <MarkDown source={model.description}/>

    </div>
}
