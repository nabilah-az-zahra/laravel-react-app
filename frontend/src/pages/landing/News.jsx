import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from '../../api/axios';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const News = () => {
    const navigate = useNavigate();
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');

    useEffect(() => {
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
        fetchPosts();
    }, []);

    const filteredPosts = posts.filter(post =>
        post.title.toLowerCase().includes(search.toLowerCase())
    );

    const featuredPost = filteredPosts[0];
    const remainingPosts = filteredPosts.slice(1);

    return (
        <div className="font-neue bg-white">
            <Navbar />
            <div className="border-b border-slate-200 py-16 px-6">
                <div className="max-w-7xl mx-auto flex items-end justify-between gap-8">
                    <div>
                        <p className="text-xs font-bold text-[#0060BF] uppercase tracking-[0.25em] mb-3">Stay Informed</p>
                        <h1 className="text-5xl font-bold text-slate-900 tracking-tight">Health News</h1>
                        <p className="text-slate-400 text-sm mt-3 max-w-md">
                            Latest health tips, medical breakthroughs, and hospital updates.
                        </p>
                    </div>
                    <div className="shrink-0">
                        <input
                            type="text"
                            placeholder="Search articles..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-72 px-4 py-2.5 border border-slate-300 text-sm focus:outline-none focus:border-[#0060BF] transition-colors"
                        />
                    </div>
                </div>
            </div>
            <section className="py-16 px-6">
                <div className="max-w-7xl mx-auto">
                    {loading ? (
                        <p className="text-center text-slate-400 py-20">Loading...</p>
                    ) : filteredPosts.length === 0 ? (
                        <p className="text-center text-slate-400 py-20">No articles found.</p>
                    ) : (
                        <>
                            {featuredPost && !search && (
                                <div
                                    onClick={() => navigate(`/news/${featuredPost.id}`)}
                                    className="cursor-pointer group border border-slate-200 mb-12"
                                >
                                    <div className="grid grid-cols-1 md:grid-cols-2">
                                        {featuredPost.image ? (
                                            <div className="overflow-hidden h-72">
                                                <img
                                                    src={`http://localhost:8000/storage/${featuredPost.image}`}
                                                    alt={featuredPost.title}
                                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                                />
                                            </div>
                                        ) : (
                                            <div className="h-72 bg-slate-100" />
                                        )}
                                        <div className="p-10 flex flex-col justify-center border-l border-slate-200">
                                            <p className="text-xs font-bold text-[#0060BF] uppercase tracking-[0.25em] mb-4">Featured Article</p>
                                            <h2 className="text-2xl font-bold text-slate-900 leading-tight mb-4 group-hover:text-[#0060BF] transition-colors tracking-tight">
                                                {featuredPost.title}
                                            </h2>
                                            <p className="text-slate-500 text-sm leading-relaxed mb-6">
                                                {featuredPost.content.substring(0, 180)}...
                                            </p>
                                            <div className="flex items-center justify-between pt-4 border-t border-slate-200">
                                                <p className="text-xs text-slate-400">{featuredPost.user?.name}</p>
                                                <p className="text-xs text-slate-400">
                                                    {new Date(featuredPost.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                            <div className="flex items-center justify-between pb-4 mb-2 border-b border-slate-200">
                                <p className="text-xs font-bold text-slate-900 uppercase tracking-widest">
                                    {search ? `${filteredPosts.length} results for "${search}"` : 'Latest Articles'}
                                </p>
                                <p className="text-xs text-slate-400">{filteredPosts.length} article{filteredPosts.length !== 1 ? 's' : ''}</p>
                            </div>
                            <div className="divide-y divide-slate-200">
                                {(search ? filteredPosts : remainingPosts).map(post => (
                                    <div
                                        key={post.id}
                                        onClick={() => navigate(`/news/${post.id}`)}
                                        className="cursor-pointer group flex gap-8 py-8 hover:bg-slate-50 -mx-4 px-4 transition-colors"
                                    >
                                        <div className="shrink-0">
                                            {post.image ? (
                                                <div className="overflow-hidden w-36 h-24">
                                                    <img
                                                        src={`http://localhost:8000/storage/${post.image}`}
                                                        alt={post.title}
                                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                                    />
                                                </div>
                                            ) : (
                                                <div className="w-36 h-24 bg-slate-100" />
                                            )}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h3 className="text-base font-bold text-slate-900 leading-snug group-hover:text-[#0060BF] transition-colors line-clamp-2 tracking-tight mb-2">
                                                {post.title}
                                            </h3>
                                            <p className="text-slate-500 text-sm leading-relaxed line-clamp-2">
                                                {post.content.substring(0, 150)}...
                                            </p>
                                            <div className="flex items-center gap-4 mt-3">
                                                <p className="text-xs text-slate-400">{post.user?.name}</p>
                                                <span className="text-slate-200">—</span>
                                                <p className="text-xs text-slate-400">
                                                    {new Date(post.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="shrink-0 self-center text-slate-300 group-hover:text-[#0060BF] group-hover:translate-x-1 transition-all">
                                            →
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </>
                    )}
                </div>
            </section>
            <Footer />
        </div>
    );
};

export default News;