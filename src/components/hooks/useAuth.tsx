import { useContext } from "react";
import { AuthContextType } from "../../types/auth.types";
import AuthContext from "../context/AuthProvider";

const useAuth = () => {
    let authData = useContext(AuthContext) as AuthContextType;
    return authData
}

export default useAuth;