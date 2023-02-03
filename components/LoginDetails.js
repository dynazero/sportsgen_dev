import Image from 'next/image'
import React from 'react'
import { motion } from 'framer-motion'

export default function LoginDetails() {
  return (
    <>
    <section className="h-screen loginWidthModal">
    <main className="form-signinCustom text-center mt-5">
      <h2> Login </h2>
      <form>
        <h1 className="h3 mb-3 fw-normal">Please sign in</h1>

        <div className="form-floating inputCustomLogin">
          <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com" />
          <label htmlFor="floatingInput">Email address</label>
        </div>
        <div className="form-floating">
          <input type="password" className="form-control" id="floatingPassword" placeholder="Password" />
          <label htmlFor="floatingPassword">Password</label>
        </div>

        <div className="checkbox mb-3">
          <label>
            <input type="checkbox" value="remember-me" /> Remember me
          </label>
        </div>

        
        <motion.button 
        className="w-100 btn btn-lg btn-primary save-button" 
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={event => null}
        href="/"
        type="submit"
        >Sign in
        </motion.button>
      </form>

      <div className="checkbox mb-3" style={{marginTop:'24px'}}>
          <label >
          <a className="dropdown-item" href="#">Forgot password?</a>
            {/* <input type="checkbox" value="remember-me" /> Remember me */}
          </label>
        </div>
    </main>

  </section>
    </>
  )
}
