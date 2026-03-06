import React, { useState } from 'react';
import { Search, PlayCircle, BookOpen, AlertTriangle, Filter, Video, FileText, Image, ChevronRight, Activity, Wrench, ShieldAlert, Cpu, Droplets, BatteryCharging, Fan, Compass } from 'lucide-react';
import { ViewState } from '../types';

interface MediationCenterProps {
  setView: (view: ViewState) => void;
}

// --- MOCK DATA ---

// 1. Fault Codes Dictionary
const FAULT_CODES = [
  {
    code: 'P0401',
    title: 'Débit Insuffisant Vanne EGR',
    symptom: 'Perte de puissance, fumée noire',
    simpleExplain: 'La vanne qui recycle vos gaz d\'échappement est encrassée par la calamine (suie). Le moteur respire mal.',
    severity: 'high', // high, medium, low
    action: 'Nettoyage ou remplacement rapide pour éviter d\'endommager le FAP.',
    media: {
      type: 'comic',
      url: 'https://images.unsplash.com/photo-1580273916550-e323be2f8160?auto=format&fit=crop&q=80',
      label: 'Voir la BD explicative'
    }
  },
  {
    code: 'P0101',
    title: 'Débitmètre d\'Air Massique',
    symptom: 'Ralenti instable, surconsommation',
    simpleExplain: 'Le capteur qui mesure l\'air entrant dans le moteur donne des mauvaises valeurs. Le mélange air/carburant est faussé.',
    severity: 'medium',
    action: 'Peut souvent être simplement nettoyé avec un spray spécifique ou remplacé.',
    media: {
      type: 'video',
      url: 'https://images.unsplash.com/photo-1487754180451-c456f719a1fc?auto=format&fit=crop&q=80',
      label: 'Tuto: Diagnostiquer le débitmètre'
    }
  },
  {
    code: 'P242F',
    title: 'Filtre à Particules (FAP) Saturé',
    symptom: 'Mode dégradé, voyant moteur allumé',
    simpleExplain: 'Le filtre qui retient les particules polluantes est plein et n\'arrive plus à se régénérer tout seul.',
    severity: 'high',
    action: 'Régénération forcée en garage ou nettoyage spécialisé requis.',
    media: {
      type: 'article',
      url: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&q=80',
      label: 'Dossier FAP: Tout comprendre'
    }
  },
  {
    code: 'C0300',
    title: 'Défaut Capteur ABS/ESP',
    symptom: 'Voyant ABS allumé, perte de l\'anti-patinage',
    simpleExplain: 'Un capteur sur l\'une de vos roues ne lit plus sa vitesse de rotation. L\'ordinateur désactive l\'aide au freinage par sécurité.',
    severity: 'medium',
    action: 'Vérifier la connectique ou changer le capteur (opération souvent simple).',
    media: {
      type: 'guide',
      url: 'https://images.unsplash.com/photo-1486262715619-01b80250e0dc?auto=format&fit=crop&q=80',
      label: 'Guide: Localiser les capteurs ABS'
    }
  }
];

