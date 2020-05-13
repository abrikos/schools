import React, {useEffect, useState} from "react";
import MarkDown from "react-markdown";
import AdminLink from "client/components/AdminLink";
import {A} from "hookrouter"
import Loader from "client/components/Loader";

export default function (props) {
    const [model, setModel] = useState();
    useEffect(() => {
        props.api(`/person/${props.id}/view`)
            .then(setModel)
    }, [])

    const fields = {education: 'Образование', awards: 'Награды', interest: 'Научные интересы', description: 'Информация', publications: 'Основные публикации'}

    if (!model) return <Loader/>
    return <div className="person-view">
        <h1>{model.fio} <AdminLink model={model} {...props}/></h1>
        <div className="row">
            <div className="col-sm-4">
                <img src={model.photo} className="img-fluid" alt={model.fio}/>
            </div>
            <div className="col-sm-6">
                <h4 className="division">{model.divisionName}</h4>
                <div className="rank">{model.rank}</div>
                <div className="status">{model.status}</div>

                {Object.keys(fields).filter(f=>!!model[f]).map(f => <div key={f}><h4>{fields[f]}</h4>
                    <MarkDown source={model[f]}/>
                </div>)}
            </div>
        </div>
    </div>

}
