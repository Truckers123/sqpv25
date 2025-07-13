/**
 * Demo Landing Page - Introduction and test credentials for CRM system
 * Provides overview of features and easy access for testers
 */

import React, { useState } from 'react';
import { Building, Users, MessageSquare, Mail, BarChart3, Calendar, FileText, Shield, ArrowRight, Copy, Check, Eye, EyeOff } from 'lucide-react';

interface DemoProps {
  onStartDemo: (credentials: { username: string; password: string }) => void;
}

export default function Demo({ onStartDemo }: DemoProps) {
  const [copiedCredential, setCopiedCredential] = useState<string | null>(null);
  const [showPasswords, setShowPasswords] = useState(false);

  const testAccounts = [
    {
      id: 'truckers',
      username: 'truckers',
      password: 'truckers123',
      name: 'Alex "Big Truck" Foster',
      role: 'Managing Director',
      department: 'Management',
      description: 'Full system access, analytics, deal management',
      color: 'bg-purple-100 text-purple-800 border-purple-200'
    },
    {
      id: 'squire',
      username: 'squire',
      password: 'squire123',
      name: 'Squire',
      role: 'Senior Sales Agent',
      department: 'Sales',
      description: 'Contact management, deals, reports, documents',
      color: 'bg-blue-100 text-blue-800 border-blue-200'
    },
    {
      id: 'm1',
      username: 'm1',
      password: 'm1123',
      name: 'M1',
      role: 'Sales Agent',
      department: 'Sales',
      description: 'Contact management, deals, calendar access',
      color: 'bg-green-100 text-green-800 border-green-200'
    },
    {
      id: 'ed',
      username: 'ed',
      password: 'ed123',
      name: 'Ed',
      role: 'Business Development Manager',
      department: 'Business Development',
      description: 'Deals, analytics, reports, business development',
      color: 'bg-orange-100 text-orange-800 border-orange-200'
    },
    {
      id: 'admin',
      username: 'admin',
      password: 'admin123',
      name: 'System Administrator',
      role: 'System Admin',
      department: 'IT',
      description: 'Complete system administration and configuration',
      color: 'bg-red-100 text-red-800 border-red-200'
    }
  ];

  const features = [
    {
      icon: Users,
      title: 'Contact Management',
      description: 'Comprehensive client database with lead scoring, interaction history, and automated follow-ups'
    },
    {
      icon: BarChart3,
      title: 'Analytics Dashboard',
      description: 'Real-time performance metrics, pipeline tracking, and investment portfolio analytics'
    },
    {
      icon: MessageSquare,
      title: 'Team Messaging',
      description: 'Internal communication system with channels, direct messages, and file sharing'
    },
    {
      icon: Mail,
      title: 'Email Integration',
      description: 'Built-in email system with templates, automated responses, and client communication tracking'
    },
    {
      icon: FileText,
      title: 'Deal Management',
      description: 'Complete deal pipeline from lead to closure with document management and progress tracking'
    },
    {
      icon: Calendar,
      title: 'Activity Scheduling',
      description: 'Integrated calendar system for appointments, follow-ups, and team coordination'
    }
  ];

  const copyToClipboard = async (text: string, id: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedCredential(id);
      setTimeout(() => setCopiedCredential(null), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  const handleQuickLogin = (credentials: { username: string; password: string }) => {
    onStartDemo(credentials);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="h-12 w-12 bg-gradient-to-br from-gray-600 to-gray-700 rounded-xl flex items-center justify-center">
                <Building className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">SQ Invest Limited</h1>
                <p className="text-gray-600">CRM & Business Management System</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <div className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                ✓ Demo Ready
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Experience Our Property Investment CRM
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            A comprehensive customer relationship management system designed specifically for property investment companies. 
            Test all features with our demo accounts below.
          </p>
        </div>

        {/* Features Grid */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-gray-900 text-center mb-8">Key Features</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                <div className="flex items-center mb-4">
                  <div className="p-2 bg-gray-100 rounded-lg mr-3">
                    <feature.icon className="h-6 w-6 text-gray-700" />
                  </div>
                  <h4 className="text-lg font-semibold text-gray-900">{feature.title}</h4>
                </div>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Test Accounts */}
        <div className="mb-12">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Demo User Accounts</h3>
            <p className="text-gray-600">Choose any account below to explore different user perspectives and permissions</p>
            <div className="mt-4 flex items-center justify-center space-x-4">
              <button
                onClick={() => setShowPasswords(!showPasswords)}
                className="flex items-center space-x-2 text-sm text-gray-600 hover:text-gray-800"
              >
                {showPasswords ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                <span>{showPasswords ? 'Hide' : 'Show'} Passwords</span>
              </button>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testAccounts.map((account) => (
              <div key={account.id} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-all">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className={`inline-flex px-3 py-1 rounded-full text-xs font-medium border ${account.color} mb-2`}>
                      {account.role}
                    </div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-1">{account.name}</h4>
                    <p className="text-sm text-gray-600 mb-2">{account.department}</p>
                    <p className="text-xs text-gray-500">{account.description}</p>
                  </div>
                </div>

                <div className="space-y-3 mb-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">Username:</span>
                    <div className="flex items-center space-x-2">
                      <code className="text-sm bg-gray-100 px-2 py-1 rounded">{account.username}</code>
                      <button
                        onClick={() => copyToClipboard(account.username, `${account.id}-username`)}
                        className="p-1 hover:bg-gray-100 rounded"
                      >
                        {copiedCredential === `${account.id}-username` ? (
                          <Check className="w-4 h-4 text-green-600" />
                        ) : (
                          <Copy className="w-4 h-4 text-gray-400" />
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">Password:</span>
                    <div className="flex items-center space-x-2">
                      <code className="text-sm bg-gray-100 px-2 py-1 rounded">
                        {showPasswords ? account.password : '••••••••'}
                      </code>
                      <button
                        onClick={() => copyToClipboard(account.password, `${account.id}-password`)}
                        className="p-1 hover:bg-gray-100 rounded"
                      >
                        {copiedCredential === `${account.id}-password` ? (
                          <Check className="w-4 h-4 text-green-600" />
                        ) : (
                          <Copy className="w-4 h-4 text-gray-400" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => handleQuickLogin({ username: account.username, password: account.password })}
                  className="w-full bg-gray-800 text-white py-2 px-4 rounded-lg hover:bg-gray-900 transition-colors flex items-center justify-center group"
                >
                  <span>Login as {account.name.split(' ')[0]}</span>
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Instructions */}
        <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Testing Instructions</h3>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">What You Can Test:</h4>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                  Contact management and lead tracking
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                  Investment analytics and reporting
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                  Internal team messaging system
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                  Email management and templates
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                  Deal pipeline and task management
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Demo Features:</h4>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                  Pre-loaded sample data and contacts
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                  Role-based permissions testing
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                  Real-time messaging between accounts
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                  Full responsive design testing
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                  Complete workflow demonstrations
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-12 pt-8 border-t border-gray-200">
          <p className="text-gray-600">
            <Shield className="w-4 h-4 inline mr-1" />
            This is a demo environment. All data is for testing purposes only.
          </p>
          <p className="text-sm text-gray-500 mt-2">
            © 2025 SQ Invest Limited. Professional CRM Solution.
          </p>
        </div>
      </div>
    </div>
  );
}