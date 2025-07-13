/**
 * ContactCard component - Individual contact card for pipeline view
 * Displays contact information, lead score, and priority indicators
 */

import React from 'react';
import { Phone, Mail, Building, Star, MessageSquare, Clock } from 'lucide-react';

interface Contact {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company: string;
  status: string;
  priority: string;
  leadScore: number;
  investmentType: string;
  dealSize: string;
  source: string;
  preferredContact: string;
  notes: string;
  interactions: number;
  lastActivity: string;
}

interface ContactCardProps {
  contact: Contact;
  onEdit: () => void;
}

export default function ContactCard({ contact, onEdit }: ContactCardProps) {
  const getPriorityColor = (priority: string) => {
    switch (priority.toLowerCase()) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getLeadScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div 
      className="bg-white rounded-lg p-4 shadow-sm border hover:shadow-md transition-shadow cursor-pointer"
      onClick={onEdit}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <h4 className="font-semibold text-gray-900 text-sm">
            {contact.firstName} {contact.lastName}
          </h4>
          {contact.company && (
            <p className="text-xs text-gray-600 flex items-center mt-1">
              <Building className="w-3 h-3 mr-1" />
              {contact.company}
            </p>
          )}
        </div>
        <div className="flex items-center space-x-2">
          <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getPriorityColor(contact.priority)}`}>
            {contact.priority}
          </span>
        </div>
      </div>

      {/* Lead Score */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-1">
          <Star className={`w-4 h-4 ${getLeadScoreColor(contact.leadScore)}`} />
          <span className={`text-sm font-medium ${getLeadScoreColor(contact.leadScore)}`}>
            {contact.leadScore}
          </span>
        </div>
        <div className="flex items-center space-x-1 text-xs text-gray-500">
          <MessageSquare className="w-3 h-3" />
          <span>{contact.interactions}</span>
        </div>
      </div>

      {/* Investment Type */}
      <div className="mb-3">
        <p className="text-xs font-medium text-gray-700 mb-1">Investment Interest:</p>
        <p className="text-xs text-gray-600">{contact.investmentType}</p>
      </div>

      {/* Deal Size */}
      <div className="mb-3">
        <p className="text-xs font-medium text-gray-700 mb-1">Deal Size:</p>
        <p className="text-xs text-gray-900 font-medium">{contact.dealSize}</p>
      </div>

      {/* Contact Info */}
      <div className="mb-3 space-y-1">
        <div className="flex items-center space-x-1 text-xs text-gray-600">
          <Phone className="w-3 h-3" />
          <span>{contact.phone}</span>
        </div>
        <div className="flex items-center space-x-1 text-xs text-gray-600">
          <Mail className="w-3 h-3" />
          <span className="truncate">{contact.email}</span>
        </div>
      </div>

      {/* Last Activity */}
      <div className="flex items-center justify-between text-xs text-gray-500 pt-2 border-t">
        <div className="flex items-center space-x-1">
          <Clock className="w-3 h-3" />
          <span>Last activity: {contact.lastActivity}</span>
        </div>
      </div>
    </div>
  );
}