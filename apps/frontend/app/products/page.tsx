'use client';

import { useState, useEffect } from 'react';
import { Search, Filter, ShoppingCart, Heart, Star, Eye, Zap, Home } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  subcategory: string;
  images: string[];
  rating: number;
  reviews: number;
  stock: number;
  unit: string;
}

const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Fresh Farm Eggs',
    description: 'Organic free-range eggs from healthy hens, collected daily',
    price: 4.99,
    category: 'EGGS',
    subcategory: 'CHICKEN_EGGS',
    images: ['/images/eggs-1.jpg'],
    rating: 4.8,
    reviews: 124,
    stock: 50,
    unit: 'DOZEN'
  },
  {
    id: '2',
    name: 'Brown Laying Hens',
    description: 'Healthy brown laying hens, 6-12 months old, excellent egg production',
    price: 25.00,
    category: 'LIVE_POULTRY',
    subcategory: 'LAYING_HENS',
    images: ['/images/hens-1.jpg'],
    rating: 4.9,
    reviews: 89,
    stock: 12,
    unit: 'EACH'
  },
  {
    id: '3',
    name: 'White Leghorn Hens',
    description: 'Pure white leghorn hens, known for high egg production',
    price: 28.00,
    category: 'LIVE_POULTRY',
    subcategory: 'LAYING_HENS',
    images: ['/images/hens-2.jpg'],
    rating: 4.7,
    reviews: 67,
    stock: 8,
    unit: 'EACH'
  },
  {
    id: '4',
    name: 'Jumbo Eggs',
    description: 'Large jumbo eggs, perfect for baking and cooking',
    price: 5.99,
    category: 'EGGS',
    subcategory: 'CHICKEN_EGGS',
    images: ['/images/eggs-2.jpg'],
    rating: 4.6,
    reviews: 95,
    stock: 30,
    unit: 'DOZEN'
  },
  {
    id: '5',
    name: 'Rhode Island Red Hens',
    description: 'Dual-purpose hens, great for both eggs and meat',
    price: 30.00,
    category: 'LIVE_POULTRY',
    subcategory: 'LAYING_HENS',
    images: ['/images/hens-3.jpg'],
    rating: 4.8,
    reviews: 73,
    stock: 15,
    unit: 'EACH'
  },
  {
    id: '6',
    name: 'Organic Eggs',
    description: 'Certified organic eggs from pasture-raised hens',
    price: 7.99,
    category: 'EGGS',
    subcategory: 'CHICKEN_EGGS',
    images: ['/images/eggs-3.jpg'],
    rating: 4.9,
    reviews: 156,
    stock: 25,
    unit: 'DOZEN'
  }
];

const categories = [
  { id: 'all', name: 'All Products' },
  { id: 'LIVE_POULTRY', name: 'Live Poultry' },
  { id: 'EGGS', name: 'Eggs' }
];

