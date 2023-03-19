import React from 'react'
import { useState } from 'react';
import axios from 'axios';
import { useSession } from "next-auth/react"
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


export default function myprofile() {

  const { data: session } = useSession()

  const [fname, setFName] = useState("");
  const [lname, setLName] = useState("");

  const successProfile = () => toast.success("Profie Verification Completed")

  const SubmitHandler = async (e) => {
    e.preventDefault()


    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    }
    const { data } = await axios.post(`api/profile`, { fname, lname, email:session.user.email }, config)
  console.log(data)
  successProfile()
  }

  
  // console.log(session?.user.email)

  return (
    <>
    <form onSubmit={SubmitHandler} className="needs-validation" noValidate="" style={{ padding: '15vh' }}>
    <div className='p-2 bd-highlight eventHeader' style={{fontSize: '2rem', fontWeight: '500', lineHeight: '1.2',}}>
                 My Profile
                </div>
      <div className="row g-3">
        <div className="col-sm-6">
          <label htmlFor="firstName" className="form-label">First name</label>
          <input type="text" className="form-control" id="firstName" placeholder="First Name" defaultValue={fname} onChange={(e) => setFName(e.target.value)}required="" />
          <div className="invalid-feedback">
            Valid first name is required.
          </div>
        </div>

        <div className="col-sm-6">
          <label htmlFor="lastName" className="form-label">Last name</label>
          <input type="text" className="form-control" id="lastName" placeholder="Last Name" defaultValue={lname} onChange={(e) => setLName(e.target.value)} required="" />
          <div className="invalid-feedback">
            Valid last name is required.
          </div>
        </div>

        

       
      </div>

      <hr className="my-4" />
    <div className='col-md-4 offset-md-4'>
      <button className="w-100 btn btn-primary btn-lg" type="submit">Submit Profile</button>
      </div>
    </form>
    <ToastContainer position="top-right"
                            autoClose={2000}
                            hideProgressBar
                            newestOnTop={false}
                            closeOnClick
                            rtl={false}
                            pauseOnFocusLoss={false}
                            draggable={false}
                            pauseOnHover={false}
                            theme="light" />
                            
    </>
    
  )
}
