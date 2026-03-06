import React, { useState } from 'react';
import { LayoutDashboard, Users, Calendar as CalendarIcon, Settings, Search, Car, AlertCircle, MapPin, Phone, Clock, MoreVertical, CheckCircle2 } from 'lucide-react';
import { ViewState } from '../types';

interface GarageDashboardProps {
  setView: (view: ViewState) => void;
}

const GarageDashboard: React.FC<GarageDashboardProps> = ({ setView }) => {
  const [activeView, setActiveView] = useState<'leads' | 'schedule' | 'settings'>('leads');

  const leads = [
    { id: 1, car: 'Peugeot 208', year: 2018, issue: 'Ratés Allumage (P0300)', distance: '2.4 km', urgency: 'Moyenne', reportId: 'rep_001', notes: 'Bruit étrange au ralenti.', time: 'Il y a 2h' },
    { id: 2, car: 'Renault Clio IV', year: 2020, issue: 'Voyant ABS', distance: '5.1 km', urgency: 'Haute', reportId: 'rep_889', notes: '', time: 'Il y a 4h' },
    { id: 3, car: 'Citroën C3', year: 2019, issue: 'Filtre à Particules', distance: '1.2 km', urgency: 'Basse', reportId: 'rep_902', notes: 'Voyant allumé fixe', time: 'Il y a 5h' },
  ];

  return (
    <div className="flex h-[calc(100vh-64px)] bg-gray-100 pt-16">
      {/* Sidebar */}
      <aside className="w-64 bg-brand-dark text-gray-400 hidden md:flex flex-col">
        <div className="p-6">
          <h2 className="font-display font-bold text-xl text-white">Meca Expert</h2>
          <div className="flex items-center gap-2 mt-2">
             <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
             <p className="text-xs">En ligne • Partenaire Gold</p>
          </div>
        </div>
        
        <nav className="flex-1 px-4 space-y-2 mt-4">
          <button 
            onClick={() => setActiveView('leads')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition ${activeView === 'leads' ? 'bg-brand-primary text-white shadow-lg shadow-brand-primary/20' : 'hover:bg-white/5 hover:text-white'}`}
          >
            <Users size={18} /> Opportunités <span className="ml-auto bg-brand-accent text-brand-dark text-xs font-bold px-2 py-0.5 rounded-full">3</span>
          </button>
          <button 
            onClick={() => setActiveView('schedule')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition ${activeView === 'schedule' ? 'bg-brand-primary text-white shadow-lg shadow-brand-primary/20' : 'hover:bg-white/5 hover:text-white'}`}
          >
            <CalendarIcon size={18} /> Planning Atelier
          </button>
           <button 
            onClick={() => setActiveView('settings')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition ${activeView === 'settings' ? 'bg-brand-primary text-white shadow-lg shadow-brand-primary/20' : 'hover:bg-white/5 hover:text-white'}`}
          >
            <Settings size={18} /> Configuration
          </button>
        </nav>
        
        <div className="p-6 border-t border-white/10">
           <div className="bg-white/5 rounded-xl p-4">
              <p className="text-xs font-bold uppercase tracking-wider mb-2">CA ce mois</p>
              <p className="text-2xl font-display font-bold text-white">4,250 €</p>
              <p className="text-xs text-green-400 mt-1">+12% vs N-1</p>
           </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-8">
        {activeView === 'leads' && (
          <div className="max-w-6xl mx-auto animate-fade-in-up">
            <div className="flex justify-between items-end mb-8">
              <div>
                 <h1 className="font-display text-3xl font-bold text-brand-dark">Opportunités locales</h1>
                 <p className="text-gray-500 mt-1">Automobilistes ayant effectué un scan à proximité.</p>
              </div>
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 flex p-1">
                 <button className="px-4 py-1.5 text-sm font-medium bg-gray-100 rounded text-gray-900">Tout</button>
                 <button className="px-4 py-1.5 text-sm font-medium text-gray-500 hover:text-gray-900">Urgents</button>
              </div>
            </div>

            <div className="grid gap-4">
              {leads.map(lead => (
                <div key={lead.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-1 flex flex-col md:flex-row hover:shadow-md transition group">
                   {/* Left Status Bar */}
                   <div className={`w-full md:w-2 rounded-t-xl md:rounded-l-xl md:rounded-tr-none ${lead.urgency === 'Haute' ? 'bg-red-500' : lead.urgency === 'Moyenne' ? 'bg-orange-400' : 'bg-green-400'}`}></div>
                   
                   <div className="p-5 flex-1 flex flex-col md:flex-row gap-6">
                      {/* Car Info */}
                      <div className="min-w-[200px]">
                         <div className="flex items-center gap-2 text-gray-500 text-xs mb-1">
                            <Clock size={12}/> {lead.time} • {lead.distance}
                         </div>
                         <h3 className="font-bold text-lg text-brand-dark flex items-center gap-2">
                           {lead.car}
                         </h3>
                         <span className="inline-block mt-2 px-2 py-0.5 bg-gray-100 text-gray-600 text-xs font-bold rounded uppercase">{lead.year}</span>
                      </div>

                      {/* Issue Info */}
                      <div className="flex-1 border-l border-gray-100 pl-6 border-dashed">
                         <div className="flex items-start gap-3">
                            <div className="bg-brand-primary/10 p-2 rounded-lg text-brand-primary mt-1">
                               <AlertCircle size={20}/>
                            </div>
                            <div>
                               <h4 className="font-bold text-brand-dark">{lead.issue}</h4>
                               {lead.notes ? (
                                  <p className="text-sm text-gray-500 mt-1 bg-gray-50 p-2 rounded italic">"{lead.notes}"</p>
                               ) : (
                                  <p className="text-sm text-gray-400 mt-1 italic">Aucune note client.</p>
                               )}
                            </div>
                         </div>
                      </div>

                      {/* Actions */}
                      <div className="flex flex-col justify-center gap-2 min-w-[160px]">
                         <button className="bg-brand-primary text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-brand-light transition shadow-lg shadow-brand-primary/20">
                            Envoyer devis
                         </button>
                         <button className="text-gray-400 text-sm font-medium hover:text-gray-600">
                            Ignorer
                         </button>
                      </div>
                   </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Other views would be similarly styled */}
        {activeView === 'schedule' && (
          <div className="flex flex-col items-center justify-center h-full text-center">
             <div className="bg-white p-12 rounded-3xl shadow-sm border border-gray-200 max-w-lg">
                <div className="w-20 h-20 bg-brand-beige rounded-full flex items-center justify-center mx-auto mb-6 text-brand-accent">
                   <CalendarIcon size={40}/>
                </div>
                <h2 className="font-display text-2xl font-bold text-brand-dark">Synchronisation Agenda</h2>
                <p className="text-gray-500 mt-4 leading-relaxed">
                   Connectez votre Google Agenda ou votre logiciel de gestion (DMS) pour permettre aux clients AutoScanR de réserver directement les créneaux disponibles.
                </p>
                <button className="mt-8 bg-brand-dark text-white px-8 py-3 rounded-xl font-bold hover:bg-black transition">
                   Connecter un calendrier
                </button>
             </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default GarageDashboard;