import React, { useRef } from 'react'
import styles from'../styles/Display.module.css'
import { useAddToCartMutation } from '../features/Cartslice'

const Display = ({item,category}) => {
    let image;
    if(category=='all'){
        image=item.image.substr(0,item.image.length-6)+'_t.png'
    }
    else{
        image=item.image.substr(0,item.image.length-5)+'_t.png'
    }
    const priceRef=useRef()
    const titleRef=useRef()
    const ratingRef=useRef()
    const imageRef=useRef()

    const [addToCart]=useAddToCartMutation()

    async function UpdateCart(ev) {
        ev.target.style.backgroundColor="lightGrey"
        setTimeout(()=>{
            ev.target.style.backgroundColor=""
        },150)
        try {
            await addToCart({
                title: titleRef.current.innerText,
                price: priceRef.current.innerText,
                image: imageRef.current.src,
                rating: ratingRef.current.innerText,
            })
        }
        catch (error) {
            console.log(error)
            alert("Some error occured while adding item to cart")
        }

    }
    return(
        <div>
            <div className={styles.Container}>
                <img ref={imageRef} src={image}/>
                <div ref={titleRef} className={styles.Title}>{item.title}</div>
                <div ref={priceRef} className={styles.Price}>{item.price}</div>
                <div className={styles.Ratings}>
                    Rating-<span ref={ratingRef}>{item.rating.rate}/5</span>
                    <button onClick={(ev)=>UpdateCart(ev)}> Add to cart</button>
                </div>
            </div>
        </div>
    )
}

export default Display
