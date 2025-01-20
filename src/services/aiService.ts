import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

export async function generateTravelPlan(prompt: string) {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Error generating travel plan:', error);
    throw error;
  }
}

export async function getWeatherForecast(location: string, dates: string[]) {
  const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
  const url = `http://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${encodeURIComponent(location)}&days=7&aqi=no`;
  
  try {
    const response = await fetch(url);
    const data = await response.json();
    
    if (data.error) {
      throw new Error(data.error.message);
    }

    // return data.forecast.forecastday.map((day: any) => ({
    //   date: day.date,
    //   temperature: day.day.avgtemp_c,
    //   condition: day.day.condition.text,
    //   icon: day.day.condition.icon
    // }));
  } catch (error) {
    console.error('Error fetching weather:', error);
    throw error;
  }
}

export async function getLocationNews(location: string) {
  const API_KEY = import.meta.env.VITE_NEWS_API_KEY;
  const url = `https://newsapi.org/v2/everything?q=${encodeURIComponent(
    location + ' tourism OR travel OR culture'
  )}&apiKey=${API_KEY}&language=en&sortBy=publishedAt&pageSize=5`;
  
  try {
    const response = await fetch(url);
    const data = await response.json();
    
    if (data.status === 'error') {
      throw new Error(data.message);
    }

    return data.articles.map((article: any) => ({
      id: article.url,
      title: article.title,
      description: article.description,
      url: article.url,
      publishedAt: article.publishedAt
    }));
  } catch (error) {
    console.error('Error fetching news:', error);
    throw error;
  }
}