import { z } from 'zod';

export const getParkingSchema = {
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

export const createParkingSchema = {
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

export const statusParkingSchema = {
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
