import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate, useLocation } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";
import axiosInstance from "../axios/intersptr";
import { toast } from "react-toastify";
import { useMutation } from "@tanstack/react-query";

const UserPaymentAddress = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { grandTotal = 0, Cart = [] } = location.state || {};

  const verifypayment = useMutation({
    mutationFn: async (paymentData) => {
      const res = await axiosInstance.post("order/verifypayment", paymentData);
      console.log(res.data,'okkii');
      return res.data;
    },
    onSuccess: () => {
      setIsModalOpen(true);
      toast.success(`You Paid ₹${grandTotal} Successfully`);
    },
    onError: () => {
      toast.error("Payment verification failed. Try again.");
    },
  });
  
  const addOrder = useMutation({
    mutationFn: async (orderData) => {
      const res = await axiosInstance.post("order/addorder", orderData);
      console.log(res.data,'lloii');
      return res.data;
    },
    onSuccess: (data, variables) => {
      const { razorpayOrderId, amount } = data;
      openRazorpayPayment(razorpayOrderId, amount, variables.name);
    },
    onError: () => {
      toast.error("Failed to place order");
    },
  });

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const openRazorpayPayment = (razorpayOrderId, amount, name) => {
    const options = {
      key: "rzp_test_wL1B6IUAUSnQqu",
      amount: amount * 100,
      currency: "INR",
      name: "BABY",
      description: "Product Payment",
      order_id: razorpayOrderId,
      handler: (response) => {
        const paymentData = {
          razorpay_payment_id: response.razorpay_payment_id,
          razorpay_order_id: response.razorpay_order_id,
          razorpay_signature: response.razorpay_signature,
        };
        verifypayment.mutate(paymentData);
      },
      prefill: {
        name,
      },
      theme: {
        color: "#F37254",
      },
    };

    const razorpay = new window.Razorpay(options);
    razorpay.open();
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      address: "",
      phone: "",
      cardno: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().max(50).required(),
      email: Yup.string().email().required(),
      address: Yup.string().required(),
      phone: Yup.string().matches(/^[0-9]+$/).min(10).max(10).required(),
      cardno: Yup.string().matches(/^[0-9]+$/).min(16).max(16).required(),
    }),
    onSubmit: async (values) => {
      const orderData = {
        ...values,
        items: Cart,
        total: grandTotal,
        paymentMethod: "razorpay",
      };
      addOrder.mutate(orderData);
    },
  });

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-gray-100"
      style={{
        backgroundImage: "url('/path-to-homepage-image.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <form
        onSubmit={formik.handleSubmit}
        className="w-full max-w-lg bg-opacity-90 bg-white p-8 shadow-lg rounded-lg border border-blue-400"
      >
        <h2 className="text-2xl font-bold mb-6 text-blue-700">Payment Address</h2>

        {["name", "email", "address", "phone", "cardno"].map((field, idx) => (
          <div className="mb-4" key={idx}>
            <label className="block text-blue-700 mb-2" htmlFor={field}>
              {field.charAt(0).toUpperCase() + field.slice(1)}
            </label>
            <input
              id={field}
              name={field}
              type={field === "email" ? "email" : "text"}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values[field]}
              className={`w-full p-2 border rounded ${
                formik.touched[field] && formik.errors[field]
                  ? "border-red-500"
                  : "border-blue-300"
              }`}
            />
            {formik.touched[field] && formik.errors[field] && (
              <div className="text-red-500 text-sm mt-1">{formik.errors[field]}</div>
            )}
          </div>
        ))}

        <div>
          <label className="mb-2 mt-2 block text-blue-700">TOTAL PRICE:</label>
          <div className="text-center text-2xl font-bold text-blue-700">₹{grandTotal}</div>
        </div>

        <div className="flex justify-between mt-6">
          <button
            type="button"
            className="bg-gray-400 text-white p-2 rounded hover:bg-gray-600"
            onClick={() => navigate(-1)}
          >
            ⬅️ Back
          </button>
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded hover:bg-blue-700"
          >
            Pay Now!
          </button>
          <button
            type="button"
            className="bg-gray-500 text-white p-2 rounded hover:bg-gray-700"
            onClick={() => navigate("/cart")}
          >
            Cancel Payment
          </button>
        </div>
      </form>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-lg shadow-lg text-center border border-blue-400">
            <FaCheckCircle className="text-green-500 text-6xl mb-4 mx-auto" />
            <h2 className="text-2xl font-bold mb-4 text-blue-700">Order Successful!</h2>
            <p>Your order has been placed successfully.</p>
            <button
              onClick={() => {
                setIsModalOpen(false);
                navigate("/");
              }}
              className="mt-4 bg-blue-500 text-white p-2 rounded hover:bg-blue-700"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserPaymentAddress;
