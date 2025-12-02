import React, { useState } from 'react';
import RetailerList from './RetailerList';
import RetailerDetail from './RetailerDetail';
import InvitationsManager from './InvitationsManager';

const RetailersManager = () => {
  const [activeTab, setActiveTab] = useState('all-retailers'); // all-retailers, groups, invitations, settings
  const [selectedRetailer, setSelectedRetailer] = useState(null);
  
  // Mock Data
  const [retailers] = useState([
    { 
        id: 'r1', 
        name: 'The Luxury Boutique', 
        contact: { name: 'Sarah Smith', email: 'sarah@luxuryboutique.com' },
        location: { country: 'United States', zone: 'West' },
        groups: ['VIP', 'Boutique'],
        stores: 3,
        adoptionRate: 85,
        lastActive: '2025-11-20',
        status: 'Active',
        logo: 'bg-purple-500',
        hasPendingAction: true,
        quota: {
            email: { used: 45000, limit: 50000 },
            social: { connected: 1, limit: 1, platforms: { facebook: true, instagram: true, x: false, gbp: false } }
        }
    },
    { 
        id: 'r2', 
        name: 'Global Retail Inc', 
        contact: { name: 'John Doe', email: 'john@globalretail.com' },
        location: { country: 'United States', zone: 'East' },
        groups: ['Department Store', 'International'],
        stores: 12,
        adoptionRate: 45,
        lastActive: '2025-11-18',
        status: 'Active',
        logo: 'bg-blue-500',
        hasPendingAction: false,
        quota: {
            email: { used: 12000, limit: 20000 },
            social: { connected: 1, limit: 1, platforms: { facebook: true, instagram: true, x: true, gbp: true } }
        }
    },
    { 
        id: 'r3', 
        name: 'Parisian Chic', 
        contact: { name: 'Marie Laurent', email: 'marie@parisian.fr' },
        location: { country: 'Canada', zone: 'None' },
        groups: ['Luxury', 'International'],
        stores: 5,
        adoptionRate: 92,
        lastActive: '2025-11-21',
        status: 'Active',
        logo: 'bg-pink-500',
        hasPendingAction: false,
        quota: {
            email: { used: 8500, limit: 15000 },
            social: { connected: 0, limit: 1, platforms: { facebook: false, instagram: false, x: false, gbp: false } }
        }
    },
    { 
        id: 'r4', 
        name: 'Nordic Style', 
        contact: { name: 'Lars Jensen', email: 'lars@nordic.dk' },
        location: { country: 'United States', zone: 'Midwest' },
        groups: ['Boutique'],
        stores: 2,
        adoptionRate: 60,
        lastActive: '2025-10-15',
        status: 'Inactive',
        logo: 'bg-teal-500',
        hasPendingAction: true,
        quota: {
            email: { used: 2000, limit: 10000 },
            social: { connected: 1, limit: 1, platforms: { facebook: true, instagram: true, x: false, gbp: false } }
        }
    },
    { 
        id: 'r5', 
        name: 'Dubai Luxury', 
        contact: { name: 'Ahmed Al-Sayed', email: 'ahmed@dubai.ae' },
        location: { country: 'United States', zone: 'South' },
        groups: ['VIP', 'International'],
        stores: 8,
        adoptionRate: 78,
        lastActive: '2025-11-19',
        status: 'Active',
        logo: 'bg-amber-500',
        hasPendingAction: false,
        quota: {
            email: { used: 9500, limit: 10000 },
            social: { connected: 1, limit: 1, platforms: { facebook: true, instagram: false, x: false, gbp: false } }
        }
    },
    { 
        id: 'r6', 
        name: 'Tokyo Trends', 
        contact: { name: 'Kenji Tanaka', email: 'kenji@tokyo.jp' },
        location: { country: 'Canada', zone: 'None' },
        groups: ['New Openings'],
        stores: 4,
        adoptionRate: 20,
        lastActive: '2025-08-10',
        status: 'Suspended',
        logo: 'bg-red-500',
        hasPendingAction: false,
        quota: {
            email: { used: 15000, limit: 30000 },
            social: { connected: 1, limit: 1, platforms: { facebook: true, instagram: true, x: true, gbp: true } }
        }
    },
    { 
        id: 'r7', 
        name: 'London Fashion', 
        contact: { name: 'Emma Wilson', email: 'emma@london.uk' },
        location: { country: 'United States', zone: 'Northeast' },
        groups: ['Iconic'],
        stores: 6,
        adoptionRate: 88,
        lastActive: '2025-11-22',
        status: 'Active',
        logo: 'bg-indigo-500',
        hasPendingAction: false,
        quota: {
            email: { used: 18000, limit: 25000 },
            social: { connected: 1, limit: 1, platforms: { facebook: true, instagram: true, x: false, gbp: false } }
        }
    },
    { 
        id: 'r8', 
        name: 'Milan Moda', 
        contact: { name: 'Giulia Rossi', email: 'giulia@milan.it' },
        location: { country: 'United States', zone: 'West' },
        groups: ['Luxury'],
        stores: 3,
        adoptionRate: 70,
        lastActive: '2025-11-15',
        status: 'Active',
        logo: 'bg-green-500',
        hasPendingAction: true,
        quota: {
            email: { used: 28000, limit: 50000 },
            social: { connected: 1, limit: 1, platforms: { facebook: true, instagram: true, x: true, gbp: true } }
        }
    },
    { 
        id: 'r9', 
        name: 'Sydney Surf', 
        contact: { name: 'Oliver Brown', email: 'oliver@sydney.au' },
        location: { country: 'Canada', zone: 'None' },
        groups: ['Boutique'],
        stores: 2,
        adoptionRate: 55,
        lastActive: '2025-11-10',
        status: 'Active',
        logo: 'bg-cyan-500',
        hasPendingAction: false,
        quota: {
            email: { used: 0, limit: 0 },
            social: { connected: 0, limit: 1, platforms: { facebook: false, instagram: false, x: false, gbp: false } }
        }
    },
    { 
        id: 'r10', 
        name: 'Berlin Basics', 
        contact: { name: 'Hans Mueller', email: 'hans@berlin.de' },
        location: { country: 'United States', zone: 'Midwest' },
        groups: ['New Openings'],
        stores: 1,
        adoptionRate: 10,
        lastActive: '2025-09-01',
        status: 'Inactive',
        logo: 'bg-slate-500',
        hasPendingAction: false,
        quota: {
            email: { used: 0, limit: 10000 },
            social: { connected: 0, limit: 1, platforms: { facebook: false, instagram: false, x: false, gbp: false } }
        }
    }
  ]);

  if (selectedRetailer) {
    return <RetailerDetail retailer={selectedRetailer} onBack={() => setSelectedRetailer(null)} />;
  }

  return (
    <div className="flex flex-col h-full bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-8 py-5 flex items-center justify-between sticky top-0 z-10">
        <div>
          <h1 className="text-2xl font-serif font-bold text-gray-900">Retailers</h1>
          <p className="text-sm text-gray-500 mt-1">Manage your retailer network, quotas, and performance.</p>
        </div>
        <div className="flex items-center gap-4">
            {/* Unified Quota Display */}
            <div className="hidden md:flex items-center bg-white rounded-xl border border-gray-200 shadow-sm py-2 px-5 gap-6">
                {/* Email Pool */}
                <div className="flex flex-col gap-1.5 min-w-[140px]">
                    <div className="flex items-center justify-between">
                        <span className="text-gray-500 font-bold uppercase tracking-wider text-[10px]">Email</span>
                        <span className="text-gray-900 font-medium text-xs tabular-nums">125k / 500k</span>
                    </div>
                    <div className="w-full h-1 bg-gray-100 rounded-full overflow-hidden">
                       <div className="h-full rounded-full bg-[#B8A77E]" style={{ width: '25%' }}></div>
                    </div>
                </div>

                <div className="w-px h-8 bg-gray-100"></div>

                {/* Seats */}
                <div className="flex flex-col gap-1.5 min-w-[120px]">
                    <div className="flex items-center justify-between">
                        <span className="text-gray-500 font-bold uppercase tracking-wider text-[10px]">Seats</span>
                        <span className="text-gray-900 font-medium text-xs tabular-nums">10 / 50</span>
                    </div>
                    <div className="w-full h-1 bg-gray-100 rounded-full overflow-hidden">
                       <div className="h-full rounded-full bg-[#B8A77E]" style={{ width: '20%' }}></div>
                    </div>
                </div>

                <div className="w-px h-8 bg-gray-100"></div>

                <button className="text-indigo-600 hover:text-indigo-700 text-xs font-bold uppercase tracking-wider hover:underline transition px-1">
                    Upgrade
                </button>
            </div>
        </div>
      </header>

      {/* Tabs */}
      <div className="px-8 pt-6 pb-0">
        <div className="flex items-center gap-8 border-b border-gray-200">
          {['All Retailers', 'Groups', 'Invitations', 'Settings'].map((tab) => {
            const id = tab.toLowerCase().replace(' ', '-');
            return (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={`pb-4 text-sm font-medium transition relative ${
                  activeTab === id ? 'text-black' : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab}
                {activeTab === id && (
                  <div className="absolute bottom-0 left-0 w-full h-0.5 bg-black rounded-t-full"></div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-8">
        {activeTab === 'all-retailers' && (
          <RetailerList retailers={retailers} onSelectRetailer={setSelectedRetailer} />
        )}
        {activeTab === 'groups' && (
            <div className="text-center py-20 text-gray-400">Groups Management Coming Soon</div>
        )}
        {activeTab === 'invitations' && (
            <InvitationsManager />
        )}
        {activeTab === 'settings' && (
            <div className="text-center py-20 text-gray-400">Settings Coming Soon</div>
        )}
      </div>
    </div>
  );
};

export default RetailersManager;
