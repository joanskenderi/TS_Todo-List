import { FaPen, FaTrash } from 'react-icons/fa';

const TodoItem = ({ todo, handleEdit, handleDelete, toggleComplete }) => {
  return (
    <div
      className={`p-4 rounded-md shadow-lg border-l-4 flex flex-col space-y-3 ${
        todo.completed
          ? 'bg-green-100 border-green-500'
          : 'bg-red-100 border-red-500'
      }`}
    >
      <div className="flex justify-between items-center">
        <div>
          <h2
            className={`font-semibold text-lg ${
              todo.completed ? 'line-through text-gray-500' : ''
            }`}
          >
            {todo.title}
          </h2>
          <p
            className={`text-sm text-gray-600 ${
              todo.completed ? 'line-through text-gray-500' : ''
            }`}
          >
            {todo.description}
          </p>
        </div>
        <div className="flex space-x-4 items-center">
          <label className="inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleComplete(todo.id, !todo.completed)}
              className="form-checkbox h-5 w-5 text-green-600 border-gray-300 rounded focus:ring focus:ring-green-300 transition duration-150 ease-in-out"
            />
          </label>
          <button
            onClick={handleEdit}
            className="text-blue-500 hover:text-blue-700 transition-colors duration-200"
          >
            <FaPen />
          </button>
          <button
            onClick={handleDelete}
            className="text-red-500 hover:text-red-700 transition-colors duration-200"
          >
            <FaTrash />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TodoItem;
