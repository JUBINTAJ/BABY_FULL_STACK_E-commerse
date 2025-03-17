
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Shopcontext } from '../context/ShopContext';

export const Productitem = ({ id, img, title, price, rating ,count ,category }) => {
  const { currency } = useContext(Shopcontext);

  const product = { id, img, title, price, rating ,count ,category};

  return (
    <Link to={`/Product/${id}`} className='text-grey-700 cursor-pointer'>
      <div className='overflow-hidden'>
        <img className='hover:scale-110 transition ease-in-out' src={img} alt={title} />
      </div>
      <p className='pt-3 pb-1 text-sm'>{title}</p>
      <p className='text-sm font-medium'>{currency} {price}</p>
      <p className='text-sm font-medium'>{rating} &#9733; </p>
      <p className='text-sm font-medium'>{category}  </p>

    
   
    </Link>
  );
};
