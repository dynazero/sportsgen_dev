import React from 'react'
import styles from './setc.module.css'

const SetA = ({ categorykey, categorySet }) => {
  return (
    <div className={`${styles.rowWidth}`}>
      <table className={`table table-dark ${styles.table}`}>
        <thead>
          <tr>
            <th>Round 1</th>
            <th></th>
            <th>Round 2 / Semi Finals</th>
            <th></th>
            <th>Round 3 / Grand Finals</th>
            <th className={`${styles.headerChamp}`}>Champion</th>
          </tr>
        </thead>

        <tbody>
          <tr >
            <td>
              <div className={`${styles.participants}`}>
                1
              </div>
              <div className={`${styles.matchesBorder}`}><small className={`${styles.matchIndicator}`}>A</small></div>
              <div className={`${styles.participants}`}>
                2
              </div>
            </td>
            <td className={`${styles.matchtoF}`}>
              <svg height="72" width="50">
                <path strokeWidth="1" stroke="rgb(233, 236, 239)" fill="transparent" id="" d="M100 80 H30 V24.5 H0"></path>
              </svg>
            </td>
            <td className={`${styles.matchE}`} >
              <div className={`${styles.standByText}`}>
                Match A winner
              </div>
              <div className={`${styles.matchesBorder}`}><small className={`${styles.matchIndicator}`}>E</small></div>
              <div className={`${styles.standByText}`}>
                Match B winner
              </div>
            </td>
            <td className={`${styles.matchtoG}`}>
              <svg height="100" width="50">
                <path strokeWidth="1" stroke="rgb(233, 236, 239)" fill="transparent" id="" d="M100 100 H30 V14.5 H0"></path>
              </svg>
            </td>
            <td className={`${styles.grandFinals}`}>
              <div className={`${styles.standByText}`}>
                Match D winner
              </div>
              <div className={`${styles.matchesBorder}`}><small className={`${styles.matchIndicator}`}>G</small></div>
              <div className={`${styles.standByText}`}>
                Match E winner
              </div>
            </td>
            <td className={`${styles.champion}`}>
              <div className={`${styles.standByText}`}>
                Match F winner
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
            <td className={`${styles.matchBelowBracketA}`}>
              <svg height="70" width="100">
                <path d="M100 0 H30 V53.5 H0" id="" fill="transparent" stroke="rgb(233, 236, 239)" strokeWidth="1"></path>
              </svg>
            </td>
            <td className={`${styles.matchF}`}>
              <div className={`${styles.standByText}`}>
                Match C winner
              </div>
              <div className={`${styles.matchesBorder}`}><small className={`${styles.matchIndicator}`}>F</small></div>
              <div className={`${styles.standByText}`}>
                Match D winner
              </div>
            </td>
            <td className={`${styles.matchBelowBracketB}`}>
              <svg height="100" width="50">
                <path d="M50.5 28 H30 V100 H0" id="" fill="transparent" stroke="rgb(233, 236, 239)" strokeWidth="1"></path>
              </svg>
            </td>
          </tr>
          <tr>
            <td>
              <div className={`${styles.participants}`}>
                5
              </div>
              <div className={`${styles.matchesBorder}`}><small className={`${styles.matchIndicator}`}>C</small></div>
              <div className={`${styles.participants}`}>
                6
              </div>
            </td>
            <td className={`${styles.matchtoF}`}>
              <svg height="72" width="50">
                <path strokeWidth="1" stroke="rgb(233, 236, 239)" fill="transparent" id="" d="M100 80 H30 V24.5 H0"></path>
              </svg>
            </td>
          </tr>
          <tr>
            <td>
              <div className={`${styles.participants}`}>
                7
              </div>
              <div className={`${styles.matchesBorder}`}><small className={`${styles.matchIndicator}`}>D</small></div>
              <div className={`${styles.participants}`}>
                8
              </div>
            </td>
            <td className={`${styles.matchBelowBracketA}`}>
              <svg height="70" width="100">
                <path d="M100 0 H30 V53.5 H0" id="" fill="transparent" stroke="rgb(233, 236, 239)" strokeWidth="1"></path>
              </svg>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

  )
}

export default SetA;