"use client";

import React, { useState } from 'react';
import { Bell, Clock, User, MessageSquare, Timer, AlertCircle } from 'lucide-react';

export default function SupervisorView() {
  const [language, setLanguage] = useState('en');
  const [showDeclineReason, setShowDeclineReason] = useState(false);

  const translations = {
    en: {
      room: "Room",
      hairDryer: "Hair Dryer",
      via: "via WhatsApp",
      declined: "Declined",
      currentTask: "Current Task",
      emergencyRepair: "Emergency AC Repair",
      busy: "Busy",
      available: "Available",
      declinedReason: "Currently handling emergency AC repair in Room 506",
      viewReason: "View Reason"
    },
    ar: {
      room: "غرفة",
      hairDryer: "مجفف شعر",
      via: "عبر واتساب",
      declined: "مرفوض",
      currentTask: "المهمة الحالية",
      emergencyRepair: "إصلاح طارئ للتكييف",
      busy: "مشغول",
      available: "متاح",
      declinedReason: "يعالج حاليا إصلاح مكيف الهواء الطارئ في الغرفة 506",
      viewReason: "عرض السبب"
    },
    hi: {
      room: "कमरा",
      hairDryer: "हेयर ड्रायर",
      via: "व्हाट्सएप के माध्यम से",
      declined: "अस्वीकृत",
      currentTask: "वर्तमान कार्य",
      emergencyRepair: "आपातकालीन एसी मरम्मत",
      busy: "व्यस्त",
      available: "उपलब्ध",
      declinedReason: "वर्तमान में कमरा 506 में आपातकालीन एसी मरम्मत",
      viewReason: "कारण देखें"
    },
    ur: {
      room: "کمرہ",
      hairDryer: "ہیئر ڈرائر",
      via: "واٹس ایپ کے ذریعے",
      declined: "مسترد",
      currentTask: "موجودہ ٹاسک",
      emergencyRepair: "ہنگامی اے سی مرمت",
      busy: "مصروف",
      available: "دستیاب",
      declinedReason: "کمرہ 506 میں ہنگامی اے سی مرمت کی جارہی ہے",
      viewReason: "وجہ دیکھیں"
    },
    tl: {
      room: "Kuwarto",
      hairDryer: "Hair Dryer",
      via: "sa WhatsApp",
      declined: "Hindi Tinanggap",
      currentTask: "Kasalukuyang Gawain",
      emergencyRepair: "Emergency AC Repair",
      busy: "Abala",
      available: "Available",
      declinedReason: "Kasalukuyang nasa emergency AC repair sa Room 506",
      viewReason: "Tingnan ang Dahilan"
    }
  };

  const t = (key) => translations[language]?.[key] || translations.en[key];

  return (
    <div className="w-full max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="p-4 bg-gray-50 border-b flex justify-end items-center">
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
      </div>
    </div>
  );
}