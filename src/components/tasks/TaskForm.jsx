import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Header from '../Header';

const TaskForm = () => {
  const [taskData, setTaskData] = useState({
    title: '',
    description: '',
    startDate: '',
    endDate: '',
    status: 'In Progress', 
    progress: 0, 
  });

  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTaskData((prevData) => ({
      ...prevData,
      [name]: value, 
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');
    if (!token) {
      setError('You need to log in first.');
      return;
    }

    if (taskData.progress < 0 || taskData.progress > 100) {
      setError('Progress must be between 0 and 100.');
      return;
    }

    try {
      await axios.post('http://localhost:5000/api/tasks', taskData, {
        headers: {
          Authorization: `Bearer ${token}`, 
        },
      });

      setTaskData({
        title: '',
        description: '',
        startDate: '',
        endDate: '',
        status: 'In Progress',
        progress: 0,
      });

      navigate('/dashboard');
    } catch (error) {
      if (error.response && error.response.data) {
        setError(error.response.data.message || 'Failed to add task. Please try again.');
      } else {
        setError('Network error. Please try again later.');
      }
    }
  };

  const handleClear=()=>{
    setTaskData({
        title: '',
        description: '',
        startDate: '',
        endDate: '',
        status: 'In Progress',
        progress: 0,
      });
  }

  return (
    <>
      <Header />
      <div className="p-8 max-w-xl mx-auto bg-white rounded-xl shadow-lg">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">Add New Task</h2>

        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}

        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label className="block text-lg font-medium text-gray-700 mb-2">Task Title</label>
            <input
              type="text"
              name="title" 
              value={taskData.title}
              onChange={handleChange}
              className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              placeholder="Enter task title"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-lg font-medium text-gray-700 mb-2">Task Description</label>
            <textarea
              name="description" 
              value={taskData.description}
              onChange={handleChange}
              className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              placeholder="Describe the task"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-lg font-medium text-gray-700 mb-2">Start Date</label>
            <input
              type="date"
              name="startDate" 
              value={taskData.startDate}
              onChange={handleChange}
              className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-lg font-medium text-gray-700 mb-2">End Date</label>
            <input
              type="date"
              name="endDate" 
              value={taskData.endDate}
              onChange={handleChange}
              className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-lg font-medium text-gray-700 mb-2">Status</label>
            <select
              name="status" 
              value={taskData.status}
              onChange={handleChange}
              className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              required
            >
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
              <option value="Pending">Pending</option>
            </select>
          </div>

          <div className="mb-6">
            <label className="block text-lg font-medium text-gray-700 mb-2">Progress</label>
            <input
              type="number"
              name="progress" 
              value={taskData.progress}
              onChange={handleChange}
              min="0"
              max="100"
              className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              placeholder="Progress (%)"
              required
            />
          </div>

          <div className="flex justify-between">
            <button
              type="button"
              onClick={handleClear}
              className="px-6 py-2 text-gray-700 bg-gray-200 rounded-xl hover:bg-gray-300 transition-all"
            >
              Clear
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded-xl shadow-md hover:bg-blue-700 transition-all"
            >
              Add Task
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default TaskForm;
