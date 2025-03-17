import React, { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axiosInstance from '../axios/intersptr';
import { toast } from 'react-toastify';

function AdminAddModal({ open, onClose }) {
  const [product, setProduct] = useState({
    image: null,
    title: "",
    price: "",
    rating: "",
    category: ""
  });
  const queryClient =useQueryClient();

  const addProduct = useMutation({
    mutationFn: async (newProduct) => {
      const formData = new FormData();
      formData.append('title', newProduct.name);
      formData.append('price', newProduct.price);
      formData.append('stock', newProduct.stock);
      formData.append('category', newProduct.category);
      formData.append('img', newProduct.img); 
      const {title,rating,...rest}=newProduct;
      const res = await axiosInstance.post('product/addproduct', rest, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return res.data;
    },
    onSuccess: () => {
      toast.success('Product added successfully!');
      setProduct({
        image: null,
        name: "",
        price: "",
        stock: "",
        category: ""
      });
      queryClient.invalidateQueries({queryKey:["products"]})
      onClose();
    },
    onError: () => {
      toast.error('Failed to add product!');
    }
  });

  const change = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setProduct((prev) => ({
        ...prev,
        image: files[0],
      }));
    } else {
      setProduct((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const sub = (e) => {
    e.preventDefault();
    if (!product.image) {
      toast.error('Please upload a product image!');
      return;
    }
    addProduct.mutate(product);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-80 flex items-center justify-center z-50">
      <div className="bg-blue-600 rounded-2xl shadow-xl p-8 w-full max-w-md relative">
        <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">Add New Product</h2>

        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-gray-500 hover:text-gray-700 text-2xl font-bold"
        >
          &times;
        </button>

        <form onSubmit={sub} className="space-y-5 text-black">
          <div className="flex flex-col">
            <label htmlFor="name" className="mb-1 text-sm text-gray-700">Product Name</label>
            <input
              id="name"
              name="name"
              type="text"
              value={product.name}
              onChange={change}
              required
              className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter product name"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="image" className="mb-1 text-sm text-gray-700">Product Image</label>
            <input
              id="image"
              name="image"
              type="file"
              accept="image/*"
              onChange={change}
              required
              className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="price" className="mb-1 text-sm text-gray-700">Price</label>
            <input
              id="price"
              name="price"
              type="number"
              value={product.price}
              onChange={change}
              required
              className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter price"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="category" className="mb-1 text-sm text-gray-700">Category</label>
            <input
              id="category"
              name="category"
              type="text"
              value={product.category}
              onChange={change}
              required
              className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter category"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="stock" className="mb-1 text-sm text-gray-700">stock</label>
            <input
              id="stock"
              name="stock"
              type="number"
              value={product.stock}
              onChange={change}
              required
              className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter stock"
            />
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-black text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              {addProduct.isPending ? 'Adding...' : 'Add Product'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AdminAddModal;
