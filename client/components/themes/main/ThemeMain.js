import React from "react";
import "client/components/themes/main.sass"
import "client/components/themes/main/theme-main.sass"
import MenuTop from "client/components/themes/main/MenuTop";
import nikolaev from "./photos/nikolaev.jpg"
import Partners from "client/components/themes/main/Partners";
import UserMenu from "client/components/themes/main/UserMenu";
import {A} from "hookrouter";

export default function ThemeMain(props) {

    return <div className="container theme-main">

        <div className="row">
            <div className="col-sm-2 p-4"><img src={nikolaev} id="nikolaev" className="img-fluid"/></div>
            <div className="col-sm-10">
                <div className="d-flex h-100">
                    <h2 className="m-auto border-left p-2">Сеть школ первого Президента Республики Саха (Якутия) М.Е. Николаева</h2>
                </div>
            </div>
        </div>
        <i>"Я уверен, на Земле Олонхо появятся новые Ломоносовы, Коперники, Микеланджело. То зернышко, которое мы закладываем в уходящем тысячелетии, даст ростки талантов, которые раскроются с полной силой в XXI веке…" М.Е.Николаев</i>


        <MenuTop {...props}/>

        <div className="menu1">
            <div className="colored"><A href='/directors'>Навигатор директора СШ</A></div>
            <div>Учителям</div>
            <div>Ученикам</div>
            <div>Родителям</div>

            <div colSpan={2}>Библиотека</div>

            <div colSpan={2}>
                <a href="https://drive.google.com/open?id=18oYkDMm-rmDpRHuTRd_MIItGs8pm7fa-" target="_blank">Стратегия пять шагов модернизации</a>
            </div>

        </div>

        <div className="content">
            {props.errorPage || props.routeResult}
        </div>


        <Partners/>
        <UserMenu {...props}/>
    </div>

}
