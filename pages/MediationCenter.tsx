import React, { useState } from 'react';
import { Search, PlayCircle, BookOpen, AlertTriangle, Filter, Video, FileText, Image, ChevronRight, Activity, Wrench, ShieldAlert, Cpu, Droplets, BatteryCharging, Fan, Compass, CheckCircle, Lightbulb, Zap, Disc, OctagonAlert, TriangleAlert } from 'lucide-react';
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
    icon: <img src="/images/lights/engine-orange.png" alt="Voyant moteur" className="w-full h-full object-contain" />,
    color: 'orange',
    name: 'Voyant Moteur',
    meaning: 'Anomalie dans le système d\'injection, d\'allumage ou de dépollution.',
    action: 'Faire un diagnostic électronique rapidement. Si clignote : arrêt immédiat !'
  },
  {
    id: 'oil',
    icon: <img src="/images/lights/oil-red.png" alt="Pression d'huile" className="w-full h-full object-contain" />,
    color: 'red',
    name: 'Pression d\'Huile',
    meaning: 'Le moteur n\'est plus lubrifié correctement.',
    action: 'ARRÊT IMMÉDIAT. Risque de casse moteur imminente. Contrôler le niveau.'
  },
  {
    id: 'battery',
    icon: <img src="/images/lights/battery-red.png" alt="Charge batterie" className="w-full h-full object-contain" />,
    color: 'red',
    name: 'Charge Batterie',
    meaning: 'L\'alternateur ne recharge plus la batterie.',
    action: 'Arrêtez les équipements électriques (clim, radio). Rejoignez le garage le plus proche.'
  },
  {
    id: 'coolant',
    icon: <img src="/images/lights/temp-red.png" alt="Température moteur" className="w-full h-full object-contain" />,
    color: 'red',
    name: 'Température Moteur',
    meaning: 'Le moteur surchauffe (manque de liquide ou panne ventilateur).',
    action: 'ARRÊT IMMÉDIAT. Laisser refroidir, ne pas ouvrir le bouchon à chaud.'
  },
  {
    id: 'adblue',
    icon: <img src="/images/lights/adblue-orange.png" alt="AdBlue" className="w-full h-full object-contain" />,
    color: 'orange',
    name: 'Niveau AdBlue',
    meaning: 'Le réservoir d\'AdBlue est presque vide (système anti-pollution).',
    action: 'Faire l\'appoint rapidement. Attention : le moteur peut refuser de démarrer si le réservoir est vide.'
  },
  {
    id: 'brakes',
    icon: <img src="/images/lights/brake-red.png" alt="Système de freinage" className="w-full h-full object-contain" />,
    color: 'red',
    name: 'Système de Freinage',
    meaning: 'Niveau de liquide de frein faible ou défaillance du système.',
    action: 'Arrêt immédiat et prudence. Vérifier le niveau de liquide.'
  },
  {
    id: 'eco',
    icon: <Droplets size={36} />,
    color: 'green',
    name: 'Mode ECO',
    meaning: 'Le véhicule optimise la consommation de carburant.',
    action: 'Information : Aucune action requise. Indique une conduite économique.'
  },
  {
    id: 'cruise',
    icon: <Activity size={36} />,
    color: 'green',
    name: 'Régulateur',
    meaning: 'Le maintien automatique de la vitesse est activé.',
    action: 'Information : Le système gère votre vitesse selon votre réglage.'
  },
  {
    id: 'lights',
    icon: <Fan size={36} />,
    color: 'green',
    name: 'Feux de Position',
    meaning: 'Vos feux de position sont actuellement allumés.',
    action: 'Information : Pensez à les éteindre en quittant le véhicule.'
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
    image: "https://images.unsplash.com/photo-1503373514088-348dfebbf6ff?auto=format&fit=crop&q=80",
    fullContent: {
      intro: "L’huile est le sang de votre moteur. Sans elle, les pièces métalliques frottent entre elles, chauffent et finissent par se souder : c’est le 'serrage' moteur.",
      steps: [
        { title: "Moteur froid et à plat", text: "Garez-vous sur une surface plane et attendez au moins 15 minutes après l'arrêt du moteur pour que l'huile redescende dans le carter." },
        { title: "Tirez la jauge", text: "Sortez la tige métallique (souvent jaune ou orange), essuyez-la proprement avec un chiffon non pelucheux." },
        { title: "Le test", text: "Replongez la jauge à fond, puis ressortez-la. Le niveau doit se situer entre les deux encoches (MIN et MAX)." },
        { title: "L'appoint", text: "Si vous êtes proche du MIN, ajoutez de l'huile par petites quantités. Attention : trop d'huile (au-dessus du MAX) est aussi dangereux qu'un manque !" }
      ],
      proTip: "Une consommation excessive d'huile (plus d'un demi-litre pour 1000km) peut cacher une fuite ou une usure interne. Parlez-en lors de votre prochain AutoScanR."
    }
  },
  {
    id: 2,
    type: 'guide',
    title: "Mesurer l'usure de ses pneus",
    desc: "Le test de la pièce de 1 euro et les témoins d'usure expliqués.",
    duration: "Rapide",
    image: "https://images.unsplash.com/photo-1510419358137-ed8a0bcfa278?auto=format&fit=crop&q=80",
    fullContent: {
      intro: "Vos pneus sont votre seul contact avec la route. Un pneu usé augmente la distance de freinage et le risque d'aquaplaning.",
      steps: [
        { title: "Le témoin TWI", text: "Cherchez les petites bosses au fond des sculptures du pneu. Si la gomme arrive au niveau de cette bosse, le pneu est à la limite légale (1,6 mm)." },
        { title: "L'astuce de la pièce de 1€", text: "Insérez une pièce de 1€ dans les rainures. Si vous voyez le bord étoilé (couleur or), vos pneus sont usés et doivent être changés." },
        { title: "L'usure irrégulière", text: "Si un côté s'use plus vite que l'autre, votre parallélisme est probablement à régler." }
      ],
      proTip: "Vérifiez la pression une fois par mois. Un pneu sous-gonflé s'use plus vite et fait consommer plus de carburant."
    }
  },
  {
    id: 3,
    type: 'comic',
    title: "Démarrer avec des pinces",
    desc: "Où brancher le rouge ? Où brancher le noir ? Évitez le court-circuit !",
    duration: "BD Interactive",
    image: "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&q=80",
    fullContent: {
      intro: "Une batterie à plat ? Pas de panique, mais attention à l'ordre des câbles pour ne pas griller l'électronique !",
      steps: [
        { title: "Câble Rouge (+)", text: "Reliez la borne (+) de la batterie en panne à la borne (+) de la batterie de secours." },
        { title: "Câble Noir (-)", text: "Reliez la borne (-) de la batterie de secours à une partie métallique non peinte (masse) du moteur en panne." },
        { title: "Démarrage", text: "Démarrez le véhicule de secours, attendez 1 min, puis tentez de démarrer le véhicule en panne." },
        { title: "Retrait inversé", text: "Une fois démarré, retirez les câbles dans l'ordre inverse : Noir puis Rouge." }
      ],
      proTip: "Roulez au moins 20 minutes après le démarrage pour permettre à l'alternateur de recharger suffisamment la batterie."
    }
  },
  {
    id: 4,
    type: 'article',
    title: "Liquide de refroidissement",
    desc: "Pourquoi il ne faut jamais ouvrir le bouchon à chaud et comment choisir le bon.",
    duration: "3 min lecture",
    image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&q=80",
    fullContent: {
      intro: "Le liquide de refroidissement maintient votre moteur à une température stable (souvent 90°C). S'il manque, le moteur fond.",
      steps: [
        { title: "DANGER : Pression", text: "N'ouvrez JAMAIS le bouchon moteur chaud. Le liquide est sous pression et peut vous ébouillanter au visage." },
        { title: "Vérification visuelle", text: "Le vase d'expansion est transparent. Vérifiez simplement que le niveau est entre MIN et MAX à travers le bocal." },
        { title: "Couleurs miscibles ?", text: "Il existe plusieurs couleurs (Jaune, Rose, Bleu). Évitez les mélanges si possible, utilisez la préconisation constructeur." }
      ],
      proTip: "Une baisse soudaine du niveau peut indiquer une fuite de durite ou un joint de culasse fatigue. C'est un point critique surveillé par AutoScanR."
    }
  }
];

