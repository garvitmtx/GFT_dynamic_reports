import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Overview from "../Sections/overview";
import SignIn from "../Sections/SignIn";
import ProtectedRoute from "../Sections/components/ProtectedRoute";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Navigate to="/signin" />} />

        <Route path="/signin" element={<SignIn />} />

        <Route
          path="/overview"
          element={
            <ProtectedRoute>
              <Overview />
            </ProtectedRoute>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}







// import { BrowserRouter, Routes, Route } from "react-router-dom";
// // import Layout from "../components/Layout/layout";
// import Overview from "../Sections/overview";
// import SignIn from "../Sections/SignIn"

// export default function AppRouter() {
//   return (
//     <BrowserRouter>
//       <Overview>
//         <Routes>
// 		  <Route path="/signin" element={<SignIn />} />
//           <Route path="/overview" element={<Overview />} />
//         </Routes>
//       </Overview>
//     </BrowserRouter>
//   );
// }
