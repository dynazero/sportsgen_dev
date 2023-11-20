

const WinnerDefault = ({ pendingUpdate, setPendingUpdate, matchKey }) => {

    const onChangeWinnerSub = (e, matchKey) => {
        const value = e.target.value;
        // console.log('called', value);
    
        if(value === 'default'){
            setPendingUpdate((prevDetails) => ({
                ...prevDetails,
                [`match${matchKey}`]: {
                    ...prevDetails[`match${matchKey}`],
                    winner: null,
                    loser: null
                }
            }));
    
            return null;
        }
    
        const currentMatch = pendingUpdate[`match${matchKey}`];
        const loser = value === currentMatch.participant1 ? currentMatch.participant2 : currentMatch.participant1;
    
        setPendingUpdate((prevDetails) => ({
            ...prevDetails,
            [`match${matchKey}`]: {
                ...prevDetails[`match${matchKey}`],
                winner: value,
                loser: loser
            }
        }));
    }
    

    return (
        <select
            className="form-select"
            aria-label="scores"
            onChange={(e) => onChangeWinnerSub(e, matchKey)}
            defaultValue={pendingUpdate?.[`match${matchKey}`]?.winner !== null ? pendingUpdate?.[`match${matchKey}`]?.winner : 'default' }
        >

            <option value='default'>Select athlete</option>
            <option value={pendingUpdate?.[`match${matchKey}`]?.participant1}>
                {pendingUpdate?.[`match${matchKey}`]?.participant1}
            </option>
            <option value={pendingUpdate?.[`match${matchKey}`]?.participant2}>
                {pendingUpdate?.[`match${matchKey}`]?.participant2}
            </option>
        </select>
    )
}

export default WinnerDefault;