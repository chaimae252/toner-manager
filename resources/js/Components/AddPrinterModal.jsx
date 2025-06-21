import React from "react";
import { AiOutlineClose } from "react-icons/ai";

const AddPrinterModal = ({ show, onClose, printer = {}, onChange, onSubmit, locations }) => {
    if (!show) return null;

    return (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-xl w-full max-w-lg relative shadow-lg">
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 text-gray-500 hover:text-[#ed1c24]"
                >
                    <AiOutlineClose size={20} />
                </button>

                <h2 className="text-2xl font-bold mb-4 text-[#ed1c24]">Add Printer</h2>

                <form onSubmit={onSubmit} className="space-y-4">
                    <div>
                        <label className="block mb-1 text-sm font-medium text-gray-700">Name</label>
                        <input
                            type="text"
                            name="name"
                            value={printer.name}
                            onChange={onChange}
                            className="w-full border border-gray-300 rounded-md px-4 py-2"
                        />
                    </div>

                    <div>
                        <label className="block mb-1 text-sm font-medium text-gray-700">Serial Number</label>
                        <input
                            type="text"
                            name="serial_number"
                            value={printer.serial_number}
                            onChange={onChange}
                            className="w-full border border-gray-300 rounded-md px-4 py-2"
                        />
                    </div>

                    <div>
                        <label className="block mb-1 text-sm font-medium text-gray-700">Type</label>
                        <select
                            name="type"
                            value={printer.type}
                            onChange={onChange}
                            className="w-full border border-gray-300 rounded-md px-4 py-2"
                        >
                            <option value="">-- Select Type --</option>
                            <option value="Large printer C450i">Large printer C450i</option>
                            <option value="Small printer 4702p">Small printer 4702p</option>
                            <option value="Small printer 5000i">Small printer 5000i</option>
                        </select>
                    </div>

                    <div>
                        <label className="block mb-1 text-sm font-medium text-gray-700">Location</label>
                        <select
                            name="location_id"
                            value={printer.location_id}
                            onChange={onChange}
                            className="w-full px-4 py-2 border rounded-md"
                            required
                        >
                            <option value="">Select a location</option>
                            {locations.map((location) => (
                                <option key={location.id_location} value={location.id_location}>
                                    {location.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="flex justify-end">
                        <button
                            type="submit"
                            className="bg-[#ed1c24] text-white px-4 py-2 rounded-md hover:bg-[#c8141b] transition"
                        >
                            Save Changes
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddPrinterModal;
