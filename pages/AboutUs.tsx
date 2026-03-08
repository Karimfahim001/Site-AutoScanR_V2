import React, { useState } from 'react';
import { ViewState } from '../types';
import { ArrowLeft, Users, Target, ShieldCheck, Zap, Globe, Cpu } from 'lucide-react';

interface AboutUsProps {
    setView: (view: ViewState) => void;
}

const AboutUs: React.FC<AboutUsProps> = ({ setView }) => {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-start pb-16">
            {/* Header */}
            <div className="w-full bg-[#03091a] text-white py-16 px-4 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-brand-primary/20 via-transparent to-brand-accent/10 opacity-50"></div>
                <div className="max-w-4xl mx-auto relative z-10 text-center">
                    <button
                        onClick={() => setView(ViewState.HOME)}
                        className="absolute left-0 top-0 mt-2 flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
                    >
                        <ArrowLeft size={20} />
                        <span className="font-medium text-sm">Retour</span>
                    </button>
                    <span className="text-brand-primary font-bold tracking-wider text-sm uppercase mb-3 block mt-8 md:mt-0">Notre Histoire</span>
                    <h1 className="font-display text-4xl md:text-5xl font-bold mb-6">Qui sommes-nous ?</h1>
                    <p className="text-xl text-gray-300 font-light leading-relaxed max-w-2xl mx-auto">
                        AutoScanR est né d'une volonté simple : <span className="text-white font-medium">rendre l'entretien automobile transparent, accessible et sans stress</span> pour tous les conducteurs.
                    </p>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-4xl mx-auto px-4 mt-12 w-full space-y-16">

                {/* Mission Section */}
                <section className="bg-white rounded-[2rem] p-8 md:p-12 shadow-[0_10px_30px_-15px_rgba(0,0,0,0.05)] border border-gray-100 flex flex-col md:flex-row gap-10 items-center">
                    <div className="flex-1 space-y-6">
                        <div className="w-14 h-14 bg-brand-primary/10 rounded-2xl flex items-center justify-center text-brand-primary mb-6">
                            <Target size={28} />
                        </div>
                        <h2 className="font-display text-3xl font-bold text-gray-900">Notre Mission</h2>
                        <p className="text-gray-600 text-lg leading-relaxed">
                            Aujourd'hui, 1 automobiliste sur 2 craint de se faire arnaquer chez le garagiste. Le manque de connaissances techniques crée un déséquilibre.
                        </p>
                        <p className="text-gray-600 text-lg leading-relaxed font-bold">
                            Notre mission est de rééquilibrer la balance.
                        </p>
                        <p className="text-gray-600 text-lg leading-relaxed">
                            En donnant accès au diagnostic de manière autonome, neutre et compréhensible, nous redonnons le pouvoir au conducteur. Vous savez ce qu'a votre voiture avant même de franchir la porte d'un atelier.
                        </p>
                    </div>
                    <div className="flex-1">
                        <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                            <img src="https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?auto=format&fit=crop&q=80" alt="Mission" className="w-full h-auto object-cover" />
                            <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/80 to-transparent"></div>
                            <div className="absolute bottom-6 left-6 right-6">
                                <p className="text-white font-bold text-xl drop-shadow-md">La transparence comme standard.</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Core Values */}
                <section>
                    <div className="text-center mb-10">
                        <h2 className="font-display text-3xl font-bold text-gray-900 mb-4">Nos Valeurs Fondamentales</h2>
                    </div>
                    <div className="grid md:grid-cols-3 gap-6">
                        <div className="bg-white p-8 rounded-[1.5rem] shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                            <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center text-green-600 mb-6">
                                <ShieldCheck size={24} />
                            </div>
                            <h3 className="font-bold text-xl mb-3">Neutralité Objective</h3>
                            <p className="text-gray-600 text-sm leading-relaxed">
                                Nous ne vendons pas de pièces ni de réparations. Notre seul produit est la vérité sur l'état de votre véhicule.
                            </p>
                        </div>
                        <div className="bg-white p-8 rounded-[1.5rem] shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                            <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-brand-primary mb-6">
                                <Zap size={24} />
                            </div>
                            <h3 className="font-bold text-xl mb-3">Simplicité Extrême</h3>
                            <p className="text-gray-600 text-sm leading-relaxed">
                                La technologie doit s'effacer. Du branchement à la lecture du rapport, tout est conçu pour ne nécessiter aucune compétence technique.
                            </p>
                        </div>
                        <div className="bg-white p-8 rounded-[1.5rem] shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                            <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center text-purple-600 mb-6">
                                <Globe size={24} />
                            </div>
                            <h3 className="font-bold text-xl mb-3">Accessibilité</h3>
                            <p className="text-gray-600 text-sm leading-relaxed">
                                Des bornes disponibles 24h/7j, partout, et un tarif unique et ultra-compétitif pour que le diagnostic ne soit plus un luxe.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Tech Section */}
                <section className="bg-[#0c142b] text-white rounded-[2rem] p-8 md:p-12 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-brand-primary/20 rounded-full blur-[60px]"></div>
                    <div className="relative z-10 flex flex-col md:flex-row items-center gap-10">
                        <div className="flex-1">
                            <div className="text-brand-accent mb-4"><Cpu size={32} /></div>
                            <h2 className="font-display text-3xl font-bold mb-4">Une technologie de pointe</h2>
                            <p className="text-gray-300 mb-6 leading-relaxed">
                                Derrière la simplicité apparente d'AutoScanR se cache une ingénierie complexe. Nos bornes intègrent les derniers protocoles OBD-II et communiquent de manière sécurisée avec nos serveurs d'intelligence artificielle pour traduire instantanément les codes propriétaires des constructeurs automobiles.
                            </p>
                            <div className="flex gap-4">
                                <span className="bg-white/10 px-4 py-2 rounded-xl text-sm font-bold border border-white/10">Base de données: 100k+ codes</span>
                                <span className="bg-white/10 px-4 py-2 rounded-xl text-sm font-bold border border-white/10">IA Traductive</span>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Team CTA */}
                <section className="text-center py-10">
                    <h2 className="font-display text-2xl font-bold text-gray-900 mb-4">Rejoignez le mouvement</h2>
                    <p className="text-gray-600 mb-8 max-w-lg mx-auto">
                        Nous sommes une équipe de passionnés d'automobile et de tech basée en France. Nous recrutons régulièrement pour étendre notre réseau de bornes.
                    </p>
                    <button className="bg-brand-dark text-white px-8 py-4 rounded-xl font-bold hover:bg-black transition-colors flex items-center justify-center gap-2 mx-auto disabled:opacity-50">
                        <Users size={20} /> Voir nos offres d'emploi
                    </button>
                    <p className="text-xs text-gray-400 mt-4">(Bientôt disponible)</p>
                </section>
            </div>
        </div>
    );
};

export default AboutUs;