// 2. Warning Lights (Dashboard)
const WARNING_LIGHTS = [
  {
    id: 'engine',
    icon: <AlertTriangle size={36} />,
    color: 'orange',
    name: 'Voyant Moteur',
    meaning: 'Anomalie dans le système d\'injection, d\'allumage ou de dépollution.',
    action: 'Faire un diagnostic électronique rapidement. Si clignote : arrêt immédiat !'
  },
  {
    id: 'oil',
    icon: <Droplets size={36} />,
    color: 'red',
    name: 'Pression d\'Huile',
    meaning: 'Le moteur n\'est plus lubrifié correctement.',
    action: 'ARRÊT IMMÉDIAT. Risque de casse moteur imminente. Contrôler le niveau.'
  },
  {
    id: 'battery',
    icon: <BatteryCharging size={36} />,
    color: 'red',
    name: 'Charge Batterie',
    meaning: 'L\'alternateur ne recharge plus la batterie.',
    action: 'Arrêtez les équipements électriques (clim, radio). Rejoignez le garage le plus proche.'
  },
  {
    id: 'coolant',
    icon: <Activity size={36} />,
    color: 'red',
    name: 'Température Moteur',
    meaning: 'Le moteur surchauffe (manque de liquide ou panne ventilateur).',
    action: 'ARRÊT IMMÉDIAT. Laisser refroidir, ne pas ouvrir le bouchon à chaud.'
  },
  {
    id: 'dpf',
    icon: <Fan size={36} />,
    color: 'orange',
    name: 'Filtre à Particules',
    meaning: 'Le filtre est encrassé et doit se régénérer.',
    action: 'Rouler sur voie rapide (environ 3000 tr/min) pendant 15-20 min pour lancer le nettoyage.'
  },
  {
    id: 'brakes',
    icon: <ShieldAlert size={36} />,
    color: 'red',
    name: 'Système de Freinage',
    meaning: 'Niveau de liquide de frein faible ou défaillance du système.',
    action: 'Arrêt immédiat et prudence. Vérifier le niveau de liquide.'
  }
];

// 3. Car Mechanics 101
const MECHANICS = [
  { id: 'engine', label: 'Le Moteur', icon: <Cpu className="w-6 h-6" /> },
  { id: 'brakes', label: 'Freinage & Liaison', icon: <Wrench className="w-6 h-6" /> },
  { id: 'exhaust', label: 'Dépollution', icon: <Activity className="w-6 h-6" /> },
  { id: 'elec', label: 'Électronique', icon: <BatteryCharging className="w-6 h-6" /> }
];

// 4. Divers (Miscellaneous Guides)
const MISC_GUIDES = [
  {
    id: 1,
    type: 'video',
    title: "Comment vérifier son niveau d'huile",
    desc: "Les étapes simples pour s'assurer que votre moteur est bien lubrifié avant un long trajet.",
    duration: "2 min",
    image: "https://images.unsplash.com/photo-1503373514088-348dfebbf6ff?auto=format&fit=crop&q=80"
  },
  {
    id: 2,
    type: 'guide',
    title: "Mesurer l'usure de ses pneus",
    desc: "Le test de la pièce de 1 euro et les témoins d'usure expliqués.",
    duration: "Rapide",
    image: "https://images.unsplash.com/photo-1510419358137-ed8a0bcfa278?auto=format&fit=crop&q=80"
  },
  {
    id: 3,
    type: 'comic',
    title: "Démarrer avec des pinces",
    desc: "Où brancher le rouge ? Où brancher le noir ? Évitez le court-circuit !",
    duration: "BD Interactive",
    image: "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&q=80"
  },
  {
    id: 4,
    type: 'article',
    title: "Liquide de refroidissement : Faire l'appoint",
    desc: "Pourquoi il ne faut jamais ouvrir le bouchon à chaud et comment choisir le bon liquide.",
    duration: "3 min lecture",
    image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&q=80"
  }
];

