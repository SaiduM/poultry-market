'use client';

import { useAuth } from '@/hooks/useAuth';
import { useCart } from '@/context/CartContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Lock, CreditCard, Landmark } from 'lucide-react';
import { getAuth, IdTokenResult } from 'firebase/auth';

interface ShippingAddress {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export default function CheckoutPage() {
  const { user, loading } = useAuth();
  const { cartItems, cartTotal } = useCart();
  const router = useRouter();
  const [shippingAddress, setShippingAddress] = useState<ShippingAddress>({
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'India',
  });
  const [paymentMethod, setPaymentMethod] = useState('UPI');
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePlaceOrder = async () => {
    setIsProcessing(true);
    if (!user) {
      alert('You must be logged in to place an order.');
      setIsProcessing(false);
      return;
    }

    try {
      const token = await user.getIdToken();
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001'}/api/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          cartItems,
          shippingAddress,
          paymentMethod,
          total: cartTotal,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert('Order placed successfully!');
        // clearCart();
        // router.push('/order-confirmation');
      } else {
        throw new Error(data.message || 'Failed to place order');
      }
    } catch (error) {
      console.error('Order placement error:', error);
      alert((error as Error).message);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setShippingAddress(prev => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    // If auth is done loading and there's no user, redirect to login
    if (!loading && !user) {
      router.push('/auth/login?redirect=/checkout');
    }
  }, [user, loading, router]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
    }).format(price);
  };

  // Display a loading state while checking for user authentication
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  // If user is not logged in, this will be briefly visible before redirect
  if (!user) {
    return (
        <div className="flex justify-center items-center min-h-screen">
            <p>Redirecting to login...</p>
        </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-2xl mx-auto pt-16 pb-24 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
        <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
          Checkout
        </h1>

        <div className="mt-12 lg:grid lg:grid-cols-12 lg:gap-x-12 xl:gap-x-16">
          <section className="lg:col-span-7">
            <div className="bg-white p-6 shadow-md rounded-lg">
                <h2 className="text-lg font-medium text-gray-900">Shipping Information</h2>
                <form className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                  <div className="sm:col-span-2">
                    <label htmlFor="street" className="block text-sm font-medium text-gray-700">Street address</label>
                    <div className="mt-1">
                      <input type="text" name="street" id="street" value={shippingAddress.street} onChange={handleAddressChange} className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="city" className="block text-sm font-medium text-gray-700">City</label>
                    <div className="mt-1">
                      <input type="text" name="city" id="city" value={shippingAddress.city} onChange={handleAddressChange} className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="state" className="block text-sm font-medium text-gray-700">State / Province</label>
                    <div className="mt-1">
                      <input type="text" name="state" id="state" value={shippingAddress.state} onChange={handleAddressChange} className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700">ZIP / Postal code</label>
                    <div className="mt-1">
                      <input type="text" name="zipCode" id="zipCode" value={shippingAddress.zipCode} onChange={handleAddressChange} className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="country" className="block text-sm font-medium text-gray-700">Country</label>
                    <div className="mt-1">
                      <input type="text" name="country" id="country" value={shippingAddress.country} onChange={handleAddressChange} disabled className="block w-full border-gray-300 rounded-md shadow-sm sm:text-sm bg-gray-100" />
                    </div>
                  </div>
                </form>
            </div>

            <div className="bg-white p-6 shadow-md rounded-lg mt-8">
                <h2 className="text-lg font-medium text-gray-900">Payment Details</h2>
                <div className="mt-4">
                  <div className="space-y-4">
                    <div onClick={() => setPaymentMethod('UPI')} className={`relative block border rounded-lg p-4 cursor-pointer ${paymentMethod === 'UPI' ? 'border-indigo-600 ring-2 ring-indigo-600' : 'border-gray-300'}`}>
                      <h3 className="font-medium text-gray-900 flex items-center"><CreditCard className="w-5 h-5 mr-2" /> UPI</h3>
                      <p className="mt-1 text-sm text-gray-500">Pay with any UPI app.</p>
                    </div>
                    <div onClick={() => setPaymentMethod('COD')} className={`relative block border rounded-lg p-4 cursor-pointer ${paymentMethod === 'COD' ? 'border-indigo-600 ring-2 ring-indigo-600' : 'border-gray-300'}`}>
                      <h3 className="font-medium text-gray-900 flex items-center"><Landmark className="w-5 h-5 mr-2" /> Cash on Delivery</h3>
                      <p className="mt-1 text-sm text-gray-500">Pay with cash upon delivery.</p>
                    </div>
                  </div>
                </div>
            </div>
          </section>

          {/* Order summary */}
          <section className="mt-16 bg-white p-6 rounded-lg shadow-md lg:mt-0 lg:col-span-5">
            <h2 className="text-lg font-medium text-gray-900">Order summary</h2>

            <ul role="list" className="divide-y divide-gray-200 mt-4">
              {cartItems.map((product) => (
                <li key={product.id} className="flex items-center justify-between py-4">
                  <p>{product.name} x {product.quantity}</p>
                  <p>{formatPrice(product.price * product.quantity)}</p>
                </li>
              ))}
            </ul>

            <dl className="mt-6 space-y-4 border-t border-gray-200 pt-6">
              <div className="flex items-center justify-between">
                <dt className="text-sm">Subtotal</dt>
                <dd className="text-sm font-medium">{formatPrice(cartTotal)}</dd>
              </div>
              <div className="flex items-center justify-between">
                <dt className="text-sm">Shipping</dt>
                <dd className="text-sm font-medium">{formatPrice(5.00)}</dd>
              </div>
              <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                <dt className="text-base font-medium">Total</dt>
                <dd className="text-base font-medium">{formatPrice(cartTotal + 5.00)}</dd>
              </div>
            </dl>

            <div className="mt-6">
              <button
                onClick={handlePlaceOrder}
                disabled={isProcessing}
                className="w-full bg-indigo-600 border border-transparent rounded-md shadow-sm py-3 px-4 text-base font-medium text-white hover:bg-indigo-700 flex items-center justify-center disabled:bg-gray-400"
              >
                <Lock className="w-5 h-5 mr-2"/>
                {isProcessing ? 'Processing...' : 'Place Order'}
              </button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
} 