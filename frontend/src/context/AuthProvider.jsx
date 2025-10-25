import React, { createContext, useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext(null);

export default function AuthProvider({ children }) {
    const navigate = useNavigate();
    const [authData, setAuthData] = useState({
        isAuthenticated: false,
        token: null,
        user: null
    });

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        const storedToken = localStorage.getItem("token");

        if (storedUser && storedToken) {
            setAuthData({
                isAuthenticated: true,
                token: storedToken,
                user: storedUser
            });
        }

        setLoading(false);
    }, []);

    // Redirect after loading completes
    // useEffect(() => {
    //     if (!loading && !authData.isAuthenticated) {
    //         navigate("/login");
    //     }
    // }, [loading, authData.isAuthenticated, navigate]);

    const contextValue = useMemo(() => ({ authData, setAuthData }), [authData]);

    if (loading) return <div>Loading...</div>;

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
}