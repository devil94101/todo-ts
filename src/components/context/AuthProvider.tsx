import { createContext, FC, ReactNode, useState } from "react";
import { AuthContextType, IAuth } from "../../types/auth.types";

const AuthContext = createContext<AuthContextType | null>(null);
// localStorage.getItem('isLogin')?true:false

export default AuthContext;

export const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [auth, setAuth] = useState<IAuth | null>(localStorage.getItem("userDetails")?JSON.parse(localStorage.getItem("userDetails") || ''):null);

    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    )
}
