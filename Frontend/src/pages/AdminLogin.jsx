
import { Eye, EyeOff, Flower2 } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminLogin() {
    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (loading) return;

        setLoading(true);
        setError("");

        try {
            const apiUrl = (
                import.meta.env.VITE_API_URL ||
                import.meta.env.VITE_BASE_URL ||
                ""
            ).replace(/\/+$/, "");

            const response = await fetch(
                `${apiUrl}/api/admin/login`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        email: email.trim(),
                        password,
                    }),
                }
            );

            const data = await response.json();

            if (!response.ok || !data.success) {
                throw new Error(
                    data.message || "Invalid email or password."
                );
            }

            if (!data.token) {
                throw new Error("Authentication token not received.");
            }

            sessionStorage.setItem("adminToken", data.token);
            sessionStorage.setItem(
                "adminUser",
                JSON.stringify(data.admin)
            );

            navigate("/admin/dashboard", { replace: true });

        } catch (error) {
            setError(
                error.message === "Failed to fetch"
                    ? "Unable to connect to the server. Please try again."
                    : error.message || "Something went wrong."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#FAF0F3] px-4">

            <div className="w-full max-w-md bg-white p-8 sm:p-10 rounded-2xl shadow-xl">

                {/* LOGO */}
                <div className="text-center mb-8">

                    <div className="w-16 h-16 mx-auto bg-[#315C45] rounded-full flex items-center justify-center mb-4">
                        <Flower2 size={32} className="text-white" />
                    </div>

                    <h1 className="text-2xl font-serif font-bold text-[#315C45]">
                        Bloom & Blossom
                    </h1>

                    <p className="text-xs tracking-[3px] text-[#D77B91] mt-1">
                        ADMIN PORTAL
                    </p>

                </div>

                {/* HEADING */}
                <div className="mb-7">
                    <h2 className="text-2xl font-semibold text-gray-800">
                        Admin Login
                    </h2>

                    <p className="text-sm text-gray-500 mt-2">
                        Enter your credentials to access your dashboard.
                    </p>
                </div>

                {/* LOGIN FORM */}
                <form onSubmit={handleSubmit} className="space-y-5">

                    {/* EMAIL */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Email Address
                        </label>

                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                            autoComplete="username"
                            required
                            disabled={loading}
                            className="w-full px-4 py-3 border border-gray-200 rounded-lg outline-none focus:border-[#D77B91] focus:ring-2 focus:ring-[#D77B91]/10 transition disabled:bg-gray-50"
                        />
                    </div>

                    {/* PASSWORD */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Password
                        </label>

                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter your password"
                                autoComplete="current-password"
                                required
                                disabled={loading}
                                className="w-full px-4 py-3 pr-12 border border-gray-200 rounded-lg outline-none focus:border-[#D77B91] focus:ring-2 focus:ring-[#D77B91]/10 transition disabled:bg-gray-50"
                            />

                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#D77B91]"
                                aria-label={showPassword ? "Hide password" : "Show password"}
                                disabled={loading}
                            >
                                {showPassword
                                    ? <EyeOff size={19} />
                                    : <Eye size={19} />
                                }
                            </button>
                        </div>
                    </div>

                    {/* ERROR MESSAGE */}
                    {error && (
                        <div
                            role="alert"
                            className="p-3 rounded-lg bg-red-50 border border-red-100 text-red-600 text-sm"
                        >
                            {error}
                        </div>
                    )}

                    {/* LOGIN BUTTON */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3 bg-[#315C45] text-white font-semibold rounded-lg hover:bg-[#09472c] transition duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                        {loading ? "Signing in..." : "Login to Dashboard"}
                    </button>

                </form>

                {/* BACK TO HOME */}
                <div className="text-center mt-7">
                    <button
                        type="button"
                        onClick={() => navigate("/")}
                        className="text-sm text-gray-500 hover:text-[#D77B91] transition"
                    >
                        ← Back to Home
                    </button>
                </div>

            </div>
        </div>
    );
}
