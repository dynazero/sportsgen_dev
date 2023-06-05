import React, { useState, useEffect } from 'react'
import MyTeam from './MyTeam';
import MyAthletes from './MyAthletes';
import MyCoaches from './MyCoaches';
import MyOfficials from './MyOfficials';

export default function MyDashboard({passPage, setCurPage, teamItem, athletelist}) {
  const [currentPage, setCurrentPage] = useState(0)

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


  // console.log(passPage)

  if (passPage === "myathletes") {

    return (
      <MyAthletes onPageChange={setCurrentPage} teamItem={teamItem} athletelist={athletelist} />
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
    <MyTeam onPageChange={setCurrentPage} teamItem={teamItem} />
  )

}
