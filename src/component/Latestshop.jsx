import React, { useContext, useEffect, useState } from 'react'
import Title from './title'
import { Productitem } from './Productitem'
import { Shopcontext } from '../context/ShopContext'

 const Latestshop = () => {

  const {product} = useContext(Shopcontext)
  const[latestproduct,setlatestproduct]=useState([])

  useEffect(()=>{
  setlatestproduct(product)
  },[])

  
  return (

    <div className='my-10' >


    <div className='text-center py-8 text-3xl' >
      <Title text1={'My'} text2={'Collection'} />
   

      </div>

      {/*product rendering*/}

      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6' >
        {
      
      latestproduct.map((item,index)=>(
        <Productitem key={index} id={item.id}  img={item.img} title={item.title} price={item.price} rating={item.rating} count={item.count}  />
      ))
        } 

      </div>

    </div>
  )
}
export default Latestshop


