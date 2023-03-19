import React, { useEffect } from 'react'

export default function MyAthletes({ onPageChange }) {

  useEffect(() => {
    onPageChange(1);
  }, [onPageChange]);


  return (
    <div>MyAthletes</div>
  )
}
