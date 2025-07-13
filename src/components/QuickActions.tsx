/**
 * QuickActions component for common CRM tasks
 */
import React from 'react';
import { UserPlus, Plus, Calendar, BarChart3, FileText, Phone, Mail, MessageSquare, Settings } from 'lucide-react';

const QuickActions: React.FC = () => {
  const actions = [
    {
      id: 1,
      name: 'Add New Lead',
      description: 'Create a new lead entry',
      icon: UserPlus,
      color: 'blue',
      shortcut: 'Ctrl+L'
    },
    {
      id: 2,
      name: 'Create Task',
      description: 'Add a new task or reminder',
      icon: Plus,
      color: 'green',
      shortcut: 'Ctrl+T'
    },
    {
      id: 3,
      name: 'Schedule Meeting',
      description: 'Book a meeting with client',
      icon: Calendar,
      color: 'purple',
      shortcut: 'Ctrl+M'
    },
    {
      id: 4,
      name: 'View Reports',
      description: 'Access analytics and reports',
      icon: BarChart3,
      color: 'orange',
      shortcut: 'Ctrl+R'
    },
    {
      id: 5,
      name: 'Create Proposal',
      description: 'Generate investment proposal',
      icon: FileText,
      color: 'teal',
      shortcut: 'Ctrl+P'
    },
    {
      id: 6,
      name: 'Make Call',
      description: 'Quick dial to contact',
      icon: Phone,
      color: 'indigo',
      shortcut: 'Ctrl+D'
    },
    {
      id: 7,
      name: 'Send Email',
      description: 'Compose and send email',
      icon: Mail,
      color: 'pink',
      shortcut: 'Ctrl+E'
    },
    {
      id: 8,
      name: 'Send Message',
      description: 'Send internal message',
      icon: MessageSquare,
      color: 'cyan',
      shortcut: 'Ctrl+Q'
    },
    {
      id: 9,
      name: 'Settings',
      description: 'Configure system settings',
      icon: Settings,
      color: 'gray',
      shortcut: 'Ctrl+S'
    }
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      blue: 'bg-blue-50 hover:bg-blue-100 border-blue-200',
      green: 'bg-green-50 hover:bg-green-100 border-green-200',
      purple: 'bg-purple-50 hover:bg-purple-100 border-purple-200',
      orange: 'bg-orange-50 hover:bg-orange-100 border-orange-200',
      teal: 'bg-teal-50 hover:bg-teal-100 border-teal-200',
      indigo: 'bg-indigo-50 hover:bg-indigo-100 border-indigo-200',
      pink: 'bg-pink-50 hover:bg-pink-100 border-pink-200',
      cyan: 'bg-cyan-50 hover:bg-cyan-100 border-cyan-200',
      gray: 'bg-gray-50 hover:bg-gray-100 border-gray-200'
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  const getIconColor = (color: string) => {
    const colors = {
      blue: 'text-blue-600',
      green: 'text-green-600',
      purple: 'text-purple-600',
      orange: 'text-orange-600',
      teal: 'text-teal-600',
      indigo: 'text-indigo-600',
      pink: 'text-pink-600',
      cyan: 'text-cyan-600',
      gray: 'text-gray-600'
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-900">Quick Actions</h2>
        <p className="text-sm text-gray-600">Frequently used CRM functions</p>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {actions.map((action) => {
          const Icon = action.icon;
          return (
            <button
              key={action.id}
              className={`p-4 rounded-lg border-2 transition-all text-left hover:shadow-md ${getColorClasses(action.color)}`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="w-10 h-10 bg-white rounded-lg shadow-sm flex items-center justify-center">
                  <Icon className={`w-5 h-5 ${getIconColor(action.color)}`} />
                </div>
                <span className="text-xs text-gray-400 font-mono">{action.shortcut}</span>
              </div>
              <h3 className="font-medium text-gray-900 mb-1">{action.name}</h3>
              <p className="text-sm text-gray-600">{action.description}</p>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default QuickActions;