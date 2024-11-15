import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TaskList from './tasks/TaskList';  // Import TaskList to display tasks
import axios from 'axios';

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);  // Store tasks
  const [loading, setLoading] = useState(true);  // Loading state
  const [error, setError] = useState('');  // Error state
  const navigate = useNavigate();  // To handle navigation

  // Fetch tasks when the component mounts
  useEffect(() => {
    const token = localStorage.getItem('token');  // Get the token from localStorage
    if (!token) {
      navigate('/login');  // Redirect to login page if not logged in
    } else {
      const fetchTasks = async () => {
        try {
          const response = await axios.get('http://localhost:5000/api/tasks', {
            headers: {
              Authorization: `Bearer ${token}`,  // Pass JWT token for authentication
            },
          });
          setTasks(response.data);  // Set the tasks from the API
          setLoading(false);  // Set loading to false when data is fetched
        } catch (error) {
          setError('Failed to fetch tasks. Please try again later.');  // Error handling
          setLoading(false);  // Set loading to false in case of error
        }
      };
      fetchTasks();
    }
  }, [navigate]);  // Dependency array includes navigate to trigger useEffect on change

  const handleDelete = (taskId) => {
    setTasks(tasks.filter(task => task._id !== taskId));  // Remove the deleted task from the state
  };

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem('token');  // Remove token from localStorage
    navigate('/login');  // Redirect to login page
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header Section */}
      <header className="bg-blue-600 p-4 text-white text-center text-lg font-bold flex justify-between items-center">
        <div>Task Management Dashboard</div>
        {/* Logout Button */}
        <button 
          onClick={handleLogout}  // Handle logout when clicked
          className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
        >
          Logout
        </button>
      </header>

      {/* Main Content Section */}
      <main className="p-6">
        {/* Add Task Button */}
        <div className="flex justify-end mb-4">
          <button 
            onClick={() => navigate('/taskform')} 
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
          >
            Add Task
          </button>
        </div>

        {loading && <p>Loading tasks...</p>}
        {error && <p className="text-red-500">{error}</p>}

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {tasks.map(task => (
            <TaskList key={task._id} task={task} onDelete={handleDelete} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
