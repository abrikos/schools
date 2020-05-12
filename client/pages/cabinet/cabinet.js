import React, {useEffect, useState} from 'react';
import MyBreadCrumb from "client/components/MyBreadCrumb";
import {Button, Input} from "reactstrap";
import ErrorPage from "client/components/service/ErrorPage";

export default function Cabinet(props) {
    if (!props.authenticatedUser) return <ErrorPage {...{error: 403, message: 'Доступ запрещен'}}/>;
    const [user, setUser] = useState({});

    useEffect(() => {
        loadUser()
    }, []);

    function loadUser() {
        props.api('/cabinet/user')
            .then(setUser)
    }

    function userSave(e) {
        e.preventDefault()
        props.api('/cabinet/user/save', props.formToObject(e.target))
            .then(props.login())
    }


    return <div>
        <MyBreadCrumb items={[
            {label: 'Кабинет'},
        ]}/>


        {/*<div className="text-center"><UserAvatar user={user}/></div>*/}
        <form onSubmit={userSave}>
            {/*<div className="input-group mb-3">
                <Input placeholder="Avatar URL" defaultValue={user.photo_url} name="avatar" onChange={e => setAvatar(e.target.value)}/>
            </div>*/}

            <div className="input-group mb-3">
                <Input placeholder="Nickname" defaultValue={user.name} name="nick"/>
            </div>
            <Button className="input-group-text" id="basic-addon3">{'Сохранить'}</Button>
        </form>



        {/*{avatar && <img src={avatar} alt="user avatar" style={{maxWidth: 150, maxHeight: 150}}/>}*/}
    </div>

}

