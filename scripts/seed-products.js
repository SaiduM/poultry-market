const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const sampleProducts = [
  {
    name: 'Fresh Farm Eggs',
    description: 'Organic free-range eggs from healthy hens, collected daily. Perfect for cooking and baking.',
    category: 'EGG',
    subcategory: 'TABLE_EGG',
    price: 4.99,
    quantity: 50,
    unit: 'DOZEN',
    images: ['/images/eggs-1.jpg'],
    isActive: true,
    isFeatured: true
  },
  {
    name: 'Brown Laying Hens',
    description: 'Healthy brown laying hens, 6-12 months old, excellent egg production. Great for backyard farming.',
    category: 'HEN',
    subcategory: 'LAYER',
    price: 25.00,
    quantity: 12,
    unit: 'PIECE',
    images: ['/images/hens-1.jpg'],
    isActive: true,
    isFeatured: true
  },
  {
    name: 'White Leghorn Hens',
    description: 'Pure white leghorn hens, known for high egg production. Perfect for commercial egg farming.',
    category: 'HEN',
    subcategory: 'LAYER',
    price: 28.00,
    quantity: 8,
    unit: 'PIECE',
    images: ['/images/hens-2.jpg'],
    isActive: true,
    isFeatured: false
  },
  {
    name: 'Jumbo Eggs',
    description: 'Large jumbo eggs, perfect for baking and cooking. Extra large size for better value.',
    category: 'EGG',
    subcategory: 'TABLE_EGG',
    price: 5.99,
    quantity: 30,
    unit: 'DOZEN',
    images: ['/images/eggs-2.jpg'],
    isActive: true,
    isFeatured: false
  },
  {
    name: 'Rhode Island Red Hens',
    description: 'Dual-purpose hens, great for both eggs and meat. Hardy and productive breed.',
    category: 'HEN',
    subcategory: 'LAYER',
    price: 30.00,
    quantity: 15,
    unit: 'PIECE',
    images: ['/images/hens-3.jpg'],
    isActive: true,
    isFeatured: true
  },
  {
    name: 'Organic Eggs',
    description: 'Certified organic eggs from pasture-raised hens. No antibiotics or hormones.',
    category: 'EGG',
    subcategory: 'TABLE_EGG',
    price: 7.99,
    quantity: 25,
    unit: 'DOZEN',
    images: ['/images/eggs-3.jpg'],
    isActive: true,
    isFeatured: true
  },
  {
    name: 'Duck Eggs',
    description: 'Fresh duck eggs, larger than chicken eggs with rich flavor. Great for baking.',
    category: 'EGG',
    subcategory: 'TABLE_EGG',
    price: 8.99,
    quantity: 20,
    unit: 'DOZEN',
    images: ['/images/duck-eggs.jpg'],
    isActive: true,
    isFeatured: false
  },
  {
    name: 'Baby Chicks',
    description: 'Day-old baby chicks, various breeds available. Perfect for starting your flock.',
    category: 'CHICKEN',
    subcategory: 'BROILER',
    price: 3.50,
    quantity: 100,
    unit: 'PIECE',
    images: ['/images/chicks.jpg'],
    isActive: true,
    isFeatured: false
  },
  {
    name: 'Broiler Chickens',
    description: 'Fast-growing broiler chickens, ready for processing. Raised without antibiotics.',
    category: 'CHICKEN',
    subcategory: 'BROILER',
    price: 15.00,
    quantity: 25,
    unit: 'PIECE',
    images: ['/images/broilers.jpg'],
    isActive: true,
    isFeatured: false
  },
  {
    name: 'Quail Eggs',
    description: 'Delicate quail eggs, perfect for appetizers and gourmet dishes.',
    category: 'EGG',
    subcategory: 'TABLE_EGG',
    price: 12.99,
    quantity: 40,
    unit: 'DOZEN',
    images: ['/images/quail-eggs.jpg'],
    isActive: true,
    isFeatured: false
  }
];

async function seedProducts() {
  try {
    console.log('🌱 Starting to seed products...');

    // First, create a sample seller user if it doesn't exist
    let seller = await prisma.user.findFirst({
      where: { email: 'seller@example.com' }
    });

    if (!seller) {
      seller = await prisma.user.create({
        data: {
          email: 'seller@example.com',
          username: 'sample_seller',
          firstName: 'John',
          lastName: 'Farmer',
          phone: '+1234567890',
          role: 'SELLER',
          isVerified: true,
          isActive: true,
          password: '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj4tbQJhKz6.' // password: password123
        }
      });
      console.log('✅ Created sample seller user');
    }

    // Clear existing products
    await prisma.product.deleteMany({});
    console.log('🗑️  Cleared existing products');

    // Create products
    const createdProducts = await Promise.all(
      sampleProducts.map(product => 
        prisma.product.create({
          data: {
            ...product,
            sellerId: seller.id
          }
        })
      )
    );

    console.log(`✅ Successfully seeded ${createdProducts.length} products`);
    console.log('📦 Sample products created:');
    createdProducts.forEach(product => {
      console.log(`  - ${product.name} ($${product.price})`);
    });

  } catch (error) {
    console.error('❌ Error seeding products:', error);
  } finally {
    await prisma.$disconnect();
  }
}

seedProducts(); 