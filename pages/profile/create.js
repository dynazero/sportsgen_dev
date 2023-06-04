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

const CreateProfile = () => {
    const { data: session } = useSession()

    const router = useRouter();
    const MotionLink = motion(Link)
    const [email, setEmail] = useState(session.user.email);
    const [fname, setFName] = useState("");
    const [lname, setLName] = useState("");
    const [profileStatus, setProfileStatus] = useState('verified');

    const fileInputRef = useRef();
    const [image, setImage] = useState(null);

    const handleFormChange = (event, index, value, arrIndex = null) => {

        switch (index) {
            case 1:
                setFName(value);
                break;
            case 2:
                setLName(value);
                break;
            case 3:
                setImage(value);
                break;
            case 4:
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
        formData.append('email', email);
        formData.append('fname', fname);
        formData.append('lname', lname);
        formData.append('profileStatus', profileStatus);
        formData.append('image', image);


        const functionThatReturnPromise = axios.post(`../api/createProfile`, formData);
        toast.promise(
            functionThatReturnPromise,
            {
                pending: 'Creating Profile',
                success: 'Profile saved successfully! 👌',
                error: 'Error creating profile 🤯'
            }
        ).then(
            (response) => {
                if (response.status === 201) { // Check if the profile was created successfully
                    // Clear the form
                    setFName('');
                    setLName('');
                    fileInputRef.current.value = '';

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

    // console.log(registeredEmail, clubName, country, image, description)

    return (

        <div className='wrapperForm'
            style={{
                justifyContent: 'flex-start',
                paddingTop: '20px'
            }}
        >
            <div className='headerForm'>
                <h2 className="mb-3">Fill in your profile</h2>
            </div>
            <div className='containerForm'
                style={{
                    height: '31vh',
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
                                <div className="col-sm-6">
                                    <label htmlFor="uploadLogo" className="form-label">Upload Government Issued ID for verification</label>
                                    <input
                                        type="file"
                                        className="form-control"
                                        id="uploadlogo"
                                        placeholder=""
                                        ref={fileInputRef}
                                        // onChange={(e) => setImage(e.target.files[0])}
                                        onChange={(event) => handleFormChange(event, 3, event.target.files[0])}
                                        required
                                    />
                                    <div className="invalid-feedback">
                                        Please upload only valid format
                                    </div>
                                </div>


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

export default CreateProfile;


export async function getServerSideProps(context) {
    const session = await getServerSession(context.req, context.res, authOptions)
    const nextAuthSession = await getSession(context);
    let profile = null;

    if (nextAuthSession) {
        try {
            const res = await axios.get(`http://localhost:3000/api/getProfile?email=${nextAuthSession.user.email}`);
            profile = res.data.data
        } catch (error) {
            console.error('API request failed:', error);
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                // http.ClientRequest in node.js
                console.log(error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log('Error', error.message);
            }
        }
    }

    console.log(profile)

    if (!session) {
        return {
            redirect: {
                destination: '/profile/error',
                permanent: false,
            },
        }
    }

    if (profile.length != 0) {
        return {
            redirect: {
                destination: '/profile/edit',
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