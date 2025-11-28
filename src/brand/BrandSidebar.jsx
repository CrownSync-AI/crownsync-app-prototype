import React, { useState } from 'react';
import { LayoutDashboard, FolderOpen, Users, BarChart3, ChevronDown, MoreHorizontal, Settings, LogOut } from 'lucide-react';

const cn = (...classes) => classes.filter(Boolean).join(' ');

const BrandSidebar = ({ activePage, setActivePage }) => {
  const [assetsMenuOpen, setAssetsMenuOpen] = useState(true);

  // Sidebar Menu Structure
  const MENU_ITEMS = [
    { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { 
      id: 'assets', 
      icon: FolderOpen, 
      label: 'Brand Assets',
      hasSubmenu: true,
      isOpen: assetsMenuOpen,
      toggle: () => setAssetsMenuOpen(!assetsMenuOpen),
      subItems: [
        { id: 'assets-overview', label: 'Overview' },
        { id: 'assets-campaigns', label: 'Campaigns' },
        { id: 'assets-resources', label: 'Resources' },
        { type: 'separator' },
        { id: 'assets-library', label: 'Asset Library' },
        { id: 'assets-templates', label: 'Templates' },
      ]
    },
    { id: 'retailers', icon: Users, label: 'Retailers' },
    { id: 'analytics', icon: BarChart3, label: 'Analytics' }
  ];

  return (
    <aside className="w-20 md:w-64 bg-black text-white flex flex-col flex-shrink-0 transition-all duration-300">
      <div className="h-16 flex items-center justify-center md:justify-start md:px-6 border-b border-gray-800">
        <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-black font-serif font-bold">C</div>
        <span className="hidden md:block ml-3 font-serif font-bold tracking-wide">Crownsync AI</span>
      </div>

      <nav className="flex-1 py-6 space-y-1 overflow-y-auto">
         {/* Navigation Items */}
         {MENU_ITEMS.map(item => (
           <div key={item.id}>
             <button 
               onClick={() => {
                 if (item.hasSubmenu) {
                   item.toggle();
                   if(!activePage.startsWith(item.id)) setActivePage(item.subItems[0].id);
                 } else {
                   setActivePage(item.id);
                 }
               }} 
               className={cn(
                 "w-full flex items-center justify-between px-3 md:px-6 py-3 text-sm font-medium transition", 
                 activePage === item.id || (item.hasSubmenu && activePage.startsWith(item.id)) ? "text-white bg-gray-900 border-r-4 border-white" : "text-gray-400 hover:text-white hover:bg-gray-900"
               )}
             >
               <div className="flex items-center">
                 <item.icon size={20} />
                 <span className="hidden md:block ml-3">{item.label}</span>
               </div>
               {item.hasSubmenu && (
                 <ChevronDown size={16} className={cn("hidden md:block transition-transform", item.isOpen ? "rotate-180" : "")} />
               )}
             </button>
             
             {/* Submenu Render */}
             {item.hasSubmenu && item.isOpen && (
               <div className="hidden md:block bg-gray-900/50 pb-2">
                 {item.subItems.map((sub, index) => (
                   sub.type === 'separator' ? (
                     <div key={`sep-${index}`} className="h-px bg-gray-800 my-2 mx-6"></div>
                   ) : (
                     <button
                       key={sub.id}
                       onClick={() => setActivePage(sub.id)}
                       className={cn(
                         "w-full flex items-center pl-14 pr-6 py-2 text-sm transition",
                         activePage === sub.id ? "text-white font-medium" : "text-gray-500 hover:text-gray-300"
                       )}
                     >
                       {sub.label}
                     </button>
                   )
                 ))}
               </div>
             )}
           </div>
         ))}
      </nav>

      {/* User Info Section */}
      <div className="p-4 border-t border-gray-800 mt-auto relative group cursor-pointer">
         <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold shadow-lg">
               LB
            </div>
            <div className="hidden md:block flex-1 min-w-0">
               <div className="text-sm font-medium text-white truncate">Luxury Boutique</div>
               <div className="text-xs text-gray-400 truncate">Brand Admin</div>
            </div>
            <MoreHorizontal size={16} className="text-gray-500 hidden md:block"/>
         </div>
         
         {/* Logout Popover */}
         <div className="absolute bottom-full left-4 w-56 bg-white rounded-lg shadow-xl border border-gray-200 mb-2 hidden group-hover:block animate-in slide-in-from-bottom-2 fade-in duration-200 overflow-hidden z-50">
            <div className="p-3 border-b border-gray-100">
               <div className="text-sm font-bold text-gray-900">Luxury Boutique</div>
               <div className="text-xs text-gray-500">admin@luxuryboutique.com</div>
            </div>
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

export default BrandSidebar;
