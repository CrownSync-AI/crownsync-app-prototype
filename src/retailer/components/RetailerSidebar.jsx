import React from 'react';
import { LayoutDashboard, Layout, Users, Mail, FolderOpen, BarChart3, Settings, MoreHorizontal, LogOut } from 'lucide-react';

const RetailerSidebar = ({ activePage, setActivePage, user }) => {
  
  const MENU_ITEMS = [
    { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { id: 'brand-center', icon: Layout, label: 'Brand Center' },
    { id: 'crm', icon: Users, label: 'CRM' },
    { id: 'inbox', icon: Mail, label: 'Unify Inbox' },
    { id: 'resources', icon: FolderOpen, label: 'Resource Hub' },
    { id: 'analytics', icon: BarChart3, label: 'Analytics' },
    { id: 'settings', icon: Settings, label: 'Settings' },
  ];

  return (
    <aside className="w-20 md:w-64 bg-white border-r border-gray-200 flex flex-col flex-shrink-0 transition-all duration-300">
      <div className="h-16 flex items-center justify-center md:justify-start md:px-6 border-b border-gray-100">
        <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center text-white font-serif font-bold">R</div>
        <span className="hidden md:block ml-3 font-serif font-bold tracking-wide text-gray-900">Retailer Portal</span>
      </div>

      <nav className="flex-1 py-6 space-y-1 overflow-y-auto">
         {MENU_ITEMS.map(item => (
           <button 
             key={item.id}
             onClick={() => setActivePage(item.id)} 
             className={`w-full flex items-center px-3 md:px-6 py-3 text-sm font-medium transition ${
               activePage === item.id ? "text-indigo-600 bg-indigo-50 border-r-4 border-indigo-600" : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"
             }`}
           >
             <item.icon size={20} />
             <span className="hidden md:block ml-3">{item.label}</span>
           </button>
         ))}
      </nav>

      {/* User Info Section */}
      <div className="p-4 border-t border-gray-100 mt-auto relative group cursor-pointer">
         <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-bold">
               {user.initials}
            </div>
            <div className="hidden md:block flex-1 min-w-0">
               <div className="text-sm font-medium text-gray-900 truncate">{user.name}</div>
               <div className="text-xs text-gray-500 truncate">{user.email}</div>
            </div>
            <MoreHorizontal size={16} className="text-gray-400 hidden md:block"/>
         </div>
         
         {/* Logout Popover */}
         <div className="absolute bottom-full left-4 w-56 bg-white rounded-lg shadow-xl border border-gray-200 mb-2 hidden group-hover:block animate-in slide-in-from-bottom-2 fade-in duration-200 overflow-hidden z-50">
            <button className="w-full text-left px-4 py-3 hover:bg-gray-50 text-sm text-gray-600 hover:text-black flex items-center gap-2 transition">
               <Settings size={16}/> Account Settings
            </button>
            <div className="h-px bg-gray-100"></div>
            <button onClick={() => console.log('Logout')} className="w-full text-left px-4 py-3 hover:bg-red-50 text-sm text-red-600 flex items-center gap-2 transition">
               <LogOut size={16}/> Logout
            </button>
         </div>
      </div>
    </aside>
  );
};

export default RetailerSidebar;
