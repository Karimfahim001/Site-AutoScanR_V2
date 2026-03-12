import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import AboutUs from './pages/AboutUs';
import MotoristDashboard from './pages/MotoristDashboard';
import GarageDashboard from './pages/GarageDashboard';
import MediationCenter from './pages/MediationCenter';
import Contact from './pages/Contact';
import { ViewState } from './types';
import { Car, Mail, Phone, ArrowLeft, Instagram, Twitter, Linkedin, MapPin, User } from 'lucide-react';
import LoginModal from './components/LoginModal';

const App: React.FC = () => {
  const [currentView, setView] = useState<ViewState>(ViewState.HOME);
  const [userRole, setUserRole] = useState<'motorist' | 'garage' | null>(null);
  const [userName, setUserName] = useState<string | null>(null);
  const [showLoginSelection, setShowLoginSelection] = useState(false);

  useEffect(() => {
    const session = localStorage.getItem('autoscan_user');
    if (session) {
      try {
        const user = JSON.parse(session);
        setUserRole(user.role);
        setUserName(`${user.firstName} ${user.lastName}`);
      } catch (e) {}
    }
  }, []);

  const handleLogin = (role: 'motorist' | 'garage', view: ViewState) => {
    const user = { firstName: "Marc", lastName: "Dupont", role };
    localStorage.setItem('autoscan_user', JSON.stringify(user));
    setUserRole(role);
    setUserName(`${user.firstName} ${user.lastName}`);
    setView(view);
  };

  const renderContent = () => {
    switch (currentView) {
      case ViewState.HOME:
        return <Home setView={setView} />;

      case ViewState.ABOUT_US:
        return <AboutUs setView={setView} />;

      case ViewState.MEDIATION_CENTER:
        return <MediationCenter setView={setView} />;

      case ViewState.CONTACT:
        return <Contact setView={setView} />;

      case ViewState.MOTORIST_LOGIN:
        return (
          <div className="min-h-screen flex items-center justify-center bg-gray-50 relative overflow-hidden">
            <div className="absolute inset-0 z-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
            <div className="bg-white p-10 rounded-3xl shadow-2xl w-full max-w-md relative z-10 animate-fade-in-up">
              <div className="text-center mb-10">
                <div className="w-16 h-16 bg-brand-primary/10 rounded-2xl mx-auto flex items-center justify-center mb-6 text-brand-primary">
                  <User size={32} />
                </div>
                <h2 className="font-display text-3xl font-bold text-brand-dark">Connexion</h2>
                <p className="text-gray-500 mt-2">Accédez à votre espace AutoScanR</p>
              </div>
              <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); handleLogin('motorist', ViewState.MOTORIST_DASHBOARD); }}>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Email</label>
                  <input type="email" className="block w-full border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-brand-primary focus:border-transparent transition bg-gray-50 focus:bg-white" placeholder="vous@exemple.com" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Mot de passe</label>
                  <input type="password" className="block w-full border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-brand-primary focus:border-transparent transition bg-gray-50 focus:bg-white" placeholder="••••••••" />
                </div>
                <button type="submit" className="w-full flex justify-center py-4 px-4 border border-transparent rounded-xl shadow-lg shadow-brand-primary/30 text-base font-bold text-white bg-brand-primary hover:bg-brand-light transition transform hover:-translate-y-1">
                  Se connecter
                </button>
              </form>
              <div className="mt-6 text-center space-y-4">
                <p className="text-gray-500 text-sm">
                  Pas encore de compte ?{' '}
                  <button 
                    onClick={() => setView(ViewState.MOTORIST_REGISTER)}
                    className="text-brand-primary font-bold hover:underline"
                  >
                    Créer un compte
                  </button>
                </p>
                <button onClick={() => setView(ViewState.HOME)} className="text-sm text-gray-400 hover:text-brand-dark flex items-center justify-center gap-2 mx-auto transition-colors">
                  <ArrowLeft size={16} /> Retour à l'accueil
                </button>
              </div>
            </div>
          </div>
        );

      case ViewState.MOTORIST_REGISTER:
        return (
          <div className="min-h-screen flex items-center justify-center bg-gray-50 relative overflow-hidden">
            <div className="absolute inset-0 z-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
            <div className="bg-white p-10 rounded-3xl shadow-2xl w-full max-w-md relative z-10 animate-fade-in-up">
              <div className="text-center mb-10">
                <div className="w-16 h-16 bg-brand-primary/10 rounded-2xl mx-auto flex items-center justify-center mb-6 text-brand-primary">
                  <User size={32} />
                </div>
                <h2 className="font-display text-3xl font-bold text-brand-dark">Créer un compte</h2>
                <p className="text-gray-500 mt-2">Rejoignez la communauté AutoScanR</p>
              </div>
              <form className="space-y-6" onSubmit={(e) => { 
                e.preventDefault(); 
                // Simulate registration success
                setView(ViewState.MOTORIST_LOGIN);
                window.scrollTo(0, 0);
              }}>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Nom complet</label>
                  <input type="text" required className="block w-full border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-brand-primary focus:border-transparent transition bg-gray-50 focus:bg-white" placeholder="Marc DUPONT" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Email</label>
                  <input type="email" required className="block w-full border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-brand-primary focus:border-transparent transition bg-gray-50 focus:bg-white" placeholder="vous@exemple.com" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Mot de passe</label>
                  <input type="password" required className="block w-full border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-brand-primary focus:border-transparent transition bg-gray-50 focus:bg-white" placeholder="••••••••" />
                </div>
                <button type="submit" className="w-full flex justify-center py-4 px-4 border border-transparent rounded-xl shadow-lg shadow-brand-primary/30 text-base font-bold text-white bg-brand-primary hover:bg-brand-light transition transform hover:-translate-y-1">
                  S'inscrire
                </button>
              </form>
              <div className="mt-6 text-center space-y-4">
                <p className="text-gray-500 text-sm">
                  Déjà un compte ?{' '}
                  <button 
                    onClick={() => setView(ViewState.MOTORIST_LOGIN)}
                    className="text-brand-primary font-bold hover:underline"
                  >
                    Se connecter
                  </button>
                </p>
                <button onClick={() => setView(ViewState.HOME)} className="text-sm text-gray-400 hover:text-brand-dark flex items-center justify-center gap-2 mx-auto transition-colors">
                  <ArrowLeft size={16} /> Retour à l'accueil
                </button>
              </div>
            </div>
          </div>
        );


      case ViewState.GARAGE_LOGIN:
        return (
          <div className="min-h-screen flex items-center justify-center bg-brand-dark relative">
            <div className="absolute top-0 right-0 w-1/2 h-full bg-brand-primary/5 rounded-l-full"></div>
            <div className="bg-white p-10 rounded-3xl shadow-2xl w-full max-w-md relative z-10 overflow-hidden animate-fade-in-up">
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-brand-accent to-brand-primary"></div>
              <div className="text-center mb-10">
                <h2 className="font-display text-3xl font-bold text-brand-dark">Connexion Espace Pro</h2>
                <p className="text-gray-500 mt-2">Accédez à votre espace AutoScanR</p>
              </div>
              <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); handleLogin('garage', ViewState.GARAGE_DASHBOARD); }}>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Identifiant Garage</label>
                  <input type="text" className="block w-full border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-brand-accent focus:border-transparent transition bg-gray-50" defaultValue="MecaExpert_83" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Mot de passe</label>
                  <input type="password" className="block w-full border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-brand-accent focus:border-transparent transition bg-gray-50" placeholder="••••••••" />
                </div>
                <button type="submit" className="w-full flex justify-center py-4 px-4 border border-transparent rounded-xl shadow-lg shadow-brand-accent/30 text-base font-bold text-brand-dark bg-brand-accent hover:bg-yellow-400 transition transform hover:-translate-y-1">
                  Accéder au portail
                </button>
              </form>
              <div className="mt-8 text-center">
                <button onClick={() => setView(ViewState.HOME)} className="text-sm text-gray-400 hover:text-brand-dark flex items-center justify-center gap-2 mx-auto transition-colors">
                  <ArrowLeft size={16} /> Retour à l'accueil
                </button>
              </div>
            </div>
          </div>
        );

      case ViewState.MOTORIST_DASHBOARD:
        return <MotoristDashboard setView={setView} />;

      case ViewState.GARAGE_DASHBOARD:
        return <GarageDashboard setView={setView} />;

      default:
        return <Home setView={setView} />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen font-sans text-brand-dark">
      <Navbar 
        currentView={currentView} 
        setView={setView} 
        userRole={userRole} 
        setUserRole={setUserRole} 
        userName={userName}
        setUserName={setUserName}
        setShowLoginSelection={setShowLoginSelection}
      />

      <main className="flex-grow">
        {renderContent()}
      </main>

      <footer className="bg-brand-dark text-gray-400 py-16 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-2 space-y-6">
            <div className="flex items-center">
              <img src="/logo.png" alt="AutoScanR Logo" className="h-12 w-auto" />
            </div>
            <p className="text-base max-w-sm leading-relaxed">
              La première borne de diagnostic autonome qui redonne le pouvoir aux automobilistes. Transparence, pédagogie et économies.
            </p>
            <div className="flex gap-4 pt-2">
              {[Instagram, Twitter, Linkedin].map((Icon, i) => (
                <a key={i} href="#" className="bg-white/5 hover:bg-brand-primary p-2 rounded-full text-white transition-all">
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-display font-bold text-white text-lg mb-6">Plateforme</h4>
            <ul className="space-y-4 text-sm">
              <li><button onClick={() => setView(ViewState.HOME)} className="hover:text-brand-primary transition-colors">Accueil</button></li>
              <li><button onClick={() => setView(ViewState.ABOUT_US)} className="hover:text-brand-primary transition-colors">Qui sommes-nous ?</button></li>
              <li><button onClick={() => setView(ViewState.MEDIATION_CENTER)} className="hover:text-brand-primary transition-colors">Médiation & Conseils</button></li>
              <li><button onClick={() => setShowLoginSelection(true)} className="hover:text-brand-primary transition-colors font-bold text-brand-primary">Connexion à mon compte</button></li>
              <li><a href="#" className="hover:text-brand-primary transition-colors">Trouver une borne</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display font-bold text-white text-lg mb-6">Contact</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-center gap-3"><Mail size={16} className="text-brand-primary" /> support@autoscanr.com</li>
              <li className="flex items-center gap-3"><Phone size={16} className="text-brand-primary" /> +33 1 23 45 67 89</li>
              <li className="flex items-center gap-3"><MapPin size={16} className="text-brand-primary" /> Paris, France</li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-xs">
          <p>© 2023 AutoScanR. Tous droits réservés.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-white">Confidentialité</a>
            <a href="#" className="hover:text-white">CGU</a>
            <a href="#" className="hover:text-white">Cookies</a>
          </div>
        </div>
      </footer>

      <LoginModal 
        isOpen={showLoginSelection} 
        onClose={() => setShowLoginSelection(false)} 
        onSelect={(view) => {
          setShowLoginSelection(false);
          setView(view);
          window.scrollTo(0, 0);
        }}
      />
    </div>
  );
};

export default App;