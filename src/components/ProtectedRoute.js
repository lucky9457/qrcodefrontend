import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem('token'); // Get the token from local storage
    return token ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
