import React, { useEffect } from 'react'
import TeamProfile from './TeamProfile';


export default function MyTeam({ onPageChange, teamItem }) {

  useEffect(() => {
    onPageChange(0);
  }, [onPageChange]);

  return (
    <div>
      <TeamProfile teamItem={teamItem} />

    </div>
  )
}
