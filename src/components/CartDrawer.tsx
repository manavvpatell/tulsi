import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { X, Trash2, ShoppingBag, ArrowRight, ShieldCheck, Tag } from 'lucide-react';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    cartSubtotal,
    formatPrice,
    setIsCheckoutOpen,
    setActiveTab
  } = useShop();

  const [couponCode, setCouponCode] = useState<string>('');
  const [appliedPromo, setAppliedPromo] = useState<string | null>('ROYAL10');
  const [discountPercent, setDiscountPercent] = useState<number>(10);
  const [promoError, setPromoError] = useState<string | null>(null);

  if (!isCartOpen) return null;

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = couponCode.trim().toUpperCase();
    if (clean === 'ROYAL10') {
      setAppliedPromo('ROYAL10');
      setDiscountPercent(10);
      setPromoError(null);
    } else if (clean === 'FESTIVE15') {
      setAppliedPromo('FESTIVE15');
      setDiscountPercent(15);
      setPromoError(null);
    } else {
      setPromoError('Invalid promo code. Try ROYAL10 or FESTIVE15.');
    }
  };

  const discountAmount = appliedPromo ? Math.round((cartSubtotal * discountPercent) / 100) : 0;
  const taxableAmount = cartSubtotal - discountAmount;
  const gstAmount = Math.round(taxableAmount * 0.03); // 3% GST on jewelry
  const totalAmount = taxableAmount + gstAmount;

  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const handleContinueShopping = () => {
    setIsCartOpen(false);
    setActiveTab('shop');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col border-l border-[#EAE6DF]">
          
          {/* Header */}
          <div className="p-5 border-b border-stone-200 flex items-center justify-between bg-[#FAFAF8]">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-4 h-4 text-stone-900" />
              <h3 className="font-editorial text-xl font-medium tracking-wide text-stone-900">
                Your Shopping Bag
              </h3>
              <span className="text-xs text-stone-500 font-sans tabular-nums">
                ({cart.length} {cart.length === 1 ? 'piece' : 'pieces'})
              </span>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1.5 text-stone-400 hover:text-stone-900 transition-colors"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {cart.length === 0 ? (
              <div className="text-center py-24 px-4 flex flex-col items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-stone-100 flex items-center justify-center text-stone-400 mb-4">
                  <ShoppingBag className="w-8 h-8 stroke-1" />
                </div>
                <h4 className="font-editorial text-2xl text-stone-800 mb-2">Your Bag is Empty</h4>
                <p className="text-xs text-stone-500 max-w-xs mb-6 font-light leading-relaxed">
                  Discover our certified 22K gold chokers, radiant diamond rings, and temple earrings.
                </p>
                <button
                  onClick={handleContinueShopping}
                  className="px-6 py-2.5 bg-[#1A1816] text-[#F9F7F2] text-xs uppercase tracking-widest font-semibold rounded-sm hover:bg-stone-800 transition-colors"
                >
                  Explore Collection
                </button>
              </div>
            ) : (
              <>
                {/* Insured Delivery Banner */}
                <div className="p-3 bg-[#FAF8F5] border border-[#EAE3D6] rounded-sm flex items-center gap-2.5 text-xs text-stone-700">
                  <ShieldCheck className="w-4 h-4 text-[#C5A880] shrink-0" />
                  <span>
                    Your order qualifies for <strong>Complimentary Insured Courier</strong> by BlueDart Apex.
                  </span>
                </div>

                {/* Items List */}
                <div className="divide-y divide-stone-100 space-y-3">
                  {cart.map((item) => (
                    <div key={item.id} className="pt-3 first:pt-0 flex gap-4">
                      {/* Thumbnail */}
                      <div className="w-20 h-20 bg-stone-50 rounded-sm overflow-hidden shrink-0 border border-stone-200/60">
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover object-center"
                        />
                      </div>

                      {/* Details */}
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex items-start justify-between gap-2">
                            <h4 className="font-editorial text-sm font-medium text-stone-900 leading-snug">
                              {item.product.name}
                            </h4>
                            <button
                              onClick={() => removeFromCart(item.id)}
                              className="text-stone-400 hover:text-stone-800 transition-colors p-0.5"
                              title="Remove item"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                          
                          <p className="text-[11px] text-stone-500 mt-0.5">
                            {item.product.goldPurity} Gold · {item.selectedSize}
                          </p>
                        </div>

                        {/* Price & Quantity Stepper */}
                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center border border-stone-200 rounded-sm">
                            <button
                              onClick={() => updateQuantity(item.id, -1)}
                              className="px-2 py-0.5 text-stone-600 hover:text-black font-semibold text-xs"
                            >
                              -
                            </button>
                            <span className="px-2 py-0.5 text-xs font-semibold tabular-nums text-stone-800 min-w-[24px] text-center">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, 1)}
                              className="px-2 py-0.5 text-stone-600 hover:text-black font-semibold text-xs"
                            >
                              +
                            </button>
                          </div>

                          <span className="font-editorial text-base font-semibold tabular-nums text-stone-900">
                            {formatPrice(item.product.price * item.quantity)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Footer / Order Summary */}
          {cart.length > 0 && (
            <div className="p-5 border-t border-stone-200 bg-[#FAFAF8] space-y-4">
              
              {/* Promo Code Input */}
              <div>
                <form onSubmit={handleApplyPromo} className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-stone-400" />
                    <input
                      type="text"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      placeholder="Promo code (e.g. ROYAL10)"
                      className="w-full pl-8 pr-3 py-1.5 text-xs bg-white border border-stone-200 rounded-sm uppercase tracking-wider focus:outline-none focus:border-[#C5A880]"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-3.5 py-1.5 bg-stone-800 text-white text-xs uppercase tracking-wider font-semibold rounded-sm hover:bg-stone-900 transition-colors"
                  >
                    Apply
                  </button>
                </form>

                {appliedPromo && (
                  <div className="flex items-center justify-between text-[11px] text-emerald-800 mt-1.5 bg-emerald-50 px-2 py-1 rounded-sm border border-emerald-200">
                    <span>Applied Coupon: <strong>{appliedPromo}</strong> ({discountPercent}% Off)</span>
                    <button
                      onClick={() => {
                        setAppliedPromo(null);
                        setDiscountPercent(0);
                      }}
                      className="text-stone-500 hover:text-stone-900 text-[10px] underline"
                    >
                      Remove
                    </button>
                  </div>
                )}
                {promoError && (
                  <p className="text-[11px] text-rose-600 mt-1">{promoError}</p>
                )}
              </div>

              {/* Price Calculation breakdown */}
              <div className="space-y-1.5 text-xs text-stone-600 border-t border-stone-200/60 pt-3">
                <div className="flex justify-between">
                  <span>Bag Subtotal</span>
                  <span className="tabular-nums font-medium text-stone-900">{formatPrice(cartSubtotal)}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-700">
                    <span>Royal Discount ({discountPercent}%)</span>
                    <span className="tabular-nums font-medium">-{formatPrice(discountAmount)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>GST (3% Indian Precious Jewellery Tax)</span>
                  <span className="tabular-nums font-medium text-stone-900">{formatPrice(gstAmount)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Insured Armored Courier</span>
                  <span className="text-emerald-700 font-semibold uppercase text-[10px]">Complimentary</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-stone-200 text-sm font-semibold text-stone-900">
                  <span className="font-editorial text-base">Total Amount</span>
                  <span className="font-editorial text-xl tabular-nums">{formatPrice(totalAmount)}</span>
                </div>
              </div>

              {/* Checkout Action Button */}
              <button
                onClick={handleProceedToCheckout}
                className="w-full py-3.5 bg-[#1A1816] text-[#F9F7F2] text-xs uppercase tracking-widest font-semibold rounded-sm hover:bg-[#33302B] transition-colors flex items-center justify-center gap-2 shadow-sm"
              >
                <span>Proceed to Secure Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="text-center text-[10px] text-stone-400">
                Encrypted 256-bit SSL · BIS 916 Guaranteed Authenticity
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
