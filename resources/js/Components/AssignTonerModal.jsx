import React, { useState } from "react";

const AssignTonerModal = ({ toner, printers = [], onClose, onAssign }) => {
    const [selectedPrinterId, setSelectedPrinterId] = useState("");

    const handleAssign = (e) => {
        e.preventDefault();
        if (selectedPrinterId) {
            onAssign(parseInt(selectedPrinterId)); // 👈 make sure it's a number
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 backdrop-blur-sm">
            <div className="bg-white rounded-2xl p-8 w-full max-w-md shadow-2xl border border-[#ed1c24]/30">
                <h2 className="text-2xl font-extrabold mb-6 text-[#ed1c24] tracking-wide">
                    Assign Toner
                </h2>
                <form onSubmit={handleAssign} className="space-y-6">
                    <select
                        value={selectedPrinterId}
                        onChange={(e) => setSelectedPrinterId(e.target.value)}
                        className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#ed1c24] focus:border-[#ed1c24] transition"
                        required
                    >
                        <option value="" disabled>
                            Select Printer
                        </option>
                        {printers.map((printer) => (
                            <option
                                key={printer.id_printer}
                                value={printer.id_printer}
                            >
                                {printer.name}{" "}
                                {printer.location
                                    ? `(${printer.location.name})`
                                    : ""}
                            </option>
                        ))}
                    </select>

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
                            disabled={!selectedPrinterId}
                            className={`px-5 py-2 rounded-lg font-semibold text-white transition shadow-md ${
                                selectedPrinterId
                                    ? "bg-[#ed1c24] hover:bg-[#c8141b]"
                                    : "bg-[#ed1c24]/50 cursor-not-allowed"
                            }`}
                        >
                            Assign
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AssignTonerModal;
