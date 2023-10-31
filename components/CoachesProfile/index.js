import React, { useState, useEffect, useContext, useRef } from 'react';
import Link from 'next/link'
import { DashBoardDataContext } from '../../pages/dashboard/index'
import axios from 'axios';
import { useSession, getSession } from "next-auth/react"
import { motion } from 'framer-motion';
import Image from 'next/image'
import Create from './create';

export default function CoachesProfile() {

  const { data: session } = useSession()

  let {
    teamItem,
    coachlist,
} = useContext(DashBoardDataContext);

  let coaches = coachlist;

  const [team, setTeam] = useState('');


  const [clist, setClist] = useState(false)

  useEffect(() => {
    teamItem?.length === 0 ? setTeam() : setTeam(teamItem?.[0]?._id);
    coaches?.length === 0 ? setClist(false) : setClist(true);
  }, [teamItem, coaches]);
  
  

  return (
    <div className='container'>
      <div className="row ">
        {/* Athlete Registration */}
        <div className="col-6 p-3 mb-4 bg-light rounded-3 minW480" style={{
          marginRight: '30px'
        }}>
          <div className='p-2 panelDark rounded-3'>
            <div
              style={{
                paddingTop: '20px'
              }}
            >
              <div className='headerForm'>
                <h2 className="mb-3 p-3">Add Coach</h2>
              </div>
              <Create teamId={team} />
            </div>


          </div>
        </div>
        {/* Coach List */}
        <div className="col-5 p-3 mb-4 bg-light rounded-3 minW480 caret">
          <div className='p-2 panelDark rounded-3'>
            <table className="table table-striped">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Last</th>
                  <th scope="col">First</th>
                  {/* <th scope="col">Profile</th> */}
                </tr>
              </thead>
              <tbody>

                {!clist &&
                  (
                    <tr>
                      <td></td>
                      <td>No Coach Registered</td>
                      <td></td>
                    </tr>
                  )
                }

                {clist && coaches.map((item, i) => (
                  <tr key={item._id}>
                    <th scope="row" className='paddingList'>{item.sequence}</th>
                    <td className='paddingList'>{item.lname}</td>
                    <td className='paddingList'>{item.fname}</td>
                    {/* <td>
                      <Image src={item.imageURL} alt='athlete picture' width={50} height={50} priority />
                    </td> */}
                  </tr>
                ))}


              </tbody>
            </table>


          </div>

        </div>
      </div>

    </div>
  )
}
