import Link from 'next/link'
import axios from 'axios';
import { signIn, useSession } from "next-auth/react"
import { MotionConfig, motion } from 'framer-motion';
import React, { useState, useRef, useEffect } from 'react'
import RegistrationBody from '../../components/RegistrationBody/'
import ReactDOM from "react-dom";
import Image from 'next/image'
import ReactCountryFlag from "react-country-flag"



export default function events({ eventItem }) {

  const { data: session } = useSession()

  // const [date, setDate] = useState(new Date());
  // const [selectedDate, setSelectedDate] = useState(Date("2023-02-03"));


  // let a = eventItem[0].startDate;
  // let dateDay = new Date(a);
  // let b = dateDay.getMonth();
  const MotionLink = motion(Link)


  // console.log(a);
  // console.log(eventItem);
  return (
    <>
      <div className='picClass mx-auto minWidth'>
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
          {eventItem.map((item, i) => (
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
                                <div className="col-sm-8">
                                  <h6>Event Address</h6>

                                  <div>{item.address},{item.city}</div>

                                </div>
                                <div className="col-sm-4">
                                  <h6>Events</h6>

                                  <ul>{item.categoryTitles.map((title, index) => (
                                    <li key={index}>{title}</li>
                                  ))}</ul>

                                </div>
                              </div>
                            </div>
                          </div>
                          {!session && (
                            <motion.button
                              className="btn btn-primary save-button"
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              // onClick={ event => {modalClick(event, !modalOpen, true)}} 
                              onClick={() => signIn()}
                              href="/login"
                              type="button"
                            >
                              Login to Register &gt;&gt;
                            </motion.button>
                          )}

                          {session && (
                            <>
                            <RegistrationBody />
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

const calculateCountdown = (startDate) => {
  const now = new Date();
  const eventDate = new Date(startDate);

  const diffTime = Math.abs(eventDate - now);
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  const diffHours = Math.floor((diffTime / (1000 * 60 * 60)) % 24);

  return `${diffDays} Days ${diffHours} Hours`;
};

export async function getServerSideProps(context) {
  // Fetch data from APIs
  const res = await axios.get('http://localhost:3000/api/getEvents');
  const resCategories = await axios.get('http://localhost:3000/api/getEventCategory'); // Using your provided API endpoint for categories

  const categories = resCategories.data.data;
  const eventItem = res.data.data.map(event => {
    // Your existing map operation...
    const eventStartDate = new Date(event.startDate);
    const eventEndDate = new Date(event.endDate);
    const region = 'sgp1';
    const logoURL = `https://${process.env.DO_SPACES_BUCKET}.${region}.digitaloceanspaces.com/eventLogos/${event.originalFileName}`;
    const countdown = calculateCountdown(event.startDate);

    const formatDate = (date) => {
      const year = date.getFullYear();
      const month = ("0" + (date.getMonth() + 1)).slice(-2); // JavaScript months are 0-11
      const day = ("0" + date.getDate()).slice(-2);

      return `${year}.${month}.${day}`;
    };

    const formattedStartDate = formatDate(eventStartDate);
    const formattedEndDate = formatDate(eventEndDate);

    // Map the category keys to their titles
    const categoryTitles = event.categories.map(catKey => {
      const cat = categories.find(category => category.key === catKey);
      return cat ? cat.title : 'Unknown category';  // return 'Unknown category' if the category key was not found
    });

    return {
      ...event,
      eventdateD: eventStartDate.getDate().toString().padStart(2, '0'),
      eventdateM: eventStartDate.toLocaleString('default', { month: 'short' }).toUpperCase(),
      eventdateY: eventStartDate.getFullYear().toString(),
      logoURL,
      countdown,
      eventPeriod: `${formattedStartDate} - ${formattedEndDate}`,
      categoryTitles  // add the category titles to the event
    };
  });

  eventItem.sort((a, b) => new Date(a.startDate) - new Date(b.startDate));
  // Pass the data to the page via props
  return { props: { eventItem } };
}


