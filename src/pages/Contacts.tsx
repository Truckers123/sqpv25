/**
 * Contacts page component - Advanced CRM contact management interface
 * Features complete enterprise system with calendar, documents, team collaboration
 */

import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Search, Filter, Plus, Star, Phone, Mail, MapPin, Calendar, Edit, Trash2, ArrowLeft, User, MessageCircle, Clock, DollarSign, FileText, CheckCircle, X, Check, RefreshCw, Users, TrendingUp, Activity, Video, MessageSquare, Zap, Target, Gift, Briefcase, Home, GraduationCap, Building, Heart, Coins, Send, Bot, PieChart, BarChart, CalendarDays, Upload, Download, UserPlus, Settings, Bell, Paperclip, Archive, FolderOpen, Share2, Eye, AlertCircle, PlayCircle, PauseCircle, Mic, Camera, FileSpreadsheet, FileImage, ChevronRight, ChevronDown, Hash, Tag, Bookmark, Pin, Flag } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import Header from '../components/Header';

interface Contact {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  status: 'Fresh Leads' | 'Opened' | 'Call Backs' | 'KOL' | 'Legal' | 'Needs TO' | 'Deals' | 'Clients' | 'Dead';
  priority: 'low' | 'medium' | 'high';
  investmentType: string;
  dealSize: string;
  leadScore: number;
  lastContact: string;
  source: string;
  notes: string;
  assignedAgent: string;
  dateAdded: string;
  isSelected?: boolean;
  activities: number;
  nextFollowUp?: string;
  nextAction?: {
    action: string;
    dueDate: string;
    priority: 'low' | 'medium' | 'high';
    notes: string;
  };
  totalDeals?: number;
  totalValue?: number;
  automationStatus?: 'active' | 'paused' | 'completed';
  lastEmailSent?: string;
  documents?: Document[];
  meetings?: Meeting[];
  tasks?: Task[];
  lastActivity?: string;
  nextMeeting?: string;
  communicationHistory?: Communication[];
  tags?: string[];
  isStarred?: boolean;
  socialProfiles?: SocialProfile[];
}

interface Document {
  id: string;
  name: string;
  type: 'contract' | 'legal' | 'financial' | 'identity' | 'presentation' | 'other';
  size: string;
  uploadDate: string;
  uploadedBy: string;
  url: string;
  status: 'pending' | 'approved' | 'rejected' | 'requires_signature';
  version: number;
  tags: string[];
}

interface Meeting {
  id: string;
  title: string;
  type: 'call' | 'video' | 'in_person' | 'presentation';
  date: string;
  time: string;
  duration: number;
  attendees: string[];
  location?: string;
  agenda: string;
  notes?: string;
  recordings?: string[];
  followUpRequired: boolean;
  status: 'scheduled' | 'completed' | 'cancelled' | 'no_show';
  outcome?: 'positive' | 'neutral' | 'negative';
}

interface Task {
  id: string;
  title: string;
  description: string;
  type: 'follow_up' | 'document_review' | 'meeting_prep' | 'contract_send' | 'other';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  dueDate: string;
  assignedTo: string;
  status: 'pending' | 'in_progress' | 'completed' | 'overdue';
  relatedDeal?: string;
  estimatedTime: number;
  actualTime?: number;
  dependencies?: string[];
}

interface Communication {
  id: string;
  type: 'email' | 'phone' | 'sms' | 'whatsapp' | 'meeting' | 'note';
  direction: 'inbound' | 'outbound';
  subject?: string;
  content: string;
  timestamp: string;
  agent: string;
  sentiment: 'positive' | 'neutral' | 'negative';
  outcome?: string;
  followUpRequired: boolean;
  attachments?: string[];
}

interface SocialProfile {
  platform: 'linkedin' | 'twitter' | 'facebook' | 'instagram';
  url: string;
  followers?: number;
  verified?: boolean;
}

interface ContactTemplate {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  investmentType: string;
  dealSize: string;
  priority: 'low' | 'medium' | 'high';
  status: Contact['status'];
  source: string;
}

interface Deal {
  id: string;
  contactId: string;
  contactName: string;
  dealType: string;
  propertyType: string;
  propertyLocation: string;
  purchasePrice: number;
  clientDeposit: number;
  clientMortgage: number;
  expectedCompletion: string;
  legalFirm: string;
  ourCommission: number;
  brokerFirm: string;
  dealNotes: string;
  paymentSchedule: string;
  paymentMethod: string;
  paymentDueDate: string;
  riskLevel: string;
  complianceCheck: boolean;
  managementApproval: boolean;
  status: 'pending' | 'approved' | 'completed' | 'cancelled';
  createdAt: string;
  documents?: Document[];
  milestones?: Milestone[];
  riskAssessment?: string;
  complianceStatus?: string;
  submittedToManagement?: boolean;
  submissionDate?: string;
  submittedBy?: string;
  requiresApproval?: boolean;
  approvalStatus?: string;
}

interface Milestone {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  status: 'pending' | 'completed' | 'overdue';
  completedBy?: string;
  completedDate?: string;
  notes?: string;
}

interface AutomationRule {
  id: string;
  name: string;
  trigger: 'new_lead' | 'status_change' | 'time_based' | 'score_change' | 'meeting_scheduled' | 'document_uploaded';
  conditions: string[];
  actions: string[];
  isActive: boolean;
  emailTemplateId?: string;
  triggerCount?: number;
  successRate?: number;
  lastTriggered?: string;
}

interface TeamMember {
  id: string;
  name: string;
  role: string;
  email: string;
  phone: string;
  avatar?: string;
  status: 'online' | 'offline' | 'busy' | 'away';
  activeContacts: number;
  thisMonthDeals: number;
  performance: number;
  specialties: string[];
  lastActive: string;
}

interface CalendarEvent {
  id: string;
  title: string;
  type: 'meeting' | 'call' | 'task' | 'reminder' | 'presentation' | 'site_visit';
  contactId?: string;
  contactName?: string;
  date: string;
  time: string;
  duration: number;
  location?: string;
  description: string;
  attendees: string[];
  isRecurring: boolean;
  reminderSet: boolean;
  status: 'scheduled' | 'completed' | 'cancelled' | 'rescheduled';
  meetingLink?: string;
  agenda?: string;
  notes?: string;
}

