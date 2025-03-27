import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { FaSave } from "react-icons/fa";
import { ImCancelCircle } from "react-icons/im";
import { FaPen, FaPlus, FaTrashCan } from "react-icons/fa6";
import { useDispatch, useSelector } from 'react-redux';
import { createTodo, deleteTodoApi, getTodos, updateTodoApi } from '../../services/operations/todoAPI';

const TodoList = () => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.token);
  const { todos } = useSelector((state) => state.todo);
  const [editingTasks, setEditingTasks] = useState({});
  const [isSaving, setIsSaving] = useState(false);
  const [task, setTask] = useState('');
  const [updatedData, setUpdatedData] = useState([]);

  useEffect(() => {
    if (!todos || todos.length == 0) {
      dispatch(getTodos(token, setIsSaving));
    }
  }, []);

  useEffect(() => {
    setUpdatedData(todos);
  }, [todos]);

  const handleSave = (e) => {
    e.preventDefault();
    if (task.trim() === "") { // Avoid saving empty tasks
      toast.error('Task cannot be empty');
      return;
    }
    dispatch(createTodo(token, { task }, setIsSaving));
    setTask('');
  }

  const handleDelete = (todoId) => {
    dispatch(deleteTodoApi(token, todoId, setIsSaving));
  }

  const handleUpdate = (todoId) => {
    if (isSaving) return;

    const index = updatedData.findIndex(item => item._id === todoId);
    const updatedTodo = updatedData[index];
    const originalTodo = todos.find(todo => todo._id === todoId);

    // Check if task is empty
    if (updatedTodo.task.trim() === '') {
      toast.error('Task cannot be empty');
      return;
    }

    // Check if there are actual changes
    if (updatedTodo.task === originalTodo.task && updatedTodo.completed === originalTodo.completed) {
      toast.error('No changes made');
      toggleEditing(todoId);
      return;
    }

    dispatch(updateTodoApi(token, todoId, {
      completed: updatedTodo.completed,
      task: updatedTodo.task
    }));

    toggleEditing(todoId);
  };

  const handleCancel = (todoId) => {
    if (isSaving) return;

    const index = updatedData.findIndex(item => item._id === todoId);
    const updatedTodo = updatedData[index];
    const originalTodo = todos.find(todo => todo._id === todoId);

    // Check if task is empty
    if (updatedTodo.task.trim() === '') {
      toast.error('Task cannot be empty');
      return;
    }

    // Check if there are actual changes
    else if (updatedTodo.task === originalTodo.task && updatedTodo.completed === originalTodo.completed) {
      toast.error('No changes made');
      toggleEditing(todoId);
      return;
    }

    // Changes have been made
    toast.error('Changes have been made, Please save it');
  }

  const toggleEditing = (todoId) => {
    if (isSaving) return;

    setEditingTasks((prev) => ({
      ...prev,
      [todoId]: !prev[todoId],
    }));
  };

  return (
    <div className="h-[calc(100vh-3.5rem)] overflow-auto">

      <div className="p-6 bg-[#F3F4F6]">

        <div className="bg-white rounded-lg shadow-lg p-6">

          {/* Task input */}
          <form
            className="flex flex-col sm:flex-row items-start gap-y-2 sm:items-center space-x-4 mb-6"
            onSubmit={handleSave}
          >
            <input
              type="text"
              placeholder="Add a new task..."
              value={task}
              onChange={(e) => setTask(e.target.value)}
              className="flex-1 w-full px-4 py-2 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-500"
            />
            <button
              type='submit'
              className="flex items-center gap-2 border rounded-lg py-2 px-4 bg-[#2563EB] text-white font-semibold cursor-pointer">
              <FaPlus />
              Add Task
            </button>
          </form>

          {/* Tasks */}
          <div className="space-y-4">
            {
              todos.length > 0 ?
                (
                  todos.map((todo) => (
                    <div
                      key={todo._id}
                      className="flex items-center space-x-4 p-4 bg-neutral-50 rounded-lg"
                    >
                      <input
                        type="checkbox"
                        defaultChecked={todo.completed}
                        disabled={!editingTasks[todo._id]}
                        className="w-5 h-5 border-2 border-neutral-300 rounded"
                        onChange={(e) => {
                          setUpdatedData(prevData =>
                            prevData.map(item =>
                              item._id === todo._id
                                ? { ...item, completed: e.target.checked }
                                : item
                            )
                          );
                        }}
                      />

                      <input
                        type="text"
                        placeholder="Please write something..."
                        value={updatedData.find(item => item._id === todo._id)?.task || ''}
                        disabled={!editingTasks[todo._id]}
                        className={`flex-1 px-4 py-2 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-500 ${updatedData.find(item => item._id === todo._id)?.completed ? "line-through text-neutral-500" : ""}`}
                        onChange={(e) => {
                          setUpdatedData(prevData =>
                            prevData.map(item =>
                              item._id === todo._id
                                ? { ...item, task: e.target.value }
                                : item
                            )
                          );
                        }}
                      />

                      <button
                        className="text-neutral-500 hover:text-neutral-700 cursor-pointer">
                        {
                          !editingTasks[todo._id] ?
                            <FaPen
                              onClick={() => toggleEditing(todo._id)}
                            /> :
                            (
                              <div className='flex items-center space-x-4'>
                                <ImCancelCircle
                                  onClick={() => handleCancel(todo._id)}
                                />
                                <FaSave
                                  onClick={() => handleUpdate(todo._id)}
                                />
                              </div>
                            )
                        }
                      </button>

                      <button
                        onClick={() => handleDelete(todo._id)}
                        className="text-neutral-500 hover:text-neutral-700 cursor-pointer">
                        <FaTrashCan />
                      </button>

                    </div>
                  ))
                ) :
                (
                  <p className='text-center py-20 text-xl text-[#6A7282]'>No Todo Found</p>
                )
            }
          </div>
        </div>

      </div>

    </div>
  )
};

export default TodoList