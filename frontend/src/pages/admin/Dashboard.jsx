import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminLayout from '../../components/AdminLayout';
import axios from '../../api/axios';
import { FileText, Stethoscope, Building2, Mail, Calendar, ArrowRight, User } from 'lucide-react';

const Dashboard = () => {
    const navigate = useNavigate();
    const [posts, setPosts] = useState([]);
    const [messages, setMessages] = useState([]);
    const [doctors, setDoctors] = useState([]);
    const [services, setServices] = useState([]);
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [postsRes, messagesRes, doctorsRes, servicesRes, appointmentsRes] = await Promise.all([
                    axios.get('/posts'),
                    axios.get('/messages'),
                    axios.get('/doctors'),
                    axios.get('/services'),
                    axios.get('/appointments'),
                ]);
                setPosts(postsRes.data.data);
                setMessages(messagesRes.data.data);
                setDoctors(doctorsRes.data.data);
                setServices(servicesRes.data.data);
                setAppointments(appointmentsRes.data.data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    if (loading) return (
        <AdminLayout>
            <div className="flex items-center justify-center h-64">
                <div className="flex flex-col items-center gap-3">
                    <div className="w-8 h-8 border-2 border-[#0060BF] border-t-transparent rounded-full animate-spin" />
                    <p className="text-slate-400 text-sm">Loading dashboard...</p>
                </div>
            </div>
        </AdminLayout>
    );

    const stats = [
        { label: 'Total Posts', value: posts.length, icon: FileText, bg: 'bg-blue-50', text: 'text-[#0060BF]', link: '/dashboard/posts', change: 'Manage articles' },
        { label: 'Total Doctors', value: doctors.length, icon: Stethoscope, bg: 'bg-emerald-50', text: 'text-emerald-600', link: '/dashboard/doctors', change: 'Manage doctors' },
        { label: 'Total Services', value: services.length, icon: Building2, bg: 'bg-purple-50', text: 'text-purple-600', link: '/dashboard/services', change: 'Manage services' },
        { label: 'Unread Messages', value: messages.filter(m => !m.is_read).length, icon: Mail, bg: 'bg-orange-50', text: 'text-orange-600', link: '/dashboard/messages', change: `${messages.length} total messages` },
        { label: 'Pending Appointments', value: appointments.filter(a => a.status === 'pending').length, icon: Calendar, bg: 'bg-red-50', text: 'text-red-600', link: '/dashboard/appointments', change: `${appointments.length} total appointments` },
    ];

    const getStatusColor = (status) => {
        switch (status) {
            case 'pending': return 'bg-orange-50 text-orange-600';
            case 'confirmed': return 'bg-green-50 text-green-600';
            case 'cancelled': return 'bg-red-50 text-red-600';
            default: return 'bg-slate-50 text-slate-600';
        }
    };

    return (
        <AdminLayout>
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-slate-800">Dashboard Overview</h1>
                    <p className="text-slate-400 text-sm mt-1">
                        {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                    </p>
                </div>
                <button
                    onClick={() => navigate('/dashboard/appointments')}
                    className="bg-[#0060BF] hover:bg-[#004E9C] text-white px-5 py-2.5 text-sm font-medium flex items-center gap-2 transition-colors cursor-pointer"
                >
                    <Calendar size={16} />
                    View Appointments
                </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
                {stats.map(stat => {
                    const Icon = stat.icon;
                    return (
                        <div
                            key={stat.label}
                            onClick={() => navigate(stat.link)}
                            className="bg-white p-5 shadow-sm border border-slate-100 cursor-pointer hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 group"
                        >
                            <div className="flex items-center justify-between mb-4">
                                <div className={`w-10 h-10 ${stat.bg} flex items-center justify-center`}>
                                    <Icon size={18} className={stat.text} />
                                </div>
                                <ArrowRight size={14} className="text-slate-300 group-hover:text-slate-400 transition-colors" />
                            </div>
                            <p className="text-2xl font-bold text-slate-800">{stat.value}</p>
                            <p className="text-slate-500 text-xs font-medium mt-0.5">{stat.label}</p>
                            <p className={`text-xs mt-2 ${stat.text}`}>{stat.change}</p>
                        </div>
                    );
                })}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2 bg-white shadow-sm border border-slate-100 overflow-hidden">
                    <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
                        <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wider">Recent Appointments</h2>
                        <button onClick={() => navigate('/dashboard/appointments')} className="text-xs text-[#0060BF] hover:text-[#004E9C] font-medium cursor-pointer flex items-center gap-1">
                            View All <ArrowRight size={12} />
                        </button>
                    </div>
                    {appointments.length === 0 ? (
                        <div className="p-8 text-center">
                            <Calendar size={32} className="text-slate-300 mx-auto mb-3" />
                            <p className="text-slate-400 text-sm">No appointments yet</p>
                        </div>
                    ) : (
                        <div className="divide-y divide-slate-50">
                            {appointments.slice(0, 5).map(appointment => (
                                <div key={appointment.id} className="flex items-center gap-4 px-6 py-4 hover:bg-slate-50 transition-colors">
                                    <div className="w-9 h-9 bg-blue-50 flex items-center justify-center shrink-0">
                                        <User size={16} className="text-[#0060BF]" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-semibold text-slate-800 truncate">{appointment.name}</p>
                                        <p className="text-xs text-slate-400 truncate">{appointment.doctor?.name} · {appointment.appointment_date}</p>
                                    </div>
                                    <div className="flex items-center gap-3 shrink-0">
                                        <p className="text-xs text-slate-400">{appointment.appointment_time}</p>
                                        <span className={`text-xs px-2.5 py-1 font-medium ${getStatusColor(appointment.status)}`}>
                                            {appointment.status}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
                <div className="space-y-6">
                    <div className="bg-white shadow-sm border border-slate-100 overflow-hidden">
                        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
                            <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wider">Messages</h2>
                            <button onClick={() => navigate('/dashboard/messages')} className="text-xs text-[#0060BF] hover:text-[#004E9C] font-medium cursor-pointer flex items-center gap-1">
                                View All <ArrowRight size={12} />
                            </button>
                        </div>
                        {messages.length === 0 ? (
                            <div className="p-6 text-center">
                                <p className="text-slate-400 text-sm">No messages yet</p>
                            </div>
                        ) : (
                            <div className="divide-y divide-slate-50">
                                {messages.slice(0, 4).map(message => (
                                    <div key={message.id} className="flex items-center gap-3 px-6 py-3 hover:bg-slate-50 transition-colors">
                                        <div className={`w-2 h-2 shrink-0 ${message.is_read ? 'bg-slate-200' : 'bg-[#0060BF]'}`} />
                                        <div className="flex-1 min-w-0">
                                            <p className={`text-xs truncate ${message.is_read ? 'text-slate-400' : 'text-slate-700 font-semibold'}`}>
                                                {message.name}
                                            </p>
                                            <p className="text-xs text-slate-400 truncate">{message.subject}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                    <div className="bg-white shadow-sm border border-slate-100 overflow-hidden">
                        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
                            <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wider">Recent Posts</h2>
                            <button onClick={() => navigate('/dashboard/posts')} className="text-xs text-[#0060BF] hover:text-[#004E9C] font-medium cursor-pointer flex items-center gap-1">
                                View All <ArrowRight size={12} />
                            </button>
                        </div>
                        {posts.length === 0 ? (
                            <div className="p-6 text-center">
                                <p className="text-slate-400 text-sm">No posts yet</p>
                            </div>
                        ) : (
                            <div className="divide-y divide-slate-50">
                                {posts.slice(0, 4).map(post => (
                                    <div key={post.id} className="flex items-center gap-3 px-6 py-3 hover:bg-slate-50 transition-colors">
                                        {post.image ? (
                                            <img src={`http://localhost:8000/storage/${post.image}`} alt={post.title} className="w-8 h-8 object-cover shrink-0" />
                                        ) : (
                                            <div className="w-8 h-8 bg-blue-50 flex items-center justify-center shrink-0">
                                                <FileText size={14} className="text-[#0060BF]" />
                                            </div>
                                        )}
                                        <div className="min-w-0">
                                            <p className="text-xs font-medium text-slate-700 truncate">{post.title}</p>
                                            <p className="text-xs text-slate-400">{new Date(post.created_at).toLocaleDateString()}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
};

export default Dashboard;