// Application constants
export const APP_NAME = 'Poultry Marketplace';
export const APP_VERSION = '1.0.0';
export const APP_DESCRIPTION = 'A modern marketplace for bidding and buying fresh poultry products';

// API constants
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
export const API_TIMEOUT = 10000; // 10 seconds
export const API_RETRY_ATTEMPTS = 3;

// Pagination constants
export const DEFAULT_PAGE_SIZE = 10;
export const MAX_PAGE_SIZE = 100;
export const DEFAULT_PAGE = 1;

// File upload constants
export const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
export const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
export const MAX_IMAGES_PER_PRODUCT = 10;

// Authentication constants
export const JWT_EXPIRES_IN = '7d';
export const JWT_REFRESH_EXPIRES_IN = '30d';
export const PASSWORD_MIN_LENGTH = 6;
export const PASSWORD_MAX_LENGTH = 128;

// Auction constants
export const MIN_BID_INCREMENT = 1.00;
export const AUCTION_ENDING_WARNING_MINUTES = 5;
export const AUCTION_EXTENSION_MINUTES = 5;
export const MAX_AUCTION_DURATION_DAYS = 30;

// Product constants
export const PRODUCT_TITLE_MAX_LENGTH = 100;
export const PRODUCT_DESCRIPTION_MAX_LENGTH = 1000;
export const PRODUCT_PRICE_MIN = 0.01;
export const PRODUCT_PRICE_MAX = 999999.99;
export const PRODUCT_QUANTITY_MAX = 999999;

// User constants
export const USERNAME_MIN_LENGTH = 3;
export const USERNAME_MAX_LENGTH = 30;
export const FIRST_NAME_MAX_LENGTH = 50;
export const LAST_NAME_MAX_LENGTH = 50;
export const PHONE_MAX_LENGTH = 20;

// Order constants
export const ORDER_NUMBER_PREFIX = 'PM';
export const ORDER_NUMBER_LENGTH = 8;
export const MAX_ORDER_NOTES_LENGTH = 500;

// Payment constants
export const SUPPORTED_CURRENCIES = ['USD', 'EUR', 'GBP'] as const;
export const DEFAULT_CURRENCY = 'USD';
export const STRIPE_MIN_AMOUNT = 50; // 50 cents
export const STRIPE_MAX_AMOUNT = 99999999; // $999,999.99

// Notification constants
export const NOTIFICATION_TTL = 7 * 24 * 60 * 60 * 1000; // 7 days
export const MAX_NOTIFICATIONS_PER_USER = 1000;

// Cache constants
export const CACHE_TTL = {
  PRODUCTS: 5 * 60, // 5 minutes
  AUCTIONS: 30, // 30 seconds
  USER_PROFILE: 10 * 60, // 10 minutes
  CATEGORIES: 60 * 60, // 1 hour
  SEARCH_RESULTS: 2 * 60, // 2 minutes
};

// Rate limiting constants
export const RATE_LIMIT = {
  AUTH: { windowMs: 15 * 60 * 1000, max: 5 }, // 5 attempts per 15 minutes
  API: { windowMs: 15 * 60 * 1000, max: 100 }, // 100 requests per 15 minutes
  BIDDING: { windowMs: 60 * 1000, max: 10 }, // 10 bids per minute
  UPLOAD: { windowMs: 60 * 60 * 1000, max: 50 }, // 50 uploads per hour
};

// Validation constants
export const VALIDATION = {
  EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PHONE_REGEX: /^\+?[\d\s\-\(\)]+$/,
  PASSWORD_REGEX: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{6,}$/,
  USERNAME_REGEX: /^[a-zA-Z0-9_-]+$/,
  URL_REGEX: /^https?:\/\/.+/,
};

