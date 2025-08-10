import React, { createContext, useEffect, useRef, useState } from 'react'
import styles from '../styles/SignIn.module.css'
import { Link } from 'react-router'
import { setSignIn } from '../features/SignInSlice.js'
import { useDispatch } from 'react-redux'
import { useLoginMutation } from '../features/AuthSlice.js'

const SignIn = () => {
    const [login,{ data, error, isLoading }] = useLoginMutation()
    //login is a function which will trigger the login Api Request
    const emailRef=useRef()
    const passwordRef=useRef()

    const dispatch=useDispatch()
    function handleClose(){
        dispatch(setSignIn(false))
    }
    async function handleSignIn(ev){
        ev.preventDefault()
        const email = emailRef.current.value
        const password = passwordRef.current.value
        try {
            const result = await login( {email, password }).unwrap()
            dispatch(setSignIn(false))
        } catch (err) {
            const messageFromBackend = err?.data?.message || "Something went wrong";
            alert(messageFromBackend)
        }
    }
    return (
        <div className={styles.overlay}>
            <div className={styles.loginPage}>
                <div className={styles.heading}>
                    <div className={styles.text}>Sign in</div>
                    <button className={styles.cross} onClick={(ev) => handleClose(ev)}>x</button>
                </div>
                <form action="" method="POST">
                    <div className={styles.email}>
                        Email
                        <input ref={emailRef} type="email" name="Email" placeholder="Enter here.." required />
                    </div>
                    <div className={styles.password}>
                        Password
                        <input ref={passwordRef} type="password" name="Password" placeholder="Enter here.." required />
                    </div>
                    <div className={styles.signInNow}>
                        <button type="submit" onClick={(ev)=>handleSignIn(ev)}>Sign in now</button>
                        <div>
                            <small>Don't have an account?</small>
                            <Link to='/signup'>
                                <small className={styles.Signup}>SignUp</small>
                            </Link>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default SignIn
