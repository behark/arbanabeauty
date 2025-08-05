import React, { useState, useEffect } from 'react';

interface Service {
  id: string;
  name: string;
  duration: number; // in minutes
  price: number;
  category: string;
  description?: string;
  requiresConsultation?: boolean;
}

interface Staff {
  id: string;
  name: string;
  specialties: string[];
  avatar?: string;
  workingHours: {
    [key: string]: { start: string; end: string; available: boolean };
  };
}

interface Appointment {
  id: string;
  title: string;
  start: Date;
  end: Date;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  serviceId: string;
  serviceName: string;
  staffId: string;
  staffName: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  notes?: string;
  price: number;
  duration: number;
}

interface BookingCalendarProps {
  services: Service[];
  staff: Staff[];
  appointments: Appointment[];
  onBookAppointment: (appointment: Omit<Appointment, 'id'>) => Promise<void>;
  onUpdateAppointment: (id: string, updates: Partial<Appointment>) => Promise<void>;
  onDeleteAppointment: (id: string) => Promise<void>;
  isAdmin?: boolean;
}

const BookingCalendar: React.FC<BookingCalendarProps> = ({
  services,
  staff,
  appointments,
  onBookAppointment,
  onUpdateAppointment,
  onDeleteAppointment,
  isAdmin = false
}) => {
  const [currentView, setCurrentView] = useState<'week' | 'day'>('week');
  const [currentDate, setCurrentDate] = useState(new Date());
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState<{ start: Date; end: Date } | null>(null);
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  const [bookingForm, setBookingForm] = useState({
    clientName: '',
    clientEmail: '',
    clientPhone: '',
    serviceId: '',
    staffId: '',
    notes: ''
  });
  const [loading, setLoading] = useState(false);

  // Utility functions for date manipulation
  const formatDate = (date: Date): string => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (date: Date): string => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    });
  };

  const addMinutes = (date: Date, minutes: number): Date => {
    return new Date(date.getTime() + minutes * 60000);
  };

  const isSameDay = (date1: Date, date2: Date): boolean => {
    return date1.toDateString() === date2.toDateString();
  };

  const getDayOfWeek = (date: Date): string => {
    const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    return days[date.getDay()];
  };

  // Filter services by category for better organization
  const serviceCategories = services.reduce((acc, service) => {
    if (!acc[service.category]) {
      acc[service.category] = [];
    }
    acc[service.category].push(service);
    return acc;
  }, {} as Record<string, Service[]>);

  // Handle slot selection for new appointment
  const handleSelectSlot = (slotInfo: { start: Date; end: Date }) => {
    if (!isAdmin) {
      setSelectedSlot(slotInfo);
      setShowBookingModal(true);
      setSelectedAppointment(null);
      resetBookingForm();
    }
  };

  // Handle existing appointment selection
  const handleSelectEvent = (event: Appointment) => {
    setSelectedAppointment(event);
    setShowBookingModal(true);
    setSelectedSlot(null);
    setBookingForm({
      clientName: event.clientName,
      clientEmail: event.clientEmail,
      clientPhone: event.clientPhone,
      serviceId: event.serviceId,
      staffId: event.staffId,
      notes: event.notes || ''
    });
  };

  const resetBookingForm = () => {
    setBookingForm({
      clientName: '',
      clientEmail: '',
      clientPhone: '',
      serviceId: '',
      staffId: '',
      notes: ''
    });
  };

  // Get available staff for selected service
  const getAvailableStaff = (serviceId: string) => {
    const service = services.find(s => s.id === serviceId);
    if (!service) return staff;
    
    return staff.filter(member => 
      member.specialties.some(specialty => 
        service.category.toLowerCase().includes(specialty.toLowerCase()) ||
        service.name.toLowerCase().includes(specialty.toLowerCase())
      )
    );
  };

  // Check if a time slot is available
  const isSlotAvailable = (start: Date, end: Date, staffId: string, excludeId?: string) => {
    const staffMember = staff.find(s => s.id === staffId);
    if (!staffMember) return false;

    const dayOfWeek = getDayOfWeek(start);
    const workingHours = staffMember.workingHours[dayOfWeek];
    
    if (!workingHours?.available) return false;

    const startTime = formatTime(start);
    const endTime = formatTime(end);
    
    if (startTime < workingHours.start || endTime > workingHours.end) {
      return false;
    }

    // Check for conflicts with existing appointments
    const conflicts = appointments.filter(apt => 
      apt.staffId === staffId &&
      apt.id !== excludeId &&
      apt.status !== 'cancelled' &&
      start < apt.end &&
      end > apt.start
    );

    return conflicts.length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const selectedService = services.find(s => s.id === bookingForm.serviceId);
      if (!selectedService) throw new Error('Service not found');

      if (selectedAppointment) {
        // Update existing appointment
        await onUpdateAppointment(selectedAppointment.id, {
          clientName: bookingForm.clientName,
          clientEmail: bookingForm.clientEmail,
          clientPhone: bookingForm.clientPhone,
          serviceId: bookingForm.serviceId,
          serviceName: selectedService.name,
          staffId: bookingForm.staffId,
          staffName: staff.find(s => s.id === bookingForm.staffId)?.name || '',
          notes: bookingForm.notes,
          price: selectedService.price
        });
      } else if (selectedSlot) {
        // Create new appointment
        const startTime = selectedSlot.start;
        const endTime = addMinutes(startTime, selectedService.duration);

        if (!isSlotAvailable(startTime, endTime, bookingForm.staffId)) {
          alert('This time slot is not available. Please choose another time.');
          return;
        }

        const newAppointment: Omit<Appointment, 'id'> = {
          title: `${selectedService.name} - ${bookingForm.clientName}`,
          start: startTime,
          end: endTime,
          clientName: bookingForm.clientName,
          clientEmail: bookingForm.clientEmail,
          clientPhone: bookingForm.clientPhone,
          serviceId: bookingForm.serviceId,
          serviceName: selectedService.name,
          staffId: bookingForm.staffId,
          staffName: staff.find(s => s.id === bookingForm.staffId)?.name || '',
          status: 'pending',
          notes: bookingForm.notes,
          price: selectedService.price,
          duration: selectedService.duration
        };

        await onBookAppointment(newAppointment);
      }

      setShowBookingModal(false);
      resetBookingForm();
    } catch (error) {
      console.error('Error saving appointment:', error);
      alert('Failed to save appointment. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Handle appointment deletion
  const handleDelete = async () => {
    if (!selectedAppointment) return;
    
    if (window.confirm('Are you sure you want to delete this appointment?')) {
      try {
        await onDeleteAppointment(selectedAppointment.id);
        setShowBookingModal(false);
      } catch (error) {
        console.error('Error deleting appointment:', error);
        alert('Failed to delete appointment. Please try again.');
      }
    }
  };

  // Generate time slots for a day
  const generateTimeSlots = (date: Date) => {
    const slots = [];
    const startHour = 9; // 9 AM
    const endHour = 19; // 7 PM
    const slotDuration = 30; // 30 minutes

    for (let hour = startHour; hour < endHour; hour++) {
      for (let minute = 0; minute < 60; minute += slotDuration) {
        const slotStart = new Date(date);
        slotStart.setHours(hour, minute, 0, 0);
        const slotEnd = addMinutes(slotStart, slotDuration);
        
        slots.push({ start: slotStart, end: slotEnd });
      }
    }
    return slots;
  };

  // Get appointments for a specific day
  const getAppointmentsForDay = (date: Date) => {
    return appointments.filter(apt => isSameDay(apt.start, date));
  };

  // Get week days starting from Monday
  const getWeekDays = (date: Date) => {
    const days = [];
    const startOfWeek = new Date(date);
    const dayOfWeek = startOfWeek.getDay();
    const mondayOffset = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
    startOfWeek.setDate(startOfWeek.getDate() + mondayOffset);

    for (let i = 0; i < 7; i++) {
      const day = new Date(startOfWeek);
      day.setDate(startOfWeek.getDate() + i);
      days.push(day);
    }
    return days;
  };

  const weekDays = getWeekDays(currentDate);
  const timeSlots = generateTimeSlots(currentDate);

  return (
    <div className="h-screen bg-gray-50">
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold text-gray-900">
            {isAdmin ? 'Appointment Management' : 'Book Your Appointment'}
          </h1>
          <div className="flex space-x-2">
            <select
              value={currentView}
              onChange={(e) => setCurrentView(e.target.value as 'week' | 'day')}
              className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
            >
              <option value="week">Week</option>
              <option value="day">Day</option>
            </select>
            <button
              onClick={() => {
                const newDate = new Date(currentDate);
                newDate.setDate(currentDate.getDate() - (currentView === 'week' ? 7 : 1));
                setCurrentDate(newDate);
              }}
              className="px-3 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
            >
              ←
            </button>
            <button
              onClick={() => setCurrentDate(new Date())}
              className="px-3 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Today
            </button>
            <button
              onClick={() => {
                const newDate = new Date(currentDate);
                newDate.setDate(currentDate.getDate() + (currentView === 'week' ? 7 : 1));
                setCurrentDate(newDate);
              }}
              className="px-3 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
            >
              →
            </button>
          </div>
        </div>

        {/* Calendar Grid */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {currentView === 'week' ? (
            <div className="grid grid-cols-8 min-h-96">
              {/* Time column */}
              <div className="border-r border-gray-200">
                <div className="h-12 border-b border-gray-200 bg-gray-50 flex items-center justify-center font-medium text-gray-900">
                  Time
                </div>
                {timeSlots.slice(0, 20).map((slot, index) => (
                  <div key={index} className="h-12 border-b border-gray-100 flex items-center justify-center text-sm text-gray-600">
                    {formatTime(slot.start)}
                  </div>
                ))}
              </div>

              {/* Day columns */}
              {weekDays.map((day, dayIndex) => (
                <div key={dayIndex} className="border-r border-gray-200 last:border-r-0">
                  <div className="h-12 border-b border-gray-200 bg-gray-50 flex items-center justify-center font-medium text-gray-900">
                    <div className="text-center">
                      <div className="text-xs text-gray-600">
                        {day.toLocaleDateString('en-US', { weekday: 'short' })}
                      </div>
                      <div className={`text-sm ${isSameDay(day, new Date()) ? 'text-pink-600 font-bold' : ''}`}>
                        {day.getDate()}
                      </div>
                    </div>
                  </div>
                  <div className="relative">
                    {timeSlots.slice(0, 20).map((slot, timeIndex) => {
                      const slotStart = new Date(day);
                      slotStart.setHours(slot.start.getHours(), slot.start.getMinutes());
                      const slotEnd = addMinutes(slotStart, 30);
                      
                      const dayAppointments = getAppointmentsForDay(day);
                      const slotAppointment = dayAppointments.find(apt => 
                        apt.start <= slotStart && apt.end > slotStart
                      );

                      return (
                        <div
                          key={timeIndex}
                          className={`h-12 border-b border-gray-100 cursor-pointer hover:bg-pink-50 ${
                            slotAppointment ? 'bg-blue-100' : ''
                          }`}
                          onClick={() => {
                            if (slotAppointment) {
                              handleSelectEvent(slotAppointment);
                            } else {
                              handleSelectSlot({ start: slotStart, end: slotEnd });
                            }
                          }}
                        >
                          {slotAppointment && (
                            <div className={`p-1 m-1 rounded text-xs ${
                              slotAppointment.status === 'confirmed' ? 'bg-green-500 text-white' :
                              slotAppointment.status === 'pending' ? 'bg-yellow-500 text-white' :
                              slotAppointment.status === 'completed' ? 'bg-blue-500 text-white' :
                              'bg-red-500 text-white'
                            }`}>
                              <div className="font-semibold">{slotAppointment.serviceName}</div>
                              <div>{slotAppointment.clientName}</div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            // Day view
            <div>
              <div className="p-4 border-b border-gray-200 bg-gray-50">
                <h2 className="text-lg font-semibold text-gray-900">
                  {formatDate(currentDate)}
                </h2>
              </div>
              <div className="p-4 space-y-2">
                {timeSlots.map((slot, index) => {
                  const slotStart = new Date(currentDate);
                  slotStart.setHours(slot.start.getHours(), slot.start.getMinutes());
                  const slotEnd = addMinutes(slotStart, 30);
                  
                  const dayAppointments = getAppointmentsForDay(currentDate);
                  const slotAppointment = dayAppointments.find(apt => 
                    apt.start <= slotStart && apt.end > slotStart
                  );

                  return (
                    <div
                      key={index}
                      className={`flex items-center p-3 border border-gray-200 rounded-md cursor-pointer hover:bg-pink-50 ${
                        slotAppointment ? 'bg-blue-50' : ''
                      }`}
                      onClick={() => {
                        if (slotAppointment) {
                          handleSelectEvent(slotAppointment);
                        } else {
                          handleSelectSlot({ start: slotStart, end: slotEnd });
                        }
                      }}
                    >
                      <div className="w-20 text-sm text-gray-600">
                        {formatTime(slotStart)}
                      </div>
                      <div className="flex-1">
                        {slotAppointment ? (
                          <div className={`p-2 rounded ${
                            slotAppointment.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                            slotAppointment.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                            slotAppointment.status === 'completed' ? 'bg-blue-100 text-blue-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            <div className="font-semibold">{slotAppointment.serviceName}</div>
                            <div>{slotAppointment.clientName}</div>
                            <div className="text-sm">{slotAppointment.staffName}</div>
                          </div>
                        ) : (
                          <div className="text-gray-400">Available</div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Booking Modal */}
        {showBookingModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-md w-full max-h-screen overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold text-gray-900">
                    {selectedAppointment ? 'Edit Appointment' : 'Book Appointment'}
                  </h2>
                  <button
                    onClick={() => setShowBookingModal(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                {selectedSlot && (
                  <div className="mb-4 p-3 bg-pink-50 border border-pink-200 rounded-md">
                    <p className="text-sm text-pink-800">
                      <span className="font-medium">Selected Time:</span> {' '}
                      {formatDate(selectedSlot.start)} at {formatTime(selectedSlot.start)}
                    </p>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Client Information */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      value={bookingForm.clientName}
                      onChange={(e) => setBookingForm({ ...bookingForm, clientName: e.target.value })}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email *
                    </label>
                    <input
                      type="email"
                      value={bookingForm.clientEmail}
                      onChange={(e) => setBookingForm({ ...bookingForm, clientEmail: e.target.value })}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      value={bookingForm.clientPhone}
                      onChange={(e) => setBookingForm({ ...bookingForm, clientPhone: e.target.value })}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
                      required
                    />
                  </div>

                  {/* Service Selection */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Service *
                    </label>
                    <select
                      value={bookingForm.serviceId}
                      onChange={(e) => setBookingForm({ ...bookingForm, serviceId: e.target.value })}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
                      required
                    >
                      <option value="">Select a service</option>
                      {Object.entries(serviceCategories).map(([category, categoryServices]) => (
                        <optgroup key={category} label={category}>
                          {categoryServices.map(service => (
                            <option key={service.id} value={service.id}>
                              {service.name} - €{service.price} ({service.duration}min)
                            </option>
                          ))}
                        </optgroup>
                      ))}
                    </select>
                  </div>

                  {/* Staff Selection */}
                  {bookingForm.serviceId && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Preferred Staff *
                      </label>
                      <select
                        value={bookingForm.staffId}
                        onChange={(e) => setBookingForm({ ...bookingForm, staffId: e.target.value })}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
                        required
                      >
                        <option value="">Select staff member</option>
                        {getAvailableStaff(bookingForm.serviceId).map(member => (
                          <option key={member.id} value={member.id}>
                            {member.name} - {member.specialties.join(', ')}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}

                  {/* Notes */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Notes (Optional)
                    </label>
                    <textarea
                      value={bookingForm.notes}
                      onChange={(e) => setBookingForm({ ...bookingForm, notes: e.target.value })}
                      rows={3}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
                      placeholder="Any special requests or notes..."
                    />
                  </div>

                  {/* Service Details */}
                  {bookingForm.serviceId && (
                    <div className="p-3 bg-gray-50 border border-gray-200 rounded-md">
                      {(() => {
                        const service = services.find(s => s.id === bookingForm.serviceId);
                        return service ? (
                          <div>
                            <h4 className="font-medium text-gray-900">{service.name}</h4>
                            <p className="text-sm text-gray-600">{service.description}</p>
                            <div className="flex justify-between mt-2 text-sm">
                              <span>Duration: {service.duration} minutes</span>
                              <span className="font-medium">Price: €{service.price}</span>
                            </div>
                          </div>
                        ) : null;
                      })()}
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex space-x-3 pt-4">
                    {selectedAppointment && isAdmin && (
                      <button
                        type="button"
                        onClick={handleDelete}
                        className="flex-1 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                      >
                        Delete
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={() => setShowBookingModal(false)}
                      className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={loading}
                      className="flex-1 px-4 py-2 bg-pink-600 text-white rounded-md hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-pink-500 disabled:bg-gray-400"
                    >
                      {loading ? 'Saving...' : selectedAppointment ? 'Update' : 'Book'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingCalendar;
