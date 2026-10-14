import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { 
  Search, 
  ShoppingBag, 
  Heart, 
  Mail, 
  ShieldCheck, 
  Menu, 
  X,
  User,
  SlidersHorizontal
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const { 
    activeTab, 
    setActiveTab, 
    setSelectedCategory,
    cartCount, 
    setIsCartOpen, 
    wishlistCount, 
    setIsWishlistOpen,
    unreadEmailCount,
    setIsEmailDrawerOpen,
    setIsSearchOpen
  } = useShop();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (tab: 'home' | 'shop' | 'dashboard' | 'admin', category?: string) => {
    setActiveTab(tab);
    if (category) {
      setSelectedCategory(category);
    }
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#EAE6DF] transition-all w-full max-w-full overflow-hidden">
      {/* Slim Top Announcement Strip */}
      <div className="bg-[#1A1816] text-[#E6DEC8] text-[10px] sm:text-[11px] py-1.5 px-3 sm:px-4 tracking-wider uppercase w-full">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 truncate text-stone-300">
            <span className="hidden sm:inline text-stone-400">Complimentary 100% Insured Armored Delivery across India</span>
            <span className="sm:hidden font-medium truncate">100% Insured Delivery</span>
            <span className="text-[#C5A880]">·</span>
            <span className="text-[#D4AF37] font-semibold whitespace-nowrap">Code: ROYAL10</span>
          </div>

          <div className="flex items-center gap-2 sm:gap-4 shrink-0">
            {/* Pure INR Currency Display */}
            <div className="flex items-center gap-1 text-stone-300">
              <span className="hidden sm:inline text-[10px] text-stone-400">Currency:</span>
              <span className="px-1.5 py-0.5 rounded text-[10px] bg-[#C5A880] text-black font-semibold whitespace-nowrap">
                ₹ INR
              </span>
            </div>

            <button
              onClick={() => handleNavClick('admin')}
              className="hidden md:flex items-center gap-1 text-[#C5A880] hover:text-[#E6DEC8] transition-colors text-[10px] tracking-widest uppercase font-medium"
            >
              <SlidersHorizontal className="w-3 h-3" />
              <span>Atelier Admin</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-2 sm:gap-6 w-full">
        {/* Mobile Left: Hamburger menu & Search */}
        <div className="flex items-center gap-1 sm:gap-2 lg:hidden shrink-0">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1.5 text-stone-700 hover:text-stone-900 transition-colors"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
          <button
            onClick={() => setIsSearchOpen(true)}
            className="p-1.5 text-stone-700 hover:text-stone-900 transition-colors"
            aria-label="Search catalog"
          >
            <Search className="w-4 h-4" />
          </button>
        </div>

        {/* Brand Zone (Wordmark) */}
        <div className="text-center flex flex-col items-center shrink min-w-0 px-1">
          <button 
            onClick={() => handleNavClick('home')}
            className="group flex flex-col items-center max-w-[200px] sm:max-w-none"
          >
            <span className="font-editorial text-lg sm:text-2xl lg:text-3xl font-medium tracking-[0.12em] sm:tracking-[0.2em] text-[#1A1816] uppercase truncate w-full">
              TULSI JEWELLERS
            </span>
            <span className="text-[8px] sm:text-[9px] tracking-[0.25em] sm:tracking-[0.35em] text-[#8C827A] uppercase -mt-0.5 sm:-mt-1 font-sans truncate">
              Indian Fine Jewellery
            </span>
          </button>
        </div>

        {/* Navigation Links Zone */}
        <nav className="hidden lg:flex items-center gap-8 text-[13px] font-medium tracking-widest uppercase text-stone-700">
          <button
            onClick={() => handleNavClick('home')}
            className={`py-1 relative transition-colors hover:text-[#1A1816] ${activeTab === 'home' ? 'text-[#1A1816] font-semibold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[#1A1816]' : ''}`}
          >
            Home
          </button>
          <button
            onClick={() => handleNavClick('shop', 'necklaces')}
            className={`py-1 relative transition-colors hover:text-[#1A1816] ${activeTab === 'shop' ? 'text-[#1A1816] font-semibold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[#1A1816]' : ''}`}
          >
            Necklaces
          </button>
          <button
            onClick={() => handleNavClick('shop', 'rings')}
            className="py-1 relative transition-colors hover:text-[#1A1816]"
          >
            Rings
          </button>
          <button
            onClick={() => handleNavClick('shop', 'earrings')}
            className="py-1 relative transition-colors hover:text-[#1A1816]"
          >
            Earrings
          </button>
          <button
            onClick={() => handleNavClick('dashboard')}
            className={`py-1 relative transition-colors hover:text-[#1A1816] ${activeTab === 'dashboard' ? 'text-[#1A1816] font-semibold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[#1A1816]' : ''}`}
          >
            Track Orders
          </button>
        </nav>

        {/* Action Controls Zone */}
        <div className="flex items-center gap-1 sm:gap-3 shrink-0">
          {/* Search Button (Desktop only; on mobile it's on the left next to menu) */}
          <button
            onClick={() => setIsSearchOpen(true)}
            className="hidden lg:flex items-center gap-2 p-2 text-stone-700 hover:text-stone-900 transition-colors"
            title="Search Necklaces, Rings & Earrings"
          >
            <Search className="w-4 h-4" />
          </button>

          {/* User Account / Dashboard (Desktop only; on mobile bottom bar has Orders) */}
          <button
            onClick={() => handleNavClick('dashboard')}
            className={`hidden sm:block p-2 transition-colors ${activeTab === 'dashboard' ? 'text-[#1A1816]' : 'text-stone-700 hover:text-stone-900'}`}
            title="Customer Account & Order Tracking"
          >
            <User className="w-4 h-4" />
          </button>

          {/* Automated Email Notifications Tray Button */}
          <button
            onClick={() => setIsEmailDrawerOpen(true)}
            className="relative p-1.5 sm:p-2 text-stone-700 hover:text-stone-900 transition-colors"
            title="Automated Email Notifications (Order Confirmations & Tracking)"
          >
            <Mail className="w-4 h-4" />
            {unreadEmailCount > 0 && (
              <span className="absolute top-0.5 right-0.5 flex items-center justify-center min-w-[15px] h-3.5 px-0.5 text-[9px] font-bold text-white bg-[#C5A880] rounded-full">
                {unreadEmailCount}
              </span>
            )}
          </button>

          {/* Wishlist Button (Desktop only; on mobile bottom bar has Wishlist) */}
          <button
            onClick={() => setIsWishlistOpen(true)}
            className="hidden sm:block relative p-2 text-stone-700 hover:text-stone-900 transition-colors"
            title="Wishlist"
          >
            <Heart className="w-4 h-4" />
            {wishlistCount > 0 && (
              <span className="absolute top-1 right-1 flex items-center justify-center min-w-[16px] h-4 px-1 text-[10px] font-bold text-white bg-[#1A1816] rounded-full">
                {wishlistCount}
              </span>
            )}
          </button>

          {/* Shopping Bag / Cart Button */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative p-1.5 sm:p-2 text-stone-700 hover:text-stone-900 transition-colors flex items-center gap-1"
            title="Shopping Bag"
          >
            <ShoppingBag className="w-4 h-4" />
            <span className="text-[11px] sm:text-xs font-semibold tabular-nums text-stone-900">
              {cartCount}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-stone-200 bg-white px-4 py-5 shadow-lg">
          <nav className="flex flex-col gap-4 text-sm font-medium tracking-wider uppercase text-stone-800">
            <button
              onClick={() => handleNavClick('home')}
              className="text-left py-1 hover:text-[#C5A880]"
            >
              Home
            </button>
            <button
              onClick={() => handleNavClick('shop', 'necklaces')}
              className="text-left py-1 hover:text-[#C5A880]"
            >
              Necklaces
            </button>
            <button
              onClick={() => handleNavClick('shop', 'rings')}
              className="text-left py-1 hover:text-[#C5A880]"
            >
              Rings
            </button>
            <button
              onClick={() => handleNavClick('shop', 'earrings')}
              className="text-left py-1 hover:text-[#C5A880]"
            >
              Earrings
            </button>
            <button
              onClick={() => handleNavClick('dashboard')}
              className="text-left py-1 hover:text-[#C5A880]"
            >
              Order Tracking & Account
            </button>
            <button
              onClick={() => handleNavClick('admin')}
              className="text-left py-1 text-[#C5A880] font-semibold flex items-center gap-2"
            >
              <SlidersHorizontal className="w-4 h-4" />
              Owner / Admin Portal
            </button>
          </nav>
        </div>
      )}
    </header>
  );
};
