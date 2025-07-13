/**
 * Email System Component - Integrated email management
 * Features inbox, compose, sent items, and email templates
 */

import React, { useState } from 'react';
import { Mail, Search, Star, Archive, Trash2, Send, Paperclip, Bold, Italic, Underline, Link, Image, MoreVertical, Reply, Forward, X, Plus, Filter, RefreshCw } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface Email {
  id: string;
  from: string;
  fromEmail: string;
  to: string[];
  cc?: string[];
  bcc?: string[];
  subject: string;
  content: string;
  timestamp: string;
  isRead: boolean;
  isStarred: boolean;
  isArchived: boolean;
  attachments?: EmailAttachment[];
  folder: 'inbox' | 'sent' | 'drafts' | 'trash' | 'archive';
  priority: 'low' | 'medium' | 'high';
  labels?: string[];
}

interface EmailAttachment {
  id: string;
  name: string;
  size: string;
  type: string;
  url: string;
}

interface EmailTemplate {
  id: string;
  name: string;
  subject: string;
  content: string;
  category: string;
}

interface EmailSystemProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function EmailSystem({ isOpen, onClose }: EmailSystemProps) {
  const { user } = useAuth();
  const [selectedFolder, setSelectedFolder] = useState<string>('inbox');
  const [selectedEmail, setSelectedEmail] = useState<Email | null>(null);
  const [isComposing, setIsComposing] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [composeData, setComposeData] = useState({
    to: '',
    cc: '',
    bcc: '',
    subject: '',
    content: '',
    attachments: [] as EmailAttachment[]
  });

