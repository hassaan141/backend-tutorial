import './App.css';
import { useState } from 'react';

function App() {
  const [question, setQuestion] = useState('');
  const [something, setSomgthing] = useState('');

  const [response, setResponse] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch('http://localhost:3002/test', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ question })
    });

    const resData = await res.json();
    setResponse(resData.message);
  };

  return (
    <div className="bg-zinc-800 min-h-screen text-white flex justify-center items-center">
      <div>
        <h1 className='text-3xl mb-10'>Enter your question</h1>
        <div className='gap-5'>
          <form onSubmit={handleSubmit}>
            <input 
              type="text" 
              name="question" 
              id="question" 
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              className='text-black w-700 h-200 rounded-md border-1'
            />
            <button 
              className='bg-blue-400 px-20 rounded-md ml-6 text-xl' 
              type='submit'
            >
              Ask ChatGG
            </button>
          </form>
        </div>

        {response && (
          <div className='mt-10'>
            <p className='text-xl'>{response}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
