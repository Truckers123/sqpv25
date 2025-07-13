/**
 * Calendar page component - Event and appointment scheduling system
 * Features calendar view, event management, and appointment booking
 */

import React, { useState } from 'react';
import { Calendar as CalendarIcon, Plus, ChevronLeft, ChevronRight, Clock, Users, MapPin, Phone, Video, Edit, Trash2 } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useUserData } from '../contexts/UserDataContext';
import Header from '../components/Header';

interface CalendarEvent {
  id: string;
  title: string;
  description: string;
  startTime: Date;
  endTime: Date;
  attendees: string[];
  location?: string;
  type: 'meeting' | 'call' | 'presentation' | 'site-visit' | 'internal';
  status: 'confirmed' | 'tentative' | 'cancelled';
  organizer: string;
  relatedContact?: string;
  meetingType?: 'in-person' | 'phone' | 'video';
}

export default function Calendar() {
  const { user } = useAuth();
  const { systemUsers } = useUserData();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedView, setSelectedView] = useState<'month' | 'week' | 'day'>('month');
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);

  const [events] = useState<CalendarEvent[]>([
    {
      id: '1',
      title: 'James Anderson Consultation',
      description: 'Initial consultation for off-plan investment opportunities',
      startTime: new Date('2025-07-14T10:00:00'),
      endTime: new Date('2025-07-14T11:00:00'),
      attendees: [user?.name || 'Truckers', 'James Anderson'],
      location: 'Conference Room A',
      type: 'meeting',
      status: 'confirmed',
      organizer: user?.name || 'Truckers',
      relatedContact: 'James Anderson',
      meetingType: 'in-person'
    },
    {
      id: '2',
      title: 'Emma Davies Follow-up Call',
      description: 'Follow-up call regarding residential property investment',
      startTime: new Date('2025-07-13T14:00:00'),
      endTime: new Date('2025-07-13T14:30:00'),
      attendees: [user?.name || 'Truckers', 'Emma Davies'],
      type: 'call',
      status: 'confirmed',
      organizer: user?.name || 'Truckers',
      relatedContact: 'Emma Davies',
      meetingType: 'phone'
    },
    {
      id: '3',
      title: 'Property Bond Presentation',
      description: 'Michael Roberts property bond portfolio presentation',
      startTime: new Date('2025-07-15T15:00:00'),
      endTime: new Date('2025-07-15T16:30:00'),
      attendees: [systemUsers.find(u => u.username === 'squire')?.name || 'Charles "Squire" Sinclair', 'Michael Roberts'],
      location: 'Virtual Meeting',
      type: 'presentation',
      status: 'tentative',
      organizer: systemUsers.find(u => u.username === 'squire')?.name || 'Charles "Squire" Sinclair',
      relatedContact: 'Michael Roberts',
      meetingType: 'video'
    },
    {
      id: '4',
      title: 'Commercial Property Site Visit',
      description: 'Sarah Thompson commercial property viewing',
      startTime: new Date('2025-07-16T11:00:00'),
      endTime: new Date('2025-07-16T13:00:00'),
      attendees: [systemUsers.find(u => u.role.includes('Business Development'))?.name || 'Ed "Top Dog" Snell', 'Sarah Thompson'],
      location: 'Manchester Business District',
      type: 'site-visit',
      status: 'confirmed',
      organizer: systemUsers.find(u => u.role.includes('Business Development'))?.name || 'Ed "Top Dog" Snell',
      relatedContact: 'Sarah Thompson',
      meetingType: 'in-person'
    },
    {
      id: '5',
      title: 'Weekly Team Meeting',
      description: 'Sales performance review and pipeline discussion',
      startTime: new Date('2025-07-18T09:00:00'),
      endTime: new Date('2025-07-18T10:00:00'),
      attendees: systemUsers.filter(u => ['board', 'management', 'sales'].includes(u.accessLevel)).map(u => u.name),
      location: 'Main Conference Room',
      type: 'internal',
      status: 'confirmed',
      organizer: user?.name || 'Truckers',
      meetingType: 'in-person'
    }
  ]);

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case 'meeting': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'call': return 'bg-green-100 text-green-800 border-green-200';
      case 'presentation': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'site-visit': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'internal': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-blue-100 text-blue-800 border-blue-200';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'text-green-600';
      case 'tentative': return 'text-yellow-600';
      case 'cancelled': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-GB', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();
    
    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }
    
    return days;
  };

  const getEventsForDate = (date: Date) => {
    return events.filter(event => {
      const eventDate = new Date(event.startTime);
      return eventDate.toDateString() === date.toDateString();
    });
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate);
    if (direction === 'prev') {
      newDate.setMonth(newDate.getMonth() - 1);
    } else {
      newDate.setMonth(newDate.getMonth() + 1);
    }
    setCurrentDate(newDate);
  };

  const days = getDaysInMonth(currentDate);
  const monthName = currentDate.toLocaleDateString('en-GB', { month: 'long', year: 'numeric' });

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Calendar</h1>
              <p className="text-lg text-gray-600">Manage appointments and meetings</p>
            </div>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center">
              <Plus className="w-4 h-4 mr-2" />
              Schedule Meeting
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Calendar */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              {/* Calendar Header */}
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-gray-900">{monthName}</h2>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => navigateMonth('prev')}
                      className="p-2 hover:bg-gray-100 rounded-lg"
                    >
                      <ChevronLeft className="w-4 h-4 text-gray-600" />
                    </button>
                    <button
                      onClick={() => setCurrentDate(new Date())}
                      className="px-3 py-1 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                      Today
                    </button>
                    <button
                      onClick={() => navigateMonth('next')}
                      className="p-2 hover:bg-gray-100 rounded-lg"
                    >
                      <ChevronRight className="w-4 h-4 text-gray-600" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Calendar Grid */}
              <div className="p-6">
                {/* Day Headers */}
                <div className="grid grid-cols-7 gap-1 mb-4">
                  {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                    <div key={day} className="p-2 text-center text-sm font-medium text-gray-500">
                      {day}
                    </div>
                  ))}
                </div>

                {/* Calendar Days */}
                <div className="grid grid-cols-7 gap-1">
                  {days.map((day, index) => {
                    if (!day) {
                      return <div key={index} className="h-24"></div>;
                    }

                    const dayEvents = getEventsForDate(day);
                    const isToday = day.toDateString() === new Date().toDateString();

                    return (
                      <div
                        key={index}
                        className={`h-24 p-1 border border-gray-200 rounded-lg ${
                          isToday ? 'bg-blue-50 border-blue-200' : 'bg-white hover:bg-gray-50'
                        }`}
                      >
                        <div className={`text-sm font-medium mb-1 ${
                          isToday ? 'text-blue-600' : 'text-gray-900'
                        }`}>
                          {day.getDate()}
                        </div>
                        <div className="space-y-1">
                          {dayEvents.slice(0, 2).map((event) => (
                            <div
                              key={event.id}
                              onClick={() => setSelectedEvent(event)}
                              className={`text-xs p-1 rounded cursor-pointer truncate ${getEventTypeColor(event.type)}`}
                            >
                              {formatTime(event.startTime)} {event.title}
                            </div>
                          ))}
                          {dayEvents.length > 2 && (
                            <div className="text-xs text-gray-500 p-1">
                              +{dayEvents.length - 2} more
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Upcoming Events */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Events</h3>
              <div className="space-y-4">
                {events
                  .filter(event => event.startTime >= new Date())
                  .sort((a, b) => a.startTime.getTime() - b.startTime.getTime())
                  .slice(0, 5)
                  .map((event) => (
                    <div
                      key={event.id}
                      onClick={() => setSelectedEvent(event)}
                      className="p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium border ${getEventTypeColor(event.type)}`}>
                          {event.type.replace('-', ' ')}
                        </span>
                        <span className={`text-xs font-medium ${getStatusColor(event.status)}`}>
                          {event.status}
                        </span>
                      </div>
                      <h4 className="font-medium text-gray-900 mb-1">{event.title}</h4>
                      <div className="text-sm text-gray-600 space-y-1">
                        <div className="flex items-center">
                          <Clock className="w-3 h-3 mr-1" />
                          {formatTime(event.startTime)} - {formatTime(event.endTime)}
                        </div>
                        <div className="text-xs text-gray-500">
                          {formatDate(event.startTime)}
                        </div>
                        {event.location && (
                          <div className="flex items-center">
                            <MapPin className="w-3 h-3 mr-1" />
                            <span className="text-xs">{event.location}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>

        {/* Event Detail Modal */}
        {selectedEvent && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold text-gray-900">{selectedEvent.title}</h3>
                  <button
                    onClick={() => setSelectedEvent(null)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    ×
                  </button>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <span className={`inline-flex px-3 py-1 rounded-full text-sm font-medium border ${getEventTypeColor(selectedEvent.type)}`}>
                      {selectedEvent.type.replace('-', ' ')}
                    </span>
                    <span className={`text-sm font-medium ${getStatusColor(selectedEvent.status)}`}>
                      {selectedEvent.status}
                    </span>
                  </div>

                  <p className="text-gray-600">{selectedEvent.description}</p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Details</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center">
                          <CalendarIcon className="w-4 h-4 mr-2 text-gray-400" />
                          {formatDate(selectedEvent.startTime)}
                        </div>
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 mr-2 text-gray-400" />
                          {formatTime(selectedEvent.startTime)} - {formatTime(selectedEvent.endTime)}
                        </div>
                        {selectedEvent.location && (
                          <div className="flex items-center">
                            <MapPin className="w-4 h-4 mr-2 text-gray-400" />
                            {selectedEvent.location}
                          </div>
                        )}
                        {selectedEvent.meetingType && (
                          <div className="flex items-center">
                            {selectedEvent.meetingType === 'phone' ? (
                              <Phone className="w-4 h-4 mr-2 text-gray-400" />
                            ) : selectedEvent.meetingType === 'video' ? (
                              <Video className="w-4 h-4 mr-2 text-gray-400" />
                            ) : (
                              <Users className="w-4 h-4 mr-2 text-gray-400" />
                            )}
                            {selectedEvent.meetingType}
                          </div>
                        )}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Attendees</h4>
                      <div className="space-y-1">
                        {selectedEvent.attendees.map((attendee, index) => (
                          <div key={index} className="flex items-center text-sm">
                            <div className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center mr-2">
                              <span className="text-xs font-medium text-gray-600">
                                {attendee.charAt(0).toUpperCase()}
                              </span>
                            </div>
                            {attendee}
                            {attendee === selectedEvent.organizer && (
                              <span className="ml-2 text-xs text-gray-500">(Organizer)</span>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-end space-x-3 pt-4 border-t border-gray-200">
                    <button className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors flex items-center">
                      <Edit className="w-4 h-4 mr-2" />
                      Edit
                    </button>
                    <button className="px-4 py-2 text-red-600 hover:text-red-800 transition-colors flex items-center">
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete
                    </button>
                    <button
                      onClick={() => setSelectedEvent(null)}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
