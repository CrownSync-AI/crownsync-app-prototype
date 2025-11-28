import React from 'react';
import { Cloud, Megaphone, Download, Video, Share2, Plus, FolderOpen, Image as ImageIcon, FileText, ArrowUpRight } from 'lucide-react';
import EmptyState from '../../components/EmptyState';

const formatBytes = (bytes) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

const AssetsOverview = ({ files, campaigns, notify, isEmpty }) => {
  if (isEmpty) return <EmptyState title="No Assets Yet" description="Upload your first files or create a campaign to get started." action="Upload Assets" onAction={() => notify('Upload Clicked', 'success')} />;

  const totalSize = files.reduce((acc, f) => acc + f.size, 0);
  const activeCampaigns = campaigns.filter(c => c.status === 'Active').length;
  const totalDownloads = campaigns.reduce((acc, c) => acc + c.downloads, 0);

  return (
    <div className="p-6 h-full overflow-auto">
      <h2 className="text-2xl font-serif text-gray-900 mb-6">Overview</h2>
      
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm">
           <div className="flex items-center justify-between mb-4">
              <h3 className="text-gray-500 text-sm font-medium">Storage Used</h3>
              <Cloud className="text-indigo-600 p-1.5 bg-indigo-50 rounded-md" size={32} />
           </div>
           <div className="text-2xl font-bold mb-1">{formatBytes(totalSize)}</div>
           <div className="text-xs text-gray-400">of 500 MB quota</div>
           <div className="mt-3">
             <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-indigo-600" style={{ width: `${(totalSize / 500000000) * 100}%` }}></div>
             </div>
           </div>
        </div>

        <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm">
           <div className="flex items-center justify-between mb-4">
              <h3 className="text-gray-500 text-sm font-medium">Active Campaigns</h3>
              <Megaphone className="text-emerald-600 p-1.5 bg-emerald-50 rounded-md" size={32} />
           </div>
           <div className="text-2xl font-bold mb-1">{activeCampaigns}</div>
           <div className="text-xs text-emerald-600 flex items-center gap-1"><ArrowUpRight size={12}/> +2 this week</div>
        </div>

        <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm">
           <div className="flex items-center justify-between mb-4">
              <h3 className="text-gray-500 text-sm font-medium">Total Downloads</h3>
              <Download className="text-blue-600 p-1.5 bg-blue-50 rounded-md" size={32} />
           </div>
           <div className="text-2xl font-bold mb-1">{totalDownloads}</div>
           <div className="text-xs text-gray-400">Across all campaigns</div>
        </div>

        <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm">
           <div className="flex items-center justify-between mb-4">
              <h3 className="text-gray-500 text-sm font-medium">Top Asset Type</h3>
              <Video className="text-purple-600 p-1.5 bg-purple-50 rounded-md" size={32} />
           </div>
           <div className="text-2xl font-bold mb-1">Video</div>
           <div className="text-xs text-gray-400">45% of storage usage</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <div className="lg:col-span-2 bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
           <div className="flex items-center justify-between mb-6">
             <h3 className="font-medium text-lg">Recent Uploads</h3>
             <button className="text-sm text-indigo-600 hover:underline">View All</button>
           </div>
           <div className="space-y-4">
             {files.slice(0, 4).map(file => (
               <div key={file.id} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition group">
                  <div className="flex items-center gap-3">
                     <div className="w-10 h-10 bg-gray-100 rounded flex items-center justify-center">
                        {file.type === 'video' ? <Video size={18} className="text-gray-500"/> : 
                         file.type === 'image' ? <ImageIcon size={18} className="text-gray-500"/> : 
                         <FileText size={18} className="text-gray-500"/>}
                     </div>
                     <div>
                       <div className="font-medium text-sm text-gray-900">{file.name}</div>
                       <div className="text-xs text-gray-500">{formatBytes(file.size)} • {file.date}</div>
                     </div>
                  </div>
                  <button className="opacity-0 group-hover:opacity-100 p-2 hover:bg-white hover:shadow-sm rounded transition" onClick={() => notify('File download link copied', 'success')}>
                     <Share2 size={16} className="text-gray-500"/>
                  </button>
               </div>
             ))}
           </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
           <h3 className="font-medium text-lg mb-4">Quick Actions</h3>
           <div className="space-y-3">
             <button className="w-full flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:border-black hover:bg-gray-50 transition text-left group">
                <div className="bg-black text-white p-2 rounded group-hover:bg-gray-800"><Plus size={18}/></div>
                <div>
                  <div className="font-medium text-sm">Create Campaign</div>
                  <div className="text-xs text-gray-500">Launch a new event</div>
                </div>
             </button>
             <button className="w-full flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:border-black hover:bg-gray-50 transition text-left group">
                <div className="bg-indigo-600 text-white p-2 rounded group-hover:bg-indigo-700"><Cloud size={18}/></div>
                <div>
                  <div className="font-medium text-sm">Upload Assets</div>
                  <div className="text-xs text-gray-500">Add to Media Library</div>
                </div>
             </button>
             <button className="w-full flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:border-black hover:bg-gray-50 transition text-left group">
                <div className="bg-emerald-600 text-white p-2 rounded group-hover:bg-emerald-700"><FolderOpen size={18}/></div>
                <div>
                  <div className="font-medium text-sm">New E-Catalog</div>
                  <div className="text-xs text-gray-500">Share collection</div>
                </div>
             </button>
           </div>
        </div>
      </div>
    </div>
  );
};

export default AssetsOverview;
