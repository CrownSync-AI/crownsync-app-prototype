import React, { useState } from 'react';
import { Plus, Search, Pin, Clock, Download, Eye, BarChart3, ArrowLeft, Settings, Share2, AlertCircle, X, FolderOpen, Image as ImageIcon, FileText, ChevronRight, Grid, List as ListIcon, Trash2, ChevronDown, Layers, Instagram, Mail, Smartphone, Paperclip, CheckCircle2, Video } from 'lucide-react';
import ActionMenu from '../../components/ActionMenu';
import EmptyState from '../../components/EmptyState';
import BrandCampaignList from './BrandCampaignList';

const cn = (...classes) => classes.filter(Boolean).join(' ');

let uniqueIdCounter = 100;

const formatBytes = (bytes) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

const ShareModal = ({ isOpen, onClose, onSave, title, retailers, initialSharedWith = [] }) => {
  const [selected, setSelected] = useState(new Set(initialSharedWith === 'all' ? [] : initialSharedWith));
  const [shareAll, setShareAll] = useState(initialSharedWith === 'all');

  const handleToggle = (id) => {
    const next = new Set(selected);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setSelected(next);
    if (shareAll) setShareAll(false);
  };

  const handleSave = () => {
    onSave(shareAll ? 'all' : Array.from(selected));
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200">
        <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
           <h3 className="font-medium">Share {title}</h3>
           <button onClick={onClose}><X size={18} className="text-gray-400 hover:text-black"/></button>
        </div>
        <div className="p-4 max-h-[60vh] overflow-y-auto">
           <label className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer border border-transparent hover:border-gray-200 transition mb-2">
              <div className={`w-5 h-5 rounded border flex items-center justify-center ${shareAll ? 'bg-black border-black text-white' : 'border-gray-300'}`}>
                 {shareAll && <CheckCircle2 size={12}/>}
              </div>
              <input type="checkbox" className="hidden" checked={shareAll} onChange={() => {setShareAll(!shareAll); setSelected(new Set());}} />
              <span className="font-medium">All Retailers</span>
           </label>
           
           <div className="my-3 border-t border-gray-100"></div>
           
           <div className="space-y-1">
              {retailers.map(r => (
                 <label key={r.id} className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer border transition ${selected.has(r.id) ? 'bg-indigo-50 border-indigo-100' : 'hover:bg-gray-50 border-transparent'}`}>
                    <div className={`w-5 h-5 rounded border flex items-center justify-center ${selected.has(r.id) ? 'bg-indigo-600 border-indigo-600 text-white' : 'border-gray-300'}`}>
                       {selected.has(r.id) && <CheckCircle2 size={12}/>}
                    </div>
                    <input 
                        type="checkbox" 
                        className="hidden" 
                        checked={selected.has(r.id)} 
                        onChange={() => handleToggle(r.id)}
                        disabled={shareAll} 
                    />
                    <div className={shareAll ? 'opacity-50' : ''}>
                       <div className="font-medium text-sm">{r.name}</div>
                       <div className="text-xs text-gray-500">{r.email}</div>
                    </div>
                 </label>
              ))}
           </div>
        </div>
        <div className="p-4 border-t border-gray-100 flex justify-end gap-2 bg-gray-50">
           <button onClick={onClose} className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-black">Cancel</button>
           <button onClick={handleSave} className="px-4 py-2 text-sm font-medium bg-black text-white rounded hover:bg-gray-800">Save Changes</button>
        </div>
      </div>
    </div>
  );
};

const ConfirmEditModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200 p-6 text-center">
        <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4 text-yellow-600">
           <AlertCircle size={24} />
        </div>
        <h3 className="text-xl font-bold mb-2">Edit Live Campaign?</h3>
        <p className="text-gray-500 mb-6">This campaign is currently live. Editing it will switch it to <strong>Maintenance Mode</strong>, hiding content from retailers until you publish changes.</p>
        <div className="flex gap-3 justify-center">
           <button onClick={onClose} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg font-medium">Cancel</button>
           <button onClick={onConfirm} className="px-4 py-2 bg-black text-white rounded-lg font-medium hover:bg-gray-800">Enter Maintenance Mode</button>
        </div>
      </div>
    </div>
  );
};

const RetailerListModal = ({ isOpen, onClose, retailers }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg overflow-hidden animate-in zoom-in-95 duration-200 flex flex-col max-h-[80vh]">
        <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
           <h3 className="font-medium">Shared with {retailers.length} Retailers</h3>
           <button onClick={onClose}><X size={18} className="text-gray-400 hover:text-black"/></button>
        </div>
        <div className="overflow-y-auto p-2">
           {retailers.map(r => (
              <div key={r.id} className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg border-b border-gray-50 last:border-0">
                 <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-xs font-bold text-gray-600">
                    {r.name.substring(0,2).toUpperCase()}
                 </div>
                 <div>
                    <div className="text-sm font-medium">{r.name}</div>
                    <div className="text-xs text-gray-400">{r.email}</div>
                 </div>
                 <div className="ml-auto text-xs bg-emerald-50 text-emerald-600 px-2 py-1 rounded-full">Active</div>
              </div>
           ))}
        </div>
      </div>
    </div>
  );
};

const UploadModal = ({ isOpen, onClose, onUpload, folderName }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200 p-6">
        <h3 className="text-xl font-bold mb-4">Upload Assets</h3>
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:bg-gray-50 transition cursor-pointer mb-4">
           <p className="text-indigo-600 font-medium">Click to select files</p>
           <p className="text-xs text-gray-400 mt-1">or drag and drop</p>
        </div>
        <p className="text-xs text-gray-500 mb-6 text-center bg-gray-50 p-3 rounded-lg border border-gray-100">
           Files uploaded here will be automatically saved to <br/><strong>Asset Library / {folderName}</strong>.
        </p>
        <div className="flex justify-end gap-2">
           <button onClick={onClose} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg font-medium">Cancel</button>
           <button onClick={onUpload} className="px-4 py-2 bg-black text-white rounded-lg font-medium hover:bg-gray-800">Upload</button>
        </div>
      </div>
    </div>
  );
};

const CampaignDetail = ({ campaign, onBack, allFiles, setFiles, allTemplates, notify, onShare, onEdit, onUpdateStatus, retailers, onAddAsset, onPin }) => {
  const [confirmEditOpen, setConfirmEditOpen] = useState(false);
  const [retailerListOpen, setRetailerListOpen] = useState(false);
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [isAssetMenuOpen, setIsAssetMenuOpen] = useState(false);
  const [currentFolderId, setCurrentFolderId] = useState(null);
  const [view, setView] = useState('grid'); // 'grid' or 'list'
  const [selectedFiles, setSelectedFiles] = useState([]);

  // Filter assets based on IDs stored in campaign.assets AND current folder
  const linkedAssets = allFiles.filter(f => campaign.assets?.includes(f.id));
  const currentViewAssets = linkedAssets.filter(f => f.parentId === currentFolderId);
  
  // Get breadcrumbs
  const getBreadcrumbs = () => {
      if (!currentFolderId) return [{ id: null, name: 'Assets' }];
      const folder = allFiles.find(f => f.id === currentFolderId);
      return [{ id: null, name: 'Assets' }, { id: folder.id, name: folder.name }];
  };

  const linkedTemplates = allTemplates.filter(t => campaign.templates?.includes(t.id));

  const [pendingAction, setPendingAction] = useState(null);

  const handleSafeEdit = (action) => {
      if (campaign.status === 'Shared') {
          setPendingAction(() => action);
          setConfirmEditOpen(true);
      } else {
          action();
      }
  };

  const handleAssetAction = (type) => {
      setIsAssetMenuOpen(false);
      if (type === 'folder') {
          // Create folder in current view
          const newFolder = {
              id: `fol${uniqueIdCounter++}`,
              name: 'New Untitled Folder',
              type: 'folder',
              size: 0,
              date: new Date().toISOString().split('T')[0],
              parentId: currentFolderId
          };
          setFiles([newFolder, ...allFiles]);
          onAddAsset(campaign.id, newFolder.id);
          notify(`New folder created in ${currentFolderId ? 'current folder' : 'root'}`, 'success');
      } else if (type === 'files') {
          setUploadModalOpen(true);
      }
  };

  const handleUploadConfirm = () => {
      // Mock upload logic
      // In real app, this would upload to 'Campaign Uploads' system folder if not in a specific folder?
      // User request: "Files uploaded here will be automatically saved to Asset Library / Campaign Uploads."
      // So we should probably set parentId to 'sys_campaigns' if we can find it, or just mock it.
      // But wait, if we are in a subfolder of the campaign, should it go there?
      // The request says "Files uploaded here... saved to Asset Library / Campaign Uploads / [Campaign Name] / [File]"
      // For now, let's just mock it adding to the current view or the system folder.
      // Let's add to current view for simplicity in this mock, but show the message as requested.
      
      const newFile = {
          id: `f${uniqueIdCounter++}`,
          name: 'Uploaded_Asset.jpg',
          type: 'image',
          size: 2500000,
          date: new Date().toISOString().split('T')[0],
          parentId: currentFolderId // Or 'sys_campaigns' if we want to be strict, but then it might not show up here if we filter by currentFolderId
      };
      setFiles([newFile, ...allFiles]);
      onAddAsset(campaign.id, newFile.id);
      setUploadModalOpen(false);
      notify('Files uploaded successfully', 'success');
  };

  const toggleSelection = (id) => {
      if (selectedFiles.includes(id)) {
          setSelectedFiles(selectedFiles.filter(fid => fid !== id));
      } else {
          setSelectedFiles([...selectedFiles, id]);
      }
  };

  const handleDeleteSelected = () => {
      if (confirm(`Delete ${selectedFiles.length} items?`)) {
          // In real app: delete from allFiles or remove from campaign.assets
          notify(`${selectedFiles.length} items deleted`, 'success');
          setSelectedFiles([]);
      }
  };

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Header with Cover */}
      <div className="relative h-48 bg-gray-900 flex-shrink-0">
         <div className={`absolute inset-0 ${campaign.cover} opacity-50`}></div>
         <div className="absolute top-4 left-4 z-10">
            <button onClick={onBack} className="flex items-center gap-2 text-white/80 hover:text-white bg-black/30 hover:bg-black/50 px-3 py-1.5 rounded-full backdrop-blur-sm transition">
               <ArrowLeft size={16}/> Back
            </button>
         </div>
         <div className="absolute bottom-0 left-0 w-full p-6 text-white flex justify-between items-end bg-gradient-to-t from-black/80 to-transparent">
            <div>
               <div className="flex items-center gap-3 mb-2">
                  <span className={`px-2 py-0.5 rounded text-xs font-bold uppercase tracking-wider text-black ${
                      campaign.status === 'Shared' ? 'bg-emerald-400' :
                      campaign.status === 'Maintenance' ? 'bg-yellow-400' :
                      campaign.status === 'Draft' ? 'bg-gray-200' : 'bg-red-400'
                    }`}>
                    {campaign.status}
                  </span>
                  {campaign.isPinned && <span className="bg-yellow-400 text-black px-2 py-0.5 rounded text-xs font-bold flex items-center gap-1"><span className="w-1.5 h-1.5 bg-black rounded-full"></span> Pinned</span>}
               </div>
               <h1 className="text-3xl font-serif font-bold flex items-center gap-3">
                   {campaign.title}
                   <button onClick={onPin} className={`p-1.5 rounded-full transition ${campaign.isPinned ? 'bg-yellow-400 text-black' : 'bg-white/10 text-white hover:bg-white/20'}`} title={campaign.isPinned ? "Unpin Campaign" : "Pin Campaign"}>
                       <Pin size={16} className={campaign.isPinned ? "fill-black" : ""} />
                   </button>
               </h1>
               <p className="text-white/80 mt-1 max-w-2xl text-sm">{campaign.description}</p>
            </div>
            <div className="flex gap-2">
               <button onClick={() => handleSafeEdit(onEdit)} className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white px-4 py-2 rounded border border-white/20 flex items-center gap-2 transition">
                  <Settings size={16}/> Settings
               </button>
               {(campaign.status === 'Draft') && (
                   <button onClick={onShare} className="bg-white text-black hover:bg-gray-100 px-4 py-2 rounded font-medium flex items-center gap-2 transition shadow-lg">
                      <Share2 size={16}/> Share
                   </button>
               )}
            </div>
         </div>
      </div>

      {/* Stats Bar */}
      <div className="flex border-b border-gray-200 bg-white relative">
          {/* Inline Status Banner REMOVED */}
          <div className="px-6 py-4 border-r border-gray-100 flex-1">
             <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Total Downloads</div>
            <div className="text-xl font-bold flex items-center gap-2">{campaign.downloads} <Download size={14} className="text-gray-400"/></div>
         </div>
         <div className="px-6 py-4 border-r border-gray-100 flex-1">
            <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Views</div>
            <div className="text-xl font-bold flex items-center gap-2">{campaign.views} <Eye size={14} className="text-gray-400"/></div>
         </div>
         <div className="px-6 py-4 flex-1 flex items-center justify-between">
            <div>
               <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Retailer Access</div>
               <div className="flex -space-x-2 cursor-pointer hover:opacity-80 transition" onClick={() => setRetailerListOpen(true)}>
                  {[1,2,3].map(i => (
                     <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-gray-200 flex items-center justify-center text-xs font-bold text-gray-600">R{i}</div>
                  ))}
                  <div className="w-8 h-8 rounded-full border-2 border-white bg-gray-100 flex items-center justify-center text-xs text-gray-500">+20</div>
               </div>
             </div>
             {/* Share button removed from here */}
          </div>
       </div>
      
      <ConfirmEditModal 
         isOpen={confirmEditOpen} 
         onClose={() => setConfirmEditOpen(false)} 
         onConfirm={() => {
             onUpdateStatus('Maintenance');
             setConfirmEditOpen(false);
             if (pendingAction) pendingAction();
             setPendingAction(null);
         }}
      />
      
      <RetailerListModal
         isOpen={retailerListOpen}
         onClose={() => setRetailerListOpen(false)}
         retailers={retailers || []} // Pass full list here
      />

      {/* Content Area */}
      <div className="flex-1 overflow-auto bg-gray-50 p-6 space-y-8">
         
         {/* Templates Section */}
         <section>
            <div className="flex items-center justify-between mb-4">
               <h3 className="text-lg font-medium flex items-center gap-2"><Layers size={20} className="text-indigo-600"/> Templates Included</h3>
               <button onClick={() => handleSafeEdit(() => notify('Add Template Modal', 'success'))} className="text-sm text-indigo-600 font-medium hover:underline">+ Add Template</button>
            </div>
            
            {linkedTemplates.length === 0 ? (
               <div className="bg-white border border-dashed border-gray-300 rounded-lg p-8 text-center text-gray-400">
                  No templates associated with this campaign.
               </div>
            ) : (
               <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {linkedTemplates.map(t => (
                    <div key={t.id} className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition">
                       <div className="h-32 bg-gray-100 rounded mb-3 flex items-center justify-center text-gray-400 text-sm">{t.thumb} Preview</div>
                       <div className="flex justify-between items-start">
                          <div>
                             <div className="font-medium text-sm">{t.name}</div>
                             <div className="flex items-center gap-2 mt-1">
                                {t.type === 'social' && (
                                   <>
                                     <span className="text-xs text-gray-500 uppercase font-medium">Social</span>
                                     <div className="flex gap-1">
                                        {t.platforms.includes('instagram') && <Instagram size={12} className="text-pink-600"/>}
                                        {t.platforms.includes('facebook') && <div className="w-3 h-3 bg-blue-600 rounded-full flex items-center justify-center text-[8px] text-white font-bold">f</div>}
                                        {t.platforms.includes('x') && <div className="w-3 h-3 bg-black rounded-full flex items-center justify-center text-[8px] text-white font-bold">X</div>}
                                        {t.platforms.includes('google') && <div className="w-3 h-3 bg-red-500 rounded-full flex items-center justify-center text-[8px] text-white font-bold">G</div>}
                                     </div>
                                   </>
                                )}
                                {t.type === 'email' && <span className="text-xs text-gray-500 uppercase font-medium flex items-center gap-1"><Mail size={12}/> Email</span>}
                                {t.type === 'sms' && <span className="text-xs text-gray-500 uppercase font-medium flex items-center gap-1"><Smartphone size={12}/> SMS</span>}
                             </div>
                          </div>
                          <button className="text-xs border border-gray-200 px-2 py-1 rounded hover:bg-black hover:text-white transition" onClick={() => notify('Edit Template Content', 'success')}>Edit</button>
                       </div>
                    </div>
                  ))}
               </div>
            )}
         </section>

          {/* Assets Section */}
          <section>
             <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-4">
                    <h3 className="text-lg font-medium flex items-center gap-2"><Paperclip size={20} className="text-indigo-600"/> Downloadable Assets</h3>
                    <div className="flex bg-gray-100 rounded p-0.5">
                        <button onClick={() => setView('grid')} className={`p-1 rounded ${view === 'grid' ? 'bg-white shadow-sm text-black' : 'text-gray-400 hover:text-gray-600'}`}><Grid size={14}/></button>
                        <button onClick={() => setView('list')} className={`p-1 rounded ${view === 'list' ? 'bg-white shadow-sm text-black' : 'text-gray-400 hover:text-gray-600'}`}><ListIcon size={14}/></button>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                   {selectedFiles.length > 0 && (
                       <button onClick={handleDeleteSelected} className="text-sm text-red-600 font-medium hover:bg-red-50 px-3 py-1.5 rounded flex items-center gap-1 transition animate-in fade-in">
                           <Trash2 size={14}/> Delete ({selectedFiles.length})
                       </button>
                   )}
                   <div className="relative">
                      <button 
                        onClick={() => setIsAssetMenuOpen(!isAssetMenuOpen)}
                        className="text-sm text-indigo-600 font-medium hover:underline flex items-center gap-1 bg-indigo-50 px-3 py-1.5 rounded"
                      >
                        + Add Content <ChevronDown size={14}/>
                      </button>
                      {isAssetMenuOpen && (
                          <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-100 py-1 z-20 animate-in fade-in slide-in-from-top-2">
                              <button onClick={() => handleAssetAction('files')} className="w-full text-left px-4 py-2 hover:bg-gray-50 text-sm flex items-center gap-2"><FileText size={14}/> Upload Files</button>
                              <div className="h-px bg-gray-100 my-1"></div>
                              <button onClick={() => handleAssetAction('folder')} className="w-full text-left px-4 py-2 hover:bg-gray-50 text-sm flex items-center gap-2"><Plus size={14}/> Create New Folder</button>
                          </div>
                      )}
                   </div>
                </div>
             </div>

             {/* Breadcrumbs */}
             {getBreadcrumbs().length > 1 && (
                 <div className="flex items-center gap-2 text-sm text-gray-500 mb-4 bg-gray-50 p-2 rounded-lg border border-gray-100 inline-flex">
                     {getBreadcrumbs().map((crumb, i) => (
                         <React.Fragment key={crumb.id || `crumb-${i}`}>
                             {i > 0 && <ChevronRight size={14} className="text-gray-400"/>}
                             <button 
                                 onClick={() => setCurrentFolderId(crumb.id)} 
                                 className={`hover:text-black ${i === getBreadcrumbs().length - 1 ? "font-bold text-gray-900" : "font-medium"}`}
                             >
                                 {crumb.name}
                             </button>
                         </React.Fragment>
                     ))}
                 </div>
             )}

             {currentViewAssets.length === 0 ? (
                <div className="bg-white border border-dashed border-gray-300 rounded-lg p-12 text-center text-gray-400">
                   <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-3">
                      <FolderOpen size={24} className="opacity-20"/>
                   </div>
                   <p>{currentFolderId ? "This folder is empty." : "No files associated with this campaign."}</p>
                   <button onClick={() => handleAssetAction('files')} className="mt-2 text-indigo-600 font-medium text-sm hover:underline">Upload items</button>
                </div>
             ) : (
                <>
                   {view === 'grid' ? (
                       <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                           {currentViewAssets.map(file => (
                               <div 
                                  key={file.id} 
                                  className={`group relative border rounded-lg overflow-hidden hover:shadow-md transition cursor-pointer ${
                                      selectedFiles.includes(file.id) ? 'border-indigo-500 ring-1 ring-indigo-500 bg-indigo-50' : 'border-gray-200 bg-white'
                                  }`}
                                  onClick={() => {
                                      if (file.type === 'folder') setCurrentFolderId(file.id);
                                  }}
                               >
                                  <div className="absolute top-2 left-2 z-10">
                                      <input 
                                        type="checkbox" 
                                        checked={selectedFiles.includes(file.id)}
                                        onChange={(e) => {e.stopPropagation(); toggleSelection(file.id)}}
                                        className={`w-4 h-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 ${selectedFiles.includes(file.id) ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'} transition`}
                                      />
                                  </div>
                                  <div className={`aspect-[4/3] flex items-center justify-center ${file.type === 'folder' ? 'bg-indigo-50 text-indigo-400' : 'bg-gray-100 text-gray-400'}`}>
                                      {file.type === 'folder' ? <FolderOpen size={40} className="fill-indigo-100"/> : file.type === 'image' ? <ImageIcon size={32}/> : file.type === 'video' ? <Video size={32}/> : <FileText size={32}/>}
                                  </div>
                                  <div className="p-3">
                                      <div className="font-medium text-sm text-gray-900 truncate" title={file.name}>{file.name}</div>
                                      <div className="text-xs text-gray-500 mt-1 flex justify-between">
                                          <span>{file.type === 'folder' ? 'Folder' : formatBytes(file.size)}</span>
                                          <span>{file.date}</span>
                                      </div>
                                  </div>
                               </div>
                           ))}
                       </div>
                   ) : (
                       <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                           <table className="w-full text-left text-sm">
                               <thead className="bg-gray-50 text-gray-500 font-medium border-b border-gray-200">
                                   <tr>
                                       <th className="p-3 w-8"><input type="checkbox" className="rounded border-gray-300"/></th>
                                       <th className="p-3">Name</th>
                                       <th className="p-3">Type</th>
                                       <th className="p-3">Size</th>
                                       <th className="p-3">Date</th>
                                       <th className="p-3 text-right">Actions</th>
                                   </tr>
                               </thead>
                               <tbody className="divide-y divide-gray-100">
                                   {currentViewAssets.map(file => (
                                       <tr 
                                          key={file.id} 
                                          className={`hover:bg-gray-50 group cursor-pointer ${selectedFiles.includes(file.id) ? 'bg-indigo-50' : ''}`}
                                          onClick={() => {
                                              if (file.type === 'folder') setCurrentFolderId(file.id);
                                          }}
                                       >
                                           <td className="p-3" onClick={e => e.stopPropagation()}>
                                               <input 
                                                 type="checkbox" 
                                                 checked={selectedFiles.includes(file.id)}
                                                 onChange={() => toggleSelection(file.id)}
                                                 className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                               />
                                           </td>
                                           <td className="p-3">
                                               <div className="flex items-center gap-3">
                                                   <div className={`w-8 h-8 rounded flex items-center justify-center ${file.type === 'folder' ? 'bg-indigo-100 text-indigo-600' : 'bg-gray-100 text-gray-500'}`}>
                                                      {file.type === 'folder' ? <FolderOpen size={16}/> : file.type === 'image' ? <ImageIcon size={16}/> : <FileText size={16}/>}
                                                   </div>
                                                   <span className="font-medium text-gray-900">{file.name}</span>
                                               </div>
                                           </td>
                                           <td className="p-3 uppercase text-xs text-gray-500">{file.type}</td>
                                           <td className="p-3 text-gray-500">{file.type === 'folder' ? '-' : formatBytes(file.size)}</td>
                                           <td className="p-3 text-gray-500">{file.date}</td>
                                           <td className="p-3 text-right" onClick={e => e.stopPropagation()}>
                                               <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition">
                                                   {file.type !== 'folder' && <button className="p-1.5 hover:bg-gray-200 rounded text-gray-600"><Download size={14}/></button>}
                                                   <button className="p-1.5 hover:bg-red-100 rounded text-red-600"><Trash2 size={14}/></button>
                                               </div>
                                           </td>
                                       </tr>
                                   ))}
                               </tbody>
                           </table>
                       </div>
                   )}
                </>
             )}
          </section>
      </div>
      {/* Sticky Publish Bar */}
      {campaign.status === 'Maintenance' && (
           <div className="sticky bottom-0 left-0 w-full bg-white border-t border-gray-200 p-4 shadow-lg flex justify-between items-center animate-in slide-in-from-bottom-4 z-30">
              <div className="text-sm text-gray-500">Retailers see "Editing in Progress" status.</div>
              <div className="flex gap-2">
                 <button onClick={() => onUpdateStatus('Shared')} className="px-4 py-2 bg-black text-white rounded font-medium hover:bg-gray-800 shadow-lg">Publish Changes</button>
              </div>
           </div>
       )}

       <UploadModal 
          isOpen={uploadModalOpen}
          onClose={() => setUploadModalOpen(false)}
          onUpload={handleUploadConfirm}
          folderName="Campaign Uploads"
       />
    </div>
  );
};

