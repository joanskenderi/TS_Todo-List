import { useEffect, useRef, useState } from 'react';

import {
  CompletedTasks,
  Form,
  Header,
  RemainingTasks,
  TodoList,
} from './components';

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
    completedCount.current = todos.filter((todo) => todo.completed).length;
    remainingCount.current = todos.length - completedCount.current;
    setRerender((prev) => !prev);
  }, [todos]);

  const handleForm = (e) => setTodo(e.target.value);
  const handleDescription = (e) => setDescription(e.target.value);

  const onSubmit = (e) => {
    e.preventDefault();

    if (todo.trim() && description.trim()) {
      editTodo !== null ? updateTodo() : createTodo();
      resetForm();
    }
  };

  const createTodo = () => {
    const newTodo = { id: Date.now(), title: todo, description, completed };
    setTodos((prevTodos) => [...prevTodos, newTodo]);
  };

  const updateTodo = () => {
    const updatedTodo = { id: editTodoId, title: todo, description, completed };
    setTodos((prevTodos) =>
      prevTodos.map((t) => (t.id === editTodoId ? updatedTodo : t))
    );
  };

  const handleEdit = (idx, id) => {
    const todo = todos[idx];
    setTodo(todo.title);
    setDescription(todo.description);
    setCompleted(todo.completed);
    setEditTodo(idx);
    setEditTodoId(id);
  };

  const handleDelete = (id) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  const toggleComplete = (id) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
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
