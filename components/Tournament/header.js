import React from 'react'
import styles from './header.module.css'
import ReactCountryFlag from 'react-country-flag';


const Header = () => {
    return (
        <div className="row">
            <div className="col">
                <div className="card-body d-flex flex-column align-items-start">
                    <h3 className="mb-0">
                        <strong className="d-inline-block mb-2 text-primary">Tournament Name</strong>
                    </h3>
                    <div className="d-flex align-items-center justify-content-start">
                        <p className={`card-text mb-2 ${styles.margintextRight}`}>Ynares,Pasig</p>
                        <div className={`mb-2 text-muted ${styles.margintextRight}`}>Jun 28 2023</div>
                    </div>
                    <div className="d-flex align-items-center justify-content-start">
                        <select
                            className={`form-select mb-3 form-control fontWeight400 ${styles.margintextRight}`}
                            id="NameSelection"
                            aria-label=".form-select-lg example"
                        // onChange={(event) => {
                        //   // console.log('Value before parsing:', event.target.value); // Log the value before parsing
                        //   try {
                        //     setAthlete(JSON.parse(event.target.value));
                        //   } catch (error) {
                        //     console.error('Error parsing JSON:', error);
                        //   }
                        // }}
                        >
                            {/* {!athleteFill && <option>Please Register an Athlete</option>}
            {athleteFill && ( */}
                            <>
                                <option value="Event 1"
                                // {JSON.stringify({
                                //   index: 'empty',
                                //   eventName: 'empty',
                                // })}
                                >
                                    Event Number 1 </option>
                                {/* {athletes.map((athlete, index) => ( */}
                                <option
                                    key={1}
                                    value='Event 2'
                                // {JSON.stringify({
                                //   athleteId: athlete._id,
                                //   athleteName: `${athlete.lname}, ${athlete.fname}`,
                                // })}
                                >
                                    Event Number 2
                                </option>
                                {/* ))} */}
                            </>
                            {/* )} */}
                        </select>
                        <span className={`text-dark mb-2 ${styles.margintextRight}`}>5 Players</span>
                        <span className={`text-dark mb-2 ${styles.margintextRight}`}>Single Elimination</span>
                    </div>
                </div>
            </div>

            <div className="col">
                <div className={`card-body d-flex flex-column align-items-end ${styles.textRight}`}>
                    <strong className="d-inline-block mb-2 text-primary">Organized by:</strong>
                    <h3 className="mb-0">
                        <span className="text-dark" href="#">Sportsgenph</span>
                        <ReactCountryFlag
                            countryCode='PH'
                            svg
                            style={{
                                width: '32px',
                                height: '16px',
                            }}
                            title='PH'
                        />
                    </h3>
                </div>
            </div>
        </div>
    )
}

export default Header;