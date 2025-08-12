  import React from 'react'
  import styles from'../styles/Categories.module.css'
  import { Link, NavLink } from "react-router";

  const Categories = () => {
    const UpdateClass=(ev,category)=>{
      const id=ev.target.id
      let allBtns=ev.target.parentElement.parentElement.children
      for (let i=0;i<allBtns.length;i++){
          if(allBtns[i].children[0].id!=id){
              allBtns[i].children[0].classList.remove(styles.active)
          }
          else{
              allBtns[i].children[0].classList.add(styles.active)
              category=ev.target.innerText
          }
      }
    }

    return (
      <div>
        <div className={styles.Categories}>
          <Link to="/">
            <button id='1' onClick={(ev)=>UpdateClass(ev,"all")}>All</button>          
          </Link>
          <Link to="/men's clothing">
            <button id='2' onClick={(ev)=>UpdateClass(ev,"men's clothing")}>Men's Clothing</button>
          </Link>
          <Link to="/women's clothing">
            <button id='3' onClick={(ev)=>UpdateClass(ev,"women's clothing")}>Women's Clothing</button>
          </Link>
          <Link to='/electronics'>
            <button id='4' onClick={(ev)=>UpdateClass(ev,'electronics')}>Electronics</button>
          </Link>
          <Link to='/jewellery'>
            <button id='5' onClick={(ev)=>UpdateClass(ev,'jewellery')}>Jewellery</button>
          </Link>
        </div>
        
      </div>
    )
  }

  export default Categories
