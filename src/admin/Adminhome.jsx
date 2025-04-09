import React from 'react';
import { Users, ShoppingCart, DollarSign, Package } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,} from 'recharts';
import Adminnavbar from './Adminnavbar';
import axiosInstance from '../axios/intersptr';

function App() {
  const { data: userCount = 0, isLoading: isUserCountLoading } = useQuery({
    queryKey: ['usersCount'],
    queryFn: async () => {
      const res = await axiosInstance.get('admin/usersCount');
      return res.data.totalUsers;
    },
    onError: () => {
      toast.error('Error fetching user count');
    },
  });

  const { data: orders = [], isLoading: isOrdersLoading } = useQuery({
    queryKey: ['orders'],
    queryFn: async () => {
      const res = await axiosInstance.get('admin/orders');
      return res.data.order;
    },
    onError: () => {
      toast.error('Error fetching orders');
    },
  });

  const { data: profit = 0, isLoading: isProfitLoading } = useQuery({
    queryKey: ['profit'],
    queryFn: async () => {
      const res = await axiosInstance.get('admin/profit');
      return res.data.total;
    },
    onError: () => {
      toast.error('Error fetching profit');
    },
  });

  const { data: totalPurchase = 0, isLoading: isTotalPurchaseLoading } = useQuery({
    queryKey: ['totalPurchase'],
    queryFn: async () => {
      const res = await axiosInstance.get('admin/totalpurchase');
      return res.data.total;
    },
    onError: () => {
      toast.error('Error fetching total purchase');
    },
  });

  // const { data: salesData = [], isLoading: isSalesLoading } = useQuery({
  //   queryKey: ['salesStats'],
  //   queryFn: async () => {
  //     const res = await axiosInstance.get('admin/sales');
  //     console.log(res.data)
  //     return res.data.sales;
  //   },
  //   onError: () => {
  //     toast.error('Error fetching sales stats');
  //   },
  // });
  

  const stats = {
    userCount,
    ordersCount: orders.length,
    profit,
    totalPurchase,
  };

  if (isUserCountLoading || isOrdersLoading || isProfitLoading || isTotalPurchaseLoading) {
    return <div className="text-white p-8">Loading dashboard...</div>;
  }

  const data = [
    { month: 'Jan', sales: 4000 },
    { month: 'Feb', sales: 3000 },
    { month: 'Mar', sales: 5000 },
    { month: 'Apr', sales: 4000 },
    { month: 'May', sales: 6000 },
    { month: 'Jun', sales: 7000 },
    { month: 'Jul', sales: 6500 },
    { month: 'Aug', sales: 7200 },
  ];

  return (
    <div className="flex min-h-screen bg-gray-900">
      <Adminnavbar />

      <main className="flex-1 p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-gray-800 rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-3 bg-blue-900 rounded-full">
                <Users className="h-6 w-6 text-blue-400" />
              </div>
              <div className="ml-4">
                <h3 className="text-sm font-medium text-gray-400">Total Users</h3>
                <p className="text-2xl font-semibold text-white">{stats.userCount}</p>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-3 bg-green-900 rounded-full">
                <ShoppingCart className="h-6 w-6 text-green-400" />
              </div>
              <div className="ml-4">
                <h3 className="text-sm font-medium text-gray-400">Total Orders</h3>
                <p className="text-2xl font-semibold text-white">{stats.ordersCount}</p>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-3 bg-purple-900 rounded-full">
                <DollarSign className="h-6 w-6 text-purple-400" />
              </div>
              <div className="ml-4">
                <h3 className="text-sm font-medium text-gray-400">Total Profit</h3>
                <p className="text-2xl font-semibold text-white">${stats.profit.toLocaleString()}</p>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-3 bg-yellow-900 rounded-full">
                <Package className="h-6 w-6 text-yellow-400" />
              </div>
              <div className="ml-4">
                <h3 className="text-sm font-medium text-gray-400">Total Purchase</h3>
                <p className="text-2xl font-semibold text-white">${stats.totalPurchase.toLocaleString()}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gray-800 p-6 rounded-lg shadow ">
          <h2 className="text-xl font-semibold text-white mb-4">Monthly Sales Overview</h2>
          <ResponsiveContainer width="100%" height={650}>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#555" />
              <XAxis dataKey="month" stroke="#ccc" />
              <YAxis stroke="#ccc" />
              <Tooltip />
              <Bar dataKey="sales" fill="#4F46E5" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </main>
    </div>
  );
}

export default App;
