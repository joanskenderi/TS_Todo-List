const Form = ({
  todo,
  description,
  handleForm,
  handleDescription,
  onSubmit,
  editTodo,
}) => {
  return (
    <form onSubmit={onSubmit} className="mb-4">
      <label className="block text-gray-700 font-semibold mb-2">
        Enter a todo
      </label>
      <input
        type="text"
        value={todo}
        onChange={handleForm}
        className="w-full p-2 mb-4 border border-gray-300 rounded-md"
        placeholder="Type your todo"
      />
      <label className="block text-gray-700 font-semibold mb-2">
        Enter a description
      </label>
      <textarea
        value={description}
        onChange={handleDescription}
        className="w-full p-2 mb-4 border border-gray-300 rounded-md"
        placeholder="Type your description"
      />
      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors"
      >
        {editTodo !== null ? 'Update Todo' : 'Add Todo'}
      </button>
    </form>
  );
};

export default Form;
