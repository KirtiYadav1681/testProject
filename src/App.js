import React from 'react';
import { auth } from './firebaseConfig';
import { Routes, Route, Navigate } from 'react-router-dom';

import './index.css';

import Home from './components/Home';
import Login from './components/Login';
import Task2 from './components/Task2';
import SignUp from './components/SignUp';
import { onAuthStateChanged } from 'firebase/auth';

const App = () => {

  onAuthStateChanged(auth, (user) => {
    if(user) { localStorage.setItem('user', true);}
    else{ localStorage.removeItem('user');}
  })

  const user = JSON.parse(localStorage.getItem('user'));

  return (
    <Routes>
        <Route path='/*' element={user ? <Home /> : <Navigate to='/login'/>} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/task2' element={user ? <Task2 /> : <Navigate to='/login' />} />
    </Routes>
  )
}

export default App