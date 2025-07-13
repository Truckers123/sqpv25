/**
 * Settings page component - System administration and user management
 * Features role-based access control, user management, and system configuration
 */

import React, { useState } from 'react';
import { Settings as SettingsIcon, Users, Shield, Key, Database, Bell, Lock, Eye, EyeOff, Trash2, Edit, Plus, UserPlus, AlertTriangle, CheckCircle, X, Save, RotateCcw, Download, Upload, Activity, BarChart3, Globe, Smartphone, Mail } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useUserData } from '../contexts/UserDataContext';
import Header from '../components/Header';

interface LoginUser {
  id: string;
  username: string;
  password: string;
  name: string;
  role: string;
  department: string;
  permissions: string[];
  accessLevel: 'board' | 'management' | 'sales' | 'administration' | 'technical_operations';
  status: 'active' | 'inactive';
  canDelete: boolean;
  requiresTwoFA: boolean;
}

interface SystemUser {
  id: string;
  username: string;
  name: string;
  email: string;
  role: string;
  department: string;
  accessLevel: 'board' | 'management' | 'sales' | 'administration' | 'technical_operations';
  status: 'active' | 'inactive' | 'suspended';
  lastLogin: string;
  createdAt: string;
  permissions: string[];
  canDelete: boolean;
  requiresTwoFA: boolean;
  avatar?: string;
}

interface TwoFARequest {
  id: string;
  requestedBy: string;
  requestedByName: string;
  action: string;
  targetUser?: string;
  targetRecord?: string;
  timestamp: string;
  status: 'pending' | 'approved' | 'denied';
  approvedBy?: string;
  reason: string;
}

interface SystemSettings {
  companyName: string;
  allowUserRegistration: boolean;
  requireEmailVerification: boolean;
  sessionTimeout: number;
  maxLoginAttempts: number;
  passwordMinLength: number;
  requireStrongPasswords: boolean;
  enableTwoFA: boolean;
  backupFrequency: 'daily' | 'weekly' | 'monthly';
  dataRetentionDays: number;
  auditLogRetention: number;
}

