import React from "react";
import "./school.sass"
import {A} from "hookrouter"

export default function (props) {
    return <div className="school-small">
        <div className="img-container">
            <img src={props.photoPath} className="img-fluid"/>
        </div>
        <div className="text-container">
            <A href={props.link}>{props.name}</A>
        </div>

    </div>
}
