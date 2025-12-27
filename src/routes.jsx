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
import Protected from "./components/Protected";
import Layout from "./components/Layout";

const Approutes = () => {
  const isLoggedIn = localStorage.getItem("token");
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />

        <Route
          path="/login"
          element={
            isLoggedIn ? <Navigate to="/dashboard" replace /> : <Login />
          }
        />

        <Route element={<Layout />}>
          <Route
            path="/dashboard"
            element={
              <Protected>
                <Dashboard />
              </Protected>
            }
          />

          <Route
            path="/mail"
            element={
              <Protected>
                <Mail />
              </Protected>
            }
          />

          <Route
            path="/privacy"
            element={
              <Protected>
                <Privacy />
              </Protected>
            }
          />

          <Route
            path="/me"
            element={
              <Protected>
                <Me />
              </Protected>
            }
          />

          <Route
            path="/my-finances"
            element={
              <Protected>
                <Myfinances />
              </Protected>
            }
          />

          <Route
            path="/my-team"
            element={
              <Protected>
                <Myteam />
              </Protected>
            }
          />

          <Route
            path="/projects"
            element={
              <Protected>
                <Projects />
              </Protected>
            }
          />

          <Route
            path="/resignation"
            element={
              <Protected>
                <Resignation />
              </Protected>
            }
          />

          <Route
            path="/message"
            element={
              <Protected>
                <Message />
              </Protected>
            }
          />

          <Route
            path="/leave-management"
            element={
              <Protected>
                <LeaveManagement />
              </Protected>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Approutes;