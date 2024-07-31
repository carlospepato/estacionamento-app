import { Vehicle } from "../types/types.js";
import { prisma } from "../utils/prisma.js";

export async function getAllVehicles(idPark : string) {
  const vehicles = await prisma.vehicle.findMany({
    where:{
      parkingId: idPark
    }
  })
  if(vehicles.length === 0){
    return {message: 'No vehicles found'};
  }
  return {message: 'Vehicles found', vehicles};
}

async function createVehicle(props : Vehicle){
  const vehicle = await prisma.vehicle.create({data: props});
  if(!vehicle){
    return {message: 'Error creating vehicle'};
  }
  return {message: 'Vehicle created', id: vehicle.id};
}

export async function createEntryVehicle(props : Vehicle){
  const vehicle = await prisma.vehicle.findFirst(
    {
      where: {
        plate: props.plate,
        parkingId: props.parkingId
      }
    }
  );
  if(!vehicle){
    createVehicle(props);
    if(!vehicle){
      return {message: 'Error creating vehicle'};
    }
  }
  const entry = await prisma.vehicleEntryAndExit.create(
    {
      data: {
        vehicleId: vehicle.id,
        parkingId: vehicle.parkingId,
        entry: new Date()
      }
    }
  );

  return {message: 'Vehicle entry created', id: entry.id};
}