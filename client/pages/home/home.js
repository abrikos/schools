import React, {useEffect, useState} from 'react';
import {A} from "hookrouter"
import PostSmall from "client/pages/news/PostSmall";
import "./home.sass"
import DateFormat from "client/components/DateFormat";

export default function Home(props) {
    const [news, setNews] = useState([]);
    const [newsLast, setNewsLast] = useState([]);
    useEffect(() => {
        props.api('/post/search', {where: {published: true, isMassMedia: {$ne: true}}, limit: 3})
            .then(res => {
                const last = [];
                last.push(res.shift());
                setNewsLast(last)
                setNews(res)
            })
    }, []);

    function formatLastNews(i) {
        if (!newsLast[i]) return <div></div>;
        return <div className="first-news">
            <div className="first-news-img">
                <A href={newsLast[i].link}><img src={newsLast[i].photoPath} className="img-preview"/></A>
            </div>
            <div><DateFormat date={newsLast[i].date}/></div>
            <A href={newsLast[i].link}>{newsLast[i].header}</A>
        </div>
    }

    return <div className="home">
        <div className="row">
            {newsLast && <div className="col-sm-4">
                {formatLastNews(0)}
            </div>}
            <div className="col-sm-8">
                <div className="d-flex flex-wrap">
                    {news.map(n => <div key={n.id}>{PostSmall(n)}</div>)}
                </div>
            </div>

        </div>


    </div>
}




