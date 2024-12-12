import React from "react";
import { useSelector } from "react-redux";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./Login";
import SearchBar from "./SearchBar";

const RouteHome = () => {
    const isAuthenticated = useSelector(state => state?.auth?.isAuthenticated);

    return (
        <Routes>
            {!isAuthenticated ? (
                <>
                    <Route path="/login" element={<Login />} />
                    <Route path="*" element={<Navigate to="/login" />} />
                </>
            ) : (
                <>
                    {/* If authenticated, redirect /login to home */}
                    <Route path="/login" element={<Navigate to="/" />} />
                    <Route path="/" element={<SearchBar />} />
                    <Route path="/search" element={<SearchBar />} />
                    <Route path="/search_by_date" element={<SearchBar />} />
                    <Route path="*" element={<Navigate to="/" />} />
                </>
            )}
        </Routes>
    );
};

export default RouteHome;
