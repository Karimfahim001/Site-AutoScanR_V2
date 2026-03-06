import React, { useState } from 'react';
import { Search, PlayCircle, BookOpen, AlertTriangle, ChevronRight, Filter, Video, FileText, Image } from 'lucide-react';
import { ViewState } from '../types';

interface MediationCenterProps {
  setView: (view: ViewState) => void;
}

const CATEGORIES = [
  { id: 'all', label: 'Tout voir' },
  { id: 'engine', label: 'Moteur & Voyants' },
  { id: 'brakes', label: 'Freinage' },
  { id: 'battery', label: 'Batterie & Élec' },
  { id: 'buying', label: 'Achat/Vente' },
];

const CONTENT = [
  {
    id: 1,
    category: 'engine',
    type: 'video',
    title: "Le voyant moteur clignote : Arrêt immédiat ?",
    desc: "Comprendre la différence entre un voyant fixe et un voyant clignotant. Les risques pour le catalyseur.",
    duration: "3 min",
    image: "https://images.unsplash.com/photo-1487754180451-c456f719a1fc?auto=format&fit=crop&q=80"
  },
  {
    id: 2,
    category: 'brakes',
    type: 'guide',
    title: "Disques et Plaquettes : Le guide illustré",
    desc: "Comment vérifier l'usure visuellement sans démonter la roue. Les bruits qui ne trompent pas.",
    duration: "5 min lecture",
    image: "https://images.unsplash.com/photo-1486262715619-01b80250e0dc?auto=format&fit=crop&q=80"
  },
  {
    id: 3,
    category: 'battery',
    type: 'article',
    title: "Pourquoi ma batterie meurt en hiver ?",
    desc: "La chimie expliquée simplement. Comment la préserver et utiliser un booster.",
    duration: "4 min lecture",
    image: "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&q=80"
  },
  {
    id: 4,
    category: 'buying',
    type: 'video',
    title: "Achat d'occasion : Les 5 points invisibles",
    desc: "Ce que le vendeur ne vous dira pas mais que la prise OBD sait.",
    duration: "8 min",
    image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&q=80"
  },
   {
    id: 5,
    category: 'engine',
    type: 'comic',
    title: "L'EGR expliquée en BD",
    desc: "Pourquoi cette vanne s'encrasse et comment l'éviter en conduisant.",
    duration: "BD Interactive",
    image: "https://images.unsplash.com/photo-1580273916550-e323be2f8160?auto=format&fit=crop&q=80"
  },
];

const MediationCenter: React.FC<MediationCenterProps> = ({ setView }) => {
  const [activeCat, setActiveCat] = useState('all');
  const [search, setSearch] = useState('');

  const filteredContent = CONTENT.filter(c => 
    (activeCat === 'all' || c.category === activeCat) &&
    (c.title.toLowerCase().includes(search.toLowerCase()) || c.desc.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      {/* Header */}
      <div className="bg-brand-dark text-white pb-24 pt-12 px-4 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-primary/20 rounded-full blur-[80px]"></div>
        <div className="max-w-7xl mx-auto text-center relative z-10">
           <span className="text-brand-accent font-bold uppercase tracking-wider text-sm">Centre de connaissances</span>
           <h1 className="font-display text-4xl md:text-5xl font-bold mt-2 mb-6">Comprendre pour mieux rouler</h1>
           <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-10">
             Une bibliothèque de ressources simples pour décrypter la mécanique, éviter les arnaques et entretenir votre véhicule comme un pro.
           </p>
           
           <div className="max-w-2xl mx-auto relative">
             <input 
              type="text" 
              placeholder="Rechercher un problème (ex: fumée blanche, bruit frein...)" 
              className="w-full pl-12 pr-4 py-4 rounded-xl text-brand-dark focus:outline-none focus:ring-4 focus:ring-brand-primary/30 shadow-lg"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
             />
             <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
           </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 -mt-16 relative z-20 pb-20">
        
        {/* Categories */}
        <div className="flex overflow-x-auto gap-3 pb-8 scrollbar-hide">
          {CATEGORIES.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveCat(cat.id)}
              className={`whitespace-nowrap px-6 py-3 rounded-full font-medium transition-all shadow-sm ${
                activeCat === cat.id 
                ? 'bg-brand-primary text-white shadow-brand-primary/30' 
                : 'bg-white text-gray-600 hover:bg-gray-100'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Content Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredContent.map(item => (
            <div key={item.id} className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex flex-col h-full cursor-pointer">
              <div className="relative h-48 overflow-hidden">
                <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors"></div>
                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur text-brand-dark text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1">
                   {item.type === 'video' && <Video size={12}/>}
                   {item.type === 'guide' && <BookOpen size={12}/>}
                   {item.type === 'comic' && <Image size={12}/>}
                   {item.type === 'article' && <FileText size={12}/>}
                   <span className="capitalize">{item.type}</span>
                </div>
                {item.type === 'video' && (
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                     <div className="bg-brand-primary text-white rounded-full p-3 shadow-lg transform scale-90 group-hover:scale-100 transition-transform">
                        <PlayCircle size={32} fill="currentColor" />
                     </div>
                  </div>
                )}
              </div>
              
              <div className="p-6 flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-3">
                   <span className="text-xs font-bold text-brand-primary uppercase tracking-wide">{CATEGORIES.find(c => c.id === item.category)?.label}</span>
                   <span className="text-xs text-gray-400 flex items-center gap-1">{item.duration}</span>
                </div>
                <h3 className="font-display font-bold text-xl text-brand-dark mb-3 group-hover:text-brand-primary transition-colors line-clamp-2">{item.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-6 flex-1">{item.desc}</p>
                
                <div className="pt-4 border-t border-gray-100 flex items-center text-brand-dark font-bold text-sm group-hover:translate-x-1 transition-transform">
                   Lire le contenu <ChevronRight size={16} className="ml-1 text-brand-primary"/>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {filteredContent.length === 0 && (
           <div className="text-center py-20 text-gray-400">
              <AlertTriangle className="mx-auto mb-4 w-12 h-12 opacity-50"/>
              <p>Aucun contenu ne correspond à votre recherche.</p>
           </div>
        )}

      </div>
    </div>
  );
};

export default MediationCenter;