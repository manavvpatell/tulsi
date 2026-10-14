export type ProductCategory = 'necklaces' | 'rings' | 'earrings';

export type MetalCraft = 
  | '22K Royal Gold'
  | 'Polki & Kundan'
  | 'Solitaire Diamond'
  | 'Antique Temple'
  | 'Rose Gold & Diamonds';

export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  price: number; // in INR
  originalPrice?: number;
  craft: MetalCraft;
  goldPurity: '22K' | '18K' | '14K';
  grossWeight: string; // e.g., "24.5g"
  netGoldWeight?: string;
  diamondCarat?: string;
  stoneDetails?: string;
  image: string;
  gallery?: string[];
  description: string;
  rating: number;
  reviewCount: number;
  inStock: boolean;
  featured?: boolean;
  hallmarking: string; // e.g. "BIS 916 Hallmarked & IGI Certified"
  sku: string;
}

export interface CartItem {
  id: string; // unique cart item id
  productId: string;
  product: Product;
  quantity: number;
  selectedSize?: string; // e.g. "Ring Size 14" or "16 inch chain"
  selectedPurity?: string;
}

export interface WishlistItem {
  productId: string;
  addedAt: string;
}

export type OrderStatus = 
  | 'confirmed'
  | 'crafting'
  | 'quality_check'
  | 'shipped'
  | 'out_for_delivery'
  | 'delivered';

export interface OrderItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  category: ProductCategory;
  goldPurity: string;
}

export interface ShippingAddress {
  fullName: string;
  email: string;
  phone: string;
  street: string;
  landmark?: string;
  city: string;
  state: string;
  pincode: string;
  country: string;
}

export interface Order {
  id: string; // e.g., "ALU-98421"
  date: string;
  items: OrderItem[];
  subtotal: number;
  tax: number; // 3% GST
  shippingFee: number;
  discount: number;
  promoCode?: string;
  total: number;
  status: OrderStatus;
  trackingNumber: string;
  courierName: string;
  estimatedDelivery: string;
  shippingAddress: ShippingAddress;
  paymentMethod: 'UPI' | 'Credit/Debit Card' | 'Net Banking' | 'Cash on Delivery';
  paymentStatus: 'Paid' | 'Pending COD';
  statusHistory: {
    status: OrderStatus;
    timestamp: string;
    description: string;
  }[];
}

export interface Review {
  id: string;
  productId: string;
  productName: string;
  authorName: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  verifiedPurchase: boolean;
  helpfulCount: number;
  location?: string;
}

export interface EmailNotification {
  id: string;
  toEmail: string;
  subject: string;
  type: 'order_confirmation' | 'shipping_update';
  timestamp: string;
  read: boolean;
  orderId: string;
  trackingNumber?: string;
  courierName?: string;
  estimatedDelivery?: string;
  itemsSummary: string;
  totalAmount: number;
  shippingAddress: ShippingAddress;
}

export interface UserProfile {
  name: string;
  email: string;
  phone: string;
  shippingAddress: ShippingAddress;
}
