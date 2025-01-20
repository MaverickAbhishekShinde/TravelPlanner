export interface TravelPlan {
  id: string;
  startDate: string;
  endDate: string;
  origin: string;
  destination: string;
  transportMode: string;
  travelers: number;
  activities: Activity[];
  expenses: Expense[];
  weather: WeatherInfo[];
  news: NewsItem[];
}

export interface Activity {
  id: string;
  name: string;
  description: string;
  location: string;
  date: string;
  cost: number;
}

export interface Expense {
  id: string;
  category: string;
  amount: number;
  description: string;
  date: string;
}

export interface WeatherInfo {
  date: string;
  temperature: number;
  condition: string;
  icon: string;
}

export interface NewsItem {
  id: string;
  title: string;
  description: string;
  url: string;
  publishedAt: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}