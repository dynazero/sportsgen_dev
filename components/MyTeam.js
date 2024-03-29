import { useEffect } from 'react'
import TeamProfile from './TeamProfile';

export default function MyTeam({ onPageChange }) {

  useEffect(() => {
    onPageChange(0);
  }, [onPageChange]);

  return (
    <div>
      <TeamProfile />
    </div>
  )
}
