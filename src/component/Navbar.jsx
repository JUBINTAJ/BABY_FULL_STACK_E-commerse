import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping, faHeart, faBars, faTimes, faUser } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "../axios/intersptr";
import { toast } from "react-toastify";
import WishlistModal from "../pages/Wishlist";

function Navbar() {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [visible, setVisible] = useState(false);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const queryClient = useQueryClient();

  const userId = localStorage.getItem("_id");
  const userName = localStorage.getItem("username");

  const logoutMutation = useMutation({
    mutationFn: async (userdata) => {
      const res= await axiosInstance.post("user/logout",userdata);
      return res.data
    },
    onSuccess: (data) => {
      toast.success("Logout successful!");
      localStorage.clear(); 
      setTimeout(() => {
        navigate("/Login");
      }, 1000);
    },
    onError: () => {
      toast.error("Logout failed. Please try again.");
    },
  });
  



  const { data: CartData } = useQuery({
    queryKey: ["Cart"],
    queryFn: async () => {
      const res = await axiosInstance.get("cart/getCart");
      return res.data.cart?.products || [];
    },
    onSuccess:()=>{
  queryClient.invalidateQueries({queryKey:["Cart"]})

}
  });



  const cartLength = CartData ? CartData.length : 0;

  const handleLogout = () => {
    logoutMutation.mutate();
  };


  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 2 }}
      className="bg-beige-100 p-5 fixed w-full z-50 top-0 font-serif"
    >
      <div className="container mx-auto flex items-center justify-between bg-white p-4 rounded-lg shadow-sm">
        <Link to="/" className="text-4xl font-extrabold text-beige-800 tracking-wide font-[Lobster]">
          Sweet Pea Baby Shop
        </Link>

        <ul className="hidden sm:flex gap-6 text-lg text-beige-700 font-semibold tracking-wide font-serif">
          <NavLink to="/" className="hover:text-pink-500 transition-all duration-300">Home</NavLink>
          <NavLink to="/Shop" className="hover:text-pink-500 transition-all duration-300">Shop</NavLink>
          <NavLink to="/About" className="hover:text-pink-500 transition-all duration-300">About</NavLink>
          <NavLink to="/Contact" className="hover:text-pink-500 transition-all duration-300">Contact</NavLink>
        </ul>

        <div className="flex items-center gap-5">
          {userId ? (
            <div className="relative cursor-pointer" onClick={() => setDropdownVisible(!dropdownVisible)}>
              <FontAwesomeIcon icon={faUser} className="text-beige-700 text-xl" />
              {dropdownVisible && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg p-4">
                  <p className="text-beige-800 font-semibold">{userName}</p>
                  <button
                    onClick={handleLogout}
                    className="mt-2 w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition-all"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              to="/Login"
              className="bg-pink-500 text-white px-4 py-2 rounded-lg hover:bg-pink-600 transition-all"
            >
              Login
            </Link>
          )}

<div className="relative cursor-pointer" onClick={() => setIsModalOpen(true)}>
  <FontAwesomeIcon
    icon={faHeart}
    className="text-beige-800 text-xl hover:text-pink-500 transition-all duration-300"
  />

</div>


          <Link to="/Cart" className="relative">
            <FontAwesomeIcon icon={faCartShopping} className="text-beige-800 text-xl hover:text-pink-500 transition-all duration-300" />
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3 }}
              className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center"
            >
              {cartLength}
            </motion.span>
          </Link>

          <FontAwesomeIcon
            icon={faBars}
            className="text-beige-700 text-2xl sm:hidden cursor-pointer hover:scale-110 transition-transform duration-200"
            onClick={() => setVisible(true)}
          />
        </div>
      </div>

      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: visible ? "0%" : "100%" }}
        transition={{ duration: 0.3 }}
        className="fixed top-0 right-0 h-full bg-beige-100 shadow-xl w-2/3 overflow-hidden z-10"
      >
        <div className="p-6 flex flex-col text-beige-700 text-lg font-semibold">
          <FontAwesomeIcon
            icon={faTimes}
            className="text-2xl cursor-pointer mb-6"
            onClick={() => setVisible(false)}
          />
          <NavLink onClick={() => setVisible(false)} className="py-3 border-b" to="/">Home</NavLink>
          <NavLink onClick={() => setVisible(false)} className="py-3 border-b" to="/Shop">Shop</NavLink>
          <NavLink onClick={() => setVisible(false)} className="py-3 border-b" to="/About">About</NavLink>
          <NavLink onClick={() => setVisible(false)} className="py-3 border-b" to="/Contact">Contact</NavLink>
        </div>
      </motion.div>
      
      <WishlistModal
        isOpen={isModalOpen}
        closeModal={() => setIsModalOpen(false)}
      />
    </motion.nav>
  );
}

export default Navbar;
