import React, { useState, useEffect } from 'react'
import axios from 'axios';
import Link from 'next/link'
import { useSession } from "next-auth/react"
import { motion } from 'framer-motion'
import Image from 'next/image'
import ReactCountryFlag from 'react-country-flag';
import Create from './create'



export default function TeamProfile({ teamItem, verify }) {
    const { data: session } = useSession()

    const [categories, setCategories] = useState([])

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const apiUrl = process.env.NEXT_PUBLIC_NEXTAUTH_URL;
                const { data } = await axios.get(`${apiUrl}/api/getEventCategory`)
                setCategories(data.data)
            } catch (error) {
                console.error(error)
            }
        }

        fetchCategories()
    }, [])


    return (
        <div className='container'>
            {(!teamItem || teamItem.length === 0) &&
                // <Link href="/team/create">
                //     <motion.button
                //         className="btn btn-primary save-button"
                //         whileHover={{ scale: 1.1 }}
                //         whileTap={{ scale: 0.9 }}
                //         // onClick={ event => {modalClick(event, !modalOpen, true)}} 
                //         href="/"
                //         type="button"
                //         style={{ width: 120, backgroundColor: '#014bac', borderColor: '#014bac' }}
                //     >
                //         Create Team
                //     </motion.button>
                // </Link>

            <Create verify={verify}/>

            }

            {teamItem && teamItem.length > 0 &&
                <div className="row ">



                    <div className="col-6 p-3 mb-4 bg-light rounded-3 minW480">
                        <div className='p-5 panelDark rounded-3'>
                            <div className='container'>
                                <div className='row mx-auto' style={{ width: '350px' }}>
                                    <div className="justify-content-md-center"
                                    style={{ display: 'grid' }}
                                    >
                                        <Image className="rounded-circle" src={teamItem[0].logoURL} alt='Team logo' width={120} height={120} priority />

                                        {/* <svg className="bd-placeholder-img rounded-circle" width="140" height="140" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: 140x140" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="#777"></rect><text x="50%" y="50%" fill="#777" dy=".3em">140x140</text>
                                        
                                        </svg> */}

                                        <h2>{teamItem[0].clubName}
                                        <ReactCountryFlag
                                            countryCode={teamItem[0].country}
                                            svg
                                            style={{
                                                width: '32px',
                                                height: '16px',
                                            }}
                                            title={teamItem[0].country}
                                        />
                                        </h2>
                                        <p>{teamItem[0].description}</p>
                                        <p><a className="btn btn-secondary" href="#">View details »</a></p>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            }
        </div>
    )
}



