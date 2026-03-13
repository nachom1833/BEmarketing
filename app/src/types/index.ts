/**
 * Type Definitions for BE Marketing
 */

// Method Step Type
export interface MethodStep {
  number: string;
  title: string;
  description: string;
  image: string;
}

// Testimonial Type
export interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  content: string;
  avatar: string;
  rating: number;
}

// Booking Types
export interface BookingSlot {
  id: string;
  date: string;
  time: string;
  isBooked: boolean;
}

export interface BookingFormData {
  name: string;
  email: string;
  phone?: string;
  message?: string;
  date: Date | null;
  time: string | null;
}

// Navigation Link Type
export interface NavLink {
  label: string;
  href: string;
}

// Social Link Type
export interface SocialLink {
  label: string;
  href: string;
  icon: string;
}

// Language Type
export type Language = 'es' | 'en';

// Mouse Position for WebGL
export interface MousePosition {
  x: number;
  y: number;
}

// Shader Uniforms
export interface ShaderUniforms {
  uTime: number;
  uMouse: [number, number];
  uResolution: [number, number];
  uScrollProgress: number;
}
