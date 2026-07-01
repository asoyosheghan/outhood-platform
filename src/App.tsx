import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/lib/AuthContext";
import MainLayout from "@/components/layout/MainLayout";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { ProtectedRoute, AdminRoute } from "@/components/layout/ProtectedRoute";

import Home from "@/pages/Home";
import About from "@/pages/About";
import Services from "@/pages/Services";
import Portfolio from "@/pages/Portfolio";
import Blog from "@/pages/Blog";
import BlogPost from "@/pages/BlogPost";
import Resources from "@/pages/Resources";
import Community from "@/pages/Community";
import Contact from "@/pages/Contact";
import Faq from "@/pages/Faq";
import Privacy from "@/pages/Privacy";
import Terms from "@/pages/Terms";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import ForgotPassword from "@/pages/ForgotPassword";
import NotFound from "@/pages/NotFound";

import DashboardHome from "@/pages/dashboard/DashboardHome";
import DashboardEvents from "@/pages/dashboard/DashboardEvents";
import DashboardDonations from "@/pages/dashboard/DashboardDonations";
import DashboardProfile from "@/pages/dashboard/DashboardProfile";
import AdminDashboard from "@/pages/dashboard/AdminDashboard";

export default function App() {
  return (
    <AuthProvider>
      <Routes>
        {/* Public site */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/community" element={<Community />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="*" element={<NotFound />} />
        </Route>

        {/* Auth (no header/footer chrome) */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/* Member dashboard (protected) */}
        <Route element={<ProtectedRoute />}>
          <Route element={<DashboardLayout />}>
            <Route path="/dashboard" element={<DashboardHome />} />
            <Route path="/dashboard/events" element={<DashboardEvents />} />
            <Route path="/dashboard/donations" element={<DashboardDonations />} />
            <Route path="/dashboard/profile" element={<DashboardProfile />} />
          </Route>
        </Route>

        {/* Admin panel (protected + role-gated) */}
        <Route element={<AdminRoute />}>
          <Route element={<DashboardLayout />}>
            <Route path="/admin" element={<AdminDashboard />} />
          </Route>
        </Route>
      </Routes>
    </AuthProvider>
  );
}
