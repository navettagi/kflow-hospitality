'use client';

import { useState } from 'react';
import { 
  CheckCircle2, Camera, Clock, AlertTriangle, Building,
  BedDouble, Bath, Fan, BadgeHelp, ThumbsUp, ThumbsDown, X
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from "@/components/ui/button";
import { Alert } from "@/components/ui/alert";

interface TranslationStrings {
  title: string;
  welcome: string;
  pendingTasks: string;
  completedTasks: string;
  location: string;
  timeSlot: string;
  priority: string;
  status: string;
  addPhoto: string;
  markComplete: string;
  reportIssue: string;
  notes: string;
  submit: string;
  photoAdded: string;
  high: string;
  medium: string;
  low: string;
  acceptTask: string;
  rejectTask: string;
  rejectTaskTitle: string;
  selectReason: string;
  specifyReason: string;
  enterReason: string;
  cancel: string;
  submitRejection: string;
  taskCompleted: string;
  taskRejected: string;
}

interface Translations {
  [key: string]: TranslationStrings;
}

interface LocalizedText {
  [key: string]: string;
}

type Priority = 'high' | 'medium' | 'low';
type Language = 'en' | 'ar' | 'hi' | 'ur' | 'tl';

interface Task {
  id: number;
  title: {
    en: string;
    ar: string;
    hi: string;
    ur: string;
    tl: string;
  };
  description: {
    en: string;
    ar: string;
    hi: string;
    ur: string;
    tl: string;
  };
  location: string;
  timeSlot: string;
  priority: Priority;
  status: 'pending' | 'completed' | 'rejected';
  type: string;
  photos?: string[];
  reason?: string;
}

// Aggiungi dopo le interfacce e prima di export default
const standardReasons = [
  "Equipment/supplies not available",
  "Area currently occupied/in use",
  "Requires specialist intervention",
  "Safety concern identified",
  "Awaiting management approval",
  "Outside of service hours",
  "Other (specify below)"
];

const languages = [
  { code: 'en', name: 'English' },
  { code: 'ar', name: 'العربية' },
  { code: 'hi', name: 'हिंदी' },
  { code: 'ur', name: 'اردو' },
  { code: 'tl', name: 'Tagalog' }
];

const translations: Translations = {
  en: {
    title: "Guest Requests & Tasks",
    welcome: "Welcome back",
    pendingTasks: "Pending Requests",
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
    high: "Urgent",
    medium: "Normal",
    low: "When Available",
    acceptTask: "Accept Task",
    rejectTask: "Reject Task",
    rejectTaskTitle: "Reject Task",
    selectReason: "Select Reason",
    specifyReason: "Specify Reason",
    enterReason: "Enter detailed reason...",
    cancel: "Cancel",
    submitRejection: "Submit Rejection",
    taskCompleted: "Task completed successfully",
    taskRejected: "Task rejected"
  },
  ar: {
    title: "طلبات ومهام الضيوف",
    welcome: "مرحباً بعودتك",
    pendingTasks: "الطلبات المعلقة",
    completedTasks: "المهام المكتملة",
    location: "الموقع",
    timeSlot: "الوقت المحدد",
    priority: "الأولوية",
    status: "الحالة",
    addPhoto: "إضافة صورة",
    markComplete: "وضع علامة مكتمل",
    reportIssue: "الإبلاغ عن مشكلة",
    notes: "ملاحظات",
    submit: "إرسال",
    photoAdded: "تمت إضافة الصورة",
    high: "عاجل",
    medium: "عادي",
    low: "عند التوفر",
    acceptTask: "قبول المهمة",
    rejectTask: "رفض المهمة",
    rejectTaskTitle: "رفض المهمة",
  selectReason: "اختر السبب",
  specifyReason: "حدد السبب",
  enterReason: "أدخل السبب بالتفصيل...",
  cancel: "إلغاء",
  submitRejection: "تأكيد الرفض",
  taskCompleted: "تم إكمال المهمة بنجاح",
  taskRejected: "تم رفض المهمة"
  },
  hi: {
    title: "अतिथि अनुरोध और कार्य",
    welcome: "वापसी पर स्वागत है",
    pendingTasks: "लंबित अनुरोध",
    completedTasks: "पूर्ण कार्य",
    location: "स्थान",
    timeSlot: "समय स्लॉट",
    priority: "प्राथमिकता",
    status: "स्थिति",
    addPhoto: "फोटो जोड़ें",
    markComplete: "पूर्ण के रूप में चिह्नित करें",
    reportIssue: "समस्या की रिपोर्ट करें",
    notes: "नोट्स",
    submit: "जमा करें",
    photoAdded: "फोटो जोड़ी गई",
    high: "तत्काल",
    medium: "सामान्य",
    low: "जब उपलब्ध हो",
    acceptTask: "कार्य स्वीकार करें",
    rejectTask: "कार्य अस्वीकार करें",
    rejectTaskTitle: "कार्य अस्वीकार करें",
  selectReason: "कारण चुनें",
  specifyReason: "कारण निर्दिष्ट करें",
  enterReason: "विस्तृत कारण दर्ज करें...",
  cancel: "रद्द करें",
  submitRejection: "अस्वीकृति जमा करें",
  taskCompleted: "कार्य सफलतापूर्वक पूरा हुआ",
  taskRejected: "कार्य अस्वीकृत"
  },
  ur: {
    title: "مہمان کی درخواستیں اور کام",
    welcome: "واپسی پر خوش آمدید",
    pendingTasks: "زیر التواء درخواستیں",
    completedTasks: "مکمل شدہ کام",
    location: "مقام",
    timeSlot: "وقت کی سلاٹ",
    priority: "ترجیح",
    status: "حیثیت",
    addPhoto: "تصویر شامل کریں",
    markComplete: "مکمل کے طور پر نشان زد کریں",
    reportIssue: "مسئلہ کی اطلاع دیں",
    notes: "نوٹس",
    submit: "جمع کرائیں",
    photoAdded: "تصویر شامل کر دی گئی",
    high: "فوری",
    medium: "عام",
    low: "جب دستیاب ہو",
    acceptTask: "ٹاسک قبول کریں",
    rejectTask: "ٹاسک مسترد کریں",
    rejectTaskTitle: "ٹاسک مسترد کریں",
    selectReason: "وجہ منتخب کریں",
    specifyReason: "وجہ بتائیں",
    enterReason: "تفصیلی وجہ درج کریں...",
    cancel: "منسوخ کریں",
    submitRejection: "مسترد کریں",
    taskCompleted: "ٹاسک کامیابی سے مکمل ہو گیا",
    taskRejected: "ٹاسک مسترد کر دیا گیا"
  },
  tl: {
    title: "Mga Kahilingan at Gawain ng Bisita",
    welcome: "Maligayang pagbabalik",
    pendingTasks: "Mga Nakabinbing Kahilingan",
    completedTasks: "Mga Nakumpletong Gawain",
    location: "Lokasyon",
    timeSlot: "Oras",
    priority: "Priyoridad",
    status: "Katayuan",
    addPhoto: "Magdagdag ng Larawan",
    markComplete: "Markahan bilang Kumpleto",
    reportIssue: "Mag-ulat ng Issue",
    notes: "Mga Tala",
    submit: "Isumite",
    photoAdded: "Naidagdag ang larawan",
    high: "Urgente",
    medium: "Normal",
    low: "Kapag Available",
    acceptTask: "Tanggapin ang Gawain",
    rejectTask: "Tanggihan ang Gawain",
    rejectTaskTitle: "Tanggihan ang Gawain",
    selectReason: "Pumili ng Dahilan",
    specifyReason: "Tukuyin ang Dahilan",
    enterReason: "Maglagay ng detalyadong dahilan...",
    cancel: "Kanselahin",
    submitRejection: "Isumite ang Pagtanggi",
    taskCompleted: "Matagumpay na nakumpleto ang gawain",
    taskRejected: "Tinanggihan ang gawain"
  }
};

export default function MaintenanceWorkflow() {
  const [language, setLanguage] = useState<Language>('en');
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: 1,
      title: {
        en: "Extra Towels Request",
        ar: "طلب مناشف إضافية",
        hi: "अतिरिक्त तौलिये का अनुरोध",
        ur: "اضافی تولیے کی درخواست",
        tl: "Kahilingan ng Karagdagang Tuwalya"
      },
      description: {
        en: "Guest requested 2 extra bath towels and 1 hand towel",
        ar: "طلب الضيف 2 مناشف حمام إضافية ومنشفة يد واحدة",
        hi: "अतिथि ने 2 अतिरिक्त स्नान तौलिए और 1 हाथ तौलिया का अनुरोध किया",
        ur: "مہمان نے 2 اضافی باتھ تولیے اور 1 ہاتھ کا تولیہ درخواست کیا",
        tl: "Humiling ang bisita ng 2 karagdagang bath towel at 1 hand towel"
      },
      location: "Floor 12 - Room 1204",
      timeSlot: "10:15",
      priority: "medium",
      status: "pending",
      type: "towels"
    },
    {
      id: 2,
      title: {
        en: "Hair Dryer Not Working",
        ar: "مجفف الشعر لا يعمل",
        hi: "हेयर ड्रायर काम नहीं कर रहा है",
        ur: "ہیئر ڈرائر کام نہیں کر رہا",
        tl: "Hindi Gumagana ang Hair Dryer"
      },
      description: {
        en: "Guest reported hair dryer not functioning, needs replacement",
        ar: "أبلغ الضيف عن عدم عمل مجفف الشعر، يحتاج إلى استبدال",
        hi: "अतिथि ने हेयर ड्रायर के खराब होने की सूचना दी, बदलने की आवश्यकता है",
        ur: "مہمان نے ہیئر ڈرائر کے خراب ہونے کی اطلاع دی، تبدیلی کی ضرورت ہے",
        tl: "Iniulat ng bisita na hindi gumagana ang hair dryer, kailangang palitan"
      },
      location: "Floor 10 - Room 1002",
      timeSlot: "10:05",
      priority: "high",
      status: "pending",
      type: "equipment"
    },
    {
      id: 3,
      title: {
        en: "Extra Pillows",
        ar: "وسائد إضافية",
        hi: "अतिरिक्त तकिए",
        ur: "اضافی تکیے",
        tl: "Karagdagang Unan"
      },
      description: {
        en: "Request for 2 extra pillows",
        ar: "طلب 2 وسادة إضافية",
        hi: "2 अतिरिक्त तकियों का अनुरोध",
        ur: "2 اضافی تکیوں کی درخواست",
        tl: "Kahilingan para sa 2 karagdagang unan"
      },
      location: "Floor 12 - Room 1210",
      timeSlot: "10:30",
      priority: "medium",
      status: "pending",
      type: "bedding"
    }
  ]);

  // Aggiungi dopo gli altri useState
  const [showRejectForm, setShowRejectForm] = useState(false);
  const [selectedReason, setSelectedReason] = useState('');
  const [customReason, setCustomReason] = useState('');
  const [rejectingTaskId, setRejectingTaskId] = useState<number | null>(null);

  const t = (key: keyof TranslationStrings): string => 
    translations[language]?.[key] || translations.en[key];
  
  const getLocalizedText = (textObj: LocalizedText): string => textObj[language] || textObj.en;

  const handlePhotoUpload = (taskId: number): void => {
    setTasks(tasks.map(task => 
      task.id === taskId 
        ? { ...task, photos: [...(task.photos || []), `photo_${Date.now()}`] }
        : task
    ));
  };

  const handleAcceptTask = (taskId: number) => {
    setTasks(tasks.map(task =>
      task.id === taskId ? { ...task, status: 'completed' } : task
    ));
  };

  const handleRejectClick = (taskId: number) => {
    setRejectingTaskId(taskId);
    setShowRejectForm(true);
    setSelectedReason('');
    setCustomReason('');
  };

  const handleRejectSubmit = () => {
    if (!rejectingTaskId) return;
    
    const finalReason = selectedReason === 'Other (specify below)' 
      ? customReason 
      : selectedReason;
  
    setTasks(tasks.map(task =>
      task.id === rejectingTaskId 
        ? { ...task, status: 'rejected', reason: finalReason }
        : task
    ));
    
    setShowRejectForm(false);
    setRejectingTaskId(null);
    setSelectedReason('');
    setCustomReason('');
  };
  
  const getPriorityColor = (priority: Priority): string => ({
    high: 'bg-red-100 text-red-800',
    medium: 'bg-yellow-100 text-yellow-800',
    low: 'bg-green-100 text-green-800'
  }[priority]);
  
  const getTaskIcon = (type: string) => {
    const icons: { [key: string]: React.ElementType } = {
      towels: Bath,
      equipment: Fan,
      bedding: BedDouble,
      other: BadgeHelp
    };
    const IconComponent = icons[type] || BadgeHelp;
    return <IconComponent className="w-5 h-5" />;
  };

  return (
    <div className={`w-full max-w-4xl mx-auto p-4 ${language === 'ar' ? 'rtl' : 'ltr'}`}>
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-4">
          <img
            src="/images/jorge-santos.jpg"
            alt="Jorge Santos"
            className="w-16 h-16 rounded-full border-2 border-blue-500"
          />
          <div>
            <h1 className="text-2xl font-bold">{t('title')}</h1>
            <p className="text-gray-600">{t('welcome')}, Jorge Santos</p>
            <p className="text-sm text-gray-500">Housekeeping Department</p>
          </div>
        </div>
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value as Language)}
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
                <div>10:00 - 18:30</div>
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
                <div>{tasks.filter(t => t.status === 'completed').length}/{tasks.length}</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

    {showRejectForm && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg p-6 max-w-md w-full">
          <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">{t('rejectTaskTitle')}</h3>
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => setShowRejectForm(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">{t('selectReason')}</label>
              <select
                value={selectedReason}
                onChange={(e) => setSelectedReason(e.target.value)}
                className="w-full p-2 border rounded-md"
              >
                <option value="">{t('selectReason')}</option>
                {standardReasons.map((reason) => (
                  <option key={reason} value={reason}>
                    {reason}
                  </option>
                ))}
              </select>
            </div>

            {selectedReason === 'Other (specify below)' && (
              <div className="space-y-2">
                <label className="text-sm font-medium">{t('specifyReason')}</label>
                <textarea
                  value={customReason}
                  onChange={(e) => setCustomReason(e.target.value)}
                  className="w-full p-2 border rounded-md"
                  rows={3}
                  placeholder={t('enterReason')}
                />
              </div>
            )}

            <div className="flex justify-end gap-2 mt-4">
              <Button
                variant="outline"
                onClick={() => setShowRejectForm(false)}
              >
                {t('cancel')}
              </Button>
              <Button
                onClick={handleRejectSubmit}
                disabled={!selectedReason || (selectedReason === 'Other (specify below)' && !customReason)}
                className="bg-red-600 hover:bg-red-700 text-white"
              >
                {t('submitRejection')}
              </Button>
            </div>
          </div>
        </div>
      </div>
    )}

      <div className="space-y-4">
        {tasks.sort((a, b) => {
          const floorA = parseInt(a.location.match(/Floor (\d+)/)?.[1] || '0');
          const floorB = parseInt(b.location.match(/Floor (\d+)/)?.[1] || '0');
          if (floorA !== floorB) return floorA - floorB;
          
          const priorityOrder = { high: 0, medium: 1, low: 2 };
          return priorityOrder[a.priority] - priorityOrder[b.priority];
        }).map((task) => (
          <Card key={task.id} className={`border-l-4 ${
            task.status === 'rejected' ? 'border-l-red-500' :
            task.priority === 'high' ? 'border-l-orange-500' :
            'border-l-yellow-500'
          }`}>
            <CardContent className="p-4">
              <div className="flex flex-col space-y-4">
                <div className="flex justify-between items-start">
                  <div className="flex items-start gap-3">
                    {getTaskIcon(task.type)}
                    <div>
                      <h3 className="text-lg font-semibold">
                        {getLocalizedText(task.title)}
                      </h3>
                      <p className="text-gray-600">
                        {getLocalizedText(task.description)}
                      </p>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm ${getPriorityColor(task.priority)}`}>
                    {t(task.priority)}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <Building className="w-4 h-4 text-gray-500" />
                    {task.location}
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-gray-500" />
                    {task.timeSlot}
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => handlePhotoUpload(task.id)}
                    className="flex items-center gap-2 px-4 py-2 text-sm border rounded-lg hover:bg-gray-50"
                  >
                    <Camera className="w-4 h-4" />
                    {t('addPhoto')}
                  </button>
  
                  {task.status === 'pending' && (
                    <>
                      <Button
                        onClick={() => handleAcceptTask(task.id)}
                        className="flex items-center gap-2 bg-green-600 hover:bg-green-700"
                      >
                        <ThumbsUp className="w-4 h-4" />
                        {t('acceptTask')}
                      </Button>
                      <Button
                        onClick={() => handleRejectClick(task.id)}
                        variant="outline"
                        className="flex items-center gap-2 border-red-500 text-red-500 hover:bg-red-50"
                      >
                        <ThumbsDown className="w-4 h-4" />
                        {t('rejectTask')}
                      </Button>
                    </>
                  )}

                  {task.status === 'completed' && (
                    <Alert className="w-full bg-green-50 border-green-200 text-green-800">
                      <CheckCircle2 className="h-4 w-4" />
                      <span>{t('taskCompleted')}</span>
                    </Alert>
                  )}
  
                  {task.status === 'rejected' && task.reason && (
                    <Alert className="w-full bg-red-50 border-red-200 text-red-800">
                      <AlertTriangle className="h-4 w-4" />
                      <span>{t('taskRejected')}: {task.reason}</span>
                    </Alert>
                  )}
                </div>
              </div>  
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}