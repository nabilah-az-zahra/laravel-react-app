import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from '../../api/axios';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { Siren, ClipboardClock, UserRoundSearch, MapPinned, SquareUserRound, ArrowRight, SendHorizontal, Stethoscope, ClipboardList, HeartPulse } from 'lucide-react';

const Home = () => {
    const navigate = useNavigate();
    const [posts, setPosts] = useState([]);
    const [doctors, setDoctors] = useState([]);
    const [services, setServices] = useState([]);
    const [selectedSpecialization, setSelectedSpecialization] = useState('All');
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({
        name: '', email: '', subject: '', message: '',
    });
    const [formStatus, setFormStatus] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [postsRes, doctorsRes, servicesRes] = await Promise.all([
                    axios.get('/posts'),
                    axios.get('/doctors'),
                    axios.get('/services'),
                ]);
                setPosts(postsRes.data.data);
                setDoctors(doctorsRes.data.data);
                setServices(servicesRes.data.data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/messages', formData);
            setFormStatus('success');
            setFormData({ name: '', email: '', subject: '', message: '' });
        } catch (err) {
            setFormStatus('error');
        }
    };

    const specializations = ['All', ...new Set(doctors.map(d => d.specialization))];
    const filteredDoctors = selectedSpecialization === 'All'
        ? doctors
        : doctors.filter(d => d.specialization === selectedSpecialization);

    const serviceCategories = [
        'All',
        'Emergency & Urgent Care',
        'Diagnostic & Laboratory',
        'Medical & Surgical Services',
        'Specialized Clinical Centers',
        'Rehabilitation & Wellness'
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

    return (
        <div className="font-neue-wide bg-white">
            <Navbar />
            <section className="border-b border-slate-200">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 min-h-[80vh]">
                        <div className="flex flex-col justify-center py-20 pr-16 border-r border-slate-200">
                            <p className="text-xs font-bold text-[#0060BF] uppercase tracking-[0.25em] mb-6">
                                Trusted Healthcare Since 1990
                            </p>
                            <h1 className="text-6xl font-bold text-slate-900 leading-[1.05] tracking-tight mb-6">
                                Your Health<br />
                                Is Our<br />
                                <em className="not-italic text-[#0060BF]">Priority.</em>
                            </h1>
                            <p className="text-slate-500 text-base leading-relaxed mb-10 max-w-sm">
                                Comprehensive healthcare services with experienced doctors and modern facilities for you and your family.
                            </p>
                            <div className="flex items-center gap-6">
                                <Link
                                    to="/appointment"
                                    className="bg-[#0060BF] text-white px-6 py-3 text-sm font-semibold hover:bg-[#004E9C] transition-colors"
                                >
                                    Book Appointment
                                </Link>
                                <Link
                                    to="/doctors"
                                    className="text-sm font-medium text-slate-600 hover:text-[#0060BF] transition-colors underline underline-offset-4"
                                >
                                    Find a Doctor
                                </Link>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 divide-x divide-y divide-slate-200">
                            {[
                                { number: '500+', label: 'Expert Doctors', sub: 'Across all specializations', icon: Stethoscope },
                                { number: '24/7', label: 'Emergency Care', sub: 'Always available for you', icon: Siren },
                                { number: '50+', label: 'Specializations', sub: 'Comprehensive coverage', icon: ClipboardList },
                                { number: '10K+', label: 'Patients Treated', sub: 'And counting', icon: HeartPulse },
                            ].map(stat => {
                                const Icon = stat.icon;
                                return (
                                    <div key={stat.label} className="p-10 flex flex-col justify-between group hover:bg-slate-50 transition-colors">
                                        <Icon size={28} className="text-slate-200 group-hover:text-[#0060BF] transition-colors duration-300" strokeWidth={1.5} />
                                        <div>
                                            <p className="text-4xl font-bold text-slate-900 mb-1">{stat.number}</p>
                                            <p className="text-sm font-semibold text-slate-700">{stat.label}</p>
                                            <p className="text-xs text-slate-400 mt-1">{stat.sub}</p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </section>
            <section className="border-b border-slate-200">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-slate-200">
                        {[
                            { icon: Siren, label: 'Emergency', desc: '24/7 Available', link: '/services' },
                            { icon: ClipboardClock, label: 'Book Appointment', desc: 'Online Scheduling', link: '/appointment' },
                            { icon: UserRoundSearch, label: 'Find Doctor', desc: 'All Specializations', link: '/doctors' },
                            { icon: MapPinned, label: 'Our Location', desc: 'Medical City', link: '/contact' },
                        ].map(item => {
                            const IconComponent = item.icon; 
                            return (
                                <Link
                                    key={item.label}
                                    to={item.link}
                                    className="flex items-center gap-4 p-6 hover:bg-slate-50 transition-colors group"
                                >
                                    <IconComponent 
                                        size={24} 
                                        strokeWidth={2}
                                        className="text-slate-400 group-hover:text-[#0060BF] transition-colors shrink-0" 
                                    />
                                    <div>
                                        <p className="text-sm font-semibold text-slate-800 group-hover:text-[#0060BF] transition-colors">{item.label}</p>
                                        <p className="text-xs text-slate-400">{item.desc}</p>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                </div>
            </section>
            <section className="py-24 px-6 border-b border-slate-200">
                <div className="max-w-7xl mx-auto">
                    <div className="flex items-end justify-between mb-10">
                        <div>
                            <p className="text-xs font-bold text-[#0060BF] uppercase tracking-[0.25em] mb-3">What We Offer</p>
                            <h2 className="text-4xl font-bold text-slate-900 tracking-tight">Our Services</h2>
                        </div>
                        <Link to="/services" className="text-sm text-slate-500 hover:text-[#0060BF] transition-colors underline underline-offset-4">
                            View all services
                        </Link>
                    </div>
                    <div className="flex gap-0 border-b border-slate-200 mb-12 overflow-x-auto">
                        {serviceCategories.map(cat => (
                            <button
                                key={cat}
                                onClick={() => setSelectedCategory(cat)}
                                className={`px-4 py-3 text-sm font-medium whitespace-nowrap transition-all border-b-2 -mb-px ${
                                    selectedCategory === cat
                                        ? 'text-[#0060BF] border-[#0060BF]'
                                        : 'text-slate-400 border-transparent hover:text-[#0060BF]'
                                }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                    {loading ? (
                        <p className="text-center text-slate-400 py-12">Loading...</p>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-3 divide-x divide-y divide-slate-200 border border-slate-200">
                            {services
                                .filter(s => selectedCategory === 'All' || s.category === selectedCategory)
                                .slice(0, 6)
                                .map(service => (
                                    <div
                                        key={service.id}
                                        className={`p-8 hover:bg-slate-50 transition-colors group border-l-4 ${categoryAccent[service.category] || 'border-l-slate-300'}`}
                                    >
                                        {service.image && (
                                            <div className="overflow-hidden h-36 mb-6 -mx-8 -mt-8">
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
                                        <p className="text-slate-500 text-sm leading-relaxed line-clamp-2">{service.description}</p>
                                    </div>
                                ))}
                        </div>
                    )}
                </div>
            </section>
            <section className="py-24 px-6 border-b border-slate-200">
                <div className="max-w-7xl mx-auto">
                    <div className="flex items-end justify-between mb-10">
                        <div>
                            <p className="text-xs font-bold text-[#0060BF] uppercase tracking-[0.25em] mb-3">Meet Our Team</p>
                            <h2 className="text-4xl font-bold text-slate-900 tracking-tight">Our Doctors</h2>
                        </div>
                        <Link to="/doctors" className="text-sm text-slate-500 hover:text-[#0060BF] transition-colors underline underline-offset-4">
                            View all doctors
                        </Link>
                    </div>
                    <div className="flex flex-wrap gap-2 mb-10">
                        {specializations.map(spec => (
                            <button
                                key={spec}
                                onClick={() => setSelectedSpecialization(spec)}
                                className={`px-3 py-1.5 text-xs font-medium border cursor-pointer transition-colors ${
                                    selectedSpecialization === spec
                                        ? 'bg-[#0060BF] text-white border-[#0060BF]'
                                        : 'bg-white text-slate-600 border-slate-200 hover:border-slate-400'
                                }`}
                            >
                                {spec}
                            </button>
                        ))}
                    </div>
                    {loading ? (
                        <p className="text-center text-slate-400 py-12">Loading...</p>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-4 divide-x divide-slate-200 border border-slate-200">
                            {filteredDoctors.slice(0, 4).map(doctor => (
                                <div key={doctor.id} className="p-6 hover:bg-slate-50 transition-colors group">
                                    {doctor.photo ? (
                                        <img
                                            src={`http://localhost:8000/storage/${doctor.photo}`}
                                            alt={doctor.name}
                                            className="w-14 h-14 object-cover mb-5"
                                        />
                                    ) : (
                                        <div className="w-14 h-14 bg-slate-100 flex items-center justify-center mb-5">
                                            <SquareUserRound size={28} className="text-slate-400" />
                                        </div>
                                    )}
                                    <p className="text-xs font-bold text-[#0060BF] uppercase tracking-wider mb-1">{doctor.specialization}</p>
                                    <h3 className="text-sm font-bold text-slate-900 mb-2">{doctor.name}</h3>
                                    {doctor.description && (
                                        <p className="text-slate-400 text-xs leading-relaxed line-clamp-2 mb-4">{doctor.description}</p>
                                    )}
                                    <Link
                                        to="/appointment"
                                        className="group inline-flex items-center gap-1 text-xs font-semibold text-[#0060BF] hover:text-[#004E9C] transition-colors underline underline-offset-2"
                                    >
                                        Book appointment
                                        <ArrowRight 
                                            size={14} 
                                            className="transition-transform group-hover:translate-x-1 underline-none" 
                                            strokeWidth={2.5}
                                        />
                                    </Link>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </section>
            <section className="py-24 px-6 border-b border-slate-200">
                <div className="max-w-7xl mx-auto">
                    <div className="flex items-end justify-between mb-12">
                        <div>
                            <p className="text-xs font-bold text-[#0060BF] uppercase tracking-[0.25em] mb-3">Stay Informed</p>
                            <h2 className="text-4xl font-bold text-slate-900 tracking-tight">Health News</h2>
                        </div>
                        <Link to="/news" className="text-sm text-slate-500 hover:text-[#0060BF] transition-colors underline underline-offset-4">
                            All articles
                        </Link>
                    </div>
                    {loading ? (
                        <p className="text-center text-slate-400 py-12">Loading...</p>
                    ) : posts.length === 0 ? (
                        <p className="text-center text-slate-400 py-12">No news available yet.</p>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-3 divide-x divide-slate-200 border border-slate-200">
                            {posts.slice(0, 3).map((post, index) => (
                                <div
                                    key={post.id}
                                    onClick={() => navigate(`/news/${post.id}`)}
                                    className="p-8 cursor-pointer hover:bg-slate-50 transition-colors group"
                                >
                                    {post.image ? (
                                        <div className="overflow-hidden h-44 mb-6 -mx-8 -mt-8">
                                            <img
                                                src={`http://localhost:8000/storage/${post.image}`}
                                                alt={post.title}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                            />
                                        </div>
                                    ) : (
                                        <div className="h-44 bg-slate-100 mb-6 -mx-8 -mt-8" />
                                    )}
                                    <div className="flex items-center justify-between mb-3">
                                        <p className="text-xs text-slate-400">
                                            {new Date(post.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                        </p>
                                        {index === 0 && (
                                            <span className="text-xs font-bold text-[#0060BF] uppercase tracking-widest">Featured</span>
                                        )}
                                    </div>
                                    <h3 className="text-base font-bold text-slate-900 leading-snug mb-3 group-hover:text-[#0060BF] transition-colors line-clamp-2">
                                        {post.title}
                                    </h3>
                                    <p className="text-slate-500 text-sm leading-relaxed line-clamp-2">
                                        {post.content.substring(0, 120)}...
                                    </p>
                                    <p className="text-xs text-slate-400 mt-4">{post.user?.name}</p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </section>
            <section className="py-24 px-6 bg-[#0060BF] border-b border-[#0060BF]">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-end justify-between gap-8">
                    <div>
                        <p className="text-blue-200 text-xs font-bold uppercase tracking-[0.25em] mb-4">Get Started</p>
                        <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight tracking-tight max-w-lg">
                            Ready to take control of your health?
                        </h2>
                    </div>
                    <div className="flex flex-col gap-3 shrink-0">
                        <Link
                            to="/appointment"
                            className="bg-white text-[#0060BF] px-8 py-3 text-sm font-bold hover:bg-blue-50 transition-colors text-center"
                        >
                            Book Appointment
                        </Link>
                        <Link
                            to="/contact"
                            className="border border-white/40 text-white px-8 py-3 text-sm font-medium hover:bg-white/10 transition-colors text-center"
                        >
                            Contact Us
                        </Link>
                    </div>
                </div>
            </section>
            <section className="py-24 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                        <div>
                            <p className="text-xs font-bold text-[#0060BF] uppercase tracking-[0.25em] mb-3">Get In Touch</p>
                            <h2 className="text-4xl font-bold text-slate-900 tracking-tight mb-10">Contact Us</h2>
                            <div className="space-y-0 divide-y divide-slate-200">
                                {[
                                    { label: 'Address', value: '123 Health Street, Medical City' },
                                    { label: 'Phone', value: '+62 123 456 7890' },
                                    { label: 'Email', value: 'info@hospital.com' },
                                    { label: 'Working Hours', value: 'Monday – Sunday, 24 Hours' },
                                ].map(item => (
                                    <div key={item.label} className="py-4 flex items-center justify-between">
                                        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">{item.label}</p>
                                        <p className="text-sm text-slate-700 font-medium">{item.value}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div>
                            {formStatus === 'success' && (
                                <p className="text-green-700 bg-green-50 border border-green-50 p-3 mb-6 text-sm">
                                    Message sent successfully!
                                </p>
                            )}
                            {formStatus === 'error' && (
                                <p className="text-red-700 bg-red-50 border border-red-50 p-3 mb-6 text-sm">
                                    Something went wrong. Please try again.
                                </p>
                            )}
                            <form onSubmit={handleSubmit} className="space-y-5">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">Name</label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
                                            className="block w-full px-4 py-3 border border-slate-300 text-slate-900 text-sm focus:outline-none focus:border-[#0060BF] transition-colors"
                                            placeholder="Your name"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">Email</label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                            className="block w-full px-4 py-3 border border-slate-300 text-slate-900 text-sm focus:outline-none focus:border-[#0060BF] transition-colors"
                                            placeholder="your@email.com"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">Subject</label>
                                    <input
                                        type="text"
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleChange}
                                        required
                                        className="block w-full px-4 py-3 border border-slate-300 text-slate-900 text-sm focus:outline-none focus:border-[#0060BF] transition-colors"
                                        placeholder="How can we help?"
                                    />
                                </div>
                                <div>
                                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">Message</label>
                                    <textarea
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        required
                                        rows={5}
                                        className="block w-full px-4 py-3 border border-slate-300 text-slate-900 text-sm focus:outline-none focus:border-[#0060BF] transition-colors resize-none"
                                        placeholder="Write your message..."
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="group w-full bg-[#0060BF] text-white py-3 px-6 text-sm font-bold hover:bg-[#004E9C] cursor-pointer transition-all duration-300 tracking-wide flex items-center justify-center gap-2"
                                >
                                    <span>SEND MESSAGE</span>
                                    <SendHorizontal 
                                        size={16} 
                                        className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" 
                                    />
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </div>
    );
};

export default Home;