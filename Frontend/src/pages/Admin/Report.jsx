
import {
    ArrowRight,
    ArrowUpRight,
    BarChart3,
    CalendarCheck,
    CalendarDays,
    ChartNoAxesColumn,
    CreditCard,
    FileBarChart,
    GitBranch,
    Package,
    ReceiptText,
    UserRound,
    Wallet
} from "lucide-react";

import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";

const reports = [
    {
        id: 1,
        title: "Daily Sales Report",
        description: "View daily sales, total orders and daily revenue.",
        details: "Monitor your store's sales and order performance day by day.",
        icon: CalendarCheck,
        color: "bg-[#EAF3ED]",
        iconColor: "text-[#315C45]",
        path: "/admin/reports/daily-sales",
    },
    {
        id: 2,
        title: "Monthly Sales Report",
        description: "View monthly sales performance and revenue.",
        details: "Analyze monthly revenue and compare sales performance across months.",
        icon: ChartNoAxesColumn,
        color: "bg-[#FCEEF1]",
        iconColor: "text-[#D77B91]",
        path: "/admin/reports/monthly-sales",
    },
    {
        id: 3,
        title: "Product-wise Report",
        description: "Identify sales of individual products.",
        details: "Review product-wise quantities sold and sales performance.",
        icon: Package,
        color: "bg-[#F1EFFB]",
        iconColor: "text-[#8070B8]",
        path: "/admin/reports/product-wise",
    },
    {
        id: 4,
        title: "Pending Payments",
        description: "Track unpaid customer payments.",
        details: "Monitor pending balances, overdue payments and outstanding amounts.",
        icon: CreditCard,
        color: "bg-[#FFF3E7]",
        iconColor: "text-[#D18A42]",
        path: "/admin/reports/pending-payments",
    },
    {
        id: 5,
        title: "Staff Payments",
        description: "Track staff salary and payment records.",
        details: "View staff salary details, payment dates and payment history.",
        icon: Wallet,
        color: "bg-[#EAF3ED]",
        iconColor: "text-[#315C45]",
        path: "/admin/reports/staff-payments",
    },
    {
        id: 6,
        title: "Branch Report",
        description: "View individual branch performance.",
        details: "Compare sales and business performance across branches.",
        icon: GitBranch,
        color: "bg-[#FCEEF1]",
        iconColor: "text-[#D77B91]",
        path: "/admin/reports/branches",
    },
    {
        id: 7,
        title: "Staff Report",
        description: "View staff-related information.",
        details: "Review staff details and related business records.",
        icon: UserRound,
        color: "bg-[#F1EFFB]",
        iconColor: "text-[#8070B8]",
        path: "/admin/reports/staff",
    },
    {
        id: 8,
        title: "Customer Report",
        description: "View customer details and activity.",
        details: "Review customer information, order history and customer activity.",
        icon: ReceiptText,
        color: "bg-[#FFF3E7]",
        iconColor: "text-[#D18A42]",
        path: "/admin/reports/customers",
    },
];

