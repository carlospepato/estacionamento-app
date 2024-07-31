import { FastifyReply, FastifyRequest } from "fastify";
import parkingService from "../services/parkingService.js";
import { z } from "zod";

const ParkingSchema = z.object({
  name: z.string(),
  cnpj: z.string(),
  address: z.string(),
  phone: z.string(),
  maxCars: z.number(),
  maxMotorcycles: z.number()
});

type ParkingRequest = FastifyRequest<{
  Body: z.infer<typeof ParkingSchema>
}>

async function getAllParkings(request: FastifyRequest, reply: FastifyReply){
  const parkings = await parkingService.getAllParkings();
  reply.send({message: 'Parkings found', parkings});
}

async function createParking(request: ParkingRequest, reply: FastifyReply){
  const {name, cnpj, address, phone, maxCars, maxMotorcycles} = request.body;

  const result = await parkingService.createParking({name, cnpj, address, phone, maxCars, maxMotorcycles});
  if(result.message === 'Parking already exists'){
    reply.status(400).send(result);
  }
  reply.status(200).send(result);
}

async function getParkingStatus(request: FastifyRequest<{Params: {id : string}}>, reply: FastifyReply){
  const {id} = request.params

  const parking  = await parkingService.getParkingStatus(id);

  if(!parking){
    reply.status(400).send({message: 'Parking not found'});
  }

  reply.send(parking);
}

export default {getAllParkings, createParking, getParkingStatus};