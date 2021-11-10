import './App.css';

import React, {useState} from 'react'
import GlobalContext from './services/globalContext'
// Import Components here
import Navbar from './components/navbar/navbar'
import Dashboard from './components/dashboard/dashboard';

function App() {

  const [componentName, setComponentName] = useState('');
  const [inputs, setInputs] = useState([])
  const [outputs, setOutputs] = useState([])

  function customInputFn (e) {
    if (e.target.classList.contains('input_circle')) {
      const dotIndex = e.target.attributes.dot_id.value;
      if (e.ctrlKey) {
        const newInputs = [...inputs]
        // eslint-disable-next-line no-unused-vars
        const removeIndexItem = newInputs.splice(dotIndex, 1);
        setInputs(newInputs);
      } else {
        const newInputs = [...inputs];
        newInputs[dotIndex].activated = !newInputs[dotIndex].activated
        setInputs(newInputs);
      }
    } else {
      //Position of mouse - parentDiv offsetTop - circle.height/2
      const relativeTop = e.clientY - e.target.offsetTop - 10;
      const newDot = {top: relativeTop, left: '-10px', activated: false}
      setInputs([...inputs, newDot]);
    }
  }
  function customOutputFn (e) {
    if (e.target.classList.contains('output_circle')) {
      const dotIndex = e.target.attributes.dot_id.value;
      const newOutputs = [...outputs]
      // eslint-disable-next-line no-unused-vars
      const removeIndexItem = newOutputs.splice(dotIndex, 1);
      setOutputs(newOutputs);
    } else {
      //Position of mouse - parentDiv offsetTop - circle.height/2
      const relativeTop = e.clientY - e.target.offsetTop - 10;
      const newDot = {top: relativeTop, right: '-10px', activated: false}
      setOutputs([...outputs, newDot]);
    }
  }
  function handleTextInput (e) {
    setComponentName(e.target.value)
  }
  function handleSubmitInput (e) {
    e.preventDefault();
    if (componentName.length < 1) {
      alert('Please write a name');
    } else {
      console.log(`The component ${componentName} have ${inputs.length} inputs and ${outputs.length} outputs`)
      // console.log(inputs.length)
      // console.log(outputs.length)
      // console.log(board)
      // console.log('From LC_Form: This is the name', componentName);
      setComponentName('')
    }
  }

  const magicProps = {
    inputs,customInputFn,
    outputs, customOutputFn,
    componentName, handleTextInput, handleSubmitInput
  }

  return (
    <GlobalContext.Provider value = {{magicProps}} >
      <div className="App">
        <Navbar />
        <Dashboard />
      </div>
    </GlobalContext.Provider>
  );
}

export default App;
