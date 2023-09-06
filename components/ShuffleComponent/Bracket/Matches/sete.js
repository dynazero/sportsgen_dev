import React, { useEffect, useState } from 'react'
import styles from './sete.module.css'
import { bottom } from '@popperjs/core';

const SetE = ({ categorykey, categorySet, participantsCount, bracketList }) => {

  const [participant1, setParticipant1] = useState(bracketList[0].athlete);
  const [participant2, setParticipant2] = useState(bracketList[1].athlete);
  const [participant3, setParticipant3] = useState(bracketList[2].athlete);
  const [participant4, setParticipant4] = useState(bracketList[3].athlete);
  const [participant5, setParticipant5] = useState(bracketList[4].athlete);
  const [participant6, setParticipant6] = useState(bracketList[5].athlete);
  const [participant7, setParticipant7] = useState(bracketList[6].athlete);
  const [participant8, setParticipant8] = useState(bracketList[7].athlete);
  const [participant9, setParticipant9] = useState(bracketList[8].athlete);
  const [participant10, setParticipant10] = useState(bracketList[9].athlete);

  useEffect(() => {
    setParticipant1(bracketList[0].athlete);
    setParticipant2(bracketList[1].athlete);
    setParticipant3(bracketList[2].athlete);
    setParticipant4(bracketList[3].athlete);
    setParticipant5(bracketList[4].athlete);
    setParticipant6(bracketList[5].athlete);
    setParticipant7(bracketList[6].athlete);
    setParticipant8(bracketList[7].athlete);
    setParticipant9(bracketList[8].athlete);
    setParticipant10(bracketList[9].athlete);
  }, [bracketList])


  return (
    <div className={`${styles.rowWidth}`}>

      <table className={`table table-dark ${styles.table}`}>
        <thead>
          <tr>
            <th className={`${styles.thead}`}>Round 1</th>
            <th></th>
            <th className={`${styles.thead}`}>Round 2</th>
            <th></th>
            <th className={`${styles.thead}`}>Round 3 / Semi Finals</th>
            <th></th>
            <th className={`${styles.thead}`}>Round 4 / Grand Finals</th>
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
            <td>
              <svg height="100" width="100">
                {/* <path d="M50 24.5 H80 V24.5 H0" id="" fill="transparent" stroke="rgb(233, 236, 239)" strokeWidth="1"></path> */}
                <line x1="0" y1="24.5" x2="100" y2="24.5" style={{ stroke: "rgb(233, 236, 239)", strokeWidth: 1 }} />
              </svg>
            </td>
            <td>
              <div className={`${styles.participantsWrapperTop}`}>
                <div className={`${styles.participants}`}>
                  {participant5}
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
                      Match A winner
                    </small>
                  </p>
                  <p className={`${styles.score}`}>
                    0
                  </p>
                </div>
              </div>
            </td>
            <td className={`${styles.matchtoF}`}>
              <svg height="78" width="50" style={{
                position: "relative"
              }} >
                <path strokeWidth="1" stroke="rgb(233, 236, 239)" fill="transparent" id="" d="M100 80 H30 V24.5 H0"></path>
              </svg>
            </td>
          </tr>
          <tr >
            <td></td>
            <td></td>
            <td>
              <div className={`${styles.participantsWrapperTop}`}>
                <div className={`${styles.participants}`}>
                  {participant6}
                  <p className={`${styles.score}`}>
                    0
                  </p>
                </div>
              </div>
              <div className={`${styles.matchesBorder}`}><small className={`${styles.matchIndicator}`}>C</small></div>
              <div className={`${styles.participantsWrapperBottom}`}>
                <div className={`${styles.participants}`}>
                  {participant7}
                  <p className={`${styles.score}`}>
                    0
                  </p>
                </div>
              </div>
            </td>
            <td className={`${styles.matchBelowBracketA}`}>
              <svg height="70" width="110">
                <path d="M110 0 H30 V53.5 H0" id="" fill="transparent" stroke="rgb(233, 236, 239)" strokeWidth="1"></path>
              </svg>
            </td>
            <td className={`${styles.matchG}`} >
              <div className={`${styles.participantsWrapperTop}`}>
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
              <div className={`${styles.matchesBorder}`}><small className={`${styles.matchIndicator}`}>G</small></div>
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
            <td className={`${styles.matchtoH}`}>
              <svg height="110" width="50">
                <path strokeWidth="1" stroke="rgb(233, 236, 239)" fill="transparent" id="" d="M100 110 H30 V0 H0"></path>
              </svg>
            </td>

            <td className={`${styles.grandFinals}`}>
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
            <td className={`${styles.champion}`}>
              <div className={`${styles.standByText}`}>
                Match I winner
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
            <td>
              <svg height="100" width="100">
                {/* <path d="M50 24.5 H80 V24.5 H0" id="" fill="transparent" stroke="rgb(233, 236, 239)" strokeWidth="1"></path> */}
                <line x1="0" y1="24.5" x2="100" y2="24.5" style={{ stroke: "rgb(233, 236, 239)", strokeWidth: 1 }} />
              </svg>
            </td>
            <td>
              <div className={`${styles.participantsWrapperTop}`}>
                <div className={`${styles.participants}`}>
                  {participant8}
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
                      Match B winner
                    </small>
                  </p>
                  <p className={`${styles.score}`}>
                    0
                  </p>
                </div>
              </div>
            </td>
            <td className={`${styles.matchtoF}`}>
              <svg height="78" width="50">
                <path strokeWidth="1" stroke="rgb(233, 236, 239)" fill="transparent" id="" d="M100 80 H30 V24.5 H0"></path>
              </svg>
            </td>

            <td className={`${styles.matchH}`}>
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
              <div className={`${styles.matchesBorder}`}><small className={`${styles.matchIndicator}`}>H</small></div>
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
            <td className={`${styles.matchBelowBracketB}`}>
              <svg height="110" width="50" style={{
                position: "relative",
              }} >
                <path
                  d="M50.5 0 H30 V110 H0"
                  id="" fill="transparent" stroke="rgb(233, 236, 239)" strokeWidth="1"></path>
              </svg>
            </td>
          </tr>
          <tr>

          </tr>
          <tr>
            <td></td>
            <td></td>
            <td className={`${styles.matchD}`}>
              <div className={`${styles.participantsWrapperTop}`}>
                <div className={`${styles.participants}`}>
                  {participant9}
                  <p className={`${styles.score}`}>
                    0
                  </p>
                </div>
              </div>
              <div className={`${styles.matchesBorder}`}><small className={`${styles.matchIndicator}`}>D</small></div>
              <div className={`${styles.participantsWrapperBottom}`}>
                <div className={`${styles.participants}`}>
                  {participant10}
                  <p className={`${styles.score}`}>
                    0
                  </p>
                </div>
              </div>
            </td>
            <td className={`${styles.matchBelowBracketC}`}>
              <svg height="70" width="110" style={{
                position: "relative",
              }} >
                <path
                  d="M110 0 H30 V53.5 H0"

                  id="" fill="transparent" stroke="rgb(233, 236, 239)" strokeWidth="1"></path>
              </svg>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

  )
}

export default SetE;