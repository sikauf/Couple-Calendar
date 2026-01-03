export interface DateEntry {
  id: string;
  title: string;
  date_at: string;
  location: string | null;
  status: string; // 'past' | 'future'
  user_id: string;
  created_at?: string; // Optional, useful for sorting by creation time
}