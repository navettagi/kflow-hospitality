"use client";

import React, { useState } from 'react';
import { Bell, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Card, CardContent } from '@/components/ui/card';

type Language = 'en' | 'ar' | 'ur';

interface StaffMember {
  id: string;
  name: string;
  image: string;
  role: string;
  skillLevel: 'Basic' | 'Advanced' | 'Expert';
  mainSkills: string[];
}

interface Translations {
  assignTask: string;
  serviceRequest: string;
  availableStaff: string;
  skills: string;
  currentTask: string;
  status: string;
  available: string;
  busy: string;
  selected: string;
  room: string;
  requestType: string;
  priority: string;
  estimatedDuration: string;
  description: string;
  assignedBy: string;
  sendRequest: string;
  skillLevel: string;
  mainSkills: string;
  select: string;
  deselect: string;
}

interface TranslationDictionary {
  en: Translations;
  ar: Translations;
  ur: Translations;
}

export default function SupervisorView() {
  const [language, setLanguage] = useState<Language>('en');
  const [selectedStaff, setSelectedStaff] = useState<string[]>(['john-smith', 'jorge-santos']);

  const translations: TranslationDictionary = {
    en: {
      assignTask: "Assign Task",
      serviceRequest: "Service Request",
      availableStaff: "Available Staff",
      skills: "Skills",
      currentTask: "Current Task",
      status: "Status",
      available: "Available",
      busy: "Busy",
      selected: "Selected",
      room: "Room",
      requestType: "Request Type",
      priority: "Priority",
      estimatedDuration: "Estimated Duration",
      description: "Description",
      assignedBy: "Assigning Supervisor",
      sendRequest: "Send Request to Selected Staff",
      skillLevel: "Skill Level",
      mainSkills: "Main Skills",
      select: "Select",
      deselect: "Deselect"
    },
    ar: {
      assignTask: "تعيين مهمة",
      serviceRequest: "طلب خدمة",
      availableStaff: "الموظفون المتاحون",
      skills: "المهارات",
      currentTask: "المهمة الحالية",
      status: "الحالة",
      available: "متاح",
      busy: "مشغول",
      selected: "تم الاختيار",
      room: "غرفة",
      requestType: "نوع الطلب",
      priority: "الأولوية",
      estimatedDuration: "المدة المتوقعة",
      description: "الوصف",
      assignedBy: "المشرف المكلف",
      sendRequest: "إرسال الطلب إلى الموظفين المختارين",
      skillLevel: "مستوى المهارة",
      mainSkills: "المهارات الرئيسية",
      select: "اختيار",
      deselect: "إلغاء الاختيار"
    },
    ur: {
      assignTask: "ٹاسک تفویض کریں",
      serviceRequest: "سروس کی درخواست",
      availableStaff: "دستیاب عملہ",
      skills: "مہارتیں",
      currentTask: "موجودہ ٹاسک",
      status: "حیثیت",
      available: "دستیاب",
      busy: "مصروف",
      selected: "منتخب شدہ",
      room: "کمرہ",
      requestType: "درخواست کی قسم",
      priority: "ترجیح",
      estimatedDuration: "متوقع دورانیہ",
      description: "تفصیل",
      assignedBy: "تفویض کنندہ سپروائزر",
      sendRequest: "منتخب شدہ عملے کو درخواست بھیجیں",
      skillLevel: "مہارت کی سطح",
      mainSkills: "اہم مہارتیں",
      select: "منتخب کریں",
      deselect: "غیر منتخب کریں"
    }
  };

  const staffMembers: StaffMember[] = [
    {
      id: 'john-smith',
      name: 'John Smith',
      image: '/images/john-smith.jpg',
      role: 'HVAC Specialist',
      skillLevel: 'Expert',
      mainSkills: ['HVAC Systems', 'AC Maintenance', 'Temperature Control']
    },
    {
      id: 'jorge-santos',
      name: 'Jorge Santos',
      image: '/images/jorge-santos.jpg',
      role: 'Maintenance Technician',
      skillLevel: 'Advanced',
      mainSkills: ['General Maintenance', 'Basic HVAC', 'Electrical Systems']
    },
    {
      id: 'abdul-rahman',
      name: 'Abdul Rahman',
      image: '/images/abdul-rahman.jpg',
      role: 'Junior Technician',
      skillLevel: 'Basic',
      mainSkills: ['General Maintenance', 'Basic Repairs']
    }
  ];

  const t = (key: keyof Translations): string => {
    return translations[language]?.[key] || translations.en[key];
  };

  const toggleStaffSelection = (staffId: string): void => {
    setSelectedStaff(prev => 
      prev.includes(staffId) 
        ? prev.filter(id => id !== staffId)
        : [...prev, staffId]
    );
  };

  const handleSendRequest = (): void => {
    console.log('Sending request to:', selectedStaff);
    // Handle request sending logic here
  };

  return (
    <div className="container mx-auto py-6">
      <div className="p-4 max-w-4xl mx-auto space-y-4">
        <div className="flex justify-between items-center mb-4">
          <Alert className="flex-1 py-3">
            <Bell className="w-6 h-6" />
            <AlertDescription className="text-xl ml-2 font-medium">{t('assignTask')}</AlertDescription>
          </Alert>
          <select 
            value={language}
            onChange={(e) => setLanguage(e.target.value as Language)}
            className="ml-4 px-3 py-2 border rounded"
          >
            <option value="en">English</option>
            <option value="ar">العربية</option>
            <option value="ur">اردو</option>
          </select>
        </div>

        <div className="bg-blue-50 rounded-lg p-6 border-2 border-blue-100">
          {/* Supervisor Info */}
          <div className="flex items-center gap-3 mb-6">
            <img 
              src="/images/ahmed-khan.jpg"
              alt="Ahmed Khan"
              className="w-12 h-12 rounded-full object-cover"
            />
            <div>
              <div className="text-sm text-gray-600">{t('assignedBy')}</div>
              <div className="text-lg font-medium">Ahmed Khan</div>
              <div className="text-sm italic text-gray-500">Maintenance Supervisor</div>
            </div>
          </div>
          {/* Request Details */}
          <div className="bg-white rounded-lg p-4 mb-6 shadow-sm">
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <div className="text-sm text-gray-600">{t('room')}</div>
                <div className="text-lg font-semibold">Suite 507</div>
              </div>
              <div>
                <div className="text-sm text-gray-600">{t('requestType')}</div>
                <div className="text-lg font-semibold">AC Maintenance</div>
              </div>
              <div>
                <div className="text-sm text-gray-600">{t('priority')}</div>
                <div className="flex items-center gap-1">
                  <AlertTriangle className="w-5 h-5 text-amber-500" />
                  <span className="text-lg font-semibold text-amber-500">High</span>
                </div>
              </div>
              <div>
                <div className="text-sm text-gray-600">{t('estimatedDuration')}</div>
                <div className="text-lg font-semibold">45 min</div>
              </div>
            </div>

            <div>
              <div className="text-sm text-gray-600 mb-1">{t('description')}</div>
              <div className="text-base">Guest reported AC making loud noise and not cooling properly. Temperature reading shows 26°C despite being set to 21°C.</div>
            </div>
          </div>

          {/* Available Staff */}
<Card>
  <CardContent className="p-4">
    <h3 className="text-lg font-semibold mb-4">{t('availableStaff')}</h3>
    <div className="space-y-4">
      {staffMembers.map((staff) => (
        <div 
          key={staff.id}
          className={`flex justify-between items-center p-4 rounded-lg border ${
            selectedStaff.includes(staff.id)
              ? 'bg-green-50 border-green-200'
              : 'bg-white border-gray-200'
          }`}
        >
          <div className="flex items-center gap-3">
            <img 
              src={staff.image}
              alt={staff.name}
              className={`w-10 h-10 rounded-full object-cover ${
                selectedStaff.includes(staff.id) 
                  ? 'border-2 border-green-500' 
                  : 'border border-gray-200'
              }`}
            />
            <div>
              <div className="font-medium">{staff.name}</div>
              <div className="text-sm text-gray-600">{staff.role}</div>
              <div className="text-sm text-gray-500 mt-1">
                <span className="font-medium">{t('skillLevel')}:</span> {staff.skillLevel}
              </div>
              <div className="text-sm text-gray-500">
                <span className="font-medium">{t('mainSkills')}:</span> {staff.mainSkills.join(', ')}
              </div>
            </div>
          </div>
          <button
            onClick={() => toggleStaffSelection(staff.id)}
            className={`px-4 py-2 rounded-lg transition-colors ${
              selectedStaff.includes(staff.id)
                ? 'bg-green-600 text-white hover:bg-green-700'
                : 'border border-blue-600 text-blue-600 hover:bg-blue-50'
            }`}
          >
            {selectedStaff.includes(staff.id) ? t('deselect') : t('select')}
          </button>
        </div>
      ))}
    </div>
  </CardContent>
</Card>

          {/* Send Request Button */}
          <div className="mt-6 flex justify-end">
            <button
              onClick={handleSendRequest}
              disabled={selectedStaff.length === 0}
              className={`px-6 py-3 rounded-lg flex items-center gap-2 ${
                selectedStaff.length > 0
                  ? 'bg-blue-600 text-white hover:bg-blue-700'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              <CheckCircle2 className="w-5 h-5" />
              {t('sendRequest')} ({selectedStaff.length})
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}