import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { 
  Product, 
  CartItem, 
  Order, 
  Review, 
  EmailNotification, 
  UserProfile, 
  OrderStatus,
  ShippingAddress
} from '../types';
import { INITIAL_PRODUCTS, INITIAL_REVIEWS, INITIAL_ORDERS } from '../data/initialProducts';

interface Toast {
  id: string;
  message: string;
  type?: 'success' | 'info' | 'gold';
}

interface ShopContextType {
  // Navigation & Modals
  activeTab: 'home' | 'shop' | 'dashboard' | 'admin';
  setActiveTab: (tab: 'home' | 'shop' | 'dashboard' | 'admin') => void;
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedProduct: Product | null;
  setSelectedProduct: (p: Product | null) => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isWishlistOpen: boolean;
  setIsWishlistOpen: (open: boolean) => void;
  isEmailDrawerOpen: boolean;
  setIsEmailDrawerOpen: (open: boolean) => void;
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  activeEmailToView: EmailNotification | null;
  setActiveEmailToView: (email: EmailNotification | null) => void;

  // Currency (INR only)
  currency: 'INR';
  formatPrice: (inrAmount: number) => string;

  // Products (Catalog & Admin)
  products: Product[];
  addProduct: (newProd: Omit<Product, 'id' | 'rating' | 'reviewCount' | 'sku'>) => void;
  deleteProduct: (id: string) => void;
  updateProduct: (updated: Product) => void;
  resetCatalog: () => void;

  // Cart
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number, size?: string) => void;
  removeFromCart: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, delta: number) => void;
  clearCart: () => void;
  cartCount: number;
  cartSubtotal: number;

  // Wishlist
  wishlist: string[]; // array of product IDs
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  wishlistCount: number;

  // Orders & Dashboard
  orders: Order[];
  createOrder: (orderData: {
    items: { product: Product; quantity: number }[];
    shippingAddress: ShippingAddress;
    paymentMethod: Order['paymentMethod'];
    promoCode?: string;
    discount: number;
  }) => Order;
  updateOrderStatus: (orderId: string, newStatus: OrderStatus, customNote?: string) => void;

  // Customer Profile
  userProfile: UserProfile;
  updateUserProfile: (profile: Partial<UserProfile>) => void;

  // Reviews
  reviews: Review[];
  addReview: (reviewData: Omit<Review, 'id' | 'date' | 'helpfulCount'>) => void;
  markReviewHelpful: (reviewId: string) => void;

  // Automated Email Notifications
  emailNotifications: EmailNotification[];
  unreadEmailCount: number;
  markEmailAsRead: (id: string) => void;
  markAllEmailsAsRead: () => void;
  sendCustomEmail: (notification: Omit<EmailNotification, 'id' | 'timestamp' | 'read'>) => void;

  // Toasts
  toasts: Toast[];
  showToast: (message: string, type?: 'success' | 'info' | 'gold') => void;
  dismissToast: (id: string) => void;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

