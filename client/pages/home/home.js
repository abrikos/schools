import React, {useEffect, useState} from 'react';
import {A} from "hookrouter"
import PostSmall from "client/pages/news/PostSmall";
import "./home.sass"
import DateFormat from "client/components/DateFormat";
import MarkDown from "react-markdown";

const mission = '**Миссия**\n' +
    '\n' +
    'Способствовать повышению интеллектуально-творческого потенциала Республики Саха (Якутия) и России для прорывного и устойчивого развития в XXI веке.\n' +
    '\n' +
    '**Ключевая идея **\n' +
    '\n' +
    'Пролонгированная цель: не поступление в вуз, а выход на рынок в качестве гармонично развитой и социально ответственной личности талантливого профессионала.\n' +
    '\n' +
    '**Цель**\n' +
    '\n' +
    'Создание эффективного образовательного пространства на основе единства культурного, научного, экономического и социального процессов, направленных на развитие одаренности каждого ребенка и сотрудников для реализации и воплощения их талантов.\n' +
    'Интеграция в мировое образовательное пространство и обеспечение лидерства общего образования на мировом уровне в числе 10 ведущих стран мира по качеству общего образования.\n' +
    '\n' +
    '**Задачи**\n' +
    '- разработать инновационную образовательную программу опережающей подготовки профессионально-ориентированных и духовно-нравственных выпускников на основе ФГОС;\n' +
    '- разработать инновационную образовательную программу постоянного повышения квалификации сотрудников и реализации их творческого потенциала;\n' +
    '- создание базы наукоемкого производства современной программного обеспечения (IT-продукции), техники, технологии для обеспечения практикоориентированного обучения и раскрытия талантов;\n' +
    '- создание уникальной инфраструктуры полноценной и комфортной жизнедеятельности.\n'

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
            <div className="col-sm-4">
                {news.map(n => <div key={n.id}>{PostSmall(n)}</div>)}
            </div>
            <div className="col-sm-4 projects">
                <h3 className="text-center">Проекты</h3>
                <table className="projects">
                    <tbody>
                    <tr>
                        <td>Навигатор директора СШ</td>
                        <td>Учителям</td>
                    </tr>
                    <tr>
                        <td>Ученикам</td>
                        <td>Родителям</td>
                    </tr>
                    <tr>
                        <td colSpan={2}>Библиотека</td>
                    </tr>
                    </tbody>
                </table>
            </div>

        </div>
        <hr/>
        <h3>Миссия и цель</h3>
        <MarkDown source={mission}/>


    </div>
}




