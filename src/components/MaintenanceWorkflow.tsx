'use client';

import { useState } from 'react';
import { 
  CheckCircle2, Camera, Clock, AlertTriangle, Building,
  BedDouble, Bath, Fan, BadgeHelp, ThumbsUp, ThumbsDown
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from "@/components/ui/button";
//import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@shadcn/ui";
//import { Textarea } from "@shadcn/ui";

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
}

interface Translations {
  [key: string]: TranslationStrings;
}

interface LocalizedText {
  [key: string]: string;
}

type Priority = 'high' | 'medium' | 'low';
type Language = 'en' | 'es' | 'ar' | 'hi' | 'tl';

interface Task {
  id: number;
  title: LocalizedText;
  description: LocalizedText;
  location: string;
  timeSlot: string;
  priority: Priority;
  status: 'pending' | 'completed' | 'rejected';
  type: string;
  photos?: string[];
  reason?: string;
}

const languages = [
  { code: 'en', name: 'English' },
  { code: 'es', name: 'Español' },
  { code: 'ar', name: 'العربية' },
  { code: 'hi', name: 'हिंदी' },
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
    low: "When Available"
  }
};

export default function MaintenanceWorkflow() {
  const [language, setLanguage] = useState<Language>('en');
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: 1,
      title: {
        en: "Extra Towels Request",
        es: "Solicitud de toallas adicionales",
      },
      description: {
        en: "Guest requested 2 extra bath towels and 1 hand towel",
        es: "El huésped solicitó 2 toallas de baño adicionales y 1 toalla de mano",
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
        es: "Secador de pelo no funciona",
      },
      description: {
        en: "Guest reported hair dryer not functioning, needs replacement",
        es: "El huésped informó que el secador de pelo no funciona, necesita reemplazo",
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
        es: "Almohadas adicionales",
      },
      description: {
        en: "Request for 2 extra pillows",
        es: "Solicitud de 2 almohadas adicionales",
      },
      location: "Floor 12 - Room 1210",
      timeSlot: "10:30",
      priority: "medium",
      status: "pending",
      type: "bedding"
    }
  ]);

  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [rejectionReason, setRejectionReason] = useState('');
  const [showRejectDialog, setShowRejectDialog] = useState(false);

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

  const handleRejectTask = (taskId: number) => {
    setSelectedTask(tasks.find(t => t.id === taskId) || null);
    setShowRejectDialog(true);
  };

  const confirmReject = () => {
    if (!selectedTask) return;
    
    setTasks(tasks.map(task =>
      task.id === selectedTask.id 
        ? { ...task, status: 'rejected', reason: rejectionReason }
        : task
    ));
    
    setShowRejectDialog(false);
    setRejectionReason('');
    setSelectedTask(null);
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
                        Accept Task
                      </Button>
                      <Button
                        onClick={() => handleRejectTask(task.id)}
                        variant="outline"
                        className="flex items-center gap-2 border-red-500 text-red-500 hover:bg-red-50"
                      >
                        <ThumbsDown className="w-4 h-4" />
                        Reject Task
                      </Button>
                    </>
                  )}
                  
                  {task.status === 'rejected' && task.reason && (
                    <div className="text-red-500 text-sm mt-2">
                      Rejection reason: {task.reason}
                    </div>
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