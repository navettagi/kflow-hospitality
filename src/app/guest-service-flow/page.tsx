'use client';

import React, { useState } from 'react';
import { FilterMenu } from '@/components/filters/FilterMenu';
import { 
  Inbox,
  Clock,
  AlertCircle,
  CheckCircle2,
  Loader2,
  Search,
  Filter,
  Star,
  Timer,
  MoreVertical,
  Coffee,
  Wifi,
  ShowerHead,
  Utensils,
  Wallet,
  ThermometerSun,
  Tool,
  Crown,
  Wrench,
  ScrollText,
  Bath,
  CalendarClock,
  PartyPopper
} from 'lucide-react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from '@/components/ui/card';

// Definizione dei tipi di servizio e relative configurazioni
type ServiceType = 'guest_request' | 'vip_request' | 'preventive' | 'room_service' | 'laundry' | 'maintenance';

interface ServiceConfig {
  bgColor: string;
  borderColor: string;
  icon: any; // In un contesto reale, dovremmo definire un tipo più specifico
  label: string;
}

interface Filter {
    id: string;
    label: string;
    icon?: any;
  }

const serviceIcons = {
  GUEST_REQUEST: ShowerHead,
  VIP_REQUEST: Crown,
  PREVENTIVE: CalendarClock,
  ROOM_SERVICE: Utensils,
  LAUNDRY: Bath,
  MAINTENANCE: Tool,
  AC: ThermometerSun,
} as const;

const serviceConfig: Record<ServiceType, ServiceConfig> = {
  guest_request: {
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-200',
    icon: serviceIcons.GUEST_REQUEST,
    label: 'Guest Request'
  },
  vip_request: {
    bgColor: 'bg-purple-50',
    borderColor: 'border-purple-200',
    icon: serviceIcons.VIP_REQUEST,
    label: 'VIP Request'
  },
  preventive: {
    bgColor: 'bg-green-50',
    borderColor: 'border-green-200',
    icon: serviceIcons.PREVENTIVE,
    label: 'Preventive'
  },
  room_service: {
    bgColor: 'bg-amber-50',
    borderColor: 'border-amber-200',
    icon: serviceIcons.ROOM_SERVICE,
    label: 'Room Service'
  },
  laundry: {
    bgColor: 'bg-cyan-50',
    borderColor: 'border-cyan-200',
    icon: serviceIcons.LAUNDRY,
    label: 'Laundry'
  },
  maintenance: {
    bgColor: 'bg-red-50',
    borderColor: 'border-red-200',
    icon: serviceIcons.MAINTENANCE,
    label: 'Maintenance'
  }
};

const columns = [
  { id: 'incoming', label: 'New Requests', icon: Inbox },
  { id: 'inspection', label: 'On-Site Inspection', icon: AlertCircle },
  { id: 'validation', label: 'Validation', icon: Loader2 },
  { id: 'in_process', label: 'In Process', icon: Star },
  { id: 'completed', label: 'Completed', icon: PartyPopper }
];

