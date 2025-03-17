import React, { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "../axios/intersptr";
import Adminnavbar from "./Adminnavbar";
import { toast } from "react-toastify";

function Adminuser() {
  // const [allUsers, setAllUsers] = useState([]);
  const queryClient = useQueryClient();

  const {data:allUsers=[]} = useQuery({
    queryFn: async () => {
      const res = await axiosInstance.get("admin/allusers");
      return res.data.data.users;
    },
    queryKey:['users']
  });

  // useEffect(() => {
  //   mutation.mutate();
  // }, []);

  const blockuser = useMutation({
    mutationFn: async ({ id, block }) => {
     const res= await axiosInstance.put(`admin/blockUser/${id}`);
   
      return { id, block , response :res.data };
    },
    onSuccess: (data) => {
      const {id , block}=data;
      queryClient.invalidateQueries({queryKey:["users"]})
      toast.success(block ? "User blocked successfully" : "User unblocked successfully");

    
    },
    onError: () => {
      toast.error("Block operation failed...");
      mutation.mutate()
    },
  });

  const handleblock = (id, currentStatus) => {
    // setAllUsers((prevUsers) =>
    //   prevUsers.map((user) => (user._id === id ? { ...user, block:!currentStatus } : user))
    // );
    blockuser.mutate({ id, block: !currentStatus });
  };

  const totalUsers = allUsers.length;
  const blockedUsers = allUsers.filter((user) => user.block).length;

  return (
    <div className="flex h-screen bg-gray-900">
      <Adminnavbar />
      <div className="flex flex-col min-h-screen w-full justify-center p-6">
        
        <div className="bg-gray-800 shadow-md rounded-lg p-6 w-full max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-white text-2xl font-bold">User Management</h2>
            <div className="flex space-x-4">
              <span className="text-white bg-blue-600 px-5 py-2 rounded-lg shadow-lg">
                Total Users: <span className="font-bold">{totalUsers}</span>
              </span>
              <span className="text-white bg-red-600 px-5 py-2 rounded-lg shadow-lg">
                Blocked Users: <span className="font-bold">{blockedUsers}</span>
              </span>
            </div>
          </div>

          <div className="overflow-x-auto bg-gray-900 rounded-lg shadow-lg">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-700 text-white text-left uppercase text-sm">
                  <th className="py-3 px-6">ID</th>
                  <th className="py-3 px-6">Name</th>
                  <th className="py-3 px-6">Email</th>
                  <th className="py-3 px-6">Cart Items</th>
                  <th className="py-3 px-6">Status</th>
                  <th className="py-3 px-6">Actions</th>
                </tr>
              </thead>
              <tbody>
                {totalUsers > 0 ? (
                  allUsers.map((user, index) => (
                    <tr
                      key={user._id}
                      className={`border-b border-gray-700 hover:bg-gray-800 transition ${
                        index % 2 === 0 ? "bg-gray-900" : "bg-gray-800"
                      }`}
                    >
                      <td className="py-4 px-6 text-gray-300">{user._id}</td>
                      <td className="py-4 px-6 text-gray-300">{user.username}</td>
                      <td className="py-4 px-6 text-gray-300">{user.email}</td>
                      <td className="py-4 px-6 text-gray-300">{user.cart ? user.cart.length : 0}</td>
                      <td className="py-4 px-6">
                        <span
                          className={`px-3 py-1 text-sm font-bold rounded-lg ${
                            user.block ? "bg-red-500 text-white" : "bg-green-500 text-white"
                          }`}
                        >
                          {user.isBlocked ? "Blocked" : "Active"}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <button
                          className={`px-4 py-2 rounded-lg font-medium text-white transition-all ${
                            user.isBlocked
                              ? "bg-green-500 hover:bg-green-600"
                              : "bg-red-500 hover:bg-red-600"
                          }`}
                          onClick={() => handleblock(user._id, user.block)}
                        >
                          {user.isBlocked ? "Unblock" : "Block"}
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="py-4 px-6 text-center text-gray-400">
                      No users found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Adminuser;
