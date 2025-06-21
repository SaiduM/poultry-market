import { Router, Request, Response } from 'express';
import { PrismaClient, OrderStatus, UserRole, ProductCategory } from '@prisma/client';
import { authMiddleware, requireRole } from '../middleware/auth';

const router = Router();
const prisma = new PrismaClient();

// Apply auth middleware to all admin routes
router.use(authMiddleware);
router.use(requireRole(['ADMIN']));

// Get dashboard stats
router.get('/dashboard', async (req: Request, res: Response) => {
  try {
    const [
      totalUsers,
      totalProducts,
    ] = await Promise.all([
      prisma.user.count(),
      prisma.product.count(),
    ]);

    const topProducts = await prisma.product.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' },
      include: {
        seller: {
          select: { firstName: true, lastName: true, email: true }
        }
      }
    });

    return res.json({
      stats: {
        totalUsers,
        totalProducts,
      },
      topProducts
    });
  } catch (error) {
    console.error('Admin dashboard error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

// Get all users
router.get('/users', async (req: Request, res: Response) => {
  try {
    const { page = 1, limit = 10, role, search } = req.query;
    const skip = (Number(page) - 1) * Number(limit);

    const where: any = {};
    if (role) where.role = role as UserRole;
    if (search) {
      where.OR = [
        { firstName: { contains: String(search), mode: 'insensitive' } },
        { lastName: { contains: String(search), mode: 'insensitive' } },
        { email: { contains: String(search), mode: 'insensitive' } }
      ];
    }

    const [users, total] = await Promise.all([
      prisma.user.findMany({
        where,
        skip,
        take: Number(limit),
        orderBy: { createdAt: 'desc' },
        select: {
          id: true,
          email: true,
          firstName: true,
          lastName: true,
          role: true,
          isActive: true,
          isVerified: true,
          createdAt: true,
          _count: {
            select: {
              products: true,
              buyerOrders: true
            }
          }
        }
      }),
      prisma.user.count({ where })
    ]);

    return res.json({
      users,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total,
        pages: Math.ceil(total / Number(limit))
      }
    });
  } catch (error) {
    console.error('Get users error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

// Update user role
router.put('/users/:id/role', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { role } = req.body;

    if (!['BUYER', 'SELLER', 'ADMIN'].includes(role)) {
      return res.status(400).json({ error: 'Invalid role' });
    }

    const user = await prisma.user.update({
      where: { id },
      data: { role: role as UserRole },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        role: true,
        isActive: true
      }
    });

    return res.json({
      message: 'User role updated successfully',
      user
    });
  } catch (error) {
    console.error('Update user role error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

// Ban/unban user
router.put('/users/:id/ban', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { isActive } = req.body;

    const user = await prisma.user.update({
      where: { id },
      data: { isActive },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        role: true,
        isActive: true
      }
    });

    return res.json({
      message: `User ${isActive ? 'activated' : 'banned'} successfully`,
      user
    });
  } catch (error) {
    console.error('Ban/unban user error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

// Get all products (admin view)
router.get('/products', async (req: Request, res: Response) => {
  try {
    const { page = 1, limit = 10, category, search } = req.query;
    const skip = (Number(page) - 1) * Number(limit);

    const where: any = {};
    if (category) where.category = category as ProductCategory;
    if (search) {
      where.OR = [
        { name: { contains: String(search), mode: 'insensitive' } },
        { description: { contains: String(search), mode: 'insensitive' } }
      ];
    }

    const [products, total] = await Promise.all([
      prisma.product.findMany({
        where,
        skip,
        take: Number(limit),
        orderBy: { createdAt: 'desc' },
        include: {
          seller: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              email: true
            }
          }
        }
      }),
      prisma.product.count({ where })
    ]);

    return res.json({
      products,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total,
        pages: Math.ceil(total / Number(limit))
      }
    });
  } catch (error) {
    console.error('Get products error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

// Get product categories
router.get('/categories', async (req: Request, res: Response) => {
  try {
    const categories = await prisma.product.groupBy({
      by: ['category'],
      _count: {
        category: true
      }
    });

    const subcategories = await prisma.product.groupBy({
      by: ['subcategory'],
      _count: {
        subcategory: true
      }
    });

    return res.json({
      categories: categories.map(c => ({
        category: c.category,
        count: c._count.category
      })),
      subcategories: subcategories.map(s => ({
        subcategory: s.subcategory,
        count: s._count.subcategory
      }))
    });
  } catch (error) {
    console.error('Get categories error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

// Get analytics
router.get('/analytics', async (req: Request, res: Response) => {
  try {
    const { period = '30' } = req.query;
    const days = Number(period);

    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    const [
      newUsers,
      newProducts,
    ] = await Promise.all([
      prisma.user.count({
        where: { createdAt: { gte: startDate } }
      }),
      prisma.product.count({
        where: { createdAt: { gte: startDate } }
      }),
    ]);

    return res.json({
      period: days,
      stats: {
        newUsers,
        newProducts,
      }
    });
  } catch (error) {
    console.error('Get analytics error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

export default router; 