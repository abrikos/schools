import React, {useEffect, useState} from 'react';
import ErrorPage from "client/components/service/ErrorPage";
import ShareButtons from "client/components/share-button/ShareButtons";
import DateFormat from "client/components/DateFormat";
import "client/pages/news/post.sass"
import HtmlView from "client/components/HtmlView";
import AdminLink from "client/components/AdminLink";
import MarkDown from "react-markdown";

export default function PostView(props) {
    const [post, setPost] = useState({});
    const [error, setError] = useState();

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
                <img src={post.photoPath} className="img-fluid m-auto" alt={post.header}/>
            </div>

            <div className="post-text">
                {post.isHtml ?  <HtmlView text={post.text}/> : <MarkDown source={post.text}/>}
            </div>
            {/*{!!files.length && <ImageCarousel files={files}/>}*/}
            <hr/>
            {post.files.filter(i => !i.isImage).map(i => <a href={i.path} key={i.id}>{i.description}</a>)}
            <hr/>
            <div className="d-sm-flex flex-wrap">
            {post.files.filter(i=>i.path!==post.photoPath).map(f=><img  src={f.path} className="img-fluid"/> )}
            </div>
            <ShareButtons link={post.shareLink}/>

        </div>
    </div>
}
