/**
 * LaunchTimeline component for displaying SQ launch timeline
 */
import React from 'react';
import { Calendar, CheckCircle, Clock, AlertCircle } from 'lucide-react';

interface TimelineItem {
  id: string;
  title: string;
  description: string;
  date: string;
  status: 'completed' | 'in-progress' | 'upcoming' | 'delayed';
  priority: 'high' | 'medium' | 'low';
}

/**
 * Component to display launch timeline
 */
const LaunchTimeline: React.FC = () => {
  const timelineItems: TimelineItem[] = [
    {
      id: '1',
      title: 'CRM System Development',
      description: 'Complete CRM platform with all core features',
      date: '2025-01-15',
      status: 'completed',
      priority: 'high'
    },
    {
      id: '2',
      title: 'User Testing & Feedback',
      description: 'Internal testing and user feedback collection',
      date: '2025-01-20',
      status: 'in-progress',
      priority: 'high'
    },
    {
      id: '3',
      title: 'Security Audit',
      description: 'Comprehensive security review and penetration testing',
      date: '2025-01-25',
      status: 'upcoming',
      priority: 'high'
    },
    {
      id: '4',
      title: 'Marketing Campaign Launch',
      description: 'Begin marketing efforts for SQ launch',
      date: '2025-02-01',
      status: 'upcoming',
      priority: 'medium'
    },
    {
      id: '5',
      title: 'Staff Training',
      description: 'Train all team members on new system',
      date: '2025-02-10',
      status: 'upcoming',
      priority: 'medium'
    },
    {
      id: '6',
      title: 'SQ OFFICIAL LAUNCH',
      description: 'Official launch of SQ Invest platform',
      date: '2025-02-15',
      status: 'upcoming',
      priority: 'high'
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'in-progress':
        return <Clock className="w-5 h-5 text-blue-500" />;
      case 'upcoming':
        return <Calendar className="w-5 h-5 text-gray-500" />;
      case 'delayed':
        return <AlertCircle className="w-5 h-5 text-red-500" />;
      default:
        return <Calendar className="w-5 h-5 text-gray-500" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'in-progress':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'upcoming':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      case 'delayed':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  const getDaysUntilLaunch = () => {
    const launchDate = new Date('2025-02-15');
    const today = new Date();
    const diffTime = launchDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">SQ Launch Timeline</h2>
          <p className="text-sm text-gray-600">Countdown to official launch</p>
        </div>
        <div className="text-right">
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 rounded-lg">
            <p className="text-sm font-medium">Days Until Launch</p>
            <p className="text-2xl font-bold">{getDaysUntilLaunch()}</p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {timelineItems.map((item, index) => (
          <div key={item.id} className="flex items-start space-x-4">
            <div className="flex-shrink-0 flex flex-col items-center">
              {getStatusIcon(item.status)}
              {index < timelineItems.length - 1 && (
                <div className="w-px h-8 bg-gray-200 mt-2" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1">
                <h3 className="font-medium text-gray-900">{item.title}</h3>
                <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusBadge(item.status)}`}>
                  {item.status.replace('-', ' ')}
                </span>
              </div>
              <p className="text-sm text-gray-600 mb-2">{item.description}</p>
              <div className="flex items-center space-x-4 text-sm text-gray-500">
                <span>{formatDate(item.date)}</span>
                <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                  item.priority === 'high' ? 'bg-red-100 text-red-800' :
                  item.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-green-100 text-green-800'
                }`}>
                  {item.priority} priority
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-4 border-t border-gray-200">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">Progress: 2 of 6 items completed</span>
          <span className="text-gray-600">33% complete</span>
        </div>
        <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 h-2 rounded-full" style={{ width: '33%' }} />
        </div>
      </div>
    </div>
  );
};

export default LaunchTimeline;