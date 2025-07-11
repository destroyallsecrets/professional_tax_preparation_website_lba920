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
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-white/20 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
              <span className="text-white font-bold text-lg">T</span>
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              TaxPro Solutions
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                isActive("/")
                  ? "bg-blue-100 text-blue-700 shadow-md"
                  : "text-slate-700 hover:text-blue-600 hover:bg-blue-50"
              }`}
            >
              Home
            </Link>
            <Link
              to="/about"
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                isActive("/about")
                  ? "bg-blue-100 text-blue-700 shadow-md"
                  : "text-slate-700 hover:text-blue-600 hover:bg-blue-50"
              }`}
            >
              About
            </Link>
            <Link
              to="/services"
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                isActive("/services") || location.pathname.startsWith("/services/")
                  ? "bg-blue-100 text-blue-700 shadow-md"
                  : "text-slate-700 hover:text-blue-600 hover:bg-blue-50"
              }`}
            >
              Services
            </Link>
            <Link
              to="/tax-tools"
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                isActive("/tax-tools")
                  ? "bg-blue-100 text-blue-700 shadow-md"
                  : "text-slate-700 hover:text-blue-600 hover:bg-blue-50"
              }`}
            >
              Tax Tools
            </Link>

            <Authenticated>
              <Link
                to="/dashboard"
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                  isActive("/dashboard")
                    ? "bg-blue-100 text-blue-700 shadow-md"
                    : "text-slate-700 hover:text-blue-600 hover:bg-blue-50"
                }`}
              >
                Dashboard
              </Link>
              {user?.role === "admin" && (
                <Link
                  to="/admin"
                  className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                    isActive("/admin")
                      ? "bg-red-100 text-red-700 shadow-md"
                      : "text-slate-700 hover:text-red-600 hover:bg-red-50"
                  }`}
                >
                  Admin
                </Link>
              )}
              <div className="flex items-center space-x-4">
                <span className="text-sm text-slate-600">
                  Welcome, {user?.name || "User"}
                </span>
                <SignOutButton />
              </div>
            </Authenticated>

            <Unauthenticated>
              <Link
                to="/login"
                className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-2 rounded-lg font-medium hover:from-blue-700 hover:to-indigo-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Sign In
              </Link>
            </Unauthenticated>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-lg text-slate-700 hover:bg-slate-100 transition-colors"
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

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-slate-200">
            <div className="flex flex-col space-y-2">
              <Link
                to="/"
                className={`px-4 py-3 rounded-lg font-medium transition-all duration-300 ${
                  isActive("/") ? "bg-blue-100 text-blue-700" : "text-slate-700 hover:bg-slate-100"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/about"
                className={`px-4 py-3 rounded-lg font-medium transition-all duration-300 ${
                  isActive("/about") ? "bg-blue-100 text-blue-700" : "text-slate-700 hover:bg-slate-100"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              <Link
                to="/services"
                className={`px-4 py-3 rounded-lg font-medium transition-all duration-300 ${
                  isActive("/services") ? "bg-blue-100 text-blue-700" : "text-slate-700 hover:bg-slate-100"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Services
              </Link>
              <Link
                to="/tax-tools"
                className={`px-4 py-3 rounded-lg font-medium transition-all duration-300 ${
                  isActive("/tax-tools") ? "bg-blue-100 text-blue-700" : "text-slate-700 hover:bg-slate-100"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Tax Tools
              </Link>

              <Authenticated>
                <Link
                  to="/dashboard"
                  className={`px-4 py-3 rounded-lg font-medium transition-all duration-300 ${
                    isActive("/dashboard") ? "bg-blue-100 text-blue-700" : "text-slate-700 hover:bg-slate-100"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Dashboard
                </Link>
                {user?.role === "admin" && (
                  <Link
                    to="/admin"
                    className={`px-4 py-3 rounded-lg font-medium transition-all duration-300 ${
                      isActive("/admin") ? "bg-red-100 text-red-700" : "text-slate-700 hover:bg-slate-100"
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Admin
                  </Link>
                )}
                <div className="px-4 py-3 border-t border-slate-200 mt-2">
                  <p className="text-sm text-slate-600 mb-3">
                    Welcome, {user?.name || "User"}
                  </p>
                  <SignOutButton />
                </div>
              </Authenticated>

              <Unauthenticated>
                <Link
                  to="/login"
                  className="mx-4 mt-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-lg font-medium text-center"
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