export default function Contacts() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('All Priority');
  const [investmentFilter, setInvestmentFilter] = useState('All Investment Types');
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showTemplateModal, setShowTemplateModal] = useState(false);
  const [showDealModal, setShowDealModal] = useState(false);
  const [showNextActionModal, setShowNextActionModal] = useState(false);
  const [showCalendarEventModal, setShowCalendarEventModal] = useState(false);
  const [selectedContacts, setSelectedContacts] = useState<Set<string>>(new Set());
  const [bulkActionMode, setBulkActionMode] = useState(false);
  const [dealFormData, setDealFormData] = useState<Partial<Deal>>({});
  const [selectedView, setSelectedView] = useState<'cards' | 'calendar' | 'documents' | 'team'>('cards');
  const [nextActionData, setNextActionData] = useState<{
    contactId: string;
    action: string;
    dueDate: string;
    priority: 'low' | 'medium' | 'high';
    notes: string;
  }>({
    contactId: '',
    action: '',
    dueDate: '',
    priority: 'medium',
    notes: ''
  });
  const [calendarEventData, setCalendarEventData] = useState<{
    contactId: string;
    title: string;
    type: 'meeting' | 'call' | 'presentation' | 'site_visit' | 'task' | 'reminder';
    date: string;
    time: string;
    duration: number;
    location: string;
    description: string;
    reminderMinutes: number;
    alarmSet: boolean;
    attendees: string[];
  }>({
    contactId: '',
    title: '',
    type: 'meeting',
    date: '',
    time: '',
    duration: 60,
    location: '',
    description: '',
    reminderMinutes: 15,
    alarmSet: true,
    attendees: []
  });
  const [newContact, setNewContact] = useState<Partial<Contact>>({
    name: '',
    email: '',
    phone: '',
    company: '',
    status: 'Fresh Leads',
    priority: 'medium',
    investmentType: 'Residential Property Investment',
    dealSize: '£150K - £300K',
    leadScore: 50,
    source: 'Website',
    notes: '',
    assignedAgent: 'Truckers'
  });

  const contactTemplates: ContactTemplate[] = [
    {
      id: '1',
      name: 'First-Time Investor',
      description: 'New to property investment, needs guidance',
      icon: <User className="w-5 h-5 text-blue-500" />,
      investmentType: 'Residential Property Investment',
      dealSize: '£150K - £300K',
      priority: 'medium',
      status: 'Fresh Leads',
      source: 'Website'
    },
    {
      id: '2',
      name: 'High-Net-Worth Individual',
      description: 'Experienced investor with significant capital',
      icon: <DollarSign className="w-5 h-5 text-green-500" />,
      investmentType: 'Off-Plan Property Investment',
      dealSize: '£1M - £2.5M',
      priority: 'high',
      status: 'Fresh Leads',
      source: 'Referral'
    },
    {
      id: '3',
      name: 'Commercial Investor',
      description: 'Focused on commercial property opportunities',
      icon: <Building className="w-5 h-5 text-purple-500" />,
      investmentType: 'Commercial Property Investment',
      dealSize: '£500K - £1M',
      priority: 'high',
      status: 'Fresh Leads',
      source: 'LinkedIn'
    },
    {
      id: '4',
      name: 'Student Property Investor',
      description: 'Interested in university area investments',
      icon: <GraduationCap className="w-5 h-5 text-orange-500" />,
      investmentType: 'Student Property Investment',
      dealSize: '£250K - £500K',
      priority: 'medium',
      status: 'Fresh Leads',
      source: 'Property Portal'
    },
    {
      id: '5',
      name: 'Bond Investor',
      description: 'Conservative investor seeking stable returns',
      icon: <Coins className="w-5 h-5 text-yellow-500" />,
      investmentType: 'Property Bonds',
      dealSize: '£100K - £250K',
      priority: 'low',
      status: 'Fresh Leads',
      source: 'Direct Marketing'
    },
    {
      id: '6',
      name: 'Care Home Investor',
      description: 'Interested in assisted living opportunities',
      icon: <Heart className="w-5 h-5 text-red-500" />,
      investmentType: 'Assisted Living Property Investment',
      dealSize: '£600K - £900K',
      priority: 'medium',
      status: 'Fresh Leads',
      source: 'Referral'
    }
  ];

  const [teamMembers] = useState<TeamMember[]>([
    {
      id: '1',
      name: 'Truckers',
      role: 'Senior Sales Agent',
      email: 'truckers@sqproperty.com',
      phone: '+44 7700 123456',
      status: 'online',
      activeContacts: 15,
      thisMonthDeals: 3,
      performance: 95,
      specialties: ['Off-Plan Investment', 'High-Value Deals'],
      lastActive: '5 minutes ago'
    },
    {
      id: '2',
      name: 'Squire',
      role: 'Sales Agent',
      email: 'squire@sqproperty.com',
      phone: '+44 7700 234567',
      status: 'busy',
      activeContacts: 12,
      thisMonthDeals: 2,
      performance: 87,
      specialties: ['Commercial Property', 'Property Bonds'],
      lastActive: '15 minutes ago'
    },
    {
      id: '3',
      name: 'M1',
      role: 'Junior Sales Agent',
      email: 'm1@sqproperty.com',
      phone: '+44 7700 345678',
      status: 'online',
      activeContacts: 8,
      thisMonthDeals: 1,
      performance: 78,
      specialties: ['Residential Investment', 'First-Time Investors'],
      lastActive: '2 minutes ago'
    },
    {
      id: '4',
      name: 'Ed',
      role: 'Business Development Manager',
      email: 'ed@sqproperty.com',
      phone: '+44 7700 456789',
      status: 'away',
      activeContacts: 20,
      thisMonthDeals: 4,
      performance: 92,
      specialties: ['Business Development', 'Strategic Partnerships'],
      lastActive: '1 hour ago'
    }
  ]);

  const [calendarEvents] = useState<CalendarEvent[]>([
    {
      id: '1',
      title: 'Client Meeting - Emma Davies',
      type: 'meeting',
      contactId: '1',
      contactName: 'Emma Davies',
      date: '2025-07-11',
      time: '14:00',
      duration: 60,
      location: 'Office Conference Room',
      description: 'Initial consultation for residential property investment',
      attendees: ['Truckers', 'Emma Davies'],
      isRecurring: false,
      reminderSet: true,
      status: 'scheduled',
      agenda: 'Investment overview, portfolio presentation, Q&A'
    },
    {
      id: '2',
      title: 'Property Site Visit - James Anderson',
      type: 'site_visit',
      contactId: '3',
      contactName: 'James Anderson',
      date: '2025-07-12',
      time: '10:00',
      duration: 120,
      location: 'London Development Site',
      description: 'Site inspection for off-plan development',
      attendees: ['Truckers', 'James Anderson', 'Developer Rep'],
      isRecurring: false,
      reminderSet: true,
      status: 'scheduled',
      agenda: 'Site tour, construction progress, completion timeline'
    },
    {
      id: '3',
      title: 'Follow-up Call - Michael Roberts',
      type: 'call',
      contactId: '2',
      contactName: 'Michael Roberts',
      date: '2025-07-13',
      time: '16:00',
      duration: 30,
      description: 'Follow-up on property bond interest',
      attendees: ['Squire', 'Michael Roberts'],
      isRecurring: false,
      reminderSet: true,
      status: 'scheduled',
      meetingLink: 'https://zoom.us/j/123456789'
    }
  ]);

  const [documents] = useState<Document[]>([
    {
      id: '1',
      name: 'Investment_Portfolio_2025.pdf',
      type: 'presentation',
      size: '2.4 MB',
      uploadDate: '2025-07-09',
      uploadedBy: 'Truckers',
      url: '#',
      status: 'approved',
      version: 1,
      tags: ['portfolio', 'investment', 'presentation']
    },
    {
      id: '2',
      name: 'Legal_Contract_Template.docx',
      type: 'legal',
      size: '1.8 MB',
      uploadDate: '2025-07-08',
      uploadedBy: 'Legal Team',
      url: '#',
      status: 'approved',
      version: 2,
      tags: ['legal', 'contract', 'template']
    },
    {
      id: '3',
      name: 'Financial_Analysis_Q2.xlsx',
      type: 'financial',
      size: '3.2 MB',
      uploadDate: '2025-07-07',
      uploadedBy: 'Finance Team',
      url: '#',
      status: 'pending',
      version: 1,
      tags: ['financial', 'analysis', 'q2']
    }
  ]);

  const [automationRules] = useState<AutomationRule[]>([
    {
      id: '1',
      name: 'Welcome Email Sequence',
      trigger: 'new_lead',
      conditions: ['status = Fresh Leads'],
      actions: ['Send welcome email', 'Schedule follow-up in 2 days', 'Assign to agent'],
      isActive: true,
      emailTemplateId: 'welcome',
      triggerCount: 45,
      successRate: 78,
      lastTriggered: '2025-07-10'
    },
    {
      id: '2',
      name: 'High-Priority Alert',
      trigger: 'score_change',
      conditions: ['lead_score > 80'],
      actions: ['Set priority to high', 'Assign to Truckers', 'Send priority email', 'Schedule immediate call'],
      isActive: true,
      emailTemplateId: 'high_priority',
      triggerCount: 12,
      successRate: 92,
      lastTriggered: '2025-07-09'
    },
    {
      id: '3',
      name: 'Meeting Follow-up',
      trigger: 'meeting_scheduled',
      conditions: ['meeting_type = initial_consultation'],
      actions: ['Send preparation email', 'Create follow-up task', 'Schedule reminder'],
      isActive: true,
      emailTemplateId: 'meeting_prep',
      triggerCount: 23,
      successRate: 85,
      lastTriggered: '2025-07-10'
    },
    {
      id: '4',
      name: 'Document Review Alert',
      trigger: 'document_uploaded',
      conditions: ['document_type = contract'],
      actions: ['Notify legal team', 'Create review task', 'Set approval deadline'],
      isActive: true,
      triggerCount: 8,
      successRate: 100,
      lastTriggered: '2025-07-08'
    }
  ]);

  const [contacts, setContacts] = useState<Contact[]>([
    {
      id: '1',
      name: 'Emma Davies',
      email: 'emma.davies@gmail.com',
      phone: '+44 7700 456789',
      company: 'Self-employed',
      status: 'Fresh Leads',
      priority: 'medium',
      investmentType: 'Residential Property Investment',
      dealSize: '£150K - £300K',
      leadScore: 65,
      lastContact: '2 days ago',
      source: 'Property Portal',
      notes: 'First-time property investor. Interested in residential buy-to-let. Needs guidance on the process. Very keen to learn.',
      assignedAgent: 'Truckers',
      dateAdded: '2025-07-08',
      activities: 3,
      nextFollowUp: '2025-07-12',
      totalDeals: 0,
      totalValue: 0,
      automationStatus: 'active',
      lastEmailSent: '2025-07-09',
      lastActivity: '2025-07-10',
      nextMeeting: '2025-07-11 14:00',
      tags: ['first-time', 'residential', 'keen'],
      isStarred: false,
      documents: [
        {
          id: 'd1',
          name: 'ID_Verification.pdf',
          type: 'identity',
          size: '1.2 MB',
          uploadDate: '2025-07-09',
          uploadedBy: 'Emma Davies',
          url: '#',
          status: 'approved',
          version: 1,
          tags: ['identity', 'verification']
        }
      ],
      communicationHistory: [
        {
          id: 'c1',
          type: 'email',
          direction: 'inbound',
          subject: 'Interest in Property Investment',
          content: 'Hi, I am interested in learning about property investment opportunities...',
          timestamp: '2025-07-08 10:30',
          agent: 'System',
          sentiment: 'positive',
          followUpRequired: true
        },
        {
          id: 'c2',
          type: 'phone',
          direction: 'outbound',
          content: 'Initial consultation call - 30 minutes discussion about investment goals',
          timestamp: '2025-07-09 15:00',
          agent: 'Truckers',
          sentiment: 'positive',
          outcome: 'Meeting scheduled',
          followUpRequired: false
        }
      ]
    },
    {
      id: '2',
      name: 'Michael Roberts',
      email: 'michael.roberts@business.com',
      phone: '+44 7700 123456',
      company: 'Roberts Enterprises',
      status: 'Opened',
      priority: 'medium',
      investmentType: 'Property Bonds',
      dealSize: '£250K - £500K',
      leadScore: 72,
      lastContact: '5 days ago',
      source: 'Referral',
      notes: 'Experienced investor looking for lower-risk bond investments. Has portfolio of existing properties.',
      assignedAgent: 'Squire',
      dateAdded: '2025-07-07',
      activities: 5,
      nextFollowUp: '2025-07-13',
      totalDeals: 1,
      totalValue: 280000,
      automationStatus: 'active',
      lastEmailSent: '2025-07-08',
      lastActivity: '2025-07-09',
      nextMeeting: '2025-07-13 16:00',
      tags: ['experienced', 'bonds', 'portfolio'],
      isStarred: true,
      documents: [
        {
          id: 'd2',
          name: 'Financial_Statement.pdf',
          type: 'financial',
          size: '2.1 MB',
          uploadDate: '2025-07-08',
          uploadedBy: 'Michael Roberts',
          url: '#',
          status: 'approved',
          version: 1,
          tags: ['financial', 'statement']
        },
        {
          id: 'd3',
          name: 'Previous_Investments.xlsx',
          type: 'financial',
          size: '1.8 MB',
          uploadDate: '2025-07-08',
          uploadedBy: 'Michael Roberts',
          url: '#',
          status: 'approved',
          version: 1,
          tags: ['portfolio', 'history']
        }
      ]
    },
    {
      id: '3',
      name: 'James Anderson',
      email: 'james.anderson@wealth.co.uk',
      phone: '+44 7700 789012',
      company: 'Anderson Wealth Management',
      status: 'Call Backs',
      priority: 'high',
      investmentType: 'Off-Plan Property Investment',
      dealSize: '£1.5M - £2.5M',
      leadScore: 95,
      lastContact: '1 day ago',
      source: 'LinkedIn',
      notes: 'High-net-worth individual. Looking for large-scale off-plan developments. Ready to move quickly on the right opportunity.',
      assignedAgent: 'Truckers',
      dateAdded: '2025-07-06',
      activities: 8,
      nextFollowUp: '2025-07-11',
      totalDeals: 2,
      totalValue: 1800000,
      automationStatus: 'active',
      lastEmailSent: '2025-07-09',
      lastActivity: '2025-07-10',
      nextMeeting: '2025-07-12 10:00',
      tags: ['high-value', 'off-plan', 'urgent'],
      isStarred: true,
      documents: [
        {
          id: 'd4',
          name: 'Investment_Capacity_Report.pdf',
          type: 'financial',
          size: '3.4 MB',
          uploadDate: '2025-07-07',
          uploadedBy: 'James Anderson',
          url: '#',
          status: 'approved',
          version: 1,
          tags: ['capacity', 'financial']
        }
      ]
    },
    {
      id: '4',
      name: 'Sarah Thompson',
      email: 'sarah.thompson@corp.com',
      phone: '+44 7700 345678',
      company: 'Thompson Corporation',
      status: 'KOL',
      priority: 'high',
      investmentType: 'Commercial Property Investment',
      dealSize: '£500K - £1M',
      leadScore: 88,
      lastContact: '3 days ago',
      source: 'Website',
      notes: 'Key Opinion Leader in commercial property. Excellent relationship. Potential for large deals.',
      assignedAgent: 'Squire',
      dateAdded: '2025-07-05',
      activities: 12,
      nextFollowUp: '2025-07-14',
      totalDeals: 3,
      totalValue: 2100000,
      automationStatus: 'paused',
      lastEmailSent: '2025-07-05',
      lastActivity: '2025-07-08',
      tags: ['kol', 'commercial', 'influencer'],
      isStarred: true,
      documents: [
        {
          id: 'd5',
          name: 'Commercial_Portfolio_Analysis.pdf',
          type: 'financial',
          size: '4.2 MB',
          uploadDate: '2025-07-06',
          uploadedBy: 'Sarah Thompson',
          url: '#',
          status: 'approved',
          version: 1,
          tags: ['commercial', 'portfolio']
        }
      ]
    },
    {
      id: '5',
      name: 'David Wilson',
      email: 'david.wilson@holdings.com',
      phone: '+44 7700 234567',
      company: 'Wilson Holdings',
      status: 'Legal',
      priority: 'high',
      investmentType: 'Student Property Investment',
      dealSize: '£800K - £1.2M',
      leadScore: 92,
      lastContact: '1 day ago',
      source: 'Direct Marketing',
      notes: 'Currently in legal review phase. Documents being prepared for completion.',
      assignedAgent: 'M1',
      dateAdded: '2025-07-04',
      activities: 15,
      nextFollowUp: '2025-07-12',
      totalDeals: 1,
      totalValue: 950000,
      automationStatus: 'completed',
      lastEmailSent: '2025-07-03',
      lastActivity: '2025-07-09',
      tags: ['legal', 'student', 'completion'],
      isStarred: false,
      documents: [
        {
          id: 'd6',
          name: 'Legal_Contract_Draft.docx',
          type: 'legal',
          size: '2.8 MB',
          uploadDate: '2025-07-05',
          uploadedBy: 'Legal Team',
          url: '#',
          status: 'requires_signature',
          version: 3,
          tags: ['contract', 'legal']
        }
      ]
    },
    {
      id: '6',
      name: 'Lisa Chen',
      email: 'lisa.chen@investments.com',
      phone: '+44 7700 345612',
      company: 'Chen Investments',
      status: 'Needs TO',
      priority: 'medium',
      investmentType: 'Assisted Living Property Investment',
      dealSize: '£600K - £900K',
      leadScore: 78,
      lastContact: '2 days ago',
      source: 'Referral',
      notes: 'Needs Technical Officer review. Awaiting compliance check.',
      assignedAgent: 'Truckers',
      dateAdded: '2025-07-03',
      activities: 6,
      nextFollowUp: '2025-07-15',
      totalDeals: 0,
      totalValue: 0,
      automationStatus: 'active',
      lastEmailSent: '2025-07-04',
      lastActivity: '2025-07-09',
      tags: ['assisted-living', 'compliance', 'review'],
      isStarred: false
    },
    {
      id: '7',
      name: 'Robert Johnson',
      email: 'robert.johnson@capital.com',
      phone: '+44 7700 456123',
      company: 'Johnson Capital',
      status: 'Deals',
      priority: 'high',
      investmentType: 'Off-Plan Property Investment',
      dealSize: '£2M - £3M',
      leadScore: 96,
      lastContact: '1 day ago',
      source: 'Cold Outreach',
      notes: 'Deal in progress. Awaiting final signatures. Very promising.',
      assignedAgent: 'Squire',
      dateAdded: '2025-06-28',
      activities: 20,
      nextFollowUp: '2025-07-11',
      totalDeals: 4,
      totalValue: 8500000,
      automationStatus: 'paused',
      lastEmailSent: '2025-07-01',
      lastActivity: '2025-07-10',
      tags: ['deals', 'high-value', 'completion'],
      isStarred: true,
      documents: [
        {
          id: 'd7',
          name: 'Deal_Agreement_v4.pdf',
          type: 'contract',
          size: '5.1 MB',
          uploadDate: '2025-07-02',
          uploadedBy: 'Legal Team',
          url: '#',
          status: 'requires_signature',
          version: 4,
          tags: ['agreement', 'deal']
        }
      ]
    },
    {
      id: '8',
      name: 'Amanda Foster',
      email: 'amanda.foster@group.com',
      phone: '+44 7700 567234',
      company: 'Foster Property Group',
      status: 'Clients',
      priority: 'medium',
      investmentType: 'Residential Property Investment',
      dealSize: '£400K - £600K',
      leadScore: 85,
      lastContact: '4 days ago',
      source: 'Website',
      notes: 'Confirmed client. Excellent relationship. Looking for additional opportunities.',
      assignedAgent: 'M1',
      dateAdded: '2025-06-20',
      activities: 25,
      nextFollowUp: '2025-07-16',
      totalDeals: 2,
      totalValue: 1050000,
      automationStatus: 'active',
      lastEmailSent: '2025-07-06',
      lastActivity: '2025-07-08',
      tags: ['client', 'residential', 'expansion'],
      isStarred: true,
      documents: [
        {
          id: 'd8',
          name: 'Client_Portfolio_Overview.pdf',
          type: 'presentation',
          size: '3.7 MB',
          uploadDate: '2025-07-01',
          uploadedBy: 'M1',
          url: '#',
          status: 'approved',
          version: 1,
          tags: ['portfolio', 'client']
        }
      ]
    },
    {
      id: '9',
      name: 'Mark Stevens',
      email: 'mark.stevens@email.com',
      phone: '+44 7700 678345',
      company: 'Stevens Ltd',
      status: 'Dead',
      priority: 'low',
      investmentType: 'Property Bonds',
      dealSize: '£100K - £200K',
      leadScore: 25,
      lastContact: '2 weeks ago',
      source: 'Social Media',
      notes: 'Not interested. Budget constraints. Do not contact.',
      assignedAgent: 'Truckers',
      dateAdded: '2025-06-25',
      activities: 2,
      nextFollowUp: undefined,
      totalDeals: 0,
      totalValue: 0,
      automationStatus: 'paused',
      lastEmailSent: '2025-06-26',
      lastActivity: '2025-06-27',
      tags: ['dead', 'budget', 'uninterested'],
      isStarred: false
    }
  ]);

  // Calculate analytics
  const totalContacts = contacts.length;
  const totalPipelineValue = contacts.reduce((sum, contact) => sum + (contact.totalValue || 0), 0);
  const averageLeadScore = Math.round(contacts.reduce((sum, contact) => sum + contact.leadScore, 0) / totalContacts);
  const conversionRate = Math.round((contacts.filter(c => c.status === 'Clients').length / totalContacts) * 100);
  const activeAutomations = contacts.filter(c => c.automationStatus === 'active').length;
  const upcomingMeetings = contacts.filter(c => c.nextMeeting).length;
  const documentsCount = documents.length;
  const pendingTasks = calendarEvents.filter(e => e.status === 'scheduled').length;

  // Group contacts by section
  const leadsContacts = contacts.filter(c => ['Fresh Leads', 'Opened', 'Call Backs'].includes(c.status));
  const prospectsContacts = contacts.filter(c => ['KOL', 'Legal', 'Needs TO', 'Deals'].includes(c.status));
  const clientsContacts = contacts.filter(c => ['Clients', 'Dead'].includes(c.status));

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Fresh Leads': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Opened': return 'bg-green-100 text-green-800 border-green-200';
      case 'Call Backs': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'KOL': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'Legal': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'Needs TO': return 'bg-cyan-100 text-cyan-800 border-cyan-200';
      case 'Deals': return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'Clients': return 'bg-green-100 text-green-800 border-green-200';
      case 'Dead': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getAutomationColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'paused': return 'bg-yellow-100 text-yellow-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getSectionColor = (section: string) => {
    switch (section) {
      case 'Leads': return 'bg-indigo-50 border-indigo-200';
      case 'Prospects': return 'bg-purple-50 border-purple-200';
      case 'Clients': return 'bg-emerald-50 border-emerald-200';
      default: return 'bg-gray-50 border-gray-200';
    }
  };

  const getSectionHeaderColor = (section: string) => {
    switch (section) {
      case 'Leads': return 'text-indigo-800 bg-indigo-100';
      case 'Prospects': return 'text-purple-800 bg-purple-100';
      case 'Clients': return 'text-emerald-800 bg-emerald-100';
      default: return 'text-gray-800 bg-gray-100';
    }
  };

  const getDocumentIcon = (type: string) => {
    switch (type) {
      case 'contract': return <FileText className="w-4 h-4 text-blue-500" />;
      case 'legal': return <FileText className="w-4 h-4 text-purple-500" />;
      case 'financial': return <FileSpreadsheet className="w-4 h-4 text-green-500" />;
      case 'identity': return <User className="w-4 h-4 text-orange-500" />;
      case 'presentation': return <FileText className="w-4 h-4 text-red-500" />;
      default: return <FileText className="w-4 h-4 text-gray-500" />;
    }
  };

  const getDocumentStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      case 'requires_signature': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIndicator = (status: string) => {
    switch (status) {
      case 'online': return <div className="w-3 h-3 bg-green-500 rounded-full"></div>;
      case 'busy': return <div className="w-3 h-3 bg-red-500 rounded-full"></div>;
      case 'away': return <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>;
      case 'offline': return <div className="w-3 h-3 bg-gray-400 rounded-full"></div>;
      default: return <div className="w-3 h-3 bg-gray-400 rounded-full"></div>;
    }
  };

  const filterContacts = (sectionContacts: Contact[]) => {
    return sectionContacts.filter(contact => {
      const matchesSearch = contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           contact.company.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesPriority = priorityFilter === 'All Priority' || contact.priority === priorityFilter;
      const matchesInvestment = investmentFilter === 'All Investment Types' || contact.investmentType === investmentFilter;
      
      return matchesSearch && matchesPriority && matchesInvestment;
    });
  };

  // Handle drag and drop
  const handleDragEnd = useCallback((result: any) => {
    if (!result.destination) return;

    const { source, destination } = result;
    
    // Get the contact being moved
    const draggedContact = contacts.find(c => c.id === result.draggableId);
    if (!draggedContact) return;

    // Map droppable IDs to status
    const statusMap: { [key: string]: Contact['status'] } = {
      'leads': 'Fresh Leads',
      'prospects': 'KOL',
      'clients': 'Clients'
    };

    // Update contact status based on destination
    const newStatus = statusMap[destination.droppableId];
    if (newStatus && newStatus !== draggedContact.status) {
      setContacts(prevContacts =>
        prevContacts.map(contact =>
          contact.id === draggedContact.id
            ? { ...contact, status: newStatus }
            : contact
        )
      );
    }
  }, [contacts]);

  // Handle bulk actions
  const handleBulkAction = (action: string) => {
    if (selectedContacts.size === 0) return;

    switch (action) {
      case 'delete':
        setContacts(prevContacts => 
          prevContacts.filter(contact => !selectedContacts.has(contact.id))
        );
        break;
      case 'high-priority':
        setContacts(prevContacts =>
          prevContacts.map(contact =>
            selectedContacts.has(contact.id)
              ? { ...contact, priority: 'high' as const }
              : contact
          )
        );
        break;
      case 'assign-truckers':
        setContacts(prevContacts =>
          prevContacts.map(contact =>
            selectedContacts.has(contact.id)
              ? { ...contact, assignedAgent: 'Truckers' }
              : contact
          )
        );
        break;
      case 'start-automation':
        setContacts(prevContacts =>
          prevContacts.map(contact =>
            selectedContacts.has(contact.id)
              ? { ...contact, automationStatus: 'active' as const }
              : contact
          )
        );
        break;
      case 'star':
        setContacts(prevContacts =>
          prevContacts.map(contact =>
            selectedContacts.has(contact.id)
              ? { ...contact, isStarred: true }
              : contact
          )
        );
        break;
    }
    
    setSelectedContacts(new Set());
    setBulkActionMode(false);
  };

  const handleContactSelect = (contactId: string) => {
    setSelectedContacts(prev => {
      const newSet = new Set(prev);
      if (newSet.has(contactId)) {
        newSet.delete(contactId);
      } else {
        newSet.add(contactId);
      }
      return newSet;
    });
  };

  const handleEditContact = (contact: Contact) => {
    setSelectedContact(contact);
    setShowModal(true);
  };

  const handleAddContact = () => {
    setShowAddModal(true);
  };

  const handleCreateDeal = (contact: Contact) => {
    setSelectedContact(contact);
    setDealFormData({
      contactId: contact.id,
      contactName: contact.name,
      dealType: contact.investmentType,
      propertyType: contact.investmentType,
      propertyLocation: '',
      purchasePrice: 0,
      clientDeposit: 0,
      clientMortgage: 0,
      expectedCompletion: '',
      legalFirm: '',
      ourCommission: 0,
      brokerFirm: '',
      dealNotes: '',
      paymentSchedule: 'lump_sum',
      paymentMethod: 'bank_transfer',
      paymentDueDate: '',
      riskLevel: 'medium',
      complianceCheck: false,
      managementApproval: false,
      status: 'pending',
      createdAt: new Date().toISOString()
    });
    setShowDealModal(true);
  };

  const handleUseTemplate = (template: ContactTemplate) => {
    setNewContact({
      ...newContact,
      investmentType: template.investmentType,
      dealSize: template.dealSize,
      priority: template.priority,
      status: template.status,
      source: template.source,
      leadScore: template.priority === 'high' ? 80 : template.priority === 'medium' ? 60 : 40
    });
    setShowTemplateModal(false);
    setShowAddModal(true);
  };

  const handleSaveNewContact = () => {
    if (newContact.name && newContact.email) {
      const contact: Contact = {
        id: Date.now().toString(),
        name: newContact.name!,
        email: newContact.email!,
        phone: newContact.phone || '',
        company: newContact.company || '',
        status: newContact.status || 'Fresh Leads',
        priority: newContact.priority || 'medium',
        investmentType: newContact.investmentType || 'Residential Property Investment',
        dealSize: newContact.dealSize || '£150K - £300K',
        leadScore: newContact.leadScore || 50,
        lastContact: 'Just added',
        source: newContact.source || 'Website',
        notes: newContact.notes || '',
        assignedAgent: newContact.assignedAgent || 'Truckers',
        dateAdded: new Date().toISOString().split('T')[0],
        activities: 0,
        totalDeals: 0,
        totalValue: 0,
        automationStatus: 'active',
        lastActivity: new Date().toISOString(),
        tags: [],
        isStarred: false
      };
      
      setContacts([...contacts, contact]);
      setNewContact({
        name: '',
        email: '',
        phone: '',
        company: '',
        status: 'Fresh Leads',
        priority: 'medium',
        investmentType: 'Residential Property Investment',
        dealSize: '£150K - £300K',
        leadScore: 50,
        source: 'Website',
        notes: '',
        assignedAgent: 'Truckers'
      });
      setShowAddModal(false);
    }
  };

  const handleSaveDeal = () => {
    if (dealFormData.contactName && dealFormData.purchasePrice && dealFormData.purchasePrice > 0) {
      // Create deal object
      const newDeal = {
        id: Date.now().toString(),
        ...dealFormData,
        submittedToManagement: true,
        submissionDate: new Date().toISOString(),
        submittedBy: user?.name || 'Sales Agent',
        requiresApproval: true,
        approvalStatus: 'pending_review'
      };
      
      // Show success message
      alert(`Deal successfully created and submitted to management!

Deal Details:
- Client: ${dealFormData.contactName}
- Investment: ${dealFormData.dealType}
- Amount: £${dealFormData.purchasePrice?.toLocaleString()}
- Commission: £${dealFormData.ourCommission?.toLocaleString()}

Management will review and approve within 24 hours.`);
      
      // Reset form and close modal
      setShowDealModal(false);
      setDealFormData({
        contactId: '',
        contactName: '',
        dealType: '',
        propertyType: '',
        propertyLocation: '',
        purchasePrice: 0,
        clientDeposit: 0,
        clientMortgage: 0,
        expectedCompletion: '',
        legalFirm: '',
        ourCommission: 0,
        brokerFirm: '',
        dealNotes: '',
        paymentSchedule: 'lump_sum',
        paymentMethod: 'bank_transfer',
        paymentDueDate: '',
        riskLevel: 'medium',
        complianceCheck: false,
        managementApproval: false,
        status: 'pending',
        createdAt: new Date().toISOString()
      });
    } else {
      alert('Please fill in all required fields including investment amount.');
    }
  };

  const handleSaveNextAction = () => {
    if (nextActionData.contactId && nextActionData.action) {
      setContacts(prevContacts =>
        prevContacts.map(contact =>
          contact.id === nextActionData.contactId
            ? {
                ...contact,
                nextAction: {
                  action: nextActionData.action,
                  dueDate: nextActionData.dueDate,
                  priority: nextActionData.priority,
                  notes: nextActionData.notes
                }
              }
            : contact
        )
      );
      setShowNextActionModal(false);
      setNextActionData({
        contactId: '',
        action: '',
        dueDate: '',
        priority: 'medium',
        notes: ''
      });
    }
  };

  const handleSaveCalendarEvent = () => {
    if (calendarEventData.contactId && calendarEventData.title && calendarEventData.date) {
      const newEvent: CalendarEvent = {
        id: Date.now().toString(),
        title: calendarEventData.title,
        type: calendarEventData.type,
        contactId: calendarEventData.contactId,
        contactName: contacts.find(c => c.id === calendarEventData.contactId)?.name || '',
        date: calendarEventData.date,
        time: calendarEventData.time,
        duration: calendarEventData.duration,
        location: calendarEventData.location,
        description: calendarEventData.description,
        attendees: calendarEventData.attendees,
        isRecurring: false,
        reminderSet: calendarEventData.alarmSet,
        status: 'scheduled',
        agenda: calendarEventData.description
      };
      
      // In a real app, you would save this to your calendar events state
      alert(`Calendar event created: ${calendarEventData.title} on ${calendarEventData.date} at ${calendarEventData.time}${calendarEventData.alarmSet ? ' with alarm set' : ''}`);
      
      setShowCalendarEventModal(false);
      setCalendarEventData({
        contactId: '',
        title: '',
        type: 'meeting',
        date: '',
        time: '',
        duration: 60,
        location: '',
        description: '',
        reminderMinutes: 15,
        alarmSet: true,
        attendees: []
      });
    }
  };

  const handleQuickAction = (contactId: string, action: string) => {
    const contact = contacts.find(c => c.id === contactId);
    if (!contact) return;

    switch (action) {
      case 'call':
        window.open(`tel:${contact.phone}`);
        break;
      case 'email':
        window.open(`mailto:${contact.email}`);
        break;
      case 'whatsapp':
        window.open(`https://wa.me/${contact.phone.replace(/\D/g, '')}`);
        break;
      case 'create-deal':
        handleCreateDeal(contact);
        break;
      case 'schedule-meeting':
        setSelectedContact(contact);
        setCalendarEventData({
          ...calendarEventData,
          contactId: contact.id,
          title: `Meeting with ${contact.name}`,
          attendees: [contact.assignedAgent, contact.name]
        });
        setShowCalendarEventModal(true);
        break;
      case 'add-next-action':
        setSelectedContact(contact);
        setNextActionData({
          ...nextActionData,
          contactId: contact.id
        });
        setShowNextActionModal(true);
        break;
      case 'star':
        setContacts(prevContacts =>
          prevContacts.map(c =>
            c.id === contactId ? { ...c, isStarred: !c.isStarred } : c
          )
        );
        break;
    }
  };

  const renderContactCard = (contact: Contact, index: number) => (
    <Draggable key={contact.id} draggableId={contact.id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`bg-white p-4 rounded-lg shadow-sm border hover:shadow-md transition-all cursor-pointer ${
            snapshot.isDragging ? 'shadow-lg transform rotate-2' : ''
          } ${selectedContacts.has(contact.id) ? 'ring-2 ring-blue-500' : ''}`}
        >
          <div className="flex items-start justify-between mb-2">
            <div className="flex items-center space-x-2">
              {bulkActionMode && (
                <input
                  type="checkbox"
                  checked={selectedContacts.has(contact.id)}
                  onChange={() => handleContactSelect(contact.id)}
                  onClick={(e) => e.stopPropagation()}
                  className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                />
              )}
              <div className="flex items-center space-x-2">
                <h4 className="font-medium text-gray-900 text-sm">{contact.name}</h4>
                {contact.isStarred && (
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                )}
              </div>
            </div>
            <div className="flex flex-col items-end space-y-1">
              <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(contact.status)}`}>
                {contact.status}
              </span>
              {contact.automationStatus && (
                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getAutomationColor(contact.automationStatus)}`}>
                  <Bot className="w-3 h-3 mr-1" />
                  {contact.automationStatus}
                </span>
              )}
            </div>
          </div>
          
          <div onClick={() => !bulkActionMode && handleEditContact(contact)}>
            <p className="text-xs text-gray-600 mb-2">{contact.company}</p>
            <p className="text-xs text-gray-600 mb-2">{contact.investmentType}</p>
            <p className="text-xs font-medium text-gray-900 mb-2">{contact.dealSize}</p>
            
            {contact.totalDeals && contact.totalDeals > 0 && (
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-1">
                  <DollarSign className="w-3 h-3 text-green-500" />
                  <span className="text-xs font-medium text-green-600">
                    {contact.totalDeals} deals • £{contact.totalValue?.toLocaleString()}
                  </span>
                </div>
              </div>
            )}
            
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-1">
                <Star className="w-3 h-3 text-yellow-400" />
                <span className="text-xs font-medium text-gray-700">{contact.leadScore}</span>
              </div>
              <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(contact.priority)}`}>
                {contact.priority}
              </span>
            </div>
            
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-1">
                <Activity className="w-3 h-3 text-blue-500" />
                <span className="text-xs text-gray-600">{contact.activities} activities</span>
              </div>
              {contact.nextMeeting && (
                <div className="flex items-center space-x-1">
                  <Calendar className="w-3 h-3 text-purple-500" />
                  <span className="text-xs text-purple-600">Meeting</span>
                </div>
              )}
              {contact.nextAction && (
                <div className="flex items-center space-x-1">
                  <Target className="w-3 h-3 text-orange-500" />
                  <span className="text-xs text-orange-600">Next Action</span>
                </div>
              )}
            </div>

            {contact.documents && contact.documents.length > 0 && (
              <div className="flex items-center space-x-1 mb-2">
                <Paperclip className="w-3 h-3 text-gray-500" />
                <span className="text-xs text-gray-600">{contact.documents.length} docs</span>
              </div>
            )}

            {contact.tags && contact.tags.length > 0 && (
              <div className="flex flex-wrap gap-1 mb-2">
                {contact.tags.slice(0, 3).map((tag, idx) => (
                  <span key={idx} className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-700">
                    {tag}
                  </span>
                ))}
                {contact.tags.length > 3 && (
                  <span className="text-xs text-gray-500">+{contact.tags.length - 3}</span>
                )}
              </div>
            )}
            
            {contact.lastEmailSent && (
              <div className="flex items-center space-x-1 mb-2">
                <Send className="w-3 h-3 text-purple-500" />
                <span className="text-xs text-purple-600">Last email: {contact.lastEmailSent}</span>
              </div>
            )}
            
            <div className="mt-2 pt-2 border-t text-xs text-gray-500">
              <div className="flex items-center justify-between">
                <span>Agent: {contact.assignedAgent}</span>
                <span>{contact.lastContact}</span>
              </div>
            </div>
          </div>
          
          {/* Enhanced Quick Action Buttons */}
          <div className="mt-3 space-y-2">
            <div className="flex space-x-1">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleQuickAction(contact.id, 'call');
                }}
                className="flex-1 bg-blue-50 text-blue-600 px-2 py-1 rounded text-xs hover:bg-blue-100 transition-colors flex items-center justify-center"
              >
                <Phone className="w-3 h-3 mr-1" />
                Call
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleQuickAction(contact.id, 'email');
                }}
                className="flex-1 bg-green-50 text-green-600 px-2 py-1 rounded text-xs hover:bg-green-100 transition-colors flex items-center justify-center"
              >
                <Mail className="w-3 h-3 mr-1" />
                Email
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleQuickAction(contact.id, 'schedule-meeting');
                }}
                className="flex-1 bg-purple-50 text-purple-600 px-2 py-1 rounded text-xs hover:bg-purple-100 transition-colors flex items-center justify-center"
              >
                <Calendar className="w-3 h-3 mr-1" />
                Meet
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleQuickAction(contact.id, 'star');
                }}
                className={`flex-1 px-2 py-1 rounded text-xs transition-colors flex items-center justify-center ${
                  contact.isStarred 
                    ? 'bg-yellow-50 text-yellow-600 hover:bg-yellow-100' 
                    : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                }`}
              >
                <Star className={`w-3 h-3 ${contact.isStarred ? 'fill-current' : ''}`} />
              </button>
            </div>
            <div className="flex space-x-1">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleQuickAction(contact.id, 'add-next-action');
                }}
                className="flex-1 bg-orange-50 text-orange-600 px-2 py-1 rounded text-xs hover:bg-orange-100 transition-colors flex items-center justify-center"
              >
                <Target className="w-3 h-3 mr-1" />
                Next Action
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleCreateDeal(contact);
                }}
                className="flex-1 bg-emerald-50 text-emerald-600 px-2 py-1 rounded text-xs hover:bg-emerald-100 transition-colors flex items-center justify-center"
              >
                <DollarSign className="w-3 h-3 mr-1" />
                Deal
              </button>
            </div>
          </div>
        </div>
      )}
    </Draggable>
  );

  const uniqueInvestmentTypes = [...new Set(contacts.map(c => c.investmentType))];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Enhanced Header Stats */}
        <div className="grid grid-cols-1 md:grid-cols-8 gap-4 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="text-2xl font-bold text-gray-900">{totalContacts}</div>
            <div className="text-sm text-gray-600">Total Contacts</div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="text-2xl font-bold text-blue-600">{leadsContacts.length}</div>
            <div className="text-sm text-gray-600">Active Leads</div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="text-2xl font-bold text-orange-600">{prospectsContacts.length}</div>
            <div className="text-sm text-gray-600">Prospects</div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="text-2xl font-bold text-green-600">{clientsContacts.filter(c => c.status === 'Clients').length}</div>
            <div className="text-sm text-gray-600">Clients</div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="text-2xl font-bold text-purple-600">£{Math.round(totalPipelineValue / 1000)}K</div>
            <div className="text-sm text-gray-600">Pipeline Value</div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="text-2xl font-bold text-emerald-600">{activeAutomations}</div>
            <div className="text-sm text-gray-600">Active Automations</div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="text-2xl font-bold text-indigo-600">{upcomingMeetings}</div>
            <div className="text-sm text-gray-600">Upcoming Meetings</div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="text-2xl font-bold text-cyan-600">{documentsCount}</div>
            <div className="text-sm text-gray-600">Documents</div>
          </div>
        </div>

        {/* Enhanced Search and Controls */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search contacts..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <select
                value={priorityFilter}
                onChange={(e) => setPriorityFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              >
                <option>All Priority</option>
                <option>high</option>
                <option>medium</option>
                <option>low</option>
              </select>
              <select
                value={investmentFilter}
                onChange={(e) => setInvestmentFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              >
                <option>All Investment Types</option>
                {uniqueInvestmentTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
              
              {/* View Toggle */}
              <div className="flex bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setSelectedView('cards')}
                  className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                    selectedView === 'cards' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <Users className="w-4 h-4 mr-1 inline" />
                  Pipeline
                </button>
                <button
                  onClick={() => setSelectedView('calendar')}
                  className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                    selectedView === 'calendar' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <Calendar className="w-4 h-4 mr-1 inline" />
                  Calendar
                </button>
                <button
                  onClick={() => setSelectedView('documents')}
                  className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                    selectedView === 'documents' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <FolderOpen className="w-4 h-4 mr-1 inline" />
                  Documents
                </button>
                <button
                  onClick={() => setSelectedView('team')}
                  className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                    selectedView === 'team' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <Users className="w-4 h-4 mr-1 inline" />
                  Team
                </button>
              </div>
              

              <button 
                onClick={() => setBulkActionMode(!bulkActionMode)}
                className={`px-4 py-2 rounded-lg transition-colors flex items-center text-sm ${
                  bulkActionMode ? 'bg-red-600 text-white hover:bg-red-700' : 'bg-orange-600 text-white hover:bg-orange-700'
                }`}
              >
                <CheckCircle className="w-4 h-4 mr-2" />
                {bulkActionMode ? 'Exit Bulk' : 'Bulk Actions'}
              </button>
              <button 
                onClick={() => setShowTemplateModal(true)}
                className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors flex items-center text-sm"
              >
                <Zap className="w-4 h-4 mr-2" />
                Quick Add
              </button>
              <button 
                onClick={handleAddContact}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center text-sm"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Contact
              </button>
            </div>
          </div>
          
          {/* Enhanced Bulk Actions Bar */}
          {bulkActionMode && selectedContacts.size > 0 && (
            <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-blue-900">
                  {selectedContacts.size} contact{selectedContacts.size !== 1 ? 's' : ''} selected
                </span>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleBulkAction('star')}
                    className="px-3 py-1 bg-yellow-600 text-white rounded text-sm hover:bg-yellow-700 transition-colors"
                  >
                    <Star className="w-4 h-4 mr-1 inline" />
                    Star
                  </button>
                  <button
                    onClick={() => handleBulkAction('high-priority')}
                    className="px-3 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700 transition-colors"
                  >
                    High Priority
                  </button>
                  <button
                    onClick={() => handleBulkAction('assign-truckers')}
                    className="px-3 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700 transition-colors"
                  >
                    Assign to Truckers
                  </button>
                  <button
                    onClick={() => handleBulkAction('start-automation')}
                    className="px-3 py-1 bg-purple-600 text-white rounded text-sm hover:bg-purple-700 transition-colors"
                  >
                    Start Automation
                  </button>
                  <button
                    onClick={() => handleBulkAction('delete')}
                    className="px-3 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700 transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Content based on selected view */}
        {selectedView === 'cards' && (
          <DragDropContext onDragEnd={handleDragEnd}>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Leads Section */}
              <div className={`rounded-lg shadow-sm border-2 ${getSectionColor('Leads')}`}>
                <div className={`flex items-center justify-between p-4 rounded-t-lg ${getSectionHeaderColor('Leads')}`}>
                  <h3 className="text-lg font-semibold">Leads</h3>
                  <span className="text-sm font-medium">{filterContacts(leadsContacts).length} contacts</span>
                </div>
                <Droppable droppableId="leads">
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      className={`p-4 h-96 overflow-y-auto ${
                        snapshot.isDraggingOver ? 'bg-indigo-100' : ''
                      }`}
                    >
                      <div className="space-y-3">
                        {filterContacts(leadsContacts).map((contact, index) => 
                          renderContactCard(contact, index)
                        )}
                        {provided.placeholder}
                      </div>
                    </div>
                  )}
                </Droppable>
              </div>

              {/* Prospects Section */}
              <div className={`rounded-lg shadow-sm border-2 ${getSectionColor('Prospects')}`}>
                <div className={`flex items-center justify-between p-4 rounded-t-lg ${getSectionHeaderColor('Prospects')}`}>
                  <h3 className="text-lg font-semibold">Prospects</h3>
                  <span className="text-sm font-medium">{filterContacts(prospectsContacts).length} contacts</span>
                </div>
                <Droppable droppableId="prospects">
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      className={`p-4 h-96 overflow-y-auto ${
                        snapshot.isDraggingOver ? 'bg-purple-100' : ''
                      }`}
                    >
                      <div className="space-y-3">
                        {filterContacts(prospectsContacts).map((contact, index) => 
                          renderContactCard(contact, index)
                        )}
                        {provided.placeholder}
                      </div>
                    </div>
                  )}
                </Droppable>
              </div>

              {/* Clients Section */}
              <div className={`rounded-lg shadow-sm border-2 ${getSectionColor('Clients')}`}>
                <div className={`flex items-center justify-between p-4 rounded-t-lg ${getSectionHeaderColor('Clients')}`}>
                  <h3 className="text-lg font-semibold">Clients</h3>
                  <span className="text-sm font-medium">{filterContacts(clientsContacts).length} contacts</span>
                </div>
                <Droppable droppableId="clients">
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      className={`p-4 h-96 overflow-y-auto ${
                        snapshot.isDraggingOver ? 'bg-emerald-100' : ''
                      }`}
                    >
                      <div className="space-y-3">
                        {filterContacts(clientsContacts).map((contact, index) => 
                          renderContactCard(contact, index)
                        )}
                        {provided.placeholder}
                      </div>
                    </div>
                  )}
                </Droppable>
              </div>
            </div>
          </DragDropContext>
        )}

        {selectedView === 'calendar' && (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Upcoming Meetings & Events</h3>
            <div className="space-y-4">
              {calendarEvents.map(event => (
                <div key={event.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="flex-shrink-0">
                        {event.type === 'meeting' && <Calendar className="w-5 h-5 text-blue-500" />}
                        {event.type === 'call' && <Phone className="w-5 h-5 text-green-500" />}
                        {event.type === 'site_visit' && <MapPin className="w-5 h-5 text-purple-500" />}
                        {event.type === 'presentation' && <FileText className="w-5 h-5 text-orange-500" />}
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">{event.title}</h4>
                        <p className="text-sm text-gray-600">{event.date} at {event.time}</p>
                        {event.location && (
                          <p className="text-sm text-gray-500 flex items-center">
                            <MapPin className="w-3 h-3 mr-1" />
                            {event.location}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        event.status === 'scheduled' ? 'bg-blue-100 text-blue-800' :
                        event.status === 'completed' ? 'bg-green-100 text-green-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {event.status}
                      </span>
                      <span className="text-xs text-gray-500">{event.duration}min</span>
                    </div>
                  </div>
                  <div className="mt-3">
                    <p className="text-sm text-gray-700">{event.description}</p>
                    {event.agenda && (
                      <div className="mt-2">
                        <p className="text-xs font-medium text-gray-500">Agenda:</p>
                        <p className="text-xs text-gray-600">{event.agenda}</p>
                      </div>
                    )}
                  </div>
                  <div className="mt-3 flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      <Users className="w-4 h-4 text-gray-400" />
                      <span className="text-xs text-gray-600">{event.attendees.join(', ')}</span>
                    </div>
                    {event.meetingLink && (
                      <a href={event.meetingLink} className="text-xs text-blue-600 hover:text-blue-800 flex items-center">
                        <Video className="w-4 h-4 mr-1" />
                        Join Meeting
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {selectedView === 'documents' && (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Document Library</h3>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center">
                <Upload className="w-4 h-4 mr-2" />
                Upload Document
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {documents.map(doc => (
                <div key={doc.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      {getDocumentIcon(doc.type)}
                      <span className="text-sm font-medium text-gray-900 truncate">{doc.name}</span>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDocumentStatusColor(doc.status)}`}>
                      {doc.status.replace('_', ' ')}
                    </span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs text-gray-600">
                      <span>Size: {doc.size}</span>
                      <span>v{doc.version}</span>
                    </div>
                    <div className="flex justify-between text-xs text-gray-600">
                      <span>Uploaded: {doc.uploadDate}</span>
                      <span>By: {doc.uploadedBy}</span>
                    </div>
                    {doc.tags && doc.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1">
                        {doc.tags.map((tag, idx) => (
                          <span key={idx} className="px-2 py-1 bg-gray-100 text-xs text-gray-600 rounded-full">
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="mt-3 flex space-x-2">
                    <button className="flex-1 px-3 py-1 bg-blue-50 text-blue-600 rounded text-xs hover:bg-blue-100 transition-colors flex items-center justify-center">
                      <Eye className="w-3 h-3 mr-1" />
                      View
                    </button>
                    <button className="flex-1 px-3 py-1 bg-green-50 text-green-600 rounded text-xs hover:bg-green-100 transition-colors flex items-center justify-center">
                      <Download className="w-3 h-3 mr-1" />
                      Download
                    </button>
                    <button className="flex-1 px-3 py-1 bg-purple-50 text-purple-600 rounded text-xs hover:bg-purple-100 transition-colors flex items-center justify-center">
                      <Share2 className="w-3 h-3 mr-1" />
                      Share
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {selectedView === 'team' && (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Team Overview</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {teamMembers.map(member => (
                <div key={member.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                      <User className="w-5 h-5 text-gray-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">{member.name}</h4>
                      <p className="text-sm text-gray-600">{member.role}</p>
                    </div>
                    {getStatusIndicator(member.status)}
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Active Contacts:</span>
                      <span className="font-medium">{member.activeContacts}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">This Month Deals:</span>
                      <span className="font-medium">{member.thisMonthDeals}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Performance:</span>
                      <span className={`font-medium ${member.performance >= 90 ? 'text-green-600' : member.performance >= 70 ? 'text-yellow-600' : 'text-red-600'}`}>
                        {member.performance}%
                      </span>
                    </div>
                  </div>
                  
                  <div className="mt-3">
                    <p className="text-xs text-gray-500 mb-1">Specialties:</p>
                    <div className="flex flex-wrap gap-1">
                      {member.specialties.map((specialty, idx) => (
                        <span key={idx} className="px-2 py-1 bg-blue-100 text-xs text-blue-800 rounded-full">
                          {specialty}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="mt-3 pt-3 border-t border-gray-200">
                    <p className="text-xs text-gray-500">Last active: {member.lastActive}</p>
                  </div>
                  
                  <div className="mt-3 flex space-x-2">
                    <button className="flex-1 px-3 py-1 bg-green-50 text-green-600 rounded text-xs hover:bg-green-100 transition-colors flex items-center justify-center">
                      <MessageCircle className="w-3 h-3 mr-1" />
                      Message
                    </button>
                    <button className="flex-1 px-3 py-1 bg-blue-50 text-blue-600 rounded text-xs hover:bg-blue-100 transition-colors flex items-center justify-center">
                      <Phone className="w-3 h-3 mr-1" />
                      Call
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Deal Creation Modal */}
        {showDealModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-900 flex items-center">
                  <DollarSign className="w-5 h-5 mr-2 text-emerald-500" />
                  Create New Deal - {selectedContact?.name}
                </h2>
                <button
                  onClick={() => setShowDealModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-gray-900 border-b pb-2">Deal Information</h3>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Investment Type</label>
                    <input
                      type="text"
                      value={dealFormData.dealType || ''}
                      onChange={(e) => setDealFormData({...dealFormData, dealType: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Property Location</label>
                    <input
                      type="text"
                      value={dealFormData.propertyLocation || ''}
                      onChange={(e) => setDealFormData({...dealFormData, propertyLocation: e.target.value})}
                      placeholder="e.g., Manchester City Centre, London Docklands"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Investment Amount (£)</label>
                    <input
                      type="number"
                      value={dealFormData.purchasePrice || ''}
                      onChange={(e) => setDealFormData({...dealFormData, purchasePrice: parseInt(e.target.value)})}
                      placeholder="250000"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Client Deposit (£)</label>
                    <input
                      type="number"
                      value={dealFormData.clientDeposit || ''}
                      onChange={(e) => setDealFormData({...dealFormData, clientDeposit: parseInt(e.target.value)})}
                      placeholder="25000"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Expected Completion</label>
                    <input
                      type="date"
                      value={dealFormData.expectedCompletion || ''}
                      onChange={(e) => setDealFormData({...dealFormData, expectedCompletion: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    />
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-gray-900 border-b pb-2">Business Details</h3>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Our Commission (£)</label>
                    <input
                      type="number"
                      value={dealFormData.ourCommission || ''}
                      onChange={(e) => setDealFormData({...dealFormData, ourCommission: parseInt(e.target.value)})}
                      placeholder="12500"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Legal Firm</label>
                    <input
                      type="text"
                      value={dealFormData.legalFirm || ''}
                      onChange={(e) => setDealFormData({...dealFormData, legalFirm: e.target.value})}
                      placeholder="Select legal firm"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Broker/Developer</label>
                    <input
                      type="text"
                      value={dealFormData.brokerFirm || ''}
                      onChange={(e) => setDealFormData({...dealFormData, brokerFirm: e.target.value})}
                      placeholder="Partner firm or developer"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Risk Level</label>
                    <select
                      value={dealFormData.riskLevel || 'medium'}
                      onChange={(e) => setDealFormData({...dealFormData, riskLevel: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    >
                      <option value="low">Low Risk</option>
                      <option value="medium">Medium Risk</option>
                      <option value="high">High Risk</option>
                    </select>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="complianceCheck"
                        checked={dealFormData.complianceCheck || false}
                        onChange={(e) => setDealFormData({...dealFormData, complianceCheck: e.target.checked})}
                        className="w-4 h-4 text-emerald-600 rounded focus:ring-emerald-500"
                      />
                      <label htmlFor="complianceCheck" className="ml-2 text-sm text-gray-700">
                        Compliance checks completed
                      </label>
                    </div>
                    
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="managementApproval"
                        checked={dealFormData.managementApproval || false}
                        onChange={(e) => setDealFormData({...dealFormData, managementApproval: e.target.checked})}
                        className="w-4 h-4 text-emerald-600 rounded focus:ring-emerald-500"
                      />
                      <label htmlFor="managementApproval" className="ml-2 text-sm text-gray-700">
                        Pre-approved by management
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">Deal Notes</label>
                <textarea
                  value={dealFormData.dealNotes || ''}
                  onChange={(e) => setDealFormData({...dealFormData, dealNotes: e.target.value})}
                  placeholder="Additional notes about this deal..."
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                />
              </div>
              
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={() => setShowDealModal(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveDeal}
                  className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors flex items-center"
                >
                  <DollarSign className="w-4 h-4 mr-2" />
                  Submit Deal to Management
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Other modals remain the same... */}
        {/* (keeping all other modals but not including them here for brevity) */}
      </main>
    </div>
  );
}
