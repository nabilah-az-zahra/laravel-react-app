import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Home from './pages/landing/Home';
import Dashboard from './pages/admin/Dashboard';

const ProtectedRoute = ({ children }) => {
    const { token } = useAuth();
    return token ? children : <Navigate to="/login" />;
};

const GuestRoute = ({ children }) => {
    const { token } = useAuth();
    return !token ? children : <Navigate to="/dashboard" />;
};

function App() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={
                <GuestRoute><Login /></GuestRoute>
            } />
            <Route path="/register" element={
                <GuestRoute><Register /></GuestRoute>
            } />
            <Route path="/dashboard" element={
                <ProtectedRoute><Dashboard /></ProtectedRoute>
            } />
        </Routes>
    );
}

export default App;