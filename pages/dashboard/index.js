import React, { useState, useEffect, Suspense } from 'react'
import dynamic from 'next/dynamic';
import { useVerified } from '../../context/verifiedContext';
import axios from 'axios'
// import { useRouter } from 'next/router';
import { signIn, signOut, useSession, getSession } from "next-auth/react"
import Sidebar from '../../components/Sidebar'
import { authOptions } from '../api/auth/[...nextauth]'
import { getServerSession } from "next-auth/next"
import { toast } from "react-toastify";

const MyDashboard = dynamic(() => import('../../components/MyDashboard'), { loading: () => <p>Loading...</p>});

export default function dashboard({
  verifiedFromServer,
  teamItem,
  athletelist,
  coachlist,
  officiallist,
  members,
  teamId,
  organizedUpcomingEvents,
  organizedOngoingEvents,
  upcomingEvents,
  archivedEvents,
  orgLiveTournaments,
  liveTournaments }) {
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

  useEffect(() => {
    const toUpdate = organizedOngoingEvents.filter(event => event.eventStatus === 'active')

    if (toUpdate.length === 0) return;

    toUpdate.forEach(async (event) => {
      try {
        await axios.put(`../../api/updateReadyEventStatus`, { eventId: event.eventId });
      } catch (error) {
        console.error("Failed to update event status", error);
      }
    });
  }, [organizedOngoingEvents]);


  useEffect(() => {
    setIsVerified(verifiedFromServer);
  }, [verifiedFromServer]);
  // const { params = [] } = router.query

  const mDB = passSBS ? "280px" : "0px"
  const mWidth = passSBS ? "calc(100% - 280px)" : "100%"

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
        
          <MyDashboard
            passPage={passPage}
            setCurPage={setCurPage}
            teamItem={teamItem}
            athletelist={athletelist}
            coachlist={coachlist}
            officiallist={officiallist}
            verifiedFromServer={verifiedFromServer}
            members={members}
            organizedUpcomingEvents={organizedUpcomingEvents}
            organizedOngoingEvents={organizedOngoingEvents}
            upcomingEvents={upcomingEvents}
            archivedEvents={archivedEvents}
            orgLiveTournaments={orgLiveTournaments}
            liveTournaments={liveTournaments}
          />
       
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

const calculateCountdown = (startDate) => {
  const now = new Date();
  const eventDate = new Date(startDate);

  const diffTime = Math.abs(eventDate - now);
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  const diffHours = Math.floor((diffTime / (1000 * 60 * 60)) % 24);

  return `${diffDays} Days ${diffHours} Hours`;
};

const formatDate = (date) => {
  const year = date.getFullYear();
  const month = ("0" + (date.getMonth() + 1)).slice(-2); // JavaScript months are 0-11
  const day = ("0" + date.getDate()).slice(-2);

  return `${month}.${day}.${year}`;
};


const fetchData = async (url, params) =>
  axios.get(url, { params }).then((response) => response.data.data || []);

const constructImageUrl = (bucket, region, path, fileName) =>
  `https://${bucket}.${region}.digitaloceanspaces.com/${path}/${fileName}`;

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
  const getProfileEndPoint = "/api/getProfile"
  const getTeamEndPoint = "/api/getUserTeam"
  const getAthleteEndPoint = "/api/getUserAthletes"
  const getCoachEndPoint = "/api/getUserCoaches"
  const getOfficialEndPoint = "/api/getUserOfficials"
  const getEventsEndPoint = "/api/getActiveEvents"
  const getTournamentEndPoint = "/api/getTournamentForDashboard"
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
  let verifiedFromServer = account.length > 0 && account[0]?.profileStatus === 'verified' ? true : false;
  let eventslist = [];
  let orgtournamentlist = [];
  let athletelist = [];
  let coachlist = [];
  let officiallist = [];
  let members = [];


  const getCurrentDateInPHT = () => {
    const tempDate = new Date();
    const offset = tempDate.getTimezoneOffset() + 8 * 60;  // Adjust for PHT
    return new Date(tempDate.getTime() + offset * 60 * 1000);
  }

  function convertToString(date) {
    return new Intl.DateTimeFormat('en-US', {
      timeZone: 'Asia/Manila',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    }).format(date);
  }

  function formatDateToYYYYMMDD(date) {
    const d = new Date(date);
    const year = d.getUTCFullYear();
    const month = String(d.getUTCMonth() + 1).padStart(2, '0'); // Months are 0-11, so we +1 and pad with a 0 if needed to get the month in MM format
    const day = String(d.getUTCDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
  }

  if (team.length > 0) {
    teamId = team[0]._id;


    teamItem = team.map((team) => ({
      ...team,
      logoURL: constructImageUrl(
        process.env.DO_SPACES_BUCKET,
        'sgp1',
        'teamLogos',
        team.teamLogo
      ),
    }));

    const region = 'sgp1';

    eventslist = await fetchData(`${apiUrl}${getEventsEndPoint}`);
    orgtournamentlist = await fetchData(`${apiUrl}${getTournamentEndPoint}`);
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

  const orgLiveTournamentRes = orgtournamentlist.filter(event =>
    event.organizerEmail === email
  )

  const orgLiveTournaments = orgLiveTournamentRes.map(event => {
    const tournamentId = event._id;
    const tournamentTitle = event.eventName;
    const tournamentLogo = event.eventLogo;
    const tournamentFlag = event.flag;
    const tournamentStatus = event.status;


    return {
      tournamentId,
      tournamentTitle,
      tournamentLogo,
      tournamentFlag,
      tournamentStatus,
    }
  })

  const liveTournamentsRes = orgtournamentlist.filter(event =>
    event.organizerEmail !== email
  )

  const liveTournaments = liveTournamentsRes.map(event => {
    const tournamentId = event._id;
    const tournamentTitle = event.eventName;
    const tournamentLogo = event.eventLogo;
    const tournamentFlag = event.flag;
    const tournamentStatus = event.status;
    const tournamentStartTime = event.startTime;


    return {
      tournamentId,
      tournamentTitle,
      tournamentLogo,
      tournamentFlag,
      tournamentStatus,
      tournamentStartTime
    }
  })

  const orgLiveEvents = eventslist.filter(event =>
    event.registeredEmail === email &&
    (event.eventStatus === 'active' || event.eventStatus === 'ready') &&
    // new Date(event.startDate) <= getCurrentDateInPHT()
    formatDateToYYYYMMDD(event.startDate) <= formatDateToYYYYMMDD(getCurrentDateInPHT())
  );
  const organizedOngoingEvents = orgLiveEvents.map(event => {
    const region = 'sgp1';
    const eventId = event._id;
    const eventTitle = event.eventName;
    // const eventStatus = (event.eventStatus !== 'active' ? event.eventStatus : 'Ready' )
    const eventStatus = event.eventStatus
    const logoURL = `https://${process.env.DO_SPACES_BUCKET}.${region}.digitaloceanspaces.com/eventLogos/${event.eventLogo}`;

    return {
      eventId,
      eventTitle,
      eventStatus,
      logoURL
    }
  });

  const orgUpEvents = eventslist.filter(event =>
    event.registeredEmail === email && event.eventStatus === 'active' && new Date(event.startDate) > Date.now()
  );
  const organizedUpcomingEvents = orgUpEvents.map(event => {
    const region = 'sgp1';
    const eventId = event._id;
    const eventTitle = event.eventName;
    const address = event.address;
    const logoURL = `https://${process.env.DO_SPACES_BUCKET}.${region}.digitaloceanspaces.com/eventLogos/${event.eventLogo}`;
    const countdown = calculateCountdown(event.startDate);
    const eventStartDate = new Date(event.startDate);
    const startDate = formatDate(eventStartDate);

    return {
      eventId,
      eventTitle,
      address,
      countdown,
      startDate,
      logoURL
    }
  })

  const upcomingEvents = eventslist.filter(event =>
    event.registeredEmail !== email && event.eventStatus === 'active'
  );

  const archivedEvents = eventslist.filter(event =>
    event.registeredEmail === email && event.eventStatus === 'closed'
  );

  // console.log(organizedUpcomingEvents, 'organizedUpcomingEvents')
  // console.log(organizedOngoingEvents, 'organizedOngoingEvents')
  // console.log('eventslist', eventslist);
  // console.log('getCurrentDateInPST', getCurrentDateInPST);
  // console.log(upcomingEvents, 'upcomingEvents')
  // console.log(archivedEvents, 'archived')
  // console.log('date.now()', convertToString(Date.now()));

  return {
    props: {
      session,
      teamItem,
      verifiedFromServer,
      athletelist,
      coachlist,
      officiallist,
      members,
      teamId,
      organizedUpcomingEvents,
      organizedOngoingEvents,
      upcomingEvents,
      archivedEvents,
      orgLiveTournaments,
      liveTournaments
    },
  };
}

