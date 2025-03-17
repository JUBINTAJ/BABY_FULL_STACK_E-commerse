import React from 'react';
import { Heart, Mail, Phone, MapPin } from 'lucide-react';

export  const Footer = () => {
  return (
    <footer className="bg-beige-100 text-beige-800">
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Sweet Pea Baby Shop</h3>
            <p className="text-sm">
              Making parenting journey beautiful with carefully curated baby products.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>New Arrivals</li>
              <li>Best Sellers</li>
              <li>Special Offers</li>
              <li>Gift Cards</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Customer Service</h3>
            <ul className="space-y-2 text-sm">
              <li>Shipping Policy</li>
              <li>Returns & Exchanges</li>
              <li>FAQ</li>
              <li>Size Guide</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center">
                <Phone className="h-4 w-4 mr-2" />
                +1 (555) 123-4567
              </li>
              <li className="flex items-center">
                <Mail className="h-4 w-4 mr-2" />
                support@Sweet Pea Baby Shop.com
              </li>
              <li className="flex items-center">
                <MapPin className="h-4 w-4 mr-2" />
                123 Baby Lane, Kidsville
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-beige-200 text-center">
          <p className="text-sm">
            Made with <Heart className="h-4 w-4 inline text-beige-800" /> by Sweet Pea Baby Shop © {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </footer>
  );
};

