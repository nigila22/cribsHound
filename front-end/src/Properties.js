import React, {  useState, useEffect } from 'react';
import Header from './Components/Header';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Popup from './Components/Popup';
import { fetchAllCribs, getCribById, createNewCrib, updateCrib, deleteCrib } from "./network/ApiAxios";


const Properties = () => {

    const [items, setItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isPopupOpen, setPopupOpen] = useState(false);
    const [popupImage, setPopupImage] = useState('');
    const [popupTitle, setPopupTitle] = useState('');
    const [popupLoc, setPopupLoc] = useState('');
    const [popupCribId, setPopupCribId] = useState('');
    const [setError, error] = useState('');
    const [isSubmitting, setSubmitting] = useState(true);
    const [searchString, setSearchString] = useState('');
    const [data, setData] = useState([]);
    const [btnTitle, setButtonTitle] = useState('');


    const validationSchema = Yup.object().shape({
        image_url: Yup.string().required('Image URL is required'),
        name: Yup.string().required('Name is required'),
        location: Yup.string().required('Location is required'),
    });
      
    const initialValues = {
        name: popupTitle,
        location: popupLoc,
        image_url: popupImage,
        id: popupCribId,
    };
      
  
    const getCrib = async (id) => {
        try {
            const response = await getCribById(id);
            if (response.data.status) {
                response.data.items.map(item => {
                  setPopupImage(item.img);
                  setPopupTitle(item.name);
                  setButtonTitle('Update')
                  setPopupLoc(item.location);
                  setPopupCribId(item._id);
                  setPopupOpen(true)
                });
            }else{
                setError(response.msg);
            }
        } catch (error) {
            console.error(error);
        }
    };
  
    const closePopup = () => {
        setPopupOpen(false);
        setPopupImage('');
        setPopupTitle('');
        setPopupLoc('');
        setPopupCribId('');
    };

    const openPopup = () => {
        setButtonTitle('Create')
        setPopupOpen(true);
    }
    const deleteCribFun = async (id) => {
        const response = await deleteCrib(id);
        if (response.data.status) {
            setData(response.data.items)
        }else{
            alert(response.data.msg)
        }
    }

    const handleSubmit = async (values, { setSubmitting }) => {
        setIsLoading(true);
        if(values.id){
                const response = await updateCrib(popupCribId, values);
                if(response.data.status){
                    setItems(response.data.items)
                    setData(response.data.items)
                    setPopupOpen(false)
                    setIsLoading(false);
                }
        }else{
            const response = await createNewCrib(values);
            if(response.data.status){
                setItems(response.data.items)
                setData(response.data.items)
                setPopupOpen(false)
                setIsLoading(false);
            }else{
                alert(response.data.msg)
                setIsLoading(false);

            }
            setSubmitting(false);
        }
        setError(true);
        setPopupOpen(false)
    };

    async function fetchData() {
        try {
            const response = await fetchAllCribs();
            setItems(response.data.items)
            setData(response.data.items)
            setIsLoading(false);

        } catch (error) {
            console.error(error);
        }
    }

    const handleChange = (e) => {
        setSearchString(e.target.value);
    };

    let _data = data;
    const search = searchString.trim().toLowerCase();

    if (search.length > 0) {
        _data = data.filter(function (item) {
            return (
                item.name.toLowerCase().includes(search)
            );
        });
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className='container'>
            <Header />
            <div>
                <div class="search-bar">
                    <input
                        type="text"
                        value={searchString}
                        onChange={handleChange}
                        placeholder="search anything"
                    />
                </div>
            </div>
            <section class="title-section">
                <div>
                    <p class="page-title">Cribs List</p>
                </div>
                <div>
                    <p onClick={() => openPopup()} class="createCrib">Add New</p>
                </div>
            </section>
            {isLoading ? <div className="spinner-container">
                <div className="loading-spinner">
                </div>
                </div> : <section class="cards">
                {items.length !== 0 ? 
                    _data.map((item, i) => (
                        <div className='cards_item' key={item._id}>
                        <div onClick={() => getCrib(item._id)} className="card_image">
                            <img src={item.img} alt={item.name}></img>
                        </div>
                        <div className="card_content">
                            <h1 onClick={() => getCrib(item._id)} className="card_title">{item.name}</h1>
                            <p onClick={() => getCrib(item._id)} className="card_text">{item.location}</p>
                            <button onClick={() => deleteCribFun(item._id)} className="delete-crib">Delete</button>
                        </div>
                        </div>
                    )) : 
                <p>No Data Found</p>} 
            </section> }
            {isPopupOpen ? <Popup isOpen={isPopupOpen} onClose={closePopup}>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ isSubmitting }) => (
                <Form class="form-crib">                  
                     <div class="form-control">
                        <label htmlFor="image_url">Image URL</label>
                        <Field type="image_url" name="image_url" />
                        <ErrorMessage class="form-error" name="image_url" component="div" />
                    </div>

                    <div class="form-control">
                    <label htmlFor="name">Name</label>
                    <Field type="text" name="name" />
                    <ErrorMessage class="form-error"  name="name" component="div" />
                    </div>
                    <Field type="hidden" name="id"  />
                    <div class="form-control">
                        <label htmlFor="location">Location</label>
                        <Field type="location" name="location" />
                        <ErrorMessage class="form-error"  name="location" component="div" />
                    </div>

                    <div class="form-control">
                    <button class="update-btn" type="submit" disabled={isSubmitting}>
                        {btnTitle}
                    </button>
                    </div>
                </Form>
                )}
            </Formik>
            </Popup>  : <></>}    
        </div>
    );
}

export default Properties;