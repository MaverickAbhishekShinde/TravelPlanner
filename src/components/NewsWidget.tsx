import React, { useEffect, useState } from 'react';
import { useTravelStore } from '../store/travelStore';
import { Newspaper } from 'lucide-react';
import { getLocationNews } from '../services/aiService';

export function NewsWidget() {
  const { currentPlan } = useTravelStore();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (currentPlan?.destination) {
      setLoading(true);
      getLocationNews(currentPlan.destination)
        .catch(console.error)
        .finally(() => setLoading(false));
    }
  }, [currentPlan?.destination]);

  if (!currentPlan) {
    return null;
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center gap-2 mb-4">
        <Newspaper className="w-6 h-6 text-indigo-600" />
        <h2 className="text-xl font-semibold">Local News</h2>
      </div>

      {loading ? (
        <div className="animate-pulse space-y-3">
          <div className="h-20 bg-gray-200 rounded"></div>
          <div className="h-20 bg-gray-200 rounded"></div>
        </div>
      ) : currentPlan.news.length > 0 ? (
        <div className="space-y-4">
          {currentPlan.news.map((item) => (
            <div key={item.id} className="p-3 bg-gray-50 rounded-lg">
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block hover:text-indigo-600 transition-colors"
              >
                <h3 className="font-medium mb-1">{item.title}</h3>
                <p className="text-sm text-gray-600 mb-2">
                  {item.description}
                </p>
                <p className="text-xs text-gray-500">
                  {new Date(item.publishedAt).toLocaleDateString()}
                </p>
              </a>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-center py-4">
          News updates will appear here once available
        </p>
      )}
    </div>
  );
}