import React, { useEffect } from "react";
import Layout from "@/Layouts/Layout";
import { useAuth } from "@/Context/AuthContext";
import { router } from "@inertiajs/react";

const Requests = ({ requests }) => {
    const { admin, loading } = useAuth();

    useEffect(() => {
        if (!admin && !loading) {
            router.visit("/admin-login"); // Redirect if no admin
        }
    }, [admin, loading]);

    if (loading) {
        return <div>Loading...</div>; // Show spinner or loading text
    }

    if (!admin) {
        return null; // Don’t render if not admin (redirecting)
    }

    // Defensive check in case requests is undefined or null
    const requestList = Array.isArray(requests) ? requests : [];

    return (
        <Layout>
            <div>
                <h1 className="text-3xl font-bold text-[#ed1c24] mb-6">
                    Toner Requests
                </h1>
                <table className="min-w-full border border-gray-300 rounded-md">
                    <thead className="bg-[#ed1c24] text-white">
                        <tr>
                            <th className="py-2 px-4 text-left">ID</th>
                            <th className="py-2 px-4 text-left">Full Name</th>
                            <th className="py-2 px-4 text-left">Printer</th>
                            <th className="py-2 px-4 text-left">Toner Model</th>
                            <th className="py-2 px-4 text-left">Reason</th>
                            <th className="py-2 px-4 text-left">Date</th>
                            <th className="py-2 px-4 text-left">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {requestList.length === 0 ? (
                            <tr>
                                <td colSpan="6" className="text-center py-4">
                                    No requests yet.
                                </td>
                            </tr>
                        ) : (
                            requestList.map((req) => (
                                <tr
                                    key={req.id_request}
                                    className="border-t border-gray-300"
                                >
                                    <td className="py-2 px-4">
                                        {req.id_request}
                                    </td>
                                    <td className="py-2 px-4">
                                        {req.full_name}
                                    </td>
                                    <td className="py-2 px-4">
                                        {req.printer?.name || "N/A"}
                                    </td>
                                    <td className="py-2 px-4">
                                        {req.stock?.code || "N/A"} (
                                        {req.stock?.color || ""})
                                    </td>
                                    <td className="py-2 px-4">
                                        {req.note || "-"}
                                    </td>
                                    <td className="py-2 px-4">
                                        {new Date(
                                            req.created_at
                                        ).toLocaleDateString()}
                                    </td>
                                    <td className="py-2 px-4">
                                        {req.status !== "approved" ? (
                                            <button
                                                onClick={() =>
                                                    router.post(
                                                        route(
                                                            "requests.fulfill",
                                                            req.id_request
                                                        )
                                                    )
                                                }
                                                className="bg-green-600 hover:bg-green-700 text-white text-xs px-3 py-1 rounded-md"
                                            >
                                                Fulfill
                                            </button>
                                        ) : (
                                            <span className="text-green-600 font-semibold text-sm">
                                                Fulfilled
                                            </span>
                                        )}
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </Layout>
    );
};

export default Requests;
