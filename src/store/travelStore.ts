import { create } from 'zustand';
import { TravelPlan, ChatMessage } from '../types';

interface TravelStore {
  currentPlan: TravelPlan | null;
  chatHistory: ChatMessage[];
  setCurrentPlan: (plan: TravelPlan) => void;
  addChatMessage: (message: ChatMessage) => void;
  updatePlan: (updates: Partial<TravelPlan>) => void;
}

export const useTravelStore = create<TravelStore>((set) => ({
  currentPlan: null,
  chatHistory: [],
  setCurrentPlan: (plan) => set({ currentPlan: plan }),
  addChatMessage: (message) =>
    set((state) => ({
      chatHistory: [...state.chatHistory, message],
    })),
  updatePlan: (updates) =>
    set((state) => ({
      currentPlan: state.currentPlan
        ? { ...state.currentPlan, ...updates }
        : null,
    })),
}));