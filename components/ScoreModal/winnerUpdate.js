import React, { Suspense } from 'react'
import dynamic from 'next/dynamic';

const WinnerDefault = dynamic(() => import('./winnerDefault'), { loading: () => <p>Loading...</p> });
const WinnerConfirm = dynamic(() => import('./winnerConfirm'), { loading: () => <p>Loading...</p> });


const winnerImports = {
    0: WinnerDefault,
    1: WinnerConfirm
};


const WinnerUpdate = ({ pendingUpdate, matchCurrentDetail, setPendingUpdate, matchKey, winnerConfirm }) => {

    const ModalHandler = winnerImports[winnerConfirm];

    const genProps = {
        matchKey: matchKey,
        setPendingUpdate: setPendingUpdate,
        pendingUpdate: pendingUpdate
    }
    
    const defaultProps = {
        ...genProps
    }

    const confirmProps = {
        ...genProps,
        matchCurrentDetail: matchCurrentDetail
    }


    return (
        <>
            <h5>
                {winnerConfirm === 0 ? 'Select a winner:' : 'Confirm Details:'}
            </h5>

            {winnerConfirm === 0 ?
                <ModalHandler {...defaultProps} /> :
                <ModalHandler {...confirmProps} />
            }
        </>
    )
}

export default WinnerUpdate