import React, { useEffect } from 'react'
import AthletesProfile from './AthletesProfile';

export default function MyAthletes({ onPageChange }) {

  useEffect(() => {
    onPageChange(1);
  }, [onPageChange]);


  return (
    <div>
      <AthletesProfile />
    </div>
  )
}
