import React, { useState } from "react";
import Title from "../component/title";
import Searchbar from "../component/Searchbar";
import Nav from "../component/Nav";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../axios/intersptr";
import moment from "moment";
import { Heart, ShoppingCart } from "lucide-react";
import ProductModal from "../component/productmodal";

function Shop() {
  const [category, setCategory] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const { data: products = [], isLoading, isError } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await axiosInstance.get("product");
      return res.data.products;
    },
  });

  const toggleCategory = (e) => {
    const value = e.target.value;
    setCategory((prev) =>
      prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]
    );
  };

  const filteredProducts =
    category.length > 0 ? products.filter((item) => category.includes(item.category)) : products;

  if (isLoading) return <p className="text-gray-600 text-center mt-10 text-lg">Loading products...</p>;
  if (isError) return <p className="text-red-500 text-center mt-10 text-lg">Failed to load products.</p>;

  return (
    <div className="bg-gray-50 min-h-screen">
      <Nav />
      <br />
      <br />
      <br />
      <div className="container mx-auto px-4 py-6">
        <Searchbar />

        <div className="flex flex-col sm:flex-row gap-8 pt-10 border-t">
          <div className="sm:w-64 bg-white shadow-md rounded-lg p-5 hidden sm:block">
            <p className="text-lg font-semibold mb-4">Filters</p>
            <div className="border border-gray-200 p-4 rounded-lg">
              <p className="text-sm font-medium mb-3">Categories</p>
              <div className="flex flex-col gap-3 text-sm text-gray-700">
                {["dress", "toys", "food"].map((cat) => (
                  <label key={cat} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      value={cat}
                      onChange={toggleCategory}
                      className="w-4 h-4 accent-black"
                    />
                    {cat.charAt(0).toUpperCase() + cat.slice(1)}
                  </label>
                ))}
              </div>
            </div>
          </div>

          <div className="flex-1">
            <div className="text-center mb-6">
              <Title text1="All" text2="COLLECTION" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                  <div
                  key={product._id}
                  className="bg-white border rounded-lg shadow-md hover:shadow-xl transition duration-300 relative cursor-pointer p flex flex-col"
                  onClick={() => setSelectedProduct(product)}
                >
                  <div className="absolute top-3 right-3 flex gap-2">
                    <button className="bg-white p-2 rounded-full shadow hover:bg-gray-100 transition">
                      <Heart className="w-5 h-5 text-red-500" />
                    </button>
                    <button className="bg-white p-2 rounded-full shadow hover:bg-gray-100 transition">
                      <ShoppingCart className="w-5 h-5 text-gray-700" />
                    </button>
                  </div>
                
                  <div className="w-full flex justify-center">
                    <img
                      src={product.img}
                      alt={product.name}
                      className="w-full h-40 object-cover rounded-t-lg"
                    />
                  </div>
                
                  <div className="p-4 flex flex-col items-center text-center bg-gray-50 rounded-b-lg">
                    <h3 className="text-lg font-semibold">{product.name}</h3>
                    <p className="text-red-700 font-semibold text-lg">${product.price}</p>
                    {/* <p className="text-xs text-gray-500 mt-1">
                      {moment(product.createdAt).fromNow()}
                    </p> */}
                  </div>
                </div>
                
                
                ))
              ) : (
                <p className="text-center text-gray-400 col-span-full">No products found</p>
              )}
            </div>
          </div>
        </div>
      </div>
      <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
    </div>
  );
}

export default Shop;
