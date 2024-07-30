import { Parking } from "../types/parking.js";
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