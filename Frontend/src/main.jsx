import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import {Provider} from 'react-redux'
import {store} from './Store/Store.js'
import { BrowserRouter, createBrowserRouter, createRoutesFromElements,Routes,Route, RouterProvider } from 'react-router'
import { AuthProvider } from './Context/Authstatus.jsx'
import ProductDisplay from './Components/ProductDisplay'
import Cart from './Components/Cart'
import Layout from './Components/Layout'
import SignUp from './Components/SignUp'

const router=createBrowserRouter(
  createRoutesFromElements(
    <>
        <Route element={<Layout/>}>
          <Route path="/" element={<ProductDisplay category={'all'} />}></Route>
          <Route path="/men's clothing" element={<ProductDisplay category={"men's clothing"} />}></Route>
          <Route path="/women's clothing" element={<ProductDisplay category={"women's clothing"} />}></Route>
          <Route path='/electronics' element={<ProductDisplay category={'electronics'} />}></Route>
          <Route path='/jewellery' element={<ProductDisplay category={'jewelery'} />}></Route>
        </Route>
        
        <Route path='/cart' element={<Cart/>}></Route> 
        <Route path='/signup' element={<SignUp/>}></Route>
      </>
  )
)
createRoot(document.getElementById('root')).render(
  
    <Provider store={store}>
      <AuthProvider>
        <RouterProvider router={router}/>
      </AuthProvider>
    </Provider>

)
