import { useState, useEffect } from 'react';
import axios from '../../api/axios';
import AdminLayout from '../../components/AdminLayout';
import { Calendar, Trash2, X, User, CheckCircle, XCircle } from 'lucide-react';

const AdminAppointments = () => {
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedAppointment, setSelectedAppointment] = useState(null);
    const [showDetailModal, setShowDetailModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deletingId, setDeletingId] = useState(null);
    const [updatingStatus, setUpdatingStatus] = useState(false);

    const fetchAppointments = async () => {
        try {
            const response = await axios.get('/appointments');
            setAppointments(response.data.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchAppointments(); }, []);

    const handleView = (appointment) => {
        setSelectedAppointment(appointment);
        setShowDetailModal(true);
    };

    const handleUpdateStatus = async (id, status) => {
        setUpdatingStatus(true);
        try {
            await axios.patch(`/appointments/${id}/status`, { status });
            await fetchAppointments();
            setShowDetailModal(false);
        } catch (err) {
            console.error(err);
        } finally {
            setUpdatingStatus(false);
        }
    };

    const handleDelete = async () => {
        try {
            await axios.delete(`/appointments/${deletingId}`);
            await fetchAppointments();
            setShowDeleteModal(false);
            setDeletingId(null);
        } catch (err) {
            console.error(err);
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'pending': return 'bg-orange-50 text-orange-600';
            case 'confirmed': return 'bg-green-50 text-green-600';
            case 'cancelled': return 'bg-red-50 text-red-600';
            default: return 'bg-slate-50 text-slate-600';
        }
    };

    const pendingCount = appointments.filter(a => a.status === 'pending').length;

    return (
        <AdminLayout>
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-slate-800">Appointments</h1>
                    <p className="text-slate-500 mt-1">
                        {pendingCount > 0 ? `${pendingCount} pending appointment${pendingCount > 1 ? 's' : ''}` : 'No pending appointments'}
                    </p>
                </div>
            </div>
            {showDetailModal && selectedAppointment && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white w-full max-w-lg mx-4 max-h-screen overflow-y-auto">
                        <div className="flex items-center justify-between px-8 py-5 border-b border-slate-100">
                            <h2 className="text-xl font-bold text-slate-800">Appointment Detail</h2>
                            <button onClick={() => setShowDetailModal(false)} className="text-slate-400 hover:text-slate-600 transition-colors cursor-pointer">
                                <X size={20} />
                            </button>
                        </div>
                        <div className="p-8 space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">Patient Name</p>
                                    <p className="text-sm font-medium text-slate-800 mt-1">{selectedAppointment.name}</p>
                                </div>
                                <div>
                                    <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">Gender</p>
                                    <p className="text-sm font-medium text-slate-800 mt-1 capitalize">{selectedAppointment.gender}</p>
                                </div>
                                <div>
                                    <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">Date of Birth</p>
                                    <p className="text-sm font-medium text-slate-800 mt-1">{new Date(selectedAppointment.birth_date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                                </div>
                                <div>
                                    <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">Phone</p>
                                    <p className="text-sm font-medium text-slate-800 mt-1">{selectedAppointment.phone}</p>
                                </div>
                                <div>
                                    <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">Email</p>
                                    <p className="text-sm font-medium text-slate-800 mt-1">{selectedAppointment.email}</p>
                                </div>
                                <div>
                                    <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">Status</p>
                                    <span className={`text-xs px-2 py-1 font-medium mt-1 inline-block ${getStatusColor(selectedAppointment.status)}`}>
                                        {selectedAppointment.status}
                                    </span>
                                </div>
                            </div>
                            <div>
                                <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">Address</p>
                                <p className="text-sm font-medium text-slate-800 mt-1">{selectedAppointment.address}</p>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">Doctor</p>
                                    <p className="text-sm font-medium text-slate-800 mt-1">{selectedAppointment.doctor?.name}</p>
                                    <p className="text-xs text-[#0060BF]">{selectedAppointment.doctor?.specialization}</p>
                                </div>
                                <div>
                                    <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">Schedule</p>
                                    <p className="text-sm font-medium text-slate-800 mt-1">{new Date(selectedAppointment.appointment_date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                                    <p className="text-xs text-slate-500">{selectedAppointment.appointment_time}</p>
                                </div>
                            </div>
                            <div>
                                <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">Symptoms</p>
                                <p className="text-sm text-slate-600 mt-1 leading-relaxed">{selectedAppointment.symptoms}</p>
                            </div>
                            {selectedAppointment.notes && (
                                <div>
                                    <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">Notes</p>
                                    <p className="text-sm text-slate-600 mt-1 leading-relaxed">{selectedAppointment.notes}</p>
                                </div>
                            )}
                        </div>
                        {selectedAppointment.status === 'pending' && (
                            <div className="flex gap-3 px-8 pb-4">
                                <button
                                    onClick={() => handleUpdateStatus(selectedAppointment.id, 'cancelled')}
                                    disabled={updatingStatus}
                                    className="flex-1 bg-red-50 text-red-600 py-2 hover:bg-red-100 transition-colors text-sm font-medium disabled:opacity-50 cursor-pointer flex items-center justify-center gap-2"
                                >
                                    <XCircle size={14} /> Cancel
                                </button>
                                <button
                                    onClick={() => handleUpdateStatus(selectedAppointment.id, 'confirmed')}
                                    disabled={updatingStatus}
                                    className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 text-sm font-medium disabled:opacity-50 transition-colors cursor-pointer flex items-center justify-center gap-2"
                                >
                                    <CheckCircle size={14} /> Confirm
                                </button>
                            </div>
                        )}
                        <div className="px-8 pb-8">
                            <button 
                                onClick={() => setShowDetailModal(false)} 
                                className="w-full bg-slate-100 text-slate-700 py-2 hover:bg-slate-200 transition-colors text-sm font-medium cursor-pointer"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
            {showDeleteModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-100">
                    <div className="bg-white w-full max-w-sm mx-4">
                        <div className="p-8 text-center">
                            <div className="w-16 h-16 bg-red-50 flex items-center justify-center mx-auto mb-4">
                                <Trash2 size={28} className="text-red-500" />
                            </div>
                            <h2 className="text-xl font-bold text-slate-800 mb-2">Delete Appointment</h2>
                            <p className="text-slate-500 text-sm mb-6">Are you sure you want to delete this appointment? This action cannot be undone.</p>
                            <div className="flex gap-3">
                                <button 
                                    onClick={() => { 
                                        setShowDeleteModal(false); 
                                        setDeletingId(null); 
                                    }} 
                                    className="flex-1 bg-slate-100 text-slate-700 py-2 hover:bg-slate-200 transition-colors text-sm font-medium cursor-pointer"
                                >
                                    Cancel
                                </button>
                                <button 
                                    onClick={handleDelete} 
                                    className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 text-sm font-medium transition-colors cursor-pointer"
                                >
                                    Delete Appointment
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            <div className="bg-white shadow-sm overflow-hidden">
                {loading ? (
                    <div className="p-8 text-center text-slate-500">Loading...</div>
                ) : appointments.length === 0 ? (
                    <div className="p-8 text-center">
                        <Calendar size={32} className="text-slate-300 mx-auto mb-3" />
                        <p className="text-slate-500 text-sm">No appointments yet.</p>
                    </div>
                ) : (
                    <table className="w-full">
                        <thead>
                            <tr className="bg-slate-50 border-b border-slate-100">
                                <th className="text-left px-6 py-4 text-sm font-semibold text-slate-600">Patient</th>
                                <th className="text-left px-6 py-4 text-sm font-semibold text-slate-600">Doctor</th>
                                <th className="text-left px-6 py-4 text-sm font-semibold text-slate-600">Schedule</th>
                                <th className="text-left px-6 py-4 text-sm font-semibold text-slate-600">Status</th>
                                <th className="text-left px-6 py-4 text-sm font-semibold text-slate-600">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {appointments.map(appointment => (
                                <tr key={appointment.id} className="border-b border-slate-50 hover:bg-slate-50 transition-colors">
                                    <td className="px-6 py-4">
                                        <p className="text-sm font-medium text-slate-800">{appointment.name}</p>
                                        <p className="text-xs text-slate-400">{appointment.email}</p>
                                    </td>
                                    <td className="px-6 py-4">
                                        <p className="text-sm font-medium text-slate-800">{appointment.doctor?.name}</p>
                                        <p className="text-xs text-[#0060BF]">{appointment.doctor?.specialization}</p>
                                    </td>
                                    <td className="px-6 py-4">
                                        <p className="text-sm text-slate-600">{new Date(appointment.appointment_date).toLocaleDateString()}</p>
                                        <p className="text-xs text-slate-400">{appointment.appointment_time}</p>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`text-xs px-2 py-1 font-medium ${getStatusColor(appointment.status)}`}>
                                            {appointment.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex gap-2">
                                            <button onClick={() => handleView(appointment)} className="px-3 py-1 bg-blue-50 text-[#0060BF] text-xs font-medium hover:bg-blue-100 transition-colors cursor-pointer">View</button>
                                            <button onClick={() => { setDeletingId(appointment.id); setShowDeleteModal(true); }} className="px-3 py-1 bg-red-50 text-red-600 text-xs font-medium hover:bg-red-100 transition-colors cursor-pointer">Delete</button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </AdminLayout>
    );
};

export default AdminAppointments;