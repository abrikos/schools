import React from "react";
import {Button} from "reactstrap";
import {navigate} from "hookrouter"

export default function AdminPostFromUrl(props) {

    function submit(e) {
        e.preventDefault()
        const form = props.formToObject(e.target)
        props.api('/post/method/fromUrl', form)
            .then(post => navigate(post.adminLink))
    }

    return <form onSubmit={submit}>
        Создать новость из ссылки
        <input name="url"/>
        <Button type="submit">Создать</Button>
    </form>
}
