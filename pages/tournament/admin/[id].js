import React, { useState,useEffect } from 'react'
import axios from 'axios';
import styles from '../tournament.module.css'
import { getSession } from "next-auth/react"
import { getServerSession } from "next-auth/next"
import { authOptions } from '../../api/auth/[...nextauth]'
import Link from 'next/link'
import Header from '../../../components/Tournament/header'


function Index({ id, tournamentData }) {
  const [category, setCategory] = useState(tournamentData.categorySet[0].key);


  const handleCategoryChange = (event) => {
    setCategory(event);
  }


  return (
    <div className={`wrapperForm caret ${styles.wrapperFormStyle}`}>
      <div className='headerForm'>
        <h2 className="mb-3">Tournament</h2>
      </div>
      <div className={`${styles.containerform}`}>
        <div className="col-md-7 col-lg-8 mainForm">
          <div className="row g-3">
            <Header tournamentData={tournamentData} changeCategory={handleCategoryChange} category={category}/>

            <div className="container">
              <div className="row">
                <ul className="nav nav-tabs">
                  <li className="nav-item">
                    <Link className="nav-link active" aria-current="page" href="#">
                      Bracket
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" href={`/tournament/admin/standings/${tournamentData._id}/${category}`} tabIndex="-1">
                      Standings
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" href={`/tournament/admin/participants/${tournamentData._id}/${category}`} tabIndex="-1" aria-disabled="true">
                      Participants
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" href={`/tournament/admin/logs/${tournamentData._id}/${category}`} tabIndex="-1">Log</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" href={`/tournament/admin/settings/${tournamentData._id}/${category}`} tabIndex="-1" aria-disabled="true">
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
  const categorykey = context.params.categorykey;
  let tournamentData = null;
  const getTournamentEndPoint = "/api/getTournamentById?id=";
  const getEventCategoryEndPoint = "/api/getEventCategory"


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

      const tournamentReqData = tournamentReq.data.data

      if (tournamentReqData.organizerEmail != email) {
        console.error("Unauthorized");
        return null;
      }

      const eventStart = new Date(tournamentReqData.startDate);
      const eventStartMonth = eventStart.toLocaleString('default', { month: 'long' });
      const eventStartDay = eventStart.getDate();
      const eventStartYear = eventStart.getFullYear();
      const eventStartDate = `${eventStartMonth.charAt(0).toUpperCase() + eventStartMonth.slice(1)} ${eventStartDay}, ${eventStartYear}`;

      const eventEnd = new Date(tournamentReqData.endDate);
      const eventEndMonth = eventEnd.toLocaleString('default', { month: 'long' });
      const eventEndDay = eventEnd.getDate();
      const eventEndYear = eventEnd.getFullYear();
      const eventEndDate = `${eventEndMonth.charAt(0).toUpperCase() + eventEndMonth.slice(1)} ${eventEndDay}, ${eventEndYear}`;

      const categoriesRes = await axios.get(`${apiUrl}${getEventCategoryEndPoint}`);
      const categories = categoriesRes.data.data

      const categoryTitles = tournamentReqData.categories.map(catKey => {
        const cat = categories.find(category => category.key === catKey);
        return cat ? cat.title : 'Unknown category';  // return 'Unknown category' if the category key was not found
      });

      const categorySet = tournamentReqData.categories.map(catKey => {
        const cat = categories.find(category => category.key === catKey);
        return cat ? {title: cat.title, key: cat.key} : {title: 'Unknown category', key: null};
      });
      

      const tournament = {
        ...tournamentReqData,
        eventStartDate,
        eventEndDate,
        categoryTitles,
        categorySet
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