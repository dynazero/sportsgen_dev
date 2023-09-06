import React, { useState, useEffect } from 'react'
import axios from 'axios';
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { getSession } from "next-auth/react"
import { authOptions } from '../api/auth/[...nextauth]'
import { getServerSession } from "next-auth/next"
import styles from './summary.module.css'
import ReactCountryFlag from 'react-country-flag';




function Index({ id, email, checkoutItem, teamItem }) {
  const router = useRouter()

  const [eventData, setEventData] = useState([])
  const [checkoutInfo, setCheckoutInfo] = useState(checkoutItem?.checkoutData)
  const [participants, setParticipants] = useState(checkoutItem?.relevantParticipants)


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


  const getEventEndPoint = "/api/getEventById?id="

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const apiUrl = NEXT_PUBLIC_API_URL;
        const { data } = await axios.get(`${apiUrl}${getEventEndPoint}${checkoutInfo.tournamentId}`)
        setEventData(data.data)
      } catch (error) {
        console.error(error)
      }
    }

    fetchCategories()
  }, [])

  function capitalizeFirstLetter(string) {
    return string?.charAt(0).toUpperCase() + string?.slice(1);
  }

  const eventStartDate = new Date(eventData.startDate);

  const eventdateD = eventStartDate.getDate().toString().padStart(2, '0')
  const eventdateM = capitalizeFirstLetter(eventStartDate.toLocaleString('default', { month: 'short' }))
  const eventdateY = eventStartDate.getFullYear().toString()
  const paymentMethod = capitalizeFirstLetter(checkoutInfo?.paymentMethod)
  const status = checkoutInfo?.status.toUpperCase()

  // console.log(teamItem)
  return (
    <div className={`wrapperForm caret ${styles.wrapperFormStyle}`}>
      <div className='headerForm'>
        <h2 className="mb-3">Registration Summary</h2>
      </div>
      <div className={`${styles.containerform}`}>
        <div className="col-md-7 col-lg-8 mainForm">
          <div className="row g-3">
            <div className="container">
              <div className="row">
                <div className="col">
                  <div className="card-body d-flex flex-column align-items-start">
                    <strong className="d-inline-block mb-2 text-primary">{eventData.eventType}</strong>
                    <h3 className="mb-0">
                      <span className="text-dark" href="#">{eventData.eventName}</span>
                    </h3>
                    <div className="mb-1 text-muted">{eventdateM} {eventdateD} {eventdateY}</div>
                    <p className="card-text mb-auto">{eventData.address}</p>
                  </div>
                </div>
                <div className="col">
                  <div className={`card-body d-flex flex-column align-items-end ${styles.textRight}`}>
                    <strong className="d-inline-block mb-2 text-primary">Registration details:</strong>
                    <h3 className="mb-0">
                      <span className="text-dark" href="#">{teamItem.teamName}</span>
                      <ReactCountryFlag
                        countryCode={teamItem.country}
                        svg
                        style={{
                          width: '32px',
                          height: '16px',
                        }}
                        title={teamItem.country}
                      />
                    </h3>
                    {/* <div className="mb-1 text-muted">{eventdateM} {eventdateD} {eventdateY}</div> */}
                    <p className="card-text mb-auto">
                      Email: &nbsp;
                      <small className={`${styles.details}`}>
                        {email}
                      </small>
                    </p>
                    <p className="card-text mb-auto">
                      PaymentMethod: &nbsp;
                      <small className={`${styles.details}`}>
                        {paymentMethod}
                      </small>
                    </p>
                    <p className="card-text mb-auto">
                      Status: &nbsp;
                      <small className={`text-muted ${styles.details}`}>
                        {status}
                      </small>
                    </p>
                    {/* <p className="card-text mb-auto">{flag}</p> */}
                  </div>
                </div>
              </div>

            </div>
            <div className="col-sm-6">

            </div>

            {/* <hr className="my-4" /> */}

          </div>



          <div className={`my-3 ${styles.participantsH}`}>

            <div className='row'>
              <table className="table table-striped table-sm">
                <thead>
                  <tr>
                    <th></th>
                    <th>Athlete</th>
                    <th>Event</th>
                  </tr>
                </thead>
                <tbody>

                  {participants && participants?.map((participant, index) => (
                    <tr key={index}>
                      {/* <td><img src={participant.picture} alt={participant.name} /></td> */}
                      <td>
                        <Image src={participant.imageURL} alt='athlete picture' width={25} height={25} priority />
                      </td>
                      <td>{participant.athlete}</td>
                      <td>{participant.event}</td>
                    </tr>
                  ))}

                </tbody>
              </table>
            </div>
          </div>

          <div className="row">
            <div className="col-md-4"></div>
            <div className="col-6 col-md-4 alignRight">

              <button className="w-100 btn btn-light  btn-lg" type="button" href="#">Print</button>
            </div>
            <div className="col-6 col-md-4 alignRight">

              <Link className="w-100 btn btn-primary btn-lg" type="button" href="/dashboard"> Done</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Index;


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
  const getCheckoutEndPoint = "/api/getCheckoutById?id="
  const getUserTeamEndPoint = "/api/getTeamByRegisteredEmail?registeredEmail="
  const getAthleteByIdEndPoint = "/api/getAthleteById?id="
  const getParticipantsEndPoint = "/api/getParticipantsById?id="
  const session = await getServerSession(context.req, context.res, authOptions)
  const nextAuthSession = await getSession(context);
  const email = session.user?.email
  let checkoutItem = null;
  let teamItem = null;
  // Accessing dynamic route parameter 'id'
  const id = context.params.id;

  if (email) {
    return {
      redirect: {
        destination: '/checkout/error',
        permanent: false,
      },
    }
  }
  
  async function fetchUserTeam(email) {
    try {

      const teamResponse = await axios.get(`${apiUrl}${getUserTeamEndPoint}${email}`);
      const teamData = teamResponse.data.data;

      const team = {
        teamName: teamData.clubName,
        country: teamData.country,
      };

      return team;

    } catch (error) {
      console.error("An error occurred while fetching the data:", error);
      // Optionally, return something to indicate an error occurred
      return null;
    }
  }


  async function fetchCheckoutData(id) {
    try {
      // Wait for the checkout data to be retrieved
      const checkoutResponse = await axios.get(`${apiUrl}${getCheckoutEndPoint}${id}`);
      const checkoutData = checkoutResponse.data.data;
      const region = 'sgp1.cdn';

      if (!checkoutData) return null;

      // Check if checkout data is available
      if (checkoutData) {
        // Extract registration ObjectIds array
        const registrationIds = checkoutData.registration.join(',');

        // Get participants data
        const participantsResponse = await axios.get(`${apiUrl}${getParticipantsEndPoint}${registrationIds}`);
        const participantsData = participantsResponse.data.data;
        const athleteIds = participantsData.map((item, index) => {
          return item.athleteId;
        })

        const joinAthleteIds = athleteIds.join(',');


        const athleteProfileResponse = await axios.get(`${apiUrl}${getAthleteByIdEndPoint}${joinAthleteIds}`);
        const athleteProfileData = athleteProfileResponse.data.data;
        const athleteImageUrl = athleteProfileData.map((item, index) => {
          return {
            athleteId: item._id,
            url: item.profilePicture
          }
        })

        const athleteIdToUrlMap = athleteProfileData.reduce((map, item) => {
          map[item._id] = item.profilePicture;
          // map the athleteId to the url
          return map;
        }, {});

        const relevantParticipants = participantsData.map(participant => {
          const imageURL = constructImageUrl(
            process.env.DO_SPACES_BUCKET,
            region,
            'uploads/athletes/profile',
            athleteIdToUrlMap[participant.athleteId] // Use the map here
          );

          return {
            athlete: participant.athlete,
            event: participant.event,
            imageURL,
          };
        });
        // // Filter the participantsData based on the registration ObjectIds
        // const relevantParticipants = participantsData.filter(participant =>
        //   registrationIds.includes(participant._id)
        // );

        //   // Return both checkoutData and relevantParticipants
        return { checkoutData, relevantParticipants };
      }
    } catch (error) {
      console.error("An error occurred while fetching the data:", error);
      // Optionally, return something to indicate an error occurred
      return null;
    }
  }

  if (nextAuthSession) {
    const teamdata = await fetchUserTeam(email);
    const checkoutdata = await fetchCheckoutData(id);
  
    if (checkoutdata === null) {
      return {
        redirect: {
          destination: '/checkout/error',
          permanent: false,
        },
      }
    }
  
    return {
      props: {
        checkoutItem: checkoutdata,
        teamItem: teamdata || null,
      },
    };
  }
  
  if (!session) {
    return {
      redirect: {
        destination: '/checkout/error',
        permanent: false,
      },
    }
  }
  

  // Pass 'id' as a prop to your component
  return {
    props: {
      id,
      email,
      teamItem,
      checkoutItem,
    },
  };
}
