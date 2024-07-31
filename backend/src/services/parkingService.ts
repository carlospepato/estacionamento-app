import { Parking } from "../types/types.js";
import { prisma } from "../utils/prisma.js";

export async function getAllParkings() {
  return prisma.parking.findMany();
}

export async function createParking(props : Parking){
  const parkingExist = await prisma.parking.findFirst({where: {cnpj : props.cnpj}});

  if(parkingExist){
    return {message: 'Parking already exists'};
  }

  const parking = await prisma.parking.create({data: props});

  return {message: 'Parking created', id: parking.id};

}

export async function getParkingStatus(id : string){
  const parking : Parking | null = await prisma.parking.findUnique({where: {id}});

  if(!parking){
    return {message: 'Parking not found'};
  }

  const vehicles = await prisma.vehicle.findMany({
    where:{
      parkingId: id
    }
  });

  const totalCars = vehicles.filter(vehicle => vehicle.type === 'car').length;
  const totalMotorcycles = vehicles.filter(vehicle => vehicle.type === 'motorcycle').length;

  const availableParkingForCars = parking.maxCars - totalCars;
  const availableParkingForMotorcycles = parking.maxMotorcycles - totalMotorcycles;
  
  return {message: 'Parking status', availableParkingForCars, availableParkingForMotorcycles}
  
}

export default {getAllParkings, createParking, getParkingStatus};