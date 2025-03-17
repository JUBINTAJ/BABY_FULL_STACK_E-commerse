import React from "react";
import { Link } from "react-router-dom";
import Title from "../component/title";
import Nav from "../component/Nav";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "../axios/intersptr";
import { toast } from "react-toastify";

const Cart = () => {
  const queryClient = useQueryClient();
  const currency = "$";
  const deliveryFee = 5;

  const { data: CartData, isLoading, isError } = useQuery({
    queryKey: ["Cart"],
    queryFn: async () => {
      const res = await axiosInstance.get("cart/getCart");
      return res.data.cart?.products || [];
    },
  });

  const deleteCartMutation = useMutation({
    mutationFn: async ({ productId }) => {
      await axiosInstance.delete(`cart/removeFromCart/${productId}`);
    },
    onSuccess: () => {
      toast.success("Item removed successfully");
      queryClient.invalidateQueries(["Cart"]);
    },
    onError: () => {
      toast.error("Failed to remove item");
    },
  });

  const increasingQuantity = useMutation({
    mutationFn: async ({ productId }) => {
     const res= await axiosInstance.put(`cart/increment/${productId}`);
     return res.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["Cart"]);
    },
    onError: () => {
      toast.error("Failed to update quantity");
    },
  });
  
  const decreasingQuantity = useMutation({
    mutationFn: async ({ productId }) => {
     const res= await axiosInstance.put(`cart/decrement/${productId}`);
     return res.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["Cart"]);
    },
    onError: () => {
      toast.error("Failed to update quantity");
    },
  });

  const handleDelete = (productId) => {
    deleteCartMutation.mutate({ productId });
  };

  const handleincrement = (productId) => {
    increasingQuantity.mutate({ productId });
  };

  const handledecrment = (productId) => {
    decreasingQuantity.mutate({ productId });
  };

  const Cart = Array.isArray(CartData) ? CartData : [];
  const calculateTotal = () =>
    Cart.reduce((total, item) => total + item.product.price * (item.quantity || 1), 0);
  const grandTotal = calculateTotal() + deliveryFee;

  if (isLoading) return <p className="text-gray-600 text-center mt-10 text-lg">Loading Cart...</p>;
  if (isError) return <p className="text-red-500 text-center mt-10 text-lg">Failed to load Cart.</p>;

  return (
    <div>
      <Nav />
      <br />
      <br />
      <br />
      <div className="p-10">
        <div className="text-center text-2xl pt-10 border-t">
          <Title text1={"Your "} text2={" Cart"} />
        </div>

        {Cart.length === 0 ? (
          <div className="text-center mt-10">
            <p className="text-gray-600">Your cart is empty.</p>
          </div>
        ) : (
          <div className="mt-10">
            {Cart.map((item) => (
              <div key={item.product._id} className="flex justify-between items-center border-b pb-4 mb-4">
                <div className="flex items-center space-x-4">
                  <img src={item.product.img} alt={item.product.name} className="w-20 h-20 object-cover rounded-md shadow-md" />
                  <div>
                    <p className="font-semibold text-lg">Name: {item.product.name}</p>
                    <p className="text-gray-500">Price: {currency}{item.product.price}</p>
                    <p className="text-gray-500">Total: {currency}{item.product.price * (item.quantity || 1)}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-6">
                  <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                    <button
                      onClick={() => handledecrment(item.product._id, item.quantity - 1)}
                      className="bg-gray-300 px-3 py-1 text-lg hover:bg-gray-400"
                    >
                      ➖
                    </button>
                    <span className="px-4 py-1 text-lg font-semibold">{item.quantity}</span>
                    <button
                      onClick={() => handleincrement(item.product._id, item.quantity + 1)}
                      className="bg-gray-300 px-3 py-1 text-lg hover:bg-gray-400"
                    >
                      ➕
                    </button>
                  </div>

                  <button onClick={() => handleDelete(item.product._id)} className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition">
                    🗑️ Delete
                  </button>
                </div>
              </div>
            ))}

            <div className="bg-gray-100 p-6 rounded-lg mt-10 shadow-md">
              <div className="flex justify-between text-lg font-semibold">
                <p>Subtotal:</p>
                <p>{currency}{calculateTotal()}</p>
              </div>
              <div className="flex justify-between text-lg font-semibold mt-2">
                <p>Delivery Fee:</p>
                <p>{currency}{deliveryFee}</p>
              </div>
              <div className="flex justify-between text-xl font-bold mt-4">
                <p>Total:</p>
                <p>{currency}{grandTotal}</p>
              </div>
              <div className="text-center mt-6">
                <Link to={"/payment"}>
                  <button className="bg-blue-600 rounded-xl text-white px-8 py-3 text-lg active:bg-blue-700 hover:bg-blue-500 transition">
                    Proceed to Payment
                  </button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
