import React from 'react';
import { CheckCircle2, AlertCircle, X } from 'lucide-react';

const cn = (...classes) => classes.filter(Boolean).join(' ');

const Toast = ({ message, type, onClose }) => (
  <div className={cn(
    "fixed bottom-6 right-6 px-4 py-3 rounded-lg shadow-lg flex items-center gap-3 z-50 animate-in slide-in-from-bottom-5 fade-in duration-300",
    type === 'success' ? "bg-black text-white" : "bg-red-500 text-white"
  )}>
    {type === 'success' ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
    <span className="text-sm font-medium">{message}</span>
    <button onClick={onClose} className="ml-2 hover:opacity-70"><X size={14}/></button>
  </div>
);

export default Toast;
