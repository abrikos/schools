import React from "react";
import Home from "client/pages/home/home";
import Login from "client/pages/login/login";
import Cabinet from "client/pages/cabinet/cabinet";
import PostView from "client/pages/news/PostView";
import AdminIndex from "client/pages/admin/AdminIndex";
import SearchResult from "client/components/search/SearchResult";
import Contacts from "client/pages/contacts/contacs";
import SiteMap from "client/pages/SiteMap";
import Search from "client/pages/search/Search";
import NewsPage from "client/pages/news/NewsPage";

export default function Routes(props) {

    return {
        "/": () => <Home {...props}/>,
        "/cabinet": () => <Cabinet {...props}/>,
        "/search": () => <Search {...props}/>,
        "/contacts": () => <Contacts {...props}/>,
        "/login": () => <Login {...props}/>,
        "/wp-admin": () => <Login {...props}/>,
        "/admin/:control": (params) => <AdminIndex {...params} {...props}/>,
        "/admin/:control/:id/update": (params) => <AdminIndex {...params} {...props}/>,
        "/news": () => <NewsPage {...props}/>,
        "/static/:path": (params) => <PostView {...params} {...props}/>,
        "/news/:id": (params) => <PostView {...params} {...props}/>,
        "/news/:id/:path": (params) => <PostView {...params} {...props}/>,

        //"/persons/:type": (params) => <PersonListLarge {...params} {...props}/>,
        "/site-map": () => <SiteMap {...props}/>,
        "/search/:code": (params) => <SearchResult {...params} {...props}/>,
    };
}
