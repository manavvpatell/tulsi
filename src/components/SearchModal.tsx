import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { Search, X, ArrowRight, Star } from 'lucide-react';

export const SearchModal: React.FC = () => {
  const { 
    isSearchOpen, 
    setIsSearchOpen, 
    products, 
    setSelectedProduct, 
    formatPrice,
    setActiveTab,
    setSelectedCategory
  } = useShop();

  const [query, setQuery] = useState('');

  if (!isSearchOpen) return null;

  const results = query.trim()
    ? products.filter((p) => {
        const q = query.toLowerCase();
        return (
          p.name.toLowerCase().includes(q) ||
          p.craft.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.sku.toLowerCase().includes(q)
        );
      })
    : [];

  const handleSelectProduct = (prod: any) => {
    setSelectedProduct(prod);
    setIsSearchOpen(false);
  };

  const handleSelectCategory = (cat: string) => {
    setSelectedCategory(cat);
    setActiveTab('shop');
    setIsSearchOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-start justify-center pt-20 p-4 animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-white rounded-sm shadow-2xl border border-stone-200 overflow-hidden">
        
        {/* Search Input Bar */}
        <div className="p-4 sm:p-5 border-b border-stone-200 flex items-center gap-3 bg-[#FAFAF8]">
          <Search className="w-5 h-5 text-stone-400 shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search gold chokers, solitaire rings, jhumkas, polki..."
            className="w-full text-sm sm:text-base bg-transparent border-none focus:outline-none text-stone-900 placeholder:text-stone-400 font-light"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-xs text-stone-400 hover:text-stone-700 px-2"
            >
              Clear
            </button>
          )}
          <button
            onClick={() => setIsSearchOpen(false)}
            className="p-1.5 text-stone-400 hover:text-stone-900 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Suggestion Pills */}
        <div className="p-4 bg-stone-50 border-b border-stone-100 flex items-center gap-2 overflow-x-auto text-xs">
          <span className="text-[10px] uppercase tracking-wider text-stone-400 font-semibold shrink-0">
            Popular:
          </span>
          {['Necklaces', 'Rings', 'Earrings', 'Polki & Kundan', 'Solitaire Diamond', 'Temple Gold'].map((tag) => (
            <button
              key={tag}
              onClick={() => setQuery(tag)}
              className="px-2.5 py-1 bg-white hover:bg-stone-200 text-stone-700 rounded-sm border border-stone-200/60 whitespace-nowrap text-[11px] transition-colors"
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Results Container */}
        <div className="max-h-[60vh] overflow-y-auto p-4 sm:p-5">
          {query.trim() === '' ? (
            <div className="py-8 text-center text-xs text-stone-400">
              Type keywords above to instantly locate certified Indian gold jewellery.
            </div>
          ) : results.length === 0 ? (
            <div className="py-8 text-center">
              <p className="text-sm text-stone-700">No matching jewellery pieces found.</p>
              <p className="text-xs text-stone-400 mt-1">Try searching for &ldquo;choker&rdquo;, &ldquo;ring&rdquo;, &ldquo;earring&rdquo; or &ldquo;gold&rdquo;.</p>
            </div>
          ) : (
            <div className="divide-y divide-stone-100 space-y-3">
              {results.map((prod) => (
                <div
                  key={prod.id}
                  onClick={() => handleSelectProduct(prod)}
                  className="pt-3 first:pt-0 flex items-center gap-4 cursor-pointer group hover:bg-stone-50 p-2 rounded-sm transition-colors"
                >
                  <div className="w-14 h-14 bg-stone-100 rounded-sm overflow-hidden shrink-0 border border-stone-200">
                    <img
                      src={prod.image}
                      alt={prod.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <span className="text-[10px] uppercase tracking-wider text-[#8C7D6B] font-medium block">
                      {prod.category} · {prod.goldPurity} Gold
                    </span>
                    <h4 className="font-editorial text-sm font-medium text-stone-900 group-hover:text-[#8C7D6B] transition-colors truncate">
                      {prod.name}
                    </h4>
                    <p className="text-[11px] text-stone-500 font-light truncate">
                      {prod.craft} · {prod.grossWeight}
                    </p>
                  </div>

                  <div className="text-right shrink-0">
                    <span className="font-editorial text-base font-semibold tabular-nums text-stone-900 block">
                      {formatPrice(prod.price)}
                    </span>
                    <span className="text-[10px] text-emerald-700 uppercase font-semibold">
                      In Stock
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
