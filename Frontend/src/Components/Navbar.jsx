import React from 'react'
import logo from '../Assets/Logo.png'
import styles from'../styles/Navbar.module.css'
import SignIn from './SignIn.jsx'
import { useDispatch, useSelector } from 'react-redux'
import { setSignIn } from '../features/SignInSlice.js'
import { Link } from 'react-router'
import { useLogoutMutation } from '../features/AuthSlice.js'
import { useAuthstatus } from '../Context/Authstatus.jsx'

const Navbar = () => {
  const [logoutUser]=useLogoutMutation()
  const dispatch=useDispatch()
  const {isSignedIn,refetchAuth}=useAuthstatus()


async function handleClick() {
  if (!isSignedIn) {
    dispatch(setSignIn(true))
  } else {
    try {
      await logoutUser().unwrap()
      await refetchAuth()
    } catch (err) {
      console.error("Logout failed:", err)
    }
  }
}
  const signIn=useSelector((state)=>state.signIn.showSignIn)
  return (
    <div>
      <div className={styles.Navbar}>
        <div className={styles.Logo}>
          <img src={logo} className={styles.LogoImage}/> 
          <h1 style={{color:'white'}}>ShopSphere</h1>
        </div>
        <div className={styles.SearchBar}>
          <select name="Categories" id="Categories">
            <option value="All">All</option>
            <option value="men's clothing">Men's Clothing</option>
            <option value="women's clothing">Women's Clothing</option>
            <option value="electronics">Electronics</option>
            <option value="jewellery">Jewellery</option>
          </select>
          <input type='text' placeholder='Search ShopSphere...'></input>
        </div>
        <div className={styles.RightSide}>
          <button className={styles.SignIn} onClick={()=>handleClick()}>{isSignedIn ?'SignOut':'SignIn' } </button>
          <Link to='/cart'>
            <button className={styles.Cart}>Cart</button>          
          </Link>
        </div>
      </div>
      {signIn && <SignIn/>}
    </div>
  )
}

export default Navbar
