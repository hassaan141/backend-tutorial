import './App.css';
import { useState } from 'react';

function App() {

  const [data, setData] = useState([]);

  return (
    <div className="bg-zinc-800 min-h-screen text-white flex justify-center items-center">
      <div className=''>
      <h1 className='text-3xl mb-10'>Enter your question</h1>
      <div className='gap-3'>
        <form action="https://localhost:3002/test" method="post">
          <input type="text" name="" id="" className='text-black w-700 h-200 rounded-md border-1'/>
          <button className='bg-blue-400 px-20 rounded-md ml-6 text-xl' type='sumbit'>Ask ChatGGG</button>
        </form>
      </div>
      </div>
    </div>
  );
}

export default App;
