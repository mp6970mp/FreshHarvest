import { Link } from "wouter";
import { Instagram, Facebook, Twitter, Youtube, CreditCard, Banknote } from "lucide-react";
import { storeInfo } from "@/lib/constants";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div>
            <h3 className="font-heading font-bold text-xl mb-4">Adams Shore Supermarket</h3>
            <p className="text-gray-400 mb-4">
              Your neighborhood grocery store providing fresh, quality products since 2002.
            </p>
            <div className="flex space-x-4">
              <a 
                href={storeInfo.social.instagram} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
              <a 
                href="#" 
                className="text-gray-400 hover:text-white transition"
                aria-label="Facebook"
              >
                <Facebook size={20} />
              </a>
              <a 
                href="#" 
                className="text-gray-400 hover:text-white transition"
                aria-label="Twitter"
              >
                <Twitter size={20} />
              </a>
              <a 
                href="#" 
                className="text-gray-400 hover:text-white transition"
                aria-label="YouTube"
              >
                <Youtube size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-heading font-bold text-xl mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-400 hover:text-white transition">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-400 hover:text-white transition">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-white transition">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-heading font-bold text-xl mb-4">Contact Us</h3>
            <ul className="space-y-2">
              <li className="flex items-start">
                <span className="mr-3">📍</span>
                <span className="text-gray-400">{storeInfo.address}</span>
              </li>
              <li className="flex items-start">
                <span className="mr-3">📞</span>
                <span className="text-gray-400">{storeInfo.phone}</span>
              </li>
              <li className="flex items-start">
                <span className="mr-3">✉️</span>
                <span className="text-gray-400">{storeInfo.email}</span>
              </li>
            </ul>
          </div>

          {/* Store Hours */}
          <div>
            <h3 className="font-heading font-bold text-xl mb-4">Store Hours</h3>
            <ul className="space-y-2">
              <li className="text-gray-400">Monday - Saturday: 7 AM – 10 PM</li>
              <li className="text-gray-400">Sunday: 8 AM – 10 PM</li>
            </ul>
            <div className="mt-4">
              <span className="block text-gray-400 mb-1">We Accept:</span>
              <div className="flex space-x-3">
                <CreditCard className="text-gray-200" size={24} />
                <Banknote className="text-gray-200" size={24} />
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              &copy; {new Date().getFullYear()} Adams Shore Supermarket. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-white text-sm transition">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-400 hover:text-white text-sm transition">
                Terms of Service
              </a>
              <a href="#" className="text-gray-400 hover:text-white text-sm transition">
                Accessibility
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
