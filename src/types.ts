export interface Driver {
  id: string;
  name: string;
  email: string;
  phone: string;
  nationality: string;
  vehicleType: 'scooter' | 'bike' | 'car' | 'van';
  vehicleId?: string; // Rented vehicle ID if standard rental is active
  city: string;
  status: 'pending' | 'approved' | 'rejected' | 'active';
  rating: number;
  earningsThisMonth: number;
  completedJobsCount: number;
  documents: {
    idUploaded: boolean;
    licenseUploaded: boolean;
    workPermitUploaded: boolean;
  };
  salaryMode: 'employment' | 'student' | 'fleet_wolt' | 'fleet_bolt';
}

export interface Business {
  id: string;
  name: string;
  oib: string; // Croatian Tax ID (OIB)
  email: string;
  phone: string;
  city: string;
  plan: 'starter' | 'business' | 'enterprise' | 'commission';
  balance: number;
}

export interface Job {
  id: string;
  companyId: string;
  companyName: string;
  pickupAddress: string;
  deliveryAddress: string;
  cargoType: string;
  vehicleNeeded: 'scooter' | 'bike' | 'car' | 'van';
  dateTimeWindow: string;
  price: number;
  weight: string;
  status: 'pending' | 'assigned' | 'in_progress' | 'completed' | 'cancelled';
  driverId?: string;
  driverName?: string;
  driverPhone?: string;
  driverLat?: number;
  driverLng?: number;
  instructions?: string;
  createdAt: string;
  completedAt?: string;
  invoiceId?: string;
}

export interface Vehicle {
  id: string;
  name: string;
  type: 'scooter' | 'bike' | 'car' | 'van';
  specs: string;
  dailyPrice: number;
  weeklyPrice: number;
  image: string;
  status: 'available' | 'rented' | 'maintenance';
  rentedBy?: string; // Driver ID
  rentedByName?: string;
}

export interface ChatMessage {
  id: string;
  sender: 'driver' | 'business' | 'admin';
  senderName: string;
  message: string;
  timestamp: string;
}
