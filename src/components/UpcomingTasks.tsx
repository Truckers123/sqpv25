/**
 * UpcomingTasks component for displaying upcoming tasks and deadlines
 */
import React from 'react';
import { Clock, AlertCircle, CheckCircle, Calendar } from 'lucide-react';

interface Task {
  id: string;
  title: string;
  priority: 'high' | 'medium' | 'low';
  dueDate: Date;
  completed: boolean;
  type: 'call' | 'meeting' | 'follow-up' | 'proposal' | 'other';
}

/**
 * Component to display upcoming tasks
 */
const UpcomingTasks: React.FC = () => {
  const tasks: Task[] = [
    {
      id: '1',
      title: 'Follow up with Emma Davies',
      priority: 'high',
      dueDate: new Date(Date.now() + 2 * 60 * 60 * 1000), // 2 hours from now
      completed: false,
      type: 'follow-up'
    },
    {
      id: '2',
      title: 'Prepare investment proposal for James Anderson',
      priority: 'high',
      dueDate: new Date(Date.now() + 24 * 60 * 60 * 1000), // Tomorrow
      completed: false,
      type: 'proposal'
    },
    {
      id: '3',
      title: 'Schedule meeting with Michael Roberts',
      priority: 'medium',
      dueDate: new Date(Date.now() + 48 * 60 * 60 * 1000), // 2 days from now
      completed: false,
      type: 'meeting'
    },
    {
      id: '4',
      title: 'Review Sarah Thompson contract',
      priority: 'medium',
      dueDate: new Date(Date.now() + 72 * 60 * 60 * 1000), // 3 days from now
      completed: false,
      type: 'other'
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'call':
        return <Clock className="w-4 h-4 text-blue-500" />;
      case 'meeting':
        return <Calendar className="w-4 h-4 text-purple-500" />;
      case 'follow-up':
        return <AlertCircle className="w-4 h-4 text-orange-500" />;
      case 'proposal':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      default:
        return <Clock className="w-4 h-4 text-gray-500" />;
    }
  };

  const formatTimeUntil = (date: Date) => {
    const now = new Date();
    const diff = date.getTime() - now.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(hours / 24);
    
    if (days > 0) {
      return `${days} day${days > 1 ? 's' : ''}`;
    } else if (hours > 0) {
      return `${hours} hour${hours > 1 ? 's' : ''}`;
    } else {
      return 'Due now';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">Upcoming Tasks</h2>
          <p className="text-sm text-gray-600">Your pending tasks and deadlines</p>
        </div>
        <div className="text-sm text-gray-500">
          {tasks.filter(t => !t.completed).length} pending
        </div>
      </div>

      <div className="space-y-4">
        {tasks.filter(task => !task.completed).map((task) => (
          <div key={task.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
            <div className="flex items-center space-x-3">
              {getTypeIcon(task.type)}
              <div className="flex-1">
                <h3 className="font-medium text-gray-900">{task.title}</h3>
                <p className="text-sm text-gray-600">Due in {formatTimeUntil(task.dueDate)}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getPriorityColor(task.priority)}`}>
                {task.priority}
              </span>
              <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                Mark Done
              </button>
            </div>
          </div>
        ))}
      </div>

      {tasks.filter(t => !t.completed).length === 0 && (
        <div className="text-center py-8">
          <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
          <p className="text-gray-500">All tasks completed!</p>
        </div>
      )}
    </div>
  );
};

export default UpcomingTasks;