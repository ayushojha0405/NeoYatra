import { z } from 'zod';

export const createBusSchema = z.object({
  source: z.string().trim().min(1, 'Source is required'),
  destination: z.string().trim().min(1, 'Destination is required'),
  date: z.string().trim().min(1, 'Date is required'),
  price: z.number({ invalid_type_error: 'Price must be a number' }).min(0, 'Price must be at least 0'),
  totalSeats: z.number({ invalid_type_error: 'Total seats must be a number' }).min(1, 'Total seats must be at least 1')
});
