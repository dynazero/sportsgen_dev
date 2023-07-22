import React, { useEffect } from 'react'
import TeamProfile from './TeamProfile';


export default function MyTeam({
  onPageChange,
  teamItem,
  verifiedFromServer,
  members,
  organizedUpcomingEvents,
  organizedOngoingEvents,
  upcomingEvents,
  archivedEvents,
  orgLiveTournaments,
  liveTournaments
}) {

  useEffect(() => {
    onPageChange(0);
  }, [onPageChange]);

  return (
    <div>
      <TeamProfile
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

    </div>
  )
}
