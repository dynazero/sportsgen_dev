import React, { useState, useEffect } from 'react';
import Link from 'next/link'
import axios from 'axios';
import { MotionConfig, motion } from 'framer-motion';
import InputDropdownRow from '../../components/inputDropdownRow';
import CustomDatePicker from '../../components/CustomDatePicker';
import CustomDateRangePicker from '../../components/CustomDateRangePicker';
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Createevent = () => {
    const MotionLink = motion(Link)
    const [rows, setRows] = useState([]);
    const [eventName, setEventName] = useState('');
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    const [city, setCity] = useState('');
    const [cityErrorMessage, setCityErrorMessage] = useState("");

    const [barangay, setBarangay] = useState('');
    const [barangayErrorMessage, setBarangayErrorMessage] = useState("");

    const [zip, setZip] = useState('');
    const [zipErrorMessage, setZipErrorMessage] = useState('');

    const [address, setAddress] = useState('');
    const [addressErrorMessage, setAddressErrorMessage] = useState('');
    const [image, setImage] = useState(null);
    const [entryFee, setEntryFee] = useState('');
    const [entryFeeErrorMessage, setEntryFeeErrorMessage] = useState('');

    const [categories, setCategories] = useState([]);
    const [defaultCategory, setDefaultCategory] = useState([]);
    const [defaultCategoryErrorMessage, setDefaultCategoryErrorMessage] = useState('');
    const [availableCategories, setAvailableCategories] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const { data } = await axios.get("/api/getEventCategory")
                setCategories(data.data)
            } catch (error) {
                console.error(error)
            }
        }

        fetchCategories()
    }, [])


    const onDateRangeChange = (startDate, endDate) => {
        setStartDate(startDate);
        setEndDate(endDate);
    };

    const validateInput = (index, value) => {

        if (value === "Choose...") {
            switch (index) {
                // case 1:
                //     setEventName(value);
                //     break;
                // case 2:
                //     setStartDate(value);
                //     break;
                // case 3:
                //     setEndDate(value);
                //     break;
                case 4:
                    setCityErrorMessage(" Please Enter a valid Location.");
                    break;
                case 5:
                    setBarangayErrorMessage("Please provide a valid Barangay.");
                    break;
                // case 6:
                //     setZipErrorMessage(value);
                //     break;
                case 7:
                    setAddressErrorMessage(value);
                    break;
                // case 8:
                //     setImage(value);
                //     break;
                case 9:
                    setEntryFeeErrorMessage(value);
                    break;
                case 0:
                    setDefaultCategory(value);
                    break;
                // case 0:
                //   text = "Today is Sunday";
                // break;
                // default:
                //   text = "Looking forward to the Weekend";
            }

            return false;
        }
        // setCityErrorMessage("");
        // console.log('yourre good')

        switch (index) {
            // case 1:
            //     setEventName(value);
            //     break;
            // case 2:
            //     setStartDate(value);
            //     break;
            // case 3:
            //     setEndDate(value);
            //     break;
            case 4:
                setCityErrorMessage("");
                break;
            case 5:
                setBarangayErrorMessage("");
                break;
            // case 6:
            //     setZipErrorMessage(value);
            //     break;
            case 7:
                setAddressErrorMessage(value);
                break;
            // case 8:
            //     setImage(value);
            //     break;
            case 9:
                setEntryFeeErrorMessage(value);
                break;
            case 0:
                setDefaultCategory(value);
                break;
            // case 0:
            //   text = "Today is Sunday";
            // break;
            // default:
            //   text = "Looking forward to the Weekend";
        }
        return true;
    };


    const handleFormChange = (event, index, value) => {

        switch (index) {
            case 1:
                setEventName(value);
                break;
            // case 2:
            //     setStartDate(value);
            //     break;
            // case 3:
            //     setEndDate(value);
            //     break;
            case 4:
                if (!validateInput(index, value)) {
                    setCity('');
                    break;
                }
                setCity(value);
                break;
            case 5:
                if (!validateInput(index, value)) {
                    setBarangay('');
                    break;
                }
                setBarangay(value);
                break;
            case 6:
                setZip(value);
                break;
            case 7:
                setAddress(value);
                break;
            case 8:
                setImage(value);
                break;
            case 9:
                setEntryFee(value);
                break;
            case 0:
                setDefaultCategory(value);
                break;
            // case 0:
            //   text = "Today is Sunday";
            // break;
            // default:
            //   text = "Looking forward to the Weekend";
        }

    }





    const handleChange = (event, index) => {
        const newRows = [...rows];
        newRows[index].selectedValue = event.target.value;
        setRows(newRows);
    };

    const handleDelete = (index) => {
        const newRows = [...rows];
        newRows.splice(index, 1);
        setRows(newRows);
    };



    const handleAddRow = () => {
        setRows([
            ...rows,
            {
                options: categories.map((category) => ({
                    value: category.key,
                    label: category.title,
                })),
            },
        ]);
    };


    const SubmitHandler = async (e) => {
        e.preventDefault();

        // const config = {
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        // };

        const formData = new FormData();
        formData.append('eventName', eventName);
        formData.append('startDate', startDate);
        formData.append('endDate', endDate);
        formData.append('city', city);
        formData.append('barangay', barangay);
        formData.append('zip', zip);
        formData.append('address', address);
        formData.append('entryFee', entryFee);
        formData.append('image', image);
        // formData.append('categories', JSON.stringify(rows.map((row) => row.selectedValue)));

        try {
            const { data } = await axios.post(`../api/createEvent`, formData, config);
            console.log(data);
            toast.success('Event created successfully!');
        } catch (error) {
            console.error('Error during axios request', error);
            toast.error('Error creating event');
        }
    };


    console.log(eventName)
    console.log(startDate)
    console.log(endDate)
    console.log(city)
    console.log(barangay)
    console.log(zip)
    console.log(address)
    console.log(image)
    // console.log(availableCategories)
    // console.log(categories)
    console.log(entryFee)

    return (

        <div className='wrapperForm '>
            <div className='headerForm'>
                <h2 className="mb-3">Create Event</h2>
            </div>
            <div className='containerForm'>
                <div className="col-md-7 col-lg-8 mainForm">
                    <form onSubmit={SubmitHandler} className="needs-validation" noValidate="" >
                        <div className="row g-3">
                            <div className="col-sm-6">
                                {/* <label htmlFor="firstName" className="form-label">Name of Event/Tournament</label> */}
                                <input
                                    type="text"
                                    className="form-control"
                                    id="eventName"
                                    placeholder="Name of Event/Tournament"
                                    value={eventName}
                                    onChange={(event) => handleFormChange(event, 1, event.target.value)}
                                    required
                                />
                                <div className="invalid-feedback">
                                    Valid Event/Tournament name is required.
                                </div>
                            </div>
                            <div className="col-sm-6">

                            </div>
                            <CustomDateRangePicker onDateRangeChange={onDateRangeChange} />

                            <div className="col-sm-6" style={{ zIndex: '4' }}>


                            </div>

                            <hr className="my-4" />
                            <h4 className="mb-3">Location</h4>

                            <div className="col-md-5">
                                <label htmlFor="country" className="form-label" >City</label>
                                <select
                                    className="form-select"
                                    id="city"
                                    value={city}
                                    // onChange={(e) => setCity(e.target.value)}
                                    onChange={(event) => handleFormChange(event, 4, event.target.value)}
                                    required
                                >
                                    <option defaultValue="">Choose...</option>
                                    <option>Mandaluyong</option>
                                    <option>Pasig</option>
                                    <option>Manila</option>
                                    <option>Marikina</option>
                                    <option>San Juan</option>
                                    <option>Taguig</option>

                                </select>
                                <div className="invalid-feedback" style={{ display: cityErrorMessage ? 'block' : 'none' }}>
                                    {cityErrorMessage}

                                </div>
                            </div>

                            <div className="col-md-4">
                                <label htmlFor="state" className="form-label">State/Barangay</label>
                                <select
                                    className="form-select"
                                    id="barangay"
                                    value={barangay}
                                    // onChange={(e) => setBarangay(e.target.value)}
                                    onChange={(event) => handleFormChange(event, 5, event.target.value)}

                                    required
                                >
                                    <option defaultValue="">Choose...</option>
                                    <option>1016</option>
                                    <option>630</option>
                                    <option>1550</option>
                                </select>
                                <div className="invalid-feedback" style={{ display: barangayErrorMessage ? 'block' : 'none' }}>
                                    {barangayErrorMessage}
                                </div>
                            </div>

                            <div className="col-md-3">
                                <label htmlFor="zip" className="form-label">Zip</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="zip"
                                    placeholder=""
                                    value={zip}
                                    onChange={(event) => handleFormChange(event, 6, event.target.value)}
                                    required
                                />
                                <div className="invalid-feedback">
                                    Zip code required.
                                </div>
                            </div>

                            <div className="col-12">
                                <label htmlFor="username" className="form-label">Exact Address</label>
                                <div className="input-group has-validation">
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="Address"
                                        placeholder=""
                                        value={address}
                                        onChange={(event) => handleFormChange(event, 7, event.target.value)}
                                        required
                                    />
                                    <div className="invalid-feedback">
                                        Event Address is required.
                                    </div>
                                </div>
                            </div>


                        </div>



                        <hr className="my-4" />

                        <div className="my-3">

                            <div className='row'>
                                <div className="col-sm-6">
                                    <label htmlFor="uploadLogo" className="form-label">Add logo of your club</label>
                                    <input
                                        type="file"
                                        className="form-control"
                                        id="uploadlogo"
                                        placeholder=""
                                        // onChange={(e) => setImage(e.target.files[0])}
                                        onChange={(event) => handleFormChange(event, 8, event.target.files[0])}
                                        required
                                    />
                                    <small className="text-muted">optional</small>
                                    <div className="invalid-feedback">
                                        Please upload only valid format
                                    </div>
                                </div>


                                <div className='col-sm-6'>
                                    <label htmlFor="entryfee" className="form-label">Entry fee per category</label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        id="fee"
                                        placeholder=""
                                        value={entryFee}
                                        onChange={(event) => handleFormChange(event, 9, event.target.value)}
                                        required
                                    />
                                    <div className="invalid-feedback">
                                        Entry fee is required
                                    </div>
                                </div>
                            </div>
                        </div>


                        <div className="row categoryMargin">
                            <label htmlFor="category" className="form-label">Add Category</label>
                            <div className="col-1">

                                <button type="button" className="btn btn-primary form" onClick={handleAddRow}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-clipboard2-plus-fill" viewBox="0 0 16 16">
                                        <path d="M10 .5a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5.5.5 0 0 1-.5.5.5.5 0 0 0-.5.5V2a.5.5 0 0 0 .5.5h5A.5.5 0 0 0 11 2v-.5a.5.5 0 0 0-.5-.5.5.5 0 0 1-.5-.5Z" />
                                        <path d="M4.085 1H3.5A1.5 1.5 0 0 0 2 2.5v12A1.5 1.5 0 0 0 3.5 16h9a1.5 1.5 0 0 0 1.5-1.5v-12A1.5 1.5 0 0 0 12.5 1h-.585c.055.156.085.325.085.5V2a1.5 1.5 0 0 1-1.5 1.5h-5A1.5 1.5 0 0 1 4 2v-.5c0-.175.03-.344.085-.5ZM8.5 6.5V8H10a.5.5 0 0 1 0 1H8.5v1.5a.5.5 0 0 1-1 0V9H6a.5.5 0 0 1 0-1h1.5V6.5a.5.5 0 0 1 1 0Z" />
                                    </svg>

                                </button>

                            </div>
                            <div className="col-11">
                                <select className="form-select" id="category" required>
                                    <option defaultValue="">Choose...</option>
                                    {
                                        categories.map((category) => (
                                            <option key={'ctgry' + category.key} value={category.key}>{category.title}</option>
                                        ))
                                    }
                                </select>
                                <div className="invalid-feedback">
                                    Please Enter a valid Category.
                                </div>
                            </div>
                        </div>

                        <div>
                            {rows.map((row, index) => (
                                <InputDropdownRow
                                    key={index}
                                    options={row.options}
                                    selectedValue={row.selectedValue}
                                    handleChange={(event) => handleChange(event, index)}
                                    handleDelete={() => handleDelete(index)}
                                />
                            ))}

                        </div>

                        {/* <div className="col-11">
                        <select
                            className="form-select"
                            id="category"
                            value={categories[0] || ""}
                            onChange={(event) => handleChange(event, 0)}
                            required
                        >
                            <option defaultValue="">Choose...</option>
                            {availableCategories.map((category) => (
                                <option key={"ctgry" + category.key} value={category.key}>
                                    {category.title}
                                </option>
                            ))}
                        </select>
                        <div className="invalid-feedback">Please Enter a valid Category.</div>
                    </div> */}

                        <div className="row">
                            <div className="col-md-8"></div>
                            <div className="col-6 col-md-4 alignRight">
                                {/* <MotionLink type="submit" href="#" className="btn btn-primary submitCreate"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                            >

                                Create
                            </MotionLink> */}
                                <button className="w-100 btn btn-primary btn-lg" type="submit">Create</button>
                            </div>
                        </div>
                    </form>
                </div>
                <ToastContainer />
            </div>
        </div>
    )
}

export default Createevent;
