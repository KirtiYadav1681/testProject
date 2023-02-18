import React, { useState } from 'react'
import { Link } from 'react-router-dom';

import Home from './Home';

const Taks2 = () => {
  const [ sentence, setSentence ] = useState('');
  const [ letter, setLetter ] = useState('');
  const [ answer, setAnswer ] = useState('');

  const handleSubmit = (e) =>{
    e.preventDefault();
    const letterIndex = sentence.indexOf(letter);
    if(letterIndex < 0){
      setAnswer('The letter does not exist in the sentence.');
    }
    else{
      setAnswer(sentence.substring(letterIndex, sentence.length));
    }
  }

  return (
    <div className='h-screen bg-gray-300 pb-20'>
      <h1 className='text-center py-2 text-blue-700 font-bold text-xl'>TASK 2</h1>

      <div id='add' className='mx-20 mt-10'>
        <div className='w-full bg-white rounded-lg'>
          <form className='bg-white shadow-md rounded-lg px-8 pt-6 pb-8 mb-4' onSubmit={handleSubmit}>

            <div className='mb-4'>
              <label className='block text-gray-700 text-sm font-bold mb-2'>SENTENCE</label>
              <input className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' type='text' placeholder='Enter a sentence' onChange={(e) => setSentence(e.target.value.toLowerCase())} />
            </div>

            <div className='mb-4'>
              <label className='block text-gray-700 text-sm font-bold mb-2'>LETTER</label>
              <input className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' type='text' placeholder='Enter a letter' onChange={(e) => setLetter(e.target.value.toLowerCase())} />
            </div>

            <div className='text-center'>
              <button className='w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline' type='submit'>SUBMIT</button>
            </div>

            <textarea 
              className='shadow appearance-none border rounded w-full py-2 my-5 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              value={answer}
              placeholder='You will get your output here'
              disabled={true}
            />

          </form>
        </div>
      </div>
      <Link to='/' className='pl-20' element={<Home />}>Back to Home</Link>
    </div>
    )
}

export default Taks2