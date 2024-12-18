"use client";

import React, { useState } from 'react';
import { 
  Trash2,
  Package2,
  AlertCircle,
  ShoppingCart,
  DollarSign,
  MapPin,
  Timer,
  Image,
  Paperclip,
  ChevronLeft,
  Send,
  Camera,
  Link
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';

const ImagePreview = () => {
  const [showDelete, setShowDelete] = useState(false);
  
  return (
    <div 
      className="relative w-32 h-32 mb-4"
      onMouseEnter={() => setShowDelete(true)}
      onMouseLeave={() => setShowDelete(false)}
    >
      <img
        src="/images/chandelier.jpg"
        alt="Chandelier"
        className="w-full h-full object-cover rounded-lg"
      />
      {showDelete && (
        <button 
          className="absolute top-2 right-2 p-1 bg-white/80 rounded-full hover:bg-white"
          onClick={() => console.log('Delete clicked')}
        >
          <Trash2 className="w-4 h-4 text-red-500" />
        </button>
      )}
    </div>
  );
};

type PartStatus = 'in_stock' | 'low_stock' | 'out_of_stock';

interface Part {
  id: string;
  name: string;
  status: PartStatus;
  quantity: number;
  price: number;
  image: string;
}

const PartsInventoryCard = () => {
  const parts: Part[] = [
    {
      id: 'P001',
      name: 'LED Driver 100W',
      status: 'in_stock',
      quantity: 3,
      price: 45.99,
      image: '/images/led-driver.jpg'
    },
    {
      id: 'P002',
      name: 'Light Round Bulb Warm (3000k)',
      status: 'low_stock',
      quantity: 6,
      price: 7.99,
      image: '/images/roundbulb.jpg'
    }
  ];

  const getStatusColor = (status: 'in_stock' | 'low_stock' | 'out_of_stock'): string => {
    const colors = {
      in_stock: 'bg-green-100 text-green-800',
      low_stock: 'bg-yellow-100 text-yellow-800',
      out_of_stock: 'bg-red-100 text-red-800'
    };
    return colors[status] || '';
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Parts & Inventory</CardTitle>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2">
          <ShoppingCart className="w-4 h-4" />
          Request Parts
        </button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {parts.map((part) => (
            <div key={part.id} className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center gap-4">
                <img 
                  src={part.image} 
                  alt={part.name}
                  className="w-16 h-16 object-cover rounded-lg"
                />
                <div>
                  <div className="font-medium">{part.name}</div>
                  <div className="text-sm text-gray-500">Part #{part.id}</div>
                  <div className="mt-1">
                    <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(part.status)}`}>
                      {part.status === 'in_stock' ? 'In Stock' : 'Low Stock'}
                    </span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-lg font-medium">${part.price}</div>
                <div className="text-sm text-gray-500">Qty: {part.quantity}</div>
              </div>
            </div>
          ))}
          
          <div className="mt-4 p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Estimated Total:</span>
              <span className="font-medium">$135.98</span>
            </div>
            <div className="flex items-center gap-2 mt-2 text-xs text-gray-500">
              <AlertCircle className="w-4 h-4" />
              Prices may vary based on vendor availability
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

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
      note: 'Identified loose connection in the body',
      attachment: <ImagePreview />
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

          {/* Parts Inventory Card */}
          <PartsInventoryCard />

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
                      {event.attachment && (
                        <div className="mt-3">
                          {event.attachment}
                        </div>
                      )}
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