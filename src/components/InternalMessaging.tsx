/**
 * Internal Messaging Component - Team instant messaging system
 * Features real-time messaging, team channels, and direct messages
 */

import React, { useState, useEffect, useRef } from 'react';
import { Send, Search, Users, Hash, Phone, Video, Paperclip, Smile, MoreVertical, Circle, CheckCircle, X } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useUserData } from '../contexts/UserDataContext';

interface Message {
  id: string;
  senderId: string;
  senderName: string;
  content: string;
  timestamp: string;
  type: 'text' | 'image' | 'file' | 'system';
  isRead: boolean;
  replyTo?: string;
  attachments?: Attachment[];
}

interface Attachment {
  id: string;
  name: string;
  url: string;
  type: string;
  size: string;
}

interface Channel {
  id: string;
  name: string;
  type: 'channel' | 'direct';
  members: string[];
  lastMessage?: Message;
  unreadCount: number;
  isOnline?: boolean;
}

interface InternalMessagingProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function InternalMessaging({ isOpen, onClose }: InternalMessagingProps) {
  const { user } = useAuth();
  const { systemUsers } = useUserData();
  const [selectedChannel, setSelectedChannel] = useState<string>('general');
  const [messageInput, setMessageInput] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Create channels dynamically from system users
  const [channels, setChannels] = useState<Channel[]>([]);

  useEffect(() => {
    // Create team channels
    const teamChannels: Channel[] = [
      {
        id: 'general',
        name: 'General',
        type: 'channel',
        members: systemUsers.map(u => u.name),
        unreadCount: 0
      },
      {
        id: 'sales',
        name: 'Sales Team',
        type: 'channel',
        members: systemUsers.filter(u => u.department === 'Sales').map(u => u.name),
        unreadCount: 2
      },
      {
        id: 'management',
        name: 'Management',
        type: 'channel',
        members: systemUsers.filter(u => u.accessLevel === 'board' || u.accessLevel === 'management').map(u => u.name),
        unreadCount: 1
      }
    ];

    // Create direct message channels for each user
    const directChannels: Channel[] = systemUsers
      .filter(systemUser => systemUser.username !== user?.username) // Exclude current user
      .map(systemUser => ({
        id: systemUser.username,
        name: systemUser.name,
        type: 'direct' as const,
        members: [systemUser.name],
        unreadCount: Math.floor(Math.random() * 4), // Random unread count for demo
        isOnline: systemUser.status === 'active' && Math.random() > 0.3 // Random online status
      }));

    setChannels([...teamChannels, ...directChannels]);
  }, [systemUsers, user]);

