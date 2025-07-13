/**
 * Home page component - Main dashboard for the SQ Invest CRM system
 */
import React from 'react';
import Header from '../components/Header';
import MetricCard from '../components/MetricCard';
import QuickActions from '../components/QuickActions';
import RecentActivity from '../components/RecentActivity';
import SalesLeaderboard from '../components/SalesLeaderboard';
import UpcomingTasks from '../components/UpcomingTasks';
import PipelineChart from '../components/PipelineChart';
import SmartRecommendations from '../components/SmartRecommendations';
import PropertyTypes from '../components/PropertyTypes';
import InvestmentTypesSummary from '../components/InvestmentTypesSummary';
import LaunchTimeline from '../components/LaunchTimeline';
import GoalTracker from '../components/GoalTracker';
import DynamicLeaderboard from '../components/DynamicLeaderboard';
import { Users, TrendingUp, Target, Calendar, DollarSign, Building } from 'lucide-react';

/**
 * Home component - Main dashboard
 */
export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome to SQ Invest CRM</h1>
          <p className="text-gray-600">Your comprehensive property investment management dashboard</p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <MetricCard
            title="Total Contacts"
            value="4"
            icon={<Users className="h-6 w-6 text-blue-600" />}
            trend="+2 this month"
            color="blue"
          />
          <MetricCard
            title="Active Leads"
            value="3"
            icon={<TrendingUp className="h-6 w-6 text-green-600" />}
            trend="+1 this week"
            color="green"
          />
          <MetricCard
            title="Conversion Rate"
            value="25%"
            icon={<Target className="h-6 w-6 text-purple-600" />}
            trend="+5% this month"
            color="purple"
          />
          <MetricCard
            title="Portfolio Value"
            value="£2.4M"
            icon={<DollarSign className="h-6 w-6 text-orange-600" />}
            trend="+15% this quarter"
            color="orange"
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            <QuickActions />
            <PipelineChart />
            <PropertyTypes />
            <InvestmentTypesSummary />
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            <RecentActivity activities={[
              {
                id: '1',
                title: 'New Lead Added',
                description: 'Emma Davies expressed interest in residential property',
                type: 'lead',
                timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000)
              },
              {
                id: '2',
                title: 'Task Completed',
                description: 'Follow-up call with Michael Roberts completed',
                type: 'task',
                timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000)
              },
              {
                id: '3',
                title: 'Meeting Scheduled',
                description: 'Property viewing scheduled with James Anderson',
                type: 'meeting',
                timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000)
              }
            ]} />
            <UpcomingTasks />
            <SalesLeaderboard />
            <SmartRecommendations />
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
          <LaunchTimeline />
          <GoalTracker />
        </div>

        {/* Dynamic Leaderboard */}
        <div className="mt-8">
          <DynamicLeaderboard />
        </div>
      </div>
    </div>
  );
}