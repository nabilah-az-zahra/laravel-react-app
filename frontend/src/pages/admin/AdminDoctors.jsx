import { useState, useEffect } from 'react';
import axios from '../../api/axios';
import AdminLayout from '../../components/AdminLayout';
import { User, Trash2, X, Plus, Stethoscope } from 'lucide-react';

const AdminDoctors = () => {
    const [doctors, setDoctors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [editingDoctor, setEditingDoctor] = useState(null);
    const [formData, setFormData] = useState({ name: '', specialization: '', description: '', email: '', phone: '' });
    const [photo, setPhoto] = useState(null);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState('');
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deletingId, setDeletingId] = useState(null);

    const fetchDoctors = async () => {
        try {
            const response = await axios.get('/doctors');
            setDoctors(response.data.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchDoctors(); }, []);

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleOpenCreate = () => {
        setEditingDoctor(null);
        setFormData({ name: '', specialization: '', description: '', email: '', phone: '' });
        setPhoto(null);
        setError('');
        setShowForm(true);
    };

    const handleOpenEdit = (doctor) => {
        setEditingDoctor(doctor);
        setFormData({ name: doctor.name, specialization: doctor.specialization, description: doctor.description || '', email: doctor.email || '', phone: doctor.phone || '' });
        setPhoto(null);
        setError('');
        setShowForm(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        setError('');
        try {
            const data = new FormData();
            data.append('name', formData.name);
            data.append('specialization', formData.specialization);
            data.append('description', formData.description);
            data.append('email', formData.email);
            data.append('phone', formData.phone);
            if (photo) data.append('photo', photo);
            if (editingDoctor) {
                data.append('_method', 'PUT');
                await axios.post(`/doctors/${editingDoctor.id}`, data, { headers: { 'Content-Type': 'multipart/form-data' } });
            } else {
                await axios.post('/doctors', data, { headers: { 'Content-Type': 'multipart/form-data' } });
            }
            await fetchDoctors();
            setShowForm(false);
        } catch (err) {
            setError(err.response?.data?.message || 'Something went wrong');
        } finally {
            setSubmitting(false);
        }
    };

    const handleDelete = async () => {
        try {
            await axios.delete(`/doctors/${deletingId}`);
            await fetchDoctors();
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
                    <h1 className="text-2xl font-bold text-slate-800">Doctors</h1>
                    <p className="text-slate-500 mt-1">Manage your hospital doctors</p>
                </div>
                <button onClick={handleOpenCreate} className="bg-[#0060BF] hover:bg-[#004E9C] text-white px-5 py-2 text-sm font-medium flex items-center gap-2 transition-colors cursor-pointer">
                    <Plus size={16} /> Add Doctor
                </button>
            </div>
            {showForm && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white w-full max-w-lg mx-4 max-h-screen overflow-y-auto">
                        <div className="flex items-center justify-between px-8 py-5 border-b border-slate-100">
                            <h2 className="text-xl font-bold text-slate-800">{editingDoctor ? 'Edit Doctor' : 'Add New Doctor'}</h2>
                            <button onClick={() => setShowForm(false)} className="text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"><X size={20} /></button>
                        </div>
                        <div className="p-8">
                            {error && <p className="text-red-600 bg-red-50 p-3 mb-4 text-sm">{error}</p>}
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label className="text-sm font-medium text-slate-700">Name</label>
                                    <input type="text" name="name" value={formData.name} onChange={handleChange} required placeholder="Dr. John Smith" className="mt-1 block w-full px-4 py-2 border border-slate-200 text-sm focus:outline-none focus:border-[#0060BF] transition-colors" />
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-slate-700">Specialization</label>
                                    <input type="text" name="specialization" value={formData.specialization} onChange={handleChange} required placeholder="e.g. Cardiology" className="mt-1 block w-full px-4 py-2 border border-slate-200 text-sm focus:outline-none focus:border-[#0060BF] transition-colors" />
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-slate-700">Description</label>
                                    <textarea name="description" value={formData.description} onChange={handleChange} rows={3} placeholder="Brief description about the doctor" className="mt-1 block w-full px-4 py-2 border border-slate-200 text-sm focus:outline-none focus:border-[#0060BF] transition-colors" />
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-slate-700">Email</label>
                                    <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="doctor@hospital.com" className="mt-1 block w-full px-4 py-2 border border-slate-200 text-sm focus:outline-none focus:border-[#0060BF] transition-colors" />
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-slate-700">Phone</label>
                                    <input type="text" name="phone" value={formData.phone} onChange={handleChange} placeholder="+62 123 456 7890" className="mt-1 block w-full px-4 py-2 border border-slate-200 text-sm focus:outline-none focus:border-[#0060BF] transition-colors" />
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-slate-700">Photo</label>
                                    {editingDoctor?.photo && (
                                        <img src={`http://localhost:8000/storage/${editingDoctor.photo}`} alt="Current" className="w-20 h-20 object-cover mt-1 mb-2" />
                                    )}
                                    <input type="file" accept="image/*" onChange={(e) => setPhoto(e.target.files[0])} className="mt-1 block w-full text-sm text-slate-500" />
                                </div>
                                <div className="flex gap-3 pt-2">
                                    <button type="button" onClick={() => setShowForm(false)} className="flex-1 bg-slate-100 text-slate-700 py-2 hover:bg-slate-200 transition-colors text-sm font-medium cursor-pointer">
                                        Cancel
                                    </button>
                                    <button type="submit" disabled={submitting} className="flex-1 bg-[#0060BF] hover:bg-[#004E9C] text-white py-2 text-sm font-medium disabled:opacity-50 transition-colors cursor-pointer">
                                        {submitting ? 'Saving...' : editingDoctor ? 'Update Doctor' : 'Create Doctor'}
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
                            <h2 className="text-xl font-bold text-slate-800 mb-2">Delete Doctor</h2>
                            <p className="text-slate-500 text-sm mb-6">Are you sure you want to delete this doctor? This action cannot be undone.</p>
                            <div className="flex gap-3">
                                <button 
                                    onClick={() => { 
                                        setShowDeleteModal(false); setDeletingId(null); 
                                    }} 
                                    className="flex-1 bg-slate-100 text-slate-700 py-2 hover:bg-slate-200 transition-colors text-sm font-medium cursor-pointer"
                                >
                                    Cancel
                                </button>
                                <button 
                                    onClick={handleDelete} 
                                    className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 text-sm font-medium transition-colors cursor-pointer"
                                >
                                    Delete Doctor
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            <div className="bg-white shadow-sm overflow-hidden">
                {loading ? (
                    <div className="p-8 text-center text-slate-500">Loading...</div>
                ) : doctors.length === 0 ? (
                    <div className="p-8 text-center text-slate-500">No doctors yet. Add your first doctor!</div>
                ) : (
                    <table className="w-full">
                        <thead>
                            <tr className="bg-slate-50 border-b border-slate-100">
                                <th className="text-left px-6 py-4 text-sm font-semibold text-slate-600">Doctor</th>
                                <th className="text-left px-6 py-4 text-sm font-semibold text-slate-600">Specialization</th>
                                <th className="text-left px-6 py-4 text-sm font-semibold text-slate-600">Description</th>
                                <th className="text-left px-6 py-4 text-sm font-semibold text-slate-600">Contact</th>
                                <th className="text-left px-6 py-4 text-sm font-semibold text-slate-600">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {doctors.map(doctor => (
                                <tr key={doctor.id} className="border-b border-slate-50 hover:bg-slate-50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            {doctor.photo ? (
                                                <img src={`http://localhost:8000/storage/${doctor.photo}`} alt={doctor.name} className="w-10 h-10 object-cover" />
                                            ) : (
                                                <div className="w-10 h-10 bg-blue-50 flex items-center justify-center">
                                                    <Stethoscope size={16} className="text-[#0060BF]" />
                                                </div>
                                            )}
                                            <p className="text-sm font-medium text-slate-800">{doctor.name}</p>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="text-xs font-medium bg-blue-50 text-[#0060BF] px-3 py-1">
                                            {doctor.specialization}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <p className="text-xs text-slate-500">{doctor.description}</p>
                                    </td>
                                    <td className="px-6 py-4">
                                        <p className="text-xs text-slate-500">{doctor.email}</p>
                                        <p className="text-xs text-slate-500">{doctor.phone}</p>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex gap-2">
                                            <button onClick={() => handleOpenEdit(doctor)} className="px-3 py-1 bg-blue-50 text-[#0060BF] text-xs font-medium hover:bg-blue-100 transition-colors cursor-pointer">Edit</button>
                                            <button onClick={() => { setDeletingId(doctor.id); setShowDeleteModal(true); }} className="px-3 py-1 bg-red-50 text-red-600 text-xs font-medium hover:bg-red-100 transition-colors cursor-pointer">Delete</button>
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

export default AdminDoctors;