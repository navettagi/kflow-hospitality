'use client';

import React, { useState } from 'react';
import { 
  Filter, 
  X, 
  ChevronDown,
  Wrench,
  Droplets,
  Zap,
  Wifi,
  ThermometerSun,
  Wind,
  Lock,
  ShowerHead,
  Bath,
  Utensils,
  Users,
  Crown,
  Building,
  Timer,
  AlertTriangle,
  CheckCircle2,
  Calendar,
  User
} from 'lucide-react';
import {
  Card,
  CardContent,
} from '@/components/ui/card';

interface FilterState {
  technicalType: string[];
  serviceType: string[];
  priority: string[];
  roomType: string[];
  timeFrame: string;
  status: string[];
  assignedStaff: string[];
}

interface FilterOption {
  label: string;
  value: string;
  icon?: React.ElementType;
  color?: string;
}

export function FilterMenu() {
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    technicalType: [],
    serviceType: [],
    priority: [],
    roomType: [],
    timeFrame: 'all',
    status: [],
    assignedStaff: []
  });

  const filterOptions = {
    technicalType: [
      { label: 'Electrical', value: 'electrical', icon: Zap, color: 'text-yellow-500' },
      { label: 'Plumbing', value: 'plumbing', icon: Droplets, color: 'text-blue-500' },
      { label: 'HVAC', value: 'hvac', icon: Wind, color: 'text-cyan-500' },
      { label: 'AC Systems', value: 'ac', icon: ThermometerSun, color: 'text-red-500' },
      { label: 'IT Support', value: 'it', icon: Wifi, color: 'text-purple-500' },
      { label: 'Security Systems', value: 'security', icon: Lock, color: 'text-gray-500' },
      { label: 'General Maintenance', value: 'general', icon: Wrench, color: 'text-green-500' }
    ],
    serviceType: [
      { label: 'Housekeeping', value: 'housekeeping', icon: ShowerHead, color: 'text-blue-500' },
      { label: 'Laundry', value: 'laundry', icon: Bath, color: 'text-cyan-500' },
      { label: 'Room Service', value: 'room_service', icon: Utensils, color: 'text-amber-500' },
      { label: 'Concierge', value: 'concierge', icon: Users, color: 'text-purple-500' }
    ],
    priority: [
      { label: 'High', value: 'high', icon: AlertTriangle, color: 'text-red-500' },
      { label: 'Medium', value: 'medium', icon: Timer, color: 'text-yellow-500' },
      { label: 'Low', value: 'low', icon: Calendar, color: 'text-green-500' }
    ],
    roomType: [
      { label: 'Standard Rooms', value: 'standard', icon: Building },
      { label: 'Suites', value: 'suite', icon: Crown, color: 'text-purple-500' },
      { label: 'Presidential Suites', value: 'presidential', icon: Crown, color: 'text-gold-500' },
      { label: 'Common Areas', value: 'common', icon: Users }
    ],
    timeFrame: [
      { label: 'Past Hour', value: '1h' },
      { label: 'Today', value: 'today' },
      { label: 'Yesterday', value: 'yesterday' },
      { label: 'This Week', value: 'week' },
      { label: 'This Month', value: 'month' }
    ],
    status: [
      { label: 'Overdue', value: 'overdue', icon: AlertTriangle, color: 'text-red-500' },
      { label: 'Due Soon', value: 'due_soon', icon: Timer, color: 'text-yellow-500' },
      { label: 'On Track', value: 'on_track', icon: CheckCircle2, color: 'text-green-500' }
    ],
    assignedStaff: [
      { label: 'Ahmed Al-Rahman', value: 'ahmed', role: 'Electrical Technician', icon: User },
      { label: 'Maria Santos', value: 'maria', role: 'Housekeeping Lead', icon: User },
      { label: 'John Smith', value: 'john', role: 'HVAC Specialist', icon: User },
      { label: 'Sara Khan', value: 'sara', role: 'Plumbing Technician', icon: User },
      { label: 'Li Wei', value: 'li', role: 'Room Service Manager', icon: User },
      { label: 'Unassigned', value: 'unassigned', icon: User, color: 'text-gray-400' }
    ]
  };

  const renderFilterSection = (
    title: string,
    options: FilterOption[],
    filterKey: keyof FilterState,
    showRole: boolean = false
  ) => (
    <div className="mb-4">
      <label className="block text-sm font-medium mb-2">{title}</label>
      <div className="space-y-2">
        {options.map(option => {
          const IconComponent = option.icon;
          return (
            <label key={option.value} className="flex items-center">
              <input
                type="checkbox"
                className="form-checkbox h-4 w-4 text-blue-600"
                checked={filters[filterKey].includes(option.value)}
                onChange={(e) => {
                  const newValues = e.target.checked
                    ? [...filters[filterKey], option.value]
                    : filters[filterKey].filter(v => v !== option.value);
                  setFilters({ ...filters, [filterKey]: newValues });
                }}
              />
              <div className="ml-2 flex items-center">
                {IconComponent && (
                  <IconComponent className={`w-4 h-4 mr-2 ${option.color || 'text-gray-500'}`} />
                )}
                <div>
                  <span className="text-sm">{option.label}</span>
                  {showRole && 'role' in option && (
                    <span className="text-xs text-gray-500 block">{option.role}</span>
                  )}
                </div>
              </div>
            </label>
          );
        })}
      </div>
    </div>
  );

  return (
    <div className="relative">
      <button 
        onClick={() => setShowFilters(!showFilters)}
        className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50"
      >
        <Filter className="w-4 h-4" />
        Filter
        <ChevronDown className="w-4 h-4" />
      </button>

      {showFilters && (
        <Card className="absolute right-0 top-12 w-96 z-50 shadow-lg max-h-[80vh] overflow-auto">
          <CardContent className="p-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold">Filters</h3>
              <button 
                onClick={() => setShowFilters(false)}
                className="p-1 hover:bg-gray-100 rounded"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Technical Services Filter */}
            {renderFilterSection('Technical Services', filterOptions.technicalType, 'technicalType')}

            {/* Other Services Filter */}
            {renderFilterSection('Other Services', filterOptions.serviceType, 'serviceType')}

            {/* Assigned Staff Filter */}
            {renderFilterSection('Assigned Staff', filterOptions.assignedStaff, 'assignedStaff', true)}

            {/* Priority Filter */}
            {renderFilterSection('Priority', filterOptions.priority, 'priority')}

            {/* Room Type Filter */}
            {renderFilterSection('Room Type', filterOptions.roomType, 'roomType')}

            {/* Time Frame Filter */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Time Frame</label>
              <select
                className="w-full p-2 border rounded"
                value={filters.timeFrame}
                onChange={(e) => setFilters({ ...filters, timeFrame: e.target.value })}
              >
                <option value="all">All Time</option>
                {filterOptions.timeFrame.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            {/* SLA Status Filter */}
            {renderFilterSection('SLA Status', filterOptions.status, 'status')}

            {/* Filter Actions */}
            <div className="flex justify-end gap-2 mt-4 pt-4 border-t">
              <button
                onClick={() => {
                  setFilters({
                    technicalType: [],
                    serviceType: [],
                    priority: [],
                    roomType: [],
                    timeFrame: 'all',
                    status: [],
                    assignedStaff: []
                  });
                }}
                className="px-3 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded"
              >
                Clear All
              </button>
              <button
                onClick={() => setShowFilters(false)}
                className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Apply Filters
              </button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}