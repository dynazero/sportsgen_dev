import React, { useEffect, useState } from 'react';
import Set from './Matches/Set';
import styles from './bracketcomponent.module.css'


const BracketComponent = ({ categorykey, categorySet, tournamentInfo, participants, handleFullScreen, setBracketFS, bracketFS }) => {

  const reParticipants = {};

  for (let i = 0; i < participants.length; i++) {
    reParticipants[`participant${i + 1}`] = {
      // name : athlete[i].athlete.split(",")[1].trim(), // last name only
      name: participants[i].athleteName, 
      id: participants[i].athleteId
    }
  }

  const [selectedCategory, setSelectedCategory] = useState(parseInt(categorykey));
  const [participantsCount, setParticipantsCount] = useState(participants.length);

  useEffect(() => {
    setSelectedCategory(parseInt(categorykey))
  }, [categorykey])

  const minimizeFS = () => {
    setBracketFS(false)
  }

  return (
    <>
      <div className={`${styles.relativeDiv}`}>
        {/* <p className={`${!bracketFS ? styles.fsLink : styles.fsLinkHidden}`}
          onClick={handleFullScreen}
        >
          Max <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-fullscreen" viewBox="0 0 16 16">
            <path d="M1.5 1a.5.5 0 0 0-.5.5v4a.5.5 0 0 1-1 0v-4A1.5 1.5 0 0 1 1.5 0h4a.5.5 0 0 1 0 1h-4zM10 .5a.5.5 0 0 1 .5-.5h4A1.5 1.5 0 0 1 16 1.5v4a.5.5 0 0 1-1 0v-4a.5.5 0 0 0-.5-.5h-4a.5.5 0 0 1-.5-.5zM.5 10a.5.5 0 0 1 .5.5v4a.5.5 0 0 0 .5.5h4a.5.5 0 0 1 0 1h-4A1.5 1.5 0 0 1 0 14.5v-4a.5.5 0 0 1 .5-.5zm15 0a.5.5 0 0 1 .5.5v4a1.5 1.5 0 0 1-1.5 1.5h-4a.5.5 0 0 1 0-1h4a.5.5 0 0 0 .5-.5v-4a.5.5 0 0 1 .5-.5z"></path>
          </svg>
        </p> */}
      </div>



      <div className={`col-sm-12 ${!bracketFS ? styles.bracketContainer : styles.bracketContainerFS} ${bracketFS ? 'animate-bracket-container' : ''}`}>
        <React.Fragment>
          {bracketFS &&
            <div className={`${!bracketFS ? styles.hiddenBracketInfo : styles.bracketInfo}`}>
              <h3>
                {`${tournamentInfo.eventName}`}
              </h3>
              <strong>
                {`${tournamentInfo.title}`}
              </strong>
            </div>
          }

          <div className={`${!bracketFS ? styles.bracketWrapper : styles.bracketWrapperFS}`}>
            <Set categorykey={categorykey} categorySet={categorySet} participantsCount={participantsCount} bracketFS={bracketFS} tournamentInfo={tournamentInfo} reParticipants={reParticipants} />
            <p className={`${!bracketFS ? styles.hidemnmLink : styles.minimizeLink}`} onClick={minimizeFS}>
              Min <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-fullscreen-exit" viewBox="0 0 16 16">
                <path d="M5.5 0a.5.5 0 0 1 .5.5v4A1.5 1.5 0 0 1 4.5 6h-4a.5.5 0 0 1 0-1h4a.5.5 0 0 0 .5-.5v-4a.5.5 0 0 1 .5-.5zm5 0a.5.5 0 0 1 .5.5v4a.5.5 0 0 0 .5.5h4a.5.5 0 0 1 0 1h-4A1.5 1.5 0 0 1 10 4.5v-4a.5.5 0 0 1 .5-.5zM0 10.5a.5.5 0 0 1 .5-.5h4A1.5 1.5 0 0 1 6 11.5v4a.5.5 0 0 1-1 0v-4a.5.5 0 0 0-.5-.5h-4a.5.5 0 0 1-.5-.5zm10 1a1.5 1.5 0 0 1 1.5-1.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 0-.5.5v4a.5.5 0 0 1-1 0v-4z"></path>
              </svg>
            </p>
          </div>
        </React.Fragment>
      </div>
    </>
  )
}

export default BracketComponent;
