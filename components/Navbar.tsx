import React, { useState, useEffect } from 'react';
import { Menu, X, Car, Wrench, User, LogOut } from 'lucide-react';
import { ViewState } from '../types';

interface NavbarProps {
  currentView: ViewState;
  setView: (view: ViewState) => void;
}

const Navbar: React.FC<NavbarProps> = ({ currentView, setView }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const isLoggedIn = currentView === ViewState.MOTORIST_DASHBOARD || currentView === ViewState.GARAGE_DASHBOARD;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNav = (view: ViewState) => {
    setView(view);
    setIsOpen(false);
    window.scrollTo(0,0);
  };

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'glass-dark shadow-lg py-2' : 'bg-transparent py-4'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo */}
          <div className="flex items-center cursor-pointer group" onClick={() => handleNav(ViewState.HOME)}>
            <div className="flex-shrink-0 flex items-center gap-2">
              <div className="bg-gradient-to-br from-brand-primary to-blue-600 p-2 rounded-xl shadow-lg group-hover:shadow-brand-primary/50 transition-all duration-300">
                <Car className="h-6 w-6 text-white" />
              </div>
              <span className={`font-display font-bold text-2xl tracking-tight transition-colors ${scrolled || currentView !== ViewState.HOME ? 'text-white' : 'text-white'}`}>
                Auto<span className="text-brand-primary">ScanR</span>
              </span>
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-6">
              {!isLoggedIn ? (
                <>
                  <button onClick={() => handleNav(ViewState.HOME)} className="text-gray-200 hover:text-white text-sm font-medium transition-colors">Accueil</button>
                  <button onClick={() => handleNav(ViewState.MEDIATION_CENTER)} className="text-gray-200 hover:text-white text-sm font-medium transition-colors">Médiation</button>
                  <div className="h-6 w-px bg-white/10 mx-2"></div>
                  <button onClick={() => handleNav(ViewState.MOTORIST_LOGIN)} className="bg-white/10 hover:bg-white/20 text-white border border-white/20 px-5 py-2.5 rounded-full text-sm font-medium flex items-center gap-2 transition-all backdrop-blur-sm">
                    <User size={16} /> Espace Conducteur
                  </button>
                  <button onClick={() => handleNav(ViewState.GARAGE_LOGIN)} className="bg-brand-primary hover:bg-brand-light text-white px-5 py-2.5 rounded-full text-sm font-bold flex items-center gap-2 transition-all shadow-lg hover:shadow-brand-primary/40 transform hover:-translate-y-0.5">
                    <Wrench size={16} /> Espace Garage
                  </button>
                </>
              ) : (
                <button onClick={() => handleNav(ViewState.HOME)} className="bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-red-400 px-5 py-2.5 rounded-full text-sm font-medium flex items-center gap-2 transition-all">
                  <LogOut size={16} /> Déconnexion
                </button>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-200 hover:text-white focus:outline-none"
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
             {!isLoggedIn ? (
                <>
                  <button onClick={() => handleNav(ViewState.HOME)} className="text-gray-200 hover:text-white hover:bg-white/5 block px-3 py-3 rounded-xl text-base font-medium w-full text-left">Accueil</button>
                  <button onClick={() => handleNav(ViewState.MEDIATION_CENTER)} className="text-gray-200 hover:text-white hover:bg-white/5 block px-3 py-3 rounded-xl text-base font-medium w-full text-left">Médiation & Conseils</button>
                  <div className="h-px bg-white/10 my-2"></div>
                  <button onClick={() => handleNav(ViewState.MOTORIST_LOGIN)} className="bg-brand-primary text-white block px-3 py-3 rounded-xl text-base font-bold w-full text-center shadow-lg">Espace Conducteur</button>
                  <button onClick={() => handleNav(ViewState.GARAGE_LOGIN)} className="bg-white/10 text-brand-primary block px-3 py-3 rounded-xl text-base font-bold w-full text-center">Espace Garage</button>
                </>
              ) : (
                <button onClick={() => handleNav(ViewState.HOME)} className="text-red-400 block px-3 py-3 rounded-xl text-base font-medium w-full text-left">Déconnexion</button>
              )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;