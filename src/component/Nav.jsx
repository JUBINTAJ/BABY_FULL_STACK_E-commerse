import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping, faHeart, faBars, faTimes, faUser } from "@fortawesome/free-solid-svg-icons";
import Cookies from "js-cookie";
import { useMutation, useQuery } from "@tanstack/react-query";
import WishlistModal from "../pages/Wishlist";
import axiosInstance from "../axios/intersptr";
import { toast } from "react-toastify";

function Navbar() {
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  

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
  


  const { data: CartData, isLoading: isCartLoading } = useQuery({
    queryKey: ["Cart"],
    queryFn: async () => {
      const res = await axiosInstance.get("cart/getCart");
      return res.data.cart?.products || [];
    },
  });

  const cartLength = CartData ? CartData.length : 0;

  const { data: wishlistData, isLoading, isError } = useQuery({
    queryKey: ["Wishlist"],
    queryFn: async () => {
      const res = await axiosInstance.get("wishlist/getWishlist");
      return res.data?.message || [];
    },
  });

  const wishLength = wishlistData ? wishlistData.length : 0;


  const handleLogout = () => {
    logoutMutation.mutate();
  };


  return (
    <nav className="bg-beige-100 p-5 fixed w-full z-50 top-0 font-serif">
      <div className="container mx-auto flex items-center justify-between bg-white p-4 rounded-lg shadow-sm">
        <Link
          to="/"
          className="text-4xl font-extrabold text-beige-800 tracking-wide font-[Lobster]"
        >
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
            <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
              {cartLength}
            </span>
          </Link>

          <FontAwesomeIcon
            icon={faBars}
            className="text-beige-700 text-2xl sm:hidden cursor-pointer hover:scale-110 transition-transform duration-200"
            onClick={() => setVisible(true)}
          />
        </div>
        <WishlistModal
        isOpen={isModalOpen}
        closeModal={() => setIsModalOpen(false)}
      />
      </div>
    </nav>
  );
}

export default Navbar;
