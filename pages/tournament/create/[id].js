import React, { useState, useEffect } from 'react'
import axios from 'axios';
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { getSession } from "next-auth/react"
import { authOptions } from '../../api/auth/[...nextauth]'
import { getServerSession } from "next-auth/next"
import ReactCountryFlag from 'react-country-flag';

function Index({id, email}) {
  return (
    <div>index</div>
  )
}

export default Index;

export async function getServerSideProps(context){
    const NEXT_PUBLIC_APP_ENV = process.env.NEXT_PUBLIC_APP_ENV;

    let NEXT_PUBLIC_API_URL;
  
    switch (NEXT_PUBLIC_APP_ENV) {
      case 'dev':
        NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_DEV_API_URL;
        break;
      case 'test':
        NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_NGROK_API_URL;
        break;
      case 'production':
        NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL;
        break;
      default:
        console.error('Invalid environment specified in NEXT_PUBLIC_APP_ENV');
        break;
    }
    const apiUrl = NEXT_PUBLIC_API_URL;
    const getTournamentEndPoint = "/api/getTournament?id="
  
}