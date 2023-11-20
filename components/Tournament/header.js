import { useState } from 'react'
import Image from 'next/image'
import ReactCountryFlag from 'react-country-flag';


const Header = ({ tournamentData, changeCategory, category, playersCount, participantsCount }) => {

    // Search for the specific event with the given categoryKey
    const eventWithCategory = tournamentData?.tournamentEvents?.find(event => event.categoryKey === parseInt(category));

    // If the event with the categoryKey is found, retrieve its maxParticipants value, otherwise set a default value
    const [maxParticipants, setMaxParticipants] = useState(eventWithCategory?.maxParticipants || 'Not Set');


    return (
        <div className={`row`}>
            <div className="col-lg-9 col-md-6 col-sm-6 align-self-start">
                <div className="card-body d-flex flex-column align-items-start">
                    <div className='row'>
                        <div className='col-md-12'>
                            <h3 className="mb-0">
                                <strong className="d-inline-block mb-2 text-primary text-nowrap">{tournamentData?.eventName}</strong>
                            </h3>
                        </div>
                        <div className='col-md-12'>
                            <div className='row'>
                                <div className='col-lg-4 col-md-12 col-sm-12'>
                                    <p className={`card-text mb-2`}>{tournamentData?.address}, {tournamentData?.city}</p>
                                </div>
                                <div className='col-lg-4 col-md-12 col-sm-12'>
                                    <div className={`mb-2 text-muted text-nowrap`}>{tournamentData?.eventStartDate}</div>
                                </div>
                            </div>
                        </div>
                        <div className='col-md-12'>
                            <div className="d-flex align-items-center justify-content-start">
                                <div className='row'>
                                    <div className='col-lg-4 col-md-12 col-sm-12'>
                                        <select
                                            className={`form-select mb-3 form-control fontWeight400`}
                                            id="NameSelection"
                                            aria-label=".form-select-lg example"
                                            onChange={(event => changeCategory(event.target.value))}
                                            defaultValue={category}
                                        >
                                            <>
                                                {tournamentData?.categorySet.map((category, index) => (
                                                    <option key={index} value={category.key}>
                                                        {category.title}
                                                    </option>
                                                ))}
                                            </>
                                        </select>
                                    </div>
                                    <div className='col-lg-2 col-md-12 col-sm-12'>
                                        <span className={`text-dark mb-2 text-nowrap `}>{playersCount} Players</span>
                                    </div>
                                    <div className='col-lg-3 col-md-12 col-sm-12'>
                                        <span className={`text-dark mb-2 text-nowrap`}>{maxParticipants} Max Players</span>
                                    </div>
                                    <div className='col-lg-3 col-md-12 col-sm-12'>
                                        <span className={`text-dark mb-2 text-nowrap`}>{participantsCount} Event Participants</span>
                                    </div>
                                </div>
                            </div>

                        </div>

                    </div>

                </div>
            </div>

            <div className="col-lg-3 col-md-6 col-sm-6">
                <div className={`card-body d-flex flex-column align-items-end`}>
                    <Image src={tournamentData?.eventLogo} alt='event logo' width={80} height={80} priority />
                    <strong className="d-inline-block mb-2 text-primary text-nowrap">Organized by:</strong>
                    <h5 className="mb-0">
                        <span className="text-dark" href="#">{tournamentData?.organizer}</span>
                        <ReactCountryFlag
                            countryCode={tournamentData?.flag}
                            svg
                            style={{
                                width: '32px',
                                height: '16px',
                            }}
                            title={tournamentData?.flag}
                        />
                    </h5>
                </div>
            </div>
        </div>
    )
}

export default Header;