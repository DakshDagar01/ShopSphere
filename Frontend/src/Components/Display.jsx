import React, { useRef } from 'react'
import styles from'../styles/Display.module.css'
import { useAddToCartMutation, useRemoveFromCartMutation } from '../features/Cartslice'

const Display = ({item}) => {
    const priceRef=useRef()
    const titleRef=useRef()

    const [addToCart]=useAddToCartMutation()
    const [removeFromCart]=useRemoveFromCartMutation()

    async function UpdateCart(ev){
        if(ev.target.innerText==="Add to cart"){
            try {
                console.log(titleRef,priceRef)
                await addToCart({
                    title:titleRef.current.innerText,
                    price:priceRef.current.innerText
                })
                ev.target.innerText="Remove from cart" 
            } 
            catch (error) {
                console.log(error)
                alert("Some error occured while adding item to cart")
            }
        }
        else{
            try {
                await removeFromCart({
                    title:titleRef.current.innerText,
                })
                ev.target.innerText="Add to cart" 
            } 
            catch (error) {
                console.log(error)
                alert("Some error occured while adding item to cart")
            }
        }
    }
    return(
        <div>
            <div className={styles.Container}>
                <img src={item.image}/>
                <div ref={titleRef} className={styles.Title}>{item.title}</div>
                <div ref={priceRef} className={styles.Price}>{item.price}</div>
                <div className={styles.Ratings}>
                    Rating-{item.rating.rate}/5
                    <button onClick={(ev)=>UpdateCart(ev)}> Add to cart</button>
                </div>
            </div>
        </div>
    )
}

export default Display
