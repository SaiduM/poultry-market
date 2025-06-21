import { format, formatDistance, formatRelative, isValid } from 'date-fns';

// Currency formatting
export const formatCurrency = (
  amount: number,
  currency: string = 'USD',
  locale: string = 'en-US'
): string => {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
  }).format(amount);
};

export const formatPrice = (price: number): string => {
  return formatCurrency(price);
};

export const formatPriceRange = (min: number, max: number): string => {
  if (min === max) {
    return formatPrice(min);
  }
  return `${formatPrice(min)} - ${formatPrice(max)}`;
};

// Date formatting
export const formatDate = (date: Date | string, formatStr: string = 'MMM dd, yyyy'): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  if (!isValid(dateObj)) {
    return 'Invalid date';
  }
  
  return format(dateObj, formatStr);
};

export const formatDateTime = (date: Date | string): string => {
  return formatDate(date, 'MMM dd, yyyy HH:mm');
};

export const formatTime = (date: Date | string): string => {
  return formatDate(date, 'HH:mm');
};

export const formatRelativeTime = (date: Date | string): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  if (!isValid(dateObj)) {
    return 'Invalid date';
  }
  
  return formatDistance(dateObj, new Date(), { addSuffix: true });
};

export const formatRelativeDate = (date: Date | string): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  if (!isValid(dateObj)) {
    return 'Invalid date';
  }
  
  return formatRelative(dateObj, new Date());
};

// Number formatting
export const formatNumber = (
  num: number,
  locale: string = 'en-US',
  options?: Intl.NumberFormatOptions
): string => {
  return new Intl.NumberFormat(locale, options).format(num);
};

export const formatPercentage = (value: number, decimals: number = 1): string => {
  return `${value.toFixed(decimals)}%`;
};

export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

// Text formatting
export const capitalize = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

export const capitalizeWords = (str: string): string => {
  return str.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
};

export const truncate = (str: string, length: number, suffix: string = '...'): string => {
  if (str.length <= length) return str;
  return str.substring(0, length) + suffix;
};

export const slugify = (str: string): string => {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
};

export const formatPhoneNumber = (phone: string): string => {
  const cleaned = phone.replace(/\D/g, '');
  const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
  
  if (match) {
    return `(${match[1]}) ${match[2]}-${match[3]}`;
  }
  
  return phone;
};

// Auction specific formatting
export const formatAuctionTime = (endTime: Date | string): string => {
  const endDate = typeof endTime === 'string' ? new Date(endTime) : endTime;
  const now = new Date();
  const diff = endDate.getTime() - now.getTime();
  
  if (diff <= 0) {
    return 'Ended';
  }
  
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  
  if (days > 0) {
    return `${days}d ${hours}h ${minutes}m`;
  } else if (hours > 0) {
    return `${hours}h ${minutes}m`;
  } else {
    return `${minutes}m`;
  }
};

export const formatBidCount = (count: number): string => {
  if (count === 0) return 'No bids';
  if (count === 1) return '1 bid';
  return `${count} bids`;
};

export const formatViewCount = (count: number): string => {
  if (count === 0) return 'No views';
  if (count === 1) return '1 view';
  return `${count} views`;
};

// Product specific formatting
export const formatProductTitle = (title: string, maxLength: number = 50): string => {
  return truncate(title, maxLength);
};

export const formatProductDescription = (description: string, maxLength: number = 150): string => {
  return truncate(description, maxLength);
};

export const formatCategory = (category: string): string => {
  return capitalizeWords(category.replace(/_/g, ' '));
};

export const formatSubcategory = (subcategory: string): string => {
  return capitalizeWords(subcategory.replace(/_/g, ' '));
};

// User specific formatting
export const formatUserName = (firstName: string, lastName: string): string => {
  return `${capitalize(firstName)} ${capitalize(lastName)}`;
};

export const formatUserInitials = (firstName: string, lastName: string): string => {
  return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
};

// Order specific formatting
export const formatOrderNumber = (orderNumber: string): string => {
  return `#${orderNumber.toUpperCase()}`;
};

export const formatOrderStatus = (status: string): string => {
  return capitalizeWords(status.replace(/_/g, ' '));
};

// Address formatting
export const formatAddress = (
  street: string,
  city: string,
  state: string,
  zipCode: string,
  country: string = 'US'
): string => {
  const parts = [street, city, state, zipCode];
  if (country !== 'US') {
    parts.push(country);
  }
  return parts.join(', ');
};

// Time formatting
export const formatDuration = (seconds: number): string => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  
  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }
  return `${minutes}:${secs.toString().padStart(2, '0')}`;
};

// Rating formatting
export const formatRating = (rating: number, maxRating: number = 5): string => {
  return `${rating.toFixed(1)}/${maxRating}`;
};

export const formatRatingStars = (rating: number, maxRating: number = 5): string => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = maxRating - fullStars - (hasHalfStar ? 1 : 0);
  
  return '★'.repeat(fullStars) + (hasHalfStar ? '☆' : '') + '☆'.repeat(emptyStars);
}; 