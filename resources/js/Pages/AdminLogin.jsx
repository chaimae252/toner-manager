    import { useState } from "react";
    import axios from "axios";
    import { useAuth } from '@/Context/AuthContext'; // Import the hook
    import { router } from '@inertiajs/react';

    export default function AdminLogin() {
        const [form, setForm] = useState({ email: "", password: "" });
        const [error, setError] = useState(null);
        const { login } = useAuth(); // Use the context

        const handleChange = (e) => {
            setForm({ ...form, [e.target.name]: e.target.value });
        };

        const handleSubmit = async (e) => {
            e.preventDefault();
            setError(null);

            try {
                const response = await axios.post("/admin/login", form);

                if (response.status === 200) {
                    // Call the login function from the context
                    login(response.data); // Pass the admin data to the context
                    router.visit('/admin-dashboard'); // Use Inertia's router for navigation
                } else {
                    setError("Invalid email or password");
                }
            } catch (err) {
                setError("Invalid email or password");
            }
        };

        return (
            <div className="min-h-screen flex items-center justify-center bg-[#fef2f2] px-4">
                <div className="max-w-md w-full bg-white shadow-xl rounded-2xl p-10 border border-[#ed1c24]/20">
                    <h2 className="text-3xl font-extrabold text-center text-[#ed1c24] mb-8 tracking-tight">
                        Admin Login
                    </h2>

                    {error && (
                        <div className="mb-4 text-center text-sm text-red-600 font-medium">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Email</label>
                            <input
                                type="email"
                                name="email"
                                value={form.email}
                                onChange={handleChange}
                                required
                                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#ed1c24]/80 focus:border-[#ed1c24]/80"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Password</label>
                            <input
                                type="password"
                                name="password"
                                value={form.password}
                                onChange={handleChange}
                                required
                                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#ed1c24]/80 focus:border-[#ed1c24]/80"
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-[#ed1c24] hover:bg-[#c71018] text-white font-bold py-2 px-4 rounded-lg shadow-lg transition duration-300"
                        >
                            Sign In
                        </button>
                    </form>
                </div>
            </div>
        );
    }
    