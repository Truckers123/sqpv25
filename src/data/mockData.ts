/**
 * Mock data for the Property Investment CRM system
 */

import { Contact, Deal, InvestmentType, SalesAgent, ActivityItem, Task, DashboardMetrics } from '../types';

export const mockContacts: Contact[] = [
  {
    id: '1',
    firstName: 'Emma',
    lastName: 'Davies',
    email: 'emma.davies@gmail.com',
    phone: '+44 7700 456789',
    company: '',
    status: 'new',
    priority: 'medium',
    leadScore: 65,
    source: 'Property Portal',
    preferredContact: 'phone',
    investmentType: 'Residential Property Investment',
    investmentRange: '£150K - £300K',
    notes: 'First-time property investor. Interested in residential buy-to-let. Needs guidance on the process. Very keen to learn.',
    createdAt: new Date('2025-07-08'),
    updatedAt: new Date('2025-07-10')
  },
  {
    id: '2',
    firstName: 'Michael',
    lastName: 'Roberts',
    email: 'michael.roberts@email.com',
    phone: '+44 7700 567890',
    company: 'Roberts Holdings',
    status: 'warm',
    priority: 'medium',
    leadScore: 72,
    source: 'Referral',
    preferredContact: 'email',
    investmentType: 'Property Bonds',
    investmentRange: '£250K - £500K',
    notes: 'Experienced investor looking for bond opportunities.',
    createdAt: new Date('2025-07-07'),
    updatedAt: new Date('2025-07-09')
  },
  {
    id: '3',
    firstName: 'James',
    lastName: 'Anderson',
    email: 'james.anderson@email.com',
    phone: '+44 7700 678901',
    company: 'Anderson Investments',
    status: 'hot',
    priority: 'high',
    leadScore: 95,
    source: 'Website',
    preferredContact: 'phone',
    investmentType: 'Off-Plan Property Investment',
    investmentRange: '£1.5M - £2.5M',
    notes: 'High-value client interested in off-plan developments.',
    createdAt: new Date('2025-07-06'),
    updatedAt: new Date('2025-07-10')
  },
  {
    id: '4',
    firstName: 'Sarah',
    lastName: 'Thompson',
    email: 'sarah.thompson@email.com',
    phone: '+44 7700 789012',
    company: 'Thompson Capital',
    status: 'client',
    priority: 'high',
    leadScore: 88,
    source: 'LinkedIn',
    preferredContact: 'email',
    investmentType: 'Commercial Property Investment',
    investmentRange: '£500K - £1M',
    notes: 'Established client with multiple commercial properties.',
    createdAt: new Date('2025-06-15'),
    updatedAt: new Date('2025-07-08')
  }
];

export const mockInvestmentTypes: InvestmentType[] = [
  {
    id: '1',
    name: 'Off-Plan Property Investment',
    description: 'Invest early in developments still under construction or planning to maximize potential returns.',
    totalValue: 1200000,
    totalDeals: 8,
    roi: 23.5,
    leads: 18,
    deals: 3
  },
  {
    id: '2',
    name: 'Student Property Investment',
    description: 'Target high-demand rental markets in established university cities.',
    totalValue: 720000,
    totalDeals: 6,
    roi: 21.3,
    leads: 25,
    deals: 5
  },
  {
    id: '3',
    name: 'Assisted Living Property Investment',
    description: 'Investing in properties designed for elderly or disabled tenants.',
    totalValue: 640000,
    totalDeals: 4,
    roi: 19.7,
    leads: 28,
    deals: 6
  },
  {
    id: '4',
    name: 'Commercial Property Investment',
    description: 'Own income-generating office spaces, retail units, and industrial buildings with business tenants.',
    totalValue: 2400000,
    totalDeals: 12,
    roi: 18.2,
    leads: 22,
    deals: 4
  },
  {
    id: '5',
    name: 'Residential Property Investment',
    description: 'Invest in properties for long-term rental or sale, offering steady returns and potential for capital growth.',
    totalValue: 1800000,
    totalDeals: 15,
    roi: 15.8,
    leads: 19,
    deals: 2
  },
  {
    id: '6',
    name: 'Property Bonds',
    description: 'Secure investment products backed by property assets.',
    totalValue: 400000,
    totalDeals: 2,
    roi: 12.5,
    leads: 23,
    deals: 3
  }
];

