import React from 'react'
import { Link, useNavigate } from 'react-router-dom';


const Header = () => {
    const navigate = useNavigate();

    const isLoggedIn = !!localStorage.getItem('token');
  
    const handleLogout = () => {
      localStorage.removeItem('token');
      navigate('/'); 
    };
  return (
<>
    <header className="bg-blue-600 text-white p-4 flex justify-between items-center">
      <Link to={'/dashboard'}>
        <button className="text-lg font-bold">TM</button>
      </Link>

      <div className="flex items-center space-x-4">
        {isLoggedIn ? (
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-700 rounded-lg hover:bg-red-800 transition-colors"
          >
            Log Out
          </button>
        ) : (
          
            <button className="px-4 py-2 bg-blue-700 rounded-lg hover:bg-blue-800 transition-colors">
             <Link to="/login"> Log In</Link>
            </button>
          
        )}
      </div>
    </header>
</>
)
}

export default Header