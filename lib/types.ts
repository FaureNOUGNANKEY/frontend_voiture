type carStatus = "disponible" | "loué" | "en maintenance"|"en Panne";

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
    niveauCarburant: number;
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
  status: "En attente" | "En réparation" | "Réparé";
  panneAmount: number;
  car : Car,
  created_at: string;
  updated_at: string;
}

type ReservationStatus = "en cours" | "terminée" | "annulée" | "En attente";
export interface Reservation {
    id:number,
    dateStart: string,
    dateBack: string,
    driverAmount: number,
    type: string,
    status: ReservationStatus,
    car : Car,
    driver?: Driver,
    amount?: number,
    user: User,
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
type driverStatus = "disponible" | "affecté" | "indisponible"|"inactif";
export interface Driver {
    id:number,
    lastname:string,    
    firstname:string,
    photo?: string,
    phone : string,
    photo_url?: string,
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

