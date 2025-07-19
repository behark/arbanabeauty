"use client";

import React, { useState } from "react";
import { FaCalendarAlt, FaClock, FaUser, FaEnvelope, FaPhone, FaCheck } from "react-icons/fa";
import { useLanguage } from "@/contexts/LanguageContext";

// Service options with durations and prices
const SERVICES = [
  { id: "makeup", name: "Professional Makeup", duration: 60, price: 50 },
  { id: "bridal", name: "Bridal Makeup", duration: 120, price: 150 },
  { id: "lesson", name: "Makeup Lesson", duration: 90, price: 80 },
  { id: "consultation", name: "Beauty Consultation", duration: 45, price: 30 }
];

// Available time slots
const TIME_SLOTS = [
  "09:00", "10:00", "11:00", "12:00", "13:00", 
  "14:00", "15:00", "16:00", "17:00"
];

interface AppointmentBookingProps {
  className?: string;
}

export default function AppointmentBooking({ className = "" }: AppointmentBookingProps) {
  const { t } = useLanguage();
  
  // Form state
  const [selectedService, setSelectedService] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");
  
  // Booking process state
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingComplete, setBookingComplete] = useState(false);
  const [bookingReference, setBookingReference] = useState("");
  
  // Get tomorrow's date as the minimum selectable date
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split('T')[0];
  
  // Get date 3 months from now as the maximum selectable date
  const maxDate = new Date();
  maxDate.setMonth(maxDate.getMonth() + 3);
  const maxDateString = maxDate.toISOString().split('T')[0];
  
  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Here we would normally send the booking data to a server
    // For now, we'll just simulate a successful booking
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Generate a random booking reference
      const reference = `BK-${Math.floor(100000 + Math.random() * 900000)}`;
      setBookingReference(reference);
      setBookingComplete(true);
      
    } catch (error) {
      console.error('Booking error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Get the selected service details
  const getServiceDetails = () => {
    return SERVICES.find(service => service.id === selectedService);
  };
  
  // Format currency
  const formatCurrency = (amount: number) => {
    return `€${amount.toFixed(2)}`;
  };
  
  // Reset the booking form
  const resetForm = () => {
    setSelectedService("");
    setSelectedDate("");
    setSelectedTime("");
    setName("");
    setEmail("");
    setPhone("");
    setNotes("");
    setCurrentStep(1);
    setBookingComplete(false);
    setBookingReference("");
  };
  
  // Navigate between steps
  const nextStep = () => {
    setCurrentStep(prev => Math.min(prev + 1, 3));
  };
  
  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };
  
  // Check if current step is complete
  const isCurrentStepComplete = () => {
    switch (currentStep) {
      case 1:
        return !!selectedService;
      case 2:
        return !!selectedDate && !!selectedTime;
      case 3:
        return !!name && !!email && !!phone;
      default:
        return false;
    }
  };
  
  // Render the booking success message
  const renderBookingSuccess = () => (
    <div className="text-center py-8 px-4">
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-6">
        <FaCheck className="text-green-500 text-2xl" />
      </div>
      <h3 className="text-2xl font-bold mb-4">{t('booking.success')}</h3>
      <p className="mb-6 text-gray-600">{t('booking.confirmation')}</p>
      
      <div className="bg-gray-50 p-6 rounded-lg mb-6 text-left">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-500">{t('booking.reference')}</p>
            <p className="font-bold">{bookingReference}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">{t('booking.service')}</p>
            <p className="font-bold">{getServiceDetails()?.name}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">{t('booking.date')}</p>
            <p className="font-bold">{selectedDate}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">{t('booking.time')}</p>
            <p className="font-bold">{selectedTime}</p>
          </div>
        </div>
      </div>
      
      <p className="mb-6 text-sm text-gray-500">
        {t('booking.emailSent')}
      </p>
      
      <button 
        onClick={resetForm}
        className="px-6 py-3 bg-primary text-white font-semibold rounded-sm hover:bg-primary-dark transition-colors"
      >
        {t('booking.bookAnother')}
      </button>
    </div>
  );
  
  // Render service selection step
  const renderServiceSelection = () => (
    <div className="space-y-6">
      <h3 className="text-xl font-bold mb-4">{t('booking.selectService')}</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {SERVICES.map(service => (
          <div 
            key={service.id}
            onClick={() => setSelectedService(service.id)}
            className={`border p-4 rounded-lg cursor-pointer transition-colors ${
              selectedService === service.id 
                ? 'border-primary bg-primary bg-opacity-5' 
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <h4 className="font-bold">{service.name}</h4>
            <div className="flex justify-between mt-2 text-sm">
              <span className="text-gray-600">{service.duration} min</span>
              <span className="font-semibold">{formatCurrency(service.price)}</span>
            </div>
          </div>
        ))}
      </div>
      
      <div className="flex justify-end mt-6">
        <button
          onClick={nextStep}
          disabled={!isCurrentStepComplete()}
          className={`px-6 py-3 font-semibold rounded-sm transition-colors ${
            isCurrentStepComplete()
              ? 'bg-primary text-white hover:bg-primary-dark'
              : 'bg-gray-200 text-gray-500 cursor-not-allowed'
          }`}
        >
          {t('booking.continue')}
        </button>
      </div>
    </div>
  );
  
  // Render date and time selection step
  const renderDateTimeSelection = () => (
    <div>
      <h3 className="text-xl font-bold mb-4">{t('booking.selectDateTime')}</h3>
      
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-2" htmlFor="date">
            {t('booking.selectDate')}
          </label>
          <div className="relative">
            <input
              type="date"
              id="date"
              min={minDate}
              max={maxDateString}
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
              required
            />
          </div>
        </div>
        
        {selectedDate && (
          <div>
            <label className="block text-sm font-medium mb-2">
              {t('booking.selectTime')}
            </label>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2">
              {TIME_SLOTS.map((time) => (
                <button
                  key={time}
                  type="button"
                  onClick={() => setSelectedTime(time)}
                  className={`py-2 px-3 text-center border rounded-md transition-colors ${
                    selectedTime === time
                      ? 'bg-primary text-white border-primary'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  {time}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
      
      <div className="flex justify-between mt-6">
        <button
          onClick={prevStep}
          className="px-6 py-3 border border-gray-300 text-gray-700 font-semibold rounded-sm hover:bg-gray-50 transition-colors"
        >
          {t('booking.back')}
        </button>
        <button
          onClick={nextStep}
          disabled={!isCurrentStepComplete()}
          className={`px-6 py-3 font-semibold rounded-sm transition-colors ${
            isCurrentStepComplete()
              ? 'bg-primary text-white hover:bg-primary-dark'
              : 'bg-gray-200 text-gray-500 cursor-not-allowed'
          }`}
        >
          {t('booking.continue')}
        </button>
      </div>
    </div>
  );
  
  // Render contact information step
  const renderContactInfo = () => (
    <form onSubmit={handleSubmit}>
      <h3 className="text-xl font-bold mb-4">{t('booking.yourDetails')}</h3>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="name">
            {t('booking.fullName')}
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <FaUser className="text-gray-400" />
            </div>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
              required
            />
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="email">
            {t('booking.email')}
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <FaEnvelope className="text-gray-400" />
            </div>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
              required
            />
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="phone">
            {t('booking.phone')}
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <FaPhone className="text-gray-400" />
            </div>
            <input
              type="tel"
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
              required
            />
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="notes">
            {t('booking.notes')}
          </label>
          <textarea
            id="notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={3}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
          />
        </div>
      </div>
      
      <div className="mt-6 border-t pt-6">
        <h4 className="font-bold mb-2">{t('booking.summary')}</h4>
        <div className="bg-gray-50 p-4 rounded-lg mb-6">
          <div className="flex justify-between mb-2">
            <span>{getServiceDetails()?.name}</span>
            <span className="font-semibold">{getServiceDetails() ? formatCurrency(getServiceDetails()!.price) : ''}</span>
          </div>
          <div className="flex justify-between text-sm text-gray-600">
            <span>
              <FaCalendarAlt className="inline mr-1" />
              {selectedDate}
            </span>
            <span>
              <FaClock className="inline mr-1" />
              {selectedTime}
            </span>
          </div>
        </div>
      </div>
      
      <div className="flex justify-between mt-6">
        <button
          type="button"
          onClick={prevStep}
          className="px-6 py-3 border border-gray-300 text-gray-700 font-semibold rounded-sm hover:bg-gray-50 transition-colors"
        >
          {t('booking.back')}
        </button>
        <button
          type="submit"
          disabled={isSubmitting || !isCurrentStepComplete()}
          className={`px-6 py-3 font-semibold rounded-sm transition-colors ${
            isSubmitting 
              ? 'bg-gray-400 text-white cursor-wait'
              : isCurrentStepComplete()
                ? 'bg-primary text-white hover:bg-primary-dark'
                : 'bg-gray-200 text-gray-500 cursor-not-allowed'
          }`}
        >
          {isSubmitting ? t('booking.processing') : t('booking.confirmBooking')}
        </button>
      </div>
    </form>
  );
  
  // Render the appropriate step
  const renderStep = () => {
    if (bookingComplete) {
      return renderBookingSuccess();
    }
    
    switch (currentStep) {
      case 1:
        return renderServiceSelection();
      case 2:
        return renderDateTimeSelection();
      case 3:
        return renderContactInfo();
      default:
        return null;
    }
  };
  
  // Progress indicator
  const renderProgress = () => (
    <div className="flex mb-8">
      {[1, 2, 3].map((step) => (
        <React.Fragment key={step}>
          <div className="flex flex-col items-center">
            <div 
              className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                currentStep === step
                  ? 'bg-primary text-white'
                  : currentStep > step
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-200 text-gray-700'
              }`}
            >
              {currentStep > step ? <FaCheck /> : step}
            </div>
            <span className="text-xs mt-1 text-gray-500">
              {step === 1 && t('booking.service')}
              {step === 2 && t('booking.dateTime')}
              {step === 3 && t('booking.details')}
            </span>
          </div>
          {step < 3 && (
            <div className="flex-1 flex items-center mx-2">
              <div 
                className={`h-1 w-full ${
                  currentStep > step ? 'bg-green-500' : 'bg-gray-200'
                }`}
              />
            </div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
  
  return (
    <div className={`max-w-3xl mx-auto ${className}`}>
      {!bookingComplete && renderProgress()}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 md:p-8">
        {renderStep()}
      </div>
    </div>
  );
}
