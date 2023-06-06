import React, { useState, useEffect } from 'react'
import axios from 'axios'
// import { useRouter } from 'next/router';
import { signIn, signOut, useSession, getSession } from "next-auth/react"
import Sidebar from '../../components/Sidebar'
import { authOptions } from '../api/auth/[...nextauth]'
import { getServerSession } from "next-auth/next"
import MyDashboard from '../../components/MyDashboard'
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';



export default function dashboard({ teamItem, verify, athletelist }) {
  // const router = useRouter()
  const [passSBS, setPassSBS] = useState(true)
  const [passPage, setPassPage] = useState('')
  const [curPage, setCurPage] = useState('')
  const [arrowV, setArrowV] = useState(false)


  useEffect(() => {
    if (!verify) {
      toast.success('Thank you for signing up, please proceed to your My Profile to complete your verification');

      setTimeout(() => {
        setArrowV(true)
      }, 3000);
    }

  }, [])
  // const { params = [] } = router.query

  const mDB = passSBS ? "280px" : "0px"
  const mWidth = passSBS ? "calc(100% - 280px)" : "100%"

  // console.log(verify)
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
        <MyDashboard passPage={passPage} setCurPage={setCurPage} teamItem={teamItem} athletelist={athletelist} verify={verify} />
      </div>

      {arrowV && (
        <div className="arrow">
          <span></span>
          <span></span>
          <span></span>
        </div>
      )}

      <ToastContainer />

    </div>
  )
}


export async function getServerSideProps(context) {
  const session = await getServerSession(context.req, context.res, authOptions)
  const nextAuthSession = await getSession(context);
  let teamItem = null;
  let verify = false;
  let athletelist = null;

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

    if (teamItem && teamItem.length > 0) {
      const athletes = await axios.get(`http://localhost:3000/api/getUserAthletes?team=${teamItem[0]._id}`);


      if (athletes.data) {

        athletelist = athletes.data.data.map((athlete, index) => {

          const sequence = index + 1;
          const region = 'sgp1';
          const profilePicture = athlete.profilePicture;
          const imageURL = `https://${process.env.DO_SPACES_BUCKET}.${region}.digitaloceanspaces.com/uploads/athletes/profile/${profilePicture}`;


          return {
            ...athlete,
            imageURL,
            sequence
          }
        })
      }
    }
    if (account.length == undefined) {
      verify = false;
    }

    if (account.data.data.length != 0) {
      verify = (account.data.data[0].profileStatus == 'verified' ? true : false)
    }


    // console.log(account.data, 'list')  

    // verifyUser = accountVerified.data.data.map(profile => {
    //   const verified = (profile.profileStatus == 'verified' ? true : false)

    //   return {
    //     verified
    //   }
    // });
    // console.log(account, 'test account')
  }
  // console.log(account, 'test verify')

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
      verify,
      athletelist
    },
  }
}
