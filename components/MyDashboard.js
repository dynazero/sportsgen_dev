import { useState, useEffect, useContext } from 'react'
import MyTeam from './MyTeam';
import MyAthletes from './MyAthletes';
import MyCoaches from './MyCoaches';
import MyOfficials from './MyOfficials';
import { UIContext } from '../pages/dashboard/index'


export default function MyDashboard() {
  const [currentPage, setCurrentPage] = useState(0)

  let {
    passPage,
    setCurPage,
  } = useContext(UIContext);


  useEffect(() => {
    switch (passPage) {
      case "myteam":
        setCurrentPage(0);
        setCurPage(0);
        break;
      case "myathletes":
        setCurrentPage(1);
        setCurPage(1);
        break;
      case "mycoaches":
        setCurrentPage(2);
        setCurPage(2);
        break;
      case "myofficials":
        setCurrentPage(3);
        setCurPage(3);
        break;
      default:
        setCurrentPage(0);
        setCurPage(0)
    }
  }, [passPage]);


  if (passPage === "myathletes") {
    return (
      <MyAthletes onPageChange={setCurrentPage} />
    )
  }
  
  if (passPage === "mycoaches") {
    return (
      <MyCoaches onPageChange={setCurrentPage} />
    )
  }

  if (passPage === "myofficials") {
    return (
      <MyOfficials onPageChange={setCurrentPage} />
    )
  }

  return (
    <MyTeam onPageChange={setCurrentPage} />
  )

}
