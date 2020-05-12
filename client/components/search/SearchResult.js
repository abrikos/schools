import React from "react";
import SearchForm from "client/components/search/SearchForm";
import PostList from "client/pages/news/PostList";

export default function SearchResult(props) {
    let text = b64DecodeUnicode(props.code);
    const filter = parseCode(text);

    function b64DecodeUnicode(str) {
        // Going backwards: from bytestream, to percent-encoding, to original string.
        return decodeURIComponent(atob(str).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
    }


    function parseCode(code) {
        try {
            return {where: JSON.parse(text)}
        } catch (e) {
            return {where:{}}
        }
    }

    return <div>
        <h2>Поиск</h2>
        <SearchForm filter={filter} {...props} key={new Date().valueOf()}/>
        <PostList filter={filter} {...props} key={new Date().valueOf() + 10}/>
    </div>
}
