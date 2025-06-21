const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const sampleProducts = [
  {
    name: 'Fresh Farm Eggs',
    description: 'Organic free-range eggs from healthy hens, collected daily. Perfect for cooking and baking.',
    category: 'EGG',
    subcategory: 'TABLE_EGG',
    price: 150.00,
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
    subcategory: 'PULLET',
    price: 800.00,
    quantity: 12,
    unit: 'PER_UNIT',
    images: ['/images/hens-1.jpg'],
    isActive: true,
    isFeatured: true
  },
  {
    name: 'White Leghorn Hens',
    description: 'Pure white leghorn hens, known for high egg production. Perfect for commercial egg farming.',
    category: 'HEN',
    subcategory: 'PULLET',
    price: 850.00,
    quantity: 8,
    unit: 'PER_UNIT',
    images: ['/images/hens-2.jpg'],
    isActive: true,
    isFeatured: false
  },
  {
    name: 'Jumbo Eggs',
    description: 'Large jumbo eggs, perfect for baking and cooking. Extra large size for better value.',
    category: 'EGG',
    subcategory: 'TABLE_EGG',
    price: 180.00,
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
    subcategory: 'SPENT_HEN',
    price: 900.00,
    quantity: 15,
    unit: 'PER_UNIT',
    images: ['/images/hens-3.jpg'],
    isActive: true,
    isFeatured: true
  },
  {
    name: 'Hatching Eggs',
    description: 'A clutch of 12 high-quality fertilized eggs, ready for incubation. High hatch rate.',
    category: 'EGG',
    subcategory: 'HATCHING_EGG',
    price: 500,
    quantity: 20,
    unit: 'DOZEN',
    images: ['/images/fertilized-eggs-1.jpg'],
    isActive: true,
    isFeatured: true
  },
  {
    name: 'Baby Chicks',
    description: 'Day-old baby chicks, various breeds available. Perfect for starting your flock.',
    category: 'CHICKEN',
    subcategory: 'BROILER',
    price: 120.00,
    quantity: 100,
    unit: 'PER_UNIT',
    images: ['/images/chicks.jpg'],
    isActive: true,
    isFeatured: false
  },
  {
    name: 'Broiler Chickens',
    description: 'Fast-growing broiler chickens, ready for processing. Raised without antibiotics.',
    category: 'CHICKEN',
    subcategory: 'BROILER',
    price: 450.00,
    quantity: 25,
    unit: 'PER_UNIT',
    images: ['/images/broilers.jpg'],
    isActive: true,
    isFeatured: false
  },
  {
    name: 'Nutrient-Rich Manure',
    description: 'High-quality poultry manure, excellent for enriching garden soil.',
    category: 'OTHER',
    subcategory: 'MANURE',
    price: 1500,
    quantity: 30,
    unit: 'PER_KG',
    images: ['/images/feed-1.jpg']
  },
  {
    name: 'Durable Poultry Feeder',
    description: 'Durable and efficient poultry feeder, holds up to 10kg of feed.',
    category: 'OTHER',
    subcategory: 'EQUIPMENT',
    price: 2500,
    quantity: 15,
    unit: 'PER_UNIT',
    images: ['/images/feeder-1.jpg']
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
      console.log(`  - ${product.name} (₹${product.price})`);
    });

  } catch (error) {
    console.error('❌ Error seeding products:', error);
  } finally {
    await prisma.$disconnect();
  }
}

seedProducts(); 