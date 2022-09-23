import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export const RequireAuth = () => {

    const { auth } = useAuth();
    const location = useLocation();
    

    return (
        
        auth.usuario ? < Outlet/> : <Navigate to="/" state={{from: location}} replace />
        
    );

}
