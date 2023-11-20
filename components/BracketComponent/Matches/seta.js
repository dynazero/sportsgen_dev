import styles from './seta.module.css'

const SetA = ({ categorykey, categorySet, participantsCount, bracketList }) => {



  return (
    <div className={`${styles.rowWidth}`}>
      <table className={`table table-dark ${styles.table}`}>
        <thead>
          <tr>
            <th className={`${styles.thead}`}>Round 1</th>
            <th className={`${styles.thead}`}></th>
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
            <td>
              <svg height="100" width="100">
                {/* <path d="M50 24.5 H80 V24.5 H0" id="" fill="transparent" stroke="rgb(233, 236, 239)" strokeWidth="1"></path> */}
                <line x1="0" y1="24.5" x2="100" y2="24.5" style={{ stroke: "rgb(233, 236, 239)", strokeWidth: 1 }} />
              </svg>
            </td>
            <td>
              <div className={`${styles.standByText}`}>
                Match A winner
              </div>
              <div className={`${styles.matchesBorder}`}><small className={`${styles.matchIndicator}`}>C</small></div>
              <div className={`${styles.participants}`}>
                5
              </div>
            </td>
            <td>
              <svg height="100" width="50">
                <path d="M50 70.5 H30 V24.5 H0" id="" fill="transparent" stroke="rgb(233, 236, 239)" strokeWidth="1"></path>
              </svg>
            </td>
            <td className={`${styles.grandFinals}`}>
              <div className={`${styles.standByText}`}>
                Match C winner
              </div>
              <div className={`${styles.matchesBorder}`}><small className={`${styles.matchIndicator}`}>E</small></div>
              <div className={`${styles.standByText}`}>
                Match D winner
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
              <div className={`${styles.participants}`}>
                3
              </div>
              <div className={`${styles.matchesBorder}`}><small className={`${styles.matchIndicator}`}>B</small></div>
              <div className={`${styles.participants}`}>
                4
              </div>
            </td>
            <td className={`${styles.matchBelowA}`}>
              <svg height="100" width="100">
                {/* <path d="M50.5 0 H30 V53.5 H0" id="" fill="transparent" stroke="rgb(233, 236, 239)" strokeWidth="1"></path> */}
                <line x1="0" y1="24.5" x2="100" y2="24.5" style={{ stroke: "rgb(233, 236, 239)", strokeWidth: 1 }} />
              </svg>
            </td>
            <td>
              <div className={`${styles.standByText}`}>
                Match B winner
              </div>
              <div className={`${styles.matchesBorder}`}><small className={`${styles.matchIndicator}`}>D</small></div>
              <div className={`${styles.participants}`}>
                6
              </div>
            </td>
            <td className={`${styles.matchBelowBracket}`}>
              <svg height="70" width="50">
                <path d="M50.5 0 H30 V53.5 H0" id="" fill="transparent" stroke="rgb(233, 236, 239)" strokeWidth="1"></path>
              </svg>
            </td>
          </tr>



        </tbody>
      </table>
    </div >
  )
}

export default SetA;