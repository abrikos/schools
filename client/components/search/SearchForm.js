import React, {useEffect, useState} from "react";
import {Button, FormGroup, Input} from "reactstrap";
import {navigate} from "hookrouter";
import "./search-form.sass"
import SelectCheckbox from "client/components/select-checkbox/SelectCheckbox";

export default function SearchForm(props) {
    const [root, setRoot] = useState([]);
    const [category, setCategory] = useState([]);
    const [rubrics, setRubrics] = useState([]);
    const [options, setOptions] = useState([]);
    const [formOptions, setFormOptions] = useState({});
    const [formChanged, setFormChanged] = useState(false);
    const [filter, setFilter] = useState({where:{}});
    const [showInputs, setShowInputs] = useState({});

    useEffect(() => {
        props.api('/rubric', {type: 'root'}).then(r => {
            setRoot(r);
            if(!props.filter) return setShowInputs({root:true});
            setFilter(props.filter);
            if(props.filter.where.root) rootChanged({target: {value: props.filter.where.root}});
            if(props.filter.where.subcat) categoryChanged({target: {value: props.filter.where.subcat}});

        });
        //categoryChanged({target: {value: '5e5f41ba249fb4521401cf27'}})
    }, []);

    function rootChanged(e) {
        const parent = e.target.value;
        if (parent === '0') return setCategory([]);
        setFormChanged(true);

        props.api('/rubric', {parent})
            .then(items=>{
                setCategory(items);
                setShowInputs({root:true, subcat:true})
            });
    }

    function categoryChanged(e) {
        const parent = e.target.value;
        if (parent === '0') {
            setOptions([]);
            setRubrics([])
            return;
        }
        props.api('/rubric', {parent})
            .then(items => {
                props.api('/rubric/options', {ids: items.map(r => r.id)})
                    .then(setOptions)
                setRubrics(items)
                setShowInputs({root:true, subcat:true, rubric: true})
            });
    }

    async function submit(e) {
        e.preventDefault();
        const form = props.formToObject(e.target);
        form.options = formOptions
        //let buff = new Buffer(JSON.stringify(form));
        //let base64data = buff.toString('base64');
        let base64data = b64EncodeUnicode(JSON.stringify(form));
        navigate(`/search/${base64data}`)
        //props.onSubmit({where})
    }

    function b64EncodeUnicode(str) {
        // first we use encodeURIComponent to get percent-encoded UTF-8,
        // then we convert the percent encodings into raw bytes which
        // can be fed into btoa.
        return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g,
            function toSolidBytes(match, p1) {
                return String.fromCharCode('0x' + p1);
            }));
    }

    function handleMultiSelect(category, options) {
        const f = {...formOptions};
        f[category] = options;
        setFormOptions(f);
    }

    function clearForm(e) {
        e.target.form.reset()
        setOptions([]);
        setRubrics([]);
        setCategory([]);
        setFormChanged(false);
        //props.onSubmit({});
        return true;
    }


    return <div className="search-form">
        {/*{JSON.stringify(filter)}*/}
        <form onSubmit={submit}>
            <div className="row">
                <div className="col-md-10">
                    <FormGroup>
                        <Input name="text" placeholder="Введите текст" onChange={() => setFormChanged(true)} defaultValue={filter.where.text}/>
                    </FormGroup>
                    <div className="header">

                        {showInputs.root && <Input type="select" name="root" onChange={rootChanged} defaultValue={filter.where.root}>
                            <option value={0}>Категория</option>
                            {root.map(r => <option key={r.id} value={r.id}>{r.name}</option>)}
                        </Input>}


                        {showInputs.subcat && <Input type="select" name="subcat" onChange={categoryChanged} defaultValue={filter.where.subcat}>
                            <option value={0}>Подкатегория</option>
                            {category.map(r => <option key={r.id} value={r.id}>{r.name}</option>)}
                        </Input>}

                        {showInputs.rubric && <Input type="select" name="rubric" defaultValue={filter.where.rubric}>
                            <option value={0}>Рубрика</option>
                            {rubrics.filter(r => r.type === 'rubrics').map(r => <option key={r.id} value={r.id}>{r.name}</option>)}
                        </Input>}


                    </div>

                    <div className="options">
                        {rubrics.filter(r => r.type !== 'rubrics').map(r => <div key={r.id} className="option">
                            <SelectCheckbox
                                checked={filter.where.options && filter.where.options[r.id]}
                                name={`check-${r.id}`}
                                options={options.filter(p => p.parent === r.id).map(r => ({label: r.name, value: r.id}))}
                                placeholder={r.name}
                                onChange={items => handleMultiSelect(r.id, items)}
                            />

                        </div>)}
                        {!!rubrics.length && <div className="d-flex align-content-center justify-content-around">
                            <span>Цена</span>
                            <Input name="priceLo" placeholder="От" bsSize="sm" style={{width: '30%'}} type="number" defaultValue={filter.where.priceLo}/>
                            <Input name="priceHi" placeholder="До" bsSize="sm" style={{width: '30%'}} type="number" defaultValue={filter.where.priceHi}/>
                        </div>}
                    </div>
                </div>
                <div className="col-md-2">
                    <Button color="success">Искать</Button>
                    {formChanged && <Button color="warning" onClick={clearForm}>Отчистить</Button>}
                </div>
            </div>
        </form>
    </div>
}
