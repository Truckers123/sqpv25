/**
 * InvestmentTypesSummary component for displaying investment types overview
 */
import React from 'react';
import { PieChart, DollarSign, TrendingUp, Target } from 'lucide-react';

interface InvestmentType {
  id: string;
  name: string;
  allocation: number;
  value: string;
  performance: string;
  risk: 'low' | 'medium' | 'high';
  color: string;
}

/**
 * Component to display investment types summary
 */
const InvestmentTypesSummary: React.FC = () => {
  const investmentTypes: InvestmentType[] = [
    {
      id: '1',
      name: 'Residential Property',
      allocation: 45,
      value: '£1.4M',
      performance: '+12%',
      risk: 'medium',
      color: 'bg-blue-500'
    },
    {
      id: '2',
      name: 'Commercial Property',
      allocation: 30,
      value: '£930K',
      performance: '+8%',
      risk: 'low',
      color: 'bg-green-500'
    },
    {
      id: '3',
      name: 'Off-Plan Developments',
      allocation: 20,
      value: '£620K',
      performance: '+25%',
      risk: 'high',
      color: 'bg-purple-500'
    },
    {
      id: '4',
      name: 'Property Bonds',
      allocation: 5,
      value: '£155K',
      performance: '+5%',
      risk: 'low',
      color: 'bg-orange-500'
    }
  ];

  const totalValue = '£3.1M';
  const overallPerformance = '+11.2%';

  const getRiskBadge = (risk: string) => {
    switch (risk) {
      case 'low':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'high':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
            <PieChart className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Investment Types</h2>
            <p className="text-sm text-gray-600">Portfolio allocation and performance</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-600">Total Value</p>
          <p className="text-lg font-semibold text-gray-900">{totalValue}</p>
        </div>
      </div>

      <div className="space-y-4">
        {investmentTypes.map((type) => (
          <div key={type.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
            <div className="flex items-center space-x-4">
              <div className={`w-4 h-4 rounded-full ${type.color}`} />
              <div>
                <h3 className="font-medium text-gray-900">{type.name}</h3>
                <div className="flex items-center space-x-2 mt-1">
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium border ${getRiskBadge(type.risk)}`}>
                    {type.risk} risk
                  </span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-6 text-sm">
              <div className="text-right">
                <p className="text-gray-600">Allocation</p>
                <p className="font-medium text-gray-900">{type.allocation}%</p>
              </div>
              <div className="text-right">
                <p className="text-gray-600">Value</p>
                <p className="font-medium text-gray-900">{type.value}</p>
              </div>
              <div className="text-right">
                <p className="text-gray-600">Performance</p>
                <p className="font-medium text-green-600">{type.performance}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-4 border-t border-gray-200">
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <div className="flex items-center justify-center w-8 h-8 bg-blue-100 rounded-lg mx-auto mb-2">
              <DollarSign className="w-4 h-4 text-blue-600" />
            </div>
            <p className="text-sm text-gray-600">Total Value</p>
            <p className="text-lg font-semibold text-gray-900">{totalValue}</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center w-8 h-8 bg-green-100 rounded-lg mx-auto mb-2">
              <TrendingUp className="w-4 h-4 text-green-600" />
            </div>
            <p className="text-sm text-gray-600">Overall Performance</p>
            <p className="text-lg font-semibold text-green-600">{overallPerformance}</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center w-8 h-8 bg-purple-100 rounded-lg mx-auto mb-2">
              <Target className="w-4 h-4 text-purple-600" />
            </div>
            <p className="text-sm text-gray-600">Risk Level</p>
            <p className="text-lg font-semibold text-gray-900">Balanced</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvestmentTypesSummary;