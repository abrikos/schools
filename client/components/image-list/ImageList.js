import React, {useState} from "react";
import "./image-list.sass";
import {Button, Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";
import PropTypes from "prop-types";

ImageList.propTypes = {
    images: PropTypes.array.isRequired,
    editable: PropTypes.bool,
    controls: PropTypes.array,
    onDelete: PropTypes.func,
};


export default function ImageList(props) {
    const [deleted, setDeleted] = useState([]);
    const [modal, setModal] = useState(false);
    const [modalImage, setModalImage] = useState();
    const toggle = () => setModal(!modal);

    function deleteImage(img) {
        if(!window.confirm('Удалить изображение?')) return;
        props.api('/image/delete/'+img.id)
            .then(() => {
                const del = [...deleted];
                del.push(img.id);
                setDeleted(del);
                if(props.onDelete) props.onDelete()
            })
    }


    function showImage(img) {
        setModalImage(img.path);
        toggle();
    }

    if(!props.images) return <div/>;
    return <div className="image-list">
        {props.images.filter(img => !deleted.includes(img.id)).map((img, i) => <div key={i} className="image-cell">
            <div className="img-tools">
                {props.controls}
                {props.editable  && img.id && props.setPreview &&  <Button size="sm" color="success" onClick={() => props.setPreview(img)}>👁</Button>}
                {props.editable  && img.id && <Button size="sm" color="danger" onClick={() => deleteImage(img)}>🗑</Button>}

            </div>
            <div className="img-container">
                {img.error ?
                    <small>
                        <div className="error">{img.error}</div>
                        <strong>{img.file.name}</strong> <br/> <small className="error">{(img.file.size / 1024 / 1024).toFixed(1)} Mb</small> </small>
                    :
                    <img src={img.path || img} alt={img.path} onClick={() => showImage(img)}/>}
            </div>
        </div>)}
        <Modal isOpen={modal} toggle={toggle} backdrop={true} keyboard={true}>
            <ModalHeader toggle={toggle}></ModalHeader>
            <ModalBody>
                <img src={modalImage} alt={'Full'} className="full-image"/>
            </ModalBody>
            <ModalFooter>
                <Button color="secondary" onClick={toggle}>Закрыть</Button>
            </ModalFooter>
        </Modal>
    </div>

}
