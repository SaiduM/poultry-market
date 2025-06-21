import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import { authenticateToken, requireVerified } from '../middleware/auth';

const router = Router();
const prisma = new PrismaClient();

// Import the AuthRequest type
interface AuthRequest extends Request {
  user?: any;
}

// Get all products with filtering and pagination
router.get('/', async (req, res) => {
  try {
    const {
      page = 1,
      limit = 12,
      category,
      subcategory,
      search,
      sortBy = 'createdAt',
      sortOrder = 'desc',
      minPrice,
      maxPrice
    } = req.query;

    const pageNum = parseInt(page as string);
    const limitNum = parseInt(limit as string);
    const skip = (pageNum - 1) * limitNum;

    // Build where clause
    const where: any = {
      isActive: true
    };

    if (category) {
      where.category = category;
    }

    if (subcategory) {
      where.subcategory = subcategory;
    }

    if (search) {
      where.OR = [
        { name: { contains: search as string, mode: 'insensitive' } },
        { description: { contains: search as string, mode: 'insensitive' } }
      ];
    }

    if (minPrice || maxPrice) {
      where.price = {};
      if (minPrice) where.price.gte = parseFloat(minPrice as string);
      if (maxPrice) where.price.lte = parseFloat(maxPrice as string);
    }

    // Build order by clause
    const orderBy: any = {};
    orderBy[sortBy as string] = sortOrder;

    // Get products with seller information
    const products = await prisma.product.findMany({
      where,
      include: {
        seller: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true
          }
        }
      },
      orderBy,
      skip,
      take: limitNum
    });

    // Get total count for pagination
    const total = await prisma.product.count({ where });

    return res.json({
      products,
      pagination: {
        page: pageNum,
        limit: limitNum,
        total,
        pages: Math.ceil(total / limitNum)
      }
    });
  } catch (error) {
    console.error('Get products error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

// Get single product by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const product = await prisma.product.findUnique({
      where: { id },
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
    });

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    return res.json({ product });
  } catch (error) {
    console.error('Get product error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

// Create new product (requires authentication)
router.post('/', authenticateToken, requireVerified, async (req: AuthRequest, res) => {
  try {
    const {
      name,
      description,
      category,
      subcategory,
      price,
      quantity,
      unit,
      images
    } = req.body;

    const sellerId = req.user.id; // Get from authenticated user

    const product = await prisma.product.create({
      data: {
        sellerId,
        name,
        description,
        category,
        subcategory,
        price: parseFloat(price),
        quantity: parseInt(quantity),
        unit,
        images: images || []
      },
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
    });

    return res.status(201).json({
      message: 'Product created successfully',
      product
    });
  } catch (error) {
    console.error('Create product error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

// Update product (requires authentication)
router.put('/:id', authenticateToken, requireVerified, async (req: AuthRequest, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    const userId = req.user.id;

    // Check if user owns the product
    const existingProduct = await prisma.product.findUnique({
      where: { id }
    });

    if (!existingProduct) {
      return res.status(404).json({ error: 'Product not found' });
    }

    if (existingProduct.sellerId !== userId) {
      return res.status(403).json({ error: 'Not authorized to update this product' });
    }

    const product = await prisma.product.update({
      where: { id },
      data: updateData,
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
    });

    return res.json({
      message: 'Product updated successfully',
      product
    });
  } catch (error) {
    console.error('Update product error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

// Delete product (requires authentication)
router.delete('/:id', authenticateToken, requireVerified, async (req: AuthRequest, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    // Check if user owns the product
    const existingProduct = await prisma.product.findUnique({
      where: { id }
    });

    if (!existingProduct) {
      return res.status(404).json({ error: 'Product not found' });
    }

    if (existingProduct.sellerId !== userId) {
      return res.status(403).json({ error: 'Not authorized to delete this product' });
    }

    await prisma.product.delete({
      where: { id }
    });

    return res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Delete product error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

// Get product categories
router.get('/categories/list', async (req, res) => {
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

export default router; 