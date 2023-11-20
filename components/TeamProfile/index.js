import { useState, useContext, useEffect } from 'react'
import { DashBoardDataContext } from '../../pages/dashboard/index'
import axios from 'axios';
import Link from 'next/link'
import { useSession } from "next-auth/react"
import { motion } from 'framer-motion'
import Image from 'next/image'
import styles from './teamprofile.module.css'
import ReactCountryFlag from 'react-country-flag';
import Create from './create'
import Members from './members'
import OrgOngoingEvents from './orgongoingevents';
import UpComingEvents from './upcomingevents';

export default function TeamProfile() {

    let {
        verifiedFromServer,
        teamItem,
        members,
        organizedUpcomingEvents,
        organizedOngoingEvents,
        upcomingEvents,
        archivedEvents,
        orgLiveTournaments,
        liveTournaments
    } = useContext(DashBoardDataContext);

    const { data: session } = useSession()
    const NEXT_PUBLIC_APP_ENV = process.env.NEXT_PUBLIC_APP_ENV;

    let NEXT_PUBLIC_NEXTAUTH_URL;

    switch (NEXT_PUBLIC_APP_ENV) {
        case 'dev':
            NEXT_PUBLIC_NEXTAUTH_URL = process.env.NEXT_PUBLIC_DEV_NEXTAUTH_URL;
            break;
        case 'test':
            NEXT_PUBLIC_NEXTAUTH_URL = process.env.NEXT_PUBLIC_NGROK_NEXTAUTH_URL;
            break;
        case 'production':
            NEXT_PUBLIC_NEXTAUTH_URL = process.env.NEXT_PUBLIC_NEXTAUTH_URL;
            break;
        default:
            console.error('Invalid environment specified in NEXT_PUBLIC_APP_ENV');
            break;
    }

    const [categories, setCategories] = useState([])

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const apiUrl = NEXT_PUBLIC_NEXTAUTH_URL;
                const { data } = await axios.get(`${apiUrl}/api/getEventCategory`)
                setCategories(data.data)
            } catch (error) {
                console.error(error)
            }
        }

        fetchCategories()
    }, [])


    return (
        <div className={`container ${styles.container}`}>
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

                <Create verifiedFromServer={verifiedFromServer} />

            }

            {teamItem && teamItem.length > 0 &&
                <>
                    <div className="row membersWidth ">



                        <div className={`col-6 p-3 mb-4 bg-light rounded-3 minW480 caret marginRight ${styles.topStyles}}`} >
                            <div className='p-5 panelDark rounded-3'>
                                <div className='container'>
                                    <div className={`row mx-auto ${styles.minWidth}`} >
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
                                            <p><a className="btn btn-secondary" href="#">Edit Details »</a></p>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-5 p-3 mb-4 bg-light rounded-3 minW480 caret">
                            <div className={`p-1 panelDark rounded-3 ${styles.heightWrapper}`}>
                                <UpComingEvents upcomingEvents={upcomingEvents} liveTournaments={liveTournaments} />
                            </div>
                        </div>
                    </div>

                    <div className="row membersWidth">
                        <div className={`col-8 p-3 mb-4 bg-light rounded-3 minW480 caret marginRight ${styles.botStyles} ${styles.overflowControl}`}>
                            <div className={`p-5 panelDark rounded-3 ${styles.heightWrapperMem}`}>
                                <Members members={members} />
                            </div>

                        </div>
                        <div className={`col-3 p-3 mb-4 bg-light rounded-3 caret ${styles.botStyles} ${styles.overflowControl}`}>
                            <div className={`panelDark rounded-3 ${styles.heightWrapperOrg}`}>
                                <OrgOngoingEvents
                                    organizedUpcomingEvents={organizedUpcomingEvents}
                                    organizedOngoingEvents={organizedOngoingEvents}
                                    archivedEvents={archivedEvents}
                                    orgLiveTournaments={orgLiveTournaments}
                                />
                            </div>

                        </div>
                    </div>

                </>
            }

        </div>
    )
}



