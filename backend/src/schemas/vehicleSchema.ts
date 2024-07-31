import {z} from 'zod';

export const getAllVehiclesSchema = {
  params: z.object({
    id: z.string()
  }),
  response:{
    200: z.object({
      message: z.string(),
      vehicles: z.array(z.object({
        id: z.string(),
        plate: z.string(),
        type: z.string(),
        brand: z.string(),
        model: z.string(),
      }))
    }),
    400: z.object({
      message: z.string(),
    }),
  }
}

export const createEntryVehicleSchema = {
  params: z.object({
    plate: z.string()
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

export const createVehicleSchema = {
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