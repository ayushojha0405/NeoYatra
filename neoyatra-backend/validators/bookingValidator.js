import { z } from 'zod';

const objectIdSchema = z.string().regex(/^[a-fA-F0-9]{24}$/, 'Invalid id format');
const seatSchema = z.string().trim().regex(/^[A-Za-z0-9-]+$/, 'Invalid seat format');

const passengerSchema = z.object({
  name: z.string().trim().min(1, 'Passenger name is required'),
  age: z.union([z.string(), z.number()]).transform((value) => String(value).trim()).refine((value) => value.length > 0, {
    message: 'Passenger age is required'
  }),
  gender: z.string().trim().min(1, 'Passenger gender is required')
});

export const createBookingSchema = z.object({
  busId: objectIdSchema,
  seats: z.array(seatSchema).min(1, 'At least one seat is required'),
  passengers: z.array(passengerSchema).min(1, 'At least one passenger is required')
}).superRefine((data, ctx) => {
  const uniqueSeats = new Set(data.seats);
  if (uniqueSeats.size !== data.seats.length) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ['seats'],
      message: 'Duplicate seats are not allowed'
    });
  }

  if (data.passengers.length !== data.seats.length) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ['passengers'],
      message: 'Passengers count must match selected seats'
    });
  }
});
