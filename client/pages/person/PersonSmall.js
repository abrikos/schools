import noPhoto from "client/files/nouser.png";
import Phone from "client/components/Phone";
import Email from "client/components/Email";
import React from "react";
import AdminLink from "client/components/AdminLink";
import {A} from "hookrouter"

export default function (props) {
    const p = props.person;
    return <div className="person-small">
        <strong><A href={p.link}>{p.fio}</A></strong>
        <div className="row">
            <div className="col-4">
                <img src={p.photo ? p.photo.path : noPhoto} alt={p.fio} className={p.photo ? '' : 'no-photo'}/>
            </div>
            <div className="col-8 d-flex flex-column justify-content-center">
                <div className="person-info">
                    <span className="division">{p.divisionName}</span>
                    <span className="rank">{p.rank}</span>
                    <i className="status">{props.presidium ? props.status : p.status}</i>
                </div>
            </div>
        </div>
        <Phone phone={p.phone}/>
        <Email email={p.email}/>
        <AdminLink model={p} {...props}/>
    </div>
}
