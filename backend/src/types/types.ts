export interface Parking {
  id?: string;
  name: string;
  cnpj: string;
  address: string;
  phone: string;
  maxCars: number;
  maxMotorcycles: number;
}

export interface Vehicle {
  id?: string;
  plate: string;
  type: string;
  brand: string;
  model: string;
  parkingId: string;
}