import React, {useEffect, useState} from "react";
import Pager from "client/components/Pager";
import * as views from "client/pages"

export default function ModelList(props) {
    const [list, setList] = useState([])
    const [totalCount, setTotalCount] = useState();
    const [filter, setFilter] = useState(props.filter);

    useEffect(()=>{
        const f = filter ? Object.assign(filter, {}) : {where:{}};
        if(!f.where) f.where = {};
        if(!f.limit) f.limit = 12;
        f.skip = 0;
        setFilter(f);
        props.api(`/${props.model}/list`, f)
            .then(res=>{
                setList(res.list)
                setTotalCount(res.count);
            })
    },[])

    function pageChange(f) {
        props.api(`/${props.model}/list`, f).then(res=>setList(res.list));
    }

    return <div className={`${props.model}-list`}>
        <h2 className="text-center">{props.title}</h2>
        <div className="list-wrapper">
            {list.map(item=><div key={item.id}>
                {views[`${props.model}Small`](item)}
            </div>)}
        </div>

        {filter && !!totalCount && <Pager count={totalCount} filter={filter} onPageChange={pageChange}/>}
    </div>
}
