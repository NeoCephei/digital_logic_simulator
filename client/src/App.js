import './App.css';

import React, {useState, useRef} from 'react'
import GlobalContext from './services/globalContext'
// Import Components here
import Navbar from './components/navbar/navbar'
import Dashboard from './components/dashboard/dashboard';

function App() {
  /*
  In the meantine Im gonna keep all the states and functions here in the app and pass everything
  using the globalContext. This

  For future I will deal with all the states using redux, 
  and have all functions in a helpers repo/file and inject them using globalContext
  */
  const [componentName, setComponentName] = useState('');
  const [inputs, setInputs] = useState([])
  const [outputs, setOutputs] = useState([])
  const [board, setBoard] = useState([])
  const [componentList, setComponentList] = useState([
    {
      name: 'AND',
      nInputs: 2,
      nOutputs: 1,
      formula: undefined,
    },
    {      
      name: 'NOT',
      nInputs: 1,
      nOutputs: 1,
      formula: undefined,
    }
  ])

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
  function customBoardFn (e) {

  }
  function customSelectorFn (e) {
    console.clear()
    console.log(e)
    const ninputs = e.target.attributes.ninputs
    const noutputs = e.target.attributes.noutputs

    console.log('Inputs: ',ninputs)
    console.log('Outputs: ',noutputs)
  }
  function handleTextInput (e) {
    setComponentName(e.target.value)
  }
  function handleSubmitInput (e) {
    e.preventDefault();
    if (componentName.length < 1) {
      alert('Please write a name');
      // I should also check that nInputs and nOutputs is bigger than 0 and is connected!
    } else {
      const newComponent = {
        name: componentName, 
        nInputs: inputs.length,
        nOutputs: outputs.length,
        formula: undefined
      }

      setComponentList([...componentList, newComponent])
      setComponentName('')
      setInputs([])
      setOutputs([])
    }
  }

  const magicProps = {
    inputs, customInputFn,
    outputs, customOutputFn,
    board, customBoardFn,
    componentName, handleTextInput, handleSubmitInput,
    componentList, customSelectorFn,
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
