import { DiagnosticReport, Appointment, GarageQuote } from './types';

export const MOCK_USER = {
  id: 'u1',
  name: 'Sophie Martin',
  email: 'sophie.martin@example.com',
  vehicle: 'Peugeot 208',
  plate: 'AB-123-CD'
};

export const MOCK_REPORTS: DiagnosticReport[] = [
  {
    id: 'rep_001',
    date: '2023-10-24',
    vehicle: 'Peugeot 208',
    location: 'Borne Paris 12',
    status: 'warning',
    codes: ['P0300', 'P0171'],
    summary: "Votre moteur a des petits ratés d'allumage. C'est comme si une bougie s'éteignait de temps en temps. Ce n'est pas critique immédiatement, mais cela consomme plus d'essence.",
    technicalDetails: "Cylindre aléatoire raté d'allumage détecté. Système trop pauvre (Banque 1)."
  },
  {
    id: 'rep_002',
    date: '2023-08-10',
    vehicle: 'Peugeot 208',
    location: 'Borne Lyon Part-Dieu',
    status: 'ok',
    codes: [],
    summary: "Aucun défaut détecté. Votre véhicule est en parfaite santé pour votre départ en vacances !",
    technicalDetails: "Scan complet des calculateurs : OK."
  }
];

export const MOCK_QUOTES: GarageQuote[] = [
  {
    id: 'q1',
    garageName: 'Garage AutoPlus',
    garageId: 'g1',
    priceEstimate: '120€ - 150€',
    message: 'Bonjour, cela ressemble à un problème de bougies. Nous pouvons vous prendre demain matin.',
    availableDate: '2023-10-26'
  },
  {
    id: 'q2',
    garageName: 'Meca Expert',
    garageId: 'g2',
    priceEstimate: '90€',
    message: 'Diagnostic confirmé. Remplacement bougies et filtre à air.',
    availableDate: '2023-10-27'
  }
];

export const MOCK_APPOINTMENTS: Appointment[] = [
  {
    id: 'apt_1',
    garageName: 'Meca Expert',
    date: '2023-10-27 09:00',
    status: 'confirmed',
    issue: 'Ratés moteur (P0300)',
    notes: 'La voiture tremble un peu au feu rouge.'
  }
];

export const MEDIATION_CONTENT = [
  {
    id: 1,
    title: "Comprendre le voyant Moteur",
    type: "Vidéo",
    duration: "2 min",
    thumbnail: "https://picsum.photos/400/225?random=1",
    description: "Pourquoi ce voyant orange s'allume-t-il ? Est-ce urgent ?"
  },
  {
    id: 2,
    title: "Les bruits de freinage",
    type: "Guide Illustré",
    duration: "5 min",
    thumbnail: "https://picsum.photos/400/225?random=2",
    description: "Sifflement ou grognement ? Apprenez à distinguer l'usure normale du danger."
  },
  {
    id: 3,
    title: "La batterie en hiver",
    type: "Article",
    duration: "3 min",
    thumbnail: "https://picsum.photos/400/225?random=3",
    description: "Comment éviter la panne le matin avant d'aller travailler."
  }
];