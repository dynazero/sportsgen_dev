import React, { useState } from 'react'

const ScoreUpdate = ({ pendingUpdate, setPendingUpdate, matchKey, onChangeScoreHandler }) => {

    const onChangeScoreSub = (e, matchKey, player) => {
        const value = e.target.value;

        setPendingUpdate((prevDetails) => ({
            ...prevDetails,
            [`match${matchKey}`]: {
                ...prevDetails[`match${matchKey}`],
                score: {
                    ...prevDetails[`match${matchKey}`].score,
                    [player]: value
                }
            }
        }));
    }

    // console.log('pendingUpdate', pendingUpdate);

    return (
        <>
            <div className='row mb-3'>
                <div className='col-9'>
                    <h4>{pendingUpdate?.[`match${matchKey}`]?.participant1}</h4>
                </div>
                <div className='col-3'>
                    <input type="number"
                        className="form-control"
                        placeholder="Score"
                        value={pendingUpdate?.[`match${matchKey}`]?.score.player1 || 0}
                        onChange={(e) => onChangeScoreSub(e, matchKey, 'player1')}
                    />
                </div>
            </div>
            <div className='row mb-3'>
                <div className='col-9'>
                    <h4>{pendingUpdate?.[`match${matchKey}`]?.participant2}</h4>
                </div>
                <div className='col-3'>
                    <input type="number"
                        className="form-control"
                        placeholder="Score"
                        value={pendingUpdate?.[`match${matchKey}`]?.score.player2 || 0}
                        onChange={(e) => onChangeScoreSub(e, matchKey, 'player2')}
                    />
                </div>

            </div>
        </>
    )
}

export default ScoreUpdate;