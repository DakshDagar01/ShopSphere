import React, { useEffect } from 'react'
import styles from '../styles/Cart.module.css'
import { useGetCartQuery } from '../features/Cartslice'
import { useNavigate } from 'react-router'

import ShowCart from './ShowCart'

const Cart = () => {
    const { data, error, isLoading ,refetch} = useGetCartQuery()
    const navigate = useNavigate()

    useEffect(() => {
        if (error) {
            navigate(-1),
            alert("Signin to view the Cart")
        }
        else{
          refetch()
        }
    }, [error, navigate])

    if (error) {
        return null
    }
  return (
    <div className={styles.Cart}>
      <div>
        <h1>Welcome to Cart</h1>
        {isLoading ? (<div>Loading...</div>)
          : (
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-evenly' }}>
              {
                data.data.map((item, index) => {
                  return <ShowCart key={index} item={item} refetch={refetch} />
                })
              }
            </div>
          )
        }
      </div>
    </div>
  )
}

export default Cart
