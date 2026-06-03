import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { loginSchema, registerSchema } from '../validators/authValidator.js';

export const register = async (req, res, next) => {
  try {
    const parsedBody = registerSchema.safeParse(req.body);
    if (!parsedBody.success) {
      const error = new Error(parsedBody.error.issues[0]?.message || 'Invalid request body');
      error.statusCode = 400;
      throw error;
    }

    const { name, email, password } = parsedBody.data;
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      const error = new Error('User already exists with this email');
      error.statusCode = 409;
      throw error;
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);
    const role = process.env.ADMIN_EMAIL && email.toLowerCase() === process.env.ADMIN_EMAIL.toLowerCase()
      ? 'admin'
      : 'user';

    await User.create({ name, email, passwordHash, role });

    return res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    if (error?.code === 11000) {
      error.statusCode = 409;
      error.message = 'User already exists with this email';
    }
    return next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const parsedBody = loginSchema.safeParse(req.body);
    if (!parsedBody.success) {
      const error = new Error(parsedBody.error.issues[0]?.message || 'Invalid request body');
      error.statusCode = 400;
      throw error;
    }

    const { email, password } = parsedBody.data;
    const user = await User.findOne({ email });

    if (!user) {
      const error = new Error('Invalid credentials');
      error.statusCode = 401;
      throw error;
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      const error = new Error('Invalid credentials');
      error.statusCode = 401;
      throw error;
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

    res.cookie('authToken', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    });

    return res.status(200).json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role || 'user'
      }
    });
  } catch (error) {
    return next(error);
  }
};

export const logout = (req, res) => {
  res.clearCookie('authToken');
  res.status(200).json({ message: 'Logged out successfully' });
};
