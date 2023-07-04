import React, { useEffect } from 'react'
import Image from 'next/image'
import { signIn, signOut, useSession } from "next-auth/react"
import { useVerified  } from '../context/verifiedContext'
import Link from 'next/link'
import logo from '../public/sportsgenph_Text_vector.png'
import googlelogo from '../public/images/google.png'
import navbarstyle from '../styles/Menu.module.css'
import { useRouter } from 'next/router';
import { motion } from 'framer-motion'
import { bottom } from '@popperjs/core'
import { toast } from "react-toastify";

export default function Menu({ modalClick, modalOpen, panelSwitch, panelSide }) {

  const { data: session } = useSession()
  const { isVerified } = useVerified();
  const router = useRouter();
  let timeout;


  useEffect(() => { 
    if(session){
      localStorage.setItem('email', session.user?.email)
    }
    
  }, [])
  const handleCreateEventClick = () => {
    clearTimeout(timeout);

    timeout = setTimeout(() => {
      if (isVerified) {
        router.push('/event/create');
      } else {
        toast.warning('Please proceed to my profile before creating an Event');
      }
    }, 300); // waits 300ms before executing
  };

  const handleSignOut = () => {

    
    localStorage.clear();

    signOut();
  }

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <Link className="navbar-brand" href="/">
            <span>
              <Image src={logo} alt="sportsgen logo" width={140} height={24} priority />
            </span>
          </Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              {session && (
                <li className="nav-item">
                  <Link href="/dashboard" className="nav-link active" aria-current="page">
                    <span className={navbarstyle.textcoloractive}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi me-2" viewBox="0 0 16 16">
                        <path d="M8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4.5a.5.5 0 0 0 .5-.5v-4h2v4a.5.5 0 0 0 .5.5H14a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146ZM2.5 14V7.707l5.5-5.5 5.5 5.5V14H10v-4a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5v4H2.5Z" />
                      </svg>
                      Dashboard
                    </span>
                  </Link>
                </li>
              )}
              <li className="nav-item">
                <Link className="nav-link" href="#">
                  <span className={navbarstyle.textcolor}>
                    Link
                  </span>
                </Link>
              </li>
              <li className="nav-item dropdown">
                <Link className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  <span className={navbarstyle.textcolor}>
                    FAQ&apos;s
                  </span>
                </Link>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li><Link className="dropdown-item" href="#"><span>How to register    </span>          </Link></li>
                  <li><Link className="dropdown-item" href="#"><span>How to create event</span>          </Link></li>
                  <li><hr className="dropdown-divider" /></li>
                  <li><Link className="dropdown-item" href="#"><span>Request for a club </span>           </Link></li>
                </ul>
              </li>
              <li className="nav-item">
                {/* <Link className="nav-link disabled" href="#" tabIndex="-1" aria-disabled="true">Disabled</Link> */}
              </li>
            </ul>

            {!session && (
              <>
                <p style={{ marginBottom: 0 }}> Login with your <Image src={googlelogo} alt="Google" width={24} height={24} />mail account </p>  <br />
                <ul className="navbar-nav mb-2 mb-lg-0">
                  <li className={navbarstyle.button}>
                    <motion.button
                      className="btn btn-primary save-button"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      // onClick={ event => {modalClick(event, !modalOpen, true)}} 
                      onClick={() => signIn()}
                      href="/login"
                      type="button"
                    >
                      Login
                    </motion.button>
                  </li>
                </ul>
              </>
            )}
            {session && (
              <>
                {/* Signed in as {session.user.name} <br />  */}
                <ul className="navbar-nav mb-2 mb-lg-0">

                  <li className={navbarstyle.button}>
                    <Link href="#" passHref onClick={(e) => e.preventDefault()}>
                      <motion.button onClick={handleCreateEventClick}
                        className="btn btn-dark save-button"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        type="button"
                        style={{ width: 150 }}
                      >

                        <span style={{ display: 'inline' }} >
                          Create Event
                        </span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi ms-2" viewBox="0 0 16 16">
                          <path d="M11 6.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1z" />
                          <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z" />
                        </svg>
                      </motion.button>
                    </Link>

                  </li>

                  <li className={navbarstyle.button}>
                    <Link href="/profile/create">
                      <motion.button
                        className="btn btn-dark save-button"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        type="button"
                        style={{ width: 130 }}
                      >

                        <span style={{ display: 'inline' }} >
                          My Profile
                        </span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" display={'inline'} fill="currentColor" className="bi ms-2" viewBox="0 0 16 16">
                          <path d="M9.405 1.05c-.413-1.4-2.397-1.4-2.81 0l-.1.34a1.464 1.464 0 0 1-2.105.872l-.31-.17c-1.283-.698-2.686.705-1.987 1.987l.169.311c.446.82.023 1.841-.872 2.105l-.34.1c-1.4.413-1.4 2.397 0 2.81l.34.1a1.464 1.464 0 0 1 .872 2.105l-.17.31c-.698 1.283.705 2.686 1.987 1.987l.311-.169a1.464 1.464 0 0 1 2.105.872l.1.34c.413 1.4 2.397 1.4 2.81 0l.1-.34a1.464 1.464 0 0 1 2.105-.872l.31.17c1.283.698 2.686-.705 1.987-1.987l-.169-.311a1.464 1.464 0 0 1 .872-2.105l.34-.1c1.4-.413 1.4-2.397 0-2.81l-.34-.1a1.464 1.464 0 0 1-.872-2.105l.17-.31c.698-1.283-.705-2.686-1.987-1.987l-.311.169a1.464 1.464 0 0 1-2.105-.872l-.1-.34zM8 10.93a2.929 2.929 0 1 1 0-5.86 2.929 2.929 0 0 1 0 5.858z" />
                        </svg>
                      </motion.button>
                    </Link>

                  </li>


                  <li className={navbarstyle.button}>
                    <motion.button
                      className="btn btn-primary save-button"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      // onClick={ event => {modalClick(event, !modalOpen, true)}} 
                      onClick={handleSignOut}
                      href="/"
                      type="button"
                      style={{ width: 92 }}
                    >
                      Sign out
                    </motion.button>
                  </li>
                </ul>
              </>
            )}
          </div>
        </div>
      </nav>

    </>
  )
}

