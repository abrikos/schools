import React from "react";
import text from "client/pages/text-page/educationContent.js"
import * as texts from "."
import MarkDown from "react-markdown";

export default function TextPage(props) {
    return <div><MarkDown source={texts[props.id]}/></div>
}
