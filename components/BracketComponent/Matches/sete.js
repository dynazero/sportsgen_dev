import React, { useState } from 'react'
import styles from './sete.module.css'

const SetA = ({ categorykey, categorySet }) => {


  const [matchA, setMatchA] = useState();
  const [matchB, setMatchB] = useState();
  const [matchC, setMatchC] = useState();
  const [matchD, setMatchD] = useState();
  const [matchE, setMatchE] = useState();
  const [matchF, setMatchF] = useState();
  const [matchG, setMatchG] = useState();
  const [matchH, setMatchH] = useState();
  const [matchI, setMatchI] = useState();
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
                  Pacquiao
                  <p className={`${styles.score} ${styles.winner}`}>
                    24
                  </p>
                </div>
              </div>
              <div className={`${styles.matchesBorder}`}><small className={`${styles.matchIndicator}`}>A</small></div>
              <div className={`${styles.participantsWrapperBottom}`}>
                <div className={`${styles.participants}`}>
                  Barera
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
                  5
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
              <svg height="78" width="50">
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
                  6
                  <p className={`${styles.score}`}>
                    0
                  </p>
                </div>
              </div>
              <div className={`${styles.matchesBorder}`}><small className={`${styles.matchIndicator}`}>C</small></div>
              <div className={`${styles.participantsWrapperBottom}`}>
                <div className={`${styles.participants}`}>
                  7
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
                  3
                  <p className={`${styles.score}`}>
                    0
                  </p>
                </div>
              </div>
              <div className={`${styles.matchesBorder}`}><small className={`${styles.matchIndicator}`}>B</small></div>
              <div className={`${styles.participantsWrapperBottom}`}>
                <div className={`${styles.participants}`}>
                  4
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
                  8
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
              <svg height="110" width="50">
                <path d="M50.5 0 H30 V110 H0" id="" fill="transparent" stroke="rgb(233, 236, 239)" strokeWidth="1"></path>
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
                  9
                  <p className={`${styles.score}`}>
                    0
                  </p>
                </div>
              </div>
              <div className={`${styles.matchesBorder}`}><small className={`${styles.matchIndicator}`}>D</small></div>
              <div className={`${styles.participantsWrapperBottom}`}>
                <div className={`${styles.participants}`}>
                  10
                  <p className={`${styles.score}`}>
                    0
                  </p>
                </div>
              </div>
            </td>
            <td className={`${styles.matchBelowBracketC}`}>
              <svg height="70" width="110">
                <path d="M110 0 H30 V53.5 H0" id="" fill="transparent" stroke="rgb(233, 236, 239)" strokeWidth="1"></path>
              </svg>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

  )
}

export default SetA;