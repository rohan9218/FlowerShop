
import {
    ArrowRight,
    ArrowUpRight,
    CalendarDays,
    Eye,
    Flower2,
    IndianRupee,
    Package,
    Plus,
    ShoppingBag,
    TrendingUp,
    Users
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import Sidebar from "./Sidebar";

const statistics = [
    {
        title: "Total Revenue",
        value: "₹0",
        change: "No data yet",
        icon: IndianRupee,
        color: "bg-[#EAF3ED]",
        iconColor: "text-[#315C45]",
    },
    {
        title: "Total Orders",
        value: "0",
        change: "No data yet",
        icon: ShoppingBag,
        color: "bg-[#FCEEF1]",
        iconColor: "text-[#D77B91]",
    },
    {
        title: "Total Products",
        value: "0",
        change: "No data yet",
        icon: Package,
        color: "bg-[#F1EFFB]",
        iconColor: "text-[#8070B8]",
    },
    {
        title: "Total Customers",
        value: "0",
        change: "No data yet",
        icon: Users,
        color: "bg-[#FFF3E7]",
        iconColor: "text-[#D18A42]",
    },
];

const recentOrders = [];

export default function Dashboard() {
    const navigate = useNavigate();

    const adminUser = JSON.parse(
        sessionStorage.getItem("adminUser") || "{}"
    );

    const adminEmail = adminUser.email || "Administrator";

    const currentDate = new Date().toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "long",
        year: "numeric",
    });

    return (
        <div className="min-h-screen bg-[#FAF0F3] flex">

            {/* SIDEBAR */}
            <Sidebar />

            {/* MAIN CONTENT */}
            <main className="flex-1 min-w-0 min-h-screen pt-[68px] lg:pt-0">

                <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8">

                    {/* PAGE HEADER */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">

                        <div>
                            <div className="flex items-center gap-2 text-xs text-gray-400 mb-2">
                                <span>Admin</span>
                                <span>/</span>
                                <span className="text-[#315C45] font-medium">
                                    Dashboard
                                </span>
                            </div>

                            <h1 className="text-2xl sm:text-3xl font-bold text-[#315C45]">
                                Dashboard Overview
                            </h1>

                            <p className="text-sm text-gray-500 mt-2">
                                Welcome back, {adminEmail.split("@")[0]}! Here's what's happening with your store.
                            </p>
                        </div>

                        <div className="flex items-center gap-2 bg-white border border-gray-100 rounded-xl px-4 py-3 shadow-sm w-fit">
                            <CalendarDays size={18} className="text-[#D77B91]" />
                            <span className="text-sm font-medium text-gray-600">
                                {currentDate}
                            </span>
                        </div>

                    </div>

                    {/* WELCOME BANNER */}
                    <div className="relative overflow-hidden bg-[#315C45] rounded-2xl p-6 sm:p-8 mb-8 shadow-lg shadow-[#315C45]/10">

                        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">

                            <div className="max-w-xl">
                                <div className="flex items-center gap-2 mb-3">
                                    <Flower2 size={19} className="text-[#F5C5CE]" />

                                    <span className="text-xs font-semibold tracking-[2px] text-[#F5C5CE] uppercase">
                                        Bloom & Blossom Admin
                                    </span>
                                </div>

                                <h2 className="text-2xl sm:text-3xl font-bold text-white">
                                    Welcome to your store!
                                </h2>

                                <p className="text-sm text-white/70 mt-3 leading-relaxed">
                                    Manage your flowers, products, orders and customers from one convenient place.
                                </p>
                            </div>

                            <button
                                onClick={() => navigate("/admin/products")}
                                className="flex items-center justify-center gap-2 bg-white text-[#315C45] px-5 py-3 rounded-xl text-sm font-semibold hover:bg-[#FAF0F3] transition shrink-0"
                            >
                                <Plus size={18} />
                                Add New Product
                            </button>

                        </div>

                        {/* DECORATIVE CIRCLES */}
                        <div className="absolute -right-10 -top-20 w-64 h-64 rounded-full border-[35px] border-white/5" />
                        <div className="absolute right-40 -bottom-28 w-52 h-52 rounded-full border-[25px] border-white/5" />

                    </div>

                    {/* STATISTICS */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 lg:gap-5 mb-8">

                        {statistics.map((stat) => {
                            const Icon = stat.icon;

                            return (
                                <div
                                    key={stat.title}
                                    className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition"
                                >

                                    <div className="flex items-center justify-between mb-5">

                                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${stat.color}`}>
                                            <Icon size={22} className={stat.iconColor} />
                                        </div>

                                        <ArrowUpRight
                                            size={19}
                                            className="text-gray-300"
                                        />

                                    </div>

                                    <p className="text-sm text-gray-500 font-medium">
                                        {stat.title}
                                    </p>

                                    <div className="flex items-end justify-between gap-2 mt-2">
                                        <h3 className="text-2xl font-bold text-gray-800">
                                            {stat.value}
                                        </h3>

                                        <span className="text-xs text-gray-400">
                                            {stat.change}
                                        </span>
                                    </div>

                                </div>
                            );
                        })}

                    </div>

                    {/* MAIN GRID */}
                    <div className="grid grid-cols-1 xl:grid-cols-3 gap-5 mb-8">

                        {/* SALES OVERVIEW */}
                        <div className="xl:col-span-2 bg-white rounded-2xl p-5 sm:p-6 border border-gray-100 shadow-sm">

                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-7">

                                <div>
                                    <h3 className="text-lg font-bold text-gray-800">
                                        Sales Overview
                                    </h3>

                                    <p className="text-sm text-gray-400 mt-1">
                                        Your store revenue summary
                                    </p>
                                </div>

                                <span className="text-xs font-medium bg-[#EAF3ED] text-[#315C45] px-3 py-2 rounded-lg w-fit">
                                    All Time
                                </span>

                            </div>

                            <div className="h-[230px] flex flex-col items-center justify-center bg-[#FCFAFA] rounded-xl border border-dashed border-gray-200">

                                <div className="w-14 h-14 rounded-full bg-[#EAF3ED] flex items-center justify-center mb-4">
                                    <TrendingUp size={26} className="text-[#315C45]" />
                                </div>

                                <h4 className="text-base font-semibold text-gray-700">
                                    No sales data available
                                </h4>

                                <p className="text-sm text-gray-400 mt-2 text-center px-4">
                                    Sales information will appear here when customers place orders.
                                </p>

                            </div>

                        </div>

                        {/* QUICK ACTIONS */}
                        <div className="bg-white rounded-2xl p-5 sm:p-6 border border-gray-100 shadow-sm">

                            <h3 className="text-lg font-bold text-gray-800">
                                Quick Actions
                            </h3>

                            <p className="text-sm text-gray-400 mt-1 mb-6">
                                Manage your store easily
                            </p>

                            <div className="space-y-3">

                                <button
                                    onClick={() => navigate("/admin/products")}
                                    className="w-full flex items-center gap-3 p-3 rounded-xl border border-gray-100 hover:border-[#315C45]/30 hover:bg-[#F6FAF7] transition text-left"
                                >
                                    <div className="w-10 h-10 rounded-lg bg-[#EAF3ED] flex items-center justify-center">
                                        <Plus size={20} className="text-[#315C45]" />
                                    </div>

                                    <div className="flex-1">
                                        <p className="text-sm font-semibold text-gray-700">
                                            Add Product
                                        </p>
                                        <p className="text-xs text-gray-400 mt-1">
                                            Add a new flower product
                                        </p>
                                    </div>

                                    <ArrowRight size={17} className="text-gray-400" />
                                </button>

                                <button
                                    onClick={() => navigate("/admin/orders")}
                                    className="w-full flex items-center gap-3 p-3 rounded-xl border border-gray-100 hover:border-[#D77B91]/30 hover:bg-[#FFFAFB] transition text-left"
                                >
                                    <div className="w-10 h-10 rounded-lg bg-[#FCEEF1] flex items-center justify-center">
                                        <ShoppingBag size={20} className="text-[#D77B91]" />
                                    </div>

                                    <div className="flex-1">
                                        <p className="text-sm font-semibold text-gray-700">
                                            Manage Orders
                                        </p>
                                        <p className="text-xs text-gray-400 mt-1">
                                            View customer orders
                                        </p>
                                    </div>

                                    <ArrowRight size={17} className="text-gray-400" />
                                </button>

                                <button
                                    onClick={() => navigate("/admin/customers")}
                                    className="w-full flex items-center gap-3 p-3 rounded-xl border border-gray-100 hover:border-[#D77B91]/30 hover:bg-[#FFFAFB] transition text-left"
                                >
                                    <div className="w-10 h-10 rounded-lg bg-[#FFF3E7] flex items-center justify-center">
                                        <Users size={20} className="text-[#D18A42]" />
                                    </div>

                                    <div className="flex-1">
                                        <p className="text-sm font-semibold text-gray-700">
                                            Customers
                                        </p>
                                        <p className="text-xs text-gray-400 mt-1">
                                            View customer details
                                        </p>
                                    </div>

                                    <ArrowRight size={17} className="text-gray-400" />
                                </button>

                                <button
                                    onClick={() => navigate("/admin/reports")}
                                    className="w-full flex items-center gap-3 p-3 rounded-xl border border-gray-100 hover:border-[#315C45]/30 hover:bg-[#F6FAF7] transition text-left"
                                >
                                    <div className="w-10 h-10 rounded-lg bg-[#F1EFFB] flex items-center justify-center">
                                        <Eye size={20} className="text-[#8070B8]" />
                                    </div>

                                    <div className="flex-1">
                                        <p className="text-sm font-semibold text-gray-700">
                                            View Reports
                                        </p>
                                        <p className="text-xs text-gray-400 mt-1">
                                            Check store performance
                                        </p>
                                    </div>

                                    <ArrowRight size={17} className="text-gray-400" />
                                </button>

                            </div>

                        </div>

                    </div>

                    {/* RECENT ORDERS */}
                    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">

                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-5 sm:p-6 border-b border-gray-100">

                            <div>
                                <h3 className="text-lg font-bold text-gray-800">
                                    Recent Orders
                                </h3>

                                <p className="text-sm text-gray-400 mt-1">
                                    Latest customer orders
                                </p>
                            </div>

                            <button
                                onClick={() => navigate("/admin/orders")}
                                className="flex items-center gap-2 text-sm font-semibold text-[#315C45] hover:text-[#D77B91] transition"
                            >
                                View All Orders
                                <ArrowRight size={16} />
                            </button>

                        </div>

                        {recentOrders.length === 0 ? (
                            <div className="py-14 px-5 flex flex-col items-center text-center">

                                <div className="w-16 h-16 rounded-full bg-[#FAF0F3] flex items-center justify-center mb-4">
                                    <ShoppingBag size={26} className="text-[#D77B91]" />
                                </div>

                                <h4 className="text-base font-semibold text-gray-700">
                                    No orders yet
                                </h4>

                                <p className="text-sm text-gray-400 mt-2 max-w-sm">
                                    When customers place orders on your website, their latest orders will appear here.
                                </p>

                            </div>
                        ) : (
                            <div className="overflow-x-auto">
                                {/* Recent order rows will be populated from the backend API. */}
                            </div>
                        )}

                    </div>

                    {/* FOOTER */}
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-2 mt-8 pb-4 text-xs text-gray-400">

                        <p>
                            © {new Date().getFullYear()} Bloom & Blossom. All rights reserved.
                        </p>

                        <p className="flex items-center gap-1">
                            Made with
                            <span className="text-[#D77B91]">♥</span>
                            for beautiful moments.
                        </p>

                    </div>

                </div>

            </main>

        </div>
    );
}
