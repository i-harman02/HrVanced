import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Dashboard from "./pages/dashboard/Dashboard";
import Privacy from "./pages/privacy/Privacy";
import Mail from "./pages/mail/Mail";
import Me from "./pages/me/Me";
import Message from "./pages/message/Message";
import Myfinances from "./pages/myfinance/Myfinances";
import Myteam from "./pages/myteam/Myteam";
import Projects from "./pages/projects/Projects";
import Resignation from "./pages/resignation/Resignation";
import LeaveManagement from "./pages/leavemanagement/LeaveManagement";
import Login from "./pages/Login/Login";
import Signup from "./pages/signup/Signup";

import Layout from "./components/Layout";
import ProtectedRoute from "./components/Protected";
import PublicRoute from "./components/PublicRoute";

const Approutes = () => {
  return (
    <BrowserRouter>
      <Routes>

    
        <Route path="/" element={<Navigate to="/login" replace />} />

      
        <Route element={<PublicRoute />}>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Route>

       
        <Route element={<ProtectedRoute />}>
          <Route element={<Layout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/mail" element={<Mail />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/me" element={<Me />} />
            <Route path="/my-finances" element={<Myfinances />} />
            <Route path="/my-team" element={<Myteam />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/resignation" element={<Resignation />} />
            <Route path="/message" element={<Message />} />
            <Route path="/leave-management" element={<LeaveManagement />} />
          </Route>
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/login" replace />} />

      </Routes>
    </BrowserRouter>
  );
};

export default Approutes;
