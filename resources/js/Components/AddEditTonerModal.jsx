import React, { useState, useEffect } from "react";

const AddEditTonerModal = ({ toner, onClose, stocks, onSave }) => {
    const [formData, setFormData] = useState({
        stock_id: toner?.stock?.id_stock?.toString() || "",
        yield_pages: "",
        quantity: "1", // 👈 new field
    });

    const isEditing = !!toner;

    // Auto-update yield_pages when stock_id changes
    useEffect(() => {
        const selectedStock = stocks.find(
            (s) => s.id_stock === parseInt(formData.stock_id)
        );
        if (selectedStock) {
            setFormData((prev) => ({
                ...prev,
                yield_pages: selectedStock.yield_pages,
            }));
        }
    }, [formData.stock_id, stocks]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.stock_id && formData.quantity) {
            onSave({
                stock_id: formData.stock_id,
                quantity: parseInt(formData.quantity), // 👈 make sure it's a number
            });
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 backdrop-blur-sm">
            <div className="bg-white rounded-2xl p-8 w-full max-w-md shadow-2xl border border-[#ed1c24]/30">
                <h2 className="text-2xl font-extrabold mb-6 text-[#ed1c24] tracking-wide">
                    {isEditing ? "Edit Toner" : "Add Toner"}
                </h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Select Stock Code */}
                    <select
                        name="stock_id"
                        value={formData.stock_id}
                        onChange={handleChange}
                        required
                        className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-800 focus:ring-[#ed1c24] focus:border-[#ed1c24]"
                    >
                        <option value="">Select Stock Code</option>
                        {stocks.map((stock) => (
                            <option key={stock.id_stock} value={stock.id_stock}>
                                {stock.code}
                            </option>
                        ))}
                    </select>

                    {/* Display matching color (read-only) */}
                    <input
                        type="text"
                        value={
                            stocks.find(
                                (s) =>
                                    s.id_stock === parseInt(formData.stock_id)
                            )?.color || ""
                        }
                        disabled
                        className="w-full border border-gray-200 rounded-lg px-4 py-3 text-gray-500 bg-gray-100"
                    />

                    {/* Yield Pages (auto-filled from stock) */}
                    <input
                        type="number"
                        name="yield_pages"
                        value={formData.yield_pages}
                        readOnly
                        placeholder="Yield (pages)"
                        className="w-full border border-gray-200 rounded-lg px-4 py-3 text-gray-600 bg-gray-100"
                    />
                    <input
                        type="number"
                        name="quantity"
                        min="1"
                        value={formData.quantity}
                        onChange={handleChange}
                        required
                        className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-800 focus:ring-[#ed1c24] focus:border-[#ed1c24]"
                        placeholder="Enter quantity to add"
                    />

                    {/* Buttons */}
                    <div className="flex justify-end gap-4 pt-4 border-t border-gray-200">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-5 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-5 py-2 rounded-lg bg-[#ed1c24] text-white font-semibold hover:bg-[#c8141b] transition shadow-md"
                        >
                            {isEditing ? "Update" : "Add"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddEditTonerModal;
