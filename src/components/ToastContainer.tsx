import React from 'react';
import { useShop } from '../context/ShopContext';
import { CheckCircle2, Info, X, Sparkles } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts, dismissToast } = useShop();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="pointer-events-auto flex items-center justify-between gap-3 px-4 py-3 bg-[#1A1816] text-[#F9F7F2] rounded-lg shadow-xl border border-[#C5A880]/30 transition-all duration-200 animate-in slide-in-from-bottom-2"
        >
          <div className="flex items-center gap-2.5">
            {toast.type === 'gold' && <Sparkles className="w-4 h-4 text-[#D4AF37] shrink-0" />}
            {toast.type === 'success' && <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />}
            {toast.type === 'info' && <Info className="w-4 h-4 text-slate-300 shrink-0" />}
            <span className="text-xs font-medium tracking-wide">{toast.message}</span>
          </div>
          <button
            onClick={() => dismissToast(toast.id)}
            className="p-1 text-stone-400 hover:text-white transition-colors"
            aria-label="Dismiss notification"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      ))}
    </div>
  );
};
