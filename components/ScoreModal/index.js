import React, { Suspense } from 'react'
import dynamic from 'next/dynamic';
import styles from './scoremodal.module.css'
import Link from 'next/link';
import match from '../../pages/scoreboard/[id]/[matchKey]';

const ScoreUpdate = dynamic(() => import('./scoreUpdate'));
const WinnerUpdate = dynamic(() => import('./winnerUpdate'));


const modalImports = {
    0: ScoreUpdate,
    1: WinnerUpdate
};

const ScoreModal = ({ tournamentSocketId, pendingUpdate, setPendingUpdate, matchKey, winnerUpdate, winnerConfirm }) => {

    const ModalHandler = modalImports[winnerUpdate];
    const match = 'match'+matchKey;

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
                <div className="d-flex justify-content-between">
                    <div className="p-2">
                        <strong>
                            <h4 className={`${styles.header}`}>Match {matchKey}</h4>
                        </strong>
                    </div>
                    <div className={`ml-auto p-2 ${styles.underLined}`}>
                        <Link target="_blank" href={`/scoreboard/${tournamentSocketId}/${match}`}rel="noopener noreferrer">
                            Score Board
                        </Link>
                    </div>
                </div>
                <div className={`${styles.scoreContainer}`}>
                    <Suspense fallback={<div>Loading...</div>}>
                        {winnerUpdate === 0 ?
                            <ModalHandler {...scoreProps} /> :
                            <ModalHandler {...winnerProps} />}
                    </Suspense>
                </div>

                {/* <ScoreUpdate pendingUpdate={pendingUpdate} matchKey={matchKey} /> */}
            </div >
        </>
    )
}

export default ScoreModal;