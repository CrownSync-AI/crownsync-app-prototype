import React, { useState } from 'react';
import { Mail, Send, Globe, AlertCircle } from 'lucide-react';

const InvitationsManager = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [country, setCountry] = useState('United States');
  const [zone, setZone] = useState('');
  const [emailQuota, setEmailQuota] = useState(10000);
  const [profileLimit, setProfileLimit] = useState(1);

  return (
    <div className="max-w-3xl mx-auto py-8">
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-100 bg-gray-50/50">
          <h2 className="text-lg font-bold text-gray-900">Invite New Retailer</h2>
          <p className="text-sm text-gray-500 mt-1">Send an invitation to a new retailer partner. They will receive an email to set up their account.</p>
        </div>
        
        <div className="p-8 space-y-8">
          {/* Basic Info */}
          <section className="space-y-4">
            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider">Retailer Information</h3>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Retailer Name</label>
                <input 
                  type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Nordstrom"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-black transition"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Admin Email</label>
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@retailer.com"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-black transition"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
                <select 
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-black transition bg-white"
                >
                  <option>United States</option>
                  <option>Canada</option>
                  <option>United Kingdom</option>
                  <option>France</option>
                  <option>China</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Sales Zone (Optional)</label>
                <select 
                  value={zone}
                  onChange={(e) => setZone(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-black transition bg-white"
                >
                  <option value="">Select Zone...</option>
                  <option>West</option>
                  <option>Midwest</option>
                  <option>South</option>
                  <option>Northeast</option>
                </select>
              </div>
            </div>
          </section>

          <div className="h-px bg-gray-100"></div>

          {/* Initial Allocation */}
          <section className="space-y-4">
            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider">Initial Allocation</h3>
            <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 flex gap-3 mb-4">
               <AlertCircle className="text-blue-600 flex-shrink-0 mt-0.5" size={18} />
               <div className="text-sm text-blue-800">
                 Allocated quotas will be deducted from your Brand Pool immediately upon invitation acceptance.
               </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
               <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email Quota</label>
                  <div className="relative">
                    <input 
                      type="number" 
                      value={emailQuota}
                      onChange={(e) => setEmailQuota(parseInt(e.target.value))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-black transition"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">emails</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Default: 10,000</p>
               </div>
               <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Social Profile Limit</label>
                  <div className="relative">
                    <input 
                      type="number" 
                      value={profileLimit}
                      onChange={(e) => setProfileLimit(parseInt(e.target.value))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-black transition"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">profiles</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Default: 1</p>
               </div>
            </div>
          </section>
        </div>

        <div className="p-6 border-t border-gray-100 bg-gray-50 flex justify-end gap-3">
           <button className="px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-100 transition">Cancel</button>
           <button className="px-6 py-2 bg-black text-white rounded-lg text-sm font-medium hover:bg-gray-800 transition flex items-center gap-2 shadow-sm">
              <Send size={16} /> Send Invitation
           </button>
        </div>
      </div>
    </div>
  );
};

export default InvitationsManager;
