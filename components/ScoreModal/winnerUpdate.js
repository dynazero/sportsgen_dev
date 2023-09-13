import React from 'react'

const WinnerUpdate = ({ pendingUpdate, matchKey, onChangeScoreHandler }) => {
    console.log('pendingUpdate', pendingUpdate);

    // onChangeWinner

    return (
        <>
            <select
                className="form-select"
                aria-label="scores"
                onChange={(e) => {
                    const value = e.target.value === 'default' ? null : e.target.value;
                    onChangeScoreHandler(e, [`match${matchKey}`], { score: value });
                }}
            >

                <option defaultValue={'default'}>Select athlete</option>
                <option value={'player1'}>
                    {pendingUpdate?.[`match${matchKey}`]?.participant1}
                </option>
                <option value={'player2'}>
                    {pendingUpdate?.[`match${matchKey}`]?.participant2}
                </option>
            </select>
        </>
    )
}

export default WinnerUpdate