// Error messages
export const ERROR_MESSAGES = {
  // Authentication
  INVALID_CREDENTIALS: 'Invalid email or password',
  EMAIL_ALREADY_EXISTS: 'Email already exists',
  USERNAME_ALREADY_EXISTS: 'Username already exists',
  PASSWORD_TOO_WEAK: 'Password is too weak',
  TOKEN_EXPIRED: 'Token has expired',
  UNAUTHORIZED: 'Unauthorized access',
  
  // Products
  PRODUCT_NOT_FOUND: 'Product not found',
  PRODUCT_ALREADY_EXISTS: 'Product already exists',
  INVALID_PRODUCT_DATA: 'Invalid product data',
  PRODUCT_UPDATE_FAILED: 'Failed to update product',
  PRODUCT_DELETE_FAILED: 'Failed to delete product',
  
  // Auctions
  AUCTION_NOT_FOUND: 'Auction not found',
  AUCTION_ALREADY_EXISTS: 'Auction already exists',
  AUCTION_ENDED: 'Auction has ended',
  AUCTION_NOT_STARTED: 'Auction has not started yet',
  INVALID_BID_AMOUNT: 'Invalid bid amount',
  BID_TOO_LOW: 'Bid amount is too low',
  RESERVE_NOT_MET: 'Reserve price not met',
  
  // Orders
  ORDER_NOT_FOUND: 'Order not found',
  ORDER_ALREADY_EXISTS: 'Order already exists',
  INSUFFICIENT_STOCK: 'Insufficient stock',
  ORDER_UPDATE_FAILED: 'Failed to update order',
  
  // Payments
  PAYMENT_FAILED: 'Payment failed',
  PAYMENT_NOT_FOUND: 'Payment not found',
  INVALID_PAYMENT_METHOD: 'Invalid payment method',
  PAYMENT_ALREADY_PROCESSED: 'Payment already processed',
  
  // File upload
  FILE_TOO_LARGE: 'File is too large',
  INVALID_FILE_TYPE: 'Invalid file type',
  UPLOAD_FAILED: 'File upload failed',
  
  // General
  VALIDATION_ERROR: 'Validation error',
  SERVER_ERROR: 'Internal server error',
  NETWORK_ERROR: 'Network error',
  TIMEOUT_ERROR: 'Request timeout',
  NOT_FOUND: 'Resource not found',
  FORBIDDEN: 'Access forbidden',
};

// Success messages
export const SUCCESS_MESSAGES = {
  // Authentication
  LOGIN_SUCCESS: 'Login successful',
  REGISTER_SUCCESS: 'Registration successful',
  LOGOUT_SUCCESS: 'Logout successful',
  PASSWORD_RESET_SENT: 'Password reset email sent',
  PASSWORD_CHANGED: 'Password changed successfully',
  
  // Products
  PRODUCT_CREATED: 'Product created successfully',
  PRODUCT_UPDATED: 'Product updated successfully',
  PRODUCT_DELETED: 'Product deleted successfully',
  
  // Auctions
  AUCTION_CREATED: 'Auction created successfully',
  AUCTION_UPDATED: 'Auction updated successfully',
  AUCTION_DELETED: 'Auction deleted successfully',
  BID_PLACED: 'Bid placed successfully',
  
  // Orders
  ORDER_CREATED: 'Order created successfully',
  ORDER_UPDATED: 'Order updated successfully',
  ORDER_CANCELLED: 'Order cancelled successfully',
  
  // Payments
  PAYMENT_SUCCESS: 'Payment successful',
  PAYMENT_REFUNDED: 'Payment refunded successfully',
  
  // File upload
  FILE_UPLOADED: 'File uploaded successfully',
  
  // General
  OPERATION_SUCCESS: 'Operation completed successfully',
  DATA_SAVED: 'Data saved successfully',
  SETTINGS_UPDATED: 'Settings updated successfully',
};

// Status messages
export const STATUS_MESSAGES = {
  LOADING: 'Loading...',
  SAVING: 'Saving...',
  UPLOADING: 'Uploading...',
  PROCESSING: 'Processing...',
  CONNECTING: 'Connecting...',
  SEARCHING: 'Searching...',
  BIDDING: 'Placing bid...',
  PAYING: 'Processing payment...',
};

