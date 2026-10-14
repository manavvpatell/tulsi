/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ShopProvider, useShop } from './context/ShopContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { CategoryHighlights } from './components/CategoryHighlights';
import { ProductCatalog } from './components/ProductCatalog';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { WishlistDrawer } from './components/WishlistDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { EmailNotificationDrawer } from './components/EmailNotificationDrawer';
import { UserDashboard } from './components/UserDashboard';
import { AdminPortal } from './components/AdminPortal';
import { ReviewsSection } from './components/ReviewsSection';
import { StorySection } from './components/StorySection';
import { SearchModal } from './components/SearchModal';
import { ToastContainer } from './components/ToastContainer';
import { Footer } from './components/Footer';
import { MobileNavigation } from './components/MobileNavigation';

const AppContent: React.FC = () => {
  const { activeTab } = useShop();

  return (
    <div className="min-h-screen flex flex-col bg-[#FAFAF8] text-[#1A1816] w-full max-w-full overflow-x-hidden">
      {/* Navigation Top Bar */}
      <Navbar />

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-full overflow-x-hidden">
        {activeTab === 'home' && (
          <>
            <Hero />
            <CategoryHighlights />
            <ProductCatalog />
            <StorySection />
            <ReviewsSection />
          </>
        )}

        {activeTab === 'shop' && (
          <>
            <ProductCatalog />
            <ReviewsSection />
          </>
        )}

        {activeTab === 'dashboard' && <UserDashboard />}

        {activeTab === 'admin' && <AdminPortal />}
      </main>

      {/* Modals & Overlays */}
      <ProductDetailModal />
      <CartDrawer />
      <WishlistDrawer />
      <CheckoutModal />
      <EmailNotificationDrawer />
      <SearchModal />
      <ToastContainer />

      {/* Mobile Sticky Navigation Bar */}
      <MobileNavigation />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default function App() {
  return (
    <ShopProvider>
      <AppContent />
    </ShopProvider>
  );
}
