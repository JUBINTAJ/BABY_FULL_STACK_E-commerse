
import React from 'react';
import { Footer } from '../component/Footer';
import Nav from '../component/Nav';

const About = () => {
  return (
    <div>
            <Nav/>


   
    <section className="  flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6">
      <div className="flex flex-col lg:flex-row items-center max-w-6xl mx-auto bg-white shadow-lg rounded-lg p-6 lg:p-12">
        <img 
          src="https://websitedemos.net/baby-store-04/wp-content/uploads/sites/750/2020/12/baby-store-product-img-10.jpg"
          alt="Baby Shop" 
          className="w-64 h-64 object-cover rounded-lg shadow-md mb-6 lg:mb-0 lg:mr-8"
        />
        <div className="  text-center lg:text-left">
          <h1 className="text-4xl font-extrabold text-gray-800 mb-4 prata-regular">Welcome to Our Sweet Pea Baby Shop  </h1>
          <p className=" prata-regular text-gray-700 text-lg mb-4">
            At Our Baby Shop, we are dedicated to providing you with the highest quality products for your little one. Our selection includes everything from adorable clothing to essential baby gear, all crafted with care and attention to detail.
          </p>
          <p className="text-gray-700 text-lg mb-4 prata-regular">
            Our Mission: Our mission is to offer a carefully curated selection of baby products that cater to both parents and their little ones. We strive to make each shopping experience enjoyable and stress-free, providing products that are not only beautiful but also practical and safe.
          </p>
          <p className="text-gray-700 text-lg mb-4 prata-regular">
            Our Values
            Quality: We believe that every product should meet the highest standards of quality and safety. 
            Customer-Centric: Your satisfaction is our top priority. We are committed to offering exceptional customer service and support.
            Sustainability: We are dedicated to sustainable practices and seek to minimize our environmental impact through eco-friendly products and packaging.
          </p>
          <p className="text-gray-700 text-lg prata-regular">
            Our team is passionate about creating a delightful shopping experience and ensuring that every product we offer meets the highest standards. We are more than just a store; we are a community of parents and caregivers who understand the joys and challenges of parenting. Thank you for choosing us to be a part of your parenting journey.
          </p>
        </div>
      </div>
    </section>
   <Footer/>
    </div>
  );
};

export default About;
