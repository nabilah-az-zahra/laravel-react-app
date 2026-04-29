import { useState, useEffect } from 'react';
import axios from '../../api/axios';
import AdminLayout from '../../components/AdminLayout';
import { Mail, Trash2, X } from 'lucide-react';

const AdminMessages = () => {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedMessage, setSelectedMessage] = useState(null);
    const [showDetailModal, setShowDetailModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deletingId, setDeletingId] = useState(null);

    const fetchMessages = async () => {
        try {
            const response = await axios.get('/messages');
            setMessages(response.data.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchMessages(); }, []);

    const handleView = async (message) => {
        setSelectedMessage(message);
        setShowDetailModal(true);
        if (!message.is_read) {
            try {
                await axios.patch(`/messages/${message.id}/read`);
                await fetchMessages();
            } catch (err) {
                console.error(err);
            }
        }
    };

    const handleDelete = async () => {
        try {
            await axios.delete(`/messages/${deletingId}`);
            await fetchMessages();
            setShowDeleteModal(false);
            setDeletingId(null);
        } catch (err) {
            console.error(err);
        }
    };

    const unreadCount = messages.filter(m => !m.is_read).length;

    return (
        <AdminLayout>
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-slate-800">Messages</h1>
                    <p className="text-slate-500 mt-1">
                        {unreadCount > 0 ? `${unreadCount} unread message${unreadCount > 1 ? 's' : ''}` : 'All messages read'}
                    </p>
                </div>
            </div>
            {showDetailModal && selectedMessage && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white w-full max-w-lg mx-4">
                        <div className="flex items-center justify-between px-8 py-5 border-b border-slate-100">
                            <h2 className="text-xl font-bold text-slate-800">Message Detail</h2>
                            <button onClick={() => setShowDetailModal(false)} className="text-slate-400 hover:text-slate-600 transition-colors cursor-pointer">
                                <X size={20} />
                            </button>
                        </div>
                        <div className="p-8 space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">From</p>
                                    <p className="text-sm font-medium text-slate-800 mt-1">{selectedMessage.name}</p>
                                </div>
                                <div>
                                    <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">Email</p>
                                    <p className="text-sm font-medium text-slate-800 mt-1">{selectedMessage.email}</p>
                                </div>
                            </div>
                            <div>
                                <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">Subject</p>
                                <p className="text-sm font-medium text-slate-800 mt-1">{selectedMessage.subject}</p>
                            </div>
                            <div>
                                <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">Message</p>
                                <p className="text-sm text-slate-600 mt-1 leading-relaxed whitespace-pre-line">{selectedMessage.message}</p>
                            </div>
                            <div>
                                <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">Received</p>
                                <p className="text-sm text-slate-500 mt-1">
                                    {new Date(selectedMessage.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                                </p>
                            </div>
                        </div>
                        <div className="flex gap-3 px-8 pb-8">
                            <button 
                                onClick={() => setShowDetailModal(false)} 
                                className="flex-1 bg-slate-100 text-slate-700 py-2 hover:bg-slate-200 transition-colors text-sm font-medium cursor-pointer"
                            >
                                Close
                            </button>
                            <button
                                onClick={() => { 
                                    setShowDetailModal(false); 
                                    setDeletingId(selectedMessage.id); 
                                    setShowDeleteModal(true); 
                                }}
                                className="flex-1 bg-red-50 text-red-600 py-2 hover:bg-red-100 transition-colors text-sm font-medium cursor-pointer flex items-center justify-center gap-2"
                            >
                                <Trash2 size={14} /> Delete
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
                            <h2 className="text-xl font-bold text-slate-800 mb-2">Delete Message</h2>
                            <p className="text-slate-500 text-sm mb-6">Are you sure you want to delete this message? This action cannot be undone.</p>
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
                                    Delete Message
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            <div className="bg-white shadow-sm overflow-hidden">
                {loading ? (
                    <div className="p-8 text-center text-slate-500">Loading...</div>
                ) : messages.length === 0 ? (
                    <div className="p-8 text-center">
                        <Mail size={32} className="text-slate-300 mx-auto mb-3" />
                        <p className="text-slate-500 text-sm">No messages yet.</p>
                    </div>
                ) : (
                    <table className="w-full">
                        <thead>
                            <tr className="bg-slate-50 border-b border-slate-100">
                                <th className="text-left px-6 py-4 text-sm font-semibold text-slate-600">From</th>
                                <th className="text-left px-6 py-4 text-sm font-semibold text-slate-600">Subject</th>
                                <th className="text-left px-6 py-4 text-sm font-semibold text-slate-600">Date</th>
                                <th className="text-left px-6 py-4 text-sm font-semibold text-slate-600">Status</th>
                                <th className="text-left px-6 py-4 text-sm font-semibold text-slate-600">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {messages.map(message => (
                                <tr key={message.id} className={`border-b border-slate-50 hover:bg-slate-50 transition-colors ${!message.is_read ? 'bg-blue-50/30' : ''}`}>
                                    <td className="px-6 py-4">
                                        <p className={`text-sm ${!message.is_read ? 'font-semibold text-slate-800' : 'font-medium text-slate-600'}`}>{message.name}</p>
                                        <p className="text-xs text-slate-400">{message.email}</p>
                                    </td>
                                    <td className="px-6 py-4">
                                        <p className={`text-sm ${!message.is_read ? 'font-semibold text-slate-800' : 'text-slate-600'}`}>{message.subject}</p>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-slate-500">
                                        {new Date(message.created_at).toLocaleDateString()}
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`text-xs px-2 py-1 font-medium ${message.is_read ? 'bg-green-50 text-green-600' : 'bg-orange-50 text-orange-600'}`}>
                                            {message.is_read ? 'Read' : 'Unread'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex gap-2">
                                            <button onClick={() => handleView(message)} className="px-3 py-1 bg-blue-50 text-[#0060BF] text-xs font-medium hover:bg-blue-100 transition-colors cursor-pointer">View</button>
                                            <button onClick={() => { setDeletingId(message.id); setShowDeleteModal(true); }} className="px-3 py-1 bg-red-50 text-red-600 text-xs font-medium hover:bg-red-100 transition-colors cursor-pointer">Delete</button>
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

export default AdminMessages;