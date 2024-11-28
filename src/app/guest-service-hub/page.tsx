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
import { translations } from '@/translations/translator';
import { TranslationKeys } from '@/types/translations';

const GuestServiceHub = () => {
  const [selectedChannel, setSelectedChannel] = useState<string | null>(null);
  const [language, setLanguage] = useState('en');

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'ar', name: 'العربية' },
    { code: 'hi', name: 'हिंदी' },
    { code: 'ur', name: 'اردو' },
    { code: 'tl', name: 'Tagalog' }
  ];

  const t = (key: TranslationKeys): string => {
    return (translations[language as keyof typeof translations]?.[key] || 
            translations.en[key]) as string;
  };

  const channels = [
    {
      id: 'front-desk', 
      icon: <User className="w-6 h-6" />,
      title: 'frontDesk' as TranslationKeys,
      description: 'frontDeskDesc' as TranslationKeys
    },
    {
      id: 'phone',
      icon: <Phone className="w-6 h-6" />,
      title: 'phone' as TranslationKeys,
      description: 'phoneDesc' as TranslationKeys
    },
    {
      id: 'mobile-app',
      icon: <Smartphone className="w-6 h-6" />,
      title: 'mobileApp' as TranslationKeys,
      description: 'mobileAppDesc' as TranslationKeys 
    },
    {
      id: 'email',
      icon: <Mail className="w-6 h-6" />,
      title: 'email' as TranslationKeys,
      description: 'emailDesc' as TranslationKeys
    },
    {
      id: 'chatbot',
      icon: <Bot className="w-6 h-6" />,
      title: 'aiConcierge' as TranslationKeys,
      description: 'aiConciergeDesc' as TranslationKeys
    },
    {
      id: 'emergency',
      icon: <Bell className="w-6 h-6 text-red-500" />,
      title: 'emergency' as TranslationKeys,
      description: 'emergencyDesc' as TranslationKeys
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