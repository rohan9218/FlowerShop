
import {
    Phone,
    Plus,
    Search,
    Trash2,
    UserPlus,
    Users,
} from "lucide-react";

import { useCallback, useEffect, useMemo, useState } from "react";
import Sidebar from "./Sidebar";

const API_BASE_URL = (
    import.meta.env.VITE_API_URL ||
    import.meta.env.VITE_BASE_URL ||
    ""
).replace(/\/+$/, "");

const STAFF_API_URL = `${API_BASE_URL}/api/staff`;

const getAuthHeaders = () => {
    const token = sessionStorage.getItem("adminToken");

    return {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };
};

// Reusable staff list component
function StaffList({ title, description, members, onDelete, deletingId, type }) {
    const isSubAdmin = type === "Sub-admin";

    return (
        <section className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden min-w-0">
            <div className="p-5 border-b border-gray-100">
                <div className="flex items-center justify-between gap-3">
                    <div>
                        <h2 className="text-lg font-bold text-gray-800">
                            {title}
                        </h2>

                        <p className="text-sm text-gray-500 mt-1">
                            {description}
                        </p>
                    </div>

                    <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${
                            isSubAdmin
                                ? "bg-[#FCEEF1] text-[#B85E76]"
                                : "bg-[#EAF3ED] text-[#315C45]"
                        }`}
                    >
                        {members.length}
                    </span>
                </div>
            </div>

            {members.length === 0 ? (
                <div className="py-12 px-5 text-center">
                    <Users size={32} className="mx-auto text-gray-300 mb-3" />

                    <h3 className="font-semibold text-gray-700">
                        No {isSubAdmin ? "Sub-admins" : "Staff"} found
                    </h3>

                    <p className="text-sm text-gray-400 mt-2">
                        {isSubAdmin
                            ? "Add a Sub-admin using the form above."
                            : "Add a Staff member using the form above."}
                    </p>
                </div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="w-full text-left min-w-[550px]">
                        <thead className="bg-[#FCFAFA]">
                            <tr className="text-xs text-gray-500 uppercase tracking-wide">
                                <th className="px-5 py-4">Name</th>
                                <th className="px-5 py-4">Mobile Number</th>
                                <th className="px-5 py-4">Added On</th>
                                <th className="px-5 py-4 text-right">Action</th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-gray-100">
                            {members.map((person) => (
                                <tr key={person.id} className="text-sm">
                                    <td className="px-5 py-4 font-semibold text-gray-800">
                                        {person.name}
                                    </td>

                                    <td className="px-5 py-4 text-gray-600">
                                        {person.mobile}
                                    </td>

                                    <td className="px-5 py-4 text-gray-500 whitespace-nowrap">
                                        {person.createdAt
                                            ? new Date(
                                                  person.createdAt
                                              ).toLocaleDateString("en-IN")
                                            : "—"}
                                    </td>

                                    <td className="px-5 py-4 text-right">
                                        <button
                                            type="button"
                                            onClick={() => onDelete(person.id)}
                                            disabled={deletingId === person.id}
                                            className="p-2 rounded-lg text-red-500 hover:bg-red-50 transition disabled:opacity-50 disabled:cursor-not-allowed"
                                            title="Delete staff member"
                                            aria-label={`Delete ${person.name}`}
                                        >
                                            <Trash2 size={17} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </section>
    );
}

export default function Staff() {
    const [staff, setStaff] = useState([]);
    const [search, setSearch] = useState("");
    const [name, setName] = useState("");
    const [mobile, setMobile] = useState("");
    const [role, setRole] = useState("Staff");

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [deletingId, setDeletingId] = useState(null);

    // Fetch staff members from MySQL through backend
    const fetchStaff = useCallback(async () => {
        setIsLoading(true);
        setError("");

        try {
            const response = await fetch(STAFF_API_URL, {
                method: "GET",
                headers: getAuthHeaders(),
            });

            const data = await response.json().catch(() => ({}));

            if (!response.ok) {
                throw new Error(
                    data.message || "Unable to load staff members."
                );
            }

            setStaff(Array.isArray(data.staff) ? data.staff : []);
        } catch (requestError) {
            setError(
                requestError instanceof TypeError
                    ? "Unable to connect to the server. Please check your connection and try again."
                    : requestError.message
            );
        } finally {
            setIsLoading(false);
        }
    }, []);

    // Load staff when page opens
    useEffect(() => {
        fetchStaff();
    }, [fetchStaff]);

    // Add staff member
    const handleSubmit = async (e) => {
        e.preventDefault();

        setError("");
        setSuccess("");

        const cleanName = name.trim();
        const cleanMobile = mobile.trim();

        if (!cleanName) {
            setError("Please enter the staff member's name.");
            return;
        }

        if (cleanName.length > 80) {
            setError("Name cannot be longer than 80 characters.");
            return;
        }

        if (!/^[6-9]\d{9}$/.test(cleanMobile)) {
            setError("Enter a valid 10-digit Indian mobile number.");
            return;
        }

        if (staff.some((person) => person.mobile === cleanMobile)) {
            setError("This mobile number is already registered.");
            return;
        }

        setIsSubmitting(true);

        try {
            const response = await fetch(STAFF_API_URL, {
                method: "POST",
                headers: getAuthHeaders(),
                body: JSON.stringify({
                    name: cleanName,
                    mobile: cleanMobile,
                    role,
                }),
            });

            const data = await response.json().catch(() => ({}));

            if (!response.ok) {
                throw new Error(
                    data.message || "Unable to add staff member."
                );
            }

            if (data.staff) {
                setStaff((currentStaff) => [
                    data.staff,
                    ...currentStaff,
                ]);
            } else {
                await fetchStaff();
            }

            setName("");
            setMobile("");
            setRole("Staff");

            setSuccess(
                data.message || `${cleanName} has been added successfully.`
            );
        } catch (requestError) {
            setError(
                requestError instanceof TypeError
                    ? "Unable to connect to the server. Please try again."
                    : requestError.message
            );
        } finally {
            setIsSubmitting(false);
        }
    };

    // Delete staff member
    const handleDelete = async (id) => {
        const confirmed = window.confirm(
            "Are you sure you want to delete this staff member?"
        );

        if (!confirmed) return;

        setError("");
        setSuccess("");
        setDeletingId(id);

        try {
            const response = await fetch(
                `${STAFF_API_URL}/${encodeURIComponent(id)}`,
                {
                    method: "DELETE",
                    headers: getAuthHeaders(),
                }
            );

            const data = await response.json().catch(() => ({}));

            if (!response.ok) {
                throw new Error(
                    data.message || "Unable to delete staff member."
                );
            }

            setStaff((currentStaff) =>
                currentStaff.filter(
                    (person) => String(person.id) !== String(id)
                )
            );

            setSuccess(
                data.message || "Staff member deleted successfully."
            );
        } catch (requestError) {
            setError(
                requestError instanceof TypeError
                    ? "Unable to connect to the server. Please try again."
                    : requestError.message
            );
        } finally {
            setDeletingId(null);
        }
    };

    // Search staff members
    const filteredStaff = useMemo(() => {
        const searchText = search.trim().toLowerCase();

        if (!searchText) return staff;

        return staff.filter((person) => {
            return (
                String(person.name || "")
                    .toLowerCase()
                    .includes(searchText) ||
                String(person.mobile || "").includes(searchText) ||
                String(person.role || "")
                    .toLowerCase()
                    .includes(searchText)
            );
        });
    }, [staff, search]);

    // Calculate individual role counts
    const totalStaffCount = staff.filter(
        (person) => person.role === "Staff"
    ).length;

    const subAdminCount = staff.filter(
        (person) => person.role === "Sub-admin"
    ).length;

    // Separate Sub-admin and Staff members
    const subAdminMembers = filteredStaff.filter(
        (person) => person.role === "Sub-admin"
    );

    const staffMembers = filteredStaff.filter(
        (person) => person.role === "Staff"
    );

    return (
        <div className="min-h-screen bg-[#FAF0F3] flex">

            <Sidebar />

            <main className="flex-1 min-w-0 min-h-screen pt-[68px] lg:pt-0">
                <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8">

                    {/* HEADER */}
                    <div className="mb-8">
                        <div className="flex items-center gap-2 text-xs text-gray-400 mb-2">
                            <span>Admin</span>
                            <span>/</span>
                            <span className="text-[#315C45] font-medium">
                                Staff / Sub-admin
                            </span>
                        </div>

                        <h1 className="text-2xl sm:text-3xl font-bold text-[#315C45]">
                            Staff Management
                        </h1>

                        <p className="text-sm text-gray-500 mt-2">
                            Add and manage staff members and branch Sub-admins.
                        </p>
                    </div>

                    {/* SUMMARY */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">

                        {/* TOTAL STAFF - ONLY STAFF ROLE */}
                        <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-gray-500">
                                        Total Staff
                                    </p>

                                    <h2 className="text-2xl font-bold text-gray-800 mt-2">
                                        {totalStaffCount}
                                    </h2>
                                </div>

                                <div className="w-12 h-12 rounded-xl bg-[#EAF3ED] flex items-center justify-center">
                                    <Users className="text-[#315C45]" size={23} />
                                </div>
                            </div>
                        </div>

                        {/* TOTAL SUB-ADMINS - ONLY SUB-ADMIN ROLE */}
                        <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-gray-500">
                                        Total Sub-admins
                                    </p>

                                    <h2 className="text-2xl font-bold text-gray-800 mt-2">
                                        {subAdminCount}
                                    </h2>
                                </div>

                                <div className="w-12 h-12 rounded-xl bg-[#FCEEF1] flex items-center justify-center">
                                    <UserPlus className="text-[#D77B91]" size={23} />
                                </div>
                            </div>
                        </div>

                    </div>

                    {/* ADD STAFF FORM */}
                    <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 sm:p-7 mb-8">

                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-11 h-11 rounded-xl bg-[#EAF3ED] flex items-center justify-center">
                                <UserPlus size={21} className="text-[#315C45]" />
                            </div>

                            <div>
                                <h2 className="text-lg font-bold text-gray-800">
                                    Add Staff / Sub-admin
                                </h2>

                                <p className="text-sm text-gray-500 mt-1">
                                    Enter the employee's basic information.
                                </p>
                            </div>
                        </div>

                        <form
                            onSubmit={handleSubmit}
                            className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5"
                        >

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Full Name
                                </label>

                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="Enter full name"
                                    maxLength={80}
                                    required
                                    className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:border-[#D77B91] focus:ring-2 focus:ring-[#D77B91]/10"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Mobile Number
                                </label>

                                <div className="relative">
                                    <Phone
                                        size={17}
                                        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                                    />

                                    <input
                                        type="tel"
                                        inputMode="numeric"
                                        value={mobile}
                                        onChange={(e) =>
                                            setMobile(
                                                e.target.value
                                                    .replace(/\D/g, "")
                                                    .slice(0, 10)
                                            )
                                        }
                                        placeholder="10-digit mobile number"
                                        required
                                        className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl outline-none focus:border-[#D77B91] focus:ring-2 focus:ring-[#D77B91]/10"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Role
                                </label>

                                <select
                                    value={role}
                                    onChange={(e) => setRole(e.target.value)}
                                    className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-white outline-none focus:border-[#D77B91]"
                                >
                                    <option value="Staff">Staff</option>
                                    <option value="Sub-admin">Sub-admin</option>
                                </select>
                            </div>

                            <div className="flex items-end">
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full flex items-center justify-center gap-2 px-5 py-3 bg-[#315C45] text-white rounded-xl font-semibold hover:bg-[#09472c] transition disabled:opacity-60 disabled:cursor-not-allowed"
                                >
                                    <Plus size={18} />
                                    {isSubmitting ? "Adding..." : "Add Member"}
                                </button>
                            </div>

                        </form>

                        {error && (
                            <p role="alert" className="mt-4 text-sm text-red-600">
                                {error}
                            </p>
                        )}

                        {success && (
                            <p role="status" className="mt-4 text-sm text-[#315C45]">
                                {success}
                            </p>
                        )}

                    </section>

                    {/* STAFF LIST - 50/50 SPLIT */}
                    <section>

                        {/* SHARED SEARCH */}
                        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 sm:p-6 mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                            <div>
                                <h2 className="text-lg font-bold text-gray-800">
                                    Staff Directory
                                </h2>

                                <p className="text-sm text-gray-500 mt-1">
                                    Manage Sub-admins and Staff members separately.
                                </p>
                            </div>

                            <div className="relative w-full sm:w-72">
                                <Search
                                    size={17}
                                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                                />

                                <input
                                    type="search"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    placeholder="Search name, mobile or role..."
                                    className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl outline-none focus:border-[#D77B91] text-sm"
                                />
                            </div>
                        </div>

                        {isLoading ? (
                            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm py-14 px-5 text-center">
                                <p className="text-sm text-gray-500">
                                    Loading staff members...
                                </p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">

                                {/* LEFT SIDE - SUB-ADMINS */}
                                <StaffList
                                    title="Sub-admin Members"
                                    description="All registered Sub-admins."
                                    members={subAdminMembers}
                                    onDelete={handleDelete}
                                    deletingId={deletingId}
                                    type="Sub-admin"
                                />

                                {/* RIGHT SIDE - STAFF */}
                                <StaffList
                                    title="Staff Members"
                                    description="All registered Staff members."
                                    members={staffMembers}
                                    onDelete={handleDelete}
                                    deletingId={deletingId}
                                    type="Staff"
                                />

                            </div>
                        )}

                    </section>

                    <p className="text-xs text-gray-400 text-center mt-8 pb-4">
                        © {new Date().getFullYear()} Bloom & Blossom. All rights reserved.
                    </p>

                </div>
            </main>
        </div>
    );
}
