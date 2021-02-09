import React from "react";
import "client/components/themes/main.sass"
import "client/components/themes/main/theme-main.sass"
import MenuTop from "client/components/themes/main/MenuTop";
import nikolaev from "./photos/nikolaev.jpg"
import Partners from "client/components/themes/main/Partners";
import UserMenu from "client/components/themes/main/UserMenu";
import {A} from "hookrouter";

export default function ThemeMain(props) {

    return <div className="theme-main">
        <MenuTop {...props}/>
        <div className="header">
            <div className="photo"><img src={nikolaev} className="img-fluid"/></div>
            <div className="text">
                <h1>Сеть школ первого Президента Республики Саха (Якутия) М.Е. Николаева</h1>
                <i>"Я уверен, на Земле Олонхо появятся новые Ломоносовы, Коперники, Микеланджело. То зернышко, которое мы закладываем в уходящем тысячелетии, даст ростки талантов, которые раскроются с полной силой в XXI веке…" М.Е.Николаев</i>

            </div>
        </div>
        <div className="content-wrap">

                <div className="menu2">
                    <div><A href='/directors'>Навигатор директора СШ</A></div>
                    <div>Учителям</div>
                    <div>Ученикам</div>
                    <div>Родителям</div>
                    <div>Библиотека</div>
                    <div><a href="https://урокцифры.рф" target="_blank">урокцифры.рф</a> </div>
                    <div>
                        <a href="https://drive.google.com/open?id=18oYkDMm-rmDpRHuTRd_MIItGs8pm7fa-" target="_blank">Стратегия пять шагов модернизации</a>
                    </div>
                </div>
                <div className="content">
                    {props.errorPage || props.routeResult}
                </div>

        </div>


        <Partners/>
        <UserMenu {...props}/>
    </div>

}
