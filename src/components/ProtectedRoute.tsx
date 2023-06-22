import React from 'react';
import { Navigate } from 'react-router-dom';
import { handleAccessToken } from '../api/auth';

const ProtectedRoute = ({ admin, children: Component }: { admin: boolean; children: JSX.Element }) => {
    const parseJwt = (token: string) => {
        try {
            return JSON.parse(atob(token.split('.')[1]));
        } catch (e) {
            return null;
        }
    };

    const handleExpire = (): boolean => {
        const accessToken = localStorage.getItem('accessToken');
        if (!accessToken) return false;

        const decodedJwt = parseJwt(accessToken);
        if (decodedJwt.exp * 1000 < Date.now()) {
            localStorage.removeItem('accessToken');
            localStorage.removeItem('userInfo');
            return false;
        }

        return true;
    };

    return handleExpire() ? Component : <Navigate to="/auth/login" />;
};

export default ProtectedRoute;
