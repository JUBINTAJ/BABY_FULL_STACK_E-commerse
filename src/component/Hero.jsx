import React from 'react'
import { Link } from 'react-router-dom'

function Hero() {
  return (
    <div className='flex flex-col sm:flex-row border border-grey-400 w-full' >

{/*hero left side*/}

<div className='w-full sm:1/2 flex items-center justify-center py-10 sm:py-0'>
 
   <div className='text-[#414141]'>
    <div className='flex item-center gap-2'>
        <p className='w-8 md:w-11 h-[2px] bg-[#414141]'></p>
        <p className='font-medium text-sm md:text-base'>OUR BESTSELLER</p>
    </div>

                <h1 className='prata-regular text-3xl sm:py-3 lg:text-5xl leading-relaxed'> Latest arrivals</h1>
                    <div className='flex item-center gap-2'>
                     <Link to='/Shop' ><h1 className='font-semibold text-sm md:text-base'>Shop now</h1></Link>  
                         <p className='w-8 md:w-11 h-[2px] bg-[#414141]  '> </p>
    
    
    
                   </div>

               </div>


          </div> 
          {/*rgt*/}

          <img className='w-full sm:w-1/2  object-cover' src="https://www.babydeedee.com/cdn/shop/articles/lovely-newborn-asian-baby-sleeping-furry-cloth_1_1024x683.jpg?v=1685508446" alt="Newborn Baby" />

         
    </div>
  )
}

export default Hero