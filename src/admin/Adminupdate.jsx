import React, { useState, useEffect } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import axiosInstance from '../axios/intersptr';

function AdminUpdateModal({ open, onClose, item  }) {
   const queryClient = useQueryClient();
  const [product, setProduct] = useState({img: '',name: '',price: '',stock: '',category: '', });

  useEffect(() => {
    if (item) {
      setProduct({
        _id:item._id || '',
        img: item.img || '',
        name: item.name || '',
        price: item.price || '',
        stock: item.stock || '',
        category: item.category || '',
      });
    }
  }, [item]);

  useEffect(() => {
    if (!open) {
      setProduct({
        _id:'',
        img: '',
        name: '',
        price: '',
        stock: '',
        category: '',
      });
    }
  }, [open]);

  const updateProductMutation = useMutation({
    mutationFn: async (updatedProduct) => {
      const res = await axiosInstance.patch(`product/updateProduct`, updatedProduct);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey:["products"]})
      toast.success('Product updated successfully!');
      onClose();
    },
    onError: (error) => {
      console.error('Error updating product:', error);
      toast.error('Failed to update product');
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateProductMutation.mutate(product);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-80 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-lg relative transition-transform transform scale-100">
        <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">Update Product</h2>

        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-gray-500 hover:text-gray-700 text-2xl font-bold"
        >
          &times;
        </button>

        <form onSubmit={handleSubmit} className="space-y-4 text-black">
          {['name', 'img', 'price', 'category', 'stock'].map((field) => (
            <div key={field} className="flex flex-col">
              <label htmlFor={field} className="mb-1 text-sm text-gray-700 capitalize">{field}</label>
              <input
                id={field}
                name={field}
                type={field }
                min={field }
                max={field }
                value={product[field]}
                onChange={handleChange}
                className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder={`Enter ${field}`}
                required={field === 'name'}
              />
            </div>
          ))}

          <div className="flex justify-end mt-4">
            <button
              type="submit"
              disabled={updateProductMutation.isLoading}
              className="bg-black text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              {updateProductMutation.isLoading ? 'Updating...' : 'Update Product'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AdminUpdateModal;
