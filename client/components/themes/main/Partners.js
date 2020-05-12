import React from "react";
import * as images from "./photos/partners"
import {A} from "hookrouter"

export default function Partners() {
    const partners =[
        'https://internat.msu.ru',
        'https://sesc.nsu.ru',
        'https://www.s-vfu.ru',
        'https://yakutia.science',
        'http://lensky-kray.ru',
        'https://nikolaevcentre.ru/about',
        'http://www.school.ioffe.ru',
        'https://www.bmstu.ru',
        'https://tpykt.ru',
        'http://ugsakha.ru',
    ]
    return <div>
        <hr/>
        <div className="d-flex">
            <hr/>
            <div>Наши партнеры</div>
            <hr/>
        </div>
        <div className="partners">
        {partners.map((p,i)=><a href={p} target="_blank"><img src={images[`i${i}`]} className="img-fluid"/></a>)}
    </div>
    </div>

}
