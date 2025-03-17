import React from 'react';
import { useQuery } from '@tanstack/react-query';
import axiosInstance from '../axios/intersptr';
import Adminnavbar from './Adminnavbar';

function AdminOrder() {
  const { data: orders, isLoading, isError, refetch } = useQuery({
    queryKey: ['adminOrders'],
    queryFn: async () => {
      const res = await axiosInstance.get('admin/orders');
    //   console.log(res.data)
      return res.data;
    },
  });

  if (isLoading || isError) {
    return (
      <div className="flex min-h-screen bg-gray-900 text-white">
        <Adminnavbar />
        <div className="flex-1 p-6">
          {isLoading && <p>Loading Orders...</p>}
          {isError && <p className="text-red-400">Failed to load orders.</p>}
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-900 text-white">
      <Adminnavbar />

      <div className="flex-1 p-8">
        <h1 className="text-3xl font-bold mb-6">Admin Orders</h1>

        <button
          onClick={refetch}
          className="mb-6 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          Refresh Orders
        </button>

        {orders && orders.length > 0 ? (
          <div className="space-y-6">
            {orders.map((order) => (
              <div key={order._id} className="bg-white text-black border p-6 rounded-xl shadow-md">
                <h2 className="font-semibold mb-2">Order ID: {order._id}</h2>
                <p><strong>User:</strong> {order.userId}</p>
                <p><strong>Total:</strong> ${order.total}</p>
                <p><strong>Status:</strong> {order.status}</p>
                <p><strong>Date:</strong> {new Date(order.createdAt).toLocaleDateString()}</p>

                {order.products && order.products.length > 0 && (
                  <div className="mt-3">
                    <h3 className="font-medium mb-1">Products:</h3>
                    <ul className="list-disc ml-6">
                      {order.products.map((prod, index) => (
                        <li key={index}>
                          {prod.productId} - Qty: {prod.quantity}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div>No orders found.</div>
        )}
      </div>
    </div>
  );
}

export default AdminOrder;
