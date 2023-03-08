import React from 'react'
import { signIn, signOut, useSession } from "next-auth/react"


export default function index() {
  const { data: session } = useSession()

console.log(session)

if (session){
return (
<>
<div className="mat-sidebar">
    <h3 className='text-gray-100'>Hi {session.user.name}</h3>
    <hr className="horizontal bg-gray-100 mt-0 mb-2"/>
</div>
</>
)
}

if(!session){
    return <div> No session </div>
}
}
