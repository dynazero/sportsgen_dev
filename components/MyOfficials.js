import React from 'react'
import OfficialsProfile from './OfficialsProfile'

export default function MyOfficials( {teamItem, officiallist} ) {
  return (
    <div>
      <OfficialsProfile teamItem={teamItem} officiallist={officiallist} />
    </div>
  )
}
