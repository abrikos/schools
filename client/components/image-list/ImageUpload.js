import React, {useState} from "react";
import ImageList from "client/components/image-list/ImageList";
import Loader from "client/components/Loader";
import PropTypes from "prop-types";

ImageUpload.propTypes = {
    uploadDone: PropTypes.func.isRequired
};

export default function ImageUpload(props) {
    //const [imagesUploaded, setImagesUploaded] = useState([]);
    const [imagesDeclined, setImagesDeclined] = useState([]);
    const [loader, setLoader] = useState(false);
    const tokens = props.tokens;

    async function _handleImageChange(e) {
        setLoader(true)
        e.preventDefault();
        const uploaded = [];
        const declined = [];
        for (const file of e.target.files) {
            /*let reader = new FileReader();
            reader.onloadend = () => {

                console.log(1,items)
                items.push(reader.result);
                //setImagesUploaded(ims);
            };*/
            const formData = new FormData();
            formData.append('image', file);
            formData.append('tokens', tokens);
            try {
                const image = await props.api('/image/upload/', formData);
                uploaded.push(image);
            } catch (e) {
                declined.push({error: e.message, file})
                //reader.readAsDataURL(file);
            }

        }
        if (uploaded.length && props.uploadDone) props.uploadDone(uploaded.map(i => i.id))
        //setImagesUploaded(uploaded);
        setImagesDeclined(declined);
        setLoader(false)
    }

    return <div>
        {loader ? <Loader/> : <input type="file" multiple={true} onChange={_handleImageChange}/>}
        {/*{!!imagesUploaded.length && <div>
            <h4>Загружено</h4>
            <ImageList images={imagesUploaded} editable={props.editable} {...props}/>
        </div>}*/}

        {!!imagesDeclined.length && <div>
            <h4>Отказано</h4>
            <ImageList images={imagesDeclined} {...props}/>
        </div>}

    </div>

}

