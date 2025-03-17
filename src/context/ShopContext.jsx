

import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import product from "/db.json";
import { toast } from 'react-toastify';


export const Shopcontext = createContext();

const ShopcontextProvider = (props) => {
  const nav = useNavigate(); 
  const currency = "$";
  const delevaryfee = 10;
  const [search,setSearch]=useState('')
  const [showSearch,setShowSearch]=useState(true)
  const [cartItems, setCartItems] = useState([]);
  const[usercount,setUsercount]=useState([])

let id=localStorage.getItem('id')
  // useEffect(() => {
  //   const fetchData = async () => {
  //     const userJson = localStorage.getItem("user");
  //     if (!userJson) return; 
  //     const user = JSON.parse(userJson);
  //     try {
  //       // console.log(user.id)
  //       const response = await axios.get(
  //         `http://localhost:7000/user/${user.id}`
  //       );
  //       // console.log(user.id)

  //       setCartItems(response.data.cart);
  //       // console.log('added to cart success.')
  //     } catch (err) {
  //       console.error("Error fetching cart data:", err);
  //     }
  //   };
  //   fetchData();
  // },[cartItems ]);

  // useEffect(() => {
  //   const fetchUserData = async () => {
  //     try {
  //       const response = await axios.get('http://localhost:7000/user');
  //       setUsercount(response.data); 
  //     } catch (err) {
  //       console.error("Error fetching user data:", err);
  //     }
  //   };

  //   fetchUserData();
  // }, []);

 

  const addToCart = async (pd) => {
    const userJson = localStorage.getItem("user");
    if (!userJson) {
      alert("Please login");
      nav("/Login");
      return;
    }
  
    const user = JSON.parse(userJson);
    // console.log( user.id);
    try {
      const response = await axios.get(`http://localhost:7000/user/${user.id}`);
      const cartData = response.data.cart ;
      const con=cartData.find((item)=>item.id ===pd.id)
      if(con){
        alert("it is already in the cart");
        return;   
      }
     const updatedCart = [...cartData, pd];
     axios.patch(`http://localhost:7000/user/${user.id}`,{ cart: updatedCart });
      setCartItems(updatedCart);
    } catch (err) {
      console.error("Error updating cart:");
    }
  };
  // console.log(cartItems)
  
const quantity =(value,num)=>{
  if(value.quantity === 1 && num === -1)return;
  const newquantity = cartItems.map((item)=>
  item.id === value.id? {
    ...item,quantity :item.quantity +num
  } :item)
  setCartItems(newquantity);
  const userJson =localStorage.getItem("user");
  const user = JSON.parse(userJson);
  axios
  .patch(`http://localhost:7000/user/${user.id}`,{ cart: newquantity})
  .then((response) =>  console.log("okyy"))
  .catch((error) => console.error(error));

  
}
  
 const calculateTotal = () => {
    return cartItems.reduce((acc, item) => acc + item.price * item.quantity , 0);
  };

  const calculateGrandTotal = () => {
    return calculateTotal() + delevaryfee;
  };

const deleteitem = async (index)=>{
  const userJson = localStorage.getItem("user");
  const user = JSON.parse(userJson);
  const updatedCart = cartItems.filter((a,b)=> b!==index)
  try {
    await axios.patch(`http://localhost:7000/user/${user.id}`, { cart: updatedCart})

setCartItems(updatedCart);

}catch{
  console.error("Error deleting item:", err);
}
}
const Adminblock = async (id) =>{
  try{
      await axios.patch(`http://localhost:7000/user/${id}` , {
      block :true
    })
    alert("blocked")
  } catch(err){
    console.error("Error blocking :", err);
  }
};
 const Adminunblock = async (id) =>{
  try{
    await axios.patch(`http://localhost:7000/user/${id}` ,{
   block :false
    })
    alert ("unblock")
  } catch (err){
    console.error("Error unblocking :", err);
  }
 };
const addproduct = (newproduct) => {
  axios
    .post("http://localhost:7000/product", newproduct)
    .then((response) => {
      alert("Product added successfully");
      nav('/Adminproduct')
    })
    .catch((error) => {
      console.error("Error adding product:", error);
    });
};
const update = (updateproduct,id) => {
  axios
    .patch(`http://localhost:7000/product/${id}`, updateproduct)
    .then((response) => {
      alert("Product update successfully");
    })
    .catch((error) => {
      console.error("Error update product:", error);
    });
};
const deleteproduct = async (id) => {
  try {
    await axios.delete(`http://localhost:7000/product/${id}`);
    alert("Product deleted successfully");
  } catch (error) {
    console.error("Error deleting product:", error);
  }
};




  const value = {
    product,
     currency,
    delevaryfee,
    addproduct,
    update,
    deleteproduct,
    deleteitem,
    cartItems,
    search,
    showSearch,
    Adminblock,
    Adminunblock,
    usercount,
    setSearch,
    setShowSearch,
    addToCart,
    calculateTotal,
    calculateGrandTotal,
    quantity
    
  };

  return (
    <Shopcontext.Provider value={value}>
        {props.children}
        </Shopcontext.Provider>
  );
};

export default ShopcontextProvider;