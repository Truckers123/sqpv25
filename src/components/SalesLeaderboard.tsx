/**
 * SalesLeaderboard component showing top performers
 */
import React from 'react';
import { Trophy, TrendingUp, User } from 'lucide-react';
import { useUserData } from '../contexts/UserDataContext';

/**
 * Sales Leaderboard component displaying top sales performers
 */
const SalesLeaderboard: React.FC = () => {
  const { systemUsers } = useUserData();
  
  const salesData = (systemUsers || [])
    .filter(user => ['board', 'management', 'sales'].includes(user.accessLevel))
    .map((user, index) => {
      const performanceData = [
        { deals: 8, revenue: '£1,450K', conversion: '62%', monthlyDeals: 2, status: 'CHAMPION' },
        { deals: 6, revenue: '£890K', conversion: '48%', monthlyDeals: 1, status: 'RISING' },
        { deals: 4, revenue: '£650K', conversion: '42%', monthlyDeals: 1, status: 'STEADY' }
      ];
      
      const performance = performanceData[index] || { deals: 3, revenue: '£500K', conversion: '35%', monthlyDeals: 1, status: 'STEADY' };
      
      return {
        rank: index + 1,
        name: user.name,
        deals: performance.deals,
        revenue: performance.revenue,
        conversion: performance.conversion,
        monthlyDeals: performance.monthlyDeals,
        status: performance.status,
        trend: 'up'
      };
    })
    .slice(0, 3) || [];

  const getRankColor = (rank: number) => {
    switch (rank) {
      case 1:
        return 'bg-gradient-to-r from-yellow-400 to-yellow-600';
      case 2:
        return 'bg-gradient-to-r from-gray-300 to-gray-500';
      case 3:
        return 'bg-gradient-to-r from-orange-400 to-orange-600';
      default:
        return 'bg-gradient-to-r from-blue-400 to-blue-600';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'CHAMPION':
        return 'bg-green-100 text-green-800';
      case 'RISING':
        return 'bg-blue-100 text-blue-800';
      case 'STEADY':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg flex items-center justify-center">
            <Trophy className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Sales Leaderboard</h2>
            <p className="text-sm text-gray-600">Top performers this month</p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {salesData.map((person) => (
          <div key={person.rank} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
            <div className="flex items-center space-x-4">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold ${getRankColor(person.rank)}`}>
                #{person.rank}
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm">
                  <User className="w-5 h-5 text-gray-600" />
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="font-medium text-gray-900">{person.name}</span>
                    <TrendingUp className="w-4 h-4 text-green-500" />
                  </div>
                  <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(person.status)}`}>
                    {person.status}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="text-right">
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div>
                  <p className="text-gray-600">Deals</p>
                  <p className="font-semibold text-gray-900">{person.deals}</p>
                </div>
                <div>
                  <p className="text-gray-600">Revenue</p>
                  <p className="font-semibold text-gray-900">{person.revenue}</p>
                </div>
                <div>
                  <p className="text-gray-600">Conversion</p>
                  <p className="font-semibold text-gray-900">{person.conversion}</p>
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-1">{person.monthlyDeals} deals this month</p>
            </div>
          </div>
        ))}
      </div>

      {salesData.length === 0 && (
        <div className="text-center py-8">
          <Trophy className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500">No sales data available</p>
        </div>
      )}
    </div>
  );
};

export default SalesLeaderboard;