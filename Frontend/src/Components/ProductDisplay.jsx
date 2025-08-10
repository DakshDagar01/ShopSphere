import React from 'react'
import { useGetAllQuery, useGetProductsQuery } from '../features/ProductSlice'
import Display from './Display'

const ProductDisplay = ({category}) => {
    const {data,error,isLoading}=category=='all' ? useGetAllQuery() : useGetProductsQuery(`${category}`)
    return (
      <div>
        {
          error ? (<div>Something Went Wrong!</div>)
            : isLoading ? (<div>Loading.....</div>)
              : (
                <div style={{display:'flex', flexWrap:'wrap', justifyContent:'space-evenly'}}>
                  {
                    data.map((item,index)=>{
                      return <Display key={index} item={item} category={category}/>
                    })
                  }
                </div>
              )
        }
      </div>
    )
}

export default ProductDisplay
