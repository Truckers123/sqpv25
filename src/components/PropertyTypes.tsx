/**
 * PropertyTypes component for displaying property investment types
 */
import React from 'react';
import { Building, Home, Factory, TrendingUp } from 'lucide-react';

interface PropertyType {
  id: string;
  name: string;
  count: number;
  value: string;
  growth: string;
  icon: React.ComponentType<any>;
  color: string;
}

/**
 * Component to display property investment types
 */
const PropertyTypes: React.FC = () => {
  const propertyTypes: PropertyType[] = [
    {
      id: '1',
      name: 'Residential',
      count: 2,
      value: '£850K',
      growth: '+12%',
      icon: Home,
      color: 'bg-blue-500'
    },
    {
      id: '2',
      name: 'Commercial',
      count: 1,
      value: '£650K',
      growth: '+8%',
      icon: Building,
      color: 'bg-green-500'
    },
    {
      id: '3',
      name: 'Off-Plan',
      count: 1,
      value: '£1.2M',
      growth: '+25%',
      icon: Factory,
      color: 'bg-purple-500'
    },
    {
      id: '4',
      name: 'Property Bonds',
      count: 1,
      value: '£400K',
      growth: '+5%',
      icon: TrendingUp,
      color: 'bg-orange-500'
    }
  ];

  const totalValue = '£3.1M';
  const totalProperties = 5;

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">Property Investment Types</h2>
          <p className="text-sm text-gray-600">Portfolio breakdown by property type</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-600">Total Portfolio</p>
          <p className="text-lg font-semibold text-gray-900">{totalValue}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {propertyTypes.map((type) => {
          const Icon = type.icon;
          return (
            <div key={type.id} className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${type.color}`}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">{type.name}</h3>
                    <p className="text-sm text-gray-600">{type.count} properties</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-semibold text-gray-900">{type.value}</p>
                  <p className="text-sm text-green-600 font-medium">{type.growth}</p>
                </div>
              </div>
              
              <div className="flex items-center justify-between text-sm text-gray-600">
                <span>Average: {(parseInt(type.value.replace('£', '').replace('K', '')) / type.count).toFixed(0)}K</span>
                <span>Growth: {type.growth}</span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-6 pt-4 border-t border-gray-200">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">Total Properties: {totalProperties}</span>
          <span className="text-gray-600">Average Growth: +12.5%</span>
        </div>
      </div>
    </div>
  );
};

export default PropertyTypes;