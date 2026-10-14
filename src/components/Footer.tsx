import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { ShieldCheck, Mail, ArrowRight, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  const { setActiveTab, setSelectedCategory, showToast } = useShop();
  const [emailInput, setEmailInput] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput.trim()) return;
    showToast(`Subscribed ${emailInput} to the Royal Rajputana newsletter`, 'gold');
    setEmailInput('');
  };

  const handleNav = (tab: 'home' | 'shop' | 'dashboard' | 'admin', category?: string) => {
    setActiveTab(tab);
    if (category) {
      setSelectedCategory(category);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#1A1816] text-[#E8E2D7] pt-16 pb-24 lg:pb-16 border-t border-[#332E27]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-stone-800">
          
          {/* Col 1: Brand & Legacy (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <span className="font-editorial text-2xl font-medium tracking-[0.2em] text-white uppercase block">
              TULSI JEWELLERS
            </span>
            <span className="text-[10px] tracking-[0.3em] text-[#C5A880] uppercase block -mt-2">
              Indian Fine Jewellery
            </span>
            <p className="text-stone-400 text-xs leading-relaxed font-light max-w-sm pt-2">
              Preserving ancestral Rajasthani goldsmithing, Syndicate uncut Polki, and sacred Temple iconography. Every piece is hallmarked by the Bureau of Indian Standards (BIS 916 & 750).
            </p>
            <div className="pt-2 flex items-center gap-2 text-xs text-[#C5A880]">
              <ShieldCheck className="w-4 h-4 shrink-0" />
              <span>100% Insured Armored Transit by BlueDart Apex</span>
            </div>
          </div>

          {/* Col 2: The Collections (2 cols) */}
          <div className="lg:col-span-2 space-y-3 text-xs">
            <h4 className="uppercase tracking-widest text-stone-200 font-semibold text-[11px]">
              Collections
            </h4>
            <ul className="space-y-2 text-stone-400">
              <li>
                <button onClick={() => handleNav('shop', 'necklaces')} className="hover:text-white transition-colors">
                  Bridal Chokers & Necklaces
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('shop', 'rings')} className="hover:text-white transition-colors">
                  Solitaire & Filigree Rings
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('shop', 'earrings')} className="hover:text-white transition-colors">
                  Temple Jhumkas & Chandbalis
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('shop', 'all')} className="hover:text-white transition-colors">
                  All Masterpieces
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Patron Services (3 cols) */}
          <div className="lg:col-span-3 space-y-3 text-xs">
            <h4 className="uppercase tracking-widest text-stone-200 font-semibold text-[11px]">
              Patron Concierge
            </h4>
            <ul className="space-y-2 text-stone-400">
              <li>
                <button onClick={() => handleNav('dashboard')} className="hover:text-white transition-colors">
                  Live Order Tracking & Timeline
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('dashboard')} className="hover:text-white transition-colors">
                  Account & Delivery Addresses
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('admin')} className="hover:text-white text-[#C5A880] transition-colors">
                  Atelier Owner / Admin Portal
                </button>
              </li>
              <li>
                <span className="text-stone-500">Concierge Desk: +91 (0) 80 4920 1800</span>
              </li>
            </ul>
          </div>

          {/* Col 4: Newsletter (3 cols) */}
          <div className="lg:col-span-3 space-y-3 text-xs">
            <h4 className="uppercase tracking-widest text-stone-200 font-semibold text-[11px]">
              Private Gazette
            </h4>
            <p className="text-stone-400 text-xs font-light leading-relaxed">
              Receive private invitations to high-carat polki auctions and seasonal trunk shows.
            </p>
            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="relative">
                <input
                  type="email"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  placeholder="Enter email address"
                  className="w-full py-2.5 pl-3 pr-9 bg-stone-900 border border-stone-700 rounded-sm text-xs text-white placeholder:text-stone-500 focus:outline-none focus:border-[#C5A880]"
                  required
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-[#C5A880] hover:text-white p-1"
                  aria-label="Subscribe"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          </div>

        </div>

        {/* Bottom Strip */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-stone-500 gap-4">
          <p>© {new Date().getFullYear()} TULSI JEWELLERS FINE JEWELLERY ATELIER. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span>BIS Hallmarking License #IND-916-2026</span>
            <span>Jaipur · Mumbai · Bengaluru</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
