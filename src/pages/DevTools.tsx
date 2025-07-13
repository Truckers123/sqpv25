/**
 * Development Tools page - Hidden page for testing and development items
 * Access via /devtools (not linked in navigation)
 */

import React, { useState } from 'react';
import { Settings, Bug, Database, Zap, RefreshCw, Trash2, Download, Upload, AlertTriangle, CheckCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useUserData } from '../contexts/UserDataContext';
import Header from '../components/Header';
import DynamicLeaderboard from '../components/DynamicLeaderboard';

export default function DevTools() {
  const { user } = useAuth();
  const { systemUsers, updateSystemUser } = useUserData();
  const [refreshKey, setRefreshKey] = useState(0);
  const [debugOutput, setDebugOutput] = useState<string[]>([]);

  const addDebugOutput = (message: string) => {
    const timestamp = new Date().toLocaleTimeString();
    setDebugOutput(prev => [`[${timestamp}] ${message}`, ...prev.slice(0, 9)]);
  };

  const handleLeaderboardClick = (name: string) => {
    addDebugOutput(`Leaderboard clicked: ${name}`);
  };

  const testLeaderboardUpdate = () => {
    const firstUser = systemUsers[0];
    if (firstUser) {
      const newName = `${firstUser.name} (TEST-${Date.now()})`;
      updateSystemUser({
        ...firstUser,
        name: newName
      });
      addDebugOutput(`Updated first user name to: ${newName}`);
      setRefreshKey(prev => prev + 1);
    }
  };

  const clearLocalStorage = () => {
    localStorage.clear();
    addDebugOutput('Cleared all localStorage');
    alert('localStorage cleared! Refresh to reset to defaults.');
  };

  const exportData = () => {
    const data = {
      systemUsers,
      timestamp: new Date().toISOString(),
      user: user?.username
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `crm-data-${Date.now()}.json`;
    a.click();
    addDebugOutput('Data exported to file');
  };

  const forceRefresh = () => {
    setRefreshKey(prev => prev + 1);
    addDebugOutput('Forced component refresh');
  };

  const showSystemInfo = () => {
    addDebugOutput(`System Users: ${systemUsers.length}`);
    addDebugOutput(`Current User: ${user?.name}`);
    addDebugOutput(`First User: ${systemUsers[0]?.name}`);
    addDebugOutput(`localStorage keys: ${Object.keys(localStorage).length}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center">
                <Bug className="w-8 h-8 mr-3 text-red-600" />
                Development Tools
              </h1>
              <p className="text-lg text-gray-600">Hidden page for testing and development</p>
            </div>
            <div className="bg-red-100 border border-red-300 rounded-lg px-4 py-2">
              <p className="text-red-800 text-sm font-medium">🔒 Hidden Page</p>
              <p className="text-red-600 text-xs">Not linked in navigation</p>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <button
            onClick={testLeaderboardUpdate}
            className="bg-blue-600 text-white p-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center"
          >
            <Zap className="w-5 h-5 mr-2" />
            Test Leaderboard Update
          </button>
          
          <button
            onClick={forceRefresh}
            className="bg-green-600 text-white p-4 rounded-lg hover:bg-green-700 transition-colors flex items-center"
          >
            <RefreshCw className="w-5 h-5 mr-2" />
            Force Refresh
          </button>
          
          <button
            onClick={showSystemInfo}
            className="bg-purple-600 text-white p-4 rounded-lg hover:bg-purple-700 transition-colors flex items-center"
          >
            <Database className="w-5 h-5 mr-2" />
            Show System Info
          </button>
          
          <button
            onClick={exportData}
            className="bg-orange-600 text-white p-4 rounded-lg hover:bg-orange-700 transition-colors flex items-center"
          >
            <Download className="w-5 h-5 mr-2" />
            Export Data
          </button>
        </div>

        {/* Debug Output */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <AlertTriangle className="w-5 h-5 mr-2 text-yellow-500" />
              Debug Output
            </h2>
            <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm max-h-96 overflow-y-auto">
              {debugOutput.length === 0 ? (
                <p className="text-gray-500">No debug output yet...</p>
              ) : (
                debugOutput.map((line, idx) => (
                  <div key={idx} className="mb-1">{line}</div>
                ))
              )}
            </div>
          </div>

          {/* Test Leaderboard */}
          <DynamicLeaderboard 
            refreshKey={refreshKey} 
            onLeaderboardClick={handleLeaderboardClick} 
          />
        </div>

        {/* System Information */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">System Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-2">Current User</h3>
              <p className="text-sm text-gray-600">Name: {user?.name}</p>
              <p className="text-sm text-gray-600">Role: {user?.role}</p>
              <p className="text-sm text-gray-600">Access: {user?.accessLevel}</p>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-2">System Users</h3>
              <p className="text-sm text-gray-600">Total: {systemUsers.length}</p>
              <p className="text-sm text-gray-600">Active: {systemUsers.filter(u => u.status === 'active').length}</p>
              <p className="text-sm text-gray-600">Board Level: {systemUsers.filter(u => u.accessLevel === 'board').length}</p>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-2">Storage</h3>
              <p className="text-sm text-gray-600">localStorage keys: {Object.keys(localStorage).length}</p>
              <p className="text-sm text-gray-600">CRM data: {localStorage.getItem('sq-crm-system-users') ? 'Stored' : 'Missing'}</p>
              <button
                onClick={clearLocalStorage}
                className="mt-2 bg-red-600 text-white px-3 py-1 rounded text-xs hover:bg-red-700 flex items-center"
              >
                <Trash2 className="w-3 h-3 mr-1" />
                Clear Storage
              </button>
            </div>
          </div>
        </div>

        {/* Known Issues & Tasks */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
          <h2 className="text-xl font-semibold text-yellow-900 mb-4">Known Issues & Development Tasks</h2>
          <div className="space-y-2">
            <div className="flex items-start">
              <AlertTriangle className="w-4 h-4 text-yellow-600 mr-2 mt-0.5" />
              <span className="text-yellow-800">Leaderboard not updating with user name changes (deprioritized)</span>
            </div>
            <div className="flex items-start">
              <CheckCircle className="w-4 h-4 text-green-600 mr-2 mt-0.5" />
              <span className="text-gray-700">User data context working correctly</span>
            </div>
            <div className="flex items-start">
              <CheckCircle className="w-4 h-4 text-green-600 mr-2 mt-0.5" />
              <span className="text-gray-700">Settings page functional</span>
            </div>
            <div className="flex items-start">
              <AlertTriangle className="w-4 h-4 text-yellow-600 mr-2 mt-0.5" />
              <span className="text-yellow-800">Need to implement user feedback system</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
