import {A} from "hookrouter";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEdit} from "@fortawesome/free-solid-svg-icons";
import React from "react";

export default function (props) {
    return props.isAdmin || props.authenticatedUser.admin ? <A href={props.model.adminLink}><FontAwesomeIcon icon={faEdit}/></A> : ''
}
