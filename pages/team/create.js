import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link'
import axios from 'axios';
import { authOptions } from '../api/auth/[...nextauth]'
import { getServerSession } from "next-auth/next"
import { useSession, getSession } from "next-auth/react"
import { useRouter } from 'next/router';
import { MotionConfig, motion } from 'framer-motion';
import { toast } from "react-toastify";

const CreateTeam = () => {
    const { data: session } = useSession()

    const router = useRouter();
    const MotionLink = motion(Link)
    const [registeredEmail, setRegisteredEmail] = useState(session.user.email);
    const [clubName, setClubName] = useState('');
    const [description, setDescription] = useState('');
    const [country, setCountry] = useState('PH');

    const fileInputRef = useRef();
    const [image, setImage] = useState(null);

    const handleFormChange = (event, index, value, arrIndex = null) => {

        switch (index) {
            case 1:
                setClubName(value);
                break;
            case 2:
                setCountry(value);
                break;
            case 3:
                setImage(value);
                break;
            case 4:
                setDescription(value);
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
        formData.append('registeredEmail', registeredEmail);
        formData.append('clubName', clubName);
        formData.append('country', country);
        formData.append('image', image);
        formData.append('description', description);


        const functionThatReturnPromise = axios.post(`../api/createTeam`, formData);
        toast.promise(
            functionThatReturnPromise,
            {
                pending: 'Creating Team',
                success: 'Team created successfully! 👌',
                error: 'Error creating team 🤯'
            }
        ).then(
            (response) => {
                if (response.status === 201) { // Check if the event was created successfully
                    // Clear the form
                    setClubName('');
                    setCountry('');
                    setDescription('');
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
                // that falls out of the range of 2xx
                console.error('Error submitting form:', error.response.data.message);
                if (error.response.data.message = 'You already registered a Team') {
                    toast.warning('You cannot register another team, please edit your exiting one');
                }
                if (error.response.data.message = 'Team already exists') {
                    toast.warning('Please try another Club Name');
                }
                console.error('HTTP status code:', error.response.status);
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
                <h2 className="mb-3">Create Club</h2>
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
                                        <label htmlFor="clubName" className="form-label">Team Name</label>

                                        <input
                                            type="text"
                                            className="form-control"
                                            id="clubName"
                                            placeholder="Name of your Team"
                                            value={clubName}
                                            onChange={(event) => handleFormChange(event, 1, event.target.value)}
                                            required
                                        />
                                        <div className="invalid-feedback">
                                            Valid Team name is required.
                                        </div>
                                    </div>
                                    <div className="col">
                                        <label htmlFor="country" className="form-label">Country</label>

                                        <select
                                            className="form-select"
                                            id="country"
                                            value={country}
                                            // onChange={(e) => setCity(e.target.value)}
                                            onChange={(event) => handleFormChange(event, 2, event.target.value)}
                                            required
                                        >
                                            <option value='PH'>Philippines</option>
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

                            {/* <hr className="my-4" /> */}

                        </div>




                        <div className="my-3">

                            <div className='row'>
                                <div className="col-sm-6">
                                    <label htmlFor="uploadLogo" className="form-label">Add logo of your Team</label>
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

                                <div className="col-sm-6">
                                    <label htmlFor="description" className="form-label">Add a short description or quote</label>

                                    <input
                                        type="text"
                                        className="form-control"
                                        id="description"
                                        placeholder="description"
                                        value={description}
                                        onChange={(event) => handleFormChange(event, 4, event.target.value)}
                                        required
                                    />
                                    <div className="invalid-feedback">
                                        Valid Description is required.
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
            </div>
        </div>
    )
}

export default CreateTeam;


export async function getServerSideProps(context) {
    const isDev = process.env.NEXT_PUBLIC_APP_ENV === 'dev';
    const NEXT_PUBLIC_API_URL = isDev ? process.env.NEXT_PUBLIC_DEV_API_URL : process.env.NEXT_PUBLIC_NGROK_API_URL;

    const apiUrl = NEXT_PUBLIC_API_URL;
    const getTeamEndPoint = "/api/getUserTeam?registeredEmail="
    const session = await getServerSession(context.req, context.res, authOptions)
    const nextAuthSession = await getSession(context);
    let team = null;

    if (nextAuthSession) {
        const res = await axios.get(`${apiUrl}${getTeamEndPoint}${nextAuthSession.user.email}`);
        team = res.data.data
    }

    // console.log(team)

    if (!session || team.length != 0) {
        return {
            redirect: {
                destination: '/team/error',
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