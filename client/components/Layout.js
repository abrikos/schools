import React from 'react';
import 'client/style/modal.css';
import {navigate, useRoutes} from "hookrouter";
import routes from "client/Routes";
//import YandexMetrica from "client/components/YandexMetrica";
import 'bootstrap/dist/css/bootstrap.min.css';
//import 'client/components/themes/bootstrap.css';
import ThemeMain from "client/components/themes/main/ThemeMain";
import ThemeAdmin from "client/components/themes/admin/ThemeAdmin";
import siteMap from "client/components/site-map-compiled.json"

export default function LayoutMenuTop(props) {

    let routeResult = useRoutes(routes(props));

    return <div>
        {window.location.pathname.match(/^\/admin/) ? <ThemeAdmin routeResult={routeResult} {...props}/>:<ThemeMain routeResult={routeResult} {...props}/>}

    </div>
}


