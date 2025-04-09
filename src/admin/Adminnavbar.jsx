import { useMutation } from '@tanstack/react-query';
import React from 'react'
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import { BarChart3, Home, LogOut, Package, ShoppingCart, Users } from 'lucide-react';
import axiosInstance from '../axios/intersptr';

function Adminnavbar() {
    const navigate=useNavigate()
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
      
    
    
      const handleLogout = () => {
        logoutMutation.mutate();
      };

  return (
    <div className="flex min-h-screen bg-gray-900">
              <aside className="w-56 bg-black shadow-lg">
                <div className="p-4 border-b border-gray-800">
                  <h1 className="text-2xl font-bold text-white">Admin Panel</h1>
                </div>
                <nav className="mt-4">
                  {[
                    { icon: Home, label: 'Dashboard', path:"/Adminhome" },
                    { icon: Users, label: 'Users' ,path:"/Adminuser" },
                    { icon: ShoppingCart, label: 'Orders',path:"/Adminorder" },
                    { icon: Package, label: 'Products',path:"/Adminproduct" },
                  ].map((item, index) => (
                    <Link
                      key={index}
                      to={item.path}
                      href="#"
                      className="flex items-center px-4 py-3 text-gray-400 hover:bg-gray-800 hover:text-white transition-colors"
                    >
                      <item.icon className="h-5 w-5 mr-3" />
                      {item.label}
                    </Link>
                  ))}
                  <a
                    href="#"
                    className="flex items-center px-4 py-3 text-red-400 hover:bg-gray-800 hover:text-red-300 transition-colors mt-auto" onClick={handleLogout}
                  >
                    <LogOut className="h-5 w-5 mr-3" />
                    Logout
                  </a>
                </nav>
              </aside>
              </div>
  )
}

export default Adminnavbar