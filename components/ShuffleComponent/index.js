import React, { useState, useEffect } from 'react'
import styles from './shuffle.module.css'
import BracketComponent from './Bracket';


const ShuffleComponent = ({ categorykey, categorySet, bracketList, startTournament, shuffle }) => {

    const [selectedCategory, setSelectedCategory] = useState(parseInt(categorykey))

    useEffect(() => {
        setSelectedCategory(parseInt(categorykey))
    }, [categorykey])


    return (
        <>
            <div className={`${styles.shuffleComponentWrapper}`}>
                {categorySet.map(category => {
                    const filteredParticipants = bracketList.filter(participant => category.key === parseInt(participant.eventKey));
                    if (category.key === selectedCategory) {
                        return (
                            <React.Fragment key={`participantsWrapper${selectedCategory}`}>
                                {filteredParticipants.length === 0 ? (<div key={`nopart${selectedCategory}`}> There are no participants</div>) : (
                                    <React.Fragment key={`participantsContainer${setSelectedCategory}`}>
                                        <div key={`buttons${category.key}`} className={`${styles.buttonToggleWrapper} `} id={`pills-tab-org`} role="tablist" aria-label="Toggle Board">
                                            <button type="button" className={`btn btn-secondary ${styles.shuffle}`} onClick={() => shuffle()} >
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-shuffle" viewBox="0 0 16 16">
                                                    <path fillRule="evenodd" d="M0 3.5A.5.5 0 0 1 .5 3H1c2.202 0 3.827 1.24 4.874 2.418.49.552.865 1.102 1.126 1.532.26-.43.636-.98 1.126-1.532C9.173 4.24 10.798 3 13 3v1c-1.798 0-3.173 1.01-4.126 2.082A9.624 9.624 0 0 0 7.556 8a9.624 9.624 0 0 0 1.317 1.918C9.828 10.99 11.204 12 13 12v1c-2.202 0-3.827-1.24-4.874-2.418A10.595 10.595 0 0 1 7 9.05c-.26.43-.636.98-1.126 1.532C4.827 11.76 3.202 13 1 13H.5a.5.5 0 0 1 0-1H1c1.798 0 3.173-1.01 4.126-2.082A9.624 9.624 0 0 0 6.444 8a9.624 9.624 0 0 0-1.317-1.918C4.172 5.01 2.796 4 1 4H.5a.5.5 0 0 1-.5-.5z"></path>
                                                    <path d="M13 5.466V1.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384l-2.36 1.966a.25.25 0 0 1-.41-.192zm0 9v-3.932a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384l-2.36 1.966a.25.25 0 0 1-.41-.192z"></path>
                                                </svg>
                                                &nbsp;Shuffle
                                            </button>
                                            <button className={`btn btn-outline-secondary active ${styles.toggle} `} id={`pills-list-tab${selectedCategory}`} data-bs-toggle="pill" data-bs-target={`#pills-list${selectedCategory}`} type="button" role="tab" aria-controls="pills-list" aria-selected="false">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-list-ol" viewBox="0 0 16 16">
                                                    <path fillRule="evenodd" d="M5 11.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5z" />
                                                    <path d="M1.713 11.865v-.474H2c.217 0 .363-.137.363-.317 0-.185-.158-.31-.361-.31-.223 0-.367.152-.373.31h-.59c.016-.467.373-.787.986-.787.588-.002.954.291.957.703a.595.595 0 0 1-.492.594v.033a.615.615 0 0 1 .569.631c.003.533-.502.8-1.051.8-.656 0-1-.37-1.008-.794h.582c.008.178.186.306.422.309.254 0 .424-.145.422-.35-.002-.195-.155-.348-.414-.348h-.3zm-.004-4.699h-.604v-.035c0-.408.295-.844.958-.844.583 0 .96.326.96.756 0 .389-.257.617-.476.848l-.537.572v.03h1.054V9H1.143v-.395l.957-.99c.138-.142.293-.304.293-.508 0-.18-.147-.32-.342-.32a.33.33 0 0 0-.342.338v.041zM2.564 5h-.635V2.924h-.031l-.598.42v-.567l.629-.443h.635V5z" />
                                                </svg>
                                            </button>
                                            <button className={`btn btn-outline-secondary  ${styles.toggle} `} id={`pills-bracket-tab${selectedCategory}`} data-bs-toggle="pill" data-bs-target={`#pills-bracket${selectedCategory}`} type="button" role="tab" aria-controls="pills-bracket" aria-selected="false">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-grid" viewBox="0 0 16 16">
                                                    <path d="M1 2.5A1.5 1.5 0 0 1 2.5 1h3A1.5 1.5 0 0 1 7 2.5v3A1.5 1.5 0 0 1 5.5 7h-3A1.5 1.5 0 0 1 1 5.5v-3zM2.5 2a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3zm6.5.5A1.5 1.5 0 0 1 10.5 1h3A1.5 1.5 0 0 1 15 2.5v3A1.5 1.5 0 0 1 13.5 7h-3A1.5 1.5 0 0 1 9 5.5v-3zm1.5-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3zM1 10.5A1.5 1.5 0 0 1 2.5 9h3A1.5 1.5 0 0 1 7 10.5v3A1.5 1.5 0 0 1 5.5 15h-3A1.5 1.5 0 0 1 1 13.5v-3zm1.5-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3zm6.5.5A1.5 1.5 0 0 1 10.5 9h3a1.5 1.5 0 0 1 1.5 1.5v3a1.5 1.5 0 0 1-1.5 1.5h-3A1.5 1.5 0 0 1 9 13.5v-3zm1.5-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3z" />
                                                </svg>
                                            </button>
                                            <button type="button" className={`btn btn-danger ${styles.start}`} onClick={() => startTournament()}>
                                                Start Tournament&nbsp;
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-play-fill" viewBox="0 0 16 16">
                                                    <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z" />
                                                </svg>
                                            </button>
                                        </div>

                                        <div className="tab-content" id={`pills-tabContent-org`}>
                                            <div className="tab-pane fade show active" id={`pills-list${selectedCategory}`} role="tabpanel" aria-labelledby="pills-list-tab">
                                                {filteredParticipants.map((participant, index) => (
                                                    <div key={`athlete${index}`}>
                                                        <p>{index + 1}.  <strong>{participant.athlete}</strong></p>
                                                    </div>
                                                )
                                                )}
                                            </div>
                                            <div className="tab-pane fade show " id={`pills-bracket${selectedCategory}`} role="tabpanel" aria-labelledby="pills-bracket-tab">
                                                <BracketComponent categorykey={categorykey} categorySet={categorySet} bracketList={filteredParticipants} />
                                            </div>
                                        </div>
                                    </React.Fragment>
                                )}

                            </React.Fragment>
                        )
                    } else {
                        <div key={`error${selectedCategory}`}>
                            NO DATA
                        </div>
                    }

                })}
            </div>
        </>
    )
}

export default ShuffleComponent