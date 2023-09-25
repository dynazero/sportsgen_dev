import React from 'react'
import styles from './winnerConfirm.module.css'

const WinnerConfirm = ({ pendingUpdate, matchKey }) => {
    // onChangeWinner

    return (
        <>
            <div className={`${styles.modalBG}`}>
                <table>
                    <tbody>
                        <tr>
                            <td>
                                <div className={`${styles.participantsWrapperTop}`}>
                                    <div className={`${styles.participants}`}>
                                        {pendingUpdate?.[`match${matchKey}`]?.participant1}
                                        <p className={`${styles.score}`}>
                                            {pendingUpdate?.[`match${matchKey}`]?.score.player1}
                                        </p>
                                    </div>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div className={`${styles.participantsWrapperBottom}`}>
                                    <div className={`${styles.participants}`}>
                                        {pendingUpdate?.[`match${matchKey}`]?.participant2}
                                        <p className={`${styles.score}`}>
                                            {pendingUpdate?.[`match${matchKey}`]?.score.player2}
                                        </p>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <svg className={`${styles.svgLine}`} height="80" width="50">
                                    {/* <path d="M50 24.5 H80 V24.5 H0" id="" fill="transparent" stroke="rgb(233, 236, 239)" strokeWidth="1"></path> */}
                                    <line x1="0" y1="24.5" x2="100" y2="24.5" style={{ stroke: "rgb(233, 236, 239)", strokeWidth: 1 }} />
                                </svg>
                            </td>
                            <td>
                                <div className={`${styles.winnerTag}`}>
                                    Winner
                                </div>
                            </td>
                            <td>
                                <div className={`${styles.winnerPlayer}`}>
                                    <div className={`${styles.winnerWrapper}`}>
                                        <div className={`${styles.winnerParticipant}`}>
                                            {pendingUpdate?.[`match${matchKey}`]?.winner}
                                        </div>
                                    </div>
                                </div>
                            </td>

                        </tr>
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default WinnerConfirm;