const tickets = [
    // Card esistenti ridistribuite tra le colonne
    {
      id: 'T1001',
      room: 'Suite 801',
      issue: 'AC not working properly',
      priority: 'high',
      status: 'validation',
      time: '10 min ago',
      sla: '15 min',
      type: 'vip_request' as ServiceType,
      serviceIcon: 'AC'
    },
    {
      id: 'T1002',
      room: 'Room 505',
      issue: 'Extra towels needed',
      priority: 'medium',
      status: 'in_process',
      time: '25 min ago',
      sla: '45 min',
      type: 'guest_request' as ServiceType,
      serviceIcon: 'GUEST_REQUEST'
    },
    {
      id: 'T1003',
      room: 'Room 302',
      issue: 'Monthly HVAC System Check',
      priority: 'low',
      status: 'inspection',
      time: '1h ago',
      sla: '4h',
      type: 'preventive' as ServiceType,
      serviceIcon: 'MAINTENANCE'
    },
    {
      id: 'T1004',
      room: 'Suite 902',
      issue: 'Breakfast Service - Special Diet',
      priority: 'high',
      status: 'incoming',
      time: '35 min ago',
      sla: '20 min',
      type: 'room_service' as ServiceType,
      serviceIcon: 'ROOM_SERVICE'
    },
    {
      id: 'T1005',
      room: 'Room 610',
      issue: 'Express Suit Cleaning',
      priority: 'high',
      status: 'incoming',
      time: '45 min ago',
      sla: '2h',
      type: 'laundry' as ServiceType,
      serviceIcon: 'LAUNDRY'
    },
    {
      id: 'T1006',
      room: 'Room 103',
      issue: 'Light fixture flickering',
      priority: 'medium',
      status: 'in_process',
      time: '2h ago',
      sla: '3h',
      type: 'maintenance' as ServiceType,
      serviceIcon: 'MAINTENANCE'
    },
    {
      id: 'T1007',
      room: 'Presidential Suite 1001',
      issue: 'Room Temperature Adjustment',
      priority: 'high',
      status: 'inspection',
      time: '5 min ago',
      sla: '10 min',
      type: 'vip_request' as ServiceType,
      serviceIcon: 'AC'
    },
    {
      id: 'T1008',
      room: 'Room 405',
      issue: 'Weekly Water Quality Check',
      priority: 'medium',
      status: 'validation',
      time: '3h ago',
      sla: '5h',
      type: 'preventive' as ServiceType,
      serviceIcon: 'MAINTENANCE'
    },
    // Nuove card nella colonna Completed
    {
      id: 'T1009',
      room: 'Suite 701',
      issue: 'Mini Bar Refill',
      priority: 'medium',
      status: 'completed',
      time: '1h ago',
      sla: 'Completed',
      type: 'room_service' as ServiceType,
      serviceIcon: 'ROOM_SERVICE'
    },
    {
      id: 'T1010',
      room: 'Room 205',
      issue: 'TV Remote Battery Replacement',
      priority: 'low',
      status: 'completed',
      time: '2h ago',
      sla: 'Completed',
      type: 'maintenance' as ServiceType,
      serviceIcon: 'MAINTENANCE'
    },
    {
        id: 'T1011',
        room: 'Presidential Suite 1002',
        issue: 'Extra Pillows Delivery',
        priority: 'medium',
        status: 'completed',
        time: '30min ago',
        sla: 'Completed',
        type: 'guest_request' as ServiceType,
        serviceIcon: 'GUEST_REQUEST'
      }
    ];
    
    export default function GuestServiceFlow() {
      // Stati per i filtri
      const [activeFilters, setActiveFilters] = useState<Filter[]>([]);
      const [filteredTickets, setFilteredTickets] = useState(tickets);
    
      // Funzioni per gestire i filtri
      const removeFilter = (filterId: string) => {
        setActiveFilters(activeFilters.filter(filter => filter.id !== filterId));
      };
    
      const clearAllFilters = () => {
        setActiveFilters([]);
      };
    
      // Funzione per il colore della priorità
      const getPriorityColor = (priority: string) => {
        const colors = {
          high: 'bg-red-100 text-red-800',
          medium: 'bg-yellow-100 text-yellow-800',
          low: 'bg-green-100 text-green-800'
        };
        return colors[priority as keyof typeof colors] || 'bg-gray-100';
      };
    
      // Funzione per lo stile del servizio
      const getServiceStyle = (type: ServiceType) => {
        return serviceConfig[type] || serviceConfig.guest_request;
      };
    
      // Funzione per l'icona del servizio
      const getServiceIcon = (iconKey: string) => {
        return serviceIcons[iconKey as keyof typeof serviceIcons] || serviceIcons.GUEST_REQUEST;
      };
    

  return (
    <div className="h-screen p-4 bg-gray-50">
      {/* Header */}
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-bold">Facility Manager</h1>
            <span className="text-sm text-gray-500">
              {tickets.length} total requests
            </span>
          </div>
          <div className="flex gap-4">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
              <input 
                type="text"
                placeholder="Search tickets..."
                className="pl-10 pr-4 py-2 border rounded-lg"
              />
            </div>
            <FilterMenu />
          </div>
        </div>

        {/* Active Filters Section */}
        <div className="flex items-center gap-2 min-h-[32px]">
        {activeFilters.length > 0 && (
            <>
              <div className="flex flex-wrap gap-2">
                {activeFilters.map((filter, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center gap-1 px-2 py-1 rounded-full 
                             bg-blue-50 text-blue-700 text-sm"
                  >
                    {filter.icon && <filter.icon className="w-3 h-3" />}
                    {filter.label}
                    <button
                      onClick={() => removeFilter(filter.id)}
                      className="ml-1 hover:text-blue-900"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
                <button
                  onClick={clearAllFilters}
                  className="text-sm text-gray-500 hover:text-gray-700"
                >
                  Clear all
                </button>
              </div>
              <span className="text-sm text-gray-500">
                {filteredTickets.length} results
              </span>
            </>
          )}
        </div>

        {/* Kanban Board */}
        <div className="grid grid-cols-5 gap-4 h-[calc(100vh-120px)]">
          {columns.map((column) => {
            const IconComponent = column.icon;
            return (
              <div 
                key={column.id} 
                className="bg-gray-100 rounded-lg p-4 overflow-auto"
              >
                {/* Column Header */}
                <div className="flex justify-between items-center mb-4 sticky top-0 bg-gray-100 py-2">
                  <div className="flex items-center gap-2">
                    <IconComponent className="w-5 h-5" />
                    <h2 className="font-semibold">{column.label}</h2>
                  </div>
                  <button className="p-1 hover:bg-gray-200 rounded">
                    <MoreVertical className="w-4 h-4" />
                  </button>
                </div>

                {/* Column Content */}
                <div className="space-y-3">
                  {tickets
                    .filter(ticket => ticket.status === column.id)
                    .map((ticket) => {
                      const serviceStyle = getServiceStyle(ticket.type);
                      const ServiceIcon = getServiceIcon(ticket.serviceIcon);
                      const isSuite = ticket.room.toLowerCase().includes('suite');

                      return (
                        <Card 
                          key={ticket.id} 
                          className={`${serviceStyle.bgColor} ${serviceStyle.borderColor} border shadow-sm`}
                        >
                          <CardContent className="p-3">
                            <div className="space-y-2">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                  <ServiceIcon className="w-4 h-4 text-gray-600" />
                                  <span className="text-sm font-medium">{ticket.room}</span>
                                  {isSuite && <Crown className="w-4 h-4 text-purple-500" />}
                                </div>
                                <span className={`px-2 py-1 rounded-full text-xs ${getPriorityColor(ticket.priority)}`}>
                                  {ticket.priority.toUpperCase()}
                                </span>
                              </div>
                              <div>
                                <p className="text-xs text-gray-600">#{ticket.id}</p>
                              </div>
                              <p className="text-sm text-gray-700">{ticket.issue}</p>
                              <div className="flex justify-between items-center text-xs text-gray-500">
                                <div className="flex items-center gap-1">
                                  <Clock className="w-3 h-3" />
                                  {ticket.time}
                                </div>
                                <div className="flex items-center gap-1">
                                  <Timer className="w-3 h-3" />
                                  SLA: {ticket.sla}
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      );
                    })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}