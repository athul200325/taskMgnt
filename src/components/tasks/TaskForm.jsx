import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const TaskForm = () => {
  // State to manage form data
  const [taskData, setTaskData] = useState({
    title: '',
    description: '',
    startDate: '',
    endDate: '',
    status: 'In Progress', // Default status
    progress: 0, // Default progress
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Handle input changes
  const handleChange = (e) => {
    setTaskData({ ...taskData, [e.target.id]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if user is logged in by verifying the token in localStorage
    const token = localStorage.getItem('token');
    if (!token) {
      setError('You need to log in first.');
      return;
    }

    // Ensure progress is within valid range
    if (taskData.progress < 0 || taskData.progress > 100) {
      setError('Progress must be between 0 and 100.');
      return;
    }

    try {
      // Send the task data to the backend API to add the task
      await axios.post('http://localhost:5000/api/tasks', taskData, {
        headers: {
          Authorization: `Bearer ${token}`, // Pass token in the request headers for authentication
        },
      });
      navigate('/dashboard'); // Navigate to the dashboard after successful task creation
    } catch (error) {
      setError('Failed to add task. Please try again.');
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-lg mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Add New Task</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="title" className="block text-gray-700 font-medium">
            Task Title
          </label>
          <input
            type="text"
            id="title"
            value={taskData.title}
            onChange={handleChange}
            className="w-full mt-1 p-2 border rounded-lg focus:ring focus:ring-blue-300"
            placeholder="Enter task title"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="description" className="block text-gray-700 font-medium">
            Task Description
          </label>
          <textarea
            id="description"
            value={taskData.description}
            onChange={handleChange}
            className="w-full mt-1 p-2 border rounded-lg focus:ring focus:ring-blue-300"
            placeholder="Enter task description"
            required
          />
        </div>

        {/* Start Date */}
        <div className="mb-4">
          <label htmlFor="startDate" className="block text-gray-700 font-medium">
            Start Date
          </label>
          <input
            type="date"
            id="startDate"
            value={taskData.startDate}
            onChange={handleChange}
            className="w-full mt-1 p-2 border rounded-lg focus:ring focus:ring-blue-300"
            required
          />
        </div>

        {/* End Date */}
        <div className="mb-4">
          <label htmlFor="endDate" className="block text-gray-700 font-medium">
            End Date
          </label>
          <input
            type="date"
            id="endDate"
            value={taskData.endDate}
            onChange={handleChange}
            className="w-full mt-1 p-2 border rounded-lg focus:ring focus:ring-blue-300"
            required
          />
        </div>

        {/* Status */}
        <div className="mb-4">
          <label htmlFor="status" className="block text-gray-700 font-medium">
            Status
          </label>
          <select
            id="status"
            value={taskData.status}
            onChange={handleChange}
            className="w-full mt-1 p-2 border rounded-lg focus:ring focus:ring-blue-300"
          >
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
            <option value="Pending">Pending</option>
          </select>
        </div>

        {/* Progress */}
        <div className="mb-4">
          <label htmlFor="progress" className="block text-gray-700 font-medium">
            Progress
          </label>
          <input
            type="number"
            id="progress"
            value={taskData.progress}
            onChange={handleChange}
            className="w-full mt-1 p-2 border rounded-lg focus:ring focus:ring-blue-300"
            min="0"
            max="100"
            placeholder="Progress (%)"
            required
          />
        </div>

        <div className="flex justify-end space-x-4">
          <button
            type="button"
            className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300"
            onClick={() => navigate('/dashboard')}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
          >
            Add Task
          </button>
        </div>
      </form>
    </div>
  );
};

export default TaskForm;
