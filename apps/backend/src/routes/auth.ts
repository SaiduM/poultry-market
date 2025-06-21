import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const router = Router();
const prisma = new PrismaClient();

// Register user
router.post('/register', async (req, res) => {
  try {
    const { email, password, firstName, lastName, phone, firebaseUid } = req.body;

    // Check if user already exists
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [
          { email },
          { firebaseUid: firebaseUid || null }
        ]
      }
    });

    if (existingUser) {
      return res.status(400).json({ 
        error: 'User already exists with this email or Firebase UID' 
      });
    }

    // Create user
    const user = await prisma.user.create({
      data: {
        email,
        username: email.split('@')[0], // Simple username generation
        firstName,
        lastName,
        phone,
        firebaseUid,
        password: password ? await bcrypt.hash(password, 12) : null,
        isVerified: firebaseUid ? true : false, // Firebase users are pre-verified
      }
    });

    // Generate JWT token
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '24h' }
    );

    return res.status(201).json({
      message: 'User registered successfully',
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        isVerified: user.isVerified
      },
      token
    });
  } catch (error) {
    console.error('Registration error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

// Login user
router.post('/login', async (req, res) => {
  try {
    const { email, password, firebaseUid } = req.body;

    // Find user by email or Firebase UID
    const user = await prisma.user.findFirst({
      where: {
        OR: [
          { email },
          { firebaseUid: firebaseUid || null }
        ]
      }
    });

    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // If using Firebase auth, skip password check
    if (firebaseUid) {
      if (user.firebaseUid !== firebaseUid) {
        return res.status(401).json({ error: 'Invalid Firebase credentials' });
      }
    } else {
      // Check password for email/password login
      if (!user.password || !password) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '24h' }
    );

    // Update last login
    await prisma.user.update({
      where: { id: user.id },
      data: { updatedAt: new Date() }
    });

    return res.json({
      message: 'Login successful',
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        isVerified: user.isVerified
      },
      token
    });
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

// Logout user
router.post('/logout', (req, res) => {
  // In a stateless JWT setup, logout is handled client-side
  // You might want to implement a blacklist for tokens
  return res.json({ message: 'Logout successful' });
});

// Refresh token
router.post('/refresh', async (req, res) => {
  try {
    const { token } = req.body;

    if (!token) {
      return res.status(401).json({ error: 'Token required' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key') as any;
    
    // Check if user still exists
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId }
    });

    if (!user) {
      return res.status(401).json({ error: 'User not found' });
    }

    // Generate new token
    const newToken = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '24h' }
    );

    return res.json({
      message: 'Token refreshed successfully',
      token: newToken,
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        isVerified: user.isVerified
      }
    });
  } catch (error) {
    console.error('Token refresh error:', error);
    return res.status(401).json({ error: 'Invalid token' });
  }
});

// Forgot password
router.post('/forgot-password', async (req, res) => {
  try {
    const { email } = req.body;

    const user = await prisma.user.findUnique({
      where: { email }
    });

    if (!user) {
      // Don't reveal if user exists or not
      return res.json({ message: 'If an account exists, a password reset email has been sent' });
    }

    // Generate reset token
    const resetToken = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '1h' }
    );

    // In a real application, you would:
    // 1. Store the reset token in the database
    // 2. Send an email with the reset link
    // 3. Use a proper email service

    return res.json({ 
      message: 'If an account exists, a password reset email has been sent',
      resetToken // Remove this in production
    });
  } catch (error) {
    console.error('Forgot password error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

// Reset password
router.post('/reset-password', async (req, res) => {
  try {
    const { token, newPassword } = req.body;

    if (!token || !newPassword) {
      return res.status(400).json({ error: 'Token and new password required' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key') as any;
    
    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 12);

    // Update user password
    await prisma.user.update({
      where: { id: decoded.userId },
      data: { 
        password: hashedPassword,
        updatedAt: new Date()
      }
    });

    return res.json({ message: 'Password reset successfully' });
  } catch (error) {
    console.error('Reset password error:', error);
    return res.status(400).json({ error: 'Invalid or expired token' });
  }
});

// Verify email
router.post('/verify-email', async (req, res) => {
  try {
    const { token } = req.body;

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key') as any;
    
    await prisma.user.update({
      where: { id: decoded.userId },
      data: { 
        isVerified: true,
        updatedAt: new Date()
      }
    });

    return res.json({ message: 'Email verified successfully' });
  } catch (error) {
    console.error('Email verification error:', error);
    return res.status(400).json({ error: 'Invalid or expired token' });
  }
});

// Get current user
router.get('/me', async (req, res) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');

    if (!token) {
      return res.status(401).json({ error: 'Token required' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key') as any;
    
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        role: true,
        isVerified: true,
        createdAt: true
      }
    });

    if (!user) {
      return res.status(401).json({ error: 'User not found' });
    }

    return res.json({ user });
  } catch (error) {
    console.error('Get user error:', error);
    return res.status(401).json({ error: 'Invalid token' });
  }
});

export default router; 