/**
 * MetricCard component for displaying key performance indicators
 */
import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  trend?: string;
  color?: string;
}

const MetricCard: React.FC<MetricCardProps> = ({ title, value, icon, trend, color }) => {
  const getCardColor = (color?: string) => {
    switch (color) {
      case 'blue':
        return 'border-l-4 border-blue-500 bg-blue-50/50';
      case 'green':
        return 'border-l-4 border-green-500 bg-green-50/50';
      case 'purple':
        return 'border-l-4 border-purple-500 bg-purple-50/50';
      case 'orange':
        return 'border-l-4 border-orange-500 bg-orange-50/50';
      case 'teal':
        return 'border-l-4 border-teal-500 bg-teal-50/50';
      case 'indigo':
        return 'border-l-4 border-indigo-500 bg-indigo-50/50';
      case 'emerald':
        return 'border-l-4 border-emerald-500 bg-emerald-50/50';
      default:
        return 'border-l-4 border-gray-500 bg-gray-50/50';
    }
  };

  return (
    <div className={`bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow ${getCardColor(color)}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-lg bg-white shadow-sm flex items-center justify-center">
            {icon}
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-600">{title}</h3>
            <p className="text-2xl font-bold text-gray-900">{value}</p>
          </div>
        </div>
      </div>
      
      <div className="mt-4">
        {trend && (
          <div className="flex items-center">
            <TrendingUp className="w-4 h-4 text-green-500" />
            <span className="ml-1 text-sm font-medium text-green-600">
              {trend}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default MetricCard;