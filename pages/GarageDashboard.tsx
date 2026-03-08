import React, { useState } from 'react';
import { Users, Calendar as CalendarIcon, Settings, Search, AlertCircle, Clock, CheckCircle2, TrendingUp, DollarSign, Filter, Activity, Star, FileText, ChevronRight, Car, MapPin, Phone, Mail, ArrowUpRight, Eye, Send, Wrench, BarChart3, MessageSquare, Bell, X } from 'lucide-react';
import { ViewState } from '../types';

interface GarageDashboardProps {
   setView: (view: ViewState) => void;
}

// ─── MOCK DATA ──────────────────────────────────────────────────
const GARAGE_INFO = {
   name: 'Garage MecaExpert',
   address: '15 Rue de la Mécanique, 83000 Toulon',
   phone: '04 94 12 34 56',
   rating: 4.8,
   reviewCount: 124,
};

const LEADS = [
   { id: 1, car: 'Peugeot 308', year: 2019, plate: 'AB-123-CD', issue: 'Ratés Allumage (P0303)', distance: '2.5 km', urgency: 'high', time: 'Il y a 15 min', price: '180€ - 250€', status: 'new', customerName: 'Alexandre D.', symptoms: 'Bruit étrange au ralenti, voyant clignote.' },
   { id: 2, car: 'Renault Captur', year: 2021, plate: 'EF-456-GH', issue: 'Pression Pneus Basse', distance: '5.1 km', urgency: 'low', time: 'Il y a 1h', price: '50€', status: 'new', customerName: 'Marie L.', symptoms: '' },
   { id: 3, car: 'Citroën C3', year: 2018, plate: 'IJ-789-KL', issue: 'Filtre à Particules (P2002)', distance: '1.2 km', urgency: 'high', time: 'Il y a 3h', price: '300€ - 500€', status: 'quoted', customerName: 'Pierre M.', symptoms: 'Mode dégradé activé sur autoroute.' },
   { id: 4, car: 'Volkswagen Golf 7', year: 2017, plate: 'MN-012-OP', issue: 'Usure Plaquettes', distance: '8.4 km', urgency: 'medium', time: 'Il y a 1j', price: '120€ - 180€', status: 'quoted', customerName: 'Sophie R.', symptoms: 'Bruit métallique au freinage.' },
   { id: 5, car: 'Toyota Yaris', year: 2020, plate: 'QR-345-ST', issue: 'Batterie Faible', distance: '3.7 km', urgency: 'medium', time: 'Il y a 2j', price: '90€ - 150€', status: 'accepted', customerName: 'Lucas B.', symptoms: 'Démarrage difficile le matin.' },
];

const APPOINTMENTS = [
   { id: 1, customer: 'Lucas B.', car: 'Toyota Yaris (2020)', date: 'Lun. 30 Oct', time: '09:30', issue: 'Remplacement batterie', status: 'confirmed' },
   { id: 2, customer: 'Sophie R.', car: 'VW Golf 7 (2017)', date: 'Mar. 31 Oct', time: '14:00', issue: 'Changement plaquettes', status: 'confirmed' },
   { id: 3, customer: 'Pierre M.', car: 'Citroën C3 (2018)', date: 'Mer. 01 Nov', time: '10:00', issue: 'Diagnostic FAP', status: 'pending' },
];

