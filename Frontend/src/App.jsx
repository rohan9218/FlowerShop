
import { Route, Routes, useLocation } from "react-router-dom";

import Footer from "./components/Footer";
import Navbar from "./components/Navbar";

import Branches from "./pages/Admin/Branches";
import Dashboard from "./pages/Admin/Dashboard";
import Report from "./pages/Admin/Report";
import Staff from "./pages/Admin/Staff";
import AdminLogin from "./pages/AdminLogin";
import Home from "./pages/Home";

function App() {
    const location = useLocation();

    // Hide website Navbar and Footer on admin pages
    const isAdminPage = location.pathname.startsWith("/admin");

    return (
        <>
            {!isAdminPage && <Navbar />}

            <Routes>
                <Route path="/" element={<Home />} />

                {/* Admin Routes */}
                <Route path="/admin/login" element={<AdminLogin />} />
                <Route path="/admin/dashboard" element={<Dashboard />} />
                <Route path="/admin/reports" element={<Report />} />
                <Route path="/admin/staff" element={<Staff />} />
                <Route path="/admin/branches" element={<Branches />} />
            </Routes>

            {!isAdminPage && <Footer />}
        </>
    );
}

export default App;
