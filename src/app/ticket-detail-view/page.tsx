"use client";

import React, { useState } from 'react';
import {
  Clock,
  MapPin,
  User,
  Timer,
  MessageSquare,
  Image,
  Paperclip,
  ChevronLeft,
  Send,
  Camera,
  AlertCircle,
  CheckCircle,
  History,
  Link
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';

const TicketDetailView = () => {
  const [newComment, setNewComment] = useState('');
  
  const ticket = {
    id: 'T1003',
    location: 'Main Lobby',
    area: 'Common Areas',
    issue: 'Light fixture flickering',
    description: 'The chandelier in the main lobby area near the reception desk is flickering intermittently. This could create discomfort for guests and affect the ambiance of the entrance area.',
    priority: 'low',
    status: 'in_progress',
    reporter: 'Sarah Johnson',
    reporterRole: 'Front Desk Manager',
    reportTime: '2024-02-24 14:30',
    assignee: 'Mike Thompson',
    assigneeRole: 'Maintenance Technician',
    sla: '2h',
    timeRemaining: '1h 15m',
    category: 'Electrical',
    subCategory: 'Lighting',
  };

  const timeline = [
    {
      time: '14:30',
      user: 'Sarah Johnson',
      role: 'Front Desk Manager',
      action: 'Ticket created',
      note: 'Reported flickering light in main lobby'
    },
    {
      time: '14:35',
      user: 'System',
      action: 'Automatic assignment',
      note: 'Ticket assigned to Maintenance team'
    },
    {
      time: '14:45',
      user: 'Mike Thompson',
      role: 'Maintenance Technician',
      action: 'Status updated',
      note: 'Acknowledged. Will check the electrical connection and transformer.'
    },
    {
      time: '15:15',
      user: 'Mike Thompson',
      role: 'Maintenance Technician',
      action: 'Added photo',
      note: 'Identified loose connection in the fixture'
    }
  ];

  const attachments = [
    {
      type: 'image',
      name: 'lobby-light-1.jpg',
      size: '2.4 MB',
      timestamp: '15:15'
    },
    {
      type: 'document',
      name: 'maintenance-checklist.pdf',
      size: '156 KB',
      timestamp: '14:45'
    }
  ];

  return (
    <div className="max-w-6xl mx-auto p-4">
      {/* Header */}
      <div className="mb-6">
        <button className="flex items-center text-gray-600 hover:text-gray-900 mb-4">
          <ChevronLeft className="w-4 h-4 mr-1" />
          Back to Service Flow
        </button>
        
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-2">
              Ticket #{ticket.id}
              <span className="text-sm px-3 py-1 bg-purple-100 text-purple-800 rounded-full">
                In Progress
              </span>
            </h1>
            <p className="text-gray-600 mt-1">{ticket.issue}</p>
          </div>
          
          <div className="flex gap-2">
            <button className="px-4 py-2 border rounded-lg hover:bg-gray-50">
              Edit
            </button>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              Mark as Complete
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="col-span-2 space-y-6">
          {/* Description Card */}
          <Card>
            <CardHeader>
              <CardTitle>Issue Details</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">{ticket.description}</p>
              
              <div className="mt-4 grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-gray-400" />
                  <span>{ticket.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-gray-400" />
                  <span>{ticket.category} - {ticket.subCategory}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Timeline Card */}
          <Card>
            <CardHeader>
              <CardTitle>Timeline</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {timeline.map((event, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="w-16 text-sm text-gray-500">
                      {event.time}
                    </div>
                    <div className="flex-1 pb-4 border-l-2 border-gray-200 pl-4 relative">
                      <div className="absolute w-2 h-2 bg-blue-600 rounded-full -left-[5px] top-2" />
                      <div className="text-sm font-medium">{event.user}</div>
                      {event.role && (
                        <div className="text-xs text-gray-500 mb-1">{event.role}</div>
                      )}
                      <div className="text-sm text-gray-600">{event.note}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Comments Section */}
          <Card>
            <CardHeader>
              <CardTitle>Comments</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2 mb-4">
                <textarea
                  className="flex-1 p-2 border rounded-lg resize-none"
                  placeholder="Add a comment..."
                  rows={3}
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                />
              </div>
              <div className="flex justify-between items-center">
                <div className="flex gap-2">
                  <button className="p-2 border rounded-lg hover:bg-gray-50">
                    <Camera className="w-4 h-4" />
                  </button>
                  <button className="p-2 border rounded-lg hover:bg-gray-50">
                    <Paperclip className="w-4 h-4" />
                  </button>
                </div>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2">
                  <Send className="w-4 h-4" />
                  Send
                </button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Details Card */}
          <Card>
            <CardHeader>
              <CardTitle>Ticket Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <label className="text-sm text-gray-500">Status</label>
                  <div className="font-medium">In Progress</div>
                </div>
                <div>
                  <label className="text-sm text-gray-500">Priority</label>
                  <div className="font-medium">Low</div>
                </div>
                <div>
                  <label className="text-sm text-gray-500">SLA</label>
                  <div className="font-medium flex items-center gap-2">
                    <Timer className="w-4 h-4 text-gray-400" />
                    {ticket.timeRemaining} remaining
                  </div>
                </div>
                <div>
                  <label className="text-sm text-gray-500">Assignee</label>
                  <div className="font-medium">{ticket.assignee}</div>
                  <div className="text-sm text-gray-500">{ticket.assigneeRole}</div>
                </div>
                <div>
                  <label className="text-sm text-gray-500">Reporter</label>
                  <div className="font-medium">{ticket.reporter}</div>
                  <div className="text-sm text-gray-500">{ticket.reporterRole}</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Attachments Card */}
          <Card>
            <CardHeader>
              <CardTitle>Attachments</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {attachments.map((file, index) => (
                  <div key={index} className="flex items-center justify-between p-2 border rounded-lg">
                    <div className="flex items-center gap-2">
                      {file.type === 'image' ? (
                        <Image className="w-4 h-4 text-gray-400" />
                      ) : (
                        <Paperclip className="w-4 h-4 text-gray-400" />
                      )}
                      <div>
                        <div className="text-sm font-medium">{file.name}</div>
                        <div className="text-xs text-gray-500">{file.size}</div>
                      </div>
                    </div>
                    <button className="p-1 hover:bg-gray-100 rounded">
                      <Link className="w-4 h-4 text-gray-400" />
                    </button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default TicketDetailView;