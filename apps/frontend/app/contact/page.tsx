'use client';

import Link from 'next/link';
import { Mail, Phone, MapPin, ArrowLeft } from 'lucide-react';

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-green-100 flex flex-col">
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-gray-900">Poultry Marketplace</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/" className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">Home</Link>
              <Link href="/products" className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">Browse Products</Link>
            </div>
          </div>
        </div>
      </nav>
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-16">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-xl w-full">
          <h2 className="text-3xl font-bold text-gray-900 mb-4 text-center">Contact Us</h2>
          <p className="text-gray-700 mb-8 text-center">
            Have questions or want to visit our shop? Reach out to us using the information below.
          </p>
          <div className="space-y-6">
            <div className="flex items-center">
              <MapPin className="h-6 w-6 text-indigo-600 mr-3" />
              <span className="text-gray-800 text-lg">123 Poultry Lane, Farmville, CA 90001</span>
            </div>
            <div className="flex items-center">
              <Phone className="h-6 w-6 text-green-600 mr-3" />
              <span className="text-gray-800 text-lg">(555) 123-4567</span>
            </div>
            <div className="flex items-center">
              <Mail className="h-6 w-6 text-blue-600 mr-3" />
              <span className="text-gray-800 text-lg">info@poultrymarketplace.com</span>
            </div>
          </div>
          <div className="mt-10 text-center">
            <Link href="/" className="inline-flex items-center text-indigo-600 hover:underline">
              <ArrowLeft className="h-4 w-4 mr-1" /> Back to Home
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
} 