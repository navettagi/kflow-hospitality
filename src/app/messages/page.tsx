"use client";

import React, { useState } from 'react';
import { Bell, Clock, CheckCircle2, User, MessageSquare, Timer, AlertCircle, X } from 'lucide-react';

export default function NotificationPreview() {
  const [language, setLanguage] = useState('en');
  const [view, setView] = useState('worker');
  const [taskStatus, setTaskStatus] = useState('pending');

  const translations = {
    en: {
      newRequest: "New Request",
      room: "Room",
      hairDryer: "Hair Dryer",
      timeReceived: "Time Received",
      accept: "Accept Task",
      complete: "Mark Complete",
      minutes: "minutes remaining",
      via: "via WhatsApp",
      staffView: "Staff View",
      supervisorView: "Supervisor View",
      busy: "Busy",
      available: "Available",
      declined: "Declined",
      declinedReason: "Currently handling emergency AC repair in Room 506",
      declinedTask: "Declined previous task",
      taskHistory: "Task History",
      assignmentDeclined: "Assignment Declined",
      currentTask: "Current Task",
      emergencyRepair: "Emergency AC Repair",
      viewReason: "View Reason"
    },
    ar: {
      newRequest: "طلب جديد",
      room: "غرفة",
      hairDryer: "مجفف شعر",
      timeReceived: "وقت الاستلام",
      accept: "قبول المهمة",
      complete: "اكتمل",
      minutes: "دقائق متبقية",
      via: "عبر واتساب",
      staffView: "عرض الموظف",
      supervisorView: "عرض المشرف",
      busy: "مشغول",
      available: "متاح",
      declined: "مرفوض",
      declinedReason: "يعالج حاليا إصلاح مكيف الهواء الطارئ في الغرفة 506",
      declinedTask: "رفض المهمة السابقة",
      taskHistory: "سجل المهام",
      assignmentDeclined: "تم رفض التكليف",
      currentTask: "المهمة الحالية",
      emergencyRepair: "إصلاح طارئ للتكييف",
      viewReason: "عرض السبب"
    },
    hi: {
      newRequest: "नई अनुरोध",
      room: "कमरा",
      hairDryer: "हेयर ड्रायर",
      timeReceived: "प्राप्त समय",
      accept: "कार्य स्वीकारें",
      complete: "पूर्ण",
      minutes: "मिनट शेष",
      via: "व्हाट्सएप के माध्यम से",
      staffView: "स्टाफ व्यू",
      supervisorView: "सुपरवाइजर व्यू",
      busy: "व्यस्त",
      available: "उपलब्ध",
      declined: "अस्वीकृत",
      declinedReason: "वर्तमान में कमरा 506 में आपातकालीन एसी मरम्मत",
      declinedTask: "पिछला कार्य अस्वीकृत",
      taskHistory: "कार्य इतिहास",
      assignmentDeclined: "असाइनमेंट अस्वीकृत",
      currentTask: "वर्तमान कार्य",
      emergencyRepair: "आपातकालीन एसी मरम्मत",
      viewReason: "कारण देखें"
    },
    ur: {
      newRequest: "نئی درخواست",
      room: "کمرہ",
      hairDryer: "ہیئر ڈرائر",
      timeReceived: "وقت موصول",
      accept: "ٹاسک قبول کریں",
      complete: "مکمل",
      minutes: "منٹ باقی",
      via: "واٹس ایپ کے ذریعے",
      staffView: "اسٹاف ویو",
      supervisorView: "سپروائزر ویو",
      busy: "مصروف",
      available: "دستیاب",
      declined: "مسترد",
      declinedReason: "کمرہ 506 میں ہنگامی اے سی مرمت کی جارہی ہے",
      declinedTask: "پچھلا ٹاسک مسترد",
      taskHistory: "ٹاسک ہسٹری",
      assignmentDeclined: "تفویض مسترد",
      currentTask: "موجودہ ٹاسک",
      emergencyRepair: "ہنگامی اے سی مرمت",
      viewReason: "وجہ دیکھیں"
    },
    tl: {
      newRequest: "Bagong Kahilingan",
      room: "Kuwarto",
      hairDryer: "Hair Dryer",
      timeReceived: "Oras na Natanggap",
      accept: "Tanggapin",
      complete: "Kumpleto",
      minutes: "minutong natitira",
      via: "sa WhatsApp",
      staffView: "Staff View",
      supervisorView: "Supervisor View",
      busy: "Abala",
      available: "Available",
      declined: "Hindi Tinanggap",
      declinedReason: "Kasalukuyang nasa emergency AC repair sa Room 506",
      declinedTask: "Hindi tinanggap ang nakaraang gawain",
      taskHistory: "Kasaysayan ng Gawain",
      assignmentDeclined: "Hindi Tinanggap ang Assignment",
      currentTask: "Kasalukuyang Gawain",
      emergencyRepair: "Emergency AC Repair",
      viewReason: "Tingnan ang Dahilan"
    }
  };

  const t = (key) => translations[language]?.[key] || translations.en[key];

  const [showDeclineReason, setShowDeclineReason] = useState(false);

  return (
    <div className="w-full max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="p-4 bg-gray-50 border-b flex justify-between items-center">
        <div className="space-x-2">
          <button 
            onClick={() => setView('worker')}
            className={`px-3 py-1 rounded ${view === 'worker' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100'}`}
          >
            {t('staffView')}
          </button>
          <button 
            onClick={() => setView('supervisor')}
            className={`px-3 py-1 rounded ${view === 'supervisor' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100'}`}
          >
            {t('supervisorView')}
          </button>
        </div>
        <select 
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="px-2 py-1 border rounded"
        >
          <option value="en">English</option>
          <option value="ar">العربية</option>
          <option value="hi">हिंदी</option>
          <option value="ur">اردو</option>
          <option value="tl">Tagalog</option>
        </select>
      </div>

      <div className={`p-6 ${language === 'ar' || language === 'ur' ? 'rtl' : 'ltr'}`}>
        {view === 'worker' ? (
          // Worker View
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                <Bell className="w-4 h-4 mr-1" />
                {t('newRequest')}
              </span>
              <span className="text-sm text-gray-500">15 {t('minutes')}</span>
            </div>

            <div className="space-y-3 bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center justify-between">
                <span className="font-medium">{t('room')} 412</span>
                <span className="text-sm text-gray-500">{t('via')}</span>
              </div>
              <div className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-gray-500" />
                <span>{t('hairDryer')}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-gray-500" />
                <span>{t('timeReceived')}: 14:30</span>
              </div>
            </div>

            {taskStatus === 'pending' ? (
              <button
                onClick={() => setTaskStatus('inProgress')}
                className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
              >
                {t('accept')}
              </button>
            ) : (
              <button
                onClick={() => setTaskStatus('completed')}
                className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700"
              >
                {t('complete')}
              </button>
            )}
          </div>
        ) : (
          // Supervisor View
          <div className="space-y-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium">{t('room')} 412 - {t('hairDryer')}</span>
                <Timer className="w-4 h-4 text-blue-500" />
              </div>
              <div className="text-sm text-gray-600">
                {t('via')} • 14:30
              </div>
            </div>

            <div className="space-y-2">
              {/* Staff member who declined */}
              <div className="border rounded p-3 bg-gray-50">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-gray-500" />
                    <span>Ahmed Khan</span>
                  </div>
                  <span className="px-2 py-1 rounded-full text-xs bg-red-100 text-red-800">
                    {t('declined')}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <AlertCircle className="w-4 h-4 text-gray-500" />
                  <span className="text-gray-600">{t('currentTask')}: {t('emergencyRepair')} 506</span>
                </div>
                {showDeclineReason ? (
                  <div className="mt-2 text-sm text-gray-600 bg-white p-2 rounded border">
                    {t('declinedReason')}
                  </div>
                ) : (
                  <button 
                    onClick={() => setShowDeclineReason(true)}
                    className="mt-2 text-sm text-blue-600 hover:text-blue-800"
                  >
                    {t('viewReason')}
                  </button>
                )}
              </div>

              {/* Other staff members */}
              {[
                { name: "Maria Santos", status: "busy" },
                { name: "Juan Dela Cruz", status: "available" },
                { name: "Rose Mae Garcia", status: "busy" }
              ].map((worker, index) => (
                <div key={index} className="flex items-center justify-between p-2 border rounded">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-gray-500" />
                    <span>{worker.name}</span>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    worker.status === 'available' 
                      ? 'bg-green-100 text-green-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {t(worker.status)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}