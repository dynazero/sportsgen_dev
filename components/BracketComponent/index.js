import React, { useEffect, useState } from 'react'
import Set from './Matches/Set';
import styles from './bracketcomponent.module.css'



const BracketComponent = ({ categorykey, categorySet, tournamentInfo, handleFullScreen, setBracketFS, bracketFS }) => {


  const [selectedCategory, setSelectedCategory] = useState(parseInt(categorykey));
  const [participantsCount, setParticipantsCount] = useState(10);
  const [rounds, setRounds] = useState(3);
  const [matches, setMatches] = useState(5);

  const [semiFinalMatchesCount, setSemiFinalMatchesCount] = useState(2);
  const [semiFinalMatches, setSemiFinalMatches] = useState([]);

  const [grandFinalMatches, setGrandFinalMatches] = useState([]);

  useEffect(() => {
    setSelectedCategory(parseInt(categorykey))
  }, [categorykey])

  const minimizeFS = () => {
    setBracketFS(false)
  }

  return (
    <>
      <div className={`${styles.relativeDiv}`}>
        <p className={`${styles.fsLink}`}
          onClick={handleFullScreen}
        >
          Maximize <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-fullscreen" viewBox="0 0 16 16">
            <path d="M1.5 1a.5.5 0 0 0-.5.5v4a.5.5 0 0 1-1 0v-4A1.5 1.5 0 0 1 1.5 0h4a.5.5 0 0 1 0 1h-4zM10 .5a.5.5 0 0 1 .5-.5h4A1.5 1.5 0 0 1 16 1.5v4a.5.5 0 0 1-1 0v-4a.5.5 0 0 0-.5-.5h-4a.5.5 0 0 1-.5-.5zM.5 10a.5.5 0 0 1 .5.5v4a.5.5 0 0 0 .5.5h4a.5.5 0 0 1 0 1h-4A1.5 1.5 0 0 1 0 14.5v-4a.5.5 0 0 1 .5-.5zm15 0a.5.5 0 0 1 .5.5v4a1.5 1.5 0 0 1-1.5 1.5h-4a.5.5 0 0 1 0-1h4a.5.5 0 0 0 .5-.5v-4a.5.5 0 0 1 .5-.5z"></path>
          </svg>
        </p>
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
              <strong>
                {`${tournamentInfo.format}`}
              </strong>
            </div>
          }

          <div className={`d-flex justify-content-center ${!bracketFS ? styles.bracketWrapper : styles.bracketWrapperFS}`}>
            <Set participantsCount={participantsCount} bracketFS={bracketFS} />
            <p className={`${!bracketFS ? styles.hidemnmLink : styles.minimizeLink}`} onClick={minimizeFS}>
              Minimize <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-fullscreen-exit" viewBox="0 0 16 16">
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
