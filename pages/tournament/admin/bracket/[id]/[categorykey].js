import React, { lazy, Suspense, useState, useEffect } from 'react';
import Loading from './loading'
import dynamic from 'next/dynamic';
import axios from 'axios';
import { useRouter } from 'next/router';
import styles from '../../../tournament.module.css'
import { toast } from "react-toastify";
import { getSession } from "next-auth/react"
import { getServerSession } from "next-auth/next"
import { authOptions } from '../../../../api/auth/[...nextauth]'
import Link from 'next/link'
import Header from '../../../../../components/Tournament/header'

const ShuffleComponent = dynamic(() => import('../../../../../components/ShuffleComponent'), { loading: () => <p>Loading...</p> });
const BracketComponent = dynamic(() => import('../../../../../components/BracketComponent'), { loading: () => <p>Loading...</p> });

const bracketImports = {
  0: ShuffleComponent,
  1: BracketComponent
};

function Bracket({ id, categorykey, tournamentData, participantsData }) {
  const router = useRouter();

  const bracketListDemo = (initialData => {
    const dummyNames = [
      'Smith, John', 'Doe, Jane', 'White, Walter', 'Black, Joe', 'Green, Mary',
      'Brown, James', 'Johnson, Jenny', 'Lee, Bruce', 'Moore, Michael', 'Taylor, Thomas', 'Jaylah, Hill',
      'Ezra, Greene', 'Iliana, Noble', 'Mila, Cordova', 'Piper, Banks', 'Averie, Xiong', 'Rosalia, Hull', 'Brynleigh, Schmidt',
      'Braelynn, Frederick', 'Isaac, Wang', 'O’Connell, Kailani', 'Jovanni, Bass', 'Zahra, Stone', 'Finn, Watson', 'Hailey, Delgado',
      'Colt, Beard', 'Griffin, Ortega', 'Lilah, Moran', 'Tate, Gonzales', 'Hadley, Howe', 'Alaric, Donovan', 'Azariah, Waters', 'Maximilian, Dunlap',
      'Idris, Mays', 'Denisse, Parrish', 'Karsyn, Ayers', 'Simone, Dunlap', 'Aries, Trejo', 'Rosalyn, Sims', 'Brian, Martin', 'Vicente, Swanson', 'Helen, Ayers',
      'Ulises, Tucker', 'Huang, Esther', 'Ayaan, Horton', 'Villarreal, Aitana', 'Nikolai, Price', 'Villarreal, Azrael', 'Terry, Jazlyn'
    ];

    // Generate random athleteId
    const generateRandomId = () => {
      let result = '64e';
      for (let i = 0; i < 13; i++) {
        result += Math.floor(Math.random() * 9);
      }
      return result;
    };

    const additionalData = [];

    for (let i = initialData.length; i < 3; i++) {
      additionalData.push({
        athleteId: generateRandomId(),
        athleteName: dummyNames[i % dummyNames.length],  // Cycle through dummy names
        categoryKey: 1,
        country: 'PH',
        eventKey: 1,
        eventName: 'Cadet Kata Male',
        status: 'checkout',
        tournamentId: '"6527bcedab91debff7c923e1"'
      });
    }

    return [...initialData, ...additionalData];
  })([
    {
      athleteId: '64e892f830f886fea8924407',
      athleteName: 'Yilmaz, Serkan',
      categoryKey: 1,
      country: 'PH',
      eventKey: 1,
      eventName: 'Cadet Kata Male',
      status: 'checkout',
      tournamentId: '"6527bcedab91debff7c923e1"'
    }, {
      athleteId: '64e8936030f886fea8924411',
      athleteName: 'Nurmagomedov, Khabib',
      categoryKey: 1,
      country: 'PH',
      eventKey: 1,
      eventName: 'Cadet Kata Male',
      status: 'checkout',
      tournamentId: '"6527bcedab91debff7c923e1"'
    }, {
      athleteId: '64e8941630f886fea892441b',
      athleteName: 'McGregor, Conor',
      categoryKey: 1,
      country: 'PH',
      eventKey: 1,
      eventName: 'Cadet Kata Male',
      status: 'checkout',
      tournamentId: '"6527bcedab91debff7c923e1"'
    }, {
      athleteId: '64ecb4e922f48136e549ec7d',
      athleteName: 'Pacquiao, Manny',
      categoryKey: 1,
      country: 'PH',
      eventKey: 1,
      eventName: 'Cadet Kata Male',
      status: 'checkout',
      tournamentId: '"6527bcedab91debff7c923e1"'
    }
  ]);


  const [category, setCategory] = useState(categorykey);
  const [categorySet, setCategorySet] = useState(tournamentData.categorySet)
  const [bracketFS, setBracketFS] = useState(false)

  const categorySelection = tournamentData.categorySet

  const selectedCategory = categorySelection.find((category) => category.key === parseInt(categorykey));

  const [playersList, setPlayersList] = useState(
    participantsData.filter(participant => participant.eventKey === selectedCategory.key)
  );
  const [bracketList, setBracketList] = useState(bracketListDemo);

  const BracketHandler = bracketImports[selectedCategory.start];

  const [tournamentInfo, setTournamentInfo] = useState({
    tournamentId: tournamentData._id,
    eventName: tournamentData.eventName,
    title: selectedCategory.title,
  })



  const handleCategoryChange = (event) => {
    setCategory(event);
    const href = `/tournament/admin/bracket/${id}/${event}`;
    router.push(href);
  }

  const handleFullScreen = () => {
    setBracketFS(true)
  }

  function shuffleByEventKey(participants, eventKeyToShuffle) {
    // Group participants by eventKey
    const groupedParticipants = participants.reduce((acc, participant) => {
      if (!acc[participant.eventKey]) acc[participant.eventKey] = [];
      acc[participant.eventKey].push(participant);
      return acc;
    }, {});

    // Shuffle the specified group
    const shuffledGroup = groupedParticipants[eventKeyToShuffle].sort(() => Math.random() - 0.5);

    // Replace the original group with the shuffled group
    groupedParticipants[eventKeyToShuffle] = shuffledGroup;

    // Merge all groups back together
    const result = [];
    for (const key in groupedParticipants) {
      result.push(...groupedParticipants[key]);
    }

    return result;
  }

  // const onShuffle = (shuffleCategory) => {
  //   console.log('shuffleCategory', shuffleCategory);
  // }

  const onShuffle = (shuffleCategory) => {
    const shuffledList = shuffleByEventKey(bracketList, shuffleCategory);
    setBracketList(shuffledList);
    // console.log('shuffleCategory', shuffleCategory);
  };

  const shuffleAthletes = () => {
    setBracketList((prevAthletes) => {
      const newAthletes = [...prevAthletes];
      newAthletes.sort(() => Math.random() - 0.5);
      return newAthletes;
    });
  };

  const filteredParticipants = bracketList.filter(participant => parseInt(participant.eventKey) === selectedCategory.key);

  const genProps = {
    categorykey: categorykey,
    categorySet: categorySet
  }

  const shuffleProps = {
    ...genProps,
    bracketList: bracketList,
    startTournament: () => startTournament(selectedCategory.key),
    shuffle: () => onShuffle(selectedCategory.key)
  }

  const bracketProps = {
    ...genProps,
    tournamentInfo: tournamentInfo,
    handleFullScreen: () => handleFullScreen(),
    setBracketFS: setBracketFS,
    bracketFS: bracketFS,
    participants: filteredParticipants,

  }

  const startTournament = async () => {

    const formData = new FormData();
    formData.append('tournamentId', tournamentData._id);
    formData.append('categoryName', selectedCategory.title);
    formData.append('categoryKey', selectedCategory.key);
    formData.append('status', 'Live');

    const functionThatReturnPromise = axios.post(`../../../../api/createTournamentEvent`, formData);
    toast.promise(
      functionThatReturnPromise,
      {
        pending: 'Initializing Event',
        success: 'Event Initialized! 👌',
        error: 'Error starting up Event 🤯'
      }
    ).then(
      (response) => {
        if (response.status === 201) { // Check if the profile was created successfully
          // Navigate to another page (e.g., the home page)
          setTimeout(() => {
            router.replace(router.asPath);
          }, 2000);
        }
        if (response.status === 500) {
          console.log(response)
        }
      }
    ).catch((error) => {
      if (error.response) {
        // The request was made and the server responded with a status code
        console.error('Error submitting form:', error.response.data.message);
      } else if (error.request) {
        // The request was made but no response was received
        console.error('No response received:', error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error('Error', error.message);
      }
    });

  }

  // console.log('bracketList', bracketList);

  return (
    <div className={`wrapperForm caret ${styles.wrapperFormStyle}`}>
      <div className='headerForm'>
        <h2 className="mb-3">Tournament</h2>
      </div>
      <div className={`${styles.containerform}`}>
        <div className={`col-md-7 col-lg-8 ${styles.tournamentMainForm}`} >
          <div className="row g-3">
            <Header tournamentData={tournamentData} changeCategory={handleCategoryChange} category={category} playersCount={playersList.length} participantsCount={bracketList.length} />
            <div className={`container ${styles.tabContainer}`}>
              <div className={`row ${styles.posRel}`}>
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
          {selectedCategory.start === 0 ?
            <BracketHandler {...shuffleProps} /> :
            <BracketHandler {...bracketProps} />
          }
        </div>
      </div>
    </div >
  )
}

export default Bracket;

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
  const getParticipantsEndPoint = "/api/getParticipantsByEventId?tournamentId=";
  const getEventCategoryEndPoint = "/api/getEventCategory"
  const getTournamentEventsEndPoint = "/api/getTournamentEventByTId?id="

  // console.log('nextAuthSession', nextAuthSession);

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

      if (!tournamentReqData.categories.includes(parseInt(categorykey))) {
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

      const tournamentEventsRes = await axios.get(`${apiUrl}${getTournamentEventsEndPoint}${id}`, {
        headers: {
          ...context.req.headers, // Spread the incoming request headers
          cookie: context.req.headers.cookie // Forward the cookie
        }
      });

      const tournamentEvents = tournamentEventsRes.data.data;

      const categoryTitles = tournamentReqData.categories.map(catKey => {
        const cat = categories.find(category => category.key === catKey);
        return cat ? cat.title : 'Unknown category';  // return 'Unknown category' if the category key was not found
      });

      const categorySet = tournamentReqData.categories.map(catKey => {
        const cat = categories.find(category => category.key === catKey);

        // Check if there's a matching categoryKey in the tournamentEvents list
        const hasMatchingEvent = tournamentEvents.some(event => event.categoryKey == catKey);
        const startValue = hasMatchingEvent ? 1 : 0;

        return cat
          ? { title: cat.title, key: cat.key, start: startValue }
          : { title: 'Unknown category', key: null, start: startValue };
      })

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

  async function fetchParticipantsData(id) {
    try {
      const participantsReq = await axios.get(`${apiUrl}${getParticipantsEndPoint}${id}`)

      if (!participantsReq.data.data) {
        console.error("No data was found for the requested event ID");
        return null;
      }

      const participantsReqData = participantsReq.data.data;

      return participantsReqData;


    } catch (error) {
      console.error("An error occurred while fetching the data:", error);
      // Optionally, return something to indicate an error occurred
      return null;
    }
  }

  if (nextAuthSession) {
    const tournamentDataReq = await fetchTournamentData(id)
    const participantsDataReq = await fetchParticipantsData(tournamentDataReq?.eventId)
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
        id,
        categorykey,
        session,
        email,
        tournamentData: tournamentDataReq,
        participantsData: participantsDataReq
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