export const ShopProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Navigation & Modals
  const [activeTab, setActiveTab] = useState<'home' | 'shop' | 'dashboard' | 'admin'>('home');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isEmailDrawerOpen, setIsEmailDrawerOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [activeEmailToView, setActiveEmailToView] = useState<EmailNotification | null>(null);

  // Currency (INR only)
  const currency = 'INR';

  // Toasts
  const [toasts, setToasts] = useState<Toast[]>([]);
  const showToast = (message: string, type: 'success' | 'info' | 'gold' = 'gold') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3800);
  };
  const dismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // User Profile
  const [userProfile, setUserProfile] = useState<UserProfile>(() => {
    const saved = localStorage.getItem('alukas_user_profile');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* fallback */ }
    }
    return {
      name: 'Manav Sharma',
      email: 'manavgameium@gmail.com',
      phone: '+91 98201 45892',
      shippingAddress: {
        fullName: 'Manav Sharma',
        email: 'manavgameium@gmail.com',
        phone: '+91 98201 45892',
        street: 'Flat 402, Royal Palms, 18th Main Road, Indiranagar',
        landmark: 'Near Defence Colony Post Office',
        city: 'Bengaluru',
        state: 'Karnataka',
        pincode: '560038',
        country: 'India'
      }
    };
  });

  useEffect(() => {
    localStorage.setItem('alukas_user_profile', JSON.stringify(userProfile));
  }, [userProfile]);

  const updateUserProfile = (profile: Partial<UserProfile>) => {
    setUserProfile((prev) => ({ ...prev, ...profile }));
    showToast('Profile information saved', 'success');
  };

  // Products
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('alukas_products');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* fallback */ }
    }
    return INITIAL_PRODUCTS;
  });

  useEffect(() => {
    localStorage.setItem('alukas_products', JSON.stringify(products));
  }, [products]);

  const addProduct = (newProd: Omit<Product, 'id' | 'rating' | 'reviewCount' | 'sku'>) => {
    const id = `prod-custom-${Date.now()}`;
    const sku = `ALU-${newProd.category.substring(0, 3).toUpperCase()}-${Math.floor(100 + Math.random() * 900)}`;
    const fullProduct: Product = {
      ...newProd,
      id,
      sku,
      rating: 5.0,
      reviewCount: 0
    };
    setProducts((prev) => [fullProduct, ...prev]);
    showToast(`Piece "${newProd.name}" added to catalog`, 'success');
  };

  const deleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
    // also remove from cart if present
    setCart((prev) => prev.filter((item) => item.productId !== id));
    // remove from wishlist
    setWishlist((prev) => prev.filter((wId) => wId !== id));
    showToast('Jewellery piece removed from catalog', 'info');
  };

  const updateProduct = (updated: Product) => {
    setProducts((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
    showToast(`Piece "${updated.name}" updated`, 'success');
  };

  const resetCatalog = () => {
    setProducts(INITIAL_PRODUCTS);
    localStorage.setItem('alukas_products', JSON.stringify(INITIAL_PRODUCTS));
    showToast('Catalog restored to master collection', 'info');
  };

  // Cart
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('alukas_cart');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* fallback */ }
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem('alukas_cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product: Product, quantity = 1, size?: string) => {
    setCart((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.productId === product.id && item.selectedSize === size
      );
      if (existingIndex > -1) {
        const next = [...prev];
        next[existingIndex].quantity += quantity;
        return next;
      } else {
        return [
          ...prev,
          {
            id: `cart-${Date.now()}-${Math.random()}`,
            productId: product.id,
            product,
            quantity,
            selectedSize: size || (product.category === 'rings' ? 'Size 14 (Standard)' : 'Standard Size')
          }
        ];
      }
    });
    showToast(`Added ${product.name} to your shopping bag`, 'gold');
    setIsCartOpen(true);
  };

  const removeFromCart = (cartItemId: string) => {
    setCart((prev) => prev.filter((item) => item.id !== cartItemId));
    showToast('Removed item from bag', 'info');
  };

  const updateQuantity = (cartItemId: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.id === cartItemId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartSubtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  // Wishlist
  const [wishlist, setWishlist] = useState<string[]>(() => {
    const saved = localStorage.getItem('alukas_wishlist');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* fallback */ }
    }
    return ['prod-neck-01', 'prod-ring-01'];
  });

  useEffect(() => {
    localStorage.setItem('alukas_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  const toggleWishlist = (productId: string) => {
    setWishlist((prev) => {
      if (prev.includes(productId)) {
        showToast('Removed from wishlist', 'info');
        return prev.filter((id) => id !== productId);
      } else {
        showToast('Added piece to your wishlist', 'gold');
        return [...prev, productId];
      }
    });
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);
  const wishlistCount = wishlist.length;

  // Orders
  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('alukas_orders');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* fallback */ }
    }
    return INITIAL_ORDERS;
  });

  useEffect(() => {
    localStorage.setItem('alukas_orders', JSON.stringify(orders));
  }, [orders]);

  // Automated Email Notifications System
  const [emailNotifications, setEmailNotifications] = useState<EmailNotification[]>(() => {
    const saved = localStorage.getItem('alukas_emails');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* fallback */ }
    }
    return [
      {
        id: 'email-init-01',
        toEmail: 'manavgameium@gmail.com',
        subject: 'Order Confirmed: #ALU-89241 – Handcrafted 22K Temple Ruby Jhumkas',
        type: 'order_confirmation',
        timestamp: 'April 11, 2026 · 10:25 AM',
        read: false,
        orderId: 'ALU-89241',
        trackingNumber: 'BLU-9842019IN',
        courierName: 'BlueDart Apex Armored Secure',
        estimatedDelivery: 'April 15, 2026',
        itemsSummary: '1x Devangana Temple Bell Ruby Jhumkas (22K Gold, Gross: 22.3g)',
        totalAmount: 91140,
        shippingAddress: {
          fullName: 'Manav Sharma',
          email: 'manavgameium@gmail.com',
          phone: '+91 98201 45892',
          street: 'Flat 402, Royal Palms, 18th Main Road, Indiranagar',
          landmark: 'Near Defence Colony Post Office',
          city: 'Bengaluru',
          state: 'Karnataka',
          pincode: '560038',
          country: 'India'
        }
      },
      {
        id: 'email-init-02',
        toEmail: 'manavgameium@gmail.com',
        subject: 'Dispatched via Insured Armored Transit: Order #ALU-89241',
        type: 'shipping_update',
        timestamp: 'April 14, 2026 · 09:42 AM',
        read: false,
        orderId: 'ALU-89241',
        trackingNumber: 'BLU-9842019IN',
        courierName: 'BlueDart Apex Armored Secure',
        estimatedDelivery: 'April 15, 2026',
        itemsSummary: '1x Devangana Temple Bell Ruby Jhumkas (22K Gold, Gross: 22.3g)',
        totalAmount: 91140,
        shippingAddress: {
          fullName: 'Manav Sharma',
          email: 'manavgameium@gmail.com',
          phone: '+91 98201 45892',
          street: 'Flat 402, Royal Palms, 18th Main Road, Indiranagar',
          landmark: 'Near Defence Colony Post Office',
          city: 'Bengaluru',
          state: 'Karnataka',
          pincode: '560038',
          country: 'India'
        }
      }
    ];
  });

  useEffect(() => {
    localStorage.setItem('alukas_emails', JSON.stringify(emailNotifications));
  }, [emailNotifications]);

  const unreadEmailCount = emailNotifications.filter((e) => !e.read).length;

  const markEmailAsRead = (id: string) => {
    setEmailNotifications((prev) =>
      prev.map((e) => (e.id === id ? { ...e, read: true } : e))
    );
  };

  const markAllEmailsAsRead = () => {
    setEmailNotifications((prev) => prev.map((e) => ({ ...e, read: true })));
  };

  const sendCustomEmail = (notification: Omit<EmailNotification, 'id' | 'timestamp' | 'read'>) => {
    const newEmail: EmailNotification = {
      ...notification,
      id: `email-${Date.now()}`,
      timestamp: new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }),
      read: false
    };
    setEmailNotifications((prev) => [newEmail, ...prev]);
    showToast(`Automated notification sent to ${notification.toEmail}`, 'gold');
  };

  // Order Placement
  const createOrder = ({
    items,
    shippingAddress,
    paymentMethod,
    promoCode,
    discount
  }: {
    items: { product: Product; quantity: number }[];
    shippingAddress: ShippingAddress;
    paymentMethod: Order['paymentMethod'];
    promoCode?: string;
    discount: number;
  }): Order => {
    const rawSubtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
    const tax = Math.round((rawSubtotal - discount) * 0.03); // 3% GST on jewelry
    const shippingFee = 0; // Complimentary insured courier
    const total = rawSubtotal - discount + tax + shippingFee;
    const orderNumber = `TJ-${Math.floor(10000 + Math.random() * 90000)}`;
    const trackingNumber = `BLU-${Math.floor(1000000 + Math.random() * 9000000)}IN`;
    const now = new Date();
    const dateFormatted = now.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
    
    // Delivery estimated in 4 business days
    const estDelivery = new Date(now.getTime() + 4 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });

    const newOrder: Order = {
      id: orderNumber,
      date: dateFormatted,
      items: items.map(({ product, quantity }) => ({
        productId: product.id,
        name: product.name,
        price: product.price,
        quantity,
        image: product.image,
        category: product.category,
        goldPurity: product.goldPurity
      })),
      subtotal: rawSubtotal,
      tax,
      shippingFee,
      discount,
      promoCode,
      total,
      status: 'confirmed',
      trackingNumber,
      courierName: 'BlueDart Apex Armored Secure',
      estimatedDelivery: estDelivery,
      shippingAddress,
      paymentMethod,
      paymentStatus: paymentMethod === 'Cash on Delivery' ? 'Pending COD' : 'Paid',
      statusHistory: [
        {
          status: 'confirmed',
          timestamp: `${now.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} · ${now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`,
          description: `Order received and confirmed via ${paymentMethod}. Master goldsmith notified.`
        }
      ]
    };

    setOrders((prev) => [newOrder, ...prev]);

    // Automated Order Confirmation Email triggered!
    const itemsSummary = items
      .map((i) => `${i.quantity}x ${i.product.name} (${i.product.goldPurity})`)
      .join(', ');

    sendCustomEmail({
      toEmail: shippingAddress.email || userProfile.email,
      subject: `Order Confirmed: #${orderNumber} – Certificate & Packaging Instructions`,
      type: 'order_confirmation',
      orderId: orderNumber,
      trackingNumber,
      courierName: 'BlueDart Apex Armored Secure',
      estimatedDelivery: estDelivery,
      itemsSummary,
      totalAmount: total,
      shippingAddress
    });

    clearCart();
    return newOrder;
  };

  const updateOrderStatus = (orderId: string, newStatus: OrderStatus, customNote?: string) => {
    let targetOrder: Order | undefined;
    const now = new Date();
    const timeString = `${now.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} · ${now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;

    setOrders((prev) =>
      prev.map((ord) => {
        if (ord.id === orderId) {
          targetOrder = ord;
          const statusLabels: Record<OrderStatus, string> = {
            confirmed: 'Order confirmed and registered in master vault.',
            crafting: 'Master artisan is hand-finishing your piece and certifying gold purity.',
            quality_check: 'Gemological inspection & BIS laser hallmarking verification completed.',
            shipped: 'Handed over to BlueDart Apex Armored Courier in tamper-evident seal.',
            out_for_delivery: 'Out for insured courier delivery with dedicated security escort.',
            delivered: 'Safely delivered to customer with physical receipt and authenticity card.'
          };

          const newHistory = [
            ...ord.statusHistory,
            {
              status: newStatus,
              timestamp: timeString,
              description: customNote || statusLabels[newStatus]
            }
          ];

          return {
            ...ord,
            status: newStatus,
            statusHistory: newHistory
          };
        }
        return ord;
      })
    );

    // If order transitioned to shipped or out_for_delivery, send automated shipping email notification!
    if (targetOrder) {
      if (newStatus === 'shipped' || newStatus === 'out_for_delivery') {
        const itemsSummary = targetOrder.items
          .map((i) => `${i.quantity}x ${i.name} (${i.goldPurity})`)
          .join(', ');

        sendCustomEmail({
          toEmail: targetOrder.shippingAddress.email,
          subject: `Shipping Update: Order #${targetOrder.id} is now ${newStatus === 'shipped' ? 'In Insured Transit' : 'Out for Delivery'}!`,
          type: 'shipping_update',
          orderId: targetOrder.id,
          trackingNumber: targetOrder.trackingNumber,
          courierName: targetOrder.courierName,
          estimatedDelivery: targetOrder.estimatedDelivery,
          itemsSummary,
          totalAmount: targetOrder.total,
          shippingAddress: targetOrder.shippingAddress
        });
      }
      showToast(`Order #${orderId} status updated to "${newStatus}"`, 'success');
    }
  };

  // Reviews
  const [reviews, setReviews] = useState<Review[]>(() => {
    const saved = localStorage.getItem('alukas_reviews');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* fallback */ }
    }
    return INITIAL_REVIEWS;
  });

  useEffect(() => {
    localStorage.setItem('alukas_reviews', JSON.stringify(reviews));
  }, [reviews]);

  const addReview = (reviewData: Omit<Review, 'id' | 'date' | 'helpfulCount'>) => {
    const newRev: Review = {
      ...reviewData,
      id: `rev-${Date.now()}`,
      date: new Date().toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric'
      }),
      helpfulCount: 0
    };
    setReviews((prev) => [newRev, ...prev]);

    // Update product rating and review count
    setProducts((prev) =>
      prev.map((p) => {
        if (p.id === reviewData.productId) {
          const nextCount = p.reviewCount + 1;
          const nextRating = Number(((p.rating * p.reviewCount + reviewData.rating) / nextCount).toFixed(1));
          return { ...p, reviewCount: nextCount, rating: nextRating };
        }
        return p;
      })
    );

    showToast('Thank you! Your verified review has been published.', 'success');
  };

  const markReviewHelpful = (reviewId: string) => {
    setReviews((prev) =>
      prev.map((r) => (r.id === reviewId ? { ...r, helpfulCount: r.helpfulCount + 1 } : r))
    );
    showToast('Feedback noted', 'info');
  };

  // Price Formatter (INR Only)
  const formatPrice = (inrAmount: number) => {
    return `₹${inrAmount.toLocaleString('en-IN')}`;
  };

  return (
    <ShopContext.Provider
      value={{
        activeTab,
        setActiveTab,
        selectedCategory,
        setSelectedCategory,
        searchQuery,
        setSearchQuery,
        selectedProduct,
        setSelectedProduct,
        isCartOpen,
        setIsCartOpen,
        isWishlistOpen,
        setIsWishlistOpen,
        isEmailDrawerOpen,
        setIsEmailDrawerOpen,
        isCheckoutOpen,
        setIsCheckoutOpen,
        isSearchOpen,
        setIsSearchOpen,
        activeEmailToView,
        setActiveEmailToView,
        currency,
        formatPrice,
        products,
        addProduct,
        deleteProduct,
        updateProduct,
        resetCatalog,
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartCount,
        cartSubtotal,
        wishlist,
        toggleWishlist,
        isInWishlist,
        wishlistCount,
        orders,
        createOrder,
        updateOrderStatus,
        userProfile,
        updateUserProfile,
        reviews,
        addReview,
        markReviewHelpful,
        emailNotifications,
        unreadEmailCount,
        markEmailAsRead,
        markAllEmailsAsRead,
        sendCustomEmail,
        toasts,
        showToast,
        dismissToast
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
};
