import React, { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";

const EditPrinterModal = ({ show, onClose, printer, onSubmit, locations }) => {
    const [formData, setFormData] = useState({
        id_printer: "",
        name: "",
        serial_number: "",
        type: "",
        location_id: "",
    });

    // When the modal opens or printer changes, update local form state
    useEffect(() => {
        if (printer) {
            setFormData({
                id_printer: printer.id_printer || "",
                name: printer.name || "",
                serial_number: printer.serial_number || "",
                type: printer.type || "",
                location_id: printer.location_id || "",
            });
        }
    }, [printer]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

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

                <h2 className="text-2xl font-bold mb-4 text-[#ed1c24]">Edit Printer</h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block mb-1 text-sm font-medium text-gray-700">Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-md px-4 py-2"
                        />
                    </div>

                    <div>
                        <label className="block mb-1 text-sm font-medium text-gray-700">Serial Number</label>
                        <input
                            type="text"
                            name="serial_number"
                            value={formData.serial_number}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-md px-4 py-2"
                        />
                    </div>

                    <div>
                        <label className="block mb-1 text-sm font-medium text-gray-700">Type</label>
                        <select
                            name="type"
                            value={formData.type}
                            onChange={handleChange}
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
                            value={formData.location_id}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-md"
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

export default EditPrinterModal;
