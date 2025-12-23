import { Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
<<<<<<< Updated upstream
import Privacy from "./pages/Privacy";
import Mail from "./pages/Mail";
import Me from "./pages/Me";
import Message from "./pages/Message";
import Myfinances from "./pages/Myfinances";
import Myteam from "./pages/Myteam";
import Projects from "./pages/Projects";
import Resignation from "./pages/Resignation";
import LeaveManagement from "./pages/LeaveManagement"
=======
>>>>>>> Stashed changes
import Login from "./pages/Login";
import Protected from "./components/Protected";
import Layout from "./components/Layout"

const Approutes = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<p>Loading...</p>}>
        <Routes>
<<<<<<< Updated upstream
          {/* Layout Route */}
          <Route path="" element={<Layout />}>
            <Route path="/" element={<Dashboard />} />
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
=======
>>>>>>> Stashed changes

          {/* PUBLIC ROUTE */}
          <Route path="/login" element={<Login />} />

          {/* PROTECTED ROUTE */}
          <Route
            path="/dashboard"
            element={
              <Protected>
                <Layout />
              </Protected>
            }
          />

<<<<<<< Updated upstream
          
=======
          {/* DEFAULT */}
>>>>>>> Stashed changes
          <Route path="*" element={<Login />} />

        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default Approutes;
