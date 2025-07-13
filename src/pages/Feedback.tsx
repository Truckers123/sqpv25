/**
 * User Feedback page - Hidden page for collecting user feedback during testing
 * Access via /feedback (not linked in navigation)
 */

import React, { useState } from 'react';
import { MessageSquare, Star, Bug, Lightbulb, ThumbsUp, ThumbsDown, Send, X, Plus } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import Header from '../components/Header';

interface FeedbackItem {
  id: string;
  type: 'bug' | 'feature' | 'improvement' | 'general';
  rating: number;
  title: string;
  description: string;
  user: string;
  timestamp: string;
  status: 'new' | 'reviewed' | 'in-progress' | 'resolved';
  priority: 'low' | 'medium' | 'high' | 'critical';
}

export default function Feedback() {
  const { user } = useAuth();
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);
  const [feedbackType, setFeedbackType] = useState<'bug' | 'feature' | 'improvement' | 'general'>('general');
  const [rating, setRating] = useState(5);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<'low' | 'medium' | 'high' | 'critical'>('medium');
  
  // Mock feedback data
  const [feedbackList] = useState<FeedbackItem[]>([
    {
      id: '1',
      type: 'bug',
      rating: 3,
      title: 'Leaderboard not updating with name changes',
      description: 'When I change a user name in Settings, the leaderboard still shows the old name',
      user: 'Alex Foster',
      timestamp: '2025-07-13 05:30:00',
      status: 'reviewed',
      priority: 'medium'
    },
    {
      id: '2',
      type: 'feature',
      rating: 5,
      title: 'Add bulk email functionality',
      description: 'Would be great to send emails to multiple contacts at once',
      user: 'Charles Sinclair',
      timestamp: '2025-07-13 04:15:00',
      status: 'new',
      priority: 'high'
    },
    {
      id: '3',
      type: 'improvement',
      rating: 4,
      title: 'Better mobile responsiveness',
      description: 'Some tables are hard to read on mobile devices',
      user: 'David Walsh',
      timestamp: '2025-07-13 03:45:00',
      status: 'in-progress',
      priority: 'medium'
    }
  ]);

  const handleSubmitFeedback = () => {
    if (!title.trim() || !description.trim()) {
      alert('Please fill in both title and description');
      return;
    }

    // In a real app, this would send to a backend
    const feedback: FeedbackItem = {
      id: Date.now().toString(),
      type: feedbackType,
      rating,
      title: title.trim(),
      description: description.trim(),
      user: user?.name || 'Anonymous',
      timestamp: new Date().toLocaleString(),
      status: 'new',
      priority
    };

    console.log('New feedback submitted:', feedback);
    alert('Thank you for your feedback! It has been submitted.');
    
    // Reset form
    setTitle('');
    setDescription('');
    setRating(5);
    setFeedbackType('general');
    setPriority('medium');
    setShowFeedbackForm(false);
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'bug': return <Bug className="w-4 h-4 text-red-500" />;
      case 'feature': return <Lightbulb className="w-4 h-4 text-blue-500" />;
      case 'improvement': return <ThumbsUp className="w-4 h-4 text-green-500" />;
      default: return <MessageSquare className="w-4 h-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-blue-100 text-blue-800';
      case 'reviewed': return 'bg-yellow-100 text-yellow-800';
      case 'in-progress': return 'bg-purple-100 text-purple-800';
      case 'resolved': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'bg-red-100 text-red-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
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
                <MessageSquare className="w-8 h-8 mr-3 text-blue-600" />
                User Feedback & Testing
              </h1>
              <p className="text-lg text-gray-600">Help us improve the CRM system</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="bg-blue-100 border border-blue-300 rounded-lg px-4 py-2">
                <p className="text-blue-800 text-sm font-medium">🔒 Testing Phase</p>
                <p className="text-blue-600 text-xs">Hidden feedback page</p>
              </div>
              <button
                onClick={() => setShowFeedbackForm(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center"
              >
                <Plus className="w-4 h-4 mr-2" />
                Submit Feedback
              </button>
            </div>
          </div>
        </div>

        {/* Feedback Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-sm font-medium text-gray-500">Total Feedback</h3>
            <div className="text-2xl font-bold text-gray-900">{feedbackList.length}</div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-sm font-medium text-gray-500">Bugs Reported</h3>
            <div className="text-2xl font-bold text-red-600">{feedbackList.filter(f => f.type === 'bug').length}</div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-sm font-medium text-gray-500">Feature Requests</h3>
            <div className="text-2xl font-bold text-blue-600">{feedbackList.filter(f => f.type === 'feature').length}</div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-sm font-medium text-gray-500">Average Rating</h3>
            <div className="text-2xl font-bold text-green-600">
              {(feedbackList.reduce((sum, f) => sum + f.rating, 0) / feedbackList.length).toFixed(1)}/5
            </div>
          </div>
        </div>

        {/* Feedback List */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Recent Feedback</h2>
          <div className="space-y-4">
            {feedbackList.map(feedback => (
              <div key={feedback.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3 flex-1">
                    {getTypeIcon(feedback.type)}
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h3 className="font-semibold text-gray-900">{feedback.title}</h3>
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(feedback.status)}`}>
                          {feedback.status}
                        </span>
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getPriorityColor(feedback.priority)}`}>
                          {feedback.priority}
                        </span>
                      </div>
                      <p className="text-gray-600 text-sm mb-2">{feedback.description}</p>
                      <div className="flex items-center space-x-4 text-xs text-gray-500">
                        <span>By: {feedback.user}</span>
                        <span>•</span>
                        <span>{feedback.timestamp}</span>
                        <span>•</span>
                        <div className="flex items-center">
                          <Star className="w-3 h-3 text-yellow-500 mr-1" />
                          {feedback.rating}/5
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Feedback Form Modal */}
        {showFeedbackForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-900">Submit Feedback</h2>
                <button
                  onClick={() => setShowFeedbackForm(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                    <select
                      value={feedbackType}
                      onChange={(e) => setFeedbackType(e.target.value as any)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="general">General Feedback</option>
                      <option value="bug">Bug Report</option>
                      <option value="feature">Feature Request</option>
                      <option value="improvement">Improvement</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                    <select
                      value={priority}
                      onChange={(e) => setPriority(e.target.value as any)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                      <option value="critical">Critical</option>
                    </select>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Overall Rating</label>
                  <div className="flex items-center space-x-1">
                    {[1, 2, 3, 4, 5].map(star => (
                      <button
                        key={star}
                        onClick={() => setRating(star)}
                        className={`w-8 h-8 ${star <= rating ? 'text-yellow-400' : 'text-gray-300'} hover:text-yellow-400`}
                      >
                        <Star className="w-full h-full fill-current" />
                      </button>
                    ))}
                    <span className="ml-2 text-sm text-gray-600">{rating}/5</span>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Brief summary of your feedback"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Please provide detailed feedback..."
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
              
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={() => setShowFeedbackForm(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmitFeedback}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center"
                >
                  <Send className="w-4 h-4 mr-2" />
                  Submit Feedback
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