const subcategories = {
  LIVE_POULTRY: [
    { id: 'LAYING_HENS', name: 'Laying Hens' },
    { id: 'BROILERS', name: 'Broilers' },
    { id: 'CHICKS', name: 'Baby Chicks' }
  ],
  EGGS: [
    { id: 'CHICKEN_EGGS', name: 'Chicken Eggs' },
    { id: 'DUCK_EGGS', name: 'Duck Eggs' },
    { id: 'QUAIL_EGGS', name: 'Quail Eggs' }
  ]
};

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(mockProducts);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedSubcategory, setSelectedSubcategory] = useState('all');
  const [sortBy, setSortBy] = useState('name');

  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    let filtered = products;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    // Filter by subcategory
    if (selectedSubcategory !== 'all') {
      filtered = filtered.filter(product => product.subcategory === selectedSubcategory);
    }

    // Sort products
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        case 'name':
        default:
          return a.name.localeCompare(b.name);
      }
    });

    setFilteredProducts(filtered);
  }, [products, searchTerm, selectedCategory, selectedSubcategory, sortBy]);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setSelectedSubcategory('all');
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };

  const getUnitLabel = (unit: string) => {
    switch (unit) {
      case 'DOZEN':
        return 'dozen';
      case 'EACH':
        return 'each';
      case 'POUND':
        return 'lb';
      default:
        return unit.toLowerCase();
    }
  };

  const handleBuyNow = (product: Product) => {
    if (loading) return; // Wait until auth state is loaded

    if (!user) {
      // Redirect to signup page if not logged in
      router.push('/auth/signup');
    } else {
      // Placeholder for actual checkout logic
      alert(`Proceeding to checkout for ${product.name}`);
      // router.push(`/checkout?productId=${product.id}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Poultry Products</h1>
              <p className="mt-1 text-sm text-gray-500">
                Fresh eggs and healthy hens from local farms
              </p>
            </div>
            <div className="mt-4 sm:mt-0 flex items-center space-x-4">
              <Link
                href="/"
                className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
              >
                <Home className="h-4 w-4 mr-2" />
                Home
              </Link>
              <Link
                href="/cart"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
              >
                <ShoppingCart className="h-4 w-4 mr-2" />
                Cart (0)
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters and Search */}
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search */}
            <div className="md:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
            </div>

            {/* Category Filter */}
            <div>
              <select
                value={selectedCategory}
                onChange={(e) => handleCategoryChange(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              >
                {categories.map(category => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort */}
            <div>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="name">Sort by Name</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>
          </div>

          {/* Subcategory Filter */}
          {selectedCategory !== 'all' && subcategories[selectedCategory as keyof typeof subcategories] && (
            <div className="mt-4">
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setSelectedSubcategory('all')}
                  className={`px-3 py-1 text-sm rounded-full ${
                    selectedSubcategory === 'all'
                      ? 'bg-indigo-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  All
                </button>
                {subcategories[selectedCategory as keyof typeof subcategories].map(subcategory => (
                  <button
                    key={subcategory.id}
                    onClick={() => setSelectedSubcategory(subcategory.id)}
                    className={`px-3 py-1 text-sm rounded-full ${
                      selectedSubcategory === subcategory.id
                        ? 'bg-indigo-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {subcategory.name}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <div key={product.id} className="bg-white rounded-lg shadow-sm border overflow-hidden hover:shadow-md transition-shadow">
              {/* Product Image */}
              <div className="aspect-w-1 aspect-h-1 bg-gray-200">
                <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-500 text-sm">
                    {product.category === 'EGGS' ? '🥚' : '🐔'} {product.name}
                  </span>
                </div>
              </div>

              {/* Product Info */}
              <div className="p-4">
                <div className="flex items-start justify-between">
                  <h3 className="text-lg font-semibold text-gray-900 truncate">
                    {product.name}
                  </h3>
                  <button className="text-gray-400 hover:text-red-500">
                    <Heart className="h-5 w-5" />
                  </button>
                </div>

                <p className="mt-2 text-sm text-gray-500">{product.description}</p>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-xl font-bold text-gray-900">{formatPrice(product.price)} / {getUnitLabel(product.unit)}</span>
                  <div className="flex items-center">
                    <Star className="h-5 w-5 text-yellow-400" />
                    <span className="ml-1 text-gray-600">{product.rating}</span>
                    <span className="ml-2 text-gray-400">({product.reviews} reviews)</span>
                  </div>
                </div>
                <div className="mt-6 flex gap-4">
                  <button
                    onClick={() => handleBuyNow(product)}
                    className="flex-1 inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-400"
                    disabled={loading}
                  >
                    <Zap className="h-4 w-4 mr-2" />
                    Buy Now
                  </button>
                  <button className="inline-flex items-center justify-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                    <Heart className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">🔍</div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
            <p className="text-gray-500">Try adjusting your search or filter criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
} 