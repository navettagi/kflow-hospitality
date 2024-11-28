"use client";

import React from 'react';
import dynamic from 'next/dynamic';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TrendingUp, PackageSearch, Users, AlertCircle, AlertTriangle, Package, RefreshCcw } from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';

interface CostData {
  month: string;
  actual: number;
  projected: number;
  optimal: number;
  budget: number;
}

interface ExpenseData {
  category: string;
  amount: number;
  status: 'urgent' | 'normal';
}

interface InventoryItem {
  name: string;
  stock: number;
  reorderPoint: number;
  monthlyUsage: number;
  unit: string;
}

interface Categories {
  bathroom: InventoryItem[];
  lighting: InventoryItem[];
  bedding: InventoryItem[];
  cleaning: InventoryItem[];
}

const PurchasingDashboard = () => {
  // Cost tracking data
  const costData: CostData[] = [
    { month: 'Jan', actual: 4000, projected: 4500, optimal: 4500, budget: 6000 },
    { month: 'Feb', actual: 4200, projected: 4500, optimal: 4500, budget: 6000 },
    { month: 'Mar', actual: 3800, projected: 4500, optimal: 4500, budget: 6000 },
    { month: 'Apr', actual: 9000, projected: 4500, optimal: 4500, budget: 6000 },
    { month: 'May', actual: 3900, projected: 4500, optimal: 4500, budget: 6000 },
    { month: 'Jun', actual: 4300, projected: 4500, optimal: 4500, budget: 6000 },
  ];

  // April expense breakdown
  const aprilExpenses: ExpenseData[] = [
    { category: 'Emergency HVAC Replacement', amount: 3500, status: 'urgent' },
    { category: 'Regular Maintenance Supplies', amount: 2200, status: 'normal' },
    { category: 'Water System Repairs', amount: 2100, status: 'urgent' },
    { category: 'Cleaning Supplies', amount: 1200, status: 'normal' },
  ];

  // Inventory categories data
  const categories: Categories = {
    bathroom: [
      { name: 'Shampoo 30ml', stock: 850, reorderPoint: 500, monthlyUsage: 600, unit: 'units' },
      { name: 'Body Wash 30ml', stock: 920, reorderPoint: 500, monthlyUsage: 580, unit: 'units' },
      { name: 'Hand Soap 250ml', stock: 320, reorderPoint: 200, monthlyUsage: 150, unit: 'bottles' },
      { name: 'Body Lotion 30ml', stock: 760, reorderPoint: 400, monthlyUsage: 520, unit: 'units' },
      { name: 'Toilet Paper', stock: 1200, reorderPoint: 800, monthlyUsage: 900, unit: 'rolls' },
      { name: 'Facial Tissues', stock: 450, reorderPoint: 300, monthlyUsage: 250, unit: 'boxes' },
      { name: 'Shower Caps', stock: 600, reorderPoint: 400, monthlyUsage: 300, unit: 'units' }
    ],
    lighting: [
      { name: 'LED Bulb 6W (Warm)', stock: 180, reorderPoint: 100, monthlyUsage: 45, unit: 'units' },
      { name: 'LED Bulb 8W (Cool)', stock: 150, reorderPoint: 100, monthlyUsage: 40, unit: 'units' },
      { name: 'Bedside Lamp Bulbs', stock: 85, reorderPoint: 50, monthlyUsage: 20, unit: 'units' },
      { name: 'Bathroom Mirror Lights', stock: 45, reorderPoint: 30, monthlyUsage: 15, unit: 'units' },
      { name: 'Corridor LEDs', stock: 95, reorderPoint: 60, monthlyUsage: 25, unit: 'units' }
    ],
    bedding: [
      { name: 'Pillowcases', stock: 420, reorderPoint: 300, monthlyUsage: 200, unit: 'units' },
      { name: 'Bed Sheets (King)', stock: 180, reorderPoint: 120, monthlyUsage: 90, unit: 'sets' },
      { name: 'Bed Sheets (Queen)', stock: 220, reorderPoint: 150, monthlyUsage: 110, unit: 'sets' },
      { name: 'Duvet Covers', stock: 160, reorderPoint: 100, monthlyUsage: 80, unit: 'units' },
      { name: 'Bath Towels', stock: 580, reorderPoint: 400, monthlyUsage: 300, unit: 'units' },
      { name: 'Hand Towels', stock: 620, reorderPoint: 450, monthlyUsage: 350, unit: 'units' }
    ],
    cleaning: [
      { name: 'All-Purpose Cleaner', stock: 85, reorderPoint: 50, monthlyUsage: 40, unit: 'liters' },
      { name: 'Glass Cleaner', stock: 45, reorderPoint: 30, monthlyUsage: 25, unit: 'liters' },
      { name: 'Bathroom Cleaner', stock: 65, reorderPoint: 40, monthlyUsage: 35, unit: 'liters' },
      { name: 'Floor Cleaner', stock: 120, reorderPoint: 80, monthlyUsage: 70, unit: 'liters' },
      { name: 'Air Freshener', stock: 95, reorderPoint: 60, monthlyUsage: 45, unit: 'units' }
    ]
  };

  // Helper function for stock status
  const getStockStatus = (stock: number, reorderPoint: number): string => {
    const ratio = stock / reorderPoint;
    if (ratio <= 1) return 'text-red-600 bg-red-50';
    if (ratio <= 1.5) return 'text-yellow-600 bg-yellow-50';
    return 'text-green-600 bg-green-50';
  };

  const renderCategoryTab = (items: InventoryItem[], category: string) => (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="capitalize">{category} Inventory</CardTitle>
          <button className="text-sm text-blue-600 hover:text-blue-800">
            Export Report
          </button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-1">
          <div className="grid grid-cols-5 gap-4 p-3 bg-gray-100 rounded-t-lg font-medium">
            <div>Item</div>
            <div>Current Stock</div>
            <div>Reorder Point</div>
            <div>Monthly Usage</div>
            <div>Status</div>
          </div>
          {items.map((item, index) => (
            <div key={index} className="grid grid-cols-5 gap-4 p-3 border-b hover:bg-gray-50">
              <div>{item.name}</div>
              <div>{item.stock} {item.unit}</div>
              <div>{item.reorderPoint} {item.unit}</div>
              <div>{item.monthlyUsage} {item.unit}</div>
              <div className={`rounded-full px-3 py-1 text-sm font-medium inline-flex items-center ${getStockStatus(item.stock, item.reorderPoint)}`}>
                {item.stock <= item.reorderPoint ? 
                  <AlertCircle className="w-4 h-4 mr-1" /> : 
                  item.stock <= item.reorderPoint * 1.5 ?
                  <RefreshCcw className="w-4 h-4 mr-1" /> :
                  <Package className="w-4 h-4 mr-1" />
                }
                {item.stock <= item.reorderPoint ? 
                  'Reorder Now' : 
                  item.stock <= item.reorderPoint * 1.5 ?
                  'Order Soon' :
                  'In Stock'}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="w-full max-w-6xl mx-auto p-4 space-y-4">
      <h1 className="text-2xl font-bold mb-6">Purchasing Management Suite</h1>
      
      <Tabs defaultValue="dashboard">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="dashboard" className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4" />
            Dashboard
          </TabsTrigger>
          <TabsTrigger value="inventory" className="flex items-center gap-2">
            <PackageSearch className="w-4 h-4" />
            Inventory
          </TabsTrigger>
          <TabsTrigger value="vendors" className="flex items-center gap-2">
            <Users className="w-4 h-4" />
            Vendors
          </TabsTrigger>
          <TabsTrigger value="alerts" className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4" />
            Alerts
          </TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard">
          <div className="grid grid-cols-1 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Cost Tracking</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={costData}>
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="actual"
                        stroke="#0ea5e9"
                        name="Actual Cost"
                        strokeWidth={2}
                      />
                      <Line
                        type="monotone"
                        dataKey="optimal"
                        stroke="#22c55e"
                        name="Optimal Level"
                        strokeDasharray="5 5"
                      />
                      <Line
                        type="monotone"
                        dataKey="budget"
                        stroke="#ef4444"
                        name="Budget Limit"
                        strokeDasharray="3 3"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-amber-50">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-amber-500" />
                  <CardTitle>April Expense Breakdown - Budget Overflow Analysis</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="p-4 bg-white rounded-lg">
                      <p className="text-lg font-semibold text-red-600">Total Overspend</p>
                      <p className="text-2xl font-bold">€3,000</p>
                      <p className="text-sm text-gray-500">50% above budget limit</p>
                    </div>
                    <div className="p-4 bg-white rounded-lg">
                      <p className="text-lg font-semibold text-amber-600">Emergency Expenses</p>
                      <p className="text-2xl font-bold">€5,600</p>
                      <p className="text-sm text-gray-500">62% of total expenses</p>
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-lg p-4">
                    <h3 className="font-semibold mb-3">Detailed Breakdown</h3>
                    <div className="space-y-3">
                      {aprilExpenses.map((expense, index) => (
                        <div key={index} className="flex items-center justify-between p-2 border-b">
                          <div className="flex items-center gap-2">
                            {expense.status === 'urgent' && (
                              <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                            )}
                            <span className={expense.status === 'urgent' ? 'font-medium' : ''}>
                              {expense.category}
                            </span>
                          </div>
                          <span className={`font-medium ${
                            expense.status === 'urgent' ? 'text-red-600' : ''
                          }`}>
                            €{expense.amount.toLocaleString()}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-white rounded-lg p-4">
                    <h3 className="font-semibold mb-2">Recommendations</h3>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Schedule preventive maintenance for HVAC systems to avoid emergency replacements</li>
                      <li>Review water system maintenance schedule and implement regular inspections</li>
                      <li>Establish emergency fund allocation within budget for unexpected repairs</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="inventory">
          <div className="w-full space-y-4">
            <div className="grid grid-cols-4 gap-4 mb-6">
              <Card className="bg-red-50">
                <CardContent className="pt-6">
                  <h3 className="text-red-700 font-medium">Items to Reorder</h3>
                  <p className="text-2xl font-bold text-red-800">8 items</p>
                  <p className="text-sm text-red-600">Below minimum stock</p>
                </CardContent>
              </Card>
              <Card className="bg-yellow-50">
                <CardContent className="pt-6">
                  <h3 className="text-yellow-700 font-medium">Running Low</h3>
                  <p className="text-2xl font-bold text-yellow-800">12 items</p>
                  <p className="text-sm text-yellow-600">Order needed soon</p>
                </CardContent>
              </Card>
              <Card className="bg-green-50">
                <CardContent className="pt-6">
                  <h3 className="text-green-700 font-medium">Healthy Stock</h3>
                  <p className="text-2xl font-bold text-green-800">45 items</p>
                  <p className="text-sm text-green-600">Optimal levels</p>
                </CardContent>
              </Card>
              <Card className="bg-blue-50">
                <CardContent className="pt-6">
                  <h3 className="text-blue-700 font-medium">Monthly Budget</h3>
                  <p className="text-2xl font-bold text-blue-800">€24,500</p>
                  <p className="text-sm text-blue-600">65% remaining</p>
                </CardContent>
              </Card>
            </div>

            <Tabs defaultValue="bathroom">
              <TabsList className="grid grid-cols-4 w-full">
                <TabsTrigger value="bathroom">Bathroom Supplies</TabsTrigger>
                <TabsTrigger value="lighting">Lighting</TabsTrigger>
                <TabsTrigger value="bedding">Bedding & Towels</TabsTrigger>
                <TabsTrigger value="cleaning">Cleaning Supplies</TabsTrigger>
              </TabsList>

              {Object.entries(categories).map(([category, items]) => (
                <TabsContent key={category} value={category}>
                  {renderCategoryTab(items, category)}
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </TabsContent>

        <TabsContent value="vendors">
          <Card>
            <CardHeader>
              <CardTitle>Vendor Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-4 gap-4 p-4 bg-gray-50 rounded-lg">
                  <div className="font-medium">Vendor Name</div>
                  <div className="font-medium">Response Time</div>
                  <div className="font-medium">Quality Score</div>
                  <div className="font-medium">Cost Index</div>
                </div>
                <div className="grid grid-cols-4 gap-4 p-4">
                  <div>ABC Supplies</div>
                  <div className="text-green-600">1.2 days</div>
                  <div>98%</div>
                  <div className="text-green-600">↓ 5%</div>
                </div>
                <div className="grid grid-cols-4 gap-4 p-4">
                  <div>XYZ Equipment</div>
                  <div className="text-yellow-600">2.5 days</div>
                  <div>92%</div>
                  <div className="text-red-600">↑ 3%</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="alerts">
          <Card>
            <CardHeader>
              <CardTitle>System Alerts</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                  <h3 className="font-medium text-red-700">Low Stock Alert</h3>
                  <p className="text-sm text-red-600">HVAC Filters running low (15% remaining)</p>
                </div>
                <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                  <h3 className="font-medium text-yellow-700">Price Increase Notice</h3>
                  <p className="text-sm text-yellow-600">Supplier XYZ announced 5% price increase effective next month</p>
                </div>
                <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                  <h3 className="font-medium text-green-700">Order Completed</h3>
                  <p className="text-sm text-green-600">Bulk order #12345 has been received and verified</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PurchasingDashboard;