import type React from "react"
import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    const isLogin = true; 
    const location = useLocation();

    if (!isLogin) {
        return <Navigate to="/auth" state={{ from: location }} replace />;
    }
    
    return <>{children}</>;
}

export default ProtectedRoute;
