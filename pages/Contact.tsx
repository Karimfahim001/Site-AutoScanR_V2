import React, { useState, FormEvent, useEffect } from 'react';
import { Mail, MessageSquare, Send, CheckCircle2, ShieldCheck, User, MapPin, Car, Phone } from 'lucide-react';
import { ViewState } from '../types';

interface ContactProps {
    setView: (view: ViewState) => void;
}

const Contact: React.FC<ContactProps> = ({ setView }) => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        subject: '',
        message: '',
        phone: '',
        plate: '',
        city: '',
        rgpd: false,
        honeypot: ''
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    // Validation
    const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email);
    const isFormValid =
        formData.firstName.trim() !== '' &&
        formData.lastName.trim() !== '' &&
        isEmailValid &&
        formData.subject !== '' &&
        formData.message.trim() !== '' &&
        formData.rgpd &&
        formData.honeypot === ''; // Anti-spam

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        // @ts-ignore
        const checked = type === 'checkbox' ? e.target.checked : undefined;

        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (!isFormValid) return;

        if (formData.honeypot !== '') {
            // Silently fail for bots
            return;
        }

        setIsSubmitting(true);

        // Simulate API call
        setTimeout(() => {
            setIsSubmitting(false);
            setIsSuccess(true);

            // Auto-reset after a delay if desired, or keep showing success
            setTimeout(() => {
                setIsSuccess(false);
                setFormData({
                    firstName: '', lastName: '', email: '', subject: '', message: '',
                    phone: '', plate: '', city: '', rgpd: false, honeypot: ''
                });
            }, 5000);
        }, 2000);
    };

    return (
        <div className="min-h-screen bg-gray-50 pt-20 pb-32">
            {/* Hero Section */}
            <section className="bg-brand-dark text-white py-20 relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&q=80')] opacity-5 mix-blend-overlay"></div>
                <div className="absolute -top-40 right-0 w-96 h-96 bg-brand-primary/20 rounded-full blur-[100px] pointer-events-none"></div>
                <div className="absolute -bottom-40 left-20 w-80 h-80 bg-brand-light/10 rounded-full blur-[80px] pointer-events-none"></div>

                <div className="max-w-4xl mx-auto px-4 text-center relative z-10 animate-fade-in-up">
                    <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest text-brand-light mb-6 backdrop-blur-sm shadow-sm">
                        <ShieldCheck size={14} /> Support & demandes pro – 7j/7
                    </div>
                    <h1 className="font-display text-4xl md:text-6xl font-bold mb-6 tracking-tight">
                        NOUS CONTACTER
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-300 font-light max-w-2xl mx-auto leading-relaxed">
                        Une question sur AutoScanR ? Écrivez-nous, réponse rapide.
                    </p>
                </div>
            </section>

            {/* Form Section */}
            <div className="max-w-3xl mx-auto px-4 -mt-10 relative z-20">
                <div className="bg-white rounded-[2rem] shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] border border-gray-100 p-8 md:p-12 transition-all duration-500 hover:shadow-[0_20px_40px_-15px_rgba(0,148,183,0.15)] animate-fade-in-up" style={{ animationDelay: '0.1s' }}>

                    {isSuccess ? (
                        <div className="py-16 text-center animate-fade-in-up" role="alert" aria-live="polite">
                            <div className="w-20 h-20 bg-green-100 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
                                <CheckCircle2 size={40} />
                            </div>
                            <h3 className="font-display text-2xl font-bold text-gray-900 mb-2">Message envoyé !</h3>
                            <p className="text-gray-600 text-lg mb-8">
                                Merci de nous avoir contactés. (Ceci est une démo). Nous vous répondrons dans les plus brefs délais !
                            </p>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-8" aria-label="Formulaire de contact">

                            {/* Row 1: Name & First name */}
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-2 group">
                                    <label htmlFor="firstName" className="block text-sm font-bold text-gray-700">Prénom <span className="text-red-500">*</span></label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-brand-primary transition-colors">
                                            <User size={18} />
                                        </div>
                                        <input
                                            type="text"
                                            id="firstName"
                                            name="firstName"
                                            value={formData.firstName}
                                            onChange={handleChange}
                                            required
                                            className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary focus:bg-white transition-all text-brand-dark"
                                            placeholder="Jean"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2 group">
                                    <label htmlFor="lastName" className="block text-sm font-bold text-gray-700">Nom <span className="text-red-500">*</span></label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-brand-primary transition-colors">
                                            <User size={18} />
                                        </div>
                                        <input
                                            type="text"
                                            id="lastName"
                                            name="lastName"
                                            value={formData.lastName}
                                            onChange={handleChange}
                                            required
                                            className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary focus:bg-white transition-all text-brand-dark"
                                            placeholder="Dupont"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Row 2: Email & Phone */}
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-2 group">
                                    <label htmlFor="email" className="block text-sm font-bold text-gray-700">Email <span className="text-red-500">*</span></label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-brand-primary transition-colors">
                                            <Mail size={18} />
                                        </div>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                            className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary focus:bg-white transition-all text-brand-dark"
                                            placeholder="jean.dupont@email.com"
                                        />
                                    </div>
                                    {formData.email && !isEmailValid && (
                                        <p className="text-xs text-red-500 font-medium animate-fade-in-up">Format d'email invalide</p>
                                    )}
                                </div>
                                <div className="space-y-2 group">
                                    <label htmlFor="phone" className="block text-sm font-bold text-gray-700">Téléphone <span className="text-gray-400 font-normal italic text-xs ml-1">(facultatif)</span></label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-brand-primary transition-colors">
                                            <Phone size={18} />
                                        </div>
                                        <input
                                            type="tel"
                                            id="phone"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary focus:bg-white transition-all text-brand-dark"
                                            placeholder="06 12 34 56 78"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Row 3: Optionals (Plate & City) */}
                            <div className="grid md:grid-cols-2 gap-6 bg-gray-50/50 p-4 rounded-2xl border border-gray-100 border-dashed">
                                <div className="space-y-2 group">
                                    <label htmlFor="plate" className="block text-sm font-bold text-gray-700">Immatriculation <span className="text-gray-400 font-normal italic text-xs ml-1">(intéressant pour diagnostic)</span></label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-brand-primary transition-colors">
                                            <Car size={18} />
                                        </div>
                                        <input
                                            type="text"
                                            id="plate"
                                            name="plate"
                                            value={formData.plate}
                                            onChange={handleChange}
                                            className="w-full pl-11 pr-4 py-3 bg-white border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all text-brand-dark uppercase placeholder-normal"
                                            placeholder="AA-123-BB"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2 group">
                                    <label htmlFor="city" className="block text-sm font-bold text-gray-700">Ville <span className="text-gray-400 font-normal italic text-xs ml-1">(facultatif)</span></label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-brand-primary transition-colors">
                                            <MapPin size={18} />
                                        </div>
                                        <input
                                            type="text"
                                            id="city"
                                            name="city"
                                            value={formData.city}
                                            onChange={handleChange}
                                            className="w-full pl-11 pr-4 py-3 bg-white border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all text-brand-dark"
                                            placeholder="Toulon"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Subject */}
                            <div className="space-y-2 group">
                                <label htmlFor="subject" className="block text-sm font-bold text-gray-700">Objet de la demande <span className="text-red-500">*</span></label>
                                <div className="relative">
                                    <select
                                        id="subject"
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleChange}
                                        required
                                        className={`w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary focus:bg-white transition-all appearance-none cursor-pointer ${formData.subject === '' ? 'text-gray-400' : 'text-brand-dark'}`}
                                    >
                                        <option value="" disabled className="text-gray-400">Sélectionnez un motif</option>
                                        <option value="info" className="text-brand-dark">Demande d’information</option>
                                        <option value="compatibility" className="text-brand-dark">Compatibilité véhicule</option>
                                        <option value="pro" className="text-brand-dark">Partenariat / Pro</option>
                                        <option value="tech" className="text-brand-dark">Problème technique</option>
                                        <option value="other" className="text-brand-dark">Autre</option>
                                    </select>
                                    {/* Custom Arrow */}
                                    <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none text-gray-400">
                                        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                                    </div>
                                </div>
                            </div>

                            {/* Message */}
                            <div className="space-y-2 group">
                                <label htmlFor="message" className="block text-sm font-bold text-gray-700">Votre message <span className="text-red-500">*</span></label>
                                <div className="relative">
                                    <div className="absolute top-4 left-4 pointer-events-none text-gray-400 group-focus-within:text-brand-primary transition-colors">
                                        <MessageSquare size={18} />
                                    </div>
                                    <textarea
                                        id="message"
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        required
                                        rows={5}
                                        className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary focus:bg-white transition-all text-brand-dark resize-y"
                                        placeholder="Comment pouvons-nous vous aider ?"
                                    ></textarea>
                                </div>
                            </div>

                            {/* Honeypot Anti-spam (Invisible) */}
                            <div className="absolute left-[-9999px] top-[-9999px]" aria-hidden="true" tabIndex={-1}>
                                <label htmlFor="honeypot">Ne remplissez pas ce champ si vous êtes humain</label>
                                <input
                                    type="text"
                                    id="honeypot"
                                    name="honeypot"
                                    tabIndex={-1}
                                    autoComplete="off"
                                    value={formData.honeypot}
                                    onChange={handleChange}
                                />
                            </div>

                            {/* RGPD */}
                            <div className="pt-4 border-t border-gray-100">
                                <div className="flex items-start gap-3">
                                    <div className="flex items-center h-5 mt-0.5">
                                        <input
                                            id="rgpd"
                                            name="rgpd"
                                            type="checkbox"
                                            checked={formData.rgpd}
                                            onChange={handleChange}
                                            required
                                            className="w-4 h-4 text-brand-primary bg-white border-gray-300 rounded focus:ring-brand-primary cursor-pointer transition-colors"
                                        />
                                    </div>
                                    <div className="text-sm flex-1">
                                        <label htmlFor="rgpd" className="font-medium text-gray-700 cursor-pointer">
                                            J’accepte que mes données soient utilisées uniquement pour traiter ma demande. <span className="text-red-500">*</span>
                                        </label>
                                        <p className="text-xs text-gray-500 mt-2 leading-relaxed bg-gray-50 p-4 rounded-xl border border-gray-100">
                                            <strong>Politique de confidentialité & RGPD :</strong><br />
                                            <span className="inline-block mt-1 space-y-1">
                                                <span className="block"><strong>Finalité :</strong> Traitement exclusif de votre demande de contact.</span>
                                                <span className="block"><strong>Base légale :</strong> Consentement actif.</span>
                                                <span className="block"><strong>Durée de conservation :</strong> Conservées le temps nécessaire au traitement, puis supprimées ou archivées.</span>
                                                <span className="block"><strong>Vos droits :</strong> Droit d'accès, de rectification, d'effacement et d'opposition. Contact à <a href="mailto:privacy@autoscanr.com" className="text-brand-primary hover:underline font-medium">privacy@autoscanr.com</a></span>
                                            </span>
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4">
                                <span className="text-xs text-gray-400 flex items-center gap-1.5 font-medium"><ShieldCheck size={14} /> Protection anti-spam</span>

                                <button
                                    type="submit"
                                    disabled={!isFormValid || isSubmitting}
                                    className={`w-full sm:w-auto min-w-[200px] flex justify-center items-center gap-2 py-4 px-8 rounded-xl font-bold text-white transition-all ${(!isFormValid || isSubmitting)
                                            ? 'bg-gray-300 cursor-not-allowed text-white/80'
                                            : 'bg-brand-primary hover:bg-brand-light shadow-lg hover:shadow-brand-primary/30 transform hover:-translate-y-1'
                                        }`}
                                >
                                    {isSubmitting ? (
                                        <>
                                            <div className="w-5 h-5 border-[3px] border-white/30 border-t-white rounded-full animate-spin"></div>
                                            <span>Envoi en cours...</span>
                                        </>
                                    ) : (
                                        <>
                                            <Send size={18} />
                                            <span>ENVOYER</span>
                                        </>
                                    )}
                                </button>
                            </div>

                        </form>
                    )}

                </div>
            </div>
        </div>
    );
};

export default Contact;
