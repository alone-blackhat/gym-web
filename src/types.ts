export interface Equipment {
  id: string;
  name: string;
  category: "Cardio" | "Strength" | "Free Weights" | "Functional Training";
  description: string;
  specs: string;
  imageUrl: string;
  stats: { label: string; value: string };
}

export interface Program {
  id: string;
  title: string;
  description: string;
  duration: string;
  intensity: "High" | "Medium" | "Extreme";
  benefits: string[];
}

export interface Trainer {
  id: string;
  name: string;
  role: string;
  experience: string;
  bio: string;
  specialties: string[];
  certifications: string[];
  imageUrl: string;
}

export interface MembershipPlan {
  id: string;
  name: string;
  monthlyPrice: number;
  yearlyPrice: number;
  features: string[];
  tag: string;
  popular?: boolean;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  achievement: string;
  comment: string;
  rating: number;
  imageUrl: string;
}

export interface ApplicationInput {
  name: string;
  phone: string;
  email: string;
  goal: string;
  packageType: string;
}
