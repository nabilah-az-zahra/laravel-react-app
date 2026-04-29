import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
    LayoutDashboard, FileText, Stethoscope,
    Building2, Mail, Calendar, ShieldCheck, LogOut, X
} from 'lucide-react';

const Sidebar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [showLogoutModal, setShowLogoutModal] = useState(false);

    const handleLogout = async () => {
        await logout();
        navigate('/login');
    };

    const navItems = [
        { path: '/dashboard', label: 'Overview', icon: LayoutDashboard },
        { path: '/dashboard/posts', label: 'Posts', icon: FileText },
        { path: '/dashboard/doctors', label: 'Doctors', icon: Stethoscope },
        { path: '/dashboard/services', label: 'Services', icon: Building2 },
        { path: '/dashboard/messages', label: 'Messages', icon: Mail },
        { path: '/dashboard/appointments', label: 'Appointments', icon: Calendar },
        { path: '/dashboard/admins', label: 'Admin Management', icon: ShieldCheck },
    ];

    return (
        <>
            <div className="w-64 bg-slate-800 min-h-screen flex flex-col font-neue">
                <div className="p-6 border-b border-slate-700">
                    <h1 className="text-xl font-bold text-white">HOSPITAL</h1>
                    <p className="text-slate-400 text-xs mt-1">Admin Dashboard</p>
                </div>
                <nav className="flex-1 p-4 space-y-1">
                    {navItems.map(item => {
                        const Icon = item.icon;
                        return (
                            <NavLink
                                key={item.path}
                                to={item.path}
                                end={item.path === '/dashboard'}
                                className={({ isActive }) =>
                                    `flex items-center gap-3 px-4 py-3 text-sm font-medium transition-colors cursor-pointer ${
                                        isActive
                                            ? 'text-white bg-[#0060BF]'
                                            : 'text-slate-400 hover:bg-slate-700 hover:text-white'
                                    }`
                                }
                            >
                                <Icon size={16} />
                                {item.label}
                            </NavLink>
                        );
                    })}
                </nav>
                <div className="p-4 border-t border-slate-700">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="w-8 h-8 bg-[#0060BF] flex items-center justify-center shrink-0">
                            <span className="text-white text-xs font-bold">
                                {user?.name?.charAt(0).toUpperCase()}
                            </span>
                        </div>
                        <div className="min-w-0">
                            <p className="text-white text-sm font-medium truncate">{user?.name}</p>
                            <p className="text-slate-400 text-xs truncate">{user?.email}</p>
                        </div>
                    </div>
                    <button
                        onClick={() => setShowLogoutModal(true)}
                        className="w-full flex items-center gap-3 px-4 py-2 text-sm text-slate-400 hover:bg-slate-700 hover:text-white transition-colors cursor-pointer"
                    >
                        <LogOut size={16} />
                        Logout
                    </button>
                </div>
            </div>
            {showLogoutModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-200">
                    <div className="bg-white w-full max-w-sm mx-4">
                        <div className="flex items-center justify-between px-8 py-5 border-b border-slate-100">
                            <h2 className="text-lg font-bold text-slate-800">Sign Out</h2>
                            <button onClick={() => setShowLogoutModal(false)} className="text-slate-400 hover:text-slate-600 transition-colors cursor-pointer">
                                <X size={18} />
                            </button>
                        </div>
                        <div className="px-8 py-6">
                            <div className="w-14 h-14 bg-slate-100 flex items-center justify-center mx-auto mb-4">
                                <LogOut size={24} className="text-slate-500" />
                            </div>
                            <p className="text-slate-800 font-semibold text-center mb-2">Are you sure you want to sign out?</p>
                            <p className="text-slate-400 text-sm text-center">You will be redirected to the login page.</p>
                        </div>
                        <div className="flex gap-3 px-8 pb-8">
                            <button
                                onClick={() => setShowLogoutModal(false)}
                                className="flex-1 bg-slate-100 text-slate-700 py-2.5 hover:bg-slate-200 transition-colors text-sm font-medium cursor-pointer"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleLogout}
                                className="flex-1 bg-[#0060BF] hover:bg-[#004E9C] text-white py-2.5 text-sm font-medium transition-colors cursor-pointer"
                            >
                                Sign Out
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Sidebar;