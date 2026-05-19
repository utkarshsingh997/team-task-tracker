import { useEffect } from 'react';
import { CheckCircle, X } from 'lucide-react';

interface ToastProps {
  message: string;
  onClose: () => void;
  duration?: number;
}

export function Toast({ message, onClose, duration = 3000 }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [onClose, duration]);

  return (
    <div className="toast-enter fixed top-4 right-4 z-[100] flex items-center gap-3 bg-[#121836] border border-white/10 rounded-xl px-4 py-3 shadow-2xl">
      <CheckCircle className="w-5 h-5 text-[#00D1A7] flex-shrink-0" />
      <p className="text-sm text-[#F1F5F9]">{message}</p>
      <button onClick={onClose} className="text-[#64748B] hover:text-[#F1F5F9] transition-all">
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}
