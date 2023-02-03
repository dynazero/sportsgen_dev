import React from 'react'
import Image from 'next/image'
import { useState } from 'react'
import Link from 'next/link'
import logo from '../public/bullsolo.png'
import navbarstyle from '../styles/Menu.module.css'
import { motion } from 'framer-motion'





export default function Menu({modalClick, modalOpen, panelSwitch, panelSide}) {

    

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <Link className="navbar-brand" href="/">
            <span>
              <Image src={logo} alt="bull logo" width={35} height={45} />
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
            {/* <form className="d-flex">
              <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
              <button className="btn btn-outline-success" type="submit">Search</button>
            </form> */}
           
              <ul className="navbar-nav mb-2 mb-lg-0">
                <li className={navbarstyle.button}>
                  <motion.button 
                  className="btn btn-primary save-button" 
                  whileHover={{ scale: 1.1 }} 
                  whileTap = {{ scale: 0.9 }} 
                  onClick={ event => {modalClick(event, !modalOpen, true)}} 
                  href="/login"  
                  type="button"
                  >
                    Login
                    </motion.button>
                    </li>

                <li className={navbarstyle.button}>
                  <motion.button 
                  className="btn btn-secondary save-button" 
                  whileHover={{ scale: 1.1 }} 
                  whileTap = {{ scale: 0.9 }} 
                  onClick={ event => {modalClick(event, !modalOpen, false)}}
                  href="/signup"  
                  type="button"
                  >
                    Sign Up
                    </motion.button>
                    </li>
                    
              </ul>
            
          </div>
        </div>
      </nav>
    </>
  )
}
