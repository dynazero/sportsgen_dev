import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link'
import axios from 'axios';
import { useSession, getSession } from "next-auth/react"
import { motion } from 'framer-motion';
import Image from 'next/image'
import Create from './create';

export default function AthletesProfile({ teamItem, athletelist }) {

  const { data: session } = useSession()

  let athletes = athletelist;

  const [team, setTeam] = useState('');
  const [country, setCountry] = useState('');


  const [alist, setAlist] = useState(false)

  useEffect(() => {
    teamItem?.length === 0 ? setTeam() : setTeam(teamItem?.[0]?._id);
    teamItem?.length === 0 ? setCountry() : setCountry(teamItem?.[0]?.country);
    athletes?.length === 0 ? setAlist(false)  : setAlist(true);

   
  }, [teamItem, athletes]);
  

  return (
    <div className='container'>
      <div className="row ">
        {/* Athlete Registration */}
        <div className="col-6 p-3 mb-4 bg-light rounded-3 minW480 marginRight" >
          <div className='p-2 panelDark rounded-3'>
            <div
              style={{
                paddingTop: '20px'
              }}
            >
              <div className='headerForm'>
                <h2 className="mb-3 p-3">Add Athlete</h2>
              </div>
              <Create teamId={team} country={country}/>
            </div>


          </div>
        </div>
        {/* Athlete List */}
        <div className="col-5 p-3 mb-4 bg-light rounded-3 minW480 caret">
          <div className='p-2 panelDark rounded-3'>
            <table className="table table-striped">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Last</th>
                  <th scope="col">First</th>
                  <th scope="col">Profile</th>
                </tr>
              </thead>
              <tbody>

                {!alist &&
                  (
                    <tr>
                      <td></td>
                      <td>No Athlete Registered</td>
                      <td></td>
                    </tr>
                  )
                }

                {alist && athletes.map((item, i) => (
                  <tr key={item._id}>
                    <th scope="row" className='paddingList'>{item.sequence}</th>
                    <td className='paddingList'>{item.lname}</td>
                    <td className='paddingList'>{item.fname}</td>
                    <td>
                      <Image src={item.imageURL} alt='athlete picture' width={50} height={50} priority />
                    </td>
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
