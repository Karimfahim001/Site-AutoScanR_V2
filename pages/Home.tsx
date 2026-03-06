
import React, { useState } from 'react';
import { Search, MapPin, CheckCircle2, Smartphone, ShieldCheck, ArrowRight, Activity, ChevronDown, ChevronUp, Zap, Clock, Star, ScanLine, Cable, Cpu, FileText, Handshake, Quote, Navigation, Car } from 'lucide-react';
import { ViewState } from '../types';

interface HomeProps {
   setView: (view: ViewState) => void;
}

const FAQItem = ({ question, answer }: { question: string, answer: string }) => {
   const [isOpen, setIsOpen] = useState(false);
   return (
      <div className="border-b border-gray-100 last:border-0">
         <button
            className="flex justify-between items-center w-full text-left py-6 focus:outline-none group"
            onClick={() => setIsOpen(!isOpen)}
         >
            <span className={`font-display font-semibold text-lg transition-colors ${isOpen ? 'text-brand-primary' : 'text-brand-dark'}`}>{question}</span>
            <div className={`p-2 rounded-full transition-colors ${isOpen ? 'bg-brand-primary/10 text-brand-primary' : 'bg-gray-100 text-gray-400 group-hover:bg-gray-200'}`}>
               {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </div>
         </button>
         <div className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-96 opacity-100 pb-6' : 'max-h-0 opacity-0'}`}>
            <p className="text-gray-600 leading-relaxed">{answer}</p>
         </div>
      </div>
   );
}

const Home: React.FC<HomeProps> = ({ setView }) => {
   const [plate, setPlate] = useState('');
   const [compatResult, setCompatResult] = useState<'idle' | 'loading' | 'success' | 'fail'>('idle');
   const [activeLocation, setActiveLocation] = useState<number | null>(null);

   const checkCompatibility = (e: React.FormEvent) => {
      e.preventDefault();
      if (!plate) return;
      setCompatResult('loading');
      setTimeout(() => {
         setCompatResult('success');
      }, 1500);
   };

   // Fake Toulon Locations with corrected approximate relative positions for the OSM embed
   const toulonLocations = [
      { id: 1, name: "Gare de Toulon", address: "Place de l'Europe", status: "Disponible", top: "30%", left: "45%" },
      { id: 2, name: "Centre Mayol", address: "Rue du Mûrier", status: "Occupé", top: "45%", left: "55%" },
      { id: 3, name: "Port - Quai Cronstadt", address: "Avenue de la République", status: "Disponible", top: "52%", left: "52%" },
      { id: 4, name: "Mourillon / Plages", address: "Corniche Général de Gaulle", status: "Disponible", top: "65%", left: "80%" },
      { id: 5, name: "Pont du Las", address: "Avenue du XVe Corps", status: "Maintenance", top: "25%", left: "25%" },
   ];

   return (
      <div className="flex flex-col min-h-screen bg-white animate-fade-in-up">
         {/* Hero Section */}
         <section className="relative min-h-[90vh] flex items-center bg-[#03091a] text-white overflow-hidden pt-20 pb-32">
            {/* Background Elements */}
            <div className="absolute inset-0 z-0">
               <div className="absolute top-0 right-0 w-3/4 h-full bg-gradient-to-l from-brand-primary/20 via-brand-primary/5 to-transparent"></div>
               <div className="absolute -bottom-40 -left-60 w-[600px] h-[600px] bg-brand-primary/20 rounded-full blur-[120px]"></div>
               <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] bg-brand-light/10 rounded-full blur-[100px]"></div>
               <img src="https://images.unsplash.com/photo-1493238792015-1a419ae4ce61?auto=format&fit=crop&q=80" alt="Background" className="w-full h-full object-cover opacity-15 mix-blend-overlay" />

               {/* Subtle grid pattern */}
               <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTAgMGg0MHY0MEgwVjB6IiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiLz48cGF0aCBkPSJNMCAwdjQwTTAgMGg0MCIgc3Ryb2tlPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMDUpIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiLz48L3N2Zz4=')] opacity-50"></div>
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full mt-10">
               <div className="grid lg:grid-cols-2 gap-12 items-center">
                  <div className="space-y-10 animate-fade-in-up">
                     <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md shadow-[0_0_20px_rgba(255,255,255,0.05)] hover:bg-white/10 transition-colors cursor-default">
                        <span className="relative flex h-3 w-3">
                           <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-accent opacity-75"></span>
                           <span className="relative inline-flex rounded-full h-3 w-3 bg-brand-accent"></span>
                        </span>
                        <span className="text-sm font-semibold tracking-wide text-gray-200">En service 24h/7j sans rendez-vous</span>
                     </div>

                     <h1 className="font-display text-5xl lg:text-7xl font-bold leading-[1.15] tracking-tight">
                        Le garagiste <br />
                        <span className="relative inline-block mt-2">
                           <span className="absolute -inset-1 bg-gradient-to-r from-brand-primary to-brand-light blur opacity-30"></span>
                           <span className="relative text-transparent bg-clip-text bg-gradient-to-r from-brand-primary via-brand-light to-white">digital & autonome</span>
                        </span>
                     </h1>

                     <p className="text-xl text-gray-300 max-w-lg leading-relaxed font-light">
                        AutoScanR révolutionne le diagnostic automobile. <span className="text-white font-medium">Branchez, analysez, comprenez.</span> Une borne en libre-service pour prendre le contrôle sur votre entretien.
                     </p>

                     <div className="flex flex-col sm:flex-row gap-5 pt-6">
                        <button onClick={() => document.getElementById('map-section')?.scrollIntoView({ behavior: 'smooth' })} className="relative overflow-hidden group bg-brand-primary text-white px-8 py-4 rounded-2xl font-bold text-lg transition-all shadow-[0_0_20px_rgba(0,148,183,0.3)] hover:shadow-[0_0_40px_rgba(0,148,183,0.6)] hover:-translate-y-1 flex items-center justify-center gap-3">
                           <div className="absolute inset-0 bg-gradient-to-r from-brand-dark/0 via-white/20 to-brand-dark/0 -translate-x-[150%] skew-x-[-30deg] group-hover:animate-[strike_1s_infinite]"></div>
                           <span className="relative flex items-center gap-2"><MapPin className="group-hover:animate-bounce" /> Trouver une borne</span>
                        </button>
                        <button onClick={() => setView(ViewState.MEDIATION_CENTER)} className="group bg-white/5 hover:bg-white/10 border border-white/20 hover:border-white/40 text-white px-8 py-4 rounded-2xl font-bold text-lg transition-all backdrop-blur-md flex items-center justify-center gap-3 hover:-translate-y-1">
                           <Activity className="text-brand-light group-hover:text-white transition-colors" /> Comprendre ma panne
                        </button>
                     </div>

                     <div className="flex items-center gap-5 text-sm text-gray-400 pt-8 border-t border-white/10 w-max">
                        <div className="flex -space-x-3">
                           <img src="https://i.pravatar.cc/100?img=11" className="w-10 h-10 rounded-full border-2 border-[#03091a]" alt="User" />
                           <img src="https://i.pravatar.cc/100?img=21" className="w-10 h-10 rounded-full border-2 border-[#03091a]" alt="User" />
                           <img src="https://i.pravatar.cc/100?img=33" className="w-10 h-10 rounded-full border-2 border-[#03091a]" alt="User" />
                           <div className="w-10 h-10 rounded-full border-2 border-[#03091a] bg-brand-primary flex items-center justify-center text-white font-bold text-xs">+</div>
                        </div>
                        <div className="flex flex-col">
                           <div className="flex text-brand-accent text-xs mb-0.5">
                              {[1, 2, 3, 4, 5].map(i => <Star key={i} size={12} fill="currentColor" />)}
                           </div>
                           <p>Rejoint par <span className="text-white font-bold">15,000+</span> conducteurs</p>
                        </div>
                     </div>
                  </div>

                  {/* 3D Kiosk Visual - Enhanced */}
                  <div className="relative hidden lg:flex justify-center items-center h-[700px] perspective-1000">
                     {/* Decorative rings */}
                     <div className="absolute w-[600px] h-[600px] border border-white/5 rounded-full animate-[spin-slow]"></div>
                     <div className="absolute w-[450px] h-[450px] border border-brand-primary/20 rounded-full animate-[spin-reverse]">
                        <div className="absolute top-0 left-1/2 w-4 h-4 bg-brand-primary rounded-full blur-[2px] -translate-x-1/2 -translate-y-1/2 shadow-[0_0_15px_#0094b7]"></div>
                     </div>

                     {/* The Kiosk Body */}
                     <div className="relative w-80 h-[560px] bg-gradient-to-b from-gray-100 to-gray-400 rounded-[3rem] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.8)] border-[6px] border-gray-400 flex flex-col items-center p-6 transform rotate-y-12 animate-float z-10 before:absolute before:inset-0 before:bg-gradient-to-r before:from-white/40 before:to-transparent before:rounded-[2.5rem] before:pointer-events-none">
                        {/* Subtle machine texture */}
                        <div className="absolute inset-0 opacity-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSIjZmZmIj48L3JlY3Q+CjxyZWN0IHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9IiMwMDAiPjwvcmVjdD4KPC9zdmc+')] mix-blend-multiply rounded-[2.5rem]"></div>

                        {/* Premium Screen */}
                        <div className="relative z-10 w-full h-[65%] bg-[#0a0f1d] rounded-2xl overflow-hidden border-8 border-gray-800 shadow-[inset_0_10px_20px_rgba(0,0,0,0.8)] flex flex-col">
                           {/* Screen glare reflection */}
                           <div className="absolute top-0 left-0 right-0 bottom-1/2 bg-gradient-to-b from-white/10 to-transparent pointer-events-none rounded-t-xl"></div>

                           <div className="bg-gradient-to-r from-brand-dark via-brand-primary to-brand-dark p-3 flex justify-center shadow-md relative z-20">
                              <span className="font-display font-bold text-white tracking-[0.2em] text-sm">AUTOSCANR</span>
                           </div>

                           {/* Screen Content */}
                           <div className="flex-1 flex flex-col items-center justify-center p-4 text-center space-y-6 relative z-10">
                              <div className="relative">
                                 <div className="w-20 h-20 rounded-full border-4 border-brand-primary/20"></div>
                                 <div className="absolute inset-0 w-20 h-20 rounded-full border-4 border-brand-primary border-t-brand-light animate-spin shadow-[0_0_15px_#0094b7]"></div>
                                 <Activity className="absolute inset-0 m-auto text-brand-light w-8 h-8 opacity-80" />
                              </div>

                              <div className="space-y-2 w-full">
                                 <p className="text-brand-light font-mono text-xs uppercase tracking-widest font-bold">Analyse OBD-II</p>
                                 <p className="text-white text-lg font-medium">Lecture ECU...</p>
                              </div>

                              <div className="w-full bg-gray-900 h-1.5 rounded-full overflow-hidden border border-gray-800 shadow-inner">
                                 <div className="bg-gradient-to-r from-brand-primary to-brand-light h-full w-3/4 rounded-full shadow-[0_0_10px_rgba(103,191,212,0.8)] animate-pulse"></div>
                              </div>
                           </div>
                        </div>

                        {/* Hardware Panel */}
                        <div className="relative z-10 w-full mt-8 grid grid-cols-2 gap-5">
                           <div className="bg-gray-800/90 rounded-xl h-[100px] border-2 border-gray-600 shadow-[inset_0_2px_10px_rgba(0,0,0,0.5)] flex flex-col items-center justify-center p-3 relative overflow-hidden group/pay">
                              <div className="absolute top-0 w-full h-1 bg-gradient-to-r from-transparent via-brand-primary/50 to-transparent"></div>
                              <div className="w-14 h-2.5 bg-black rounded-full shadow-inner mb-3 border border-gray-700/50"></div>
                              <div className="w-8 h-1 bg-green-500/20 rounded-full mt-1 group-hover/pay:bg-green-500 shadow-[0_0_5px_rgba(34,197,94,0.5)] transition-colors"></div>
                              <span className="text-gray-400 text-[9px] uppercase font-bold tracking-wider mt-2">NFC / Carte</span>
                           </div>
                           <div className="bg-gradient-to-b from-white to-gray-200 rounded-xl h-[100px] border border-gray-400 relative shadow-[0_5px_15px_rgba(0,0,0,0.2)] overflow-hidden">
                              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-5 bg-gray-800 rounded-b-lg shadow-inner z-20"></div>
                              {/* Ticket coming out */}
                              <div className="absolute top-5 left-1/2 -translate-x-1/2 w-16 h-20 bg-white border border-gray-200 shadow-sm z-10 flex flex-col p-2 space-y-1.5 transform hover:translate-y-2 transition-transform cursor-pointer">
                                 <div className="h-4 bg-brand-dark/10 w-full rounded flex items-center justify-center"><span className="text-[6px] font-bold text-brand-dark">QR CODE</span></div>
                                 <div className="h-0.5 bg-gray-200 w-full mt-1"></div>
                                 <div className="h-0.5 bg-gray-200 w-3/4"></div>
                                 <div className="h-0.5 bg-gray-200 w-5/6"></div>
                              </div>
                           </div>
                        </div>

                        {/* Heavy Base & Cable */}
                        <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-[85%] h-8 bg-gray-500 rounded-b-[2rem] border-x-4 border-b-4 border-gray-600 -z-10 shadow-xl"></div>

                        {/* Glowing Cable */}
                        <div className="absolute -bottom-28 left-1/2 -translate-x-1/2 w-64 h-32 border-b-[12px] border-l-[12px] border-[#111] rounded-bl-[4rem] -z-20 shadow-[0_10px_20px_rgba(0,0,0,0.5)]">
                           <div className="absolute top-0 -left-[12px] w-[12px] h-[30%] bg-gradient-to-b from-brand-primary to-transparent opacity-50 blur-[2px]"></div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </section>

         {/* COMPATIBILITY CHECKER (FLOATING) */}
         <div className="relative z-20 max-w-5xl mx-auto px-4 -mt-24 mb-16 animate-fade-in-up">
            <div className="bg-white/95 rounded-[2rem] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.2)] p-8 md:p-12 border border-white/80 backdrop-blur-2xl flex flex-col md:flex-row items-center gap-10 md:gap-14 relative overflow-hidden">
               <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-br from-brand-primary/10 to-brand-light/5 rounded-full blur-[60px] -z-10 translate-x-1/3 -translate-y-1/3"></div>

               <div className="flex-1 text-center md:text-left space-y-4">
                  <div className="inline-flex items-center gap-2 bg-gradient-to-r from-brand-primary/10 to-brand-primary/5 text-brand-primary px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest border border-brand-primary/10">
                     <CheckCircle2 size={14} /> Vérification Instantanée
                  </div>
                  <h2 className="font-display text-3xl md:text-4xl font-bold text-gray-900 leading-tight">Vérifiez si votre véhicule est <span className="text-brand-primary">compatible</span></h2>
                  <p className="text-gray-600 text-lg">AutoScanR fonctionne avec 99% des véhicules construits après : <br /><span className="font-bold text-gray-800">Essence (2001) / Diesel (2004).</span></p>
               </div>

               <div className="w-full md:w-auto flex-1 max-w-md">
                  <form onSubmit={checkCompatibility} className="relative group/form">
                     <div className="flex shadow-[0_10px_30px_rgba(0,148,183,0.15)] rounded-2xl overflow-hidden border-[3px] border-gray-100 group-focus-within/form:border-brand-primary group-focus-within/form:shadow-[0_15px_40px_rgba(0,148,183,0.25)] transition-all bg-white relative">
                        {/* Glow behind input on focus */}
                        <div className="absolute inset-0 bg-brand-primary/5 opacity-0 group-focus-within/form:opacity-100 transition-opacity pointer-events-none"></div>

                        {/* License Plate Style Badge - Premium Blue */}
                        <div className="bg-[#0033cc] text-white w-14 flex flex-col items-center justify-center shrink-0 border-r border-black/10 relative z-10 shadow-inner">
                           <span className="text-[10px] leading-tight mt-1 text-yellow-400">★</span>
                           <span className="font-bold text-xl drop-shadow-md">F</span>
                        </div>

                        <input
                           type="text"
                           value={plate}
                           onChange={(e) => setPlate(e.target.value.toUpperCase())}
                           placeholder="AA-123-BB"
                           className="w-full h-20 px-4 text-3xl md:text-4xl font-display font-medium uppercase tracking-[0.2em] text-center text-gray-900 placeholder-gray-300 outline-none bg-transparent relative z-10"
                           maxLength={9}
                        />

                        <button type="submit" className="bg-brand-dark hover:bg-brand-primary text-white px-8 font-bold transition-colors duration-300 flex items-center justify-center relative z-10 group/btn overflow-hidden">
                           <div className="absolute inset-0 bg-white/20 translate-y-full group-hover/btn:translate-y-0 transition-transform"></div>
                           <Search className="w-6 h-6 relative z-10 group-hover/btn:scale-110 transition-transform" />
                        </button>
                     </div>
                  </form>

                  {compatResult === 'loading' && (
                     <div className="mt-6 flex justify-center items-center gap-3 text-brand-primary bg-brand-primary/5 py-3 px-6 rounded-xl border border-brand-primary/10">
                        <div className="w-5 h-5 border-[3px] border-brand-primary border-t-transparent rounded-full animate-spin"></div>
                        <span className="font-bold text-sm">Analyse de la base de données...</span>
                     </div>
                  )}

                  {compatResult === 'success' && (
                     <div className="mt-6 flex items-center justify-center gap-3 text-green-700 bg-green-50 py-3 px-6 rounded-xl text-sm border border-green-200 shadow-sm animate-fade-in-up">
                        <CheckCircle2 size={20} className="text-green-500" />
                        <span className="font-bold text-base">Véhicule Confirmé ! Compatible OBD-II</span>
                     </div>
                  )}
               </div>
            </div>
         </div>

         {/* Stats Banner */}
         <div className="bg-brand-primary bg-opacity-5 border-b border-brand-primary/10 pt-10">
            <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-gray-200 text-center">
               {[
                  { label: "Utilisateurs", value: "15k+" },
                  { label: "Garages Partenaires", value: "450+" },
                  { label: "Économie Moyenne", value: "60%" },
                  { label: "Satisfaction", value: "4.9/5" }
               ].map((stat, i) => (
                  <div key={i} className="flex flex-col">
                     <span className="font-display font-bold text-3xl text-brand-dark">{stat.value}</span>
                     <span className="text-sm text-gray-500 uppercase tracking-wide font-medium">{stat.label}</span>
                  </div>
               ))}
            </div>
         </div>

         {/* Bento Grid Value Props */}
         <section className="py-32 bg-gray-50">
            <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8">
               <div className="text-center mb-20 max-w-3xl mx-auto">
                  <span className="text-brand-primary font-bold tracking-wider text-sm uppercase mb-3 block">Pourquoi nous choisir</span>
                  <h2 className="font-display text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">Le diagnostic, <br />sans zone d'ombre.</h2>
                  <p className="text-xl text-gray-600">Une approche révolutionnaire de l'entretien automobile, centrée sur la transparence totale et votre autonomie.</p>
               </div>

               <div className="grid md:grid-cols-3 md:grid-rows-2 gap-6 lg:gap-8 auto-rows-[300px] md:auto-rows-auto md:h-[650px]">
                  {/* Large Left Item */}
                  <div className="md:col-span-1 md:row-span-2 bg-gradient-to-b from-brand-beige to-[#ebe6db] rounded-[2.5rem] p-8 lg:p-10 flex flex-col justify-between relative overflow-hidden group shadow-[0_15px_40px_-15px_rgba(0,0,0,0.1)] hover:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.15)] transition-all duration-500 hover:-translate-y-2 border border-white/50">
                     <div className="absolute top-0 right-0 p-12 bg-white/50 rounded-bl-[120px] transition-transform duration-700 group-hover:scale-[1.3] group-hover:bg-brand-primary/10"></div>
                     <div className="relative z-10 flex-1">
                        <div className="bg-white/80 backdrop-blur-md w-16 h-16 rounded-2xl flex items-center justify-center shadow-[0_10px_20px_rgba(0,0,0,0.05)] mb-8 text-brand-primary group-hover:text-brand-dark transition-colors duration-300 ring-1 ring-black/5">
                           <ShieldCheck size={36} />
                        </div>
                        <h3 className="font-display text-3xl font-bold text-gray-900 mb-4 leading-tight">Anti-Arnaque & <br />Transparence</h3>
                        <p className="text-gray-600 mb-8 text-lg font-light leading-relaxed">Ne changez plus de pièces inutilement. Notre diagnostic est 100% neutre : nous ne vendons pas de réparations, nous vous disons la vérité.</p>
                        <ul className="space-y-4">
                           <li className="flex items-center gap-3 text-base text-gray-800 font-medium"><div className="bg-green-100 rounded-full p-1 text-green-600"><CheckCircle2 size={16} /></div> Rapport objectif</li>
                           <li className="flex items-center gap-3 text-base text-gray-800 font-medium"><div className="bg-green-100 rounded-full p-1 text-green-600"><CheckCircle2 size={16} /></div> Preuve pour la revente</li>
                           <li className="flex items-center gap-3 text-base text-gray-800 font-medium"><div className="bg-green-100 rounded-full p-1 text-green-600"><CheckCircle2 size={16} /></div> Zéro devis forcé</li>
                        </ul>
                     </div>
                     <div className="mt-10 -mx-4 -mb-4 overflow-hidden rounded-2xl shadow-2xl relative">
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent z-10"></div>
                        <img src="https://images.unsplash.com/photo-1550355291-bbee04a92027?auto=format&fit=crop&q=80" alt="Car check" className="object-cover h-56 w-full transform group-hover:scale-105 transition-transform duration-700" />
                        <div className="absolute bottom-4 left-4 right-4 z-20 flex justify-between items-center text-white">
                           <span className="text-sm font-medium bg-black/50 backdrop-blur-md px-3 py-1 rounded-full border border-white/20">Achat Serein</span>
                           <span className="flex items-center"><Star size={14} className="text-yellow-400 mr-1" /> Très Évalué</span>
                        </div>
                     </div>
                  </div>

                  {/* Top Right Wide - Glassmorphism */}
                  <div className="md:col-span-2 bg-[#0c142b] text-white rounded-[2.5rem] p-8 lg:p-10 relative overflow-hidden group shadow-[0_15px_40px_-15px_rgba(0,148,183,0.3)] hover:shadow-[0_25px_50px_-12px_rgba(0,148,183,0.4)] transition-all duration-500 hover:-translate-y-2 border border-brand-primary/20">
                     <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/20 via-transparent to-brand-accent/10 opacity-50 group-hover:opacity-100 transition-opacity duration-700"></div>
                     <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-brand-primary/20 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/3 group-hover:bg-brand-light/20 transition-colors duration-700"></div>

                     <div className="relative z-10 flex flex-col md:flex-row items-center gap-10 h-full">
                        <div className="flex-1 flex flex-col justify-center">
                           <div className="bg-white/10 w-16 h-16 rounded-2xl flex items-center justify-center backdrop-blur-xl mb-6 text-brand-light border border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.1)]">
                              <Smartphone size={32} />
                           </div>
                           <h3 className="font-display text-3xl font-bold mb-4 tracking-tight">De l'ingénierie au français.</h3>
                           <p className="text-gray-300 text-lg font-light leading-relaxed">Fini le jargon barbare des garagistes. Nos algorithmes d'IA traduisent instantanément les codes défauts P0xxx en informations claires et actions concrètes.</p>
                        </div>

                        {/* App UI Simulation */}
                        <div className="w-full md:w-[45%] bg-white/5 backdrop-blur-2xl rounded-2xl p-5 border border-white/10 shadow-2xl relative">
                           <div className="absolute -top-3 -right-3 w-8 h-8 bg-red-500 rounded-full animate-ping opacity-20"></div>
                           <div className="absolute -top-3 -right-3 w-8 h-8 bg-red-500 rounded-full flex items-center justify-center text-white shadow-lg border-2 border-[#0c142b] z-20"><Zap size={14} /></div>

                           <div className="bg-[#121c38] rounded-xl p-4 mb-3 border border-red-500/20 shadow-inner">
                              <div className="flex justify-between items-start mb-2">
                                 <div className="font-mono text-xl font-bold text-red-400">P0300</div>
                                 <span className="text-[10px] uppercase font-bold text-gray-500 bg-gray-800 px-2 py-0.5 rounded">Moteur</span>
                              </div>
                              <div className="text-sm font-bold text-gray-200">Ratés d'allumage aléatoires</div>
                           </div>

                           <div className="bg-gradient-to-r from-brand-primary/10 to-transparent p-4 rounded-xl border-l-4 border-brand-primary text-sm text-gray-300 leading-relaxed font-medium">
                              <span className="text-brand-light font-bold">Traduction :</span> Le carburant brûle mal dans les cylindres. Cela vient souvent de <span className="text-white bg-white/10 px-1 rounded">bougies d'allumage usées</span> ou de bobines défectueuses.
                           </div>
                        </div>
                     </div>
                  </div>

                  {/* Bottom Right 1 */}
                  <div className="bg-white border-2 border-transparent shadow-[0_15px_40px_-15px_rgba(0,0,0,0.05)] rounded-[2.5rem] p-8 hover:border-brand-primary/30 transition-all duration-500 group cursor-pointer hover:shadow-[0_20px_40px_-15px_rgba(0,148,183,0.15)] flex flex-col justify-between hover:-translate-y-2 relative overflow-hidden" onClick={() => setView(ViewState.MEDIATION_CENTER)}>
                     <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-gray-50 rounded-full mix-blend-multiply group-hover:bg-brand-primary/5 transition-colors duration-500"></div>
                     <div>
                        <div className="bg-gray-50 group-hover:bg-brand-primary/5 w-14 h-14 rounded-2xl flex items-center justify-center mb-6 text-brand-dark group-hover:text-brand-primary transition-all duration-500 group-hover:scale-110 shadow-sm border border-gray-100">
                           <Activity size={28} />
                        </div>
                        <h3 className="font-display text-2xl font-bold text-gray-900 mb-3">Centre de Médiation</h3>
                        <p className="text-gray-500 text-lg leading-relaxed mix-blend-multiply">Accédez à des schémas, tutos, et devis moyens pour chaque panne détectée.</p>
                     </div>
                     <div className="mt-6 flex items-center text-brand-primary font-bold text-base group-hover:translate-x-3 transition-transform duration-300">
                        Explorer la ressource <ArrowRight size={18} className="ml-2" />
                     </div>
                  </div>

                  {/* Bottom Right 2 - Premium CTA Gradient */}
                  <div className="bg-gradient-to-br from-brand-primary via-[#00a8d4] to-brand-light text-white rounded-[2.5rem] p-8 relative overflow-hidden group hover:shadow-[0_20px_40px_-10px_rgba(0,148,183,0.5)] transition-all duration-500 hover:-translate-y-2 flex flex-col justify-between">
                     <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMjUiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjEpIiBzdHJva2Utd2lkdGg9IjEiLz48L3N2Zz4=')] opacity-30 mix-blend-overlay group-hover:scale-110 transition-transform duration-1000"></div>
                     <div className="absolute -bottom-16 -right-16 w-48 h-48 bg-white/20 rounded-full blur-2xl group-hover:blur-3xl transition-all duration-500"></div>

                     <div className="relative z-10">
                        <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center mb-6 backdrop-blur-xl border border-white/30 shadow-[0_8px_32px_rgba(0,0,0,0.1)] group-hover:scale-110 transition-transform duration-500 group-hover:bg-white text-white group-hover:text-brand-primary">
                           <Clock size={28} className="transition-colors duration-500" />
                        </div>
                        <h3 className="font-display text-2xl font-bold mb-3 drop-shadow-md">Rapide & Pas Cher</h3>
                        <p className="text-lg text-white/90 font-medium">Diagnostic pro dès <span className="font-bold text-xl text-white bg-white/20 px-2 rounded-md mx-1">15€</span></p>
                     </div>

                     <div className="relative z-10 mt-6 inline-flex self-start">
                        <span className="bg-white text-brand-primary px-4 py-2 rounded-xl font-bold text-sm shadow-lg group-hover:shadow-xl transition-shadow flex items-center gap-2">
                           En 5 minutes chrono
                        </span>
                     </div>
                  </div>
               </div>
            </div>
         </section>

         {/* --- STEPS SECTION (HOW IT WORKS) --- */}
         <section className="py-32 bg-white relative overflow-hidden">
            {/* Decorative Background Elements */}
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-brand-primary/20 to-transparent"></div>
            <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-brand-primary/5 rounded-full blur-[80px]"></div>
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-brand-accent/5 rounded-full blur-[80px]"></div>

            <div className="max-w-7xl mx-auto px-4 relative z-10">
               <div className="text-center mb-24 max-w-3xl mx-auto">
                  <div className="inline-block bg-white border border-gray-100 shadow-sm rounded-full px-5 py-2 mb-6">
                     <span className="text-xs font-bold text-brand-primary uppercase tracking-[0.2em]">Le Parcours AutoScanR</span>
                  </div>
                  <h2 className="font-display text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">Du doute à la solution en <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-brand-light">5 étapes</span></h2>
                  <p className="text-xl text-gray-600 font-light">Fini le stress du voyant inconnu. Voici comment nous transformons une panne complexe en une solution simple et actionnable.</p>
               </div>

               <div className="relative mt-8">
                  {/* Animated Connecting Line (Desktop) */}
                  <div className="hidden lg:block absolute top-[4.5rem] left-8 right-8 h-1 bg-gray-100 rounded-full -z-10 overflow-hidden">
                     <div className="absolute top-0 left-0 h-full w-1/3 bg-gradient-to-r from-brand-primary via-brand-light to-brand-accent animate-[marquee_3s_linear_infinite]"></div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-6">
                     {/* Step 1 */}
                     <div className="group relative">
                        <div className="bg-white rounded-[2rem] p-8 shadow-[0_10px_30px_-15px_rgba(0,0,0,0.1)] border border-gray-100 hover:border-brand-primary/30 transition-all duration-500 hover:-translate-y-3 h-full hover:shadow-[0_20px_40px_-15px_rgba(0,148,183,0.15)]">
                           <div className="w-28 h-28 bg-gray-50 rounded-[1.5rem] rotate-3 border-4 border-white shadow-lg flex items-center justify-center mb-8 mx-auto group-hover:rotate-0 transition-transform duration-500 relative z-10">
                              <span className="absolute -top-3 -right-3 w-8 h-8 bg-gray-900 text-white text-sm font-bold rounded-full flex items-center justify-center border-2 border-white shadow-md z-20">1</span>
                              <ScanLine className="w-12 h-12 text-gray-400 group-hover:text-brand-primary transition-colors duration-500" />
                           </div>
                           <div className="text-center">
                              <h3 className="font-display text-xl font-bold text-gray-900 mb-3">Identification</h3>
                              <p className="text-sm text-gray-500 leading-relaxed font-light">Saisissez votre plaque ou sélectionnez votre modèle sur l'écran tactile de la borne.</p>
                           </div>
                        </div>
                     </div>

                     {/* Step 2 */}
                     <div className="group relative">
                        <div className="bg-white rounded-[2rem] p-8 shadow-[0_10px_30px_-15px_rgba(0,0,0,0.1)] border border-gray-100 hover:border-brand-primary/30 transition-all duration-500 hover:-translate-y-3 h-full hover:shadow-[0_20px_40px_-15px_rgba(0,148,183,0.15)] lg:mt-6">
                           <div className="w-28 h-28 bg-gray-50 rounded-[1.5rem] -rotate-3 border-4 border-white shadow-lg flex items-center justify-center mb-8 mx-auto group-hover:rotate-0 transition-transform duration-500 relative z-10">
                              <span className="absolute -top-3 -right-3 w-8 h-8 bg-gray-900 text-white text-sm font-bold rounded-full flex items-center justify-center border-2 border-white shadow-md z-20">2</span>
                              {/* Cable icon */}
                              <Cable className="w-12 h-12 text-gray-400 group-hover:text-brand-primary transition-colors duration-500" />
                           </div>
                           <div className="text-center">
                              <h3 className="font-display text-xl font-bold text-gray-900 mb-3">Branchement</h3>
                              <p className="text-sm text-gray-500 leading-relaxed font-light">Connectez le câble de la borne à la prise OBD de votre voiture (sous le volant).</p>
                           </div>
                        </div>
                     </div>

                     {/* Step 3 */}
                     <div className="group relative">
                        <div className="bg-white rounded-[2rem] p-8 shadow-[0_10px_30px_-15px_rgba(0,0,0,0.1)] border border-gray-100 hover:border-brand-primary/30 transition-all duration-500 hover:-translate-y-3 h-full hover:shadow-[0_20px_40px_-15px_rgba(0,148,183,0.15)]">
                           <div className="w-28 h-28 bg-gray-50 rounded-[1.5rem] rotate-3 border-4 border-white shadow-lg flex items-center justify-center mb-8 mx-auto group-hover:rotate-0 transition-transform duration-500 relative z-10 group-hover:shadow-[0_0_30px_rgba(0,148,183,0.2)]">
                              <span className="absolute -top-3 -right-3 w-8 h-8 bg-gray-900 text-white text-sm font-bold rounded-full flex items-center justify-center border-2 border-white shadow-md z-20">3</span>
                              <Cpu className="w-12 h-12 text-gray-400 group-hover:text-brand-primary transition-colors duration-500 group-hover:animate-pulse" />
                           </div>
                           <div className="text-center">
                              <h3 className="font-display text-xl font-bold text-gray-900 mb-3">Diagnostic IA</h3>
                              <p className="text-sm text-gray-500 leading-relaxed font-light">Nos algorithmes interrogent tous les calculateurs du véhicule en moins de 3 minutes.</p>
                           </div>
                        </div>
                     </div>

                     {/* Step 4 - Highlighted Premium Card */}
                     <div className="group relative">
                        <div className="bg-[#0c142b] rounded-[2rem] p-8 shadow-[0_20px_40px_-15px_rgba(0,148,183,0.4)] border border-brand-primary/30 hover:-translate-y-4 transition-all duration-500 h-full relative overflow-hidden lg:-mt-4">
                           <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/20 via-transparent to-brand-accent/10 opacity-50"></div>
                           <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1/2 bg-brand-primary/20 blur-[40px] rounded-full"></div>

                           <div className="w-28 h-28 bg-white/10 backdrop-blur-xl rounded-[1.5rem] border border-white/20 shadow-[0_10px_30px_rgba(0,148,183,0.3)] flex items-center justify-center mb-8 mx-auto group-hover:scale-110 transition-transform duration-500 relative z-10">
                              <span className="absolute -top-3 -right-3 w-8 h-8 bg-brand-primary text-white text-sm font-bold rounded-full flex items-center justify-center border-2 border-[#0c142b] shadow-[0_0_15px_rgba(0,148,183,0.8)] z-20">4</span>
                              <FileText className="w-12 h-12 text-brand-accent drop-shadow-[0_0_10px_rgba(228,188,55,0.8)]" />
                           </div>
                           <div className="text-center relative z-10">
                              <h3 className="font-display text-xl font-bold text-white mb-3 tracking-wide">Traduction</h3>
                              <p className="text-sm text-gray-300 leading-relaxed font-light">Recevez un rapport clair. Nous traduisons le code technique en français compréhensible avec devis estimé.</p>
                           </div>
                        </div>
                     </div>

                     {/* Step 5 */}
                     <div className="group relative">
                        <div className="bg-white rounded-[2rem] p-8 shadow-[0_10px_30px_-15px_rgba(0,0,0,0.1)] border border-gray-100 hover:border-brand-primary/30 transition-all duration-500 hover:-translate-y-3 h-full hover:shadow-[0_20px_40px_-15px_rgba(0,148,183,0.15)] lg:mt-6">
                           <div className="w-28 h-28 bg-gray-50 rounded-[1.5rem] -rotate-3 border-4 border-white shadow-lg flex items-center justify-center mb-8 mx-auto group-hover:rotate-0 transition-transform duration-500 relative z-10">
                              <span className="absolute -top-3 -right-3 w-8 h-8 bg-gray-900 text-white text-sm font-bold rounded-full flex items-center justify-center border-2 border-white shadow-md z-20">5</span>
                              <Handshake className="w-12 h-12 text-gray-400 group-hover:text-brand-primary transition-colors duration-500" />
                           </div>
                           <div className="text-center">
                              <h3 className="font-display text-xl font-bold text-gray-900 mb-3">Décision</h3>
                              <p className="text-sm text-gray-500 leading-relaxed font-light">Réparez vous-même ou envoyez le rapport en 1 clic à nos garages partenaires certifiés.</p>
                           </div>
                        </div>
                     </div>

                  </div>
               </div>

               <div className="mt-20 text-center">
                  <button onClick={() => document.getElementById('map-section')?.scrollIntoView({ behavior: 'smooth' })} className="inline-flex items-center gap-3 bg-gray-900 text-white px-8 py-4 rounded-full font-bold hover:bg-brand-primary transition-colors duration-300 shadow-xl group">
                     Commencer mon diagnostic maintenant
                     <span className="bg-white/20 p-2 rounded-full group-hover:translate-x-1 transition-transform">
                        <ArrowRight className="w-4 h-4" />
                     </span>
                  </button>
               </div>
            </div>
         </section>

         {/* Partner Marquee */}
         <section className="py-16 bg-white border-t border-gray-100 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 mb-8 text-center">
               <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Ils acceptent les rapports AutoScanR</p>
            </div>
            <div className="relative flex overflow-x-hidden group">
               <div className="py-4 animate-marquee whitespace-nowrap flex items-center gap-16 px-8 opacity-70 grayscale hover:grayscale-0 transition-all duration-500">
                  <span className="text-3xl font-black text-gray-400 hover:text-[#005599] transition-colors cursor-pointer tracking-tighter">NORAUTO</span>
                  <span className="text-3xl font-black text-gray-400 hover:text-[#009b48] transition-colors cursor-pointer tracking-tight italic">FEU VERT</span>
                  <span className="text-3xl font-black text-gray-400 hover:text-[#e2001a] transition-colors cursor-pointer tracking-wider italic">SPEEDY</span>
                  <span className="text-3xl font-black text-gray-400 hover:text-[#ffcc00] transition-colors cursor-pointer tracking-wide">MIDAS</span>
                  <span className="text-3xl font-black text-gray-400 hover:text-[#00529c] transition-colors cursor-pointer">POINT S</span>
                  <span className="text-3xl font-black text-gray-400 hover:text-[#1d4f91] transition-colors cursor-pointer italic">EUROMASTER</span>
                  <span className="text-3xl font-black text-gray-400 hover:text-gray-600 transition-colors cursor-pointer">AD EXPERT</span>
                  {/* Duplicates for loop */}
                  <span className="text-3xl font-black text-gray-400 hover:text-[#005599] transition-colors cursor-pointer tracking-tighter">NORAUTO</span>
                  <span className="text-3xl font-black text-gray-400 hover:text-[#009b48] transition-colors cursor-pointer tracking-tight italic">FEU VERT</span>
                  <span className="text-3xl font-black text-gray-400 hover:text-[#e2001a] transition-colors cursor-pointer tracking-wider italic">SPEEDY</span>
                  <span className="text-3xl font-black text-gray-400 hover:text-[#ffcc00] transition-colors cursor-pointer tracking-wide">MIDAS</span>
               </div>
            </div>
         </section>

         {/* Map Section - REDESIGNED */}
         <section id="map-section" className="py-24 bg-white relative">
            <div className="max-w-7xl mx-auto px-4">
               <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-4">
                  <div>
                     <h2 className="font-display text-4xl font-bold text-brand-dark">Réseau Toulonnais</h2>
                     <p className="text-lg text-gray-600 mt-2">Trouvez la borne AutoScanR la plus proche de vous à Toulon.</p>
                  </div>
                  <div className="bg-gray-100 rounded-full p-1 flex">
                     <button className="px-6 py-2 rounded-full bg-white text-brand-dark shadow-sm font-bold text-sm">Carte</button>
                     <button className="px-6 py-2 rounded-full text-gray-500 font-medium text-sm hover:text-brand-dark">Liste</button>
                  </div>
               </div>

               <div className="grid lg:grid-cols-3 gap-8 h-[600px]">
                  {/* Map Visual (Left - 2 Cols) */}
                  <div className="lg:col-span-2 relative bg-gray-200 rounded-3xl overflow-hidden shadow-inner group border border-gray-200">
                     {/* The "Map" Iframe - Grayscale */}
                     <iframe
                        width="100%"
                        height="100%"
                        frameBorder="0"
                        scrolling="no"
                        marginHeight={0}
                        marginWidth={0}
                        src="https://www.openstreetmap.org/export/embed.html?bbox=5.9100,43.1100,5.9500,43.1300&layer=mapnik"
                        className="w-full h-full grayscale contrast-125 opacity-75 pointer-events-none"
                        style={{ border: 0 }}
                     ></iframe>

                     {/* Map Overlay Gradient */}
                     <div className="absolute inset-0 bg-gradient-to-t from-white/0 to-transparent pointer-events-none"></div>

                     {/* Navigation UI Overlay */}
                     <div className="absolute top-4 right-4 bg-white rounded-lg shadow-md p-2 flex flex-col gap-2">
                        <button className="p-2 hover:bg-gray-100 rounded text-gray-600"><Navigation size={20} /></button>
                        <div className="h-px bg-gray-200"></div>
                        <button className="p-2 hover:bg-gray-100 rounded text-brand-primary font-bold text-xl">+</button>
                        <button className="p-2 hover:bg-gray-100 rounded text-brand-primary font-bold text-xl">-</button>
                     </div>

                     {/* Pins */}
                     {toulonLocations.map((loc) => (
                        <div
                           key={loc.id}
                           className="absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2 group/pin"
                           style={{ top: loc.top, left: loc.left }}
                           onMouseEnter={() => setActiveLocation(loc.id)}
                           onMouseLeave={() => setActiveLocation(null)}
                        >
                           <div className="relative">
                              {/* Pulse Ring */}
                              <div className={`absolute inset-0 rounded-full animate-ping opacity-75 ${loc.status === 'Disponible' ? 'bg-brand-primary' : 'bg-gray-400'} w-full h-full`}></div>

                              {/* Pin Icon */}
                              <div className={`relative z-10 w-10 h-10 rounded-full border-2 border-white shadow-lg flex items-center justify-center transition-transform hover:scale-125 ${activeLocation === loc.id ? 'scale-125 bg-brand-dark text-white' : 'bg-brand-primary text-white'}`}>
                                 {loc.status === 'Disponible' ? <Zap size={18} fill="currentColor" /> : <Clock size={18} />}
                              </div>

                              {/* Tooltip on Hover */}
                              <div className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-3 bg-brand-dark text-white text-xs px-3 py-2 rounded-lg whitespace-nowrap shadow-xl transition-all duration-300 ${activeLocation === loc.id ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none'}`}>
                                 <p className="font-bold">{loc.name}</p>
                                 <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-brand-dark rotate-45"></div>
                              </div>
                           </div>
                        </div>
                     ))}
                  </div>

                  {/* Location List (Right - 1 Col) */}
                  <div className="bg-gray-50 rounded-3xl p-6 border border-gray-100 flex flex-col overflow-hidden">
                     <h3 className="font-bold text-gray-400 text-xs uppercase tracking-wider mb-4">Bornes à proximité</h3>
                     <div className="overflow-y-auto space-y-3 flex-1 pr-2 scrollbar-hide">
                        {toulonLocations.map((loc) => (
                           <div
                              key={loc.id}
                              className={`p-4 rounded-xl border transition-all cursor-pointer flex items-center gap-4 ${activeLocation === loc.id ? 'bg-white border-brand-primary shadow-md' : 'bg-white border-transparent hover:border-gray-200'}`}
                              onMouseEnter={() => setActiveLocation(loc.id)}
                              onMouseLeave={() => setActiveLocation(null)}
                           >
                              <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${loc.status === 'Disponible' ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'}`}>
                                 {loc.status === 'Disponible' ? <Car size={20} /> : <Clock size={20} />}
                              </div>
                              <div className="flex-1 min-w-0">
                                 <h4 className={`font-bold truncate ${activeLocation === loc.id ? 'text-brand-primary' : 'text-brand-dark'}`}>{loc.name}</h4>
                                 <p className="text-xs text-gray-500 truncate">{loc.address}</p>
                              </div>
                              <div className="text-right">
                                 <span className={`text-xs font-bold px-2 py-1 rounded-full ${loc.status === 'Disponible' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                                    {loc.status === 'Disponible' ? 'Libre' : 'Occupé'}
                                 </span>
                              </div>
                           </div>
                        ))}
                     </div>
                     <div className="mt-6 pt-6 border-t border-gray-200">
                        <button className="w-full bg-brand-dark text-white py-3 rounded-xl font-bold hover:bg-black transition flex items-center justify-center gap-2">
                           <Navigation size={18} /> Itinéraire vers la plus proche
                        </button>
                     </div>
                  </div>
               </div>
            </div>
         </section>

         {/* TESTIMONIALS SECTION - Premium Layout */}
         <section className="py-32 bg-white relative overflow-hidden">
            {/* Decorative blob bg */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gray-50 rounded-full blur-[100px] -z-10"></div>

            <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8">
               <div className="text-center mb-20">
                  <span className="text-brand-primary font-bold tracking-wider text-sm uppercase mb-3 block">Avis Vérifiés</span>
                  <h2 className="font-display text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">Ce qu'en pensent les conducteurs</h2>
                  <p className="text-xl text-gray-600 font-light max-w-2xl mx-auto">Rejoignez les milliers d'utilisateurs qui ont repris le contrôle de leur entretien avec transparence.</p>
               </div>

               <div className="grid md:grid-cols-3 gap-8 items-start">
                  {/* Review 1 */}
                  <div className="bg-white p-8 lg:p-10 rounded-[2.5rem] relative shadow-[0_15px_40px_-15px_rgba(0,0,0,0.08)] border border-gray-100 hover:-translate-y-2 transition-transform duration-500">
                     <div className="flex gap-1 text-brand-accent mb-6">
                        {[1, 2, 3, 4, 5].map(i => <Star key={i} size={18} fill="currentColor" />)}
                     </div>
                     <p className="text-gray-700 mb-8 text-lg font-light leading-relaxed">"J'avais un voyant moteur. Le garage me demandait 80€ juste pour regarder. Avec AutoScanR, j'ai su en 5 min que c'était juste une sonde encrassée. Réglé pour 15€ !"</p>
                     <div className="flex items-center gap-4 border-t border-gray-100 pt-6">
                        <img src="https://i.pravatar.cc/150?img=32" alt="User" className="w-14 h-14 rounded-full shadow-sm" />
                        <div>
                           <h4 className="font-bold text-gray-900">Thomas L.</h4>
                           <p className="text-xs text-gray-500 font-medium bg-gray-50 px-2.5 py-1 rounded-lg mt-1 inline-block border border-gray-200">Renault Clio 4</p>
                        </div>
                     </div>
                  </div>

                  {/* Review 2 (Highlighted Main Review) */}
                  <div className="bg-[#0c142b] text-white p-8 lg:p-10 rounded-[2.5rem] relative transform md:-translate-y-6 shadow-[0_25px_50px_-12px_rgba(0,148,183,0.3)] border border-brand-primary/20">
                     <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/10 to-transparent rounded-[2.5rem]"></div>
                     <div className="absolute -top-6 right-8 bg-gradient-to-br from-brand-primary to-brand-light w-14 h-14 flex items-center justify-center rounded-2xl text-white shadow-lg rotate-12">
                        <Quote size={24} className="transform -rotate-12" />
                     </div>

                     <div className="flex gap-1 text-brand-accent mb-6 relative z-10">
                        {[1, 2, 3, 4, 5].map(i => <Star key={i} size={18} fill="currentColor" />)}
                     </div>
                     <p className="text-gray-200 mb-8 text-lg font-light leading-relaxed relative z-10">"En tant que femme, j'ai souvent l'impression qu'on essaie de m'arnaquer dans les garages. Ici, le rapport est 100% neutre, clair, et j'ai pu aller voir le mécano avec les preuves en main. Changer de rapport de force, ça n'a pas de prix."</p>
                     <div className="flex items-center gap-4 border-t border-white/10 pt-6 relative z-10">
                        <div className="relative">
                           <div className="absolute inset-0 bg-brand-primary rounded-full blur-md opacity-50"></div>
                           <img src="https://i.pravatar.cc/150?img=44" alt="User" className="w-14 h-14 rounded-full border-2 border-brand-primary relative z-10" />
                        </div>
                        <div>
                           <h4 className="font-bold text-white text-lg">Sarah M.</h4>
                           <p className="text-[10px] text-gray-900 uppercase font-black tracking-widest bg-brand-accent px-2.5 py-1 rounded-lg mt-1 inline-block shadow-sm">Fiat 500</p>
                        </div>
                     </div>
                  </div>

                  {/* Review 3 */}
                  <div className="bg-white p-8 lg:p-10 rounded-[2.5rem] relative shadow-[0_15px_40px_-15px_rgba(0,0,0,0.08)] border border-gray-100 hover:-translate-y-2 transition-transform duration-500">
                     <div className="flex gap-1 text-brand-accent mb-6">
                        {[1, 2, 3, 4, 5].map(i => <Star key={i} size={18} fill="currentColor" />)}
                     </div>
                     <p className="text-gray-700 mb-8 text-lg font-light leading-relaxed">"Indispensable pour vendre sa voiture sereinement. J'ai joint le rapport AutoScanR certifié à mon annonce. La voiture est partie en 24h sans négociation, l'acheteur était rassuré par la transparence."</p>
                     <div className="flex items-center gap-4 border-t border-gray-100 pt-6">
                        <img src="https://i.pravatar.cc/150?img=11" alt="User" className="w-14 h-14 rounded-full shadow-sm" />
                        <div>
                           <h4 className="font-bold text-gray-900">Karim B.</h4>
                           <p className="text-xs text-gray-500 font-medium bg-gray-50 px-2.5 py-1 rounded-lg mt-1 inline-block border border-gray-200">Peugeot 3008</p>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </section>

         {/* FAQ Section - Premium Layout */}
         <section className="py-32 bg-gray-50 relative">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-primary/5 rounded-full blur-3xl mix-blend-multiply"></div>

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
               <div className="text-center mb-16">
                  <span className="text-brand-primary font-bold tracking-wider text-sm uppercase mb-3 block">Des Questions ?</span>
                  <h2 className="font-display text-4xl md:text-5xl font-bold text-gray-900 mb-6">Tout ce que vous devez savoir</h2>
                  <p className="text-xl text-gray-600 font-light">Des réponses claires pour vous accompagner en toute transparence.</p>
               </div>

               <div className="bg-white rounded-[2rem] p-8 md:p-10 shadow-[0_10px_30px_-15px_rgba(0,0,0,0.05)] border border-gray-100 divide-y divide-gray-100">
                  <FAQItem
                     question="Combien coûte un diagnostic complet ?"
                     answer="Nos tarifs commencent à partir de 15€. C'est environ 80% moins cher qu'en garage traditionnel (30-250€), pour une précision de lecture électronique strictement identique (même technologie)."
                  />
                  <FAQItem
                     question="Puis-je réparer ma voiture suite au rapport ?"
                     answer="AutoScanR vous donne le diagnostic. Si c'est une petite opération (changer une ampoule, un fusible), vous pouvez le faire. Pour le reste, nous pouvons vous mettre en relation avec des garages de confiance via notre application, avec des devis pré-estimés."
                  />
                  <FAQItem
                     question="La borne répare-t-elle la voiture ?"
                     answer="Non, la borne effectue un diagnostic électronique (lecture et traduction des données des calculateurs). Elle ne répare pas mécaniquement la voiture, mais elle identifie précisément la source du problème pour vous éviter des dépenses inutiles."
                  />
                  <FAQItem
                     question="Puis-je utiliser le rapport pour vendre ma voiture ?"
                     answer="Absolument ! Le rapport AutoScanR est un gage de transparence puissant pour l'acheteur. Il prouve l'état électronique du véhicule à un instant T, avec un bilan daté et certifié, ce qui facilite grandement la transaction."
                  />
               </div>
            </div>
         </section>
      </div>
   );
};

export default Home;
