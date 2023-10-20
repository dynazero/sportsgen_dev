import React, { useState, useEffect } from 'react'
import axios from 'axios';
import Image from 'next/image'
import SingletonRouter, { useRouter, Router } from 'next/router'
import { getSession } from "next-auth/react"
import { authOptions } from '../../api/auth/[...nextauth]'
import { getServerSession } from "next-auth/next"
import { toast } from "react-toastify";
import { debounce } from 'lodash';
import ReactCountryFlag from 'react-country-flag';
import TimePicker from 'react-time-picker';
import 'react-time-picker/dist/TimePicker.css';
import styles from '../tournament.module.css'



function Index({ id, email, eventData }) {
  const router = useRouter()
  const [tournamentUrl, setTournamentUrl] = useState('sampleURL');
  const [formIsFilled, setFormIsFilled] = useState(false);

  const [te_maxPart_Local, setTe_maxPart_Local] = useState([]);
  const [tournamentEvents, setTournamentEvents] = useState([]);
  const [tournamentStatus, setTournamentStatus] = useState('Check-in');
  const stringToDisplay = 'Do you want to save before leaving the page ?';


  useEffect(() => {
    // Prevents tab quit / tab refresh
    if (formIsFilled) {
      // Adding window alert if the shop quits without saving
      window.onbeforeunload = function () {
        return stringToDisplay;
      };
    } else {
      window.onbeforeunload = () => { };
    }

    if (formIsFilled) {
      // Prevents next routing
      SingletonRouter.router.change = (...args) => {
        if (confirm(stringToDisplay)) {
          return Router.prototype.change.apply(SingletonRouter.router, args);
        } else {
          return new Promise((resolve, reject) => resolve(false));
        }
      };
    }
    return () => {
      delete SingletonRouter.router.change;
    };
  }, [formIsFilled]);

  useEffect(() => {
    const updatedEvents = Object.values(eventData?.eventCategories || {}).map(event => ({
      ...event,
      description: '',
      maxParticipants: 32,
      startTime: '10:00',
      status: 'Check-in'
    }));
    const maxParticipantsArray = Object.values(eventData?.eventCategories || {}).map(event => event.maxParticipants || 32);

    setTournamentEvents(updatedEvents);
    setTe_maxPart_Local(maxParticipantsArray);
  }, [eventData]);

  const backChecker = (event) => {
    if (!formIsFilled) {
      router.push('/dashboard')
    } else {
      event.preventDefault();
      if (confirm(stringToDisplay)) {
        return router.push('/dashboard')
      } else {
        event.preventDefault();
      }
    }

  }

  const handleFormChange = (index, value, cardIndex = null) => {
    let updatedEvents = [...tournamentEvents];  // Create a shallow copy of the tournamentEvents array

    switch (index) {
      case 1:
        updatedEvents[cardIndex].description = value;
        // console.log('Description Set', index, value, cardIndex);
        break;
      case 2:
        if (value > 64) {
          alert('The maximum value is 64');
        } else if (value < 3) {
          return;
        } else {
          updatedEvents[cardIndex].maxParticipants = value;
          // console.log('Max Participants Set', index, value, cardIndex);
        }
        break;
      case 3:
        updatedEvents[cardIndex].startTime = value;
        // console.log('Time Set', index, value, cardIndex);
        break;
      default:
        console.error('Invalid form update');
        return; // Exit the function if the index is invalid
    }

    setTournamentEvents(updatedEvents);  // Update the state with the modified array
  }


  const handleInputBlur = (event) => {
    const value = event.target.value;
    if (value < 3) {
      alert('The minimum value is 3');
    }
  }

  //sepration of rows for our event cards, chunkSize represents how many cards per row
  function chunkArray(arr, chunkSize) {
    let chunks = [];
    for (let i = 0; i < arr.length; i += chunkSize) {
      chunks.push(arr.slice(i, i + chunkSize));
    }
    return chunks;
  }
  // 3 cards per row
  // const categoryChunks = chunkArray(Object.values(tournamentEvents), 3);
  const categoryChunks = Object.values(tournamentEvents);

  const debouncedmaxParticipants = debounce((index, value, cardIndex) => {
    handleFormChange(index, value, cardIndex);
  }, 800);

  const SubmitHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('eventId', eventData._id);
    formData.append('eventName', eventData.eventName);
    formData.append('eventLogo', eventData.logoURL);
    formData.append('organizer', eventData.organizer);
    formData.append('organizerEmail', email);
    formData.append('categories', eventData.categories);
    formData.append('tournamentEvents', JSON.stringify(tournamentEvents));
    formData.append('flag', eventData.flag);
    formData.append('address', eventData.address);
    formData.append('city', eventData.city);
    formData.append('url', tournamentUrl);
    formData.append('startDate', eventData.startDate);
    formData.append('endDate', eventData.endDate);
    formData.append('status', tournamentStatus);
  
    const functionThatReturnPromise = axios.post(`../../api/createTournament`, formData);
    toast.promise(
      functionThatReturnPromise,
      {
        pending: 'Initializing Tournament',
        success: 'Tournament Initialized! 👌',
        error: 'Error creating Tournament 🤯'
      }
    ).then(
      (response) => {
        if (response.status === 201) { // Check if the profile was created successfully
          // Clear the form
          setFormIsFilled(false)

          // Navigate to another page (e.g., the home page)
          setTimeout(() => {
            router.push(`/tournament/admin/${response.data.tournamentId}`);
          }, 2000);
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

  
  return (
    <form onSubmit={SubmitHandler} className="needs-validation" noValidate="" >
      <div className={`wrapperForm ${styles.wrapperFormStyle}`}>
        <div className='headerForm'>
          <h2 className="mb-3">Tournament Initialization</h2>
        </div>
        <div className={`${styles.containerform}`}>
          <div className={`col-md-7 col-lg-8 ${styles.tournamentForm}`}>
            <ul className="list-group list-group-flush">
              <li className="list-group-item">
                <Image src={eventData.logoURL} alt='event logo' width={72} height={72} priority />
              </li>
              <li className="list-group-item">
                <strong className="d-inline-block mb-2 text-primary">Tournament title:  &nbsp;</strong>
                {eventData.eventName}
              </li>
              <li className="list-group-item">
                <strong className="d-inline-block mb-2 text-primary">Organizer:  &nbsp;</strong>
                {eventData.organizer}
              </li>
              <li className="list-group-item">
                <strong className="d-inline-block mb-2 text-primary">Country:  &nbsp;</strong>
                {eventData.flag}
                <ReactCountryFlag
                  countryCode={eventData.flag}
                  svg
                  style={{
                    width: '32px',
                    height: '16px',
                  }}
                  title={eventData.flag}
                />
              </li>
              <li className="list-group-item">
                <strong className="d-inline-block mb-2 text-primary">Address:  &nbsp;</strong>
                {eventData.address}
              </li>
              <li className="list-group-item">
                <strong className="d-inline-block mb-2 text-primary">City:  &nbsp;</strong>
                {eventData.city}
              </li>
              <li className="list-group-item">
                <strong className="d-inline-block mb-2 text-primary">Start Date:  &nbsp;</strong>
                {eventData.eventStartDate}
              </li>
              <li className="list-group-item">
                <strong className="d-inline-block mb-2 text-primary">End Date:  &nbsp;</strong>
                {eventData.eventEndDate}
              </li>
              <li className="list-group-item">
                <strong className="d-inline-block mb-2 text-primary">Events:  &nbsp;</strong>
                <div >
                  <div className='row justify-content-md-center'>
                    {categoryChunks.map((category, index) => (
                      <div key={index} className={`col-sm-4 mb-3 ${styles.categoryCards}`} >
                        <div className='card'>
                          <div className="card-body">
                            <h5 className="card-title text-nowrap text-truncate">{category.title}</h5>
                            <ul className="list-group list-group-flush">
                              <li className="list-group-item">
                                <p className="card-text"><strong className="d-inline-block mb-2 text-primary">Description:  &nbsp;</strong>
                                  <textarea className="form-control" id="Description" placeholder='Type Here (optional)' rows="3"
                                    value={category.description}
                                    onChange={(event) => handleFormChange(1, event.target.value, category.indexKey)}
                                  ></textarea>
                                </p>
                              </li>
                              <li className="list-group-item">
                                <strong className="d-inline-block mb-2 text-primary">Entry Fee: &nbsp;</strong>
                                <strong>₱{category.entryFee}</strong>
                              </li>
                              <li className="list-group-item text-truncate">
                                <strong className="d-inline-block mb-2 text-primary text-nowrap ">Max Participants:  &nbsp;</strong>
                                <div className='row'>
                                  <div className='col-md-4'>
                                    <input className="form-control " type="number" min="3" max="64" step="1" placeholder='10'
                                      value={te_maxPart_Local[category.indexKey]}
                                      onChange={(event) => {
                                        const newValue = event.target.value;
                                        setTe_maxPart_Local(prevValues => {
                                          const updatedValues = [...prevValues];
                                          updatedValues[category.indexKey] = newValue; // Update the specific index
                                          return updatedValues;
                                        });
                                        debouncedmaxParticipants(2, event.target.value, category.indexKey)
                                      }}
                                      onBlur={handleInputBlur}
                                    />
                                  </div>
                                  <div className='col-md-8 text-nowrap '>
                                    <p className='text-truncate'><em><cite>Min 3 - Max 64</cite></em></p>
                                  </div>
                                </div>
                              </li>
                              <li className="list-group-item">
                                <strong className="d-inline-block mb-2 text-primary">Start Time:  &nbsp;</strong>
                                <div className='row'>
                                  <div className={`col-sm-8 ${styles.timePicker}`}>
                                    <TimePicker className={`form-control ${styles['custom-time-picker']}`}
                                      onChange={(value) => handleFormChange(3, value, category.indexKey)}
                                      value={category.startTime} disableClock={true} />
                                  </div>
                                </div>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </li>
            </ul>
          </div>

          <div className="container">
            <div className="row justify-content-end">
              <div className="col-4">
                <button className="w-100 btn btn-light  btn-lg" type="button" onClick={backChecker}>Back</button>
              </div>
              <div className="col-4">
                <button className="w-100 btn btn-primary btn-lg" type="submit" >Initialize</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
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
  const getEventEndPoint = "/api/getEventById?id="
  const getTournamentEndPoint = "/api/getTournamentByEventId?eventId="
  const getUserTeamEndPoint = "/api/getTeamByRegisteredEmail?registeredEmail="
  const session = await getServerSession(context.req, context.res, authOptions)
  const nextAuthSession = await getSession(context);
  const email = session?.user.email
  // Accessing dynamic route parameter 'id'
  const id = context.params.id;
  let eventData = null;


  async function fetchEventData(id) {
    try {
      // Wait for the event data to be retrieved
      const eventResponse = await axios.get(`${apiUrl}${getEventEndPoint}${id}`);

      if (!eventResponse.data.data) {
        console.error("No data was found for the requested event ID");
        return null;
      }

      const event = eventResponse.data.data;

      if (event.registeredEmail != email) {
        console.error("Unauthorized");
        return null;
      }

      const eventStart = new Date(event.startDate);
      const eventStartMonth = eventStart.toLocaleString('default', { month: 'long' });
      const eventStartDay = eventStart.getDate();
      const eventStartYear = eventStart.getFullYear();
      const eventStartDate = `${eventStartMonth.charAt(0).toUpperCase() + eventStartMonth.slice(1)} ${eventStartDay}, ${eventStartYear}`;

      const eventEnd = new Date(event.endDate);
      const eventEndMonth = eventEnd.toLocaleString('default', { month: 'long' });
      const eventEndDay = eventEnd.getDate();
      const eventEndYear = eventEnd.getFullYear();
      const eventEndDate = `${eventEndMonth.charAt(0).toUpperCase() + eventEndMonth.slice(1)} ${eventEndDay}, ${eventEndYear}`;

      const region = 'sgp1';
      const logoURL = `https://${process.env.DO_SPACES_BUCKET}.${region}.digitaloceanspaces.com/eventLogos/${event.eventLogo}`;

      const organizerRes = await axios.get(`${apiUrl}${getUserTeamEndPoint}${event.registeredEmail}`);
      const organizer = organizerRes.data.data.clubName;

      const categories = Object.values(event.eventCategories).map(category => category.categoryKey);

      const categoryTitles = Object.values(event.eventCategories).map(category => category.title);

      const eventData = {
        ...event,
        organizer,
        eventStartDate,
        eventEndDate,
        logoURL,
        categoryTitles
      }

      if (!eventData) {
        console.error("No data was found for the requested event ID");
        return null;
      }

      return eventData;

    } catch (error) {
      console.error("An error occurred while fetching the data:", error);
      // Optionally, return something to indicate an error occurred
      return null;
    }
  }

  async function fetchTournamentData(id) {
    try {
      // Wait for the tournament data to be retrieved
      const tournamentResponse = await axios.get(`${apiUrl}${getTournamentEndPoint}${id}`);
      const tournamentData = tournamentResponse.data.data

      if (tournamentData.length !== 0) {
        console.log('Tournament is Open')
        return false;
      }

      return true;

    } catch (error) {
      console.error("An error occurred while fetching the data:", error);
      // Optionally, return something to indicate an error occurred
      return null;
    }
  }

  if (!session) {
    return {
      redirect: {
        destination: '/tournament/error',
        permanent: false,
      },
    }
  }

  if (nextAuthSession) {
    const checkEventData = await fetchEventData(id)
    if (checkEventData === null) {
      return {
        redirect: {
          destination: '/tournament/error',
          permanent: false,
        },
      }
    }

    if (checkEventData) {
      const checkTournament = await fetchTournamentData(checkEventData._id)
      if (!checkTournament) {
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
          eventData: checkEventData
        }
      }
    }
  }

  return {
    props: {
      session,
      email,
      eventData
    },
  };

}