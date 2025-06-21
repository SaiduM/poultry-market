import { User as FirebaseUser } from 'firebase/auth';
import { User as BackendUser } from '@poultry-marketplace/shared/types';

// This creates a comprehensive user type that includes
// all properties from the Firebase user object and all
// properties from our backend user schema.
export type AppUser = FirebaseUser & Partial<BackendUser>; 