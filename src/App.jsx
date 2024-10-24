import { useEffect, useRef, useState } from 'react';

import {
  CompletedTasks,
  Form,
  Header,
  RemainingTasks,
  TodoList,
} from './components';
import { API_URL } from './api';

const App = () => {
  const [todo, setTodo] = useState('');
  const [todos, setTodos] = useState([]);
  const [description, setDescription] = useState('');
  const [completed, setCompleted] = useState(false);
  const [editTodo, setEditTodo] = useState(null);
  const [editTodoId, setEditTodoId] = useState(null);
  const [rerender, setRerender] = useState(false);

  const completedCount = useRef(0);
  const remainingCount = useRef(0);

  useEffect(() => {
    fetchTodos();
  }, []);

  useEffect(() => {
    completedCount.current = todos.filter((todo) => todo.completed).length;
    remainingCount.current = todos.length - completedCount.current;
    setRerender((prev) => !prev);
  }, [todos]);

  const fetchTodos = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setTodos(data);
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  };

  const handleForm = (e) => setTodo(e.target.value);
  const handleDescription = (e) => setDescription(e.target.value);

  const onSubmit = async (e) => {
    e.preventDefault();

    if (todo.trim() && description.trim()) {
      editTodo !== null ? await updateTodo() : await createTodo();
      resetForm();
    }
  };

  const createTodo = async () => {
    const newTodo = { title: todo, description, completed };

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTodo),
      });
      const result = await response.json();
      setTodos((prevTodos) => [...prevTodos, result]);
    } catch (error) {
      console.error('Error creating todo:', error);
    }
  };

  const updateTodo = async () => {
    const updatedTodo = { id: editTodoId, title: todo, description, completed };

    try {
      const response = await fetch(`${API_URL}/${editTodoId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedTodo),
      });

      if (!response.ok) {
        throw new Error('Failed to update todo');
      }

      setTodos((prevTodos) =>
        prevTodos.map((t) => (t.id === editTodoId ? updatedTodo : t))
      );
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };

  const handleEdit = (idx, id) => {
    const todo = todos[idx];
    setTodo(todo.title);
    setDescription(todo.description);
    setCompleted(todo.completed);
    setEditTodo(idx);
    setEditTodoId(id);
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
      });
      setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  const toggleComplete = async (id) => {
    const todoToUpdate = todos.find((todo) => todo.id === id);
    const updatedTodo = { ...todoToUpdate, completed: !todoToUpdate.completed };

    try {
      await fetch(`${API_URL}/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ completed: updatedTodo.completed }),
      });
      setTodos((prevTodos) =>
        prevTodos.map((todo) => (todo.id === id ? updatedTodo : todo))
      );
    } catch (error) {
      console.error('Error toggling complete status:', error);
    }
  };

  const resetForm = () => {
    setTodo('');
    setDescription('');
    setCompleted(false);
    setEditTodo(null);
    setEditTodoId(null);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <Header />
        <div className="flex justify-between mb-4">
          <CompletedTasks completedCount={completedCount} />
          <RemainingTasks remainingCount={remainingCount} />
        </div>
        <Form
          todo={todo}
          description={description}
          handleForm={handleForm}
          handleDescription={handleDescription}
          onSubmit={onSubmit}
          editTodo={editTodo}
        />
        <TodoList
          todos={todos}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
          toggleComplete={toggleComplete}
        />
      </div>
    </div>
  );
};

export default App;
