import { useState, useEffect } from 'react'
import styles from './setb.module.css'

const SetB = ({ categorykey, categorySet, participantsCount, bracketList }) => {

  const [participant1, setParticipant1] = useState(bracketList[0].athleteName);
  const [participant2, setParticipant2] = useState(bracketList[1].athleteName);
  const [participant3, setParticipant3] = useState(bracketList[2].athleteName);
  const [participant4, setParticipant4] = useState(bracketList[3].athleteName);
  const [participant5, setParticipant5] = useState(bracketList[4].athleteName);
  const [participant6, setParticipant6] = useState(bracketList[5].athleteName);
  const [participant7, setParticipant7] = useState(bracketList[6].athleteName);

  useEffect(() => {
    setParticipant1(bracketList[0].athleteName);
    setParticipant2(bracketList[1].athleteName);
    setParticipant3(bracketList[2].athleteName);
    setParticipant4(bracketList[3].athleteName);
    setParticipant5(bracketList[4].athleteName);
    setParticipant6(bracketList[5].athleteName);
    setParticipant7(bracketList[6].athleteName);
  }, [bracketList])

  return (
    <div className={`${styles.rowWidth}`}>
      <div className={`row ${styles.rowMinWidth}`}>
        <div className='col-12'>
          <table className={`table table-dark ${styles.table}`}>
            <thead>
              <tr>
                <th className={`${styles.thead}`}>Round 1</th>
                <th></th>
                <th className={`${styles.thead}`}>Round 2 / Semi Finals</th>
                <th></th>
                <th className={`${styles.thead}`}>Round 3 / Grand Finals</th>
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
                    <line x1="0" y1="25" x2="100" y2="24.5" style={{ stroke: "rgb(233, 236, 239)", strokeWidth: 1 }} />
                  </svg>
                </td>

                <td>
                  <div className={`${styles.participantsWrapperTop}`}>
                    <div className={`${styles.participants}`}>
                      {participant7}
                      <p className={`${styles.score}`}>
                        0
                      </p>
                    </div>
                  </div>
                  <div className={`${styles.matchesBorder}`}><small className={`${styles.matchIndicator}`}>D</small></div>
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
                <td className={`${styles.matchtoF} ${styles.bracketToptoBot} `}>
                  <svg height="101" width="100">
                    <path strokeWidth="1" stroke="rgb(233, 236, 239)" fill="transparent" id="" d="M100 100 H30 V24.5 H0"></path>
                  </svg>
                </td>
                <td className={`${styles.grandFinals}`}>
                  <div className={`${styles.participantsWrapperTop}`}>
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
                  <div className={`${styles.matchesBorder}`}><small className={`${styles.matchIndicator}`}>J</small></div>
                  <div className={`${styles.participantsWrapperBottom}`}>
                    <div className={`${styles.participants}`}>
                      <p className={`${styles.standByText} ${styles.pmb}`}>
                        <small>
                          Match E winner
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
                    Match J winner
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
                <td className={`${styles.straightLine}`}>
                  <svg height="100" width="100">
                    <path d="M100 70.5 H30 V24.5 H0" id="" fill="transparent" stroke="rgb(233, 236, 239)" strokeWidth="1"></path>
                  </svg>
                </td>
                <td className={`${styles.matchE}`}>
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
                  <div className={`${styles.matchesBorder}`}><small className={`${styles.matchIndicator}`}>E</small></div>
                  <div className={`${styles.participantsWrapperBottom}`}>
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
                </td>
                <td className={`${styles.matchBelowBracket}`}>
                  <svg height="100" width="50">
                    <path d="M50.5 28 H30 V100 H0" id="" fill="transparent" stroke="rgb(233, 236, 239)" strokeWidth="1"></path>
                  </svg>
                </td>
              </tr>
              <tr>
                <td>
                  <div className={`${styles.participantsWrapperTop}`}>
                    <div className={`${styles.participants}`}>
                      {participant5}
                      <p className={`${styles.score}`}>
                        0
                      </p>
                    </div>
                  </div>
                  <div className={`${styles.matchesBorder}`}><small className={`${styles.matchIndicator}`}>C</small></div>
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
                  <svg height="70" width="100">
                    <path d="M31 0 H30 V53.5 H0" id="" fill="transparent" stroke="rgb(233, 236, 239)" strokeWidth="1"></path>
                  </svg>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className='col-12'>
          <table className={`table table-dark ${styles.repTable}`}>
            <thead>
              <tr>
                <th className={`${styles.thead}`}>Repechage:</th>
                <th></th>
                <th className={`${styles.thead}`}></th>
                <th></th>
                <th className={`${styles.thead}`}></th>
                <th></th>
                <th className={`${styles.thead}`}>Repechage Finals</th>
                <th className={`${styles.headerSecondplace}`}>Second Place</th>
              </tr>
            </thead>
            <tbody>
              <tr >
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
                  <div className={`${styles.matchesBorder}`}><small className={`${styles.matchIndicator}`}>F</small></div>
                  <div className={`${styles.participantsWrapperBottom}`}>
                    <div className={`${styles.participants}`}>
                      <p className={`${styles.standByText} ${styles.pmb}`}>
                        <small>
                          Match C loser
                        </small>
                      </p>
                      <p className={`${styles.score}`}>
                        0
                      </p>
                    </div>
                  </div>
                </td>
                <td className={`${styles.straightLine}`}>
                  <svg height="100" width="100">
                    <line x1="0" y1="24.5" x2="100" y2="24.5" style={{ stroke: "rgb(233, 236, 239)", strokeWidth: 1 }} />
                  </svg>
                </td>
                <td>
                  <div className={`${styles.participantsWrapperTop}`}>
                    <div className={`${styles.participants}`}>
                      <p className={`${styles.standByText} ${styles.pmb}`}>
                        <small>
                          Match F winner
                        </small>
                      </p>
                      <p className={`${styles.score}`}>
                        0
                      </p>
                    </div>
                  </div>
                  <div className={`${styles.matchesBorder}`}><small className={`${styles.matchIndicator}`}>G</small></div>
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
                <td>
                  <svg height="101" width="100">
                    <path strokeWidth="1" stroke="rgb(233, 236, 239)" fill="transparent" id="" d="M100 100 H30 V24.5 H0">
                    </path>
                  </svg>
                </td>
                <td className={`${styles.repsemis}`}>
                  <div className={`${styles.participantsWrapperTop}`}>
                    <div className={`${styles.participants}`}>
                      <p className={`${styles.standByText} ${styles.pmb}`}>
                        <small>
                          Match G winner
                        </small>
                      </p>
                      <p className={`${styles.score}`}>
                        0
                      </p>
                    </div>
                  </div>
                  <div className={`${styles.matchesBorder}`}><small className={`${styles.matchIndicator}`}>I</small></div>
                  <div className={`${styles.participantsWrapperBottom}`}>
                    <div className={`${styles.participants}`}>
                      <p className={`${styles.standByText} ${styles.pmb}`}>
                        <small>
                          Match H winner
                        </small>
                      </p>
                      <p className={`${styles.score}`}>
                        0
                      </p>
                    </div>
                  </div>
                </td>
                <td className={`${styles.repbracketToptoBot}`}>
                  <svg className={`${styles.showSVG}`} height="100" width="100">
                    <path d="M102 25 H45 V88.5 H0" id="" fill="transparent" stroke="rgb(233, 236, 239)" strokeWidth="1"></path>
                  </svg>
                </td>
                <td className={`${styles.repgrandFinals}`}>
                  <div className={`${styles.participantsWrapperTop}`}>
                    <div className={`${styles.participants}`}>
                      <p className={`${styles.standByText} ${styles.pmb}`}>
                        <small>
                          Match J loser
                        </small>
                      </p>
                      <p className={`${styles.score}`}>
                        0
                      </p>
                    </div>
                  </div>
                  <div className={`${styles.matchesBorder}`}><small className={`${styles.matchIndicator}`}>K</small></div>
                  <div className={`${styles.participantsWrapperBottom}`}>
                    <div className={`${styles.participants}`}>
                      <p className={`${styles.standByText} ${styles.pmb}`}>
                        <small>
                          Match I winner
                        </small>
                      </p>
                      <p className={`${styles.score}`}>
                        0
                      </p>
                    </div>
                  </div>
                </td>
                <td className={`${styles.secondplace}`}>
                  <div className={`${styles.standByText}`}>
                    Match K winner
                  </div>
                </td>
              </tr>
              <tr >
                <td>
                </td>
                <td className={`${styles.matchBelowA} ${styles.straightLine}`}>
                </td>
                <td>
                  <div className={`${styles.participantsWrapperTop}`}>
                    <div className={`${styles.participants}`}>
                      <p className={`${styles.standByText} ${styles.pmb}`}>
                        <small>
                          Match D loser
                        </small>
                      </p>
                      <p className={`${styles.score}`}>
                        0
                      </p>
                    </div>
                  </div>
                  <div className={`${styles.matchesBorder}`}><small className={`${styles.matchIndicator}`}>H</small></div>
                  <div className={`${styles.participantsWrapperBottom}`}>
                    <div className={`${styles.participants}`}>
                      <p className={`${styles.standByText} ${styles.pmb}`}>
                        <small>
                          Match E loser
                        </small>
                      </p>
                      <p className={`${styles.score}`}>
                        0
                      </p>
                    </div>
                  </div>
                </td>
                <td className={`${styles.matchBelowBracket}`}>
                  <svg className={`${styles.showSVG}`} height="70" width="50">
                    <path d="M110 0 H30 V53.5 H0" id="" fill="transparent" stroke="rgb(233, 236, 239)" strokeWidth="1"></path>
                  </svg>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

    </div>

  )
}

export default SetB;