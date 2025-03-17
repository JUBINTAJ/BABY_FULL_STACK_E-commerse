import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Shopcontext } from '../context/ShopContext'
import Nav from '../component/Nav'

function Product() {

const {Productid} = useParams()
const {product ,addToCart ,currency}=useContext(Shopcontext)
const [Productdata, setProductdata]=useState(false)
const fetchProductdata =()=>{
  product.product.map((item)=>{
    if(item.id === Productid){
      setProductdata(item)
    }
  })
}
useEffect(()=>{
  fetchProductdata()

},[Productid])
console.log(Productdata)
  return (
    <div>
            <Nav/>

       <div className="flex flex-col lg:flex-row items-center max-w-6xl mx-auto bg-white shadow-lg rounded-lg p-6 lg:p-12">
        <img 
          src={Productdata.img}
          alt="Baby Shop" 
          className="w-64 h-64 object-cover rounded-lg shadow-md mb-6 lg:mb-0 lg:mr-8"
        />
        <div className="  text-center lg:text-left">
          <h1 className=" font-extrabold text-gray-800 mb-4 ">{Productdata.title}  </h1>
          <p className="  text-gray-700  mb-4">
          {currency} {Productdata.price}
          </p>
          <p className="text-gray-700  mb-4 ">
          {Productdata.rating} &#9733;
          </p>
          <p className="text-gray-700 text-lg mb-4  text-center rounded-xl prata-regular">
          <button
           className="bg-blue-600 rounded-xl text-white px-8 py-3 text-sm active:bg-gray-700"
              onClick={() => addToCart(Productdata)}>
              Add to cart
           </button>


          </p>
    
        </div>
      </div>
      
    </div>
  )
}

export default Product
