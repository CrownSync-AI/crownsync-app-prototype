import React, { useState } from 'react';
import Drawer from '../../../components/Drawer';
import { AlertCircle, Users, ArrowRight, X, Copy, CheckCircle2 } from 'lucide-react';
import { homeData } from '../../../../data/mockStore/homeStore';
import { useToast } from '../../../context/ToastContext';
import NudgeModal, { RISKS } from '../../partner/NudgeModal';

const PartnerAttentionDrawer = ({ isOpen, onClose }) => {
   const { metrics } = homeData;
   const groups = metrics.partner.attentionGroups; 
   const { addToast } = useToast();
   const [resolvedIds, setResolvedIds] = useState([]);
   
   // Modal State
   const [nudgeModalState, setNudgeModalState] = useState({
       isOpen: false,
       retailers: [],
       riskType: RISKS.GENERIC,
       groupId: null
   });

   const getRiskForGroup = (reason) => {
       if (reason.includes("Inactive")) return RISKS.INACTIVE;
       if (reason.includes("Profile")) return RISKS.INCOMPLETE;
       if (reason.includes("Missed")) return RISKS.ZERO_ACTIONS;
       return RISKS.GENERIC;
   };

   const handleAction = (group) => {
      setNudgeModalState({
          isOpen: true,
          retailers: group.retailers.map((r, i) => ({ ...r, id: i })), // Mock ID if missing
          riskType: getRiskForGroup(group.reason),
          groupId: group.id
      });
   };

   const handleSendNudge = (data) => {
       addToast(`Bulk Action Sent: ${data.subject} to ${data.count} retailers.`, 'success');
       if (nudgeModalState.groupId) {
           setResolvedIds(prev => [...prev, nudgeModalState.groupId]);
       }
       setNudgeModalState(prev => ({ ...prev, isOpen: false }));
   };

   return (
      <Drawer
         isOpen={isOpen}
         onClose={onClose}
         title={
            <div className="flex items-center gap-2">
               <AlertCircle size={20} className="text-amber-500" />
               <span className="font-bold text-gray-900">Needs Attention</span>
               <span className="bg-amber-100 text-amber-700 text-xs font-bold px-2 py-0.5 rounded-full ml-2">
                  {metrics.partner.needsAttentionCount} Retailers
               </span>
            </div>
         }
      >
         <div className="px-6 py-6 space-y-6">
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 text-sm text-amber-800">
               These retailers are critical to your network health. We've grouped them by suggested action for efficiency.
            </div>

            <div className="space-y-4">
               {groups.map((group) => {
                  const isResolved = resolvedIds.includes(group.id);
                  return (
                     <div key={group.id} className={`border rounded-xl p-5 shadow-sm transition group ${
                        isResolved ? 'bg-gray-50 border-gray-200' : 'bg-white border-gray-200 hover:border-gray-300'
                     }`}>
                        {/* Header */}
                        <div className="flex justify-between items-start mb-4">
                           <div>
                              <div className="flex items-center gap-2 mb-1">
                                 <h4 className={`font-bold ${isResolved ? 'text-gray-500' : 'text-gray-900'}`}>{group.reason}</h4>
                              </div>
                              <div className="flex items-center gap-1.5 text-xs font-medium text-gray-500">
                                 <Users size={14} />
                                 {group.count} Retailers impacted
                              </div>
                           </div>
                           <div className={`h-8 w-8 rounded-full flex items-center justify-center transition ${
                              isResolved 
                                 ? 'bg-emerald-100 text-emerald-600' 
                                 : 'bg-gray-50 text-gray-400 group-hover:bg-indigo-50 group-hover:text-indigo-600'
                           }`}>
                               {isResolved ? <CheckCircle2 size={18} /> : <AlertCircle size={16} />}
                           </div>
                        </div>

                        {/* Impacted Retailers List */}
                        <div className={`mb-5 ${isResolved ? 'opacity-50' : ''}`}>
                           <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wide mb-2">Impacted Retailers</div>
                           <div className="grid grid-cols-2 gap-2">
                              {group.retailers.slice(0, 4).map((retailer, idx) => (
                                 <div key={idx} className="flex items-center gap-2 bg-gray-50 p-2 rounded-lg border border-gray-100">
                                    <div className="h-6 w-6 rounded-full bg-white border border-gray-200 flex items-center justify-center text-[10px] font-bold text-gray-700">
                                       {retailer.avatar}
                                    </div>
                                    <span className="text-xs font-medium text-gray-700 truncate">{retailer.name}</span>
                                 </div>
                              ))}
                              {group.retailers.length > 4 && (
                                 <div className="flex items-center justify-center gap-1 text-[10px] text-gray-500 font-medium bg-gray-50 p-2 rounded-lg border border-gray-100">
                                    +{group.retailers.length - 4} more
                                 </div>
                              )}
                           </div>
                        </div>

                        {/* CTA Button */}
                        <button 
                           disabled={isResolved}
                           onClick={() => handleAction(group)}
                           className={`w-full py-2.5 rounded-lg text-xs font-bold shadow-sm transition flex items-center justify-center gap-2 ${
                              isResolved 
                                 ? 'bg-gray-200 text-gray-500 cursor-not-allowed' 
                                 : 'bg-black text-white hover:bg-gray-800'
                           }`}
                        >
                           {isResolved ? (
                              <>Resolved <CheckCircle2 size={14} /></>
                           ) : (
                              <>{group.action} <ArrowRight size={14} /></>
                           )}
                        </button>
                     </div>
                  );
               })}
            </div>
         </div>

         <NudgeModal 
             isOpen={nudgeModalState.isOpen}
             onClose={() => setNudgeModalState(prev => ({ ...prev, isOpen: false }))}
             mode="bulk"
             retailers={nudgeModalState.retailers}
             riskType={nudgeModalState.riskType}
             onSend={handleSendNudge}
         />
      </Drawer>
   );
};

export default PartnerAttentionDrawer;
