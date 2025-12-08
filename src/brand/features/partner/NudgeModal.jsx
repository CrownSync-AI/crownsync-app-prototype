import React, { useState } from 'react';
import { X, Send, Bell } from 'lucide-react';

const NudgeModal = ({ isOpen, onClose, retailerName, onSend }) => {
    const [message, setMessage] = useState("We noticed you haven't checked out our latest campaign. Don't miss out!");

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose}></div>
            <div className="relative bg-white rounded-xl shadow-xl w-full max-w-md animate-in zoom-in-95 duration-200">
                <div className="p-5 border-b border-gray-100 flex justify-between items-center">
                    <div className="flex items-center gap-2">
                        <div className="bg-indigo-50 p-1.5 rounded-lg text-indigo-600">
                            <Bell size={18} />
                        </div>
                        <div>
                            <h3 className="font-bold text-gray-900">Send Nudge</h3>
                            <p className="text-xs text-gray-500">Remind {retailerName} to engage</p>
                        </div>
                    </div>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition">
                        <X size={20} />
                    </button>
                </div>
                
                <div className="p-5 space-y-4">
                    <div>
                        <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-2">Message</label>
                        <textarea 
                            className="w-full h-24 p-3 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-black/5 resize-none"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                        ></textarea>
                    </div>
                    
                    <div className="flex justify-end gap-3">
                        <button 
                            onClick={onClose}
                            className="px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 rounded-lg transition"
                        >
                            Cancel
                        </button>
                        <button 
                            onClick={() => { onSend(message); onClose(); }}
                            className="px-4 py-2 bg-black text-white text-sm font-bold rounded-lg hover:bg-gray-800 transition flex items-center gap-2 shadow-lg shadow-black/20"
                        >
                            <Send size={14} /> Send Reminder
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NudgeModal;
