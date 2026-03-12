import React, { useState, useEffect, useMemo } from 'react';
import { Settings, Shield, Activity, Calendar, MapPin, Search, ChevronRight, AlertTriangle, FileText, Upload, CreditCard, MessageSquare, Car, LogOut, CheckCircle2, Star, Zap, Droplets, BatteryCharging, Wrench, ArrowLeft, Lightbulb, PlayCircle, BookOpen, Navigation, Phone, User, CheckCircle, X, MonitorPlay, Download } from 'lucide-react';
import { ViewState } from '../types';
import { MapContainer, TileLayer, Marker, Polyline, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

interface MotoristDashboardProps {
   setView: (view: ViewState) => void;
}

// ----------------------------------------------------------------------
// MOCK DATA
// ----------------------------------------------------------------------
const MOCK_USER = {
   name: "Marc DUPONT",
   vehicle: "Peugeot 308 (2019)",
   plate: "AB-123-CD",
   healthScore: 82, // Score on 100
   ecoScore: 91,
};

interface DiagnosticIssue {
   code: string;
   title: string;
   description: string;
   simplifiedExplanation: string;
   possibleCauses?: string[];
   howItWorks: string;
   partsAffected: string[];
   severity: 'low' | 'medium' | 'high';
   urgency: 'immediate' | 'soon' | 'monitor';
   estimatedCost: string;
   recommendation: string;
   system: 'engine' | 'transmission' | 'brakes' | 'exhaust' | 'electrical' | 'suspension';
   media?: {
      videoUrl?: string; // YouTube or generic video MP4
      comicUrl?: string; // Image path
      articleContent?: string; // Markdown or long string
   }
}

const MOCK_ISSUES_1: DiagnosticIssue[] = [
   {
      code: "P0303",
      title: "Ratés d'allumage détectés (Cylindre 3)",
      description: "Le moteur ne brûle pas le carburant correctement causant des vibrations.",
      possibleCauses: ["Bougie d'allumage défectueuse", "Bobine d'allumage HS", "Injecteur de carburant bouché", "Manque de compression dans le cylindre"],
      simplifiedExplanation: "Imaginez que votre moteur soit comme un groupe de sportifs. Si l'un rate son coup de pédale, le vélo avance par à-coups. Un cylindre \"rate\" son explosion.",
      howItWorks: "Une bougie crée une étincelle pour faire exploser le mélange air/essence. Si elle est usée, l'explosion ne se produit pas.",
      partsAffected: ["Bougies d'allumage", "Bobines d'allumage"],
      severity: "high",
      urgency: "immediate",
      estimatedCost: "80€ – 250€",
      recommendation: "Remplacez la bobine et la bougie du cylindre 3 rapidement.",
      system: "engine",
      media: {
         videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4", // placeholder for demo
         comicUrl: "/images/bd-allumage.png", // We will mock an image if it doesn't exist, using a placeholder text or styling
         articleContent: "L'allumage est un processus fondamental dans un moteur à combustion essence. La bobine d'allumage transforme le 12V de la batterie en haute tension (jusqu'à 40 000V) qui est ensuite envoyée à la bougie. Cette dernière crée une étincelle enflammant le mélange air/essence. Si la bougie est encrassée ou la bobine défectueuse, l'étincelle ne se fait pas : c'est le 'raté d'allumage' (code P0300 à P0312). Cela entraîne une perte de puissance, des vibrations (le moteur tourne sur '3 pattes' ou au lieu de 4), et peut gravement endommager le pot catalytique car du carburant imbrûlé s'y déverse."
      }
   }
];

const MOCK_ISSUES_2: DiagnosticIssue[] = [
   {
      code: "C0035",
      title: "Capteur de vitesse de roue (Avant Gauche)",
      description: "Le signal du capteur ABS est défaillant ou absent.",
      possibleCauses: ["Capteur ABS encrassé ou cassé", "Faisceau électrique endommagé", "Cible magnétique du roulement altérée"],
      simplifiedExplanation: "L'ordinateur de bord ne sait plus à quelle vitesse tourne votre roue avant gauche. L'ABS est désactivé par sécurité.",
      howItWorks: "Un capteur magnétique lit une petite roue dentée sur le moyeu pour informer la voiture de la vitesse exacte de chaque roue, essentiel pour l'ABS et l'ESP.",
      partsAffected: ["Capteur ABS", "Faisceau électrique"],
      severity: "medium",
      urgency: "soon",
      estimatedCost: "60€ – 120€",
      recommendation: "Faites vérifier le capteur et son câblage. Nettoyage ou remplacement nécessaire.",
      system: "brakes",
      media: {
         articleContent: "Le système ABS (Anti-lock Braking System) empêche le blocage des roues lors d'un freinage d'urgence. Le capteur de vitesse de roue (Wheel Speed Sensor) est l'œil du système pour chaque roue. Exposé aux intempéries et à la saleté, il peut s'encrasser ou être endommagé. Un code C0035 indique un problème spécifique sur la roue avant gauche. Bien que la voiture puisse encore freiner normalement, elle le fera SANS assistance antiblocage, ce qui augmente les distances de freinage d'urgence."
      }
   }
];

const MOCK_ISSUES_3: DiagnosticIssue[] = [
   {
      code: "P0401",
      title: "Débit Insuffisant Vanne EGR",
      description: "Le système de recyclage des gaz d'échappement est obstrué.",
      possibleCauses: ["Vanne EGR bouchée par la suie", "Conduits EGR obstrués", "Sonde de pression défectueuse"],
      simplifiedExplanation: "La vanne qui recycle vos gaz d'échappement est encrassée par la calamine (suie). Le moteur respire mal et perd en puissance.",
      howItWorks: "Pour moins polluer, le moteur réutilise une partie de ses propres gaz. Si la vanne qui gère ce flux se bouche, le système s'étouffe.",
      partsAffected: ["Vanne EGR", "Conduits d'admission"],
      severity: "medium",
      urgency: "soon",
      estimatedCost: "150€ – 350€",
      recommendation: "Faites effectuer un décalaminage complet du moteur ou remplacez la vanne EGR.",
      system: "engine",
      media: {
         articleContent: "La vanne EGR (Exhaust Gas Recirculation) a pour but de réduire les émissions d'oxydes d'azote en réinjectant une fréquence des gaz d'échappement dans l'admission. L'encrassement (la calamine) est son pire ennemi, particulièrement sur les véhicules diesel effectuant de petits trajets urbains."
      }
   }
];

const MOCK_REPORTS = [
   { id: 1, date: "24 Oct 2023", location: "Borne Auchan Toulon", status: "warning", summary: "Ratés d'allumage cylindre 3", codes: ["P0303"], cost: "14.99€", issues: MOCK_ISSUES_1 },
   { id: 2, date: "12 Aou 2023", location: "Borne Carrefour Ollioules", status: "warning", summary: "Défaillance capteur ABS (C0035)", codes: ["C0035"], cost: "14.99€", issues: MOCK_ISSUES_2 },
   { id: 3, date: "05 Mai 2023", location: "Borne Leclerc La Seyne", status: "warning", summary: "Débit Insuffisant Vanne EGR", codes: ["P0401"], cost: "14.99€", issues: MOCK_ISSUES_3 }
];

const MOCK_QUOTES = [
   { id: 1, garageName: "Garage MecaExpert", rating: 4.8, distance: "2.5 km", priceEstimate: "180€ - 250€", message: "Le code P0303 nécessite le remplacement de la bobine d'allumage. Pièce en stock.", date: "Aujourd'hui, 10:30" },
   { id: 2, garageName: "Garage du Port", rating: 4.5, distance: "4.1 km", priceEstimate: "220€ - 280€", message: "Devis estimatif pour le changement d'une bobine + bougie. À confirmer sur place.", date: "Hier, 16:45" },
];

const MOCK_GARAGES = [
   { id: '1', name: 'Garage MecaExpert', distance: '2.5 km', rating: 4.8, nextAvailability: "Aujourd'hui 14h00", lat: 43.1310, lng: 5.9180, address: "12 Avenue de la République, 83000 Toulon", phone: "04 94 12 34 56", hours: "08:00 - 18:00 (Lun-Ven)" },
   { id: '2', name: 'Garage du Port', distance: '4.1 km', rating: 4.5, nextAvailability: 'Demain 09h00', lat: 43.1255, lng: 5.9350, address: "55 Quai de la Sinse, 83000 Toulon", phone: "04 94 98 76 54", hours: "09:00 - 19:00 (Lun-Sam)" },
   { id: '3', name: 'Garage Speedy', distance: '5.2 km', rating: 4.7, nextAvailability: "Aujourd'hui 16h30", lat: 43.1090, lng: 5.9380, address: "Boulevard de Strasbourg, 83000 Toulon", phone: "04 94 55 55 55", hours: "08:30 - 18:30 (Lun-Ven)" },
];

const USER_COORDS: [number, number] = [43.1242, 5.9280];

const createUserIcon = () => L.divIcon({
   className: 'custom-user-icon',
   html: `<div class="relative flex flex-col items-center">
      <div class="absolute inset-0 bg-[#0094B7] rounded-full animate-ping opacity-30 scale-150"></div>
      <div class="w-8 h-8 bg-[#0094B7] rounded-full border-4 border-white shadow-xl relative z-10"></div>
   </div>`,
   iconSize: [40, 40],
   iconAnchor: [20, 20]
});

const createGarageIcon = (isSelected: boolean) => L.divIcon({
   className: 'custom-garage-icon',
   html: `<div class="relative flex flex-col items-center transition-all duration-300 ${isSelected ? 'scale-125 z-50' : 'hover:scale-110'}">
      <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="${isSelected ? 'rgba(0,148,183,0.2)' : '#F1F5F9'}" stroke="${isSelected ? '#0094B7' : '#64748B'}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="drop-shadow-md">
         <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
         <circle cx="12" cy="10" r="3"/>
      </svg>
   </div>`,
   iconSize: [36, 36],
   iconAnchor: [18, 36]
});

const MapFlyTo = ({ coords }: { coords: [number, number] | null }) => {
   const map = useMap();
   useEffect(() => {
      setTimeout(() => map.invalidateSize(), 400);
      if (coords) {
         map.flyTo(coords, 14, { duration: 1.2 });
      } else {
         map.flyTo(USER_COORDS, 13, { duration: 1.2 });
      }
   }, [coords, map]);
   return null;
};

const VEHICLE_SYSTEMS = [
   { id: 'engine', name: 'Moteur', status: 'warning', icon: Activity, score: 65, desc: "Cylindre 3 à vérifier" },
   { id: 'battery', name: 'Batterie', status: 'ok', icon: BatteryCharging, score: 98, desc: "Charge optimale" },
   { id: 'fluids', name: 'Liquides', status: 'ok', icon: Droplets, score: 90, desc: "Niveaux corrects" },
   { id: 'brakes', name: 'Freinage', status: 'ok', icon: Shield, score: 85, desc: "Usure normale (40%)" },
];

export const MotoristDashboard: React.FC<MotoristDashboardProps> = ({ setView }) => {
   const [activeSection, setActiveSection] = useState<'reports' | 'quotes' | 'appointments' | 'settings'>('reports');
   const [viewingReportId, setViewingReportId] = useState<number | null>(null);
   const [activeSystem, setActiveSystem] = useState<string | null>(null);
   const [selectedIssueCode, setSelectedIssueCode] = useState<string | null>(null);
   const [selectedGarageId, setSelectedGarageId] = useState<string | null>(null);

   // Booking states
   const [bookingGarageId, setBookingGarageId] = useState<string | null>(null);
   const [bookingStep, setBookingStep] = useState<'SLOT' | 'FORM'>('SLOT');
   const [selectedDate, setSelectedDate] = useState<string | null>(null);
   const [selectedTime, setSelectedTime] = useState<string | null>(null);
   const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
   const [otherObservations, setOtherObservations] = useState('');
   const [verifyingBook, setVerifyingBook] = useState(false);
   const [smsCode, setSmsCode] = useState('');
   const [codeError, setCodeError] = useState(false);
   const [bookingSuccess, setBookingSuccess] = useState(false);

   const [viewingGarageProfileId, setViewingGarageProfileId] = useState<string | null>(null);

   const commonSymptoms = [
      'Voyant moteur allumé',
      'Bruit anormal',
      'Perte de puissance',
      'Fumée excessive',
      'Problème de freinage',
      'Fuite de liquide'
   ];

   const toggleSymptom = (symptom: string) => {
      if (selectedSymptoms.includes(symptom)) {
         setSelectedSymptoms(selectedSymptoms.filter(s => s !== symptom));
      } else {
         setSelectedSymptoms([...selectedSymptoms, symptom]);
      }
   };
   const MOCK_CODE = '1234';
   const dates = [
      { label: "Aujourd'hui", val: "today" },
      { label: "Demain", val: "tomorrow" },
      { label: "Autre", val: "other" },
   ];
   const times = ["09:00", "10:30", "14:00", "16:30", "17:30"];
   const [routeLine, setRouteLine] = useState<[number, number][] | null>(null);
   const [routeStats, setRouteStats] = useState<{ distance: string, duration: string } | null>(null);
   // State to track which media is open for a specific issue ID
   const [activeMedia, setActiveMedia] = useState<{ issueCode: string, type: 'video' | 'comic' | 'article' } | null>(null);

   const SYSTEMS_MAP = [
      { id: 'engine', label: 'Moteur', icon: Settings, x: 75, y: 35 },
      { id: 'transmission', label: 'Boîte de vitesses', icon: Settings, x: 60, y: 55 },
      { id: 'brakes', label: 'Freinage', icon: Shield, x: 28, y: 65 },
      { id: 'exhaust', label: 'Échappement', icon: Activity, x: 45, y: 72 },
      { id: 'electrical', label: 'Électronique', icon: Zap, x: 65, y: 45 },
      { id: 'suspension', label: 'Suspension', icon: Settings, x: 18, y: 58 },
   ];

   // ----------------------------------------------------------------------
   // COMPONENTS
   // ----------------------------------------------------------------------
   const NavItem = ({ id, icon: Icon, label, alertCount = 0 }) => (
      <button
         onClick={() => setActiveSection(id)}
         className={`relative flex items-center gap-2 px-6 py-4 text-sm font-bold transition-all duration-300 ${activeSection === id
            ? 'text-brand-primary border-b-2 border-brand-primary'
            : 'text-gray-500 hover:text-brand-dark'
            }`}
      >
         <Icon size={18} />
         <span className="hidden md:block">{label}</span>
         {alertCount > 0 && (
            <span className="absolute top-2 right-2 md:relative md:top-auto md:right-auto bg-orange-500 text-white text-[10px] font-black px-1.5 py-0.5 rounded-full shadow-sm">
               {alertCount}
            </span>
         )}
      </button>
   );

   return (
      <div className="min-h-screen bg-[#f8f9fa] flex flex-col font-sans pt-20">

         {/* -----------------------------------------------------
          TOP NAVIGATION BAR
         ------------------------------------------------------- */}
         <div className="sticky top-20 z-20 bg-white border-b border-gray-200 shadow-sm flex items-center justify-between px-4 md:px-8">
            <nav className="flex items-center overflow-x-auto hide-scrollbar">
               <NavItem id="reports" icon={FileText} label="Mes Diagnostics" />
               <NavItem id="quotes" icon={MessageSquare} label="Réponses Garages" alertCount={2} />
               <NavItem id="appointments" icon={Calendar} label="Mes Rendez-vous" />
               <NavItem id="settings" icon={Settings} label="Mon Profil" />
            </nav>
            <div className="hidden md:flex items-center gap-4 py-2 border-l border-gray-100 pl-6">
               <div className="text-right">
                  <p className="font-bold text-sm text-brand-dark">{MOCK_USER.name}</p>
                  <p className="text-xs text-gray-500">{MOCK_USER.plate}</p>
               </div>
               <div className="w-10 h-10 rounded-full bg-gradient-to-br from-brand-primary to-blue-600 flex items-center justify-center text-white font-bold shadow-sm">
                  {MOCK_USER.name.charAt(0)}
               </div>
            </div>
         </div>

         {/* -----------------------------------------------------
          MAIN CONTENT AREA
         ------------------------------------------------------- */}
         <main className="flex-1 p-6 md:p-10 lg:p-12 w-full max-w-7xl mx-auto relative">
            {/* Background decorative elements */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-brand-primary/5 rounded-full blur-[100px] pointer-events-none -z-10"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/5 rounded-full blur-[100px] pointer-events-none -z-10"></div>


            {/* ===================================================
            SECTION: HISTORIQUE / TIMELINE (REPORTS)
         ==================================================== */}
            {activeSection === 'reports' && !viewingReportId && (
               <div className="max-w-5xl mx-auto animate-fade-in-up">
                  {/* Header */}
                  <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
                     <div>
                        <h2 className="font-display text-3xl font-bold text-brand-dark">Mes Diagnostics</h2>
                        <p className="text-gray-500 text-sm mt-1">Retrouvez l'historique complet de vos passages AutoScanR.</p>
                     </div>
                     <div className="flex items-center gap-3">
                        <div className="relative">
                           <input type="text" placeholder="Rechercher..." className="bg-white border border-gray-200 rounded-xl px-4 py-2.5 pl-10 text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary/50 focus:border-brand-primary transition-all w-56" />
                           <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        </div>
                     </div>
                  </div>

                  {/* Summary Stats */}
                  <div className="grid grid-cols-3 gap-4 mb-8">
                     <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm text-center">
                        <p className="font-display text-2xl font-bold text-brand-dark">{MOCK_REPORTS.length}</p>
                        <p className="text-xs text-gray-500 font-bold mt-1">Diagnostics</p>
                     </div>
                     <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm text-center">
                        <p className="font-display text-2xl font-bold text-orange-600">{MOCK_REPORTS.reduce((acc, r) => acc + r.issues.length, 0)}</p>
                        <p className="text-xs text-gray-500 font-bold mt-1">Défauts trouvés</p>
                     </div>
                     <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm text-center">
                        <p className="font-display text-2xl font-bold text-green-600">{MOCK_REPORTS.filter(r => r.issues.length === 0).length}</p>
                        <p className="text-xs text-gray-500 font-bold mt-1">Sains</p>
                     </div>
                  </div>

                  {/* Timeline */}
                  <div className="relative">
                     {/* Vertical line */}
                     <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gray-200 hidden md:block"></div>

                     <div className="flex flex-col gap-5">
                        {MOCK_REPORTS.map((report, index) => (
                           <div key={report.id} className="relative flex gap-6 group">
                              {/* Timeline dot */}
                              <div className="hidden md:flex flex-col items-center z-10">
                                 <div className={`w-12 h-12 rounded-xl flex items-center justify-center shadow-sm border-2 transition-all group-hover:scale-110 ${report.issues.length > 0
                                    ? 'bg-orange-50 border-orange-200 text-orange-600'
                                    : 'bg-green-50 border-green-200 text-green-600'
                                    }`}>
                                    {report.issues.length > 0 ? <AlertTriangle size={20} /> : <CheckCircle2 size={20} />}
                                 </div>
                              </div>

                              {/* Card */}
                              <div className="flex-1 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg hover:border-brand-primary/20 transition-all p-5 md:p-6 cursor-pointer" onClick={() => setViewingReportId(report.id)}>
                                 <div className="flex flex-col md:flex-row md:items-center gap-4">
                                    <div className="flex-1 space-y-2">
                                       {/* Date & Badges */}
                                       <div className="flex flex-wrap items-center gap-2">
                                          <span className="text-xs text-gray-500 font-bold flex items-center gap-1.5 bg-gray-50 px-2.5 py-1 rounded-lg border border-gray-100">
                                             <Calendar size={12} className="text-brand-primary" /> {report.date}
                                          </span>
                                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wider ${report.issues.length > 0 ? 'bg-orange-50 text-orange-600 border border-orange-100' : 'bg-green-50 text-green-600 border border-green-100'}`}>
                                             {report.issues.length > 0 ? `${report.issues.length} défaut${report.issues.length > 1 ? 's' : ''}` : 'Aucun défaut'}
                                          </span>
                                       </div>

                                       {/* Location & Vehicle */}
                                       <h3 className="font-display text-lg font-bold text-brand-primary flex items-center gap-2">
                                          <MapPin size={16} className="text-brand-primary/50" /> {report.location}
                                       </h3>
                                       <div className="flex items-center gap-2 text-sm text-gray-500">
                                          <Car size={14} className="text-gray-400" />
                                          <span className="font-medium">{MOCK_USER.vehicle}</span>
                                       </div>
                                    </div>

                                    {/* Action */}
                                    <div className="shrink-0 flex items-center">
                                       <button className="bg-brand-primary/10 text-brand-primary px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-brand-primary hover:text-white transition-all flex items-center gap-2">
                                          Ouvrir <ChevronRight size={16} />
                                       </button>
                                    </div>
                                 </div>
                              </div>
                           </div>
                        ))}
                     </div>

                  </div>
               </div>
            )}

            {/* RAPPORT DÉTAILLÉ (BORNE INTEGRATION) */}
            {activeSection === 'reports' && viewingReportId && (() => {
               const report = MOCK_REPORTS.find(r => r.id === viewingReportId);
               if (!report) return null;

               const totalIssues = report.issues.length;

               return (
                  <div className="animate-fade-in-up flex flex-col h-full space-y-6">
                     <button onClick={() => { setViewingReportId(null); setActiveSystem(null); }} className="flex items-center gap-2 text-gray-500 hover:text-brand-primary font-bold w-fit mb-2">
                        <ArrowLeft size={20} /> Retour à l'historique
                     </button>

                     <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100">
                        <div>
                           <h2 className="font-display text-2xl font-bold text-brand-dark mb-1">Rapport de Diagnostic</h2>
                           <p className="text-gray-500 text-sm flex items-center gap-2"><MapPin size={14} /> {report.location} • {report.date}</p>
                        </div>
                        <div className="flex flex-wrap items-center gap-3 mt-4 md:mt-0">
                           <div className="flex items-center gap-2 text-sm text-gray-500 font-medium bg-gray-50 px-3 py-2 rounded-xl border border-gray-100">
                              <Car size={16} className="text-gray-400" />
                              <span className="font-bold text-brand-dark">{MOCK_USER.vehicle}</span>
                           </div>
                           <div className={`px-4 py-2 rounded-xl flex items-center gap-2 font-bold ${totalIssues > 0 ? 'bg-orange-50 text-orange-600 border border-orange-100' : 'bg-green-50 text-green-600 border border-green-100'}`}>
                              {totalIssues > 0 ? <AlertTriangle size={18} /> : <CheckCircle2 size={18} />}
                              {totalIssues} Anomalie{totalIssues !== 1 ? 's' : ''}
                           </div>
                           <a href="/documents/rapport.pdf" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-brand-primary text-white font-bold px-4 py-2 rounded-xl hover:bg-brand-primary/90 hover:shadow-md transition-all">
                              <Download size={18} />
                              Télécharger PDF
                           </a>
                        </div>
                     </div>

                     <div className="flex flex-col lg:flex-row gap-6">
                        {/* Car Schema */}
                        <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100 p-8 flex-1 flex flex-col items-center justify-center relative min-h-[400px]">
                           <p className="absolute top-6 left-8 text-xs font-bold text-gray-400 uppercase tracking-widest">Localisation visuelle</p>
                           <div className="relative w-full max-w-lg mt-8">
                              <img src="/images/voiture-scan.png" alt="Schéma voiture" className="w-full object-contain mix-blend-multiply" />
                              {SYSTEMS_MAP.map(sys => {
                                 const faultyIssues = report.issues.filter(i => i.system === sys.id);
                                 const faulty = faultyIssues.length > 0;
                                 const isSelected = activeSystem === sys.id;
                                 return (
                                    <button
                                       key={sys.id}
                                       onClick={() => { setActiveSystem(isSelected ? null : sys.id); setSelectedIssueCode(null); }}
                                       className="absolute -translate-x-1/2 -translate-y-1/2 group"
                                       style={{ left: `${sys.x}%`, top: `${sys.y}%` }}
                                    >
                                       {faulty && !isSelected && <span className="absolute inset-0 rounded-full bg-orange-500 animate-ping opacity-30 scale-150" />}
                                       <div className={`relative w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center shadow-lg border-2 transition-all duration-300 ${faulty ? (isSelected ? 'bg-orange-600 border-white text-white scale-110' : 'bg-orange-500 border-white text-white hover:scale-110') : 'bg-green-500 border-white text-white hover:scale-110'} ${isSelected && !faulty ? 'ring-4 ring-green-500/30' : ''} ${isSelected && faulty ? 'ring-4 ring-orange-500/30' : ''}`}>
                                          <sys.icon size={18} strokeWidth={2.5} />
                                       </div>
                                       {faulty && (
                                          <div className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-white shadow-sm">
                                             {faultyIssues.length}
                                          </div>
                                       )}
                                    </button>
                                 );
                              })}
                           </div>
                        </div>

                        {/* Issue Details / List */}
                        <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100 flex-1 lg:max-w-md flex flex-col overflow-hidden">
                           {activeSystem ? (() => {
                              const activeSysDef = SYSTEMS_MAP.find(s => s.id === activeSystem);
                              const issues = report.issues.filter(i => i.system === activeSystem);
                              return (
                                 <div className="flex flex-col h-full">
                                    <div className="p-6 border-b border-gray-100 bg-gray-50/50 flex items-center justify-between">
                                       <h3 className="font-display font-bold text-xl text-brand-dark">{activeSysDef?.label}</h3>
                                       <button onClick={() => { setActiveSystem(null); setSelectedIssueCode(null); }} className="text-gray-400 hover:text-brand-primary p-2">✕</button>
                                    </div>
                                    <div className="p-6 overflow-y-auto max-h-[400px] space-y-4">
                                       {issues.length > 0 ? issues.map(issue => (
                                          <div
                                             key={issue.code}
                                             onClick={() => setSelectedIssueCode(selectedIssueCode === issue.code ? null : issue.code)}
                                             className={`p-5 rounded-2xl border-2 cursor-pointer transition-all ${selectedIssueCode === issue.code ? 'border-brand-primary bg-brand-primary/5 shadow-md' : 'border-gray-100 bg-white hover:border-brand-primary/30 shadow-sm hover:shadow-md'}`}
                                          >
                                             <div className="flex items-center justify-between mb-3">
                                                <div className="flex items-center gap-2">
                                                   <span className="font-mono text-xs font-bold text-orange-600 bg-orange-100 px-2.5 py-1 rounded-md">{issue.code}</span>
                                                   <span className="text-[10px] font-bold text-red-600 bg-red-50 border border-red-100 px-2 py-0.5 rounded-full uppercase tracking-wider">{issue.severity}</span>
                                                </div>
                                                <ChevronRight size={18} className={`text-brand-primary transition-transform ${selectedIssueCode === issue.code ? 'rotate-90' : ''}`} />
                                             </div>
                                             <h4 className={`font-bold text-lg leading-snug ${selectedIssueCode === issue.code ? 'text-brand-primary' : 'text-brand-dark'}`}>{issue.title}</h4>
                                          </div>
                                       )) : (
                                          <div className="text-center py-12 text-gray-500">
                                             <CheckCircle2 size={48} className="mx-auto text-green-400 mb-4" />
                                             <p className="font-bold text-gray-700">Aucun défaut</p>
                                             <p className="text-sm mt-1">Ce système est en parfait état.</p>
                                          </div>
                                       )}
                                    </div>
                                 </div>
                              );
                           })() : (
                              <div className="p-8 h-full flex flex-col items-center justify-center text-center text-gray-500 bg-gray-50/50">
                                 <Activity size={48} className="text-gray-300 mb-4" />
                                 <h3 className="font-bold text-gray-700 mb-2">Sélectionnez un système</h3>
                                 <p className="text-sm max-w-[200px]">Cliquez sur un point du véhicule pour voir les détails du diagnostic.</p>
                              </div>
                           )}
                        </div>
                     </div>

                     {/* DETAILED EXPLANATION PANEL (Appears Below) */}
                     {selectedIssueCode && (() => {
                        const issue = report.issues.find(i => i.code === selectedIssueCode);
                        if (!issue) return null;

                        return (
                           <div className="bg-white rounded-[2rem] shadow-sm border border-brand-primary/20 p-8 mt-6 animate-fade-in-up flex flex-col gap-10">
                              {/* Header Title */}
                              <div className="pb-6 border-b border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
                                 <div>
                                    <div className="flex items-center gap-3 mb-2">
                                       <span className="font-mono text-sm font-bold text-orange-600 bg-orange-100 px-3 py-1 rounded-md">{issue.code}</span>
                                       <span className="text-xs font-bold text-red-600 bg-red-50 border border-red-100 px-3 py-1 rounded-full uppercase tracking-wider">{issue.severity}</span>
                                    </div>
                                    <h3 className="font-display text-2xl font-bold text-brand-dark">{issue.title}</h3>
                                 </div>
                                 <button onClick={() => setSelectedIssueCode(null)} className="shrink-0 text-gray-400 hover:text-brand-primary p-2 bg-gray-50 rounded-full transition-colors self-start md:self-center">
                                    <X size={20} />
                                 </button>
                              </div>

                              {/* 1. Explication Technique */}
                              <div>
                                 <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3 flex items-center gap-2"><Settings size={18} /> Explication technique</p>
                                 <p className="text-sm md:text-base text-gray-700 leading-relaxed bg-slate-50 border border-slate-200 rounded-2xl p-6">{issue.description}</p>
                              </div>

                              {/* 2. Explication Vulgarisée */}
                              <div>
                                 <p className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-3 flex items-center gap-2"><Lightbulb size={18} /> Explication vulgarisée</p>
                                 <p className="text-sm md:text-base text-gray-700 leading-relaxed font-medium bg-blue-50/50 rounded-2xl p-6 border border-blue-100/50">{issue.simplifiedExplanation}</p>
                              </div>

                              {/* 3. Fonctionnement des pièces concernées */}
                              <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
                                 <div className="flex flex-col lg:flex-row gap-6">
                                    <div className="flex-1">
                                       <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3 flex items-center gap-2"><Activity size={18} /> Fonctionnement des pièces concernées</p>
                                       <p className="text-sm text-gray-600 leading-relaxed">{issue.howItWorks}</p>
                                    </div>
                                    <div className="lg:w-1/3 border-t lg:border-t-0 lg:border-l border-gray-100 pt-4 lg:pt-0 lg:pl-6">
                                       <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3 flex items-center gap-2"><Wrench size={16} /> Pièces identifiées</p>
                                       <div className="flex flex-wrap gap-2">
                                          {issue.partsAffected.map(part => (
                                             <span key={part} className="text-sm font-bold bg-slate-50 text-gray-600 px-3 py-1.5 rounded-xl border border-gray-200 shadow-sm flex items-center gap-2">{part}</span>
                                          ))}
                                       </div>
                                    </div>
                                 </div>
                              </div>

                              {/* 4. Causes Probables */}
                              {issue.possibleCauses && (
                                 <div>
                                    <p className="text-xs font-bold text-amber-700 uppercase tracking-widest mb-3 flex items-center gap-2"><Search size={18} /> Causes Probables</p>
                                    <div className="bg-amber-50/50 border border-amber-100/50 rounded-2xl p-6">
                                       <ul className="list-disc list-inside space-y-2 text-sm text-gray-700">
                                          {issue.possibleCauses.map((cause, idx) => (
                                             <li key={idx} className="leading-relaxed">{cause}</li>
                                          ))}
                                       </ul>
                                    </div>
                                 </div>
                              )}

                              {/* 5. Recommandations */}
                              <div className="bg-orange-50 rounded-2xl p-6 border border-orange-100 flex items-start gap-4">
                                 <AlertTriangle className="text-orange-500 shrink-0 mt-0.5" size={24} />
                                 <div className="flex-1">
                                    <p className="text-xs font-bold text-orange-600 uppercase tracking-widest mb-2">Recommandations</p>
                                    <p className="text-sm md:text-base text-orange-800 font-medium leading-relaxed">{issue.recommendation}</p>
                                 </div>
                              </div>

                              {/* 6. BD Explicative */}
                              <div className="space-y-4 pt-6 border-t border-gray-100">
                                 <h5 className="font-bold text-blue-700 flex items-center gap-2"><BookOpen size={20} /> Explication Illustrée (BD)</h5>
                                 <div className="w-full rounded-2xl overflow-hidden shadow-md border border-gray-200 bg-white flex justify-center items-center">
                                    <img src="/images/bd.png" alt="BD Explicative" className="w-full h-auto object-contain max-h-[800px]" />
                                 </div>
                              </div>

                              {/* 7. Vidéo (Smaller) */}
                              {issue.media && issue.media.videoUrl && (
                                 <div className="space-y-4 pt-6 border-t border-gray-100">
                                    <h5 className="font-bold text-purple-700 flex items-center gap-2"><PlayCircle size={20} /> Tutoriel Vidéo</h5>
                                    {/* Made max-width smaller (max-w-2xl) and centered */}
                                    <div className="w-full max-w-2xl mx-auto aspect-video bg-black rounded-2xl overflow-hidden shadow-md border border-gray-200">
                                       <video controls className="w-full h-full object-cover">
                                          <source src={issue.media.videoUrl} type="video/mp4" />
                                          Votre navigateur ne supporte pas la vidéo.
                                       </video>
                                    </div>
                                 </div>
                              )}
                           </div>
                        );
                     })()}

                     {/* ===================================================
                        SECTION: MON RENDEZ-VOUS
                     ==================================================== */}
                     <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100 p-8">
                        <h3 className="font-display text-xl font-bold text-brand-dark mb-6 flex items-center gap-3">
                           <div className="w-10 h-10 rounded-xl bg-brand-primary/10 flex items-center justify-center">
                              <Calendar size={20} className="text-brand-primary" />
                           </div>
                           Mon rendez-vous
                        </h3>

                        {/* Conditional: Appointment booked (mock for report id 1) */}
                        {report.id === 1 ? (
                           <div className="space-y-4">
                              <div className="bg-green-50 border border-green-100 rounded-2xl p-6 flex flex-col md:flex-row md:items-center gap-6">
                                 <div className="flex items-center gap-4 flex-1">
                                    <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                                       <CheckCircle2 size={24} className="text-green-600" />
                                    </div>
                                    <div>
                                       <p className="text-xs text-green-600 font-bold uppercase tracking-wider mb-1">Rendez-vous confirmé</p>
                                       <h4 className="font-display font-bold text-lg text-brand-dark">Garage MecaExpert</h4>
                                    </div>
                                 </div>
                                 <div className="flex items-center gap-6 text-sm font-bold text-gray-600">
                                    <div className="flex items-center gap-2">
                                       <Calendar size={16} className="text-brand-primary" />
                                       <span>Lun. 30 Oct 2023</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                       <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-brand-primary"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
                                       <span>09:30</span>
                                    </div>
                                 </div>
                                 <button className="bg-white border border-gray-200 px-5 py-2.5 rounded-xl text-sm font-bold text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-all shadow-sm">
                                    Modifier le rdv
                                 </button>
                              </div>
                           </div>
                        ) : (
                           /* No appointment yet — Map + Garage List */
                           <div className="space-y-6">
                              <p className="text-gray-500 text-sm">Vous n'avez pas encore pris de rendez-vous pour ce diagnostic. Sélectionnez un garage sur la carte ou dans la liste ci-dessous.</p>

                              <div className="flex flex-col lg:flex-row gap-0 rounded-2xl overflow-hidden border border-gray-200 shadow-md" style={{ minHeight: '420px' }}>
                                 {/* Sidebar: Garage List */}
                                 <div className="w-full lg:w-[340px] bg-white border-r border-gray-100 flex flex-col shrink-0 z-20">
                                    <div className="p-4 border-b border-gray-100 bg-gray-50">
                                       <h4 className="text-sm font-bold text-brand-primary">Garages à proximité</h4>
                                       <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mt-0.5">{MOCK_GARAGES.length} disponibles</p>
                                    </div>
                                    <div className="flex-1 overflow-y-auto">
                                       {MOCK_GARAGES.map(garage => (
                                          <div
                                             key={garage.id}
                                             onClick={() => setSelectedGarageId(selectedGarageId === garage.id ? null : garage.id)}
                                             className={`p-4 border-b border-gray-50 cursor-pointer transition-all relative overflow-hidden group ${selectedGarageId === garage.id ? 'bg-brand-primary/5' : 'hover:bg-gray-50'}`}
                                          >
                                             <div className={`absolute left-0 top-0 bottom-0 w-1 transition-all ${selectedGarageId === garage.id ? 'bg-brand-primary scale-y-100' : 'bg-transparent scale-y-0 group-hover:bg-gray-200 group-hover:scale-y-100'}`} />
                                             <div className="flex justify-between items-start mb-1">
                                                <h5 className={`font-bold text-sm transition-colors ${selectedGarageId === garage.id ? 'text-brand-primary' : 'text-brand-dark'}`}>{garage.name}</h5>
                                                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md border ${selectedGarageId === garage.id ? 'bg-white text-brand-primary border-brand-primary/20' : 'bg-gray-100 text-gray-500 border-transparent'}`}>{garage.distance}</span>
                                             </div>
                                             <div className="flex items-center gap-1.5 mb-2">
                                                <Star size={12} className="text-yellow-500 fill-yellow-500" />
                                                <span className="text-xs font-bold text-yellow-600">{garage.rating}</span>
                                                <span className="text-[10px] text-gray-400 ml-1">(124 avis)</span>
                                             </div>
                                             <div className="text-xs bg-white px-3 py-2 rounded-lg border border-gray-100 flex items-center justify-between">
                                                <div className="flex items-center gap-1.5">
                                                   <Calendar size={12} className="text-brand-primary" />
                                                   <span className="font-bold text-gray-600">Prochaine dispo</span>
                                                </div>
                                                <span className="text-orange-600 font-bold bg-orange-50 px-2 py-0.5 rounded text-[10px]">{garage.nextAvailability}</span>
                                             </div>
                                             {selectedGarageId === garage.id && (
                                                <div className="mt-3 flex gap-2">
                                                   <button onClick={() => setBookingGarageId(garage.id)} className="flex-1 bg-brand-primary text-white py-2.5 rounded-xl text-xs font-bold shadow-md shadow-brand-primary/20 hover:bg-brand-light transition-all flex items-center justify-center gap-1.5">
                                                      <Calendar size={14} /> Prendre RDV
                                                   </button>
                                                   <button onClick={() => setViewingGarageProfileId(garage.id)} className="flex-1 bg-white border border-gray-200 text-gray-600 py-2.5 rounded-xl text-xs font-bold hover:border-brand-primary/30 transition-all flex items-center justify-center gap-1.5">
                                                      <User size={14} /> Fiche
                                                   </button>
                                                </div>
                                             )}
                                          </div>
                                       ))}
                                    </div>
                                 </div>

                                 {/* Interactive Map */}
                                 <div className="flex-1 bg-gray-100 relative z-10 min-h-[300px]">
                                    <MapContainer
                                       center={USER_COORDS}
                                       zoom={13}
                                       style={{ height: '100%', width: '100%' }}
                                       zoomControl={false}
                                    >
                                       <TileLayer
                                          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                                          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
                                       />
                                       <MapFlyTo coords={selectedGarageId ? (() => { const g = MOCK_GARAGES.find(g => g.id === selectedGarageId); return g ? [g.lat, g.lng] as [number, number] : null; })() : null} />
                                       <Marker position={USER_COORDS} icon={createUserIcon()} />
                                       {MOCK_GARAGES.map(garage => (
                                          <Marker
                                             key={garage.id}
                                             position={[garage.lat, garage.lng]}
                                             icon={createGarageIcon(selectedGarageId === garage.id)}
                                             eventHandlers={{ click: () => setSelectedGarageId(garage.id) }}
                                          />
                                       ))}
                                    </MapContainer>

                                    {/* Selected Garage Info Overlay */}
                                    {selectedGarageId && (() => {
                                       const g = MOCK_GARAGES.find(g => g.id === selectedGarageId);
                                       if (!g) return null;
                                       return (
                                          <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-md p-4 rounded-2xl shadow-xl z-[400] border border-gray-100 min-w-[200px]">
                                             <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 pb-2 border-b border-gray-100">Sélectionné</div>
                                             <h4 className="font-bold text-brand-dark text-sm mb-1">{g.name}</h4>
                                             <div className="flex items-center gap-3 text-xs">
                                                <div className="flex items-center gap-1.5">
                                                   <Navigation size={12} className="text-brand-primary" />
                                                   <span className="font-bold text-gray-600">{g.distance}</span>
                                                </div>
                                                <div className="flex items-center gap-1.5">
                                                   <Star size={12} className="text-yellow-500 fill-yellow-500" />
                                                   <span className="font-bold text-gray-600">{g.rating}</span>
                                                </div>
                                             </div>
                                          </div>
                                       );
                                    })()}
                                 </div>
                              </div>
                           </div>
                        )}
                     </div>

                  </div>
               );
            })()}

            {/* ===================================================
            SECTION: RÉPONSES GARAGES
         ==================================================== */}
            {activeSection === 'quotes' && (
               <div className="max-w-5xl mx-auto animate-fade-in-up">
                  <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
                     <div>
                        <h2 className="font-display text-3xl font-bold text-brand-dark">Réponses des Garages</h2>
                        <p className="text-gray-500 text-sm mt-1">Les garages qui ont répondu à vos demandes suite à l'envoi de vos rapports de diagnostic.</p>
                     </div>
                  </div>

                  {/* Active diagnostic context */}
                  <div className="bg-brand-primary/5 border border-brand-primary/10 rounded-2xl p-5 mb-8 flex flex-col md:flex-row md:items-center gap-4">
                     <div className="w-10 h-10 bg-brand-primary/10 rounded-xl flex items-center justify-center shrink-0">
                        <FileText size={20} className="text-brand-primary" />
                     </div>
                     <div className="flex-1">
                        <p className="text-sm font-bold text-brand-dark">Diagnostic du 24 Oct 2023 — Borne Auchan Toulon</p>
                        <p className="text-xs text-gray-500 mt-0.5">Code P0303 • Ratés d'allumage • Peugeot 308 (2019)</p>
                     </div>
                     <span className="text-xs font-bold text-brand-primary bg-brand-primary/10 px-3 py-1 rounded-lg">2 réponses reçues</span>
                  </div>

                  {/* Responses List */}
                  <div className="space-y-5">
                     {MOCK_QUOTES.map(quote => (
                        <div key={quote.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg hover:border-brand-primary/20 transition-all overflow-hidden">
                           <div className="p-6 md:p-8">
                              <div className="flex flex-col md:flex-row gap-6">
                                 {/* Garage Info */}
                                 <div className="flex-1 space-y-4">
                                    <div className="flex items-center gap-4">
                                       <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center border border-gray-100 shrink-0">
                                          <Wrench className="text-gray-400" size={22} />
                                       </div>
                                       <div>
                                          <div className="flex items-center gap-2">
                                             <h3 className="font-display text-xl font-bold text-brand-dark">{quote.garageName}</h3>
                                             {quote.rating >= 4.7 && (
                                                <span className="text-[9px] font-bold bg-brand-primary/10 text-brand-primary px-2 py-0.5 rounded-md uppercase tracking-wider">Top Garage</span>
                                             )}
                                          </div>
                                          <div className="flex items-center gap-3 mt-1">
                                             <span className="text-xs text-yellow-600 font-bold flex items-center gap-1 bg-yellow-50 px-2 py-0.5 rounded-md"><Star size={10} fill="currentColor" /> {quote.rating}</span>
                                             <span className="text-xs text-gray-500 flex items-center gap-1"><MapPin size={10} /> {quote.distance}</span>
                                             <span className="text-[10px] text-gray-400">{quote.date}</span>
                                          </div>
                                       </div>
                                    </div>

                                    {/* Garage message */}
                                    <div className="bg-gray-50 rounded-xl p-4 border border-gray-100 relative">
                                       <div className="absolute top-2 left-3 text-3xl text-gray-200 font-serif leading-none">“</div>
                                       <p className="text-sm text-gray-600 leading-relaxed italic pl-5">{quote.message}</p>
                                    </div>
                                 </div>

                                 {/* Price & Actions */}
                                 <div className="shrink-0 md:border-l md:border-gray-100 md:pl-6 flex flex-col items-center justify-center gap-4 md:min-w-[200px]">
                                    <div className="text-center">
                                       <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Estimation</p>
                                       <p className="font-display text-3xl font-bold text-brand-primary mt-1">{quote.priceEstimate}</p>
                                       <p className="text-[10px] text-gray-400 mt-0.5">Main d'œuvre incluse</p>
                                    </div>
                                    <div className="flex flex-col gap-2 w-full">
                                       <button onClick={() => setBookingGarageId(String(quote.id))} className="w-full bg-brand-primary text-white py-3 rounded-xl font-bold text-sm shadow-md shadow-brand-primary/20 hover:bg-brand-light transition-all flex items-center justify-center gap-2">
                                          <Calendar size={14} /> Prendre RDV
                                       </button>
                                       <button onClick={() => setViewingGarageProfileId(String(quote.id))} className="w-full bg-white border border-gray-200 text-gray-600 py-3 rounded-xl font-bold text-sm hover:border-brand-primary/30 transition-all flex items-center justify-center gap-2">
                                          <User size={14} /> Fiche Garage
                                       </button>
                                    </div>
                                 </div>
                              </div>
                           </div>
                        </div>
                     ))}
                  </div>
               </div>
            )}

            {/* ===================================================
            SECTION: MES RENDEZ-VOUS
         ==================================================== */}
            {activeSection === 'appointments' && (
               <div className="max-w-5xl mx-auto animate-fade-in-up">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
                     <h2 className="font-display text-4xl font-bold text-brand-dark">Mes Rendez-vous</h2>
                  </div>

                  {/* Upcoming Appointment */}
                  <div className="space-y-6 mb-10">
                     <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Prochain rendez-vous</h3>
                     <div className="bg-white rounded-[2rem] border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.06)] p-6 md:p-8">
                        <div className="flex flex-col md:flex-row md:items-center gap-6">
                           <div className="flex items-center gap-4 flex-1">
                              <div className="w-14 h-14 bg-brand-primary/10 rounded-2xl flex items-center justify-center">
                                 <Calendar size={28} className="text-brand-primary" />
                              </div>
                              <div>
                                 <p className="text-xs text-green-600 font-bold uppercase tracking-wider mb-1 flex items-center gap-1"><CheckCircle2 size={12} /> Confirmé</p>
                                 <h4 className="font-display font-bold text-xl text-brand-dark">Garage MecaExpert</h4>
                                 <p className="text-sm text-gray-500 mt-0.5">Suite au diagnostic du 24 Oct 2023 — Code P0303</p>
                              </div>
                           </div>
                           <div className="flex items-center gap-6 text-sm font-bold text-gray-600">
                              <div className="flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-lg border border-gray-100">
                                 <Calendar size={16} className="text-brand-primary" />
                                 <span>Lun. 30 Oct 2023</span>
                              </div>
                              <div className="flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-lg border border-gray-100">
                                 <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-brand-primary"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
                                 <span>09:30</span>
                              </div>
                           </div>
                           <div className="flex gap-3">
                              <button className="bg-brand-primary text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow-md shadow-brand-primary/20 hover:bg-brand-light transition-all">
                                 Modifier
                              </button>
                              <button className="bg-white border border-red-200 text-red-500 px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-red-50 transition-all">
                                 Annuler
                              </button>
                           </div>
                        </div>
                     </div>
                  </div>

                  {/* Past Appointments */}
                  <div className="space-y-6 mb-10">
                     <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Historique</h3>
                     <div className="flex flex-col gap-4">
                        {[
                           { garage: 'Garage du Port', date: '15 Sep 2023', time: '14:00', status: 'completed', diagnostic: 'Révision complète' },
                           { garage: 'Garage Speedy', date: '02 Juil 2023', time: '10:30', status: 'completed', diagnostic: 'Changement plaquettes de frein' },
                        ].map((rdv, i) => (
                           <div key={i} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex flex-col md:flex-row md:items-center gap-4">
                              <div className="flex items-center gap-3 flex-1">
                                 <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center">
                                    <CheckCircle2 size={18} className="text-green-500" />
                                 </div>
                                 <div>
                                    <h4 className="font-bold text-brand-dark text-sm">{rdv.garage}</h4>
                                    <p className="text-xs text-gray-500">{rdv.diagnostic}</p>
                                 </div>
                              </div>
                              <div className="flex items-center gap-4 text-xs font-bold text-gray-500">
                                 <span className="flex items-center gap-1.5"><Calendar size={12} className="text-gray-400" /> {rdv.date}</span>
                                 <span className="flex items-center gap-1.5">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
                                    {rdv.time}
                                 </span>
                                 <span className="bg-green-50 text-green-600 px-2 py-0.5 rounded-md border border-green-100">Terminé</span>
                              </div>
                           </div>
                        ))}
                     </div>
                  </div>

                  {/* Book a new appointment — Map + Garage List */}
                  <div className="space-y-4">
                     <h3 className="font-display text-xl font-bold text-brand-dark flex items-center gap-3">
                        <div className="w-10 h-10 bg-brand-primary/10 rounded-xl flex items-center justify-center">
                           <MapPin size={20} className="text-brand-primary" />
                        </div>
                        Prendre un nouveau rendez-vous
                     </h3>
                     <p className="text-sm text-gray-500">Sélectionnez un garage sur la carte ou dans la liste pour prendre rendez-vous.</p>

                     <div className="flex flex-col lg:flex-row gap-0 rounded-2xl overflow-hidden border border-gray-200 shadow-md" style={{ minHeight: '450px' }}>
                        {/* Sidebar: Garage List */}
                        <div className="w-full lg:w-[340px] bg-white border-r border-gray-100 flex flex-col shrink-0 z-20">
                           <div className="p-4 border-b border-gray-100 bg-gray-50">
                              <h4 className="text-sm font-bold text-brand-primary">Garages à proximité</h4>
                              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mt-0.5">{MOCK_GARAGES.length} disponibles</p>
                           </div>
                           <div className="flex-1 overflow-y-auto">
                              {MOCK_GARAGES.map(garage => (
                                 <div
                                    key={garage.id}
                                    onClick={() => setSelectedGarageId(selectedGarageId === garage.id ? null : garage.id)}
                                    className={`p-4 border-b border-gray-50 cursor-pointer transition-all relative overflow-hidden group ${selectedGarageId === garage.id ? 'bg-brand-primary/5' : 'hover:bg-gray-50'}`}
                                 >
                                    <div className={`absolute left-0 top-0 bottom-0 w-1 transition-all ${selectedGarageId === garage.id ? 'bg-brand-primary scale-y-100' : 'bg-transparent scale-y-0 group-hover:bg-gray-200 group-hover:scale-y-100'}`} />
                                    <div className="flex justify-between items-start mb-1">
                                       <h5 className={`font-bold text-sm transition-colors ${selectedGarageId === garage.id ? 'text-brand-primary' : 'text-brand-dark'}`}>{garage.name}</h5>
                                       <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md border ${selectedGarageId === garage.id ? 'bg-white text-brand-primary border-brand-primary/20' : 'bg-gray-100 text-gray-500 border-transparent'}`}>{garage.distance}</span>
                                    </div>
                                    <div className="flex items-center gap-1.5 mb-2">
                                       <Star size={12} className="text-yellow-500 fill-yellow-500" />
                                       <span className="text-xs font-bold text-yellow-600">{garage.rating}</span>
                                       <span className="text-[10px] text-gray-400 ml-1">(124 avis)</span>
                                    </div>
                                    <div className="text-xs bg-white px-3 py-2 rounded-lg border border-gray-100 flex items-center justify-between">
                                       <div className="flex items-center gap-1.5">
                                          <Calendar size={12} className="text-brand-primary" />
                                          <span className="font-bold text-gray-600">Prochaine dispo</span>
                                       </div>
                                       <span className="text-orange-600 font-bold bg-orange-50 px-2 py-0.5 rounded text-[10px]">{garage.nextAvailability}</span>
                                    </div>
                                    {selectedGarageId === garage.id && (
                                       <div className="mt-3 flex gap-2">
                                          <button onClick={() => setBookingGarageId(garage.id)} className="flex-1 bg-brand-primary text-white py-2.5 rounded-xl text-xs font-bold shadow-md shadow-brand-primary/20 hover:bg-brand-light transition-all flex items-center justify-center gap-1.5">
                                             <Calendar size={14} /> Prendre RDV
                                          </button>
                                          <button onClick={() => setViewingGarageProfileId(garage.id)} className="flex-1 bg-white border border-gray-200 text-gray-600 py-2.5 rounded-xl text-xs font-bold hover:border-brand-primary/30 transition-all flex items-center justify-center gap-1.5">
                                             <User size={14} /> Fiche
                                          </button>
                                       </div>
                                    )}
                                 </div>
                              ))}
                           </div>
                        </div>

                        {/* Interactive Map */}
                        <div className="flex-1 bg-gray-100 relative z-10 min-h-[300px]">
                           <MapContainer
                              center={USER_COORDS}
                              zoom={13}
                              style={{ height: '100%', width: '100%' }}
                              zoomControl={false}
                           >
                              <TileLayer
                                 attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                                 url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
                              />
                              <MapFlyTo coords={selectedGarageId ? (() => { const g = MOCK_GARAGES.find(g => g.id === selectedGarageId); return g ? [g.lat, g.lng] as [number, number] : null; })() : null} />
                              <Marker position={USER_COORDS} icon={createUserIcon()} />
                              {MOCK_GARAGES.map(garage => (
                                 <Marker
                                    key={garage.id}
                                    position={[garage.lat, garage.lng]}
                                    icon={createGarageIcon(selectedGarageId === garage.id)}
                                    eventHandlers={{ click: () => setSelectedGarageId(garage.id) }}
                                 />
                              ))}
                           </MapContainer>

                           {/* Selected Garage Info Overlay */}
                           {selectedGarageId && (() => {
                              const g = MOCK_GARAGES.find(g => g.id === selectedGarageId);
                              if (!g) return null;
                              return (
                                 <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-md p-4 rounded-2xl shadow-xl z-[400] border border-gray-100 min-w-[200px]">
                                    <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 pb-2 border-b border-gray-100">Sélectionné</div>
                                    <h4 className="font-bold text-brand-dark text-sm mb-1">{g.name}</h4>
                                    <div className="flex items-center gap-3 text-xs">
                                       <div className="flex items-center gap-1.5">
                                          <Navigation size={12} className="text-brand-primary" />
                                          <span className="font-bold text-gray-600">{g.distance}</span>
                                       </div>
                                       <div className="flex items-center gap-1.5">
                                          <Star size={12} className="text-yellow-500 fill-yellow-500" />
                                          <span className="font-bold text-gray-600">{g.rating}</span>
                                       </div>
                                    </div>
                                 </div>
                              );
                           })()}
                        </div>
                     </div>
                  </div>
               </div>
            )}

            {/* ===================================================
            SECTION: MON PROFIL (SETTINGS)
         ==================================================== */}
            {activeSection === 'settings' && (
               <div className="max-w-4xl mx-auto animate-fade-in-up space-y-8">
                  <h2 className="font-display text-3xl font-bold text-brand-dark">Mon Profil</h2>

                  {/* Profile Card */}
                  <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100 p-8">
                     <div className="flex flex-col md:flex-row md:items-center gap-6 mb-8 pb-8 border-b border-gray-100">
                        <div className="w-20 h-20 bg-gradient-to-br from-brand-primary to-blue-600 rounded-2xl flex items-center justify-center text-white text-3xl font-bold shadow-lg shadow-brand-primary/20">
                           {MOCK_USER.name.charAt(0)}
                        </div>
                        <div className="flex-1">
                           <h3 className="font-display text-2xl font-bold text-brand-dark">{MOCK_USER.name}</h3>
                           <p className="text-sm text-gray-500 mt-1">Membre depuis Janvier 2023</p>
                           <div className="flex flex-wrap items-center gap-3 mt-3">
                              <span className="text-xs font-bold bg-brand-primary/10 text-brand-primary px-3 py-1 rounded-lg">Conducteur</span>
                              <span className="text-xs font-bold bg-green-50 text-green-600 px-3 py-1 rounded-lg border border-green-100 flex items-center gap-1"><CheckCircle2 size={12} /> Compte vérifié</span>
                           </div>
                        </div>
                        <button className="bg-brand-primary text-white px-6 py-3 rounded-xl font-bold text-sm shadow-md shadow-brand-primary/20 hover:bg-brand-light transition-all">
                           Modifier le profil
                        </button>
                     </div>

                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {[
                           { icon: MapPin, label: 'Email', value: 'alexandre.dupont@email.com' },
                           { icon: Car, label: 'Téléphone', value: '06 12 34 56 78' },
                        ].map((item, i) => (
                           <div key={i} className="bg-gray-50 rounded-xl p-4 border border-gray-100 flex items-center gap-4">
                              <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm border border-gray-100 shrink-0">
                                 <item.icon size={18} className="text-brand-primary" />
                              </div>
                              <div>
                                 <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">{item.label}</p>
                                 <p className="text-sm font-bold text-brand-dark">{item.value}</p>
                              </div>
                           </div>
                        ))}
                     </div>
                  </div>

                  {/* My Vehicle */}
                  <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100 p-8">
                     <h3 className="font-display text-xl font-bold text-brand-dark mb-6 flex items-center gap-3">
                        <div className="w-10 h-10 bg-brand-primary/10 rounded-xl flex items-center justify-center">
                           <Car size={20} className="text-brand-primary" />
                        </div>
                        Mon Véhicule
                     </h3>
                     <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl border border-gray-100 p-6">
                        <div className="flex flex-col md:flex-row md:items-center gap-6">
                           <div className="w-24 h-24 bg-white rounded-2xl border border-gray-100 flex items-center justify-center shadow-sm">
                              <Car size={48} className="text-gray-300" />
                           </div>
                           <div className="flex-1 space-y-3">
                              <h4 className="font-display text-xl font-bold text-brand-dark">{MOCK_USER.vehicle}</h4>
                              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                 {[
                                    { label: 'Immatriculation', value: MOCK_USER.plate },
                                    { label: 'Kilométrage', value: '85 420 km' },
                                    { label: 'Motorisation', value: 'Diesel 1.5 BlueHDi' },
                                    { label: 'Diagnostics', value: `${MOCK_REPORTS.length} effectués` },
                                 ].map((info, i) => (
                                    <div key={i}>
                                       <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">{info.label}</p>
                                       <p className="text-sm font-bold text-brand-dark mt-0.5">{info.value}</p>
                                    </div>
                                 ))}
                              </div>
                           </div>
                           <button className="bg-white border border-gray-200 px-5 py-2.5 rounded-xl text-sm font-bold text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-all shadow-sm shrink-0">
                              Modifier
                           </button>
                        </div>
                     </div>
                  </div>

                  {/* Preferences */}
                  <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100 p-8">
                     <h3 className="font-display text-xl font-bold text-brand-dark mb-6 flex items-center gap-3">
                        <div className="w-10 h-10 bg-brand-primary/10 rounded-xl flex items-center justify-center">
                           <Settings size={20} className="text-brand-primary" />
                        </div>
                        Préférences & Notifications
                     </h3>
                     <div className="space-y-4">
                        {[
                           { title: 'Notifications par email', desc: 'Recevoir les mises à jour de diagnostic et les offres de garagistes par email.', enabled: true },
                           { title: 'Notifications SMS', desc: 'Recevoir des alertes SMS pour les rendez-vous et les rappels importants.', enabled: true },
                           { title: 'Offres promotionnelles', desc: 'Recevoir des offres spéciales de nos partenaires garagistes.', enabled: false },
                           { title: 'Rappels d\'entretien', desc: 'Recevoir des rappels automatiques pour l\'entretien périodique de votre véhicule.', enabled: true },
                        ].map((pref, i) => (
                           <div key={i} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-100 hover:bg-gray-100/50 transition-colors">
                              <div className="flex-1 pr-6">
                                 <h4 className="font-bold text-sm text-brand-dark">{pref.title}</h4>
                                 <p className="text-xs text-gray-500 mt-0.5">{pref.desc}</p>
                              </div>
                              <div className={`w-12 h-7 rounded-full relative cursor-pointer transition-colors ${pref.enabled ? 'bg-brand-primary' : 'bg-gray-300'
                                 }`}>
                                 <div className={`absolute top-0.5 w-6 h-6 bg-white rounded-full shadow-sm transition-all ${pref.enabled ? 'left-[22px]' : 'left-0.5'
                                    }`}></div>
                              </div>
                           </div>
                        ))}
                     </div>
                  </div>

                  {/* Danger Zone */}
                  <div className="bg-white rounded-[2rem] shadow-sm border border-red-100 p-8">
                     <h3 className="font-display text-xl font-bold text-red-600 mb-4">Zone dangereuse</h3>
                     <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                           <p className="text-sm text-gray-700 font-medium">Supprimer mon compte</p>
                           <p className="text-xs text-gray-500 mt-0.5">Cette action est irréversible. Toutes vos données seront définitivement supprimées.</p>
                        </div>
                        <button className="bg-white border border-red-200 text-red-500 px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-red-50 transition-all shrink-0">
                           Supprimer mon compte
                        </button>
                     </div>
                  </div>
               </div>
            )}

         </main>

         {/* ===================================================
             BOOKING MODAL OVERLAY
         ==================================================== */}
         {bookingGarageId && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
               <div className="bg-white rounded-[2.5rem] w-full max-w-4xl shadow-2xl overflow-hidden flex flex-col relative max-h-[90vh]">

                  {/* Close button */}
                  <button onClick={() => { setBookingGarageId(null); setBookingSuccess(false); setVerifyingBook(false); }} className="absolute top-4 right-4 w-10 h-10 bg-slate-50 flex items-center justify-center rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors z-20">
                     <X className="w-5 h-5" strokeWidth={2.5} />
                  </button>

                  <div className="p-8 md:p-10 overflow-y-auto">
                     {bookingSuccess ? (
                        <div className="flex flex-col items-center justify-center text-center py-12">
                           <div className="bg-gradient-to-br from-green-500 to-emerald-600 p-8 rounded-[2.5rem] mb-8 shadow-2xl shadow-green-500/30 rotate-3 animate-fade-in-up">
                              <CheckCircle className="w-16 h-16 text-white" />
                           </div>
                           <h2 className="text-4xl md:text-5xl font-black text-brand-dark mb-4 tracking-tight animate-fade-in-up" style={{ transitionDelay: '100ms' }}>
                              Rendez-vous fixé
                           </h2>
                           <p className="text-lg text-slate-500 mb-12 max-w-xl leading-relaxed animate-fade-in-up" style={{ transitionDelay: '200ms' }}>
                              Confirmation transmise au garage sélectionné. Un SMS de rappel vous a été envoyé.
                           </p>
                           <button onClick={() => { setBookingGarageId(null); setBookingSuccess(false); setActiveSection('appointments'); }} className="bg-brand-primary text-white px-8 py-3.5 rounded-xl font-bold shadow-lg hover:-translate-y-0.5 transition-all">
                              Voir mes rendez-vous
                           </button>
                        </div>
                     ) : (
                        <div className="flex flex-col gap-8">
                           {/* Info Garage Selected */}
                           <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-100 pb-6">
                              <div>
                                 <h2 className="text-3xl font-black text-brand-dark tracking-tight">Planifiez votre rendez-vous</h2>
                                 <p className="text-slate-500 mt-2">Choisissez un créneau disponible chez ce partenaire.</p>
                              </div>
                           </div>

                           <div className="flex flex-col lg:flex-row gap-6">
                              {/* Left: Slot Selection */}
                              <div className="flex-1 bg-gray-50 p-6 rounded-3xl border border-gray-100 flex flex-col">
                                 <h3 className="text-lg font-black text-brand-dark flex items-center gap-2 mb-6">
                                    <div className="w-8 h-8 rounded-xl bg-brand-primary/10 flex items-center justify-center text-brand-primary"><Calendar size={18} /></div>
                                    1. Créneau
                                 </h3>

                                 <div className="grid grid-cols-3 gap-2 mb-6">
                                    {dates.map((d) => (
                                       <button
                                          key={d.val}
                                          onClick={() => { if (d.val !== 'other') setSelectedDate(d.val); }}
                                          className={`py-3 px-2 rounded-xl border-2 text-xs font-bold transition-all truncate origin-center ${selectedDate === d.val ? 'bg-brand-primary text-white border-brand-primary shadow-md' : 'bg-white text-slate-500 border-gray-200 hover:border-gray-300'}`}
                                       >
                                          {d.label}
                                       </button>
                                    ))}
                                 </div>

                                 <div className="grid grid-cols-4 gap-2">
                                    {times.map((t) => (
                                       <button
                                          key={t}
                                          disabled={!selectedDate}
                                          onClick={() => { setSelectedTime(t); setBookingStep('FORM'); }}
                                          className={`p-2 py-3 rounded-xl border-2 text-sm font-bold transition-all ${selectedTime === t ? 'bg-[#0094A7] text-white border-[#0094A7] shadow-md' : 'bg-white text-slate-600 border-gray-200 hover:border-gray-300'} disabled:opacity-40 disabled:cursor-not-allowed`}
                                       >
                                          {t}
                                       </button>
                                    ))}
                                 </div>
                              </div>

                              {/* Right: Details */}
                              <div className="flex-[1.2] bg-gray-50 p-6 rounded-3xl border border-gray-100 flex flex-col">
                                 <h3 className="text-lg font-black text-brand-dark flex items-center gap-2 mb-6">
                                    <div className="w-8 h-8 rounded-xl bg-brand-primary/10 flex items-center justify-center text-brand-primary"><FileText size={18} /></div>
                                    2. Détails (Optionnel)
                                 </h3>

                                 <div className="space-y-4 flex-1">
                                    <div>
                                       <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 mb-2 block">Symptômes rencontrés</label>
                                       <div className="flex flex-wrap gap-2">
                                          {commonSymptoms.map(symptom => (
                                             <button
                                                key={symptom}
                                                onClick={() => toggleSymptom(symptom)}
                                                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all border-2 ${selectedSymptoms.includes(symptom) ? 'bg-brand-primary border-brand-primary text-white shadow-md' : 'bg-white border-gray-200 text-slate-600 hover:border-gray-300'}`}
                                             >
                                                {symptom}
                                             </button>
                                          ))}
                                       </div>
                                    </div>
                                    <div className="pt-2">
                                       <textarea
                                          rows={3}
                                          value={otherObservations}
                                          onChange={(e) => setOtherObservations(e.target.value)}
                                          placeholder="Précisez votre problème (ex: bruit de claquement)..."
                                          className="w-full bg-white border border-gray-200 rounded-xl p-3 text-sm focus:outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 transition-all resize-none shadow-sm"
                                       />
                                    </div>
                                 </div>
                              </div>
                           </div>

                           <div className="flex justify-end pt-4 border-t border-gray-100">
                              <button
                                 disabled={!selectedDate || !selectedTime}
                                 onClick={() => setVerifyingBook(true)}
                                 className="bg-brand-dark text-white px-8 py-4 rounded-xl font-bold shadow-lg hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                              >
                                 <CheckCircle size={18} /> Confirmer le Rendez-vous
                              </button>
                           </div>
                        </div>
                     )}
                  </div>
               </div>
            </div>
         )}

         {/* Garage Profile Modal */}
         {viewingGarageProfileId && (() => {
            const garage = MOCK_GARAGES.find(g => g.id === viewingGarageProfileId);
            if (!garage) return null;

            return (
               <div className="fixed inset-0 z-[120] flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4 md:p-6 lg:p-8">
                  <div className="bg-white rounded-[2.5rem] w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl relative flex flex-col animate-scale-up border border-white">
                     {/* Close Button */}
                     <button
                        onClick={() => setViewingGarageProfileId(null)}
                        className="absolute top-6 right-6 w-10 h-10 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-full flex items-center justify-center transition-colors z-10"
                     >
                        <X size={20} />
                     </button>

                     {/* Header Info */}
                     <div className="p-8 pb-6 border-b border-gray-100 bg-gray-50/50">
                        <div className="flex items-center gap-5 mb-4">
                           <div className="w-16 h-16 bg-white border border-gray-100 rounded-2xl flex items-center justify-center shadow-sm">
                              <Wrench className="text-brand-primary" size={28} />
                           </div>
                           <div>
                              <h2 className="font-display text-2xl font-black text-brand-dark">{garage.name}</h2>
                              <div className="flex items-center gap-3 mt-1.5 text-sm">
                                 <span className="flex items-center gap-1 text-yellow-600 font-bold bg-yellow-50 px-2.5 py-1 rounded-lg">
                                    <Star size={14} fill="currentColor" /> {garage.rating}
                                 </span>
                                 <span className="text-gray-500 flex items-center gap-1.5">
                                    <MapPin size={14} /> {garage.distance}
                                 </span>
                              </div>
                           </div>
                        </div>
                     </div>

                     {/* Body Details */}
                     <div className="p-8 space-y-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                           <div className="space-y-4 text-sm">
                              <div className="flex items-start gap-3">
                                 <div className="w-8 h-8 rounded-full bg-brand-primary/10 flex items-center justify-center text-brand-primary shrink-0">
                                    <MapPin size={16} />
                                 </div>
                                 <div>
                                    <p className="font-bold text-gray-700">Adresse</p>
                                    <p className="text-gray-500 mt-0.5">{garage.address}</p>
                                 </div>
                              </div>
                              <div className="flex items-start gap-3">
                                 <div className="w-8 h-8 rounded-full bg-brand-primary/10 flex items-center justify-center text-brand-primary shrink-0">
                                    <Phone size={16} />
                                 </div>
                                 <div>
                                    <p className="font-bold text-gray-700">Téléphone</p>
                                    <p className="text-gray-500 mt-0.5">{garage.phone}</p>
                                 </div>
                              </div>
                           </div>
                           <div className="space-y-4 text-sm">
                              <div className="flex items-start gap-3">
                                 <div className="w-8 h-8 rounded-full bg-brand-primary/10 flex items-center justify-center text-brand-primary shrink-0">
                                    <Calendar size={16} />
                                 </div>
                                 <div>
                                    <p className="font-bold text-gray-700">Horaires</p>
                                    <p className="text-gray-500 mt-0.5">{garage.hours}</p>
                                 </div>
                              </div>
                           </div>
                        </div>

                        {/* Map Preview */}
                        <div className="rounded-2xl overflow-hidden border border-gray-100 h-48 bg-gray-100 relative">
                           <div className="absolute inset-0 flex items-center justify-center text-gray-400 font-medium">
                              [Carte de {garage.name}]
                           </div>
                           <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-white/90 to-transparent p-4 pb-3">
                              <p className="text-xs font-bold text-brand-dark">{garage.address}</p>
                           </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-4 pt-4 border-t border-gray-100">
                           <button
                              onClick={() => { setViewingGarageProfileId(null); setBookingGarageId(garage.id); }}
                              className="flex-1 bg-brand-primary text-white py-4 rounded-xl font-bold shadow-md hover:-translate-y-0.5 transition-all text-sm"
                           >
                              Prendre Rendez-vous
                           </button>
                           <a href={`tel:${garage.phone.replace(/\s/g, '')}`} className="flex-1 bg-white border-2 border-slate-200 text-slate-700 py-4 rounded-xl font-bold hover:border-brand-primary transition-all text-sm flex items-center justify-center gap-2">
                              <Phone size={16} /> Appeler
                           </a>
                        </div>
                     </div>
                  </div>
               </div>
            );
         })()}

         {/* SMS Verification Modal Layer */}
         {verifyingBook && (
            <div className="fixed inset-0 z-[110] flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-6">
               <div className="bg-white rounded-[2.5rem] p-10 w-full max-w-md shadow-2xl text-center relative border border-white">
                  <div className="w-16 h-16 rounded-2xl bg-brand-primary/10 flex items-center justify-center text-brand-primary mx-auto mb-6">
                     <Phone size={28} />
                  </div>
                  <h3 className="text-2xl font-black text-brand-dark mb-2">Vérification SMS</h3>
                  <p className="text-slate-500 leading-relaxed mb-8">
                     Un code à 4 chiffres a été envoyé au numéro de votre compte. Saisissez-le ci-dessous.
                  </p>

                  <input
                     type="text"
                     inputMode="numeric"
                     maxLength={4}
                     value={smsCode}
                     onChange={(e) => { setSmsCode(e.target.value.replace(/\D/g, '')); setCodeError(false); }}
                     placeholder="• • • •"
                     className={`w-full text-center text-4xl font-black tracking-[1rem] bg-slate-50 border-2 rounded-2xl px-6 py-5 mb-3 focus:outline-none transition-all ${codeError ? 'border-red-400 text-red-500 shake' : 'border-slate-200 focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20'}`}
                  />
                  {codeError && <p className="text-red-500 text-sm font-bold mb-4">Code incorrect. Réessayez. <span className="text-slate-400 font-normal">(Démo: 1234)</span></p>}

                  <div className="flex flex-col gap-3 mt-6">
                     <button
                        disabled={smsCode.length !== 4}
                        onClick={() => {
                           if (smsCode === MOCK_CODE) {
                              setVerifyingBook(false);
                              setBookingSuccess(true);
                           } else {
                              setCodeError(true);
                              setSmsCode('');
                           }
                        }}
                        className="w-full bg-brand-primary text-white py-4 rounded-xl font-bold text-lg shadow-lg hover:bg-brand-light transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                     >
                        <CheckCircle size={20} /> Valider
                     </button>
                     <button onClick={() => { setVerifyingBook(false); setSmsCode(''); setCodeError(false); }} className="text-sm font-bold text-slate-400 hover:text-slate-600 py-2">
                        Annuler
                     </button>
                  </div>
               </div>
            </div>
         )}
      </div>
   );
};

export default MotoristDashboard;