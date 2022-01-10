import './App.css';
import Classic from './components/Classic'
import { useState, useEffect, useRef } from 'react';


function App() {
  const [start, setStart] = useState(false)
  return (
    <>
    {start ? 
    <Classic start={start}></Classic>
    :
    <div className='modal-overlay'>
      <div className='modal-container'>
        <h3 className='modal-container-header' style={{color: "#000000"}}>Welcome</h3>
        <span className='modal-container-span' onClick={()=>{setStart(true)}}>Start</span>
      </div>
    </div>
    }
    
    
    </>
  );
}

export default App;
