import React, { useState, useEffect, useRef } from 'react';
import { Users, Calendar, Shield, Lock, Unlock, Upload, Image as ImageIcon, X, Check, AlertCircle } from 'lucide-react';

import cover1 from '@/assets/mock/verragio/brand/cover/cover1.png';
import cover2 from '@/assets/mock/verragio/brand/cover/cover2.png';
import cover3 from '@/assets/mock/verragio/brand/cover/cover3.png';
import cover4 from '@/assets/mock/verragio/brand/cover/cover4.png';
import cover5 from '@/assets/mock/verragio/brand/cover/cover5.png';
import cover6 from '@/assets/mock/verragio/brand/cover/cover6.png';
import cover7 from '@/assets/mock/verragio/brand/cover/cover7.png';
import cover8 from '@/assets/mock/verragio/brand/cover/cover8.png';

const SettingsTab = ({ campaign, onUpdate }) => {
  // Local state for buffering changes
  // Local state for buffering changes
  const [localCampaign, setLocalCampaign] = useState(campaign);
  const [isLibraryOpen, setIsLibraryOpen] = useState(false);
  const fileInputRef = useRef(null);

  // Sync local state when prop changes
  useEffect(() => {
    setLocalCampaign(campaign);
  }, [campaign]);

  // Derived state for dirty check (fixes ESLint sync-state-in-effect error)
  const isDirty = JSON.stringify(localCampaign) !== JSON.stringify(campaign);

  const handleSave = () => {
    onUpdate(localCampaign);
    // Local state will resync via useEffect when parent updates 'campaign' prop
  };

  const handleCancel = () => {
    setLocalCampaign(campaign);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      setLocalCampaign({ ...localCampaign, coverImage: objectUrl });
    }
  };

  const mockLibraryImages = [
    cover1, cover2, cover3, cover4,
    cover5, cover6, cover7, cover8
  ];

  return (
    <div className="max-w-3xl mx-auto space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-24">
      
      {/* Section 0: General Information */}
      <section>
        <h3 className="text-lg font-bold text-gray-900 mb-1">General Information</h3>
        <p className="text-sm text-gray-500 mb-6">Update the basic details of your campaign.</p>
        
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm space-y-6">
           {/* Title */}
           <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Campaign Title</label>
              <input 
                type="text" 
                value={localCampaign.title}
                onChange={(e) => setLocalCampaign({...localCampaign, title: e.target.value})}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black/5 font-medium text-gray-900"
                placeholder="e.g., Summer Sale 2024"
              />
           </div>

           {/* Description */}
           <div>
              <div className="flex justify-between items-center mb-1">
                  <label className="block text-sm font-medium text-gray-700">Description</label>
                  <span className={`text-xs ${localCampaign.description?.length > 1200 ? 'text-red-500' : 'text-gray-400'}`}>
                      {localCampaign.description?.length || 0}/1200
                  </span>
              </div>
              <textarea 
                value={localCampaign.description}
                onChange={(e) => {
                    if (e.target.value.length <= 1200) {
                        setLocalCampaign({...localCampaign, description: e.target.value});
                    }
                }}
                rows={3}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black/5 text-gray-600 resize-none"
                placeholder="Briefly describe the campaign's goal..."
              />
           </div>

           {/* Cover Image */}
           <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Cover Image</label>
              <div className="flex items-start gap-4">
                 <div className="w-40 aspect-video bg-gray-100 rounded-lg overflow-hidden border border-gray-200 flex-shrink-0 relative group">
                    {localCampaign.coverImage ? (
                       <img src={localCampaign.coverImage} alt="Cover" className="w-full h-full object-cover" />
                    ) : (
                       <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">No Image</div>
                    )}
                    {/* Remove Image Button */}
                    {localCampaign.coverImage && (
                        <button 
                            onClick={() => setLocalCampaign({...localCampaign, coverImage: ''})}
                            className="absolute top-1 right-1 p-1 bg-black/50 text-white rounded-full hover:bg-black/70 opacity-0 group-hover:opacity-100 transition"
                        >
                            <X size={12} />
                        </button>
                    )}
                 </div>
                 <div className="flex-1 space-y-3">
                    <div className="flex gap-3">
                        <input 
                            type="file" 
                            ref={fileInputRef} 
                            className="hidden" 
                            accept="image/*"
                            onChange={handleFileUpload}
                        />
                        <button 
                            onClick={() => fileInputRef.current?.click()}
                            className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition flex items-center gap-2"
                        >
                            <Upload size={16} /> Upload Image
                        </button>
                        <button 
                            onClick={() => setIsLibraryOpen(!isLibraryOpen)}
                            className={`px-4 py-2 border rounded-lg text-sm font-medium transition flex items-center gap-2 ${isLibraryOpen ? 'bg-gray-100 border-gray-300 text-black' : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'}`}
                        >
                            <ImageIcon size={16} /> Select from Library
                        </button>
                    </div>
                    <p className="text-xs text-gray-500">Recommended size: 1920x1080px. Max 5MB.</p>
                    
                    {/* Mock Library Popover */}
                    {isLibraryOpen && (
                        <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg animate-in fade-in zoom-in-95">
                            <div className="text-xs font-bold text-gray-500 mb-2 uppercase tracking-wider">Asset Library</div>
                            <div className="grid grid-cols-4 gap-2">
                                {mockLibraryImages.map((img, idx) => (
                                    <div 
                                        key={idx} 
                                        onClick={() => {
                                            setLocalCampaign({...localCampaign, coverImage: img});
                                            setIsLibraryOpen(false);
                                        }}
                                        className="aspect-video rounded overflow-hidden cursor-pointer hover:ring-2 hover:ring-black transition relative group"
                                    >
                                        <img src={img} className="w-full h-full object-cover" alt={`Library ${idx}`} />
                                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition"></div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                 </div>
              </div>
           </div>
        </div>
      </section>

      {/* Section 1: Audience */}
      <section>
        <h3 className="text-lg font-bold text-gray-900 mb-1">Audience</h3>
        <p className="text-sm text-gray-500 mb-6">Define which retailers can access this campaign.</p>
        
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
           <div 
             className={`p-4 border-b border-gray-100 transition cursor-pointer flex items-start gap-4 ${localCampaign.audience === 'All Retailers' ? 'bg-blue-50/50' : 'hover:bg-gray-50'}`}
             onClick={() => setLocalCampaign({...localCampaign, audience: 'All Retailers'})}
           >
              <input 
                type="radio" 
                name="audience" 
                className="mt-1 w-4 h-4 text-black border-gray-300 focus:ring-black"
                checked={localCampaign.audience === 'All Retailers'}
                readOnly
              />
              <div>
                 <div className="font-medium text-gray-900">All Retailers</div>
                 <div className="text-sm text-gray-500">Distribute to your entire network.</div>
              </div>
           </div>
           
           <div 
             className={`p-4 border-b border-gray-100 transition cursor-pointer flex items-start gap-4 ${localCampaign.audience === '3 Groups' ? 'bg-blue-50/50' : 'hover:bg-gray-50'}`}
             onClick={() => setLocalCampaign({...localCampaign, audience: '3 Groups'})}
           >
              <input 
                type="radio" 
                name="audience" 
                className="mt-1 w-4 h-4 text-black border-gray-300 focus:ring-black"
                checked={localCampaign.audience === '3 Groups'}
                readOnly
              />
              <div className="flex-1">
                 <div className="font-medium text-gray-900">By Segment</div>
                 <div className="text-sm text-gray-500 mb-2">Target specific zones, tiers, or groups.</div>
                 {localCampaign.audience === '3 Groups' && (
                    <div className="flex gap-2">
                       <span className="px-2 py-1 bg-gray-100 rounded text-xs font-medium text-gray-600">Northeast</span>
                       <span className="px-2 py-1 bg-gray-100 rounded text-xs font-medium text-gray-600">Gold Tier</span>
                    </div>
                 )}
              </div>
           </div>

           <div 
             className={`p-4 transition cursor-pointer flex items-start gap-4 ${localCampaign.audience === 'Specific Retailers' ? 'bg-blue-50/50' : 'hover:bg-gray-50'}`}
             onClick={() => setLocalCampaign({...localCampaign, audience: 'Specific Retailers'})}
           >
              <input 
                type="radio" 
                name="audience" 
                className="mt-1 w-4 h-4 text-black border-gray-300 focus:ring-black"
                checked={localCampaign.audience === 'Specific Retailers'}
                readOnly
              />
              <div>
                 <div className="font-medium text-gray-900">Specific Retailers</div>
                 <div className="text-sm text-gray-500">Manually select retailers.</div>
              </div>
           </div>
        </div>
      </section>

      {/* Section 2: Validity Period */}
      <section>
        <h3 className="text-lg font-bold text-gray-900 mb-1">Validity Period</h3>
        <p className="text-sm text-gray-500 mb-6">Set the timeframe for this campaign.</p>
        
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm flex gap-6">
           <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
              <div className="relative">
                 <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16}/>
                 <input 
                   type="date" 
                   value={localCampaign.startDate}
                   onChange={(e) => setLocalCampaign({...localCampaign, startDate: e.target.value})}
                   className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black/5"
                 />
              </div>
           </div>
           <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
              <div className="relative">
                 <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16}/>
                 <input 
                   type="date" 
                   value={localCampaign.endDate === 'Permanent' ? '' : localCampaign.endDate}
                   disabled={localCampaign.endDate === 'Permanent'}
                   onChange={(e) => setLocalCampaign({...localCampaign, endDate: e.target.value})}
                   className={`w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black/5 ${localCampaign.endDate === 'Permanent' ? 'bg-gray-50 text-gray-400' : ''}`}
                 />
              </div>
              <label className="flex items-center gap-2 mt-2 cursor-pointer">
                 <input 
                   type="checkbox" 
                   checked={localCampaign.endDate === 'Permanent'}
                   onChange={(e) => setLocalCampaign({...localCampaign, endDate: e.target.checked ? 'Permanent' : ''})}
                   className="rounded border-gray-300 text-black focus:ring-black"
                 />
                 <span className="text-sm text-gray-600">No Expiration Date</span>
              </label>
           </div>
        </div>
      </section>

      {/* Sticky Action Bar */}
      <div className={`fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 shadow-[0_-4px_20px_rgba(0,0,0,0.05)] transition-transform duration-300 z-50 ${isDirty ? 'translate-y-0' : 'translate-y-full'}`}>
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6">
            <div className="flex items-center gap-2 text-amber-600">
                <AlertCircle size={20} />
                <span className="font-medium">You have unsaved changes</span>
            </div>
            <div className="flex items-center gap-3">
                <button 
                    onClick={handleCancel}
                    className="px-6 py-2 text-gray-600 font-medium hover:bg-gray-100 rounded-lg transition"
                >
                    Cancel
                </button>
                <button 
                    onClick={handleSave}
                    className="px-6 py-2 bg-black text-white font-bold rounded-lg hover:bg-gray-800 transition shadow-lg flex items-center gap-2"
                >
                    <Check size={18} /> Save Changes
                </button>
            </div>
        </div>
      </div>

    </div>
  );
};

export default SettingsTab;
