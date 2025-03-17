import React from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "../axios/intersptr";
import { toast } from "react-toastify";

const WishlistModal = ({ isOpen, closeModal }) => {
  const queryClient = useQueryClient();

  const { data: wishlistData, isLoading, isError } = useQuery({
    queryKey: ["Wishlist"],
    queryFn: async () => {
      const res = await axiosInstance.get("wishlist/getWishlist");
      return res.data?.message || [];
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async ({ productId }) => {
      const res = await axiosInstance.delete(
        `wishlist/deletewishlist/${productId}`
      );
      return res.data;
    },
    onSuccess: () => {
      toast.success("Item removed successfully");
      queryClient.invalidateQueries(["Wishlist"]);
    },
    onError: () => {
      toast.error("Failed to remove item");
    },
  });

  const handleDelete = (productId) => {
    deleteMutation.mutate({ productId });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 transition-opacity duration-300">
      <div className="bg-white w-full max-w-3xl p-6 rounded-lg relative shadow-lg">
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-xl"
          onClick={closeModal}
        >
          &times;
        </button>

        <h2 className="text-2xl font-semibold text-center mb-6">Your Wishlist</h2>

        {isLoading && (
          <p className="text-gray-600 text-center mt-4 text-lg">Loading Wishlist...</p>
        )}
        {isError && (
          <p className="text-red-500 text-center mt-4 text-lg">
            Failed to load Wishlist.
          </p>
        )}

        {!isLoading && !isError && wishlistData?.length === 0 && (
          <p className="text-center text-gray-600">Your wishlist is empty.</p>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
          {wishlistData?.map((item) => (
            <div
              key={item._id}
              className="bg-white shadow-md rounded-lg p-4 flex flex-col items-center space-y-4"
            >
              <img
                src={item.img}
                alt={item.name}
                className="w-32 h-32 object-cover rounded-md"
              />
              <h3 className="text-lg font-semibold">{item.name}</h3>
              <p className="text-gray-500">${item.price}</p>
              <button
                disabled={deleteMutation.isLoading}
                className={`${
                  deleteMutation.isLoading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-red-500 hover:bg-red-600"
                } text-white px-4 py-2 rounded-md transition`}
                onClick={() => handleDelete(item._id)}
              >
                {deleteMutation.isLoading ? "Removing..." : "Remove from Wishlist"}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WishlistModal;
