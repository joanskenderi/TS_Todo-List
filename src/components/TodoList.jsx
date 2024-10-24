import TodoItem from './TodoItem';

const TodoList = ({ todos, handleEdit, handleDelete, toggleComplete }) => {
  return (
    <div className="max-h-64 overflow-y-auto">
      <ul className="space-y-2">
        {todos.map((todo, idx) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            handleEdit={() => handleEdit(idx, todo.id)}
            handleDelete={() => handleDelete(todo.id)}
            toggleComplete={toggleComplete}
          />
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
