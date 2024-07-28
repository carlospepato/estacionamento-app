import Fastify from 'fastify';
import { serializerCompiler, validatorCompiler, ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from 'zod';
import { prisma } from './lib/prisma.js';

const server = Fastify({logger: true});

server.setValidatorCompiler(validatorCompiler);
server.setSerializerCompiler(serializerCompiler);

interface Parking {
  id: string;
  name: string;
  cnpj: string;
  address: string;
  phone: string;
  maxCars: number;
  maxMotorcycles: number;
}

server.withTypeProvider<ZodTypeProvider>().get('/parkings',{
  schema:{
    response:{
      200: z.object({
        message: z.string(),
        parkings: z.array(z.object({
          id: z.string(),
          name: z.string(),
          cnpj: z.string(),
          address: z.string(),
          phone: z.string(),
          maxCars: z.number(),
          maxMotorcycles: z.number(),
        }))
      })
    }
  }
}, async (request, reply) => {
  const parkings = await prisma.parking.findMany();
  reply.send({message: 'Parkings found', parkings});
});

server.withTypeProvider<ZodTypeProvider>().post('/parking',{
  schema:{
    body: z.object({
      name: z.string(),
      cnpj: z.string(),
      address: z.string(),
      phone: z.string(),
      maxCars: z.number(),
      maxMotorcycles: z.number(),
    }),
    response:{
      200: z.object({
        message: z.string(),
        id: z.string(),
      }),
      400: z.object({
        message: z.string(),
      }),
    }
  }
}, async (request, reply) => {
  const {name, cnpj, address, phone, maxCars, maxMotorcycles} = request.body;

  const parkingExist = await prisma.parking.findFirst({
    where:{
      cnpj
    }
  });

  if(parkingExist){
    reply.status(400).send({message: 'Parking already exists'});
  }
  const parking = await prisma.parking.create({
    data:{
      name,
      cnpj,
      address,
      phone,
      maxCars,
      maxMotorcycles
    }
  });

  reply.send({message: 'Parking created', id: parking.id});
});

server.withTypeProvider<ZodTypeProvider>().get('/statusparking/:id',{
  schema:{
    params: z.object({
      id: z.string()
    }),
    response:{
      200: z.object({
        message: z.string(),
        availableParkingForCars: z.number(),
        availableParkingForMotorcycles: z.number(),
      }),
      400: z.object({
        message: z.string(),
      }),
    }
  }
}, async (request, reply) => {
  const {id} = request.params;
  

  const parking: Parking | null = await prisma.parking.findUnique({
    where:{
      id
    }
  });

  if(!parking){
    reply.status(400).send({message: 'Parking not found'});
    return;
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

  
  return reply.send({message: 'Parking status', availableParkingForCars, availableParkingForMotorcycles});

});

server.withTypeProvider<ZodTypeProvider>().post('/parkingvehicle/:id',{
  schema:{
    params: z.object({
      id: z.string()
    }),
    body: z.object({
      plate: z.string(),
      type: z.string(),
      brand: z.string(),
      model: z.string(),
    }),
    response:{
      200: z.object({
        message: z.string(),
        id: z.string(),
      }),
      400: z.object({
        message: z.string(),
      }),
    }
  }
}, async (request, reply) => {
  const {id} = request.params;
  const {plate, type, brand, model} = request.body;

  const parkingExist = await prisma.parking.findFirst({
    where:{
      id
    }
  });

  if(!parkingExist){
    reply.status(400).send({message: 'Parking not found'});
  }

  const vehicles = await prisma.vehicle.findMany({
    where:{
      parkingId: id,
      type: type
    }
  });

  

  const vehicle = await prisma.vehicle.create({
    data:{
      plate,
      type,
      brand,
      model,
      parkingId: id
    }
  });
});

server.listen({port: 3333}).then(() => {
  console.log('Server is running on port 3333');
});