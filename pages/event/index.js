import Link from 'next/link'
import axios from 'axios';
import { signIn, useSession } from "next-auth/react"
import EventCategoriesComponent from '../../components/Pagination/registrationEventCategories'
import { MotionConfig, motion } from 'framer-motion';
import { useState, useRef, useEffect } from 'react'
import navbarstyle from '../../styles/Menu.module.css'
import styles from './events.module.css'
import RegistrationBody from '../../components/RegistrationBody/'
import ReactDOM from "react-dom";
import Image from 'next/image'
import ReactCountryFlag from "react-country-flag"

export default function events({ eventItem, tournamentItem }) {
  const NEXT_PUBLIC_APP_ENV = process.env.NEXT_PUBLIC_APP_ENV;

  let NEXT_PUBLIC_API_URL;
  // let NEXT_PUBLIC_DO_SPACES_BUCKET;

  switch (NEXT_PUBLIC_APP_ENV) {
    case 'dev':
      NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_DEV_API_URL;
      // NEXT_PUBLIC_DO_SPACES_BUCKET = process.env.NEXT_PUBLIC_DEV_DO_SPACES_BUCKET;
      break;
    case 'test':
      NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_NGROK_API_URL;
      // NEXT_PUBLIC_DO_SPACES_BUCKET = process.env.NEXT_PUBLIC_NGROK_DO_SPACES_BUCKET;
      break;
    case 'production':
      NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL;
      // NEXT_PUBLIC_DO_SPACES_BUCKET = process.env.NEXT_PUBLIC_DO_SPACES_BUCKET;
      break;
    default:
      console.error('Invalid environment specified in NEXT_PUBLIC_APP_ENV');
      break;
  }


  const { data: session } = useSession()

  const [events, setEvents] = useState(false);
  const [tournaments, setTournaments] = useState(false);
  const MotionLink = motion(Link)

  const [getTeamId, setGetTeamId] = useState(undefined);
  const [athletelist, setAthleteList] = useState([]);
  const [checkoutList, setCheckoutList] = useState([]);

  const [tournamentList, setTournamentList] = useState(tournamentItem);

  useEffect(() => {
    const storedTeamId = localStorage.getItem('teamId');
    if (storedTeamId !== null) {
      const teamIdWithoutQuotes = storedTeamId.replace(/"/g, '');
      setGetTeamId(teamIdWithoutQuotes);
    }
  }, [])

  useEffect(() => {
    if (eventItem.length !== 0) {
      setEvents(true);
    }

  }, [eventItem]);

  useEffect(() => {
    if (tournamentItem.length !== 0) {
      setTournaments(true);
    }

  }, [tournamentItem]);

  const fetchData = async (url, params) =>
    axios.get(url + params.team).then(response => response.data.data || []);

  const constructImageUrl = (bucket, region, path, fileName) =>
    `https://${bucket}.${region}.digitaloceanspaces.com/${path}/${fileName}`;



  useEffect(() => {
    if (session && getTeamId !== undefined) {
      const apiUrl = NEXT_PUBLIC_API_URL;
      const getAthleteEndPoint = "/api/getUserAthletes?team=";
      const getCheckOutEndPoint = "/api/getCheckoutByTeamId?team=";
      const teamId = getTeamId
      const region = 'sgp1';
      const fetchAthletes = async () => {
        let athletes = await fetchData(`${apiUrl}${getAthleteEndPoint}`, { team: teamId });
        athletes = athletes.map((athlete, index) => ({
          ...athlete,
          type: 'athlete',
          imageURL: constructImageUrl(
            // process.env.NEXT_PUBLIC_DO_SPACES_BUCKET,
            'sportsgenph',
            region,
            'uploads/athletes/profile',
            athlete.profilePicture
          ),
          sequence: index + 1,
          identifier: 'Athlete',
        }));
        setAthleteList(athletes);
      };

      const fetchCheckout = async () => {
        let checkouts = await fetchData(`${apiUrl}${getCheckOutEndPoint}`, { team: teamId });
        checkouts = checkouts.map((checkout, index) => {
          const checkoutTournament = tournamentItem.find((item) => item.eventId === checkout.tournamentId);
          return {
            checkoutId: checkout._id,
            tournament: checkoutTournament,
          };
        });
        setTournamentList(tournamentItem.map((tournament) => {
          const checkout = checkouts.find((item) => item.tournament.eventId === tournament.eventId);
          if (checkout) {
            return {
              ...tournament,
              checkoutId: checkout.checkoutId,
            };
          }
          return tournament;
        }));
      };

      fetchAthletes();
      fetchCheckout();

    }
  }, [session, getTeamId]);

  // console.log('tournamentList', tournamentList);

  return (
    <>
      <div className='picClass mx-auto minWidth caret'>
        <div className="accordion rmvBorder" id="accordionCreate">
          <div className="accordion-item rmvBorder">
            <h2 className="accordion-header" id="headingOne">
              <div className='d-flex bd-highlight'>
                <div className='p-2 bd-highlight eventHeader'>
                  Events
                </div>
              </div>
            </h2>

          </div>
        </div>

        <div className="accordion" id="accordionEvents">
          {(!events && !tournaments) && (
            <div className='picClassItem eventsDialogBox '>
              No Events
            </div>

          )}

          {tournaments && tournamentList.map((item, i) => (
            <motion.div
              key={item._id}
              className='picClassItem eventsDialogBox shadow-sm bg-body rounded'
              initial={{ opacity: 0, translateX: -50, translateY: -50 }}
              animate={{ opacity: 1, translateX: 0, translateY: 0 }}
              transition={{ duration: 0.3, delay: i * 0.2 }}
            >

              <div className="accordion-item">
                <div className="container">
                  <div className="row">
                    <div className="col-1 padding8">
                      <div className='centerFlag'>
                        <ReactCountryFlag
                          countryCode={item.flag}
                          svg
                          style={{
                            width: '32px',
                            height: '16px',
                          }}
                          title={item.flag}
                        />

                      </div>

                      <div className='eventFontAlign eventDateD fontOpacity'>
                        {item.eventdateD}
                      </div>
                      <div className='eventFontAlign eventDateM fontOpacity'>
                        {item.eventdateM}
                      </div>
                      <div className='eventFontAlign eventDateY fontOpacity'>
                        {item.eventdateY}
                      </div>
                    </div>
                    <div className="col-2 padding8">
                      <Image src={item.logoURL} alt='event logo' width={72} height={72} priority />
                    </div>

                    <div className="col-5 padding16">
                      <div className='eventDetail eventTitle fontOpacity'> {item.eventName} </div>
                      <div className='eventDetail eventRegDate fontOpacity'>{item.eventPeriod}</div>
                      <div className='eventDetail eventType fontOpacity'>{item.eventType}</div>
                      <div className='eventDetail eventCD fontOpacity'>{item.countdown}</div>
                      {/* {item.date)} */}
                    </div>

                    <div className="col-4 buttonBG">
                      <div className="container">
                        <div className="row">
                          <div className="col-6 padding8">

                          </div>
                        </div>
                      </div>
                      {(session && item.status === 'Check-in' && item.checkoutId) && (
                        <div className={styles.checkinTournamentButtons}>
                          <div>
                            <strong>
                              Live
                            </strong>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="red" className="bi bi-record-fill" viewBox="0 0 16 16">
                              <path fillRule="evenodd" d="M8 13A5 5 0 1 0 8 3a5 5 0 0 0 0 10z" />
                            </svg>

                          </div>


                          <MotionLink
                            type="button"
                            className="btn btn-success"
                            href={`/checkout/${item.checkoutId}`}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-clipboard-check" viewBox="0 0 16 16">
                              <path fillRule="evenodd" d="M10.854 7.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 9.793l2.646-2.647a.5.5 0 0 1 .708 0z"></path>
                              <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z"></path>
                              <path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z"></path>
                            </svg>
                            &nbsp;Check-In
                          </MotionLink>
                        </div>

                      )}

                      {(session && item.status === 'Check-in' && !item.checkoutId) && (
                        <div className={styles.checkinTournamentButtons}>
                          <div>
                            <strong>
                              Live
                            </strong>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="red" className="bi bi-record-fill" viewBox="0 0 16 16">
                              <path fillRule="evenodd" d="M8 13A5 5 0 1 0 8 3a5 5 0 0 0 0 10z" />
                            </svg>

                          </div>

                          <motion.button
                            type="button"
                            className="btn btn-primary"
                            data-bs-toggle="collapse"
                            data-bs-target={"#collapse" + item._id}
                            aria-expanded="true"
                            aria-controls="collapseOne"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                              <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"></path>
                              <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"></path>
                            </svg>
                            &nbsp;Register
                          </motion.button>



                        </div>

                      )}

                      {(!session && item.status === 'Check-in') && (
                        <div className={styles.checkinTournamentButtons}>
                          <div>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="red" className="bi bi-record-fill" viewBox="0 0 16 16">
                              <path fillRule="evenodd" d="M8 13A5 5 0 1 0 8 3a5 5 0 0 0 0 10z" />
                            </svg>
                            <small>Event will start shortly  »</small>

                          </div>


                        </div>

                      )}


                      {item.status === 'Live' && (

                        <div className={styles.liveTournamentButtons}>
                          <div>
                            <strong>
                              Live
                            </strong>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="red" className="bi bi-record-fill" viewBox="0 0 16 16">
                              <path fillRule="evenodd" d="M8 13A5 5 0 1 0 8 3a5 5 0 0 0 0 10z" />
                            </svg>

                          </div>


                          <MotionLink
                            type="button"
                            className="btn btn-dark"
                            href={`/tournament/admin/bracket/${item._id}/${item.item.tournamentEvents[0].indexKey}`}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-eye-fill" viewBox="0 0 16 16">
                              <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z" />
                              <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z" />
                            </svg>
                            &nbsp;Watch
                          </MotionLink>
                        </div>

                      )}
                      {/* {item.status === 'Finals' && (
                      )}
                      {item.status === 'Awarding' && (

                      )} */}

                    </div>

                    <div id={"collapse" + item._id} className="accordion-collapse collapse" aria-labelledby="headingOne" data-bs-parent="#accordionEvents">


                      <div className="accordion-body">
                        <div className="py-5 text-center">
                          <div className="row g-5">
                            <div className="col-md-7 col-lg-8">
                              <div className="row g-3">
                                <div className="col-sm-6">
                                  <h6>Event Address</h6>

                                  <div>{item.address},{item.city}</div>

                                </div>
                                <div className="col-sm-6">
                                  <h6>Events</h6>

                                  <EventCategoriesComponent events={item.tournamentEvents} />

                                </div>
                              </div>
                            </div>
                          </div>
                          {!session && (
                            <Link href="/dashboard" className="nav-link active" aria-current="page"
                              onClick={() => signIn()}>
                              <span className={navbarstyle.textcoloractive}>
                                Please login to Register »
                              </span>
                            </Link>
                          )}

                          {session && (
                            <>
                              <RegistrationBody athletelist={athletelist} events={item.tournamentEvents} eventId={item.eventId} getTeamId={getTeamId} />
                            </>
                          )}

                        </div>

                      </div>



                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}

          {events && eventItem.map((item, i) => (
            <motion.div
              key={item._id}
              className='picClassItem eventsDialogBox shadow-sm bg-body rounded'
              initial={{ opacity: 0, translateX: -50, translateY: -50 }}
              animate={{ opacity: 1, translateX: 0, translateY: 0 }}
              transition={{ duration: 0.3, delay: i * 0.2 }}
            >

              <div className="accordion-item">
                <div className="container">
                  <div className="row">
                    <div className="col-1 padding8">
                      <div className='centerFlag'>
                        <ReactCountryFlag
                          countryCode={item.flag}
                          svg
                          style={{
                            width: '32px',
                            height: '16px',
                          }}
                          title={item.flag}
                        />

                      </div>

                      <div className='eventFontAlign eventDateD fontOpacity'>
                        {item.eventdateD}
                      </div>
                      <div className='eventFontAlign eventDateM fontOpacity'>
                        {item.eventdateM}
                      </div>
                      <div className='eventFontAlign eventDateY fontOpacity'>
                        {item.eventdateY}
                      </div>
                    </div>
                    <div className="col-2 padding8">
                      <Image src={item.logoURL} alt='event logo' width={72} height={72} priority />
                    </div>

                    <div className="col-7 padding16">
                      <div className='eventDetail eventTitle fontOpacity'> {item.eventName} </div>
                      <div className='eventDetail eventRegDate fontOpacity'>{item.eventPeriod}</div>
                      <div className='eventDetail eventType fontOpacity'>{item.eventType}</div>
                      <div className='eventDetail eventCD fontOpacity'>{item.countdown}</div>
                      {/* {item.date)} */}
                    </div>

                    <div className="col-2 buttonBG">
                      <div className="container">
                        <div className="row">
                          <div className="col-6 padding8">

                          </div>
                        </div>
                      </div>
                      <p>

                        <motion.button
                          type="button"
                          className="btn btn-primary"
                          data-bs-toggle="collapse"
                          data-bs-target={"#collapse" + item._id}
                          aria-expanded="true"
                          aria-controls="collapseOne"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"></path>
                            <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"></path>
                          </svg>
                          &nbsp;Register
                        </motion.button>
                      </p>
                    </div>

                    <div id={"collapse" + item._id} className="accordion-collapse collapse" aria-labelledby="headingOne" data-bs-parent="#accordionEvents">


                      <div className="accordion-body">
                        <div className="py-5 text-center">
                          <div className="row g-5">
                            <div className="col-md-7 col-lg-8">
                              <div className="row g-3">
                                <div className="col-sm-6">
                                  <h6>Event Address</h6>

                                  <div>{item.address},{item.city}</div>

                                </div>
                                <div className="col-sm-6">
                                  <h6>Events</h6>

                                  <EventCategoriesComponent events={item.eventCategories} />

                                </div>
                              </div>
                            </div>
                          </div>
                          {!session && (
                            <Link href="/dashboard" className="nav-link active" aria-current="page"
                              onClick={() => signIn()}>
                              <span className={navbarstyle.textcoloractive}>
                                Please login to Register »
                              </span>
                            </Link>
                          )}

                          {session && (
                            <>
                              <RegistrationBody athletelist={athletelist} events={item.eventCategories} eventId={item._id} getTeamId={getTeamId} />
                            </>
                          )}

                        </div>

                      </div>



                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}

        </div>
      </div>
    </>
  )
}

const fetchData = async (url, params) =>
  axios.get(url, { params }).then((response) => response.data.data || []);

const constructImageUrl = (bucket, region, path, fileName) =>
  `https://${bucket}.${region}.digitaloceanspaces.com/${path}/${fileName}`;

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

  return `${year}.${month}.${day}`;
};

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
  // Fetch data from APIs
  const apiUrl = NEXT_PUBLIC_API_URL;
  const getLaterEventsEndPoint = "/api/getLaterEvents"
  const getLiveTournamentsEndPoint = "/api/getLiveTournaments"
  const getEventCategoryEndPoint = "/api/getEventCategory"
  const res = await fetchData(`${apiUrl}${getLaterEventsEndPoint}`);
  const resLive = await fetchData(`${apiUrl}${getLiveTournamentsEndPoint}`);
  const resCategories = await fetchData(`${apiUrl}${getEventCategoryEndPoint}`);

  const categories = resCategories;
  const eventItem = res.map(event => {
    // Your existing map operation...
    const eventStartDate = new Date(event.startDate);
    const eventEndDate = new Date(event.endDate);
    const region = 'sgp1';
    const logoURL = `https://${process.env.DO_SPACES_BUCKET}.${region}.digitaloceanspaces.com/eventLogos/${event.eventLogo}`;
    const countdown = calculateCountdown(event.startDate);

    const formattedStartDate = formatDate(eventStartDate);
    const formattedEndDate = formatDate(eventEndDate);


    return {
      ...event,
      eventdateD: eventStartDate.getDate().toString().padStart(2, '0'),
      eventdateM: eventStartDate.toLocaleString('default', { month: 'short' }).toUpperCase(),
      eventdateY: eventStartDate.getFullYear().toString(),
      logoURL,
      countdown,
      eventPeriod: `${formattedStartDate} - ${formattedEndDate}`,
    };
  });

  const tournamentItem = resLive.map(event => {
    // Your existing map operation...
    const eventStartDate = new Date(event.startDate);
    const eventEndDate = new Date(event.endDate);
    const region = 'sgp1';
    const logoURL = `https://${process.env.DO_SPACES_BUCKET}.${region}.digitaloceanspaces.com/eventLogos/${event.eventLogo}`;
    const countdown = calculateCountdown(event.startDate);

    const formattedStartDate = formatDate(eventStartDate);
    const formattedEndDate = formatDate(eventEndDate);


    // Map the category keys to their titles


    return {
      ...event,
      eventdateD: eventStartDate.getDate().toString().padStart(2, '0'),
      eventdateM: eventStartDate.toLocaleString('default', { month: 'short' }).toUpperCase(),
      eventdateY: eventStartDate.getFullYear().toString(),
      logoURL,
      countdown,
      eventPeriod: `${formattedStartDate} - ${formattedEndDate}`,
    };
  });


  eventItem.sort((a, b) => new Date(a.startDate) - new Date(b.startDate));
  // Pass the data to the page via props
  return {
    props: {
      eventItem,
      tournamentItem
    }
  };
}


