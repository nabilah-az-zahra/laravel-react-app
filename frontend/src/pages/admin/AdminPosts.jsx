import { useState, useEffect } from 'react';
import axios from '../../api/axios';
import AdminLayout from '../../components/AdminLayout';
import { FileText, Trash2, X, Plus } from 'lucide-react';

const AdminPosts = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [editingPost, setEditingPost] = useState(null);
    const [formData, setFormData] = useState({ title: '', content: '' });
    const [image, setImage] = useState(null);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState('');
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deletingId, setDeletingId] = useState(null);

    const fetchPosts = async () => {
        try {
            const response = await axios.get('/posts');
            setPosts(response.data.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchPosts(); }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleOpenCreate = () => {
        setEditingPost(null);
        setFormData({ title: '', content: '' });
        setImage(null);
        setError('');
        setShowForm(true);
    };

    const handleOpenEdit = (post) => {
        setEditingPost(post);
        setFormData({ title: post.title, content: post.content });
        setImage(null);
        setError('');
        setShowForm(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        setError('');
        try {
            const data = new FormData();
            data.append('title', formData.title);
            data.append('content', formData.content);
            if (image) data.append('image', image);
            if (editingPost) {
                data.append('_method', 'PUT');
                await axios.post(`/posts/${editingPost.id}`, data, { headers: { 'Content-Type': 'multipart/form-data' } });
            } else {
                await axios.post('/posts', data, { headers: { 'Content-Type': 'multipart/form-data' } });
            }
            await fetchPosts();
            setShowForm(false);
        } catch (err) {
            setError(err.response?.data?.message || 'Something went wrong');
        } finally {
            setSubmitting(false);
        }
    };

    const handleDelete = async () => {
        try {
            await axios.delete(`/posts/${deletingId}`);
            await fetchPosts();
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
                    <h1 className="text-2xl font-bold text-slate-800">Posts</h1>
                    <p className="text-slate-500 mt-1">Manage your health news and articles</p>
                </div>
                <button
                    onClick={handleOpenCreate}
                    className="bg-[#0060BF] hover:bg-[#004E9C] text-white px-5 py-2 text-sm font-medium flex items-center gap-2 transition-colors cursor-pointer"
                >
                    <Plus size={16} />
                    Add Post
                </button>
            </div>
            {showForm && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-100">
                    <div className="bg-white w-full max-w-lg mx-4 max-h-screen overflow-y-auto">
                        <div className="flex items-center justify-between px-8 py-5 border-b border-slate-100">
                            <h2 className="text-xl font-bold text-slate-800">
                                {editingPost ? 'Edit Post' : 'Add New Post'}
                            </h2>
                            <button onClick={() => setShowForm(false)} className="text-slate-400 hover:text-slate-600 transition-colors cursor-pointer">
                                <X size={20} />
                            </button>
                        </div>
                        <div className="p-8">
                            {error && (
                                <p className="text-red-600 bg-red-50 p-3 mb-4 text-sm">{error}</p>
                            )}
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label className="text-sm font-medium text-slate-700">Title</label>
                                    <input
                                        type="text"
                                        name="title"
                                        value={formData.title}
                                        onChange={handleChange}
                                        required
                                        className="mt-1 block w-full px-4 py-2 border border-slate-200 text-sm focus:outline-none focus:border-[#0060BF] transition-colors"
                                    />
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-slate-700">Content</label>
                                    <textarea
                                        name="content"
                                        value={formData.content}
                                        onChange={handleChange}
                                        required
                                        rows={6}
                                        className="mt-1 block w-full px-4 py-2 border border-slate-200 text-sm focus:outline-none focus:border-[#0060BF] transition-colors"
                                    />
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-slate-700">Image</label>
                                    {editingPost?.image && (
                                        <img src={`http://localhost:8000/storage/${editingPost.image}`} alt="Current" className="w-full h-32 object-cover mt-1 mb-2" />
                                    )}
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => setImage(e.target.files[0])}
                                        className="mt-1 block w-full text-sm text-slate-500"
                                    />
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
                                        {submitting ? 'Saving...' : editingPost ? 'Update Post' : 'Create Post'}
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
                            <h2 className="text-xl font-bold text-slate-800 mb-2">Delete Post</h2>
                            <p className="text-slate-500 text-sm mb-6">
                                Are you sure you want to delete this post? This action cannot be undone.
                            </p>
                            <div className="flex gap-3">
                                <button
                                    onClick={() => { setShowDeleteModal(false); setDeletingId(null); }}
                                    className="flex-1 bg-slate-100 text-slate-700 py-2 hover:bg-slate-200 transition-colors text-sm font-medium cursor-pointer"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleDelete}
                                    className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 text-sm font-medium transition-colors cursor-pointer"
                                >
                                    Delete Post
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            <div className="bg-white shadow-sm overflow-hidden">
                {loading ? (
                    <div className="p-8 text-center text-slate-500">Loading...</div>
                ) : posts.length === 0 ? (
                    <div className="p-8 text-center text-slate-500">No posts yet. Create your first post!</div>
                ) : (
                    <table className="w-full">
                        <thead>
                            <tr className="bg-slate-50 border-b border-slate-100">
                                <th className="text-left px-6 py-4 text-sm font-semibold text-slate-600">Title</th>
                                <th className="text-left px-6 py-4 text-sm font-semibold text-slate-600">Image</th>
                                <th className="text-left px-6 py-4 text-sm font-semibold text-slate-600">Date</th>
                                <th className="text-left px-6 py-4 text-sm font-semibold text-slate-600">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {posts.map(post => (
                                <tr key={post.id} className="border-b border-slate-50 hover:bg-slate-50 transition-colors">
                                    <td className="px-6 py-4">
                                        <p className="text-sm font-medium text-slate-800">{post.title}</p>
                                        <p className="text-xs text-slate-400 mt-1">{post.content.substring(0, 60)}...</p>
                                    </td>
                                    <td className="px-6 py-4">
                                        {post.image ? (
                                            <img src={`http://localhost:8000/storage/${post.image}`} alt={post.title} className="w-12 h-12 object-cover" />
                                        ) : (
                                            <div className="w-12 h-12 bg-blue-50 flex items-center justify-center">
                                                <FileText size={18} className="text-[#0060BF]" />
                                            </div>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-slate-500">
                                        {new Date(post.created_at).toLocaleDateString()}
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => handleOpenEdit(post)}
                                                className="px-3 py-1 bg-blue-50 text-[#0060BF] text-xs font-medium hover:bg-blue-100 transition-colors cursor-pointer"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => { setDeletingId(post.id); setShowDeleteModal(true); }}
                                                className="px-3 py-1 bg-red-50 text-red-600 text-xs font-medium hover:bg-red-100 transition-colors cursor-pointer"
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

export default AdminPosts;