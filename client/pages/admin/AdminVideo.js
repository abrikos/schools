import React, {useEffect, useState} from "react";
import {Button, FormFeedback, FormGroup, Input, Label} from "reactstrap";
import {A, navigate} from "hookrouter"
import Pager from "client/components/Pager";
import MarkdownEditor from "client/components/markdown-editor/MarkdownEditor";
import VideoPlay from "client/components/VideoPlay";

export default function AdminVideo(props) {
    const [model, setModel] = useState();
    const [models, setModels] = useState([]);
    const [errors, setErrors] = useState({});
    const [totalCount, setTotalCount] = useState(0);
    const filter = {where: {uid: {$ne: null}}, limit: 2}

    useEffect(() => {
        getList(filter)
        if (props.id) props.api('/video/' + props.id).then(setModel)
    }, [props.id])

    function getList(f) {
        props.api('/video/list', f)
            .then(res=>{
                setTotalCount(res.count);
                setModels(res.list)
                console.log(res)
            })
    }

    function deleteVideo() {
        if(!model.id) return;
        props.api(`/admin/video/${model.id}/delete`)
            .then(()=> {
                navigate('/admin/video');
                setModel(null)
            })
    }

    function create(e) {
        e.preventDefault();
        const form = props.formToObject(e.target);
        const err = {};
        //if (!form.name) err.name = 'Название обязательно';
        if (!form.link.match(/v=(.*)/)) err.link = 'Принимаются только сылки YouTube';
        //if (!form.rank) err.rank = 'Звание';
        //if (!form.status) err.status = 'Должность';
        if (Object.keys(err).length) return setErrors(err);
        setErrors({});
        props.api('/admin/video/create', form)
            .then(model => {
                navigate(`/admin/video/update/${model.id}`);
            })
    }

    return <div className="row">
        <div className="col-4">
            <form onSubmit={create}>
                <FormGroup>
                    <Label>Ссылка</Label>
                    <Input name="link" placeholder="Введите ссылку на YouTube" invalid={!!errors.link}/>
                    <FormFeedback>{errors.link}</FormFeedback>
                </FormGroup>
            <Button>Создать</Button>
            </form>
            {models.map(m => <div key={m.id} className={m.id===props.id ? 'bg-success':''}><A href={`/admin/video/update/${m.id}`}>{m.name}</A></div>)}
            {filter && !!totalCount && <Pager count={totalCount} filter={filter} onPageChange={getList}/>}
        </div>
        {model && <div className="col-8">
            <Input disabled={true} value={model.link}/>
            <h1>{model.name}</h1>
            {model.text}
            <VideoPlay video={model}/>
            <Button onClick={deleteVideo} color="danger">Удалить</Button>
        </div>}


    </div>

}
