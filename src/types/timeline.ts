export interface TimelineItem {
  id: string;
  title: string;
  title_tr?: string;
  subtitle: string;
  subtitle_tr?: string;
  date: string;
  description: string;
  description_tr?: string;
  type: 'experience' | 'education' | 'achievement';
  tags?: string[];
  location?: string;
}

export interface Education {
  institution: string;
  institution_tr?: string;
  degree: string;
  degree_tr?: string;
  field: string;
  field_tr?: string;
  startDate: string;
  endDate: string;
  gpa?: string;
  highlights?: string[];
  highlights_tr?: string[];
}
