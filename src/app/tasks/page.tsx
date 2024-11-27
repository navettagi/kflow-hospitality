"use client";

import { useState } from 'react';
import { 
  CheckCircle2,
  Camera,
  Clock,
  AlertTriangle,
  Calendar,
  MapPin,
  MessageSquare,
  Timer
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const languages = [
  { code: 'en', name: 'English' },
  { code: 'ar', name: 'العربية' },
  { code: 'hi', name: 'हिंदी' },
  { code: 'ur', name: 'اردو' },
  { code: 'tl', name: 'Tagalog' }
];

const translations = {
  en: {
    title: "Today Works & Tasks",
    welcome: "Welcome back",
    pendingTasks: "Pending Tasks",
    completedTasks: "Completed Tasks",
    location: "Location",
    timeSlot: "Time Slot",
    priority: "Priority",
    status: "Status",
    addPhoto: "Add Photo",
    markComplete: "Mark as Complete",
    reportIssue: "Report Issue",
    notes: "Notes",
    submit: "Submit",
    photoAdded: "Photo added",
    high: "High",
    medium: "Medium",
    low: "Low"
  }
};

const MaintenanceWorkflow = () => {
  const [language, setLanguage] = useState('en');
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: {
        en: "Commercial Dishwasher Maintenance",
        ar: "صيانة غسالة الأطباق التجارية",
        hi: "व्यावसायिक डिशवॉशर रखरखाव",
        ur: "کمرشل ڈش واشر کی دیکھ بھال",
        tl: "Maintenance ng Commercial Dishwasher"
      },
      description: {
        en: "Check water temperature, clean filters, inspect spray arms",
        ar: "فحص درجة حرارة الماء وتنظيف الفلاتر وفحص أذرع الرش",
        hi: "पानी का तापमान जांचें, फ़िल्टर साफ़ करें, स्प्रे आर्म्स की जांच करें",
        ur: "پانی کا درجہ حرارت چیک کریں، فلٹرز صاف کریں، سپرے آرمز کا معائنہ کریں",
        tl: "Suriin ang temperatura ng tubig, linisin ang mga filter, inspeksyunin ang spray arms"
      },
      location: "Kitchen - Zone 2",
      timeSlot: "07:00 - 08:00",
      priority: "high",
      status: "pending"
    },
    {
      id: 2,
      title: {
        en: "Pool Equipment Inspection",
        ar: "فحص معدات حمام السباحة",
        hi: "स्विमिंग पूल उपकरण निरीक्षण",
        ur: "سوئمنگ پول کے آلات کا معائنہ",
        tl: "Inspeksyon ng Kagamitan sa Pool"
      },
      description: {
        en: "Check pump operation, filter pressure, chemical levels",
        ar: "فحص تشغيل المضخة وضغط الفلتر ومستويات المواد الكيميائية",
        hi: "पंप संचालन, फिल्टर दबाव, रासायनिक स्तर की जाँच करें",
        ur: "پمپ آپریشن، فلٹر پریشر، کیمیکل لیول چیک کریں",
        tl: "Suriin ang operasyon ng pump, filter pressure, chemical levels"
      },
      location: "Pool Area",
      timeSlot: "08:30 - 09:30",
      priority: "high",
      status: "pending"
    }
  ]);

  const t = (key) => translations[language]?.[key] || translations.en[key];
  const getLocalizedText = (textObj) => textObj[language] || textObj.en;

  const handlePhotoUpload = (taskId) => {
    setTasks(tasks.map(task => 
      task.id === taskId 
        ? { ...task, photos: [...(task.photos || []), `photo_${Date.now()}`] }
        : task
    ));
  };

  const handleTaskComplete = (taskId) => {
    setTasks(tasks.map(task =>
      task.id === taskId
        ? { ...task, status: 'completed' }
        : task
    ));
  };

  const getPriorityColor = (priority) => ({
    high: 'bg-red-100 text-red-800',
    medium: 'bg-yellow-100 text-yellow-800',
    low: 'bg-green-100 text-green-800'
  }[priority]);

  return (
    <div className={`w-full max-w-4xl mx-auto p-4 ${language === 'ar' || language === 'ur' ? 'rtl' : 'ltr'}`}>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">{t('title')}</h1>
          <p className="text-gray-600">{t('welcome')}, Ahmed Al-Mansouri</p>
        </div>
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="px-3 py-2 border rounded-lg"
        >
          {languages.map((lang) => (
            <option key={lang.code} value={lang.code}>
              {lang.name}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-blue-500" />
              <div className="text-sm">
                <div className="font-medium">{t('timeSlot')}</div>
                <div>07:00 - 16:00</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-green-50 border-green-200">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-green-500" />
              <div className="text-sm">
                <div className="font-medium">{t('completedTasks')}</div>
                <div>0/4</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        {tasks.map((task) => (
          <Card key={task.id} className={`border-l-4 ${
            task.priority === 'high' ? 'border-l-red-500' : 'border-l-yellow-500'
          }`}>
            <CardContent className="p-4">
              <div className="flex flex-col space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-semibold">
                      {getLocalizedText(task.title)}
                    </h3>
                    <p className="text-gray-600">
                      {getLocalizedText(task.description)}
                    </p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm ${getPriorityColor(task.priority)}`}>
                    {t(task.priority)}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-gray-500" />
                    {task.location}
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-gray-500" />
                    {task.timeSlot}
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => handlePhotoUpload(task.id)}
                    className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50"
                  >
                    <Camera className="w-4 h-4" />
                    {t('addPhoto')}
                  </button>
                  
                  <button
                    onClick={() => handleTaskComplete(task.id)}
                    className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    {t('markComplete')}
                  </button>
                  
                  <button
                    className="flex items-center gap-2 px-4 py-2 border border-red-500 text-red-500 rounded-lg hover:bg-red-50"
                  >
                    <AlertTriangle className="w-4 h-4" />
                    {t('reportIssue')}
                  </button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default MaintenanceWorkflow;