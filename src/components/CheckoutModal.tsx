import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { Order, ShippingAddress } from '../types';
import { 
  X, 
  ShieldCheck, 
  CreditCard, 
  Smartphone, 
  Landmark, 
  Truck, 
  CheckCircle2, 
  ArrowRight,
  Mail,
  Lock,
  Tag
} from 'lucide-react';

export const CheckoutModal: React.FC = () => {
  const {
    cart,
    cartSubtotal,
    formatPrice,
    isCheckoutOpen,
    setIsCheckoutOpen,
    createOrder,
    userProfile,
    setActiveTab,
    setIsEmailDrawerOpen
  } = useShop();

  const [step, setStep] = useState<'shipping' | 'payment' | 'success'>('shipping');
  const [createdOrder, setCreatedOrder] = useState<Order | null>(null);

  // Address Form State
  const [address, setAddress] = useState<ShippingAddress>(userProfile.shippingAddress);
  
  // Payment State
  const [paymentMethod, setPaymentMethod] = useState<Order['paymentMethod']>('UPI');
  const [upiId, setUpiId] = useState<string>('manav@okaxis');
  const [cardNumber, setCardNumber] = useState<string>('4532 •••• •••• 8821');
  const [cardExpiry, setCardExpiry] = useState<string>('08/28');
  const [cardCvv, setCardCvv] = useState<string>('842');
  const [cardHolder, setCardHolder] = useState<string>(userProfile.name);
  const [selectedBank, setSelectedBank] = useState<string>('HDFC Bank');
  
  // Promo State
  const [promoCode, setPromoCode] = useState<string>('ROYAL10');
  const [discountPercent, setDiscountPercent] = useState<number>(10);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  if (!isCheckoutOpen) return null;

  const discountAmount = Math.round((cartSubtotal * discountPercent) / 100);
  const taxableAmount = cartSubtotal - discountAmount;
  const gstAmount = Math.round(taxableAmount * 0.03); // 3% GST
  const finalTotal = taxableAmount + gstAmount;

  const handlePlaceOrder = () => {
    setIsProcessing(true);

    setTimeout(() => {
      const order = createOrder({
        items: cart.map((i) => ({ product: i.product, quantity: i.quantity })),
        shippingAddress: address,
        paymentMethod,
        promoCode: promoCode || undefined,
        discount: discountAmount
      });
      setCreatedOrder(order);
      setIsProcessing(false);
      setStep('success');
    }, 1200);
  };

  const handleViewInDashboard = () => {
    setIsCheckoutOpen(false);
    setActiveTab('dashboard');
  };

  const handleInspectEmail = () => {
    setIsCheckoutOpen(false);
    setIsEmailDrawerOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl bg-white rounded-sm shadow-2xl overflow-hidden border border-[#EAE6DF] max-h-[94vh] flex flex-col">
        
        {/* Top Header */}
        <div className="p-4 sm:p-5 border-b border-stone-200 flex items-center justify-between bg-[#FAFAF8]">
          <div className="flex items-center gap-2">
            <Lock className="w-4 h-4 text-[#C5A880]" />
            <h3 className="font-editorial text-xl font-medium tracking-wide text-stone-900">
              {step === 'success' ? 'Order Confirmed' : 'Secure Atelier Checkout'}
            </h3>
            <span className="text-[11px] uppercase tracking-wider text-stone-500 font-sans hidden sm:inline">
              · 256-bit Encrypted
            </span>
          </div>
          
          <button
            onClick={() => setIsCheckoutOpen(false)}
            className="p-1.5 text-stone-400 hover:text-stone-900 transition-colors"
            aria-label="Close checkout"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="overflow-y-auto p-5 sm:p-8 flex-1">
          
          {/* STEP 1: SHIPPING & CONTACT */}
          {step === 'shipping' && (
            <div className="space-y-6">
              
              <div className="flex items-center justify-between pb-3 border-b border-stone-200">
                <span className="text-xs uppercase tracking-widest font-semibold text-stone-800">
                  Step 1 of 2: Insured Delivery Address
                </span>
                <span className="text-xs text-stone-500">All India & Overseas Transit</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="block text-stone-600 uppercase tracking-wider text-[11px] font-medium mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    value={address.fullName}
                    onChange={(e) => setAddress({ ...address, fullName: e.target.value })}
                    className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-sm focus:border-[#C5A880] focus:outline-none"
                    placeholder="Recipient Full Name"
                    required
                  />
                </div>

                <div>
                  <label className="block text-stone-600 uppercase tracking-wider text-[11px] font-medium mb-1">
                    Email for Order Confirmation & Hallmarks *
                  </label>
                  <input
                    type="email"
                    value={address.email}
                    onChange={(e) => setAddress({ ...address, email: e.target.value })}
                    className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-sm focus:border-[#C5A880] focus:outline-none"
                    placeholder="name@domain.com"
                    required
                  />
                </div>

                <div>
                  <label className="block text-stone-600 uppercase tracking-wider text-[11px] font-medium mb-1">
                    Phone (+91 Indian Mobile for OTP) *
                  </label>
                  <input
                    type="tel"
                    value={address.phone}
                    onChange={(e) => setAddress({ ...address, phone: e.target.value })}
                    className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-sm focus:border-[#C5A880] focus:outline-none"
                    placeholder="+91 98201 45892"
                    required
                  />
                </div>

                <div>
                  <label className="block text-stone-600 uppercase tracking-wider text-[11px] font-medium mb-1">
                    Postal Code (PIN Code) *
                  </label>
                  <input
                    type="text"
                    value={address.pincode}
                    onChange={(e) => setAddress({ ...address, pincode: e.target.value })}
                    className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-sm focus:border-[#C5A880] focus:outline-none"
                    placeholder="e.g. 560038"
                    required
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-stone-600 uppercase tracking-wider text-[11px] font-medium mb-1">
                    Delivery Address (House/Flat No., Apartment, Street) *
                  </label>
                  <input
                    type="text"
                    value={address.street}
                    onChange={(e) => setAddress({ ...address, street: e.target.value })}
                    className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-sm focus:border-[#C5A880] focus:outline-none"
                    placeholder="Flat 402, Royal Palms, 18th Main Road"
                    required
                  />
                </div>

                <div>
                  <label className="block text-stone-600 uppercase tracking-wider text-[11px] font-medium mb-1">
                    Landmark
                  </label>
                  <input
                    type="text"
                    value={address.landmark || ''}
                    onChange={(e) => setAddress({ ...address, landmark: e.target.value })}
                    className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-sm focus:border-[#C5A880] focus:outline-none"
                    placeholder="Near Defence Colony Post Office"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-stone-600 uppercase tracking-wider text-[11px] font-medium mb-1">
                      City *
                    </label>
                    <input
                      type="text"
                      value={address.city}
                      onChange={(e) => setAddress({ ...address, city: e.target.value })}
                      className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-sm focus:border-[#C5A880] focus:outline-none"
                      placeholder="Bengaluru"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-stone-600 uppercase tracking-wider text-[11px] font-medium mb-1">
                      State *
                    </label>
                    <input
                      type="text"
                      value={address.state}
                      onChange={(e) => setAddress({ ...address, state: e.target.value })}
                      className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-sm focus:border-[#C5A880] focus:outline-none"
                      placeholder="Karnataka"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Insured Transit Note */}
              <div className="p-4 bg-[#FAF8F5] border border-[#EAE3D6] rounded-sm flex items-start gap-3">
                <Truck className="w-5 h-5 text-[#C5A880] shrink-0 mt-0.5" />
                <div className="text-xs text-stone-700 space-y-1">
                  <p className="font-semibold text-stone-900">
                    Complimentary BlueDart Apex Armored Transit
                  </p>
                  <p className="text-stone-500 leading-relaxed text-[11px]">
                    Delivered in velvet-lined gift presentation box inside tamper-evident sealed packaging. Recipient must present SMS OTP to delivery agent.
                  </p>
                </div>
              </div>

              <div className="flex justify-end pt-2">
                <button
                  type="button"
                  onClick={() => setStep('payment')}
                  className="px-6 py-3 bg-[#1A1816] text-[#F9F7F2] text-xs uppercase tracking-widest font-semibold rounded-sm hover:bg-stone-800 transition-colors flex items-center gap-2"
                >
                  <span>Continue to Payment</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: PAYMENT & CONFIRMATION */}
          {step === 'payment' && (
            <div className="space-y-6">
              
              <div className="flex items-center justify-between pb-3 border-b border-stone-200">
                <span className="text-xs uppercase tracking-widest font-semibold text-stone-800">
                  Step 2 of 2: Select Payment Method
                </span>
                <button
                  onClick={() => setStep('shipping')}
                  className="text-xs text-[#8C7D6B] hover:text-stone-900 underline"
                >
                  Edit Address
                </button>
              </div>

              {/* Payment Methods Selector */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                {[
                  { id: 'UPI', label: 'UPI / QR', icon: Smartphone, desc: 'GPay, PhonePe, Paytm' },
                  { id: 'Credit/Debit Card', label: 'Cards', icon: CreditCard, desc: 'Visa, Master, RuPay' },
                  { id: 'Net Banking', label: 'Net Banking', icon: Landmark, desc: 'HDFC, ICICI, SBI' },
                  { id: 'Cash on Delivery', label: 'COD', icon: Truck, desc: 'Pay on Delivery' }
                ].map((m) => {
                  const Icon = m.icon;
                  const isSelected = paymentMethod === m.id;
                  return (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => setPaymentMethod(m.id as Order['paymentMethod'])}
                      className={`p-3 rounded-sm border text-left transition-all ${
                        isSelected
                          ? 'border-[#1A1816] bg-[#1A1816] text-white shadow-sm'
                          : 'border-stone-200 bg-stone-50 text-stone-700 hover:bg-stone-100'
                      }`}
                    >
                      <Icon className="w-4 h-4 mb-2" />
                      <p className="font-semibold text-xs">{m.label}</p>
                      <p className={`text-[10px] mt-0.5 ${isSelected ? 'text-stone-300' : 'text-stone-400'}`}>
                        {m.desc}
                      </p>
                    </button>
                  );
                })}
              </div>

              {/* Dynamic Payment Details form */}
              <div className="p-4 bg-stone-50 border border-stone-200 rounded-sm">
                {paymentMethod === 'UPI' && (
                  <div className="space-y-3">
                    <label className="block text-xs uppercase tracking-wider font-semibold text-stone-700">
                      Enter UPI ID / VPA
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={upiId}
                        onChange={(e) => setUpiId(e.target.value)}
                        placeholder="yourname@okaxis"
                        className="flex-1 p-2 text-xs bg-white border border-stone-300 rounded-sm focus:border-[#C5A880] focus:outline-none"
                      />
                      <span className="px-3 py-2 bg-emerald-50 text-emerald-800 text-xs font-medium rounded-sm border border-emerald-200 flex items-center">
                        Verified
                      </span>
                    </div>
                    <p className="text-[11px] text-stone-500">
                      A payment request will be sent to your UPI app (Google Pay, PhonePe, or Paytm).
                    </p>
                  </div>
                )}

                {paymentMethod === 'Credit/Debit Card' && (
                  <div className="space-y-3 text-xs">
                    <div>
                      <label className="block text-stone-600 uppercase tracking-wider text-[10px] font-semibold mb-1">
                        Card Number
                      </label>
                      <input
                        type="text"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        className="w-full p-2 bg-white border border-stone-300 rounded-sm font-mono"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-stone-600 uppercase tracking-wider text-[10px] font-semibold mb-1">
                          Expiry (MM/YY)
                        </label>
                        <input
                          type="text"
                          value={cardExpiry}
                          onChange={(e) => setCardExpiry(e.target.value)}
                          className="w-full p-2 bg-white border border-stone-300 rounded-sm font-mono"
                        />
                      </div>
                      <div>
                        <label className="block text-stone-600 uppercase tracking-wider text-[10px] font-semibold mb-1">
                          CVV
                        </label>
                        <input
                          type="password"
                          value={cardCvv}
                          onChange={(e) => setCardCvv(e.target.value)}
                          className="w-full p-2 bg-white border border-stone-300 rounded-sm font-mono"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-stone-600 uppercase tracking-wider text-[10px] font-semibold mb-1">
                        Cardholder Name
                      </label>
                      <input
                        type="text"
                        value={cardHolder}
                        onChange={(e) => setCardHolder(e.target.value)}
                        className="w-full p-2 bg-white border border-stone-300 rounded-sm"
                      />
                    </div>
                  </div>
                )}

                {paymentMethod === 'Net Banking' && (
                  <div className="space-y-2">
                    <label className="block text-xs uppercase tracking-wider font-semibold text-stone-700">
                      Select Financial Institution
                    </label>
                    <select
                      value={selectedBank}
                      onChange={(e) => setSelectedBank(e.target.value)}
                      className="w-full p-2 text-xs bg-white border border-stone-300 rounded-sm"
                    >
                      <option value="HDFC Bank">HDFC Bank</option>
                      <option value="ICICI Bank">ICICI Bank</option>
                      <option value="State Bank of India">State Bank of India (SBI)</option>
                      <option value="Axis Bank">Axis Bank</option>
                      <option value="Kotak Mahindra Bank">Kotak Mahindra Bank</option>
                    </select>
                  </div>
                )}

                {paymentMethod === 'Cash on Delivery' && (
                  <div className="text-xs text-stone-700 space-y-1">
                    <p className="font-semibold text-stone-900">Cash on Delivery (Armored Agent Verification)</p>
                    <p className="text-stone-500 text-[11px] leading-relaxed">
                      Please keep physical cash or dynamic UPI QR ready at the time of delivery. Verification call will be made prior to shipment dispatch.
                    </p>
                  </div>
                )}
              </div>

              {/* Order Breakdown Summary */}
              <div className="p-4 bg-stone-50 rounded-sm border border-stone-200 space-y-2 text-xs">
                <div className="flex justify-between text-stone-600">
                  <span>Jewellery Subtotal ({cart.length} pieces)</span>
                  <span className="font-semibold text-stone-900 tabular-nums">{formatPrice(cartSubtotal)}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-700 font-medium">
                    <span>Discount Code ({promoCode})</span>
                    <span className="tabular-nums">-{formatPrice(discountAmount)}</span>
                  </div>
                )}
                <div className="flex justify-between text-stone-600">
                  <span>Goods & Services Tax (3% GST)</span>
                  <span className="tabular-nums font-semibold text-stone-900">{formatPrice(gstAmount)}</span>
                </div>
                <div className="flex justify-between text-stone-600">
                  <span>Insured BlueDart Delivery</span>
                  <span className="text-emerald-700 font-semibold uppercase text-[10px]">Free (Included)</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-stone-200 text-sm font-semibold text-stone-900">
                  <span className="font-editorial text-base">Grand Total Payable</span>
                  <span className="font-editorial text-xl tabular-nums text-stone-900">
                    {formatPrice(finalTotal)}
                  </span>
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="flex items-center justify-between pt-2">
                <button
                  type="button"
                  onClick={() => setStep('shipping')}
                  className="text-xs uppercase tracking-wider text-stone-600 hover:text-stone-900"
                >
                  Back to Address
                </button>

                <button
                  type="button"
                  disabled={isProcessing}
                  onClick={handlePlaceOrder}
                  className="px-8 py-3.5 bg-[#1A1816] text-[#F9F7F2] text-xs uppercase tracking-widest font-semibold rounded-sm hover:bg-[#33302B] transition-colors flex items-center gap-2 shadow-sm disabled:opacity-50"
                >
                  {isProcessing ? (
                    <span>Processing Authorization...</span>
                  ) : (
                    <>
                      <Lock className="w-3.5 h-3.5" />
                      <span>Confirm & Place Order ({formatPrice(finalTotal)})</span>
                    </>
                  )}
                </button>
              </div>

            </div>
          )}

          {/* STEP 3: SUCCESS & EMAIL CONFIRMATION DISPATCH */}
          {step === 'success' && createdOrder && (
            <div className="text-center py-6 sm:py-8 space-y-6">
              
              <div className="w-16 h-16 bg-[#F4EFE6] rounded-full mx-auto flex items-center justify-center text-[#8C6D3B] border border-[#C5A880]/30 shadow-sm">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div>
                <span className="text-xs uppercase tracking-[0.25em] text-[#8C7D6B] font-semibold block mb-1">
                  Payment Authorized · Order Placed
                </span>
                <h3 className="font-editorial text-3xl sm:text-4xl text-stone-900 font-normal">
                  Thank You for Your Patronage
                </h3>
                <p className="text-stone-500 text-xs sm:text-sm max-w-md mx-auto mt-2 leading-relaxed">
                  Your handcrafted Indian jewellery order <strong>#{createdOrder.id}</strong> has been registered with our master goldsmiths.
                </p>
              </div>

              {/* Automated Email Banner */}
              <div className="p-4 bg-[#FAF8F5] border border-[#EAE3D6] rounded-sm max-w-lg mx-auto text-left flex items-start gap-3">
                <Mail className="w-5 h-5 text-[#C5A880] shrink-0 mt-0.5" />
                <div className="text-xs text-stone-700">
                  <p className="font-semibold text-stone-900">
                    Automated Confirmation Email Dispatched
                  </p>
                  <p className="text-stone-500 text-[11px] mt-0.5">
                    Sent to <strong>{createdOrder.shippingAddress.email}</strong> with your Certificate of Authenticity, BIS 916 registration, and real-time tracking link.
                  </p>
                </div>
              </div>

              {/* Order Quick Specs */}
              <div className="max-w-lg mx-auto bg-stone-50 p-4 rounded-sm border border-stone-200 text-xs text-left grid grid-cols-2 gap-3">
                <div>
                  <span className="text-[10px] uppercase text-stone-400 block">Order Number</span>
                  <span className="font-semibold text-stone-900">{createdOrder.id}</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase text-stone-400 block">Tracking Number</span>
                  <span className="font-semibold text-stone-900">{createdOrder.trackingNumber}</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase text-stone-400 block">Estimated Delivery</span>
                  <span className="font-semibold text-stone-900">{createdOrder.estimatedDelivery}</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase text-stone-400 block">Total Amount Paid</span>
                  <span className="font-semibold text-stone-900 tabular-nums">{formatPrice(createdOrder.total)}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                <button
                  onClick={handleInspectEmail}
                  className="px-5 py-2.5 bg-[#FAF7F0] border border-[#C5A880] text-[#8C6D3B] hover:bg-[#F3EDE0] text-xs uppercase tracking-wider font-semibold rounded-sm transition-colors flex items-center gap-2"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Inspect Dispatched Email</span>
                </button>

                <button
                  onClick={handleViewInDashboard}
                  className="px-6 py-2.5 bg-[#1A1816] text-[#F9F7F2] text-xs uppercase tracking-widest font-semibold rounded-sm hover:bg-stone-800 transition-colors"
                >
                  Track in Dashboard
                </button>
              </div>

            </div>
          )}

        </div>
      </div>
    </div>
  );
};
