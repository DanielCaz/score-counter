export interface HistoryItem {
  id: number;
  name: string;
  points: {
    previous: number;
    current: number;
  };
  color: string;
}
