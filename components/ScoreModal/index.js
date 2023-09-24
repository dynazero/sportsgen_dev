import React, { Suspense } from 'react'
import dynamic from 'next/dynamic';
import styles from './scoremodal.module.css'

const ScoreUpdate = dynamic(() => import('./scoreUpdate'));
const WinnerUpdate = dynamic(() => import('./winnerUpdate'));


const modalImports = {
    0: ScoreUpdate,
    1: WinnerUpdate
};

const ScoreModal = ({ pendingUpdate, setPendingUpdate, matchKey, winnerUpdate, winnerConfirm  }) => {

    const ModalHandler = modalImports[winnerUpdate];

    const genProps = {
        matchKey: matchKey,
        pendingUpdate: pendingUpdate,
        setPendingUpdate: setPendingUpdate
      }

    const scoreProps = {
       ...genProps
      }

      const winnerProps = {
       ...genProps,
       winnerConfirm: winnerConfirm
      }

    return (
        <>
            <div>
                <strong>
                    <h4 className={`${styles.header}`}>Match {matchKey}</h4>
                </strong>
                <Suspense fallback={<div>Loading...</div>}>
                    {winnerUpdate === 0 ?
                        <ModalHandler {...scoreProps} /> :
                        <ModalHandler {...winnerProps} />}
                </Suspense>
                {/* <ScoreUpdate pendingUpdate={pendingUpdate} matchKey={matchKey} /> */}
            </div >
        </>
    )
}

export default ScoreModal;