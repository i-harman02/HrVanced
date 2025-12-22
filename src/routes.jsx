// import React, { Suspense } from "react";
// import { BrowserRouter, Route, Routes } from "react-router-dom";
// import Dashboard from "./pages/Dashboard";
// import Privacy from "./pages/Privacy";
// import Mail from "./pages/Mail";
// import Me from "./pages/Me";
// import Message from "./pages/Message";
// import Myfinances from "./pages/Myfinances";
// import Myteam from "./pages/Myteam";
// import Projects from "./pages/Projects";
// import Resignation from "./pages/Resignation";

// const Approutes = () => {
//   const routesList = [
//     {
//       path: "*",
//       element: <>page not found</>,
//     },
//     {
//       path: "/",
//       element: <Dashboard />,
//     },
//     {
//       path: "/mail",
//       element: <Mail />,
//     },
//     {
//       path: "/privacy",
//       element: <Privacy />,
//       // children: [
//       //   {
//       //     path: "dashboard",
//       //     element: <Dashboard />,
//       //   },
//       // ],
//     },
//     {
//       path: "/me",
//       element: <Me />,
//     },
//     {
//       path: "/message",
//       element: <Message />,
//     },
//      {
//       path: "/myfinaces",
//       element: <Myfinances/>,
//     },
//      {
//       path: "/myteam",
//       element: <Myteam/>,
//     },
//      {
//       path: "/projects",
//       element: <Projects/>,
//     },
//      {
//       path: "/resignation",
//       element: <Resignation/>,
//     },
//   ];

//   return (
//     <Suspense fallback={<p> loading ...</p>}>
//       <Suspense fallback={<p> loading ...</p>}>
//         <BrowserRouter>
//           <Routes>
//             {routesList.map(({ path, element, children }) => (
//               <Route key={path} path={path} element={element}>
//                 {children?.map(({ path, element }) => (
//                   <Route key={path} path={path} element={element} />
//                 ))}
//               </Route>
//             ))}
//           </Routes>
//         </BrowserRouter>
//       </Suspense>
//     </Suspense>
//   );
// };

// export default Approutes;


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
          <Route path="/" element={<Layout />}>
            <Route index element={<Dashboard />} />
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
