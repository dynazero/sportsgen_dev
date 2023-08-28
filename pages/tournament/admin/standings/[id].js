import React from 'react'
import axios from 'axios';
import styles from '../../tournament.module.css'
import { getSession } from "next-auth/react"
import { getServerSession } from "next-auth/next"
import { authOptions } from '../../../api/auth/[...nextauth]'
import Link from 'next/link'
import Header from '../../../../components/Tournament/header'

function Standings({ id, tournamentData }) {
  return (
    <div>Loading...</div>
   )
 }

export default Standings

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

      const tournamentReqData = tournamentReq.data.data

      if (tournamentReqData.organizerEmail != email) {
        console.error("Unauthorized");
        return null;
      }

      const tournament = tournamentReqData.categories[0];

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
      redirect: {
        destination: `/tournament/admin/standings/${id}/${tournamentDataReq}`,
        permanent: false,
      },
    };
  }



  return {
    redirect: {
      destination: `/tournament/admin/standings/${id}`,
      permanent: false,
    },
  };
}