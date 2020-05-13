import React, {useEffect, useState} from "react";
import "client/pages/person/person.sass";
import Loader from "client/components/Loader";
import PersonLarge from "client/pages/person/PersonLarge";


export default function (props) {
    const [persons, setPersons] = useState();
    const [pages, setPages] = useState({});

    useEffect(() => {
        props.api('/person/options/list/members').then(ps => {
            const id = parseInt(props.id);
            const pgs = {supervisors: {label: 'Руководство Президиума АН РС(Я)', filter: {where: {presidiumStatusId: isNaN(id) ? {$gt: 0} : id}, order: {presidiumStatusId: 1}}}}
            for (let i = 0; i < ps.length; i++) {
                pgs[i] = ps[i];
            }
            if(id){
                const labels = ['','Президент','И.о. Президента','Вице-президенты','Главный ученый секретарь','Советники']
                pgs[props.member].label = labels[id]
            }
            setPages(pgs)
            const filter = pgs[props.member].filter || {where: {member: props.member}, order: {fname: 1}};
            console.log(filter)
            props.api('/person/list', filter)
                .then(r => setPersons(r.list))
        })

    }, [props.member, props.id]);

    if (!persons) return <Loader/>
    return <div className="phone-book">
        <h1>{pages[props.member].label}</h1>
        <div className="d-flex flex-wrap justify-content-center">
            {persons.map(p => <PersonLarge key={p.id} person={p} {...props}/>)}
        </div>
    </div>
}
