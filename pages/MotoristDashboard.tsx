import React, { useState } from 'react';
import { Layout, FileText, Calendar, MessageSquare, BookOpen, LogOut, Bell, Settings, ChevronRight, Car, AlertTriangle, CheckCircle2, MapPin, Star } from 'lucide-react';
import { MOCK_USER, MOCK_REPORTS, MOCK_QUOTES, MOCK_APPOINTMENTS, MEDIATION_CONTENT } from '../constants';
import { ViewState, DiagnosticReport } from '../types';

interface MotoristDashboardProps {
  setView: (view: ViewState) => void;
}

const MotoristDashboard: React.FC<MotoristDashboardProps> = ({ setView }) => {
  const [activeSection, setActiveSection] = useState<'overview' | 'reports' | 'quotes' | 'appointments'>('overview');
  const [selectedReport, setSelectedReport] = useState<DiagnosticReport | null>(null);

  const sidebarItems = [
    { id: 'overview', label: "Vue d'ensemble", icon: Layout },
    { id: 'reports', label: "Mes Rapports", icon: FileText },
    { id: 'quotes', label: "Appels d'offres", icon: MessageSquare, badge: 2 },
    { id: 'appointments', label: "Rendez-vous", icon: Calendar },
  ];

  const StatCard = ({ label, value, icon: Icon, color }: any) => (
    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
       <div className="flex items-start justify-between">
          <div>
             <p className="text-gray-500 text-sm font-medium mb-1">{label}</p>
             <h3 className="font-display text-2xl font-bold text-brand-dark">{value}</h3>
          </div>
          <div className={`p-3 rounded-xl ${color}`}>
             <Icon size={20} />
          </div>
       </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 flex pt-16">
      {/* Sidebar */}
      <aside className="w-72 bg-white border-r border-gray-200 hidden lg:flex flex-col fixed h-[calc(100vh-64px)] overflow-y-auto">
        <div className="p-8">
           <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 bg-gray-200 rounded-full overflow-hidden">
                 <img src="https://i.pravatar.cc/150?img=5" alt="Profile" />
              </div>
              <div>
                 <h3 className="font-bold text-brand-dark">{MOCK_USER.name}</h3>
                 <p className="text-xs text-gray-500">{MOCK_USER.vehicle}</p>
              </div>
           </div>
           
           <nav className="space-y-2">
             {sidebarItems.map(item => (
                <button 
                  key={item.id}
                  onClick={() => setActiveSection(item.id as any)}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                     activeSection === item.id 
                     ? 'bg-brand-primary text-white shadow-lg shadow-brand-primary/20' 
                     : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                   <div className="flex items-center gap-3">
                      <item.icon size={18} />
                      {item.label}
                   </div>
                   {item.badge && (
                      <span className="bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">{item.badge}</span>
                   )}
                </button>
             ))}
           </nav>
        </div>

        <div className="mt-auto p-8 border-t border-gray-100">
           <button onClick={() => setView(ViewState.HOME)} className="flex items-center gap-3 text-gray-500 hover:text-red-500 text-sm font-medium transition-colors">
              <LogOut size={18} /> Déconnexion
           </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 lg:ml-72 p-8 max-w-7xl mx-auto w-full">
        
        {/* Header Mobile Only */}
        <div className="lg:hidden mb-8 flex overflow-x-auto gap-4 pb-2">
           {sidebarItems.map(item => (
              <button 
                key={item.id} 
                onClick={() => setActiveSection(item.id as any)}
                className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-bold border ${activeSection === item.id ? 'bg-brand-primary text-white border-brand-primary' : 'bg-white border-gray-200 text-gray-600'}`}
              >
                 {item.label}
              </button>
           ))}
        </div>

        {activeSection === 'overview' && (
           <div className="space-y-8 animate-fade-in-up">
              <div>
                 <h1 className="font-display text-3xl font-bold text-brand-dark">Tableau de bord</h1>
                 <p className="text-gray-500 mt-1">L'état de santé de votre {MOCK_USER.vehicle} en temps réel.</p>
              </div>

              {/* Stats Grid */}
              <div className="grid md:grid-cols-3 gap-6">
                 <StatCard 
                    label="État Actuel" 
                    value="Attention" 
                    icon={AlertTriangle} 
                    color="bg-orange-100 text-orange-600"
                 />
                 <StatCard 
                    label="Dernier Scan" 
                    value="24 Oct" 
                    icon={Calendar} 
                    color="bg-blue-100 text-blue-600"
                 />
                 <StatCard 
                    label="Devis Reçus" 
                    value="2" 
                    icon={MessageSquare} 
                    color="bg-green-100 text-green-600"
                 />
              </div>

              {/* Recent Report Alert */}
              <div className="bg-gradient-to-r from-orange-50 to-white border border-orange-100 p-6 rounded-2xl flex flex-col md:flex-row items-center gap-6 shadow-sm">
                 <div className="bg-orange-100 p-4 rounded-full">
                    <AlertTriangle size={32} className="text-orange-600" />
                 </div>
                 <div className="flex-1">
                    <h3 className="font-bold text-lg text-brand-dark">Action Requise : Ratés d'allumage détectés</h3>
                    <p className="text-gray-600 text-sm mt-1">Le diagnostic du 24/10 a révélé un problème moteur mineur. 2 garages vous ont proposé un devis.</p>
                 </div>
                 <button onClick={() => setActiveSection('quotes')} className="bg-brand-dark text-white px-6 py-3 rounded-xl font-bold hover:bg-black transition shadow-lg whitespace-nowrap">
                    Voir les devis
                 </button>
              </div>

              {/* Quick Actions */}
              <div className="grid md:grid-cols-2 gap-6">
                 <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                    <h3 className="font-bold text-brand-dark mb-4">Prochain Rendez-vous</h3>
                    {MOCK_APPOINTMENTS.length > 0 ? (
                       <div className="bg-gray-50 p-4 rounded-xl flex items-center gap-4">
                          <div className="bg-brand-primary/10 text-brand-primary p-3 rounded-lg font-bold text-center min-w-[60px]">
                             <div className="text-xs uppercase">OCT</div>
                             <div className="text-xl">27</div>
                          </div>
                          <div>
                             <h4 className="font-bold text-brand-dark">{MOCK_APPOINTMENTS[0].garageName}</h4>
                             <p className="text-xs text-gray-500">09:00 • Ratés moteur</p>
                          </div>
                       </div>
                    ) : (
                       <p className="text-gray-400 text-sm">Aucun rendez-vous prévu.</p>
                    )}
                 </div>

                 <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm cursor-pointer hover:border-brand-primary/50 transition" onClick={() => setView(ViewState.MEDIATION_CENTER)}>
                    <h3 className="font-bold text-brand-dark mb-4">Conseil du jour</h3>
                    <div className="flex gap-4">
                       <img src={MEDIATION_CONTENT[0].thumbnail} className="w-20 h-20 rounded-lg object-cover" />
                       <div>
                          <h4 className="font-bold text-sm text-brand-dark mb-1">{MEDIATION_CONTENT[0].title}</h4>
                          <p className="text-xs text-gray-500 line-clamp-2">{MEDIATION_CONTENT[0].description}</p>
                          <span className="text-brand-primary text-xs font-bold mt-2 block">Lire le guide →</span>
                       </div>
                    </div>
                 </div>
              </div>
           </div>
        )}

        {/* Similar logic for other tabs would go here, styled with the new card aesthetic */}
        {activeSection === 'reports' && (
           <div className="space-y-6 animate-fade-in-up">
              <h1 className="font-display text-2xl font-bold text-brand-dark">Historique des Diagnostics</h1>
              <div className="space-y-4">
                 {MOCK_REPORTS.map(report => (
                    <div key={report.id} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition cursor-pointer flex flex-col md:flex-row md:items-center gap-6">
                       <div className={`w-16 h-16 rounded-2xl flex items-center justify-center shrink-0 ${report.status === 'ok' ? 'bg-green-100 text-green-600' : 'bg-orange-100 text-orange-600'}`}>
                          {report.status === 'ok' ? <CheckCircle2 size={32}/> : <AlertTriangle size={32}/>}
                       </div>
                       <div className="flex-1">
                          <div className="flex justify-between items-start">
                             <h3 className="font-bold text-lg text-brand-dark">{report.location}</h3>
                             <span className="text-gray-400 text-sm">{report.date}</span>
                          </div>
                          <p className="text-gray-600 text-sm mt-1 line-clamp-2">{report.summary}</p>
                          {report.codes.length > 0 && (
                             <div className="flex gap-2 mt-3">
                                {report.codes.map(c => (
                                   <span key={c} className="bg-gray-100 text-gray-600 text-xs font-mono px-2 py-1 rounded">{c}</span>
                                ))}
                             </div>
                          )}
                       </div>
                       <ChevronRight className="text-gray-300"/>
                    </div>
                 ))}
              </div>
           </div>
        )}

         {activeSection === 'quotes' && (
           <div className="space-y-6 animate-fade-in-up">
              <h1 className="font-display text-2xl font-bold text-brand-dark">Appels d'offres en cours</h1>
              <div className="grid md:grid-cols-2 gap-6">
                 {MOCK_QUOTES.map(quote => (
                    <div key={quote.id} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm relative overflow-hidden">
                       <div className="absolute top-0 right-0 w-24 h-24 bg-brand-primary/5 rounded-bl-[50px]"></div>
                       <div className="relative z-10">
                          <h3 className="font-bold text-lg text-brand-dark">{quote.garageName}</h3>
                          <div className="flex items-center gap-1 text-yellow-500 text-sm mb-4">
                             <Star size={14} fill="currentColor"/> 4.8
                          </div>
                          
                          <div className="bg-gray-50 rounded-xl p-4 mb-6">
                             <p className="text-gray-600 text-sm italic">"{quote.message}"</p>
                          </div>

                          <div className="flex items-end justify-between">
                             <div>
                                <p className="text-xs text-gray-400 uppercase tracking-wide">Estimation</p>
                                <p className="text-2xl font-bold text-brand-primary">{quote.priceEstimate}</p>
                             </div>
                             <button className="bg-brand-dark text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-black transition">
                                Accepter le devis
                             </button>
                          </div>
                       </div>
                    </div>
                 ))}
              </div>
           </div>
        )}

      </main>
    </div>
  );
};

export default MotoristDashboard;