"use client";
import React, { useState } from 'react';
import { 
  Bell, 
  Phone, 
  Mail, 
  MessageSquare, 
  Bot,
  Smartphone,
  User,
  Clock
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';

const GuestServiceHub = () => {
  const [selectedChannel, setSelectedChannel] = useState(null);
  const [language, setLanguage] = useState('en');

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'ar', name: 'العربية' },
    { code: 'hi', name: 'हिंदी' },
    { code: 'ur', name: 'اردو' },
    { code: 'tl', name: 'Tagalog' }
  ];

  const translations = {
    en: {
      title: "Guest Service Hub",
      activeTickets: "Active Tickets",
      averageResponse: "Average response time",
      minutes: "minutes",
      frontDesk: "Front Desk",
      frontDeskDesc: "Direct report to reception",
      phone: "Phone",
      phoneDesc: "Call guest services",
      mobileApp: "Mobile App",
      mobileAppDesc: "Report via guest app",
      email: "Email",
      emailDesc: "Create ticket via email",
      aiConcierge: "AI Concierge",
      aiConciergeDesc: "24/7 virtual assistant",
      emergency: "Emergency",
      emergencyDesc: "Urgent issues",
      emergencyAlert: "Emergency mode active - Guaranteed response time: 15 minutes"
    },
    ar: {
      title: "مركز خدمة الضيوف",
      activeTickets: "التذاكر النشطة",
      averageResponse: "متوسط وقت الاستجابة",
      minutes: "دقائق",
      frontDesk: "مكتب الاستقبال",
      frontDeskDesc: "تقرير مباشر للاستقبال",
      phone: "الهاتف",
      phoneDesc: "اتصل بخدمات الضيوف",
      mobileApp: "تطبيق الجوال",
      mobileAppDesc: "الإبلاغ عبر تطبيق الضيوف",
      email: "البريد الإلكتروني",
      emailDesc: "إنشاء تذكرة عبر البريد الإلكتروني",
      aiConcierge: "المساعد الافتراضي",
      aiConciergeDesc: "مساعد افتراضي 24/7",
      emergency: "طوارئ",
      emergencyDesc: "مشاكل عاجلة",
      emergencyAlert: "وضع الطوارئ نشط - وقت الاستجابة المضمون: 15 دقيقة"
    },
    hi: {
      title: "अतिथि सेवा केंद्र",
      activeTickets: "सक्रिय टिकट",
      averageResponse: "औसत प्रतिक्रिया समय",
      minutes: "मिनट",
      frontDesk: "फ्रंट डेस्क",
      frontDeskDesc: "स्वागत कक्ष में सीधी रिपोर्ट",
      phone: "फ़ोन",
      phoneDesc: "अतिथि सेवाओं को कॉल करें",
      mobileApp: "मोबाइल ऐप",
      mobileAppDesc: "अतिथि ऐप के माध्यम से रिपोर्ट",
      email: "ईमेल",
      emailDesc: "ईमेल के माध्यम से टिकट बनाएं",
      aiConcierge: "एआई कॉन्सियर्ज",
      aiConciergeDesc: "24/7 वर्चुअल असिस्टेंट",
      emergency: "आपातकाल",
      emergencyDesc: "तत्काल मुद्दे",
      emergencyAlert: "आपातकालीन मोड सक्रिय - गारंटीकृत प्रतिक्रिया समय: 15 मिनट"
    },
    ur: {
      title: "مہمان سروس مرکز",
      activeTickets: "فعال ٹکٹس",
      averageResponse: "اوسط جوابی وقت",
      minutes: "منٹ",
      frontDesk: "فرنٹ ڈیسک",
      frontDeskDesc: "استقبالیہ میں براہ راست رپورٹ",
      phone: "فون",
      phoneDesc: "مہمان خدمات کو کال کریں",
      mobileApp: "موبائل ایپ",
      mobileAppDesc: "مہمان ایپ کے ذریعے رپورٹ",
      email: "ای میل",
      emailDesc: "ای میل کے ذریعے ٹکٹ بنائیں",
      aiConcierge: "اے آئی کنسیئرج",
      aiConciergeDesc: "24/7 ورچوئل اسسٹنٹ",
      emergency: "ہنگامی",
      emergencyDesc: "فوری مسائل",
      emergencyAlert: "ہنگامی موڈ فعال - ضمانت شدہ جوابی وقت: 15 منٹ"
    },
    tl: {
      title: "Sentro ng Serbisyo sa Panauhin",
      activeTickets: "Mga Aktibong Ticket",
      averageResponse: "Karaniwang oras ng pagtugon",
      minutes: "minuto",
      frontDesk: "Front Desk",
      frontDeskDesc: "Direktang ulat sa reception",
      phone: "Telepono",
      phoneDesc: "Tumawag sa guest services",
      mobileApp: "Mobile App",
      mobileAppDesc: "Mag-ulat gamit ang guest app",
      email: "Email",
      emailDesc: "Gumawa ng ticket sa email",
      aiConcierge: "AI Concierge",
      aiConciergeDesc: "24/7 virtual assistant",
      emergency: "Emergency",
      emergencyDesc: "Mga urgent na isyu",
      emergencyAlert: "Aktibo ang emergency mode - Garantisadong oras ng pagtugon: 15 minuto"
    }
  };

  const t = (key) => translations[language]?.[key] || translations.en[key];

  const channels = [
    {
      id: 'front-desk',
      icon: <User className="w-6 h-6" />,
      title: 'frontDesk',
      description: 'frontDeskDesc'
    },
    {
      id: 'phone',
      icon: <Phone className="w-6 h-6" />,
      title: 'phone',
      description: 'phoneDesc'
    },
    {
      id: 'mobile-app',
      icon: <Smartphone className="w-6 h-6" />,
      title: 'mobileApp',
      description: 'mobileAppDesc'
    },
    {
      id: 'email',
      icon: <Mail className="w-6 h-6" />,
      title: 'email',
      description: 'emailDesc'
    },
    {
      id: 'chatbot',
      icon: <Bot className="w-6 h-6" />,
      title: 'aiConcierge',
      description: 'aiConciergeDesc'
    },
    {
      id: 'emergency',
      icon: <Bell className="w-6 h-6 text-red-500" />,
      title: 'emergency',
      description: 'emergencyDesc'
    }
  ];

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardContent className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">{t('title')}</h1>
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

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
          {channels.map((channel) => (
            <button
              key={channel.id}
              onClick={() => setSelectedChannel(channel.id)}
              className={`p-4 rounded-lg border transition-all ${
                selectedChannel === channel.id 
                  ? 'border-blue-500 bg-blue-50' 
                  : 'hover:border-gray-300 hover:bg-gray-50'
              }`}
            >
              <div className="flex flex-col items-center text-center gap-2">
                {channel.icon}
                <h3 className="font-semibold">{t(channel.title)}</h3>
                <p className="text-sm text-gray-600">{t(channel.description)}</p>
              </div>
            </button>
          ))}
        </div>

        {selectedChannel === 'emergency' && (
          <Alert className="mb-4 border-red-500 bg-red-50">
            <AlertDescription>
              {t('emergencyAlert')}
            </AlertDescription>
          </Alert>
        )}

        <div className="flex items-center justify-between text-sm text-gray-500 mt-6">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            <span>{t('averageResponse')}: 8 {t('minutes')}</span>
          </div>
          <div className="flex items-center gap-2">
            <MessageSquare className="w-4 h-4" />
            <span>{t('activeTickets')}: 12</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default GuestServiceHub;