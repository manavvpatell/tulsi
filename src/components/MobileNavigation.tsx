import React from 'react';
import { useShop } from '../context/ShopContext';
import { Home, Sparkles, Heart, ShoppingBag, User } from 'lucide-react';

export const MobileNavigation: React.FC = () => {
  const { 
    activeTab, 
    setActiveTab, 
    cartCount, 
    setIsCartOpen, 
    wishlistCount, 
    setIsWishlistOpen 
  } = useShop();

  const handleNav = (tab: 'home' | 'shop' | 'dashboard' | 'admin') => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <nav className="fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-md border-t border-[#EAE6DF] lg:hidden h-14 px-3 flex items-center justify-around text-[10px] font-medium tracking-wider uppercase text-stone-600 shadow-lg">
      {/* Home */}
      <button
        onClick={() => handleNav('home')}
        className={`flex flex-col items-center justify-center gap-0.5 flex-1 py-1 transition-colors ${
          activeTab === 'home' ? 'text-[#1A1816] font-bold' : 'hover:text-[#1A1816]'
        }`}
      >
        <Home className="w-4 h-4" />
        <span>Home</span>
      </button>

      {/* Shop / Catalog */}
      <button
        onClick={() => handleNav('shop')}
        className={`flex flex-col items-center justify-center gap-0.5 flex-1 py-1 transition-colors ${
          activeTab === 'shop' ? 'text-[#1A1816] font-bold' : 'hover:text-[#1A1816]'
        }`}
      >
        <Sparkles className="w-4 h-4" />
        <span>Catalog</span>
      </button>

      {/* Wishlist */}
      <button
        onClick={() => setIsWishlistOpen(true)}
        className="relative flex flex-col items-center justify-center gap-0.5 flex-1 py-1 hover:text-[#1A1816] transition-colors"
      >
        <Heart className="w-4 h-4" />
        <span>Wishlist</span>
        {wishlistCount > 0 && (
          <span className="absolute top-0.5 right-4 w-3.5 h-3.5 bg-rose-500 text-white rounded-full text-[9px] flex items-center justify-center font-bold">
            {wishlistCount}
          </span>
        )}
      </button>

      {/* Bag / Cart */}
      <button
        onClick={() => setIsCartOpen(true)}
        className="relative flex flex-col items-center justify-center gap-0.5 flex-1 py-1 hover:text-[#1A1816] transition-colors"
      >
        <ShoppingBag className="w-4 h-4" />
        <span>Bag</span>
        {cartCount > 0 && (
          <span className="absolute top-0.5 right-4 w-3.5 h-3.5 bg-[#1A1816] text-white rounded-full text-[9px] flex items-center justify-center font-bold">
            {cartCount}
          </span>
        )}
      </button>

      {/* User Dashboard */}
      <button
        onClick={() => handleNav('dashboard')}
        className={`flex flex-col items-center justify-center gap-0.5 flex-1 py-1 transition-colors ${
          activeTab === 'dashboard' ? 'text-[#1A1816] font-bold' : 'hover:text-[#1A1816]'
        }`}
      >
        <User className="w-4 h-4" />
        <span>Orders</span>
      </button>
    </nav>
  );
};
