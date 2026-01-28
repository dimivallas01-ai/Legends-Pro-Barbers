
export interface Service {
  id: string;
  name: string;
  description: string;
  price: string;
  duration: string;
  category: 'Cut' | 'Shave' | 'Treatments';
}

export interface Testimonial {
  id: string;
  author: string;
  rating: number;
  content: string;
  date: string;
}

export interface HairstyleSuggestion {
  name: string;
  description: string;
  maintenanceLevel: 'Low' | 'Medium' | 'High';
  suitableFaceShapes: string[];
}
