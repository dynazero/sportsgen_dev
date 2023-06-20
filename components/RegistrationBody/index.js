import React, { useEffect, useState } from 'react'
import Cart from './cart'
import { toast } from 'react-toastify'
import PaymentMethods from '../PaymentMethods'


export default function RegistrationBody({ athletelist, events, eventId, entryFee }) {

    const [athleteFill, setAthleteFill] = useState(false)
    const [athletes, setAthletes] = useState([])

    const [athlete, setAthlete] = useState([])
    const [event, setEvent] = useState([])

    const [paymentInfo, setPaymentInfo] = useState([])
    const [cartEvents, setCartEvents] = useState([])

    useEffect(() => {
        if (athletelist.length !== 0) {
            setAthleteFill(true)
            setAthletes(athletelist)
        }
    }, [athletelist])

    const handleAdd = () => {
        setCartEvents((prevCartEvents) => {
            try {
                const participantId = athlete.athleteId;
                const participantName = athlete.athleteName;
                const categoryName = event.eventName;
                const categoryId = event.index;

                if (participantId == 'empty' || participantId == undefined) {
                    toast.warning('Please choose a participant');
                    return prevCartEvents; // Return the previous state without any changes
                }

                if (categoryId === 'empty' || categoryId === undefined) {
                    toast.warning('Please choose a category');
                    return prevCartEvents; // Return the previous state without any changes
                }

                // Check if the participant is already registered for the event
                const existingIndex = prevCartEvents.findIndex((item) =>
                    item.participantId === participantId && item.categoryId === categoryId && eventId === eventId
                );

                if (existingIndex !== -1) {
                    toast.warning('This participant is already registered for this event');
                    return prevCartEvents; // Return the previous state without any changes
                } else {
                    // Create a new object with the properties you extracted
                    const newObject = {
                        key: prevCartEvents.length + 1,
                        tournamentId: eventId,
                        categoryId: categoryId,
                        categoryName: categoryName,
                        participantName: participantName,
                        participantId: participantId,
                        entryFee: entryFee
                    };
                    return [...prevCartEvents, newObject]; // Add the new object to the array
                }
            } catch (error) {
                console.error("Error parsing JSON:", error);
                return prevCartEvents;
            }
        });
    };

    return (
        <>
            <div className="row g-5">
                <div className="col-md-5 col-lg-4 order-md-last">

                    <Cart
                        eventId={eventId}
                        cartEvents={cartEvents}
                        paymentInfo={paymentInfo}
                        athleteFill={athleteFill}
                    />

                </div>
                <div className="col-md-7 col-lg-8">
                    <h4 className="mb-3 caret">Fill up form</h4>
                    <div className="row g-3">
                        <div className="col-sm-5">
                            <label htmlFor="firstName" className="form-label">Athlete Name</label>
                            <div>
                                <select
                                    className="form-select mb-3 form-control fontWeight400"
                                    id="NameSelection"
                                    aria-label=".form-select-lg example"
                                    onChange={(event) => {
                                        // console.log('Value before parsing:', event.target.value); // Log the value before parsing
                                        try {
                                            setAthlete(JSON.parse(event.target.value));
                                        } catch (error) {
                                            console.error('Error parsing JSON:', error);
                                        }
                                    }}
                                >
                                    {!athleteFill && <option>Please Register an Athlete</option>}
                                    {athleteFill && (
                                        <>
                                            <option value={JSON.stringify({
                                                index: 'empty',
                                                eventName: 'empty',
                                            })}>
                                                Choose Name..</option>
                                            {athletes.map((athlete, index) => (
                                                <option
                                                    key={index}
                                                    value={JSON.stringify({
                                                        athleteId: athlete._id,
                                                        athleteName: `${athlete.lname}, ${athlete.fname}`,
                                                    })}
                                                >
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
                                <select
                                    className="form-select mb-3 form-control fontWeight400"
                                    id="username"
                                    aria-label=".form-select-lg example"
                                    onChange={(event) => {
                                        // console.log('Value before parsing:', event.target.value); // Log the value before parsing
                                        try {
                                            setEvent(JSON.parse(event.target.value));
                                        } catch (error) {
                                            console.error('Error parsing JSON:', error);
                                        }
                                    }}
                                >
                                    {events && (
                                        <>
                                            <option value={JSON.stringify({
                                                index: 'empty',
                                                eventName: 'empty',
                                            })}>
                                                Choose Category..</option>
                                            {events.map((event, index) => (
                                                <option
                                                    key={index}
                                                    value={JSON.stringify({
                                                        index: index,
                                                        eventName: event,
                                                    })}
                                                >
                                                    {event}
                                                </option>
                                            ))}
                                        </>
                                    )}
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
                    </div>
                    <hr className="my-4" />
                    <PaymentMethods paymentInfo={setPaymentInfo}/>

                </div>
            </div>
        </>
    )
}
