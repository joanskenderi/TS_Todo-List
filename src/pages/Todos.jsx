import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { Header, TodoItem } from '../components';
import { API_URL } from '../api';

const Todos = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filter, setFilter] = useState(searchParams.get('filter') || 'all');
  const [todos, setTodos] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    fetchTodos();
  }, []);

  useEffect(() => {
    setSearchParams({ filter });
  }, [filter, setSearchParams]);

  const fetchTodos = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setTodos(data);
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === 'completed') return todo.completed;
    if (filter === 'remaining') return !todo.completed;
    return true;
  });

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <Header>Todos</Header>
      <div className="mb-6">
        <button
          onClick={() => setFilter('all')}
          className="bg-blue-500 text-white py-2 px-4 rounded-md mr-2"
        >
          All
        </button>
        <button
          onClick={() => setFilter('completed')}
          className="bg-green-500 text-white py-2 px-4 rounded-md mr-2"
        >
          Completed
        </button>
        <button
          onClick={() => setFilter('remaining')}
          className="bg-yellow-500 text-white py-2 px-4 rounded-md mr-2"
        >
          Remaining
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-3/4 mb-6">
        {filteredTodos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} isViewOnly={true} />
        ))}
      </div>
      {!filteredTodos.length && (
        <p className="flex justify-center mb-8 text-red-500">
          Currently, there are no todos.
        </p>
      )}
      <button
        className="mt-4 bg-gray-500 text-white py-2 px-4 rounded-md"
        onClick={() => navigate('/')}
      >
        Back to Home
      </button>
    </div>
  );
};

export default Todos;