  const [emails] = useState<Email[]>([
    {
      id: '1',
      from: 'Emma Davies',
      fromEmail: 'emma.davies@gmail.com',
      to: ['crm@sqinvest.com'],
      subject: 'Interest in Residential Property Investment',
      content: `Hi,

I hope this email finds you well. I am very interested in learning more about residential property investment opportunities you have available.

I am a first-time investor looking for guidance on buy-to-let properties in the £150K - £300K range. Could we schedule a consultation to discuss my options?

I would particularly like to know about:
- Available properties in good rental areas
- Expected rental yields
- Management services
- Financing options

I am available most afternoons this week for a call or meeting.

Look forward to hearing from you.

Best regards,
Emma Davies
+44 7700 456789`,
      timestamp: '2025-07-11T09:30:00Z',
      isRead: false,
      isStarred: false,
      isArchived: false,
      folder: 'inbox',
      priority: 'high',
      labels: ['lead', 'residential']
    },
    {
      id: '2',
      from: 'James Anderson',
      fromEmail: 'james.anderson@wealth.co.uk',
      to: ['crm@sqinvest.com'],
      subject: 'Off-Plan Development Inquiry - Urgent',
      content: `Good morning,

I am writing to inquire about off-plan development opportunities in the £1.5M - £2.5M range.

I am particularly interested in:
- London developments
- Completion within 18-24 months
- High-growth areas
- Developer reputation and track record

I have funds ready to deploy and would like to move quickly on the right opportunity. Could we arrange a site visit this week?

I am available tomorrow afternoon or Friday morning.

Regards,
James Anderson
Anderson Wealth Management
+44 7700 789012`,
      timestamp: '2025-07-11T08:45:00Z',
      isRead: true,
      isStarred: true,
      isArchived: false,
      folder: 'inbox',
      priority: 'high',
      labels: ['hot-lead', 'off-plan', 'high-value']
    },
    {
      id: '3',
      from: 'Michael Roberts',
      fromEmail: 'michael.roberts@business.com',
      to: ['crm@sqinvest.com'],
      subject: 'Property Bond Information Request',
      content: `Hello,

I was referred to you by David Wilson regarding your property bond investment opportunities.

I am an experienced property investor looking to diversify my portfolio with lower-risk bond investments. I am particularly interested in:

- Current bond yields
- Investment terms and conditions
- Minimum investment amounts
- Track record and performance

I have approximately £250K - £500K available for this type of investment.

Could you please send me your current bond prospectus and arrange a call to discuss further?

Best regards,
Michael Roberts
Roberts Enterprises
+44 7700 123456`,
      timestamp: '2025-07-10T16:20:00Z',
      isRead: true,
      isStarred: false,
      isArchived: false,
      folder: 'inbox',
      priority: 'medium',
      labels: ['bonds', 'referral']
    },
    {
      id: '4',
      from: 'Sarah Thompson',
      fromEmail: 'sarah.thompson@corp.com',
      to: ['crm@sqinvest.com'],
      subject: 'Commercial Property Portfolio Review',
      content: `Hi Team,

I would like to schedule a review of my commercial property portfolio and discuss potential expansion opportunities.

As discussed in our last meeting, I am looking to add 2-3 more commercial properties to my portfolio in the £500K - £1M range each.

Preferred locations:
- Manchester city center
- Birmingham business district
- Leeds financial quarter

I am available for a meeting next week. Please let me know your availability.

Best regards,
Sarah Thompson
Thompson Corporation
+44 7700 345678`,
      timestamp: '2025-07-10T14:15:00Z',
      isRead: false,
      isStarred: true,
      isArchived: false,
      folder: 'inbox',
      priority: 'medium',
      labels: ['existing-client', 'commercial', 'expansion']
    },
    {
      id: '5',
      from: 'SQ Invest CRM',
      fromEmail: 'crm@sqinvest.com',
      to: ['emma.davies@gmail.com'],
      subject: 'Welcome to SQ Invest Limited - Your Property Investment Journey Begins',
      content: `Dear Emma,

Thank you for your interest in residential property investment with SQ Invest Limited.

We are delighted to welcome you to our exclusive network of property investors. Your dedicated agent, Truckers, will be in touch within 24 hours to schedule your personal consultation.

What happens next:
✓ Personal consultation with your dedicated agent
✓ Portfolio presentation tailored to your budget
✓ Property viewing arrangements
✓ Financing options discussion
✓ Investment strategy planning

In the meantime, please find attached our investor welcome pack containing:
- Company brochure
- Investment guide for first-time investors
- Current property portfolio
- Financing options overview

If you have any immediate questions, please do not hesitate to contact us.

Best regards,
The SQ Invest Team
+44 20 7123 4567
info@sqinvest.com`,
      timestamp: '2025-07-11T10:00:00Z',
      isRead: true,
      isStarred: false,
      isArchived: false,
      folder: 'sent',
      priority: 'medium',
      labels: ['welcome', 'template']
    }
  ]);

  const [templates] = useState<EmailTemplate[]>([
    {
      id: '1',
      name: 'Welcome New Lead',
      subject: 'Welcome to SQ Invest Limited - Your Property Investment Journey Begins',
      content: `Dear {{name}},

Thank you for your interest in {{investment_type}} with SQ Invest Limited.

We are delighted to welcome you to our exclusive network of property investors. Your dedicated agent, {{agent_name}}, will be in touch within 24 hours to schedule your personal consultation.

What happens next:
✓ Personal consultation with your dedicated agent
✓ Portfolio presentation tailored to your budget
✓ Property viewing arrangements
✓ Financing options discussion
✓ Investment strategy planning

Best regards,
The SQ Invest Team`,
      category: 'Lead Management'
    },
    {
      id: '2',
      name: 'Follow-up After Meeting',
      subject: 'Thank you for meeting with us - Next Steps',
      content: `Dear {{name}},

Thank you for taking the time to meet with us {{meeting_date}}. It was a pleasure discussing your property investment goals.

As discussed, I have attached the following documents:
- Property portfolio matching your criteria
- Financing options summary
- Investment projections

Next steps:
{{next_steps}}

I will follow up with you in {{follow_up_days}} days to answer any questions and discuss your decision.

Best regards,
{{agent_name}}`,
      category: 'Follow-up'
    },
    {
      id: '3',
      name: 'Property Viewing Invitation',
      subject: 'Property Viewing Invitation - {{property_address}}',
      content: `Dear {{name}},

I am pleased to invite you to view a property that matches your investment criteria:

{{property_details}}

Viewing Details:
Date: {{viewing_date}}
Time: {{viewing_time}}
Address: {{property_address}}

This property offers excellent potential with {{key_benefits}}.

Please confirm your attendance by replying to this email.

Best regards,
{{agent_name}}`,
      category: 'Property Viewing'
    },
    {
      id: '4',
      name: 'Deal Completion Congratulations',
      subject: 'Congratulations on Your Property Investment!',
      content: `Dear {{name}},

Congratulations on completing your property investment with SQ Invest Limited!

Your investment details:
- Property: {{property_address}}
- Investment amount: {{investment_amount}}
- Expected annual return: {{expected_return}}

What happens next:
✓ Property management setup
✓ Rental income arrangements
✓ Regular performance reports
✓ Ongoing support from your dedicated agent

Welcome to the SQ Invest family!

Best regards,
The SQ Invest Team`,
      category: 'Deal Completion'
    }
  ]);

  const folders = [
    { id: 'inbox', name: 'Inbox', count: emails.filter(e => e.folder === 'inbox' && !e.isRead).length },
    { id: 'sent', name: 'Sent', count: emails.filter(e => e.folder === 'sent').length },
    { id: 'drafts', name: 'Drafts', count: emails.filter(e => e.folder === 'drafts').length },
    { id: 'archive', name: 'Archive', count: emails.filter(e => e.folder === 'archive').length },
    { id: 'trash', name: 'Trash', count: emails.filter(e => e.folder === 'trash').length }
  ];

