import { useState, useEffect } from 'react'
import styles from './setalpha.module.css'

const SetAlpha = ({ bracketList }) => {

  const [participant1, setParticipant1] = useState(bracketList[0].athleteName);
  const [participant2, setParticipant2] = useState(bracketList[1].athleteName);
  const [participant3, setParticipant3] = useState(bracketList[2].athleteName);

  useEffect(() => {
    setParticipant1(bracketList[0].athleteName);
    setParticipant2(bracketList[1].athleteName);
    setParticipant3(bracketList[2].athleteName);
  }, [bracketList])

  return (
    <div className={`${styles.rowWidth}`}>
      <div className='row'>
        <div className='col-12'>
          <table className={`table table-dark ${styles.table}`}>
            <thead>
              <tr>
                <th className={`${styles.thead}`}>Semi Finals</th>
                <th></th>
                <th className={`${styles.thead}`}>Grand Finals</th>
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
                <td className={`${styles.grandFinals}`}>
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
                </td>
                <td className={`${styles.champion}`}>
                  <div className={`${styles.standByText}`}>
                    Match E winner
                  </div>
                </td>
              </tr>
              <tr >
              </tr>
            </tbody>
          </table>
        </div>
        <div className='col-12'>
          <table className={`table table-dark ${styles.repTable}`}>
            <thead>
              <tr>
                <th className={`${styles.thead}`}>Repechage round</th>
                <th></th>
                <th className={`${styles.headerChamp}`}>Second Place</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <div className={`${styles.participantsWrapperTop}`}>
                    <div className={`${styles.participants}`}>
                      <p className={`${styles.standByText} ${styles.pmb}`}>
                        <small>
                          Match A loser
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
                      <p className={`${styles.standByText} ${styles.pmb}`}>
                        <small>
                          Match B loser
                        </small>
                      </p>
                      <p className={`${styles.score}`}>
                        0
                      </p>
                    </div>
                  </div>
                </td>
                <td className={`${styles.straightLine}`}>
                 
                </td>
                <td className={`${styles.secondplace}`}>
                  <div className={`${styles.standByText}`}>
                    Match C winner
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default SetAlpha;