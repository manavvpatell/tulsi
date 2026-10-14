import React, { useState, useMemo } from 'react';
import { useShop } from '../context/ShopContext';
import { Product, ProductCategory, MetalCraft } from '../types';
import { 
  Heart, 
  ShoppingBag, 
  Eye, 
  Search, 
  SlidersHorizontal, 
  RotateCcw,
  Star,
  Check
} from 'lucide-react';

export const ProductCatalog: React.FC = () => {
  const { 
    products, 
    selectedCategory, 
    setSelectedCategory, 
    searchQuery, 
    setSearchQuery,
    setSelectedProduct,
    addToCart,
    toggleWishlist,
    isInWishlist,
    formatPrice
  } = useShop();

  // Filter States
  const [selectedCraft, setSelectedCraft] = useState<string>('all');
  const [selectedPurity, setSelectedPurity] = useState<string>('all');
  const [priceRange, setPriceRange] = useState<number>(300000);
  const [inStockOnly, setInStockOnly] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<string>('featured');
  const [showFilterDrawer, setShowFilterDrawer] = useState<boolean>(false);

  // Category counts
  const counts = useMemo(() => {
    return {
      all: products.length,
      necklaces: products.filter((p) => p.category === 'necklaces').length,
      rings: products.filter((p) => p.category === 'rings').length,
      earrings: products.filter((p) => p.category === 'earrings').length,
    };
  }, [products]);

  // Filtered & Sorted Products
  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        // Category Filter
        if (selectedCategory !== 'all' && p.category !== selectedCategory) {
          return false;
        }
        // Craft Filter
        if (selectedCraft !== 'all' && p.craft !== selectedCraft) {
          return false;
        }
        // Purity Filter
        if (selectedPurity !== 'all' && p.goldPurity !== selectedPurity) {
          return false;
        }
        // Price Filter
        if (p.price > priceRange) {
          return false;
        }
        // In-stock Filter
        if (inStockOnly && !p.inStock) {
          return false;
        }
        // Search Query
        if (searchQuery.trim()) {
          const query = searchQuery.toLowerCase();
          const matchName = p.name.toLowerCase().includes(query);
          const matchDesc = p.description.toLowerCase().includes(query);
          const matchCraft = p.craft.toLowerCase().includes(query);
          const matchSku = p.sku.toLowerCase().includes(query);
          if (!matchName && !matchDesc && !matchCraft && !matchSku) {
            return false;
          }
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.price - b.price;
        if (sortBy === 'price-desc') return b.price - a.price;
        if (sortBy === 'rating') return b.rating - a.rating;
        if (sortBy === 'name') return a.name.localeCompare(b.name);
        return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
      });
  }, [products, selectedCategory, selectedCraft, selectedPurity, priceRange, inStockOnly, searchQuery, sortBy]);

  const resetAllFilters = () => {
    setSelectedCategory('all');
    setSelectedCraft('all');
    setSelectedPurity('all');
    setPriceRange(300000);
    setInStockOnly(false);
    setSearchQuery('');
    setSortBy('featured');
  };

  const hasActiveFilters = 
    selectedCategory !== 'all' || 
    selectedCraft !== 'all' || 
    selectedPurity !== 'all' || 
    priceRange < 300000 || 
    inStockOnly || 
    searchQuery.trim() !== '';

  return (
    <section id="catalog-section" className="py-16 bg-[#FAFAF8] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Title mirroring Screenshot 2 */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="text-xs uppercase tracking-[0.25em] text-[#8C7D6B] font-medium block mb-2">
            The Royal Atelier
          </span>
          <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl text-[#1A1816] font-normal tracking-tight">
            Our Products
          </h2>
          <p className="text-stone-500 text-sm mt-3 font-light">
            Each necklace, ring, and earring is handcrafted with BIS 916 hallmarked 22K gold, certified natural diamonds, and antique temple finishes.
          </p>
          <div className="w-12 h-0.5 bg-[#C5A880] mx-auto mt-4" />
        </div>

        {/* Primary Category Switcher Tabs */}
        <div className="flex items-center justify-start sm:justify-center gap-2 sm:gap-4 border-b border-[#EAE6DF] pb-4 mb-8 overflow-x-auto w-full">
          {[
            { id: 'all', label: 'All Collections', count: counts.all },
            { id: 'necklaces', label: 'Necklaces', count: counts.necklaces },
            { id: 'rings', label: 'Rings', count: counts.rings },
            { id: 'earrings', label: 'Earrings', count: counts.earrings }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedCategory(tab.id)}
              className={`px-4 py-2 text-xs uppercase tracking-widest font-semibold transition-all relative whitespace-nowrap ${
                selectedCategory === tab.id
                  ? 'text-[#1A1816] after:absolute after:bottom-[-17px] after:left-0 after:right-0 after:h-0.5 after:bg-[#1A1816]'
                  : 'text-stone-500 hover:text-stone-800'
              }`}
            >
              {tab.label} <span className="text-[11px] font-normal text-stone-400">({tab.count})</span>
            </button>
          ))}
        </div>

        {/* Filter & Search Bar */}
        <div className="bg-white p-4 sm:p-5 rounded-sm border border-[#EAE6DF] shadow-sm mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          
          {/* Search Input */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search necklaces, rings, jhumkas, polki..."
              className="w-full pl-9 pr-4 py-2 text-xs bg-stone-50 border border-stone-200 rounded-sm focus:outline-none focus:border-[#C5A880] transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700 text-xs"
              >
                Clear
              </button>
            )}
          </div>

          {/* Quick Craft Filter Pills */}
          <div className="hidden lg:flex items-center gap-1.5 overflow-x-auto text-[11px]">
            <span className="text-stone-400 uppercase tracking-wider text-[10px] mr-1">Craft:</span>
            {[
              { id: 'all', label: 'All Crafts' },
              { id: 'Polki & Kundan', label: 'Polki & Kundan' },
              { id: 'Solitaire Diamond', label: 'Solitaire Diamond' },
              { id: 'Antique Temple', label: 'Antique Temple' },
              { id: '22K Royal Gold', label: '22K Royal Gold' }
            ].map((craft) => (
              <button
                key={craft.id}
                onClick={() => setSelectedCraft(craft.id)}
                className={`px-3 py-1.5 rounded-sm uppercase tracking-wider font-medium transition-colors whitespace-nowrap ${
                  selectedCraft === craft.id
                    ? 'bg-[#1A1816] text-[#F9F7F2]'
                    : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                }`}
              >
                {craft.label}
              </button>
            ))}
          </div>

          {/* Sort & Mobile Filter Toggle */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowFilterDrawer(!showFilterDrawer)}
              className={`flex items-center gap-1.5 px-3.5 py-2 text-xs uppercase tracking-wider font-medium border rounded-sm transition-colors ${
                showFilterDrawer || hasActiveFilters
                  ? 'border-[#1A1816] bg-stone-100 text-stone-900'
                  : 'border-stone-200 text-stone-700 hover:border-stone-400'
              }`}
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Filters</span>
              {hasActiveFilters && (
                <span className="w-2 h-2 rounded-full bg-[#C5A880]" />
              )}
            </button>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2 text-xs bg-white border border-stone-200 rounded-sm focus:outline-none focus:border-[#C5A880] text-stone-700 uppercase tracking-wider"
            >
              <option value="featured">Featured Curations</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Highest Patron Rating</option>
              <option value="name">Name (A-Z)</option>
            </select>
          </div>
        </div>

        {/* Expandable Advanced Filter Panel */}
        {showFilterDrawer && (
          <div className="bg-white p-6 rounded-sm border border-[#EAE6DF] shadow-md mb-8 animate-in slide-in-from-top-3">
            <div className="flex items-center justify-between pb-4 border-b border-stone-100 mb-6">
              <h3 className="font-editorial text-lg font-medium text-stone-900">
                Refine Selection
              </h3>
              {hasActiveFilters && (
                <button
                  onClick={resetAllFilters}
                  className="flex items-center gap-1.5 text-xs text-[#8C7D6B] hover:text-stone-900 transition-colors uppercase tracking-wider"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset All</span>
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {/* Category */}
              <div>
                <label className="text-[11px] uppercase tracking-wider text-stone-500 font-semibold block mb-2">
                  Category
                </label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full text-xs p-2 bg-stone-50 border border-stone-200 rounded-sm"
                >
                  <option value="all">All Pieces</option>
                  <option value="necklaces">Necklaces & Chokers</option>
                  <option value="rings">Solitaire & Cocktail Rings</option>
                  <option value="earrings">Jhumkas & Chandbalis</option>
                </select>
              </div>

              {/* Gold Purity */}
              <div>
                <label className="text-[11px] uppercase tracking-wider text-stone-500 font-semibold block mb-2">
                  Gold Purity (BIS Hallmark)
                </label>
                <div className="flex gap-2">
                  {['all', '22K', '18K'].map((purity) => (
                    <button
                      key={purity}
                      onClick={() => setSelectedPurity(purity)}
                      className={`flex-1 py-1.5 text-xs uppercase tracking-wider rounded-sm border transition-colors ${
                        selectedPurity === purity
                          ? 'border-[#1A1816] bg-[#1A1816] text-white font-semibold'
                          : 'border-stone-200 bg-stone-50 text-stone-700 hover:bg-stone-100'
                      }`}
                    >
                      {purity === 'all' ? 'All' : `${purity}`}
                    </button>
                  ))}
                </div>
              </div>

              {/* Max Price Slider */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-[11px] uppercase tracking-wider text-stone-500 font-semibold">
                    Max Price
                  </label>
                  <span className="text-xs font-semibold tabular-nums text-stone-900">
                    {formatPrice(priceRange)}
                  </span>
                </div>
                <input
                  type="range"
                  min="50000"
                  max="300000"
                  step="10000"
                  value={priceRange}
                  onChange={(e) => setPriceRange(Number(e.target.value))}
                  className="w-full accent-[#1A1816] cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-stone-400 mt-1">
                  <span>{formatPrice(50000)}</span>
                  <span>{formatPrice(300000)}</span>
                </div>
              </div>

              {/* Availability */}
              <div className="flex flex-col justify-end">
                <label className="flex items-center gap-2 cursor-pointer p-2 bg-stone-50 rounded-sm border border-stone-200">
                  <input
                    type="checkbox"
                    checked={inStockOnly}
                    onChange={(e) => setInStockOnly(e.target.checked)}
                    className="accent-[#1A1816] w-4 h-4 rounded"
                  />
                  <span className="text-xs uppercase tracking-wider text-stone-700 font-medium">
                    In Stock Only (Ready to Ship)
                  </span>
                </label>
              </div>
            </div>
          </div>
        )}

        {/* Results Counter & Active Filter Pills */}
        <div className="flex items-center justify-between mb-6 text-xs text-stone-500">
          <div>
            Showing <span className="font-semibold text-stone-900 tabular-nums">{filteredProducts.length}</span> pieces
            {searchQuery && <span> matching &ldquo;{searchQuery}&rdquo;</span>}
          </div>

          {hasActiveFilters && (
            <button
              onClick={resetAllFilters}
              className="text-[#8C7D6B] hover:text-stone-900 transition-colors uppercase tracking-wider text-[11px]"
            >
              Clear filters
            </button>
          )}
        </div>

        {/* Product Cards Grid mirroring screenshot 2 */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-sm border border-[#EAE6DF] p-8">
            <h3 className="font-editorial text-2xl text-stone-800 mb-2">No Matching Pieces Found</h3>
            <p className="text-sm text-stone-500 max-w-md mx-auto mb-6">
              We could not find any fine jewellery matching your current filter criteria.
            </p>
            <button
              onClick={resetAllFilters}
              className="px-6 py-2.5 bg-[#1A1816] text-[#F9F7F2] text-xs uppercase tracking-widest font-semibold rounded-sm hover:bg-stone-800 transition-colors"
            >
              Reset Filters & View All
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
            {filteredProducts.map((product) => {
              const inWish = isInWishlist(product.id);
              return (
                <div
                  key={product.id}
                  className="group flex flex-col bg-white rounded-sm border border-[#EAE6DF] hover:border-stone-400 hover:shadow-md transition-all duration-300"
                >
                  {/* Image Container with Wishlist & Quick Actions */}
                  <div className="relative aspect-square overflow-hidden bg-[#FBF9F6]">
                    <img
                      src={product.image}
                      alt={product.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-500"
                    />

                    {/* Stock / Hot Tag */}
                    {product.featured && (
                      <span className="absolute top-3 left-3 px-2 py-0.5 bg-[#1A1816] text-[#F9F7F2] text-[10px] uppercase tracking-widest font-semibold rounded-sm">
                        Curated
                      </span>
                    )}

                    {/* Wishlist Heart Button */}
                    <button
                      onClick={() => toggleWishlist(product.id)}
                      aria-label="Toggle Wishlist"
                      className={`absolute top-3 right-3 p-2 rounded-full transition-all ${
                        inWish 
                          ? 'bg-rose-50 text-rose-600 shadow-sm' 
                          : 'bg-white/80 text-stone-600 hover:text-stone-900 hover:bg-white shadow-sm'
                      }`}
                    >
                      <Heart className={`w-4 h-4 ${inWish ? 'fill-rose-500' : ''}`} />
                    </button>

                    {/* Quick View Floating Action Bar on hover */}
                    <div className="absolute inset-x-3 bottom-3 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      <button
                        onClick={() => setSelectedProduct(product)}
                        className="flex-1 py-2 px-3 bg-white/95 backdrop-blur-sm text-stone-900 text-[11px] uppercase tracking-wider font-semibold rounded-sm shadow-sm hover:bg-[#1A1816] hover:text-white transition-colors flex items-center justify-center gap-1.5"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Quick View</span>
                      </button>
                      <button
                        onClick={() => addToCart(product, 1)}
                        className="p-2 bg-[#1A1816] text-white rounded-sm shadow-sm hover:bg-stone-800 transition-colors"
                        title="Add to Shopping Bag"
                      >
                        <ShoppingBag className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Product Details Section */}
                  <div className="p-4 sm:p-5 flex flex-col flex-1 justify-between text-center">
                    <div>
                      {/* Category Label */}
                      <span className="text-[10px] uppercase tracking-[0.2em] text-[#8C7D6B] font-medium block mb-1">
                        {product.category}
                      </span>

                      {/* Product Name */}
                      <button
                        onClick={() => setSelectedProduct(product)}
                        className="font-editorial text-base sm:text-lg font-medium text-[#1A1816] hover:text-[#8C7D6B] transition-colors line-clamp-1 block mx-auto"
                      >
                        {product.name}
                      </button>

                      {/* Metal & Purity Info */}
                      <p className="text-[11px] text-stone-500 mt-1">
                        {product.goldPurity} Gold · {product.grossWeight}
                      </p>

                      {/* Rating Stars */}
                      <div className="flex items-center justify-center gap-1 mt-2 text-stone-700">
                        <div className="flex items-center text-[#D4AF37]">
                          <Star className="w-3 h-3 fill-current" />
                        </div>
                        <span className="text-[11px] font-medium tabular-nums">{product.rating}</span>
                        <span className="text-[10px] text-stone-400">({product.reviewCount})</span>
                      </div>
                    </div>

                    {/* Price and Add to Bag */}
                    <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between">
                      <div className="text-left">
                        <span className="font-editorial text-lg font-semibold tabular-nums text-stone-900 block leading-tight">
                          {formatPrice(product.price)}
                        </span>
                        {product.originalPrice && (
                          <span className="text-[11px] text-stone-400 line-through tabular-nums">
                            {formatPrice(product.originalPrice)}
                          </span>
                        )}
                      </div>

                      <button
                        onClick={() => addToCart(product, 1)}
                        className="px-3 py-1.5 bg-stone-100 hover:bg-[#1A1816] text-stone-800 hover:text-white text-[11px] uppercase tracking-wider font-semibold rounded-sm transition-colors"
                      >
                        Add to Bag
                      </button>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>
    </section>
  );
};
