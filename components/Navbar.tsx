import React, { useState, useEffect } from 'react';
import { Menu, X, Car, Wrench, User, LogOut } from 'lucide-react';
import { ViewState } from '../types';

interface NavbarProps {
  currentView: ViewState;
  setView: (view: ViewState) => void;
  userRole: 'motorist' | 'garage' | null;
  setUserRole: (role: 'motorist' | 'garage' | null) => void;
}

const Navbar: React.FC<NavbarProps> = ({ currentView, setView, userRole, setUserRole }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showLoginSelection, setShowLoginSelection] = useState(false);

  const isLoggedIn = userRole !== null;
  const isLightHeader = currentView === ViewState.MOTORIST_LOGIN || currentView === ViewState.MOTORIST_DASHBOARD || currentView === ViewState.GARAGE_DASHBOARD;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNav = (view: ViewState) => {
    setView(view);
    setIsOpen(false);
    window.scrollTo(0, 0);
  };

  const handleLogout = () => {
    setUserRole(null);
    handleNav(ViewState.HOME);
  };

  const handleMySpace = () => {
    if (userRole === 'motorist') handleNav(ViewState.MOTORIST_DASHBOARD);
    if (userRole === 'garage') handleNav(ViewState.GARAGE_DASHBOARD);
  };

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'glass-dark shadow-lg py-2' : 'bg-transparent py-4'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <div className="flex items-center cursor-pointer group" onClick={() => handleNav(ViewState.HOME)}>
            <div className="flex-shrink-0 flex items-center">
              <img src="/logo.png" alt="AutoScanR Logo" className="h-10 w-auto transition-transform duration-300 group-hover:scale-105" />
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-6">
              <button onClick={() => handleNav(ViewState.HOME)} className={`${isLightHeader && !scrolled ? 'text-gray-600 hover:text-brand-dark' : 'text-gray-200 hover:text-white'} text-sm font-medium transition-colors`}>Accueil</button>
              <button onClick={() => handleNav(ViewState.ABOUT_US)} className={`${isLightHeader && !scrolled ? 'text-gray-600 hover:text-brand-dark' : 'text-gray-200 hover:text-white'} text-sm font-medium transition-colors`}>Qui sommes-nous ?</button>
              <button onClick={() => handleNav(ViewState.MEDIATION_CENTER)} className={`${isLightHeader && !scrolled ? 'text-gray-600 hover:text-brand-dark' : 'text-gray-200 hover:text-white'} text-sm font-medium transition-colors`}>Médiation</button>
              <div className={`h-6 w-px ${isLightHeader && !scrolled ? 'bg-black/10' : 'bg-white/10'} mx-2`}></div>

              {!isLoggedIn ? (
                <button onClick={() => setShowLoginSelection(true)} className="bg-brand-primary hover:bg-brand-light text-white px-6 py-2.5 rounded-full text-sm font-bold flex items-center gap-2 transition-all shadow-lg hover:shadow-brand-primary/40 transform hover:-translate-y-0.5">
                  <User size={16} /> Connexion
                </button>
              ) : (
                <div className="flex items-center gap-3">
                  <button onClick={handleMySpace} className="bg-brand-primary hover:bg-brand-light text-white px-6 py-2.5 rounded-full text-sm font-bold flex items-center gap-2 transition-all shadow-lg hover:shadow-brand-primary/40 transform hover:-translate-y-0.5">
                    <User size={16} /> Mon Espace
                  </button>
                  <button onClick={handleLogout} className="bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-red-400 px-4 py-2.5 rounded-full text-sm font-medium flex items-center gap-2 transition-all" title="Déconnexion">
                    <LogOut size={16} />
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`inline-flex items-center justify-center p-2 rounded-md ${isLightHeader && !scrolled ? 'text-brand-dark hover:bg-black/5' : 'text-gray-200 hover:text-white hover:bg-white/5'} transition-colors focus:outline-none`}
            >
              {isOpen ? <X className="h-8 w-8" /> : <Menu className="h-8 w-8" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden glass-dark border-t border-white/10 absolute w-full">
          <div className="px-4 pt-2 pb-6 space-y-2 flex flex-col">
            <button onClick={() => handleNav(ViewState.HOME)} className="text-gray-200 hover:text-white hover:bg-white/5 block px-3 py-3 rounded-xl text-base font-medium w-full text-left">Accueil</button>
            <button onClick={() => handleNav(ViewState.ABOUT_US)} className="text-gray-200 hover:text-white hover:bg-white/5 block px-3 py-3 rounded-xl text-base font-medium w-full text-left">Qui sommes-nous ?</button>
            <button onClick={() => handleNav(ViewState.MEDIATION_CENTER)} className="text-gray-200 hover:text-white hover:bg-white/5 block px-3 py-3 rounded-xl text-base font-medium w-full text-left">Médiation & Conseils</button>
            <div className="h-px bg-white/10 my-2"></div>

            {!isLoggedIn ? (
              <button onClick={() => { setIsOpen(false); setShowLoginSelection(true); }} className="bg-brand-primary text-white block px-3 py-3 rounded-xl text-base font-bold w-full text-center shadow-lg">Connexion</button>
            ) : (
              <>
                <button onClick={handleMySpace} className="bg-brand-primary text-white block px-3 py-3 rounded-xl text-base font-bold w-full text-center shadow-lg mb-2">Mon Espace</button>
                <button onClick={handleLogout} className="text-red-400 border border-red-400/30 block px-3 py-3 rounded-xl text-base font-medium w-full text-center">Déconnexion</button>
              </>
            )}
          </div>
        </div>
      )}

      {/* Login Selection Modal */}
      {showLoginSelection && (
        <div className="fixed inset-0 bg-brand-dark/80 backdrop-blur-sm z-[100] flex items-center justify-center p-4 opacity-100 transition-opacity">
          <div className="bg-white rounded-3xl p-8 max-w-2xl w-full relative shadow-2xl animate-fade-in-up">
            <button
              onClick={() => setShowLoginSelection(false)}
              className="absolute top-4 right-4 p-2 bg-gray-100 hover:bg-gray-200 rounded-full text-gray-500 transition-colors"
            >
              <X size={20} />
            </button>

            <div className="text-center mb-8">
              <h2 className="font-display text-3xl font-bold text-brand-dark mb-2">Bienvenue sur AutoScanR</h2>
              <p className="text-gray-500">Choisissez votre espace de connexion pour continuer.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {/* Motorist Option */}
              <button
                onClick={() => {
                  setShowLoginSelection(false);
                  handleNav(ViewState.MOTORIST_LOGIN);
                }}
                className="group p-6 rounded-2xl border-2 border-gray-100 hover:border-brand-primary bg-white hover:bg-brand-primary/5 transition-all text-left flex flex-col h-full"
              >
                <div className="w-12 h-12 bg-blue-100 text-brand-primary rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <User size={24} />
                </div>
                <h3 className="font-display text-xl font-bold text-brand-dark mb-2 group-hover:text-brand-primary transition-colors">Espace Conducteur</h3>
                <p className="text-sm text-gray-500 flex-grow">Consultez vos rapports de diagnostic AutoScanR, trouvez des solutions et contactez des garages.</p>
                <div className="mt-4 flex items-center text-sm font-bold text-brand-primary opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all">
                  Se connecter <span className="ml-1">→</span>
                </div>
              </button>

              {/* Garage Option */}
              <button
                onClick={() => {
                  setShowLoginSelection(false);
                  handleNav(ViewState.GARAGE_LOGIN);
                }}
                className="group p-6 rounded-2xl border-2 border-gray-100 hover:border-brand-accent bg-white hover:bg-brand-accent/5 transition-all text-left flex flex-col h-full"
              >
                <div className="w-12 h-12 bg-amber-100 text-brand-accent rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Wrench size={24} />
                </div>
                <h3 className="font-display text-xl font-bold text-brand-dark mb-2 group-hover:text-brand-accent transition-colors">Espace Pro (Garage)</h3>
                <p className="text-sm text-gray-500 flex-grow">Gérez les demandes de devis, analysez vos statistiques et développez votre activité.</p>
                <div className="mt-4 flex items-center text-sm font-bold text-brand-accent opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all">
                  Se connecter <span className="ml-1">→</span>
                </div>
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;