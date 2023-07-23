import React from 'react'
import axios from 'axios';
import styles from '../tournament.module.css'
import { getSession } from "next-auth/react"
import { getServerSession } from "next-auth/next"
import { authOptions } from '../../api/auth/[...nextauth]'
import Link from 'next/link'
import Header from '../../../components/Tournament/header'


function Index({ id, tournamentData }) {

  console.log(tournamentData)
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

export default Index;

export async function getServerSideProps(context) {
  const NEXT_PUBLIC_APP_ENV = process.env.NEXT_PUBLIC_APP_ENV;

  let NEXT_PUBLIC_API_URL;

  switch (NEXT_PUBLIC_APP_ENV) {
    case 'dev':
      NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_DEV_API_URL;
      break;
    case 'test':
      NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_NGROK_API_URL;
      break;
    case 'production':
      NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL;
      break;
    default:
      console.error('Invalid environment specified in NEXT_PUBLIC_APP_ENV');
      break;
  }
  const apiUrl = NEXT_PUBLIC_API_URL;
  const session = await getServerSession(context.req, context.res, authOptions)
  const nextAuthSession = await getSession(context);
  const email = session?.user.email;
  const id = context.params.id;
  let tournamentData = null;
  const getTournamentEndPoint = "/api/getTournamentById?id=";

  if (!session) {
    return {
      redirect: {
        destination: '/tournament/error',
        permanent: false,
      },
    }
  }

  async function fetchTournamentData(id) {
    try {
      // const tournamentReq = "test"
      const tournamentReq = await axios.get(`${apiUrl}${getTournamentEndPoint}${id}`)

      if (!tournamentReq.data.data) {
        console.error("No data was found for the requested event ID");
        return null;
      }

      const tournament = tournamentReq.data.data

      if (tournament.organizerEmail != email) {
        console.error("Unauthorized");
        return null;
      }

      return tournament;

    } catch (error) {
      console.error("An error occurred while fetching the data:", error);
      // Optionally, return something to indicate an error occurred
      return null;
    }
  }


  if (nextAuthSession) {
    const tournamentDataReq = await fetchTournamentData(id)
    if (tournamentDataReq === null) {
      return {
        redirect: {
          destination: '/tournament/error',
          permanent: false,
        },
      }
    }

    return {
      props: {
        session,
        email,
        tournamentData: tournamentDataReq
      }
    }
  }



  return {
    props: {
      session,
      email,
    },
  };
}