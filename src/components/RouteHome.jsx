import React from 'react';
import { useSelector } from 'react-redux';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './Login';
import SearchBar from './SearchBar';

const RouteHome = () => {
    const isAuthenticated = useSelector((state) => state?.auth?.isAuthenticated);
    console.log("isAuth", isAuthenticated)

    return (
       
        <Routes>
        {isAuthenticated && <Route path="/login" element={<Navigate to="/" />} />}

        {!isAuthenticated && <Route path="/" element={<Navigate to="/login" />} />}

        <Route path="/login" element={<Login />} />
        <Route path="/" element={<SearchBar />} />

        {!isAuthenticated && <Route path="*" element={<Navigate to="/login" />} />}
        {isAuthenticated && <Route path="*" element={<Navigate to="/" />} />}
    </Routes>
    );
};

export default RouteHome;
