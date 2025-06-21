'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { signOut, onAuthStateChanged, User } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { 
  User as UserIcon, 
  ShoppingCart, 
  Package, 
  Heart, 
  Settings, 
  LogOut,
  Plus,
  Eye
} from 'lucide-react';
import Link from 'next/link';

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        router.push('/auth/login');
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [router]);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      router.push('/auth/login');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const stats = [
    { name: 'Orders', value: '12', icon: ShoppingCart, color: 'bg-blue-500' },
    { name: 'Wishlist', value: '8', icon: Heart, color: 'bg-red-500' },
    { name: 'Products', value: '24', icon: Package, color: 'bg-green-500' },
  ];

  const quickActions = [
    {
      name: 'Browse Products',
      description: 'View all available poultry products',
      icon: Eye,
      href: '/products',
      color: 'bg-indigo-500'
    },
    {
      name: 'Sell Products',
      description: 'List your poultry products for sale',
      icon: Plus,
      href: '/sell',
      color: 'bg-green-500'
    },
    {
      name: 'My Orders',
      description: 'View your order history',
      icon: ShoppingCart,
      href: '/orders',
      color: 'bg-blue-500'
    },
    {
      name: 'Account Settings',
      description: 'Manage your account preferences',
      icon: Settings,
      href: '/settings',
      color: 'bg-gray-500'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
              <p className="mt-1 text-sm text-gray-500">
                Welcome back, {user.displayName || user.email}
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                href="/products"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
              >
                Browse Products
              </Link>
              <button
                onClick={handleSignOut}
                className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {stats.map((stat) => (
            <div key={stat.name} className="bg-white rounded-lg shadow-sm border p-6">
              <div className="flex items-center">
                <div className={`p-3 rounded-lg ${stat.color}`}>
                  <stat.icon className="h-6 w-6 text-white" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickActions.map((action) => (
              <Link
                key={action.name}
                href={action.href}
                className="block p-4 border border-gray-200 rounded-lg hover:border-gray-300 hover:shadow-sm transition-all"
              >
                <div className="flex items-center">
                  <div className={`p-2 rounded-lg ${action.color}`}>
                    <action.icon className="h-5 w-5 text-white" />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-gray-900">{action.name}</h3>
                    <p className="text-xs text-gray-500">{action.description}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h2>
          <div className="space-y-4">
            <div className="flex items-center p-4 bg-gray-50 rounded-lg">
              <div className="p-2 bg-green-100 rounded-lg">
                <ShoppingCart className="h-4 w-4 text-green-600" />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-900">Order #12345 placed</p>
                <p className="text-xs text-gray-500">Fresh Farm Eggs - 2 dozen</p>
              </div>
              <span className="ml-auto text-xs text-gray-500">2 hours ago</span>
            </div>
            
            <div className="flex items-center p-4 bg-gray-50 rounded-lg">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Heart className="h-4 w-4 text-blue-600" />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-900">Added to wishlist</p>
                <p className="text-xs text-gray-500">Brown Laying Hens</p>
              </div>
              <span className="ml-auto text-xs text-gray-500">1 day ago</span>
            </div>
            
            <div className="flex items-center p-4 bg-gray-50 rounded-lg">
              <div className="p-2 bg-purple-100 rounded-lg">
                <UserIcon className="h-4 w-4 text-purple-600" />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-900">Profile updated</p>
                <p className="text-xs text-gray-500">Phone number added</p>
              </div>
              <span className="ml-auto text-xs text-gray-500">3 days ago</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 