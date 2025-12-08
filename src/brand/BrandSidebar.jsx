import { currentUser } from '../data/mockStore/userStore.js';
import React, { useState, useEffect, useRef } from 'react';
import { Home, LayoutDashboard, FolderOpen, Users, BarChart3, ChevronDown, MoreHorizontal, Settings, LogOut, Target } from 'lucide-react';

// ... (existing imports and component definition)

const cn = (...classes) => classes.filter(Boolean).join(' ');

const BrandSidebar = ({ activePage, setActivePage }) => {
  const [openMenu, setOpenMenu] = useState(null); // 'partner', 'direct', 'assets', 'analytics'
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const userMenuRef = useRef(null);

  // Close user menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setIsUserMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Sidebar Menu Structure
  const MENU_ITEMS = [
    { id: 'home', icon: Home, label: 'Home' },
    { 
      id: 'partner', 
      icon: Users, 
      label: 'Partner Hub',
      hasSubmenu: true,
      subItems: [
        { id: 'partner-overview', label: 'Overview' },
        { id: 'partner-campaigns', label: 'Campaigns' },
        { id: 'partner-resources', label: 'Resources' },
        { id: 'partner-tasks', label: 'Tasks' },
        { id: 'partner-retailers', label: 'Retailers' },
      ]
    },
    {
      id: 'direct',
      icon: Target, 
      label: 'Direct Marketing',
      hasSubmenu: false
    },
    { 
      id: 'assets', 
      icon: FolderOpen, 
      label: 'Assets',
      hasSubmenu: true,
      subItems: [
        { id: 'assets-library', label: 'Library' },
        { id: 'assets-templates', label: 'Templates' },
      ]
    },
    { 
      id: 'analytics', 
      icon: BarChart3, 
      label: 'Analytics',
      hasSubmenu: true,
      subItems: [
        { id: 'analytics-partner', label: 'Partner Insights' },
        { id: 'analytics-direct', label: 'Direct Channel Stats' },
      ]
    },
    { id: 'settings', icon: Settings, label: 'Settings' }
  ];

  const toggleMenu = (menuId) => {
    setOpenMenu(openMenu === menuId ? null : menuId);
  };

  return (
    <aside className="w-20 md:w-64 bg-white border-r border-gray-200 flex flex-col flex-shrink-0 transition-all duration-300">
      <div className="h-16 flex items-center justify-center md:justify-start md:px-6 border-b border-gray-100">
        <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center text-white font-bold">C</div>
        <span className="hidden md:block ml-3 font-bold tracking-wide text-gray-900">Crownsync AI</span>
      </div>

      <nav className="flex-1 py-6 space-y-1 overflow-y-auto">
         {/* Navigation Items */}
         {MENU_ITEMS.map(item => (
           <div key={item.id}>
             <button 
               onClick={() => {
                 if (item.hasSubmenu) {
                   toggleMenu(item.id);
                 } else {
                   setActivePage(item.id);
                 }
               }} 
               className={cn(
                 "w-full flex items-center justify-between px-3 md:px-6 py-3 text-sm font-medium transition", 
                 activePage === item.id || (item.hasSubmenu && activePage.startsWith(item.id)) ? "text-gray-900 bg-gray-50 border-r-4 border-black" : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"
               )}
             >
               <div className="flex items-center">
                 <item.icon size={20} />
                 <span className="hidden md:block ml-3">{item.label}</span>
               </div>
               {item.hasSubmenu && (
                 <ChevronDown size={16} className={cn("hidden md:block transition-transform", openMenu === item.id ? "rotate-180" : "")} />
               )}
             </button>
             
             {/* Submenu Render */}
             {item.hasSubmenu && openMenu === item.id && (
               <div className="hidden md:block bg-white pb-2">
                 {item.subItems.map((sub, index) => (
                   sub.type === 'separator' ? (
                     <div key={`sep-${index}`} className="h-px bg-gray-100 my-2 mx-6"></div>
                   ) : (
                     <button
                       key={sub.id}
                       onClick={() => setActivePage(sub.id)}
                       className={cn(
                         "w-full flex items-center pl-14 pr-6 py-2 text-sm transition",
                         activePage === sub.id ? "text-black font-medium" : "text-gray-400 hover:text-gray-600"
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

      {/* User Info Section (Refactored) */}
      <div className="p-4 border-t border-gray-100 mt-auto relative" ref={userMenuRef}>
         <div 
            className={`flex items-center gap-3 cursor-pointer p-2 rounded-lg transition ${isUserMenuOpen ? 'bg-gray-100' : 'hover:bg-gray-50'}`}
            onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
         >
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold shadow-sm ring-2 ring-white">
               {currentUser.avatarType === 'image' ? (
                  <img src={currentUser.avatarUrl} alt={currentUser.name} className="w-full h-full object-cover rounded-full" />
               ) : (
                  currentUser.avatarInitial
               )}
            </div>
            <div className="hidden md:block flex-1 min-w-0">
               <div className="text-sm font-bold text-gray-900 truncate">{currentUser.name}</div>
               <div className="flex items-center mt-0.5">
                  <span className="text-[10px] uppercase font-bold text-indigo-600 bg-indigo-50 px-1.5 py-0.5 rounded border border-indigo-100 tracking-wide">
                     {currentUser.role}
                  </span>
               </div>
            </div>
            <MoreHorizontal size={16} className={`text-gray-400 hidden md:block transition-transform ${isUserMenuOpen ? 'rotate-90 text-gray-600' : ''}`}/>
         </div>
         
         {/* Logout Popover */}
         {isUserMenuOpen && (
            <div className="absolute left-full bottom-0 ml-1 min-w-[220px] w-max bg-white rounded-2xl shadow-2xl border border-gray-100 animate-in slide-in-from-left-2 fade-in duration-200 overflow-hidden z-50">
               {/* Header */}
               <div className="p-4 border-b border-gray-100 bg-gray-50/50 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden flex-shrink-0">
                     {currentUser.avatarType === 'image' ? (
                        <img src={currentUser.avatarUrl} alt={currentUser.name} className="w-full h-full object-cover" />
                     ) : (
                        <div className="w-full h-full flex items-center justify-center bg-indigo-500 text-white font-bold">{currentUser.avatarInitial}</div>
                     )}
                  </div>
                  <div className="flex-1 min-w-0">
                     <div className="text-sm font-bold text-gray-900 truncate">{currentUser.name}</div>
                     <div className="text-xs text-gray-500 truncate font-mono">{currentUser.email}</div>
                  </div>
               </div>
               
               {/* Menu Items */}
               <div className="p-2 space-y-0.5">
                  <button className="w-full text-left px-3 py-2.5 hover:bg-gray-50 rounded-lg text-sm text-gray-700 flex items-center gap-3 transition">
                     <Settings size={18} className="text-gray-400"/> Personal Settings
                  </button>
               </div>

               {/* Footer */}
               <div className="p-2 border-t border-gray-100 mt-1">
                  <button onClick={() => console.log('Logout')} className="w-full text-left px-3 py-2.5 hover:bg-red-50 rounded-lg text-sm text-red-600 flex items-center gap-3 transition font-medium">
                     <LogOut size={18}/> Log out
                  </button>
               </div>
            </div>
         )}
      </div>
    </aside>
  );
};

export default BrandSidebar;
