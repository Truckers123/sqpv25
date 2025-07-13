/**
 * Login page component - User authentication and access control
 * Features secure login with role-based access and professional design
 */

import React, { useState } from 'react';
import { Eye, EyeOff, Lock, User, Building, AlertCircle, CheckCircle } from 'lucide-react';

interface LoginUser {
  id: string;
  username: string;
  password: string;
  name: string;
  role: string;
  department: string;
  avatar?: string;
  permissions: string[];
  lastLogin?: string;
  status: 'active' | 'inactive';
}

interface LoginProps {
  onLogin: (user: LoginUser) => void;
}

export default function Login({ onLogin }: LoginProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);


  // Mock users database
  const users: LoginUser[] = [
    {
      id: '1',
      username: 'truckers',
      password: 'truckers123',
      name: 'Alex "Big Truck" Foster',
      role: 'Managing Director',
      department: 'Management',
      permissions: ['all_access', 'admin', 'reports', 'deals', 'contacts', 'analytics'],
      status: 'active',
      lastLogin: '2025-07-10 14:30'
    },
    {
      id: '2',
      username: 'squire',
      password: 'squire123',
      name: 'Squire',
      role: 'Senior Sales Agent',
      department: 'Sales',
      permissions: ['contacts', 'deals', 'reports', 'calendar', 'documents'],
      status: 'active',
      lastLogin: '2025-07-10 09:15'
    },
    {
      id: '3',
      username: 'm1',
      password: 'm1123',
      name: 'M1',
      role: 'Sales Agent',
      department: 'Sales',
      permissions: ['contacts', 'deals', 'calendar', 'documents'],
      status: 'active',
      lastLogin: '2025-07-10 08:45'
    },
    {
      id: '4',
      username: 'ed',
      password: 'ed123',
      name: 'Ed',
      role: 'Business Development Manager',
      department: 'Business Development',
      permissions: ['contacts', 'deals', 'reports', 'calendar', 'documents', 'analytics'],
      status: 'active',
      lastLogin: '2025-07-09 16:20'
    },
    {
      id: '5',
      username: 'admin',
      password: 'admin123',
      name: 'System Administrator',
      role: 'System Admin',
      department: 'IT',
      permissions: ['all_access', 'admin', 'system_config', 'user_management'],
      status: 'active',
      lastLogin: '2025-07-10 07:00'
    }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    const user = users.find(u => u.username === username && u.password === password);
    
    if (user) {
      if (user.status === 'active') {
        // Update last login time
        user.lastLogin = new Date().toISOString();
        onLogin(user);
      } else {
        setError('Account is inactive. Please contact your administrator.');
      }
    } else {
      setError('Invalid username or password. Please try again.');
    }
    
    setIsLoading(false);
  };



  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-800 via-gray-700 to-gray-800 flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <div className="mx-auto h-20 w-20 bg-gradient-to-br from-gray-500 to-gray-600 rounded-xl flex items-center justify-center mb-6">
            <Building className="h-10 w-10 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-white">SQ Invest Limited</h2>
          <p className="mt-2 text-gray-300">CRM & Business Management System</p>
          <div className="mt-4 inline-flex items-center px-3 py-1 rounded-full text-sm bg-green-900 text-green-200 border border-green-700">
            <CheckCircle className="w-4 h-4 mr-2" />
            System Online
          </div>
        </div>

        {/* Login Form */}
        <div className="bg-white rounded-xl shadow-2xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
                Username
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="username"
                  name="username"
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your username"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex items-center text-red-700">
                <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0" />
                <span className="text-sm">{error}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-gray-600 to-gray-700 text-white py-3 px-4 rounded-lg font-medium hover:from-gray-700 hover:to-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Signing in...
                </div>
              ) : (
                'Sign in'
              )}
            </button>
          </form>


        </div>

        {/* Footer */}
        <div className="text-center text-gray-400 text-sm">
          <p>© 2025 SQ Invest Limited. All rights reserved.</p>
          <p className="mt-1">Secure business management platform</p>
        </div>
      </div>
    </div>
  );
}
