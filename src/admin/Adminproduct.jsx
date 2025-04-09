import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axiosInstance from '../axios/intersptr';
import { toast } from 'react-toastify';
import Adminnavbar from './Adminnavbar';
import AdminAddModal from './Adminadd';
import AdminUpdateModal from './Adminupdate';

function Adminproduct() {
  const queryClient = useQueryClient();
  
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [stockFilter, setStockFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [updataOpen, setIsupdataOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);



  const { data: products = [], isLoading, isError } = useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const res = await axiosInstance.get('product');
      return res.data.products;
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id) => {
     const res= await axiosInstance.delete(`product/deleteProduct/${id}`);
     return res.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey:["products"]})
      toast.success('success')
    },
  });

  const handleDelete = (id) => {
      deleteMutation.mutate(id);
    
  };

  const categories = useMemo(() => {
    const unique = new Set(products.map((item) => item.category));
    return ['All', ...Array.from(unique)];
  }, [products]);

  const filteredProducts = products.filter((item) => {
    const matchCategory =
      categoryFilter === 'All' || item.category === categoryFilter;
    const matchStock =
      stockFilter === 'All' ||
      (stockFilter === 'In Stock' && item.stock > 0) ||
      (stockFilter === 'Out of Stock' && item.stock === 0);
    const matchSearch = item.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    return matchCategory && matchStock && matchSearch;
  });

const handleUpdate=(item)=>{
  setSelectedProduct(item);
  setIsupdataOpen(true)
}

  return (
    <div className="flex min-h-screen bg-gray-900 text-white">
      <Adminnavbar />
      <div className="w-full p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Products</h2>
            <button className="bg-lime-600 py-2 px-6 rounded-lg hover:bg-lime-700"onClick={()=>setIsModalOpen(true)}>
              Add Product
            </button>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <input
            type="text"
            placeholder="Search by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-4 py-2 rounded bg-gray-800 focus:outline-none"
          />
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-4 py-2 rounded bg-gray-800 focus:outline-none"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          <select
            value={stockFilter}
            onChange={(e) => setStockFilter(e.target.value)}
            className="px-4 py-2 rounded bg-gray-800 focus:outline-none"
          >
            <option value="All">All Stock</option>
            <option value="In Stock">In Stock</option>
            <option value="Out of Stock">Out of Stock</option>
          </select>
        </div>

        {isLoading && (
          <div className="flex justify-center text-lg">Loading...</div>
        )}
        {isError && (
          <div className="flex justify-center text-red-500 text-lg">
            Failed to load products.
          </div>
        )}

        <div className="overflow-x-auto">
          <table className="min-w-full bg-gray-800 rounded-lg overflow-hidden">
            <thead className="bg-gray-700">
              <tr>
                <th className="text-left py-3 px-4">Image</th>
                <th className="text-left py-3 px-4">Title</th>
                <th className="text-left py-3 px-4">Price</th>
                <th className="text-left py-3 px-4">Stock</th>
                <th className="text-left py-3 px-4">Category</th>
                <th className="text-left py-3 px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((item) => (
                <tr
                  key={item._id}
                  className="border-b border-gray-700 hover:bg-gray-700"
                >
                  <td className="py-3 px-4">
                    <img
                      src={item.img}
                      alt={item.title}
                      className="h-16 w-16 object-cover rounded"
                    />
                  </td>
                  <td className="py-3 px-4">{item.name}</td>
                  <td className="py-3 px-4">
                    {item.currency} {item.price}
                  </td>
                  <td className="py-3 px-4">{item.stock}</td>
                  <td className="py-3 px-4">{item.category}</td>
                  <td className="py-3 px-4 flex gap-2">
                      <button className="bg-blue-600 px-4 py-1 rounded hover:bg-blue-700"
                      onClick={()=>handleUpdate(item)}>
                        Update
                      </button>
                    <button
                      className="bg-red-600 px-4 py-1 rounded hover:bg-red-700"
                      onClick={() => handleDelete(item._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {filteredProducts.length === 0 && !isLoading && (
                <tr>
                  <td colSpan="6" className="text-center py-4">
                    No products match the filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      <AdminAddModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
      <AdminUpdateModal item={selectedProduct} open={updataOpen} onClose={() => setIsupdataOpen(false)}  />

    </div>
  );
}

export default Adminproduct;
