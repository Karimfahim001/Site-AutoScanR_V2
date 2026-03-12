export enum ViewState {
  HOME = 'HOME',
  MOTORIST_LOGIN = 'MOTORIST_LOGIN',
  MOTORIST_DASHBOARD = 'MOTORIST_DASHBOARD',
  GARAGE_LOGIN = 'GARAGE_LOGIN',
  GARAGE_DASHBOARD = 'GARAGE_DASHBOARD',
  MEDIATION_CENTER = 'MEDIATION_CENTER',
  ABOUT_US = 'ABOUT_US',
  CONTACT = 'CONTACT',
  MOTORIST_REGISTER = 'MOTORIST_REGISTER'
}

export interface User {
  id: string;
  name: string;
  email: string;
  vehicle: string;
  plate: string;
}

export interface DiagnosticReport {
  id: string;
  date: string;
  vehicle: string;
  location: string;
  status: 'critical' | 'warning' | 'ok';
  codes: string[];
  summary: string; // The "Mediation" simplified explanation
  technicalDetails: string;
}

export interface GarageQuote {
  id: string;
  garageName: string;
  garageId: string;
  priceEstimate: string;
  message: string;
  availableDate: string;
}

export interface Appointment {
  id: string;
  garageName: string;
  date: string;
  status: 'confirmed' | 'pending' | 'completed';
  issue: string;
  notes?: string;
}

export interface Garage {
  id: string;
  name: string;
  address: string;
  rating: number;
}