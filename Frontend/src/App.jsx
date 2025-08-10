import React from 'react'
import ProductDisplay from './Components/ProductDisplay'
import { Route,Routes } from 'react-router'
import Cart from './Components/Cart'
import Layout from './Components/Layout'
import SignUp from './Components/SignUp'
const App = () => {
  return (
    <div>
      <Routes>
        <Route element={<Layout/>}>
          <Route path="/" element={<ProductDisplay category={'all'} />}></Route>
          <Route path="/men's clothing" element={<ProductDisplay category={"men's clothing"} />}></Route>
          <Route path="/women's clothing" element={<ProductDisplay category={"women's clothing"} />}></Route>
          <Route path='/electronics' element={<ProductDisplay category={'electronics'} />}></Route>
          <Route path='/jewellery' element={<ProductDisplay category={'jewelery'} />}></Route>
        </Route>
        
        <Route path='/cart' element={<Cart/>}></Route> 
        <Route path='/signup' element={<SignUp/>}></Route>
      </Routes>
    </div>
  )
} 

export default App
