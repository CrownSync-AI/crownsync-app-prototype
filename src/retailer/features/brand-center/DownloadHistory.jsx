import React, { useState } from 'react';
import { Download, FileText, Search, Filter, Calendar } from 'lucide-react';

const DownloadHistory = ({ files, brands }) => {
  const [searchTerm, setSearchTerm] = useState('');

  // Mock Download Data based on 'files'
  // In a real app this would come from a separate 'downloads' store
  const downloads = [
    { id: 'dl1', fileId: 'f1', date: '2025-11-26 10:30 AM', user: 'Sarah Jenkins' },
    { id: 'dl2', fileId: 'f2', date: '2025-11-25 04:15 PM', user: 'Sarah Jenkins' },
    { id: 'dl3', fileId: 'f5', date: '2025-11-24 09:20 AM', user: 'Team Member' },
    { id: 'dl4', fileId: 'f8', date: '2025-11-23 02:45 PM', user: 'Sarah Jenkins' },
    { id: 'dl5', fileId: 'f11', date: '2025-11-20 11:10 AM', user: 'Team Member' },
  ];

  const getFile = (id) => files.find(f => f.id === id) || { name: 'Unknown File', type: 'unknown', size: 0, extension: '???' };

  const filteredDownloads = downloads.filter(d => {
    const file = getFile(d.fileId);
    return file.name.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div className="px-8 pb-8 h-full flex flex-col">
      {/* Filters */}
      <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm mb-6 flex flex-wrap items-center justify-between gap-4">
        <div className="relative flex-1 min-w-[300px]">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search filenames..." 
            className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-black/5 focus:border-black transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-3">
             <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition">
                <Calendar size={16} /> Date Range
             </button>
             <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition">
                <Filter size={16} /> Filter
             </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden flex-1 flex flex-col">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">File Name</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Size</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Downloaded By</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-4 text-right text-xs font-bold text-gray-500 uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredDownloads.map(item => {
                const file = getFile(item.fileId);
                return (
                  <tr key={item.id} className="group hover:bg-gray-50 transition">
                    <td className="px-6 py-4">
                       <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded bg-gray-100 flex items-center justify-center text-gray-500">
                             <FileText size={16} />
                          </div>
                          <span className="font-medium text-gray-900 group-hover:text-black transition">{file.name}</span>
                       </div>
                    </td>
                    <td className="px-6 py-4">
                       <span className="text-xs font-bold bg-gray-100 text-gray-600 px-2 py-1 rounded uppercase">{file.extension}</span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                       {(file.size / 1000000).toFixed(1)} MB
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                       <div className="flex items-center gap-2">
                           <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-[10px] font-bold text-gray-600">
                              {item.user.split(' ').map(n=>n[0]).join('')}
                           </div>
                           {item.user}
                       </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                       {item.date}
                    </td>
                    <td className="px-6 py-4 text-right">
                       <button className="text-gray-400 hover:text-black p-2 rounded-full hover:bg-gray-100 transition">
                          <Download size={18} />
                       </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          
          {filteredDownloads.length === 0 && (
             <div className="p-12 text-center text-gray-400">
                No downloads found.
             </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DownloadHistory;
