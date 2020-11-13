import React from 'react';
import {A} from "hookrouter";
import DateFormat from "client/components/DateFormat";
import PropTypes from "prop-types";

export default function PostSmall(props) {
    PostSmall.propTypes = {
        //post: PropTypes.object.isRequired,
        isAdmin: PropTypes.bool,
    };

    const post = props;
    const link = props.isAdmin ? post.adminLink : post.link;
    return <div className={`post-small`}>
        <div className="img-wrapper">{post.youtube ? <iframe src={`https://www.youtube.com/embed/${post.youtube}?controls=1`} width="100%" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe> : <A href={link || '#'}><img src={post.photoPath} alt={post.header} className="img-fluid"/></A>
        }</div>
        <div className="post-small-content">
            <small><A href={link || '#'}>{post.header}</A></small>
            <div className="text-right text-secondary"><DateFormat date={post.date}/></div>
        </div>
    </div>;
}




