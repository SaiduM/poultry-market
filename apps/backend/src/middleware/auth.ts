import { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';
import { firebaseAuth } from '../config/firebase';
import { AuthRequest as CustomAuthRequest } from '../types';

const prisma = new PrismaClient();

// Define a local AuthRequest that can be exported
export interface AuthRequest extends Request {
  user: CustomAuthRequest['user'];
}

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const authReq = req as AuthRequest;
  const authHeader = req.headers.authorization;
  
  // If no Firebase config, allow development mode with a mock user
  if (!firebaseAuth) {
    if (process.env.NODE_ENV === 'development') {
      console.warn('⚠️  Development mode: Using mock authentication');
      // Create a mock user for development
      authReq.user = {
        id: 'dev-user-id',
        email: 'dev@example.com',
        role: 'USER',
        isActive: true,
      };
      next();
      return;
    } else {
      res.status(500).json({ message: 'Authentication service not configured' });
      return;
    }
  }

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({ message: 'Unauthorized: No token provided' });
    return;
  }

  const idToken = authHeader.split('Bearer ')[1];

  try {
    const decodedToken = await firebaseAuth.verifyIdToken(idToken);
    const firebaseUid = decodedToken.uid;

    const user = await prisma.user.findUnique({
      where: { firebaseUid },
      select: {
        id: true,
        email: true,
        role: true,
        isActive: true,
      },
    });

    if (!user) {
      res.status(401).json({ message: 'Unauthorized: User not found in database' });
      return;
    }

    if (!user.isActive) {
      res.status(403).json({ message: 'Forbidden: User is not active' });
      return;
    }

    authReq.user = user;
    next();
  } catch (error) {
    console.error('Error verifying Firebase ID token:', error);
    res.status(401).json({ message: 'Unauthorized: Invalid token' });
    return;
  }
};

export const requireRole = (roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const authReq = req as AuthRequest;
    if (!authReq.user) {
      res.status(401).json({ error: 'Authentication required' });
      return;
    }

    if (!roles.includes(authReq.user.role)) {
      res.status(403).json({ error: 'Insufficient permissions' });
      return;
    }

    next();
  };
};

export const requireVerified = (req: Request, res: Response, next: NextFunction): void => {
  const authReq = req as AuthRequest;
  if (!authReq.user) {
    res.status(401).json({ error: 'Authentication required' });
    return;
  }

  // Note: isVerified field exists in database but not in the select query above
  // You can add it to the select query if needed
  next();
}; 