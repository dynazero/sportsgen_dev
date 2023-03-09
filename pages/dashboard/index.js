import React from 'react'
import { signIn, signOut, useSession } from "next-auth/react"
import Sidebar from '../../components/Sidebar'
import { authOptions } from '../api/auth/[...nextauth]'
import { getServerSession } from "next-auth/next"


export default function index() {
  const { data: session } = useSession()
    return (
      
      <Sidebar />
      
    )
    
  }

  export async function getServerSideProps(context) {
    const session = await getServerSession(context.req, context.res, authOptions)
  
    if (!session) {
      return {
        redirect: {
          destination: '/unauthenticated',
          permanent: false,
        },
      }
    }
  
    return {
      props: {
        session,
      },
    }
  }
  

