import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const CheckAuth = () => {
    const { auth } = useAuth();
    const location = useLocation();
    console.log("from loc", location)
    return (
        auth? <Outlet />
            : <Navigate to="/login" state={{ from: location }} replace />
    );
}

export default CheckAuth;