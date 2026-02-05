import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Layout from "../components/Layout/layout";
import Overview from "../Sections/overview";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Overview>
        <Routes>
          <Route path="/" element={<Overview />} />
        </Routes>
      </Overview>
    </BrowserRouter>
  );
}
