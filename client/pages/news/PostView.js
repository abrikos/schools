import React, {useEffect, useState} from 'react';
import ErrorPage from "client/components/service/ErrorPage";
import ShareButtons from "client/components/share-button/ShareButtons";
import DateFormat from "client/components/DateFormat";
import "client/pages/news/post-view.sass"
import HtmlView from "client/components/HtmlView";
import AdminLink from "client/components/AdminLink";
import MarkDown from "react-markdown";

export default function PostView(props) {
    const [post, setPost] = useState({});
    const [error, setError] = useState();
    const url = window.location.href.split('/');
    const apiLink = `${url[0]}//${url[2]}/api/post/share/${props.id}`;

    useEffect(() => {

        props.api(`/post/${props.id}/view`)
            .then(res => {
                if (!res.id) return setError({error: 404, message: 'Новость не найдена'});
                setPost(res);
            })
            .catch(e => setError({error: 404, message: 'Новость не найдена'}));
    }, []);

    if (error) return <ErrorPage {...error}/>;
    if (!post.id) return <div/>;
    return <div>
        <div className="post-full">
            <h1>{post.header}</h1>
            <DateFormat date={post.createdAt}/> {/*<FontAwesomeIcon icon={faEye}/> {post.views}*/}
            <AdminLink model={post} isAdmin={post.editable} {...props}/>
            <hr/>
            <div className="d-flex justify-content-center">
                <img src={post.previewPath} className="m-auto" alt={post.header}/>
            </div>

            <div className="post-text">
                {post.isMarkdown ? <MarkDown source={post.text}/> : <HtmlView text={post.text}/>}
            </div>
            {/*{!!images.length && <ImageCarousel images={images}/>}*/}
            <hr/>
            {post.images.filter(i => !i.isImage).map(i => <a href={i.path} key={i.id}>{i.description}</a>)}
            <hr/>

            <ShareButtons link={apiLink}/>

        </div>
    </div>
}
