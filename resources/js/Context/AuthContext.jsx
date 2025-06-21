    import React, { createContext, useState, useEffect, useContext } from 'react';
    import axios from 'axios';
    import { router } from '@inertiajs/react';

    const AuthContext = createContext();

    export const AuthProvider = ({ children }) => {
        const [admin, setAdmin] = useState(null);
        const [loading, setLoading] = useState(true);

        useEffect(() => {
            const checkSession = async () => {
                try {
                    const response = await axios.get('/api/admin/session'); // Create this route in Laravel
                    if (response.data.admin) {
                        setAdmin(response.data.admin);
                    }
                } catch (error) {
                    console.error("Error checking session:", error);
                } finally {
                    setLoading(false);
                }
            };

            checkSession();
        }, []);

        const login = (adminData) => {
            setAdmin(adminData);
        };

        const logout = async () => {
            try {
                await axios.post('/admin/logout');
                setAdmin(null);
                router.visit('/admin-login'); // Use Inertia's router for navigation
            } catch (error) {
                console.error("Error logging out:", error);
            }
        };

        const value = {
            admin,
            login,
            logout,
            loading,
        };

        return (
            <AuthContext.Provider value={value}>
                {!loading && children}
            </AuthContext.Provider>
        );
    };

    export const useAuth = () => useContext(AuthContext);
    