import { z } from 'zod';

// Common validation schemas
export const emailSchema = z.string().email('Invalid email address');
export const passwordSchema = z.string().min(6, 'Password must be at least 6 characters');
export const phoneSchema = z.string().regex(/^\+?[\d\s\-\(\)]+$/, 'Invalid phone number');

// Price validation
export const priceSchema = z.number().positive('Price must be positive');
export const quantitySchema = z.number().int().positive('Quantity must be a positive integer');

// Date validation
export const futureDateSchema = z.date().refine(
  (date) => date > new Date(),
  'Date must be in the future'
);

// File validation
export const imageFileSchema = z.object({
  size: z.number().max(5 * 1024 * 1024, 'File size must be less than 5MB'),
  type: z.string().regex(/^image\/(jpeg|jpg|png|webp)$/, 'Invalid image format'),
});

// URL validation
export const urlSchema = z.string().url('Invalid URL');

// ID validation
export const idSchema = z.string().min(1, 'ID is required');

// Pagination validation
export const paginationSchema = z.object({
  page: z.number().int().positive().default(1),
  limit: z.number().int().positive().max(100).default(10),
});

// Search validation
export const searchSchema = z.object({
  query: z.string().min(1, 'Search query is required').max(100, 'Search query too long'),
});

// Filter validation
export const filterSchema = z.object({
  category: z.string().optional(),
  minPrice: z.number().positive().optional(),
  maxPrice: z.number().positive().optional(),
  status: z.string().optional(),
});

// Validation helper functions
export const validateEmail = (email: string): boolean => {
  try {
    emailSchema.parse(email);
    return true;
  } catch {
    return false;
  }
};

export const validatePassword = (password: string): boolean => {
  try {
    passwordSchema.parse(password);
    return true;
  } catch {
    return false;
  }
};

export const validatePrice = (price: number): boolean => {
  try {
    priceSchema.parse(price);
    return true;
  } catch {
    return false;
  }
};

export const validateQuantity = (quantity: number): boolean => {
  try {
    quantitySchema.parse(quantity);
    return true;
  } catch {
    return false;
  }
};

export const validateFutureDate = (date: Date): boolean => {
  try {
    futureDateSchema.parse(date);
    return true;
  } catch {
    return false;
  }
};

// Form validation helpers
export const createFormValidator = <T extends z.ZodTypeAny>(schema: T) => {
  return (data: unknown) => {
    try {
      return { success: true, data: schema.parse(data) };
    } catch (error) {
      if (error instanceof z.ZodError) {
        return { success: false, errors: error.errors };
      }
      return { 
        success: false, 
        errors: [{ 
          code: 'custom',
          message: 'Validation failed',
          path: []
        }] 
      };
    }
  };
};

// Async validation helpers
export const validateAsync = async <T extends z.ZodTypeAny>(
  schema: T,
  data: unknown
): Promise<{ success: boolean; data?: z.infer<T>; errors?: z.ZodError['errors'] }> => {
  try {
    const result = await schema.parseAsync(data);
    return { success: true, data: result };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, errors: error.errors };
    }
    return { 
      success: false, 
      errors: [{ 
        code: 'custom',
        message: 'Validation failed',
        path: []
      }] 
    };
  }
};

// Sanitization helpers
export const sanitizeString = (str: string): string => {
  return str.trim().replace(/\s+/g, ' ');
};

export const sanitizeEmail = (email: string): string => {
  return email.toLowerCase().trim();
};

export const sanitizePhone = (phone: string): string => {
  return phone.replace(/[\s\-\(\)]/g, '');
};

// Type guards
export const isEmail = (value: unknown): value is string => {
  return typeof value === 'string' && validateEmail(value);
};

export const isPrice = (value: unknown): value is number => {
  return typeof value === 'number' && validatePrice(value);
};

export const isQuantity = (value: unknown): value is number => {
  return typeof value === 'number' && validateQuantity(value);
};

export const isFutureDate = (value: unknown): value is Date => {
  return value instanceof Date && validateFutureDate(value);
}; 