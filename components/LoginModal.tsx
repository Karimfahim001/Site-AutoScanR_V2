import React from 'react';
import { X, User, Wrench, ArrowRight } from 'lucide-react';
import { ViewState } from '../types';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (view: ViewState) => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose, onSelect }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop with extreme blur and dark overlay */}
      <div 
        className="absolute inset-0 bg-brand-dark/60 backdrop-blur-xl transition-opacity duration-500 ease-out"
        onClick={onClose}
      />
      
      {/* Modal Container */}
      <div className="relative bg-white/90 backdrop-blur-2xl rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.3)] border border-white/20 w-full max-w-2xl overflow-hidden animate-fade-in-up">
        {/* Decorative elements */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-brand-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-brand-accent/10 rounded-full blur-3xl"></div>

        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2.5 bg-gray-100/50 hover:bg-white hover:shadow-md rounded-full text-gray-500 hover:text-brand-dark transition-all duration-300 z-10 group"
        >
          <X size={20} className="group-hover:rotate-90 transition-transform duration-300" />
        </button>

        <div className="p-10 relative z-10">
          <div className="text-center mb-10">
            <h2 className="font-display text-4xl font-extrabold text-brand-dark mb-3 tracking-tight">Bienvenue sur <span className="text-brand-primary">AutoScanR</span></h2>
            <p className="text-gray-500 text-lg font-light">Choisissez votre univers pour continuer l'aventure.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Motorist Card */}
            <button
              onClick={() => onSelect(ViewState.MOTORIST_LOGIN)}
              className="group relative p-8 rounded-[2rem] border-2 border-transparent bg-white shadow-sm hover:shadow-2xl hover:border-brand-primary/30 transition-all duration-500 text-left flex flex-col h-full overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              
              <div className="w-14 h-14 bg-blue-50 text-brand-primary rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 relative z-10">
                <User size={28} />
              </div>
              
              <div className="relative z-10">
                <h3 className="font-display text-2xl font-bold text-brand-dark mb-3 group-hover:text-brand-primary transition-colors">Conducteur</h3>
                <p className="text-sm text-gray-500 leading-relaxed mb-6 font-light">
                  Mes diagnostics, mes rendez-vous et le suivi santé de mes véhicules.
                </p>
                
                <div className="flex items-center text-sm font-bold text-brand-primary translate-x-0 group-hover:translate-x-2 transition-transform duration-300">
                  Accéder à mon espace <ArrowRight size={16} className="ml-2" />
                </div>
              </div>
            </button>

            {/* Garage Card */}
            <button
              onClick={() => onSelect(ViewState.GARAGE_LOGIN)}
              className="group relative p-8 rounded-[2rem] border-2 border-transparent bg-white shadow-sm hover:shadow-2xl hover:border-brand-accent/30 transition-all duration-500 text-left flex flex-col h-full overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-brand-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>

              <div className="w-14 h-14 bg-amber-50 text-brand-accent rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:-rotate-3 transition-all duration-500 relative z-10">
                <Wrench size={28} />
              </div>

              <div className="relative z-10">
                <h3 className="font-display text-2xl font-bold text-brand-dark mb-3 group-hover:text-brand-accent transition-colors">Espace Pro</h3>
                <p className="text-sm text-gray-500 leading-relaxed mb-6 font-light">
                  Gérer les demandes, envoyer des devis et piloter votre activité.
                </p>

                <div className="flex items-center text-sm font-bold text-brand-accent translate-x-0 group-hover:translate-x-2 transition-transform duration-300">
                  Portail partenaire <ArrowRight size={16} className="ml-2" />
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
