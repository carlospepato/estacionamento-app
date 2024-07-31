import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { createParkingSchema, getParkingSchema, statusParkingSchema } from "../schemas/parkingSchema.js";
import parkingController from "../controllers/parkingController.js";

export async function parkingRoutes(server: FastifyInstance) {
  server.withTypeProvider<ZodTypeProvider>().get('/parkings',{
    schema: getParkingSchema
  }, parkingController.getAllParkings);

  server.withTypeProvider<ZodTypeProvider>().post('/parking',{
    schema: createParkingSchema
  }, parkingController.createParking);

  server.withTypeProvider<ZodTypeProvider>().get('/parking/:id',{
    schema: statusParkingSchema
  }, parkingController.getParkingStatus);
}