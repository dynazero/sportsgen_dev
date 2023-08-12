import React, { useEffect, useState } from 'react'
import Set from './Matches/Set';
import styles from './bracketcomponent.module.css'



const BracketComponent = ({ categorykey, categorySet }) => {

  
  const [selectedCategory, setSelectedCategory] = useState(parseInt(categorykey));
  const [participantsCount, setParticipantsCount] = useState(10);
  const [rounds, setRounds] = useState(3);
  const [matches, setMatches] = useState(5);

  const [semiFinalMatchesCount, setSemiFinalMatchesCount] = useState(2);
  const [semiFinalMatches, setSemiFinalMatches] = useState([]);

  const [grandFinalMatches, setGrandFinalMatches] = useState([]);

  useEffect(() => {
    setSelectedCategory(parseInt(categorykey))
  }, [categorykey])


  return (
    <>
      <div className={`d-flex justify-content-center ${styles.bracketWrapper}`}>
        <Set participantsCount={participantsCount}/>
      </div>
    </>


  )
}

export default BracketComponent;
