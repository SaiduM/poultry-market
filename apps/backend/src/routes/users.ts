import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import { authMiddleware, AuthRequest } from '@/middleware/auth';

const router = Router();
const prisma = new PrismaClient();

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
router.get('/orders', authMiddleware, async (req: any, res: any) => {
  try {
    const userId = req.user?.id;
    const { page = 1, limit = 10, sellerId, buyerId } = req.query;
    const skip = (Number(page) - 1) * Number(limit);

    const where: any = {};
    if (sellerId) {
      where.sellerId = String(sellerId);
    } else if (buyerId) {
      where.buyerId = String(buyerId);
    } else {
      // If no specific ID is provided, fetch for the logged-in user
      where.OR = [
        { buyerId: userId },
        { sellerId: userId },
      ];
    }

    const [orders, total] = await Promise.all([
      prisma.order.findMany({
        where,
        skip,
        take: Number(limit),
        orderBy: { createdAt: 'desc' },
        include: {
          buyer: {
            select: { id: true, firstName: true, lastName: true, email: true }
          },
          seller: {
            select: { id: true, firstName: true, lastName: true, email: true }
          }
        }
      }),
      prisma.order.count({ where })
    ]);

    res.json({
      orders,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total,
        pages: Math.ceil(total / Number(limit))
      }
    });
  } catch (error) {
    console.error('Get orders error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
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