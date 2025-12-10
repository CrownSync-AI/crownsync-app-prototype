import React, { useState, useEffect, useRef } from 'react';
import { LayoutDashboard, Layout, Users, Mail, FolderOpen, BarChart3, Settings, MoreHorizontal, LogOut, ChevronDown, Download, Grid, Megaphone, FileBox } from 'lucide-react';
import BrandLogo from '@/assets/crownsync_logo-with-text.svg';

const cn = (...classes) => classes.filter(Boolean).join(' ');

const RetailerSidebar = ({ activePage, setActivePage, user }) => {
  const [openMenu, setOpenMenu] = useState('brand-center'); // Default open for Brand Center
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
  
  const MENU_ITEMS = [
    { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { 
      id: 'brand-center', 
      icon: Layout, 
      label: 'Brand Center',
      hasSubmenu: true,
      subItems: [
        { id: 'brand-center-overview', label: 'Overview', icon: Grid },
        { id: 'brand-center-brands', label: 'Brands', icon: Users },
        { id: 'brand-center-campaigns', label: 'Campaigns', icon: Megaphone },
        { id: 'brand-center-resources', label: 'Resources', icon: FileBox },
        { id: 'brand-center-downloads', label: 'Download History', icon: Download },
      ]
    },
    { id: 'crm', icon: Users, label: 'CRM' },
    { id: 'inbox', icon: Mail, label: 'Unify Inbox' },
    { id: 'analytics', icon: BarChart3, label: 'Analytics' },
  ];

  const FOOTER_MENU = [
    { id: 'settings', icon: Settings, label: 'Settings' },
  ];

  const toggleMenu = (menuId) => {
    setOpenMenu(openMenu === menuId ? null : menuId);
  };

  const NavItem = ({ item, isFooter = false }) => {
    // Active state logic
    const isActive = activePage === item.id || (item.hasSubmenu && activePage.startsWith(item.id));
    const isSubActive = (subId) => activePage === subId;

    return (
       <div className={cn("mb-2", isFooter && "mb-0")}>
           <button 
               onClick={() => {
                   if (item.hasSubmenu) {
                       toggleMenu(item.id);
                   } else {
                       setActivePage(item.id);
                   }
               }} 
               className={cn(
                   "w-full flex items-center justify-between px-3 py-3 text-sm transition-all duration-300 group relative rounded-xl overflow-hidden", 
                   isActive 
                       ? "text-gray-900 font-semibold bg-gray-50" 
                       : "text-gray-500 hover:text-gray-900 hover:bg-white hover:shadow-sm"
               )}
           >
               <div className="flex items-center gap-3.5 relation z-10">
                   <item.icon size={18} className={cn("transition-colors duration-300", isActive ? "text-gray-900 stroke-[2px]" : "text-gray-400 group-hover:text-gray-600")} />
                   <span className={cn("tracking-wide", isActive ? "text-gray-900" : "font-medium")}>{item.label}</span>
               </div>
               
               {/* Right Side Active Indicator (Luxury Touch) for Top Level if Active and NOT Submenu (unless collapsed?) */}
               {isActive && !item.hasSubmenu && (
                   <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[3px] h-6 bg-[#C5A065] rounded-l-full shadow-[0_0_10px_rgba(197,160,101,0.3)]"></div>
               )}

               {item.hasSubmenu && (
                    <ChevronDown size={14} className={cn("transition-transform duration-300 text-gray-300 group-hover:text-gray-500", openMenu === item.id ? "rotate-180" : "")} />
               )}
           </button>

            {/* Submenu Render */}
            {item.hasSubmenu && openMenu === item.id && (
                <div className="mt-2 ml-4 pl-4 border-l border-gray-100/80 space-y-1 animate-in slide-in-from-left-1 duration-300 ease-out">
                    {item.subItems.map((sub) => (
                        <button
                            key={sub.id}
                            onClick={() => setActivePage(sub.id)}
                            className={cn(
                                "w-full flex items-center justify-between px-3 py-2 text-sm transition-all relative rounded-lg group/sub",
                                isSubActive(sub.id) 
                                    ? "text-gray-900 font-medium" 
                                    : "text-gray-500 hover:text-gray-700 hover:bg-gray-50/50"
                            )}
                        >
                            <span className={cn("tracking-normal", isSubActive(sub.id) ? "" : "")}>{sub.label}</span>
                            
                            {/* Submenu Right Indicator */}
                            {isSubActive(sub.id) && (
                                <div className="w-1.5 h-1.5 rounded-full bg-[#C5A065] shadow-sm"></div>
                            )}
                        </button>
                    ))}
                </div>
            )}
       </div>
    );
  };

  return (
    <aside className="w-20 md:w-56 bg-white border-r border-gray-200 flex flex-col flex-shrink-0 transition-all duration-300 z-20 h-screen font-sans">
      {/* 1. Logo */}
      <div className="h-20 flex items-center justify-center md:justify-start md:px-8">
        <img src={BrandLogo} alt="CrownSync" className="h-10 max-w-[160px] hidden md:block" />
        <div className="md:hidden w-8 h-8 bg-black rounded-full flex items-center justify-center text-white font-bold text-xs ring-4 ring-gray-50">CS</div>
      </div>

      {/* 2. Scrollable Navigation Area */}
      <nav className="flex-1 py-4 overflow-y-auto space-y-1 custom-scrollbar px-4">
         {MENU_ITEMS.map((item) => (
           <NavItem key={item.id} item={item} />
         ))}
      </nav>

      {/* 3. Footer Section (Settings, User) */}
      <div className="mt-auto border-t border-gray-100 bg-gray-50/30">
        <div className="py-2 px-4">
            {FOOTER_MENU.map(item => (
                <NavItem key={item.id} item={item} isFooter={true} />
            ))}
        </div>

        {/* User Info Section */}
        <div className="p-4 relative" ref={userMenuRef}>
             <div 
                className={`flex items-center gap-3 cursor-pointer p-2.5 rounded-xl transition border ${isUserMenuOpen ? 'bg-white border-gray-200 shadow-sm' : 'border-transparent hover:bg-white hover:border-gray-200 hover:shadow-sm'}`}
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
             >
                <div className="w-9 h-9 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-bold shadow-sm ring-2 ring-white text-xs">
                   {user.initials}
                </div>
                <div className="hidden md:block flex-1 min-w-0">
                   <div className="text-sm font-bold text-gray-900 truncate tracking-tight">{user.name}</div>
                   <div className="text-[10px] text-gray-500 font-medium uppercase tracking-wider">Admin</div>
                </div>
                <MoreHorizontal size={16} className={`text-gray-400 hidden md:block transition-transform ${isUserMenuOpen ? 'rotate-90 text-gray-600' : ''}`}/>
             </div>
             
             {/* Logout Popover */}
             {isUserMenuOpen && (
                <div className="absolute left-4 bottom-20 w-max min-w-[240px] max-w-sm bg-white rounded-xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)] border border-gray-100 animate-in slide-in-from-bottom-2 fade-in duration-200 overflow-hidden z-50">
                    <div className="p-3 border-b border-gray-50 bg-gray-50/50 flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full flex-shrink-0 bg-gray-200 overflow-hidden ring-1 ring-gray-100 flex items-center justify-center font-bold text-gray-600 text-xs">
                             {user.initials}
                        </div>
                        <div className="flex-1 min-w-0">
                            <div className="text-sm font-bold text-gray-900 truncate">{user.name}</div>
                            <div className="text-xs text-gray-500 truncate font-medium">{user.email}</div>
                        </div>
                    </div>
                    
                    <div className="p-1 space-y-0.5">
                        <button className="w-full text-left px-3 py-2.5 hover:bg-gray-50 rounded-lg text-sm text-gray-700 flex items-center gap-3 transition">
                            <Settings size={16} className="text-gray-400"/> Account Settings
                        </button>
                    </div>
                    <div className="p-1 border-t border-gray-50">
                        <button onClick={() => console.log('Logout')} className="w-full text-left px-3 py-2.5 hover:bg-red-50 rounded-lg text-sm text-red-600 flex items-center gap-3 transition font-medium">
                            <LogOut size={16}/> Log out
                        </button>
                    </div>
                </div>
             )}
        </div>
      </div>
    </aside>
  );
};

export default RetailerSidebar;
