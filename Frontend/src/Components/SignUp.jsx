import React from 'react'
import styles from '../styles/SignUp.module.css'
import { useRef } from 'react'
import { useRegisterMutation } from '../features/AuthSlice'
import { useNavigate } from 'react-router'

const SignUp = () => {
  const [signup,{data,error,isLoading}]=useRegisterMutation()
  const navigate=useNavigate()

  const usernameRef=useRef()
  const emailRef=useRef()
  const passwordRef=useRef()

  async function handleSignup(ev) {
    ev.preventDefault()
    const username=usernameRef.current.value
    const email = emailRef.current.value
    const password = passwordRef.current.value

    try {
      const result=await signup({username,email,password}).unwrap()
      alert(result.message)
      navigate(-1)
      console.log("Registration Successfull",result)
    } 
    catch (err) {
      const messageFromBackend = err?.data?.message || "Something went wrong";
      alert(messageFromBackend)
    }
  }
  return(
    <div>
      <div className={styles.container}>
        <div className={styles.signupPage}>
          <div className={styles.heading}>
            Sign up
          </div>
          <form action="/" method="POST">
            <div className={styles.username}>
              Username
              <input ref={usernameRef} type="text" name="Name" placeholder="Enter here.." required/>
            </div>
            <div className={styles.email}>
              Email
              <input ref={emailRef} type="email" name="Email" placeholder="Enter here.." required/>
            </div>
            <div className={styles.password}>
              Password
              <input ref={passwordRef} type="password" name="Password" placeholder="Enter here.." required/>
            </div>
            <div className={styles.signUpNow}>
              <button type="submit" onClick={(ev)=>handleSignup(ev)}>Sign up now</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default SignUp
