export interface Project {
  slug: string;
  title: string;
  title_tr?: string;
  date: string;
  summary: string;
  summary_tr?: string;
  cover: string;
  tags: string[];
  weight: number;
  content?: string;
  content_tr?: string;
  isPatent?: boolean;
  patentNumber?: string;
  publishDate?: string;
  abstract?: string;
  abstract_tr?: string;
}

export interface ProjectMetadata {
  title: string;
  title_tr?: string;
  date: string;
  summary: string;
  summary_tr?: string;
  cover: string;
  tags: string[];
  weight: number;
}

export type ProjectDomain = 'uav' | 'qa' | 'ai' | 'web' | 'game' | 'medical' | 'innovation';
