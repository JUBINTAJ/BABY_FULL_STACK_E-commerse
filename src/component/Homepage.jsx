import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Heart, Star, TrendingUp } from "lucide-react";
import Navbar from "./Navbar";
import Small from '../component/Small'


function Homepage() {
  return (
    <div>
      <section
        className="relative h-screen bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://crystalleephotography.com/wp-content/uploads/2021/04/Natalie_031.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-40">
          <Navbar />
        </div>
      <div className="relative max-w-7xl mx-auto px-6 sm:px-12 h-full flex flex-col sm:flex-row items-center ml-16 justify-center text-center sm:text-left">
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 2 }}
    className="text-white w-full max-w-2xl"
  >
    <h1 className="text-3xl md:text-6xl font-extrabold mb-4 font-serif tracking-wide leading-tight">
      Welcome to <span className="font-[Pacifico] text-pink-300">Sweet Pea</span> 
      <hr className="w-32 mx-auto sm:mx-0 border-pink-400" /> Baby Shop
    </h1>
    <p className="text-lg sm:text-2xl mb-6 font-light italic tracking-wider max-w-lg">
      Discover our curated collection of premium baby products
    </p>
    <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
      <Link
        to="/shop"
        className="bg-gradient-to-r from-pink-500 text-white px-6 sm:px-8 py-3 rounded-full shadow-lg font-semibold text-lg tracking-wider hover:scale-105 transition-transform duration-300"
      >
        Shop Now
      </Link>
    </motion.div>
  </motion.div>
</div>

      </section>

      <div><Small/></div>
      <div><br /></div>

      <section className="py-16 bg-gray-50 px-6 sm:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
            <div>
              <Star className="h-10 sm:h-12 w-10 sm:w-12 text-pink-500 mx-auto mb-4" />
              <h3 className="text-lg sm:text-xl font-semibold mb-2">Premium Quality</h3>
              <p className="text-gray-600 text-sm sm:text-base">
                Carefully selected products for your little ones
              </p>
            </div>
            <div>
              <TrendingUp className="h-10 sm:h-12 w-10 sm:w-12 text-pink-500 mx-auto mb-4" />
              <h3 className="text-lg sm:text-xl font-semibold mb-2">Best Sellers</h3>
              <p className="text-gray-600 text-sm sm:text-base">
                Most loved products by our customers
              </p>
            </div>
            <div>
              <Heart className="h-10 sm:h-12 w-10 sm:w-12 text-pink-500 mx-auto mb-4" />
              <h3 className="text-lg sm:text-xl font-semibold mb-2">Made with Love</h3>
              <p className="text-gray-600 text-sm sm:text-base">
                Products that care for your baby
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Homepage;
