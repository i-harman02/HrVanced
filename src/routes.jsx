import { Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import Privacy from "./pages/Privacy";
import Mail from "./pages/Mail";
import Me from "./pages/Me";
import Message from "./pages/Message";
import Myfinances from "./pages/Myfinances";
import Myteam from "./pages/Myteam";
import Projects from "./pages/Projects";
import Resignation from "./pages/Resignation";

const Approutes = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<p>Loading...</p>}>
        <Routes>
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
          </Route>

          {/* 404 */}
          <Route path="*" element={<>Page Not Found</>} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default Approutes;
