import express from 'express';
import authMiddleware from '../middleware/authMiddleware.js';
import adminMiddleware from '../middleware/adminMiddleware.js';
import { getBuses, getBusById, createBus } from '../controllers/busController.js';

const router = express.Router();

// @route   POST /api/buses
// @desc    Add a new bus (admin only)
// @access  Private/Admin
router.post('/', authMiddleware, adminMiddleware, createBus);

// @route   GET /api/buses
// @desc    Search buses with filters
// @access  Public
router.get('/', getBuses);

// @route   GET /api/buses/:id
// @desc    Get a single bus by ID
// @access  Public
router.get('/:id', getBusById);

export default router;

