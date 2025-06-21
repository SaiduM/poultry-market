"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaginatedResponseSchema = exports.PaginationSchema = exports.AuctionFiltersSchema = exports.ProductFiltersSchema = exports.SocketEvents = exports.BidFormSchema = exports.AuctionFormSchema = exports.ProductFormSchema = exports.RegisterFormSchema = exports.LoginFormSchema = exports.ApiResponseSchema = exports.PaymentSchema = exports.PaymentMethodSchema = exports.PaymentStatusSchema = exports.OrderSchema = exports.OrderStatusSchema = exports.BidSchema = exports.AuctionSchema = exports.AuctionStatusSchema = exports.ProductSchema = exports.ProductUnitSchema = exports.ProductSubcategorySchema = exports.ProductCategorySchema = exports.UserSchema = exports.UserRoleSchema = void 0;
var zod_1 = require("zod");
// User Types
exports.UserRoleSchema = zod_1.z.enum(['ADMIN', 'SELLER', 'BUYER']);
exports.UserSchema = zod_1.z.object({
    id: zod_1.z.string(),
    email: zod_1.z.string().email(),
    username: zod_1.z.string(),
    firstName: zod_1.z.string(),
    lastName: zod_1.z.string(),
    phone: zod_1.z.string().optional(),
    avatar: zod_1.z.string().optional(),
    role: exports.UserRoleSchema,
    isVerified: zod_1.z.boolean(),
    isActive: zod_1.z.boolean(),
    createdAt: zod_1.z.date(),
    updatedAt: zod_1.z.date(),
});
// Product Types
exports.ProductCategorySchema = zod_1.z.enum(['CHICKEN', 'HEN', 'EGG', 'OTHER']);
exports.ProductSubcategorySchema = zod_1.z.enum([
    'BROILER', 'LAYER', 'ROOSTER', 'CHICK',
    'LAYING_HEN', 'BROILER_HEN',
    'FRESH_EGG', 'ORGANIC_EGG', 'FERTILIZED_EGG',
    'FEED', 'EQUIPMENT', 'ACCESSORIES'
]);
exports.ProductUnitSchema = zod_1.z.enum(['PIECE', 'DOZEN', 'KILOGRAM', 'POUND', 'CARTON', 'CASE']);
exports.ProductSchema = zod_1.z.object({
    id: zod_1.z.string(),
    sellerId: zod_1.z.string(),
    name: zod_1.z.string(),
    description: zod_1.z.string(),
    category: exports.ProductCategorySchema,
    subcategory: exports.ProductSubcategorySchema,
    price: zod_1.z.number().positive(),
    quantity: zod_1.z.number().int().positive(),
    unit: exports.ProductUnitSchema,
    images: zod_1.z.array(zod_1.z.string()),
    isActive: zod_1.z.boolean(),
    isFeatured: zod_1.z.boolean(),
    createdAt: zod_1.z.date(),
    updatedAt: zod_1.z.date(),
});
// Auction Types
exports.AuctionStatusSchema = zod_1.z.enum(['SCHEDULED', 'ACTIVE', 'ENDED', 'CANCELLED', 'COMPLETED']);
exports.AuctionSchema = zod_1.z.object({
    id: zod_1.z.string(),
    productId: zod_1.z.string(),
    sellerId: zod_1.z.string(),
    title: zod_1.z.string(),
    description: zod_1.z.string(),
    startingPrice: zod_1.z.number().positive(),
    currentPrice: zod_1.z.number().positive(),
    reservePrice: zod_1.z.number().positive().optional(),
    minBidIncrement: zod_1.z.number().positive(),
    startTime: zod_1.z.date(),
    endTime: zod_1.z.date(),
    status: exports.AuctionStatusSchema,
    winnerId: zod_1.z.string().optional(),
    totalBids: zod_1.z.number().int().min(0),
    views: zod_1.z.number().int().min(0),
    createdAt: zod_1.z.date(),
    updatedAt: zod_1.z.date(),
});
// Bid Types
exports.BidSchema = zod_1.z.object({
    id: zod_1.z.string(),
    auctionId: zod_1.z.string(),
    bidderId: zod_1.z.string(),
    amount: zod_1.z.number().positive(),
    isWinning: zod_1.z.boolean(),
    createdAt: zod_1.z.date(),
});
// Order Types
exports.OrderStatusSchema = zod_1.z.enum(['PENDING', 'CONFIRMED', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED', 'REFUNDED']);
exports.OrderSchema = zod_1.z.object({
    id: zod_1.z.string(),
    buyerId: zod_1.z.string(),
    sellerId: zod_1.z.string(),
    auctionId: zod_1.z.string().optional(),
    orderNumber: zod_1.z.string(),
    status: exports.OrderStatusSchema,
    subtotal: zod_1.z.number().positive(),
    tax: zod_1.z.number().min(0),
    shipping: zod_1.z.number().min(0),
    total: zod_1.z.number().positive(),
    notes: zod_1.z.string().optional(),
    createdAt: zod_1.z.date(),
    updatedAt: zod_1.z.date(),
});
// Payment Types
exports.PaymentStatusSchema = zod_1.z.enum(['PENDING', 'PROCESSING', 'COMPLETED', 'FAILED', 'REFUNDED', 'CANCELLED']);
exports.PaymentMethodSchema = zod_1.z.enum(['CREDIT_CARD', 'DEBIT_CARD', 'BANK_TRANSFER', 'PAYPAL', 'STRIPE']);
exports.PaymentSchema = zod_1.z.object({
    id: zod_1.z.string(),
    orderId: zod_1.z.string(),
    amount: zod_1.z.number().positive(),
    currency: zod_1.z.string(),
    method: exports.PaymentMethodSchema,
    status: exports.PaymentStatusSchema,
    stripePaymentId: zod_1.z.string().optional(),
    createdAt: zod_1.z.date(),
    updatedAt: zod_1.z.date(),
});
// API Response Types
var ApiResponseSchema = function (dataSchema) {
    return zod_1.z.object({
        success: zod_1.z.boolean(),
        data: dataSchema.optional(),
        message: zod_1.z.string().optional(),
        error: zod_1.z.string().optional(),
    });
};
exports.ApiResponseSchema = ApiResponseSchema;
// Form Types
exports.LoginFormSchema = zod_1.z.object({
    email: zod_1.z.string().email('Invalid email address'),
    password: zod_1.z.string().min(6, 'Password must be at least 6 characters'),
});
exports.RegisterFormSchema = zod_1.z.object({
    email: zod_1.z.string().email('Invalid email address'),
    username: zod_1.z.string().min(3, 'Username must be at least 3 characters'),
    firstName: zod_1.z.string().min(2, 'First name must be at least 2 characters'),
    lastName: zod_1.z.string().min(2, 'Last name must be at least 2 characters'),
    phone: zod_1.z.string().optional(),
    password: zod_1.z.string().min(6, 'Password must be at least 6 characters'),
    confirmPassword: zod_1.z.string(),
}).refine(function (data) { return data.password === data.confirmPassword; }, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
});
exports.ProductFormSchema = zod_1.z.object({
    name: zod_1.z.string().min(3, 'Product name must be at least 3 characters'),
    description: zod_1.z.string().min(10, 'Description must be at least 10 characters'),
    category: exports.ProductCategorySchema,
    subcategory: exports.ProductSubcategorySchema,
    price: zod_1.z.number().positive('Price must be positive'),
    quantity: zod_1.z.number().int().positive('Quantity must be a positive integer'),
    unit: exports.ProductUnitSchema,
});
exports.AuctionFormSchema = zod_1.z.object({
    productId: zod_1.z.string(),
    title: zod_1.z.string().min(5, 'Title must be at least 5 characters'),
    description: zod_1.z.string().min(20, 'Description must be at least 20 characters'),
    startingPrice: zod_1.z.number().positive('Starting price must be positive'),
    reservePrice: zod_1.z.number().positive('Reserve price must be positive').optional(),
    minBidIncrement: zod_1.z.number().positive('Minimum bid increment must be positive'),
    startTime: zod_1.z.date(),
    endTime: zod_1.z.date(),
}).refine(function (data) { return data.endTime > data.startTime; }, {
    message: "End time must be after start time",
    path: ["endTime"],
});
exports.BidFormSchema = zod_1.z.object({
    amount: zod_1.z.number().positive('Bid amount must be positive'),
});
// Socket Event Types
exports.SocketEvents = {
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
};
// Filter Types
exports.ProductFiltersSchema = zod_1.z.object({
    category: exports.ProductCategorySchema.optional(),
    subcategory: exports.ProductSubcategorySchema.optional(),
    minPrice: zod_1.z.number().positive().optional(),
    maxPrice: zod_1.z.number().positive().optional(),
    sellerId: zod_1.z.string().optional(),
    isFeatured: zod_1.z.boolean().optional(),
    search: zod_1.z.string().optional(),
});
exports.AuctionFiltersSchema = zod_1.z.object({
    status: exports.AuctionStatusSchema.optional(),
    minPrice: zod_1.z.number().positive().optional(),
    maxPrice: zod_1.z.number().positive().optional(),
    sellerId: zod_1.z.string().optional(),
    startDate: zod_1.z.date().optional(),
    endDate: zod_1.z.date().optional(),
    search: zod_1.z.string().optional(),
});
// Pagination Types
exports.PaginationSchema = zod_1.z.object({
    page: zod_1.z.number().int().positive(),
    limit: zod_1.z.number().int().positive().max(100),
    total: zod_1.z.number().int().min(0),
    totalPages: zod_1.z.number().int().min(0),
});
var PaginatedResponseSchema = function (dataSchema) {
    return zod_1.z.object({
        data: zod_1.z.array(dataSchema),
        pagination: exports.PaginationSchema,
    });
};
exports.PaginatedResponseSchema = PaginatedResponseSchema;
