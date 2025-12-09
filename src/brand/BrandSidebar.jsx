import { currentUser } from '../data/mockStore/userStore.js';
import React, { useState, useEffect, useRef } from 'react';
import { Home, LayoutDashboard, FolderOpen, Users, BarChart3, ChevronDown, MoreHorizontal, Settings, LogOut, Target, MessageSquare } from 'lucide-react';
import BrandLogo from '@/assets/crownsync_logo-with-text.svg';

// ... (existing imports and component definition)

const cn = (...classes) => classes.filter(Boolean).join(' ');

const BrandSidebar = ({ activePage, setActivePage }) => {
  const [openMenu, setOpenMenu] = useState('partner'); // Default open for Partner Hub
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

  // Main Navigation Items
  const MAIN_MENU = [
    { id: 'home', icon: Home, label: 'Home' },
    { type: 'separator' },
    { id: 'inbox', icon: MessageSquare, label: 'Unified Inbox' },
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
      id: 'analytics',
      icon: BarChart3,
      label: 'Analytics',
    },
    { type: 'separator' },
  ];

  // Footer Navigation Items
  const FOOTER_MENU = [
    { id: 'files', icon: FolderOpen, label: 'Files' },
    { id: 'settings', icon: Settings, label: 'Settings' }
  ];

  const toggleMenu = (menuId) => {
    setOpenMenu(openMenu === menuId ? null : menuId);
  };

  const NavItem = ({ item }) => {
     // Active state logic
     const isActive = activePage === item.id || (item.hasSubmenu && activePage.startsWith(item.id));
     const isSubActive = (subId) => activePage === subId;

     return (
        <div className="mb-2">
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
                
                {/* Right Side Active Indicator (Luxury Touch) */}
                {isActive && (
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[3px] h-6 bg-brand-gold rounded-l-full shadow-[0_0_10px_rgba(181,152,77,0.3)]"></div>
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
                                <div className="w-1.5 h-1.5 rounded-full bg-brand-gold shadow-sm"></div>
                            )}
                        </button>
                    ))}
                </div>
            )}
        </div>
     );
  }

  return (
    <aside className="w-20 md:w-56 bg-white border-r border-gray-200 flex flex-col flex-shrink-0 transition-all duration-300 z-20 h-screen font-sans">
      {/* 1. Brand Logo */}
      <div className="h-20 flex items-center justify-center md:justify-start md:px-8">
        <img src={BrandLogo} alt="CrownSync" className="h-10 max-w-[160px] hidden md:block" />
        <div className="md:hidden w-8 h-8 bg-black rounded-full flex items-center justify-center text-white font-bold text-xs ring-4 ring-gray-50">CS</div>
      </div>

      {/* 2. Scrollable Navigation Area */}
      <nav className="flex-1 py-4 overflow-y-auto space-y-1 custom-scrollbar px-4">
         {MAIN_MENU.map((item) => (
           item.type !== 'separator' && <NavItem key={item.id} item={item} />
         ))}
      </nav>

      {/* 3. Footer Section (Files, Settings, User) */}
      <div className="mt-auto border-t border-gray-100 bg-gray-50/30">
        {/* Footer Menu */}
        <div className="py-2 px-4">
            {FOOTER_MENU.map(item => (
                <NavItem key={item.id} item={item} isFooter={true} />
            ))}
        </div>

        {/* User Profile */}
        <div className="p-4 relative" ref={userMenuRef}>
            <div 
                className={`flex items-center gap-3 cursor-pointer p-2.5 rounded-xl transition border ${isUserMenuOpen ? 'bg-white border-gray-200 shadow-sm' : 'border-transparent hover:bg-white hover:border-gray-200 hover:shadow-sm'}`}
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
            >
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-gray-900 to-black flex items-center justify-center text-white font-bold shadow-sm ring-2 ring-white text-xs">
                    {currentUser.avatarType === 'image' ? (
                        <img src={currentUser.avatarUrl} alt={currentUser.name} className="w-full h-full object-cover rounded-full" />
                    ) : (
                        currentUser.avatarInitial
                    )}
                </div>
                <div className="hidden md:block flex-1 min-w-0">
                    <div className="text-sm font-bold text-gray-900 truncate tracking-tight">{currentUser.name}</div>
                    <div className="text-[10px] text-gray-500 font-medium uppercase tracking-wider">{currentUser.role}</div>
                </div>
                <MoreHorizontal size={16} className={`text-gray-400 hidden md:block transition-transform ${isUserMenuOpen ? 'rotate-90 text-gray-600' : ''}`}/>
            </div>
            
            {/* Logout Popover */}
            {isUserMenuOpen && (
                <div className="absolute left-4 bottom-20 w-max min-w-[240px] max-w-sm bg-white rounded-xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)] border border-gray-100 animate-in slide-in-from-bottom-2 fade-in duration-200 overflow-hidden z-50">
                    {/* Popover Header */}
                    <div className="p-3 border-b border-gray-50 bg-gray-50/50 flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full flex-shrink-0 bg-gray-200 overflow-hidden ring-1 ring-gray-100">
                             {currentUser.avatarType === 'image' ? (
                                <img src={currentUser.avatarUrl} alt={currentUser.name} className="w-full h-full object-cover" />
                             ) : (
                                <div className="w-full h-full flex items-center justify-center bg-brand-gold text-white font-bold text-xs">{currentUser.avatarInitial}</div>
                             )}
                        </div>
                        <div className="flex-1 min-w-0">
                            <div className="text-sm font-bold text-gray-900 truncate">{currentUser.name}</div>
                            <div className="text-xs text-gray-500 truncate font-medium">{currentUser.email}</div>
                        </div>
                    </div>
                    
                    <div className="p-1 space-y-0.5">
                        <button className="w-full text-left px-3 py-2.5 hover:bg-gray-50 rounded-lg text-sm text-gray-700 flex items-center gap-3 transition">
                            <Settings size={16} className="text-gray-400"/> Personal Settings
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

export default BrandSidebar;
