import React from 'react';
import { useApp } from '../context/AppContext';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useApp();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`pointer-events-auto p-4 rounded-lg shadow-xl border flex items-start gap-3 text-xs font-sans animate-in slide-in-from-right duration-200 ${
            toast.type === 'success'
              ? 'bg-[#2C2723] text-[#FAF8F5] border-[#453D35]'
              : toast.type === 'error'
              ? 'bg-[#7F1D1D] text-[#FEF2F2] border-[#991B1B]'
              : 'bg-[#FAF8F5] text-[#1F1B18] border-[#D0C5B4]'
          }`}
        >
          {toast.type === 'success' && <CheckCircle2 className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />}
          {toast.type === 'error' && <AlertCircle className="w-4 h-4 text-[#FCA5A5] shrink-0 mt-0.5" />}
          {toast.type === 'info' && <Info className="w-4 h-4 text-[#8B6B48] shrink-0 mt-0.5" />}
          
          <div className="grow leading-relaxed">{toast.message}</div>
          
          <button
            onClick={() => removeToast(toast.id)}
            className="text-white/60 hover:text-white shrink-0 p-0.5"
            aria-label="Dismiss notification"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      ))}
    </div>
  );
};
