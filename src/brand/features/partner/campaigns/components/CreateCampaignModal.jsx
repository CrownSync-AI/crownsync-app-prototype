import React, { useState } from 'react';
import { X, UploadCloud, Calendar, Users, Image as ImageIcon, CheckCircle2 } from 'lucide-react';

const CreateCampaignModal = ({ isOpen, onClose, onSave, retailersCount = 180 }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    coverImage: null,
    validityType: 'permanent', // 'permanent' | 'custom'
    startDate: new Date().toISOString().split('T')[0],
    endDate: '',
    audienceType: 'all', // 'all' | 'segment' | 'specific'
    selectedRetailers: [] // Mock for specific selection
  });

  const [errors, setErrors] = useState({});

  if (!isOpen) return null;

  const validate = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.coverImage) newErrors.coverImage = 'Cover image is required';
    if (formData.validityType === 'custom' && !formData.endDate) newErrors.endDate = 'End date is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSave({
        ...formData,
        // Mock processing
        coverImage: formData.coverImage || 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1000&auto=format&fit=crop',
        audience: formData.audienceType === 'all' ? 'All Retailers' : formData.audienceType === 'segment' ? 'By Segment' : `${formData.selectedRetailers.length} Retailers`
      });
      onClose();
    }
  };

  const handleImageUpload = (e) => {
    // Mock upload - in real app, would handle file reading
    // For prototype, we'll just set a valid URL if they "upload" something, or toggle a state
    // Here we simulate a successful upload of a file
    const file = e.target.files[0];
    if (file) {
       // Check size < 1MB mock
       if (file.size > 1024 * 1024) {
          alert('File size must be less than 1MB');
          return;
       }
       // Set a mock URL for preview
       setFormData({...formData, coverImage: URL.createObjectURL(file)});
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl overflow-hidden animate-in zoom-in-95 duration-200 flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50">
           <div>
              <h3 className="text-xl font-bold text-gray-900">New Campaign</h3>
              <p className="text-sm text-gray-500">Create a new marketing campaign for your retailers.</p>
           </div>
           <button onClick={onClose} className="p-2 hover:bg-gray-200 rounded-full text-gray-500 hover:text-black transition"><X size={20}/></button>
        </div>

        {/* Form Content */}
        <div className="flex-1 overflow-y-auto p-8">
           <form id="create-campaign-form" onSubmit={handleSubmit} className="space-y-8">
              
              {/* 1. Basic Info */}
              <div className="space-y-4">
                 <div>
                    <label className="block text-sm font-bold text-gray-900 mb-1">Campaign Title <span className="text-red-500">*</span></label>
                    <input 
                      type="text"
                      value={formData.title}
                      onChange={e => setFormData({...formData, title: e.target.value})}
                      className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black/5 transition ${errors.title ? 'border-red-300 focus:border-red-500' : 'border-gray-200 focus:border-black'}`}
                      placeholder="e.g. Summer Collection Launch 2025"
                    />
                    {errors.title && <p className="text-xs text-red-500 mt-1">{errors.title}</p>}
                 </div>

                  <div>
                     <div className="flex justify-between items-center mb-1">
                        <label className="block text-sm font-bold text-gray-900">Description</label>
                        <span className={`text-xs ${formData.description.length > 1200 ? 'text-red-500' : 'text-gray-400'}`}>
                            {formData.description.length}/1200
                        </span>
                     </div>
                     <textarea 
                       value={formData.description}
                       onChange={e => {
                           if (e.target.value.length <= 1200) {
                               setFormData({...formData, description: e.target.value});
                           }
                       }}
                       className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-black transition h-24 resize-none"
                       placeholder="Describe the goal and contents of this campaign..."
                     />
                  </div>
              </div>

              {/* 2. Cover Image */}
              <div>
                 <label className="block text-sm font-bold text-gray-900 mb-2">Cover Image <span className="text-red-500">*</span></label>
                 <div className={`border-2 border-dashed rounded-xl p-8 text-center transition group relative overflow-hidden ${formData.coverImage ? 'border-transparent' : 'border-gray-300 hover:border-indigo-400 hover:bg-indigo-50'}`}>
                    
                    {formData.coverImage ? (
                       <div className="relative w-full aspect-video rounded-lg overflow-hidden shadow-sm group-hover:opacity-90 transition">
                          <img src={formData.coverImage} alt="Preview" className="w-full h-full object-cover" />
                          <button 
                             type="button"
                             onClick={() => setFormData({...formData, coverImage: null})}
                             className="absolute top-2 right-2 p-1.5 bg-white/80 hover:bg-white text-red-600 rounded-full shadow-sm backdrop-blur-sm"
                          >
                             <X size={16}/>
                          </button>
                       </div>
                    ) : (
                       <label className="cursor-pointer flex flex-col items-center justify-center h-full">
                          <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-gray-400 mb-3 group-hover:scale-110 transition-transform">
                             <ImageIcon size={24}/>
                          </div>
                          <p className="text-sm font-medium text-gray-900">Click to upload cover image</p>
                          <p className="text-xs text-gray-500 mt-1">16:9 aspect ratio recommended. Max 1MB.</p>
                          <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />
                       </label>
                    )}
                 </div>
                 {errors.coverImage && <p className="text-xs text-red-500 mt-1">{errors.coverImage}</p>}
              </div>

              {/* 3. Validity */}
              <div>
                 <label className="block text-sm font-bold text-gray-900 mb-2">Validity Period</label>
                 <div className="flex gap-4 mb-3">
                    <label className={`flex-1 p-3 border rounded-lg cursor-pointer transition flex items-center gap-3 ${formData.validityType === 'permanent' ? 'border-black bg-gray-50 ring-1 ring-black' : 'border-gray-200 hover:border-gray-300'}`}>
                       <input 
                         type="radio" 
                         name="validity" 
                         className="hidden"
                         checked={formData.validityType === 'permanent'}
                         onChange={() => setFormData({...formData, validityType: 'permanent'})}
                       />
                       <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${formData.validityType === 'permanent' ? 'border-black' : 'border-gray-300'}`}>
                          {formData.validityType === 'permanent' && <div className="w-2 h-2 bg-black rounded-full"></div>}
                       </div>
                       <span className="text-sm font-medium">Permanent</span>
                    </label>

                    <label className={`flex-1 p-3 border rounded-lg cursor-pointer transition flex items-center gap-3 ${formData.validityType === 'custom' ? 'border-black bg-gray-50 ring-1 ring-black' : 'border-gray-200 hover:border-gray-300'}`}>
                       <input 
                         type="radio" 
                         name="validity" 
                         className="hidden"
                         checked={formData.validityType === 'custom'}
                         onChange={() => setFormData({...formData, validityType: 'custom'})}
                       />
                       <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${formData.validityType === 'custom' ? 'border-black' : 'border-gray-300'}`}>
                          {formData.validityType === 'custom' && <div className="w-2 h-2 bg-black rounded-full"></div>}
                       </div>
                       <span className="text-sm font-medium">Custom Date</span>
                    </label>
                 </div>
                 
                 {formData.validityType === 'custom' && (
                    <div className="grid grid-cols-2 gap-4 animate-in fade-in slide-in-from-top-2">
                       <div>
                          <label className="block text-xs font-medium text-gray-500 mb-1">Start Date</label>
                          <input 
                            type="date"
                            value={formData.startDate}
                            onChange={e => setFormData({...formData, startDate: e.target.value})}
                            className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black/5"
                          />
                       </div>
                       <div>
                          <label className="block text-xs font-medium text-gray-500 mb-1">End Date</label>
                          <input 
                            type="date"
                            value={formData.endDate}
                            onChange={e => setFormData({...formData, endDate: e.target.value})}
                            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black/5 ${errors.endDate ? 'border-red-300' : 'border-gray-200'}`}
                          />
                          {errors.endDate && <p className="text-xs text-red-500 mt-1">{errors.endDate}</p>}
                       </div>
                    </div>
                 )}
              </div>

              {/* 4. Audience */}
              <div>
                 <label className="block text-sm font-bold text-gray-900 mb-2">Audience</label>
                 <div className="space-y-2">
                    {[
                       { id: 'all', label: `All Retailers (${retailersCount})`, desc: 'Distribute to your entire network.' },
                       { id: 'segment', label: 'By Segment', desc: 'Target specific zones, tiers, or groups.' },
                       { id: 'specific', label: 'Specific Retailers', desc: 'Manually select retailers.' }
                    ].map(opt => (
                       <label key={opt.id} className={`flex items-start gap-3 p-3 border rounded-lg cursor-pointer transition ${formData.audienceType === opt.id ? 'border-black bg-gray-50' : 'border-gray-200 hover:bg-gray-50'}`}>
                          <input 
                            type="radio" 
                            name="audience" 
                            className="hidden"
                            checked={formData.audienceType === opt.id}
                            onChange={() => setFormData({...formData, audienceType: opt.id})}
                          />
                          <div className={`w-4 h-4 mt-0.5 rounded-full border flex items-center justify-center flex-shrink-0 ${formData.audienceType === opt.id ? 'border-black' : 'border-gray-300'}`}>
                             {formData.audienceType === opt.id && <div className="w-2 h-2 bg-black rounded-full"></div>}
                          </div>
                          <div>
                             <div className="text-sm font-medium text-gray-900">{opt.label}</div>
                             <div className="text-xs text-gray-500">{opt.desc}</div>
                          </div>
                       </label>
                    ))}
                 </div>
              </div>

           </form>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-100 bg-gray-50 flex justify-end gap-3">
           <button onClick={onClose} className="px-6 py-2.5 text-sm font-medium text-gray-600 hover:text-black hover:bg-gray-200 rounded-lg transition">Cancel</button>
           <button form="create-campaign-form" type="submit" className="px-6 py-2.5 text-sm font-bold text-white bg-black hover:bg-gray-800 rounded-lg shadow-lg transition">Create Campaign</button>
        </div>

      </div>
    </div>
  );
};

export default CreateCampaignModal;
