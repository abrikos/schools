import React from "react";
import AdminUser from "client/pages/admin/AdminUser";
import {A} from "hookrouter"
import ErrorPage from "client/components/service/ErrorPage";
import AdminStart from "client/pages/admin/AdminStart";
import {Nav, NavItem} from "reactstrap";
import AdminNews from "client/pages/admin/AdminNews";
import AdminModel from "client/pages/admin/AdminModel";
import "./admin.sass"

export default function AdminIndex(props) {
    const pages = {

        start: ['Начало', <AdminStart  {...props}/>],
        news: ['Новости HTML', <AdminNews type={'news'} {...props}/>],
        //post: ['Новости', <AdminModel {...props}/>],
        //static:['Страницы', <AdminNews type={'static'} {...props}/>],
        //video:['YouTube', <AdminVideo {...props}/>],
        users: ['Пользователи', <AdminUser  {...props}/>],
        division: ['Подразделения', <AdminModel  {...props}/>],
        person: ['Персоны', <AdminModel  {...props}/>],
        council: ['ОУС', <AdminModel  {...props}/>],
        edition: ['Издания', <AdminModel  {...props}/>],
        document: ['Документы', <AdminModel  {...props}/>],

    };

    if (!props.authenticatedUser.admin) return <ErrorPage error={403}/>;

    return <div>
        <Nav tabs>
            {Object.keys(pages).map(key => <NavItem key={key}><A className={`nav-link ${key === props.control ? 'active' : ''}`} href={`/admin/${key}`}>{pages[key][0]}</A></NavItem>)}
        </Nav>
        <div className="mt-3">
            {pages[props.control] && pages[props.control][1]}
        </div>

    </div>

}
