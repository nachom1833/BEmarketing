/**
 * Booking Modal - Immersive Booking Hub
 * 
 * Features:
 * - Full-screen glassmorphism modal with blurred background
 * - Custom calendar grid (no native inputs)
 * - Time slots as floating chips
 * - Supabase integration for booking management
 * - Giant "CONECTAR" typography in background
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { useBooking } from '@/contexts/BookingContext';
import { getAvailableTimeSlots } from '@/lib/supabase';
import { X, ChevronLeft, ChevronRight, Check, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

const BookingModal: React.FC = () => {
  const { t } = useLanguage();
  const { isOpen, closeBooking } = useBooking();
  
  // Form state
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [availableSlots, setAvailableSlots] = useState<string[]>([]);
  const [isLoadingSlots, setIsLoadingSlots] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Form fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  
  // Calendar state
  const [currentMonth, setCurrentMonth] = useState(new Date());
  
  const months = t('booking.months') as string[];
  const days = t('booking.days') as string[];
  
  // Generate calendar days
  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDay = firstDay.getDay();
    
    const daysArray: (number | null)[] = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDay; i++) {
      daysArray.push(null);
    }
    
    // Add days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      daysArray.push(i);
    }
    
    return daysArray;
  };
  
  // Check if date is in the past
  const isDateDisabled = (day: number) => {
    const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today;
  };
  
  // Check if date is weekend
  const isWeekend = (day: number) => {
    const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    const dayOfWeek = date.getDay();
    return dayOfWeek === 0 || dayOfWeek === 6;
  };
  
  // Fetch available time slots when date changes
  useEffect(() => {
    if (selectedDate) {
      setIsLoadingSlots(true);
      getAvailableTimeSlots(selectedDate)
        .then(slots => {
          setAvailableSlots(slots);
        })
        .catch(error => {
          console.error('Error fetching slots:', error);
          // Fallback to default slots
          setAvailableSlots([
            '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
            '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00', '17:30'
          ]);
        })
        .finally(() => {
          setIsLoadingSlots(false);
        });
    }
  }, [selectedDate]);
  
  // Handle date selection
  const handleDateSelect = (day: number) => {
    if (isDateDisabled(day) || isWeekend(day)) return;
    
    const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    setSelectedDate(date);
    setSelectedTime(null);
  };
  
  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedDate || !selectedTime) {
      toast.error('Por favor selecciona fecha y hora');
      return;
    }
    
    if (!name.trim() || !email.trim()) {
      toast.error('Nombre y email son obligatorios');
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate booking submission (replace with actual Supabase call)
    setTimeout(() => {
      toast.success(t('booking.success') as string);
      closeBooking();
      // Reset form
      setSelectedDate(null);
      setSelectedTime(null);
      setName('');
      setEmail('');
      setPhone('');
      setMessage('');
      setIsSubmitting(false);
    }, 1500);
  };
  
  // Navigate months
  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };
  
  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };
  
  const calendarDays = getDaysInMonth(currentMonth);
  
  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeBooking();
    };
    
    if (isOpen) {
      window.addEventListener('keydown', handleEscape);
    }
    
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isOpen, closeBooking]);
  
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Backdrop with blur */}
          <motion.div
            className="absolute inset-0 bg-[#1F2937]/80"
            style={{ backdropFilter: 'blur(20px)' }}
            onClick={closeBooking}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
          
          {/* Giant background text */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
            <span 
              className="font-poppins font-black text-[20vw] text-white/[0.02] select-none whitespace-nowrap"
              style={{ filter: 'blur(4px)' }}
            >
              {t('booking.connect')}
            </span>
          </div>
          
          {/* Modal Content */}
          <motion.div
            className="relative z-10 w-full max-w-4xl glass-hud-strong rounded-3xl overflow-hidden"
            initial={{ scale: 0.9, y: 50, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.9, y: 50, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          >
            {/* Close button */}
            <button
              onClick={closeBooking}
              className="absolute top-4 right-4 p-2 text-white/60 hover:text-white transition-colors z-20"
            >
              <X size={24} />
            </button>
            
            {/* Header */}
            <div className="p-8 pb-0">
              <h2 className="font-poppins font-bold text-3xl text-white mb-2">
                {t('booking.title')}
              </h2>
              <p className="font-lato text-[#D1D5DB]">
                {t('booking.subtitle')}
              </p>
            </div>
            
            {/* Content Grid */}
            <div className="p-8 grid md:grid-cols-2 gap-8">
              {/* Left Column - Calendar */}
              <div>
                <h3 className="font-poppins font-semibold text-white mb-4">
                  {t('booking.selectDate')}
                </h3>
                
                {/* Calendar Header */}
                <div className="flex items-center justify-between mb-4">
                  <button
                    onClick={prevMonth}
                    className="p-2 text-white/60 hover:text-white transition-colors"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <span className="font-poppins font-semibold text-white">
                    {months[currentMonth.getMonth()]} {currentMonth.getFullYear()}
                  </span>
                  <button
                    onClick={nextMonth}
                    className="p-2 text-white/60 hover:text-white transition-colors"
                  >
                    <ChevronRight size={20} />
                  </button>
                </div>
                
                {/* Days of week */}
                <div className="grid grid-cols-7 gap-1 mb-2">
                  {days.map(day => (
                    <div key={day} className="text-center text-xs text-white/40 font-lato py-2">
                      {day}
                    </div>
                  ))}
                </div>
                
                {/* Calendar Grid */}
                <div className="grid grid-cols-7 gap-1">
                  {calendarDays.map((day, index) => (
                    <button
                      key={index}
                      onClick={() => day && handleDateSelect(day)}
                      disabled={!day || isDateDisabled(day) || isWeekend(day)}
                      className={`
                        calendar-day
                        ${!day ? 'invisible' : ''}
                        ${day && isDateDisabled(day) ? 'disabled' : ''}
                        ${day && isWeekend(day) ? 'disabled' : ''}
                        ${selectedDate?.getDate() === day && 
                          selectedDate?.getMonth() === currentMonth.getMonth() ? 'selected' : ''}
                      `}
                    >
                      {day}
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Right Column - Time & Form */}
              <div className="space-y-6">
                {/* Time Slots */}
                <div>
                  <h3 className="font-poppins font-semibold text-white mb-4">
                    {t('booking.selectTime')}
                  </h3>
                  
                  {isLoadingSlots ? (
                    <div className="flex items-center justify-center py-8">
                      <Loader2 className="animate-spin text-[#FF6F61]" size={24} />
                    </div>
                  ) : selectedDate ? (
                    <div className="flex flex-wrap gap-2">
                      {availableSlots.map(time => (
                        <button
                          key={time}
                          onClick={() => setSelectedTime(time)}
                          className={`time-chip ${selectedTime === time ? 'selected' : ''}`}
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                  ) : (
                    <p className="text-white/40 font-lato text-sm">
                      Selecciona una fecha primero
                    </p>
                  )}
                </div>
                
                {/* Contact Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <input
                      type="text"
                      placeholder={t('booking.name') as string}
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-4 py-3 input-glow rounded-xl text-white placeholder-white/40 font-lato"
                      required
                    />
                  </div>
                  
                  <div>
                    <input
                      type="email"
                      placeholder={t('booking.email') as string}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-3 input-glow rounded-xl text-white placeholder-white/40 font-lato"
                      required
                    />
                  </div>
                  
                  <div>
                    <input
                      type="tel"
                      placeholder={t('booking.phone') as string}
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-4 py-3 input-glow rounded-xl text-white placeholder-white/40 font-lato"
                    />
                  </div>
                  
                  <div>
                    <textarea
                      placeholder={t('booking.message') as string}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      rows={3}
                      className="w-full px-4 py-3 input-glow rounded-xl text-white placeholder-white/40 font-lato resize-none"
                    />
                  </div>
                  
                  <motion.button
                    type="submit"
                    disabled={isSubmitting || !selectedDate || !selectedTime}
                    className="w-full py-4 bg-[#FF6F61] text-white font-poppins font-bold rounded-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {isSubmitting ? (
                      <Loader2 className="animate-spin" size={20} />
                    ) : (
                      <>
                        {t('booking.submit')}
                        <Check size={18} />
                      </>
                    )}
                  </motion.button>
                </form>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default BookingModal;