  const [messages, setMessages] = useState<{ [key: string]: Message[] }>({
    general: [
      {
        id: '1',
        senderId: 'truckers',
        senderName: systemUsers.find(u => u.username === 'truckers')?.name || 'Alex Foster',
        content: 'Good morning team! Ready for another productive day. James Anderson meeting at 10 AM.',
        timestamp: '2025-07-13T08:30:00Z',
        type: 'text',
        isRead: true
      },
      {
        id: '2',
        senderId: 'squire',
        senderName: systemUsers.find(u => u.username === 'squire')?.name || 'Charles Sinclair',
        content: 'Morning! I\'ve prepared the property bond presentations for Michael Roberts.',
        timestamp: '2025-07-13T08:45:00Z',
        type: 'text',
        isRead: true
      },
      {
        id: '3',
        senderId: 'system',
        senderName: 'System',
        content: 'New lead Emma Davies assigned to Truckers',
        timestamp: '2025-07-13T09:00:00Z',
        type: 'system',
        isRead: true
      }
    ],
    sales: [
      {
        id: '1',
        senderId: 'truckers',
        senderName: systemUsers.find(u => u.username === 'truckers')?.name || 'Alex Foster',
        content: 'Pipeline looking strong this month. James Anderson deal should close next week. Banked Business at £720K/£1M target.',
        timestamp: '2025-07-13T09:15:00Z',
        type: 'text',
        isRead: false
      },
      {
        id: '2',
        senderId: 'rosie',
        senderName: systemUsers.find(u => u.username === 'rosie')?.name || 'David Walsh',
        content: 'Fresh Leads looking good - 187 this week! Should we push for the 300 target?',
        timestamp: '2025-07-13T09:30:00Z',
        type: 'text',
        isRead: false
      }
    ],
    management: [
      {
        id: '1',
        senderId: 'truckers',
        senderName: systemUsers.find(u => u.username === 'truckers')?.name || 'Alex Foster',
        content: 'Weekly targets update: Fresh Leads 187/300, Fronts Out 22/30, Deals to Close 18/30. Team performing well!',
        timestamp: '2025-07-13T10:00:00Z',
        type: 'text',
        isRead: false
      }
    ],
    truckers: [
      {
        id: '1',
        senderId: 'truckers',
        senderName: systemUsers.find(u => u.username === 'truckers')?.name || 'Alex Foster',
        content: 'Hey, can you handle the Sarah Thompson follow-up? I\'m tied up with the off-plan site visit.',
        timestamp: '2025-07-13T10:15:00Z',
        type: 'text',
        isRead: true
      }
    ],
    squire: [
      {
        id: '1',
        senderId: 'squire',
        senderName: systemUsers.find(u => u.username === 'squire')?.name || 'Charles Sinclair',
        content: 'The commercial property analysis is ready. Should I send it to Sarah Thompson?',
        timestamp: '2025-07-13T09:45:00Z',
        type: 'text',
        isRead: false
      },
      {
        id: '2',
        senderId: 'squire',
        senderName: systemUsers.find(u => u.username === 'squire')?.name || 'Charles Sinclair',
        content: 'Also, Michael Roberts wants to schedule a call for this afternoon.',
        timestamp: '2025-07-13T10:30:00Z',
        type: 'text',
        isRead: false
      },
      {
        id: '3',
        senderId: 'squire',
        senderName: systemUsers.find(u => u.username === 'squire')?.name || 'Charles Sinclair',
        content: 'Property bond yields are looking good - 12.5% on the latest offering.',
        timestamp: '2025-07-13T10:45:00Z',
        type: 'text',
        isRead: false
      }
    ],
    rosie: [
      {
        id: '1',
        senderId: 'rosie',
        senderName: systemUsers.find(u => u.username === 'rosie')?.name || 'David Walsh',
        content: 'Working on the student property portfolio for David Wilson. Should be ready by lunch.',
        timestamp: '2025-07-13T11:00:00Z',
        type: 'text',
        isRead: true
      }
    ],
    admin: [
      {
        id: '1',
        senderId: 'admin',
        senderName: systemUsers.find(u => u.username === 'admin')?.name || 'Sarah Admin',
        content: 'Monthly performance review scheduled for Friday. Please prepare your KPIs.',
        timestamp: '2025-07-12T08:00:00Z',
        type: 'text',
        isRead: false
      }
    ],
    techops: [
      {
        id: '1',
        senderId: 'techops',
        senderName: systemUsers.find(u => u.username === 'techops')?.name || 'Michael Tech',
        content: 'System maintenance completed. All CRM functions running optimally.',
        timestamp: '2025-07-13T07:00:00Z',
        type: 'text',
        isRead: false
      }
    ]
  });

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, selectedChannel]);

  const handleSendMessage = () => {
    if (messageInput.trim()) {
      const newMessage: Message = {
        id: Date.now().toString(),
        senderId: user?.username || 'user',
        senderName: user?.name || 'User',
        content: messageInput,
        timestamp: new Date().toISOString(),
        type: 'text',
        isRead: false
      };

      setMessages(prev => ({
        ...prev,
        [selectedChannel]: [...(prev[selectedChannel] || []), newMessage]
      }));

      setMessageInput('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const getChannelMessages = () => {
    return messages[selectedChannel] || [];
  };

  const getChannelInfo = () => {
    return channels.find(c => c.id === selectedChannel);
  };

  const filteredChannels = channels.filter(channel =>
    channel.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getInitials = (name: string) => {
    return name.split(' ').map(word => word.charAt(0)).join('').toUpperCase().slice(0, 2);
  };

  const getStatusColor = (isOnline?: boolean) => {
    return isOnline ? 'bg-green-500' : 'bg-gray-400';
  };

  if (!isOpen) return null;

  return (
    <div className="h-full w-full flex">
      <div className="bg-white w-full h-full flex overflow-hidden">
        {/* Sidebar */}
        <div className="w-80 bg-gray-900 text-white flex flex-col">
          <div className="p-4 border-b border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Team Messages</h2>
              <span className="text-sm text-gray-400">{channels.filter(c => c.type === 'direct').length} members</span>
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search conversations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400"
              />
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto">
            <div className="p-3">
              <div className="mb-4">
                <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">
                  Channels
                </h3>
                {filteredChannels.filter(c => c.type === 'channel').map(channel => (
                  <button
                    key={channel.id}
                    onClick={() => setSelectedChannel(channel.id)}
                    className={`w-full flex items-center justify-between p-2 rounded-lg mb-1 transition-colors ${
                      selectedChannel === channel.id
                        ? 'bg-blue-600 text-white'
                        : 'hover:bg-gray-800 text-gray-300'
                    }`}
                  >
                    <div className="flex items-center">
                      <Hash className="w-4 h-4 mr-2" />
                      <span className="text-sm font-medium">{channel.name}</span>
                    </div>
                    {channel.unreadCount > 0 && (
                      <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                        {channel.unreadCount}
                      </span>
                    )}
                  </button>
                ))}
              </div>
              
              <div>
                <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">
                  Direct Messages
                </h3>
                {filteredChannels.filter(c => c.type === 'direct').map(channel => {
                  const systemUser = systemUsers.find(u => u.username === channel.id);
                  return (
                    <button
                      key={channel.id}
                      onClick={() => setSelectedChannel(channel.id)}
                      className={`w-full flex items-center justify-between p-2 rounded-lg mb-1 transition-colors ${
                        selectedChannel === channel.id
                          ? 'bg-blue-600 text-white'
                          : 'hover:bg-gray-800 text-gray-300'
                      }`}
                    >
                      <div className="flex items-center">
                        <div className="relative">
                          <div className="w-6 h-6 bg-gray-600 rounded-full flex items-center justify-center mr-2">
                            <span className="text-xs font-semibold">
                              {getInitials(channel.name)}
                            </span>
                          </div>
                          {channel.isOnline && (
                            <div className={`absolute -bottom-1 -right-1 w-3 h-3 ${getStatusColor(channel.isOnline)} rounded-full border-2 border-gray-900`}></div>
                          )}
                        </div>
                        <div className="text-left">
                          <div className="text-sm font-medium">{channel.name}</div>
                          {systemUser && (
                            <div className="text-xs text-gray-400">{systemUser.role}</div>
                          )}
                        </div>
                      </div>
                      {channel.unreadCount > 0 && (
                        <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                          {channel.unreadCount}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Main Chat Area */}
        <div className="flex-1 flex flex-col">
          {/* Chat Header */}
          <div className="bg-white border-b border-gray-200 p-4 flex items-center justify-between">
            <div className="flex items-center">
              {getChannelInfo()?.type === 'channel' ? (
                <>
                  <Hash className="w-5 h-5 text-gray-400 mr-2" />
                  <div>
                    <h3 className="font-semibold text-gray-900">{getChannelInfo()?.name}</h3>
                    <p className="text-sm text-gray-500">
                      {getChannelInfo()?.members.length} members
                    </p>
                  </div>
                </>
              ) : (
                <>
                  <div className="relative">
                    <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center mr-3">
                      <span className="text-sm font-semibold text-gray-700">
                        {getChannelInfo()?.name ? getInitials(getChannelInfo()!.name) : ''}
                      </span>
                    </div>
                    {getChannelInfo()?.isOnline && (
                      <div className={`absolute -bottom-1 -right-1 w-3 h-3 ${getStatusColor(getChannelInfo()?.isOnline)} rounded-full border-2 border-white`}></div>
                    )}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{getChannelInfo()?.name}</h3>
                    <p className="text-sm text-gray-500">
                      {getChannelInfo()?.isOnline ? 'Online' : 'Offline'}
                      {(() => {
                        const systemUser = systemUsers.find(u => u.username === selectedChannel);
                        return systemUser ? ` • ${systemUser.role}` : '';
                      })()}
                    </p>
                  </div>
                </>
              )}
            </div>
            <div className="flex items-center space-x-2">
              <button className="p-2 hover:bg-gray-100 rounded-lg">
                <Phone className="w-5 h-5 text-gray-600" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-lg">
                <Video className="w-5 h-5 text-gray-600" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-lg">
                <MoreVertical className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {getChannelMessages().map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.senderId === user?.username 
                    ? 'justify-end' 
                    : 'justify-start'
                }`}
              >
                <div
                  className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                    message.senderId === user?.username
                      ? 'bg-blue-600 text-white'
                      : message.type === 'system'
                      ? 'bg-gray-100 text-gray-700 text-center'
                      : 'bg-gray-100 text-gray-900'
                  }`}
                >
                  {message.type !== 'system' && 
                   message.senderId !== user?.username && (
                    <div className="text-xs font-semibold mb-1 text-gray-600">
                      {message.senderName}
                    </div>
                  )}
                  <div className="text-sm">{message.content}</div>
                  <div className={`text-xs mt-1 ${
                    message.senderId === user?.username 
                      ? 'text-blue-100' 
                      : 'text-gray-500'
                  }`}>
                    {formatTime(message.timestamp)}
                  </div>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Message Input */}
          <div className="bg-white border-t border-gray-200 p-4">
            <div className="flex items-center space-x-2">
              <div className="flex-1 relative">
                <input
                  type="text"
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder={`Message ${getChannelInfo()?.name}...`}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <button className="p-2 hover:bg-gray-100 rounded-lg">
                <Paperclip className="w-5 h-5 text-gray-600" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-lg">
                <Smile className="w-5 h-5 text-gray-600" />
              </button>
              <button
                onClick={handleSendMessage}
                className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