const MediationCenter: React.FC<MediationCenterProps> = ({ setView }) => {
  const [activeTab, setActiveTab] = useState<'dictionary' | 'lights' | 'mechanics' | 'misc'>('dictionary');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeMechanicTab, setActiveMechanicTab] = useState('exhaust');
  const [selectedFaultCode, setSelectedFaultCode] = useState<typeof FAULT_CODES[0] | null>(null);

  // Filter fault codes based on search
  const filteredCodes = FAULT_CODES.filter(code =>
    code.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
    code.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    code.symptom.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 pt-20 font-sans">

      {/* HEADER SECTION - Premium Gradient */}
      <div className="bg-[#0c142b] text-white pb-32 pt-16 px-4 relative overflow-hidden border-b border-brand-primary/20">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-bl from-brand-primary/20 via-brand-accent/5 to-transparent rounded-full blur-[100px] pointer-events-none"></div>
        <div className="absolute -bottom-40 left-0 w-[600px] h-[600px] bg-brand-primary/10 rounded-full blur-[80px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto relative z-10 flex flex-col items-center text-center">
          <div className="w-16 h-16 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(0,148,183,0.3)]">
            <BookOpen className="text-brand-accent w-8 h-8" />
          </div>
          <span className="text-brand-accent font-black uppercase tracking-widest text-sm mb-3 drop-shadow-md">Académie AutoScanR</span>
          <h1 className="font-display text-5xl md:text-6xl font-bold mb-6 leading-tight">Démystifions la Mécanique</h1>
          <p className="text-xl text-gray-300 max-w-3xl leading-relaxed font-light">
            Comprenez enfin ce que votre voiture essaie de vous dire. Diagnostiquez vous-même, évitez les arnaques et prenez les bonnes décisions.
          </p>
        </div>
      </div>

      {/* TABS NAVIGATION - Glassmorphism overlap */}
      <div className="max-w-5xl mx-auto px-4 -mt-12 relative z-20">
        <div className="bg-white/80 backdrop-blur-xl p-2 rounded-2xl shadow-xl flex gap-2 overflow-x-auto border border-white scrollbar-hide">
          <button
            onClick={() => setActiveTab('dictionary')}
            className={`px-6 py-4 rounded-xl font-bold transition-all flex items-center justify-center gap-3 whitespace-nowrap flex-1 ${activeTab === 'dictionary' ? 'bg-[#0c142b] text-white shadow-lg shadow-brand-dark/20' : 'text-gray-500 hover:text-brand-primary hover:bg-gray-100/50'}`}
          >
            <Search size={20} /> Codes Défauts
          </button>
          <button
            onClick={() => setActiveTab('lights')}
            className={`px-6 py-4 rounded-xl font-bold transition-all flex items-center justify-center gap-3 whitespace-nowrap flex-1 ${activeTab === 'lights' ? 'bg-[#0c142b] text-white shadow-lg shadow-brand-dark/20' : 'text-gray-500 hover:text-brand-primary hover:bg-gray-100/50'}`}
          >
            <AlertTriangle size={20} /> Les Voyants
          </button>
          <button
            onClick={() => setActiveTab('mechanics')}
            className={`px-6 py-4 rounded-xl font-bold transition-all flex items-center justify-center gap-3 whitespace-nowrap flex-1 ${activeTab === 'mechanics' ? 'bg-[#0c142b] text-white shadow-lg shadow-brand-dark/20' : 'text-gray-500 hover:text-brand-primary hover:bg-gray-100/50'}`}
          >
            <Wrench size={20} /> Mécanique 101
          </button>
          <button
            onClick={() => setActiveTab('misc')}
            className={`px-6 py-4 rounded-xl font-bold transition-all flex items-center justify-center gap-3 whitespace-nowrap flex-1 ${activeTab === 'misc' ? 'bg-[#0c142b] text-white shadow-lg shadow-brand-dark/20' : 'text-gray-500 hover:text-brand-primary hover:bg-gray-100/50'}`}
          >
            <Compass size={20} /> Divers & Entretiens
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16">

        {/* --- TAB 1: FAULT CODES DICTIONARY --- */}
        {activeTab === 'dictionary' && (
          <div className="animate-fade-in-up">
            <div className="max-w-3xl mx-auto mb-16 text-center">
              <h2 className="font-display text-3xl font-bold text-gray-900 mb-4">Le Dictionnaire des Pannes</h2>
              <p className="text-gray-600 mb-8">Recherchez un code OBD (ex: P0401) ou décrivez un symptôme pour obtenir une explication claire et détaillée.</p>

              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-brand-primary to-brand-accent rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
                <div className="relative flex items-center bg-white rounded-2xl shadow-sm border border-gray-100">
                  <Search className="absolute left-6 text-brand-primary w-6 h-6" />
                  <input
                    type="text"
                    placeholder="Tapez un code erreur ou un symptôme..."
                    className="w-full pl-16 pr-6 py-6 rounded-2xl text-lg text-gray-900 focus:outline-none bg-transparent font-medium"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <button className="absolute right-4 bg-[#0c142b] text-white p-3 rounded-xl hover:bg-brand-primary transition-colors">
                    <Filter size={20} />
                  </button>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* List of codes */}
              <div className="space-y-4">
                <h3 className="font-bold text-gray-400 uppercase tracking-widest text-sm mb-6 pl-2">Résultats ({filteredCodes.length})</h3>
                {filteredCodes.map(code => (
                  <div
                    key={code.code}
                    onClick={() => setSelectedFaultCode(code)}
                    className={`p-6 rounded-[2rem] border-2 cursor-pointer transition-all duration-300 hover:-translate-y-1 ${selectedFaultCode?.code === code.code ? 'bg-white border-brand-primary shadow-[0_20px_40px_-15px_rgba(0,148,183,0.15)]' : 'bg-white border-gray-100 hover:border-brand-primary/30 hover:shadow-lg'}`}
                  >
                    <div className="flex justify-between items-start mb-4">
                      <span className="bg-gray-900 text-white font-black px-4 py-1.5 rounded-lg text-lg tracking-wider">{code.code}</span>
                      {code.severity === 'high' && <span className="flex items-center gap-1 text-xs font-bold text-red-600 bg-red-50 px-3 py-1 rounded-full"><AlertTriangle size={14} /> Urgent</span>}
                      {code.severity === 'medium' && <span className="flex items-center gap-1 text-xs font-bold text-orange-600 bg-orange-50 px-3 py-1 rounded-full"><AlertTriangle size={14} /> À surveiller</span>}
                    </div>
                    <h4 className="font-display font-bold text-xl text-gray-900 mb-2">{code.title}</h4>
                    <p className="text-gray-500 text-sm italic mb-4">Symptôme commun : {code.symptom}</p>
                    <div className="flex items-center text-brand-primary font-bold text-sm group">
                      Voir l'explication <ChevronRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                ))}
              </div>

              {/* Detail Panel */}
              <div className="relative">
                {selectedFaultCode ? (
                  <div className="sticky top-24 bg-white rounded-[2.5rem] p-8 lg:p-10 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] border border-gray-100 animate-fade-in-up">
                    <div className="absolute top-0 right-10 w-20 h-2 bg-brand-primary rounded-b-full"></div>

                    <div className="text-sm font-bold text-brand-primary tracking-widest uppercase mb-4">Explication Vulgarisée</div>
                    <h3 className="font-display text-4xl font-bold text-gray-900 mb-6">{selectedFaultCode.title}</h3>

                    <div className="bg-brand-primary/5 border border-brand-primary/20 rounded-2xl p-6 mb-8 relative overflow-hidden">
                      <div className="absolute -right-4 -bottom-4 opacity-10"><BookOpen size={100} /></div>
                      <p className="text-brand-dark text-lg leading-relaxed relative z-10 font-medium">"{selectedFaultCode.simpleExplain}"</p>
                    </div>

                    <div className="mb-8">
                      <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                        <Wrench className="text-gray-400" size={18} /> Action requise
                      </h4>
                      <p className="text-gray-600 bg-gray-50 p-4 rounded-xl border border-gray-100">{selectedFaultCode.action}</p>
                    </div>

                    {/* Rich Media Section */}
                    <h4 className="font-bold text-gray-900 mb-4 uppercase text-xs tracking-wider">Ressource Pédagogique</h4>
                    <div className="relative rounded-2xl overflow-hidden group cursor-pointer block">
                      <img src={selectedFaultCode.media.url} alt="Media" className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-700" />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0c142b]/90 via-[#0c142b]/40 to-transparent"></div>

                      <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                        <div className="bg-white/20 backdrop-blur-md rounded-full p-4 mb-3 border border-white/30 group-hover:bg-brand-primary transition-colors duration-300 shadow-lg">
                          {selectedFaultCode.media.type === 'video' && <PlayCircle className="text-white w-8 h-8" />}
                          {selectedFaultCode.media.type === 'comic' && <Image className="text-white w-8 h-8" />}
                          {selectedFaultCode.media.type === 'article' && <FileText className="text-white w-8 h-8" />}
                        </div>
                        <span className="text-white font-bold text-lg">{selectedFaultCode.media.label}</span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="sticky top-24 bg-gray-50 rounded-[2.5rem] border-2 border-dashed border-gray-200 h-full min-h-[500px] flex flex-col items-center justify-center text-center p-10">
                    <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-sm mb-6">
                      <Search className="text-gray-300 w-10 h-10" />
                    </div>
                    <h3 className="font-bold text-gray-500 text-xl mb-2">Sélectionnez un code erreur</h3>
                    <p className="text-gray-400">Cliquez sur l'un des résultats pour afficher l'explication détaillée, les actions recommandées et le contenu pédagogique.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* --- TAB 2: WARNING LIGHTS --- */}
        {activeTab === 'lights' && (
          <div className="animate-fade-in-up">
            <div className="text-center mb-16 max-w-3xl mx-auto">
              <h2 className="font-display text-4xl font-bold text-gray-900 mb-6">Le Guide des Voyants Tableau de Bord</h2>
              <p className="text-xl text-gray-600 font-light">Une couleur = Une urgence. Apprenez à réagir correctement pour éviter d'aggraver la situation.</p>
            </div>

            <div className="flex justify-center gap-6 mb-12">
              <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full border border-gray-100 shadow-sm"><div className="w-3 h-3 rounded-full bg-red-500 animate-pulse"></div> <span className="text-sm font-bold text-gray-700">Arrêt Immédiat</span></div>
              <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full border border-gray-100 shadow-sm"><div className="w-3 h-3 rounded-full bg-orange-500"></div> <span className="text-sm font-bold text-gray-700">Alerte / Prévention</span></div>
              <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full border border-gray-100 shadow-sm"><div className="w-3 h-3 rounded-full bg-green-500"></div> <span className="text-sm font-bold text-gray-700">Information</span></div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {WARNING_LIGHTS.map(light => (
                <div key={light.id} className="group bg-white rounded-[2rem] p-8 shadow-[0_10px_30px_-15px_rgba(0,0,0,0.08)] border border-gray-100 hover:-translate-y-2 transition-transform duration-300 relative overflow-hidden">
                  {/* Dynamic Light Glow */}
                  <div className={`absolute -top-10 -right-10 w-32 h-32 rounded-full blur-[40px] opacity-20 transition-opacity duration-300 group-hover:opacity-50 ${light.color === 'red' ? 'bg-red-500' : 'bg-orange-500'}`}></div>

                  <div className="flex items-start gap-5">
                    <div className={`w-16 h-16 rounded-2xl flex items-center justify-center shrink-0 border relative z-10 ${light.color === 'red' ? 'bg-red-50 text-red-600 border-red-100 group-hover:bg-red-600 group-hover:text-white group-hover:shadow-[0_0_20px_rgba(220,38,38,0.5)]' :
                      'bg-orange-50 text-orange-500 border-orange-100 group-hover:bg-orange-500 group-hover:text-white group-hover:shadow-[0_0_20px_rgba(249,115,22,0.5)]'
                      } transition-all duration-300`}>
                      {light.icon}
                    </div>
                    <div className="relative z-10">
                      <h3 className="font-display font-bold text-xl text-gray-900 mb-1">{light.name}</h3>
                      <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded ${light.color === 'red' ? 'bg-red-100 text-red-700' : 'bg-orange-100 text-orange-700'}`}>
                        {light.color === 'red' ? 'Danger' : 'Alerte'}
                      </span>
                    </div>
                  </div>
                  <div className="mt-6 space-y-4 relative z-10">
                    <div>
                      <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Signification</p>
                      <p className="text-gray-700 text-sm font-medium">{light.meaning}</p>
                    </div>
                    <div className={`p-4 rounded-xl border ${light.color === 'red' ? 'bg-red-50/50 border-red-100' : 'bg-orange-50/50 border-orange-100'}`}>
                      <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Que faire ?</p>
                      <p className={`text-sm font-bold ${light.color === 'red' ? 'text-red-700' : 'text-orange-700'}`}>{light.action}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* --- TAB 3: CAR MECHANICS 101 --- */}
        {activeTab === 'mechanics' && (
          <div className="animate-fade-in-up">
            <div className="text-center mb-16 max-w-3xl mx-auto">
              <h2 className="font-display text-4xl font-bold text-gray-900 mb-6">Comment ça marche ?</h2>
              <p className="text-xl text-gray-600 font-light">Explorez les systèmes clés de votre véhicule pour mieux comprendre nos diagnostics électriques.</p>
            </div>

            <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] overflow-hidden">
              <div className="flex flex-col lg:flex-row">
                {/* Left side: Navigation / Categories */}
                <div className="lg:w-1/3 bg-gray-50 border-r border-gray-100 p-8">
                  <h3 className="font-bold text-gray-400 uppercase tracking-widest text-sm mb-6">Systèmes</h3>
                  <div className="space-y-3">
                    {MECHANICS.map(mec => (
                      <button
                        key={mec.id}
                        onClick={() => setActiveMechanicTab(mec.id)}
                        className={`w-full text-left px-6 py-4 rounded-2xl flex items-center gap-4 transition-all ${activeMechanicTab === mec.id ? 'bg-[#0c142b] text-white shadow-lg' : 'bg-white text-gray-600 border border-gray-100 hover:border-brand-primary/30 hover:bg-white'
                          }`}
                      >
                        <div className={`${activeMechanicTab === mec.id ? 'text-brand-accent' : 'text-gray-400'}`}>
                          {mec.icon}
                        </div>
                        <span className="font-bold">{mec.label}</span>
                        <ChevronRight size={18} className={`ml-auto ${activeMechanicTab === mec.id ? 'text-white/50' : 'text-transparent'}`} />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Right side: Dynamic Content Presentation */}
                <div className="lg:w-2/3 p-8 lg:p-12">
                  {activeMechanicTab === 'exhaust' && (
                    <div className="animate-fade-in">
                      <span className="text-brand-primary font-bold tracking-wider text-sm uppercase mb-2 block">Dépollution & Échappement</span>
                      <h3 className="font-display text-4xl font-bold text-gray-900 mb-8">EGR, FAP & Sondes</h3>

                      <div className="w-full h-64 bg-gray-200 rounded-3xl mb-8 relative overflow-hidden group">
                        {/* Placeholder for realistic car diagram/illustration */}
                        <img src="https://images.unsplash.com/photo-1486262715619-01b80250e0dc?auto=format&fit=crop&q=80" alt="Exhaust system" className="w-full h-full object-cover mix-blend-multiply opacity-80 group-hover:scale-105 transition-transform duration-1000" />

                        {/* Interactive Hotspots */}
                        <div className="absolute top-1/2 left-1/3 w-6 h-6 bg-brand-primary rounded-full blur-[2px] animate-ping opacity-75"></div>
                        <div className="absolute top-1/2 left-1/3 w-6 h-6 bg-brand-primary rounded-full border-2 border-white flex items-center justify-center text-white text-xs font-bold cursor-pointer hover:scale-125 transition-transform shadow-lg z-10">1</div>

                        <div className="absolute top-1/3 right-1/4 w-6 h-6 bg-brand-accent rounded-full blur-[2px] animate-ping opacity-75"></div>
                        <div className="absolute top-1/3 right-1/4 w-6 h-6 bg-brand-accent rounded-full border-2 border-white flex items-center justify-center text-[#0c142b] text-xs font-bold cursor-pointer hover:scale-125 transition-transform shadow-lg z-10">2</div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
                          <div className="flex items-center gap-3 mb-3">
                            <span className="w-6 h-6 rounded-full bg-brand-primary text-white text-xs font-bold flex items-center justify-center">1</span>
                            <h4 className="font-bold text-gray-900">Vanne EGR</h4>
                          </div>
                          <p className="text-sm text-gray-600 leading-relaxed">Elle réinjecte une partie des gaz d'échappement dans le moteur pour réduire les oxydes d'azote (NOx). **Le problème :** Elle a tendance à s'encrasser de suie, causant des pertes de puissance.</p>
                        </div>

                        <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
                          <div className="flex items-center gap-3 mb-3">
                            <span className="w-6 h-6 rounded-full bg-brand-accent text-[#0c142b] text-xs font-bold flex items-center justify-center">2</span>
                            <h4 className="font-bold text-gray-900">Filtre À Particules (FAP)</h4>
                          </div>
                          <p className="text-sm text-gray-600 leading-relaxed">Obligatoire sur les diesels, il capture les particules fines. **Le problème :** Il sature si on fait trop de ville, obligeant le système à se mettre en "mode dégradé".</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Mocked state for other tabs to avoid empty screens during demo */}
                  {activeMechanicTab !== 'exhaust' && (
                    <div className="flex flex-col items-center justify-center h-full min-h-[400px] text-center opacity-50">
                      <Wrench size={48} className="text-gray-300 mb-4" />
                      <h3 className="font-bold text-xl text-gray-500 mb-2">Module en construction</h3>
                      <p className="text-sm text-gray-400 max-w-sm">Le module éducatif interactif pour cette section de la voiture est en cours de création par nos experts.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* --- TAB 4: MISCELLANEOUS --- */}
        {activeTab === 'misc' && (
          <div className="animate-fade-in-up">
            <div className="text-center mb-16 max-w-3xl mx-auto">
              <h2 className="font-display text-4xl font-bold text-gray-900 mb-6">Entretiens Courants & Astuces</h2>
              <p className="text-xl text-gray-600 font-light">Des guides simples et visuels pour prendre soin de votre voiture au quotidien de manière autonome.</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {MISC_GUIDES.map(item => (
                <div key={item.id} className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 flex flex-col h-full border border-gray-100 cursor-pointer">
                  <div className="relative h-48 overflow-hidden rounded-t-3xl">
                    <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-80 group-hover:opacity-100 transition-opacity"></div>

                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md text-brand-dark text-xs font-black uppercase tracking-wider px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-sm">
                      {item.type === 'video' && <Video size={14} className="text-brand-primary" />}
                      {item.type === 'guide' && <BookOpen size={14} className="text-brand-primary" />}
                      {item.type === 'comic' && <Image size={14} className="text-brand-primary" />}
                      {item.type === 'article' && <FileText size={14} className="text-brand-primary" />}
                      <span>{item.type}</span>
                    </div>

                    {item.type === 'video' && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="bg-brand-primary/90 backdrop-blur text-white rounded-full p-3 shadow-xl transform scale-90 group-hover:scale-110 transition-transform duration-300">
                          <PlayCircle size={36} fill="currentColor" />
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="p-6 flex-1 flex flex-col relative bg-white">
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-xs font-bold text-gray-400 bg-gray-50 px-2 py-1 rounded-md">{item.duration}</span>
                    </div>
                    <h3 className="font-display font-bold text-xl text-gray-900 mb-3 group-hover:text-brand-primary transition-colors line-clamp-2">{item.title}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed mb-6 flex-1">{item.desc}</p>

                    <div className="pt-4 border-t border-gray-100/50 flex items-center text-brand-dark font-bold text-sm group-hover:translate-x-1 transition-transform">
                      Consulter le guide <ChevronRight size={16} className="ml-1 text-brand-primary" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default MediationCenter;