export default function Settings() {
  const { user, updateUser } = useAuth();
  const { systemUsers, updateSystemUser, deleteSystemUser } = useUserData();
  const [selectedTab, setSelectedTab] = useState<'users' | 'roles' | 'system' | 'security' | 'audit'>('users');
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [showEditUserModal, setShowEditUserModal] = useState(false);
  const [showTwoFAModal, setShowTwoFAModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<SystemUser | null>(null);
  const [editingUser, setEditingUser] = useState<SystemUser | null>(null);
  const [twoFACode, setTwoFACode] = useState('');
  const [pendingAction, setPendingAction] = useState<string>('');

  // Check if current user has access to settings
  const hasSettingsAccess = user?.accessLevel && ['board', 'management', 'administration'].includes(user.accessLevel);
  const isBoardLevel = user?.accessLevel === 'board';
  const isAdminLevel = user?.accessLevel === 'administration';



  const [twoFARequests] = useState<TwoFARequest[]>([
    {
      id: '1',
      requestedBy: 'techops',
      requestedByName: 'Michael Tech',
      action: 'Delete contact record',
      targetRecord: 'Contact: John Smith',
      timestamp: '2025-07-13 02:00:00',
      status: 'pending',
      reason: 'GDPR deletion request'
    }
  ]);

  const [systemSettings, setSystemSettings] = useState<SystemSettings>({
    companyName: 'SQ Property Ventures Limited',
    allowUserRegistration: false,
    requireEmailVerification: true,
    sessionTimeout: 480, // 8 hours
    maxLoginAttempts: 5,
    passwordMinLength: 8,
    requireStrongPasswords: true,
    enableTwoFA: true,
    backupFrequency: 'daily',
    dataRetentionDays: 2555, // 7 years
    auditLogRetention: 365
  });

  const getAccessLevelColor = (level: string) => {
    switch (level) {
      case 'board': return 'bg-red-100 text-red-800 border-red-200';
      case 'management': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'sales': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'administration': return 'bg-green-100 text-green-800 border-green-200';
      case 'technical_operations': return 'bg-orange-100 text-orange-800 border-orange-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'inactive': return 'bg-gray-100 text-gray-800';
      case 'suspended': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleDeleteUser = (userId: string) => {
    if (!isBoardLevel) {
      alert('Only Board Level users can delete user accounts');
      return;
    }
    
    if (window.confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
      // Remove user from the shared UserData context
      deleteSystemUser(userId);
      // Here you would typically also delete from your backend
      alert('User deleted successfully');
    }
  };

  const handleEditUser = (user: SystemUser) => {
    if (!isBoardLevel && !isAdminLevel) {
      alert('Only Board Level and Administration users can edit user accounts');
      return;
    }
    setEditingUser({...user});
    setShowEditUserModal(true);
  };

  const handleSaveUser = () => {
    if (!editingUser) return;
    
    console.log('⚙️ Settings: About to save user:', editingUser);
    
    // If editing the current logged-in user, update AuthContext too FIRST
    if (user && editingUser.id === user.id) {
      const updatedAuthUser: LoginUser = {
        id: editingUser.id,
        username: editingUser.username,
        password: user.password, // Keep existing password
        name: editingUser.name,
        role: editingUser.role,
        department: editingUser.department,
        permissions: editingUser.permissions,
        accessLevel: editingUser.accessLevel,
        status: editingUser.status,
        canDelete: editingUser.canDelete,
        requiresTwoFA: editingUser.requiresTwoFA
      };
      console.log('🔄 Settings: Updating AuthContext user first:', updatedAuthUser.name);
      updateUser(updatedAuthUser);
    }
    
    // Then update the user in the shared UserData context
    updateSystemUser(editingUser);
    
    // Here you would typically also save to your backend
    console.log('Saving user:', editingUser);
    alert('User updated successfully!');
    setShowEditUserModal(false);
    setEditingUser(null);
  };

  const handleTwoFAAction = (action: string) => {
    setPendingAction(action);
    setShowTwoFAModal(true);
  };

  const handleTwoFASubmit = () => {
    if (twoFACode === '123456') { // Demo code
      alert(`2FA verified. ${pendingAction} completed.`);
      setShowTwoFAModal(false);
      setTwoFACode('');
      setPendingAction('');
    } else {
      alert('Invalid 2FA code');
    }
  };

  if (!hasSettingsAccess) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
            <AlertTriangle className="w-12 h-12 text-red-500 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-red-900 mb-2">Access Denied</h2>
            <p className="text-red-700">You don't have permission to access the Settings page.</p>
            <p className="text-red-600 text-sm mt-2">Contact your administrator for access.</p>
          </div>
        </main>
      </div>
    );
  }

  const tabs = [
    { id: 'users', name: 'User Management', icon: Users, requiresLevel: ['board', 'administration'] },
    { id: 'roles', name: 'Roles & Permissions', icon: Shield, requiresLevel: ['board'] },
    { id: 'system', name: 'System Settings', icon: SettingsIcon, requiresLevel: ['board', 'administration'] },
    { id: 'security', name: 'Security', icon: Lock, requiresLevel: ['board', 'administration'] },
    { id: 'audit', name: 'Audit Log', icon: Activity, requiresLevel: ['board', 'administration'] }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 flex items-center">
            <SettingsIcon className="w-8 h-8 mr-3 text-blue-600" />
            Settings & Administration
          </h1>
          <p className="text-lg text-gray-600">System configuration and user management</p>
          <div className="mt-2 flex items-center">
            <span className="text-sm text-gray-500">Your Access Level: </span>
            <span className={`ml-2 px-3 py-1 rounded-full text-xs font-medium border ${getAccessLevelColor(user?.accessLevel || '')}`}>
              {user?.accessLevel?.replace('_', ' ').toUpperCase()}
            </span>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                const hasAccess = tab.requiresLevel.includes(user?.accessLevel || '');
                return (
                  <button
                    key={tab.id}
                    onClick={() => hasAccess && setSelectedTab(tab.id as any)}
                    disabled={!hasAccess}
                    className={`flex items-center py-4 px-1 border-b-2 font-medium text-sm ${
                      selectedTab === tab.id
                        ? 'border-blue-500 text-blue-600'
                        : hasAccess 
                          ? 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                          : 'border-transparent text-gray-300 cursor-not-allowed'
                    }`}
                  >
                    <Icon className="w-4 h-4 mr-2" />
                    {tab.name}
                    {!hasAccess && <Lock className="w-3 h-3 ml-1" />}
                  </button>
                );
              })}
            </nav>
          </div>

          <div className="p-6">
            {selectedTab === 'users' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-gray-900">User Management</h2>
                  {isBoardLevel && (
                    <button
                      onClick={() => setShowAddUserModal(true)}
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center"
                    >
                      <UserPlus className="w-4 h-4 mr-2" />
                      Add User
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 gap-4">
                  {systemUsers.map(user => (
                    <div key={user.id} className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                            <span className="text-sm font-semibold text-gray-700">
                              {user.name.charAt(0)}
                            </span>
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-900">{user.name}</h3>
                            <p className="text-sm text-gray-600">{user.role} • {user.department}</p>
                            <p className="text-xs text-gray-500">{user.email}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-3">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getAccessLevelColor(user.accessLevel)}`}>
                            {user.accessLevel.replace('_', ' ').toUpperCase()}
                          </span>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(user.status)}`}>
                            {user.status}
                          </span>
                          
                          {(isBoardLevel || isAdminLevel) && (
                            <div className="flex space-x-1">
                              <button 
                                onClick={() => handleEditUser(user)}
                                className="p-1 hover:bg-gray-200 rounded"
                                title="Edit User"
                              >
                                <Edit className="w-4 h-4 text-gray-600" />
                              </button>
                              {isBoardLevel && (
                                <button 
                                  onClick={() => handleDeleteUser(user.id)}
                                  className="p-1 hover:bg-red-100 rounded"
                                  title="Delete User"
                                >
                                  <Trash2 className="w-4 h-4 text-red-600" />
                                </button>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                      
                      <div className="mt-3 grid grid-cols-2 md:grid-cols-4 gap-4 text-xs text-gray-600">
                        <div>
                          <span className="font-medium">Last Login:</span>
                          <br />{user.lastLogin}
                        </div>
                        <div>
                          <span className="font-medium">Created:</span>
                          <br />{user.createdAt}
                        </div>
                        <div>
                          <span className="font-medium">2FA:</span>
                          <br />{user.requiresTwoFA ? 'Enabled' : 'Disabled'}
                        </div>
                        <div>
                          <span className="font-medium">Can Delete:</span>
                          <br />{user.canDelete ? 'Yes' : 'No'}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {selectedTab === 'roles' && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-900">Access Levels & Permissions</h2>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {[
                    {
                      level: 'board',
                      name: 'Board Level',
                      description: 'Full system access including user deletion and system configuration',
                      permissions: ['All system access', 'Delete any records', 'User management', 'System configuration', 'Financial reports', 'Audit logs'],
                      color: 'red'
                    },
                    {
                      level: 'management',
                      name: 'Management',
                      description: 'Comprehensive access except deletion and critical system changes',
                      permissions: ['View all records', 'Edit all records', 'Team management', 'Reports access', 'Client communication'],
                      color: 'purple'
                    },
                    {
                      level: 'sales',
                      name: 'Sales',
                      description: 'Access limited to own clients and prospects',
                      permissions: ['View own contacts', 'Edit own contacts', 'Create deals', 'Schedule meetings', 'Basic reports'],
                      color: 'blue'
                    },
                    {
                      level: 'administration',
                      name: 'Administration',
                      description: 'System administration and user management capabilities',
                      permissions: ['User management', 'System settings', 'Backup/restore', 'Security settings', 'Audit access'],
                      color: 'green'
                    },
                    {
                      level: 'technical_operations',
                      name: 'Technical Operations',
                      description: 'High-level data access with 2FA requirements for deletions',
                      permissions: ['Data management', 'System maintenance', 'Import/export', 'Technical support', '2FA for deletions'],
                      color: 'orange'
                    }
                  ].map((role) => (
                    <div key={role.level} className={`bg-${role.color}-50 border border-${role.color}-200 rounded-lg p-4`}>
                      <h3 className={`font-semibold text-${role.color}-900 mb-2`}>{role.name}</h3>
                      <p className={`text-sm text-${role.color}-700 mb-3`}>{role.description}</p>
                      <div className="space-y-1">
                        {role.permissions.map((permission, idx) => (
                          <div key={idx} className="flex items-center text-xs">
                            <CheckCircle className={`w-3 h-3 text-${role.color}-600 mr-2`} />
                            <span className={`text-${role.color}-800`}>{permission}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {selectedTab === 'security' && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-900">Security Settings</h2>
                
                {/* 2FA Requests */}
                {twoFARequests.length > 0 && (
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <h3 className="font-semibold text-yellow-900 mb-3 flex items-center">
                      <Key className="w-4 h-4 mr-2" />
                      Pending 2FA Approvals
                    </h3>
                    {twoFARequests.map(request => (
                      <div key={request.id} className="bg-white p-3 rounded border border-yellow-200 flex items-center justify-between">
                        <div>
                          <p className="font-medium text-gray-900">{request.action}</p>
                          <p className="text-sm text-gray-600">Requested by: {request.requestedByName}</p>
                          <p className="text-xs text-gray-500">Reason: {request.reason}</p>
                        </div>
                        {isBoardLevel && (
                          <div className="flex space-x-2">
                            <button className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700">
                              Approve
                            </button>
                            <button className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700">
                              Deny
                            </button>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {/* Security Settings */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-gray-900 mb-3">Authentication Settings</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-700">Require Email Verification</span>
                        <input type="checkbox" checked={systemSettings.requireEmailVerification} className="rounded" />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-700">Enable Two-Factor Authentication</span>
                        <input type="checkbox" checked={systemSettings.enableTwoFA} className="rounded" />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-700">Session Timeout (minutes)</span>
                        <input type="number" value={systemSettings.sessionTimeout} className="w-20 px-2 py-1 border rounded text-sm" />
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-gray-900 mb-3">Password Policy</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-700">Minimum Length</span>
                        <input type="number" value={systemSettings.passwordMinLength} className="w-16 px-2 py-1 border rounded text-sm" />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-700">Require Strong Passwords</span>
                        <input type="checkbox" checked={systemSettings.requireStrongPasswords} className="rounded" />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-700">Max Login Attempts</span>
                        <input type="number" value={systemSettings.maxLoginAttempts} className="w-16 px-2 py-1 border rounded text-sm" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {selectedTab === 'audit' && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-900">Audit Log</h2>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-3">Recent System Activity</h3>
                  <div className="space-y-2">
                    {[
                      { action: 'User Login', user: 'Alex Foster', timestamp: '2025-07-13 03:45:00', type: 'info' },
                      { action: 'Contact Updated', user: 'Charles Sinclair', timestamp: '2025-07-13 03:30:00', type: 'info' },
                      { action: 'Failed Login Attempt', user: 'Unknown', timestamp: '2025-07-13 03:15:00', type: 'warning' },
                      { action: 'User Created', user: 'Sarah Admin', timestamp: '2025-07-13 02:45:00', type: 'success' },
                      { action: '2FA Request', user: 'Michael Tech', timestamp: '2025-07-13 02:00:00', type: 'warning' }
                    ].map((log, idx) => (
                      <div key={idx} className="flex items-center justify-between bg-white p-2 rounded border">
                        <div className="flex items-center space-x-3">
                          <div className={`w-2 h-2 rounded-full ${
                            log.type === 'success' ? 'bg-green-500' :
                            log.type === 'warning' ? 'bg-yellow-500' :
                            log.type === 'error' ? 'bg-red-500' : 'bg-blue-500'
                          }`}></div>
                          <span className="text-sm font-medium text-gray-900">{log.action}</span>
                          <span className="text-sm text-gray-600">by {log.user}</span>
                        </div>
                        <span className="text-xs text-gray-500">{log.timestamp}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Edit User Modal */}
        {showEditUserModal && editingUser && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-900 flex items-center">
                  <Edit className="w-5 h-5 mr-2 text-blue-500" />
                  Edit User: {editingUser.name}
                </h2>
                <button
                  onClick={() => setShowEditUserModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                    <input
                      type="text"
                      value={editingUser.name}
                      onChange={(e) => setEditingUser({...editingUser, name: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
                    <input
                      type="text"
                      value={editingUser.username}
                      onChange={(e) => setEditingUser({...editingUser, username: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input
                      type="email"
                      value={editingUser.email}
                      onChange={(e) => setEditingUser({...editingUser, email: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                    <input
                      type="text"
                      value={editingUser.role}
                      onChange={(e) => setEditingUser({...editingUser, role: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
                    <input
                      type="text"
                      value={editingUser.department}
                      onChange={(e) => setEditingUser({...editingUser, department: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Access Level</label>
                    <select
                      value={editingUser.accessLevel}
                      onChange={(e) => setEditingUser({...editingUser, accessLevel: e.target.value as any})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      disabled={!isBoardLevel}
                    >
                      <option value="board">Board Level</option>
                      <option value="management">Management</option>
                      <option value="sales">Sales</option>
                      <option value="administration">Administration</option>
                      <option value="technical_operations">Technical Operations</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                    <select
                      value={editingUser.status}
                      onChange={(e) => setEditingUser({...editingUser, status: e.target.value as any})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                      <option value="suspended">Suspended</option>
                    </select>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={editingUser.requiresTwoFA}
                        onChange={(e) => setEditingUser({...editingUser, requiresTwoFA: e.target.checked})}
                        className="mr-2 rounded"
                      />
                      <span className="text-sm text-gray-700">Requires 2FA</span>
                    </label>
                    
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={editingUser.canDelete}
                        onChange={(e) => setEditingUser({...editingUser, canDelete: e.target.checked})}
                        className="mr-2 rounded"
                        disabled={!isBoardLevel}
                      />
                      <span className="text-sm text-gray-700">Can Delete Records</span>
                    </label>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Permissions</label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {['contacts_view', 'contacts_edit', 'deals_view', 'deals_edit', 'reports_view', 'user_management', 'system_config', 'all_access'].map(permission => (
                      <label key={permission} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={editingUser.permissions.includes(permission)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setEditingUser({
                                ...editingUser,
                                permissions: [...editingUser.permissions, permission]
                              });
                            } else {
                              setEditingUser({
                                ...editingUser,
                                permissions: editingUser.permissions.filter(p => p !== permission)
                              });
                            }
                          }}
                          className="mr-2 rounded text-xs"
                        />
                        <span className="text-xs text-gray-700">{permission.replace('_', ' ')}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={() => setShowEditUserModal(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveUser}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center"
                >
                  <Save className="w-4 h-4 mr-2" />
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        )}

        {/* 2FA Modal */}
        {showTwoFAModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-900 flex items-center">
                  <Key className="w-5 h-5 mr-2 text-blue-500" />
                  Two-Factor Authentication
                </h2>
                <button
                  onClick={() => setShowTwoFAModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="space-y-4">
                <p className="text-gray-700">Enter your 2FA code to confirm: {pendingAction}</p>
                <input
                  type="text"
                  value={twoFACode}
                  onChange={(e) => setTwoFACode(e.target.value)}
                  placeholder="Enter 6-digit code"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-center text-lg"
                  maxLength={6}
                />
                <p className="text-xs text-gray-500">Demo code: 123456</p>
              </div>
              
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={() => setShowTwoFAModal(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleTwoFASubmit}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Verify & Proceed
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
