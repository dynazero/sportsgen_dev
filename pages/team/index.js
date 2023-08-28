import Link from 'next/link'
import { MotionConfig, motion } from 'framer-motion';
import React, { useState, useRef, useEffect } from 'react'
import ReactDOM from "react-dom";
import images from '../../public/events/images.js'
import Image from 'next/image'
import { Component } from "react";
import { Datepicker } from '@adibfirman/react-datepicker'


const eventItem = [
  {
    id: 1,
    title: "EKF REFEREE COURSE KATA - LARNCA 2023",
    shortTitle: ["EKF REFEREE COURSE KATA", "KARATE1 SERIES A", "KARATE1 PREMIER LEAGUE"],
    shortDescription: ["LARNCA 2023", "ATHENS 2023", "CAIRO 2023"],
    price: ["₱50", "₱100", "₱80"],
    flag: images[3],
    eventdate: Date("2023-02-03"),
    eventdateM: "FEB",
    // new Date(eventdate).getMonth, 
    eventdateD: "03",
    // new Date(eventdate).getDate,
    eventdateY: "2023",
    // new Date(eventdate).getFullYear,
    logo: images[0],
    regdatestart: Date("2023-02-03"),
    regdateend: Date("2023-02-05"),
    regdate: "2023.02.03 - 2023.02.05",
    eventType: "Tournament",
    countodown: "12 Days 4 Hours"
    //days+hrs
    // countdown: Date(regdatestart - regdateend)
  },
  {
    id: 2,
    title: "KARATE1 SERIES A - ATHENS 2023",
    shortTitle: ["KARATE1 SERIES A"],
    shortDescription: ["ATHENS 2023"],
    price: ["₱100"],
    flag: images[3],
    eventdate: Date("2023-01-13"),
    eventdateM: "JAN",
    // new Date(eventdate).getMonth, 
    eventdateD: "13",
    // new Date(eventdate).getDate,
    eventdateY: "2023",
    // new Date(eventdate).getFullYear,
    logo: images[1],
    regdatestart: Date("2023-01-13"),
    regdateend: Date("2023-01-15"),
    regdate: "2023.01.13 - 2023.01.15",
    eventType: "Tournament",
    countodown: "6 Days 2 Hours"
    //days+hrs
    // countdown: regdatestart-regdateend
  },
  {
    id: 3,
    title: "KARATE1 PREMIER LEAGUE - CAIRO 2023",
    shortTitle: ["KARATE1 PREMIER LEAGUE"],
    shortDescription: ["CAIRO 2023"],
    price: ["₱80"],
    flag: images[3],
    eventdate: Date("2023-01-27"),
    eventdateM: "JAN",
    // new Date(eventdate).getMonth, 
    eventdateD: "03",
    // new Date(eventdate).getDate,
    eventdateY: "2023",
    // new Date(eventdate).getFullYear,
    logo: images[2],
    regdatestart: Date("2023-01-01"),
    regdateend: Date("2023-01-27"),
    regdate: "2023.01.01 - 2023.01.27",
    eventType: "Tournament",
    countodown: "9 Days 8 Hours"
    //days+hrs
    // countdown: regdatestart-regdateend
  },
  {
    id: 4,

    title: "EKF REFEREE COURSE KATA - LARNCA 2023",
    shortTitle: ["EKF REFEREE COURSE KATA"],
    shortDescription: ["LARNCA 2023"],
    price: ["₱50"],
    flag: images[3],
    eventdate: Date("2023-02-03"),
    eventdateM: "FEB",
    // new Date(eventdate).getMonth, 
    eventdateD: "03",
    // new Date(eventdate).getDate,
    eventdateY: "2023",
    // new Date(eventdate).getFullYear,
    logo: images[0],
    regdatestart: Date("2023-02-03"),
    regdateend: Date("2023-02-05"),
    regdate: "2023.02.03 - 2023.02.05",
    eventType: "Tournament",
    countodown: "3 Days 4 Hours"
    //days+hrs
    // countdown: regdatestart-regdateend
  },
  {
    id: 5,
    title: "KARATE1 SERIES A - ATHENS 2023",
    shortTitle: ["KARATE1 SERIES A"],
    shortDescription: ["ATHENS 2023"],
    price: ["₱100"],
    flag: images[3],
    eventdate: Date("2023-01-13"),
    eventdateM: "JAN",
    // new Date(eventdate).getMonth, 
    eventdateD: "13",
    // new Date(eventdate).getDate,
    eventdateY: "2023",
    // new Date(eventdate).getFullYear,
    logo: images[1],
    regdatestart: Date("2023-01-13"),
    regdateend: Date("2023-01-15"),
    regdate: "2023.01.13 - 2023.01.15",
    eventType: "Tournament",
    countodown: "11 Days 7 Hours"
    //days+hrs
    // countdown: regdatestart-regdateend
  },
  {
    id: 6,
    title: "KARATE1 PREMIER LEAGUE - CAIRO 2023",
    shortTitle: ["KARATE1 PREMIER LEAGUE"],
    shortDescription: ["CAIRO 2023"],
    price: ["₱80"],
    flag: images[3],
    eventdate: Date("2023-01-27"),
    eventdateM: "JAN",
    // new Date(eventdate).getMonth, 
    eventdateD: "27",
    // new Date(eventdate).getDate,
    eventdateY: "2023",
    // new Date(eventdate).getFullYear,
    logo: images[2],
    regdatestart: Date("2023-01-01"),
    regdateend: Date("2023-01-27"),
    regdate: "2023.01.01 - 2023.01.27",
    eventType: "Tournament",
    countodown: "14 Days 9 Hours"
    //days+hrs
    // countdown: regdatestart-regdateend
  }
];

