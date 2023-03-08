import React from 'react'
import Image from 'next/image'
import { signIn, signOut, useSession } from "next-auth/react"
import Link from 'next/link'
import logo from '../public/sportsgenph_Text_vector.png'
import googlelogo from '../public/images/google.png'
import navbarstyle from '../styles/Menu.module.css'
import { motion } from 'framer-motion'
import { bottom } from '@popperjs/core'





export default function Menu({ modalClick, modalOpen, panelSwitch, panelSide }) {

  const { data: session } = useSession()

  return (
    <>
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <Link className="navbar-brand" href="/">
            <span>
              <Image src={logo} alt="sportsgen logo" width={140} height={24} />
            </span>
          </Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" href="#">
                  <span className={navbarstyle.textcoloractive}>
                    Home
                  </span>
                </Link>
              </li>
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
                {/* <Link className="nav-link disabled" href="#" tabindex="-1" aria-disabled="true">Disabled</Link> */}
              </li>
            </ul>

            {!session && (
        <>
         <p  style={{marginBottom: 0}}> Login with your <Image src={googlelogo} alt="Google" width={24} height={24} />mail account </p>  <br />
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
                <motion.button
                  className="btn btn-primary save-button"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  // onClick={ event => {modalClick(event, !modalOpen, true)}} 
                  onClick={() => signOut()}
                  href="/login"
                  type="button"
                  style={{width: 92}}
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

