import React, { useState } from 'react';
import { MapPin, Clock, Calendar, Sparkles, X, Phone, ShieldCheck } from 'lucide-react';

export const StorySection: React.FC = () => {
  const [isMapModalOpen, setIsMapModalOpen] = useState(false);
  const [appointmentBooked, setAppointmentBooked] = useState(false);

  return (
    <div>
      {/* Editorial Story Section mirroring Screenshot 2 */}
      <section className="py-20 md:py-28 bg-white border-b border-[#EAE6DF] text-center">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <span className="text-xs uppercase tracking-[0.25em] text-[#8C7D6B] font-medium block mb-3">
            Royal Rajputana Legacy
          </span>
          
          <h2 className="font-editorial text-4xl sm:text-5xl text-[#1A1816] font-normal tracking-tight mb-8">
            Read Our Story
          </h2>

          <p className="text-stone-600 text-base sm:text-lg font-light leading-relaxed mb-8">
            Founded with a reverent dedication to ancestral Indian goldsmithing, Tulsi Jewellers unites royal Rajasthani Kundan-Polki traditions with modern sculptural minimalism. Every piece is forged in 22-karat hallmarked gold by master artisans whose lineage dates across four generations of royal courts.
          </p>

          <button
            onClick={() => setIsMapModalOpen(true)}
            className="font-serif text-sm tracking-widest uppercase border-b-2 border-[#1A1816] pb-1 text-[#1A1816] hover:text-[#8C7D6B] hover:border-[#8C7D6B] transition-colors"
          >
            Visit Our Atelier & Flagship Boutique
          </button>
        </div>
      </section>

      {/* Flagship Store Banner mirroring Screenshot 1 */}
      <section className="py-16 md:py-20 bg-[#F4F1EA] border-b border-[#E8E2D7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            
            {/* Left Image Showcase */}
            <div className="aspect-[4/3] rounded-sm overflow-hidden bg-stone-200 shadow-md relative group">
              <img
                src="/src/assets/images/category_necklace_banner_1791946992514.jpg"
                alt="Tulsi Jewellers Flagship Atelier boutique interior"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-stone-900/10" />
            </div>

            {/* Right Store Info mirroring Screenshot 1 */}
            <div className="flex flex-col justify-center max-w-lg">
              <span className="text-xs uppercase tracking-[0.25em] text-[#8C7D6B] font-medium mb-3">
                Flagship Boutique
              </span>
              
              <h3 className="font-editorial text-3xl sm:text-4xl text-[#1A1816] font-normal leading-tight mb-4">
                Visit our Main Store Avenue
              </h3>

              <div className="text-stone-600 text-sm font-light space-y-1 mb-8">
                <p className="font-medium text-stone-900">Tulsi Jewellers Atelier & Private Salon</p>
                <p>18 East Heritage Boulevard, Indiranagar</p>
                <p>Bengaluru, Karnataka 560038, India</p>
                <p className="text-xs text-stone-500 pt-2">Private Suite 4B · Mon - Sat: 10:30 AM – 8:00 PM</p>
              </div>

              <div>
                <button
                  onClick={() => setIsMapModalOpen(true)}
                  className="px-8 py-3.5 bg-[#1A1816] text-[#F9F7F2] text-xs font-semibold uppercase tracking-[0.2em] rounded-sm hover:bg-[#33302B] transition-colors shadow-sm inline-flex items-center gap-2"
                >
                  <MapPin className="w-3.5 h-3.5" />
                  <span>View On Map & Book Viewing</span>
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* MAP & APPOINTMENT MODAL */}
      {isMapModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-xl rounded-sm shadow-2xl border border-stone-200 overflow-hidden">
            <div className="p-4 border-b border-stone-200 flex items-center justify-between bg-[#FAFAF8]">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#C5A880]" />
                <h4 className="font-editorial text-lg font-medium text-stone-900">
                  Flagship Boutique & Private Salon
                </h4>
              </div>
              <button
                onClick={() => {
                  setIsMapModalOpen(false);
                  setAppointmentBooked(false);
                }}
                className="p-1 text-stone-400 hover:text-stone-900"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-5 text-xs text-stone-700">
              {/* Mock Stylized Map Canvas */}
              <div className="h-44 bg-[#EFECE6] rounded-sm border border-stone-300 relative overflow-hidden flex items-center justify-center">
                <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#1A1816_1px,transparent_1px)] [background-size:16px_16px]" />
                <div className="text-center relative z-10 bg-white/90 p-4 rounded-sm shadow-sm border border-stone-200 max-w-xs">
                  <MapPin className="w-6 h-6 text-[#C5A880] mx-auto mb-1 animate-bounce" />
                  <p className="font-semibold text-stone-900">Tulsi Jewellers Indiranagar Atelier</p>
                  <p className="text-[11px] text-stone-500">18 East Heritage Boulevard, Bengaluru</p>
                </div>
              </div>

              {appointmentBooked ? (
                <div className="p-4 bg-emerald-50 text-emerald-800 rounded-sm border border-emerald-200 text-center space-y-1">
                  <p className="font-semibold text-sm">Private Viewing Reserved!</p>
                  <p className="text-xs">
                    Our Senior Jewellery Curator has scheduled your private appointment. A concierge confirmation has been sent to your phone and email.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  <div>
                    <h5 className="font-semibold text-stone-900 mb-1">Book a Private Bridal Viewing</h5>
                    <p className="text-stone-500 text-[11px] leading-relaxed">
                      Enjoy a private champagne consultation to inspect high-carat polki chokers, certified solitaires, and custom heirloom commissions.
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] uppercase text-stone-500 font-semibold mb-1">Preferred Date</label>
                      <input type="date" defaultValue="2026-10-18" className="w-full p-2 bg-stone-50 border border-stone-200 rounded-sm" />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase text-stone-500 font-semibold mb-1">Time Slot</label>
                      <select className="w-full p-2 bg-stone-50 border border-stone-200 rounded-sm">
                        <option>11:00 AM - 12:30 PM</option>
                        <option>02:30 PM - 04:00 PM</option>
                        <option>05:00 PM - 06:30 PM</option>
                      </select>
                    </div>
                  </div>

                  <button
                    onClick={() => setAppointmentBooked(true)}
                    className="w-full py-2.5 bg-[#1A1816] text-[#F9F7F2] text-xs uppercase tracking-widest font-semibold rounded-sm hover:bg-stone-800 transition-colors"
                  >
                    Confirm Private Viewing Appointment
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
