/**
 * SmartRecommendations component for AI-powered suggestions
 */
import React from 'react';
import { Lightbulb, TrendingUp, Users, Calendar, Target, ArrowRight } from 'lucide-react';

interface Recommendation {
  id: string;
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  type: 'opportunity' | 'task' | 'improvement' | 'alert';
  action: string;
  impact: string;
}

/**
 * Component to display AI-powered smart recommendations
 */
const SmartRecommendations: React.FC = () => {
  const recommendations: Recommendation[] = [
    {
      id: '1',
      title: 'High-Value Lead Opportunity',
      description: 'James Anderson shows strong engagement and fits your high-value client profile.',
      priority: 'high',
      type: 'opportunity',
      action: 'Schedule premium consultation',
      impact: 'Potential £1.5M+ deal'
    },
    {
      id: '2',
      title: 'Follow-up Reminder',
      description: 'Emma Davies hasn\'t been contacted in 5 days. Risk of lead going cold.',
      priority: 'medium',
      type: 'task',
      action: 'Send follow-up email',
      impact: 'Maintain lead temperature'
    },
    {
      id: '3',
      title: 'Pipeline Optimization',
      description: 'Your conversion rate in Q4 is 15% above average. Scale your lead generation.',
      priority: 'medium',
      type: 'improvement',
      action: 'Increase marketing spend',
      impact: '30% more qualified leads'
    },
    {
      id: '4',
      title: 'Seasonal Opportunity',
      description: 'Tax year-end approaching. Many clients looking for investment options.',
      priority: 'high',
      type: 'opportunity',
      action: 'Launch tax-efficient campaign',
      impact: 'Capture seasonal demand'
    }
  ];

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'opportunity':
        return <TrendingUp className="w-4 h-4 text-green-500" />;
      case 'task':
        return <Calendar className="w-4 h-4 text-blue-500" />;
      case 'improvement':
        return <Target className="w-4 h-4 text-purple-500" />;
      case 'alert':
        return <Users className="w-4 h-4 text-orange-500" />;
      default:
        return <Lightbulb className="w-4 h-4 text-gray-500" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'border-l-4 border-red-500 bg-red-50/50';
      case 'medium':
        return 'border-l-4 border-yellow-500 bg-yellow-50/50';
      case 'low':
        return 'border-l-4 border-green-500 bg-green-50/50';
      default:
        return 'border-l-4 border-gray-500 bg-gray-50/50';
    }
  };

  const getPriorityBadge = (priority: string) => {
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

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
            <Lightbulb className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Smart Recommendations</h2>
            <p className="text-sm text-gray-600">AI-powered insights and suggestions</p>
          </div>
        </div>
        <div className="text-sm text-gray-500">
          {recommendations.length} suggestions
        </div>
      </div>

      <div className="space-y-4">
        {recommendations.map((recommendation) => (
          <div key={recommendation.id} className={`bg-white rounded-lg p-4 hover:shadow-md transition-shadow ${getPriorityColor(recommendation.priority)}`}>
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center space-x-3">
                {getTypeIcon(recommendation.type)}
                <div>
                  <h3 className="font-medium text-gray-900">{recommendation.title}</h3>
                  <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${getPriorityBadge(recommendation.priority)}`}>
                    {recommendation.priority} priority
                  </span>
                </div>
              </div>
            </div>
            
            <p className="text-sm text-gray-600 mb-3">{recommendation.description}</p>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4 text-sm">
                <div>
                  <span className="text-gray-500">Action:</span>
                  <span className="ml-1 text-gray-900 font-medium">{recommendation.action}</span>
                </div>
                <div>
                  <span className="text-gray-500">Impact:</span>
                  <span className="ml-1 text-gray-900 font-medium">{recommendation.impact}</span>
                </div>
              </div>
              <button className="flex items-center space-x-1 text-blue-600 hover:text-blue-800 text-sm font-medium">
                <span>Take Action</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {recommendations.length === 0 && (
        <div className="text-center py-8">
          <Lightbulb className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500">No recommendations available</p>
        </div>
      )}
    </div>
  );
};

export default SmartRecommendations;