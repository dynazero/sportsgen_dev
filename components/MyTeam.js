import React, { useEffect } from 'react'

export default function MyTeam({ onPageChange }) {

  useEffect(() => {
    onPageChange(0);
  }, [onPageChange]);

  return (
    <div>MyTeam</div>
  )
}
