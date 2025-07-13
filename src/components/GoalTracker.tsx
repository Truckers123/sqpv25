/**
 * GoalTracker component for displaying team goals and progress
 */
import React from 'react';
import { Target, TrendingUp, Users, DollarSign, CheckCircle } from 'lucide-react';

interface Goal {
  id: string;
  title: string;
  description: string;
  current: number;
  target: number;
  unit: string;
  progress: number;
  category: 'revenue' | 'leads' | 'conversion' | 'team';
  deadline: string;
  status: 'on-track' | 'at-risk' | 'achieved';
}

/**
 * Component to display team goals and progress tracking
 */
const GoalTracker: React.FC = () => {
  const goals: Goal[] = [
    {
      id: '1',
      title: 'Monthly Revenue Target',
      description: 'Achieve monthly revenue goal for Q1',
      current: 750000,
      target: 1000000,
      unit: '£',
      progress: 75,
      category: 'revenue',
      deadline: '2025-01-31',
      status: 'on-track'
    },
    {
      id: '2',
      title: 'New Lead Generation',
      description: 'Generate qualified leads for the month',
      current: 12,
      target: 15,
      unit: '',
      progress: 80,
      category: 'leads',
      deadline: '2025-01-31',
      status: 'on-track'
    },
    {
      id: '3',
      title: 'Conversion Rate',
      description: 'Maintain conversion rate above 25%',
      current: 28,
      target: 25,
      unit: '%',
      progress: 100,
      category: 'conversion',
      deadline: '2025-01-31',
      status: 'achieved'
    },
    {
      id: '4',
      title: 'Team Training',
      description: 'Complete CRM training for all team members',
      current: 6,
      target: 10,
      unit: ' people',
      progress: 60,
      category: 'team',
      deadline: '2025-02-15',
      status: 'at-risk'
    }
  ];

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'revenue':
        return <DollarSign className="w-5 h-5 text-green-500" />;
      case 'leads':
        return <Users className="w-5 h-5 text-blue-500" />;
      case 'conversion':
        return <TrendingUp className="w-5 h-5 text-purple-500" />;
      case 'team':
        return <Users className="w-5 h-5 text-orange-500" />;
      default:
        return <Target className="w-5 h-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'achieved':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'on-track':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'at-risk':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getProgressColor = (progress: number) => {
    if (progress >= 100) return 'bg-green-500';
    if (progress >= 75) return 'bg-blue-500';
    if (progress >= 50) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const formatValue = (value: number, unit: string) => {
    if (unit === '£') {
      return `£${(value / 1000).toFixed(0)}K`;
    }
    return `${value}${unit}`;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short'
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
            <Target className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Goal Tracker</h2>
            <p className="text-sm text-gray-600">Track team goals and progress</p>
          </div>
        </div>
        <div className="text-sm text-gray-500">
          {goals.filter(g => g.status === 'achieved').length} of {goals.length} achieved
        </div>
      </div>

      <div className="space-y-4">
        {goals.map((goal) => (
          <div key={goal.id} className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-3">
                {getCategoryIcon(goal.category)}
                <div>
                  <h3 className="font-medium text-gray-900">{goal.title}</h3>
                  <p className="text-sm text-gray-600">{goal.description}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(goal.status)}`}>
                  {goal.status.replace('-', ' ')}
                </span>
                {goal.status === 'achieved' && (
                  <CheckCircle className="w-4 h-4 text-green-500" />
                )}
              </div>
            </div>
            
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-4 text-sm">
                <span className="text-gray-600">
                  {formatValue(goal.current, goal.unit)} / {formatValue(goal.target, goal.unit)}
                </span>
                <span className="text-gray-500">Due: {formatDate(goal.deadline)}</span>
              </div>
              <span className="text-sm font-medium text-gray-900">{goal.progress}%</span>
            </div>
            
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className={`h-2 rounded-full transition-all ${getProgressColor(goal.progress)}`}
                style={{ width: `${Math.min(goal.progress, 100)}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-4 border-t border-gray-200">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-sm text-gray-600">Total Goals</p>
            <p className="text-2xl font-bold text-gray-900">{goals.length}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Achieved</p>
            <p className="text-2xl font-bold text-green-600">{goals.filter(g => g.status === 'achieved').length}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">On Track</p>
            <p className="text-2xl font-bold text-blue-600">{goals.filter(g => g.status === 'on-track').length}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GoalTracker;