import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { Authenticated, Unauthenticated, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { SignOutButton } from "../SignOutButton";

interface NavItem {
  path: string;
  label: string;
  matchPaths?: string[];
}

interface NavLinkProps {
  to: string;
  isActive: boolean;
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

const NavLink = ({ to, isActive, children, onClick, className = "" }: NavLinkProps) => (
  <Link
    to={to}
    onClick={onClick}
    className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2 focus:ring-offset-black-light ${
      isActive
        ? "bg-gold text-black shadow-md"
        : "text-gold-light hover:text-gold hover:bg-black-light"
    } ${className}`}
  >
    {children}
  </Link>
);

const navigationItems: NavItem[] = [
  { path: "/", label: "Home" },
  { path: "/about", label: "About" },
  { path: "/services", label: "Services", matchPaths: ["/services/"] },
  { path: "/tax-tools", label: "Tax Tools" },
  { path: "/contact", label: "Contact" },
];

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const user = useQuery(api.users.getCurrentUser);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  const isActive = (path: string, matchPaths?: string[]) => {
    if (location.pathname === path) return true;
    if (matchPaths) {
      return matchPaths.some(matchPath => location.pathname.startsWith(matchPath));
    }
    return false;
  };

  // Close mobile menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  // Handle escape key and click outside
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(e.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener('keydown', handleEscape);
      document.addEventListener('mousedown', handleClickOutside);
      // Prevent body scroll when menu is open
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  return (
    <nav className="bg-black-light border-b border-gold-dark sticky top-0 z-50" role="navigation" aria-label="Main navigation">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link 
            to="/" 
            className="text-gold text-2xl font-bold hover:text-gold-dark transition-colors focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2 focus:ring-offset-black-light rounded-lg"
            aria-label="Peayday Taxes & Notary - Home"
          >
            <span className="sr-only">Peayday Taxes & Notary</span>
            Peayday Taxes & Notary
          </Link>
          <div className="space-x-4">
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navigationItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  isActive={isActive(item.path, item.matchPaths)}
                >
                  {item.label}
                </NavLink>
              ))}

              <Authenticated>
                <NavLink to="/dashboard" isActive={isActive("/dashboard")}>
                  Dashboard
                </NavLink>
                {user?.role === "admin" && (
                  <NavLink 
                    to="/admin" 
                    isActive={isActive("/admin")}
                    className="bg-gold-dark hover:bg-gold-dark"
                  >
                    Admin
                  </NavLink>
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
                type="button"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 rounded-lg text-gold hover:bg-black-light transition-colors focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2 focus:ring-offset-black-light"
                aria-expanded={isMenuOpen ? "true" : "false"}
                aria-controls="mobile-menu"
                aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
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
        <div 
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            isMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div 
            ref={mobileMenuRef}
            id="mobile-menu" 
            className="py-4 border-t border-gold-dark"
            role="navigation"
            aria-label="Mobile navigation"
          >
            <div className="flex flex-col space-y-2">
              {navigationItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  isActive={isActive(item.path, item.matchPaths)}
                  onClick={() => setIsMenuOpen(false)}
                  className="py-3"
                >
                  {item.label}
                </NavLink>
              ))}

              <Authenticated>
                <NavLink
                  to="/dashboard"
                  isActive={isActive("/dashboard")}
                  onClick={() => setIsMenuOpen(false)}
                  className="py-3"
                >
                  Dashboard
                </NavLink>
                {user?.role === "admin" && (
                  <NavLink
                    to="/admin"
                    isActive={isActive("/admin")}
                    onClick={() => setIsMenuOpen(false)}
                    className="py-3 bg-gold-dark hover:bg-gold-dark"
                  >
                    Admin
                  </NavLink>
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
                  className="mx-4 mt-4 bg-gold text-black px-6 py-3 rounded-lg font-medium text-center hover:bg-gold-dark transition-colors focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2 focus:ring-offset-black-light"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign In
                </Link>
              </Unauthenticated>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
