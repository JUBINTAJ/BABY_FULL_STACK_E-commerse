import React from 'react'

const Title = ({text1,text2}) => {
  return (
    <div className='inline-flex gao-2 item-center mb-3' >
        <p className=' prata-regular text-grey-500' >{text1} <span className='text-grey-700 font' >{text2}</span> </p>
        <p className='w-8 sm:w-12 h-[1px] sm;h-[2px] bg-grey-700' ></p>
    </div>
  )
}

export default Title