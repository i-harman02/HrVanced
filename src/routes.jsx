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

// All Employees Sub-pages
import AttendanceOverview from "./pages/AllEmployees/Attendance-Overview";
import RolesDesignation from "./pages/AllEmployees/Roles&Designation";
import ShiftManagement from "./pages/AllEmployees/Shift-Management";
import Performance from "./pages/AllEmployees/Performance";
import AppraisalCycles from "./pages/AllEmployees/Appraisal-Cycles";
// import ReviewForms from "./pages/AllEmployees/Review-Forms";
import AllTeamLeaders from "./pages/AllEmployees/All-Team-Leaders";
import AllManagers from "./pages/AllEmployees/All-Managers";
import AllEmployee from "./pages/AllEmployees/All-Employee";
import AllClient from "./pages/AllEmployees/All-Client";
import EmployeeDetail from "./pages/AllEmployees/Employee-detail";

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
        </Route>

       
        <Route element={<ProtectedRoute />}>
          <Route element={<Layout />}>
            <Route path="/signup" element={<Signup />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/mail" element={<Mail />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/my-profile" element={<Me />} />
            <Route path="/my-finances" element={<Myfinances />} />
            <Route path="/my-team" element={<Myteam />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/resignation" element={<Resignation />} />
            <Route path="/message" element={<Message />} />
            <Route path="/me" element={<LeaveManagement />} />

            {/* All Employees Sub-routes */}
            <Route path="/all-employees/attendance" element={<AttendanceOverview />} />
            <Route path="/all-employees/roles" element={<RolesDesignation />} />
            <Route path="/all-employees/shift" element={<ShiftManagement />} />
            <Route path="/all-employees/performance" element={<Performance />} />
            <Route path="/all-employees/appraisal" element={<AppraisalCycles />} />
            {/* <Route path="/all-employees/review-forms" element={<ReviewForms />} /> */}
            <Route path="/all-employees/team-leaders" element={<AllTeamLeaders />} />
            <Route path="/all-employees/managers" element={<AllManagers />} />
            <Route path="/all-employees/list" element={<AllEmployee />} />
            <Route path="/all-employees/clients" element={<AllClient />} />
            <Route path="/all-employees/detail/:id" element={<EmployeeDetail />} />
          </Route>
        </Route>

       
        <Route path="*" element={<Navigate to="/login" replace />} />

      </Routes>
      
    </BrowserRouter>
  );
};

export default Approutes;
