/**
 * ContactModal component - Modal for editing and creating contacts
 * Comprehensive form with all contact fields and validation
 */

import React, { useState, useEffect } from 'react';
import { X, User, Phone, Mail, Building, Target, Star, MessageSquare, Calendar, Save } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Textarea } from './ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';

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

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  contact: Contact | null;
  onSave: (contact: Contact) => void;
  isAddingNew: boolean;
}

export default function ContactModal({ isOpen, onClose, contact, onSave, isAddingNew }: ContactModalProps) {
  const [formData, setFormData] = useState<Partial<Contact>>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    status: 'New Lead',
    priority: 'Medium',
    leadScore: 50,
    investmentType: 'Residential Property Investment',
    dealSize: '£50K - £100K',
    source: 'Website',
    preferredContact: 'Email',
    notes: '',
    interactions: 0
  });

  useEffect(() => {
    if (contact && !isAddingNew) {
      setFormData(contact);
    } else if (isAddingNew) {
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        company: '',
        status: 'New Lead',
        priority: 'Medium',
        leadScore: 50,
        investmentType: 'Residential Property Investment',
        dealSize: '£50K - £100K',
        source: 'Website',
        preferredContact: 'Email',
        notes: '',
        interactions: 0
      });
    }
  }, [contact, isAddingNew]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.firstName && formData.lastName && formData.email) {
      onSave(formData as Contact);
    }
  };

  const handleInputChange = (field: keyof Contact, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <User className="w-5 h-5" />
            <span>{isAddingNew ? 'Add New Contact' : `Edit Contact - ${contact?.firstName} ${contact?.lastName}`}</span>
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Basic Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName">First Name *</Label>
                <Input
                  id="firstName"
                  value={formData.firstName || ''}
                  onChange={(e) => handleInputChange('firstName', e.target.value)}
                  required
                  placeholder="Enter first name"
                />
              </div>
              <div>
                <Label htmlFor="lastName">Last Name *</Label>
                <Input
                  id="lastName"
                  value={formData.lastName || ''}
                  onChange={(e) => handleInputChange('lastName', e.target.value)}
                  required
                  placeholder="Enter last name"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="email">Email *</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    id="email"
                    type="email"
                    value={formData.email || ''}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    required
                    placeholder="Enter email address"
                    className="pl-10"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="phone">Phone</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    id="phone"
                    value={formData.phone || ''}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    placeholder="Enter phone number"
                    className="pl-10"
                  />
                </div>
              </div>
            </div>

            <div>
              <Label htmlFor="company">Company</Label>
              <div className="relative">
                <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  id="company"
                  value={formData.company || ''}
                  onChange={(e) => handleInputChange('company', e.target.value)}
                  placeholder="Enter company name"
                  className="pl-10"
                />
              </div>
            </div>
          </div>

          {/* Lead Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Lead Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="status">Status</Label>
                <Select value={formData.status} onValueChange={(value) => handleInputChange('status', value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="New Lead">New Lead</SelectItem>
                    <SelectItem value="Warm Lead">Warm Lead</SelectItem>
                    <SelectItem value="Hot Lead">Hot Lead</SelectItem>
                    <SelectItem value="Client">Client</SelectItem>
                    <SelectItem value="Past Client">Past Client</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="priority">Priority</Label>
                <Select value={formData.priority} onValueChange={(value) => handleInputChange('priority', value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="High">High</SelectItem>
                    <SelectItem value="Medium">Medium</SelectItem>
                    <SelectItem value="Low">Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="leadScore">Lead Score</Label>
                <div className="relative">
                  <Star className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    id="leadScore"
                    type="number"
                    min="0"
                    max="100"
                    value={formData.leadScore || 50}
                    onChange={(e) => handleInputChange('leadScore', parseInt(e.target.value))}
                    className="pl-10"
                  />
                </div>
              </div>
            </div>

            <div>
              <Label htmlFor="investmentType">Investment Type</Label>
              <Select value={formData.investmentType} onValueChange={(value) => handleInputChange('investmentType', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Residential Property Investment">Residential Property Investment</SelectItem>
                  <SelectItem value="Commercial Property Investment">Commercial Property Investment</SelectItem>
                  <SelectItem value="Off-Plan Property Investment">Off-Plan Property Investment</SelectItem>
                  <SelectItem value="Student Property Investment">Student Property Investment</SelectItem>
                  <SelectItem value="Assisted Living Property Investment">Assisted Living Property Investment</SelectItem>
                  <SelectItem value="Property Bonds">Property Bonds</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="dealSize">Deal Size</Label>
              <Select value={formData.dealSize} onValueChange={(value) => handleInputChange('dealSize', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="£50K - £100K">£50K - £100K</SelectItem>
                  <SelectItem value="£100K - £250K">£100K - £250K</SelectItem>
                  <SelectItem value="£250K - £500K">£250K - £500K</SelectItem>
                  <SelectItem value="£500K - £1M">£500K - £1M</SelectItem>
                  <SelectItem value="£1M - £2.5M">£1M - £2.5M</SelectItem>
                  <SelectItem value="£2.5M+">£2.5M+</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Contact Preferences */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Contact Preferences</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="source">Source</Label>
                <Select value={formData.source} onValueChange={(value) => handleInputChange('source', value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Website">Website</SelectItem>
                    <SelectItem value="Property Portal">Property Portal</SelectItem>
                    <SelectItem value="Referral">Referral</SelectItem>
                    <SelectItem value="Direct Marketing">Direct Marketing</SelectItem>
                    <SelectItem value="Social Media">Social Media</SelectItem>
                    <SelectItem value="Cold Outreach">Cold Outreach</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="preferredContact">Preferred Contact</Label>
                <Select value={formData.preferredContact} onValueChange={(value) => handleInputChange('preferredContact', value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Email">Email</SelectItem>
                    <SelectItem value="Phone">Phone</SelectItem>
                    <SelectItem value="SMS">SMS</SelectItem>
                    <SelectItem value="WhatsApp">WhatsApp</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Notes */}
          <div>
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              value={formData.notes || ''}
              onChange={(e) => handleInputChange('notes', e.target.value)}
              placeholder="Add any important notes about this contact..."
              rows={4}
            />
          </div>

          {/* Actions */}
          <div className="flex justify-end space-x-3 pt-4 border-t">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" className="flex items-center space-x-2">
              <Save className="w-4 h-4" />
              <span>{isAddingNew ? 'Create Contact' : 'Save Changes'}</span>
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}