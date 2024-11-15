import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Header from '../Header';

const EditTask = () => {
  const { id } = useParams(); // Get task ID from URL parameters
  const navigate = useNavigate();

  const [task, setTask] = useState({
    title: '',
    description: '',
    startDate: '',
    endDate: '',
    status: '',
    progress: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch task data for editing (when form is loaded)
  useEffect(() => {
    const fetchTask = async () => {
      try {
        if (!id || id.length !== 24) {
          throw new Error('Invalid task ID');
        }

        const token = localStorage.getItem('token');
        const response = await axios.get(`http://localhost:5000/api/tasks/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTask(response.data);
        setLoading(false);
      } catch (error) {
        setError('Failed to fetch task data: ' + error.message);
        setLoading(false);
      }
    };

    fetchTask();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask({ ...task, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    try {
      await axios.put(`http://localhost:5000/api/tasks/${id}`, task, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      navigate('/dashboard'); 
    } catch (error) {
      setError('Failed to update task.');
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
<>
 <Header/>
 <div className="p-8 max-w-xl mx-auto bg-white rounded-xl shadow-lg ">
  <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">Edit Task</h2>
  
  <form onSubmit={handleSubmit}>
    <div className="mb-6">
      <label className="block text-lg font-medium text-gray-700 mb-2">Title</label>
      <input
        type="text"
        name="title"
        value={task.title}
        onChange={handleChange}
        className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
        placeholder="Enter task title"
        required
      />
    </div>

    <div className="mb-6">
      <label className="block text-lg font-medium text-gray-700 mb-2">Description</label>
      <textarea
        name="description"
        value={task.description}
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
        value={task.startDate}
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
        value={task.endDate}
        onChange={handleChange}
        className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
        required
      />
    </div>

    <div className="mb-6">
      <label className="block text-lg font-medium text-gray-700 mb-2">Status</label>
      <select
        name="status"
        value={task.status}
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
        value={task.progress}
        onChange={handleChange}
        min="0"
        max="100"
        className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
        placeholder="0 - 100"
        required
      />
    </div>

    <button
      type="submit"
      className="w-full py-3 bg-blue-600 text-white text-lg font-semibold rounded-xl shadow-md hover:bg-blue-700 transform transition-all"
    >
      Update Task
    </button>
  </form>
</div>

</>
  );
};

export default EditTask;
