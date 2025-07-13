/**
 * Information page component - Company information and system documentation
 * Features company details, system status, documentation, and resources
 */

import React, { useState } from 'react';
import { Building, Users, Phone, Mail, MapPin, Globe, FileText, Settings, BarChart3, Shield, Clock, CheckCircle, AlertCircle, Info, Download, ExternalLink } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import Header from '../components/Header';

interface SystemStatus {
  service: string;
  status: 'operational' | 'degraded' | 'down';
  lastChecked: Date;
  uptime: string;
}

interface Document {
  id: string;
  title: string;
  description: string;
  category: string;
  lastUpdated: Date;
  fileSize: string;
  downloadUrl: string;
}

export default function Information() {
  const { user } = useAuth();
  const [selectedTab, setSelectedTab] = useState<'company' | 'system' | 'documents' | 'support'>('company');

  const systemStatus: SystemStatus[] = [
    {
      service: 'CRM Database',
      status: 'operational',
      lastChecked: new Date(),
      uptime: '99.9%'
    },
    {
      service: 'Email System',
      status: 'operational',
      lastChecked: new Date(),
      uptime: '99.8%'
    },
    {
      service: 'Messaging System',
      status: 'operational',
      lastChecked: new Date(),
      uptime: '99.7%'
    },
    {
      service: 'File Storage',
      status: 'operational',
      lastChecked: new Date(),
      uptime: '99.9%'
    },
    {
      service: 'Backup System',
      status: 'operational',
      lastChecked: new Date(),
      uptime: '100%'
    }
  ];

  const documents: Document[] = [
    {
      id: '1',
      title: 'User Manual',
      description: 'Complete guide to using the CRM system',
      category: 'Documentation',
      lastUpdated: new Date('2025-07-10'),
      fileSize: '2.4 MB',
      downloadUrl: '#'
    },
    {
      id: '2',
      title: 'Investment Portfolio Guidelines',
      description: 'Guidelines for property investment portfolios',
      category: 'Investment',
      lastUpdated: new Date('2025-07-08'),
      fileSize: '1.8 MB',
      downloadUrl: '#'
    },
    {
      id: '3',
      title: 'Client Onboarding Process',
      description: 'Step-by-step client onboarding procedures',
      category: 'Process',
      lastUpdated: new Date('2025-07-05'),
      fileSize: '1.2 MB',
      downloadUrl: '#'
    },
    {
      id: '4',
      title: 'Property Bond Brochure',
      description: 'Current property bond investment opportunities',
      category: 'Marketing',
      lastUpdated: new Date('2025-07-12'),
      fileSize: '3.1 MB',
      downloadUrl: '#'
    },
    {
      id: '5',
      title: 'Compliance Manual',
      description: 'Regulatory compliance and legal requirements',
      category: 'Legal',
      lastUpdated: new Date('2025-07-01'),
      fileSize: '4.2 MB',
      downloadUrl: '#'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'operational': return 'text-green-600 bg-green-100';
      case 'degraded': return 'text-yellow-600 bg-yellow-100';
      case 'down': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'operational': return <CheckCircle className="w-4 h-4" />;
      case 'degraded': return <AlertCircle className="w-4 h-4" />;
      case 'down': return <AlertCircle className="w-4 h-4" />;
      default: return <Info className="w-4 h-4" />;
    }
  };

  const tabs = [
    { id: 'company', name: 'Company Info', icon: Building },
    { id: 'system', name: 'System Status', icon: Settings },
    { id: 'documents', name: 'Documents', icon: FileText },
    { id: 'support', name: 'Support', icon: Users }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Information</h1>
          <p className="text-lg text-gray-600">Company information and system resources</p>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setSelectedTab(tab.id as any)}
                    className={`flex items-center py-4 px-1 border-b-2 font-medium text-sm ${
                      selectedTab === tab.id
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <Icon className="w-4 h-4 mr-2" />
                    {tab.name}
                  </button>
                );
              })}
            </nav>
          </div>

          <div className="p-6">
            {selectedTab === 'company' && (
              <div className="space-y-8">
                {/* Company Overview */}
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">Company Overview</h2>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="space-y-6">
                      <div className="flex items-start space-x-4">
                        <div className="w-16 h-16 bg-gradient-to-br from-gray-600 to-gray-700 rounded-xl flex items-center justify-center">
                          <Building className="h-8 w-8 text-white" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">SQ Invest Limited</h3>
                          <p className="text-gray-600">Property Investment & Development</p>
                          <p className="text-sm text-gray-500 mt-2">
                            Specialized property investment company providing comprehensive portfolio management 
                            and development opportunities across residential, commercial, and off-plan sectors.
                          </p>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-blue-50 p-4 rounded-lg">
                          <div className="text-2xl font-bold text-blue-600">£4.8M</div>
                          <div className="text-sm text-blue-700">Portfolio Value</div>
                        </div>
                        <div className="bg-green-50 p-4 rounded-lg">
                          <div className="text-2xl font-bold text-green-600">47</div>
                          <div className="text-sm text-green-700">Active Clients</div>
                        </div>
                        <div className="bg-purple-50 p-4 rounded-lg">
                          <div className="text-2xl font-bold text-purple-600">94%</div>
                          <div className="text-sm text-purple-700">Client Satisfaction</div>
                        </div>
                        <div className="bg-orange-50 p-4 rounded-lg">
                          <div className="text-2xl font-bold text-orange-600">5+</div>
                          <div className="text-sm text-orange-700">Years Experience</div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-gray-900">Contact Information</h3>
                      <div className="space-y-3">
                        <div className="flex items-center space-x-3">
                          <MapPin className="w-5 h-5 text-gray-400" />
                          <div>
                            <div className="font-medium text-gray-900">Head Office</div>
                            <div className="text-gray-600">123 Investment Street, London, EC1A 1BB</div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Phone className="w-5 h-5 text-gray-400" />
                          <div>
                            <div className="font-medium text-gray-900">Phone</div>
                            <div className="text-gray-600">+44 20 7123 4567</div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Mail className="w-5 h-5 text-gray-400" />
                          <div>
                            <div className="font-medium text-gray-900">Email</div>
                            <div className="text-gray-600">info@sqinvest.com</div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Globe className="w-5 h-5 text-gray-400" />
                          <div>
                            <div className="font-medium text-gray-900">Website</div>
                            <div className="text-gray-600">www.sqinvest.com</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Team Information */}
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">Leadership Team</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[
                      { name: 'Alex "Big Truck" Foster', role: 'Managing Director', dept: 'Leadership' },
                      { name: 'Charles "Squire" Sinclair', role: 'Senior Sales Agent', dept: 'Sales' },
                      { name: 'Ed "Top Dog" Snell', role: 'Business Development Manager', dept: 'Development' },
                      { name: 'David "Rosie" Walsh', role: 'Operations Manager', dept: 'Operations' },
                      { name: 'M1 "Gaffer"', role: 'Sales Agent', dept: 'Sales' },
                      { name: 'Simon "The Cleaner" Wilson', role: 'Property Specialist', dept: 'Property' }
                    ].map((member, index) => (
                      <div key={index} className="bg-gray-50 p-4 rounded-lg">
                        <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center mb-3">
                          <span className="text-lg font-semibold text-gray-700">
                            {member.name.charAt(0)}
                          </span>
                        </div>
                        <h3 className="font-semibold text-gray-900">{member.name}</h3>
                        <p className="text-gray-600 text-sm">{member.role}</p>
                        <p className="text-gray-500 text-xs">{member.dept}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {selectedTab === 'system' && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-900">System Status</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {systemStatus.map((service, index) => (
                    <div key={index} className="bg-gray-50 p-6 rounded-lg">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="font-semibold text-gray-900">{service.service}</h3>
                        <div className={`flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(service.status)}`}>
                          {getStatusIcon(service.status)}
                          <span className="ml-1 capitalize">{service.status}</span>
                        </div>
                      </div>
                      <div className="space-y-2 text-sm text-gray-600">
                        <div className="flex justify-between">
                          <span>Uptime:</span>
                          <span className="font-medium">{service.uptime}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Last Checked:</span>
                          <span className="font-medium">
                            {service.lastChecked.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
                    <div>
                      <h3 className="font-semibold text-green-800">All Systems Operational</h3>
                      <p className="text-green-700 text-sm">CRM is running smoothly with no reported issues.</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {selectedTab === 'documents' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-gray-900">Document Library</h2>
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                    Upload Document
                  </button>
                </div>

                <div className="grid grid-cols-1 gap-4">
                  {documents.map((doc) => (
                    <div key={doc.id} className="bg-gray-50 p-4 rounded-lg flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                          <FileText className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">{doc.title}</h3>
                          <p className="text-sm text-gray-600">{doc.description}</p>
                          <div className="flex items-center space-x-4 text-xs text-gray-500 mt-1">
                            <span>{doc.category}</span>
                            <span>•</span>
                            <span>{doc.fileSize}</span>
                            <span>•</span>
                            <span>Updated {doc.lastUpdated.toLocaleDateString()}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button className="p-2 hover:bg-gray-200 rounded-lg">
                          <Download className="w-4 h-4 text-gray-600" />
                        </button>
                        <button className="p-2 hover:bg-gray-200 rounded-lg">
                          <ExternalLink className="w-4 h-4 text-gray-600" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {selectedTab === 'support' && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-900">Support & Help</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-blue-50 p-6 rounded-lg">
                    <h3 className="font-semibold text-blue-900 mb-3">Technical Support</h3>
                    <div className="space-y-2 text-blue-800">
                      <p><strong>Email:</strong> support@sqinvest.com</p>
                      <p><strong>Phone:</strong> +44 20 7123 4568</p>
                      <p><strong>Hours:</strong> Mon-Fri 9:00-17:00</p>
                    </div>
                  </div>
                  
                  <div className="bg-green-50 p-6 rounded-lg">
                    <h3 className="font-semibold text-green-900 mb-3">Sales Support</h3>
                    <div className="space-y-2 text-green-800">
                      <p><strong>Email:</strong> sales@sqinvest.com</p>
                      <p><strong>Phone:</strong> +44 20 7123 4569</p>
                      <p><strong>Hours:</strong> Mon-Fri 8:00-18:00</p>
                    </div>
                  </div>
                  
                  <div className="bg-purple-50 p-6 rounded-lg">
                    <h3 className="font-semibold text-purple-900 mb-3">Quick Help</h3>
                    <div className="space-y-1 text-purple-800">
                      <p>• Press F1 for keyboard shortcuts</p>
                      <p>• Use search (Ctrl+K) to find anything</p>
                      <p>• Contact your admin for permissions</p>
                    </div>
                  </div>
                  
                  <div className="bg-orange-50 p-6 rounded-lg">
                    <h3 className="font-semibold text-orange-900 mb-3">System Admin</h3>
                    <div className="space-y-2 text-orange-800">
                      <p><strong>Admin:</strong> {user?.name}</p>
                      <p><strong>Role:</strong> {user?.role}</p>
                      <p><strong>Department:</strong> {user?.department}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
