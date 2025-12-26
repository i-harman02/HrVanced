import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Privacy from "./pages/Privacy";
import Mail from "./pages/Mail";
import Me from "./pages/Me";
import Message from "./pages/Message";
import Myfinances from "./pages/Myfinances";
import Myteam from "./pages/Myteam";
import Projects from "./pages/Projects";
import Resignation from "./pages/Resignation";
import LeaveManagement from "./pages/LeaveManagement";
import Login from "./pages/Login";
import Protected from "./components/Protected";
import Layout from "./components/Layout";

const Approutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />

        <Route path="/login" element={<Login />} />

        <Route element={<Protected />}>
          <Route element={<Layout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/mail" element={<Mail />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/me" element={<Me />} />
            <Route path="/message" element={<Message />} />
            <Route path="/myfinaces" element={<Myfinances />} />
            <Route path="/myteam" element={<Myteam />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/resignation" element={<Resignation />} />
            <Route path="/leave-management" element={<LeaveManagement />} />
          </Route>
        </Route>

      </Routes>
    </BrowserRouter>
  );
};

export default Approutes;
