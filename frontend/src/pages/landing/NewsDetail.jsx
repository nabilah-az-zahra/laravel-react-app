import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from '../../api/axios';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const NewsDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [post, setPost] = useState(null);
    const [otherPosts, setOtherPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [postRes, allPostsRes] = await Promise.all([
                    axios.get(`/posts/${id}`),
                    axios.get('/posts'),
                ]);
                setPost(postRes.data.data);
                setOtherPosts(allPostsRes.data.data.filter(p => p.id !== parseInt(id)));
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [id]);

    if (loading) return (
        <div className="bg-white min-h-screen">
            <Navbar />
            <div className="flex items-center justify-center py-20">
                <p className="text-slate-400 text-sm">Loading article...</p>
            </div>
        </div>
    );

    if (!post) return (
        <div className="bg-white min-h-screen">
            <Navbar />
            <div className="flex items-center justify-center py-20">
                <div className="text-center">
                    <p className="text-slate-800 font-semibold">Article not found</p>
                    <button onClick={() => navigate('/news')} className="mt-3 text-blue-700 text-sm hover:underline">
                        ← Back to News
                    </button>
                </div>
            </div>
        </div>
    );

    return (
        <div className="font-neue bg-white">
            <Navbar />
            {post.image && (
                <div className="w-full h-80 overflow-hidden border-b border-slate-200">
                    <img
                        src={`http://localhost:8000/storage/${post.image}`}
                        alt={post.title}
                        className="w-full h-full object-cover"
                    />
                </div>
            )}
            <div className="border-b border-slate-200 py-12 px-6">
                <div className="max-w-7xl mx-auto">
                    <p className="text-xs font-bold text-[#0060BF] uppercase tracking-[0.25em] mb-4">Health News</p>
                    <h1 className="text-4xl font-bold text-slate-900 tracking-tight leading-tight max-w-3xl mb-6">
                        {post.title}
                    </h1>
                    <div className="flex items-center gap-6 text-xs text-slate-400">
                        <p>{post.user?.name}</p>
                        <span>—</span>
                        <p>{new Date(post.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                    </div>
                </div>
            </div>
            <section className="py-12 px-6">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-16">
                    <div style={{ flex: '0 0 65%' }}>
                        <div className="text-slate-600 text-base leading-8 space-y-4 whitespace-pre-line">
                            {post.content}
                        </div>

                        <div className="mt-12 pt-6 border-t border-slate-200 flex items-center justify-between">
                            <div>
                                <p className="text-xs text-slate-400 uppercase tracking-wider">Written by</p>
                                <p className="text-sm font-semibold text-slate-800 mt-1">{post.user?.name}</p>
                                <p className="text-xs text-slate-400">Hospital Staff</p>
                            </div>
                            <button
                                onClick={() => navigate('/news')}
                                className="group flex items-center gap-2 text-sm font-medium text-[#0060BF] cursor-pointer hover:underline transition-colors"
                            >
                                <ArrowLeft 
                                    size={16} 
                                    className="transition-transform duration-300 group-hover:-translate-x-1" 
                                />
                                <span>More Articles</span>
                            </button>
                        </div>
                    </div>
                    <div style={{ flex: '0 0 30%' }}>
                        <div className="sticky top-24 space-y-8">
                            <div className="border border-[#0060BF] p-6">
                                <p className="text-xs font-bold text-[#0060BF] uppercase tracking-wider mb-2">Need Medical Help?</p>
                                <p className="text-slate-600 text-sm mb-5 leading-relaxed">
                                    Book an appointment with one of our experienced doctors today.
                                </p>
                                <Link
                                    to="/appointment"
                                    className="block bg-[#0060BF] text-white text-xs font-bold px-4 py-3 text-center hover:bg-[#004E9C] transition-colors"
                                >
                                    Book Appointment
                                </Link>
                            </div>
                            <div>
                                <p className="text-xs font-bold text-slate-900 uppercase tracking-widest mb-4 pb-3 border-b border-slate-200">
                                    More Articles
                                </p>
                                {otherPosts.length === 0 ? (
                                    <p className="text-slate-400 text-sm">No other articles.</p>
                                ) : (
                                    <div className="divide-y divide-slate-200">
                                        {otherPosts.slice(0, 5).map(other => (
                                            <div
                                                key={other.id}
                                                onClick={() => { navigate(`/news/${other.id}`); window.scrollTo(0, 0); }}
                                                className="flex gap-4 py-4 cursor-pointer group"
                                            >
                                                {other.image ? (
                                                    <div className="w-14 h-14 overflow-hidden shrink-0">
                                                        <img
                                                            src={`http://localhost:8000/storage/${other.image}`}
                                                            alt={other.title}
                                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                                        />
                                                    </div>
                                                ) : (
                                                    <div className="w-14 h-14 bg-slate-100 shrink-0" />
                                                )}
                                                <div className="min-w-0">
                                                    <p className="text-xs font-semibold text-slate-700 leading-snug group-hover:text-[#0060BF] transition-colors line-clamp-2">
                                                        {other.title}
                                                    </p>
                                                    <p className="text-xs text-slate-400 mt-1">
                                                        {new Date(other.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </div>
    );
};

export default NewsDetail;