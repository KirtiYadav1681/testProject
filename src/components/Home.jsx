import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { db } from '../firebaseConfig';
import { signOut } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import { collection, addDoc, query, doc, getDocs, deleteDoc, where, updateDoc, } from 'firebase/firestore';

import Task2 from './Task2';

const Home = () => {
  const navigate = useNavigate();
  const [isEditMode, setIsEditMode] = useState(false);
  const [error, setError] = useState(' ');
  const [users, setUsers] = useState([]);
  const [email, setEmail] = useState(' ');
  const [name, setName] = useState(' ');
  const [city, setCity] = useState(' ');

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const docData = { email, name, city };

  const findUserByEmail = async (email) => {
    const q = query(collection(db, 'users'), where('email', '==', `${email}`));
    const querySnapshot = await getDocs(q);
    const check = querySnapshot.empty;
    return check;
  };

  const addUser = async (e) => {
    e.preventDefault();
    if (email && name && city) {
      if (emailRegex.test(email)) {
        const userCheck = await findUserByEmail(email);
        if (userCheck === true) {
          try {
            setError('');
            await addDoc(collection(db, 'users'), docData);
            alert('User Added Successfully!');
            window.location.reload(true)
          } catch (error) {
            setError('Something went wrong, Try again later!');
          }
        } else {
          setError('User already exists, try using other email!');
        }
      } else {
        setError('Enter a Valid Email');
      }
    } else {
      setError('All fields are required.');
    }
  };

  const editUser = (user) => {
    setIsEditMode(true);
    setEmail(user?.email);
    setCity(user?.city);
    setName(user?.name);
  };

  const updateUser = async (e) => {
    e.preventDefault();
    if (name && city) {
      try {
        const userRef = query(
          collection(db, 'users'),
          where('email', '==', `${email}`)
        );
        const findUsers = await getDocs(userRef);
        findUsers.forEach(async (user) => {
          const getUser = doc(db, 'users', user.id);
          await updateDoc(getUser, {
            email,
            name,
            city,
          });
        });
        alert('User updated successfully!');
        window.location.reload(true)
      } catch (err) {
        setError('Something went wrong, Try again later!');
      }
    } else {
      setError('All fields are required.');
    }
  };

  const deleteUser = async (user) => {
    try {
        const getUser = doc(db, 'users', user.id);
        await deleteDoc(getUser)
          .then(() => {
            alert('deleted Successfully');
            window.location.reload(true)
        })} 
    catch (error) { console.log(error);}
  };

  const logout = () => {
    signOut(auth)
      .then(() => {
        navigate('/login');
      })
      .catch((error) => { console.log(error);});
  };

  useEffect(() => {
    const getUsers = async () => {
      const querySnapshot = await getDocs(collection(db, 'users'));
      querySnapshot.forEach((element) => {
        const data = element.data();
        setUsers((arr) => [...arr,{...data, id:element.id,}]);
      });
    };
    getUsers();
  }, []);

  const btnClass ='bg-blue-500 m-1 cursor-pointer hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline';
  const tableCols = [
    {
      id: '1',
      title: 'EMAIL',
    },
    {
      id: '2',
      title: 'NAME',
    },
    {
      id: '3',
      title: 'CITY',
    },
  ];

  return (
    <div className='h-full bg-gray-300 pb-20'>

      <h1 className='text-center py-2 text-blue-700 font-bold text-xl'>USERS</h1>
      <div className='mx-20 flex items-center justify-between'>
        <Link className={btnClass} to='/task2' element={<Task2 />}>Task 2</Link>
        <a className={btnClass} href='#add'>Add User</a>
        <button className={btnClass} onClick={logout}>LogOut</button>
      </div>

      <div className='flex flex-col mx-20'>
        <div className='p-1.5 w-full inline-block align-middle overflow-x-auto'>
          <div className='overflow-hidden border shadow-md rounded-lg'>
            <table className='min-w-full divide-y divide-gray-200'>
              <thead className='bg-gray-500'>
                <tr>
                  {tableCols.map((col) => (
                    <th key={col.id} scope='col' className='px-6 py-3 text-xs font-bold text-white text-left uppercase' > {col.title} </th>
                  ))}
                  <th scope='col'className='px-6 py-3 text-xs font-bold text-right text-white uppercase '>  Edit</th>
                  <th scope='col'className='px-6 py-3 text-xs font-bold text-right text-white uppercase '>Delete</th>
                </tr>
              </thead>
              <tbody className='divide-y divide-gray-200 bg-gray-50'>
                {users?.map((user) => (
                  <tr key={user.id}>
                    <td className='px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap'>{user.email}</td>
                    <td className='px-6 py-4 text-sm text-gray-800 whitespace-nowrap'>{user.name}</td>
                    <td className='px-6 py-4 text-sm text-gray-800 whitespace-nowrap'>{user.city}</td>
                    <td className='px-6 py-4 text-sm font-medium text-right whitespace-nowrap'>
                      <button className='text-green-500 hover:text-green-700' href='#edit' onClick={() => editUser(user)} > Edit </button>
                    </td>
                    <td className='px-6 py-4 text-sm font-medium text-right whitespace-nowrap'>
                      <button className='text-red-500 hover:text-red-700' onClick={() => deleteUser(user)} > Delete </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div id='add' className='mx-20 mt-10'>
        <div className='w-full bg-white rounded-lg'>
          <h2 className='text-center pt-5 text-blue-700 font-semibold text-lg'>{isEditMode ? 'EDIT USER' : 'ADD USER'}</h2>

          <form className='bg-white shadow-md rounded-lg px-8 pt-6 pb-8 mb-4'>
            <div className='mb-4'>
              <label className='block text-gray-700 text-sm font-bold mb-2'>EMAIL</label>
              <input
                disabled={isEditMode ? true : false}
                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                type='email'
                placeholder='Enter your email'
                onChange={(e) => setEmail(e.target.value.toLowerCase())}
                value={email}
              />
            </div>

            <div className='mb-4'>
              <label className='block text-gray-700 text-sm font-bold mb-2'>NAME</label>
              <input
                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                type='text'
                placeholder='Enter your name'
                onChange={(e) => setName(e.target.value)}
                value={name}
              />
            </div>

            <div className='mb-4'>
              <label className='block text-gray-700 text-sm font-bold mb-2'>CITY</label>
              <input
                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                type='text'
                placeholder='Enter your city'
                onChange={(e) => setCity(e.target.value)}
                value={city}
              />
            </div>

            <div className='text-center'>
              <button className='w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline' type='submit' onClick={isEditMode ? updateUser : addUser} >
                {isEditMode ? 'EDIT USER' : 'ADD USER'}
              </button>
            </div>

            {error && <span className='text-red-600 pt-2 block'>{error}</span>}
          </form>

        </div>
      </div>

    </div>
  );
};

export default Home;