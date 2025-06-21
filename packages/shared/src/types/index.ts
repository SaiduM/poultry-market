import { z } from 'zod';

// User Types
export const UserRoleSchema = z.enum(['ADMIN', 'SELLER', 'BUYER']);
export type UserRole = z.infer<typeof UserRoleSchema>;

export const UserSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  username: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  phone: z.string().optional(),
  avatar: z.string().optional(),
  role: UserRoleSchema,
  isVerified: z.boolean(),
  isActive: z.boolean(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export type User = z.infer<typeof UserSchema>;

// Product Types
export const ProductCategorySchema = z.enum(['CHICKEN', 'HEN', 'EGG', 'OTHER']);
export type ProductCategory = z.infer<typeof ProductCategorySchema>;

export const ProductSubcategorySchema = z.enum([
  'BROILER', 'LAYER', 'ROOSTER', 'CHICK',
  'LAYING_HEN', 'BROILER_HEN',
  'FRESH_EGG', 'ORGANIC_EGG', 'FERTILIZED_EGG',
  'FEED', 'EQUIPMENT', 'ACCESSORIES'
]);
export type ProductSubcategory = z.infer<typeof ProductSubcategorySchema>;

export const ProductUnitSchema = z.enum(['PIECE', 'DOZEN', 'KILOGRAM', 'POUND', 'CARTON', 'CASE']);
export type ProductUnit = z.infer<typeof ProductUnitSchema>;

export const ProductSchema = z.object({
  id: z.string(),
  sellerId: z.string(),
  name: z.string(),
  description: z.string(),
  category: ProductCategorySchema,
  subcategory: ProductSubcategorySchema,
  price: z.number().positive(),
  quantity: z.number().int().positive(),
  unit: ProductUnitSchema,
  images: z.array(z.string()),
  isActive: z.boolean(),
  isFeatured: z.boolean(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
  seller: UserSchema.pick({
    id: true,
    firstName: true,
    lastName: true,
    email: true,
  }).optional(),
});

export type Product = z.infer<typeof ProductSchema>;

// Auction Types
export const AuctionStatusSchema = z.enum(['SCHEDULED', 'ACTIVE', 'ENDED', 'CANCELLED', 'COMPLETED']);
export type AuctionStatus = z.infer<typeof AuctionStatusSchema>;

export const AuctionSchema = z.object({
  id: z.string(),
  productId: z.string(),
  sellerId: z.string(),
  title: z.string(),
  description: z.string(),
  startingPrice: z.number().positive(),
  currentPrice: z.number().positive(),
  reservePrice: z.number().positive().optional(),
  minBidIncrement: z.number().positive(),
  startTime: z.string().datetime(),
  endTime: z.string().datetime(),
  status: AuctionStatusSchema,
  winnerId: z.string().optional(),
  totalBids: z.number().int().min(0),
  views: z.number().int().min(0),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export type Auction = z.infer<typeof AuctionSchema>;

// Bid Types
export const BidSchema = z.object({
  id: z.string(),
  auctionId: z.string(),
  bidderId: z.string(),
  amount: z.number().positive(),
  isWinning: z.boolean(),
  createdAt: z.date(),
});

export type Bid = z.infer<typeof BidSchema>;

// Order Types
export const OrderStatusSchema = z.enum(['PENDING', 'CONFIRMED', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED', 'REFUNDED', 'COMPLETED']);
export type OrderStatus = z.infer<typeof OrderStatusSchema>;

export const OrderSchema = z.object({
  id: z.string(),
  buyerId: z.string(),
  sellerId: z.string(),
  auctionId: z.string().optional(),
  orderNumber: z.string(),
  status: OrderStatusSchema,
  subtotal: z.number().positive(),
  tax: z.number().min(0),
  shipping: z.number().min(0),
  total: z.number().positive(),
  notes: z.string().optional(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
  buyer: UserSchema.pick({
    id: true,
    firstName: true,
    lastName: true,
    email: true,
  }).optional(),
  seller: UserSchema.pick({
    id: true,
    firstName: true,
    lastName: true,
    email: true,
  }).optional(),
});

export type Order = z.infer<typeof OrderSchema>;

// Payment Types
export const PaymentStatusSchema = z.enum(['PENDING', 'PROCESSING', 'COMPLETED', 'FAILED', 'REFUNDED', 'CANCELLED']);
export type PaymentStatus = z.infer<typeof PaymentStatusSchema>;

export const PaymentMethodSchema = z.enum(['CREDIT_CARD', 'DEBIT_CARD', 'BANK_TRANSFER', 'PAYPAL', 'STRIPE']);
export type PaymentMethod = z.infer<typeof PaymentMethodSchema>;

export const PaymentSchema = z.object({
  id: z.string(),
  orderId: z.string(),
  amount: z.number().positive(),
  currency: z.string(),
  method: PaymentMethodSchema,
  status: PaymentStatusSchema,
  stripePaymentId: z.string().optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type Payment = z.infer<typeof PaymentSchema>;

// API Response Types
export const ApiResponseSchema = <T extends z.ZodTypeAny>(dataSchema: T) =>
  z.object({
    success: z.boolean(),
    data: dataSchema.optional(),
    message: z.string().optional(),
    error: z.string().optional(),
  });

export type ApiResponse<T> = {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
};

// Form Types
export const LoginFormSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export type LoginForm = z.infer<typeof LoginFormSchema>;

export const RegisterFormSchema = z.object({
  email: z.string().email('Invalid email address'),
  username: z.string().min(3, 'Username must be at least 3 characters'),
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  phone: z.string().optional(),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

export type RegisterForm = z.infer<typeof RegisterFormSchema>;

export const ProductFormSchema = z.object({
  name: z.string().min(3, 'Product name must be at least 3 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  category: ProductCategorySchema,
  subcategory: ProductSubcategorySchema,
  price: z.number().positive('Price must be positive'),
  quantity: z.number().int().positive('Quantity must be a positive integer'),
  unit: ProductUnitSchema,
});

export type ProductForm = z.infer<typeof ProductFormSchema>;

export const AuctionFormSchema = z.object({
  productId: z.string(),
  title: z.string().min(5, 'Title must be at least 5 characters'),
  description: z.string().min(20, 'Description must be at least 20 characters'),
  startingPrice: z.number().positive('Starting price must be positive'),
  reservePrice: z.number().positive('Reserve price must be positive').optional(),
  minBidIncrement: z.number().positive('Minimum bid increment must be positive'),
  startTime: z.date(),
  endTime: z.date(),
}).refine((data) => data.endTime > data.startTime, {
  message: "End time must be after start time",
  path: ["endTime"],
});

export type AuctionForm = z.infer<typeof AuctionFormSchema>;

export const BidFormSchema = z.object({
  amount: z.number().positive('Bid amount must be positive'),
});

export type BidForm = z.infer<typeof BidFormSchema>;

// Socket Event Types
export const SocketEvents = {
  // Auction events
  AUCTION_STARTED: 'auction:started',
  AUCTION_ENDING: 'auction:ending',
  AUCTION_ENDED: 'auction:ended',
  
  // Bid events
  BID_PLACED: 'bid:placed',
  BID_OUTBID: 'bid:outbid',
  BID_WINNING: 'bid:winning',
  
  // User events
  USER_JOINED: 'user:joined',
  USER_LEFT: 'user:left',
  
  // Notification events
  NOTIFICATION: 'notification',
} as const;

export type SocketEvent = typeof SocketEvents[keyof typeof SocketEvents];

// Filter Types
export const ProductFiltersSchema = z.object({
  category: ProductCategorySchema.optional(),
  subcategory: ProductSubcategorySchema.optional(),
  minPrice: z.number().positive().optional(),
  maxPrice: z.number().positive().optional(),
  sellerId: z.string().optional(),
  isFeatured: z.boolean().optional(),
  search: z.string().optional(),
});

export type ProductFilters = z.infer<typeof ProductFiltersSchema>;

export const AuctionFiltersSchema = z.object({
  status: AuctionStatusSchema.optional(),
  minPrice: z.number().positive().optional(),
  maxPrice: z.number().positive().optional(),
  sellerId: z.string().optional(),
  startDate: z.date().optional(),
  endDate: z.date().optional(),
  search: z.string().optional(),
});

export type AuctionFilters = z.infer<typeof AuctionFiltersSchema>;

// Pagination Types
export const PaginationSchema = z.object({
  page: z.number().int().positive(),
  limit: z.number().int().positive().max(100),
  total: z.number().int().min(0),
  totalPages: z.number().int().min(0),
});

export type Pagination = z.infer<typeof PaginationSchema>;

export const PaginatedResponseSchema = <T extends z.ZodTypeAny>(dataSchema: T) =>
  z.object({
    data: z.array(dataSchema),
    pagination: PaginationSchema,
  });

export type PaginatedResponse<T> = {
  data: T[];
  pagination: Pagination;
}; 