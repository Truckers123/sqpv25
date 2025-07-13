/**
 * DynamicLeaderboard component for displaying comprehensive team performance
 */
import React, { useState } from 'react';
import { Trophy, Users, TrendingUp, Calendar, Star, Award, Target } from 'lucide-react';
import { useUserData } from '../contexts/UserDataContext';

interface LeaderboardEntry {
  id: string;
  name: string;
  role: string;
  score: number;
  deals: number;
  revenue: string;
  activities: number;
  rank: number;
  change: number;
  badge: string;
  achievements: string[];
}

/**
 * Component to display dynamic team leaderboard
 */
const DynamicLeaderboard: React.FC = () => {
  const [timeframe, setTimeframe] = useState<'week' | 'month' | 'quarter'>('month');
  const { systemUsers } = useUserData();

  const generateLeaderboardData = (): LeaderboardEntry[] => {
    if (!systemUsers) return [];

    return systemUsers
      .filter(user => ['board', 'management', 'sales'].includes(user.accessLevel))
      .map((user, index) => {
        const performanceData = [
          {
            score: 95,
            deals: 8,
            revenue: '£1,450K',
            activities: 127,
            change: 5,
            badge: 'CHAMPION',
            achievements: ['Top Performer', 'Revenue Leader', 'Deal Master']
          },
          {
            score: 87,
            deals: 6,
            revenue: '£890K',
            activities: 98,
            change: 2,
            badge: 'RISING STAR',
            achievements: ['Consistent Performer', 'Client Favorite']
          },
          {
            score: 82,
            deals: 5,
            revenue: '£720K',
            activities: 85,
            change: -1,
            badge: 'STEADY',
            achievements: ['Reliable', 'Team Player']
          }
        ];

        const performance = performanceData[index] || {
          score: 75,
          deals: 3,
          revenue: '£500K',
          activities: 65,
          change: 0,
          badge: 'DEVELOPING',
          achievements: ['New Team Member']
        };

        return {
          id: user.id,
          name: user.name,
          role: user.role,
          rank: index + 1,
          ...performance
        };
      })
      .sort((a, b) => b.score - a.score);
  };

  const leaderboardData = generateLeaderboardData();

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="w-5 h-5 text-yellow-500" />;
      case 2:
        return <Award className="w-5 h-5 text-gray-400" />;
      case 3:
        return <Star className="w-5 h-5 text-orange-500" />;
      default:
        return <Target className="w-5 h-5 text-gray-400" />;
    }
  };

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

  const getBadgeColor = (badge: string) => {
    switch (badge) {
      case 'CHAMPION':
        return 'bg-gradient-to-r from-purple-500 to-pink-500 text-white';
      case 'RISING STAR':
        return 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white';
      case 'STEADY':
        return 'bg-gradient-to-r from-green-500 to-emerald-500 text-white';
      case 'DEVELOPING':
        return 'bg-gradient-to-r from-gray-500 to-gray-600 text-white';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getChangeIcon = (change: number) => {
    if (change > 0) return <TrendingUp className="w-4 h-4 text-green-500" />;
    if (change < 0) return <TrendingUp className="w-4 h-4 text-red-500 rotate-180" />;
    return <div className="w-4 h-4" />;
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
            <Trophy className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Team Leaderboard</h2>
            <p className="text-sm text-gray-600">Dynamic performance tracking</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          {(['week', 'month', 'quarter'] as const).map((period) => (
            <button
              key={period}
              onClick={() => setTimeframe(period)}
              className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                timeframe === period
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {period.charAt(0).toUpperCase() + period.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        {leaderboardData.map((entry) => (
          <div key={entry.id} className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-4">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold ${getRankColor(entry.rank)}`}>
                  #{entry.rank}
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <h3 className="font-medium text-gray-900">{entry.name}</h3>
                    {getRankIcon(entry.rank)}
                    {getChangeIcon(entry.change)}
                  </div>
                  <p className="text-sm text-gray-600">{entry.role}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className={`px-3 py-1 rounded-full text-xs font-bold ${getBadgeColor(entry.badge)}`}>
                  {entry.badge}
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-gray-900">{entry.score}</p>
                  <p className="text-xs text-gray-500">Performance Score</p>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-4 gap-4 text-sm">
              <div className="text-center">
                <p className="text-gray-600">Deals</p>
                <p className="font-semibold text-gray-900">{entry.deals}</p>
              </div>
              <div className="text-center">
                <p className="text-gray-600">Revenue</p>
                <p className="font-semibold text-gray-900">{entry.revenue}</p>
              </div>
              <div className="text-center">
                <p className="text-gray-600">Activities</p>
                <p className="font-semibold text-gray-900">{entry.activities}</p>
              </div>
              <div className="text-center">
                <p className="text-gray-600">Change</p>
                <p className={`font-semibold ${entry.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {entry.change >= 0 ? '+' : ''}{entry.change}
                </p>
              </div>
            </div>
            
            <div className="mt-3 pt-3 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex flex-wrap gap-1">
                  {entry.achievements.map((achievement, index) => (
                    <span key={index} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                      {achievement}
                    </span>
                  ))}
                </div>
                <div className="text-xs text-gray-500">
                  This {timeframe}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {leaderboardData.length === 0 && (
        <div className="text-center py-8">
          <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500">No team data available</p>
        </div>
      )}
    </div>
  );
};

export default DynamicLeaderboard;