const MediationCenter: React.FC<MediationCenterProps> = ({ setView }) => {
  const [activeTab, setActiveTab] = useState<'dictionary' | 'lights' | 'mechanics' | 'misc'>('lights');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeMechanicTab, setActiveMechanicTab] = useState('exhaust');
  const [selectedFaultCode, setSelectedFaultCode] = useState<typeof FAULT_CODES[0] | null>(null);
  const [warningColorFilter, setWarningColorFilter] = useState<'all' | 'red' | 'orange' | 'green'>('all');
  const [selectedArticleId, setSelectedArticleId] = useState<number | null>(null);

  const selectedArticle = MISC_GUIDES.find(a => a.id === selectedArticleId);

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
          <h1 className="font-display text-5xl md:text-6xl font-bold mb-6 leading-tight">Comprenez votre voiture avant le garage</h1>
          <p className="text-xl text-gray-300 max-w-3xl leading-relaxed font-light">
            Décryptez les signaux de votre tableau de bord, explorez les entrailles de la mécanique et apprenez l'entretien essentiel pour rouler en toute sérénité.
          </p>
        </div>
      </div>

      {/* TABS NAVIGATION - Glassmorphism overlap */}
      <div className="max-w-5xl mx-auto px-4 -mt-12 relative z-20">
        <div className="bg-white/80 backdrop-blur-xl p-2 rounded-2xl shadow-xl flex gap-2 overflow-x-auto border border-white scrollbar-hide">
          <button
            onClick={() => setActiveTab('lights')}
            className={`px-6 py-4 rounded-xl font-bold transition-all flex items-center justify-center gap-3 whitespace-nowrap flex-1 ${activeTab === 'lights' ? 'bg-[#0c142b] text-white shadow-lg shadow-brand-dark/20' : 'text-gray-500 hover:text-brand-primary hover:bg-gray-100/50'}`}
          >
            <AlertTriangle size={20} /> Les Voyants
          </button>
          <button
            onClick={() => setActiveTab('dictionary')}
            className={`px-6 py-4 rounded-xl font-bold transition-all flex items-center justify-center gap-3 whitespace-nowrap flex-1 ${activeTab === 'dictionary' ? 'bg-[#0c142b] text-white shadow-lg shadow-brand-dark/20' : 'text-gray-500 hover:text-brand-primary hover:bg-gray-100/50'}`}
          >
            <Search size={20} /> Codes Défauts
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
                      {code.severity === 'high' && <span className="flex items-center gap-1 text-xs font-bold text-red-600 bg-red-50 px-3 py-1 rounded-full shadow-[0_2px_10px_rgba(220,38,38,0.1)] animate-pulse"><TriangleAlert size={14} /> Urgent</span>}
                      {code.severity === 'medium' && <span className="flex items-center gap-1 text-xs font-bold text-orange-600 bg-orange-50 px-3 py-1 rounded-full"><ShieldAlert size={14} /> À surveiller</span>}
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
                  <div className="sticky top-24 bg-gradient-to-br from-white to-gray-50 rounded-[2.5rem] border border-gray-100 h-full min-h-[500px] flex flex-col items-center justify-center text-center p-10 overflow-hidden relative group">
                    {/* Decorative element */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-brand-primary/5 rounded-full -mr-10 -mt-10 blur-3xl transition-transform duration-1000 group-hover:scale-150"></div>
                    <div className="absolute bottom-0 left-0 w-32 h-32 bg-brand-accent/5 rounded-full -ml-10 -mb-10 blur-3xl transition-transform duration-1000 group-hover:scale-150"></div>

                    <div className="relative z-10">
                      <div className="w-28 h-28 bg-white rounded-3xl flex items-center justify-center shadow-[0_20px_40px_rgba(0,0,0,0.04)] mb-8 transform group-hover:rotate-6 transition-transform duration-500 mx-auto">
                        <Activity className="text-brand-primary w-12 h-12" />
                      </div>
                      <h3 className="font-display text-2xl font-bold text-brand-dark mb-4">Analyse personnalisée</h3>
                      <p className="text-gray-500 max-w-xs mx-auto leading-relaxed mb-8">
                        Veuillez sélectionner un code erreur ou un symptôme dans la liste pour accéder à une **explication vulgarisée professionnelle** et les étapes de résolution préconisées.
                      </p>

                      <div className="flex flex-col gap-3 max-w-[200px] mx-auto opacity-60">
                        <div className="flex items-center gap-3 text-xs font-bold text-gray-400 uppercase tracking-widest">
                          <ShieldAlert size={14} className="text-brand-primary" /> Conformité garage
                        </div>
                        <div className="flex items-center gap-3 text-xs font-bold text-gray-400 uppercase tracking-widest">
                          <CheckCircle className="text-brand-primary" size={14} /> Solutions certifiées
                        </div>
                      </div>
                    </div>
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

            <div className="flex flex-wrap justify-center gap-4 mb-12">
              <button
                onClick={() => setWarningColorFilter('all')}
                className={`px-5 py-2.5 rounded-full border font-bold text-sm transition-all ${warningColorFilter === 'all' ? 'bg-[#0c142b] text-white border-brand-dark shadow-md' : 'bg-white text-gray-600 border-gray-100 hover:border-gray-300 shadow-sm'}`}
              >
                Tout voir
              </button>
              <button
                onClick={() => setWarningColorFilter('red')}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full border transition-all ${warningColorFilter === 'red' ? 'bg-red-600 text-white border-red-700 shadow-md ring-4 ring-red-50' : 'bg-white text-gray-700 border-gray-100 hover:border-red-200 shadow-sm'}`}
              >
                <div className={`w-3 h-3 rounded-full bg-red-500 ${warningColorFilter === 'red' ? 'animate-pulse' : ''}`}></div>
                <span className="text-sm font-bold">Arrêt Immédiat</span>
              </button>
              <button
                onClick={() => setWarningColorFilter('orange')}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full border transition-all ${warningColorFilter === 'orange' ? 'bg-orange-500 text-white border-orange-600 shadow-md ring-4 ring-orange-50' : 'bg-white text-gray-700 border-gray-100 hover:border-orange-200 shadow-sm'}`}
              >
                <div className="w-3 h-3 rounded-full bg-orange-500"></div>
                <span className="text-sm font-bold">Alerte / Prévention</span>
              </button>
              <button
                onClick={() => setWarningColorFilter('green')}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full border transition-all ${warningColorFilter === 'green' ? 'bg-green-600 text-white border-green-700 shadow-md ring-4 ring-green-50' : 'bg-white text-gray-700 border-gray-100 hover:border-green-200 shadow-sm'}`}
              >
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span className="text-sm font-bold">Information</span>
              </button>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {WARNING_LIGHTS.filter(l => warningColorFilter === 'all' || l.color === warningColorFilter).map(light => (
                <div key={light.id} className="group bg-white rounded-[2rem] p-8 shadow-[0_10px_30px_-15px_rgba(0,0,0,0.08)] border border-gray-100 hover:-translate-y-2 transition-all duration-500 relative overflow-hidden animate-fade-in">
                  {/* Dynamic Light Glow */}
                  <div className={`absolute -top-10 -right-10 w-32 h-32 rounded-full blur-[40px] opacity-20 transition-opacity duration-300 group-hover:opacity-50 ${light.color === 'red' ? 'bg-red-500' :
                    light.color === 'orange' ? 'bg-orange-500' : 'bg-green-500'
                    }`}></div>

                  <div className="flex items-start gap-5">
                    <div className={`w-16 h-16 rounded-2xl flex items-center justify-center shrink-0 border relative z-10 transition-all duration-300 overflow-hidden ${light.color === 'red'
                      ? 'bg-red-50 border-red-100 group-hover:shadow-[0_0_20px_rgba(220,38,38,0.5)]'
                      : light.color === 'orange'
                        ? 'bg-orange-50 text-orange-500 border-orange-100 group-hover:bg-orange-500 group-hover:text-white group-hover:shadow-[0_0_20px_rgba(249,115,22,0.5)]'
                        : 'bg-green-50 text-green-500 border-green-100 group-hover:bg-green-500 group-hover:text-white group-hover:shadow-[0_0_20px_rgba(34,197,94,0.5)]'
                      }`}>
                      {/* For custom image icons, we don't apply the 'group-hover:text-white' text color */}
                      <div className={`w-full h-full flex items-center justify-center transition-transform duration-300 group-hover:scale-110 ${light.color === 'red' || (light.id === 'adblue') ? 'p-1' : ''}`}>
                        {light.icon}
                      </div>
                    </div>
                    <div className="relative z-10">
                      <h3 className="font-display font-bold text-xl text-gray-900 mb-1">{light.name}</h3>
                      <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded ${light.color === 'red' ? 'bg-red-100 text-red-700' :
                        light.color === 'orange' ? 'bg-orange-100 text-orange-700' : 'bg-green-100 text-green-700'
                        }`}>
                        {light.color === 'red' ? 'Danger' : light.color === 'orange' ? 'Alerte' : 'Info'}
                      </span>
                    </div>
                  </div>
                  <div className="mt-6 space-y-4 relative z-10">
                    <div>
                      <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Signification</p>
                      <p className="text-gray-700 text-sm font-medium">{light.meaning}</p>
                    </div>
                    <div className={`p-4 rounded-xl border ${light.color === 'red' ? 'bg-red-50/50 border-red-100' :
                      light.color === 'orange' ? 'bg-orange-50/50 border-orange-100' : 'bg-green-50/50 border-green-100'
                      }`}>
                      <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Que faire ?</p>
                      <p className={`text-sm font-bold ${light.color === 'red' ? 'text-red-700' :
                        light.color === 'orange' ? 'text-orange-700' : 'text-green-700'
                        }`}>{light.action}</p>
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
                      <h3 className="font-display text-4xl font-bold text-gray-900 mb-8">EGR, FAP & AdBlue</h3>

                      <div className="w-full h-64 bg-gray-200 rounded-3xl mb-8 relative overflow-hidden group">
                        <img src="https://images.unsplash.com/photo-1486262715619-01b80250e0dc?auto=format&fit=crop&q=80" alt="Exhaust system" className="w-full h-full object-cover mix-blend-multiply opacity-80 group-hover:scale-105 transition-transform duration-1000" />
                        <div className="absolute top-1/2 left-1/4 w-6 h-6 bg-brand-primary rounded-full blur-[2px] animate-ping opacity-75"></div>
                        <div className="absolute top-1/2 left-1/4 w-6 h-6 bg-brand-primary rounded-full border-2 border-white flex items-center justify-center text-white text-xs font-bold cursor-pointer hover:scale-125 transition-transform shadow-lg z-10">1</div>

                        <div className="absolute top-1/3 right-1/4 w-6 h-6 bg-brand-accent rounded-full blur-[2px] animate-ping opacity-75"></div>
                        <div className="absolute top-1/3 right-1/4 w-6 h-6 bg-brand-accent rounded-full border-2 border-white flex items-center justify-center text-[#0c142b] text-xs font-bold cursor-pointer hover:scale-125 transition-transform shadow-lg z-10">2</div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                          <h4 className="font-bold text-brand-dark flex items-center gap-2 mb-3">
                            <span className="w-6 h-6 rounded-full bg-brand-primary text-white text-xs flex items-center justify-center">1</span> Vanne EGR
                          </h4>
                          <p className="text-sm text-gray-600">Réduit les émissions de NOx en recyclant les gaz. **Attention** : les trajets courts l'encrassent vite.</p>
                        </div>
                        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                          <h4 className="font-bold text-brand-dark flex items-center gap-2 mb-3">
                            <span className="w-6 h-6 rounded-full bg-brand-accent text-[#0c142b] text-xs flex items-center justify-center">2</span> Filtre à Particules
                          </h4>
                          <p className="text-sm text-gray-600">Retient les suies noires. Si le voyant s'allume, roulez 20 min à 3000 tr/min pour le décrasser (régénération).</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeMechanicTab === 'engine' && (
                    <div className="animate-fade-in">
                      <span className="text-brand-primary font-bold tracking-wider text-sm uppercase mb-2 block">Le Coeur de la Voiture</span>
                      <h3 className="font-display text-4xl font-bold text-gray-900 mb-8">Le Moteur Thermique</h3>

                      <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6 mb-8">
                        <p className="text-brand-dark italic">"Un moteur n'est rien d'autre qu'une grande pompe à air qui crée des explosions contrôlées."</p>
                      </div>

                      <div className="space-y-6">
                        <div className="flex gap-4 items-start">
                          <div className="w-12 h-12 rounded-xl bg-white shadow-sm flex items-center justify-center shrink-0 border border-gray-100 text-brand-primary">
                            <Zap size={24} />
                          </div>
                          <div>
                            <h4 className="font-bold text-gray-900">L'Allumage</h4>
                            <p className="text-sm text-gray-600">Les bougies créent l'étincelle. Si elles sont fatiguées, le moteur 'broute' et consomme plus.</p>
                          </div>
                        </div>
                        <div className="flex gap-4 items-start">
                          <div className="w-12 h-12 rounded-xl bg-white shadow-sm flex items-center justify-center shrink-0 border border-gray-100 text-brand-primary">
                            <Droplets size={24} />
                          </div>
                          <div>
                            <h4 className="font-bold text-gray-900">Distribution</h4>
                            <p className="text-sm text-gray-600">La courroie synchronise tout. Si elle casse, le moteur est souvent irrécupérable. À changer selon les préconisations !</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeMechanicTab === 'brakes' && (
                    <div className="animate-fade-in">
                      <span className="text-brand-primary font-bold tracking-wider text-sm uppercase mb-2 block">Sécurité & Confort</span>
                      <h3 className="font-display text-4xl font-bold text-gray-900 mb-8">Freinage & Liaison Sol</h3>

                      <div className="grid md:grid-cols-2 gap-8">
                        <div>
                          <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2"><Disc size={20} className="text-brand-primary" /> Freins</h4>
                          <ul className="space-y-3">
                            <li className="text-sm text-gray-600 flex items-start gap-2">
                              <span className="text-brand-primary font-bold mt-0.5">•</span>
                              <span>**Plaquettes** : À changer tous les 30 000 km environ.</span>
                            </li>
                            <li className="text-sm text-gray-600 flex items-start gap-2">
                              <span className="text-brand-primary font-bold mt-0.5">•</span>
                              <span>**Disques** : Plus durables, mais s'affinent. Un disque trop fin peut casser.</span>
                            </li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2"><Activity size={20} className="text-brand-primary" /> Suspension</h4>
                          <p className="text-sm text-gray-600">Les amortisseurs empêchent la voiture de rebondir. S'ils fuient, votre distance de freinage s'allonge dangereusement.</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeMechanicTab === 'elec' && (
                    <div className="animate-fade-in">
                      <span className="text-brand-primary font-bold tracking-wider text-sm uppercase mb-2 block">Intelligence Embarquée</span>
                      <h3 className="font-display text-4xl font-bold text-gray-900 mb-8">Électronique & Capteurs</h3>

                      <div className="p-6 rounded-[2rem] bg-brand-dark text-white relative overflow-hidden mb-8">
                        <Cpu className="absolute -right-4 -bottom-4 w-32 h-32 text-white/10" />
                        <h4 className="font-bold text-xl mb-3 relative z-10">Le "Calculateur" (ECU)</h4>
                        <p className="text-white/80 text-sm leading-relaxed relative z-10">
                          C'est le cerveau de votre voiture. Il reçoit des milliers de données par seconde de tous les capteurs pour ajuster le moteur en temps réel.
                        </p>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100">
                          <h5 className="font-bold text-xs uppercase text-gray-400 mb-1">Capteur Lambda</h5>
                          <p className="text-xs text-gray-600">Analyse l'oxygène dans l'échappement.</p>
                        </div>
                        <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100">
                          <h5 className="font-bold text-xs uppercase text-gray-400 mb-1">Capteur PMH</h5>
                          <p className="text-xs text-gray-600">Indique la position des pistons au cerveau.</p>
                        </div>
                      </div>
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
            {!selectedArticleId ? (
              <>
                <div className="text-center mb-16 max-w-3xl mx-auto">
                  <h2 className="font-display text-4xl font-bold text-gray-900 mb-6">Entretiens Courants & Astuces</h2>
                  <p className="text-xl text-gray-600 font-light">Des guides simples et visuels pour prendre soin de votre voiture au quotidien de manière autonome.</p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                  {MISC_GUIDES.map(item => (
                    <div
                      key={item.id}
                      onClick={() => setSelectedArticleId(item.id)}
                      className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 flex flex-col h-full border border-gray-100 cursor-pointer"
                    >
                      <div className="relative h-48 overflow-hidden rounded-t-3xl">
                        <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-80 group-hover:opacity-100 transition-opacity"></div>

                        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md text-brand-dark text-xs font-black uppercase tracking-wider px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-sm">
                          {item.id === 1 && <Video size={14} className="text-brand-primary" />}
                          {item.id === 2 && <BookOpen size={14} className="text-brand-primary" />}
                          {item.id === 3 && <Image size={14} className="text-brand-primary" />}
                          {item.id === 4 && <FileText size={14} className="text-brand-primary" />}
                          <span>{item.type}</span>
                        </div>

                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                          <div className="bg-brand-primary text-white rounded-full p-3 shadow-xl">
                            <BookOpen size={24} />
                          </div>
                        </div>
                      </div>

                      <div className="p-6 flex-1 flex flex-col relative bg-white">
                        <div className="flex justify-between items-center mb-4">
                          <span className="text-xs font-bold text-gray-400 bg-gray-50 px-2 py-1 rounded-md">{item.duration}</span>
                        </div>
                        <h3 className="font-display font-bold text-xl text-gray-900 mb-3 group-hover:text-brand-primary transition-colors line-clamp-2">{item.title}</h3>
                        <p className="text-gray-500 text-sm leading-relaxed mb-6 flex-1">{item.desc}</p>

                        <div className="pt-4 border-t border-gray-100/50 flex items-center text-brand-dark font-bold text-sm group-hover:translate-x-1 transition-transform">
                          Consulter l'article <ChevronRight size={16} className="ml-1 text-brand-primary" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              // FULL ARTICLE VIEW
              <div className="animate-fade-in-up max-w-4xl mx-auto">
                <button
                  onClick={() => setSelectedArticleId(null)}
                  className="flex items-center gap-2 text-brand-primary font-bold mb-8 hover:translate-x-2 transition-transform"
                >
                  <ChevronRight className="rotate-180" size={20} /> Retour aux articles
                </button>

                <div className="bg-white rounded-[3rem] shadow-2xl overflow-hidden border border-gray-100">
                  <div className="relative h-80">
                    <img src={selectedArticle?.image} alt={selectedArticle?.title} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/20 to-transparent"></div>
                    <div className="absolute bottom-10 left-10 right-10">
                      <span className="bg-brand-accent text-brand-dark px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest mb-4 inline-block">Guide Pratique</span>
                      <h2 className="text-4xl md:text-5xl font-bold text-white font-display mb-2">{selectedArticle?.title}</h2>
                      <p className="text-white/80 text-lg font-light leading-relaxed max-w-2xl">{selectedArticle?.desc}</p>
                    </div>
                  </div>

                  <div className="p-10 lg:p-16">
                    <div className="prose prose-blue max-w-none">
                      <div className="flex items-start gap-4 mb-10 p-6 bg-blue-50/50 rounded-2xl border border-blue-100">
                        <Lightbulb className="text-brand-primary shrink-0 mt-1" />
                        <p className="text-brand-dark font-medium text-lg leading-relaxed italic">
                          {selectedArticle?.fullContent?.intro}
                        </p>
                      </div>

                      <div className="space-y-12">
                        {selectedArticle?.fullContent?.steps.map((step, idx) => (
                          <div key={idx} className="relative pl-12">
                            <div className="absolute left-0 top-0 w-8 h-8 rounded-full bg-brand-primary text-white flex items-center justify-center font-black text-sm shadow-lg shadow-brand-primary/30">
                              {idx + 1}
                            </div>
                            <h4 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h4>
                            <p className="text-gray-600 leading-relaxed text-lg">{step.text}</p>
                          </div>
                        ))}
                      </div>

                      <div className="mt-16 p-8 bg-gray-900 rounded-3xl text-white relative overflow-hidden group">
                        <Activity className="absolute -right-8 -bottom-8 w-48 h-48 text-white/5 transition-transform duration-1000 group-hover:scale-110" />
                        <div className="relative z-10">
                          <h4 className="text-brand-accent font-black uppercase tracking-widest text-sm mb-4">Conseil d'Expert AutoScanR</h4>
                          <p className="text-white/90 text-lg leading-relaxed font-medium">
                            {selectedArticle?.fullContent?.proTip}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
};

export default MediationCenter;