export default function events() {
  // const [date, setDate] = useState(new Date());
  // const [selectedDate, setSelectedDate] = useState(Date("2023-02-03"));
  let a = eventItem[0].eventdate;
  let dateDay = new Date(a);
  let b = dateDay.getMonth();
  const MotionLink = motion(Link)
  

  // console.log(eventItem);
  // console.log(a);
  // console.log(b);
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
              key={item.id}
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
                        <Image src={item.flag} alt='event logo' width={32} height={16} />
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
                      <Image src={item.logo} alt='event logo' width={72} height={72} />
                    </div>

                    <div className="col-7 padding16">
                      <div className='eventDetail eventTitle fontOpacity'> {item.title} </div>
                      <div className='eventDetail eventRegDate fontOpacity'>{item.regdate}</div>
                      <div className='eventDetail eventType fontOpacity'>{item.eventType}</div>
                      <div className='eventDetail eventCD fontOpacity'>{item.countodown}</div>
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
                          data-bs-target={"#collapse" + item.id}
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

                    <div id={"collapse" + item.id} className="accordion-collapse collapse" aria-labelledby="headingOne" data-bs-parent="#accordionEvents">


                      <div className="accordion-body">
                        {/* <strong>This is the first items accordion body.</strong> It is shown by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It&apos;s also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow. */}

                        <div className="py-5 text-center">

                          <div className="row g-5">
                            <div className="col-md-5 col-lg-4 order-md-last">
                              <h4 className="d-flex justify-content-between align-items-center mb-3">
                                <span className="text-primary">Your Events</span>
                                <span className="badge bg-primary rounded-pill">3</span>
                              </h4>
                              <ul className="list-group mb-3">
                                <li className="list-group-item d-flex justify-content-between lh-sm">
                                  <div>
                                    <h6 className="my-0">{item.shortTitle[0]}</h6>
                                    <small className="text-muted">{item.shortDescription[0]}</small>
                                  </div>
                                  <span className="text-muted">{item.price[0]}</span>

                                </li>
                                <li className="list-group-item d-flex justify-content-between lh-sm">
                                  <div>
                                    <h6 className="my-0">{item.shortTitle[1]}</h6>
                                    <small className="text-muted">{item.shortDescription[1]}</small>
                                  </div>
                                  <span className="text-muted">{item.price[1]}</span>
                                </li>
                                <li className="list-group-item d-flex justify-content-between lh-sm">
                                  <div>
                                    <h6 className="my-0">{item.shortTitle[2]}</h6>
                                    <small className="text-muted">{item.shortDescription[2]}</small>
                                  </div>
                                  <span className="text-muted">{item.price[2]}</span>
                                </li>
                                {/*<li className="list-group-item d-flex justify-content-between bg-light">
                                   <div className="text-success">
                                    <h6 className="my-0">Promo code</h6>
                                    <small>EXAMPLECODE</small>
                                  </div>
                                  <span className="text-success">−$5</span> 
                                </li>*/}
                                <li className="list-group-item d-flex justify-content-between">
                                  <span>Total (PHP)</span>
                                  <strong>₱230</strong>
                                </li>
                              </ul>
                              <hr className="my-4" />

                              {/* <form className="card p-2">
                                <div className="input-group">
                                  <input type="text" className="form-control" placeholder="Promo code" />
                                  <button type="submit" className="btn btn-secondary">Redeem</button>
                                </div>
                              </form> */}
                              <button className="w-100 btn btn-primary btn-lg" type="submit">Continue to checkout</button>
                            </div>
                            <div className="col-md-7 col-lg-8">
                              <h4 className="mb-3">Fill up form</h4>
                              <form className="needs-validation" noValidate="" />
                              <div className="row g-3">
                                <div className="col-sm-6">
                                  <label htmlFor="firstName" className="form-label">Athlete Name</label>
                                  {/* <input type="text" className="form-control" id="firstName" placeholder="" defaultValue="" required="" /> */}
                                  <div>
                                    {/* dropdown options */}
                                    {/* <button className="btn btn-secondary dropdown-toggle form-control" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                      Choose a participant
                                    </button>
                                    <ul className="dropdown-menu">
                                      <li><h6 className="dropdown-header">Athletes:</h6></li>
                                      <li><a className="dropdown-item" href="#">Kyle</a></li>
                                      <li><a className="dropdown-item" href="#">Chris</a></li>
                                    </ul> */}
                                    <select className="form-select mb-3 form-control fontWeight400" id="NameSelection" aria-label=".form-select-lg example">
                                      <option>Choose Name..</option>
                                      <option>Kyle</option>
                                      <option>James</option>
                                      <option>Chris</option>
                                    </select>

                                  </div>
                                  <div className="invalid-feedback">
                                    Valid first name is required.
                                  </div>
                                </div>

                                <div className="col-sm-6" style={{zIndex: '4'}}>
                                  <label htmlFor="lastName" className="form-label">Date Of Birth</label>
                                  {/* <input type="date" className="form-control" id="DateofBirth" placeholder="Select Date" defaultValue="" required="" ></input> */}
                                  <div className="form-control" style={{height: '38px'}}>
                                  <Datepicker />
                                  </div>
                                  <div className="invalid-feedback">
                                    Valid last name is required.
                                  </div>
                                </div>

                                <div className="col-12">
                                  <label htmlFor="username" className="form-label">Username</label>
                                  <div className="input-group has-validation">
                                    {/* <span className="input-group-text">@</span>
                                    <input type="text" className="form-control" id="username" placeholder="Username" required="" /> */}
                                     <select className="form-select mb-3 form-control fontWeight400" id="username" aria-label=".form-select-lg example">
                                      <option>Choose Category..</option>
                                      <option>Cadet Kata Male</option>
                                      <option>Cadet Kumite Female</option>
                                      <option>Cadet Kumite Male</option>
                                    </select>
                                    <div className="invalid-feedback">
                                      Your username is required.
                                    </div>
                                  </div>
                                </div>

                               

{/* 
                                <div className="col-md-5">
                                  <label htmlFor="country" className="form-label">Country</label>
                                  <select className="form-select" id="country" required="">
                                    <option defaultValue="">Choose...</option>
                                    <option>United States</option>
                                  </select>
                                  <div className="invalid-feedback">
                                    Please select a valid country.
                                  </div>
                                </div> */}

                                {/* <div className="col-md-4">
                                  <label htmlFor="state" className="form-label">State</label>
                                  <select className="form-select" id="state" required="">
                                    <option defaultValue="">Choose...</option>
                                    <option>California</option>
                                  </select>
                                  <div className="invalid-feedback">
                                    Please provide a valid state.
                                  </div>
                                </div> */}

                                {/* <div className="col-md-3">
                                  <label htmlFor="zip" className="form-label">Zip</label>
                                  <input type="text" className="form-control" id="zip" placeholder="" required="" />
                                  <div className="invalid-feedback">
                                    Zip code required.
                                  </div>
                                </div>*/}
                              </div> 

                            

                              <hr className="my-4" />

                              <h4 className="mb-3">Payment</h4>

                              <div className="my-3">
                                <div className="form-check">
                                  <input
                                    id="credit"
                                    name="paymentMethod"
                                    type="radio"
                                    className="form-check-input"
                                    // checked="" 
                                    required="" />
                                  <label className="form-check-label" htmlFor="credit">Credit card</label>
                                </div>
                                <div className="form-check">
                                  <input id="debit" name="paymentMethod" type="radio" className="form-check-input" required="" />
                                  <label className="form-check-label" htmlFor="debit">Debit card</label>
                                </div>
                                <div className="form-check">
                                  <input id="paypal" name="paymentMethod" type="radio" className="form-check-input" required="" />
                                  <label className="form-check-label" htmlFor="paypal">Gcash</label>
                                </div>
                              </div>

                              <div className="row gy-3">
                                <div className="col-md-6">
                                  <label htmlFor="cc-name" className="form-label">Name on card</label>
                                  <input type="text" className="form-control" id="cc-name" placeholder="" required="" />
                                  <small className="text-muted">Full name as displayed on card</small>
                                  <div className="invalid-feedback">
                                    Name on card is required
                                  </div>
                                </div>

                                <div className="col-md-6">
                                  <label htmlFor="cc-number" className="form-label">Credit card number</label>
                                  <input type="text" className="form-control" id="cc-number" placeholder="" required="" />
                                  <div className="invalid-feedback">
                                    Credit card number is required
                                  </div>
                                </div>

                                <div className="col-md-3">
                                  <label htmlFor="cc-expiration" className="form-label">Expiration</label>
                                  <input type="text" className="form-control" id="cc-expiration" placeholder="" required="" />
                                  <div className="invalid-feedback">
                                    Expiration date required
                                  </div>
                                </div>

                                <div className="col-md-3">
                                  <label htmlFor="cc-cvv" className="form-label">CVV</label>
                                  <input type="text" className="form-control" id="cc-cvv" placeholder="" required="" />
                                  <div className="invalid-feedback">
                                    Security code required
                                  </div>
                                </div>

                                <div className="col-md-6">
                                  <label htmlFor="uploadProof" className="form-label">Upload</label>
                                  <input type="file" className="form-control" id="uploadProof" placeholder="" required="" />
                                  <div className="invalid-feedback">
                                    Valid Payment Photo required
                                  </div>
                                </div>
                              </div>



                            </div>
                          </div>
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

