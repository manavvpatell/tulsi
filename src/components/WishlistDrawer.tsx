import React from 'react';
import { useShop } from '../context/ShopContext';
import { X, Heart, ShoppingBag, Trash2 } from 'lucide-react';

export const WishlistDrawer: React.FC = () => {
  const {
    wishlist,
    isWishlistOpen,
    setIsWishlistOpen,
    toggleWishlist,
    products,
    addToCart,
    formatPrice,
    setActiveTab
  } = useShop();

  if (!isWishlistOpen) return null;

  const wishlistProducts = products.filter((p) => wishlist.includes(p.id));

  const handleMoveToBag = (product: any) => {
    addToCart(product, 1);
    toggleWishlist(product.id);
  };

  const handleExplore = () => {
    setIsWishlistOpen(false);
    setActiveTab('shop');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col border-l border-[#EAE6DF]">
          
          {/* Header */}
          <div className="p-5 border-b border-stone-200 flex items-center justify-between bg-[#FAFAF8]">
            <div className="flex items-center gap-2">
              <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
              <h3 className="font-editorial text-xl font-medium tracking-wide text-stone-900">
                Saved Wishlist
              </h3>
              <span className="text-xs text-stone-500 font-sans tabular-nums">
                ({wishlistProducts.length} {wishlistProducts.length === 1 ? 'piece' : 'pieces'})
              </span>
            </div>
            <button
              onClick={() => setIsWishlistOpen(false)}
              className="p-1.5 text-stone-400 hover:text-stone-900 transition-colors"
              aria-label="Close wishlist"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto p-5">
            {wishlistProducts.length === 0 ? (
              <div className="text-center py-24 px-4 flex flex-col items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-stone-100 flex items-center justify-center text-stone-400 mb-4">
                  <Heart className="w-8 h-8 stroke-1" />
                </div>
                <h4 className="font-editorial text-2xl text-stone-800 mb-2">Your Wishlist is Empty</h4>
                <p className="text-xs text-stone-500 max-w-xs mb-6 font-light leading-relaxed">
                  Save your desired Indian bridal chokers, cocktail rings, and temple earrings to review anytime.
                </p>
                <button
                  onClick={handleExplore}
                  className="px-6 py-2.5 bg-[#1A1816] text-[#F9F7F2] text-xs uppercase tracking-widest font-semibold rounded-sm hover:bg-stone-800 transition-colors"
                >
                  Browse Catalog
                </button>
              </div>
            ) : (
              <div className="space-y-4 divide-y divide-stone-100">
                {wishlistProducts.map((product) => (
                  <div key={product.id} className="pt-4 first:pt-0 flex gap-4 items-center">
                    {/* Thumbnail */}
                    <div className="w-20 h-20 bg-stone-50 rounded-sm overflow-hidden shrink-0 border border-stone-200">
                      <img
                        src={product.image}
                        alt={product.name}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover object-center"
                      />
                    </div>

                    {/* Details */}
                    <div className="flex-1 min-w-0">
                      <span className="text-[10px] uppercase tracking-wider text-[#8C7D6B] font-medium block">
                        {product.category}
                      </span>
                      <h4 className="font-editorial text-sm font-medium text-stone-900 truncate">
                        {product.name}
                      </h4>
                      <p className="text-[11px] text-stone-500 mt-0.5">
                        {product.goldPurity} Gold · {product.grossWeight}
                      </p>
                      <p className="font-editorial text-base font-semibold tabular-nums text-stone-900 mt-1">
                        {formatPrice(product.price)}
                      </p>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col gap-1.5 shrink-0">
                      <button
                        onClick={() => handleMoveToBag(product)}
                        className="p-2 bg-[#1A1816] hover:bg-stone-800 text-white rounded-sm text-xs transition-colors flex items-center justify-center"
                        title="Move to Shopping Bag"
                      >
                        <ShoppingBag className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => toggleWishlist(product.id)}
                        className="p-2 text-stone-400 hover:text-stone-700 rounded-sm text-xs transition-colors flex items-center justify-center"
                        title="Remove from Wishlist"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {wishlistProducts.length > 0 && (
            <div className="p-4 border-t border-stone-200 bg-[#FAFAF8]">
              <button
                onClick={() => {
                  wishlistProducts.forEach((p) => addToCart(p, 1));
                  setIsWishlistOpen(false);
                }}
                className="w-full py-3 bg-[#1A1816] text-[#F9F7F2] text-xs uppercase tracking-widest font-semibold rounded-sm hover:bg-stone-800 transition-colors flex items-center justify-center gap-2"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Move All to Bag</span>
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
