"use client";

import React, { useState } from 'react';
import { 
  Bell, 
  Clock, 
  CheckCircle2, 
  AlertTriangle,
  User,
  Calendar,
  Timer,
  MessageSquare,
  BarChart,
  X
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';

const BidStaff = () => {
  const [language, setLanguage] = useState('en');
  const [isDeclineModalOpen, setIsDeclineModalOpen] = useState(false);
  const [declineReason, setDeclineReason] = useState('');
  const [selectedReasonTemplate, setSelectedReasonTemplate] = useState('');
  const [showCurrentTasks, setShowCurrentTasks] = useState(false);

  // New staff member state
  const [currentStaff] = useState({
    id: "ST123",
    name: "Ahmed Al-Mansouri",
    role: "Maintenance Technician",
    specialties: ["HVAC", "Electrical", "Plumbing"],
    shiftHours: "07:00 - 16:00",
    tasksCompleted: 145,
    rating: 4.8
  });

  // New job request data
  const jobRequest = {
    id: "JR789",
    type: {
      category: "Equipment",
      subcategory: "Electrical",
      skillRequired: "Basic",
      estimatedDuration: "15 minutes"
    },
    priority: "high",
    room: "412",
    item: "Hair Dryer",
    requestTime: "11:30 AM",
    guest: {
      name: "Mr. Johnson",
      vip: true,
      preferences: "Quick response preferred"
    }
  };

  const translations = {
    en: {
      newRequest: "New Service Request",
      currentTasks: "Current Tasks",
      workload: "Current Workload",
      timeRemaining: "Time Remaining",
      acceptJob: "Accept Job",
      declineJob: "Decline Job",
      provideReason: "Provide Reason",
      submit: "Submit",
      cancel: "Cancel",
      estimatedTime: "Estimated Time",
      location: "Location",
      priority: "Priority",
      requestedBy: "Requested By",
      reasonTemplates: "Quick Reasons",
      currentlyBusy: "Currently Busy",
      jobHistory: "Recent Job History",
      minutes: "minutes",
      high: "High Priority",
      medium: "Medium Priority",
      low: "Low Priority",
      taskProgress: "Task Progress",
      otherReason: "Other reason...",
      customReason: "Enter custom reason",
      type: "Type",
      skillsRequired: "Skills Required",
      vipGuest: "VIP Guest"
    },
  ar: {
    newRequest: "طلب خدمة جديد",
    currentTasks: "المهام الحالية",
    workload: "عبء العمل الحالي",
    timeRemaining: "الوقت المتبقي",
    acceptJob: "قبول الوظيفة",
    declineJob: "رفض الوظيفة",
    provideReason: "تقديم سبب",
    submit: "إرسال",
    cancel: "إلغاء",
    estimatedTime: "الوقت المقدر",
    location: "الموقع",
    priority: "الأولوية",
    requestedBy: "طلبت من قبل",
    reasonTemplates: "أسباب سريعة",
    currentlyBusy: "مشغول حاليا",
    jobHistory: "سجل الوظائف الحديثة",
    minutes: "دقائق",
    high: "أولوية عالية",
    medium: "أولوية متوسطة",
    low: "أولوية منخفضة",
    taskProgress: "تقدم المهمة",
    otherReason: "سبب آخر...",
    customReason: "أدخل سببًا مخصصًا",
    type: "نوع",
    skillsRequired: "المهارات المطلوبة",
    vipGuest: "ضيف مميز"
  },
  hi: {
    newRequest: "नया सेवा अनुरोध",
    currentTasks: "वर्तमान कार्य",
    workload: "वर्तमान कार्यभार",
    timeRemaining: "शेष समय",
    acceptJob: "कार्य स्वीकार करें",
    declineJob: "कार्य अस्वीकार करें",
    provideReason: "कारण बताएं",
    submit: "सबमिट करें",
    cancel: "रद्द करें",
    estimatedTime: "अनुमानित समय",
    location: "स्थान",
    priority: "प्राथमिकता",
    requestedBy: "द्वारा अनुरोधित",
    reasonTemplates: "त्वरित कारण",
    currentlyBusy: "वर्तमान में व्यस्त",
    jobHistory: "हाल ही के कार्य इतिहास",
    minutes: "मिनट",
    high: "उच्च प्राथमिकता",
    medium: "मध्यम प्राथमिकता",
    low: "निम्न प्राथमिकता",
    taskProgress: "कार्य प्रगति",
    otherReason: "अन्य कारण...",
    customReason: "कस्टम कारण दर्ज करें",
    type: "प्रकार",
    skillsRequired: "आवश्यक कौशल",
    vipGuest: "VIP अतिथि"
  },
  ur: {
    newRequest: "نئی خدمت کی درخواست",
    currentTasks: "موجودہ ٹاسک",
    workload: "موجودہ کام کا بوجھ",
    timeRemaining: "باقی وقت",
    acceptJob: "کام قبول کریں",
    declineJob: "کام مسترد کریں",
    provideReason: "وجہ فراہم کریں",
    submit: "جمع کرائیں",
    cancel: "منسوخ کریں",
    estimatedTime: "تخمینہ وقت",
    location: "مقام",
    priority: "ترجیح",
    requestedBy: "کی طرف سے درخواست کی گئی",
    reasonTemplates: "فوری وجوہات",
    currentlyBusy: "فی الحال مصروف",
    jobHistory: "حالیہ کام کی تاریخ",
    minutes: "منٹ",
    high: "اعلی ترجیح",
    medium: "متوسط ترجیح",
    low: "کم ترجیح",
    taskProgress: "ٹاسک کی پیشرفت",
    otherReason: "دیگر وجہ...",
    customReason: "اپنی مرضی کی وجہ درج کریں",
    type: "قسم",
    skillsRequired: "مطلوبہ مہارتیں",
    vipGuest: "VIP مہمان"
  },
  tl: {
    newRequest: "Bagong Kahilingan sa Serbisyo",
    currentTasks: "Mga Kasalukuyang Gawain",
    workload: "Kasalukuyang Workload",
    timeRemaining: "Natitirang Oras",
    acceptJob: "Tanggapin ang Trabaho",
    declineJob: "Tanggihan ang Trabaho",
    provideReason: "Magbigay ng Dahilan",
    submit: "Isumite",
    cancel: "Kanselahin",
    estimatedTime: "Tinatayang Oras",
    location: "Lokasyon",
    priority: "Priyoridad",
    requestedBy: "Hiniling Ni",
    reasonTemplates: "Mga Mabilisang Dahilan",
    currentlyBusy: "Kasalukuyang Abala",
    jobHistory: "Kamakailang Kasaysayan ng Trabaho",
    minutes: "minuto",
    high: "Mataas na Priyoridad",
    medium: "Katamtamang Priyoridad",
    low: "Mababang Priyoridad",
    taskProgress: "Progreso ng Gawain",
    otherReason: "Iba pang dahilan...", 
    customReason: "Ilagay ang pasadyang dahilan",
    type: "Uri",
    skillsRequired: "Mga Kinakailangang Kasanayan",
    vipGuest: "VIP na Bisita"
  }
};

  const t = (key) => translations[language]?.[key] || translations.en[key];

  const reasonTemplates = [
    { id: 'busy', text: 'Currently handling another urgent task' },
    { id: 'finishing', text: 'Finishing previous task (10 min remaining)' },
    { id: 'break', text: 'On scheduled break' },
    { id: 'location', text: 'Too far from location' },
    { id: 'skills', text: 'Requires different skill set' }
  ];

  const currentTasks = [
    {
      id: 1,
      title: "AC Repair",
      room: "506",
      priority: "high",
      timeRemaining: "15 min",
      progress: 75
    }
  ];

  const recentJobs = [
    {
      id: 1,
      title: "Plumbing Fix",
      room: "302",
      completedAt: "10:30 AM",
      duration: "25 min"
    },
    {
      id: 2,
      title: "TV Configuration",
      room: "405",
      completedAt: "9:45 AM",
      duration: "15 min"
    }
  ];

  const handleAcceptJob = () => {
    console.log("Job accepted");
  };

  const handleDeclineSubmit = () => {
    console.log("Job declined:", declineReason || selectedReasonTemplate);
    setIsDeclineModalOpen(false);
    setDeclineReason('');
    setSelectedReasonTemplate('');
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Staff Job Board</h1>
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="px-3 py-2 border rounded-lg"
        >
          <option value="en">English</option>
          <option value="ar">العربية</option>
          <option value="hi">हिंदी</option>
          <option value="ur">اردو</option>
          <option value="tl">Tagalog</option>
        </select>
      </div>

      {/* Staff Information Card */}
      <Card className="mb-6">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <User className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h2 className="font-semibold">{currentStaff.name}</h2>
                <p className="text-sm text-gray-600">{currentStaff.role}</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-600">{currentStaff.shiftHours}</div>
              <div className="text-sm font-medium">
                ⭐ {currentStaff.rating} ({currentStaff.tasksCompleted} tasks)
              </div>
            </div>
          </div>
          <div className="flex gap-2 flex-wrap">
            {currentStaff.specialties.map((specialty) => (
              <span key={specialty} className="px-2 py-1 bg-gray-100 rounded-full text-sm">
                {specialty}
              </span>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* New Request Card */}
      <Card className="mb-6">
        <CardContent className="p-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <span className="inline-flex items-center bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm mb-2">
                <Bell className="w-4 h-4 mr-1" />
                {t('newRequest')}
              </span>
              <h2 className="text-xl font-semibold">{jobRequest.item} Replacement</h2>
            </div>
            <span className="px-3 py-1 rounded-full text-sm bg-red-100 text-red-800">
              {t('high')}
            </span>
          </div>

          <div className="mb-4 space-y-2">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span className="font-medium">{t('type')}:</span> 
              {jobRequest.type.category} - {jobRequest.type.subcategory}
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span className="font-medium">{t('skillsRequired')}:</span> 
              {jobRequest.type.skillRequired}
            </div>
            {jobRequest.guest.vip && (
              <div className="flex items-center gap-2">
                <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded-full text-xs">
                  {t('vipGuest')}
                </span>
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-gray-500" />
              <span>{t('estimatedTime')}: {jobRequest.type.estimatedDuration}</span>
            </div>
            <div className="flex items-center gap-2">
              <User className="w-4 h-4 text-gray-500" />
              <span>{t('location')}: Room {jobRequest.room}</span>
            </div>
          </div>

          {!showCurrentTasks ? (
            <div className="flex gap-2">
              <button
                onClick={handleAcceptJob}
                className="flex-1 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
              >
                <CheckCircle2 className="w-4 h-4 inline mr-2" />
                {t('acceptJob')}
              </button>
              <button
                onClick={() => setIsDeclineModalOpen(true)}
                className="flex-1 border border-red-500 text-red-500 px-4 py-2 rounded-lg hover:bg-red-50"
              >
                <X className="w-4 h-4 inline mr-2" />
                {t('declineJob')}
              </button>
            </div>
          ) : (
            <button
              onClick={() => setShowCurrentTasks(false)}
              className="w-full bg-gray-100 text-gray-600 px-4 py-2 rounded-lg hover:bg-gray-200"
            >
              {t('cancel')}
            </button>
          )}
        </CardContent>
      </Card>

      {/* Current Tasks Overview */}
      <Card className="mb-6">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-4">{t('currentTasks')}</h3>
          {currentTasks.map((task) => (
            <div key={task.id} className="border rounded-lg p-4 bg-gray-50">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h4 className="font-medium">{task.title}</h4>
                  <span className="text-sm text-gray-600">Room {task.room}</span>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs ${
                  task.priority === 'high' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {t(task.priority)}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2">
                <div 
                  className="bg-blue-600 h-2.5 rounded-full"
                  style={{ width: `${task.progress}%` }}
                ></div>
              </div>
              <div className="flex justify-between text-sm text-gray-600">
                <span>{task.progress}% {t('taskProgress')}</span>
                <span>{task.timeRemaining} {t('timeRemaining')}</span>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Recent Jobs */}
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-4">{t('jobHistory')}</h3>
          <div className="space-y-3">
            {recentJobs.map((job) => (
              <div key={job.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <div>
                  <div className="font-medium">{job.title}</div>
                  <div className="text-sm text-gray-600">Room {job.room}</div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-600">{job.completedAt}</div>
                  <div className="text-sm font-medium">{job.duration}</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Decline Modal */}
      {isDeclineModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h3 className="text-lg font-semibold mb-4">{t('provideReason')}</h3>
            
            <div className="space-y-3 mb-4">
              <h4 className="font-medium text-sm text-gray-600">{t('reasonTemplates')}</h4>
              {reasonTemplates.map((template) => (
                <button
                  key={template.id}
                  onClick={() => setSelectedReasonTemplate(template.text)}
                  className={`w-full text-left p-2 rounded ${
                    selectedReasonTemplate === template.text 
                      ? 'bg-blue-50 border-blue-200 border' 
                      : 'hover:bg-gray-50 border border-transparent'
                  }`}
                >
                  {template.text}
                </button>
              ))}
            </div>

            <textarea
              placeholder={t('customReason')}
              value={declineReason}
              onChange={(e) => setDeclineReason(e.target.value)}
              className="w-full border rounded-lg p-2 mb-4 h-24"
            />

            <div className="flex gap-2">
              <button
                onClick={() => setIsDeclineModalOpen(false)}
                className="flex-1 border px-4 py-2 rounded-lg hover:bg-gray-50"
              >
                {t('cancel')}
              </button>
              <button
                onClick={handleDeclineSubmit}
                className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              >
                {t('submit')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BidStaff;