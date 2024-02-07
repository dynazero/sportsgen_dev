import { useEffect, useState } from 'react'
import Set from './Matches/Set';
import styles from './bracketcomponent.module.css'



const BracketComponent = ({ categorykey, categorySet, bracketList  }) => {


  const [selectedCategory, setSelectedCategory] = useState(parseInt(categorykey));
  const [participantsCount, setParticipantsCount] = useState(bracketList.length);
  const [rounds, setRounds] = useState(3);
  const [matches, setMatches] = useState(5);

  const [semiFinalMatchesCount, setSemiFinalMatchesCount] = useState(2);
  const [semiFinalMatches, setSemiFinalMatches] = useState([]);

  const [grandFinalMatches, setGrandFinalMatches] = useState([]);

  useEffect(() => {
    setSelectedCategory(parseInt(categorykey))
  }, [categorykey])

  const minimizeFS = () => {
    setBracketFS(false)
  }

  return (
    <>
      <div className={` ${styles.bracketWrapper}`}>
        <Set participantsCount={participantsCount} bracketList = {bracketList}  />
      </div>
    </>


  )
}

export default BracketComponent;
