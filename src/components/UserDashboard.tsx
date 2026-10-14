import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { Order, OrderStatus } from '../types';
import { 
  User, 
  Package, 
  MapPin, 
  Clock, 
  Truck, 
  CheckCircle2, 
  ShieldCheck, 
  Mail, 
  ChevronRight, 
  FileText,
  Printer,
  Sparkles,
  Phone,
  Edit2,
  Check
} from 'lucide-react';

export const UserDashboard: React.FC = () => {
  const { 
    orders, 
    userProfile, 
    updateUserProfile, 
    formatPrice, 
    setActiveEmailToView, 
    setIsEmailDrawerOpen,
    emailNotifications,
    setActiveTab,
    setSelectedProduct,
    products
  } = useShop();

  const [activeSubTab, setActiveSubTab] = useState<'orders' | 'profile'>('orders');
  const [selectedOrderId, setSelectedOrderId] = useState<string>(orders[0]?.id || '');
  const [isEditingProfile, setIsEditingProfile] = useState<boolean>(false);
  const [profileForm, setProfileForm] = useState(userProfile);

  const selectedOrder = orders.find((o) => o.id === selectedOrderId) || orders[0];

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateUserProfile(profileForm);
    setIsEditingProfile(false);
  };

  const handleOpenEmailForOrder = (orderId: string) => {
    const match = emailNotifications.find((e) => e.orderId === orderId);
    if (match) {
      setActiveEmailToView(match);
      setIsEmailDrawerOpen(true);
    } else {
      setIsEmailDrawerOpen(true);
    }
  };

  const getStatusStepIndex = (status: OrderStatus) => {
    switch (status) {
      case 'confirmed': return 0;
      case 'crafting': return 1;
      case 'quality_check': return 2;
      case 'shipped': return 3;
      case 'out_for_delivery': return 4;
      case 'delivered': return 5;
      default: return 0;
    }
  };

  const currentStepIndex = selectedOrder ? getStatusStepIndex(selectedOrder.status) : 0;

  const steps = [
    { label: 'Order Confirmed', sub: 'Master Vault Registered' },
    { label: 'Artisan Crafting', sub: '22K Laser Hallmarking' },
    { label: 'Quality Check', sub: 'Gemological Inspection' },
    { label: 'Armored Transit', sub: 'BlueDart Insured Courier' },
    { label: 'Delivered', sub: 'Recipient OTP Verified' }
  ];

  return (
    <div className="py-12 bg-[#FAFAF8] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Breadcrumb & Title */}
        <div className="mb-8">
          <span className="text-xs uppercase tracking-[0.25em] text-[#8C7D6B] font-medium block mb-1">
            Private Patron Portal
          </span>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="font-editorial text-3xl sm:text-4xl text-stone-900 font-normal">
                Account & Order Tracking
              </h1>
              <p className="text-stone-500 text-xs sm:text-sm mt-1">
                Logged in as <strong>{userProfile.email}</strong>
              </p>
            </div>

            {/* Quick Actions */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsEmailDrawerOpen(true)}
                className="px-4 py-2 bg-white border border-stone-200 text-stone-800 text-xs uppercase tracking-wider font-medium rounded-sm hover:bg-stone-50 transition-colors flex items-center gap-2 shadow-sm"
              >
                <Mail className="w-3.5 h-3.5 text-[#C5A880]" />
                <span>Email Notifications</span>
              </button>
            </div>
          </div>
        </div>

        {/* Tab Controls */}
        <div className="flex border-b border-stone-200 mb-8 gap-8">
          <button
            onClick={() => setActiveSubTab('orders')}
            className={`pb-3 text-xs uppercase tracking-widest font-semibold transition-colors relative flex items-center gap-2 ${
              activeSubTab === 'orders'
                ? 'text-stone-900 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[#1A1816]'
                : 'text-stone-400 hover:text-stone-700'
            }`}
          >
            <Package className="w-4 h-4" />
            <span>Recent Orders & Live Tracking ({orders.length})</span>
          </button>

          <button
            onClick={() => setActiveSubTab('profile')}
            className={`pb-3 text-xs uppercase tracking-widest font-semibold transition-colors relative flex items-center gap-2 ${
              activeSubTab === 'profile'
                ? 'text-stone-900 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[#1A1816]'
                : 'text-stone-400 hover:text-stone-700'
            }`}
          >
            <User className="w-4 h-4" />
            <span>Account Information & Address</span>
          </button>
        </div>

        {/* SUBTAB 1: ORDERS & TRACKING */}
        {activeSubTab === 'orders' && (
          <div>
            {orders.length === 0 ? (
              <div className="bg-white p-12 text-center rounded-sm border border-stone-200">
                <Package className="w-10 h-10 text-stone-300 mx-auto mb-3" />
                <h3 className="font-editorial text-2xl text-stone-800 mb-2">No Orders Placed Yet</h3>
                <p className="text-xs text-stone-500 mb-6 max-w-sm mx-auto">
                  Your custom chokers, cocktail rings, and temple earrings will appear here with real-time GPS tracking.
                </p>
                <button
                  onClick={() => setActiveTab('shop')}
                  className="px-6 py-2.5 bg-[#1A1816] text-[#F9F7F2] text-xs uppercase tracking-widest font-semibold rounded-sm hover:bg-stone-800 transition-colors"
                >
                  Explore Collection
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                
                {/* Left: Orders List Column */}
                <div className="lg:col-span-4 space-y-3">
                  <h3 className="text-xs uppercase tracking-wider text-stone-500 font-semibold mb-2">
                    Order History
                  </h3>
                  
                  {orders.map((order) => {
                    const isSelected = order.id === selectedOrderId;
                    return (
                      <div
                        key={order.id}
                        onClick={() => setSelectedOrderId(order.id)}
                        className={`p-4 rounded-sm border cursor-pointer transition-all ${
                          isSelected
                            ? 'bg-white border-[#1A1816] shadow-sm'
                            : 'bg-stone-50/70 border-stone-200 hover:bg-white'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-semibold text-xs text-stone-900">
                            #{order.id}
                          </span>
                          <span className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-sm ${
                            order.status === 'delivered' 
                              ? 'bg-emerald-100 text-emerald-800' 
                              : order.status === 'shipped' || order.status === 'out_for_delivery'
                              ? 'bg-blue-100 text-blue-800'
                              : 'bg-amber-100 text-amber-800'
                          }`}>
                            {order.status.replace(/_/g, ' ')}
                          </span>
                        </div>

                        <div className="text-xs text-stone-600 space-y-0.5">
                          <p>{order.items.length} {order.items.length === 1 ? 'piece' : 'pieces'} · {order.date}</p>
                          <p className="font-editorial text-sm font-semibold tabular-nums text-stone-900">
                            {formatPrice(order.total)}
                          </p>
                        </div>

                        <div className="mt-3 pt-2 border-t border-stone-100 flex items-center justify-between text-[11px] text-[#8C7D6B]">
                          <span>Track Consignment</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Right: Selected Order Detail & Live Pipeline */}
                {selectedOrder && (
                  <div className="lg:col-span-8 space-y-6">
                    
                    {/* Live Tracking Pipeline Box */}
                    <div className="bg-white p-6 rounded-sm border border-stone-200 shadow-sm">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-stone-200 gap-3">
                        <div>
                          <span className="text-[10px] uppercase tracking-widest text-[#8C7D6B] font-semibold block">
                            Active Shipment Pipeline
                          </span>
                          <h3 className="font-editorial text-xl font-medium text-stone-900">
                            Order #{selectedOrder.id}
                          </h3>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleOpenEmailForOrder(selectedOrder.id)}
                            className="px-3 py-1.5 bg-[#FAF7F0] border border-[#C5A880] text-[#8C6D3B] hover:bg-[#F3EDE0] text-xs uppercase tracking-wider font-medium rounded-sm transition-colors flex items-center gap-1.5"
                          >
                            <Mail className="w-3.5 h-3.5" />
                            <span>View Dispatched Email</span>
                          </button>
                        </div>
                      </div>

                      {/* Consignment Specs */}
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-4 border-b border-stone-100 text-xs">
                        <div>
                          <span className="text-[10px] uppercase text-stone-400 block">Courier Carrier</span>
                          <span className="font-semibold text-stone-800">{selectedOrder.courierName}</span>
                        </div>
                        <div>
                          <span className="text-[10px] uppercase text-stone-400 block">Air Waybill (AWB)</span>
                          <span className="font-semibold font-mono text-stone-800">{selectedOrder.trackingNumber}</span>
                        </div>
                        <div>
                          <span className="text-[10px] uppercase text-stone-400 block">Estimated Arrival</span>
                          <span className="font-semibold text-emerald-800">{selectedOrder.estimatedDelivery}</span>
                        </div>
                        <div>
                          <span className="text-[10px] uppercase text-stone-400 block">Payment Mode</span>
                          <span className="font-semibold text-stone-800">{selectedOrder.paymentMethod} ({selectedOrder.paymentStatus})</span>
                        </div>
                      </div>

                      {/* Step Progress Tracker */}
                      <div className="pt-6 pb-2">
                        <div className="relative">
                          {/* Background line */}
                          <div className="absolute top-4 left-0 right-0 h-0.5 bg-stone-200 -z-0" />
                          {/* Active line */}
                          <div 
                            className="absolute top-4 left-0 h-0.5 bg-[#1A1816] transition-all duration-500 -z-0"
                            style={{ width: `${Math.min(100, (currentStepIndex / (steps.length - 1)) * 100)}%` }}
                          />

                          {/* 5 Milestone Icons */}
                          <div className="relative flex justify-between z-10">
                            {steps.map((st, idx) => {
                              const isPassed = currentStepIndex >= idx;
                              const isCurrent = currentStepIndex === idx;
                              return (
                                <div key={st.label} className="flex flex-col items-center text-center max-w-[80px]">
                                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold transition-all ${
                                    isPassed 
                                      ? 'bg-[#1A1816] text-[#F9F7F2]' 
                                      : 'bg-white border-2 border-stone-200 text-stone-400'
                                  }`}>
                                    {isPassed ? <Check className="w-4 h-4" /> : idx + 1}
                                  </div>
                                  <span className={`text-[10px] uppercase tracking-wider font-semibold mt-2 ${
                                    isCurrent ? 'text-stone-900 font-bold' : isPassed ? 'text-stone-800' : 'text-stone-400'
                                  }`}>
                                    {st.label}
                                  </span>
                                  <span className="text-[9px] text-stone-400 hidden sm:inline mt-0.5">
                                    {st.sub}
                                  </span>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </div>

                      {/* Log of Status History */}
                      <div className="mt-8 pt-4 border-t border-stone-100">
                        <h4 className="text-[11px] uppercase tracking-wider font-semibold text-stone-700 mb-3">
                          Consignment Activity & Vault Logs
                        </h4>
                        <div className="space-y-3">
                          {selectedOrder.statusHistory.map((item, idx) => (
                            <div key={idx} className="flex items-start gap-3 text-xs">
                              <span className="w-2 h-2 rounded-full bg-[#C5A880] mt-1.5 shrink-0" />
                              <div className="flex-1">
                                <div className="flex items-center justify-between">
                                  <span className="font-semibold text-stone-800 capitalize">
                                    {item.status.replace(/_/g, ' ')}
                                  </span>
                                  <span className="text-[11px] text-stone-400">{item.timestamp}</span>
                                </div>
                                <p className="text-stone-500 mt-0.5 leading-relaxed">{item.description}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                    </div>

                    {/* Order Items & Financials Box */}
                    <div className="bg-white p-6 rounded-sm border border-stone-200 shadow-sm space-y-4">
                      <h4 className="font-editorial text-lg font-medium text-stone-900 border-b border-stone-100 pb-3">
                        Insured Heirlooms in this Consignment
                      </h4>

                      <div className="divide-y divide-stone-100 space-y-3">
                        {selectedOrder.items.map((it, idx) => (
                          <div key={idx} className="pt-3 first:pt-0 flex items-center gap-4">
                            <div className="w-16 h-16 bg-stone-50 rounded-sm overflow-hidden border border-stone-200 shrink-0">
                              <img
                                src={it.image}
                                alt={it.name}
                                referrerPolicy="no-referrer"
                                className="w-full h-full object-cover object-center"
                              />
                            </div>
                            <div className="flex-1">
                              <h5 className="font-editorial text-base font-medium text-stone-900">{it.name}</h5>
                              <p className="text-xs text-stone-500">{it.goldPurity} Gold · Qty: {it.quantity}</p>
                            </div>
                            <span className="font-editorial text-base font-semibold tabular-nums text-stone-900">
                              {formatPrice(it.price * it.quantity)}
                            </span>
                          </div>
                        ))}
                      </div>

                      {/* Totals */}
                      <div className="pt-4 border-t border-stone-200 space-y-1.5 text-xs text-stone-600">
                        <div className="flex justify-between">
                          <span>Subtotal</span>
                          <span className="font-medium text-stone-800 tabular-nums">{formatPrice(selectedOrder.subtotal)}</span>
                        </div>
                        {selectedOrder.discount > 0 && (
                          <div className="flex justify-between text-emerald-700">
                            <span>Promotional Savings</span>
                            <span className="tabular-nums">-{formatPrice(selectedOrder.discount)}</span>
                          </div>
                        )}
                        <div className="flex justify-between">
                          <span>GST (3% Indian Precious Jewellery Tax)</span>
                          <span className="font-medium text-stone-800 tabular-nums">{formatPrice(selectedOrder.tax)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Insured Armored Courier</span>
                          <span className="text-emerald-700 font-semibold uppercase text-[10px]">Complimentary</span>
                        </div>
                        <div className="flex justify-between pt-2 border-t border-stone-200 text-sm font-semibold text-stone-900">
                          <span className="font-editorial text-base">Grand Total Paid</span>
                          <span className="font-editorial text-lg tabular-nums">{formatPrice(selectedOrder.total)}</span>
                        </div>
                      </div>

                      {/* Recipient Address */}
                      <div className="pt-4 border-t border-stone-100 text-xs text-stone-600">
                        <span className="text-[10px] uppercase font-semibold text-stone-400 block mb-1">
                          Consignee & Destination
                        </span>
                        <p className="font-semibold text-stone-800">{selectedOrder.shippingAddress.fullName}</p>
                        <p>{selectedOrder.shippingAddress.street}, {selectedOrder.shippingAddress.landmark}</p>
                        <p>{selectedOrder.shippingAddress.city}, {selectedOrder.shippingAddress.state} - {selectedOrder.shippingAddress.pincode}</p>
                        <p className="text-stone-500 mt-1">Mobile: {selectedOrder.shippingAddress.phone}</p>
                      </div>

                    </div>

                  </div>
                )}

              </div>
            )}
          </div>
        )}

        {/* SUBTAB 2: ACCOUNT PROFILE & ADDRESS */}
        {activeSubTab === 'profile' && (
          <div className="max-w-3xl bg-white p-6 sm:p-8 rounded-sm border border-stone-200 shadow-sm">
            
            <div className="flex items-center justify-between pb-4 border-b border-stone-200 mb-6">
              <div>
                <h3 className="font-editorial text-2xl font-medium text-stone-900">
                  Patron Information & Delivery Address
                </h3>
                <p className="text-xs text-stone-500 mt-0.5">
                  Saved details are used for insured gold delivery OTP verification and authenticity certificates.
                </p>
              </div>

              {!isEditingProfile && (
                <button
                  onClick={() => setIsEditingProfile(true)}
                  className="px-4 py-2 border border-stone-200 text-xs uppercase tracking-wider font-semibold rounded-sm hover:bg-stone-50 transition-colors flex items-center gap-1.5 text-stone-700"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                  <span>Edit Profile</span>
                </button>
              )}
            </div>

            {isEditingProfile ? (
              <form onSubmit={handleSaveProfile} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-stone-600 uppercase tracking-wider text-[10px] font-semibold mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={profileForm.name}
                      onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                      className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-sm"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-stone-600 uppercase tracking-wider text-[10px] font-semibold mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={profileForm.email}
                      onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                      className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-sm"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-stone-600 uppercase tracking-wider text-[10px] font-semibold mb-1">
                      Phone (+91 for OTP)
                    </label>
                    <input
                      type="tel"
                      value={profileForm.phone}
                      onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                      className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-sm"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-stone-600 uppercase tracking-wider text-[10px] font-semibold mb-1">
                      Postal PIN Code
                    </label>
                    <input
                      type="text"
                      value={profileForm.shippingAddress.pincode}
                      onChange={(e) => setProfileForm({
                        ...profileForm,
                        shippingAddress: { ...profileForm.shippingAddress, pincode: e.target.value }
                      })}
                      className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-sm"
                      required
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-stone-600 uppercase tracking-wider text-[10px] font-semibold mb-1">
                      Street Address
                    </label>
                    <input
                      type="text"
                      value={profileForm.shippingAddress.street}
                      onChange={(e) => setProfileForm({
                        ...profileForm,
                        shippingAddress: { ...profileForm.shippingAddress, street: e.target.value }
                      })}
                      className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-sm"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-stone-600 uppercase tracking-wider text-[10px] font-semibold mb-1">
                      City
                    </label>
                    <input
                      type="text"
                      value={profileForm.shippingAddress.city}
                      onChange={(e) => setProfileForm({
                        ...profileForm,
                        shippingAddress: { ...profileForm.shippingAddress, city: e.target.value }
                      })}
                      className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-sm"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-stone-600 uppercase tracking-wider text-[10px] font-semibold mb-1">
                      State
                    </label>
                    <input
                      type="text"
                      value={profileForm.shippingAddress.state}
                      onChange={(e) => setProfileForm({
                        ...profileForm,
                        shippingAddress: { ...profileForm.shippingAddress, state: e.target.value }
                      })}
                      className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-sm"
                      required
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t border-stone-100">
                  <button
                    type="button"
                    onClick={() => setIsEditingProfile(false)}
                    className="px-4 py-2 border border-stone-200 text-stone-600 rounded-sm uppercase tracking-wider font-semibold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-[#1A1816] text-white rounded-sm uppercase tracking-wider font-semibold"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            ) : (
              <div className="space-y-6 text-xs text-stone-700">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 bg-stone-50 p-5 rounded-sm border border-stone-200">
                  <div>
                    <span className="text-[10px] uppercase text-stone-400 font-semibold block">Full Name</span>
                    <span className="font-semibold text-stone-900 text-sm mt-0.5 block">{userProfile.name}</span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase text-stone-400 font-semibold block">Primary Email</span>
                    <span className="font-semibold text-stone-900 text-sm mt-0.5 block">{userProfile.email}</span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase text-stone-400 font-semibold block">Registered Phone</span>
                    <span className="font-semibold text-stone-900 text-sm mt-0.5 block">{userProfile.phone}</span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase text-stone-400 font-semibold block">Patron Tier</span>
                    <span className="font-semibold text-amber-800 text-sm mt-0.5 block">Royal Rajputana Circle</span>
                  </div>
                </div>

                <div>
                  <h4 className="text-xs uppercase tracking-wider font-semibold text-stone-800 mb-2">
                    Primary Insured Delivery Address
                  </h4>
                  <div className="p-4 bg-stone-50 rounded-sm border border-stone-200 leading-relaxed">
                    <p className="font-semibold text-stone-900">{userProfile.shippingAddress.fullName}</p>
                    <p>{userProfile.shippingAddress.street}</p>
                    <p>{userProfile.shippingAddress.landmark}</p>
                    <p>{userProfile.shippingAddress.city}, {userProfile.shippingAddress.state} - {userProfile.shippingAddress.pincode}</p>
                    <p className="text-stone-500 mt-1">{userProfile.shippingAddress.country}</p>
                  </div>
                </div>
              </div>
            )}

          </div>
        )}

      </div>
    </div>
  );
};
