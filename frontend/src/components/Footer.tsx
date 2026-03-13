import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-secondary text-white mt-16 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-5"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <img src="/NTNSP-logo.png" alt="NTNSP Logo" className="h-12 w-auto" />
              <div>
                <h3 className="text-xl font-bold">NTNSP</h3>
                <p className="text-sm text-gray-300">National Transmission Network Service Provider</p>
              </div>
            </div>
            <p className="text-gray-300 text-sm mb-4">
              Managing Sri Lanka's national grid and transmission infrastructure with reliability and excellence.
              Committed to ensuring stable power delivery across the nation.
            </p>
            <div className="flex flex-col space-y-2 text-sm text-gray-300">
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-accent" />
                <span>Colombo 02, Sri Lanka</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-accent" />
                <span>+94 11 245 6789</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-accent" />
                <span>info@ntnsp.lk</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4 text-accent">Quick Links</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>
                <Link to="/" className="hover:text-accent transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/news" className="hover:text-accent transition-colors">News</Link>
              </li>
              <li>
                <Link to="/calendar" className="hover:text-accent transition-colors">Calendar</Link>
              </li>
              <li>
                <Link to="/grid" className="hover:text-accent transition-colors">Grid Status</Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-semibold mb-4 text-accent">Resources</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>
                <a href="#" className="hover:text-accent transition-colors">Safety Protocols</a>
              </li>
              <li>
                <a href="#" className="hover:text-accent transition-colors">Training Portal</a>
              </li>
              <li>
                <a href="#" className="hover:text-accent transition-colors">Employee Services</a>
              </li>
              <li>
                <a href="#" className="hover:text-accent transition-colors">Technical Docs</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-600 mt-8 pt-8 text-center text-sm text-gray-400">
          <p>&copy; 2026 National Transmission Network Service Provider (Pvt) Ltd. All rights reserved.</p>
          <p className="mt-2">Internal Portal - For Authorized Personnel Only</p>
        </div>
      </div>
    </footer>
  );
}
