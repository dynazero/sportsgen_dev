import React, { useState, useEffect } from 'react'
import axios from 'axios';
import Image from 'next/image'
import SingletonRouter, { useRouter, Router } from 'next/router'
import { getSession } from "next-auth/react"
import { authOptions } from '../../api/auth/[...nextauth]'
import { getServerSession } from "next-auth/next"
import { toast } from "react-toastify";
import ReactCountryFlag from 'react-country-flag';
import TimePicker from 'react-time-picker';
import 'react-time-picker/dist/TimePicker.css';
import styles from '../tournament.module.css'



function Index({ id, email, eventData }) {
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

  const router = useRouter()
  const [tournamentUrl, setTournamentUrl] = useState('sampleURL');
  const [formIsFilled, setFormIsFilled] = useState(false);

  const [description, setDescription] = useState('');
  const [selectedFormat, setSelectedFormat] = useState('Single Elimination');
  const [battleForThird, setBattleForThird] = useState(false);
  const [maxParticipants, setMaxParticipants] = useState(6);
  const [startTime, setStartTime] = useState('10:00');
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


  const handleFormChange = (event, index, value, arrIndex = null) => {

    switch (index) {
      case 1:
        setDescription(value);
        setFormIsFilled(true)
        break;
      case 2:
        setSelectedFormat(value);
        setFormIsFilled(true)
        break;
      case 3:
        setBattleForThird(value);
        setFormIsFilled(true)
        break;
      case 4:
        if (value > 32) {
          alert('The maximum value is 32');
        } else {
          setMaxParticipants(value);
          setFormIsFilled(true)
        }
        break;
    }

  }

  const handleInputBlur = (event) => {
    const value = event.target.value;
    if (value < 6) {
      alert('The minimum value is 6');
    }
  }


  function chunkArray(arr, chunkSize) {
    let chunks = [];
    for (let i = 0; i < arr.length; i += chunkSize) {
      chunks.push(arr.slice(i, i + chunkSize));
    }
    return chunks;
  }

  const categoryChunks = chunkArray(eventData.categoryTitles, 3);

  const SubmitHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('eventId', eventData._id);
    formData.append('eventName', eventData.eventName);
    formData.append('eventLogo', eventData.logoURL);
    formData.append('organizer', eventData.organizer);
    formData.append('organizerEmail', email);
    formData.append('categories', JSON.stringify(eventData.categories));
    formData.append('flag', eventData.flag);
    formData.append('address', eventData.address);
    formData.append('city', eventData.city);
    formData.append('url', tournamentUrl);
    formData.append('startDate', eventData.startDate);
    formData.append('endDate', eventData.endDate);
    formData.append('description', description);
    formData.append('format', selectedFormat);
    formData.append('matchForThird', battleForThird);
    formData.append('registrationFee', eventData.entryFee);
    formData.append('maxParticipants', maxParticipants);
    formData.append('startTime', startTime);
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
          setDescription('');
          setSelectedFormat('Single Elimination');
          setBattleForThird(false);

          // Navigate to another page (e.g., the home page)
          setTimeout(() => {
            router.push(`/tournament/${response.data.tournamentId}`);
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
                <div>
                  {categoryChunks.map((chunk, index) => (
                    <ul key={index} className="list-group list-group-horizontal">
                      {chunk.map((category, index) => (
                        <li key={index} className="list-group-item">{category}</li>
                      ))}
                    </ul>
                  ))}
                </div>
              </li>
              <li className="list-group-item">
                <strong className="d-inline-block mb-2 text-primary">Entry Fee:  &nbsp;</strong>
                <strong>₱{eventData.entryFee}</strong>
              </li>
              <li className="list-group-item">
                <strong className="d-inline-block mb-2 text-primary">Description:  &nbsp;</strong>
                <textarea className="form-control" id="Description" placeholder='Type Here (optional)' rows="3"
                  value={description}
                  onChange={(event) => handleFormChange(event, 1, event.target.value)}
                ></textarea>
              </li>
              <li className="list-group-item">
                <strong className="d-inline-block mb-2 text-primary">Format:  &nbsp;</strong>
                <div className="row">
                  <div className="col">
                    <select className="form-select" id="format"
                      value={selectedFormat}
                      onChange={(event) => handleFormChange(event, 2, event.target.value)}
                      required>
                      <option key={0} value={'Single Elimination'}>Single Elimination</option>
                      <option key={1} value={'Double Elimination'}>Double Elimination</option>
                    </select>
                  </div>
                  <div className="col">
                    <div className="btn-group" role="group" aria-label="Basic checkbox toggle button group">
                      <input
                        type="checkbox"
                        className="btn-check"
                        id="forthird"
                        autoComplete="off"
                        checked={battleForThird}
                        onChange={(event) => handleFormChange(event, 3, event.target.checked)}
                      />
                      <label className="btn btn-outline-primary" htmlFor="forthird">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-check2" viewBox="0 0 16 16">
                          <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z"></path>
                        </svg>
                        &nbsp;Battle for 3rd
                      </label>
                    </div>
                  </div>
                </div>
              </li>
              <li className="list-group-item">
                <strong className="d-inline-block mb-2 text-primary">Max Participants:  &nbsp;</strong>
                <div className='row'>
                  <div className='col-md-4'>
                    <input className="form-control " type="number" min="6" max="32" step="10"
                      value={maxParticipants}
                      onChange={(event) => handleFormChange(event, 4, event.target.value)}
                      onBlur={(event) => handleInputBlur(event)}
                    />
                  </div>
                  <div className='col-md-4'>
                    <p><em><cite>Min 6 - Max 32</cite></em></p>
                  </div>
                </div>
              </li>
              <li className="list-group-item">
                <strong className="d-inline-block mb-2 text-primary">Start Time:  &nbsp;</strong>
                <div className='row'>
                  <div className='col-md-4'>
                    <TimePicker className={`form-control ${styles['custom-time-picker']}`}
                      onChange={setStartTime}
                      value={startTime} disableClock={true} />
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
  const getEventCategoryEndPoint = "/api/getEventCategory"
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

      const categoriesRes = await axios.get(`${apiUrl}${getEventCategoryEndPoint}`);
      const categories = categoriesRes.data.data

      const categoryTitles = event.categories.map(catKey => {
        const cat = categories.find(category => category.key === catKey);
        return cat ? cat.title : 'Unknown category';  // return 'Unknown category' if the category key was not found
      });

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