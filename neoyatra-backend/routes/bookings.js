import express from 'express';
import authMiddleware from '../middleware/authMiddleware.js';
import adminMiddleware from '../middleware/adminMiddleware.js';
import {
  createBooking,
  getMyBookings,
  getAllBookings,
  cancelBooking,
  confirmBooking
} from '../controllers/bookingController.js';

const router = express.Router();

// @route   POST /api/bookings
// @desc    Create a new booking
// @access  Private
router.post('/', authMiddleware, createBooking);

// @route   GET /api/bookings/my
// @desc    Get all bookings for the logged-in user
// @access  Private
router.get('/my', authMiddleware, getMyBookings);

// @route   GET /api/bookings
// @desc    Get all bookings (admin only)
// @access  Private/Admin
router.get('/', authMiddleware, adminMiddleware, getAllBookings);

// @route   PATCH /api/bookings/:id/cancel
// @desc    Cancel a booking and free seats
// @access  Private
router.patch('/:id/cancel', authMiddleware, cancelBooking);

// @route   PATCH /api/bookings/:id/confirm
// @desc    Confirm a booking payment
// @access  Private
router.patch('/:id/confirm', authMiddleware, confirmBooking);

export default router;