export default function Report() {
    const navigate = useNavigate();

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
                                <button
                                    onClick={() => navigate("/admin/dashboard")}
                                    className="hover:text-[#315C45] transition"
                                >
                                    Admin
                                </button>

                                <span>/</span>

                                <span className="text-[#315C45] font-medium">
                                    Reports
                                </span>
                            </div>

                            <h1 className="text-2xl sm:text-3xl font-bold text-[#315C45]">
                                Reports & Analytics
                            </h1>

                            <p className="text-sm text-gray-500 mt-2">
                                View and manage your store's business reports in one place.
                            </p>

                        </div>

                        <div className="flex items-center gap-2 bg-white border border-gray-100 rounded-xl px-4 py-3 shadow-sm w-fit">
                            <CalendarDays
                                size={18}
                                className="text-[#D77B91]"
                            />

                            <span className="text-sm font-medium text-gray-600">
                                {currentDate}
                            </span>
                        </div>

                    </div>

                    {/* REPORT SUMMARY BANNER */}
                    <div className="relative overflow-hidden bg-[#315C45] rounded-2xl p-6 sm:p-8 mb-8 shadow-lg shadow-[#315C45]/10">

                        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">

                            <div className="max-w-xl">

                                <div className="flex items-center gap-2 mb-3">
                                    <FileBarChart
                                        size={19}
                                        className="text-[#F5C5CE]"
                                    />

                                    <span className="text-xs font-semibold tracking-[2px] text-[#F5C5CE] uppercase">
                                        Business Insights
                                    </span>
                                </div>

                                <h2 className="text-2xl sm:text-3xl font-bold text-white">
                                    Reports Overview
                                </h2>

                                <p className="text-sm text-white/70 mt-3 leading-relaxed">
                                    Access daily sales, monthly performance, payments, staff, branch and customer reports.
                                </p>

                            </div>

                            <div className="flex items-center gap-3 bg-white/10 border border-white/10 rounded-xl p-4 shrink-0">

                                <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center">
                                    <BarChart3
                                        size={25}
                                        className="text-white"
                                    />
                                </div>

                                <div>
                                    <p className="text-2xl font-bold text-white">
                                        08
                                    </p>

                                    <p className="text-xs text-white/70">
                                        Available Reports
                                    </p>
                                </div>

                            </div>

                        </div>

                        {/* DECORATIVE CIRCLES */}
                        <div className="absolute -right-10 -top-20 w-64 h-64 rounded-full border-[35px] border-white/5" />

                        <div className="absolute right-40 -bottom-28 w-52 h-52 rounded-full border-[25px] border-white/5" />

                    </div>

                    {/* REPORT SECTION HEADER */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-5">

                        <div>
                            <h3 className="text-lg font-bold text-gray-800">
                                All Reports
                            </h3>

                            <p className="text-sm text-gray-500 mt-1">
                                Select a report to view its details.
                            </p>
                        </div>

                        <span className="text-xs font-semibold text-[#315C45] bg-[#EAF3ED] px-3 py-2 rounded-lg w-fit">
                            {reports.length} Reports
                        </span>

                    </div>

                    {/* REPORT CARDS */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">

                        {reports.map((report) => {
                            const Icon = report.icon;

                            return (
                                <div
                                    key={report.id}
                                    className="group bg-white rounded-2xl border border-gray-100 p-5 shadow-sm hover:shadow-md hover:border-[#315C45]/20 transition-all duration-300"
                                >

                                    {/* ICON AND ARROW */}
                                    <div className="flex items-center justify-between mb-5">

                                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${report.color}`}>
                                            <Icon
                                                size={22}
                                                className={report.iconColor}
                                            />
                                        </div>

                                        <ArrowUpRight
                                            size={19}
                                            className="text-gray-300 group-hover:text-[#315C45] transition"
                                        />

                                    </div>

                                    {/* REPORT INFORMATION */}
                                    <h4 className="text-[15px] font-bold text-gray-800 group-hover:text-[#315C45] transition">
                                        {report.title}
                                    </h4>

                                    <p className="text-xs text-gray-500 leading-relaxed mt-2 min-h-[36px]">
                                        {report.description}
                                    </p>

                                    <p className="text-xs text-gray-400 leading-relaxed mt-3 min-h-[36px]">
                                        {report.details}
                                    </p>

                                    {/* VIEW REPORT BUTTON */}
                                    <button
                                        type="button"
                                        onClick={() => navigate(report.path)}
                                        className="w-full flex items-center justify-between border-t border-gray-100 mt-5 pt-4 text-sm font-semibold text-[#315C45] hover:text-[#D77B91] transition"
                                    >
                                        <span>View Report</span>

                                        <ArrowRight
                                            size={17}
                                            className="group-hover:translate-x-1 transition-transform"
                                        />
                                    </button>

                                </div>
                            );
                        })}

                    </div>

                    {/* INFORMATION */}
                    <div className="mt-8 bg-white rounded-2xl border border-gray-100 p-5 sm:p-6">

                        <div className="flex items-start gap-3">

                            <div className="w-10 h-10 rounded-xl bg-[#FCEEF1] flex items-center justify-center shrink-0">
                                <CalendarDays
                                    size={20}
                                    className="text-[#D77B91]"
                                />
                            </div>

                            <div>
                                <h4 className="text-sm font-bold text-gray-800">
                                    Report Information
                                </h4>

                                <p className="text-xs text-gray-500 leading-relaxed mt-2">
                                    Reports will display information based on your store's orders, payments, products, staff and customer records. Date-range and branch-wise filters can be added to the individual report pages.
                                </p>
                            </div>

                        </div>

                    </div>

                    {/* PAGE FOOTER */}
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
