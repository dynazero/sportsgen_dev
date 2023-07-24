import React, { useEffect } from 'react'
import styles from './header.module.css'
import ReactCountryFlag from 'react-country-flag';


const Header = ({ tournamentData, changeCategory, category }) => {

    return (
        <div className="row">
            <div className="col">
                <div className="card-body d-flex flex-column align-items-start">
                    <h3 className="mb-0">
                        <strong className="d-inline-block mb-2 text-primary">{tournamentData.eventName}</strong>
                    </h3>
                    <div className="d-flex align-items-center justify-content-start">
                        <p className={`card-text mb-2 ${styles.margintextRight}`}>{tournamentData.address}, {tournamentData.city}</p>
                        <div className={`mb-2 text-muted ${styles.margintextRight}`}>{tournamentData.eventStartDate}</div>
                    </div>
                    <div className="d-flex align-items-center justify-content-start">
                        <select
                            className={`form-select mb-3 form-control fontWeight400 ${styles.margintextRight}`}
                            id="NameSelection"
                            aria-label=".form-select-lg example"
                            onChange={(event => changeCategory(event.target.value))}
                            defaultValue={category}
                        >
                            <>
                                {tournamentData.categorySet.map((category, index) => (
                                    <option key={index} value={category.key}>
                                        {category.title}
                                    </option>
                                ))}
                            </>
                        </select>
                        <span className={`text-dark mb-2 ${styles.margintextRight}`}>*6 Players</span>
                        <span className={`text-dark mb-2 ${styles.margintextRight}`}>{tournamentData.format}</span>
                    </div>
                </div>
            </div>

            <div className="col">
                <div className={`card-body d-flex flex-column align-items-end ${styles.textRight}`}>
                    <strong className="d-inline-block mb-2 text-primary">Organized by:</strong>
                    <h3 className="mb-0">
                        <span className="text-dark" href="#">{tournamentData.organizer}</span>
                        <ReactCountryFlag
                            countryCode={tournamentData.flag}
                            svg
                            style={{
                                width: '32px',
                                height: '16px',
                            }}
                            title={tournamentData.flag}
                        />
                    </h3>
                </div>
            </div>
        </div>
    )
}

export default Header;