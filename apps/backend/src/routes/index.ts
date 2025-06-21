import { Router } from 'express';
import authRoutes from './auth';
import productRoutes from './products';
import auctionRoutes from './auctions';
import userRoutes from './users';
import orderRoutes from './orders';
import paymentRoutes from './payments';
import adminRoutes from './admin';

const router = Router();

// Health check endpoint
router.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// API routes
router.use('/auth', authRoutes);
router.use('/products', productRoutes);
router.use('/auctions', auctionRoutes);
router.use('/users', userRoutes);
router.use('/orders', orderRoutes);
router.use('/payments', paymentRoutes);
router.use('/admin', adminRoutes);

export default router; 