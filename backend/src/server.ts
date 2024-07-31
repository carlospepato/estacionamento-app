import Fastify from 'fastify';
import { serializerCompiler, validatorCompiler, ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from 'zod';
import { prisma } from './utils/prisma.js';
import { config } from '../config/config.js';
import { parkingRoutes } from './routes/parkingRoutes.js';

const server = Fastify({logger: true});

server.setValidatorCompiler(validatorCompiler);
server.setSerializerCompiler(serializerCompiler);

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

server.register(parkingRoutes)

server.listen({port: config.port}).then(() => {
  console.log(`Server is running on port ${config.port}`);
});