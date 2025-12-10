import React, { useState, useRef, useEffect } from 'react';
import { X, ChevronDown, Check, Users } from 'lucide-react';
import { zones, tiers, groups, getRetailerCount } from '../../../data/mockStore/retailerStore';

const SegmentSelector = ({ selectedSegments = [], onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleSegment = (segment) => {
    const exists = selectedSegments.find(s => s.id === segment.id && s.type === segment.type);
    let newSegments;
    if (exists) {
      newSegments = selectedSegments.filter(s => !(s.id === segment.id && s.type === segment.type));
    } else {
      newSegments = [...selectedSegments, segment];
    }
    onChange(newSegments);
  };

  const removeSegment = (idx, e) => {
    e.stopPropagation(); // prevent opening dropdown
    const newSegments = [...selectedSegments];
    newSegments.splice(idx, 1);
    onChange(newSegments);
  };

  // Convert generic segments to filters for count estimation
  const currentFilters = {
     zones: selectedSegments.filter(s => s.type === 'zone').map(s => s.id),
     tiers: selectedSegments.filter(s => s.type === 'tier').map(s => s.id),
     groups: selectedSegments.filter(s => s.type === 'group').map(s => s.id),
  };
  const estCount = getRetailerCount(currentFilters);

  return (
    <div className="space-y-2" ref={containerRef}>
      
      {/* Input / Tag Area */}
      <div 
         onClick={() => setIsOpen(!isOpen)}
         className={`min-h-[42px] w-full px-3 py-1.5 bg-white border rounded-lg cursor-pointer flex flex-wrap items-center gap-2 transition hover:border-gray-400 ${isOpen ? 'border-black ring-1 ring-black' : 'border-gray-300'}`}
      >
         {selectedSegments.length === 0 && (
            <span className="text-gray-400 text-sm ml-1 select-none">Select zones, tiers, or groups...</span>
         )}
         
         {selectedSegments.map((segment, idx) => (
            <span key={`${segment.type}-${segment.id}`} className="bg-gray-100 border border-gray-200 text-gray-800 text-xs font-medium px-2 py-0.5 rounded-md flex items-center gap-1">
               {segment.label}
               <button onClick={(e) => removeSegment(idx, e)} className="hover:text-red-600 transition">
                  <X size={12}/>
               </button>
            </span>
         ))}
         
         <div className="ml-auto pl-2 text-gray-400">
            <ChevronDown size={14} className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
         </div>
      </div>

      {/* Helper Text / Count (Right Aligned) */}
      <div className="flex justify-end items-center gap-1.5 text-xs font-medium text-gray-500 animate-in fade-in">
         <Users size={12} />
         <span>Est. Audience: <span className="text-black">{estCount} Retailers</span></span>
      </div>

      {/* Dropdown */}
      {isOpen && (
         <div className="absolute z-10 w-full max-w-md bg-white border border-gray-200 rounded-lg shadow-xl mt-1 max-h-64 overflow-y-auto animate-in zoom-in-95 origin-top-left p-1">
            
            {/* Zones Group */}
            <div className="px-3 py-2 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Zones</div>
            {zones.map(z => {
               const isSelected = selectedSegments.some(s => s.id === z.id && s.type === 'zone');
               return (
                  <div 
                     key={z.id} 
                     onClick={() => toggleSegment({ ...z, type: 'zone' })}
                     className="px-3 py-2 hover:bg-gray-50 cursor-pointer flex items-center justify-between text-sm rounded-md transition"
                  >
                     <span className={isSelected ? 'font-semibold text-black' : 'text-gray-700'}>{z.label}</span>
                     {isSelected && <Check size={14} className="text-black"/>}
                  </div>
               );
            })}

            <div className="h-px bg-gray-100 my-1 mx-2"></div>

            {/* Tiers Group */}
            <div className="px-3 py-2 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Tiers</div>
            {tiers.map(t => {
               const isSelected = selectedSegments.some(s => s.id === t.id && s.type === 'tier');
               return (
                  <div 
                     key={t.id} 
                     onClick={() => toggleSegment({ ...t, type: 'tier' })}
                     className="px-3 py-2 hover:bg-gray-50 cursor-pointer flex items-center justify-between text-sm rounded-md transition"
                  >
                     <span className={isSelected ? 'font-semibold text-black' : 'text-gray-700'}>{t.label}</span>
                     {isSelected && <Check size={14} className="text-black"/>}
                  </div>
               );
            })}

            <div className="h-px bg-gray-100 my-1 mx-2"></div>

            {/* Groups Group */}
            <div className="px-3 py-2 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Special Groups</div>
            {groups.map(g => {
               const isSelected = selectedSegments.some(s => s.id === g.id && s.type === 'group');
               return (
                  <div 
                     key={g.id} 
                     onClick={() => toggleSegment({ ...g, type: 'group' })}
                     className="px-3 py-2 hover:bg-gray-50 cursor-pointer flex items-center justify-between text-sm rounded-md transition"
                  >
                     <span className={isSelected ? 'font-semibold text-black' : 'text-gray-700'}>{g.label}</span>
                     {isSelected && <Check size={14} className="text-black"/>}
                  </div>
               );
            })}

         </div>
      )}
    </div>
  );
};

export default SegmentSelector;
