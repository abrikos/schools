import React, {useEffect, useState} from 'react';
import {A} from "hookrouter"
import PostSmall from "client/pages/news/PostSmall";
import "./home.sass"
import DateFormat from "client/components/DateFormat";
import MarkDown from "react-markdown";

const mission =[
    ['Миссия', 'Способствовать повышению интеллектуально-творческого потенциала Республики Саха (Якутия) и России для прорывного и устойчивого развития в XXI веке.'],
    ['Ключевая идея ', 'Пролонгированная цель: не поступление в вуз, а выход на рынок в качестве гармонично развитой и социально ответственной личности талантливого профессионала.' ],
    ['Цель','Создание эффективного образовательного пространства на основе единства культурного, научного, экономического и социального процессов, направленных на развитие одаренности каждого ребенка и сотрудников для реализации и воплощения их талантов. Интеграция в мировое образовательное пространство и обеспечение лидерства общего образования на мировом уровне в числе 10 ведущих стран мира по качеству общего образования.'],
    ['Задачи','- разработать инновационную образовательную программу опережающей подготовки профессионально-ориентированных и духовно-нравственных выпускников на основе ФГОС;\n' +
    '- разработать инновационную образовательную программу постоянного повышения квалификации сотрудников и реализации их творческого потенциала;\n' +
    '- создание базы наукоемкого производства современной программного обеспечения (IT-продукции), техники, технологии для обеспечения практикоориентированного обучения и раскрытия талантов;\n' +
    '- создание уникальной инфраструктуры полноценной и комфортной жизнедеятельности.']
]



export default function Home(props) {
    const [news, setNews] = useState([]);
    const [newsLast, setNewsLast] = useState([]);
    useEffect(() => {
        props.api('/post/search', {where: {published: true, isMassMedia: {$ne: true}}, limit: 6})
            .then(res => {
                setNews(res)
            })
    }, []);

    function format(a){
        return <div>
            <h3 className="blue-box">{a[0]}</h3>
            <MarkDown source={a[1]}/>
        </div>
    }

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

    return <div className="home p-xl-1">
        <div className="row">
            {newsLast && <div className="col-sm-4">
                {news.slice(0,2).map(n => <div key={n.id}>{PostSmall(n)}</div>)}
            </div>}
            <div className="col-sm-4">
                {news.slice(2,4).map(n => <div key={n.id}>{PostSmall(n)}</div>)}
            </div>
            <div className="col-sm-4">
                {news.slice(4).map(n => <div key={n.id}>{PostSmall(n)}</div>)}
            </div>


        </div>
        <hr/>

        <div className="row">
            <div className="col-sm">{format(mission[0])}</div>
            <div className="col-sm">{format(mission[1])}</div>
        </div>

        <div className="row">
            <div className="col-sm">{format(mission[2])}</div>
            <div className="col-sm">{format(mission[3])}</div>
        </div>


    </div>
}




