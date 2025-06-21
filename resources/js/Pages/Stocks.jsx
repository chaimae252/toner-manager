import React, { useEffect, useState } from "react";
import Layout from "@/Layouts/Layout";
import { useAuth } from "@/Context/AuthContext";
import { router, usePage } from "@inertiajs/react";
import axios from "axios";
import { AiOutlinePlus, AiOutlineDelete } from "react-icons/ai";
import { BiPackage } from "react-icons/bi";
import AddStockModal from "@/Components/AddStockModal";
import RestockModal from "@/Components/RestockModal";
import DeleteStockModal from "@/Components/DeleteStockModal";

const Stocks = () => {
    const { admin, loading } = useAuth();
    const { props } = usePage();

    const [search, setSearch] = useState("");
    const [stocks, setStocks] = useState(props.stocks || []);

    // Modal states
    const [showAddModal, setShowAddModal] = useState(false);
    const [newStock, setNewStock] = useState({
        code: "",
        color: "",
        quantity: 1,
    });
    const [restockId, setRestockId] = useState(null);
    const [deleteId, setDeleteId] = useState(null);

    useEffect(() => {
        if (!admin && !loading) {
            router.visit("/admin-login");
        }

        if (admin) {
            fetchStocks();
        }
    }, [admin, loading]);

    const fetchStocks = async () => {
        try {
            const response = await axios.get("/api/stocks");
            setStocks(response.data.stocks);
        } catch (error) {
            console.error("Failed to fetch stocks:", error);
        }
    };

    const filtered = (stocks || []).filter((stock) =>
        stock.code.toLowerCase().includes(search.toLowerCase())
    );

    const handleNewStockChange = (e) => {
        const { name, value } = e.target;
        setNewStock((prev) => ({
            ...prev,
            [name]: name === "quantity" ? parseInt(value) || 1 : value,
        }));
    };

    const handleAdd = async (stock) => {
        try {
            const response = await axios.post("/stocks", stock);
            setStocks((prev) => [...prev, response.data]);
            setNewStock({
                code: "",
                color: "",
                quantity: 1,
            });
            setShowAddModal(false);
        } catch (err) {
            console.error("Failed to add stock:", err);
        }
    };

    const handleRestock = async (id, amount) => {
        try {
            const response = await axios.post(`/stocks/${id}/restock`, {
                amount,
            });
            setStocks((prev) =>
                prev.map((stock) =>
                    stock.id_stock === id ? response.data : stock
                )
            );
            setRestockId(null);
        } catch (err) {
            console.error("Failed to restock:", err);
        }
    };

    const handleDelete = async (id) => {
        console.log("🔥 Deleting stock with id_stock:", id);
        try {
            await axios.delete(`/stocks/${id}`);
            setStocks((prev) => prev.filter((stock) => stock.id_stock !== id));
            setDeleteId(null);
        } catch (err) {
            console.error("Failed to delete stock:", err);
        }
    };

    if (loading) return <div className="p-6">Loading...</div>;
    if (!admin) return null;

    return (
        <Layout>
            <div className="p-6">
                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-3xl font-bold text-[#ed1c24]">Stock</h2>
                    <button
                        onClick={() => setShowAddModal(true)}
                        className="flex items-center gap-2 bg-[#ed1c24] text-white px-4 py-2 rounded-md hover:bg-[#c8141b] transition"
                    >
                        <AiOutlinePlus size={18} /> Add Stock
                    </button>
                </div>

                {/* Search */}
                <div className="mb-6">
                    <input
                        type="text"
                        placeholder="Search by model..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#ed1c24] focus:border-[#ed1c24] transition"
                    />
                </div>

                {/* Stock Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filtered.map((stock) => (
                        <div
                            key={stock.id_stock}
                            className="relative bg-white border shadow-md rounded-2xl p-5 hover:shadow-lg transition group"
                        >
                            {/* Action Buttons */}
                            <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition">
                                <button
                                    onClick={() => setRestockId(stock.id_stock)}
                                    className="text-[#22c55e] hover:text-[#16a34a]"
                                    title="Restock"
                                >
                                    <BiPackage size={18} />
                                </button>
                                <button
                                    onClick={() => {
                                        console.log(
                                            "🖱️ Delete button clicked with ID:",
                                            stock.id_stock
                                        );
                                        setDeleteId(stock.id_stock);
                                    }}
                                    className="text-[#ed1c24] hover:text-[#c8141b]"
                                    title="Delete"
                                >
                                    <AiOutlineDelete size={18} />
                                </button>
                            </div>

                            {/* Model */}
                            <h3 className="text-lg font-bold text-gray-800 mb-2">
                                {stock.code}
                            </h3>

                            {/* Color */}
                            <div className="flex items-center gap-2 mb-2">
                                <span
                                    className="inline-block w-3 h-3 rounded-full"
                                    style={{
                                        backgroundColor:
                                            stock.color.toLowerCase() ===
                                            "black"
                                                ? "#000"
                                                : stock.color.toLowerCase() ===
                                                  "cyan"
                                                ? "#00bcd4"
                                                : stock.color.toLowerCase() ===
                                                  "magenta"
                                                ? "#e91e63"
                                                : stock.color.toLowerCase() ===
                                                  "yellow"
                                                ? "#facc15"
                                                : "#9ca3af",
                                    }}
                                ></span>
                                <span className="text-sm text-gray-600 capitalize">
                                    {stock.color}
                                </span>
                            </div>

                            {/* Quantity */}
                            <div className="text-sm">
                                <span className="font-semibold text-gray-700">
                                    Quantity:
                                </span>{" "}
                                <span
                                    className={`inline-block px-2 py-1 ml-1 text-white text-xs rounded-md ${
                                        stock.available_toners_count < 5
                                            ? "bg-red-500"
                                            : stock.available_toners_count < 10
                                            ? "bg-yellow-500"
                                            : "bg-green-600"
                                    }`}
                                >
                                    {stock.available_toners_count}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>

                {filtered.length === 0 && (
                    <p className="mt-6 text-gray-500">No toner stocks found.</p>
                )}

                {/* Modals */}
                <AddStockModal
                    show={showAddModal}
                    onClose={() => setShowAddModal(false)}
                    stock={newStock}
                    onChange={handleNewStockChange}
                    onSubmit={(e) => {
                        e.preventDefault();
                        handleAdd(newStock);
                    }}
                />

                <RestockModal
                    show={restockId !== null}
                    stockId={restockId}
                    onClose={() => setRestockId(null)}
                    onRestock={handleRestock}
                />

                <DeleteStockModal
                    show={deleteId !== null}
                    stockId={deleteId}
                    onClose={() => setDeleteId(null)}
                    onDelete={handleDelete}
                />
            </div>
        </Layout>
    );
};

export default Stocks;
