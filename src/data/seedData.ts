import { Driver, Business, Job, Vehicle } from '../types';

export const INITIAL_DRIVERS: Driver[] = [
  {
    id: "drv_001",
    name: "Ivan Horvat",
    email: "ivan.horvat@gmail.com",
    phone: "+385 91 123 4567",
    nationality: "Hrvatska",
    vehicleType: "scooter",
    vehicleId: "veh_001",
    city: "Zagreb",
    status: "active",
    rating: 4.9,
    earningsThisMonth: 1240,
    completedJobsCount: 84,
    documents: {
      idUploaded: true,
      licenseUploaded: true,
      workPermitUploaded: true,
    },
    salaryMode: "employment"
  },
  {
    id: "drv_002",
    name: "Luka Kovačić",
    email: "luka.kovacic@outlook.hr",
    phone: "+385 98 765 4321",
    nationality: "Hrvatska",
    vehicleType: "car",
    vehicleId: "veh_003",
    city: "Split",
    status: "active",
    rating: 4.8,
    earningsThisMonth: 1850,
    completedJobsCount: 112,
    documents: {
      idUploaded: true,
      licenseUploaded: true,
      workPermitUploaded: true,
    },
    salaryMode: "fleet_bolt"
  },
  {
    id: "drv_003",
    name: "Aarav Sharma",
    email: "aarav.sharma@cargoelectra.net",
    phone: "+385 95 888 1234",
    nationality: "India",
    vehicleType: "bike",
    vehicleId: "veh_002",
    city: "Zagreb",
    status: "active",
    rating: 4.7,
    earningsThisMonth: 980,
    completedJobsCount: 61,
    documents: {
      idUploaded: true,
      licenseUploaded: true,
      workPermitUploaded: true,
    },
    salaryMode: "employment"
  },
  {
    id: "drv_004",
    name: "Amara Patel",
    email: "amara.patel@yahoo.com",
    phone: "+385 99 444 5566",
    nationality: "Philippines",
    vehicleType: "scooter",
    city: "Zagreb",
    status: "pending",
    rating: 5.0,
    earningsThisMonth: 0,
    completedJobsCount: 0,
    documents: {
      idUploaded: true,
      licenseUploaded: true,
      workPermitUploaded: false,
    },
    salaryMode: "employment"
  },
  {
    id: "drv_005",
    name: "Marko Babić",
    email: "marko.babic@gmail.com",
    phone: "+385 92 111 2233",
    nationality: "Hrvatska",
    vehicleType: "van",
    city: "Rijeka",
    status: "active",
    rating: 4.95,
    earningsThisMonth: 2350,
    completedJobsCount: 45,
    documents: {
      idUploaded: true,
      licenseUploaded: true,
      workPermitUploaded: true,
    },
    salaryMode: "employment"
  }
];

export const INITIAL_COMPANIES: Business[] = [
  {
    id: "biz_001",
    name: "Express Delivery Zagreb d.o.o.",
    oib: "10293847561",
    email: "logistika@expressdelivery.hr",
    phone: "+385 1 456 7890",
    city: "Zagreb",
    plan: "business",
    balance: 450.00
  },
  {
    id: "biz_002",
    name: "Adriatic Seafoods Split d.o.o.",
    oib: "87654321098",
    email: "shipping@adriaticseafoods.hr",
    phone: "+385 21 345 678",
    city: "Split",
    plan: "enterprise",
    balance: 1200.00
  },
  {
    id: "biz_003",
    name: "Kvarner Cargo Logistics",
    oib: "54637281902",
    email: "info@kvarnercargo.hr",
    phone: "+385 51 222 333",
    city: "Rijeka",
    plan: "starter",
    balance: 150.00
  }
];

