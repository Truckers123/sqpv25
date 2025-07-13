/**
 * Header component - Executive dashboard header with personalized information
 * Features live time, personalized greeting, and upcoming events
 */

import React, { useState, useEffect } from 'react';
import { Bell, Users, BarChart3, Calendar, CheckSquare, Mail, Menu, X, LogOut, User, Building, MessageSquare, FileText, Settings, Star } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router';
import { useAuth } from '../contexts/AuthContext';


export default function Header() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-GB', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-GB', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const navigationItems = [
    { name: 'Dashboard', path: '/', icon: BarChart3 },
    { name: 'Contacts', path: '/contacts', icon: Users },
    { name: 'Tasks', path: '/tasks', icon: CheckSquare },
    { name: 'Calendar', path: '/calendar', icon: Calendar },
    { name: 'Information', path: '/information', icon: FileText },
    { name: 'Messages', path: '/messages', icon: MessageSquare },
    { name: 'Email', path: '/email', icon: Mail },
    { name: 'Settings', path: '/settings', icon: Settings },
    { name: 'Feedback', path: '/feedback', icon: Star }
  ];

  return (
    <header className="bg-gradient-to-r from-gray-700 via-gray-800 to-gray-900 text-white shadow-lg">
      {/* Top Row - Company Info, User Info, Time */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Company Info */}
          <div className="flex-1">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-gray-500 to-gray-600 rounded-lg flex items-center justify-center">
                <Building className="w-4 h-4 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">SQ Invest Limited</h1>
                <p className="text-gray-300 text-xs">CRM & Business Management</p>
              </div>
            </div>
          </div>

          {/* User Info */}
          <div className="flex-1 text-center">
            <div className="text-white">
              <h2 className="text-lg font-semibold">{user?.name}</h2>
              <p className="text-gray-300 text-xs">{user?.role}</p>
            </div>
          </div>

          {/* Time and Event Info */}
          <div className="flex-1 text-right">
            <div className="text-white">
              <div className="text-base font-semibold">{formatTime(currentTime)}</div>
              <div className="text-xs text-gray-300">{formatDate(currentTime)}</div>
              
              {/* Upcoming Event */}
              <div className="mt-1 inline-flex items-center bg-gray-600 text-white px-2 py-1 rounded-full text-xs font-medium">
                <Bell className="w-3 h-3 mr-1" />
                SQ Launch - 4 days!
              </div>
            </div>
            
            {/* User Menu */}
            <div className="relative ml-4">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center space-x-2 text-white hover:text-gray-300 focus:outline-none"
              >
                <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center">
                  <User className="w-4 h-4" />
                </div>
              </button>
              
              {showUserMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                  <div className="px-4 py-2 text-sm text-gray-700 border-b">
                    <div className="font-medium">{user?.name}</div>
                    <div className="text-xs text-gray-500">{user?.role}</div>
                  </div>
                  <button
                    onClick={() => {
                      logout();
                      setShowUserMenu(false);
                    }}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Sign out
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden ml-4">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-white hover:text-gray-300 focus:outline-none"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Row - Navigation */}
      <div className="border-t border-gray-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="hidden md:flex space-x-8 h-12 items-center justify-center">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <button
                  key={item.name}
                  onClick={() => navigate(item.path)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors font-medium ${
                    isActive 
                      ? 'bg-white/20 text-white shadow-md' 
                      : 'text-gray-300 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="text-sm">{item.name}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-gray-600 bg-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav className="flex flex-col space-y-1 py-4">
              {navigationItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                return (
                  <button
                    key={item.name}
                    onClick={() => {
                      navigate(item.path);
                      setIsMobileMenuOpen(false);
                    }}
                    className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors text-left ${
                      isActive 
                        ? 'bg-white/20 text-white' 
                        : 'text-gray-300 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="text-sm font-medium">{item.name}</span>
                  </button>
                );
              })}
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
