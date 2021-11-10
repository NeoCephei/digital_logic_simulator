import './App.css';

import React, {useState} from 'react'
import GlobalContext from './services/globalContext'
// Import Components here
import Navbar from './components/navbar/navbar'
import Dashboard from './components/dashboard/dashboard';

function App() {

  const [inputs, setInputs] = useState([])
  const [outputs, setOutputs] = useState([])


  const magicProps = {inputs,outputs}

  return (
    <GlobalContext.Provider value = {magicProps} >
      <div className="App">
        <Navbar />
        <Dashboard />
      </div>
    </GlobalContext.Provider>
  );
}

export default App;
