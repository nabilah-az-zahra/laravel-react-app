import { useState } from 'react';
import axios from '../../api/axios';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { Link } from 'react-router-dom';
import { ChevronRight, SendHorizontal } from 'lucide-react';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '', email: '', subject: '', message: '',
    });
    const [formStatus, setFormStatus] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await axios.post('/messages', formData);
            setFormStatus('success');
            setFormData({ name: '', email: '', subject: '', message: '' });
        } catch (err) {
            setFormStatus('error');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="font-neue bg-white">
            <Navbar />
            <div className="border-b border-slate-200 py-16 px-6">
                <div className="max-w-7xl mx-auto">
                    <p className="text-xs font-bold text-[#0060BF] uppercase tracking-[0.25em] mb-3">Get In Touch</p>
                    <div className="flex items-end justify-between">
                        <h1 className="text-5xl font-bold text-slate-900 tracking-tight">Contact Us</h1>
                        <p className="text-slate-400 text-sm max-w-sm text-right">
                            We are here to help. Reach out and we will get back to you as soon as possible.
                        </p>
                    </div>
                </div>
            </div>
            <div className="border-b border-slate-200">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-slate-200">
                        {[
                            { label: 'Address', value: '123 Health Street, Medical City' },
                            { label: 'Phone', value: '+62 123 456 7890' },
                            { label: 'Email', value: 'info@hospital.com' },
                            { label: 'Emergency', value: '119 — Available 24/7' },
                        ].map(item => (
                            <div key={item.label} className="py-6 px-6 first:pl-0">
                                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">{item.label}</p>
                                <p className="text-sm font-medium text-slate-800">{item.value}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <section className="py-16 px-6">
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16">
                    <div>
                        <p className="text-xs font-bold text-slate-900 uppercase tracking-widest mb-6">Why Contact Us</p>
                        <h2 className="text-3xl font-bold text-slate-900 tracking-tight mb-4">We're Here For You</h2>
                        <p className="text-slate-500 text-sm leading-relaxed mb-10">
                            Whether you need to book an appointment, ask about our services, or have a medical inquiry — our team is ready to assist you within 24 hours.
                        </p>
                        <div className="border-l-4 border-red-500 pl-6 mb-10">
                            <p className="text-xs font-bold text-red-600 uppercase tracking-wider mb-2">Medical Emergency</p>
                            <p className="text-slate-500 text-sm leading-relaxed mb-3">
                                For life-threatening emergencies, call our emergency line immediately or visit our Emergency Department.
                            </p>
                            <p className="text-4xl font-bold text-slate-900">119</p>
                            <p className="text-xs text-slate-400 mt-1">Available 24 hours, 7 days a week</p>
                        </div>
                        <div>
                            <p className="text-xs font-bold text-slate-900 uppercase tracking-widest mb-4">What to Expect</p>
                            <div className="space-y-0 divide-y divide-slate-200 border-t border-slate-200">
                                {[
                                    'Acknowledgement within 1 hour',
                                    'A dedicated staff member assigned to your inquiry',
                                    'Full response within 24 hours on working days',
                                    'Follow-up call if further assistance is needed',
                                ].map((item, index) => (
                                    <div key={item} className="flex items-start gap-4 py-4">
                                        <p className="text-xs font-bold text-[#0060BF] shrink-0 mt-0.5">0{index + 1}</p>
                                        <p className="text-slate-500 text-sm leading-relaxed">{item}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="border-b border-slate-200 pb-6 mb-8">
                            <p className="text-xs font-bold text-slate-900 uppercase tracking-widest">Send Us a Message</p>
                            <p className="text-slate-400 text-sm mt-1">Fill in the form below and we'll get back to you shortly.</p>
                        </div>

                        {formStatus === 'success' && (
                            <div className="border-l-4 border-green-500 pl-4 mb-6">
                                <p className="text-sm font-semibold text-slate-800">Message sent successfully</p>
                                <p className="text-xs text-slate-400 mt-0.5">We will get back to you within 24 hours.</p>
                            </div>
                        )}
                        {formStatus === 'error' && (
                            <div className="border-l-4 border-red-500 pl-4 mb-6">
                                <p className="text-sm font-semibold text-slate-800">Something went wrong</p>
                                <p className="text-xs text-slate-400 mt-0.5">Please try again or contact us directly.</p>
                            </div>
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
                                        placeholder="Your full name"
                                        className="block w-full px-4 py-3 border border-slate-300 text-slate-900 text-sm focus:outline-none focus:border-[#0060BF] transition-colors"
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
                                        placeholder="your@email.com"
                                        className="block w-full px-4 py-3 border border-slate-300 text-slate-900 text-sm focus:outline-none focus:border-[#0060BF] transition-colors"
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
                                    placeholder="How can we help you?"
                                    className="block w-full px-4 py-3 border border-slate-300 text-slate-900 text-sm focus:outline-none focus:border-[#0060BF] transition-colors"
                                />
                            </div>
                            <div>
                                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">Message</label>
                                <textarea
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                    rows={6}
                                    placeholder="Write your message here..."
                                    className="block w-full px-4 py-3 border border-slate-300 text-slate-900 text-sm focus:outline-none focus:border-[#0060BF] transition-colors resize-none"
                                />
                            </div>
                            <button
                                type="submit"
                                disabled={loading}
                                className="group w-full bg-[#0060BF] text-white py-3 px-6 text-sm font-bold hover:bg-[#004E9C] cursor-pointer transition-all disabled:opacity-50 tracking-wide flex items-center justify-center gap-2"
                            >
                                {loading ? (
                                    'Sending...'
                                ) : (
                                    <>
                                        <span>SEND MESSAGE</span>
                                        <SendHorizontal 
                                            size={18} 
                                            className="transition-transform duration-300 group-hover:translate-x-1" 
                                        />
                                    </>
                                )}
                            </button>
                        </form>
                        <div className="mt-8 pt-6 border-t border-slate-200 flex items-center justify-between">
                            <p className="text-xs text-slate-400">Prefer to speak directly?</p>
                            <Link 
                                to="/appointment" 
                                className="group flex items-center gap-1 text-xs font-semibold text-[#0060BF] hover:underline"
                            >
                                <span>Book an Appointment</span>
                                <ChevronRight 
                                    size={14} 
                                    strokeWidth={3} 
                                    className="transition-transform duration-300 group-hover:translate-x-1" 
                                />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </div>
    );
};

export default Contact;