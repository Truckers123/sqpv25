/**
 * Type definitions for the CRM system
 */

export interface User {
  id: string;
  username: string;
  password: string;
  name: string;
  role: string;
  department: string;
  permissions: string[];
  accessLevel?: 'board' | 'management' | 'sales' | 'support';
  status: 'active' | 'inactive' | 'suspended';
  canDelete?: boolean;
  requiresTwoFA?: boolean;
}

export interface Contact {
  id: string;
  name: string;
  email: string;
  phone: string;
  company?: string;
  status: 'lead' | 'client' | 'prospect';
  lastContact?: Date;
  notes?: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
  status: 'pending' | 'in_progress' | 'completed';
  assignedTo?: string;
  dueDate?: Date;
  createdAt: Date;
}

export interface ActivityItem {
  id: string;
  title: string;
  description: string;
  type: 'lead' | 'task' | 'meeting' | 'proposal' | 'call' | 'email';
  timestamp: Date;
  userId?: string;
  contactId?: string;
}

export interface Deal {
  id: string;
  title: string;
  value: number;
  status: 'prospect' | 'negotiation' | 'closed_won' | 'closed_lost';
  contactId: string;
  assignedTo: string;
  createdAt: Date;
  closedAt?: Date;
}
