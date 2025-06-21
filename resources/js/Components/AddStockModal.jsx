import React from "react";

const AddStockModal = ({ show, onClose, stock, onChange, onSubmit }) => {
    if (!show) return null;

    return (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex justify-center items-center">
            <div className="bg-white p-6 rounded-xl w-full max-w-md shadow-lg">
                <h2 className="text-xl font-bold mb-4 text-[#ed1c24]">
                    Add New Stock
                </h2>
                <form onSubmit={onSubmit} className="space-y-4">
                    <input
                        type="text"
                        name="code" // ← FIXED THIS
                        placeholder="Model"
                        value={stock.code}
                        onChange={onChange}
                        required
                        className="w-full border rounded-md px-3 py-2"
                    />

                    <input
                        type="text"
                        name="color"
                        placeholder="Color"
                        value={stock.color}
                        onChange={onChange}
                        required
                        className="w-full border rounded-md px-3 py-2"
                    />
                    <input
                        type="color"
                        name="hex"
                        value={stock.hex}
                        onChange={onChange}
                        className="w-full h-10"
                    />
                    <input
                        type="number"
                        name="quantity"
                        placeholder="Quantity"
                        value={stock.quantity}
                        onChange={onChange}
                        required
                        className="w-full border rounded-md px-3 py-2"
                        min={1}
                    />
                    <div className="flex justify-end gap-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 rounded-md border"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 rounded-md bg-[#ed1c24] text-white"
                        >
                            Add
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddStockModal;
