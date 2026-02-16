/**
 * Supabase Client Configuration
 * 
 * Handles connection to Supabase for booking management.
 * In production, these values should come from environment variables.
 */

import { createClient } from '@supabase/supabase-js';
import type { BookingSlot, BookingFormData } from '@/types';

// NOTE: In production, replace with actual Supabase credentials
// These are placeholder values - the user needs to set up their own Supabase project
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || 'https://your-project.supabase.co';
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || 'your-anon-key';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

/**
 * Fetch booked slots for a specific date range
 */
export async function fetchBookedSlots(startDate: Date, endDate: Date): Promise<BookingSlot[]> {
  try {
    const { data, error } = await supabase
      .from('bookings')
      .select('id, date, time, is_booked')
      .gte('date', startDate.toISOString().split('T')[0])
      .lte('date', endDate.toISOString().split('T')[0])
      .eq('is_booked', true);

    if (error) {
      console.error('Error fetching booked slots:', error);
      return [];
    }

    return (data || []).map(slot => ({
      id: slot.id,
      date: slot.date,
      time: slot.time,
      isBooked: slot.is_booked
    }));
  } catch (error) {
    console.error('Error in fetchBookedSlots:', error);
    return [];
  }
}

/**
 * Create a new booking
 */
export async function createBooking(formData: BookingFormData): Promise<{ success: boolean; error?: string }> {
  try {
    if (!formData.date || !formData.time) {
      return { success: false, error: 'Date and time are required' };
    }

    // Check if slot is already booked
    const { data: existingBooking, error: checkError } = await supabase
      .from('bookings')
      .select('id')
      .eq('date', formData.date.toISOString().split('T')[0])
      .eq('time', formData.time)
      .eq('is_booked', true)
      .single();

    if (checkError && checkError.code !== 'PGRST116') {
      console.error('Error checking existing booking:', checkError);
      return { success: false, error: 'Error checking availability' };
    }

    if (existingBooking) {
      return { success: false, error: 'This slot is already booked' };
    }

    // Insert the booking
    const { error: insertError } = await supabase
      .from('bookings')
      .insert({
        name: formData.name,
        email: formData.email,
        phone: formData.phone || null,
        message: formData.message || null,
        date: formData.date.toISOString().split('T')[0],
        time: formData.time,
        is_booked: true,
        created_at: new Date().toISOString()
      });

    if (insertError) {
      console.error('Error creating booking:', insertError);
      return { success: false, error: 'Error creating booking' };
    }

    // Trigger Google Calendar sync (via Edge Function)
    await syncWithGoogleCalendar({
      name: formData.name,
      email: formData.email,
      date: formData.date,
      time: formData.time,
      message: formData.message
    });

    return { success: true };
  } catch (error) {
    console.error('Error in createBooking:', error);
    return { success: false, error: 'Unexpected error occurred' };
  }
}

/**
 * Sync booking with Google Calendar via Edge Function
 */
async function syncWithGoogleCalendar(bookingData: {
  name: string;
  email: string;
  date: Date;
  time: string;
  message?: string;
}): Promise<void> {
  try {
    const { error } = await supabase.functions.invoke('sync-google-calendar', {
      body: bookingData
    });

    if (error) {
      console.error('Error syncing with Google Calendar:', error);
    }
  } catch (error) {
    console.error('Error invoking calendar sync:', error);
  }
}

/**
 * Get available time slots for a specific date
 */
export async function getAvailableTimeSlots(date: Date): Promise<string[]> {
  const allSlots = [
    '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00', '17:30'
  ];

  try {
    const { data, error } = await supabase
      .from('bookings')
      .select('time')
      .eq('date', date.toISOString().split('T')[0])
      .eq('is_booked', true);

    if (error) {
      console.error('Error fetching booked times:', error);
      return allSlots;
    }

    const bookedTimes = (data || []).map(b => b.time);
    return allSlots.filter(slot => !bookedTimes.includes(slot));
  } catch (error) {
    console.error('Error in getAvailableTimeSlots:', error);
    return allSlots;
  }
}

export default supabase;
