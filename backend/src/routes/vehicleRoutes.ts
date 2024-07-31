import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { createEntryVehicleSchema } from "../schemas/vehicleSchema.js";

export async function vehicleRoutes(server: FastifyInstance) {
  server.withTypeProvider<ZodTypeProvider>().post('/parkingvehicle/:plate',{
    schema: createEntryVehicleSchema
  },)
}