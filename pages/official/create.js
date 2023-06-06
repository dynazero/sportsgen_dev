import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link'
import axios from 'axios';
import { authOptions } from '../api/auth/[...nextauth]'
import { getServerSession } from "next-auth/next"
import { useSession, getSession } from "next-auth/react"
import { useRouter } from 'next/router';
import { MotionConfig, motion } from 'framer-motion';
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const CreateOfficial = ({ teamItem }) => {
    const { data: session } = useSession()

    const router = useRouter();
    const MotionLink = motion(Link)
    const [fname, setFName] = useState('');
    const [lname, setLName] = useState('');
    // const [email, setEmail] = useState('');
    const [profileStatus, setProfileStatus] = useState('verified');
    const [team, setTeam] = useState(teamItem[0]._id);
    // const [events, setEvents] = useState([]);

    // const fileInputRef = useRef();
    const fileInputRef1 = useRef();
    // const [image, setImage] = useState(null);
    const [image1, setImage1] = useState(null);

    const handleFormChange = (event, index, value, arrIndex = null) => {

        switch (index) {
            case 1:
                setFName(value);
                break;
            case 2:
                setLName(value);
                break;
            // case 3:
            //     setEmail(value);
            //     break;
            // case 4:
            //     setImage(value);
            //     break;
            case 5:
                setImage1(value);
                break;
            case 6:
                setProfileStatus(value);
                break;
            // case 0:
            //   text = "Today is Sunday";
            // break;
            // default:
            //   text = "Looking forward to the Weekend";
        }

    }


    const SubmitHandler = async (e) => {
        e.preventDefault();
        // if (!duplicates) {
        const formData = new FormData();
        formData.append('fname', fname);
        formData.append('lname', lname);
        // formData.append('email', email);
        formData.append('team', team);
        formData.append('profileStatus', profileStatus);
        // formData.append('image', image);
        formData.append('image1', image1);
        // formData.append('events', events);


        const functionThatReturnPromise = axios.post(`../api/createOfficial`, formData);
        toast.promise(
            functionThatReturnPromise,
            {
                pending: 'Creating Official',
                success: 'Official saved successfully! 👌',
                error: 'Error creating Official 🤯'
            }
        ).then(
            (response) => {
                if (response.status === 201) { // Check if the profile was created successfully
                    // Clear the form
                    setFName('');
                    setLName('');
                    // fileInputRef.current.value = '';
                    fileInputRef1.current.value = '';

                    // Navigate to another page (e.g., the home page)
                    setTimeout(() => {
                        router.push('/dashboard');
                    }, 3000);
                }
            }
        ).catch((error) => {
            if (error.response) {
                // The request was made and the server responded with a status code
                console.error('Error submitting form:', error.response.data.message);
            } else if (error.request) {
                // The request was made but no response was received
                console.error('No response received:', error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.error('Error', error.message);
            }
        });

        // } else {
        //     toast.warning('Please pick another Team Name, Team Name Taken');
        // }

    };

    // console.log(fname, lname, email, profileStatus, image, image1, titles  )

    return (

        <div className='wrapperForm'
            style={{
                justifyContent: 'flex-start',
                paddingTop: '20px'
            }}
        >
            <div className='headerForm'>
                <h2 className="mb-3">Fill in your Official profile</h2>
            </div>
            <div className='containerForm'
                style={{
                    height: '43vh',
                }}
            >
                <div className="col-md-7 col-lg-8 mainForm">
                    <form onSubmit={SubmitHandler} className="needs-validation" noValidate="" >
                        <div className="row g-3">
                            <div className="container">
                                {/* <label htmlFor="firstName" className="form-label">Name of Event/Tournament</label> */}
                                <div className="row">
                                    <div className="col">
                                        <label htmlFor="fname" className="form-label">First name</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="fname"
                                            placeholder="First Name"
                                            value={fname}
                                            onChange={(event) => handleFormChange(event, 1, event.target.value)}
                                            required
                                        />
                                        <div className="invalid-feedback">
                                            Valid First name is required.
                                        </div>
                                    </div>
                                    <div className="col">
                                        <label htmlFor="lName" className="form-label">Last name</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="lName"
                                            placeholder="Last Name"
                                            value={lname}
                                            onChange={(event) => handleFormChange(event, 2, event.target.value)}
                                            required
                                        />
                                        <div className="invalid-feedback">
                                            Valid Last name is required.
                                        </div>
                                    </div>
                                </div>

                            </div>
                            <div className="col-sm-6">

                            </div>

                            {/* <hr className="my-4" /> */}

                        </div>




                        <div className="my-3">

                            <div className='row'>
                                {/* <div className="col-sm-6">
                                    <label htmlFor="uploadLogo" className="form-label">Upload profile picture</label>
                                    <input
                                        type="file"
                                        className="form-control"
                                        id="uploadlogo"
                                        placeholder=""
                                        ref={fileInputRef}
                                        // onChange={(e) => setImage(e.target.files[0])}
                                        onChange={(event) => handleFormChange(event, 4, event.target.files[0])}
                                        required
                                    />
                                    <div className="invalid-feedback">
                                        Please upload only valid format
                                    </div>
                                </div> */}

                                <div className="col-sm-6">
                                    <label htmlFor="uploadLogo" className="form-label">Official ID</label>
                                    <input
                                        type="file"
                                        className="form-control"
                                        id="uploadlogo"
                                        placeholder=""
                                        ref={fileInputRef1}
                                        // onChange={(e) => setImage(e.target.files[0])}
                                        onChange={(event) => handleFormChange(event, 5, event.target.files[0])}
                                        required
                                    />
                                    <div className="invalid-feedback">
                                        Please upload only valid format
                                    </div>
                                </div>


                            </div>

                        </div>

                        <div className="my-3">
                            <div className='row'>
                                {/* <div className="col-sm-6">
                                    <label htmlFor="email" className="form-label">Email</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="email"
                                        placeholder="Email (optional)"
                                        value={email}
                                        onChange={(event) => handleFormChange(event, 3, event.target.value)}
                                        required
                                    />
                                    <div className="invalid-feedback">
                                        Please upload only valid format
                                    </div>
                                </div> */}

                               


                            </div>
                        </div>


                        <div className="row">

                            <div className="col-md-4"></div>
                            <div className="col-6 col-md-4 alignRight">

                                <Link className="w-100 btn btn-light  btn-lg" type="button" href="/dashboard">Cancel</Link>
                            </div>
                            <div className="col-6 col-md-4 alignRight">

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

export default CreateOfficial;


export async function getServerSideProps(context) {
    const session = await getServerSession(context.req, context.res, authOptions)
    const nextAuthSession = await getSession(context);
    let teamItem = null;


    if (nextAuthSession) {
        const team = await axios.get(`http://localhost:3000/api/getUserTeam?registeredEmail=${nextAuthSession.user.email}`);
        teamItem = team.data.data;
    }

    if (!session) {
        return {
            redirect: {
                destination: '/official/error',
                permanent: false,
            },
        }
    }

    return {
        props: {
            session,
            teamItem
        },
    }
}