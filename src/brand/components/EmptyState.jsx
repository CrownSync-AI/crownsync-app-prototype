import React from 'react';
import { FolderOpen, Plus } from 'lucide-react';

const EmptyState = ({ title, description, action, onAction }) => (
  <div className="h-full flex flex-col items-center justify-center text-center p-8 animate-in fade-in zoom-in-95 duration-300">
    <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
       <FolderOpen size={48} className="text-gray-300" />
    </div>
    <h3 className="text-xl font-medium text-gray-900 mb-2">{title}</h3>
    <p className="text-gray-500 max-w-md mb-8">{description}</p>
    {action && (
      <button onClick={onAction} className="bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition flex items-center gap-2">
        <Plus size={18} /> {action}
      </button>
    )}
  </div>
);

export default EmptyState;
