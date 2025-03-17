import React, { useEffect, useState, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { Shopcontext } from '../context/ShopContext';

const Searchbar = () => {
  // const { search, setSearch, showSearch } = useContext(Shopcontext);


  return (
    <div className='border-t border-b bg-grey-50 text-center'>
      <div className='inline-flex items-center justify-center border border-grey-400 px-5 py-2 my-5 mx-3 rounded-full w-3/4 sm:w-1/2'>
        <input
          // value={search}
          // onChange={(e) => setSearch(e.target.value)}
          className='flex-1 outline-none bg-inherit text-sm'
          type='text'
          placeholder='Search'
        />
        <img
          src='https://www.svgrepo.com/show/7109/search.svg'
          className='w-4'
          alt='Search icon'
        />
      </div>
    </div>
  )  ;
};

export default Searchbar;
