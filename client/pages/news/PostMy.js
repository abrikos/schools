import React, {useEffect, useState} from 'react';
import PostList from "client/pages/news/PostList";

export default function PostMy(props) {
    const [filter, setFilter] = useState();
    const tokens = props.getCookie(props.cookieName);
    console.log(tokens)
    useEffect(() => {
        props.api('/post/my', {tokens}).then(posts => {
            console.log(posts)
            setFilter({where: {_id: {$in: posts}}})
        });
    }, []);

    if(!filter) return  <div/>
    return <div>
        <h2>Мои объявления</h2>
        <PostList filter={filter} {...props}/>
    </div>
}
