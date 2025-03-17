import React from "react";
import { Link } from "react-router-dom";

const categories = [
  {
    name: "Clothing",
    image: "/thumb-1920-1338256.png",
    link: "/category/clothing",
  },
  {
    name: "Toys",
    image: "/wooden-toy-car-toddler-hand-2160x1200.jpg",
    link: "/category/toys",
  },
  {
    name: "Accessories",
    image: "/Baby-girl-accessories.FI_.jpg",
    link: "/category/accessories",
  },
  {
    name: "Feeding",
    image: "/breastfeeding-mom-and-baby.jpg",
    link: "/category/feeding",
  },
  {
    name: "Nursery",
    image: "/SPR-baby-room-ideas-5217584-hero-03c9f6e078544ed1a4cc555c54a4d034.jpg",
    link: "/category/nursery",
  },
  {
    name: "Gifts",
    image: "/il_fullxfull.1143603237_h0qf.webp",
    link: "/category/gifts",
  },
];

function CategoryPage() {
  return (
    <div className="container mx-auto px-4">
      <div className="text-center text-xl py-8">
        Categories Explore Now
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {categories.map((category, index) => (
          <Link
            key={index}
            to={category.link}
            className="relative group rounded-xl overflow-hidden shadow-lg transform transition-all duration-300 hover:scale-105"
          >
            <img
              src={category.image}
              alt={category.name}
              className="w-full h-64 object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <span className="text-white text-2xl font-semibold">{category.name}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default CategoryPage;
