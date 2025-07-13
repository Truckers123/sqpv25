/**
 * PipelineChart component for displaying sales pipeline visualization
 */
import React from 'react';
import { TrendingUp, Users, DollarSign, Target } from 'lucide-react';

interface PipelineStage {
  id: string;
  name: string;
  count: number;
  value: string;
  color: string;
  percentage: number;
}

/**
 * Component to display sales pipeline chart
 */
const PipelineChart: React.FC = () => {
  const pipelineStages: PipelineStage[] = [
    {
      id: '1',
      name: 'New Leads',
      count: 1,
      value: '£200K',
      color: 'bg-blue-500',
      percentage: 25
    },
    {
      id: '2',
      name: 'Qualified',
      count: 2,
      value: '£750K',
      color: 'bg-green-500',
      percentage: 50
    },
    {
      id: '3',
      name: 'Proposal',
      count: 1,
      value: '£1.5M',
      color: 'bg-orange-500',
      percentage: 25
    },
    {
      id: '4',
      name: 'Closed Won',
      count: 1,
      value: '£650K',
      color: 'bg-purple-500',
      percentage: 25
    }
  ];

  const totalValue = '£3.1M';
  const totalLeads = 5;
  const conversionRate = '25%';
  const avgDealSize = '£620K';

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">Sales Pipeline</h2>
          <p className="text-sm text-gray-600">Current pipeline status and performance</p>
        </div>
        <div className="flex items-center space-x-4 text-sm text-gray-600">
          <div className="flex items-center space-x-1">
            <TrendingUp className="w-4 h-4" />
            <span>Pipeline Health: Strong</span>
          </div>
        </div>
      </div>

      {/* Pipeline Stages */}
      <div className="space-y-4 mb-6">
        {pipelineStages.map((stage) => (
          <div key={stage.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-4">
              <div className={`w-4 h-4 rounded-full ${stage.color}`} />
              <div>
                <h3 className="font-medium text-gray-900">{stage.name}</h3>
                <p className="text-sm text-gray-600">{stage.count} leads • {stage.value}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="w-32 bg-gray-200 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full ${stage.color}`} 
                  style={{ width: `${stage.percentage}%` }}
                />
              </div>
              <span className="text-sm font-medium text-gray-900">{stage.percentage}%</span>
            </div>
          </div>
        ))}
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-gray-200">
        <div className="text-center">
          <div className="flex items-center justify-center w-8 h-8 bg-blue-100 rounded-lg mx-auto mb-2">
            <DollarSign className="w-4 h-4 text-blue-600" />
          </div>
          <p className="text-sm text-gray-600">Total Value</p>
          <p className="text-lg font-semibold text-gray-900">{totalValue}</p>
        </div>
        <div className="text-center">
          <div className="flex items-center justify-center w-8 h-8 bg-green-100 rounded-lg mx-auto mb-2">
            <Users className="w-4 h-4 text-green-600" />
          </div>
          <p className="text-sm text-gray-600">Total Leads</p>
          <p className="text-lg font-semibold text-gray-900">{totalLeads}</p>
        </div>
        <div className="text-center">
          <div className="flex items-center justify-center w-8 h-8 bg-purple-100 rounded-lg mx-auto mb-2">
            <Target className="w-4 h-4 text-purple-600" />
          </div>
          <p className="text-sm text-gray-600">Conversion</p>
          <p className="text-lg font-semibold text-gray-900">{conversionRate}</p>
        </div>
        <div className="text-center">
          <div className="flex items-center justify-center w-8 h-8 bg-orange-100 rounded-lg mx-auto mb-2">
            <TrendingUp className="w-4 h-4 text-orange-600" />
          </div>
          <p className="text-sm text-gray-600">Avg Deal Size</p>
          <p className="text-lg font-semibold text-gray-900">{avgDealSize}</p>
        </div>
      </div>
    </div>
  );
};

export default PipelineChart;