import React from 'react';
import {
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Mail,
  Phone,
  MapPin,
  Heart,
  BookOpen
} from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Library Info */}
          <div>
            <div className="flex items-center mb-4">
              <BookOpen className="h-8 w-8 text-amber-500 mr-2" />
              <h3 className="text-2xl font-bold">Community Library</h3>
            </div>
            <p className="text-gray-300 mb-4">
              Providing access to knowledge, resources, and opportunities for all community members since 1985.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-amber-500 transition-colors">
                <Facebook className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-amber-500 transition-colors">
                <Twitter className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-amber-500 transition-colors">
                <Instagram className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-amber-500 transition-colors">
                <Youtube className="h-6 w-6" />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 border-b border-gray-700 pb-2">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-amber-500 transition-colors">About Us</a></li>
              <li><a href="#" className="text-gray-300 hover:text-amber-500 transition-colors">Membership</a></li>
              <li><a href="#" className="text-gray-300 hover:text-amber-500 transition-colors">Events & Programs</a></li>
              <li><a href="#" className="text-gray-300 hover:text-amber-500 transition-colors">Digital Resources</a></li>
            </ul>
          </div>
          
          {/* Hours */}
          <div>
            <h4 className="text-lg font-semibold mb-4 border-b border-gray-700 pb-2">Opening Hours</h4>
            <ul className="space-y-2 text-gray-300">
              <li className="flex justify-between">
                <span>Monday - Friday</span>
                <span>9:00 AM - 9:00 PM</span>
              </li>
              <li className="flex justify-between">
                <span>Saturday</span>
                <span>10:00 AM - 6:00 PM</span>
              </li>
              <li className="flex justify-between">
                <span>Sunday</span>
                <span>12:00 PM - 5:00 PM</span>
              </li>
              <li className="flex justify-between mt-4 pt-2 border-t border-gray-800">
                <span className="font-medium">24/7 Online Access</span>
                <span className="text-amber-500">Available</span>
              </li>
            </ul>
          </div>
          
          {/* Newsletter */}
          {/* <div>
            <h4 className="text-lg font-semibold mb-4 border-b border-gray-700 pb-2">Stay Updated</h4>
            <p className="text-gray-300 mb-4">Subscribe to our newsletter for updates on new arrivals and events.</p>
            <form className="flex flex-col space-y-2">
              <input
                type="email"
                placeholder="Your email address"
                className="px-4 py-2 bg-gray-800 border border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent text-white placeholder-gray-400"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white font-medium rounded transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div> */}
            {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4 border-b border-gray-700 pb-2">Contact Us</h4>
            <div className="space-y-3">
              <div className="flex items-start">
                <MapPin className="h-5 w-5 text-amber-500 mt-0.5 mr-3 flex-shrink-0" />
                <span className="text-gray-300">123 Library Lane, Bookville, BK 12345</span>
              </div>
              <div className="flex items-center">
                <Phone className="h-5 w-5 text-amber-500 mr-3 flex-shrink-0" />
                <span className="text-gray-300">(555) 123-4567</span>
              </div>
              <div className="flex items-center">
                <Mail className="h-5 w-5 text-amber-500 mr-3 flex-shrink-0" />
                <span className="text-gray-300">info@communitylibrary.org</span>
              </div>
            </div>
          </div>
    
        </div>
        
        {/* Divider */}
        <div className="border-t border-gray-800 my-8"></div>
        
        {/* Copyright */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} Community Library. All rights reserved.
          </p>
          <div className="flex items-center text-sm text-gray-400">
            <span>Made with</span>
            <Heart className="h-4 w-4 text-red-500 mx-1" />
            <span>for readers everywhere</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;