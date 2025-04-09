import React from "react";
import { X, Heart, ShoppingCart } from "lucide-react";
import moment from "moment";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "../axios/intersptr";
import { toast } from "react-toastify";

const ProductModal = ({ product, onClose }) => {
  if (!product) return null;
  const queryClient = useQueryClient();

  const addCart=useMutation({
    mutationFn:async({productId})=>{
        const res=await axiosInstance.post(`cart/addtocart/${productId}`)
        return res.data
    },
    onSuccess:()=>{
        toast.success('successfuly added cart')
        queryClient.invalidateQueries({ queryKey: ["Cart"] });

    },onError:(error)=>{
        toast.error("error poyinookada",error)
    }
  })

  const addwishlit=useMutation({
    mutationFn:async({productId})=>{
        const res = await axiosInstance.post(`wishlist/wishlist/${productId}`)
        console.log(res.data,'qwe')
       return res.data
    },
    onSuccess:()=>{
        toast.success('successfuly added wishlist')
        queryClient.invalidateQueries({ queryKey: ["Wishlist"] });

    },onError:(error)=>{
        toast.error("already added ",error)
    }
  })

  const handlecart=(productId)=>{
    if(!productId){
        console.error('id is missing')
    }
    addCart.mutate({productId})
  }


  const handlewishlist=(productId)=>{
    if(!productId){
        console.error('id is missing')
    }
    addwishlit.mutate({productId})
  }



  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-sm relative overflow-hidden">
        
        <button
          className="absolute top-3 right-3 text-gray-600 hover:text-gray-900"
          onClick={onClose}
        >
          <X className="w-6 h-6 text-blue-500 " />
        </button>

        <div className="absolute top-3 left-3 flex gap-2">
          <button className="bg-white p-2 rounded-full shadow hover:bg-gray-100 transition">
            <Heart className="w-5 h-5 text-red-500" />
          </button>
          <button className="bg-white p-2 rounded-full shadow hover:bg-gray-100 transition">
            <ShoppingCart className="w-5 h-5 text-gray-700" />
          </button>
        </div>

        <div className="w-full flex justify-center bg-gray-100 ">
          <img
            src={product.img}
            alt={product.name}
            className="w-full h-40 object-cover rounded-lg"
          />
        </div>

        <div className="p-6 text-center">
          <h2 className="text-2xl font-semibold">{product.name}</h2>
          <p className="text-gray-500 text-sm">Category: {product.category}</p>
          <p className="text-gray-500 text-sm">Stock: {product.stock}</p>
          <p className="text-gray-700 font-semibold text-xl mt-2">${product.price}</p>
          <p className="text-xs text-gray-500 mt-1">{moment(product.createdAt).fromNow()}</p>

          <div className="flex gap-4 mt-4 justify-center">
            <button className="bg-red-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-red-600 transition" onClick={()=>handlewishlist(product._id)} >
              <Heart className="w-5 h-5" />
              Wishlist
            </button>
            <button className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-600 transition" onClick={()=>handlecart(product._id)}>
              <ShoppingCart className="w-5 h-5" />
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
