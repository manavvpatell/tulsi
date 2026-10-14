import React from 'react';
import { useShop } from '../context/ShopContext';

export const CategoryHighlights: React.FC = () => {
  const { setActiveTab, setSelectedCategory, products } = useShop();

  const necklaceCount = products.filter((p) => p.category === 'necklaces').length;
  const ringCount = products.filter((p) => p.category === 'rings').length;
  const earringCount = products.filter((p) => p.category === 'earrings').length;

  const categories = [
    {
      id: 'necklaces',
      title: 'Necklaces',
      count: `${necklaceCount} Masterpieces`,
      image: '/src/assets/images/category_necklace_banner_1791946992514.jpg',
      alt: 'Handcrafted Indian gold and gemstone necklaces'
    },
    {
      id: 'rings',
      title: 'Rings',
      count: `${ringCount} Solitaire & Filigree`,
      image: '/src/assets/images/product_solitaire_ring_1791946993300.jpg',
      alt: 'Indian 18K gold solitaire diamond rings'
    },
    {
      id: 'earrings',
      title: 'Earrings',
      count: `${earringCount} Jhumkas & Chandbalis`,
      image: '/src/assets/images/product_temple_jhumka_1791946992985.jpg',
      alt: 'Traditional Indian 22K temple gold earrings'
    },
    {
      id: 'polki-choker',
      categoryRedirect: 'necklaces',
      title: 'Royal Bridal Suites',
      count: 'Chokers & Sets',
      image: '/src/assets/images/product_polki_choker_1791946991224.jpg',
      alt: 'Bridal Kundan Polki Choker Suite'
    }
  ];

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
    setActiveTab('shop');
    window.scrollTo({ top: 380, behavior: 'smooth' });
  };

  return (
    <section className="py-16 md:py-20 bg-white border-b border-[#EAE6DF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs uppercase tracking-[0.25em] text-[#8C7D6B] font-medium block mb-2">
            Curated Categories
          </span>
          <h2 className="font-editorial text-3xl sm:text-4xl text-[#1A1816] font-normal tracking-tight">
            Explore Handcrafted Indian Heirlooms
          </h2>
          <div className="w-12 h-0.5 bg-[#C5A880] mx-auto mt-4" />
        </div>

        {/* 4 Cards Grid mirroring screenshot 4 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat) => (
            <div
              key={cat.id}
              onClick={() => handleCategoryClick(cat.categoryRedirect || cat.id)}
              className="group relative cursor-pointer overflow-hidden rounded-sm bg-stone-100 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
            >
              <div className="aspect-[4/5] overflow-hidden">
                <img
                  src={cat.image}
                  alt={cat.alt}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Minimal floating white pill label mirroring screenshot */}
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-white/95 backdrop-blur-sm px-4 sm:px-6 py-2.5 rounded-sm shadow-sm border border-stone-200/60 text-center w-[85%] max-w-[200px] transition-all group-hover:bg-[#1A1816] group-hover:text-white">
                <h3 className="font-editorial text-base sm:text-lg font-medium tracking-wide truncate">
                  {cat.title}
                </h3>
                <p className="text-[10px] sm:text-[11px] tracking-wider uppercase text-stone-500 group-hover:text-stone-300 truncate">
                  {cat.count}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
