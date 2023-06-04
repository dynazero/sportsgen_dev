import React, { useState, useEffect } from 'react'
import axios from 'axios';
import Link from 'next/link'
import { useSession } from "next-auth/react"
import { motion } from 'framer-motion'


export default function TeamProfile() {
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
        <Link href="/team/create">
            <motion.button
                className="btn btn-primary save-button"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                // onClick={ event => {modalClick(event, !modalOpen, true)}} 
                href="/"
                type="button"
                style={{ width: 120, backgroundColor: '#014bac', borderColor: '#014bac' }}
            >
                Create Team
            </motion.button>
            </Link>
            {/* <div className="row">
                <div className="col-6">.col-6</div>
                <div className="col-6">.col-6</div>
            </div> */}

            <div className="row ">



                <div className="col-6 p-3 mb-4 bg-light rounded-3 minW480">
                    <div className='p-5 panelDark rounded-3'>
                        <div className='container'>
                            <div className='row mx-auto' style={{ width: '350px' }}>
                                <div className="justify-content-md-center">
                                    <svg className="bd-placeholder-img rounded-circle" width="140" height="140" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: 140x140" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="#777"></rect><text x="50%" y="50%" fill="#777" dy=".3em">140x140</text></svg>

                                    <h2>My Team</h2>
                                    <p>Another exciting bit of representative placeholder content. This time, we've moved on to the second column.</p>
                                    <p><a className="btn btn-secondary" href="#">View details »</a></p>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-6">
                    <ul>
                        {categories.map((category) => (
                            <li key={category.key}>{category.title}</li>
                        ))}
                    </ul>

                </div>
            </div>

        </div>
    )
}
