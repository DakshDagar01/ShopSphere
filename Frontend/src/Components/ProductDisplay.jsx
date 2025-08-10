import React from 'react'
import { useGetAllQuery, useGetProductsQuery } from '../features/ProductSlice'
import Display from './Display'
import { ClipLoader } from "react-spinners";

const override= {
  display: "block",
  margin: "0 auto",
  marginLeft:"50",
  marginTop:"10%"
};

const ProductDisplay = ({category}) => {
    const {data,error,isLoading}=category=='all' ? useGetAllQuery() : useGetProductsQuery(`${category}`)
    return (
      <div>
        {
          error ? (<div>Something Went Wrong!</div>)
            : isLoading ? (<div>
              <ClipLoader
                loading={true}
                size={100}
                cssOverride={override}
                aria-label="Loading Spinner"
                data-testid="loader"
              />
            </div>)
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
