    import React, { useEffect } from 'react';
    import Layout from '@/Layouts/Layout';
    import Statistics from '@/Components/Statistics';
    import TonerChart from '@/Components/TonerChart';
    import InventoryHealth from '@/Components/InventoryHealth';
    import { useAuth } from '@/Context/AuthContext'; // Import the hook
    import { router } from '@inertiajs/react';

    const AdminDashboard = () => {
        const { admin, loading } = useAuth(); // Use the context

        useEffect(() => {
            if (!admin && !loading) {
                router.visit('/admin-login'); // Redirect if not logged in
            }
        }, [admin, loading]);

        if (loading) {
            return <div>Loading...</div>; // Or a spinner
        }

        if (!admin) {
            return null; // Or a redirect, handled by useEffect
        }

        return (
            <Layout>
                <div>
                    <Statistics/>
                </div>
                <div className="flex gap-6 mb-10">
                    <div className="w-[70%]">
                        <TonerChart />
                    </div>
                    <div className="w-[30%]">
                        <InventoryHealth />
                    </div>
                </div>
            </Layout>
        );
    };

    export default AdminDashboard;
    