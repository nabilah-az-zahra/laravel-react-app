import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import Login from './pages/auth/Login';

import Home from './pages/landing/Home';
import Services from './pages/landing/Services';
import Doctors from './pages/landing/Doctors';
import News from './pages/landing/News';
import NewsDetail from './pages/landing/NewsDetail';
import Contact from './pages/landing/Contact';
import Appointment from './pages/landing/Appointment';

import Dashboard from './pages/admin/Dashboard';
import AdminPosts from './pages/admin/AdminPosts';
import AdminDoctors from './pages/admin/AdminDoctors';
import AdminServices from './pages/admin/AdminServices';
import AdminMessages from './pages/admin/AdminMessages';
import AdminAppointments from './pages/admin/AdminAppointments';
import AdminManagement from './pages/admin/AdminManagement';

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
            <Route path="/services" element={<Services />} />
            <Route path="/doctors" element={<Doctors />} />
            <Route path="/news" element={<News />} />
            <Route path="/news/:id" element={<NewsDetail />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/appointment" element={<Appointment />} />

            <Route path="/login" element={
                <GuestRoute><Login /></GuestRoute>
            } />

            <Route path="/dashboard" element={
                <ProtectedRoute><Dashboard /></ProtectedRoute>
            } />
            <Route path="/dashboard/posts" element={
                <ProtectedRoute><AdminPosts /></ProtectedRoute>
            } />
            <Route path="/dashboard/doctors" element={
                <ProtectedRoute><AdminDoctors /></ProtectedRoute>
            } />
            <Route path="/dashboard/services" element={
                <ProtectedRoute><AdminServices /></ProtectedRoute>
            } />
            <Route path="/dashboard/messages" element={
                <ProtectedRoute><AdminMessages /></ProtectedRoute>
            } />
            <Route path="/dashboard/appointments" element={
                <ProtectedRoute><AdminAppointments /></ProtectedRoute>
            } />
            <Route path="/dashboard/admins" element={
                <ProtectedRoute><AdminManagement /></ProtectedRoute>
            } />
        </Routes>
    );
}

export default App;