import { useState, useEffect } from "react";
import { FaPlus, FaTrash, FaEdit } from "react-icons/fa";

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [editTask, setEditTask] = useState("");

  // Load todos from local storage
  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem("todos"));
    if (storedTodos) setTodos(storedTodos);
  }, []);

  // Save todos to local storage
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  // Add Task
  const addTask = () => {
    if (!newTask.trim()) return;
    setTodos([...todos, { text: newTask, completed: false }]);
    setNewTask("");
  };

  // Delete Task
  const deleteTask = (index) => {
    setTodos(todos.filter((_, i) => i !== index));
  };

  // Toggle Complete
  const toggleComplete = (index) => {
    setTodos(
      todos.map((task, i) =>
        i === index ? { ...task, completed: !task.completed } : task
      )
    );
  };

  // Start Editing Task
  const startEditing = (index) => {
    setEditIndex(index);
    setEditTask(todos[index].text);
  };

  // Save Edited Task
  const saveEdit = () => {
    if (!editTask.trim()) return;
    const updatedTodos = [...todos];
    updatedTodos[editIndex].text = editTask;
    setTodos(updatedTodos);
    setEditIndex(null);
    setEditTask("");
  };

  return (
    <div className="h-[calc(100vh-3.5rem)] flex justify-center items-center overflow-auto">

      <div className='h-full w-full px-10'>

        <h1 className="text-3xl font-medium mt-5">📝 Todo List</h1>

        <div className="w-full max-w-md bg-white p-4 rounded-lg shadow-md mt-5">
          {/* Input Section */}
          <div className="flex gap-2">
            <input
              type="text"
              className="flex-1 p-2 border rounded-lg outline-none"
              placeholder="Add a new task..."
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
            />
            <button
              className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600"
              onClick={addTask}
            >
              <FaPlus />
            </button>
          </div>

          {/* Todo List */}
          <ul className="mt-4 space-y-2">
            {todos.map((task, index) => (
              <li
                key={index}
                className="flex items-center justify-between bg-gray-50 p-2 rounded-md border"
              >
                {/* Checkbox & Task Text */}
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    className="mr-2 cursor-pointer"
                    checked={task.completed}
                    onChange={() => toggleComplete(index)}
                  />
                  {editIndex === index ? (
                    <input
                      type="text"
                      className="border p-1 rounded"
                      value={editTask}
                      onChange={(e) => setEditTask(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && saveEdit()}
                    />
                  ) : (
                    <span
                      className={`text-gray-800 ${task.completed ? "line-through text-gray-500" : ""
                        }`}
                    >
                      {task.text}
                    </span>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  {editIndex === index ? (
                    <button
                      className="text-green-500 hover:text-green-700"
                      onClick={saveEdit}
                    >
                      ✔
                    </button>
                  ) : (
                    <button
                      className="text-blue-500 hover:text-blue-700"
                      onClick={() => startEditing(index)}
                    >
                      <FaEdit />
                    </button>
                  )}
                  <button
                    className="text-red-500 hover:text-red-700"
                    onClick={() => deleteTask(index)}
                  >
                    <FaTrash />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>

      </div>

    </div>
  );
};

export default TodoList;
