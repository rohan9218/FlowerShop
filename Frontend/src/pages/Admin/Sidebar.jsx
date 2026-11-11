
import {
    BarChart3,
    ChevronRight,
    ClipboardList,
    Flower2,
    LayoutDashboard,
    LogOut,
    Menu,
    Package,
    PanelLeftClose,
    PanelLeftOpen,
    Settings,
    ShoppingBag,
    Store,
    Tags,
    UserPlus,
    Users,
    X,
} from "lucide-react";

import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

const navigationItems = [
    {
        title: "OVERVIEW",
        items: [
            {
                name: "Dashboard",
                path: "/admin/dashboard",
                icon: LayoutDashboard,
            },
        ],
    },
    {
        title: "STORE MANAGEMENT",
        items: [
            {
                name: "Products",
                path: "/admin/products",
                icon: Package,
            },
            {
                name: "Categories",
                path: "/admin/categories",
                icon: Tags,
            },
            {
                name: "Orders",
                path: "/admin/orders",
                icon: ShoppingBag,
            },
            {
                name: "Customers",
                path: "/admin/customers",
                icon: Users,
            },
        ],
    },
    {
        title: "BUSINESS MANAGEMENT",
        items: [
            {
                name: "Inventory",
                path: "/admin/inventory",
                icon: ClipboardList,
            },
            {
                name: "Staff / Sub-admin",
                path: "/admin/staff",
                icon: UserPlus,
            },
            {
                name: "Branches",
                path: "/admin/branches",
                icon: Store,
            },
            {
                name: "Reports",
                path: "/admin/reports",
                icon: BarChart3,
            },
        ],
    },
    {
        title: "PREFERENCES",
        items: [
            {
                name: "Settings",
                path: "/admin/settings",
                icon: Settings,
            },
        ],
    },
];

