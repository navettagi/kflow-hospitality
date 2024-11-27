"use client";
import React, { useState } from 'react';
import { 
  Clock, 
  TrendingUp, 
  AlertCircle, 
  DollarSign,
  Users,
  ThumbsUp,
  AlertTriangle,
  Activity
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend
} from 'recharts';

const ExecutiveDashboard = () => {
  const [timeRange, setTimeRange] = useState('month');

  const staffData = [
    {
      name: "Ahmed Al-Rahman",
      role: "Maintenance",
      completedTasks: 145,
      avgResponseTime: 12,
      satisfaction: 4.8,
      efficiency: 94
    },
    {
      name: "Mary Ann Santos",
      role: "Housekeeping Lead",
      completedTasks: 198,
      avgResponseTime: 15,
      satisfaction: 4.9,
      efficiency: 96
    },
    {
      name: "Mohammad Farooq",
      role: "Technical",
      completedTasks: 112,
      avgResponseTime: 18,
      satisfaction: 4.7,
      efficiency: 92
    },
    {
      name: "Rose Mae Dimaculangan",
      role: "Guest Services",
      completedTasks: 167,
      avgResponseTime: 10,
      satisfaction: 4.9,
      efficiency: 97
    },
    {
      name: "Kareem Hassan",
      role: "Maintenance",
      completedTasks: 134,
      avgResponseTime: 14,
      satisfaction: 4.6,
      efficiency: 91
    }
  ];

  const issueDistribution = [
    { name: 'HVAC', value: 30, color: '#0088FE' },
    { name: 'Plumbing', value: 25, color: '#00C49F' },
    { name: 'Electrical', value: 20, color: '#FFBB28' },
    { name: 'Housekeeping', value: 15, color: '#FF8042' },
    { name: 'Others', value: 10, color: '#8884d8' }
  ];

  const costBreakdown = [
    {
      category: 'Labor',
      current: 45000,
      previous: 48000,
      change: -6.25
    },
    {
      category: 'Materials',
      current: 28000,
      previous: 32000,
      change: -12.5
    },
    {
      category: 'External Services',
      current: 15000,
      previous: 18000,
      change: -16.7
    }
  ];

  const inefficiencyMetrics = [
    {
      name: 'Repeated Issues',
      value: 15,
      impact: '$12,000',
      trend: 'increasing'
    },
    {
      name: 'Delayed Response',
      value: 8,
      impact: '$8,500',
      trend: 'decreasing'
    },
    {
      name: 'Resource Wastage',
      value: 12,
      impact: '$15,000',
      trend: 'stable'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header with Key Metrics */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Executive Overview</h1>
        <div className="flex gap-4">
          <div className="flex gap-2">
            {['week', 'month', 'quarter', 'year'].map((range) => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`px-4 py-2 rounded-lg ${
                  timeRange === range ? 'bg-blue-600 text-white' : 'border'
                }`}
              >
                {range.charAt(0).toUpperCase() + range.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Critical Alerts */}
      <Card className="mb-6 border-l-4 border-l-red-500">
        <CardContent className="p-4">
          <div className="flex items-center gap-4">
            <AlertTriangle className="w-6 h-6 text-red-500" />
            <div>
              <h3 className="font-bold">Critical Attention Required</h3>
              <p className="text-sm text-gray-600">3 VIP guest complaints unresolved • HVAC system maintenance overdue • High water consumption detected</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Grid */}
      <div className="grid grid-cols-2 gap-6 mb-6">
        {/* Issue Distribution with Legend */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="w-5 h-5" />
              Issue Distribution & Trends
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={issueDistribution}
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                    label={({
                      cx,
                      cy,
                      midAngle,
                      innerRadius,
                      outerRadius,
                      value,
                      name
                    }) => {
                      const RADIAN = Math.PI / 180;
                      const radius = 25 + innerRadius + (outerRadius - innerRadius);
                      const x = cx + radius * Math.cos(-midAngle * RADIAN);
                      const y = cy + radius * Math.sin(-midAngle * RADIAN);
                      return (
                        <text
                          x={x}
                          y={y}
                          fill="#000"
                          textAnchor={x > cx ? 'start' : 'end'}
                          dominantBaseline="central"
                        >
                          {`${name} (${value}%)`}
                        </text>
                      );
                    }}
                  >
                    {issueDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend verticalAlign="bottom" height={36} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Cost Analysis */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="w-5 h-5" />
              Cost Analysis & Efficiency
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {costBreakdown.map((item, index) => (
                <div key={index} className="p-3 bg-gray-50 rounded-lg">
                  <div className="flex justify-between mb-2">
                    <span className="font-medium">{item.category}</span>
                    <span className={`${
                      item.change < 0 ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {item.change}%
                    </span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Current: ${item.current.toLocaleString()}</span>
                    <span>Previous: ${item.previous.toLocaleString()}</span>
                  </div>
                </div>
              ))}
              <div className="mt-4 p-3 bg-orange-50 rounded-lg">
                <h4 className="font-medium mb-2">Inefficiency Costs</h4>
                {inefficiencyMetrics.map((metric, index) => (
                  <div key={index} className="flex justify-between items-center mb-2">
                    <span className="text-sm">{metric.name}</span>
                    <span className="text-sm font-medium">{metric.impact}</span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Staff Performance */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5" />
            Staff Performance Analytics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="p-3 text-left">Staff Member</th>
                  <th className="p-3 text-left">Role</th>
                  <th className="p-3 text-right">Tasks Completed</th>
                  <th className="p-3 text-right">Avg Response (min)</th>
                  <th className="p-3 text-right">Satisfaction</th>
                  <th className="p-3 text-right">Efficiency %</th>
                </tr>
              </thead>
              <tbody>
                {staffData.map((staff, index) => (
                  <tr key={index} className="border-b hover:bg-gray-50">
                    <td className="p-3">{staff.name}</td>
                    <td className="p-3 text-gray-600">{staff.role}</td>
                    <td className="p-3 text-right">{staff.completedTasks}</td>
                    <td className="p-3 text-right">{staff.avgResponseTime}</td>
                    <td className="p-3 text-right">
                      <span className={`px-2 py-1 rounded-full ${
                        staff.satisfaction >= 4.8 ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {staff.satisfaction}
                      </span>
                    </td>
                    <td className="p-3 text-right">
                      <span className={`px-2 py-1 rounded-full ${
                        staff.efficiency >= 95 ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {staff.efficiency}%
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ExecutiveDashboard;