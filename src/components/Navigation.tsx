"use client";

import React from 'react';
import { 
  Home,
  Users,
  Settings,
  Bell,
  Calendar,
  BarChart,
  MessageSquare,
  Menu,
  X,
  ShoppingCart  // Added the new icon
} from 'lucide-react';

import { useState } from 'react';

const Navigation = ({ currentPath }: { currentPath: string }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const supervisorNavigation = [
    { name: 'Dashboard', href: '/dashboard', icon: Home },
    { name: 'Guest Service Hub', href: '/guest-service-hub', icon: Users },
    { name: 'Guest Service Flow', href: '/guest-service-flow', icon: Settings },
    { name: 'Ticket Detail View', href: '/ticket-detail-view', icon: BarChart },
    { name: 'Purchasing Dpt', href: '/purchasing', icon: ShoppingCart },
    { name: 'Bid Supervisor', href: '/bid-supervisor', icon: MessageSquare },  // Add this line
];

  const staffNavigation = [
    { name: 'Maintenance', href: '/maintenance', icon: Settings },
    { name: 'Tasks', href: '/tasks', icon: Calendar },
    { name: 'Bid Staff', href: '/bid-staff', icon: MessageSquare },
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="bg-white shadow-sm">
      {/* Desktop Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <span className="text-xl font-bold text-blue-600">KFlow Hospitality</span>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <div>
                <span className="inline-flex items-center px-1 pt-1 border-b-2 border-blue-500 text-sm font-medium text-gray-900">
                  Supervisor
                </span>
                {supervisorNavigation.map((item) => {
                  const IconComponent = item.icon;
                  return (
                    <a
                      key={item.name}
                      href={item.href}
                      className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                        currentPath === item.href
                          ? 'border-blue-500 text-gray-900'
                          : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                      }`}
                    >
                      <IconComponent className="w-4 h-4 mr-2" />
                      {item.name}
                    </a>
                  );
                })}
              </div>
              <div>
                <span className="inline-flex items-center px-1 pt-1 border-b-2 border-blue-500 text-sm font-medium text-gray-900">
                  Staff
                </span>
                {staffNavigation.map((item) => {
                  const IconComponent = item.icon;
                  return (
                    <a
                      key={item.name}
                      href={item.href}
                      className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                        currentPath === item.href
                          ? 'border-blue-500 text-gray-900'
                          : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                      }`}
                    >
                      <IconComponent className="w-4 h-4 mr-2" />
                      {item.name}
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            <button className="p-1 rounded-full text-gray-400 hover:text-gray-500">
              <Bell className="h-6 w-6" />
            </button>
          </div>
          <div className="flex items-center sm:hidden">
            <button
              onClick={toggleMobileMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
            >
              {isMobileMenuOpen ? (
                <X className="block h-6 w-6" />
              ) : (
                <Menu className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="sm:hidden">
          <div className="pt-2 pb-3 space-y-1">
            <div>
              <span className="inline-flex items-center px-1 pt-1 border-b-2 border-blue-500 text-sm font-medium text-gray-900">
                Supervisor
              </span>
              {supervisorNavigation.map((item) => {
                const IconComponent = item.icon;
                return (
                  <a
                    key={item.name}
                    href={item.href}
                    className={`flex items-center px-3 py-2 text-base font-medium ${
                      currentPath === item.href
                        ? 'bg-blue-50 border-l-4 border-blue-500 text-blue-700'
                        : 'text-gray-600 hover:bg-gray-50 hover:border-l-4 hover:border-gray-300'
                    }`}
                  >
                    <IconComponent className="w-5 h-5 mr-3" />
                    {item.name}
                  </a>
                );
              })}
            </div>
            <div>
              <span className="inline-flex items-center px-1 pt-1 border-b-2 border-blue-500 text-sm font-medium text-gray-900">
                Staff
              </span>
              {staffNavigation.map((item) => {
                const IconComponent = item.icon;
                return (
                  <a
                    key={item.name}
                    href={item.href}
                    className={`flex items-center px-3 py-2 text-base font-medium ${
                      currentPath === item.href
                        ? 'bg-blue-50 border-l-4 border-blue-500 text-blue-700'
                        : 'text-gray-600 hover:bg-gray-50 hover:border-l-4 hover:border-gray-300'
                    }`}
                  >
                    <IconComponent className="w-5 h-5 mr-3" />
                    {item.name}
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navigation;