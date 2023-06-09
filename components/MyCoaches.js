import React from 'react'
import CoachesProfile from './CoachesProfile'

export default function MyCoaches({teamItem, coachlist }) {
  return (
    <div>
      <CoachesProfile teamItem={teamItem} coachlist={coachlist}/>
    </div>
  )
}
