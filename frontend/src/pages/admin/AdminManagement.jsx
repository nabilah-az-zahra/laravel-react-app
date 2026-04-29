import { useState, useEffect } from 'react';
import axios from '../../api/axios';
import AdminLayout from '../../components/AdminLayout';
import { useAuth } from '../../context/AuthContext';
import { ShieldCheck, Trash2, X, Plus, User } from 'lucide-react';

const AdminManagement = () => {
    const { user } = useAuth();
    const [admins, setAdmins] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [editingAdmin, setEditingAdmin] = useState(null);
    const [formData, setFormData] = useState({ name: '', email: '', password: '', password_confirmation: '' });
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState('');
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deletingId, setDeletingId] = useState(null);

    const fetchAdmins = async () => {
        try {
            const response = await axios.get('/admins');
            setAdmins(response.data.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchAdmins(); }, []);

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleOpenCreate = () => {
        setEditingAdmin(null);
        setFormData({ name: '', email: '', password: '', password_confirmation: '' });
        setError('');
        setShowForm(true);
    };

    const handleOpenEdit = (admin) => {
        setEditingAdmin(admin);
        setFormData({ name: admin.name, email: admin.email, password: '', password_confirmation: '' });
        setError('');
        setShowForm(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        setError('');
        try {
            if (editingAdmin) {
                await axios.put(`/admins/${editingAdmin.id}`, formData);
            } else {
                await axios.post('/admins', formData);
            }
            await fetchAdmins();
            setShowForm(false);
        } catch (err) {
            setError(err.response?.data?.message || 'Something went wrong');
        } finally {
            setSubmitting(false);
        }
    };

    const handleDelete = async () => {
        try {
            await axios.delete(`/admins/${deletingId}`);
            await fetchAdmins();
            setShowDeleteModal(false);
            setDeletingId(null);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <AdminLayout>
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-slate-800">Admin Management</h1>
                    <p className="text-slate-500 mt-1">Manage administrator accounts</p>
                </div>
                <button onClick={handleOpenCreate} className="bg-[#0060BF] hover:bg-[#004E9C] text-white px-5 py-2 text-sm font-medium flex items-center gap-2 transition-colors cursor-pointer">
                    <Plus size={16} /> Add Admin
                </button>
            </div>
            {showForm && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white w-full max-w-lg mx-4">
                        <div className="flex items-center justify-between px-8 py-5 border-b border-slate-100">
                            <h2 className="text-xl font-bold text-slate-800">{editingAdmin ? 'Edit Admin' : 'Add New Admin'}</h2>
                            <button onClick={() => setShowForm(false)} className="text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"><X size={20} /></button>
                        </div>
                        <div className="p-8">
                            {error && <p className="text-red-600 bg-red-50 p-3 mb-4 text-sm">{error}</p>}
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label className="text-sm font-medium text-slate-700">Name</label>
                                    <input type="text" name="name" value={formData.name} onChange={handleChange} required placeholder="Full name" className="mt-1 block w-full px-4 py-2 border border-slate-200 text-sm focus:outline-none focus:border-[#0060BF] transition-colors" />
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-slate-700">Email</label>
                                    <input type="email" name="email" value={formData.email} onChange={handleChange} required placeholder="admin@hospital.com" className="mt-1 block w-full px-4 py-2 border border-slate-200 text-sm focus:outline-none focus:border-[#0060BF] transition-colors" />
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-slate-700">
                                        Password {editingAdmin && <span className="text-slate-400 font-normal">(leave blank to keep current)</span>}
                                    </label>
                                    <input type="password" name="password" value={formData.password} onChange={handleChange} required={!editingAdmin} placeholder={editingAdmin ? 'Leave blank to keep current' : 'Min 8 characters'} className="mt-1 block w-full px-4 py-2 border border-slate-200 text-sm focus:outline-none focus:border-[#0060BF] transition-colors" />
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-slate-700">Confirm Password</label>
                                    <input type="password" name="password_confirmation" value={formData.password_confirmation} onChange={handleChange} required={!editingAdmin} placeholder="Repeat password" className="mt-1 block w-full px-4 py-2 border border-slate-200 text-sm focus:outline-none focus:border-[#0060BF] transition-colors" />
                                </div>
                                <div className="flex gap-3 pt-2">
                                    <button 
                                        type="button" 
                                        onClick={() => setShowForm(false)} 
                                        className="flex-1 bg-slate-100 text-slate-700 py-2 hover:bg-slate-200 transition-colors text-sm font-medium cursor-pointer"
                                    >
                                        Cancel
                                    </button>
                                    <button 
                                        type="submit" 
                                        disabled={submitting} 
                                        className="flex-1 bg-[#0060BF] hover:bg-[#004E9C] text-white py-2 text-sm font-medium disabled:opacity-50 transition-colors cursor-pointer"
                                    >
                                        {submitting ? 'Saving...' : editingAdmin ? 'Update Admin' : 'Create Admin'}
                                    </button>
                                </div>
                            </form>
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
                            <h2 className="text-xl font-bold text-slate-800 mb-2">Delete Admin</h2>
                            <p className="text-slate-500 text-sm mb-6">Are you sure you want to delete this admin? This action cannot be undone.</p>
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
                                    Delete Admin
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            <div className="bg-white shadow-sm overflow-hidden">
                {loading ? (
                    <div className="p-8 text-center text-slate-500">Loading...</div>
                ) : admins.length === 0 ? (
                    <div className="p-8 text-center text-slate-500">No admins found.</div>
                ) : (
                    <table className="w-full">
                        <thead>
                            <tr className="bg-slate-50 border-b border-slate-100">
                                <th className="text-left px-6 py-4 text-sm font-semibold text-slate-600">Admin</th>
                                <th className="text-left px-6 py-4 text-sm font-semibold text-slate-600">Email</th>
                                <th className="text-left px-6 py-4 text-sm font-semibold text-slate-600">Created</th>
                                <th className="text-left px-6 py-4 text-sm font-semibold text-slate-600">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {admins.map(admin => (
                                <tr key={admin.id} className="border-b border-slate-50 hover:bg-slate-50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-9 h-9 bg-[#0060BF] flex items-center justify-center shrink-0">
                                                <span className="text-white text-sm font-bold">{admin.name.charAt(0).toUpperCase()}</span>
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium text-slate-800">{admin.name}</p>
                                                {user?.email === admin.email && (
                                                    <span className="text-xs bg-blue-50 text-[#0060BF] px-2 py-0.5">You</span>
                                                )}
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-slate-500">{admin.email}</td>
                                    <td className="px-6 py-4 text-sm text-slate-500">{new Date(admin.created_at).toLocaleDateString()}</td>
                                    <td className="px-6 py-4">
                                        <div className="flex gap-2">
                                            <button onClick={() => handleOpenEdit(admin)} className="px-3 py-1 bg-blue-50 text-[#0060BF] text-xs font-medium hover:bg-blue-100 transition-colors cursor-pointer">Edit</button>
                                            <button
                                                onClick={() => { setDeletingId(admin.id); setShowDeleteModal(true); }}
                                                disabled={user?.email === admin.email}
                                                className="px-3 py-1 bg-red-50 text-red-600 text-xs font-medium hover:bg-red-100 transition-colors cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
                                            >
                                                Delete
                                            </button>
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

export default AdminManagement;