import React from "react";
import "client/components/themes/main.sass"
import "client/components/themes/main/theme-main.sass"
import MenuTop from "client/components/themes/main/MenuTop";
import nikolaev from "./photos/nikolaev.jpg"
import Partners from "client/components/themes/main/Partners";
import UserMenu from "client/components/themes/main/UserMenu";

export default function ThemeMain(props) {

    return <div className="theme-main">

        <h2 className="blue-box text-center">Сеть школ первого Президента Республики Саха (Якутия) М.Е. Николаева</h2>

        <div className="container">
            <div className="row">
                <div className="col-sm-2"><img src={nikolaev} id="nikolaev" className="img-fluid"/></div>
                <div className="col-sm-10">
                    <div className="d-flex border h-100 p-2">
                    <i className="m-auto">Я уверен, на Земле Олонхо появятся новые Ломоносовы, Коперники, Микеланджело. То зернышко, которое мы закладываем в уходящем тысячелетии, даст ростки талантов, которые раскроются с полной силой в XXI веке…</i>
                    </div>
                </div>
            </div>
            <MenuTop {...props}/>
            {props.errorPage || props.routeResult}

            <Partners/>
            <UserMenu {...props}/>
        </div>

    </div>
}
