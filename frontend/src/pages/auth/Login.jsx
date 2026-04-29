import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const { login } = useAuth();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            await login(formData);
            navigate('/dashboard');
        } catch (err) {
            setError(err.response?.data?.message || 'Invalid email or password');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-white flex">
            <div className="hidden md:flex flex-col justify-between w-1/2 bg-[#0060BF] p-16 relative overflow-hidden">
                <div
                    className="absolute inset-0 opacity-10"
                    style={{
                        backgroundImage: 'linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)',
                        backgroundSize: '40px 40px'
                    }}
                />
                <div className="relative z-10">
                    <p className="text-2xl font-bold text-white tracking-tight">HOSPITAL</p>
                    <p className="text-blue-300 text-xs mt-1">Admin Portal</p>
                </div>
                <div className="relative z-10">
                    <p className="text-[10rem] font-bold text-white/10 leading-none select-none">+</p>
                    <div className="flex gap-12 mt-4">
                        {[
                            { number: '500+', label: 'Doctors' },
                            { number: '24/7', label: 'Emergency' },
                            { number: '10K+', label: 'Patients' },
                        ].map(stat => (
                            <div key={stat.label}>
                                <p className="text-3xl font-bold text-white">{stat.number}</p>
                                <p className="text-blue-300 text-xs mt-1">{stat.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="relative z-10 border-t border-white/20 pt-6">
                    <p className="text-blue-200 text-xs">© 2026 HOSPITAL</p>
                </div>
            </div>
            <div className="flex-1 flex items-center justify-center px-8 py-16">
                <div className="w-full max-w-sm">
                    <div className="md:hidden mb-10">
                        <p className="text-xl font-bold text-[#0060BF] tracking-tight">HOSPITAL</p>
                        <p className="text-slate-400 text-xs mt-0.5">Admin Portal</p>
                    </div>
                    <div className="mb-10">
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-[0.25em] mb-3">Admin Access</p>
                        <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Sign In</h2>
                        <p className="text-slate-400 text-sm mt-2">Enter your credentials to access the dashboard.</p>
                    </div>
                    {error && (
                        <div className="border-l-4 border-red-500 pl-4 mb-8">
                            <p className="text-sm font-semibold text-slate-800">Sign in failed</p>
                            <p className="text-xs text-slate-400 mt-0.5">{error}</p>
                        </div>
                    )}
                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">
                                Email Address
                            </label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                placeholder="Enter your email"
                                className="block w-full px-4 py-3 border border-slate-300 text-slate-900 text-sm focus:outline-none focus:border-[#0060BF] transition-colors"
                            />
                        </div>
                        <div>
                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">
                                Password
                            </label>
                            <div className="relative">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                    placeholder="Enter your password"
                                    className="block w-full px-4 py-3 pr-12 border border-slate-300 text-slate-900 text-sm focus:outline-none focus:border-[#0060BF] transition-colors"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors text-xs cursor-pointer"
                                >
                                    {showPassword ? 'Hide' : 'Show'}
                                </button>
                            </div>
                        </div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-[#0060BF] text-white py-3 text-sm font-bold hover:bg-[#004E9C] transition-colors disabled:opacity-50 tracking-wide mt-2 cursor-pointer"
                        >
                            {loading ? 'SIGNING IN...' : 'SIGN IN →'}
                        </button>
                    </form>
                    <p className="text-slate-300 text-xs mt-12">© 2026 HOSPITAL. All rights reserved.</p>
                </div>
            </div>
        </div>
    );
};

export default Login;