// UI constants
export const UI = {
  // Breakpoints (matching Tailwind CSS)
  BREAKPOINTS: {
    SM: 640,
    MD: 768,
    LG: 1024,
    XL: 1280,
    '2XL': 1536,
  },
  
  // Colors (matching design system)
  COLORS: {
    PRIMARY: {
      50: '#fef7ee',
      100: '#fdedd6',
      200: '#fad7ac',
      300: '#f6bb77',
      400: '#f19440',
      500: '#ed751a',
      600: '#de5a10',
      700: '#b8440f',
      800: '#933714',
      900: '#762f14',
    },
    SECONDARY: {
      50: '#f0f9ff',
      100: '#e0f2fe',
      200: '#bae6fd',
      300: '#7dd3fc',
      400: '#38bdf8',
      500: '#0ea5e9',
      600: '#0284c7',
      700: '#0369a1',
      800: '#075985',
      900: '#0c4a6e',
    },
    SUCCESS: {
      50: '#f0fdf4',
      100: '#dcfce7',
      200: '#bbf7d0',
      300: '#86efac',
      400: '#4ade80',
      500: '#22c55e',
      600: '#16a34a',
      700: '#15803d',
      800: '#166534',
      900: '#14532d',
    },
    WARNING: {
      50: '#fffbeb',
      100: '#fef3c7',
      200: '#fde68a',
      300: '#fcd34d',
      400: '#fbbf24',
      500: '#f59e0b',
      600: '#d97706',
      700: '#b45309',
      800: '#92400e',
      900: '#78350f',
    },
    ERROR: {
      50: '#fef2f2',
      100: '#fee2e2',
      200: '#fecaca',
      300: '#fca5a5',
      400: '#f87171',
      500: '#ef4444',
      600: '#dc2626',
      700: '#b91c1c',
      800: '#991b1b',
      900: '#7f1d1d',
    },
  },
  
  // Spacing
  SPACING: {
    XS: '0.25rem',
    SM: '0.5rem',
    MD: '1rem',
    LG: '1.5rem',
    XL: '2rem',
    '2XL': '3rem',
    '3XL': '4rem',
  },
  
  // Border radius
  BORDER_RADIUS: {
    SM: '0.25rem',
    MD: '0.375rem',
    LG: '0.5rem',
    XL: '0.75rem',
    '2XL': '1rem',
    FULL: '9999px',
  },
  
  // Shadows
  SHADOWS: {
    SM: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    MD: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
    LG: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
    XL: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
  },
  
  // Transitions
  TRANSITIONS: {
    FAST: '150ms ease-in-out',
    NORMAL: '200ms ease-in-out',
    SLOW: '300ms ease-in-out',
  },
};

// Feature flags
export const FEATURES = {
  REAL_TIME_BIDDING: true,
  LIVE_CHAT: false,
  PUSH_NOTIFICATIONS: true,
  SOCIAL_LOGIN: true,
  ADVANCED_SEARCH: true,
  RECOMMENDATIONS: false,
  ANALYTICS: true,
  MULTI_LANGUAGE: false,
  DARK_MODE: true,
  MOBILE_APP: false,
};

// Environment detection with proper type checking
const isClient = typeof globalThis !== 'undefined' && typeof globalThis.window !== 'undefined';

// Environment
export const ENV = {
  IS_DEVELOPMENT: process.env.NODE_ENV === 'development',
  IS_PRODUCTION: process.env.NODE_ENV === 'production',
  IS_TEST: process.env.NODE_ENV === 'test',
  IS_CLIENT: isClient,
  IS_SERVER: !isClient,
};

// Local storage keys
export const STORAGE_KEYS = {
  AUTH_TOKEN: 'auth_token',
  REFRESH_TOKEN: 'refresh_token',
  USER_PREFERENCES: 'user_preferences',
  CART_ITEMS: 'cart_items',
  RECENT_SEARCHES: 'recent_searches',
  THEME: 'theme',
  LANGUAGE: 'language',
};

// Session storage keys
export const SESSION_KEYS = {
  TEMP_CART: 'temp_cart',
  CHECKOUT_DATA: 'checkout_data',
  FORM_DATA: 'form_data',
};

// Cookie names
export const COOKIE_NAMES = {
  AUTH_TOKEN: 'auth_token',
  REFRESH_TOKEN: 'refresh_token',
  SESSION_ID: 'session_id',
  THEME: 'theme',
  LANGUAGE: 'language',
};

// HTTP status codes
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  UNPROCESSABLE_ENTITY: 422,
  INTERNAL_SERVER_ERROR: 500,
  BAD_GATEWAY: 502,
  SERVICE_UNAVAILABLE: 503,
} as const; 