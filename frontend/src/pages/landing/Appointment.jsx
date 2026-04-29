import { useState, useEffect } from 'react';
import axios from '../../api/axios';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { Link } from 'react-router-dom';
import { SquareUserRound, ArrowRight, ArrowLeft, SendHorizontal } from 'lucide-react';

const Appointment = () => {
    const [doctors, setDoctors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [formStatus, setFormStatus] = useState('');
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState({
        name: '', gender: '', birth_date: '', phone: '',
        email: '', address: '', doctor_id: '',
        appointment_date: '', appointment_time: '',
        symptoms: '', notes: '',
    });

    useEffect(() => {
        const fetchDoctors = async () => {
            try {
                const response = await axios.get('/doctors');
                setDoctors(response.data.data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchDoctors();
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        setFormStatus('');
        try {
            await axios.post('/appointments', formData);
            setFormStatus('success');
            setCurrentStep(1);
            setFormData({
                name: '', gender: '', birth_date: '', phone: '',
                email: '', address: '', doctor_id: '',
                appointment_date: '', appointment_time: '',
                symptoms: '', notes: '',
            });
        } catch (err) {
            setFormStatus('error');
        } finally {
            setSubmitting(false);
        }
    };

    const timeSlots = [
        '08:00', '08:30', '09:00', '09:30', '10:00', '10:30',
        '11:00', '11:30', '13:00', '13:30', '14:00', '14:30',
        '15:00', '15:30', '16:00', '16:30',
    ];

    const steps = [
        { number: 1, label: 'Personal Info' },
        { number: 2, label: 'Appointment' },
        { number: 3, label: 'Medical Info' },
    ];

    const selectedDoctor = doctors.find(d => d.id === parseInt(formData.doctor_id));

    const inputClass = "block w-full px-4 py-3 border border-slate-300 text-slate-900 text-sm focus:outline-none focus:border-blue-700 transition-colors bg-white";
    const labelClass = "text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2";

    return (
        <div className="font-neue bg-white">
            <Navbar />
            <div className="border-b border-slate-200 py-16 px-6">
                <div className="max-w-7xl mx-auto">
                    <p className="text-xs font-bold text-[#0060BF] uppercase tracking-[0.15em] mb-3">Schedule a Visit</p>
                    <div className="flex items-end justify-between">
                        <h1 className="text-5xl font-bold text-slate-900 tracking-tight">Book an Appointment</h1>
                        <p className="text-slate-400 text-sm max-w-sm text-right">
                            Fill in the form to schedule a visit with one of our experienced doctors.
                        </p>
                    </div>
                </div>
            </div>
            <section className="py-16 px-6">
                <div className="max-w-3xl mx-auto">
                    <div className="flex items-center mb-12">
                        {steps.map((step, index) => (
                            <div key={step.number} className="flex items-center flex-1">
                                <div
                                    className="flex items-center gap-3 cursor-pointer"
                                    onClick={() => step.number < currentStep && setCurrentStep(step.number)}
                                >
                                    <div className={`w-8 h-8 flex items-center justify-center text-xs font-bold border-2 transition-all ${
                                        currentStep === step.number
                                            ? 'border-[#0060BF] bg-[#0060BF] text-white'
                                            : currentStep > step.number
                                            ? 'border-[#0060BF] bg-white text-[#0060BF]'
                                            : 'border-slate-300 bg-white text-slate-400'
                                    }`}>
                                        {currentStep > step.number ? '✓' : step.number}
                                    </div>
                                    <p className={`text-xs font-bold uppercase tracking-wider hidden md:block ${
                                        currentStep === step.number ? 'text-slate-900' : 'text-slate-400'
                                    }`}>
                                        {step.label}
                                    </p>
                                </div>
                                {index < steps.length - 1 && (
                                    <div className="flex-1 mx-4 h-px bg-slate-200" />
                                )}
                            </div>
                        ))}
                    </div>
                    {formStatus === 'success' && (
                        <div className="border border-slate-200 p-12 text-center mb-8">
                            <p className="text-xs font-bold text-[#0060BF] uppercase tracking-[0.25em] mb-4">Confirmed</p>
                            <h2 className="text-3xl font-bold text-slate-900 tracking-tight mb-3">Appointment Booked</h2>
                            <p className="text-slate-500 text-sm max-w-sm mx-auto leading-relaxed mb-8">
                                Your appointment has been submitted. We will contact you shortly to confirm your schedule.
                            </p>
                            <button
                                onClick={() => setFormStatus('')}
                                className="bg-[#0060BF] text-white px-8 py-3 text-sm font-bold hover:bg-[#004E9C] cursor-pointer transition-colors"
                            >
                                Book Another Appointment
                            </button>
                        </div>
                    )}
                    {formStatus === 'error' && (
                        <div className="border-l-4 border-red-500 pl-4 mb-8">
                            <p className="text-sm font-semibold text-slate-800">Booking failed</p>
                            <p className="text-xs text-slate-400 mt-0.5">Please check your inputs and try again.</p>
                        </div>
                    )}
                    {formStatus !== 'success' && (
                        <form onSubmit={handleSubmit}>
                            {currentStep === 1 && (
                                <div className="border border-slate-200">
                                    <div className="border-b border-slate-200 px-8 py-5 flex items-center justify-between">
                                        <div>
                                            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Step 01</p>
                                            <h2 className="text-lg font-bold text-slate-900 mt-0.5">Personal Information</h2>
                                        </div>
                                    </div>
                                    <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-5">
                                        <div className="md:col-span-2">
                                            <label className={labelClass}>Full Name</label>
                                            <input type="text" name="name" value={formData.name} onChange={handleChange} required placeholder="Your full name" className={inputClass} />
                                        </div>
                                        <div>
                                            <label className={labelClass}>Gender</label>
                                            <select name="gender" value={formData.gender} onChange={handleChange} required className={inputClass}>
                                                <option value="">Select gender</option>
                                                <option value="male">Male</option>
                                                <option value="female">Female</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className={labelClass}>Date of Birth</label>
                                            <input type="date" name="birth_date" value={formData.birth_date} onChange={handleChange} required className={inputClass} />
                                        </div>
                                        <div>
                                            <label className={labelClass}>Phone Number</label>
                                            <input type="text" name="phone" value={formData.phone} onChange={handleChange} required placeholder="+62 123 456 7890" className={inputClass} />
                                        </div>
                                        <div>
                                            <label className={labelClass}>Email</label>
                                            <input type="email" name="email" value={formData.email} onChange={handleChange} required placeholder="your@email.com" className={inputClass} />
                                        </div>
                                        <div className="md:col-span-2">
                                            <label className={labelClass}>Address</label>
                                            <textarea name="address" value={formData.address} onChange={handleChange} required rows={2} placeholder="Your full address" className={inputClass} />
                                        </div>
                                    </div>
                                    <div className="border-t border-slate-200 px-8 py-5">
                                        <button 
                                            type="button" 
                                            onClick={() => setCurrentStep(2)} 
                                            className="group w-full bg-[#0060BF] text-white py-3 text-sm font-bold hover:bg-[#004E9C] cursor-pointer transition-all tracking-wide flex items-center justify-center gap-2"
                                        >
                                            <span>CONTINUE TO APPOINTMENT DETAILS</span>
                                            <ArrowRight 
                                                size={18} 
                                                className="transition-transform duration-300 group-hover:translate-x-1.5" 
                                            />
                                        </button>
                                    </div>
                                </div>
                            )}
                            {currentStep === 2 && (
                                <div className="border border-slate-200">
                                    <div className="border-b border-slate-200 px-8 py-5">
                                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Step 02</p>
                                        <h2 className="text-lg font-bold text-slate-900 mt-0.5">Appointment Details</h2>
                                    </div>
                                    <div className="p-8 space-y-5">
                                        <div>
                                            <label className={labelClass}>Select Doctor</label>
                                            <select name="doctor_id" value={formData.doctor_id} onChange={handleChange} required className={inputClass}>
                                                <option value="">Select a doctor</option>
                                                {doctors.map(doctor => (
                                                    <option key={doctor.id} value={doctor.id}>{doctor.name} — {doctor.specialization}</option>
                                                ))}
                                            </select>
                                        </div>
                                        {selectedDoctor && (
                                            <div className="flex items-center gap-4 border border-slate-200 p-4">
                                                {selectedDoctor.photo ? (
                                                    <img src={`http://localhost:8000/storage/${selectedDoctor.photo}`} alt={selectedDoctor.name} className="w-12 h-12 object-cover shrink-0" />
                                                ) : (
                                                    <div className="w-12 h-12 bg-slate-100 flex items-center justify-center shrink-0">
                                                        <span className="text-xl">
                                                            <SquareUserRound />
                                                        </span>
                                                    </div>
                                                )}
                                                <div>
                                                    <p className="text-xs font-bold text-[#0060BF] uppercase tracking-wider">{selectedDoctor.specialization}</p>
                                                    <p className="text-sm font-bold text-slate-900">{selectedDoctor.name}</p>
                                                </div>
                                            </div>
                                        )}
                                        <div className="grid grid-cols-2 gap-5">
                                            <div>
                                                <label className={labelClass}>Appointment Date</label>
                                                <input type="date" name="appointment_date" value={formData.appointment_date} onChange={handleChange} required min={new Date(Date.now() + 86400000).toISOString().split('T')[0]} className={inputClass} />
                                            </div>
                                            <div>
                                                <label className={labelClass}>Appointment Time</label>
                                                <select name="appointment_time" value={formData.appointment_time} onChange={handleChange} required className={inputClass}>
                                                    <option value="">Select time slot</option>
                                                    {timeSlots.map(time => (
                                                        <option key={time} value={time}>{time}</option>
                                                    ))}
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="border-t border-slate-200 px-8 py-5 flex gap-3">
                                        <button 
                                            type="button" 
                                            onClick={() => setCurrentStep(1)} 
                                            className="group flex-1 bg-white text-slate-700 py-3 border border-slate-300 text-sm font-semibold hover:bg-slate-50 hover:text-slate-900 cursor-pointer transition-all flex items-center justify-center gap-2"
                                        >
                                            <ArrowLeft 
                                                size={18} 
                                                className="transition-transform duration-300 group-hover:-translate-x-1" 
                                            />
                                            <span>Back</span>
                                        </button>
                                        <button 
                                            type="button" 
                                            onClick={() => setCurrentStep(3)} 
                                            className="group flex-2 bg-[#0060BF] text-white py-3 px-4 text-sm font-bold hover:bg-[#004E9C] cursor-pointer transition-all tracking-wide flex items-center justify-center gap-2"
                                        >
                                            <span className="truncate">CONTINUE TO MEDICAL INFO</span>
                                            <ArrowRight 
                                                size={18} 
                                                className="transition-transform duration-300 group-hover:translate-x-1" 
                                            />
                                        </button>
                                    </div>
                                </div>
                            )}
                            {currentStep === 3 && (
                                <div className="border border-slate-200">
                                    <div className="border-b border-slate-200 px-8 py-5">
                                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Step 03</p>
                                        <h2 className="text-lg font-bold text-slate-900 mt-0.5">Medical Information</h2>
                                    </div>
                                    <div className="p-8 space-y-5">
                                        <div className="border border-slate-200 p-5">
                                            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Appointment Summary</p>
                                            <div className="grid grid-cols-2 gap-4">
                                                {[
                                                    { label: 'Patient', value: formData.name || '—' },
                                                    { label: 'Doctor', value: selectedDoctor?.name || '—' },
                                                    { label: 'Date', value: formData.appointment_date || '—' },
                                                    { label: 'Time', value: formData.appointment_time || '—' },
                                                ].map(item => (
                                                    <div key={item.label} className="flex items-center justify-between border-b border-slate-100 pb-2">
                                                        <p className="text-xs text-slate-400">{item.label}</p>
                                                        <p className="text-xs font-semibold text-slate-800">{item.value}</p>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                        <div>
                                            <label className={labelClass}>Symptoms / Condition</label>
                                            <textarea name="symptoms" value={formData.symptoms} onChange={handleChange} required rows={4} placeholder="Describe your symptoms or medical condition..." className={inputClass} />
                                        </div>
                                        <div>
                                            <label className={labelClass}>Additional Notes <span className="normal-case text-slate-300 font-normal">(optional)</span></label>
                                            <textarea name="notes" value={formData.notes} onChange={handleChange} rows={3} placeholder="Any additional information..." className={inputClass} />
                                        </div>
                                    </div>
                                    <div className="border-t border-slate-200 px-8 py-5 flex gap-3">
                                        <button 
                                            type="button" 
                                            onClick={() => setCurrentStep(2)} 
                                            className="group flex-1 bg-white text-slate-700 py-3 border border-slate-300 text-sm font-semibold hover:bg-slate-50 hover:text-slate-900 cursor-pointer transition-all flex items-center justify-center gap-2"
                                        >
                                            <ArrowLeft 
                                                size={18} 
                                                className="transition-transform duration-300 group-hover:-translate-x-1" 
                                            />
                                            <span>Back</span>
                                        </button>
                                        <button 
                                            type="submit" 
                                            disabled={submitting || loading} 
                                            className="group flex-1 bg-[#0060BF] text-white py-3 text-sm font-bold hover:bg-[#004E9C] cursor-pointer transition-all disabled:opacity-50 tracking-wide flex items-center justify-center gap-2"
                                        >
                                            {submitting ? (
                                                <span>BOOKING...</span>
                                            ) : (
                                                <>
                                                    <span>CONFIRM BOOKING</span>
                                                    <SendHorizontal 
                                                        size={18} 
                                                        className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-0.5" 
                                                    />
                                                </>
                                            )}
                                        </button>
                                    </div>
                                </div>
                            )}
                        </form>
                    )}
                </div>
            </section>
            <Footer />
        </div>
    );
};

export default Appointment;