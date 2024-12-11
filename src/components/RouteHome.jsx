import React from 'react';
import { useSelector } from 'react-redux';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './Login';
import SearchBar from './SearchBar';

const RouteHome = () => {
    const isAuthenticated = useSelector((state) => state?.auth?.isAuthenticated);
    console.log("isAuth", isAuthenticated)

    return (
        // <Routes>
        //     {/* Redirect to home if already logged in and navigates to login */}
        //     {isAuthenticated && <Route path="/login" element={<Navigate to="/" />} />}

        //     {/* Redirect to login if not authenticated */}
        //     {!isAuthenticated && <Route path="*" element={<Navigate to="/login" />} />}

        //     {/* Define routes */}
        //     <Route path="/login" element={<Login />} />
        //     <Route path="/" element={<SearchBar />} />
        // </Routes>
        <Routes>
        {/* Redirect to home if already logged in and navigates to login */}
        {isAuthenticated && <Route path="/login" element={<Navigate to="/" />} />}

        {/* Redirect to login if not authenticated */}
        {!isAuthenticated && <Route path="/" element={<Navigate to="/login" />} />}

        {/* Define routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<SearchBar />} />

        {/* Redirect all other paths to login */}
        {!isAuthenticated && <Route path="*" element={<Navigate to="/login" />} />}
        {isAuthenticated && <Route path="*" element={<Navigate to="/" />} />}
    </Routes>
    );
};

export default RouteHome;
