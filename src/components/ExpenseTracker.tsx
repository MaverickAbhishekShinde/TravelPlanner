import React, { useState } from 'react';
import { useTravelStore } from '../store/travelStore';
import { IndianRupee, PlusCircle } from 'lucide-react';

export function ExpenseTracker() {
  const { currentPlan, updatePlan } = useTravelStore();
  const [newExpense, setNewExpense] = useState({
    category: '',
    amount: '',
    description: '',
  });

  if (!currentPlan) {
    return null;
  }

  const totalExpenses = currentPlan.expenses.reduce(
    (sum, expense) => sum + expense.amount,
    0
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newExpense.category || !newExpense.amount || !newExpense.description) {
      return;
    }

    const expense = {
      id: Date.now().toString(),
      category: newExpense.category,
      amount: parseFloat(newExpense.amount),
      description: newExpense.description,
      date: new Date().toISOString(),
    };

    updatePlan({
      expenses: [...currentPlan.expenses, expense],
    });

    setNewExpense({
      category: '',
      amount: '',
      description: '',
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Expense Tracker</h2>
        <div className="flex items-center gap-2">
          <IndianRupee className="w-5 h-5 text-green-600" />
          <span className="font-semibold text-lg">
            Total: ₹{totalExpenses.toFixed(2)}
          </span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <select
            value={newExpense.category}
            onChange={(e) =>
              setNewExpense({ ...newExpense, category: e.target.value })
            }
            className="p-2 border rounded-md"
            required
          >
            <option value="">Select Category</option>
            <option value="transportation">Transportation</option>
            <option value="accommodation">Accommodation</option>
            <option value="food">Food & Drinks</option>
            <option value="activities">Activities</option>
            <option value="shopping">Shopping</option>
            <option value="other">Other</option>
          </select>

          <input
            type="number"
            value={newExpense.amount}
            onChange={(e) =>
              setNewExpense({ ...newExpense, amount: e.target.value })
            }
            placeholder="Amount"
            className="p-2 border rounded-md"
            min="0"
            step="0.01"
            required
          />

          <div className="flex gap-2">
            <input
              type="text"
              value={newExpense.description}
              onChange={(e) =>
                setNewExpense({ ...newExpense, description: e.target.value })
              }
              placeholder="Description"
              className="flex-1 p-2 border rounded-md"
              required
            />
            <button
              type="submit"
              className="bg-indigo-600 text-white p-2 rounded-md hover:bg-indigo-700 transition-colors"
            >
              <PlusCircle className="w-5 h-5" />
            </button>
          </div>
        </div>
      </form>

      <div className="space-y-3">
        {currentPlan.expenses.map((expense) => (
          <div
            key={expense.id}
            className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
          >
            <div>
              <p className="font-medium capitalize">{expense.category}</p>
              <p className="text-sm text-gray-600">{expense.description}</p>
            </div>
            <div className="text-right">
              <p className="font-semibold">₹{expense.amount.toFixed(2)}</p>
              <p className="text-xs text-gray-500">
                {new Date(expense.date).toLocaleDateString()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}