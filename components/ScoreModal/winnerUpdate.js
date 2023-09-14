import React, { Suspense } from 'react'
import dynamic from 'next/dynamic';

const WinnerDefault = dynamic(() => import('./winnerDefault'));
const WinnerConfirm = dynamic(() => import('./winnerConfirm'));


const winnerImports = {
    0: WinnerDefault,
    1: WinnerConfirm
};


const WinnerUpdate = ({ pendingUpdate, setPendingUpdate, matchKey, winnerConfirm }) => {

    const ModalHandler = winnerImports[winnerConfirm];

    const genProps = {
        matchKey: matchKey,
        pendingUpdate: pendingUpdate,
        setPendingUpdate: setPendingUpdate
    }

    const defaultProps = {
        ...genProps,
    }

    const confirmProps = {
        ...genProps,
    }


    return (
        <>
            <h5>
                {winnerConfirm === 0 ? 'Select a winner:' : 'Confirm Details:'}
            </h5>

            <Suspense fallback={<div>Loading...</div>}>
                {winnerConfirm === 0 ?
                    <ModalHandler {...defaultProps} /> :
                    <ModalHandler {...confirmProps} />}
            </Suspense>
        </>
    )
}

export default WinnerUpdate