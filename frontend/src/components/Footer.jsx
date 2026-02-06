import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";

const Footer = () => (
  <footer className="relative bg-gradient-to-r from-gray-900 via-black to-gray-900 text-white py-12 px-6">
    <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">

      {/* About Section */}
      <div className="flex flex-col gap-4">
        <h3 className="text-xl font-bold">Tripnest</h3>
          <p className="text-gray-300">
            Tripnest is your AI-powered travel companion, helping you discover hidden gems, popular landmarks, and unique experiences across Sri Lanka. Plan smarter, travel better, and explore beyond the ordinary.
        </p>
      </div>

      {/* Quick Links */}
      <div className="flex flex-col gap-4">
        <h3 className="text-xl font-bold">Quick Links</h3>
        <a href="/" className="text-gray-300 hover:text-yellow-400 transition">Home</a>
        <a href="/recommendations" className="text-gray-300 hover:text-yellow-400 transition">Recommendations</a>
        <a href="#about" className="text-gray-300 hover:text-yellow-400 transition">About Us</a>
        <a href="#feature" className="text-gray-300 hover:text-yellow-400 transition">Features</a>
      </div>

      {/* Contact / Social */}
      <div className="flex flex-col gap-4">
        <h3 className="text-xl font-bold">Follow Us</h3>
        <div className="flex gap-4 mt-2">
          <a href="#" className="hover:text-yellow-400 transition"><FaFacebookF /></a>
          <a href="#" className="hover:text-yellow-400 transition"><FaTwitter /></a>
          <a href="#" className="hover:text-yellow-400 transition"><FaInstagram /></a>
          <a href="#" className="hover:text-yellow-400 transition"><FaLinkedinIn /></a>
        </div>
        <p className="text-gray-400 mt-4 text-sm">
          © 2026 Tripnest. All rights reserved.
        </p>
      </div>
    </div>

    {/* Bottom Note */}
    <div className="mt-10 text-center text-gray-500 text-sm">
      Designed and developed by Chalidu Wijekkon, Sumudu Aberathne, Manjitha Kaluarachchi, and Chanuka Wanigasekara.
    </div>
  </footer>
);

export default Footer;
