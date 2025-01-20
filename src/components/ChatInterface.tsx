import React, { useState } from 'react';
import { useTravelStore } from '../store/travelStore';
import { generateTravelPlan } from '../services/aiService';
import { Send, Bot } from 'lucide-react';

export function ChatInterface() {
  const [message, setMessage] = useState('');
  const { chatHistory, addChatMessage, currentPlan } = useTravelStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    const userMessage = message;
    setMessage('');

    // Add user message
    addChatMessage({
      id: Date.now().toString(),
      role: 'user',
      content: userMessage,
      timestamp: new Date().toISOString(),
    });

    try {
      // Create a context-aware prompt
      const contextPrompt = `Based on the current travel plan:
      - From: ${currentPlan?.origin || 'N/A'}
      - To: ${currentPlan?.destination || 'N/A'}
      - Dates: ${currentPlan?.startDate || 'N/A'} to ${currentPlan?.endDate || 'N/A'}
      - Travelers: ${currentPlan?.travelers || 'N/A'}
      
      User question: ${userMessage}
      
      Please provide a detailed response in a clear, organized format using bullet points and headings where appropriate.`;

      const response = await generateTravelPlan(contextPrompt);
      
      // Add AI response
      addChatMessage({
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response,
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      console.error('Error generating response:', error);
      // Add error message to chat
      addChatMessage({
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'I apologize, but I encountered an error while processing your request. Please try again.',
        timestamp: new Date().toISOString(),
      });
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md h-[500px] flex flex-col">
      <div className="p-4 border-b">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <Bot className="w-6 h-6" />
          Chat with AI Travel Assistant
        </h2>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {chatHistory.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${
              msg.role === 'user' ? 'justify-end' : 'justify-start'
            }`}
          >
            <div
              className={`max-w-[80%] p-3 rounded-lg ${
                msg.role === 'user'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-100 text-gray-800'
              }`}
            >
              <div className="prose max-w-none">
                {msg.content.split('\n').map((line, index) => (
                  <p key={index} className="text-sm whitespace-pre-wrap mb-1">
                    {line}
                  </p>
                ))}
              </div>
              <span className="text-xs opacity-75 mt-1 block">
                {new Date(msg.timestamp).toLocaleTimeString()}
              </span>
            </div>
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="p-4 border-t">
        <div className="flex gap-2">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Ask anything about your trip..."
            className="flex-1 p-2 border rounded-md"
          />
          <button
            type="submit"
            className="bg-indigo-600 text-white p-2 rounded-md hover:bg-indigo-700 transition-colors"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </form>
    </div>
  );
}