const CampaignModal = ({ isOpen, onClose, onSave, initialData }) => {
  const [formData, setFormData] = useState(initialData || {
    title: '',
    description: '',
    endDate: '',
    cover: 'bg-gray-100'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg overflow-hidden animate-in zoom-in-95 duration-200">
        <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
           <h3 className="font-medium">{initialData ? 'Edit Campaign' : 'Create New Campaign'}</h3>
           <button onClick={onClose}><X size={18} className="text-gray-400 hover:text-black"/></button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
           <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Campaign Title</label>
              <input 
                required
                value={formData.title}
                onChange={e => setFormData({...formData, title: e.target.value})}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black/5"
                placeholder="e.g. Summer Collection Launch"
              />
           </div>
           <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea 
                required
                value={formData.description}
                onChange={e => setFormData({...formData, description: e.target.value})}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black/5 h-24 resize-none"
                placeholder="Describe the campaign goal and contents..."
              />
           </div>
           <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Validity Period</label>
              <div className="flex gap-4 mb-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                      <input 
                        type="radio" 
                        name="validity" 
                        checked={formData.endDate === 'Permanent'} 
                        onChange={() => setFormData({...formData, endDate: 'Permanent'})}
                      />
                      <span className="text-sm">Permanent</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                      <input 
                        type="radio" 
                        name="validity" 
                        checked={formData.endDate !== 'Permanent'} 
                        onChange={() => setFormData({...formData, endDate: ''})}
                      />
                      <span className="text-sm">Custom Date</span>
                  </label>
              </div>
              {formData.endDate !== 'Permanent' && (
                  <input 
                    type="date"
                    required
                    value={formData.endDate}
                    onChange={e => setFormData({...formData, endDate: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black/5 animate-in fade-in slide-in-from-top-1"
                  />
              )}
           </div>
           <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Campaign Cover</label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:bg-gray-50 transition cursor-pointer group" onClick={() => setFormData({...formData, cover: 'bg-indigo-100'})}>
                 <div className={`w-full h-32 ${formData.cover} rounded mb-2 flex items-center justify-center`}>
                    {formData.cover.startsWith('bg-') ? <ImageIcon size={32} className="text-gray-400"/> : <img src={formData.cover} alt="Cover" className="w-full h-full object-cover rounded"/>}
                 </div>
                 <p className="text-sm font-medium text-indigo-600 group-hover:underline">Click to upload image</p>
                 <p className="text-xs text-gray-400 mt-1">Recommended: 1920x480px, &lt;1MB</p>
              </div>
           </div>
           <div className="pt-4 flex justify-end gap-2">
              <button type="button" onClick={onClose} className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-black">Cancel</button>
              <button type="submit" className="px-6 py-2 text-sm font-medium bg-black text-white rounded-lg hover:bg-gray-800">
                 {initialData ? 'Save Changes' : 'Create Campaign'}
              </button>
           </div>
        </form>
      </div>
    </div>
  );
};

const CampaignManager = ({ campaigns, setCampaigns, notify, allFiles, setFiles, allTemplates, retailers, isEmpty }) => {
  // Initialize with richer mock data if empty or basic
  React.useEffect(() => {
      if (campaigns.length > 0 && !campaigns[0].adoptionRate) {
          const statuses = ['Active', 'Active', 'Scheduled', 'Draft', 'Ended', 'Active', 'Scheduled', 'Draft', 'Ended', 'Active', 'Draft', 'Ended', 'Archived', 'Archived'];
          const enhancedCampaigns = statuses.map((status, i) => {
              const isDraftOrScheduled = status === 'Draft' || status === 'Scheduled';
              const isPermanent = i === 5; 
              
              // Use original assets/templates if available, otherwise empty
              const original = campaigns[i % campaigns.length];

              return {
                  ...original,
                  id: `camp-${i}`,
                  title: `Campaign ${i + 1}: ${['Summer Sale', 'Holiday Special', 'New Arrival', 'VIP Event', 'Clearance'][i % 5]}`,
                  status: status,
                  updatePending: i === 0, // Only first one is pending update
                  adoptionRate: isDraftOrScheduled ? null : Math.floor(Math.random() * 80) + 20,
                  usageCount: isDraftOrScheduled ? null : Math.floor(Math.random() * 500),
                  audience: status === 'Draft' && i % 2 === 0 ? 'Unspecified' : (i % 3 === 0 ? 'All Retailers' : i % 3 === 1 ? '3 Groups' : '25 Retailers'),
                  startDate: '2025-11-01',
                  endDate: isPermanent ? 'Permanent' : (status === 'Ended' ? '2025-10-15' : status === 'Scheduled' ? '2026-02-01' : '2025-12-31'),
                  // Preserve original assets and templates
                  assets: original.assets || [],
                  templates: original.templates || []
              };
          });
          setCampaigns(enhancedCampaigns);
      }
  }, []);

  const handleDuplicate = (campaign) => {
    const newCampaign = {
      ...campaign,
      id: Date.now(),
      title: `${campaign.title} (Copy)`,
      status: 'Draft',
      isPinned: false, // Don't copy pinned state
      adoptionRate: null, // Reset metrics
      usageCount: null
    };
    // Prepend to top, after pinned items if any (but logic in list handles sorting)
    setCampaigns([newCampaign, ...campaigns]);
  };
  const [selectedCampaign, setSelectedCampaign] = useState(null);
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [campaignToShare, setCampaignToShare] = useState(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [campaignToEdit, setCampaignToEdit] = useState(null);

  const handleShare = (campaign) => {
      setCampaignToShare(campaign);
      setShareModalOpen(true);
  };

  const saveShare = (sharedWith) => {
      const updated = campaigns.map(c => 
          c.id === campaignToShare.id ? { ...c, sharedWith, status: 'Shared' } : c
      );
      setCampaigns(updated);
      if (selectedCampaign && selectedCampaign.id === campaignToShare.id) {
          setSelectedCampaign({ ...selectedCampaign, sharedWith, status: 'Shared' });
      }
      notify('Campaign shared successfully', 'success');
      setCampaignToShare(null);
  };

  const handleSaveCampaign = (data) => {
      if (campaignToEdit) {
          // Edit existing
          const updated = campaigns.map(c => 
              c.id === campaignToEdit.id ? { ...c, ...data } : c
          );
          setCampaigns(updated);
          if (selectedCampaign && selectedCampaign.id === campaignToEdit.id) {
              setSelectedCampaign({ ...selectedCampaign, ...data });
          }
          notify('Campaign updated', 'success');
          if (campaignToEdit.status === 'Active') {
             notify('Changes are now live for Retailers', 'success');
          }
      } else {
          // Create new
          const newCamp = {
              id: `c${++uniqueIdCounter}`,
              status: 'Draft',
              isPinned: false,
              downloads: 0,
              views: 0,
              assets: [],
              templates: [],
              ...data
          };
          setCampaigns([newCamp, ...campaigns]);
          notify('New Draft Campaign Created', 'success');
          // Redirect to detail
          setSelectedCampaign(newCamp);
      }
      setEditModalOpen(false);
      setCampaignToEdit(null);
  };

  const openCreate = () => {
      setCampaignToEdit(null);
      setEditModalOpen(true);
  };

  const openEdit = (campaign) => {
      setCampaignToEdit(campaign);
      setEditModalOpen(true);
  };



  const handlePin = (id, e) => {
      if (e) e.stopPropagation();
      const updated = campaigns.map(c => c.id === id ? { ...c, isPinned: !c.isPinned } : c);
      setCampaigns(updated);
      if (selectedCampaign && selectedCampaign.id === id) {
          setSelectedCampaign({ ...selectedCampaign, isPinned: !selectedCampaign.isPinned });
      }
      notify(updated.find(c => c.id === id).isPinned ? 'Campaign Pinned' : 'Campaign Unpinned', 'success');
  };

  const handleAddAssetToCampaign = (campaignId, assetId) => {
      const updated = campaigns.map(c => 
          c.id === campaignId ? { ...c, assets: [assetId, ...c.assets] } : c
      );
      setCampaigns(updated);
      if (selectedCampaign && selectedCampaign.id === campaignId) {
          setSelectedCampaign({ ...selectedCampaign, assets: [assetId, ...selectedCampaign.assets] });
      }
  };

  const handleDelete = (id) => {
    if(confirm('Are you sure you want to delete this campaign? This cannot be undone.')) {
      setCampaigns(campaigns.filter(c => c.id !== id));
      notify('Campaign deleted', 'success');
    }
  };

  const handlePublish = (id) => {
      setCampaigns(campaigns.map(c => c.id === id ? { ...c, status: 'Active', updatePending: false } : c));
      notify('Campaign Published', 'success');
  };

  // --- Render Detail View ---
  

  if (selectedCampaign) {
    return (
      <>
        {editModalOpen && (
            <CampaignModal 
               key={campaignToEdit ? campaignToEdit.id : 'new'}
               isOpen={editModalOpen}
               onClose={() => setEditModalOpen(false)}
               onSave={handleSaveCampaign}
               initialData={campaignToEdit}
            />
        )}
        {shareModalOpen && campaignToShare && (
          <ShareModal 
              isOpen={shareModalOpen} 
              onClose={() => setShareModalOpen(false)} 
              onSave={saveShare}
              title={campaignToShare?.title}
              retailers={retailers}
              initialSharedWith={campaignToShare?.sharedWith}
          />
        )}
        <CampaignDetail 
          campaign={selectedCampaign} 
          onBack={() => setSelectedCampaign(null)}
          allFiles={allFiles}
          setFiles={setFiles}
          allTemplates={allTemplates}
          notify={notify}
          retailers={retailers}
          onShare={() => handleShare(selectedCampaign)}
          onEdit={() => openEdit(selectedCampaign)}
          onUpdateStatus={(status) => {
              const updated = campaigns.map(c => c.id === selectedCampaign.id ? { ...c, status } : c);
              setCampaigns(updated);
              setSelectedCampaign({ ...selectedCampaign, status });
              notify(status === 'Shared' ? 'Campaign Published' : 'Maintenance Mode Enabled', 'success');
          }}
          onAddAsset={handleAddAssetToCampaign}
          onPin={() => handlePin(selectedCampaign.id)}
        />
      </>
    );
  }

  if (isEmpty) return <EmptyState title="No Campaigns" description="Create your first campaign to start sharing assets with retailers." action="Create Campaign" onAction={openCreate} />;

  // Duplicate handler moved to bottom


  // --- Render List View ---
  return (
    <div className="h-full flex flex-col bg-gray-50 overflow-auto">
      {editModalOpen && (
          <CampaignModal 
             key={campaignToEdit ? campaignToEdit.id : 'new'}
             isOpen={editModalOpen}
             onClose={() => setEditModalOpen(false)}
             onSave={handleSaveCampaign}
             initialData={campaignToEdit}
          />
      )}
      {shareModalOpen && campaignToShare && (
        <ShareModal 
            isOpen={shareModalOpen} 
            onClose={() => setShareModalOpen(false)} 
            onSave={saveShare}
            title={campaignToShare.title}
            retailers={retailers}
            initialSharedWith={campaignToShare.sharedWith || []}
        />
      )}
      
      <BrandCampaignList 
         campaigns={campaigns}
         files={allFiles}
         templates={allTemplates}
         onCreate={openCreate}
         onSelect={setSelectedCampaign}
         onEdit={openEdit}
         onDelete={handleDelete}
         onDuplicate={handleDuplicate}
         onPin={(id) => handlePin(id)}
         onArchive={(id) => {
             const updated = campaigns.map(c => c.id === id ? { ...c, status: 'Archived' } : c);
             setCampaigns(updated);
             notify('Campaign Archived', 'success');
         }}
         onEnd={(id) => {
             const updated = campaigns.map(c => c.id === id ? { ...c, status: 'Ended', endDate: new Date().toISOString().split('T')[0] } : c);
             setCampaigns(updated);
             notify('Campaign Ended', 'success');
         }}
         onPublish={handlePublish}
      />
    </div>
  );
};

export default CampaignManager;
