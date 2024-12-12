import React from 'react';
import { useSelector } from 'react-redux';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './Login';
import SearchBar from './SearchBar';

const RouteHome = () => {
    const isAuthenticated = useSelector((state) => state?.auth?.isAuthenticated);
    

    return (
       
        <Routes>
        {isAuthenticated && <Route path="/login" element={<Navigate to="/" />} />}

        {!isAuthenticated && <Route path="/" element={<Navigate to="/login" />} />}

        <Route path="/" element={<SearchBar />} />
                    <Route path="/search" element={<SearchBar />} />
                    <Route path="/search_by_date" element={<SearchBar />} />
                    <Route path="*" element={<Navigate to="/" />} />

        {!isAuthenticated && <Route path="*" element={<Navigate to="/login" />} />}
        {isAuthenticated && <Route path="*" element={<Navigate to="/" />} />}
    </Routes>
    );
};

export default RouteHome;
