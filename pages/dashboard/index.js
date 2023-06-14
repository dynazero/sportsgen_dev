import React, { useState, useEffect } from 'react'
import { useVerified } from '../verifiedContext';
import axios from 'axios'
// import { useRouter } from 'next/router';
import { signIn, signOut, useSession, getSession } from "next-auth/react"
import Sidebar from '../../components/Sidebar'
import { authOptions } from '../api/auth/[...nextauth]'
import { getServerSession } from "next-auth/next"
import MyDashboard from '../../components/MyDashboard'
import { toast } from "react-toastify";



export default function dashboard({ verifiedFromServer, teamItem, athletelist, coachlist, officiallist, members, teamId }) {
  // const router = useRouter()
  const { setIsVerified } = useVerified();
  const [passSBS, setPassSBS] = useState(true)
  const [passPage, setPassPage] = useState('')
  const [curPage, setCurPage] = useState('')
  const [arrowV, setArrowV] = useState(false)


  useEffect(() => {
    if (!verifiedFromServer) {
      toast.success('Thank you for signing up, please proceed to your My Profile to complete your verification');

      setTimeout(() => {
        setArrowV(true)
      }, 3000);
    }

    localStorage.setItem('teamId', JSON.stringify(teamId))

  }, [])
  // const { params = [] } = router.query

  const mDB = passSBS ? "280px" : "0px"
  const mWidth = passSBS ? "calc(100% - 280px)" : "100%"

  // console.log(teamId)
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
        <MyDashboard passPage={passPage} setCurPage={setCurPage} teamItem={teamItem} athletelist={athletelist} coachlist={coachlist} officiallist={officiallist} verifiedFromServer={verifiedFromServer} members={members} />
      </div>

      {arrowV && (
        <div className="arrow">
          <span></span>
          <span></span>
          <span></span>
        </div>
      )}


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
  let combinedSequenceCounter = 1;

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
  let teamId = null;
  let verifiedFromServer = account.length > 0 && account[0].profileStatus === 'verified' ? true : false;
  let athletelist = [];
  let coachlist = [];
  let officiallist = [];
  let members = [];

  if (team.length > 0) {
     teamId = team[0]._id;


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
      combinedSequence: combinedSequenceCounter++,
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
      combinedSequence: combinedSequenceCounter++,
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
      combinedSequence: combinedSequenceCounter++,
      identifier: 'Official',
    }));

    // Combine the lists into the members array
    members = [...athletelist, ...coachlist, ...officiallist];
  }

  return {
    props: {
      session,
      teamItem,
      verifiedFromServer,
      athletelist,
      coachlist,
      officiallist,
      members,
      teamId
    },
  };
}

