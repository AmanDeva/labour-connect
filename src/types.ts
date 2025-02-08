export interface Labour {
  id?: string;
  name: string;
  contact: string;
  skills: string[];
  availability: WeeklyAvailability;
  charges: number;
  location: string;
  imageUrl: string;
  userId: string;
}

export interface WeeklyAvailability {
  monday: boolean;
  tuesday: boolean;
  wednesday: boolean;
  thursday: boolean;
  friday: boolean;
  saturday: boolean;
  sunday: boolean;
}