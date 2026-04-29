import { useState, useEffect } from 'react';
import axios from '../../api/axios';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { Link } from 'react-router-dom';
import { Search, SquareUserRound } from 'lucide-react';

const Doctors = () => {
    const [doctors, setDoctors] = useState([]);
    const [filteredDoctors, setFilteredDoctors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [specialization, setSpecialization] = useState('');
    const [appliedSearch, setAppliedSearch] = useState('');
    const [appliedSpecialization, setAppliedSpecialization] = useState('');

    useEffect(() => {
        const fetchDoctors = async () => {
            try {
                const response = await axios.get('/doctors');
                setDoctors(response.data.data);
                setFilteredDoctors(response.data.data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchDoctors();
    }, []);

    const specializations = [...new Set(doctors.map(d => d.specialization))];

    const handleApply = () => {
        setAppliedSearch(search);
        setAppliedSpecialization(specialization);
        setFilteredDoctors(doctors.filter(doctor => {
            const matchesSearch = doctor.name.toLowerCase().includes(search.toLowerCase());
            const matchesSpec = specialization === '' || doctor.specialization === specialization;
            return matchesSearch && matchesSpec;
        }));
    };

    const handleClear = () => {
        setSearch('');
        setSpecialization('');
        setAppliedSearch('');
        setAppliedSpecialization('');
        setFilteredDoctors(doctors);
    };

    const isFiltered = appliedSearch !== '' || appliedSpecialization !== '';

    return (
        <div className="font-neue bg-white">
            <Navbar />
            <div className="border-b border-slate-200 py-16 px-6">
                <div className="max-w-7xl mx-auto">
                    <p className="text-xs font-bold text-[#0060BF] uppercase tracking-[0.25em] mb-3">Meet Our Team</p>
                    <div className="flex items-end justify-between">
                        <h1 className="text-5xl font-bold text-slate-900 tracking-tight">Our Doctors</h1>
                        <p className="text-slate-400 text-sm max-w-sm text-right">
                            Experienced and dedicated doctors here to provide the best medical care.
                        </p>
                    </div>
                </div>
            </div>
            <section className="py-12 px-6">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-12">
                    <div style={{ flex: '0 0 26%' }}>
                        <div className="border border-slate-200 p-6 sticky top-24">
                            <p className="text-xs font-bold text-slate-900 uppercase tracking-widest mb-6">Filter Doctors</p>

                            <div className="mb-5">
                                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">
                                    Search Name or Keyword
                                </label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)}
                                        onKeyDown={(e) => e.key === 'Enter' && handleApply()}
                                        placeholder="e.g. Dr. John, Cardiology"
                                        className="w-full px-4 py-2.5 border border-slate-300 text-sm focus:outline-none focus:border-[#0060BF] transition-colors pr-10"
                                    />
                                    <button
                                        onClick={handleApply}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-[#0060BF] transition-colors text-sm"
                                    >
                                        <Search size={16}/>
                                    </button>
                                </div>
                            </div>
                            <div className="mb-6">
                                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">
                                    Specialization
                                </label>
                                <select
                                    value={specialization}
                                    onChange={(e) => setSpecialization(e.target.value)}
                                    className="w-full px-4 py-2.5 border border-slate-300 text-sm focus:outline-none focus:border-[#0060BF] transition-colors bg-white"
                                >
                                    <option value="">All Specializations</option>
                                    {specializations.map(spec => (
                                        <option key={spec} value={spec}>{spec}</option>
                                    ))}
                                </select>
                            </div>
                            <button
                                onClick={handleApply}
                                className="w-full bg-[#0060BF] text-white py-2.5 text-sm font-semibold hover:bg-[#004E9C] cursor-pointer transition-colors mb-2"
                            >
                                Apply Filter
                            </button>
                            <button
                                onClick={handleClear}
                                className="w-full bg-white text-slate-600 py-2.5 border border-slate-300 text-sm font-medium hover:bg-slate-50 cursor-pointer transition-colors"
                            >
                                Clear All Filters
                            </button>
                            {isFiltered && (
                                <div className="mt-5 pt-5 border-t border-slate-200">
                                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Active Filters</p>
                                    <div className="space-y-2">
                                        {appliedSearch && (
                                            <div className="flex items-center justify-between">
                                                <p className="text-xs text-slate-500">Keyword</p>
                                                <p className="text-xs font-medium text-slate-700">{appliedSearch}</p>
                                            </div>
                                        )}
                                        {appliedSpecialization && (
                                            <div className="flex items-center justify-between">
                                                <p className="text-xs text-slate-500">Specialization</p>
                                                <p className="text-xs font-medium text-slate-700">{appliedSpecialization}</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                    <div style={{ flex: '0 0 70%' }}>
                        <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-200">
                            <p className="text-xs text-slate-400 uppercase tracking-wider">
                                {filteredDoctors.length} doctor{filteredDoctors.length !== 1 ? 's' : ''}
                                {isFiltered && ' — filtered'}
                            </p>
                        </div>
                        {loading ? (
                            <p className="text-center text-slate-400 py-20">Loading...</p>
                        ) : filteredDoctors.length === 0 ? (
                            <div className="text-center py-20 border border-slate-200">
                                <p className="text-slate-400 text-sm">No doctors found matching your filters.</p>
                                <button onClick={handleClear} className="mt-3 text-[#0060BF] text-sm hover:underline">
                                    Clear filters
                                </button>
                            </div>
                        ) : (
                            <div className="divide-y divide-slate-200 border border-slate-200">
                                {filteredDoctors.map(doctor => (
                                    <div
                                        key={doctor.id}
                                        className="p-6 hover:bg-slate-50 transition-colors flex gap-6 items-start group"
                                    >
                                        {doctor.photo ? (
                                            <img
                                                src={`http://localhost:8000/storage/${doctor.photo}`}
                                                alt={doctor.name}
                                                className="w-16 h-16 object-cover shrink-0"
                                            />
                                        ) : (
                                            <div className="w-16 h-16 bg-slate-100 flex items-center justify-center shrink-0">
                                                <span className="text-2xl">
                                                    <SquareUserRound size={28} className="text-slate-400" />
                                                </span>
                                            </div>
                                        )}
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-start justify-between gap-4">
                                                <div>
                                                    <p className="text-xs font-bold text-[#0060BF] uppercase tracking-wider mb-1">
                                                        {doctor.specialization}
                                                    </p>
                                                    <h3 className="text-base font-bold text-slate-900">{doctor.name}</h3>
                                                </div>
                                                <Link
                                                    to="/appointment"
                                                    className="shrink-0 bg-[#0060BF] text-white px-4 py-2 text-xs font-semibold hover:bg-[#004E9C] transition-colors"
                                                >
                                                    Book Appointment
                                                </Link>
                                            </div>
                                            {doctor.description && (
                                                <p className="text-slate-500 text-sm mt-2 leading-relaxed">{doctor.description}</p>
                                            )}
                                            <div className="flex gap-6 mt-3 pt-3 border-t border-slate-100">
                                                {doctor.email && (
                                                    <p className="text-slate-400 text-xs">{doctor.email}</p>
                                                )}
                                                {doctor.phone && (
                                                    <p className="text-slate-400 text-xs">{doctor.phone}</p>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </section>
            <section className="py-16 px-6 bg-[#0060BF] border-t border-[#0060BF]">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-end justify-between gap-8">
                    <div>
                        <p className="text-blue-200 text-xs font-bold uppercase tracking-[0.25em] mb-3">Get Started</p>
                        <h2 className="text-3xl font-bold text-white tracking-tight">Want to Book an Appointment?</h2>
                        <p className="text-blue-100 mt-2">Get in touch and we will connect you with the right doctor.</p>
                    </div>
                    <div className="flex gap-3 shrink-0">
                        <Link to="/appointment" className="bg-white text-[#0060BF] px-6 py-3 text-sm font-bold hover:bg-blue-50 transition-colors">
                            Book Appointment
                        </Link>
                        <Link to="/contact" className="border border-white/40 text-white px-6 py-3 text-sm font-medium hover:bg-white/10 transition-colors">
                            Contact Us
                        </Link>
                    </div>
                </div>
            </section>
            <Footer />
        </div>
    );
};

export default Doctors;