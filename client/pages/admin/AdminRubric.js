import React, {useEffect, useState} from 'react';
import "client/pages/admin/admin.sass"
import {Button, Input} from "reactstrap";

export default function AdminRubric(props) {
    const [root, setRoot] = useState([]);
    const [rubric, setRubric] = useState({});
    const [option, setOption] = useState({});
    const [category, setCategory] = useState([]);
    const [types, setTypes] = useState([]);
    const [tariffs, setTariffs] = useState([]);
    const [price, setPrice] = useState(0);

    useEffect(() => {
        props.api('/rubric', {type: 'root'}).then(setRoot)
        props.api('/admin/tariff/list').then(setTariffs)
    }, []);

    function handleRootClick(obj) {
        props.api(`/rubric/${obj.id}/view`).then(setRubric);
        props.api('/rubric', {parent: obj.id}).then(setCategory);
        setOption(null)
        setTypes([])
    }

    function handleCategoryClick(obj) {
        setOption(obj);
        props.api('/rubric', {parent: obj.id}).then(setTypes)
    }

    function handleDefault(e, r) {
        props.api('/admin/rubric/set-default', {id: r.id, required: e.target.checked})
    }

    function priceChange(e) {
        setPrice(e.target.value)
    }

    function setRubricPrice(e) {
        e.preventDefault();
        const form = props.formToObject(e.target);
        props.api(`/admin/rubric/price`, form).then(setRubric)
    }

    function changeDelivery(e, r) {
        props.api('/admin/rubric/can-delivery/' + r.id, {checked: e.target.checked});
    }

    let options, rubrics;
    if(types){
        options = types.filter(r => r.type === 'options');
        rubrics = types.filter(r => r.type === 'rubrics');
    }
    return <div className="admin-rubric">
        <div className="row">

            <div className="col-4">
                <h3>Категории</h3>
                {root.map(r => <option key={r.id} value={r} onClick={() => handleRootClick(r)} className={r.id === rubric.id ? 'selected' : ''}>{r.name}</option>)}

            </div>

            {rubric.id && <div className="col-4">

                <h3>Установка цены</h3>
                <form onSubmit={setRubricPrice}>
                    <input type="hidden" name="id" value={rubric.id}/>
                    <div className="row">
                        <div className="col-8"><Input key={rubric.id} type="number" name="price" bsSize="sm" onChange={priceChange} defaultValue={rubric.price}/></div>
                        <div className="col-4"><Button size="sm">Установить</Button></div>
                    </div>
                </form>

                <table className="table-sm">
                    <thead>
                    <tr>
                        <th>Тариф</th>
                        <th>Множитель</th>
                        <th>Цена</th>
                    </tr>
                    </thead>
                    <tbody key={rubric.id}>
                    {tariffs.filter(l => l.name).map(l => <tr key={l.id}>
                        <td>{l.name}</td>
                        <td>{l.multiplier}</td>
                        <td>{(price || rubric.price || 0) * l.multiplier}</td>
                    </tr>)}
                    </tbody>
                </table>


            </div>}

            {rubric.id && <div className="col-4">
                <h3>Параметры</h3>
                {category.map(r => <option key={r.id} value={r.id} onClick={() => handleCategoryClick(r)} className={option && r.id === option.id ? 'selected' : ''}>{r.name}</option>)}
                {!!options.length && <div>
                    <h4>Обязательные для заполнения</h4>
                    {options.map(r => <div key={r.id} value={r.id}><input type="checkbox" checked={r.required} onChange={e => handleDefault(e, r)}/> {r.name}</div>)}
                </div>}
                {!!rubrics.length && <div>
                    <h4>Возможна доставка</h4>
                    {rubrics.map(r => <div key={r.id} value={r.id}><input type="checkbox" checked={r.canDelivery} onChange={e => changeDelivery(e, r)}/> {r.name}</div>)}
                </div>}
            </div>}


        </div>

    </div>
}
