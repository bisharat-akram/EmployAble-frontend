import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { getToken } from '../components/utilis/localStorage';
import { getApiWithAuth } from '../components/utilis/api';
import publicRoutes  from './PublicRouting';

const PrivateRouting = ({ children }) => {
    const [userType, setUserType] = useState(0);

    const userData = async () => {
        const response = await getApiWithAuth('me');
        if (!response.success) {
            setUserType(-1);
        } else {
            setUserType(response?.data?.user_type);
        }
    };

    useEffect(() => {
        const token = getToken();
        if (token) {
            userData();
        } else {
            setUserType(-1);
        }
    }, []);

    if (userType === 1) {
        if (window.location.pathname === '/user') {
            return children;
        } else {
            return <Navigate to="/user" />;
        }
    } else if (userType === 2) {
        if (window.location.pathname === '/employe') {
            return children;
        } else {
            return <Navigate to="/employe" />;
        }
    } else if (userType === -1) {
        if (publicRoutes.includes(window.location.pathname)) {
          return children
        }
        return <Navigate to="/" />;
    }
};

export default PrivateRouting;
