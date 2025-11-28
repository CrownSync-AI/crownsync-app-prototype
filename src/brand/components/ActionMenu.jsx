import React, { useState } from 'react';
import { MoreHorizontal, Edit3, Share2, Copy, BarChart3, Trash2 } from 'lucide-react';

const ActionMenu = ({ onEdit, onDelete, onDuplicate, onAnalytics, onShare, label }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="relative">
      <button 
        onClick={(e) => { e.stopPropagation(); setIsOpen(!isOpen); }}
        className="p-2 text-gray-400 hover:text-black hover:bg-gray-100 rounded-full transition"
      >
        <MoreHorizontal size={20} />
      </button>
      {isOpen && (
        <>
          <div className="fixed inset-0 z-10" onClick={(e) => { e.stopPropagation(); setIsOpen(false); }} />
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-100 z-20 py-1 text-sm animate-in fade-in zoom-in-95 duration-100">
            {onEdit && <button onClick={(e) => { e.stopPropagation(); onEdit(); setIsOpen(false)}} className="w-full text-left px-4 py-2 hover:bg-gray-50 flex items-center gap-2"><Edit3 size={14}/> Edit {label}</button>}
            {onShare && <button onClick={(e) => { e.stopPropagation(); onShare(); setIsOpen(false)}} className="w-full text-left px-4 py-2 hover:bg-gray-50 flex items-center gap-2"><Share2 size={14}/> Share</button>}
            {onDuplicate && <button onClick={(e) => { e.stopPropagation(); onDuplicate(); setIsOpen(false)}} className="w-full text-left px-4 py-2 hover:bg-gray-50 flex items-center gap-2"><Copy size={14}/> Duplicate</button>}
            {onAnalytics && <button onClick={(e) => { e.stopPropagation(); onAnalytics(); setIsOpen(false)}} className="w-full text-left px-4 py-2 hover:bg-gray-50 flex items-center gap-2"><BarChart3 size={14}/> View Analytics</button>}
            <div className="h-px bg-gray-100 my-1"/>
            {onDelete && <button onClick={(e) => { e.stopPropagation(); onDelete(); setIsOpen(false)}} className="w-full text-left px-4 py-2 hover:bg-red-50 text-red-600 flex items-center gap-2"><Trash2 size={14}/> Delete {label}</button>}
          </div>
        </>
      )}
    </div>
  );
};

export default ActionMenu;
