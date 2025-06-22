import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const storedToken = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    const [token, setToken] = useState(storedToken || null);
    const [user, setUser] = useState(storedUser || null);

    const login = (user, token) => {
        setUser(user);
        setToken(token);
        localStorage.setItem("user", user);
        localStorage.setItem("token", token);
    };

    const logout = () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem("user");
        localStorage.removeItem("token");
    };

    return (
        <AuthContext.Provider value={{ user, token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