  const getFilteredEmails = () => {
    return emails.filter(email => 
      email.folder === selectedFolder &&
      (email.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
       email.from.toLowerCase().includes(searchTerm.toLowerCase()) ||
       email.content.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  };

  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);
    
    if (diffInHours < 24) {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else {
      return date.toLocaleDateString();
    }
  };

  const handleCompose = () => {
    setIsComposing(true);
    setSelectedEmail(null);
    setComposeData({
      to: '',
      cc: '',
      bcc: '',
      subject: '',
      content: '',
      attachments: []
    });
  };

  const handleSendEmail = () => {
    if (composeData.to && composeData.subject && composeData.content) {
      alert('Email sent successfully!');
      setIsComposing(false);
      setComposeData({
        to: '',
        cc: '',
        bcc: '',
        subject: '',
        content: '',
        attachments: []
      });
    }
  };

  const handleUseTemplate = (template: EmailTemplate) => {
    setComposeData({
      ...composeData,
      subject: template.subject,
      content: template.content
    });
  };

  if (!isOpen) return null;

  return (
    <div className="h-full w-full flex">
      <div className="bg-white w-full h-full flex overflow-hidden">
        {/* Sidebar */}
        <div className="w-64 bg-gray-50 border-r border-gray-200 flex flex-col">
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-900">Email</h2>
            </div>
            <button
              onClick={handleCompose}
              className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center"
            >
              <Plus className="w-4 h-4 mr-2" />
              Compose
            </button>
          </div>
          
          <div className="flex-1 overflow-y-auto">
            <div className="p-3">
              {folders.map(folder => (
                <button
                  key={folder.id}
                  onClick={() => setSelectedFolder(folder.id)}
                  className={`w-full flex items-center justify-between p-2 rounded-lg mb-1 transition-colors ${
                    selectedFolder === folder.id
                      ? 'bg-blue-100 text-blue-700'
                      : 'hover:bg-gray-100 text-gray-700'
                  }`}
                >
                  <div className="flex items-center">
                    <Mail className="w-4 h-4 mr-2" />
                    <span className="text-sm font-medium capitalize">{folder.name}</span>
                  </div>
                  {folder.count > 0 && (
                    <span className="bg-gray-500 text-white text-xs px-2 py-1 rounded-full">
                      {folder.count}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          {isComposing ? (
            /* Compose Email */
            <div className="flex-1 flex flex-col">
              <div className="bg-white border-b border-gray-200 p-4 flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Compose Email</h3>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={handleSendEmail}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center"
                  >
                    <Send className="w-4 h-4 mr-2" />
                    Send
                  </button>
                  <button
                    onClick={() => setIsComposing(false)}
                    className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>

              <div className="flex-1 flex">
                <div className="flex-1 flex flex-col p-4">
                  <div className="space-y-3 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">To</label>
                      <input
                        type="text"
                        value={composeData.to}
                        onChange={(e) => setComposeData({...composeData, to: e.target.value})}
                        placeholder="recipient@example.com"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                      <input
                        type="text"
                        value={composeData.subject}
                        onChange={(e) => setComposeData({...composeData, subject: e.target.value})}
                        placeholder="Email subject"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div className="flex-1 flex flex-col">
                    <div className="flex items-center space-x-2 mb-3 p-2 bg-gray-50 rounded-lg">
                      <button className="p-1 hover:bg-gray-200 rounded">
                        <Bold className="w-4 h-4 text-gray-600" />
                      </button>
                      <button className="p-1 hover:bg-gray-200 rounded">
                        <Italic className="w-4 h-4 text-gray-600" />
                      </button>
                      <button className="p-1 hover:bg-gray-200 rounded">
                        <Underline className="w-4 h-4 text-gray-600" />
                      </button>
                      <button className="p-1 hover:bg-gray-200 rounded">
                        <Link className="w-4 h-4 text-gray-600" />
                      </button>
                      <button className="p-1 hover:bg-gray-200 rounded">
                        <Paperclip className="w-4 h-4 text-gray-600" />
                      </button>
                    </div>
                    <textarea
                      value={composeData.content}
                      onChange={(e) => setComposeData({...composeData, content: e.target.value})}
                      placeholder="Write your email..."
                      className="flex-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                    />
                  </div>
                </div>

                {/* Email Templates Sidebar */}
                <div className="w-80 bg-gray-50 border-l border-gray-200 p-4">
                  <h4 className="font-semibold text-gray-900 mb-3">Email Templates</h4>
                  <div className="space-y-2">
                    {templates.map(template => (
                      <div key={template.id} className="bg-white p-3 rounded-lg border border-gray-200">
                        <div className="flex items-center justify-between mb-2">
                          <h5 className="font-medium text-gray-900 text-sm">{template.name}</h5>
                          <button
                            onClick={() => handleUseTemplate(template)}
                            className="text-xs bg-blue-600 text-white px-2 py-1 rounded hover:bg-blue-700"
                          >
                            Use
                          </button>
                        </div>
                        <p className="text-xs text-gray-600 mb-1">{template.category}</p>
                        <p className="text-xs text-gray-500 truncate">{template.subject}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ) : selectedEmail ? (
            /* Email View */
            <div className="flex-1 flex flex-col">
              <div className="bg-white border-b border-gray-200 p-4 flex items-center justify-between">
                <button
                  onClick={() => setSelectedEmail(null)}
                  className="text-gray-600 hover:text-gray-800 transition-colors"
                >
                  ← Back to {selectedFolder}
                </button>
                <div className="flex items-center space-x-2">
                  <button className="p-2 hover:bg-gray-100 rounded-lg">
                    <Reply className="w-4 h-4 text-gray-600" />
                  </button>
                  <button className="p-2 hover:bg-gray-100 rounded-lg">
                    <Forward className="w-4 h-4 text-gray-600" />
                  </button>
                  <button className="p-2 hover:bg-gray-100 rounded-lg">
                    <Archive className="w-4 h-4 text-gray-600" />
                  </button>
                  <button className="p-2 hover:bg-gray-100 rounded-lg">
                    <Trash2 className="w-4 h-4 text-gray-600" />
                  </button>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-6">
                <div className="max-w-4xl mx-auto">
                  <div className="mb-6">
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">{selectedEmail.subject}</h1>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                          <span className="text-sm font-semibold text-gray-700">
                            {selectedEmail.from.charAt(0).toUpperCase()}
                          </span>
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">{selectedEmail.from}</div>
                          <div className="text-sm text-gray-600">{selectedEmail.fromEmail}</div>
                        </div>
                      </div>
                      <div className="text-sm text-gray-500">
                        {formatDate(selectedEmail.timestamp)}
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4 mb-6">
                    <div className="text-sm text-gray-600 mb-2">
                      To: {selectedEmail.to.join(', ')}
                    </div>
                    {selectedEmail.priority === 'high' && (
                      <div className="inline-flex items-center px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs">
                        High Priority
                      </div>
                    )}
                  </div>

                  <div className="prose max-w-none">
                    <div className="whitespace-pre-wrap text-gray-900">
                      {selectedEmail.content}
                    </div>
                  </div>

                  {selectedEmail.attachments && selectedEmail.attachments.length > 0 && (
                    <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                      <h3 className="font-medium text-gray-900 mb-2">Attachments</h3>
                      <div className="space-y-2">
                        {selectedEmail.attachments.map(attachment => (
                          <div key={attachment.id} className="flex items-center justify-between p-2 bg-white rounded border">
                            <div className="flex items-center space-x-2">
                              <Paperclip className="w-4 h-4 text-gray-500" />
                              <span className="text-sm font-medium">{attachment.name}</span>
                              <span className="text-xs text-gray-500">({attachment.size})</span>
                            </div>
                            <button className="text-blue-600 hover:text-blue-800 text-sm">
                              Download
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ) : (
            /* Email List */
            <div className="flex-1 flex flex-col">
              <div className="bg-white border-b border-gray-200 p-4 flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900 capitalize">{selectedFolder}</h3>
                <div className="flex items-center space-x-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      type="text"
                      placeholder="Search emails..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <button className="p-2 hover:bg-gray-100 rounded-lg">
                    <RefreshCw className="w-4 h-4 text-gray-600" />
                  </button>
                  <button className="p-2 hover:bg-gray-100 rounded-lg">
                    <Filter className="w-4 h-4 text-gray-600" />
                  </button>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto">
                {getFilteredEmails().length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-gray-500">
                    <Mail className="w-12 h-12 mb-4" />
                    <p>No emails in {selectedFolder}</p>
                  </div>
                ) : (
                  <div className="divide-y divide-gray-200">
                    {getFilteredEmails().map(email => (
                      <div
                        key={email.id}
                        onClick={() => setSelectedEmail(email)}
                        className={`p-4 hover:bg-gray-50 cursor-pointer ${
                          !email.isRead ? 'bg-blue-50' : ''
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3 flex-1">
                            <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                              <span className="text-sm font-semibold text-gray-700">
                                {email.from.charAt(0).toUpperCase()}
                              </span>
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center space-x-2">
                                <span className={`font-medium ${!email.isRead ? 'text-gray-900' : 'text-gray-700'}`}>
                                  {email.from}
                                </span>
                                {email.isStarred && (
                                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                                )}
                                {email.priority === 'high' && (
                                  <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs">
                                    High
                                  </span>
                                )}
                              </div>
                              <div className={`text-sm ${!email.isRead ? 'font-medium text-gray-900' : 'text-gray-600'}`}>
                                {email.subject}
                              </div>
                              <div className="text-sm text-gray-500 truncate">
                                {email.content.substring(0, 100)}...
                              </div>
                            </div>
                          </div>
                          <div className="text-sm text-gray-500">
                            {formatDate(email.timestamp)}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
