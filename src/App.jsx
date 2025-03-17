import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Home from './pages/home'
import About from './pages/about'
import Cart from './pages/Cart'
import Contact from './pages/contact'
import Navbar from './component/Navbar'
import Registration from './pages/Registration'
import { Footer } from './component/Footer'
import Login from './pages/Login'
import Searchbar from './component/Searchbar'
import Payment from './pages/payment'
import Product from './pages/Product'
import Adminhome from './admin/Adminhome'
import Shop from './pages/Shop'
import Adminproduct from './admin/Adminproduct'
import Adminuser from './admin/Adminuser'
import Adminadd from './admin/Adminadd'
import Adminupdate from './admin/adminupdate'
import NotFound from './component/Notfound'
import { ToastContainer } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";
import Wishlist from './pages/Wishlist'
import AdminOrder from './admin/adminorder'

function App() {
  const role=import.meta.env.VITE_roleProtectKey
  return (
    <div className='  '>


<Routes>

<Route  path='/' element ={<Home />} />
<Route  path='/Registration' element={<Registration />}/>
<Route  path='/Login' element={<Login />} />
<Route  path='/Shop'   element ={<Shop />} />
<Route  path='/About' element={<About />} />
<Route  path='/Contact' element ={<Contact />} />
<Route  path='/Cart' element={<Cart />} />
<Route  path='/Product/:Productid' element={<Product/>} />
<Route  path="/Wishlist"  element={<Wishlist/>} />
<Route  path='/payment'   element ={<Payment />} />
<Route  path="*"  element={<NotFound/>} />


{role===localStorage.getItem('role')?(
<>

<Route  path='/Adminhome' element={<Adminhome />} />
<Route  path='/Adminuser' element={<Adminuser />} />
<Route  path='/Adminproduct' element={<Adminproduct />} />
<Route  path='/Adminadd' element={<Adminadd />} />
<Route  path='/Adminorder' element={<AdminOrder />} />
<Route  path='/Adminupdate/:productid' element={< Adminupdate/>} />
  </>
):(
<Route path="/admin/*" element={<Navigate to="/" />} />
)}









</Routes>


{/* <Footer/> */}
<ToastContainer position="top-right" autoClose={3000} />


    </div>
  )
}

export default App