import React, { useEffect, useState } from "react";
import Layout from "@/Layouts/Layout";
import { useAuth } from "@/Context/AuthContext";
import { router, usePage } from "@inertiajs/react";
import { AiOutlinePrinter, AiOutlinePlus } from "react-icons/ai";
import { FaMapMarkerAlt } from "react-icons/fa";
import EditPrinterModal from "@/Components/EditPrinterModal";
import AddPrinterModal from "@/Components/AddPrinterModal";

const Printers = () => {
    const { admin, loading } = useAuth();
    const { printers = [], locations = [] } = usePage().props || {};

    const [search, setSearch] = useState("");
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedPrinter, setSelectedPrinter] = useState(null);

    // 👇 NEW: form state for AddPrinterModal
    const [newPrinter, setNewPrinter] = useState({
        name: "",
        serial_number: "",
        type: "",
        location_id: "",
    });

    useEffect(() => {
        if (!admin && !loading) {
            router.visit("/admin-login");
        }
    }, [admin, loading]);

    if (loading) return <div className="p-6">Loading...</div>;
    if (!admin) return null;

    const filteredPrinters = printers.filter((printer) =>
        printer.name.toLowerCase().includes(search.toLowerCase())
    );

    const handleEdit = (printer) => {
        setSelectedPrinter({
            ...printer,
            location_id: printer.location?.id_location || "",
        });
        setIsEditModalOpen(true);
    };

    const handleDelete = (printerId) => {
        if (confirm("Are you sure you want to delete this printer?")) {
            router.delete(`/printers/${printerId}`, {
                onSuccess: () => console.log("Printer deleted!"),
                onError: (error) => console.error("Error deleting printer:", error),
            });
        }
    };

    // 👇 Handles typing in Add Printer form
    const handleAddChange = (e) => {
        const { name, value } = e.target;
        setNewPrinter((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // 👇 Submits new printer
    const handleAddSubmit = (formData) => {
        router.post("/printers", formData, {
            onSuccess: () => {
                setIsAddModalOpen(false);
                setNewPrinter({ name: "", serial_number: "", type: "", location_id: "" });
            },
            onError: (err) => console.error(err),
        });
    };

    const handleEditSubmit = (formData) => {
        router.put(`/printers/${formData.id_printer}`, formData, {
            onSuccess: () => setIsEditModalOpen(false),
            onError: (err) => console.error(err),
        });
    };

    return (
        <Layout>
            <div className="p-6">
                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-3xl font-bold text-[#ed1c24]">Printers</h2>
                    <button
                        onClick={() => {
                            setNewPrinter({ name: "", serial_number: "", type: "", location_id: "" });
                            setIsAddModalOpen(true);
                        }}
                        className="flex items-center gap-2 bg-[#ed1c24] text-white px-4 py-2 rounded-md hover:bg-[#c8141b] transition"
                    >
                        <AiOutlinePlus size={18} />
                        Add Printer
                    </button>
                </div>

                {/* Search Bar */}
                <div className="mb-6">
                    <input
                        type="text"
                        placeholder="Search printers..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#ed1c24] focus:border-[#ed1c24] transition"
                    />
                </div>

                {/* Printer Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredPrinters.length > 0 ? (
                        filteredPrinters.map((printer) => (
                            <div
                                key={printer.id_printer}
                                className="bg-white shadow-md rounded-2xl p-5 border hover:shadow-lg transition duration-300"
                            >
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="bg-[#ed1c24]/10 text-[#ed1c24] p-3 rounded-full">
                                        <AiOutlinePrinter size={24} />
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-800">{printer.name}</h3>
                                </div>
                                <div className="space-y-2 text-sm text-gray-600">
                                    <p>
                                        <span className="font-medium">Serial:</span> {printer.serial_number}
                                    </p>
                                    <p>
                                        <span className="font-medium">Type:</span> {printer.type}
                                    </p>
                                    <p className="flex items-center gap-2">
                                        <FaMapMarkerAlt className="text-[#ed1c24]" />
                                        <span>{printer.location?.name || "—"}</span>
                                    </p>
                                </div>
                                <div className="mt-4 flex gap-2">
                                    <button
                                        onClick={() => handleEdit(printer)}
                                        className="px-3 py-1 text-sm text-white bg-[#ed1c24] rounded-md hover:bg-[#c8141b] transition"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(printer.id_printer)}
                                        className="px-3 py-1 text-sm text-[#ed1c24] border border-[#ed1c24] rounded-md hover:bg-[#ed1c24]/10 transition"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-500">No printers found.</p>
                    )}
                </div>
            </div>

            {/* Modals */}
            <AddPrinterModal
                show={isAddModalOpen}
                onClose={() => setIsAddModalOpen(false)}
                printer={newPrinter}
                onChange={handleAddChange}
                onSubmit={(e) => {
                    e.preventDefault(); // ⛔ stop full-page reload
                    handleAddSubmit(newPrinter);
                }}
                locations={locations}
            />

            <EditPrinterModal
                show={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                printer={selectedPrinter}
                onSubmit={handleEditSubmit}
                locations={locations}
            />
        </Layout>
    );
};

export default Printers;
