
import React, { useState } from 'react';
import { Search, MapPin, CheckCircle2, Activity, ChevronDown, ChevronUp, Zap, Star, Navigation, Users, Wrench, Clock, Car, Quote, ScanLine, Cable, Cpu, FileText, Handshake, ArrowRight, ShieldCheck, Smartphone } from 'lucide-react';
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
   const [mapViewMode, setMapViewMode] = useState<'map' | 'list'>('map');

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

   const openItinerary = () => {
      // Find the currently hovered location, or the first 'Disponible' one as a fallback
      const targetLoc = toulonLocations.find(l => l.id === activeLocation) || toulonLocations.find(l => l.status === 'Disponible');

      if (targetLoc) {
         // In a real app, use precise coordinates. Here we use the address + city.
         const query = encodeURIComponent(`${targetLoc.address}, Toulon, France`);
         window.open(`https://www.google.com/maps/dir/?api=1&destination=${query}`, '_blank');
      }
   };

   return (
      <div className="flex flex-col min-h-screen bg-white animate-fade-in-up">
         {/* Hero Section */}
         <section className="relative min-h-[90vh] flex items-center bg-[#03091a] text-white overflow-hidden pt-20 pb-32">
            {/* Background Elements */}
            <div className="absolute inset-0 z-0">
               <div className="absolute top-0 right-0 w-3/4 h-full bg-gradient-to-l from-brand-primary/20 via-brand-primary/5 to-transparent"></div>
               <div className="absolute -bottom-40 -left-60 w-[600px] h-[600px] bg-brand-primary/20 rounded-full blur-[120px]"></div>
               <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] bg-brand-light/10 rounded-full blur-[100px]"></div>
               <img src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&q=80" alt="Background" className="w-full h-full object-cover opacity-15 mix-blend-overlay" />

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
                        Comprenez votre voiture <br />
                        <span className="relative inline-block mt-2">
                           <span className="relative text-transparent bg-clip-text bg-gradient-to-r from-brand-primary via-brand-light to-white">avant le garage.</span>
                        </span>
                     </h1>

                     <p className="text-xl text-gray-300 max-w-lg leading-relaxed font-light">
                        Un diagnostic automobile sans rendez-vous, rapide : c’est AutoScanR.
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
         <div className="relative z-20 max-w-5xl mx-auto px-4 -mt-16 mb-12 animate-fade-in-up">
            <div className="bg-white rounded-[2rem] shadow-[0_20px_40px_-15px_rgba(0,0,0,0.15)] p-6 md:p-8 border border-gray-100 flex flex-col md:flex-row items-center gap-8 md:gap-10 relative overflow-hidden">
               <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-brand-primary/10 to-brand-light/5 rounded-full blur-[50px] -z-10 translate-x-1/3 -translate-y-1/3"></div>

               <div className="flex-1 text-center md:text-left space-y-3">
                  <div className="inline-flex items-center gap-2 bg-gradient-to-r from-brand-primary/10 to-brand-primary/5 text-brand-primary px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest border border-brand-primary/10">
                     <CheckCircle2 size={14} /> Vérification Instantanée
                  </div>
                  <h2 className="font-display text-2xl md:text-3xl font-bold text-gray-900 leading-tight">Votre véhicule est-il <span className="text-brand-primary">compatible ?</span></h2>
                  <p className="text-gray-600 text-base">AutoScanR fonctionne avec 99% des véhicules construits après : <br /><span className="font-bold text-gray-800">Essence (2001) / Diesel (2004).</span></p>
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
                           className="w-full h-[4.5rem] md:h-20 px-4 text-3xl md:text-4xl font-display font-medium uppercase tracking-[0.2em] text-center text-gray-900 placeholder-gray-300 outline-none bg-transparent relative z-10"
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
            <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-gray-200 text-center">
               {[
                  { label: "Utilisateurs", value: "15k+", icon: Users },
                  { label: "Garages Partenaires", value: "450+", icon: Wrench },
                  { label: "Économie Moyenne", value: "60%", icon: Zap },
                  { label: "Satisfaction", value: "4.9/5", icon: Star }
               ].map((stat, i) => (
                  <div key={i} className="flex flex-col items-center px-4">
                     <div className="bg-brand-primary/10 p-3 rounded-2xl mb-4 text-brand-primary">
                        <stat.icon size={24} />
                     </div>
                     <span className="font-display font-bold text-3xl text-brand-dark">{stat.value}</span>
                     <span className="text-sm text-gray-500 uppercase tracking-wide font-medium">{stat.label}</span>
                  </div>
               ))}
            </div>
         </div>

         {/* --- STEPS SECTION (HOW IT WORKS) --- */}
         <section className="py-32 bg-white relative overflow-hidden text-center">
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
                  <div className="hidden lg:block absolute top-[4.5rem] left-8 right-8 h-1 bg-gray-100 rounded-full -z-10 overflow-hidden">
                     <div className="absolute top-0 left-0 h-full w-1/3 bg-gradient-to-r from-brand-primary via-brand-light to-brand-accent animate-[marquee_3s_linear_infinite]"></div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-6">
                     {[
                        { step: 1, title: "Identification", icon: ScanLine, desc: "Saisissez votre plaque ou sélectionnez votre modèle sur l'écran tactile de la borne." },
                        { step: 2, title: "Branchement", icon: Cable, desc: "Connectez le câble de la borne à la prise OBD de votre voiture (sous le volant).", offset: "lg:mt-6" },
                        { step: 3, title: "Diagnostic", icon: Cpu, desc: "Nos algorithmes interrogent tous les calculateurs du véhicule en moins de 3 minutes." },
                        { step: 4, title: "Traduction", icon: FileText, desc: "Recevez un rapport clair. Nous traduisons le code technique en français compréhensible.", premium: true },
                        { step: 5, title: "Décision", icon: Handshake, desc: "Réparez vous-même ou envoyez le rapport en 1 clic à nos garages partenaires certifiés.", offset: "lg:mt-6" }
                     ].map((item, i) => (
                        <div key={i} className="group relative text-center">
                           <div className={` rounded-[2rem] p-8 shadow-[0_10px_30px_-15px_rgba(0,0,0,0.1)] border border-gray-100 hover:border-brand-primary/30 transition-all duration-500 hover:-translate-y-3 h-full ${item.premium ? 'bg-[#0c142b] border-brand-primary/30 shadow-[0_20px_40px_-15px_rgba(0,148,183,0.4)] lg:-mt-4' : 'bg-white'} ${item.offset || ''}`}>
                              {item.premium && <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/20 via-transparent to-brand-accent/10 opacity-50 rounded-[2rem]"></div>}
                              <div className={`w-28 h-28 ${item.premium ? 'bg-white/10 backdrop-blur-xl' : 'bg-gray-50'} rounded-[1.5rem] ${i % 2 === 0 ? 'rotate-3' : '-rotate-3'} border-4 border-white shadow-lg flex items-center justify-center mb-8 mx-auto group-hover:rotate-0 transition-transform duration-500 relative z-10`}>
                                 <span className={`absolute -top-3 -right-3 w-8 h-8 ${item.premium ? 'bg-brand-primary' : 'bg-gray-900'} text-white text-sm font-bold rounded-full flex items-center justify-center border-2 border-white shadow-md z-20`}>{item.step}</span>
                                 <item.icon className={`w-12 h-12 ${item.premium ? 'text-brand-accent drop-shadow-[0_0_10px_rgba(228,188,55,0.8)]' : 'text-gray-400 group-hover:text-brand-primary'} transition-colors duration-500`} />
                              </div>
                              <div className="relative z-10">
                                 <h3 className={`font-display text-xl font-bold mb-3 ${item.premium ? 'text-white' : 'text-gray-900'}`}>{item.title}</h3>
                                 <p className={`text-sm leading-relaxed font-light ${item.premium ? 'text-gray-300' : 'text-gray-500'}`}>{item.desc}</p>
                              </div>
                           </div>
                        </div>
                     ))}
                  </div>
               </div>
            </div>
         </section>

         {/* Moto Section */}
         <section className="py-32 bg-gray-50">
            <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8">

               {/* Avantages */}
               <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-16">
                  <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:border-brand-primary/20 hover:shadow-md transition-all duration-300 group text-center md:text-left">
                     <div className="bg-brand-primary/10 w-14 h-14 rounded-2xl flex items-center justify-center mb-5 text-brand-primary group-hover:scale-110 transition-transform mx-auto md:mx-0">
                        <ShieldCheck size={28} />
                     </div>
                     <h4 className="font-display text-xl font-bold text-gray-900 mb-2">100% neutre et objectif</h4>
                     <p className="text-gray-600 leading-relaxed">Nous ne vendons aucune réparation. Vous obtenez un diagnostic impartial, sans conflit d'intérêt. Idéal avant un achat d'occasion.</p>
                  </div>

                  <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:border-brand-primary/20 hover:shadow-md transition-all duration-300 group text-center md:text-left">
                     <div className="bg-brand-accent/10 w-14 h-14 rounded-2xl flex items-center justify-center mb-5 text-brand-accent group-hover:scale-110 transition-transform mx-auto md:mx-0">
                        <Clock size={28} />
                     </div>
                     <h4 className="font-display text-xl font-bold text-gray-900 mb-2">5 minutes, dès 19,90€</h4>
                     <p className="text-gray-600 leading-relaxed">Un diagnostic complet en quelques minutes seulement. Sans rendez-vous, disponible 24h/24 et 7j/7 près de chez vous.</p>
                  </div>

                  <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:border-brand-primary/20 hover:shadow-md transition-all duration-300 group text-center md:text-left">
                     <div className="bg-green-100 w-14 h-14 rounded-2xl flex items-center justify-center mb-5 text-green-600 group-hover:scale-110 transition-transform mx-auto md:mx-0">
                        <Activity size={28} />
                     </div>
                     <h4 className="font-display text-xl font-bold text-gray-900 mb-2">Compréhensible par tous</h4>
                     <p className="text-gray-600 leading-relaxed">Les codes défauts techniques sont traduits en langage clair par notre IA. Vous comprenez enfin ce qui ne va pas, sans être expert.</p>
                  </div>
               </div>

               {/* CTA Banner */}
               <div className="max-w-4xl mx-auto">
                  <div className="bg-gradient-to-r from-brand-primary to-brand-light rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-lg">
                     <div className="text-white text-center md:text-left">
                        <h4 className="font-display text-2xl font-bold mb-1">Essayez AutoScanR dès aujourd'hui</h4>
                        <p className="text-white/80 text-lg">Trouvez la borne la plus proche de vous et scannez votre véhicule.</p>
                     </div>
                     <button onClick={() => document.getElementById('map-section')?.scrollIntoView({ behavior: 'smooth' })} className="bg-white text-brand-primary px-8 py-4 rounded-xl font-bold text-lg shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex items-center gap-2 shrink-0">
                        <MapPin size={20} /> Trouver une borne
                     </button>
                  </div>
               </div>
            </div>
         </section>

         {/* Partner Marquee */}
         <section className="py-16 bg-white border-t border-gray-100 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 mb-10 text-center">
               <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Ils acceptent les rapports AutoScanR</p>
            </div>
            <div className="relative flex overflow-x-hidden group">
               <div className="py-6 animate-marquee whitespace-nowrap flex items-center gap-20 px-10 transition-all duration-500">
                  <div className="flex flex-col items-center gap-2 grayscale-0 hover:scale-110 transition-transform cursor-pointer">
                     <span className="text-3xl font-black text-[#005599] tracking-tighter">NORAUTO</span>
                  </div>
                  <div className="flex flex-col items-center gap-2 grayscale-0 hover:scale-110 transition-transform cursor-pointer">
                     <span className="text-3xl font-black text-[#009b48] tracking-tight italic">FEU VERT</span>
                  </div>
                  <div className="flex flex-col items-center gap-2 grayscale-0 hover:scale-110 transition-transform cursor-pointer">
                     <span className="text-3xl font-black text-[#e2001a] tracking-wider italic">SPEEDY</span>
                  </div>
                  <div className="flex flex-col items-center gap-2 grayscale-0 hover:scale-110 transition-transform cursor-pointer">
                     <span className="text-3xl font-black text-[#ffcc00] tracking-wide">MIDAS</span>
                  </div>
                  <div className="flex flex-col items-center gap-2 grayscale-0 hover:scale-110 transition-transform cursor-pointer">
                     <span className="text-3xl font-black text-[#00529c]">POINT S</span>
                  </div>
                  <div className="flex flex-col items-center gap-2 grayscale-0 hover:scale-110 transition-transform cursor-pointer">
                     <span className="text-3xl font-black text-[#1d4f91] italic">EUROMASTER</span>
                  </div>
                  <div className="flex flex-col items-center gap-2 grayscale-0 hover:scale-110 transition-transform cursor-pointer">
                     <span className="text-3xl font-black text-gray-900 border-2 border-brand-primary px-3 py-1 rounded">AD EXPERT</span>
                  </div>
               </div>
            </div>
         </section>

         {/* Map Section - Simplified */}
         <section id="map-section" className="py-24 bg-white relative">
            <div className="max-w-7xl mx-auto px-4">
               <div className="mb-12 text-center md:text-left">
                  <h2 className="font-display text-4xl font-bold text-brand-dark">Réseau Toulonnais</h2>
                  <p className="text-lg text-gray-600 mt-2">Trouvez la borne AutoScanR la plus proche de vous à Toulon.</p>
               </div>

               {/* This div will act as the grid container for map and list on large screens */}
               <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* Map Visual (Left - 2 Cols) */}
                  <div className={`lg:col-span-2 relative bg-gray-200 rounded-3xl overflow-hidden shadow-inner group border border-gray-200 transition-all duration-300 ${mapViewMode === 'list' ? 'hidden lg:block' : 'block'}`}>

                     {/* UI Label for precision */}
                     <div className="absolute top-4 left-4 z-20 bg-white/90 backdrop-blur-md px-4 py-2 rounded-xl shadow-md border border-gray-100">
                        <div className="flex items-center gap-2">
                           <MapPin className="text-brand-primary" size={18} />
                           <span className="font-bold text-brand-dark text-sm tracking-wide">Carte Interactive</span>
                        </div>
                     </div>

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
                           onClick={() => setActiveLocation(loc.id)}
                        >
                           <div className="relative">
                              {/* Pulse Ring */}
                              <div className={`absolute inset-0 rounded-full animate-ping opacity-75 ${loc.status === 'Disponible' ? 'bg-brand-primary' : 'bg-gray-400'} w-full h-full`}></div>

                              {/* Pin Icon */}
                              <div className={`relative z-10 w-10 h-10 rounded-full border-2 border-white shadow-lg flex items-center justify-center transition-all ${activeLocation === loc.id ? 'scale-125 bg-brand-dark ring-4 ring-brand-primary/20' : 'bg-brand-primary text-white hover:scale-110'}`}>
                                 {loc.status === 'Disponible' ? <Zap size={18} fill="currentColor" /> : <Clock size={18} />}
                              </div>

                              {/* Tooltip on Hover/Selection */}
                              <div className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-3 bg-brand-dark text-white text-xs px-3 py-2 rounded-lg whitespace-nowrap shadow-xl transition-all duration-300 ${activeLocation === loc.id ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none group-hover/pin:opacity-100 group-hover/pin:translate-y-0'}`}>
                                 <p className="font-bold">{loc.name}</p>
                                 <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-brand-dark rotate-45"></div>
                              </div>
                           </div>
                        </div>
                     ))}
                  </div>

                  {/* Location List (Right - 1 Col) */}
                  <div className={`bg-gray-50 rounded-3xl p-6 border border-gray-100 flex flex-col overflow-hidden transition-all duration-300 ${mapViewMode === 'map' ? 'hidden lg:flex' : 'flex'}`}>
                     <h3 className="font-bold text-gray-400 text-xs uppercase tracking-wider mb-4">Bornes à proximité</h3>
                     <div className="overflow-y-auto space-y-3 flex-1 pr-2 scrollbar-hide">
                        {toulonLocations.map((loc) => (
                           <div
                              key={loc.id}
                              className={`p-4 rounded-xl border-2 transition-all cursor-pointer flex items-center gap-4 ${activeLocation === loc.id ? 'bg-white border-brand-primary shadow-lg scale-[1.02]' : 'bg-white border-transparent hover:border-gray-200'}`}
                              onClick={() => setActiveLocation(loc.id)}
                           >
                              <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${loc.status === 'Disponible' ? 'bg-green-100 text-green-600' : 'bg-orange-100 text-orange-500'}`}>
                                 {loc.status === 'Disponible' ? <Car size={20} /> : <Clock size={20} />}
                              </div>
                              <div className="flex-1 min-w-0">
                                 <h4 className={`font-bold truncate ${activeLocation === loc.id ? 'text-brand-primary' : 'text-brand-dark'}`}>{loc.name}</h4>
                                 <p className="text-xs text-gray-500 truncate">{loc.address}</p>
                              </div>
                              <div className="text-right">
                                 <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${loc.status === 'Disponible' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}`}>
                                    {loc.status === 'Disponible' ? 'Libre' : 'Occupé'}
                                 </span>
                              </div>
                           </div>
                        ))}
                     </div>
                     <div className="mt-6 pt-6 border-t border-gray-200">
                        <button
                           onClick={openItinerary}
                           className="w-full bg-brand-dark text-white py-3 rounded-xl font-bold hover:bg-black transition flex items-center justify-center gap-2"
                        >
                           <Navigation size={18} /> Itinéraire vers {activeLocation ? toulonLocations.find(l => l.id === activeLocation)?.name : 'la plus proche'}
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
                     answer="Nos tarifs commencent à partir de 19,90€. C'est environ 80% moins cher qu'en garage traditionnel (30-250€), pour une précision de lecture électronique strictement identique (même technologie)."
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
