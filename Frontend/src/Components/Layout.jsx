import React from 'react'
import Navbar from './Navbar'
import Categories from './Categories'
import { Outlet } from 'react-router'

const Layout = () => {
  return (
    <div>
      <Navbar />
      <Categories />
      <Outlet /> 
    </div>
  )
}

export default Layout
