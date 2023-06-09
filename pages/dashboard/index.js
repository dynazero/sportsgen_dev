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



export default function dashboard({ teamItem, verify, athletelist, coachlist, officiallist, members }) {
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
        <MyDashboard passPage={passPage} setCurPage={setCurPage} teamItem={teamItem} athletelist={athletelist} coachlist={coachlist} officiallist={officiallist} verify={verify} members={members} />
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
const fetchData = async (url, params) =>
  axios.get(url, { params }).then((response) => response.data.data || []);

const constructImageUrl = (bucket, region, path, fileName) =>
  `https://${bucket}.${region}.digitaloceanspaces.com/${path}/${fileName}`;

export async function getServerSideProps(context) {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const getProfileEndPoint = "/api/getProfile"
  const getTeamEndPoint = "/api/getUserTeam"
  const getAthleteEndPoint = "/api/getUserAthletes"
  const getCoachEndPoint = "/api/getUserCoaches"
  const getOfficialEndPoint = "/api/getUserOfficials"
  const session = await getServerSession(context.req, context.res, authOptions);

  if (!session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  const nextAuthSession = await getSession(context);

  if (!nextAuthSession) {
    return {
      props: { session },
    };
  }

  const email = nextAuthSession.user.email;
  const account = await fetchData(`${apiUrl}${getProfileEndPoint}`, { email });
  const team = await fetchData(`${apiUrl}${getTeamEndPoint}`, { registeredEmail: email });

  let teamItem = null;
  let verify = account.length > 0 && account[0].profileStatus === 'verified';
  let athletelist = [];
  let coachlist = [];
  let officiallist = [];
  let members = [];

  if (team.length > 0) {
    const teamId = team[0]._id;
    teamItem = team.map((team) => ({
      ...team,
      logoURL: constructImageUrl(
        process.env.DO_SPACES_BUCKET,
        'sgp1',
        'teamLogos',
        team.originalFileName
      ),
    }));

    const region = 'sgp1';

    athletelist = await fetchData(`${apiUrl}${getAthleteEndPoint}`, { team: teamId });
    athletelist = athletelist.map((athlete, index) => ({
      ...athlete,
      type: 'athlete',
      imageURL: constructImageUrl(
        process.env.DO_SPACES_BUCKET,
        region,
        'uploads/athletes/profile',
        athlete.profilePicture
      ),
      sequence: index + 1,
      identifier: 'Athlete',
    }));

    coachlist = await fetchData(`${apiUrl}${getCoachEndPoint}`, { team: teamId });
    coachlist = coachlist.map((coach, index) => ({
      ...coach,
      type: 'coach',
      imageDoc: constructImageUrl(
        process.env.DO_SPACES_BUCKET,
        region,
        'uploads/coaches/profile',
        coach.documentId
      ),
      sequence: index + 1,
      identifier: 'Coach',
    }));

    officiallist = await fetchData(`${apiUrl}${getOfficialEndPoint}`, { team: teamId });
    officiallist = officiallist.map((official, index) => ({
      ...official,
      type: 'official',
      imageDoc: constructImageUrl(
        process.env.DO_SPACES_BUCKET,
        region,
        'uploads/official/profile',
        official.documentId
      ),
      sequence: index + 1,
      identifier: 'Official',
    }));

    // Combine the lists into the members array
    members = [...athletelist, ...coachlist, ...officiallist];
  }

  return {
    props: {
      session,
      teamItem,
      verify,
      athletelist,
      coachlist,
      officiallist,
      members,
    },
  };
}

