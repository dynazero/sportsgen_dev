import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { useRouter } from 'next/router';
import styles from '../../../tournament.module.css'
import { toast } from "react-toastify";
import { getSession } from "next-auth/react"
import { getServerSession } from "next-auth/next"
import { authOptions } from '../../../../api/auth/[...nextauth]'
import Link from 'next/link'
import Header from '../../../../../components/Tournament/header'
import BracketComponent from '../../../../../components/BracketComponent';
import ShuffleComponent from '../../../../../components/ShuffleComponent';
import { parse } from 'date-fns';

function Bracket({ id, categorykey, tournamentData, participantsData }) {
  const router = useRouter();
  const [category, setCategory] = useState(categorykey);
  const [categorySet, setCategorySet] = useState(tournamentData.categorySet)
  const [bracketFS, setBracketFS] = useState(false)

  const categorySelection = tournamentData.categorySet

  const selectedCategory = categorySelection.find((category) => category.key === parseInt(categorykey));

  const [bracketList, setBracketList] = useState(participantsData);

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
    console.log('shuffleCategory', shuffleCategory);
  };

  const shuffleAthletes = () => {
    setBracketList((prevAthletes) => {
      const newAthletes = [...prevAthletes];
      newAthletes.sort(() => Math.random() - 0.5);
      return newAthletes;
    });
  };

  // const startTournament = () => {
  //   console.log('start Tournament')
  // }

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
            router.push(`/tournament/admin/${tournamentData._id}`);
          }, 2000);
        }
        if (response.status === 500){
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
  // console.log('participantsData', participantsData);
  // console.log('categorykey', categorykey);
  console.log('selectedCategory', selectedCategory);
  console.log('tournamentData', tournamentData);
  return (
    <div className={`wrapperForm caret ${styles.wrapperFormStyle}`}>
      <div className='headerForm'>
        <h2 className="mb-3">Tournament</h2>
      </div>
      <div className={`${styles.containerform}`}>
        <div className="col-md-7 col-lg-8 mainForm">
          <div className="row g-3">
            <Header tournamentData={tournamentData} changeCategory={handleCategoryChange} category={category} participantscount={bracketList.length} />
            <div className="container">
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
                {tournamentData.status === 'Live' && (
                  <p className={`${styles.fsLink}`}
                    onClick={handleFullScreen}
                  >
                    Maximize <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-fullscreen" viewBox="0 0 16 16">
                      <path d="M1.5 1a.5.5 0 0 0-.5.5v4a.5.5 0 0 1-1 0v-4A1.5 1.5 0 0 1 1.5 0h4a.5.5 0 0 1 0 1h-4zM10 .5a.5.5 0 0 1 .5-.5h4A1.5 1.5 0 0 1 16 1.5v4a.5.5 0 0 1-1 0v-4a.5.5 0 0 0-.5-.5h-4a.5.5 0 0 1-.5-.5zM.5 10a.5.5 0 0 1 .5.5v4a.5.5 0 0 0 .5.5h4a.5.5 0 0 1 0 1h-4A1.5 1.5 0 0 1 0 14.5v-4a.5.5 0 0 1 .5-.5zm15 0a.5.5 0 0 1 .5.5v4a1.5 1.5 0 0 1-1.5 1.5h-4a.5.5 0 0 1 0-1h4a.5.5 0 0 0 .5-.5v-4a.5.5 0 0 1 .5-.5z"></path>
                    </svg>
                  </p>
                )}
              </div>
            </div>

          </div>
          {tournamentData.status === 'Check-in' && (
            <>
              <div className={`${styles.shuffleComponentWrapper}`}>
                <ShuffleComponent categorykey={categorykey} categorySet={categorySet} bracketList={bracketList} startTournament={() => startTournament(selectedCategory.key)} shuffle={() => onShuffle(selectedCategory.key)} />
              </div>

            </>

          )}
          {/* {
            tournamentData.status === 'Check-in' &&
            tournamentData.categorySet.map((item, i) => (
              item.start = == 0 ? (
                <div className={`${styles.shuffleComponentWrapper}`} key={i}>
                  <ShuffleComponent
                    categorykey={categorykey}
                    categorySet={categorySet}
                    bracketList={bracketList}
                    startTournament={() => startTournament(selectedCategory.key)}
                    shuffle={() => onShuffle(selectedCategory.key)}
                  />
                </div>
              ) : null
            ))
          } */}


          {tournamentData.status === 'Live' && (
            <div className={`col-sm-12 ${!bracketFS ? styles.bracketContainer : styles.bracketContainerFS} ${bracketFS ? 'animate-bracket-container' : ''
              }`}>
              <>
                {bracketFS &&
                  <div className={`${!bracketFS ? styles.hiddenBracketInfo : styles.bracketInfo}`}>
                    <h3>
                      {`${tournamentData.eventName}`}
                    </h3>
                    <strong>
                      {`${selectedCategory.title}`}
                    </strong>
                    <strong>
                      {`${tournamentData.format}`}
                    </strong>
                  </div>
                }
                <BracketComponent categorykey={categorykey} categorySet={categorySet} setBracketFS={setBracketFS} bracketFS={bracketFS} bracketList={bracketList} />
              </>
            </div>

          )}


          {/* <hr className="my-4" /> */}

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

      const categoryTitles = tournamentReqData.categories.map(catKey => {
        const cat = categories.find(category => category.key === catKey);
        return cat ? cat.title : 'Unknown category';  // return 'Unknown category' if the category key was not found
      });

      const categorySet = tournamentReqData.categories.map(catKey => {
        const cat = categories.find(category => category.key === catKey);
        return cat ? { title: cat.title, key: cat.key, start: 0 } : { title: 'Unknown category', key: null };
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
    const participantsDataReq = await fetchParticipantsData(tournamentDataReq.eventId)
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