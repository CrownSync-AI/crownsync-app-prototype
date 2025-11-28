import React, { useState } from 'react';
import { Plus, FolderOpen, Clock, Download, ChevronRight, FileText, X } from 'lucide-react';
import ActionMenu from '../../components/ActionMenu';
import EmptyState from '../../components/EmptyState';

const cn = (...classes) => classes.filter(Boolean).join(' ');

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

const ResourcesManager = ({ catalogs, setCatalogs, notify, isEmpty, files, setFiles }) => {
  const [selectedCatalog, setSelectedCatalog] = useState(null);
  const [uploadModalOpen, setUploadModalOpen] = useState(false);

  if (isEmpty) return <EmptyState title="No Resources" description="Organize your assets into shareable resources." action="Create Resource" onAction={() => notify('Create Resource Clicked', 'success')} />;

  const handleCreate = () => {
     const newCat = {
        id: `cat${Date.now()}`,
        name: 'New Collection Catalog',
        items: 0,
        cover: 'bg-indigo-100',
        updated: 'Just now',
        downloads: 0,
        status: 'Draft',
        structure: []
     };
     setCatalogs([newCat, ...catalogs]);
     notify('New Catalog Created', 'success');
  };

  const handleDelete = (id) => {
    if(confirm('Delete this catalog?')) {
       setCatalogs(catalogs.filter(c => c.id !== id));
       notify('Catalog deleted', 'success');
       if(selectedCatalog?.id === id) setSelectedCatalog(null);
    }
  };

  const handleUploadConfirm = () => {
      // Mock upload logic
      const newFile = {
          id: `f${Date.now()}`,
          name: 'Resource_Upload.pdf',
          type: 'pdf',
          size: 1500000,
          date: new Date().toISOString().split('T')[0],
          parentId: 'sys_resources' // System folder for resources
      };
      
      // Add to global files
      if (setFiles && files) {
          setFiles([newFile, ...files]);
      }

      // Add to catalog structure (mock)
      if (selectedCatalog) {
          const updatedStructure = [...selectedCatalog.structure, {
              id: newFile.id,
              name: newFile.name,
              type: 'file',
              size: '1.5 MB',
              count: 0
          }];
          const updatedCatalog = { ...selectedCatalog, structure: updatedStructure, items: selectedCatalog.items + 1 };
          
          setCatalogs(catalogs.map(c => c.id === selectedCatalog.id ? updatedCatalog : c));
          setSelectedCatalog(updatedCatalog);
      }

      setUploadModalOpen(false);
      notify('File uploaded successfully', 'success');
  };

  return (
    <div className="h-full flex flex-col p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-serif text-gray-900">Resources</h2>
          <p className="text-sm text-gray-500">Always-on resource folders for Retailers.</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded hover:bg-gray-800 transition" onClick={handleCreate}>
          <Plus size={16} /> Create Catalog
        </button>
      </div>

      <div className="flex gap-6 h-full overflow-hidden">
         {/* List of Catalogs */}
         <div className={cn("flex-1 overflow-auto transition-all duration-300", selectedCatalog ? "w-1/3 flex-none hidden md:block" : "w-full")}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
               {catalogs.map(cat => (
                 <div 
                   key={cat.id} 
                   onClick={() => setSelectedCatalog(cat)}
                   className={cn(
                     "border rounded-lg p-4 cursor-pointer transition relative group",
                     selectedCatalog?.id === cat.id ? "border-black bg-gray-50 ring-1 ring-black" : "border-gray-200 bg-white hover:border-gray-400"
                   )}
                 >
                    <div className="flex justify-between items-start mb-4">
                       <div className={`w-12 h-12 rounded ${cat.cover} flex items-center justify-center`}>
                          <FolderOpen size={20} className="text-gray-700"/>
                       </div>
                       <div onClick={(e) => e.stopPropagation()}>
                          <ActionMenu 
                             label="Catalog"
                             onEdit={() => notify('Edit Catalog Info', 'success')}
                             onDelete={() => handleDelete(cat.id)}
                          />
                       </div>
                    </div>
                    <h3 className="font-medium truncate">{cat.name}</h3>
                    <div className="flex items-center gap-2 mt-1 mb-3">
                       <span className={`text-[10px] px-1.5 py-0.5 rounded border ${cat.status === 'Published' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : 'bg-gray-100 text-gray-600 border-gray-200'}`}>
                          {cat.status}
                       </span>
                       <span className="text-xs text-gray-500">{cat.items} items</span>
                    </div>
                    <div className="flex items-center gap-4 text-xs text-gray-400 border-t border-gray-100 pt-3">
                       <span className="flex items-center gap-1"><Clock size={12}/> {cat.updated}</span>
                       <span className="flex items-center gap-1"><Download size={12}/> {cat.downloads}</span>
                    </div>
                 </div>
               ))}
            </div>
         </div>

         {/* Catalog Detail / Structure View */}
         {selectedCatalog && (
            <div className="flex-1 bg-white border border-gray-200 rounded-lg shadow-sm flex flex-col h-full animate-in slide-in-from-right-4 duration-300">
               <div className="p-4 border-b border-gray-200 flex justify-between items-center bg-gray-50 rounded-t-lg">
                  <div className="flex items-center gap-2">
                     <button onClick={() => setSelectedCatalog(null)} className="md:hidden mr-2"><ChevronRight className="rotate-180"/></button>
                     <FolderOpen className="text-gray-400"/>
                     <span className="font-medium">{selectedCatalog.name} / Root</span>
                  </div>
                  <button className="text-xs bg-white border border-gray-200 px-2 py-1 rounded hover:bg-gray-50" onClick={() => setUploadModalOpen(true)}>+ Add Content</button>
               </div>
               
               <div className="p-4 overflow-auto flex-1">
                  {selectedCatalog.structure.length === 0 ? (
                     <div className="h-full flex flex-col items-center justify-center text-gray-400">
                        <FolderOpen size={48} className="mb-4 opacity-20"/>
                        <p>This catalog is empty.</p>
                        <button className="mt-4 text-sm text-indigo-600 hover:underline" onClick={() => setUploadModalOpen(true)}>Add folders or files</button>
                     </div>
                  ) : (
                     <div className="space-y-2">
                        {selectedCatalog.structure.map(item => (
                           <div key={item.id} className="flex items-center justify-between p-3 border border-gray-100 rounded hover:bg-gray-50 group">
                              <div className="flex items-center gap-3">
                                 {item.type === 'folder' ? <FolderOpen size={18} className="text-yellow-500 fill-yellow-100"/> : <FileText size={18} className="text-gray-400"/>}
                                 <span className="text-sm font-medium">{item.name}</span>
                              </div>
                              <div className="flex items-center gap-4">
                                 <span className="text-xs text-gray-400">{item.type === 'folder' ? `${item.count} items` : item.size}</span>
                                 <button className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-500" onClick={() => notify('Item removed', 'success')}><X size={14}/></button>
                              </div>
                           </div>
                        ))}
                     </div>
                  )}
               </div>
            </div>
         )}
      </div>

      <UploadModal 
         isOpen={uploadModalOpen}
         onClose={() => setUploadModalOpen(false)}
         onUpload={handleUploadConfirm}
         folderName="Resource Uploads"
      />
    </div>
  );
};

export default ResourcesManager;
