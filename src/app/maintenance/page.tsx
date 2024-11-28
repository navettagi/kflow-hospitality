"use client";
import { useState } from 'react';
import { 
  CheckCircle2, Camera, Clock, AlertTriangle,
  Calendar, MapPin, MessageSquare, Timer
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface StaffData {
  name: string;
  role: string;
  photo: string;
  taskCount: {
    completed: number;
    pending: number;
  };
}

interface Task {
  id: number;
  title: { [key: string]: string };
  description: { [key: string]: string };
  location: string;
  timeSlot: string;
  priority: 'high' | 'medium' | 'low';
  status: 'pending' | 'completed';
  subtasks: {
    id: number;
    text: string;
    completed: boolean;
  }[];
  photos?: string[];
}

const languages = [
  { code: 'en', name: 'English' },
  { code: 'ar', name: 'العربية' },
  { code: 'hi', name: 'हिंदी' },
  { code: 'ur', name: 'اردو' },
  { code: 'tl', name: 'Tagalog' }
];

const translations = {
  en: {
    title: "Daily Maintenance Schedule",
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

const staffData: StaffData = {
  name: "John Smith",
  role: "Senior Maintenance Engineer",
  photo: "/images/john-smith.jpg",
  taskCount: {
    completed: 128,
    pending: 3
  }
};

const initialTasks: Task[] = [
  {
    id: 1,
    title: { en: "Check HVAC System" },
    description: { en: "Inspect and test HVAC components" },
    location: "Building A",
    timeSlot: "9:00 AM - 10:00 AM",
    priority: "high",
    status: "pending",
    subtasks: [
      { id: 1, text: "Check filters", completed: false },
      { id: 2, text: "Test temperature", completed: false }
    ]
  },
  {
    id: 2,
    title: { en: "Electrical Maintenance" },
    description: { en: "Check electrical panels and connections" },
    location: "Building B",
    timeSlot: "11:00 AM - 12:00 PM",
    priority: "medium",
    status: "pending",
    subtasks: [
      { id: 1, text: "Inspect panels", completed: false },
      { id: 2, text: "Test circuits", completed: false }
    ]
  }
];

const MaintenanceWorkflow = () => {
  const [language, setLanguage] = useState('en');
  const [tasks, setTasks] = useState<Task[]>(initialTasks);

  const t = (key: keyof typeof translations.en): string => 
    translations[language as keyof typeof translations]?.[key] || 
    translations.en[key];

  const getLocalizedText = (textObj: { [key: string]: string }): string => 
    textObj[language] || textObj.en;

  const handleSubtaskChange = (taskId: number, subtaskId: number): void => {
    setTasks(tasks.map(task => 
      task.id === taskId 
        ? {
            ...task, 
            subtasks: task.subtasks.map(subtask => 
              subtask.id === subtaskId 
                ? { ...subtask, completed: !subtask.completed }
                : subtask
            )
          }
        : task  
    ));
  };

  const getPriorityColor = (priority: Task['priority']): string => ({
    high: 'bg-red-100 text-red-800',
    medium: 'bg-yellow-100 text-yellow-800', 
    low: 'bg-green-100 text-green-800'
  }[priority]);

  return (
    <div className={`w-full max-w-4xl mx-auto p-4 ${language === 'ar' || language === 'ur' ? 'rtl' : 'ltr'}`}>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <img
            src={staffData.photo}
            alt={staffData.name}
            className="w-16 h-16 rounded-full"
          />
          <div>
            <h2 className="font-semibold text-lg">{staffData.name}</h2>
            <p className="text-gray-600">{staffData.role}</p>
          </div>
        </div>
        <select 
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="border rounded p-2"
        >
          {languages.map(lang => (
            <option key={lang.code} value={lang.code}>{lang.name}</option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">{staffData.taskCount.completed}</div>
            <div className="text-gray-600">{t('completedTasks')}</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">{staffData.taskCount.pending}</div>
            <div className="text-gray-600">{t('pendingTasks')}</div>
          </CardContent>
        </Card>
      </div>

      <h1 className="text-2xl font-bold mb-4">{t('title')}</h1>
      
      <div className="grid gap-4">
        {tasks.map(task => (
          <Card key={task.id} className="w-full">
            <CardContent className="p-4">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-xl font-semibold">{getLocalizedText(task.title)}</h2>
                <span className={`px-2 py-1 rounded text-sm ${getPriorityColor(task.priority)}`}>
                  {t(task.priority)}
                </span>
              </div>
              
              <div className="grid gap-2 mb-4">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  <span>{task.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>{task.timeSlot}</span>
                </div>
              </div>

              <div className="space-y-2 mb-4">
                {task.subtasks.map(subtask => (
                  <label key={subtask.id} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={subtask.completed}
                      onChange={() => handleSubtaskChange(task.id, subtask.id)}
                      className="rounded"
                    />
                    <span>{subtask.text}</span>
                  </label>
                ))}
              </div>

              <div className="flex gap-2">
                <button className="flex items-center gap-1 px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                  <Camera className="w-4 h-4" />
                  {t('addPhoto')}
                </button>
                <button className="flex items-center gap-1 px-3 py-2 bg-green-500 text-white rounded hover:bg-green-600">
                  <CheckCircle2 className="w-4 h-4" />
                  {t('markComplete')}
                </button>
                <button className="flex items-center gap-1 px-3 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600">
                  <AlertTriangle className="w-4 h-4" />
                  {t('reportIssue')}
                </button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default MaintenanceWorkflow;