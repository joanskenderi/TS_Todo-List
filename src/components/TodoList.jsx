import TodoItem from './TodoItem';

const TodoList = ({ todos, handleEdit, handleDelete, toggleComplete }) => {
  return (
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
  );
};

export default TodoList;
