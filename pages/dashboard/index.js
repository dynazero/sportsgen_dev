import React, { useState } from 'react'
// import { useRouter } from 'next/router';
import { signIn, signOut, useSession } from "next-auth/react"
import Sidebar from '../../components/Sidebar'
import { authOptions } from '../api/auth/[...nextauth]'
import { getServerSession } from "next-auth/next"
import MyDashboard from '../../components/MyDashboard'



export default function dashboard() {
  // const router = useRouter()
  // const { params = [] } = router.query
  const [passSBS, setPassSBS] = useState(true)
  const [passPage, setPassPage] = useState('')
  const [curPage, setCurPage] = useState('')

  const mDB = passSBS ? "280px" : "0px"
  const mWidth = passSBS ?  "calc(100% - 280px)" : "100%"

  // console.log(curPage)
  // console.log(passPage)

  // default return
  return (
    <div className='dashboard'>
      <div className='sidebarWidth'>
        <Sidebar setPassSBS={setPassSBS} setPassPage={setPassPage} passPage={passPage} curPage={curPage}/>
      </div>
      <div className='mainDashboard'
        style={{
          left: mDB,
          transition: ".4s",
          width:mWidth
        }}>
        <MyDashboard passPage={passPage} setCurPage={setCurPage} />
      </div>
    </div>
  )
}


export async function getServerSideProps(context) {
  const session = await getServerSession(context.req, context.res, authOptions)

  if (!session) {
    return {
      redirect: {
        destination: '/',
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