export const mockSalesAgents: SalesAgent[] = [
  {
    id: '1',
    name: 'Truckers',
    avatar: 'https://pub-cdn.sider.ai/u/U09GHAWWJ2J/web-coder/68701197711d0815fd1b0005/resource/95075d60-3af2-4479-96fe-b451529f152c.jpg',
    deals: 8,
    revenue: 1450000,
    conversion: 62,
    thisMonth: 2,
    rank: 1,
    isChampion: true
  },
  {
    id: '2',
    name: "Charles 'Squire' Sinclair",
    avatar: 'https://pub-cdn.sider.ai/u/U09GHAWWJ2J/web-coder/68701197711d0815fd1b0005/resource/4a99ca6a-44bb-4381-907d-51f43b4765fa.jpg',
    deals: 6,
    revenue: 980000,
    conversion: 48,
    thisMonth: 1,
    rank: 2,
    isChampion: false
  },
  {
    id: '3',
    name: 'M1 - Gaffer',
    avatar: 'https://pub-cdn.sider.ai/u/U09GHAWWJ2J/web-coder/68701197711d0815fd1b0005/resource/07472e93-d54b-4ae9-acd0-7077fea91741.jpg',
    deals: 4,
    revenue: 750000,
    conversion: 35,
    thisMonth: 0,
    rank: 3,
    isChampion: false
  },
  {
    id: '4',
    name: "David 'Rosie' Walsh",
    avatar: 'https://pub-cdn.sider.ai/u/U09GHAWWJ2J/web-coder/68701197711d0815fd1b0005/resource/377f046e-e4c2-45f9-8983-f8097f0ac043.jpg',
    deals: 5,
    revenue: 825000,
    conversion: 55,
    thisMonth: 1,
    rank: 4,
    isChampion: false
  },
  {
    id: '5',
    name: "Simon 'The Cleaner' Wilson",
    avatar: 'https://pub-cdn.sider.ai/u/U09GHAWWJ2J/web-coder/68701197711d0815fd1b0005/resource/2557b485-975d-4b32-8c29-daa3511b51e8.jpg',
    deals: 3,
    revenue: 560000,
    conversion: 42,
    thisMonth: 1,
    rank: 5,
    isChampion: false
  },
  {
    id: '6',
    name: "Alex 'JW' Foster",
    avatar: 'https://pub-cdn.sider.ai/u/U09GHAWWJ2J/web-coder/68701197711d0815fd1b0005/resource/69e92374-6f3c-42f1-93f5-a69c46ce11ed.jpg',
    deals: 2,
    revenue: 380000,
    conversion: 38,
    thisMonth: 0,
    rank: 6,
    isChampion: false
  },
  {
    id: '7',
    name: "Ed 'Top Dog' Snell",
    avatar: 'https://pub-cdn.sider.ai/u/U09GHAWWJ2J/web-coder/68701197711d0815fd1b0005/resource/9c00c1f1-42cb-46e8-8785-4718d6555787.jpg',
    deals: 7,
    revenue: 1200000,
    conversion: 58,
    thisMonth: 2,
    rank: 7,
    isChampion: false
  }
];

export const mockActivities: ActivityItem[] = [
  {
    id: '1',
    type: 'lead',
    title: 'New lead added',
    description: 'James Anderson',
    user: 'System',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000)
  },
  {
    id: '2',
    type: 'task',
    title: 'Task completed',
    description: 'CRM configuration',
    user: "David 'Rosie' Walsh",
    timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000)
  },
  {
    id: '3',
    type: 'meeting',
    title: 'Meeting scheduled',
    description: 'Sarah Thompson',
    user: 'Truckers',
    timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000)
  },
  {
    id: '4',
    type: 'proposal',
    title: 'Proposal sent',
    description: 'Michael Roberts',
    user: "Charles 'Squire' Sinclair",
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000)
  },
  {
    id: '5',
    type: 'deal',
    title: 'Deal closed',
    description: 'Commercial property investment',
    user: "Ed 'Top Dog' Snell",
    timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000)
  },
  {
    id: '6',
    type: 'contact',
    title: 'Client follow-up',
    description: 'Investment consultation',
    user: "Simon 'The Cleaner' Wilson",
    timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000)
  }
];

export const mockTasks: Task[] = [
  {
    id: '1',
    title: 'Complete website design',
    assignee: 'Truckers',
    dueDate: new Date('2025-07-12'),
    priority: 'high',
    status: 'pending'
  },
  {
    id: '2',
    title: 'Finalize bond brochures',
    assignee: "Charles 'Squire' Sinclair",
    dueDate: new Date('2025-07-11'),
    priority: 'high',
    status: 'pending'
  },
  {
    id: '3',
    title: 'Setup Mailchimp campaigns',
    assignee: 'M1 - Gaffer',
    dueDate: new Date('2025-07-13'),
    priority: 'medium',
    status: 'pending'
  },
  {
    id: '4',
    title: 'Open business bank accounts',
    assignee: "Ed 'Top Dog' Snell",
    dueDate: new Date('2025-07-11'),
    priority: 'high',
    status: 'pending'
  },
  {
    id: '5',
    title: 'Server maintenance',
    assignee: "David 'Rosie' Walsh",
    dueDate: new Date('2025-07-14'),
    priority: 'medium',
    status: 'pending'
  },
  {
    id: '6',
    title: 'Database cleanup',
    assignee: "Simon 'The Cleaner' Wilson",
    dueDate: new Date('2025-07-15'),
    priority: 'low',
    status: 'pending'
  },
  {
    id: '7',
    title: 'Client presentation prep',
    assignee: "Alex 'JW' Foster",
    dueDate: new Date('2025-07-16'),
    priority: 'medium',
    status: 'pending'
  }
];

export const mockDashboardMetrics: DashboardMetrics = {
  totalContacts: 47,
  activeLeads: 23,
  clients: 12,
  conversionRate: 51,
  pipelineValue: 1250000,
  teamPerformance: 94,
  responseTime: 2.3,
  avgLeadScore: 80,
  monthlyRevenue: 450000,
  dealsClosedThisMonth: 3
};
