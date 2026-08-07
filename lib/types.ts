type carStatus = "Disponible" | "Louée" | "En maintenance"|"En panne";

export interface AuthState {
  token: string | null;
  currentUser: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface Car {
    id: number;
    mark: string;
    type: string;
    model: string;
    color: string;
    photo: string;
    photo_url: string;
    imatriculation: string;
    description?: string;
    status: carStatus;
    kmAmount: number;
    dayAmount: number;
    state: string;
    place: number;
    door: number;
    kilometrage: number;
    niveauCarburant: "Plein" | "1/4" | "1/2" | "3/4" | "Vide";
    transmission : 'Automatique'| 'Manuelle';
    active : boolean;
    domage?: string;
    category: Category;
    created_at: string;
    updated_at: string;
}

export interface Category {
    id: number,
    name: string,
    created_at: string,
    updated_at: string
}

export interface Panne {
  id: number;
  description: string;
  priority: "Urgente" | "Moyenne" | "Faible";
  status: "En attente" | "En réparation" | "Réparée";
  panneAmount: number;
  car : Car,
  created_at: string;
  updated_at: string;
}

export type ReservationStatus = "En cours" | "Terminée" | "Annulée" | "En attente" | "Refusée"| "Validée";
export interface Reservation {
    id:number,
    dateStart: string,
    dateBack: string,
    driverAmount: number,
    type: string,
    status: ReservationStatus,
    computed_status: "A venir" | "En cours" | "Terminée" ,
    car : Car,
    days: number,
    driver?: Driver,
    totalAmount?: number,
    user: User,
    invoice?: invoice,
    created_at: string,
    updated_at: string 
}
export type UserRole = "Client Premium" | "Client" | "admin";
export interface User {
    id:number,
    lastname:string,
    firstname:string,
    type: string,
    pieceType: string,
    pieceNumber: string,
    address: string,
    photo?: string,
    photo_url?: string,
    phone: string,
    active: boolean,
    role: UserRole,
    email:string,
    historic: Historic,
    created_at: string,
    updated_at: string 
}
export interface Client {
    id:number,
    lastname:string,
    firstname:string,
    type: string,
    pieceType: string,
    pieceNumber: string,
    address: string,
    photo?: string,
    photo_url?: string,
    phone: string,
    active: boolean,
    role: UserRole,
    email:string,
    historic: Historic,
    created_at: string,
    updated_at: string 
}
type driverStatus = "Disponible" | "Affecté" | "Indisponible"|"Inactif";
export interface Driver {
    id:number,
    lastname:string,    
    firstname:string,
    photo?: string,
    phone : string,
    photo_url?: string,
    acttive: boolean,
    status: driverStatus,
    created_at: string,
    updated_at: string ,
}

export interface Historic {
    id:number,
    activite: string,
    dateConnecxion: Date,
    heureDeconnecxion: Date,
}

export interface invoice {
    id:number,
    invoiceNumber: string,
    driverAmount: number,
    reductionAmount: number,
    tvaAmount: number,
    amount: number,
    totalAmount: number,
    status: string,
    reservation: Reservation,
    created_at: string,
    updated_at: string 
}

export interface Payment {
    id:number,
    amount: number,
    modePayment: string,
    invoice: invoice,
    created_at: string,
    updated_at: string 
}

export interface Totals {
  cars: number;               
  drivers: number;             
  reservations: number;      
  clients: number;              
  admins: number;              

  activeReservations: number;  

  availableDrivers: number;   
  unAvailableDrivers: number;  
  busyDrivers: number;        

  monthlyRevenue: number;     

  availableCars: number;      
  unAvailableCars: number;     
  rentedCars: number;        
  brokenCars: number; 
  carInRepair:number,
  waitingForDriver:number;     
}

// Activité des réservations par jour
export interface ReservationActivity {
  day: string;   
  count: number; 
}

// Structure principale
export interface Statistics {
  totals: Totals;
  reservationActivity: ReservationActivity[];
}

export interface Estimate {
  days: number;
  driverDailyRate: number;
  carAmount: number;
  reductionAmount: number;
  driverAmount: number;
  tvaAmount: number;
  totalAmount: number;
}

export interface CarBack {
  id: number;
  reservation_id: number;
  returnKm: number; 
  fluelLevel: "Plein" | "1/4" | "1/2" | "3/4" | "Vide"; 
  state: string;
  domage?: string | null;  
  comment?: string | null; 
  created_at: string;       
  updated_at: string;      
  reservation?: Reservation; 
}


