'use client';

import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-green-100 to-blue-200 flex flex-col">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-gray-900">Poultry Marketplace</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                href="/contact"
                className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
              >
                Contact Us
              </Link>
              <Link
                href="/products"
                className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
              >
                Browse Products
              </Link>
              <Link
                href="/auth/login"
                className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
              >
                Sign In
              </Link>
              <Link
                href="/auth/signup"
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md text-sm font-medium"
              >
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="flex-1 flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 mb-6 drop-shadow-lg">
          Poultry Marketplace
        </h1>
        <p className="text-xl text-gray-700 mb-10 max-w-2xl mx-auto">
          Your one-stop shop for fresh eggs and healthy hens. Buy directly from trusted local farmers.
        </p>
        <Link
          href="/products"
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-4 px-12 rounded-lg text-lg shadow-lg transition-colors"
        >
          Browse Products
        </Link>
      </div>
      
      {/* Featured Categories */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="h-48 bg-gradient-to-r from-yellow-400 to-orange-500 flex items-center justify-center">
              <span className="text-6xl">🥚</span>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">Fresh Eggs</h3>
              <p className="text-gray-600 mb-4">
                Farm-fresh eggs from healthy, free-range hens. Perfect for cooking and baking.
              </p>
              <Link
                href="/products?category=EGGS"
                className="text-indigo-600 hover:text-indigo-700 font-medium"
              >
                Browse Eggs →
              </Link>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="h-48 bg-gradient-to-r from-red-400 to-pink-500 flex items-center justify-center">
              <span className="text-6xl">🐔</span>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">Laying Hens</h3>
              <p className="text-gray-600 mb-4">
                Healthy, productive laying hens from trusted breeders. Start your own flock.
              </p>
              <Link
                href="/products?category=LIVE_POULTRY"
                className="text-indigo-600 hover:text-indigo-700 font-medium"
              >
                Browse Hens →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
} 