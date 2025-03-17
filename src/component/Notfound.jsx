import React from 'react';
import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';

const NotFound = () => {
  return (
    <div 
      className="min-h-screen w-full flex items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage: "url('https://images.unsplash.com/photo-1555252333-9f8e92e65df9?auto=format&fit=crop&q=80')",
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <div className="absolute inset-0 bg-beige-800/40"></div>
      <div className="relative z-10 text-center px-4">
        <h1 className="text-8xl font-bold text-white mb-4">404</h1>
        <h2 className="text-3xl font-semibold text-white mb-6">Oops! Page Not Found</h2>
        <p className="text-xl text-white mb-8">
          Looks like this page wandered off to play peek-a-boo!
        </p>
        <Link 
          to="/" 
          className="inline-flex items-center px-6 py-3 bg-primary-50 text-beige-800 rounded-full  hover:bg-beige-100 transition duration-300 border-2"
        >
          <Home className="w-5 h-5 mr-2" />
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;