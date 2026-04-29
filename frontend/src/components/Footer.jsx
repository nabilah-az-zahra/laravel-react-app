import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="font-neue bg-white border-t border-slate-200">
            <div className="max-w-7xl mx-auto px-6 py-16">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
                    <div>
                        <p className="text-xl font-bold text-[#0060BF] tracking-tight mb-1">HOSPITAL</p>
                        <p className="text-xs text-slate-400 mb-5">Healthcare Center</p>
                        <p className="text-slate-500 text-sm leading-relaxed mb-6">
                            Providing comprehensive, compassionate healthcare for you and your family since 1990.
                        </p>
                        <div className="space-y-4 text-sm text-slate-500">
                            <div className="flex items-start gap-3">
                                <MapPin size={18} className="shrink-0 text-[#0060BF]" />
                                <p>123 Health Street, Medical City</p>
                            </div>

                            <div className="flex items-center gap-3">
                                <Phone size={18} className="shrink-0 text-[#0060BF]" />
                                <p>+62 123 456 7890</p>
                            </div>

                            <div className="flex items-center gap-3">
                                <Mail size={18} className="shrink-0 text-[#0060BF]" />
                                <p>info@hospital.com</p>
                            </div>
                        </div>
                    </div>
                    <div>
                        <p className="text-xs font-bold text-slate-900 uppercase tracking-widest mb-5">Navigate</p>
                        <ul className="space-y-3">
                            {[
                                { label: 'Home', href: '/' },
                                { label: 'Services', href: '/services' },
                                { label: 'Our Doctors', href: '/doctors' },
                                { label: 'Health News', href: '/news' },
                                { label: 'Contact Us', href: '/contact' },
                                { label: 'Book Appointment', href: '/appointment' },
                            ].map(link => (
                                <li key={link.label}>
                                    <Link
                                        to={link.href}
                                        className="text-slate-500 text-sm hover:text-[#0060BF] transition-colors"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <p className="text-xs font-bold text-slate-900 uppercase tracking-widest mb-5">Services</p>
                        <ul className="space-y-3">
                            {[
                                'Emergency & Urgent Care',
                                'Diagnostic & Laboratory',
                                'Medical & Surgical',
                                'Specialized Centers',
                                'Rehabilitation & Wellness',
                            ].map(service => (
                                <li key={service}>
                                    <Link
                                        to="/services"
                                        className="text-slate-500 text-sm hover:text-[#0060BF] transition-colors"
                                    >
                                        {service}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <p className="text-xs font-bold text-slate-900 uppercase tracking-widest mb-5">Hours</p>
                        <div className="space-y-3">
                            {[
                                { day: 'Monday – Friday', hours: '08:00 – 20:00' },
                                { day: 'Saturday – Sunday', hours: '08:00 – 16:00' },
                                { day: 'Emergency', hours: '24 Hours, 7 Days' },
                            ].map(item => (
                                <div key={item.day} className="flex items-start justify-between gap-4 text-sm border-b border-slate-100 pb-3">
                                    <p className="text-slate-500">{item.day}</p>
                                    <p className="text-slate-800 font-medium shrink-0">{item.hours}</p>
                                </div>
                            ))}
                        </div>

                        <div className="mt-6 p-4 bg-blue-50 border border-[#0060BF]">
                            <p className="text-xs font-bold text-[#0060BF] uppercase tracking-wider mb-1">Emergency Line</p>
                            <p className="text-lg font-bold text-[#0060BF]">119</p>
                            <p className="text-xs text-[#0060BF] mt-0.5">Available 24/7</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="border-t border-slate-200">
                <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-3">
                    <p className="text-slate-400 text-xs">© 2026 HOSPITAL. All rights reserved.</p>
                    <div className="flex items-center gap-6">
                        {['Privacy Policy', 'Terms of Service', 'Accessibility'].map(item => (
                            <a key={item} href="#" className="text-slate-400 text-xs hover:text-slate-700 transition-colors">
                                {item}
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;