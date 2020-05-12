import React, {useEffect, useState} from "react";
import {Button, FormFeedback, FormGroup, Input, Label} from "reactstrap";
import MarkdownEditor from "client/components/markdown-editor/MarkdownEditor";


export default function AdminDivision(props) {
    const [list, setList] = useState([]);
    const [persons, setPersons] = useState([]);
    const [model, setModel] = useState({});
    const [errors, setErrors] = useState({});


    useEffect(() => {
        props.api('/person/list').then(r=>setPersons(r.list))
        getList();
    }, []);

    function getList() {
        props.api('/division/list').then(r=>setList(r.list))
    }

    function modelChange(m){
        setModel(m);
    }

    function create(form) {
        props.api('/admin/model/create', form)
            .then(model => {
                setModel(model);
                getList()
            })
    }

    function submit(e) {
        e.preventDefault();
        const form = props.formToObject(e.target);
        const err = {};
        //if (!form.name) err.name = 'Название обязательно';
        if (!form.name) err.name = 'Название обязательно';
        if (Object.keys(err).length) return setErrors(err);
        setErrors({});
        if (model.id) {
            props.api(`/admin/division/${model.id}/update`, form)
                .then(() => {
                    getList()
                })
        } else {
            create(form)
        }

    }

    function form(model) {
        return <form onSubmit={submit} key={model.id}>
            <Button>{model.id ? 'Сохранить' : 'Создать'}</Button>
            <FormGroup>
                <Label>Название</Label>
                <Input name="name" defaultValue={model.name} invalid={!!errors.name}/>
                <FormFeedback>{errors.name}</FormFeedback>
            </FormGroup>
            <FormGroup>
                <Label>Путь</Label>
                <Input name="path" defaultValue={model.path} invalid={!!errors.path}/>
                <FormFeedback>{errors.path}</FormFeedback>
            </FormGroup>
            <FormGroup>
                <Label>Руководитель</Label>
                <Input name="chief" defaultValue={model.chief} invalid={!!errors.chief} type="select">
                    <option></option>
                    {persons.map(p=><option value={p.id} key={p.id}>{p.fio}</option>)}
                </Input>
                <FormFeedback>{errors.name}</FormFeedback>
            </FormGroup>

            <FormGroup>
                <Label>Описание</Label>
                <MarkdownEditor
                    name="description"
                    value={model.description}
                />

            </FormGroup>
            <FormGroup check>
                <Label check>
                    <Input type="checkbox" name="noMenu" defaultChecked={model.noMenu}/>
                    Не показывать в меню
                </Label>

            </FormGroup>
            <Button>{model.id ? 'Сохранить' : 'Создать'}</Button>

        </form>
    }

    return <div className="row">
        <div className="col-4">
            <option className={!model.id ? 'selected' : ''} onClick={() => setModel({})}>Создать</option>
            {list.map(l => <option key={l.id} className={l.id === model.id ? 'selected' : ''} onClick={() => modelChange(l)}>{l.name || l.id}</option>)}
        </div>
        <div className="col-8">
            {form(model)}
            {model.persons && model.persons.map(p=><div key={p.id}>{p.fio}</div>)}
        </div>

    </div>
}
