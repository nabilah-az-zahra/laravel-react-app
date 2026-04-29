import { useState } from 'react';
import { NavLink, Link, useLocation, useNavigate } from 'react-router-dom';
import {
    Stethoscope, Microscope, Activity,
    Syringe, HeartPulse, ChevronDown, Phone
} from 'lucide-react';

const serviceCategories = [
    {
        category: 'Emergency & Urgent Care',
        icon: <Activity className="text-[#E11D48]" size={16} />,
        description: 'Critical & immediate care',
        items: ['Emergency Department (24/7)', 'Urgent Care / Walk-in Clinic', 'Ambulance & Paramedic Services', 'Trauma & Critical Care (ICU/NICU)'],
    },
    {
        category: 'Diagnostic & Laboratory',
        icon: <Microscope className="text-[#CA8A04]" size={16} />,
        description: 'Testing & screenings',
        items: ['Radiology & Imaging', 'Pathology & Blood Lab', 'Cardiology Testing', 'Health Screenings'],
    },
    {
        category: 'Medical & Surgical Services',
        icon: <Stethoscope className="text-[#0891B2]" size={16} />,
        description: 'Procedures & operations',
        items: ['General Surgery', 'Day Surgery', "Maternity & Women's Health", 'Inpatient Care'],
    },
    {
        category: 'Specialized Clinical Centers',
        icon: <HeartPulse className="text-[#7C3AED]" size={16} />,
        description: 'Specialized conditions',
        items: ['Oncology Center', 'Orthopedics', 'Neurology', 'Pediatrics'],
    },
    {
        category: 'Rehabilitation & Wellness',
        icon: <Syringe className="text-[#10B981]" size={16} />,
        description: 'Recovery & support',
        items: ['Physical & Occupational Therapy', 'Pharmacy', 'Mental Health Services', 'Home Healthcare'],
    },
];

const Navbar = () => {
    const [showServices, setShowServices] = useState(false);
    const [hoveredCategory, setHoveredCategory] = useState(serviceCategories[0]);
    const location = useLocation();
    const navigate = useNavigate();
    const isServicesActive = location.pathname === '/services';

    const handleServiceItemClick = (category) => {
        setShowServices(false);
        navigate(`/services?category=${encodeURIComponent(category)}`);
    };

    return (
        <>
            <div className="font-neue bg-[#0060BF] text-white text-xs py-2 px-6 hidden md:block">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <p className="text-[#DEEAE9]">123 Health Street, Medical City — Open 24 hours</p>
                    <div className="flex items-center gap-1.5 font-semibold">
                        <Phone size={11} />
                        <span>+62 123 456 7890</span>
                    </div>
                </div>
            </div>
            <nav className="font-neue bg-white border-b border-slate-200 sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex items-center justify-between h-16">
                        <Link to="/" className="shrink-0">
                            <p className="text-xl font-bold text-[#0060BF] tracking-tight">HOSPITAL</p>
                            <p className="text-xs text-slate-400 leading-none -mt-0.5">Healthcare Center</p>
                        </Link>
                        <div className="hidden md:flex items-center h-full">
                            <div className="relative h-full flex items-center">
                                <button
                                    onClick={() => setShowServices(!showServices)}
                                    className={`flex items-center gap-1 px-4 h-full text-sm font-medium transition-colors border-b-2 ${
                                        isServicesActive || showServices
                                            ? 'text-[#0060BF] border-[#0060BF]'
                                            : 'text-slate-600 border-transparent hover:text-[#0060BF] hover:border-[#0060BF]'
                                    }`}
                                >
                                    Services
                                    <ChevronDown size={13} className={`transition-transform duration-200 ${showServices ? 'rotate-180' : ''}`} />
                                </button>
                                {showServices && (
                                    <div className="fixed inset-0 z-40" onClick={() => setShowServices(false)} />
                                )}
                                <div
                                    className={`fixed z-50 bg-white border border-slate-200 shadow-lg transition-all duration-200 ${
                                        showServices ? 'opacity-100 pointer-events-auto translate-y-0' : 'opacity-0 pointer-events-none -translate-y-1'
                                    }`}
                                    style={{ top: '96px', left: '50%', width: '780px', transform: `translateX(-50%) translateY(${showServices ? '0' : '-4px'})` }}
                                >
                                    <div className="flex">
                                        <div className="w-56 border-r border-slate-100 py-2 shrink-0">
                                            {serviceCategories.map(cat => (
                                                <button
                                                    key={cat.category}
                                                    onMouseEnter={() => setHoveredCategory(cat)}
                                                    onClick={() => handleServiceItemClick(cat.category)}
                                                    className={`w-full flex items-center gap-3 px-4 py-2.5 text-left transition-colors ${
                                                        hoveredCategory?.category === cat.category
                                                            ? 'bg-[#E5F0FA] text-[#0060BF]'
                                                            : 'text-slate-600 hover:bg-slate-50'
                                                    }`}
                                                >
                                                    {cat.icon}
                                                    <p className="text-xs font-semibold leading-snug">{cat.category}</p>
                                                </button>
                                            ))}
                                        </div>
                                        <div className="flex-1 p-6">
                                            {hoveredCategory && (
                                                <>
                                                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">
                                                        {hoveredCategory.category}
                                                    </p>
                                                    <div className="grid grid-cols-2 gap-x-8 gap-y-1">
                                                        {hoveredCategory.items.map(item => (
                                                            <button
                                                                key={item}
                                                                onClick={() => handleServiceItemClick(hoveredCategory.category)}
                                                                className="flex items-center gap-2 py-2 text-left border-b border-slate-100 group"
                                                            >
                                                                <span className="w-px h-3 bg-[#DEEAE9] shrink-0 group-hover:bg-[#0060BF] transition-colors" />
                                                                <p className="text-sm text-slate-600 group-hover:text-[#0060BF] transition-colors">
                                                                    {item}
                                                                </p>
                                                            </button>
                                                        ))}
                                                    </div>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                    <div className="border-t border-slate-100 px-6 py-2.5 flex items-center justify-between bg-slate-50">
                                        <p className="text-xs text-slate-400">Browse all medical services</p>
                                        <Link
                                            to="/services"
                                            onClick={() => setShowServices(false)}
                                            className="text-xs font-semibold text-[#0060BF] hover:underline"
                                        >
                                            View All Services →
                                        </Link>
                                    </div>
                                </div>
                            </div>
                            {[
                                { to: '/doctors', label: 'Doctors' },
                                { to: '/news', label: 'News' },
                                { to: '/contact', label: 'Contact' },
                            ].map(link => (
                                <NavLink
                                    key={link.to}
                                    to={link.to}
                                    className={({ isActive }) =>
                                        `px-4 h-full flex items-center text-sm font-medium transition-colors border-b-2 ${
                                            isActive
                                                ? 'text-[#0060BF] border-[#0060BF]'
                                                : 'text-slate-600 border-transparent hover:text-[#0060BF] hover:border-[#0060BF]'
                                        }`
                                    }
                                >
                                    {link.label}
                                </NavLink>
                            ))}
                        </div>
                        <div className="flex items-center gap-3 shrink-0">
                            <Link
                                to="/appointment"
                                className="bg-[#0060BF] text-white px-5 py-2 text-sm font-semibold hover:bg-[#004E9C] transition-colors"
                            >
                                Book Appointment
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    );
};

export default Navbar;