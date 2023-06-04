import React, { useState } from 'react'
import axios from 'axios'
// import { useRouter } from 'next/router';
import { signIn, signOut, useSession, getSession } from "next-auth/react"
import Sidebar from '../../components/Sidebar'
import { authOptions } from '../api/auth/[...nextauth]'
import { getServerSession } from "next-auth/next"
import MyDashboard from '../../components/MyDashboard'



export default function dashboard({ teamItem }) {
  // const router = useRouter()
  // const { params = [] } = router.query
  const [passSBS, setPassSBS] = useState(true)
  const [passPage, setPassPage] = useState('')
  const [curPage, setCurPage] = useState('')

  const mDB = passSBS ? "280px" : "0px"
  const mWidth = passSBS ? "calc(100% - 280px)" : "100%"

  // console.log(curPage)
  // console.log(passPage)

  // default return
  return (
    <div className='dashboard panelsBG'>
      <div className='sidebarWidth'>
        <Sidebar setPassSBS={setPassSBS} setPassPage={setPassPage} passPage={passPage} curPage={curPage} />
      </div>
      <div className='mainDashboard'
        style={{
          left: mDB,
          transition: ".4s",
          width: mWidth
        }}>
        <MyDashboard passPage={passPage} setCurPage={setCurPage} teamItem={teamItem} />
      </div>
    </div>
  )
}


export async function getServerSideProps(context) {
  const session = await getServerSession(context.req, context.res, authOptions)
  const nextAuthSession = await getSession(context);
  let teamItem = null;
  let verify = false;

  if (nextAuthSession) {
    const account = await axios.get(`http://localhost:3000/api/getProfile?email=${nextAuthSession.user.email}`);
    const team = await axios.get(`http://localhost:3000/api/getUserTeam?registeredEmail=${nextAuthSession.user.email}`);
    
    teamItem = team.data.data.map(team => {
      const region = 'sgp1';
      const logoURL = `https://${process.env.DO_SPACES_BUCKET}.${region}.digitaloceanspaces.com/teamLogos/${team.originalFileName}`;

      return {
        ...team,
        logoURL
      }
    });

    if (account.length == undefined) {
      verify = false;
    } 

    if (account.length != undefined) {
      verify = (account.data.data[0].profileStatus == verified ? true : false)
    } 

    
    // console.log(account, 'test')
    // verifyUser = accountVerified.data.data.map(profile => {
    //   const verified = (profile.profileStatus == 'verified' ? true : false)

    //   return {
    //     verified
    //   }
    // });
  }

  if (!session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  return {
    props: {
      session,
      teamItem,
      verify
    },
  }
}
