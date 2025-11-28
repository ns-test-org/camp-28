'use client';

import { useState } from 'react';

interface Goal {
  id: number;
  text: string;
  completed: boolean;
  type: 'daily' | 'long-term';
  createdAt: Date;
}

export default function PersonalGoalsApp() {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [newGoal, setNewGoal] = useState('');
  const [goalType, setGoalType] = useState<'daily' | 'long-term'>('daily');
  const [filter, setFilter] = useState<'all' | 'daily' | 'long-term' | 'completed'>('all');

  const addGoal = () => {
    if (newGoal.trim()) {
      const goal: Goal = {
        id: Date.now(),
        text: newGoal.trim(),
        completed: false,
        type: goalType,
        createdAt: new Date()
      };
      setGoals([goal, ...goals]);
      setNewGoal('');
    }
  };

  const toggleGoal = (id: number) => {
    setGoals(goals.map(goal => 
      goal.id === id ? { ...goal, completed: !goal.completed } : goal
    ));
  };

  const deleteGoal = (id: number) => {
    setGoals(goals.filter(goal => goal.id !== id));
  };

  const filteredGoals = goals.filter(goal => {
    if (filter === 'all') return true;
    if (filter === 'completed') return goal.completed;
    return goal.type === filter;
  });

  const completedCount = goals.filter(goal => goal.completed).length;
  const dailyCount = goals.filter(goal => goal.type === 'daily' && !goal.completed).length;
  const longTermCount = goals.filter(goal => goal.type === 'long-term' && !goal.completed).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-2">
            Personal Goals
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Track your daily tasks and long-term aspirations
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-2">
              Daily Tasks
            </h3>
            <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">
              {dailyCount}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">Active tasks</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-2">
              Long-term Goals
            </h3>
            <p className="text-3xl font-bold text-purple-600 dark:text-purple-400">
              {longTermCount}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">In progress</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-2">
              Completed
            </h3>
            <p className="text-3xl font-bold text-green-600 dark:text-green-400">
              {completedCount}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">Total achieved</p>
          </div>
        </div>

        {/* Add Goal Form */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md mb-8">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
            Add New Goal
          </h2>
          <div className="flex flex-col sm:flex-row gap-4">
            <input
              type="text"
              value={newGoal}
              onChange={(e) => setNewGoal(e.target.value)}
              placeholder="What do you want to achieve?"
              className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              onKeyPress={(e) => e.key === 'Enter' && addGoal()}
            />
            <select
              value={goalType}
              onChange={(e) => setGoalType(e.target.value as 'daily' | 'long-term')}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            >
              <option value="daily">Daily Task</option>
              <option value="long-term">Long-term Goal</option>
            </select>
            <button
              onClick={addGoal}
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
            >
              Add Goal
            </button>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap gap-2 mb-6">
          {[
            { key: 'all', label: 'All Goals' },
            { key: 'daily', label: 'Daily Tasks' },
            { key: 'long-term', label: 'Long-term' },
            { key: 'completed', label: 'Completed' }
          ].map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setFilter(key as any)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filter === key
                  ? 'bg-blue-600 text-white'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Goals List */}
        <div className="space-y-3">
          {filteredGoals.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 dark:text-gray-400 text-lg">
                {filter === 'all' 
                  ? "No goals yet. Add your first goal above!" 
                  : `No ${filter === 'completed' ? 'completed goals' : filter + ' goals'} yet.`
                }
              </p>
            </div>
          ) : (
            filteredGoals.map((goal) => (
              <div
                key={goal.id}
                className={`bg-white dark:bg-gray-800 rounded-lg p-4 shadow-md transition-all ${
                  goal.completed ? 'opacity-75' : ''
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3 flex-1">
                    <input
                      type="checkbox"
                      checked={goal.completed}
                      onChange={() => toggleGoal(goal.id)}
                      className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
                    />
                    <div className="flex-1">
                      <p className={`text-gray-800 dark:text-white ${
                        goal.completed ? 'line-through' : ''
                      }`}>
                        {goal.text}
                      </p>
                      <div className="flex items-center space-x-2 mt-1">
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          goal.type === 'daily' 
                            ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                            : 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
                        }`}>
                          {goal.type === 'daily' ? 'Daily Task' : 'Long-term Goal'}
                        </span>
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {goal.createdAt.toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => deleteGoal(goal.id)}
                    className="ml-4 text-red-500 hover:text-red-700 transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

