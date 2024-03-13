import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function ProtectedRoute({ component: Component, ...rest }) {
    const navigate = useNavigate();
    const isAuthenticated = sessionStorage.getItem('userType'); // replace this with your authentication check

    if (!isAuthenticated) {
        navigate('/'); // or wherever your login route is
        return null;
    }

    return <Component {...rest} />;
}