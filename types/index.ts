export interface DateEntry {
  id: string;
  title: string;
  date_at: string;
  location: string | null;
  status: string; // 'past' | 'future'
  created_at?: string; // Optional, useful for sorting by creation time
}