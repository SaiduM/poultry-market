import Link from 'next/link';
import { ShoppingCart, Gavel, Users, Shield } from 'lucide-react';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-gray-900">Poultry Marketplace</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                href="/products"
                className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
              >
                Products
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

      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Poultry Marketplace
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Your premier destination for buying and selling fresh poultry products. 
            Find fresh eggs and healthy hens from trusted local farmers.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/products"
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors inline-flex items-center justify-center"
            >
              <ShoppingCart className="h-5 w-5 mr-2" />
              Browse Products
            </Link>
            <Link
              href="/auth/signup"
              className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors"
            >
              Start Selling
            </Link>
          </div>
        </div>
        
        <div className="mt-16 grid md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center mb-3">
              <ShoppingCart className="h-6 w-6 text-indigo-600 mr-2" />
              <h3 className="text-xl font-semibold">Fresh Products</h3>
            </div>
            <p className="text-gray-600">
              Get the freshest eggs and healthiest hens directly from local farmers and trusted suppliers.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center mb-3">
              <Gavel className="h-6 w-6 text-green-600 mr-2" />
              <h3 className="text-xl font-semibold">Live Auctions</h3>
            </div>
            <p className="text-gray-600">
              Participate in real-time auctions and bid on premium poultry products.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center mb-3">
              <Shield className="h-6 w-6 text-blue-600 mr-2" />
              <h3 className="text-xl font-semibold">Secure Payments</h3>
            </div>
            <p className="text-gray-600">
              Safe and secure payment processing with buyer protection and escrow services.
            </p>
          </div>
        </div>

        {/* Featured Categories */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
            Featured Categories
          </h2>
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

        {/* CTA Section */}
        <div className="mt-16 bg-indigo-600 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">
            Ready to get started?
          </h2>
          <p className="text-indigo-100 mb-6">
            Join thousands of farmers and buyers in our marketplace
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/auth/signup"
              className="bg-white text-indigo-600 hover:bg-gray-100 font-semibold py-3 px-8 rounded-lg transition-colors"
            >
              Create Account
            </Link>
            <Link
              href="/products"
              className="border border-white text-white hover:bg-white hover:text-indigo-600 font-semibold py-3 px-8 rounded-lg transition-colors"
            >
              Browse Products
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
} 