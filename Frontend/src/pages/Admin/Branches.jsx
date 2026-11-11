
import {
    Building2,
    Check,
    MapPin,
    Pencil,
    Plus,
    Search,
    Store,
    Trash2,
    UserRound,
    Users,
    X,
} from "lucide-react";

import { useCallback, useEffect, useMemo, useState } from "react";
import Sidebar from "./Sidebar";

const API_BASE_URL = (
    import.meta.env.VITE_API_URL ||
    import.meta.env.VITE_BASE_URL ||
    ""
).replace(/\/+$/, "");

const BRANCH_API_URL = `${API_BASE_URL}/api/branches`;

const getAuthHeaders = () => {
    const token = sessionStorage.getItem("adminToken");

    return {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };
};

export default function Branches() {
    const [branches, setBranches] = useState([]);
    const [subAdmins, setSubAdmins] = useState([]);
    const [staffMembers, setStaffMembers] = useState([]);

    const [branchName, setBranchName] = useState("");
    const [branchAddress, setBranchAddress] = useState("");
    const [subAdminId, setSubAdminId] = useState("");
    const [selectedStaffIds, setSelectedStaffIds] = useState([]);
    const [search, setSearch] = useState("");

    const [editingBranchId, setEditingBranchId] = useState(null);
    const [editName, setEditName] = useState("");
    const [editAddress, setEditAddress] = useState("");
    const [editSubAdminId, setEditSubAdminId] = useState("");
    const [editStaffIds, setEditStaffIds] = useState([]);

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false);
    const [deletingId, setDeletingId] = useState(null);

    // Fetch branches and available team members from MySQL
    const fetchBranches = useCallback(async () => {
        setIsLoading(true);
        setError("");

        try {
            const response = await fetch(BRANCH_API_URL, {
                method: "GET",
                headers: getAuthHeaders(),
            });

            const data = await response.json().catch(() => ({}));

            if (!response.ok) {
                throw new Error(
                    data.message || "Unable to load branch information."
                );
            }

            setBranches(
                Array.isArray(data.branches) ? data.branches : []
            );

            setSubAdmins(
                Array.isArray(data.subAdmins) ? data.subAdmins : []
            );

            setStaffMembers(
                Array.isArray(data.staffMembers) ? data.staffMembers : []
            );
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

    useEffect(() => {
        fetchBranches();
    }, [fetchBranches]);

    // Checkbox selection for creating a branch
    const handleStaffSelection = (staffId) => {
        setSelectedStaffIds((currentIds) => {
            const id = String(staffId);

            return currentIds.includes(id)
                ? currentIds.filter((item) => item !== id)
                : [...currentIds, id];
        });
    };

    // Checkbox selection for editing a branch
    const handleEditStaffSelection = (staffId) => {
        setEditStaffIds((currentIds) => {
            const id = String(staffId);

            return currentIds.includes(id)
                ? currentIds.filter((item) => item !== id)
                : [...currentIds, id];
        });
    };

    // Select all Staff when creating a branch
    const handleSelectAllStaff = () => {
        setSelectedStaffIds(
            selectedStaffIds.length === staffMembers.length
                ? []
                : staffMembers.map((person) => String(person.id))
        );
    };

    // Select all Staff when editing a branch
    const handleSelectAllEditStaff = () => {
        setEditStaffIds(
            editStaffIds.length === staffMembers.length
                ? []
                : staffMembers.map((person) => String(person.id))
        );
    };

    // Create branch
    const handleSubmit = async (e) => {
        e.preventDefault();

        setError("");
        setSuccess("");

        const cleanName = branchName.trim();
        const cleanAddress = branchAddress.trim();

        if (!cleanName || !cleanAddress) {
            setError("Please enter the branch name and address.");
            return;
        }

        if (cleanName.length > 100 || cleanAddress.length > 500) {
            setError("Branch name or address exceeds the allowed length.");
            return;
        }

        if (!subAdminId) {
            setError("Please assign a Sub-admin to this branch.");
            return;
        }

        const validStaffIds = selectedStaffIds.filter((id) =>
            staffMembers.some(
                (person) => String(person.id) === String(id)
            )
        );

        if (validStaffIds.length !== selectedStaffIds.length) {
            setError("One or more selected Staff members are unavailable.");
            return;
        }

        setIsSubmitting(true);

        try {
            const response = await fetch(BRANCH_API_URL, {
                method: "POST",
                headers: getAuthHeaders(),
                body: JSON.stringify({
                    name: cleanName,
                    address: cleanAddress,
                    subAdminId: Number(subAdminId),
                    staffIds: validStaffIds.map(Number),
                }),
            });

            const data = await response.json().catch(() => ({}));

            if (!response.ok) {
                throw new Error(
                    data.message || "Unable to create branch."
                );
            }

            setBranchName("");
            setBranchAddress("");
            setSubAdminId("");
            setSelectedStaffIds([]);

            setSuccess(
                data.message || "Branch created successfully."
            );

            await fetchBranches();
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

    // Open edit form with existing branch details
    const handleEdit = (branch) => {
        setError("");
        setSuccess("");

        setEditingBranchId(branch.id);
        setEditName(branch.name || "");
        setEditAddress(branch.address || "");
        setEditSubAdminId(String(branch.subAdminId || ""));
        setEditStaffIds(
            Array.isArray(branch.staff)
                ? branch.staff.map((person) => String(person.id))
                : []
        );
    };

    // Cancel editing
    const handleCancelEdit = () => {
        setEditingBranchId(null);
        setEditName("");
        setEditAddress("");
        setEditSubAdminId("");
        setEditStaffIds([]);
    };

    // Update branch
    const handleUpdateBranch = async (e) => {
        e.preventDefault();

        setError("");
        setSuccess("");

        const cleanName = editName.trim();
        const cleanAddress = editAddress.trim();

        if (!cleanName || !cleanAddress) {
            setError("Branch name and address are required.");
            return;
        }

        if (cleanName.length > 100 || cleanAddress.length > 500) {
            setError("Branch name or address exceeds the allowed length.");
            return;
        }

        if (!editSubAdminId) {
            setError("Please select a Sub-admin.");
            return;
        }

        if (
            !subAdmins.some(
                (person) => String(person.id) === String(editSubAdminId)
            )
        ) {
            setError("Selected Sub-admin is no longer available.");
            return;
        }

        const validStaffIds = editStaffIds.filter((id) =>
            staffMembers.some(
                (person) => String(person.id) === String(id)
            )
        );

        if (validStaffIds.length !== editStaffIds.length) {
            setError("One or more selected Staff members are unavailable.");
            return;
        }

        setIsUpdating(true);

        try {
            const response = await fetch(
                `${BRANCH_API_URL}/${encodeURIComponent(editingBranchId)}`,
                {
                    method: "PUT",
                    headers: getAuthHeaders(),
                    body: JSON.stringify({
                        name: cleanName,
                        address: cleanAddress,
                        subAdminId: Number(editSubAdminId),
                        staffIds: validStaffIds.map(Number),
                    }),
                }
            );

            const data = await response.json().catch(() => ({}));

            if (!response.ok) {
                throw new Error(
                    data.message || "Unable to update branch."
                );
            }

            handleCancelEdit();

            setSuccess(
                data.message || "Branch updated successfully."
            );

            await fetchBranches();
        } catch (requestError) {
            setError(
                requestError instanceof TypeError
                    ? "Unable to connect to the server. Please try again."
                    : requestError.message
            );
        } finally {
            setIsUpdating(false);
        }
    };

    // Delete branch
    const handleDelete = async (id) => {
        const confirmed = window.confirm(
            "Are you sure you want to delete this branch?"
        );

        if (!confirmed) return;

        setError("");
        setSuccess("");
        setDeletingId(id);

        try {
            const response = await fetch(
                `${BRANCH_API_URL}/${encodeURIComponent(id)}`,
                {
                    method: "DELETE",
                    headers: getAuthHeaders(),
                }
            );

            const data = await response.json().catch(() => ({}));

            if (!response.ok) {
                throw new Error(
                    data.message || "Unable to delete branch."
                );
            }

            setBranches((currentBranches) =>
                currentBranches.filter(
                    (branch) => String(branch.id) !== String(id)
                )
            );

            if (String(editingBranchId) === String(id)) {
                handleCancelEdit();
            }

            setSuccess(
                data.message || "Branch deleted successfully."
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

    // Search branches
    const filteredBranches = useMemo(() => {
        const searchText = search.trim().toLowerCase();

        if (!searchText) return branches;

        return branches.filter((branch) => {
            return (
                String(branch.name || "")
                    .toLowerCase()
                    .includes(searchText) ||
                String(branch.address || "")
                    .toLowerCase()
                    .includes(searchText) ||
                String(branch.subAdminName || "")
                    .toLowerCase()
                    .includes(searchText)
            );
        });
    }, [branches, search]);

    // Reusable Staff checkbox list
    const renderStaffCheckboxes = (
        selectedIds,
        onSelectionChange,
        onSelectAll,
        selectAllLabel
    ) => (
        <div className="border border-gray-200 rounded-xl overflow-hidden bg-white">
            {staffMembers.length === 0 ? (
                <div className="p-5 text-center">
                    <Users size={25} className="mx-auto text-gray-300 mb-2" />
                    <p className="text-sm text-gray-500">
                        No Staff members available.
                    </p>
                </div>
            ) : (
                <>
                    <div className="px-4 py-3 bg-[#FCFAFA] border-b border-gray-100 flex items-center justify-between gap-2">
                        <span className="text-xs text-gray-500">
                            Select employees
                        </span>

                        <button
                            type="button"
                            onClick={onSelectAll}
                            className="text-xs font-semibold text-[#315C45] hover:text-[#09472c]"
                        >
                            {selectAllLabel}
                        </button>
                    </div>

                    <div className="max-h-[220px] overflow-y-auto divide-y divide-gray-100">
                        {staffMembers.map((person) => {
                            const isSelected = selectedIds.includes(
                                String(person.id)
                            );

                            return (
                                <label
                                    key={person.id}
                                    className={`flex items-center gap-3 px-4 py-3 cursor-pointer transition ${
                                        isSelected
                                            ? "bg-[#F3F8F4]"
                                            : "hover:bg-[#FCFAFA]"
                                    }`}
                                >
                                    <input
                                        type="checkbox"
                                        checked={isSelected}
                                        onChange={() =>
                                            onSelectionChange(person.id)
                                        }
                                        className="w-4 h-4 accent-[#315C45] cursor-pointer shrink-0"
                                    />

                                    <div className="w-9 h-9 rounded-full bg-[#EAF3ED] flex items-center justify-center shrink-0">
                                        <UserRound
                                            size={16}
                                            className="text-[#315C45]"
                                        />
                                    </div>

                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium text-gray-800">
                                            {person.name}
                                        </p>
                                        <p className="text-xs text-gray-500 mt-0.5">
                                            {person.mobile}
                                        </p>
                                    </div>

                                    {isSelected && (
                                        <Check
                                            size={17}
                                            className="text-[#315C45] shrink-0"
                                        />
                                    )}
                                </label>
                            );
                        })}
                    </div>
                </>
            )}
        </div>
    );

    // Reusable Sub-admin dropdown
    const renderSubAdminDropdown = (value, onChange) => (
        <select
            value={value}
            onChange={(e) => onChange(e.target.value)}
            required
            disabled={subAdmins.length === 0}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-white outline-none focus:border-[#D77B91] disabled:bg-gray-50 disabled:cursor-not-allowed"
        >
            <option value="">Select Sub-admin</option>

            {subAdmins.map((person) => (
                <option key={person.id} value={person.id}>
                    {person.name} - {person.mobile}
                </option>
            ))}
        </select>
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
                                Branches
                            </span>
                        </div>

                        <h1 className="text-2xl sm:text-3xl font-bold text-[#315C45]">
                            Branch Management
                        </h1>

                        <p className="text-sm text-gray-500 mt-2">
                            Create branches and assign Sub-admins and staff members.
                        </p>
                    </div>

                    {/* SUMMARY */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                        <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-gray-500">
                                        Total Branches
                                    </p>
                                    <h2 className="text-2xl font-bold text-gray-800 mt-2">
                                        {branches.length}
                                    </h2>
                                </div>
                                <div className="w-12 h-12 rounded-xl bg-[#EAF3ED] flex items-center justify-center">
                                    <Store className="text-[#315C45]" size={23} />
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-gray-500">
                                        Available Sub-admins
                                    </p>
                                    <h2 className="text-2xl font-bold text-gray-800 mt-2">
                                        {subAdmins.length}
                                    </h2>
                                </div>
                                <div className="w-12 h-12 rounded-xl bg-[#FCEEF1] flex items-center justify-center">
                                    <UserRound className="text-[#D77B91]" size={23} />
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-gray-500">
                                        Available Staff
                                    </p>
                                    <h2 className="text-2xl font-bold text-gray-800 mt-2">
                                        {staffMembers.length}
                                    </h2>
                                </div>
                                <div className="w-12 h-12 rounded-xl bg-[#F1EFFB] flex items-center justify-center">
                                    <Users className="text-[#8070B8]" size={23} />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* GLOBAL MESSAGES */}
                    {error && !editingBranchId && (
                        <p role="alert" className="mb-5 text-sm text-red-600 bg-red-50 border border-red-100 rounded-xl p-3">
                            {error}
                        </p>
                    )}

                    {success && (
                        <p role="status" className="mb-5 text-sm text-[#315C45] bg-[#EAF3ED] border border-[#315C45]/10 rounded-xl p-3">
                            {success}
                        </p>
                    )}

                    {/* CREATE BRANCH FORM */}
                    <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 sm:p-7 mb-8">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-11 h-11 rounded-xl bg-[#EAF3ED] flex items-center justify-center">
                                <Building2 size={21} className="text-[#315C45]" />
                            </div>

                            <div>
                                <h2 className="text-lg font-bold text-gray-800">
                                    Add New Branch
                                </h2>
                                <p className="text-sm text-gray-500 mt-1">
                                    Enter branch information and assign its team.
                                </p>
                            </div>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Branch Name
                                </label>
                                <input
                                    type="text"
                                    value={branchName}
                                    onChange={(e) => setBranchName(e.target.value)}
                                    placeholder="Example: Sangli Main Branch"
                                    maxLength={100}
                                    required
                                    className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:border-[#D77B91] focus:ring-2 focus:ring-[#D77B91]/10"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Branch Address
                                </label>
                                <textarea
                                    value={branchAddress}
                                    onChange={(e) => setBranchAddress(e.target.value)}
                                    placeholder="Enter complete branch address"
                                    rows={3}
                                    maxLength={500}
                                    required
                                    className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none resize-y focus:border-[#D77B91] focus:ring-2 focus:ring-[#D77B91]/10"
                                />
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Assign Sub-admin
                                    </label>

                                    {renderSubAdminDropdown(
                                        subAdminId,
                                        setSubAdminId
                                    )}

                                    {subAdmins.length === 0 && (
                                        <p className="text-xs text-amber-600 mt-2">
                                            Add a Sub-admin from Staff Management before creating a branch.
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <div className="flex items-center justify-between gap-3 mb-2">
                                        <label className="block text-sm font-medium text-gray-700">
                                            Assign Staff Members
                                        </label>

                                        {staffMembers.length > 0 && (
                                            <button
                                                type="button"
                                                onClick={handleSelectAllStaff}
                                                className="text-xs font-semibold text-[#315C45] hover:text-[#09472c]"
                                            >
                                                {selectedStaffIds.length === staffMembers.length
                                                    ? "Deselect All"
                                                    : "Select All"}
                                            </button>
                                        )}
                                    </div>

                                    {renderStaffCheckboxes(
                                        selectedStaffIds,
                                        handleStaffSelection,
                                        handleSelectAllStaff,
                                        selectedStaffIds.length === staffMembers.length
                                            ? "Deselect All"
                                            : "Select All"
                                    )}

                                    {selectedStaffIds.length > 0 && (
                                        <p className="text-xs text-[#315C45] mt-2">
                                            {selectedStaffIds.length} Staff member(s) selected.
                                        </p>
                                    )}
                                </div>
                            </div>

                            {error && !editingBranchId && (
                                <p role="alert" className="text-sm text-red-600">
                                    {error}
                                </p>
                            )}

                            <div className="flex justify-end">
                                <button
                                    type="submit"
                                    disabled={
                                        isSubmitting ||
                                        isLoading ||
                                        subAdmins.length === 0
                                    }
                                    className="flex items-center justify-center gap-2 px-6 py-3 bg-[#315C45] text-white rounded-xl font-semibold hover:bg-[#09472c] transition disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <Plus size={18} />
                                    {isSubmitting ? "Creating..." : "Create Branch"}
                                </button>
                            </div>
                        </form>
                    </section>

                    {/* ALL BRANCHES */}
                    <section className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                        <div className="p-5 sm:p-6 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                            <div>
                                <h2 className="text-lg font-bold text-gray-800">
                                    All Branches
                                </h2>
                                <p className="text-sm text-gray-500 mt-1">
                                    Branch details and assigned team members.
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
                                    placeholder="Search branches..."
                                    className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl outline-none focus:border-[#D77B91] text-sm"
                                />
                            </div>
                        </div>

                        {isLoading ? (
                            <div className="py-14 px-5 text-center">
                                <p className="text-sm text-gray-500">
                                    Loading branches...
                                </p>
                            </div>
                        ) : filteredBranches.length === 0 ? (
                            <div className="py-14 px-5 text-center">
                                <Store size={34} className="mx-auto text-gray-300 mb-3" />
                                <h3 className="font-semibold text-gray-700">
                                    {branches.length === 0
                                        ? "No branches created yet"
                                        : "No matching branches found"}
                                </h3>
                                <p className="text-sm text-gray-400 mt-2">
                                    {branches.length === 0
                                        ? "Create your first branch using the form above."
                                        : "Try a different branch name, address or Sub-admin."}
                                </p>
                            </div>
                        ) : (
                            <div className="p-5 sm:p-6 grid grid-cols-1 xl:grid-cols-2 gap-5">
                                {filteredBranches.map((branch) => (
                                    <article
                                        key={branch.id}
                                        className="border border-gray-100 rounded-2xl p-5 hover:shadow-md transition"
                                    >
                                        <div className="flex items-start justify-between gap-3">
                                            <div className="flex items-center gap-3 min-w-0">
                                                <div className="w-12 h-12 rounded-xl bg-[#EAF3ED] flex items-center justify-center shrink-0">
                                                    <Store size={22} className="text-[#315C45]" />
                                                </div>

                                                <div className="min-w-0">
                                                    <h3 className="font-bold text-gray-800">
                                                        {branch.name}
                                                    </h3>
                                                    <p className="text-xs text-gray-400 mt-1">
                                                        Created{" "}
                                                        {branch.createdAt
                                                            ? new Date(branch.createdAt).toLocaleDateString("en-IN")
                                                            : "—"}
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-1 shrink-0">
                                                <button
                                                    type="button"
                                                    onClick={() => handleEdit(branch)}
                                                    className="p-2 rounded-lg text-[#315C45] hover:bg-[#EAF3ED] transition"
                                                    title="Edit branch"
                                                    aria-label={`Edit ${branch.name}`}
                                                >
                                                    <Pencil size={17} />
                                                </button>

                                                <button
                                                    type="button"
                                                    onClick={() => handleDelete(branch.id)}
                                                    disabled={deletingId === branch.id}
                                                    className="p-2 rounded-lg text-red-500 hover:bg-red-50 transition disabled:opacity-50 disabled:cursor-not-allowed"
                                                    title="Delete branch"
                                                    aria-label={`Delete ${branch.name}`}
                                                >
                                                    <Trash2 size={17} />
                                                </button>
                                            </div>
                                        </div>

                                        <div className="flex items-start gap-2 mt-5 text-sm text-gray-500">
                                            <MapPin size={17} className="text-[#D77B91] shrink-0 mt-0.5" />
                                            <p className="leading-relaxed">
                                                {branch.address}
                                            </p>
                                        </div>

                                        <div className="mt-5 pt-4 border-t border-gray-100">
                                            <p className="text-xs font-bold tracking-wide text-gray-400 uppercase mb-3">
                                                Branch Sub-admin
                                            </p>

                                            <div className="flex items-center gap-3 bg-[#FCEEF1] rounded-xl p-3">
                                                <div className="w-9 h-9 rounded-full bg-white flex items-center justify-center">
                                                    <UserRound size={17} className="text-[#D77B91]" />
                                                </div>

                                                <div>
                                                    <p className="text-sm font-semibold text-gray-800">
                                                        {branch.subAdminName}
                                                    </p>
                                                    <p className="text-xs text-gray-500 mt-1">
                                                        {branch.subAdminMobile}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="mt-5">
                                            <div className="flex items-center justify-between mb-3">
                                                <p className="text-xs font-bold tracking-wide text-gray-400 uppercase">
                                                    Assigned Staff
                                                </p>

                                                <span className="text-xs font-semibold bg-[#EAF3ED] text-[#315C45] px-2.5 py-1 rounded-full">
                                                    {branch.staff.length} Members
                                                </span>
                                            </div>

                                            {branch.staff.length === 0 ? (
                                                <p className="text-sm text-gray-400">
                                                    No staff assigned to this branch.
                                                </p>
                                            ) : (
                                                <div className="space-y-2">
                                                    {branch.staff.map((person) => (
                                                        <div
                                                            key={person.id}
                                                            className="flex items-center justify-between gap-3 text-sm bg-[#FCFAFA] rounded-lg px-3 py-2"
                                                        >
                                                            <span className="font-medium text-gray-700">
                                                                {person.name}
                                                            </span>
                                                            <span className="text-xs text-gray-400">
                                                                {person.mobile}
                                                            </span>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    </article>
                                ))}
                            </div>
                        )}
                    </section>

                    <p className="text-xs text-gray-400 text-center mt-8 pb-4">
                        © {new Date().getFullYear()} Bloom & Blossom. All rights reserved.
                    </p>
                </div>
            </main>

            {/* EDIT BRANCH MODAL */}
            {editingBranchId !== null && (
                <div
                    className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4"
                    onMouseDown={(e) => {
                        if (e.target === e.currentTarget && !isUpdating) {
                            handleCancelEdit();
                        }
                    }}
                >
                    <div className="bg-white w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-xl">
                        <div className="sticky top-0 bg-white z-10 flex items-center justify-between gap-3 px-5 sm:px-7 py-5 border-b border-gray-100">
                            <div>
                                <h2 className="text-lg font-bold text-gray-800">
                                    Edit Branch
                                </h2>
                                <p className="text-sm text-gray-500 mt-1">
                                    Update branch details and assigned team.
                                </p>
                            </div>

                            <button
                                type="button"
                                onClick={handleCancelEdit}
                                disabled={isUpdating}
                                className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 disabled:opacity-50"
                                aria-label="Close edit form"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        <form
                            onSubmit={handleUpdateBranch}
                            className="p-5 sm:p-7 space-y-5"
                        >
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Branch Name
                                </label>
                                <input
                                    type="text"
                                    value={editName}
                                    onChange={(e) => setEditName(e.target.value)}
                                    maxLength={100}
                                    required
                                    className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:border-[#D77B91] focus:ring-2 focus:ring-[#D77B91]/10"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Branch Address
                                </label>
                                <textarea
                                    value={editAddress}
                                    onChange={(e) => setEditAddress(e.target.value)}
                                    rows={3}
                                    maxLength={500}
                                    required
                                    className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none resize-y focus:border-[#D77B91] focus:ring-2 focus:ring-[#D77B91]/10"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Assign Sub-admin
                                </label>
                                {renderSubAdminDropdown(
                                    editSubAdminId,
                                    setEditSubAdminId
                                )}
                            </div>

                            <div>
                                <div className="flex items-center justify-between gap-3 mb-2">
                                    <label className="block text-sm font-medium text-gray-700">
                                        Assign Staff Members
                                    </label>

                                    {staffMembers.length > 0 && (
                                        <button
                                            type="button"
                                            onClick={handleSelectAllEditStaff}
                                            className="text-xs font-semibold text-[#315C45] hover:text-[#09472c]"
                                        >
                                            {editStaffIds.length === staffMembers.length
                                                ? "Deselect All"
                                                : "Select All"}
                                        </button>
                                    )}
                                </div>

                                {renderStaffCheckboxes(
                                    editStaffIds,
                                    handleEditStaffSelection,
                                    handleSelectAllEditStaff,
                                    editStaffIds.length === staffMembers.length
                                        ? "Deselect All"
                                        : "Select All"
                                )}

                                <p className="text-xs text-[#315C45] mt-2">
                                    {editStaffIds.length} Staff member(s) selected.
                                </p>
                            </div>

                            {error && editingBranchId !== null && (
                                <p role="alert" className="text-sm text-red-600 bg-red-50 rounded-xl p-3">
                                    {error}
                                </p>
                            )}

                            <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 pt-2">
                                <button
                                    type="button"
                                    onClick={handleCancelEdit}
                                    disabled={isUpdating}
                                    className="px-5 py-3 border border-gray-200 text-gray-600 rounded-xl font-semibold hover:bg-gray-50 transition disabled:opacity-50"
                                >
                                    Cancel
                                </button>

                                <button
                                    type="submit"
                                    disabled={isUpdating || subAdmins.length === 0}
                                    className="flex items-center justify-center gap-2 px-6 py-3 bg-[#315C45] text-white rounded-xl font-semibold hover:bg-[#09472c] transition disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <Check size={18} />
                                    {isUpdating ? "Updating..." : "Save Changes"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
