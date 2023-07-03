import React from 'react'
import styles from './tournament.module.css'
import Link from 'next/link'
import Header from '../../components/Tournament/header'


function Index() {
  return (
    <div className={`wrapperForm caret ${styles.wrapperFormStyle}`}>
      <div className='headerForm'>
        <h2 className="mb-3">Tournament</h2>
      </div>
      <div className={`${styles.containerform}`}>
        <div className="col-md-7 col-lg-8 mainForm">
          <div className="row g-3">
            <Header />

            <div className="container">
              <div className="row">
                <ul className="nav nav-tabs">
                  <li className="nav-item">
                    <Link className="nav-link active" aria-current="page" href="#">
                      Bracket
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" href="/tournament/standings/2890121" tabIndex="-1">
                      Standings
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" href="/tournament/participants/2890121" tabIndex="-1" aria-disabled="true">
                      Participants
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link disabled" href="/tournament/logs/2890121" tabIndex="-1">Log</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link disabled" href="/tournament/settings/2890121" tabIndex="-1" aria-disabled="true">
                      Settings
                    </Link>
                  </li>
                </ul>

              </div>
            </div>

          </div>
          <div className="col-sm-6">
            Index
          </div>

          {/* <hr className="my-4" /> */}

        </div>
      </div>
    </div >

  )
}

export default Index