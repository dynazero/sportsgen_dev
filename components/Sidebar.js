import React, { useState, useContext, useRef } from 'react'
import { signIn, signOut, useSession } from "next-auth/react"
import SidebarMenu from 'react-bootstrap-sidebar-menu';
import { motion } from 'framer-motion'
import { UIContext } from '../pages/dashboard/index'


export default function Sidebar() {

    let {
        changePassSBS,
        setPassPage,
        curPage,
    } = useContext(UIContext);

    const { data: session } = useSession()
    const myRefname = useRef(null);
    const [btnState, setBtnState] = useState(true)
    const [arrowOut, setArrowOut] = useState(
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-bar-right" viewBox="0 0 16 16">
            <path fillRule="evenodd" d="M6 8a.5.5 0 0 0 .5.5h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L12.293 7.5H6.5A.5.5 0 0 0 6 8Zm-2.5 7a.5.5 0 0 1-.5-.5v-13a.5.5 0 0 1 1 0v13a.5.5 0 0 1-.5.5Z" />
        </svg>
    )
    const [arrowIn, setArrowIn] = useState(
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-bar-left" viewBox="0 0 16 16">
            <path fillRule="evenodd" d="M12.5 15a.5.5 0 0 1-.5-.5v-13a.5.5 0 0 1 1 0v13a.5.5 0 0 1-.5.5ZM10 8a.5.5 0 0 1-.5.5H3.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L3.707 7.5H9.5a.5.5 0 0 1 .5.5Z" />
        </svg>
    )

    const [arrowToggle, setArrowToggle] = useState(btnState ? arrowIn : arrowOut)
    const [arrowPos, setArrowPos] = useState(btnState ? '230px' : '-10px')
    const [arrowSpeed, setArrowSpeed] = useState(btnState ? '.4s' : '.4s')


    const handleClick = () => {
        myRefname.current.click();
        setBtnState(btnState => !btnState)
        setArrowToggle(btnState ? arrowOut : arrowIn)
        setArrowPos(btnState ? '-10px' : '230px')
        setArrowSpeed(btnState ? '.4s' : '.4s')
        changePassSBS(!btnState)
    }


    return (
        <>
            <motion.button
                className='btn btn-light'
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleClick}
                href="/login"
                type="button"
                style={{
                    color: 'white',
                    backgroundColor: '#212529',
                    left: arrowPos,
                    position: 'absolute',
                    transition: arrowSpeed,
                    top: '50vh',
                    border: '0px',
                    zIndex: '10'
                }}
            >
                {arrowToggle}
            </motion.button>

            <SidebarMenu>
                <SidebarMenu.Collapse>
                    <SidebarMenu.Header>
                        <SidebarMenu.Toggle style={{ width: '20px', height: '20px', display: 'none', right: '0' }} ref={myRefname} />
                    </SidebarMenu.Header>
                    <div className='d-flex flex-column flex-shrink-0 p-3 text-white bg-dark sidebar' >
                        <a href='#' className='d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi me-2" viewBox="0 0 16 16">
                                <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4Zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10Z" />
                            </svg>
                            Welcome {session.user.name}
                        </a>
                        <hr />

                        <ul className='nav nav-pills flex-column mb-auto'>
                            <li className='sideList'>
                                <a href='#' className='nav-link text-white' onClick={event => { setPassPage("myteam") }} >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi me-2" viewBox="0 0 16 16">
                                        <path d="M5.072.56C6.157.265 7.31 0 8 0s1.843.265 2.928.56c1.11.3 2.229.655 2.887.87a1.54 1.54 0 0 1 1.044 1.262c.596 4.477-.787 7.795-2.465 9.99a11.775 11.775 0 0 1-2.517 2.453 7.159 7.159 0 0 1-1.048.625c-.28.132-.581.24-.829.24s-.548-.108-.829-.24a7.158 7.158 0 0 1-1.048-.625 11.777 11.777 0 0 1-2.517-2.453C1.928 10.487.545 7.169 1.141 2.692A1.54 1.54 0 0 1 2.185 1.43 62.456 62.456 0 0 1 5.072.56z" />
                                    </svg>
                                    My Team
                                </a>
                                <div className={curPage == 0 ? 'activeBar' : 'deactiveBar'}> </div>
                            </li>
                            <li className='sideList'>
                                <a href='#' className='nav-link text-white' onClick={event => { setPassPage("myathletes") }} >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi me-2" viewBox="0 0 16 16">
                                        <path d="M1.5 1a.5.5 0 0 0-.5.5v3a.5.5 0 0 1-1 0v-3A1.5 1.5 0 0 1 1.5 0h3a.5.5 0 0 1 0 1h-3zM11 .5a.5.5 0 0 1 .5-.5h3A1.5 1.5 0 0 1 16 1.5v3a.5.5 0 0 1-1 0v-3a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 1-.5-.5zM.5 11a.5.5 0 0 1 .5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 1 0 1h-3A1.5 1.5 0 0 1 0 14.5v-3a.5.5 0 0 1 .5-.5zm15 0a.5.5 0 0 1 .5.5v3a1.5 1.5 0 0 1-1.5 1.5h-3a.5.5 0 0 1 0-1h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 1 .5-.5z" />
                                        <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm8-9a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                                    </svg>
                                    My Athletes
                                </a>
                                <div className={curPage == 1 ? 'activeBar' : 'deactiveBar'}> </div>
                            </li>
                            <li className='sideList'>
                                <a href='#' className='nav-link text-white' onClick={event => { setPassPage("mycoaches") }} >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi me-2" viewBox="0 0 16 16">
                                        <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2zm4.5 0a.5.5 0 0 0 0 1h3a.5.5 0 0 0 0-1h-3zM8 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm5 2.755C12.146 12.825 10.623 12 8 12s-4.146.826-5 1.755V14a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-.245z" />
                                    </svg>
                                    My Coaches
                                </a>
                                <div className={curPage == 2 ? 'activeBar' : 'deactiveBar'}> </div>
                            </li>
                            <li className='sideList' >
                                <a href='#' className='nav-link text-white' onClick={event => { setPassPage("myofficials") }} >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi me-2" viewBox="0 0 16 16">
                                        <path d="M14 9.5a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm-6 5.7c0 .8.8.8.8.8h6.4s.8 0 .8-.8-.8-3.2-4-3.2-4 2.4-4 3.2Z" />
                                        <path d="M2 2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h5.243c.122-.326.295-.668.526-1H2a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v7.81c.353.23.656.496.91.783.059-.187.09-.386.09-.593V4a2 2 0 0 0-2-2H2Z" />
                                    </svg>
                                    My Officials
                                </a>
                                <div className={curPage == 3 ? 'activeBar' : 'deactiveBar'}> </div>
                            </li>
                        </ul>

                    </div>


                </SidebarMenu.Collapse>
            </SidebarMenu>
        </>

    )
}