export const INITIAL_JOBS: Job[] = [
  {
    id: "job_101",
    companyId: "biz_001",
    companyName: "Express Delivery Zagreb d.o.o.",
    pickupAddress: "Ulica Grada Vukovara 284, Zagreb",
    deliveryAddress: "Ilica 10, Zagreb",
    cargoType: "Parcels (Boxes & Documents)",
    vehicleNeeded: "scooter",
    dateTimeWindow: "Danas, 14:00 - 16:00",
    price: 35.00,
    weight: "12 kg",
    status: "completed",
    driverId: "drv_001",
    driverName: "Ivan Horvat",
    driverPhone: "+385 91 123 4567",
    instructions: "Dostaviti na recepciju, tražiti Ivanu.",
    createdAt: "2026-06-11T08:30:00Z",
    completedAt: "2026-06-11T09:45:00Z",
    invoiceId: "INV-2026-101"
  },
  {
    id: "job_102",
    companyId: "biz_002",
    companyName: "Adriatic Seafoods Split d.o.o.",
    pickupAddress: "Gat Svetog Duje, Split (Port)",
    deliveryAddress: "Cesta dr. Franje Tuđmana, Kaštela",
    cargoType: "Fresh Produce / Frozen Seafood",
    vehicleNeeded: "van",
    dateTimeWindow: "Danas, 11:00 - 13:00",
    price: 120.00,
    weight: "250 kg",
    status: "in_progress",
    driverId: "drv_002",
    driverName: "Luka Kovačić",
    driverPhone: "+385 98 765 4321",
    driverLat: 43.5135,
    driverLng: 16.4225,
    instructions: "Potrebno hlađeno vozilo. Provjeriti temperaturu na utovaru.",
    createdAt: "2026-06-11T09:00:00Z"
  },
  {
    id: "job_103",
    companyId: "biz_003",
    companyName: "Kvarner Cargo Logistics",
    pickupAddress: "Industrijska Zona Kukuljanovo, Rijeka",
    deliveryAddress: "Stanka Vraza 15, Varaždin",
    cargoType: "Automotive Parts & Assemblies",
    vehicleNeeded: "van",
    dateTimeWindow: "Sutra, 08:00 - 12:00",
    price: 280.00,
    weight: "450 kg",
    status: "assigned",
    driverId: "drv_005",
    driverName: "Marko Babić",
    driverPhone: "+385 92 111 2233",
    instructions: "Paletizirani teret. Potreban viličar za istovar.",
    createdAt: "2026-06-11T09:30:00Z"
  },
  {
    id: "job_104",
    companyId: "biz_001",
    companyName: "Express Delivery Zagreb d.o.o.",
    pickupAddress: "Radnička cesta 52, Zagreb",
    deliveryAddress: "Avenija Dubrovnik 15, Zagreb",
    cargoType: "E-Commerce Packages",
    vehicleNeeded: "car",
    dateTimeWindow: "Danas, 16:30 - 19:30",
    price: 55.00,
    weight: "45 kg",
    status: "pending",
    instructions: "Zovite klijenta 10 minuta prije dolaska.",
    createdAt: "2026-06-11T10:00:00Z"
  },
  {
    id: "job_105",
    companyId: "biz_002",
    companyName: "Adriatic Seafoods Split d.o.o.",
    pickupAddress: "Poljička cesta 32, Split",
    deliveryAddress: "Krešimirova ul. 2, Split",
    cargoType: "Premium Oyster Boxes",
    vehicleNeeded: "scooter",
    dateTimeWindow: "Danas, 18:00 - 19:00",
    price: 40.00,
    weight: "8 kg",
    status: "pending",
    instructions: "Održavati hladno. Brza dostava.",
    createdAt: "2026-06-11T10:15:00Z"
  }
];

export const INITIAL_VEHICLES: Vehicle[] = [
  {
    id: "veh_001",
    name: "Electric Scooter - Xiaomi Pro 4",
    type: "scooter",
    specs: "Domet: 55 km | Max brzina: 25 km/h | Idealno za Wolt/Bolt Food",
    dailyPrice: 25,
    weeklyPrice: 120,
    image: "https://images.unsplash.com/photo-1597848212624-a19eb35e2651?auto=format&fit=crop&q=80&w=400",
    status: "rented",
    rentedBy: "drv_001",
    rentedByName: "Ivan Horvat"
  },
  {
    id: "veh_002",
    name: "Cargo E-Bike - Gocycle C3",
    type: "bike",
    specs: "Domet: 80 km | Nosivost: 140 kg | Ekološke gradske dostave",
    dailyPrice: 20,
    weeklyPrice: 90,
    image: "https://images.unsplash.com/photo-1571068316344-75bc76f77891?auto=format&fit=crop&q=80&w=400",
    status: "rented",
    rentedBy: "drv_003",
    rentedByName: "Aarav Sharma"
  },
  {
    id: "veh_003",
    name: "Economy Taxi Car - Škoda Fabia 1.0 TSI",
    type: "car",
    specs: "Potrošnja: 5.2l/100km | Bolt Taxi odobreno | Godina: 2023",
    dailyPrice: 45,
    weeklyPrice: 220,
    image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=400",
    status: "rented",
    rentedBy: "drv_002",
    rentedByName: "Luka Kovačić"
  },
  {
    id: "veh_004",
    name: "Cargo Delivery Van - Opel Vivaro 2.0 CDTI",
    type: "van",
    specs: "Kapacitet: 6.1 m³ | Nosivost: 1200 kg | B2B Cargo transport",
    dailyPrice: 80,
    weeklyPrice: 450,
    image: "https://images.unsplash.com/photo-1516515429572-1f9f243be125?auto=format&fit=crop&q=80&w=400",
    status: "available"
  }
];

export const getLocalStorageState = () => {
  const drivers = localStorage.getItem("ce_drivers");
  const companies = localStorage.getItem("ce_companies");
  const jobs = localStorage.getItem("ce_jobs");
  const vehicles = localStorage.getItem("ce_vehicles");

  if (!drivers || !companies || !jobs || !vehicles) {
    localStorage.setItem("ce_drivers", JSON.stringify(INITIAL_DRIVERS));
    localStorage.setItem("ce_companies", JSON.stringify(INITIAL_COMPANIES));
    localStorage.setItem("ce_jobs", JSON.stringify(INITIAL_JOBS));
    localStorage.setItem("ce_vehicles", JSON.stringify(INITIAL_VEHICLES));

    return {
      drivers: INITIAL_DRIVERS,
      companies: INITIAL_COMPANIES,
      jobs: INITIAL_JOBS,
      vehicles: INITIAL_VEHICLES
    };
  }

  return {
    drivers: JSON.parse(drivers),
    companies: JSON.parse(companies),
    jobs: JSON.parse(jobs),
    vehicles: JSON.parse(vehicles)
  };
};

export const saveLocalStorageState = (state: {
  drivers: Driver[];
  companies: Business[];
  jobs: Job[];
  vehicles: Vehicle[];
}) => {
  localStorage.setItem("ce_drivers", JSON.stringify(state.drivers));
  localStorage.setItem("ce_companies", JSON.stringify(state.companies));
  localStorage.setItem("ce_jobs", JSON.stringify(state.jobs));
  localStorage.setItem("ce_vehicles", JSON.stringify(state.vehicles));
};