const GarageDashboard: React.FC<GarageDashboardProps> = ({ setView }) => {
   const [activeView, setActiveView] = useState<'dashboard' | 'leads' | 'appointments' | 'stats' | 'settings'>('dashboard');
   const [leadFilter, setLeadFilter] = useState<'all' | 'new' | 'quoted' | 'accepted'>('all');

   const filteredLeads = leadFilter === 'all' ? LEADS : LEADS.filter(l => l.status === leadFilter);

   const urgencyConfig = {
      high: { label: 'Urgent', bg: 'bg-red-50', text: 'text-red-600', border: 'border-red-100', dot: 'bg-red-500' },
      medium: { label: 'Modéré', bg: 'bg-orange-50', text: 'text-orange-600', border: 'border-orange-100', dot: 'bg-orange-500' },
      low: { label: 'Mineur', bg: 'bg-green-50', text: 'text-green-600', border: 'border-green-100', dot: 'bg-green-500' },
   };

   const statusConfig = {
      new: { label: 'Nouveau', bg: 'bg-blue-50', text: 'text-blue-600', border: 'border-blue-100' },
      quoted: { label: 'Devis envoyé', bg: 'bg-yellow-50', text: 'text-yellow-700', border: 'border-yellow-100' },
      accepted: { label: 'Accepté', bg: 'bg-green-50', text: 'text-green-600', border: 'border-green-100' },
   };

   const NavItem = ({ id, icon: Icon, label, alertCount = 0 }: any) => (
      <button
         onClick={() => setActiveView(id)}
         className={`relative flex items-center gap-2 px-6 py-4 text-sm font-bold transition-all duration-300 ${activeView === id
            ? 'text-brand-primary border-b-2 border-brand-primary'
            : 'text-gray-500 hover:text-brand-dark'
            }`}
      >
         <Icon size={18} />
         <span className="hidden md:block">{label}</span>
         {alertCount > 0 && (
            <span className="absolute top-2 right-2 md:relative md:top-auto md:right-auto bg-red-500 text-white text-[10px] font-black px-1.5 py-0.5 rounded-full shadow-sm">
               {alertCount}
            </span>
         )}
      </button>
   );

   // ─── KPI CARD ──────────────────────────────────────────────────
   const KpiCard = ({ icon: Icon, iconBg, iconColor, label, value, trend, trendLabel }: any) => (
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
         <div className="flex items-center justify-between mb-4">
            <div className={`${iconBg} ${iconColor} p-3 rounded-xl`}><Icon size={22} /></div>
            {trend && (
               <div className={`flex items-center gap-1 text-xs font-bold ${trend > 0 ? 'text-green-600 bg-green-50' : 'text-red-500 bg-red-50'} px-2 py-1 rounded-lg`}>
                  <TrendingUp size={12} className={trend < 0 ? 'rotate-180' : ''} />
                  {trend > 0 ? '+' : ''}{trend}%
               </div>
            )}
         </div>
         <h3 className="font-display text-3xl font-bold text-brand-dark">{value}</h3>
         <p className="text-sm text-gray-500 mt-1">{label}</p>
         {trendLabel && <p className="text-xs text-gray-400 mt-2">{trendLabel}</p>}
      </div>
   );

   return (
      <div className="min-h-screen bg-[#f8f9fa] flex flex-col font-sans pt-20">

         {/* ─── TOP NAVIGATION BAR ───────────────────────────────── */}
         <div className="sticky top-20 z-20 bg-white border-b border-gray-200 shadow-sm flex items-center justify-between px-4 md:px-8">
            <nav className="flex items-center overflow-x-auto hide-scrollbar">
               <NavItem id="dashboard" icon={BarChart3} label="Tableau de Bord" />
               <NavItem id="leads" icon={Users} label="Demandes" alertCount={LEADS.filter(l => l.status === 'new').length} />
               <NavItem id="appointments" icon={CalendarIcon} label="Rendez-vous" />
               <NavItem id="stats" icon={TrendingUp} label="Statistiques" />
               <NavItem id="settings" icon={Settings} label="Mon Garage" />
            </nav>
            <div className="hidden md:flex items-center gap-4 py-2 border-l border-gray-100 pl-6">
               <button className="relative p-2 text-gray-400 hover:text-brand-primary transition-colors">
                  <Bell size={20} />
                  <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
               </button>
               <div className="text-right">
                  <p className="font-bold text-sm text-brand-dark">{GARAGE_INFO.name}</p>
                  <p className="text-xs text-green-500 font-bold flex items-center justify-end gap-1">
                     <span className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.8)] animate-pulse"></span> En ligne
                  </p>
               </div>
               <div className="w-10 h-10 rounded-full bg-gradient-to-br from-brand-primary to-blue-600 flex items-center justify-center text-white font-bold shadow-sm">
                  M
               </div>
            </div>
         </div>

         {/* ─── MAIN CONTENT ────────────────────────────────────── */}
         <main className="flex-1 p-6 md:p-10 lg:p-12 w-full max-w-7xl mx-auto">

            {/* ═══════════════════════════════════════════════════
               VIEW: TABLEAU DE BORD (OVERVIEW)
            ═══════════════════════════════════════════════════ */}
            {activeView === 'dashboard' && (
               <div className="animate-fade-in-up space-y-8">
                  {/* Welcome Banner */}
                  <div className="bg-gradient-to-br from-[#0c142b] to-[#1a2845] rounded-[2rem] p-8 md:p-10 text-white relative overflow-hidden">
                     <div className="absolute top-0 right-0 w-72 h-72 bg-brand-primary/10 rounded-full -translate-y-1/2 translate-x-1/3"></div>
                     <div className="absolute bottom-0 left-1/2 w-48 h-48 bg-blue-500/5 rounded-full translate-y-1/2"></div>
                     <div className="relative z-10">
                        <h1 className="font-display text-3xl md:text-4xl font-bold mb-2">Bonjour, MecaExpert 👋</h1>
                        <p className="text-white/60 text-sm md:text-base">Vous avez <span className="text-white font-bold">{LEADS.filter(l => l.status === 'new').length} nouvelles demandes</span> et <span className="text-white font-bold">{APPOINTMENTS.length} rendez-vous</span> cette semaine.</p>
                     </div>
                     <div className="mt-8 flex flex-wrap gap-4 relative z-10">
                        <button onClick={() => setActiveView('leads')} className="bg-brand-primary text-white px-6 py-3 rounded-xl font-bold text-sm shadow-lg shadow-brand-primary/30 hover:bg-brand-light transition-all flex items-center gap-2">
                           <Users size={18} /> Voir les demandes <ChevronRight size={16} />
                        </button>
                        <button onClick={() => setActiveView('appointments')} className="bg-white/10 backdrop-blur-sm text-white border border-white/20 px-6 py-3 rounded-xl font-bold text-sm hover:bg-white/20 transition-all flex items-center gap-2">
                           <CalendarIcon size={18} /> Planning du jour
                        </button>
                     </div>
                  </div>

                  {/* KPI Row */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                     <KpiCard icon={DollarSign} iconBg="bg-green-100" iconColor="text-green-600" label="Chiffre d'affaires (mois)" value="4 250 €" trend={12.5} />
                     <KpiCard icon={Users} iconBg="bg-blue-100" iconColor="text-blue-600" label="Nouveaux clients" value="18" trend={8} trendLabel="+3 cette semaine" />
                     <KpiCard icon={CheckCircle2} iconBg="bg-purple-100" iconColor="text-purple-600" label="Taux de conversion" value="65%" trend={5} />
                     <KpiCard icon={Star} iconBg="bg-yellow-100" iconColor="text-yellow-600" label="Note moyenne" value={GARAGE_INFO.rating.toString()} trendLabel={`${GARAGE_INFO.reviewCount} avis`} />
                  </div>

                  {/* Two Column: Recent Leads + Upcoming Appointments */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                     {/* Recent Leads */}
                     <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden">
                        <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                           <h3 className="font-display font-bold text-lg text-brand-dark">Dernières demandes</h3>
                           <button onClick={() => setActiveView('leads')} className="text-xs text-brand-primary font-bold hover:underline flex items-center gap-1">Tout voir <ChevronRight size={14} /></button>
                        </div>
                        <div className="divide-y divide-gray-50">
                           {LEADS.slice(0, 3).map(lead => (
                              <div key={lead.id} className="p-4 md:p-5 flex items-center gap-4 hover:bg-gray-50/50 transition-colors cursor-pointer">
                                 <div className={`w-2 h-2 rounded-full shrink-0 ${urgencyConfig[lead.urgency as keyof typeof urgencyConfig].dot}`}></div>
                                 <div className="flex-1 min-w-0">
                                    <h4 className="font-bold text-sm text-brand-dark truncate">{lead.car} ({lead.year})</h4>
                                    <p className="text-xs text-gray-500 truncate">{lead.issue}</p>
                                 </div>
                                 <div className="text-right shrink-0">
                                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${statusConfig[lead.status as keyof typeof statusConfig].bg} ${statusConfig[lead.status as keyof typeof statusConfig].text} border ${statusConfig[lead.status as keyof typeof statusConfig].border}`}>
                                       {statusConfig[lead.status as keyof typeof statusConfig].label}
                                    </span>
                                    <p className="text-[10px] text-gray-400 mt-1">{lead.time}</p>
                                 </div>
                              </div>
                           ))}
                        </div>
                     </div>

                     {/* Upcoming Appointments */}
                     <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden">
                        <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                           <h3 className="font-display font-bold text-lg text-brand-dark">Prochains rendez-vous</h3>
                           <button onClick={() => setActiveView('appointments')} className="text-xs text-brand-primary font-bold hover:underline flex items-center gap-1">Tout voir <ChevronRight size={14} /></button>
                        </div>
                        <div className="divide-y divide-gray-50">
                           {APPOINTMENTS.map(apt => (
                              <div key={apt.id} className="p-4 md:p-5 flex items-center gap-4 hover:bg-gray-50/50 transition-colors">
                                 <div className="w-12 h-12 bg-brand-primary/10 rounded-xl flex flex-col items-center justify-center shrink-0">
                                    <span className="text-[10px] font-bold text-brand-primary leading-none">{apt.date.split(' ')[0]}</span>
                                    <span className="text-sm font-bold text-brand-dark leading-tight">{apt.date.split(' ')[1]}</span>
                                 </div>
                                 <div className="flex-1 min-w-0">
                                    <h4 className="font-bold text-sm text-brand-dark">{apt.customer}</h4>
                                    <p className="text-xs text-gray-500 truncate">{apt.car} — {apt.issue}</p>
                                 </div>
                                 <div className="flex items-center gap-2 text-xs font-bold text-gray-500 shrink-0">
                                    <Clock size={12} className="text-brand-primary" />
                                    {apt.time}
                                 </div>
                              </div>
                           ))}
                        </div>
                     </div>
                  </div>

                  {/* Revenue Chart */}
                  <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-gray-100">
                     <div className="flex items-center justify-between mb-8">
                        <div>
                           <h3 className="font-display font-bold text-xl text-brand-dark">Évolution des revenus AutoScanR</h3>
                           <p className="text-sm text-gray-500 mt-1">Revenus générés via la plateforme sur les 5 derniers mois</p>
                        </div>
                        <div className="flex items-center gap-2 bg-gray-50 rounded-lg p-1 border border-gray-100">
                           <button className="px-3 py-1.5 text-xs font-bold text-white bg-brand-primary rounded-md">Mois</button>
                           <button className="px-3 py-1.5 text-xs font-bold text-gray-500 hover:text-brand-dark">Semaine</button>
                        </div>
                     </div>
                     <div className="h-56 w-full flex items-end gap-4 relative">
                        <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-[10px] text-gray-400 font-bold pb-8">
                           <span>5k€</span><span>2.5k€</span><span>0€</span>
                        </div>
                        <div className="ml-10 w-full h-full border-b border-gray-100 flex items-end justify-around px-4 relative">
                           {[
                              { month: 'Juil', h: '35%', val: '1.8k€' },
                              { month: 'Août', h: '50%', val: '2.4k€' },
                              { month: 'Sept', h: '42%', val: '2.1k€' },
                              { month: 'Oct', h: '72%', val: '3.6k€' },
                              { month: 'Nov', h: '88%', val: '4.2k€', current: true },
                           ].map((bar, i) => (
                              <div key={i} className="flex flex-col items-center gap-2 flex-1 max-w-[80px]">
                                 <div className="relative w-full group">
                                    <div
                                       className={`w-full rounded-t-lg transition-all duration-500 cursor-pointer ${bar.current ? 'bg-gradient-to-t from-brand-primary to-[#00b4d8] shadow-lg shadow-brand-primary/30' : 'bg-gray-200 hover:bg-brand-primary/40'}`}
                                       style={{ height: bar.h, minHeight: '20px' }}
                                    >
                                       <span className="absolute -top-7 left-1/2 -translate-x-1/2 bg-brand-dark text-white text-[10px] py-0.5 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap font-bold">{bar.val}</span>
                                    </div>
                                 </div>
                                 <span className={`text-xs font-bold ${bar.current ? 'text-brand-primary' : 'text-gray-400'}`}>{bar.month}</span>
                              </div>
                           ))}
                        </div>
                     </div>
                  </div>
               </div>
            )}

            {/* ═══════════════════════════════════════════════════
               VIEW: DEMANDES (LEADS)
            ═══════════════════════════════════════════════════ */}
            {activeView === 'leads' && (
               <div className="animate-fade-in-up space-y-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                     <div>
                        <h2 className="font-display text-3xl font-bold text-brand-dark">Demandes de Devis</h2>
                        <p className="text-gray-500 text-sm mt-1">Répondez rapidement pour maximiser vos conversions.</p>
                     </div>
                     <div className="flex items-center gap-3">
                        <div className="relative">
                           <input type="text" placeholder="Rechercher..." className="bg-white border border-gray-200 rounded-xl px-4 py-2.5 pl-10 text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary/50 focus:border-brand-primary transition-all w-56" />
                           <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        </div>
                     </div>
                  </div>

                  {/* Filters */}
                  <div className="flex flex-wrap gap-2">
                     {[
                        { key: 'all', label: `Toutes (${LEADS.length})` },
                        { key: 'new', label: `Nouvelles (${LEADS.filter(l => l.status === 'new').length})`, dot: 'bg-blue-500' },
                        { key: 'quoted', label: `Devis envoyé (${LEADS.filter(l => l.status === 'quoted').length})`, dot: 'bg-yellow-500' },
                        { key: 'accepted', label: `Acceptées (${LEADS.filter(l => l.status === 'accepted').length})`, dot: 'bg-green-500' },
                     ].map(f => (
                        <button
                           key={f.key}
                           onClick={() => setLeadFilter(f.key as any)}
                           className={`px-4 py-2 text-sm font-bold rounded-full shadow-sm transition-all flex items-center gap-2 ${leadFilter === f.key ? 'bg-brand-dark text-white shadow-md' : 'bg-white text-gray-600 border border-gray-200 hover:border-brand-primary/30'}`}
                        >
                           {f.dot && <span className={`w-2 h-2 rounded-full ${f.dot}`}></span>}
                           {f.label}
                        </button>
                     ))}
                  </div>

                  {/* Leads Table/Cards */}
                  <div className="space-y-4">
                     {filteredLeads.map(lead => {
                        const urg = urgencyConfig[lead.urgency as keyof typeof urgencyConfig];
                        const stat = statusConfig[lead.status as keyof typeof statusConfig];
                        return (
                           <div key={lead.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg hover:border-brand-primary/20 transition-all p-5 md:p-6">
                              <div className="flex flex-col md:flex-row md:items-center gap-5">
                                 {/* Left: Vehicle & Issue Info */}
                                 <div className="flex-1 space-y-3">
                                    <div className="flex flex-wrap items-center gap-2">
                                       <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wider ${urg.bg} ${urg.text} border ${urg.border} flex items-center gap-1`}>
                                          {lead.urgency === 'high' && <AlertCircle size={10} />}
                                          {urg.label}
                                       </span>
                                       <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${stat.bg} ${stat.text} border ${stat.border}`}>{stat.label}</span>
                                       <span className="text-xs text-gray-400 flex items-center gap-1"><Clock size={10} /> {lead.time}</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                       <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center">
                                          <Car size={20} className="text-gray-400" />
                                       </div>
                                       <div>
                                          <h3 className="font-bold text-brand-dark">{lead.car} <span className="text-gray-400 font-normal">({lead.year})</span></h3>
                                          <p className="text-xs text-gray-500">{lead.plate} • {lead.customerName} • {lead.distance}</p>
                                       </div>
                                    </div>
                                    <div className="bg-blue-50/50 border border-blue-100 rounded-xl p-3">
                                       <h4 className="text-sm font-bold text-brand-dark flex items-center gap-2 mb-1">
                                          <AlertCircle size={14} className="text-brand-primary" /> {lead.issue}
                                       </h4>
                                       {lead.symptoms ? (
                                          <p className="text-xs text-gray-600 italic pl-5">"{lead.symptoms}"</p>
                                       ) : (
                                          <p className="text-xs text-gray-400 pl-5">Aucun symptôme déclaré.</p>
                                       )}
                                    </div>
                                 </div>

                                 {/* Right: Price & Actions */}
                                 <div className="shrink-0 flex flex-col items-end gap-3 md:border-l md:border-gray-100 md:pl-6 md:min-w-[200px]">
                                    <div className="text-right">
                                       <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Estimation</p>
                                       <p className="font-display text-xl font-bold text-brand-dark">{lead.price}</p>
                                    </div>
                                    {lead.status === 'new' ? (
                                       <div className="flex flex-col gap-2 w-full">
                                          <button className="w-full bg-brand-primary text-white py-2.5 rounded-xl text-sm font-bold shadow-md shadow-brand-primary/20 hover:bg-brand-light transition-all flex items-center justify-center gap-2">
                                             <Send size={14} /> Envoyer un devis
                                          </button>
                                          <button className="w-full bg-white border border-gray-200 text-gray-600 py-2.5 rounded-xl text-sm font-bold hover:border-brand-primary/30 transition-all flex items-center justify-center gap-2">
                                             <Eye size={14} /> Voir le rapport
                                          </button>
                                       </div>
                                    ) : lead.status === 'quoted' ? (
                                       <div className="flex flex-col gap-2 w-full">
                                          <button className="w-full bg-white border border-gray-200 text-gray-600 py-2.5 rounded-xl text-sm font-bold hover:border-brand-primary/30 transition-all flex items-center justify-center gap-2">
                                             <Eye size={14} /> Voir mon devis
                                          </button>
                                          <button className="w-full text-xs text-gray-400 hover:text-brand-primary transition-colors">Relancer le client</button>
                                       </div>
                                    ) : (
                                       <button className="w-full bg-green-50 border border-green-100 text-green-600 py-2.5 rounded-xl text-sm font-bold flex items-center justify-center gap-2">
                                          <CheckCircle2 size={14} /> RDV planifié
                                       </button>
                                    )}
                                 </div>
                              </div>
                           </div>
                        );
                     })}
                  </div>
               </div>
            )}

            {/* ═══════════════════════════════════════════════════
               VIEW: RENDEZ-VOUS
            ═══════════════════════════════════════════════════ */}
            {activeView === 'appointments' && (
               <div className="animate-fade-in-up space-y-8">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                     <div>
                        <h2 className="font-display text-3xl font-bold text-brand-dark">Rendez-vous</h2>
                        <p className="text-gray-500 text-sm mt-1">Gérez votre planning et vos rendez-vous clients.</p>
                     </div>
                  </div>

                  {/* Appointments List */}
                  <div className="space-y-4">
                     {APPOINTMENTS.map(apt => (
                        <div key={apt.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex flex-col md:flex-row md:items-center gap-5 hover:shadow-md transition-shadow">
                           <div className="w-16 h-16 bg-brand-primary/10 rounded-2xl flex flex-col items-center justify-center shrink-0">
                              <span className="text-[10px] font-bold text-brand-primary leading-none uppercase">{apt.date.split(' ')[0]}</span>
                              <span className="text-xl font-bold text-brand-dark leading-tight">{apt.date.split(' ')[1]}</span>
                              <span className="text-[10px] font-bold text-gray-400">{apt.date.split(' ')[2]}</span>
                           </div>
                           <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-1">
                                 <h4 className="font-bold text-brand-dark">{apt.customer}</h4>
                                 <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${apt.status === 'confirmed' ? 'bg-green-50 text-green-600 border border-green-100' : 'bg-orange-50 text-orange-600 border border-orange-100'}`}>
                                    {apt.status === 'confirmed' ? 'Confirmé' : 'En attente'}
                                 </span>
                              </div>
                              <p className="text-sm text-gray-500">{apt.car} — {apt.issue}</p>
                           </div>
                           <div className="flex items-center gap-2 text-sm font-bold text-gray-600 bg-gray-50 px-4 py-2 rounded-lg border border-gray-100 shrink-0">
                              <Clock size={14} className="text-brand-primary" />
                              {apt.time}
                           </div>
                           <div className="flex gap-2 shrink-0">
                              <button className="bg-brand-primary text-white px-4 py-2 rounded-xl text-xs font-bold hover:bg-brand-light transition-all">Confirmer</button>
                              <button className="bg-white border border-gray-200 text-gray-500 px-4 py-2 rounded-xl text-xs font-bold hover:border-brand-primary/30 transition-all">Modifier</button>
                           </div>
                        </div>
                     ))}
                  </div>

                  {/* Empty Slot Placeholder */}
                  <div className="bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200 p-8 flex flex-col items-center justify-center text-center opacity-70">
                     <CalendarIcon size={40} className="text-gray-300 mb-3" />
                     <h3 className="font-bold text-brand-dark mb-1">Créneaux disponibles</h3>
                     <p className="text-sm text-gray-500 max-w-md">Configurez vos disponibilités dans les paramètres pour permettre aux automobilistes de prendre rendez-vous en ligne.</p>
                  </div>
               </div>
            )}

            {/* ═══════════════════════════════════════════════════
               VIEW: STATISTIQUES
            ═══════════════════════════════════════════════════ */}
            {activeView === 'stats' && (
               <div className="animate-fade-in-up space-y-8">
                  <h2 className="font-display text-3xl font-bold text-brand-dark">Statistiques</h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                     <KpiCard icon={DollarSign} iconBg="bg-green-100" iconColor="text-green-600" label="Chiffre d'affaires" value="4 250 €" trend={12.5} trendLabel="vs mois dernier" />
                     <KpiCard icon={FileText} iconBg="bg-blue-100" iconColor="text-blue-600" label="Devis envoyés" value="28" trend={-3} />
                     <KpiCard icon={CheckCircle2} iconBg="bg-purple-100" iconColor="text-purple-600" label="Devis acceptés" value="18" trend={5} trendLabel="Taux: 65%" />
                     <KpiCard icon={Clock} iconBg="bg-orange-100" iconColor="text-orange-600" label="Temps de réponse moyen" value="45 min" trendLabel="Objectif: < 30 min" />
                  </div>

                  {/* Performance Summary */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                     <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-gray-100">
                        <h3 className="font-display font-bold text-xl text-brand-dark mb-6">Répartition des demandes</h3>
                        <div className="space-y-4">
                           {[
                              { label: 'Moteur / Allumage', pct: 40, color: 'bg-red-400' },
                              { label: 'Freinage', pct: 25, color: 'bg-orange-400' },
                              { label: 'Électronique', pct: 20, color: 'bg-blue-400' },
                              { label: 'Autres', pct: 15, color: 'bg-gray-300' },
                           ].map((cat, i) => (
                              <div key={i}>
                                 <div className="flex justify-between text-sm mb-1">
                                    <span className="font-bold text-brand-dark">{cat.label}</span>
                                    <span className="text-gray-500 font-bold">{cat.pct}%</span>
                                 </div>
                                 <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden">
                                    <div className={`h-full ${cat.color} rounded-full transition-all duration-1000`} style={{ width: `${cat.pct}%` }}></div>
                                 </div>
                              </div>
                           ))}
                        </div>
                     </div>

                     <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-gray-100">
                        <h3 className="font-display font-bold text-xl text-brand-dark mb-6">Avis clients récents</h3>
                        <div className="space-y-4">
                           {[
                              { name: 'Alexandre D.', rating: 5, comment: 'Super réactif et prix correct. Je recommande !' },
                              { name: 'Marie L.', rating: 4, comment: 'Bon travail, un peu long pour le devis.' },
                              { name: 'Pierre M.', rating: 5, comment: 'Excellent diagnostic, très professionnel.' },
                           ].map((review, i) => (
                              <div key={i} className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                                 <div className="flex items-center justify-between mb-2">
                                    <h4 className="font-bold text-sm text-brand-dark">{review.name}</h4>
                                    <div className="flex gap-0.5">
                                       {Array.from({ length: 5 }).map((_, j) => (
                                          <Star key={j} size={12} className={j < review.rating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-200'} />
                                       ))}
                                    </div>
                                 </div>
                                 <p className="text-sm text-gray-600 italic">"{review.comment}"</p>
                              </div>
                           ))}
                        </div>
                     </div>
                  </div>
               </div>
            )}

            {/* ═══════════════════════════════════════════════════
               VIEW: MON GARAGE (SETTINGS)
            ═══════════════════════════════════════════════════ */}
            {activeView === 'settings' && (
               <div className="animate-fade-in-up space-y-8 max-w-4xl mx-auto">
                  <h2 className="font-display text-3xl font-bold text-brand-dark">Mon Garage</h2>

                  {/* Garage Info Card */}
                  <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100 p-8">
                     <div className="flex flex-col md:flex-row md:items-center gap-6 mb-8">
                        <div className="w-20 h-20 bg-gradient-to-br from-brand-primary to-blue-600 rounded-2xl flex items-center justify-center text-white text-3xl font-bold shadow-lg shadow-brand-primary/20">
                           M
                        </div>
                        <div className="flex-1">
                           <h3 className="font-display text-2xl font-bold text-brand-dark">{GARAGE_INFO.name}</h3>
                           <p className="text-sm text-gray-500 flex items-center gap-2 mt-1"><MapPin size={14} className="text-brand-primary" /> {GARAGE_INFO.address}</p>
                           <div className="flex items-center gap-4 mt-2">
                              <span className="text-sm text-gray-500 flex items-center gap-1"><Phone size={14} className="text-brand-primary" /> {GARAGE_INFO.phone}</span>
                              <span className="text-sm text-yellow-600 font-bold flex items-center gap-1"><Star size={14} className="fill-yellow-500 text-yellow-500" /> {GARAGE_INFO.rating} ({GARAGE_INFO.reviewCount} avis)</span>
                           </div>
                        </div>
                        <button className="bg-brand-primary text-white px-6 py-3 rounded-xl font-bold text-sm shadow-md shadow-brand-primary/20 hover:bg-brand-light transition-all">
                           Modifier le profil
                        </button>
                     </div>

                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {[
                           { icon: Clock, title: "Horaires d'ouverture", desc: 'Lun-Ven : 8h00-18h00, Sam : 9h00-12h00' },
                           { icon: Wrench, title: 'Spécialités', desc: 'Diagnostic OBD, Mécanique générale, Électronique' },
                           { icon: MapPin, title: 'Zone de chalandise', desc: 'Rayon de 15 km autour de Toulon' },
                           { icon: DollarSign, title: 'Taux horaire', desc: '55€ / heure' },
                        ].map((item, i) => (
                           <div key={i} className="bg-gray-50 rounded-xl p-5 border border-gray-100 flex items-start gap-4">
                              <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm shrink-0 border border-gray-100">
                                 <item.icon size={18} className="text-brand-primary" />
                              </div>
                              <div>
                                 <h4 className="font-bold text-sm text-brand-dark">{item.title}</h4>
                                 <p className="text-xs text-gray-500 mt-0.5">{item.desc}</p>
                              </div>
                           </div>
                        ))}
                     </div>
                  </div>

                  {/* Subscription Card */}
                  <div className="bg-gradient-to-br from-[#0c142b] to-[#1a2845] rounded-[2rem] p-8 text-white relative overflow-hidden">
                     <div className="absolute top-0 right-0 w-48 h-48 bg-brand-primary/10 rounded-full -translate-y-1/2 translate-x-1/3"></div>
                     <div className="relative z-10">
                        <p className="text-xs font-bold text-brand-primary uppercase tracking-wider mb-2">Abonnement AutoScanR Pro</p>
                        <h3 className="font-display text-2xl font-bold mb-2">Plan Professionnel</h3>
                        <p className="text-white/60 text-sm mb-6">Accès illimité aux demandes de devis, statistiques avancées, et visibilité prioritaire.</p>
                        <div className="flex items-center gap-4">
                           <span className="text-3xl font-bold">49€<span className="text-lg text-white/60 font-normal">/mois</span></span>
                           <button className="bg-brand-primary text-white px-6 py-3 rounded-xl font-bold text-sm shadow-lg shadow-brand-primary/30 hover:bg-brand-light transition-all">
                              Gérer l'abonnement
                           </button>
                        </div>
                     </div>
                  </div>
               </div>
            )}

         </main>
      </div>
   );
};

export default GarageDashboard;