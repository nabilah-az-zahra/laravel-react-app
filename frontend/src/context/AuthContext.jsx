import { createContext, useContext, useState } from 'react';
import axios from '../api/axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(
        JSON.parse(localStorage.getItem('user')) || null
    );
    const [token, setToken] = useState(
        localStorage.getItem('token') || null
    );

    const register = async (data) => {
        const response = await axios.post('/auth/register', data);
        setUser(response.data.user);
        setToken(response.data.token);
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        return response.data;
    };

    const login = async (data) => {
        const response = await axios.post('/auth/login', data);
        setUser(response.data.user);
        setToken(response.data.token);
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        return response.data;
    };

    const logout = async () => {
        await axios.post('/auth/logout');
        setUser(null);
        setToken(null);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    };

    return (
        <AuthContext.Provider value={{ user, token, register, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);