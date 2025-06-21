import { User as FirebaseUser } from 'firebase/auth';

export interface AppUser extends FirebaseUser {
  role?: string;
  // Add other custom user properties from your backend here
} 