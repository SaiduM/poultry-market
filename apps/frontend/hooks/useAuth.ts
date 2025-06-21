import { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../lib/firebase';
import { AppUser } from '@/types';

export function useAuth() {
  const [user, setUser] = useState<AppUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        // User is signed in, now fetch the custom user data from our backend
        const token = await firebaseUser.getIdToken();
        try {
          const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/me`, {
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          });

          if (response.ok) {
            const backendUser = await response.json();
            // Combine firebase user with backend user data
            setUser({ ...firebaseUser, ...backendUser });
          } else {
            // Handle case where user exists in Firebase but not in our DB
            setUser(firebaseUser as AppUser); 
          }
        } catch (error) {
          console.error("Failed to fetch user profile", error);
          setUser(firebaseUser as AppUser);
        }
      } else {
        // User is signed out
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return { user, loading };
} 