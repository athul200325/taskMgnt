import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './components/Auth/Login'
import Reg from './components/auth/Reg'
import TaskList from './components/tasks/TaskList'
import TaskForm from './components/tasks/TaskForm'
import Dashboard from './components/dashboard'
import EditTask from './components/tasks/EditTask'
import Home from './pages/Home'
import Header from './components/Header'

const App = () => {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/register' element={<Reg/>}/>
      <Route path='/tasklist' element={<TaskList/>}/>
      <Route path='/taskform' element={<TaskForm/>}/>
      <Route path='/dashboard' element={<Dashboard/>}/>
      <Route path="/edit-task/:id" element={<EditTask/>} /> 
    </Routes>  
    </BrowserRouter>
  )
}

export default App