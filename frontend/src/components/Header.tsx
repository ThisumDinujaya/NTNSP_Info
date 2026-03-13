import { Link } from 'react-router-dom';
import { Menu, X, Bell, Search } from 'lucide-react';
import { useState } from 'react';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-surface border-b border-border sticky top-0 z-50 shadow-sm backdrop-blur-sm bg-surface/95">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <img src="/NTNSP-logo.png" alt="NTNSP Logo" className="h-10 w-auto" />
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">NTNSP Info</h1>
              {/* <p className="text-xs text-gray-500">National Transmission Network</p> */}
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-secondary hover:text-primary transition-colors font-medium">
              Home
            </Link>
            <Link to="/news" className="text-secondary hover:text-primary transition-colors font-medium">
              News
            </Link>
            <Link to="/calendar" className="text-secondary hover:text-primary transition-colors font-medium">
              Calendar
            </Link>
            <Link to="/gallery" className="text-secondary hover:text-primary transition-colors font-medium">
              Gallery
            </Link>
            <Link to="/corporate" className="text-secondary hover:text-primary transition-colors font-medium">
              Corporate
            </Link>
            {/* <Link to="/grid" className="text-secondary hover:text-primary transition-colors font-medium">
              Grid Status
            </Link> */}
          </nav>

          {/* User Actions */}
          <div className="flex items-center space-x-4">
            <button className="p-2 hover:bg-muted rounded-lg transition-colors hidden md:block">
              <Search className="h-5 w-5 text-secondary" />
            </button>
            <button className="p-2 hover:bg-muted rounded-lg transition-colors relative hidden md:block">
              <Bell className="h-5 w-5 text-secondary" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-accent rounded-full"></span>
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 hover:bg-muted rounded-lg transition-colors"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <nav className="flex flex-col space-y-2">
              <Link
                to="/"
                className="px-4 py-2 hover:bg-muted rounded-lg transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/news"
                className="px-4 py-2 hover:bg-muted rounded-lg transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                News
              </Link>
              <Link
                to="/calendar"
                className="px-4 py-2 hover:bg-muted rounded-lg transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Calendar
              </Link>
              <Link
                to="/gallery"
                className="px-4 py-2 hover:bg-muted rounded-lg transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Gallery
              </Link>
              <Link
                to="/corporate"
                className="px-4 py-2 hover:bg-muted rounded-lg transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Corporate
              </Link>
              {/* <Link
                to="/grid"
                className="px-4 py-2 hover:bg-muted rounded-lg transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Grid Status
              </Link> */}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
