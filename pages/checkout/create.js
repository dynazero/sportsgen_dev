import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link'
import axios from 'axios';
import { authOptions } from '../api/auth/[...nextauth]'
import { getServerSession } from "next-auth/next"
import { useSession } from "next-auth/react"
import { useRouter } from 'next/router';
import { MotionConfig, motion } from 'framer-motion';
import InputDropdownRow from '../../components/inputDropdownRow';
import CustomDatePicker from '../../components/CustomDatePicker';
import CustomDateRangePicker from '../../components/CustomDateRangePicker';
import { toast } from "react-toastify";

const Createevent = () => {
    const { data: session } = useSession()
    
    const router = useRouter();
    const MotionLink = motion(Link)
    const [rows, setRows] = useState([]);
    const [eventName, setEventName] = useState('');
    const [eventType, setEventType] = useState('Tournament');
    const [eventStatus, setEventStatus] = useState('active');
    const [registeredEmail, setRegisteredEmail] = useState(session.user.email);

    const [flag, setFlag] = useState('PH');
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [resetDatePicker, setResetDatePicker] = useState(false);

    const [city, setCity] = useState('');
    const [cityErrorMessage, setCityErrorMessage] = useState("");

    const [address, setAddress] = useState('');
    const [addressErrorMessage, setAddressErrorMessage] = useState('');
    const fileInputRef = useRef();
    const [image, setImage] = useState(null);
    const [entryFee, setEntryFee] = useState('');
    const [entryFeeErrorMessage, setEntryFeeErrorMessage] = useState('');

    const [categories, setCategories] = useState([]);
    const [filteredCategories, setFilteredCategories] = useState([]);
    const [excludedCategories, setExcludedCategories] = useState([]);
    const [defaultCategory, setDefaultCategory] = useState([]);
    const [resetDefaultCategory, setResetDefaultCategory] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState('');

    const [selectedCategories, setSelectedCategories] = useState([]);
    const [resetDropdown, setResetDropdown] = useState(false);
    const [duplicates, setDuplicates] = useState(false)

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const { data } = await axios.get("/api/getEventCategory")
                setCategories(data.data)
                setFilteredCategories(data.data)
            } catch (error) {
                console.error(error)
            }
        }

        fetchCategories()
    }, [])

    useEffect(() => {
        if (resetDefaultCategory) {
          setSelectedCategory('');
          setResetDefaultCategory(false);
        }
      }, [resetDefaultCategory]);


    const checkSelectedCategories = (key, value) => {
        const categoryValue = parseInt(value)
        // console.log(key, categoryValue)

        if (selectedCategories.length != 0) {
            setSelectedCategories((prevCategories) => {
                const existingObjectIndex = prevCategories.findIndex((item) => item.key === key);
                const existingValueIndex = prevCategories.findIndex((item) => item.value === categoryValue);

                if (existingValueIndex !== -1) {
                    toast.warning('Event already selected');  //todo
                    setDuplicates(true)
                } else {
                    // toast.success('Event Added!');
                    setDuplicates(false)
                }

                if (existingObjectIndex !== -1) {
                    // Update existing object
                    return prevCategories.map((item) =>
                        item.key === key ? { ...item, value: categoryValue } : item
                    );
                } else {
                    // Add new object
                    const newObject = { key: key, value: categoryValue };
                    return [...prevCategories, newObject];
                }
            });
        } else {
            setSelectedCategories([{
                key: key,
                value: categoryValue
            }])
        }
    }

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
                case 2:
                    setFlag(value);
                    break;
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


    const handleFormChange = (event, index, value, arrIndex = null) => {

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
                checkSelectedCategories(arrIndex, value)
                if (!excludedCategories.includes(value)) {
                    if (rows.length == 0) {
                        setExcludedCategories(value)
                        setFilteredCategories(categories.filter(category => category.key != value));
                    } else {
                        const newExcludedCategories = [...excludedCategories];
                        newExcludedCategories[arrIndex] = value;
                        setFilteredCategories(categories.filter(category => category.key != value && !excludedCategories.includes(category.key)));
                        setExcludedCategories(newExcludedCategories);
                    }
                }
                break;
            // case 0:
            //   text = "Today is Sunday";
            // break;
            // default:
            //   text = "Looking forward to the Weekend";
        }

    }



    const removeFromList = (keyValue) => {
        const indexToDelete = selectedCategories.findIndex(selected => selected.key === keyValue);
        const newSelectedCategories = [...selectedCategories]

        newSelectedCategories.splice(indexToDelete, 1)

        setSelectedCategories(newSelectedCategories)
    }


    const handleChange = (event, index) => {
        const newRows = [...rows];
        newRows[index].selectedValue = event.target.value;
        setRows(newRows);

        handleFormChange(event, 0, event.target.value, index + 1)

    };

    const handleDelete = (event, row, index) => {
        const keyValue = row + 1;

        const newRows = [...rows];
        const newSelectedCategories = [...selectedCategories]
        newRows.splice(row, 1);
        setRows(newRows);

        removeFromList(keyValue)

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

        if (!duplicates) {
            const formData = new FormData();
            formData.append('eventName', eventName);
            formData.append('eventType', eventType);
            formData.append('registeredEmail', registeredEmail);
            formData.append('flag', flag);
            formData.append('startDate', startDate);
            formData.append('endDate', endDate);
            formData.append('city', city);
            formData.append('address', address);
            formData.append('entryFee', entryFee);
            formData.append('image', image);
            formData.append('eventStatus', eventStatus);
            const categoryKeys = selectedCategories.map((category) => category.value);
            formData.append('categories', JSON.stringify(categoryKeys));
            


            // formData.append('categories', JSON.stringify(rows.map((row) => row.selectedValue)));

            // try {
            //     const { data } = await axios.post(`../api/createEvent`, formData);
            //     console.log(data);
            //     toast.success('Event created successfully!');
            // } catch (error) {
            //     console.error('Error during axios request', error);
            //     toast.error('Error creating event');
            // }
            const functionThatReturnPromise = axios.post(`../api/createEvent`, formData);
            toast.promise(
                functionThatReturnPromise,
                {
                    pending: 'Creating Event',
                    success: 'Event created successfully! 👌',
                    error: 'Error creating event 🤯'
                }
            ).then(
                (response) => {
                    if (response.status === 201) { // Check if the event was created successfully
                      // Clear the form
                      setEventName('');
                      setFlag('');
                      setStartDate('');
                      setEndDate('');
                      setResetDatePicker(!resetDatePicker);
                      setCity('');
                      setAddress('');
                      setEntryFee('');
                      setImage('');
                      fileInputRef.current.value = '';
                      setSelectedCategories([])
                      setRows([])
                      setResetDropdown(!resetDropdown);
                      setResetDefaultCategory(true);
                
                      // Navigate to another page (e.g., the home page)
                      setTimeout(() => {
                        router.push('/event');
                    }, 3000);
                    }
                  }
            ).catch((error) => {
                console.error('Error submitting form:', error);
              });

        } else {
            toast.warning('Duplicate Categories, Please check your choosen events');
        }

    };

    // console.log(selectedCategories)

    return (

        <div className='wrapperForm '>
            <div className='headerForm'>
                <h2 className="mb-3">Create Event</h2>
            </div>
            <div className='containerForm'>
                <div className="col-md-7 col-lg-8 mainForm">
                    <form onSubmit={SubmitHandler} className="needs-validation" noValidate="" >
                        <div className="row g-3">
                            <div className="container">
                                {/* <label htmlFor="firstName" className="form-label">Name of Event/Tournament</label> */}
                                <div className="row">
                                    <div className="col">
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
                                    <div className="col">
                                        <select
                                            className="form-select"
                                            id="flag"
                                            value={flag}
                                            // onChange={(e) => setCity(e.target.value)}
                                            onChange={(event) => handleFormChange(event, 2, event.target.value)}
                                            required
                                        >
                                            <option defaultValue="PH">Philippines</option>
                                            <option value={'JP'}>Japan</option>
                                            <option value={'SG'}>Singapore</option>
                                            <option value={'CN'}>China</option>
                                            <option value={'TW'}>Taiwan</option>
                                            <option value={'MY'}>Malaysia</option>

                                        </select>
                                        {/* <div className="invalid-feedback" style={{ display: cityErrorMessage ? 'block' : 'none' }}>
                                            {cityErrorMessage}

                                        </div> */}
                                    </div>
                                </div>

                            </div>
                            <div className="col-sm-6">

                            </div>
                            <CustomDateRangePicker onDateRangeChange={onDateRangeChange}  reset={resetDatePicker}  />

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

                            <div className="col-md-7">
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
                                    <label htmlFor="uploadLogo" className="form-label">Add logo of the event</label>
                                    <input
                                        type="file"
                                        className="form-control"
                                        id="uploadlogo"
                                        placeholder=""
                                        ref={fileInputRef}
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
                                <select className="form-select" id="category"
                                value={selectedCategory}
                                    onChange={(event) => { 
                                            setSelectedCategory(event.target.value);
                                        handleFormChange(event, 0, event.target.value, 0)
                                    }}
                                    required>
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
                                    handleDelete={() => handleDelete(row, index)}
                                    reset={resetDropdown}
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
            </div>
        </div>
    )
}

export default Createevent;


export async function getServerSideProps(context) {
    const session = await getServerSession(context.req, context.res, authOptions)
  
    if (!session) {
      return {
        redirect: {
          destination: '/event/error',
          permanent: false,
        },
      }
    }
  
    return {
      props: {
        session,
      },
    }
  }