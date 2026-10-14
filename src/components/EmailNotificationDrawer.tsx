import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { EmailNotification } from '../types';
import { 
  X, 
  Mail, 
  CheckCheck, 
  Truck, 
  Clock, 
  ShieldCheck, 
  ArrowLeft,
  ExternalLink,
  ChevronRight
} from 'lucide-react';

export const EmailNotificationDrawer: React.FC = () => {
  const {
    emailNotifications,
    isEmailDrawerOpen,
    setIsEmailDrawerOpen,
    markEmailAsRead,
    markAllEmailsAsRead,
    formatPrice,
    setActiveTab,
    activeEmailToView,
    setActiveEmailToView
  } = useShop();

  const [selectedEmail, setSelectedEmail] = useState<EmailNotification | null>(
    activeEmailToView || emailNotifications[0] || null
  );

  // Sync if activeEmailToView changes
  React.useEffect(() => {
    if (activeEmailToView) {
      setSelectedEmail(activeEmailToView);
    }
  }, [activeEmailToView]);

  if (!isEmailDrawerOpen) return null;

  const handleSelectEmail = (email: EmailNotification) => {
    setSelectedEmail(email);
    markEmailAsRead(email.id);
  };

  const handleGoToTracking = (orderId: string) => {
    setIsEmailDrawerOpen(false);
    setActiveTab('dashboard');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-6 sm:pl-10">
        <div className="w-screen max-w-2xl bg-white shadow-2xl flex flex-col border-l border-[#EAE6DF]">
          
          {/* Header Bar */}
          <div className="p-4 sm:p-5 border-b border-stone-200 flex items-center justify-between bg-[#FAFAF8]">
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-[#C5A880]" />
              <h3 className="font-editorial text-xl font-medium tracking-wide text-stone-900">
                Automated Email Dispatch Center
              </h3>
              <span className="text-[10px] uppercase tracking-wider text-stone-500 font-sans hidden sm:inline">
                · Customer Inbox
              </span>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={markAllEmailsAsRead}
                className="text-[11px] text-[#8C7D6B] hover:text-stone-900 flex items-center gap-1 transition-colors"
                title="Mark all as read"
              >
                <CheckCheck className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Mark all read</span>
              </button>

              <button
                onClick={() => {
                  setIsEmailDrawerOpen(false);
                  setActiveEmailToView(null);
                }}
                className="p-1 text-stone-400 hover:text-stone-900 transition-colors"
                aria-label="Close email drawer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Dual Panel or Master-Detail Container */}
          <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
            
            {/* Left list of emails */}
            <div className="w-full md:w-56 border-r border-stone-200 bg-stone-50 overflow-y-auto divide-y divide-stone-200/60 shrink-0">
              <div className="p-3 text-[10px] uppercase tracking-widest text-stone-400 font-semibold bg-white sticky top-0 border-b border-stone-100">
                Dispatched Emails ({emailNotifications.length})
              </div>

              {emailNotifications.map((email) => {
                const isSelected = selectedEmail?.id === email.id;
                return (
                  <button
                    key={email.id}
                    onClick={() => handleSelectEmail(email)}
                    className={`w-full p-3.5 text-left transition-colors flex flex-col gap-1 ${
                      isSelected 
                        ? 'bg-white border-l-2 border-[#1A1816]' 
                        : 'hover:bg-stone-100/80'
                    }`}
                  >
                    <div className="flex items-center justify-between text-[10px]">
                      <span className={`uppercase font-semibold tracking-wider ${
                        email.type === 'order_confirmation' ? 'text-amber-700' : 'text-blue-700'
                      }`}>
                        {email.type === 'order_confirmation' ? 'Order Confirmed' : 'Shipping Update'}
                      </span>
                      {!email.read && (
                        <span className="w-2 h-2 rounded-full bg-[#C5A880]" />
                      )}
                    </div>
                    
                    <p className="text-xs font-medium text-stone-900 line-clamp-1 leading-snug">
                      {email.subject}
                    </p>

                    <span className="text-[10px] text-stone-400">
                      {email.timestamp}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Right HTML Email Preview */}
            <div className="flex-1 overflow-y-auto bg-stone-100 p-4 sm:p-6">
              {selectedEmail ? (
                <div className="bg-white rounded-sm shadow-sm border border-stone-200/80 overflow-hidden text-xs text-stone-700">
                  
                  {/* Email Client Header Bar */}
                  <div className="p-4 border-b border-stone-100 bg-[#FAF9F6]">
                    <div className="flex items-center justify-between text-[11px] text-stone-500 mb-1">
                      <span><strong>From:</strong> concierge@tulsijewellers.com (Tulsi Jewellers Atelier)</span>
                      <span>{selectedEmail.timestamp}</span>
                    </div>
                    <div className="text-[11px] text-stone-500 mb-2">
                      <span><strong>To:</strong> {selectedEmail.toEmail}</span>
                    </div>
                    <h4 className="font-editorial text-base sm:text-lg font-semibold text-stone-900 leading-snug">
                      {selectedEmail.subject}
                    </h4>
                  </div>

                  {/* Rendered Luxury Brand Email Body */}
                  <div className="p-6 space-y-6">
                    
                    {/* Brand Banner */}
                    <div className="text-center pb-6 border-b border-stone-100">
                      <h2 className="font-editorial text-2xl tracking-[0.25em] text-[#1A1816] uppercase font-medium">
                        TULSI JEWELLERS
                      </h2>
                      <span className="text-[9px] uppercase tracking-[0.3em] text-[#8C7D6B] block mt-0.5">
                        Indian Fine Jewellery · Jaipur & Mumbai
                      </span>
                    </div>

                    {/* Greeting & Headline */}
                    <div className="space-y-2">
                      <p className="text-xs text-stone-800">
                        Dear <strong>{selectedEmail.shippingAddress.fullName}</strong>,
                      </p>
                      
                      {selectedEmail.type === 'order_confirmation' ? (
                        <p className="text-xs text-stone-600 leading-relaxed font-light">
                          Thank you for choosing Tulsi Jewellers. We are pleased to confirm that your order <strong>#{selectedEmail.orderId}</strong> has been registered with our master artisans. Your piece is currently being hand-finished, inspected, and hallmarked with official BIS laser certification.
                        </p>
                      ) : (
                        <p className="text-xs text-stone-600 leading-relaxed font-light">
                          Your bespoke jewellery piece for order <strong>#{selectedEmail.orderId}</strong> has been securely packaged in our vault and handed over to <strong>{selectedEmail.courierName}</strong> for insured armored transit.
                        </p>
                      )}
                    </div>

                    {/* Status Box */}
                    <div className="p-4 bg-[#FAF8F5] border border-[#EAE3D6] rounded-sm space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] uppercase tracking-widest text-[#8C7D6B] font-semibold">
                          Consignment Tracking
                        </span>
                        <span className="text-[11px] font-mono font-semibold text-stone-900">
                          {selectedEmail.trackingNumber}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-xs pt-1 border-t border-stone-200/50">
                        <span className="text-stone-500">Carrier Service:</span>
                        <span className="font-medium text-stone-800">{selectedEmail.courierName}</span>
                      </div>
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-stone-500">Estimated Delivery:</span>
                        <span className="font-semibold text-emerald-800">{selectedEmail.estimatedDelivery}</span>
                      </div>
                    </div>

                    {/* Items Summary Table */}
                    <div className="border border-stone-200 rounded-sm overflow-hidden">
                      <div className="bg-stone-50 p-2.5 text-[10px] uppercase tracking-wider text-stone-500 font-semibold border-b border-stone-200">
                        Ordered Heirlooms
                      </div>
                      <div className="p-3 text-xs text-stone-800 space-y-1">
                        <p className="font-medium">{selectedEmail.itemsSummary}</p>
                        <p className="text-[11px] text-stone-500">Laser BIS 916 Stamped · Tamper-evident Casket Included</p>
                      </div>
                      <div className="bg-stone-50 p-2.5 text-xs font-semibold text-stone-900 border-t border-stone-200 flex justify-between">
                        <span>Total Paid</span>
                        <span className="tabular-nums font-editorial text-sm">{formatPrice(selectedEmail.totalAmount)}</span>
                      </div>
                    </div>

                    {/* Delivery Destination */}
                    <div className="text-[11px] text-stone-600 space-y-1 p-3 bg-stone-50 rounded-sm border border-stone-200">
                      <span className="font-semibold text-stone-800 block text-[10px] uppercase tracking-wider">
                        Delivery Destination:
                      </span>
                      <p>{selectedEmail.shippingAddress.fullName}</p>
                      <p>{selectedEmail.shippingAddress.street}, {selectedEmail.shippingAddress.landmark}</p>
                      <p>{selectedEmail.shippingAddress.city}, {selectedEmail.shippingAddress.state} - {selectedEmail.shippingAddress.pincode}</p>
                      <p className="text-stone-500">Contact: {selectedEmail.shippingAddress.phone}</p>
                    </div>

                    {/* Tracking CTA */}
                    <div className="text-center pt-2">
                      <button
                        onClick={() => handleGoToTracking(selectedEmail.orderId)}
                        className="px-6 py-2.5 bg-[#1A1816] text-[#F9F7F2] text-xs uppercase tracking-widest font-semibold rounded-sm hover:bg-stone-800 transition-colors inline-flex items-center gap-2"
                      >
                        <span>View Live GPS Tracking in Dashboard</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Security Footer */}
                    <div className="pt-4 border-t border-stone-100 text-[10px] text-stone-400 text-center space-y-1">
                      <p>
                        This is an automated dispatch from the Tulsi Jewellers fine jewellery vault.
                      </p>
                      <p>
                        Need concierge assistance? Call our private desk at +91 (0) 80 4920 1800 or reply directly to this notice.
                      </p>
                    </div>

                  </div>
                </div>
              ) : (
                <div className="text-center py-20 text-stone-400">
                  Select an email from the left to preview.
                </div>
              )}
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};
