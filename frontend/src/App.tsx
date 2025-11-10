import React from 'react';
import TodoListPage from './pages/TodoListPage';
import './App.css';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <TodoListPage />

    </div>
  );
};

export default App;