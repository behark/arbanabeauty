"use client";

import React from "react";
import MainLayout from "@/components/layout/MainLayout";
import AppointmentBooking from "@/components/booking/AppointmentBooking";
import { useLanguage } from "@/contexts/LanguageContext";

export default function BookingPage() {
  const { t } = useLanguage();
  
  return (
    <MainLayout>
      <div className="py-20 bg-accent dark:bg-gray-900">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h1 className="heading-xl mb-4">{t('booking.title')}</h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              {t('booking.subtitle')}
            </p>
          </div>
          
          <AppointmentBooking className="mt-8" />
        </div>
      </div>
    </MainLayout>
  );
}
