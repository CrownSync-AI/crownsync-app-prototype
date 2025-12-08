import React from 'react';
import { MessageSquare, Search } from 'lucide-react';
import EmptyState from '../../components/EmptyState';

const UnifiedInbox = () => {
    return (
        <div className="flex h-full bg-white">
            {/* Sidebar List */}
            <div className="w-80 border-r border-gray-200 flex flex-col">
                <div className="p-4 border-b border-gray-100">
                    <h2 className="font-bold text-lg mb-4">Inbox</h2>
                    <div className="relative">
                        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input 
                            type="text" 
                            placeholder="Search messages..." 
                            className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-gold/20 focus:border-brand-gold"
                        />
                    </div>
                </div>
                <div className="flex-1 overflow-y-auto p-2">
                     <div className="text-center py-10 text-gray-400 text-sm">No new messages</div>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col items-center justify-center bg-gray-50/30">
                <EmptyState 
                    title="Select a Conversation"
                    description="Choose a message from the list to view details."
                    icon={MessageSquare}
                    action="Compose New"
                />
            </div>
        </div>
    );
};

export default UnifiedInbox;
