import React, { useState } from "react";
import { useForm } from "@inertiajs/react";
import toast, { Toaster } from "react-hot-toast";

const RequestToner = ({ printers, stock }) => {
    const [submitted, setSubmitted] = useState(false);

    const { data, setData, post, processing, reset, errors } = useForm({
        full_name: "",
        printer_id: "",
        stock_id: "",
        note: "",  // <-- your form state key is 'note'
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        post(route("request.toner.submit"), {
            onSuccess: () => {
                toast.success("Request submitted!");
                setSubmitted(true);
                reset();
            },
            onError: () => {
                toast.error("Something went wrong 😢");
            },
        });
    };

    return (
        <div className="min-h-screen bg-[#fef2f2] flex items-center justify-center px-2 py-8">
            <Toaster position="top-center" />
            <div className="w-full max-w-lg bg-white border border-[#ed1c24]/30 shadow-xl rounded-2xl p-6 space-y-4">
                <h1 className="text-2xl font-extrabold text-center text-[#ed1c24] mb-1">
                    🖨️ Request a Toner
                </h1>
                <p className="text-center text-gray-600 text-sm mb-2">
                    Fill this form to get a toner for your printer.
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Full name */}
                    <div>
                        <label className="block mb-1 text-sm font-medium text-gray-700">
                            Full Name
                        </label>
                        <input
                            type="text"
                            className="w-full px-3 py-2 text-sm border rounded-md focus:ring-[#ed1c24] focus:border-[#ed1c24]"
                            value={data.full_name}
                            onChange={(e) =>
                                setData("full_name", e.target.value)
                            }
                        />
                        {errors.full_name && (
                            <p className="text-xs text-red-500 mt-1">
                                {errors.full_name}
                            </p>
                        )}
                    </div>

                    {/* Printer */}
                    <div>
                        <label className="block mb-1 text-sm font-medium text-gray-700">
                            Printer
                        </label>
                        <select
                            className="w-full px-3 py-2 text-sm border rounded-md focus:ring-[#ed1c24] focus:border-[#ed1c24]"
                            value={data.printer_id}
                            onChange={(e) =>
                                setData("printer_id", e.target.value)
                            }
                        >
                            <option value="">-- Select Printer --</option>
                            {printers.map((printer) => (
                                <option key={printer.id_printer} value={printer.id_printer}>
                                    {printer.name} ({printer.location?.name})
                                </option>
                            ))}
                        </select>
                        {errors.printer_id && (
                            <p className="text-xs text-red-500 mt-1">
                                {errors.printer_id}
                            </p>
                        )}
                    </div>

                    {/* Toner */}
                    <div>
                        <label className="block mb-1 text-sm font-medium text-gray-700">
                            Toner Model
                        </label>
                        <select
                            className="w-full px-3 py-2 text-sm border rounded-md focus:ring-[#ed1c24] focus:border-[#ed1c24]"
                            value={data.stock_id}
                            onChange={(e) =>
                                setData("stock_id", e.target.value)
                            }
                        >
                            <option value="">-- Select Toner --</option>
                            {stock.map((s) => (
                                <option key={s.id_stock} value={s.id_stock}>
                                    {s.code} ({s.color})
                                </option>
                            ))}
                        </select>
                        {errors.stock_id && (
                            <p className="text-xs text-red-500 mt-1">
                                {errors.stock_id}
                            </p>
                        )}
                    </div>

                    {/* Reason */}
                    <div>
                        <label className="block mb-1 text-sm font-medium text-gray-700">
                            Reason (optional)
                        </label>
                        <textarea
                            className="w-full px-3 py-2 text-sm border rounded-md focus:ring-[#ed1c24] focus:border-[#ed1c24]"
                            rows="2"
                            value={data.note}  
                            onChange={(e) => setData("note", e.target.value)} 
                        ></textarea>
                        {errors.note && (
                            <p className="text-xs text-red-500 mt-1">
                                {errors.note}
                            </p>
                        )}
                    </div>

                    <button
                        type="submit"
                        disabled={processing}
                        className="w-full bg-[#ed1c24] hover:bg-[#c8141b] text-white font-bold text-sm py-2 rounded-md transition"
                    >
                        {processing ? "Submitting..." : "Submit Request"}
                    </button>
                </form>

                {submitted && (
                    <div className="text-center text-green-600 text-sm font-medium mt-2">
                        🎉 Request sent successfully!
                    </div>
                )}
            </div>
        </div>
    );
};

export default RequestToner;
