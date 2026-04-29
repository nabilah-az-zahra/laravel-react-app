import { useState, useEffect } from 'react';
import axios from '../../api/axios';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { useSearchParams, Link } from 'react-router-dom';

const categories = [
    'All',
    'Emergency & Urgent Care',
    'Diagnostic & Laboratory',
    'Medical & Surgical Services',
    'Specialized Clinical Centers',
    'Rehabilitation & Wellness',
];

const categoryAccent = {
    'Emergency & Urgent Care': 'border-l-[#E11D48]',
    'Diagnostic & Laboratory': 'border-l-[#CA8A04]',
    'Medical & Surgical Services': 'border-l-[#0891B2]',
    'Specialized Clinical Centers': 'border-l-[#7C3AED]',
    'Rehabilitation & Wellness': 'border-l-[#10B981]',
};

const categoryTag = {
    'Emergency & Urgent Care': 'text-[#E11D48]',
    'Diagnostic & Laboratory': 'text-[#CA8A04]',
    'Medical & Surgical Services': 'text-[#0891B2]',
    'Specialized Clinical Centers': 'text-[#7C3AED]',
    'Rehabilitation & Wellness': 'text-[#10B981]',
};

const Services = () => {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchParams] = useSearchParams();
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [search, setSearch] = useState('');

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const response = await axios.get('/services');
                setServices(response.data.data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchServices();
    }, []);

    useEffect(() => {
        const categoryFromUrl = searchParams.get('category');
        if (categoryFromUrl) {
            setSelectedCategory(decodeURIComponent(categoryFromUrl));
        } else {
            setSelectedCategory('All');
        }
    }, [searchParams]);

    const filteredServices = services.filter(service => {
        const matchesCategory = selectedCategory === 'All' || service.category === selectedCategory;
        const matchesSearch = service.name.toLowerCase().includes(search.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    return (
        <div className="font-neue bg-white">
            <Navbar />
            <div className="border-b border-slate-200 py-16 px-6">
                <div className="max-w-7xl mx-auto">
                    <p className="text-xs font-bold text-[#0060BF] uppercase tracking-[0.25em] mb-3">What We Offer</p>
                    <div className="flex items-end justify-between">
                        <h1 className="text-5xl font-bold text-slate-900 tracking-tight">Our Services</h1>
                        <p className="text-slate-400 text-sm max-w-sm text-right">
                            Comprehensive medical services delivered by experienced professionals.
                        </p>
                    </div>
                </div>
            </div>
            <div className="border-b border-slate-200 px-6">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4 py-4">
                    <div className="flex overflow-x-auto">
                        {categories.map(category => (
                            <button
                                key={category}
                                onClick={() => setSelectedCategory(category)}
                                className={`px-4 py-3 text-sm font-medium whitespace-nowrap transition-all border-b-2 -mb-px ${
                                    selectedCategory === category
                                        ? 'text-[#0060BF] border-[#0060BF]'
                                        : 'text-slate-400 border-transparent hover:text-[#0060BF]'
                                }`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                    <input
                        type="text"
                        placeholder="Search services..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full md:w-64 px-4 py-2 border border-slate-300 text-sm focus:outline-none focus:border-[#0060BF] transition-colors shrink-0"
                    />
                </div>
            </div>
            <section className="py-16 px-6">
                <div className="max-w-7xl mx-auto">
                    {loading ? (
                        <p className="text-center text-slate-400 py-20">Loading...</p>
                    ) : filteredServices.length === 0 ? (
                        <div className="text-center py-20">
                            <p className="text-slate-400 text-sm">No services found.</p>
                            <button
                                onClick={() => { setSearch(''); setSelectedCategory('All'); }}
                                className="mt-3 text-[#0060BF] text-sm hover:underline"
                            >
                                Clear filters
                            </button>
                        </div>
                    ) : (
                        <>
                            <p className="text-slate-400 text-xs uppercase tracking-wider mb-8">
                                {filteredServices.length} service{filteredServices.length !== 1 ? 's' : ''}
                                {selectedCategory !== 'All' ? ` — ${selectedCategory}` : ''}
                            </p>
                            <div className="grid grid-cols-1 md:grid-cols-3 divide-x divide-y divide-slate-200 border border-slate-200">
                                {filteredServices.map(service => (
                                    <div
                                        key={service.id}
                                        className={`p-8 hover:bg-slate-50 transition-colors group border-l-4 ${categoryAccent[service.category] || 'border-l-slate-300'}`}
                                    >
                                        {service.image && (
                                            <div className="overflow-hidden h-40 mb-6 -mx-8 -mt-8">
                                                <img
                                                    src={`http://localhost:8000/storage/${service.image}`}
                                                    alt={service.name}
                                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                                />
                                            </div>
                                        )}
                                        <p className={`text-xs font-bold uppercase tracking-wider mb-3 ${categoryTag[service.category] || 'text-slate-400'}`}>
                                            {service.category}
                                        </p>
                                        <h3 className="text-base font-bold text-slate-900 mb-2">{service.name}</h3>
                                        <p className="text-slate-500 text-sm leading-relaxed">{service.description}</p>
                                    </div>
                                ))}
                            </div>
                        </>
                    )}
                </div>
            </section>
            <section className="py-16 px-6 bg-[#0060BF] border-t border-[#0060BF]">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-end justify-between gap-8">
                    <div>
                        <p className="text-blue-200 text-xs font-bold uppercase tracking-[0.25em] mb-3">Need Help?</p>
                        <h2 className="text-3xl font-bold text-white tracking-tight">Need Medical Assistance?</h2>
                        <p className="text-blue-100 mt-2">Our team of experienced doctors is ready to help you.</p>
                    </div>
                    <div className="flex gap-3 shrink-0">
                        <Link to="/contact" className="bg-white text-[#0060BF] px-6 py-3 text-sm font-bold hover:bg-blue-50 transition-colors">
                            Contact Us
                        </Link>
                        <Link to="/appointment" className="border border-white/40 text-white px-6 py-3 text-sm font-medium hover:bg-white/10 transition-colors">
                            Book Appointment
                        </Link>
                    </div>
                </div>
            </section>
            <Footer />
        </div>
    );
};

export default Services;