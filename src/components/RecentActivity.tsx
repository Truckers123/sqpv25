/**
 * RecentActivity component showing recent CRM activities
 */

import React from 'react';
import { Clock, User, CheckCircle, Calendar, FileText } from 'lucide-react';
import { ActivityItem } from '../types';

interface RecentActivityProps {
  activities: ActivityItem[];
}

/**
 * Component to display recent activities in the CRM system
 */
const RecentActivity: React.FC<RecentActivityProps> = ({ activities }) => {
  const getIcon = (type: string) => {
    switch (type) {
      case 'lead':
        return <User className="w-4 h-4 text-blue-500" />;
      case 'task':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'meeting':
        return <Calendar className="w-4 h-4 text-purple-500" />;
      case 'proposal':
        return <FileText className="w-4 h-4 text-orange-500" />;
      default:
        return <Clock className="w-4 h-4 text-gray-500" />;
    }
  };

  const formatTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(hours / 24);
    
    if (days > 0) {
      return `${days} day${days > 1 ? 's' : ''} ago`;
    }
    return `${hours} hour${hours > 1 ? 's' : ''} ago`;
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h2>
      
      <div className="space-y-4">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-start space-x-3">
            <div className="flex-shrink-0 mt-1">
              {getIcon(activity.type)}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-gray-900 font-medium">{activity.title}</p>
              <p className="text-sm text-gray-600">{activity.description} • {formatTime(activity.timestamp)}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentActivity;