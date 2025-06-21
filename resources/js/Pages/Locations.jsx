import React, { useEffect, useState } from "react";
import Layout from "@/Layouts/Layout";
import { useAuth } from "@/Context/AuthContext";
import { router, usePage } from "@inertiajs/react";
import axios from "axios";
import { AiOutlinePlus, AiOutlineDelete } from "react-icons/ai";
import { HiOutlineOfficeBuilding } from "react-icons/hi";

const Locations = () => {
    const { admin, loading } = useAuth();
    const { props } = usePage();

    const [locations, setLocations] = useState(props.locations || []);
    const [newLocation, setNewLocation] = useState("");
    const [search, setSearch] = useState("");
    const [deleteTarget, setDeleteTarget] = useState(null);

    useEffect(() => {
        if (!admin && !loading) {
            router.visit("/admin-login");
        }
    }, [admin, loading]);

    const handleAddLocation = async () => {
        if (!newLocation.trim()) return;
        try {
            const response = await axios.post("/locations", { name: newLocation });
            setLocations((prev) => [...prev, response.data]);
            setNewLocation("");
        } catch (err) {
            console.error("Failed to add location:", err);
        }
    };

    const handleDelete = async () => {
        if (!deleteTarget) return;
        try {
            await axios.delete(`/locations/${deleteTarget.id_location}`);
            setLocations((prev) => prev.filter((loc) => loc.id_location !== deleteTarget.id_location));
            setDeleteTarget(null);
        } catch (err) {
            console.error("Failed to delete location:", err);
        }
    };

    const filtered = locations.filter((loc) =>
        loc.name.toLowerCase().includes(search.toLowerCase())
    );

    if (loading) return <div className="p-6">Loading...</div>;
    if (!admin) return null;

    return (
        <Layout>
            <div className="p-6 space-y-10 bg-white min-h-screen">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                        <h2 className="text-3xl font-bold text-[#ed1c24] flex items-center gap-2">
                             Locations
                        </h2>
                        <p className="text-gray-600 text-sm mt-1">Manage all printer locations.</p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                        <input
                            type="text"
                            value={newLocation}
                            onChange={(e) => setNewLocation(e.target.value)}
                            placeholder="New location name..."
                            className="px-4 py-2 border rounded-lg w-full sm:w-64 focus:ring-[#ed1c24] focus:border-[#ed1c24]"
                        />
                        <button
                            onClick={handleAddLocation}
                            className="bg-[#ed1c24] text-white px-4 py-2 rounded-lg hover:bg-[#c8141b] transition"
                        >
                            <AiOutlinePlus className="inline-block mr-1" />
                            Add
                        </button>
                    </div>
                </div>

                {/* Search Bar */}
                <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search locations..."
                    className="w-full max-w-md px-4 py-2 border rounded-lg focus:ring-[#ed1c24] focus:border-[#ed1c24]"
                />

                {/* Locations */}
                <div className="space-y-6">
                    {filtered.map((loc) => (
                        <div
                            key={loc.id_location}
                            className="border border-gray-200 rounded-lg p-6 shadow-sm bg-white hover:shadow-md transition"
                        >
                            <div className="flex justify-between items-center">
                                <div>
                                    <h3 className="text-xl font-semibold text-[#ed1c24]">{loc.name}</h3>
                                    <div className="mt-2 text-sm text-gray-600 space-y-1">
                                        {loc.printers && loc.printers.length > 0 ? (
                                            loc.printers.map((printer) => (
                                                <div key={printer.id}>
                                                    🖨️ {printer.name}{" "}
                                                    <span className="text-xs text-gray-400">({printer.type})</span>
                                                </div>
                                            ))
                                        ) : (
                                            <p className="italic text-gray-400">No printers assigned.</p>
                                        )}
                                    </div>
                                </div>
                                <button
                                    onClick={() => setDeleteTarget(loc)}
                                    className="text-sm text-white bg-red-500 hover:bg-red-600 px-3 py-1 rounded-md transition"
                                >
                                    <AiOutlineDelete className="inline-block mr-1" />
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* No Results */}
                {filtered.length === 0 && (
                    <p className="mt-8 text-gray-500 text-center text-sm">No locations found.</p>
                )}

                {/* Confirm Delete Modal */}
                {deleteTarget && (
                    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center">
                        <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
                            <h3 className="text-xl font-bold text-gray-800 mb-2">Delete Location</h3>
                            <p className="text-gray-600 mb-6">
                                Are you sure you want to delete{" "}
                                <span className="text-[#ed1c24] font-medium">{deleteTarget.name}</span>?
                            </p>
                            <div className="flex justify-end gap-3">
                                <button
                                    onClick={() => setDeleteTarget(null)}
                                    className="px-4 py-2 text-gray-600 hover:text-gray-800 border rounded-md"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleDelete}
                                    className="px-4 py-2 bg-red-500 text-white hover:bg-red-600 rounded-md"
                                >
                                    Confirm Delete
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </Layout>
    );
};

export default Locations;
