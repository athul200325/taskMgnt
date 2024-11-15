import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

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

      // Make an API request to delete the task
      await axios.delete(`http://localhost:5000/api/tasks/${task._id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Call onDelete prop to update the UI after task is deleted
      onDelete(task._id);
    } catch (error) {
      console.error('Failed to delete task:', error);
      alert('An error occurred while deleting the task.');
    }
  };

  const handleEdit = () => {
    // Navigate to the Edit Task page with the task id
    navigate(`/edit-task/${task._id}`);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-xl text-center font-semibold">{task.title}</h3>
      <p className="text-gray-700 text-justify mt-2">{task.description}</p>

      <div className="mt-4 font-medium text-center">
        <div className="flex">
          <span className="text-gray-500">Start Date:</span>
          <span className="text-gray-700">{formatDate(task.startDate)}</span>
        </div>
        <div className="flex mt-2">
          <span className="text-gray-500">End Date:</span>
          <span className="text-gray-700">{formatDate(task.endDate)}</span>
        </div>
        <div className="flex mt-2">
          <span className="text-gray-500">Status:</span>
          <span className={`text-${task.status==='Completed'?'green':'yellow'}-600`}>
            {task.status}
          </span>
        </div>
        <div className="flex mt-2">
          <span className="text-gray-500">Progress:</span>
          <span className="text-gray-700">{task.progress}%</span>
        </div>
      </div>

      {/* Edit and Delete Buttons */}
      <div className="mt-4 flex ms-80 ">
        <button
          onClick={handleEdit}
          className="bg-blue-600 me-4 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          Edit Task
        </button>
        <button
          onClick={handleDelete}
          className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
        >
          Delete Task
        </button>
      </div>
    </div>
  );
};

export default TaskList;
