import React, { useEffect, useState } from 'react'
import Cart from './cart'
import { toast } from 'react-toastify'


export default function RegistrationBody({ athletelist, events, eventId }) {

    const [athleteFill, setAthleteFill] = useState(false)
    const [athletes, setAthletes] = useState([])

    const [athleteName, setAthleteName] = useState()
    const [eventName, setEventName] = useState()

    const [cartEvents, setCartEvents] = useState([])

    useEffect(() => {
        if (athletelist.length !== 0) {
            setAthleteFill(true)
            setAthletes(athletelist)
        }


    }, [athletelist])

    const handleAdd = () => {
        setCartEvents((prevCartEvents) => {
            const existingIndex = prevCartEvents.findIndex((item) =>
                item.participant === athleteName && item.tournamentId === eventId
            );
    
            if (existingIndex !== -1) {
                toast.warning('This participant is already registered for this event');
                return prevCartEvents; // Return the previous state without any changes
            } else {
                const newObject = {
                    key: prevCartEvents.length + 1,
                    tournamentId: eventId,
                    participant: athleteName,
                    event: eventName
                };
                return [...prevCartEvents, newObject]; // Add the new object to the array
            }
        });
    };
    

    const SubmitHandler = async (e) => {
        e.preventDefault();

        if (athleteFill) {



        } else {
            toast.warning('Please sign up an athlete before registration');
        }


    }

    // console.log(eventId)
    // console.log(athleteName)
    // console.log(eventName)
    // console.log(cartEvents)

    return (
        <>
            <div className="row g-5">
                <div className="col-md-5 col-lg-4 order-md-last">
                    
                    <Cart cartEvents={cartEvents} />
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
                    <form onSubmit={SubmitHandler} className="needs-validation" noValidate="" />
                    <div className="row g-3">
                        <div className="col-sm-5">
                            <label htmlFor="firstName" className="form-label">Athlete Name</label>
                            {/* <input type="text" className="form-control" id="firstName" placeholder="" defaultValue="" required="" /> */}
                            <div>
                                {/* dropdown options */}
                                {/* <button class="btn btn-secondary dropdown-toggle form-control" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                      Choose a participant
                                    </button>
                                    <ul class="dropdown-menu">
                                      <li><h6 class="dropdown-header">Athletes:</h6></li>
                                      <li><a class="dropdown-item" href="#">Kyle</a></li>
                                      <li><a class="dropdown-item" href="#">Chris</a></li>
                                    </ul> */}
                                <select className="form-select mb-3 form-control fontWeight400" id="NameSelection" aria-label=".form-select-lg example"
                                  onChange={(event) => {
                                      setAthleteName(event.target.value)
                                  }}  
                                >
                                    {!athleteFill && (
                                        <option>Please Register an Athlete </option>
                                    )
                                    }
                                    {athleteFill && (
                                        <>
                                            <option>Choose Name..</option>
                                            {athletes.map((athlete, index) => (
                                                <option key={index} value={athlete._id}>
                                                    {athlete.lname}, {athlete.fname}
                                                </option>
                                            ))}
                                        </>
                                    )}
                                </select>

                            </div>
                            <div className="invalid-feedback">
                                Valid athlete name is required.
                            </div>
                        </div>

                        <div className="col-sm-5" style={{ zIndex: '4' }}>
                            <label htmlFor="category" className="form-label">Category</label>
                            <div className="input-group has-validation">
                                {/* <span className="input-group-text">@</span>
                                    <input type="text" className="form-control" id="username" placeholder="Username" required="" /> */}
                                <select className="form-select mb-3 form-control fontWeight400" id="username" aria-label=".form-select-lg example"
                                 onChange={(event) => {
                                    setEventName(event.target.value)
                                }}  >
                                    {events && (
                                        <>
                                            <option>Choose Category..</option>
                                            {
                                                events.map((event, index) => (
                                                    <option key={index} value={index}>{event}</option>
                                                ))
                                            }
                                        </>
                                    )
                                    }
                                    {/* <option>Choose Category..</option>
                                    <option>Cadet Kata Male</option>
                                    <option>Cadet Kumite Female</option>
                                    <option>Cadet Kumite Male</option> */}
                                </select>
                                <div className="invalid-feedback">
                                    Your category is required.
                                </div>
                            </div>
                        </div>

                        <div className="col-2 paddingTop">

                            <button className="btn btn-primary"
                            onClick={handleAdd}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-clipboard2-plus-fill" viewBox="0 0 16 16">
                                    <path d="M10 .5a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5.5.5 0 0 1-.5.5.5.5 0 0 0-.5.5V2a.5.5 0 0 0 .5.5h5A.5.5 0 0 0 11 2v-.5a.5.5 0 0 0-.5-.5.5.5 0 0 1-.5-.5Z" />
                                    <path d="M4.085 1H3.5A1.5 1.5 0 0 0 2 2.5v12A1.5 1.5 0 0 0 3.5 16h9a1.5 1.5 0 0 0 1.5-1.5v-12A1.5 1.5 0 0 0 12.5 1h-.585c.055.156.085.325.085.5V2a1.5 1.5 0 0 1-1.5 1.5h-5A1.5 1.5 0 0 1 4 2v-.5c0-.175.03-.344.085-.5ZM8.5 6.5V8H10a.5.5 0 0 1 0 1H8.5v1.5a.5.5 0 0 1-1 0V9H6a.5.5 0 0 1 0-1h1.5V6.5a.5.5 0 0 1 1 0Z" />
                                </svg>
                            </button>
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
        </>
    )
}
