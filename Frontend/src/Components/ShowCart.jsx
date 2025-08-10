import React, { useRef } from 'react'
import { useGetCartQuery, useRemoveFromCartMutation } from '../features/Cartslice'
import styles from "../styles/Display.module.css"
import Cart from "./Cart.jsx"
const ShowCart = ({item,refetch}) => {
    const titleRef=useRef()
    const [removeFromCart]=useRemoveFromCartMutation()

    async function UpdateCart() {
        try {
            await removeFromCart({
                title: titleRef.current.innerText,
            }),
            refetch()
        }
        catch (error) {
            console.log(error)
            alert("Some error occured while removing item from cart")
        }
    }
    
    return (
        <div>
            <div className={styles.Container}>
                <img src={item.image}/>
                <div ref={titleRef} className={styles.Title}>{item.title}</div>
                <div className={styles.Price}>{item.price}</div>
                <div className={styles.Ratings}>
                    Rating-<span>{item.rating}</span>
                    <button onClick={()=>(UpdateCart())}> Remove from cart</button>
                </div>
            </div>
        </div>
    )
}

export default ShowCart
