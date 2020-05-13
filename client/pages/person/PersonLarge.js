import MarkDown from "react-markdown";
import React from "react";
import {A} from "hookrouter";
import AdminLink from "client/components/AdminLink";

export default function (props) {
    const p = props.person;
    return <div className="person-large">
        <div className="supervisor-image">
            <img src={p.photo} alt={p.fio}/>

        </div>

        <div className="supervisor-text">
            <AdminLink model={p} {...props}/>
            <A href={p.link}>
                <strong>{p.fio}</strong>
                <div className="alert alert-dark">
                    <div className="statusX"><strong>{p.presidiumStatus}</strong></div>
                    <div className="statusX">{p.memberStatus}</div>
                    <div className="statusX">{p.rank}</div>
                </div>
                <MarkDown source={p.awards}/>
            </A>

        </div>
    </div>
}
