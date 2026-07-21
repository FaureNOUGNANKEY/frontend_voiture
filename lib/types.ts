type carStatus = "disponible" | "loué" | "en maintenance"|"En Panne";

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
    id:number,
    name:string,
    description:string,
    panneAmount: number,
    car : Car,
    created_at: string,
    updated_at: string 
}

export interface Reservation {
    id:number,
    dateStart: string,
    dateBack: string,
    driverAmount: number,
    type: string,
    status: string,
    car : Car,
    driver?: Driver,
    user: User,
    created_at: string,
    updated_at: string 
}

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
    role: string,
    email:string,
    historic: Historic,
    created_at: string,
    updated_at: string 
}

export interface Driver {
    id:number,
    lastname:string,    
    firstname:string,
    photo?: string,
    photo_url?: string,
    status: string,
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