export default function Sidebar() {
    const navigate = useNavigate();

    const [mobileOpen, setMobileOpen] = useState(false);
    const [collapsed, setCollapsed] = useState(false);

    const adminEmail =
        JSON.parse(sessionStorage.getItem("adminUser") || "{}").email ||
        "Admin";

    const handleLogout = () => {
        sessionStorage.removeItem("adminToken");
        sessionStorage.removeItem("adminUser");

        navigate("/admin/login", { replace: true });
    };

    const closeMobileSidebar = () => {
        setMobileOpen(false);
    };

    const sidebarContent = (
        <div className="flex flex-col h-full bg-white">

            {/* BRAND */}
            <div className="h-[76px] flex items-center justify-between px-5 border-b border-gray-100 shrink-0">

                <div className="flex items-center gap-3 overflow-hidden">
                    <div className="w-10 h-10 rounded-xl bg-[#315C45] flex items-center justify-center shrink-0">
                        <Flower2 size={23} className="text-white" />
                    </div>

                    {!collapsed && (
                        <div className="min-w-0">
                            <h1 className="text-[17px] font-bold text-[#315C45] font-serif whitespace-nowrap">
                                Bloom & Blossom
                            </h1>

                            <p className="text-[9px] tracking-[2px] text-[#D77B91] font-semibold">
                                ADMIN PORTAL
                            </p>
                        </div>
                    )}
                </div>

                <button
                    type="button"
                    onClick={() => setCollapsed(!collapsed)}
                    className="hidden lg:flex p-2 text-gray-400 hover:text-[#315C45] hover:bg-[#FAF0F3] rounded-lg transition"
                    title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
                >
                    {collapsed
                        ? <PanelLeftOpen size={18} />
                        : <PanelLeftClose size={18} />
                    }
                </button>

                <button
                    type="button"
                    onClick={closeMobileSidebar}
                    className="lg:hidden p-2 text-gray-500 hover:bg-gray-100 rounded-lg"
                    aria-label="Close sidebar"
                >
                    <X size={20} />
                </button>

            </div>

            {/* NAVIGATION */}
            <div className="flex-1 overflow-y-auto px-3 py-6">

                {navigationItems.map((section) => (
                    <div key={section.title} className="mb-7">

                        {!collapsed && (
                            <p className="px-3 mb-3 text-[10px] font-bold tracking-[1.5px] text-gray-400">
                                {section.title}
                            </p>
                        )}

                        <div className="space-y-1">

                            {section.items.map((item) => {
                                const Icon = item.icon;

                                return (
                                    <NavLink
                                        key={item.path}
                                        to={item.path}
                                        end={item.path === "/admin/dashboard"}
                                        onClick={closeMobileSidebar}
                                        title={collapsed ? item.name : ""}
                                        className={({ isActive }) =>
                                            `group flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                                                isActive
                                                    ? "bg-[#315C45] text-white shadow-md shadow-[#315C45]/10"
                                                    : "text-gray-500 hover:bg-[#FAF0F3] hover:text-[#315C45]"
                                            } ${collapsed ? "justify-center" : ""}`
                                        }
                                    >
                                        <Icon
                                            size={19}
                                            strokeWidth={1.9}
                                            className="shrink-0"
                                        />

                                        {!collapsed && (
                                            <>
                                                <span className="flex-1">
                                                    {item.name}
                                                </span>

                                                <ChevronRight
                                                    size={15}
                                                    className="opacity-0 group-hover:opacity-70 transition"
                                                />
                                            </>
                                        )}
                                    </NavLink>
                                );
                            })}

                        </div>
                    </div>
                ))}

            </div>

            {/* ADMIN PROFILE */}
            <div className="border-t border-gray-100 p-3 shrink-0">

                <div className={`flex items-center gap-3 p-2 mb-2 ${collapsed ? "justify-center" : ""}`}>

                    <div className="w-10 h-10 rounded-full bg-[#FAF0F3] flex items-center justify-center shrink-0">
                        <Users size={19} className="text-[#D77B91]" />
                    </div>

                    {!collapsed && (
                        <div className="min-w-0">
                            <p className="text-sm font-semibold text-gray-800">
                                Administrator
                            </p>

                            <p className="text-xs text-gray-400 truncate max-w-[160px]">
                                {adminEmail}
                            </p>
                        </div>
                    )}

                </div>

                <button
                    type="button"
                    onClick={handleLogout}
                    className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 transition ${collapsed ? "justify-center" : ""}`}
                    title={collapsed ? "Logout" : ""}
                >
                    <LogOut size={19} />
                    {!collapsed && <span>Logout</span>}
                </button>

            </div>

        </div>
    );

    return (
        <>
            {/* MOBILE HEADER */}
            <div className="lg:hidden fixed top-0 left-0 right-0 z-40 h-[68px] bg-white border-b border-gray-100 flex items-center justify-between px-4">

                <div className="flex items-center gap-2">
                    <div className="w-9 h-9 rounded-lg bg-[#315C45] flex items-center justify-center">
                        <Flower2 size={21} className="text-white" />
                    </div>

                    <span className="font-serif font-bold text-[#315C45]">
                        Bloom & Blossom
                    </span>
                </div>

                <button
                    type="button"
                    onClick={() => setMobileOpen(true)}
                    className="p-2 rounded-lg text-gray-600 hover:bg-[#FAF0F3]"
                    aria-label="Open navigation"
                >
                    <Menu size={23} />
                </button>

            </div>

            {/* DESKTOP SIDEBAR */}
            <aside
                className={`hidden lg:flex fixed left-0 top-0 bottom-0 z-40 flex-col border-r border-gray-100 shadow-sm transition-all duration-300 ${
                    collapsed ? "w-[82px]" : "w-[270px]"
                }`}
            >
                {sidebarContent}
            </aside>

            {/* MOBILE SIDEBAR */}
            {mobileOpen && (
                <div className="lg:hidden fixed inset-0 z-50">

                    <div
                        className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"
                        onClick={closeMobileSidebar}
                    />

                    <aside className="absolute left-0 top-0 bottom-0 w-[280px] shadow-2xl">
                        {sidebarContent}
                    </aside>

                </div>
            )}

            {/* DESKTOP SIDEBAR WIDTH */}
            <div
                className={`hidden lg:block shrink-0 transition-all duration-300 ${
                    collapsed ? "w-[82px]" : "w-[270px]"
                }`}
            />
        </>
    );
}
