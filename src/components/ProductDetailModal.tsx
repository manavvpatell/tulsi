import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { 
  X, 
  Heart, 
  ShoppingBag, 
  ShieldCheck, 
  Truck, 
  Sparkles, 
  Star, 
  RotateCcw,
  Check,
  Award
} from 'lucide-react';

export const ProductDetailModal: React.FC = () => {
  const { 
    selectedProduct, 
    setSelectedProduct, 
    addToCart, 
    toggleWishlist, 
    isInWishlist, 
    formatPrice,
    reviews,
    setIsCheckoutOpen
  } = useShop();

  const [selectedSize, setSelectedSize] = useState<string>('Size 14');
  const [quantity, setQuantity] = useState<number>(1);
  const [activeTab, setActiveTab] = useState<'details' | 'authenticity' | 'reviews'>('details');

  if (!selectedProduct) return null;

  const inWish = isInWishlist(selectedProduct.id);
  const productReviews = reviews.filter((r) => r.productId === selectedProduct.id);

  const handleDirectCheckout = () => {
    addToCart(selectedProduct, quantity, selectedSize);
    setSelectedProduct(null);
    setIsCheckoutOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl bg-white rounded-sm shadow-2xl overflow-hidden border border-[#EAE6DF] max-h-[92vh] flex flex-col">
        
        {/* Close Button */}
        <button
          onClick={() => setSelectedProduct(null)}
          className="absolute top-4 right-4 z-10 p-2 text-stone-400 hover:text-stone-900 bg-white/80 rounded-full transition-colors shadow-sm"
          aria-label="Close product view"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="overflow-y-auto p-6 sm:p-8 flex-1">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            
            {/* Left Image Showcase */}
            <div className="md:col-span-6 space-y-4">
              <div className="aspect-square bg-stone-50 rounded-sm overflow-hidden border border-stone-200/60 relative group">
                <img
                  src={selectedProduct.image}
                  alt={selectedProduct.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm px-2.5 py-1 text-[10px] uppercase tracking-wider text-stone-700 rounded-sm border border-stone-200">
                  {selectedProduct.craft}
                </span>
              </div>

              {/* Hallmarking Trust Strip */}
              <div className="p-3.5 bg-[#FAF8F5] rounded-sm border border-[#EAE3D6] flex items-center gap-3">
                <ShieldCheck className="w-5 h-5 text-[#C5A880] shrink-0" />
                <div className="text-xs">
                  <span className="font-semibold text-stone-900 block">{selectedProduct.hallmarking}</span>
                  <span className="text-stone-500 text-[11px]">Laser-engraved government hallmark & tamper-sealed presentation casket</span>
                </div>
              </div>
            </div>

            {/* Right Product Buy Module */}
            <div className="md:col-span-6 flex flex-col">
              
              {/* Category & SKU */}
              <div className="flex items-center justify-between text-[11px] uppercase tracking-widest text-[#8C7D6B] mb-1">
                <span>{selectedProduct.category}</span>
                <span>SKU: {selectedProduct.sku}</span>
              </div>

              {/* Product Title */}
              <h2 className="font-editorial text-2xl sm:text-3xl text-stone-900 font-medium leading-tight mb-2">
                {selectedProduct.name}
              </h2>

              {/* Rating Summary */}
              <div className="flex items-center gap-2 mb-4">
                <div className="flex text-[#D4AF37]">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3.5 h-3.5 ${
                        i < Math.floor(selectedProduct.rating) ? 'fill-current' : 'text-stone-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-xs font-semibold tabular-nums text-stone-800">{selectedProduct.rating}</span>
                <span className="text-xs text-stone-400">·</span>
                <button
                  onClick={() => setActiveTab('reviews')}
                  className="text-xs text-stone-500 underline hover:text-stone-800"
                >
                  {selectedProduct.reviewCount} Patron Reviews
                </button>
              </div>

              {/* Price Block */}
              <div className="py-4 border-y border-stone-100 mb-6">
                <div className="flex items-baseline gap-3">
                  <span className="font-editorial text-3xl font-bold tabular-nums text-stone-900">
                    {formatPrice(selectedProduct.price)}
                  </span>
                  {selectedProduct.originalPrice && (
                    <span className="text-sm text-stone-400 line-through tabular-nums">
                      {formatPrice(selectedProduct.originalPrice)}
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-stone-500 mt-1">
                  Inclusive of all taxes (3% GST) · Complimentary Insured BlueDart Express Delivery
                </p>
              </div>

              {/* Specifications Matrix */}
              <div className="grid grid-cols-2 gap-2 text-xs mb-6 bg-stone-50 p-3 rounded-sm border border-stone-200/60">
                <div>
                  <span className="text-stone-400 text-[10px] uppercase block">Gold Purity</span>
                  <span className="font-semibold text-stone-800">{selectedProduct.goldPurity} Pure Gold</span>
                </div>
                <div>
                  <span className="text-stone-400 text-[10px] uppercase block">Gross Weight</span>
                  <span className="font-semibold text-stone-800">{selectedProduct.grossWeight}</span>
                </div>
                {selectedProduct.netGoldWeight && (
                  <div>
                    <span className="text-stone-400 text-[10px] uppercase block">Net Gold Weight</span>
                    <span className="font-semibold text-stone-800">{selectedProduct.netGoldWeight}</span>
                  </div>
                )}
                {selectedProduct.diamondCarat && (
                  <div>
                    <span className="text-stone-400 text-[10px] uppercase block">Diamond Specs</span>
                    <span className="font-semibold text-stone-800">{selectedProduct.diamondCarat}</span>
                  </div>
                )}
                {selectedProduct.stoneDetails && (
                  <div className="col-span-2 mt-1 pt-1 border-t border-stone-200/50">
                    <span className="text-stone-400 text-[10px] uppercase block">Natural Gemstones</span>
                    <span className="font-medium text-stone-800 text-[11px]">{selectedProduct.stoneDetails}</span>
                  </div>
                )}
              </div>

              {/* Size Selector for Rings or Necklaces */}
              {selectedProduct.category === 'rings' && (
                <div className="mb-6">
                  <div className="flex items-center justify-between text-xs mb-2">
                    <span className="uppercase tracking-wider font-semibold text-stone-700">Ring Size (Indian Standard)</span>
                    <span className="text-stone-400 text-[11px]">Complimentary Free Resizing</span>
                  </div>
                  <div className="flex flex-wrap sm:flex-nowrap gap-1.5 sm:gap-2">
                    {['Size 10', 'Size 12', 'Size 14', 'Size 16', 'Size 18'].map((sz) => (
                      <button
                        key={sz}
                        onClick={() => setSelectedSize(sz)}
                        className={`flex-1 min-w-[55px] py-1.5 text-xs rounded-sm border transition-colors ${
                          selectedSize === sz
                            ? 'border-[#1A1816] bg-[#1A1816] text-white font-semibold'
                            : 'border-stone-200 bg-white text-stone-700 hover:bg-stone-50'
                        }`}
                      >
                        {sz}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity and Actions */}
              <div className="flex flex-wrap sm:flex-nowrap items-center gap-2 sm:gap-4 mb-4">
                <div className="flex items-center border border-stone-200 rounded-sm">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-2 text-stone-600 hover:text-black font-semibold text-sm"
                  >
                    -
                  </button>
                  <span className="px-3 py-2 text-xs font-semibold tabular-nums text-stone-800 min-w-[32px] text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-2 text-stone-600 hover:text-black font-semibold text-sm"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={() => addToCart(selectedProduct, quantity, selectedSize)}
                  className="flex-1 py-3 px-6 bg-[#1A1816] text-white text-xs uppercase tracking-widest font-semibold rounded-sm hover:bg-[#33302B] transition-colors flex items-center justify-center gap-2 shadow-sm"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add to Bag</span>
                </button>

                <button
                  onClick={() => toggleWishlist(selectedProduct.id)}
                  aria-label="Wishlist"
                  className={`p-3 border rounded-sm transition-colors ${
                    inWish
                      ? 'border-rose-300 bg-rose-50 text-rose-600'
                      : 'border-stone-200 text-stone-600 hover:text-stone-900 hover:bg-stone-50'
                  }`}
                >
                  <Heart className={`w-4 h-4 ${inWish ? 'fill-rose-500' : ''}`} />
                </button>
              </div>

              {/* Direct Checkout Button */}
              <button
                onClick={handleDirectCheckout}
                className="w-full py-2.5 px-6 bg-[#FAF7F0] border border-[#C5A880] text-[#8C6D3B] hover:bg-[#F3EDE0] text-xs uppercase tracking-widest font-semibold rounded-sm transition-colors mb-6"
              >
                Instant Buy with Insured Courier
              </button>

              {/* Delivery Assurance */}
              <div className="flex items-center gap-4 text-xs text-stone-600 pt-4 border-t border-stone-100">
                <div className="flex items-center gap-1.5">
                  <Truck className="w-4 h-4 text-[#C5A880]" />
                  <span>Delivers in 3-5 Business Days</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <RotateCcw className="w-4 h-4 text-[#C5A880]" />
                  <span>15-Day Exchange Policy</span>
                </div>
              </div>

            </div>
          </div>

          {/* Detailed Tabs Section */}
          <div className="mt-10 pt-6 border-t border-stone-200">
            <div className="flex items-center gap-6 border-b border-stone-200 mb-6">
              <button
                onClick={() => setActiveTab('details')}
                className={`pb-3 text-xs uppercase tracking-widest font-semibold transition-colors relative ${
                  activeTab === 'details'
                    ? 'text-stone-900 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[#1A1816]'
                    : 'text-stone-400 hover:text-stone-700'
                }`}
              >
                Atelier Craftsmanship
              </button>
              <button
                onClick={() => setActiveTab('authenticity')}
                className={`pb-3 text-xs uppercase tracking-widest font-semibold transition-colors relative ${
                  activeTab === 'authenticity'
                    ? 'text-stone-900 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[#1A1816]'
                    : 'text-stone-400 hover:text-stone-700'
                }`}
              >
                Hallmarking & Certification
              </button>
              <button
                onClick={() => setActiveTab('reviews')}
                className={`pb-3 text-xs uppercase tracking-widest font-semibold transition-colors relative ${
                  activeTab === 'reviews'
                    ? 'text-stone-900 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[#1A1816]'
                    : 'text-stone-400 hover:text-stone-700'
                }`}
              >
                Patron Reviews ({productReviews.length})
              </button>
            </div>

            {/* Tab: Craftsmanship Details */}
            {activeTab === 'details' && (
              <div className="space-y-4 text-stone-600 text-xs sm:text-sm font-light leading-relaxed">
                <p>{selectedProduct.description}</p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
                  <div className="bg-stone-50 p-4 rounded-sm border border-stone-200/60">
                    <h4 className="font-editorial text-base text-stone-900 mb-1">Hand-Chiseled Nakshi</h4>
                    <p className="text-xs text-stone-500">Sculpted using antique repousse tools by hereditary goldsmith families.</p>
                  </div>
                  <div className="bg-stone-50 p-4 rounded-sm border border-stone-200/60">
                    <h4 className="font-editorial text-base text-stone-900 mb-1">Authentic Polki & Jadau</h4>
                    <p className="text-xs text-stone-500">Uncut diamonds handset into 24K pure gold foils without chemical adhesives.</p>
                  </div>
                  <div className="bg-stone-50 p-4 rounded-sm border border-stone-200/60">
                    <h4 className="font-editorial text-base text-stone-900 mb-1">Reversible Meenakari</h4>
                    <p className="text-xs text-stone-500">Exquisite enamel storytelling baked at 800°C for lifetime heirloom radiance.</p>
                  </div>
                </div>
              </div>
            )}

            {/* Tab: Hallmarking & Certification */}
            {activeTab === 'authenticity' && (
              <div className="space-y-4 text-xs sm:text-sm text-stone-600 leading-relaxed">
                <div className="p-4 bg-[#FAF8F5] border border-[#C5A880]/40 rounded-sm">
                  <h4 className="font-editorial text-base text-stone-900 font-semibold mb-2">Government BIS 916 Laser Hallmarked</h4>
                  <p className="text-stone-600 text-xs leading-relaxed">
                    Every gram of gold is tested and laser stamped at Government-approved Assaying and Hallmarking Centres (AHC). The physical authenticity card includes the unique 6-digit HUID (Hallmark Unique Identification Number) for complete digital verification on the BIS Care Portal.
                  </p>
                </div>
                <div className="p-4 bg-stone-50 border border-stone-200 rounded-sm">
                  <h4 className="font-editorial text-base text-stone-900 font-semibold mb-2">IGI & SGL Diamond Grading</h4>
                  <p className="text-stone-600 text-xs leading-relaxed">
                    All diamonds are guaranteed 100% natural, conflict-free, and accompanied by individual certificates detailing Carat, Color, Clarity, and Cut metrics.
                  </p>
                </div>
              </div>
            )}

            {/* Tab: Reviews */}
            {activeTab === 'reviews' && (
              <div>
                {productReviews.length === 0 ? (
                  <p className="text-xs text-stone-500 italic py-4">No reviews written for this specific piece yet. Be the first to share your experience!</p>
                ) : (
                  <div className="space-y-4">
                    {productReviews.map((rev) => (
                      <div key={rev.id} className="p-4 bg-stone-50 rounded-sm border border-stone-200">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-xs text-stone-900">{rev.authorName}</span>
                            {rev.verifiedPurchase && (
                              <span className="text-[10px] bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded-sm font-medium">
                                Verified Buyer
                              </span>
                            )}
                          </div>
                          <span className="text-[11px] text-stone-400">{rev.date}</span>
                        </div>
                        <div className="flex text-[#D4AF37] mb-2">
                          {[...Array(5)].map((_, idx) => (
                            <Star
                              key={idx}
                              className={`w-3 h-3 ${idx < rev.rating ? 'fill-current' : 'text-stone-300'}`}
                            />
                          ))}
                        </div>
                        <h5 className="text-xs font-semibold text-stone-800 mb-1">{rev.title}</h5>
                        <p className="text-xs text-stone-600 leading-relaxed">{rev.comment}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

          </div>

        </div>
      </div>
    </div>
  );
};
