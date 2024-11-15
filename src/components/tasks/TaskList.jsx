import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from '../Header';

const TaskList = ({ task, onDelete }) => {
  const navigate = useNavigate();

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('You need to be logged in to delete tasks.');
        return;
      }

      await axios.delete(`http://localhost:5000/api/tasks/${task._id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      onDelete(task._id);
    } catch (error) {
      console.error('Failed to delete task:', error);
      alert('An error occurred while deleting the task.');
    }
  };

  const handleEdit = () => {
    navigate(`/edit-task/${task._id}`);
  };

  return (
    <>
    
    <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:scale-108">
      <h3 className="text-2xl font-semibold text-gray-800 text-center mb-4">{task.title}</h3>
      <p className="text-gray-600 text-sm text-justify mb-4">{task.description}</p>

      <div className="text-gray-700 space-y-2 font-medium">
        <div className="flex justify-between">
          <span className="text-gray-500">Start Date:</span>
          <span>{formatDate(task.startDate)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">End Date:</span>
          <span>{formatDate(task.endDate)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">Status:</span>
          <span className={`text-${task.status === 'Completed' ? 'green' : 'yellow'}-600 font-semibold`}>
            {task.status}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">Progress:</span>
          <span>{task.progress}%</span>
        </div>
      </div>

      <div className="mt-6 flex justify-between">
        <button
          onClick={handleEdit}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 transform transition-all"
        >
          Edit Task
        </button>
        <button
          onClick={handleDelete}
          className="bg-red-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-700 transform transition-all"
        >
          Delete Task
        </button>
      </div>
    </div>
    </>
   
  );
};

export default TaskList;
