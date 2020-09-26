import React from 'react';
import {A} from "hookrouter";
import DateFormat from "client/components/DateFormat";
import PropTypes from "prop-types";
import striptags from "striptags"
import MarkDown from "react-markdown";

export default function PostSmall(props) {
    PostSmall.propTypes = {
        //post: PropTypes.object.isRequired,
        isAdmin: PropTypes.bool,
    };

    const post = props;
    const link = props.isAdmin ? post.adminLink : post.link;
    return <div className={`post-small`}>
        <div className="post-small-image">
            <A href={link || '#'}><img src={post.photoPath} alt={post.header} className="img-fluid"/></A>
        </div>
        <div className="post-small-content">
            <div><A href={link || '#'}><DateFormat date={post.date}/></A></div>
            <small><A href={link || '#'}>{post.header}</A></small>

        </div>
    </div>;
}




