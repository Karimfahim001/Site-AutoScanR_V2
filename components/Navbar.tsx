import React, { useState, useEffect } from 'react';
import { Menu, X, Car, Wrench, User, LogOut } from 'lucide-react';
import { ViewState } from '../types';

interface NavbarProps {
  currentView: ViewState;
  setView: (view: ViewState) => void;
  userRole: 'motorist' | 'garage' | null;
  setUserRole: (role: 'motorist' | 'garage' | null) => void;
  setShowLoginSelection: (show: boolean) => void;
}

const Navbar: React.FC<NavbarProps> = ({ currentView, setView, userRole, setUserRole, setShowLoginSelection }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

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
    <nav className={`fixed w-full z-50 transition-all duration-500 ${scrolled ? 'bg-[#0c142b] shadow-[0_4px_30px_rgba(0,0,0,0.1)] backdrop-blur-lg py-1.5' : 'bg-transparent py-4'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo with high-contrast background 'pastille' on scroll */}
          <div
            className={`flex items-center cursor-pointer group transition-all duration-300 ${scrolled ? 'bg-white/15 px-4 py-2 rounded-2xl ring-1 ring-white/20' : ''}`}
            onClick={() => handleNav(ViewState.HOME)}
          >
            <div className="flex-shrink-0 flex items-center">
              <img
                src="/logo.png"
                alt="AutoScanR Logo"
                className={`h-10 w-auto transition-all duration-300 group-hover:scale-105 ${scrolled ? 'brightness-110 contrast-125 drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]' : ''}`}
              />
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-6">
              <button onClick={() => handleNav(ViewState.HOME)} className={`${isLightHeader && !scrolled ? 'text-gray-600 hover:text-brand-dark' : 'text-gray-200 hover:text-white'} text-sm font-medium transition-colors`}>Accueil</button>
              <button onClick={() => handleNav(ViewState.ABOUT_US)} className={`${isLightHeader && !scrolled ? 'text-gray-600 hover:text-brand-dark' : 'text-gray-200 hover:text-white'} text-sm font-medium transition-colors`}>Qui sommes-nous ?</button>
              <button onClick={() => handleNav(ViewState.MEDIATION_CENTER)} className={`${isLightHeader && !scrolled ? 'text-gray-600 hover:text-brand-dark' : 'text-gray-200 hover:text-white'} text-sm font-medium transition-colors`}>Médiation</button>
              <button onClick={() => handleNav(ViewState.CONTACT)} className={`${isLightHeader && !scrolled ? 'text-gray-600 hover:text-brand-dark' : 'text-gray-200 hover:text-white'} text-sm font-medium transition-colors`}>Nous contacter</button>
              <div className={`h-6 w-px ${isLightHeader && !scrolled ? 'bg-black/10' : 'bg-white/10'} mx-2`}></div>

              {!isLoggedIn ? (
                <button
                  onClick={() => setShowLoginSelection(true)}
                  className={`${scrolled ? 'bg-white text-brand-primary' : 'bg-brand-primary text-white'} hover:bg-brand-light hover:text-white px-6 py-2.5 rounded-full text-sm font-bold flex items-center gap-2 transition-all duration-300 shadow-lg hover:shadow-brand-primary/40 transform hover:-translate-y-1`}
                >
                  <User size={16} /> Connexion
                </button>
              ) : (
                <div className="flex items-center gap-3">
                  <button
                    onClick={handleMySpace}
                    className={`${scrolled ? 'bg-white text-brand-primary' : 'bg-brand-primary text-white'} hover:bg-brand-light hover:text-white px-6 py-2.5 rounded-full text-sm font-bold flex items-center gap-2 transition-all duration-300 shadow-lg hover:shadow-brand-primary/40 transform hover:-translate-y-1`}
                  >
                    <User size={16} /> Mon Espace
                  </button>
                  <button
                    onClick={handleLogout}
                    className={`${scrolled ? 'bg-brand-dark/20 text-white border-white/40' : 'bg-red-500/10 border-red-500/30 text-red-400'} hover:bg-red-500/20 border px-4 py-2.5 rounded-full text-sm font-medium flex items-center gap-2 transition-all duration-300`}
                    title="Déconnexion"
                  >
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
        <div className="md:hidden bg-brand-primary/95 backdrop-blur-md border-t border-white/10 absolute w-full">
          <div className="px-4 pt-2 pb-6 space-y-2 flex flex-col">
            <button onClick={() => handleNav(ViewState.HOME)} className="text-gray-200 hover:text-white hover:bg-white/5 block px-3 py-3 rounded-xl text-base font-medium w-full text-left">Accueil</button>
            <button onClick={() => handleNav(ViewState.ABOUT_US)} className="text-gray-200 hover:text-white hover:bg-white/5 block px-3 py-3 rounded-xl text-base font-medium w-full text-left">Qui sommes-nous ?</button>
            <button onClick={() => handleNav(ViewState.MEDIATION_CENTER)} className="text-gray-200 hover:text-white hover:bg-white/5 block px-3 py-3 rounded-xl text-base font-medium w-full text-left">Médiation & Conseils</button>
            <button onClick={() => handleNav(ViewState.CONTACT)} className="text-gray-200 hover:text-white hover:bg-white/5 block px-3 py-3 rounded-xl text-base font-medium w-full text-left">Nous contacter</button>
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
    </nav>
  );
};

export default Navbar;