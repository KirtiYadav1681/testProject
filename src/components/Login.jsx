import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';

import { auth } from '../firebaseConfig';

const Login = () => {
    const [ error, setError ] = useState(false);
    const [ errorMessage, setErrorMessage ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const navigate = useNavigate();
  
    const handleSubmit = (e) =>{
      e.preventDefault();
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
        navigate('/');
        })
        .catch((error) => {
          const errorMessage = error.message;
        setError(true);
        setErrorMessage(errorMessage);
    })
  }
    return (
    <div className='flex justify-center items-center h-screen bg-gray-300'>
      <div className='w-full max-w-lg'>
        <form className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4' onSubmit={handleSubmit}>
          <div className='mb-4'>
            <label className='block text-gray-700 text-sm font-bold mb-2'>Email</label>
            <input className='hadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' type='text' placeholder='Enter your email' onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className='mb-4'>
            <label className='block text-gray-700 text-sm font-bold mb-2'>Password</label>
            <input className='hadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' type='text' placeholder='Enter your password' onChange={(e) => setPassword(e.target.value)} />
          </div>
          <div className='text-center'>
            <button className=' w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline' type='submit'>Login</button>
          </div>
          { error && <span className='text-red-600 pt-2 block'> {errorMessage} </span>}
          <Link to='/signup' className='block pt-3 text-blue-700'>Click here to create an account</Link>
        </form>
      </div>
      </div>
    )
}

export default Login