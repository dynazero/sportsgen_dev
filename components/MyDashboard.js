import React, { useState, useEffect } from 'react'
import MyTeam from './MyTeam';
import MyAthletes from './MyAthletes';
import MyCoaches from './MyCoaches';
import MyOfficials from './MyOfficials';


export default function MyDashboard({
  passPage,
  setCurPage,
  verifiedFromServer,
  teamItem,
  athletelist,
  coachlist,
  officiallist,
  members,
  organizedUpcomingEvents,
  organizedOngoingEvents,
  upcomingEvents,
  archivedEvents,
  orgLiveTournaments,
  liveTournaments
}) {
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



  if (passPage === "myathletes") {

    return (
      <MyAthletes onPageChange={setCurrentPage} teamItem={teamItem} athletelist={athletelist} verifiedFromServer={verifiedFromServer} />
    )
  }
  if (passPage === "mycoaches") {


    return (

      <MyCoaches onPageChange={setCurrentPage} teamItem={teamItem} coachlist={coachlist} />
    )

  }

  if (passPage === "myofficials") {

    return (
      <MyOfficials onPageChange={setCurrentPage} teamItem={teamItem} officiallist={officiallist} />
    )
  }

  return (
    <MyTeam
      onPageChange={setCurrentPage}
      teamItem={teamItem}
      verifiedFromServer={verifiedFromServer}
      members={members}
      organizedUpcomingEvents={organizedUpcomingEvents}
      organizedOngoingEvents={organizedOngoingEvents}
      upcomingEvents={upcomingEvents}
      archivedEvents={archivedEvents}
      orgLiveTournaments={orgLiveTournaments}
      liveTournaments={liveTournaments}
    />
  )

}
