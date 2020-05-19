import React, {useEffect, useState} from 'react';
import ErrorPage from "client/components/service/ErrorPage";
import ShareButtons from "client/components/share-button/ShareButtons";
import "client/pages/news/post.sass"
import HtmlView from "client/components/HtmlView";
import AdminLink from "client/components/AdminLink";
import MarkDown from "react-markdown";

export default function StaticPage(props) {
    const [post, setPost] = useState({});
    const [error, setError] = useState();
    const url = window.location.href.split('/');
    const apiLink = `${url[0]}//${url[2]}/api/page/share/${props.id}`;

    useEffect(() => {

        props.api(`/page/${props.id}/view`)
            .then(res => {
                if (!res.id) return setError({error: 404, message: 'Страница не найдена 1'});
                setPost(res);
            })
            .catch(e => {
                console.error(e)
                setError({error: 404, message: 'Страница не найдена 2'})
            });
    }, []);

    if (error) return <ErrorPage {...error}/>;
    if (!post.id) return <div/>;
    return <div>
        <div className="post-full">
            <h1>{post.header} <AdminLink model={post} isAdmin={post.editable} {...props}/></h1>
            <div className="row">
                <div className="col-sm-8">
                    {post.isHtml ? <HtmlView text={post.text}/> : <MarkDown source={post.text}/>}
                </div>
                <div className="col-sm-4">
                    {post.files.filter(i => i.isImage).map(f => <img src={f.path} className="img-fluid"/>)}
                </div>
            </div>
            <ShareButtons link={apiLink}/>

        </div>
    </div>
}
