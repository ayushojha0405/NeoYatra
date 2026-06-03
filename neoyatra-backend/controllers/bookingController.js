import mongoose from 'mongoose';
import Booking from '../models/Booking.js';
import Bus from '../models/Bus.js';
import { createBookingSchema } from '../validators/bookingValidator.js';

export const createBooking = async (req, res, next) => {
  let session;

  try {
    const parsedBody = createBookingSchema.safeParse(req.body);
    if (!parsedBody.success) {
      const error = new Error(parsedBody.error.issues[0]?.message || 'Invalid request body');
      error.statusCode = 400;
      throw error;
    }

    const { busId, seats, passengers } = parsedBody.data;
    const bus = await Bus.findById(busId).select('price totalSeats');

    if (!bus) {
      const error = new Error('Bus not found');
      error.statusCode = 404;
      throw error;
    }

    const invalidSeat = seats.find((seat) => {
      const seatNumber = Number.parseInt(seat.replace(/\D/g, ''), 10);
      return Number.isNaN(seatNumber) || seatNumber < 1 || seatNumber > bus.totalSeats;
    });

    if (invalidSeat) {
      const error = new Error(`Invalid seat number: ${invalidSeat}`);
      error.statusCode = 400;
      throw error;
    }

    session = await mongoose.startSession();
    session.startTransaction();

    const updatedBus = await Bus.findOneAndUpdate(
      {
        _id: busId,
        bookedSeats: { $nin: seats }
      },
      {
        $addToSet: { bookedSeats: { $each: seats } },
        $pull: { lockedSeats: { seatId: { $in: seats } } }
      },
      {
        new: true,
        session
      }
    );

    if (!updatedBus) {
      const error = new Error('One or more selected seats are already booked');
      error.statusCode = 409;
      throw error;
    }

    // Emit socket event
    const io = req.app.get('io');
    if (io) {
      seats.forEach(seatId => {
        io.to(busId).emit('seat_booked', { seatId });
      });
    }

    const total = bus.price * seats.length;
    const [booking] = await Booking.create([{
      userId: req.user.id,
      busId,
      seats,
      passengers,
      total,
      status: 'pending'
    }], { session });

    await session.commitTransaction();
    await booking.populate('busId');

    return res.status(201).json(booking);
  } catch (error) {
    if (session) {
      await session.abortTransaction();
    }
    return next(error);
  } finally {
    if (session) {
      session.endSession();
    }
  }
};

export const getMyBookings = async (req, res, next) => {
  try {
    const page = Math.max(1, Number(req.query.page) || 1);
    const limit = Math.min(20, Number(req.query.limit) || 10);
    const filter = { userId: req.user.id };
    const total = await Booking.countDocuments(filter);
    const bookings = await Booking.find(filter)
      .populate('busId')
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    return res.status(200).json({
      bookings,
      page,
      pages: Math.ceil(total / limit),
      total
    });
  } catch (error) {
    return next(error);
  }
};

export const getAllBookings = async (req, res, next) => {
  try {
    const page = Math.max(1, Number(req.query.page) || 1);
    const limit = Math.min(50, Number(req.query.limit) || 10);
    const total = await Booking.countDocuments();
    const bookings = await Booking.find()
      .populate('busId')
      .populate('userId', 'name email')
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    return res.status(200).json({
      bookings,
      page,
      pages: Math.ceil(total / limit),
      total
    });
  } catch (error) {
    return next(error);
  }
};

export const cancelBooking = async (req, res, next) => {
  let session;

  try {
    session = await mongoose.startSession();
    session.startTransaction();

    const booking = await Booking.findOne({
      _id: req.params.id,
      userId: req.user.id
    }).session(session);

    if (!booking) {
      const error = new Error('Booking not found');
      error.statusCode = 404;
      throw error;
    }

    if (booking.status === 'cancelled') {
      const error = new Error('Booking is already cancelled');
      error.statusCode = 400;
      throw error;
    }

    booking.status = 'cancelled';
    await booking.save({ session });

    await Bus.findByIdAndUpdate(
      booking.busId,
      { $pullAll: { bookedSeats: booking.seats } },
      { session }
    );

    await session.commitTransaction();
    await booking.populate('busId');

    return res.status(200).json(booking);
  } catch (error) {
    if (session) {
      await session.abortTransaction();
    }
    return next(error);
  } finally {
    if (session) {
      session.endSession();
    }
  }
};

export const confirmBooking = async (req, res, next) => {
  try {
    const booking = await Booking.findOne({
      _id: req.params.id,
      userId: req.user.id
    }).populate('busId');

    if (!booking) {
      const error = new Error('Booking not found');
      error.statusCode = 404;
      throw error;
    }

    if (booking.status === 'cancelled') {
      const error = new Error('Cannot confirm a cancelled booking');
      error.statusCode = 400;
      throw error;
    }

    booking.status = 'confirmed';
    await booking.save();

    return res.status(200).json(booking);
  } catch (error) {
    return next(error);
  }
};
