import React from 'react';
import { useShop } from '../context/ShopContext';
import { ShieldCheck, Truck, Sparkles, Award } from 'lucide-react';

export const Hero: React.FC = () => {
  const { setActiveTab, setSelectedCategory } = useShop();

  const handleShopClick = (category?: string) => {
    setActiveTab('shop');
    if (category) {
      setSelectedCategory(category);
    }
  };

  return (
    <section className="relative overflow-hidden bg-[#F4F1EA] border-b border-[#E8E2D7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 md:py-20 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Text Column */}
          <div className="lg:col-span-6 flex flex-col justify-center max-w-xl">
            <span className="text-[11px] sm:text-sm uppercase tracking-[0.25em] text-[#8C7D6B] font-medium mb-2 sm:mb-3">
              A Unique, Intangible Quality.
            </span>
            
            <h1 className="font-editorial text-3xl sm:text-5xl lg:text-6xl text-[#1A1816] font-normal leading-[1.15] mb-4 sm:mb-6 tracking-tight text-balance">
              Perfect Match for Elegant Impression
            </h1>

            <p className="text-stone-600 text-sm sm:text-base md:text-lg font-light leading-relaxed mb-6 sm:mb-8">
              Centuries of Indian royal goldsmithing reimagined with contemporary restraint by Tulsi Jewellers. Discover handcrafted 22K hallmarked gold chokers, uncut polki diamonds, and celestial temple heirlooms.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <button
                onClick={() => handleShopClick('all')}
                className="w-full sm:w-auto px-7 py-3.5 bg-[#1A1816] text-[#F9F7F2] text-xs font-semibold uppercase tracking-[0.2em] rounded-sm hover:bg-[#33302B] transition-colors shadow-sm text-center"
              >
                Shop Collection
              </button>
              
              <button
                onClick={() => handleShopClick('necklaces')}
                className="w-full sm:w-auto px-6 py-3.5 bg-transparent border border-[#1A1816] text-[#1A1816] text-xs font-semibold uppercase tracking-[0.2em] rounded-sm hover:bg-white/60 transition-colors text-center"
              >
                Explore Necklaces
              </button>
            </div>

            {/* Quick stats / hallmark notes */}
            <div className="mt-8 pt-6 border-t border-[#E2DBD0] grid grid-cols-3 gap-2 sm:gap-4 text-left">
              <div>
                <p className="font-editorial text-lg sm:text-2xl font-normal text-stone-900">BIS 916</p>
                <p className="text-[9px] sm:text-[11px] uppercase tracking-wider text-stone-500 mt-0.5 leading-tight">Hallmarked Pure Gold</p>
              </div>
              <div>
                <p className="font-editorial text-lg sm:text-2xl font-normal text-stone-900">100%</p>
                <p className="text-[9px] sm:text-[11px] uppercase tracking-wider text-stone-500 mt-0.5 leading-tight">Insured Armored Courier</p>
              </div>
              <div>
                <p className="font-editorial text-lg sm:text-2xl font-normal text-stone-900">Certified</p>
                <p className="text-[9px] sm:text-[11px] uppercase tracking-wider text-stone-500 mt-0.5 leading-tight">IGI & SGL Gems</p>
              </div>
            </div>
          </div>

          {/* Right Editorial Image Column */}
          <div className="lg:col-span-6 relative">
            <div className="relative aspect-[4/3] lg:aspect-[16/11] rounded-sm overflow-hidden bg-stone-200 shadow-md">
              <img
                src="/src/assets/images/hero_indian_jewellery_1791946991785.jpg"
                alt="Model wearing handcrafted Indian 22K gold choker necklace and earrings"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center transform hover:scale-[1.02] transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent pointer-events-none" />
              
              <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-md px-4 py-2.5 rounded-sm flex items-center justify-between text-xs text-stone-800 border border-stone-200/50">
                <span className="font-editorial text-sm font-semibold tracking-wide">Tulsi Jewellers Royal Bridal Edit</span>
                <span className="text-[11px] text-[#8C7D6B] tracking-wider uppercase">Handcrafted in Jaipur</span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Trust Pillars Bar */}
      <div className="bg-white border-t border-[#EAE6DF] py-6 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-5 h-5 text-[#C5A880] shrink-0" />
            <div>
              <h4 className="text-xs uppercase font-semibold tracking-wider text-stone-900">Government Certified</h4>
              <p className="text-[11px] text-stone-500">Laser BIS 916 & 750 Hallmarked</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Truck className="w-5 h-5 text-[#C5A880] shrink-0" />
            <div>
              <h4 className="text-xs uppercase font-semibold tracking-wider text-stone-900">Insured Armored Transit</h4>
              <p className="text-[11px] text-stone-500">Real-time GPS BlueDart tracking</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Award className="w-5 h-5 text-[#C5A880] shrink-0" />
            <div>
              <h4 className="text-xs uppercase font-semibold tracking-wider text-stone-900">15-Day Inspection</h4>
              <p className="text-[11px] text-stone-500">100% Exchange & Buyback Guarantee</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Sparkles className="w-5 h-5 text-[#C5A880] shrink-0" />
            <div>
              <h4 className="text-xs uppercase font-semibold tracking-wider text-stone-900">Bespoke Atelier</h4>
              <p className="text-[11px] text-stone-500">Customized chain lengths & ring sizing</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
