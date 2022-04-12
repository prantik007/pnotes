import React from "react";
import { auth } from './../Firebase/config';
import { useAuth } from './../Context/AuthContext';
import Dashboard from "./Dashboard";
import { useNavigate } from 'react-router-dom';

const ProtectedRoute = ({children}) => {
    const auth=useAuth();
    const navigate=useNavigate();

    if(!auth){
        navigate('/login')
        
    }
    return children;
};

export default ProtectedRoute;
