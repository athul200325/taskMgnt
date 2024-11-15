import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TaskList from './tasks/TaskList'; 
import axios from 'axios';
import Header from './Header';
import image from '../assets/notask.png'

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);  
  const [loading, setLoading] = useState(true);  
  const [error, setError] = useState('');  
  const navigate = useNavigate();  

  useEffect(() => {
    const token = localStorage.getItem('token');  
    if (!token) {
      navigate('/login');  
    } else {
      const fetchTasks = async () => {
        try {
          const response = await axios.get('http://localhost:5000/api/tasks', {
            headers: {
              Authorization: `Bearer ${token}`,  
            },
          });
          setTasks(response.data);  
          setLoading(false);  
        } catch (error) {
          setError('Failed to fetch tasks. Please try again later.');  
          setLoading(false); 
        }
      };
      fetchTasks();
    }
  }, [navigate]);  

  const handleDelete = (taskId) => {
    setTasks(tasks.filter(task => task._id !== taskId));  
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50">
        <main className="max-w-7xl mx-auto p-6">
          <div className="flex justify-end mb-6">
            <button
              onClick={() => navigate('/taskform')}
              className="bg-gradient-to-r from-green-600 to-green-800 text-white px-6 py-3 rounded-lg shadow-lg hover:from-green-700 hover:to-green-900 transition duration-300"
            >
              <span className="font-semibold">+ Add Task</span>
            </button>
          </div>

          {loading && <p className="text-center text-lg text-gray-600">Loading tasks...</p>}
          {error && <p className="text-center text-lg text-red-600">{error}</p>}

          {tasks.length === 0 && !loading && !error && (
            <div className="flex flex-col justify-center items-center my-8">
            <img
              src={image}
              alt="No tasks available"
              className="w-[500px] h-auto"
            />
            <h2 className="mt-4 font-normal text-slate-400 text-4xl">Add new task</h2>
          </div>
          
          )}

          {tasks.length > 0 && (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {tasks.map((task) => (
                <TaskList key={task._id} task={task} onDelete={handleDelete} />
              ))}
            </div>
          )}
        </main>
      </div>
    </>
  );
};

export default Dashboard;
