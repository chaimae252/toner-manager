import React, { useState, useMemo } from "react";
import Layout from "@/Layouts/Layout";
import { AiOutlinePlus } from "react-icons/ai";
import { FaMapMarkerAlt } from "react-icons/fa";
import { FiCheckCircle, FiMinusCircle } from "react-icons/fi";
import { router } from "@inertiajs/react";

import AddEditTonerModal from "@/Components/AddEditTonerModal";
import AssignTonerModal from "@/Components/AssignTonerModal";
import DeleteConfirmModal from "@/Components/DeleteConfirmModal";

const Toners = ({
    toners = [],
    locations = [],
    stocks = [],
    printers = [],
}) => {
    const [search, setSearch] = useState("");
    const [filterStatus, setFilterStatus] = useState("all");
    const [filterPrinter, setFilterPrinter] = useState("all");
    const [filterColor, setFilterColor] = useState("all");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalType, setModalType] = useState(null);
    const [selectedToner, setSelectedToner] = useState(null);

    const filteredToners = useMemo(() => {
        return toners.filter((toner) => {
            const matchesSearch = toner?.stock?.code
                ?.toLowerCase()
                .includes(search.toLowerCase());

            const matchesStatus =
                filterStatus === "all" ||
                (filterStatus === "assigned" && toner.printer) ||
                (filterStatus === "unassigned" && !toner.printer);

            const matchesPrinter =
                filterPrinter === "all" ||
                toner?.printer?.id_printer?.toString() === filterPrinter;
            const matchesColor =
                filterColor === "all" ||
                toner?.stock?.color?.toLowerCase() === filterColor;

            return (
                matchesSearch && matchesStatus && matchesPrinter && matchesColor
            );
        });
    }, [toners, search, filterStatus, filterPrinter, filterColor]);

    const inventorySummary = useMemo(() => {
        const total = toners.length;
        const assigned = toners.filter((t) => t.printer).length;
        return { total, assigned, unassigned: total - assigned };
    }, [toners]);

    const openModal = (type, toner = null) => {
        setSelectedToner(toner);
        setModalType(type);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setSelectedToner(null);
        setModalType(null);
        setIsModalOpen(false);
    };

    const getColorClass = (color) => {
        switch (color?.toLowerCase()) {
            case "black":
                return "bg-gray-900";
            case "cyan":
                return "bg-cyan-600";
            case "magenta":
                return "bg-pink-600";
            case "yellow":
                return "bg-yellow-400";
            default:
                return "bg-gray-400";
        }
    };

    const handleAddToner = (data) => {
        const payload = {
            stock_id: data.stock_id,
            quantity: data.quantity,
        };

        router.post(route("toners.store"), payload, {
            onSuccess: () => closeModal(),
            onError: (err) => console.error("Error saving toner", err),
        });
    };

    const handleAssignToner = (printer_id) => {
        if (!selectedToner?.id_toner) return;

        router.post(
            route("toners.assign", selectedToner.id_toner),
            { printer_id },
            {
                onSuccess: () => closeModal(),
                onError: (err) => console.error("Failed to assign toner:", err),
            }
        );
    };

    const handleDeleteToner = (tonerId) => {
        router.delete(route("toners.destroy", tonerId), {
            onSuccess: () => closeModal(),
            onError: (error) => console.error("Delete failed", error),
        });
    };

    return (
        <Layout>
            <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-3xl font-bold text-[#ed1c24]">
                        Toners
                    </h2>
                    <button
                        onClick={() => openModal("add-edit")}
                        className="flex items-center gap-2 bg-[#ed1c24] text-white px-4 py-2 rounded-md hover:bg-[#c8141b] transition"
                    >
                        <AiOutlinePlus size={18} />
                        Add Toner
                    </button>
                </div>

                <div className="flex gap-6 mb-6 text-gray-700">
                    {["Total", "Assigned", "Unassigned"].map((label) => {
                        const key = label.toLowerCase();
                        const color =
                            key === "assigned"
                                ? "text-green-700"
                                : "text-gray-600";
                        return (
                            <div key={label}>
                                <span className="block text-sm font-medium">
                                    {label}
                                </span>
                                <span className={`text-xl font-bold ${color}`}>
                                    {inventorySummary[key]}
                                </span>
                            </div>
                        );
                    })}
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6">
                    <input
                        type="text"
                        placeholder="Search toners by code..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="flex-grow max-w-md px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#ed1c24] focus:border-[#ed1c24]"
                    />

                    <select
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                        className="px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#ed1c24] focus:border-[#ed1c24]"
                    >
                        <option value="all">All Statuses</option>
                        <option value="assigned">Assigned</option>
                        <option value="unassigned">Unassigned</option>
                    </select>

                    <select
                        value={filterPrinter}
                        onChange={(e) => setFilterPrinter(e.target.value)}
                        className="px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#ed1c24] focus:border-[#ed1c24]"
                    >
                        <option value="all">All Printers</option>
                        {printers.map((printer) => (
                            <option
                                key={printer.id_printer}
                                value={printer.id_printer}
                            >
                                {printer.name}
                            </option>
                        ))}
                    </select>
                    <select
                        value={filterColor}
                        onChange={(e) => setFilterColor(e.target.value)}
                        className="px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#ed1c24] focus:border-[#ed1c24]"
                    >
                        <option value="all">All Colors</option>
                        {Array.from(
                            new Set(stocks.map((s) => s.color?.toLowerCase()))
                        )
                            .filter(Boolean)
                            .map((color) => (
                                <option key={color} value={color}>
                                    {color.charAt(0).toUpperCase() +
                                        color.slice(1)}
                                </option>
                            ))}
                    </select>
                </div>

                <div className="overflow-x-auto bg-white rounded-xl shadow-md border">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-[#ed1c24] text-white">
                            <tr>
                                {[
                                    "Code",
                                    "Color",
                                    "Printer",
                                    "Location",
                                    "Status",
                                    "Actions",
                                ].map((heading) => (
                                    <th
                                        key={heading}
                                        className={`px-6 py-3 text-sm font-semibold ${
                                            heading === "Actions"
                                                ? "text-center"
                                                : "text-left"
                                        }`}
                                    >
                                        {heading}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {filteredToners.length ? (
                                filteredToners.map((toner) => (
                                    <tr
                                        key={toner.id_toner}
                                        className="hover:bg-gray-50"
                                    >
                                        <td className="px-6 py-4 font-medium text-gray-900">
                                            {toner.stock?.code || "N/A"}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div
                                                className={`w-6 h-6 rounded-full inline-block ${getColorClass(
                                                    toner.stock?.color
                                                )}`}
                                                title={
                                                    toner.stock?.color ||
                                                    "Unknown"
                                                }
                                            />
                                        </td>
                                        <td className="px-6 py-4 text-gray-700">
                                            {toner.printer?.name || "—"}
                                        </td>
                                        <td className="px-6 py-4 text-gray-700 flex items-center gap-2">
                                            <FaMapMarkerAlt className="text-[#ed1c24]" />
                                            {toner.printer?.location?.name ||
                                                "—"}
                                        </td>
                                        <td className="px-6 py-4">
                                            {toner.printer ? (
                                                <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium text-green-700 bg-green-100 rounded-full">
                                                    <FiCheckCircle size={14} />
                                                    Assigned
                                                </span>
                                            ) : (
                                                <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium text-gray-600 bg-gray-200 rounded-full">
                                                    <FiMinusCircle size={14} />
                                                    Unassigned
                                                </span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 text-center flex justify-center gap-2">
                                            <button
                                                onClick={() =>
                                                    openModal("assign", toner)
                                                }
                                                disabled={toner?.printer}
                                                className={`px-5 py-2 rounded-lg font-semibold text-white transition shadow-md ${
                                                    toner?.printer
                                                        ? "bg-[#ed1c24]/50 cursor-not-allowed"
                                                        : "bg-[#ed1c24] hover:bg-[#c8141b]"
                                                }`}
                                            >
                                                Assign
                                            </button>

                                            <button
                                                onClick={() =>
                                                    openModal("delete", toner)
                                                }
                                                className="px-3 py-1 text-sm text-gray-600 border border-gray-300 rounded-md hover:bg-gray-100 transition"
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td
                                        colSpan="7"
                                        className="text-center py-6 text-gray-500"
                                    >
                                        No toners found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Modals */}
            {modalType === "add-edit" && (
                <AddEditTonerModal
                    toner={selectedToner}
                    stocks={stocks}
                    onClose={closeModal}
                    onSave={handleAddToner}
                />
            )}
            {modalType === "assign" && (
                <AssignTonerModal
                    toner={selectedToner}
                    printers={printers}
                    onClose={closeModal}
                    onAssign={handleAssignToner}
                />
            )}
            {modalType === "delete" && (
                <DeleteConfirmModal
                    itemName={`toner ${selectedToner?.stock?.code}`}
                    onConfirm={() => handleDeleteToner(selectedToner.id_toner)}
                    onCancel={closeModal}
                />
            )}
        </Layout>
    );
};

export default Toners;
