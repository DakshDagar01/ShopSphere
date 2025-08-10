import React, { useEffect } from 'react'
import styles from'../styles/Cart.module.css'
import { useGetCartQuery } from '../features/Cartslice'
import { useNavigate} from 'react-router'
const Cart = () => {
  const {data,error,isLoading}=useGetCartQuery()
  const navigate=useNavigate()

  useEffect(() =>{
    if(error){
      navigate(-1),
      alert("Signin to view the Cart")
    }
  }, [error,navigate])

  if(error){
    return null
  }
  return (
    <div className={styles.Cart}>
      <h1>Welcome to Cart</h1>
        { isLoading ? (<div>Loading...</div>)
              : (
                <div style={{display:'flex', flexWrap:'wrap', justifyContent:'space-evenly'}}>
                  {
                    (data.data.length>0 ?
                      data.data.map((item,index)=>{
                        return <li key={index}>{item.title}-{item.price}</li>
                      })
                      :
                      <div>
                        {console.log(data.data)}
                        Cart is Empty.Shop Now to add items in cart
                      </div>
                    )

                  }
                </div>
              )
        }
    </div>
  )
}

export default Cart
