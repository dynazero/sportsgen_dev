import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const handleBlur = (e) => {
  console.log('on blur')
  this.setState({dropdownVisible: false})
}

export default function SignupDetails() {

  const [rank, setRank] = useState('');

 

  return (
    <>
      <section className="h-screen signupnWidthModal sigupHeightModal">
        <main className="form-signupCustom text-center mt-5">
          <form>
            <h1 className="h3 mb-3 fw-normal">Create Account</h1>
            {/* <h2> Sign up </h2> */}
            <div id="carouselExampleIndicators" className="carousel slide indicatorsCustom">
            <div className="carousel-indicators customIndicatorButtons">
                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="3" aria-label="Slide 3"></button>
              </div>
              <div className="carousel-inner" >
                <div className="carousel-item carousel-itemCustom active ">
                  <div className="form-floating inputCustomCarousel">
                    <input type="text" className="form-control" id="floatingInputName" placeholder="name" />
                    <label htmlFor="floatingInputName">Name</label>
                  </div>

                  <label htmlFor="basic-url" className="form-label">Select your Coach/Team manager:</label>
                  {/* <div className="form-floating inputCustomCarousel"> */}
                  <select className="form-select mb-3 fontWeight400" id="FormControlSelect1" aria-label=".form-select-lg example">
                  <option>Choose your coach..</option>
                  <option>Kyle</option>
                  <option>James</option>
                  <option>Chris</option>
                  {/* <option>4</option>
                  <option>5</option> */}
                </select>
                {/* <label htmlFor="floatingInputName">Coach</label> */}
                  {/* </div> */}
                  


                  {/* <div className="input-group mb-3">
                    <span className="input-group-text" id="basic-addon3">Coach</span>
                    <input type="text" className="form-control" aria-label="Text input with dropdown button" defaultValue={coach}></input>
                    <button className="btn btn-outline-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                      <i className="chevron-compact-down"></i>
                    </button>
                    <ul className="dropdown-menu dropdown-menu-end">
                      <li><a className="dropdown-item" href="#" onClick={() => setCoach('Kyle')} >Kyle</a></li>
                      <li><a className="dropdown-item" href="#" onClick={() => setCoach('James')}  >James</a></li>
                      <li><a className="dropdown-item" href="#" onClick={() => setCoach('Chris')} >Chris</a></li>
                       <li><hr className="dropdown-divider"/></li>
                    <li><a className="dropdown-item" href="#"> Lawrence </a></li> 
                    </ul>

                   
                    
                  </div> */}
                  
                  

                  

                  <div className="form-floating inputCustomCarousel">
                  <div className="input-group mb-3 encloseOption">
                      <span className="input-group-text" id="basic-addon3">Rank</span>
                      <input className="form-control" name="rank" aria-label="Text input with dropdown button" defaultValue={rank}  autoComplete="off" readOnly type="text"></input>
                      <button className="btn btn-outline-secondary dropdown-toggle" type="button" id="defaultDropdown" data-bs-toggle="dropdown" data-bs-auto-close="true" aria-expanded="false">
                        <i className="chevron-compact-down"></i>
                      </button>
                      
                      <ul className="dropdown-menu" aria-labelledby="defaultDropdown">
                        <li><option className="dropdown-item" href="#" onClick={() => setRank('1st Dan')} >1st Dan</option></li>
                        <li><option className="dropdown-item" href="#" onClick={() => setRank('2nd Dan')} >2nd Dan</option></li>
                        <li><option className="dropdown-item" href="#" onClick={() => setRank('3rd Dan')} >3rd Dan</option></li>
                        <li><option className="dropdown-item" href="#" onClick={() => setRank('4th Dan')} >4th Dan</option></li>
                        <li><option className="dropdown-item" href="#" onClick={() => setRank('5th Dan')} >5th Dan</option></li>
                        <li><option className="dropdown-item" href="#" onClick={() => setRank('6th Dan')} >6th Dan</option></li>
                        <li><option className="dropdown-item" href="#" onClick={() => setRank('7th Dan')} >7th Dan</option></li>
                        <li><option className="dropdown-item" href="#" onClick={() => setRank('8th Dan')} >8th Dan</option></li>
                        <li><option className="dropdown-item" href="#" onClick={() => setRank('9th Dan')} >9th Dan</option></li>
                        <li><option className="dropdown-item" href="#" onClick={() => setRank('10th Dan')} >10th Dan</option></li>
                         {/* <li><hr className="dropdown-divider"/></li>
                    <li><a className="dropdown-item" href="#"> Lawrence </a></li>  */}
                      </ul>
                    </div>
                    

                    
                  </div>


                </div>
                <div className="carousel-item carousel-itemCustom">
                  
                <div className="form-floating inputCustomCarousel">
                    <input type="number" className="form-control" id="floatingInputContact" placeholder="contact number" />
                    <label htmlFor="floatingInput">Contact Number</label>
                  </div>
                  <div className="form-floating inputCustomCarousel">
                    <input type="email" className="form-control" id="floatingInputEmail" placeholder="name@example.com" />
                    <label htmlFor="floatingInput">Email address</label>
                  </div>

                  <div className="form-floating inputCustomCarousel">
                    <input type="text" className="form-control" id="floatingInputClubName" placeholder="club name" />
                    <label htmlFor="floatingInput">Club Name</label>
                  </div>
                </div>

                <div className="carousel-item carousel-itemCustom">
                <label className="form-label">Club Address</label>
                <div className="form-floating inputCustomCarousel">
                    <input type="text" className="form-control" id="floatingInputClubCity" placeholder="club address" />
                    <label htmlFor="floatingInput">City</label>
                  </div>
                  
                <div className="form-floating inputCustomCarousel">
                    <input type="text" className="form-control" id="floatingInputCountry" placeholder="club address" />
                    <label htmlFor="floatingInput">Country</label>
                  </div>
                  <div className="form-floating inputCustomCarousel">
                    <input type="text" className="form-control" id="floatingInputStreet" placeholder="club address" />
                    <label htmlFor="floatingInput">Street</label>
                  </div>

                  <div className="form-floating inputCustomCarousel">
                    <input type="text" className="form-control" id="floatingInputHouseNo" placeholder="club address" />
                    <label htmlFor="floatingInput">House Number/Unit Number</label>
                  </div>
                  

                </div>
                <div className="carousel-item carousel-itemCustom">

                  <label htmlFor="basic-url" className="form-label">Upload your photo</label>
                  <div className="input-group mb-3">
                    <input type="file" className="form-control" id="inputGroupFilePhoto" />
                    <label className="input-group-text" htmlFor="inputGroupFilePhoto">Upload</label>
                  </div>


                  <label htmlFor="basic-url" className="form-label">Upload your valid Id</label>
                  <div className="input-group mb-3">
                    <input type="file" className="form-control" id="inputGroupFileID" />
                    <label className="input-group-text" htmlFor="inputGroupFileID">Upload</label>
                  </div>

                  <div className="form-floating">
                    <input type="password" className="form-control" id="floatingPassword" placeholder="Password" />
                    <label htmlFor="floatingPassword">Password</label>
                  </div>

                  <motion.button
                    className="w-100 btn btn-lg btn-primary save-button"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={event => loginClick(event, !modalOpen)}
                    href="#"
                    style={{margin: "15px 0px"}}
                  // type="submit"
                  >Sign Up
                  </motion.button>

                </div>
              </div>
            </div>
          </form>
        </main>
      </section>











      {/* 

        

       


        */}





    </>
  )
}
