import 'firebase/auth';

declare module 'firebase/auth' {
  interface User {
    role?: string;
  }
} 