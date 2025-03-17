
import React from 'react';
import { Footer } from '../component/Footer';
import Nav from '../component/Nav';

const Contact = () => {
  return (
    <div>
            <Nav/>


   
    <section className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6">
      <div className="flex flex-col items-center max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6 lg:p-12">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-4 prata-regular">Contact Us</h1>
        <p className="text-gray-700 text-lg mb-8">
          We would love to hear from you! If you have any questions or need assistance, feel free to reach out to us using the form below. Our team is here to help and will get back to you as soon as possible.
        </p>
        <form className="w-full max-w-lg">
          <div className="flex flex-col mb-4">
            <label htmlFor="name" className="text-gray-700 text-sm font-medium mb-2"  >Name</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder='enter a name'
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="flex flex-col mb-4">
            <label htmlFor="email" className="text-gray-700 text-sm font-medium mb-2">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder='enter a email'
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="flex flex-col mb-4">
            <label htmlFor="message" className="text-gray-700 text-sm font-medium mb-2">Message</label>
            <textarea
              id="message"
              name="message"
              rows="4"
                placeholder='please enter anything'
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Send Message
          </button>
        </form>
      </div>
    </section>
    <Footer/>
    </div>

  );
};

export default Contact;
