/**
 * Tasks page component - Task management and assignment system
 * Features task creation, assignment, tracking, and completion
 */

import React, { useState } from 'react';
import { CheckCircle, Clock, Users, Plus, Filter, Search, Calendar as CalendarIcon, Flag, MoreVertical, Edit, Trash2 } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import Header from '../components/Header';

interface Task {
  id: string;
  title: string;
  description: string;
  assignee: string;
  assigneeAvatar?: string;
  dueDate: Date;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'pending' | 'in-progress' | 'completed';
  category: string;
  tags: string[];
  createdBy: string;
  createdAt: Date;
  completedAt?: Date;
  relatedContact?: string;
}

export default function Tasks() {
  const { user } = useAuth();
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [isCreating, setIsCreating] = useState(false);

  const [tasks] = useState<Task[]>([
    {
      id: '1',
      title: 'Follow up with Emma Davies',
      description: 'Initial consultation for residential property investment',
      assignee: 'Truckers',
      dueDate: new Date('2025-07-13T14:00:00'),
      priority: 'urgent',
      status: 'pending',
      category: 'Sales',
      tags: ['follow-up', 'new-lead'],
      createdBy: 'System',
      createdAt: new Date('2025-07-11T09:00:00'),
      relatedContact: 'Emma Davies'
    },
    {
      id: '2',
      title: 'Prepare presentation for James Anderson',
      description: 'Off-plan development portfolio for high-value client',
      assignee: 'Charles "Squire" Sinclair',
      dueDate: new Date('2025-07-14T10:00:00'),
      priority: 'high',
      status: 'in-progress',
      category: 'Presentations',
      tags: ['presentation', 'off-plan', 'high-value'],
      createdBy: 'Truckers',
      createdAt: new Date('2025-07-10T15:30:00'),
      relatedContact: 'James Anderson'
    },
    {
      id: '3',
      title: 'Review legal contracts',
      description: 'David Wilson student property deal documentation',
      assignee: 'Ed "Top Dog" Snell',
      dueDate: new Date('2025-07-14T15:00:00'),
      priority: 'medium',
      status: 'pending',
      category: 'Legal',
      tags: ['contracts', 'legal', 'student-property'],
      createdBy: 'David "Rosie" Walsh',
      createdAt: new Date('2025-07-11T11:00:00'),
      relatedContact: 'David Wilson'
    },
    {
      id: '4',
      title: 'Weekly team meeting',
      description: 'Sales performance review and pipeline discussion',
      assignee: 'All Team',
      dueDate: new Date('2025-07-18T09:00:00'),
      priority: 'medium',
      status: 'pending',
      category: 'Meetings',
      tags: ['team', 'weekly', 'review'],
      createdBy: 'Truckers',
      createdAt: new Date('2025-07-11T16:00:00')
    },
    {
      id: '5',
      title: 'Update CRM system',
      description: 'Import new property listings and update client records',
      assignee: 'M1 "Gaffer"',
      dueDate: new Date('2025-07-21T17:00:00'),
      priority: 'low',
      status: 'pending',
      category: 'Administration',
      tags: ['crm', 'data', 'maintenance'],
      createdBy: 'Ed "Top Dog" Snell',
      createdAt: new Date('2025-07-12T08:00:00')
    },
    {
      id: '6',
      title: 'Complete website updates',
      description: 'Launch new property bond section on company website',
      assignee: 'David "Rosie" Walsh',
      dueDate: new Date('2025-07-12T17:00:00'),
      priority: 'high',
      status: 'completed',
      category: 'Marketing',
      tags: ['website', 'bonds', 'launch'],
      createdBy: 'Truckers',
      createdAt: new Date('2025-07-08T10:00:00'),
      completedAt: new Date('2025-07-12T16:45:00')
    }
  ]);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'bg-red-100 text-red-800 border-red-200';
      case 'high': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'in-progress': return 'bg-blue-100 text-blue-800';
      case 'pending': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (date: Date) => {
    const now = new Date();
    const diffInHours = (date.getTime() - now.getTime()) / (1000 * 60 * 60);
    
    if (diffInHours < 24 && diffInHours > 0) {
      return `Due ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    } else if (diffInHours < 0) {
      return 'Overdue';
    } else {
      return `Due ${date.toLocaleDateString()}`;
    }
  };

  const filteredTasks = tasks.filter(task => {
    const matchesFilter = selectedFilter === 'all' || task.status === selectedFilter;
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         task.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         task.assignee.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const taskCounts = {
    all: tasks.length,
    pending: tasks.filter(t => t.status === 'pending').length,
    'in-progress': tasks.filter(t => t.status === 'in-progress').length,
    completed: tasks.filter(t => t.status === 'completed').length
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Tasks</h1>
              <p className="text-lg text-gray-600">Manage team tasks and assignments</p>
            </div>
            <button 
              onClick={() => setIsCreating(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Task
            </button>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search tasks..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              {Object.entries(taskCounts).map(([status, count]) => (
                <button
                  key={status}
                  onClick={() => setSelectedFilter(status)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    selectedFilter === status
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {status === 'all' ? 'All' : status.replace('-', ' ')} ({count})
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Tasks Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTasks.map((task) => (
            <div key={task.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium border ${getPriorityColor(task.priority)}`}>
                      {task.priority}
                    </span>
                    <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(task.status)}`}>
                      {task.status.replace('-', ' ')}
                    </span>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">{task.title}</h3>
                  <p className="text-sm text-gray-600 mb-3">{task.description}</p>
                </div>
                <button className="p-1 hover:bg-gray-100 rounded">
                  <MoreVertical className="w-4 h-4 text-gray-400" />
                </button>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Assigned to:</span>
                  <span className="font-medium text-gray-900">{task.assignee}</span>
                </div>
                
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Due:</span>
                  <span className={`font-medium ${
                    task.dueDate < new Date() && task.status !== 'completed' 
                      ? 'text-red-600' 
                      : 'text-gray-900'
                  }`}>
                    {formatDate(task.dueDate)}
                  </span>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Category:</span>
                  <span className="font-medium text-gray-900">{task.category}</span>
                </div>

                {task.relatedContact && (
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Contact:</span>
                    <span className="font-medium text-blue-600">{task.relatedContact}</span>
                  </div>
                )}

                <div className="flex flex-wrap gap-1 mt-3">
                  {task.tags.map((tag, index) => (
                    <span key={index} className="inline-flex px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200">
                <div className="flex items-center space-x-2">
                  {task.status === 'completed' ? (
                    <CheckCircle className="w-4 h-4 text-green-600" />
                  ) : (
                    <Clock className="w-4 h-4 text-gray-400" />
                  )}
                  <span className="text-xs text-gray-500">
                    {task.status === 'completed' 
                      ? `Completed ${task.completedAt?.toLocaleDateString()}`
                      : `Created ${task.createdAt.toLocaleDateString()}`
                    }
                  </span>
                </div>
                <div className="flex items-center space-x-1">
                  <button className="p-1 hover:bg-gray-100 rounded">
                    <Edit className="w-4 h-4 text-gray-400" />
                  </button>
                  <button className="p-1 hover:bg-gray-100 rounded">
                    <Trash2 className="w-4 h-4 text-gray-400" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredTasks.length === 0 && (
          <div className="text-center py-12">
            <CheckCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No tasks found</h3>
            <p className="text-gray-600">
              {searchTerm 
                ? 'Try adjusting your search criteria'
                : selectedFilter === 'all' 
                  ? 'Create your first task to get started'
                  : `No ${selectedFilter.replace('-', ' ')} tasks found`
              }
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
