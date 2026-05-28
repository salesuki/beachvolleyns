export type ContactSubmission = {
  id: string;
  name: string;
  email: string;
  message: string;
  read: boolean;
  created_at: string;
};

export type TeamMember = {
  id: string;
  name: string;
  role: string;
  category: 'player' | 'coach';
  description: string | null;
  photo_url: string | null;
  display_order: number;
  active: boolean;
  created_at: string;
};

export type GalleryImage = {
  id: string;
  url: string;
  alt_sr: string | null;
  alt_en: string | null;
  display_order: number;
  created_at: string;
};

export type Tournament = {
  id: string;
  name_sr: string;
  name_en: string | null;
  badge_sr: string | null;
  badge_en: string | null;
  description_sr: string | null;
  description_en: string | null;
  category: 'professional' | 'mens' | 'womens' | 'mix' | null;
  event_date: string | null;
  active: boolean;
  display_order: number;
  created_at: string;
};

type TableDef<Row extends { id: string; created_at: string }, Insert = Omit<Row, 'id' | 'created_at'>> = {
  Row: Row;
  Insert: Insert;
  Update: Partial<Insert>;
  Relationships: [];
};

export type Database = {
  public: {
    Tables: {
      contact_submissions: TableDef<ContactSubmission, Omit<ContactSubmission, 'id' | 'created_at'>>;
      team_members: TableDef<TeamMember, Omit<TeamMember, 'id' | 'created_at'>>;
      gallery_images: TableDef<GalleryImage, Omit<GalleryImage, 'id' | 'created_at'>>;
      tournaments: TableDef<Tournament, Omit<Tournament, 'id' | 'created_at'>>;
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};
