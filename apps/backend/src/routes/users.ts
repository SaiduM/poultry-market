import { Router } from 'express';
import { authMiddleware, AuthRequest } from '@/middleware/auth';

const router = Router();

// Get current user's profile
router.get('/me', authMiddleware, (req, res) => {
  // The user object is attached to the request by the authMiddleware
  const user = (req as AuthRequest).user;
  res.json(user);
});

// Get user profile
router.get('/profile', (req, res) => {
  res.json({ message: 'Get user profile endpoint - TODO' });
});

// Update user profile
router.put('/profile', (req, res) => {
  res.json({ message: 'Update user profile endpoint - TODO' });
});

// Get user orders
router.get('/orders', (req, res) => {
  res.json({ message: 'Get user orders endpoint - TODO' });
});

// Get user auctions
router.get('/auctions', (req, res) => {
  res.json({ message: 'Get user auctions endpoint - TODO' });
});

// Get user bids
router.get('/bids', (req, res) => {
  res.json({ message: 'Get user bids endpoint - TODO' });
});

// Get user notifications
router.get('/notifications', (req, res) => {
  res.json({ message: 'Get user notifications endpoint - TODO' });
});

// Mark notification as read
router.put('/notifications/:id/read', (req, res) => {
  res.json({ message: 'Mark notification as read endpoint - TODO' });
});

// Delete notification
router.delete('/notifications/:id', (req, res) => {
  res.json({ message: 'Delete notification endpoint - TODO' });
});

export default router; 