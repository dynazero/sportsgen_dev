import React, { useState, useEffect } from 'react'
import styles from './seta.module.css'

const SetA = ({ categorykey, categorySet, participantsCount, bracketList }) => {

  const [participant1, setParticipant1] = useState(bracketList[0].athleteName);
  const [participant2, setParticipant2] = useState(bracketList[1].athleteName);
  const [participant3, setParticipant3] = useState(bracketList[2].athleteName);
  const [participant4, setParticipant4] = useState(bracketList[3].athleteName);
  const [participant5, setParticipant5] = useState(bracketList[4].athleteName);
  const [participant6, setParticipant6] = useState(bracketList[5].athleteName);

  useEffect(() => {
    setParticipant1(bracketList[0].athleteName);
    setParticipant2(bracketList[1].athleteName);
    setParticipant3(bracketList[2].athleteName);
    setParticipant4(bracketList[3].athleteName);
    setParticipant5(bracketList[4].athleteName);
    setParticipant6(bracketList[5].athleteName);
  }, [bracketList])

  return (
    <div className={`${styles.rowWidth}`}>
      <table className={`table table-dark ${styles.table}`}>
        <thead>
          <tr>
            <th className={`${styles.thead}`}>Round 1</th>
            <th></th>
            <th className={`${styles.thead}`}>Round 2 / Semi Finals</th>
            <th></th>
            <th className={`${styles.thead}`}>Round 3/ Grand Finals</th>
            <th className={`${styles.headerChamp}`}>Champion</th>
          </tr>
        </thead>

        <tbody>
          <tr >
            <td>
              <div className={`${styles.participantsWrapperTop}`}>
                <div className={`${styles.participants}`}>
                  {participant1}
                  <p className={`${styles.score}`}>
                    0
                  </p>
                </div>
              </div>
              <div className={`${styles.matchesBorder}`}><small className={`${styles.matchIndicator}`}>A</small></div>
              <div className={`${styles.participantsWrapperBottom}`}>
                <div className={`${styles.participants}`}>
                  {participant2}
                  <p className={`${styles.score}`}>
                    0
                  </p>
                </div>
              </div>
            </td>
            <td className={`${styles.straightLine}`}>
              <svg height="100" width="100">
                {/* <path d="M50 24.5 H80 V24.5 H0" id="" fill="transparent" stroke="rgb(233, 236, 239)" strokeWidth="1"></path> */}
                <line x1="0" y1="24.5" x2="100" y2="24.5" style={{ stroke: "rgb(233, 236, 239)", strokeWidth: 1 }} />
              </svg>
            </td>
            <td>
              <div className={`${styles.participantsWrapperTop}`}>
                <div className={`${styles.participants}`}>
                  <p className={`${styles.standByText} ${styles.pmb}`}>
                    <small>
                      Match A winner
                    </small>
                  </p>
                  <p className={`${styles.score}`}>
                    0
                  </p>
                </div>
              </div>
              <div className={`${styles.matchesBorder}`}><small className={`${styles.matchIndicator}`}>C</small></div>
              <div className={`${styles.participantsWrapperBottom}`}>
                <div className={`${styles.participants}`}>
                  {participant5}
                  <p className={`${styles.score}`}>
                    0
                  </p>
                </div>
              </div>
            </td>
            <td className={`${styles.bracketToptoBot}`}>
              <svg height="100" width="100">
                <path d="M100 70.5 H30 V24.5 H0" id="" fill="transparent" stroke="rgb(233, 236, 239)" strokeWidth="1"></path>
              </svg>
            </td>
            <td className={`${styles.grandFinals}`}>
              <div className={`${styles.participantsWrapperTop}`}>
                <div className={`${styles.participants}`}>
                  <p className={`${styles.standByText} ${styles.pmb}`}>
                    <small>
                      Match C winner
                    </small>
                  </p>
                  <p className={`${styles.score}`}>
                    0
                  </p>
                </div>
              </div>
              <div className={`${styles.matchesBorder}`}><small className={`${styles.matchIndicator}`}>E</small></div>
              <div className={`${styles.participantsWrapperBottom}`}>
                <div className={`${styles.participants}`}>
                  <p className={`${styles.standByText} ${styles.pmb}`}>
                    <small>
                      Match D winner
                    </small>
                  </p>
                  <p className={`${styles.score}`}>
                    0
                  </p>
                </div>
              </div>
            </td>
            <td className={`${styles.champion}`}>
              <div className={`${styles.standByText}`}>
                Match E winner
              </div>
            </td>
          </tr>
          <tr >
            <td>
              <div className={`${styles.participantsWrapperTop}`}>
                <div className={`${styles.participants}`}>
                  {participant3}
                  <p className={`${styles.score}`}>
                    0
                  </p>
                </div>
              </div>
              <div className={`${styles.matchesBorder}`}><small className={`${styles.matchIndicator}`}>B</small></div>
              <div className={`${styles.participantsWrapperBottom}`}>
                <div className={`${styles.participants}`}>
                  {participant4}
                  <p className={`${styles.score}`}>
                    0
                  </p>
                </div>
              </div>
            </td>
            <td className={`${styles.matchBelowA} ${styles.straightLine}`}>
              <svg height="100" width="100">
                <line x1="0" y1="24.5" x2="100" y2="24.5" style={{ stroke: "rgb(233, 236, 239)", strokeWidth: 1 }} />
              </svg>
            </td>
            <td>
            <div className={`${styles.participantsWrapperTop}`}>
                <div className={`${styles.participants}`}>
                  <p className={`${styles.standByText} ${styles.pmb}`}>
                    <small>
                      Match B winner
                    </small>
                  </p>
                  <p className={`${styles.score}`}>
                    0
                  </p>
                </div>
              </div>
              <div className={`${styles.matchesBorder}`}><small className={`${styles.matchIndicator}`}>D</small></div>
              <div className={`${styles.participantsWrapperBottom}`}>
                <div className={`${styles.participants}`}>
                  {participant6}
                  <p className={`${styles.score}`}>
                    0
                  </p>
                </div>
              </div>
            </td>
            <td className={`${styles.matchBelowBracket}`}>
              <svg height="70" width="50">
                <path d="M30 0 H30 V53.5 H0" id="" fill="transparent" stroke="rgb(233, 236, 239)" strokeWidth="1"></path>
              </svg>
            </td>
          </tr>



        </tbody>
      </table>
    </div>
  )
}

export default SetA;