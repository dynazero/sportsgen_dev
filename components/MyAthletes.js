import React, { useEffect } from 'react'
import AthletesProfile from './AthletesProfile';

export default function MyAthletes({ onPageChange, teamItem, athletelist}) {

  useEffect(() => {
    onPageChange(1);
  }, [onPageChange]);



  return (
    <div>
      <AthletesProfile  teamItem={teamItem} athletelist={athletelist} />
    </div>
  )
}
