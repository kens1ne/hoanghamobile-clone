import React from 'react';
import { Navigate } from 'react-router-dom';

const Logout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('userInfo');
    return <Navigate to="/" />;
};

export default Logout;
