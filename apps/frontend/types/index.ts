import { User as FirebaseUser } from 'firebase/auth';

export interface AppUser extends FirebaseUser {
  id: string; // This is the user ID from your own database
  role?: string;
  // Add other custom user properties from your backend here
} 