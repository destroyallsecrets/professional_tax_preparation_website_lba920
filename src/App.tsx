import { Authenticated, Unauthenticated, useQuery } from "convex/react";
import { api } from "../convex/_generated/api";
import { SignInForm } from "./SignInForm";
 import { SignOutButton } from "./SignOutButton";
import { Toaster } from "sonner";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navigation } from "./components/Navigation";
import { Home } from "./pages/Home";
import { About } from "./pages/About";
import { Services } from "./pages/Services";
import { ServiceDetail } from "./pages/ServiceDetail";
import { AdminDashboard } from "./pages/AdminDashboard";
import { UserDashboard } from "./pages/UserDashboard";
import { TaxTools } from "./pages/TaxTools";
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
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        <Navigation />
        <main className="pt-20">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/services/:serviceId" element={<ServiceDetail />} />
            <Route path="/tax-tools" element={<TaxTools />} />
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
                    <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8">
                      <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold text-slate-800 mb-2">Welcome Back</h1>
                        <p className="text-slate-600">Sign in to access your tax documents</p>
                      </div>
                      <SignInForm />
                    </div>
                  </div>
                </div>
              </Unauthenticated>
            } />
          </Routes>
        </main>
        <Toaster position="top-right" />
      </div>
    </Router>
  );
}
