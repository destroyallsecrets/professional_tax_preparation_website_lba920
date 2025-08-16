import { Authenticated, Unauthenticated} from "convex/react";
import { api } from "../convex/_generated/api";
import { SignInForm } from "./SignInForm";
import { Toaster } from "sonner";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Navigation } from "./components/Navigation";
import Home from "./pages/Home";
import { About } from "./pages/About";
import { Services } from "./pages/Services";
import { ServiceDetail } from "./pages/ServiceDetail";
import { AdminDashboard } from "./pages/AdminDashboard";
import { UserDashboard } from "./pages/UserDashboard";
import { TaxTools } from "./pages/TaxTools";
import { Contact } from "./pages/Contact";
import { useEffect } from 'react';
import { useMutation } from 'convex/react';

export default function App() {
  const initializeServices = useMutation(api.sampleData.initializeSampleServices);
  const setSelfAsAdmin = useMutation(api.users.setSelfAsAdminIfNoAdminExists);
  
  useEffect(() => {
    const initialize = async () => {
      try {
        await setSelfAsAdmin();
        await initializeServices();
      } catch (error) {
        console.log("Initialization:", (error as Error).message);
      }
    };
    void initialize().catch(error => {
      console.error("Failed to initialize:", error);
    });
  }, [initializeServices, setSelfAsAdmin]);

  return (
    <Router>
      <div className="min-h-screen bg-black text-gold-light">
        <Navigation />
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/services/:serviceId" element={<ServiceDetail />} />
            <Route path="/tax-tools" element={<TaxTools />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/dashboard" element={
              <Authenticated>
                <UserDashboard />
              </Authenticated>
            } />
            <Route path="/admin" element={
              <Authenticated>
                <AdminDashboard />
              </Authenticated>
            } />
            <Route path="/login" element={
              <Unauthenticated>
                <div className="min-h-screen flex items-center justify-center p-4">
                  <div className="w-full max-w-md">
                    <div className="bg-black-light backdrop-blur-sm rounded-2xl shadow-xl border border-gold/20 p-8">
                      <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold text-gold mb-2">Welcome Back</h1>
                        <p className="text-gold-light">Sign in to access your Peayday account</p>
                      </div>
                      <SignInForm />
                    </div>
                  </div>
                </div>
              </Unauthenticated>
            } />
            <Route path="*" element={
              <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                  <div className="text-6xl mb-6">🔍</div>
                  <h2 className="text-3xl font-bold text-gold mb-4">Page Not Found</h2>
                  <p className="text-gold-light mb-8">The page you're looking for doesn't exist.</p>
                  <Link
                    to="/"
                    className="bg-gold text-black px-6 py-3 rounded-lg font-semibold hover:bg-gold-dark transition-colors"
                  >
                    Go Home
                  </Link>
                </div>
              </div>
            } />
          </Routes>
        </main>
        <Toaster position="top-right" />
      </div>
    </Router>
  );
}
