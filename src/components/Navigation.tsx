import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Authenticated, Unauthenticated, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { SignOutButton } from "../SignOutButton";

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const user = useQuery(api.users.getCurrentUser);

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-black-light border-b border-gold-dark">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link to="/" className="text-gold text-2xl font-bold">
            Tax Pro Services
          </Link>
          <div className="space-x-4">
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <Link
                to="/"
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                  isActive("/")
                    ? "bg-gold text-black shadow-md"
                    : "text-gold-light hover:text-gold hover:bg-black-light"
                }`}
              >
                Home
              </Link>
              <Link
                to="/about"
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                  isActive("/about")
                    ? "bg-gold text-black shadow-md"
                    : "text-gold-light hover:text-gold hover:bg-black-light"
                }`}
              >
                About
              </Link>
              <Link
                to="/services"
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                  isActive("/services") || location.pathname.startsWith("/services/")
                    ? "bg-gold text-black shadow-md"
                    : "text-gold-light hover:text-gold hover:bg-black-light"
                }`}
              >
                Services
              </Link>
              <Link
                to="/tax-tools"
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                  isActive("/tax-tools")
                    ? "bg-gold text-black shadow-md"
                    : "text-gold-light hover:text-gold hover:bg-black-light"
                }`}
              >
                Tax Tools
              </Link>

              <Authenticated>
                <Link
                  to="/dashboard"
                  className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                    isActive("/dashboard")
                      ? "bg-gold text-black shadow-md"
                      : "text-gold-light hover:text-gold hover:bg-black-light"
                  }`}
                >
                  Dashboard
                </Link>
                {user?.role === "admin" && (
                  <Link
                    to="/admin"
                    className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                      isActive("/admin")
                        ? "bg-gold-dark text-black shadow-md"
                        : "text-gold-light hover:text-gold hover:bg-black-light"
                    }`}
                  >
                    Admin
                  </Link>
                )}
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-gold-light">
                    Welcome, {user?.name || "User"}
                  </span>
                  <SignOutButton />
                </div>
              </Authenticated>

              <Unauthenticated>
                <Link
                  to="/login"
                  className="bg-gold text-black px-6 py-2 rounded-lg font-medium hover:bg-gold-dark transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  Sign In
                </Link>
              </Unauthenticated>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 rounded-lg text-gold hover:bg-black-light transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {isMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gold-dark">
            <div className="flex flex-col space-y-2">
              <Link
                to="/"
                className={`px-4 py-3 rounded-lg font-medium transition-all duration-300 ${
                  isActive("/") ? "bg-gold text-black" : "text-gold-light hover:bg-black-light"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/about"
                className={`px-4 py-3 rounded-lg font-medium transition-all duration-300 ${
                  isActive("/about") ? "bg-gold text-black" : "text-gold-light hover:bg-black-light"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              <Link
                to="/services"
                className={`px-4 py-3 rounded-lg font-medium transition-all duration-300 ${
                  isActive("/services") ? "bg-gold text-black" : "text-gold-light hover:bg-black-light"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Services
              </Link>
              <Link
                to="/tax-tools"
                className={`px-4 py-3 rounded-lg font-medium transition-all duration-300 ${
                  isActive("/tax-tools") ? "bg-gold text-black" : "text-gold-light hover:bg-black-light"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Tax Tools
              </Link>

              <Authenticated>
                <Link
                  to="/dashboard"
                  className={`px-4 py-3 rounded-lg font-medium transition-all duration-300 ${
                    isActive("/dashboard") ? "bg-gold text-black" : "text-gold-light hover:bg-black-light"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Dashboard
                </Link>
                {user?.role === "admin" && (
                  <Link
                    to="/admin"
                    className={`px-4 py-3 rounded-lg font-medium transition-all duration-300 ${
                      isActive("/admin") ? "bg-gold-dark text-black" : "text-gold-light hover:bg-black-light"
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Admin
                  </Link>
                )}
                <div className="px-4 py-3 border-t border-gold-dark mt-2">
                  <p className="text-sm text-gold-light mb-3">
                    Welcome, {user?.name || "User"}
                  </p>
                  <SignOutButton />
                </div>
              </Authenticated>

              <Unauthenticated>
                <Link
                  to="/login"
                  className="mx-4 mt-4 bg-gold text-black px-6 py-3 rounded-lg font-medium text-center hover:bg-gold-dark"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign In
                </Link>
              </Unauthenticated>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
