"use client"
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-6 mt-8">
      <div className="container mx-auto px-6">
        <div className="flex flex-wrap justify-between">
          <div className="w-full md:w-1/3 mb-6">
            <h3 className="text-xl font-semibold mb-3">SecondHand Mart</h3>
            <p>Connecting buyers and sellers with ease.</p>
          </div>

          <div className="w-full md:w-1/3 mb-6">
            <h3 className="text-xl font-semibold mb-3">Quick Links</h3>
            <ul className="space-y-4">
              <li><Link href="/" className="hover:text-gray-400 hover:underline">Home</Link></li>
              <li><Link href="/products" className="hover:text-gray-400 hover:underline">Products</Link></li>
              <li><Link href="/login" className="hover:text-gray-400 hover:underline">Login</Link></li>
              <li><Link href="/user/dashboard" className="hover:text-gray-400 hover:underline">Dashboard</Link></li>
            </ul>
          </div>

          <div className="w-full md:w-1/3 mb-6">
            <h3 className="text-xl font-semibold mb-3">Contact</h3>
            <p>Email: support@secondhandmart.com</p>
            <p>Phone: (123) 456-7890</p>
            <div className="flex space-x-4 mt-3">
              <a href="#" className="text-gray-400 hover:text-white">
                <i className="fab fa-facebook"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <i className="fab fa-instagram"></i>
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-600 pt-6 text-center">
          <p className="text-sm text-gray-400">&copy; 2025 SecondHand-Mart. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
