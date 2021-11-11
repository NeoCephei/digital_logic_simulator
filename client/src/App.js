import './App.css';

import Graph from 'graphology';

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

  //Graph const
  // eslint-disable-next-line no-unused-vars
  const graph = new Graph({multi: true, allowSelfLoops: false, type: 'directed'});

  //Refs
  const dragItem = useRef(null)
  const dropZone = useRef(null)

  //States
  const [componentName, setComponentName] = useState('');
  const [inputs, setInputs] = useState([])
  const [outputs, setOutputs] = useState([])
  const [board, setBoard] = useState([])
  const [componentList, setComponentList] = useState([
    {
      name: 'And',
      nInputs: 2,
      nOutputs: 1,
      formula: '&',
      bgColor: '#2F87B0'
    },
    {      
      name: 'Not',
      nInputs: 1,
      nOutputs: 1,
      formula: '~',
      bgColor: '#9C241B'
    }
  ])

  //Injected functions
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
    const {ninputs, noutputs, formula} = e.target.attributes //Like this i can access LC from selector
    console.clear()
    console.log(e)
    console.log(e.target.attributes)

    console.log('Inputs: ',ninputs,' Outputs: ',noutputs,' Formula: ',formula)
  }

  // // Handlers
  function handleTextInput (e) {
    setComponentName(e.target.value)
  }
  function handleSubmitInput (e) {
    e.preventDefault();
    if (componentName.length < 1) {
      alert('Please write a name');
      // I should also check that nInputs and nOutputs is bigger than 0 and is connected!
    } else {
      const palette = [
        '#011627',
        // '#FDFFFC', This is white... I dont want white yet
        '#2EC4B6',
        '#E71D36',
        '#FF9F1C'
      ]

      const newComponent = {
        name: componentName, 
        nInputs: inputs.length,
        nOutputs: outputs.length,
        formula: 'customFormula', //The formula should be connected based on the path and the components used
        bgColor: palette[Math.floor(Math.random()*palette.length)]
      }

      setComponentList([...componentList, newComponent])
      setComponentName('')
      setInputs([])
      setOutputs([])
    }
  }
  function handleDragStart(e) {
    dragItem.current = e;
    dragItem.current.target.addEventListener('dragend', handleDragEnd);
  }
  function handleDragEnter (e) {
    if (e.target.classList.contains('creator_board')) {
      dropZone.current = e;
    }
  }
  function handleDragEnd(e) {
    if(!dropZone.current) {
      return;
    }
    //dragItem && dropZone are the events, to acces the div need to check .target
    const a = dragItem.current
    const b = dropZone.current
    console.log(a.target.attributes)
    const {ninputs, noutputs, formula, bgcolor} = a.target.attributes

    const node = {
      name: a.target.innerText,
      relTop: e.clientY- b.target.offsetTop,
      relLeft: e.clientX - b.target.offsetLeft,
      ninputs, 
      noutputs, 
      formula: formula.value,
      bgcolor: bgcolor.value
    }

    setBoard([...board,node])

    dragItem.current.target.removeEventListener('dragend', handleDragEnd);
    dragItem.current = null;
    dropZone.current = null;
  }

  //Massive object to pass props
  //I have to make all the calls as cb inside the jsx of each component
  const magicProps = {
    inputs, customInputFn, //lc_inputs component props
    outputs, customOutputFn, //lc_outputs component props
    board, customBoardFn, handleDragEnter, handleDragEnd,//lc_board component props
    componentName, handleTextInput, handleSubmitInput, //lc_form component props
    componentList, customSelectorFn, handleDragStart, //lc_selector component props
  }

  //Render
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
