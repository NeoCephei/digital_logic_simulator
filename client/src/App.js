import './App.css';

// import cytoscape from 'cytoscape';
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
  const graph = new Graph({multi: true, allowSelfLoops: false, type:'directed'});
  const defaultGraph = {
    attributes: {
      name: 'My Graph',
      n_input_Nodes: 0,
      n_output_Nodes: 0,
      n_Edges: 0
    },
    nodes: [
      // {key: 'n0'}, {key: 'input_n0 || output_n0'} for inputs and outputs
      // {key: 'n1'}
    ],
    edges: [
      // {
      //   key: 'n0->n1',
      //   source: 'n0',
      //   target: 'n1',
      //   attributes: {type: 'KNOWS'}
      // }
    ]
  }
  //Refs
  const dragItem = useRef(null)
  const dropZone = useRef(null)

  //States
  const [realGraph , setRealGraph] = useState(defaultGraph)
  const [edges, setEdges] = useState([])
  const [firstCoord, setFirstCoord] = useState({x: -1, y: -1, source: ''})
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
      bgColor: '#43AA8B'
    },
    {      
      name: 'Not',
      nInputs: 1,
      nOutputs: 1,
      formula: '~',
      bgColor: '#F94144'
    }
  ])

  //Functional functions

  //Injected functions
  function customInputFn (e) { //Create input circle and node in graph
    if (e.target.classList.contains('input_circle')) {
      const dotIndex = e.target.attributes.key_num.value*1;
      if (e.ctrlKey) { //remove node
        const oldInputs = [...inputs];
        const newInputs = oldInputs.filter(i => i.cNode !== dotIndex);
        // remove node and edge from graph
        const rG = {...realGraph}
        const oldInputNodes = [...rG.nodes];
        const newNodes = oldInputNodes.filter(node => node.key !== `input_n${dotIndex}`)
        rG.nodes = [...newNodes];
        const oldEdges = [...rG.edges]
        const newEdges = oldEdges.filter(edge => edge.source !== `input_n${dotIndex}` && edge.target !== `input_n${dotIndex}`)
        rG.edges = [...newEdges]
        //should remove edges from state
        const oldLines = [...edges];
        const newLines = oldLines.filter(line => line.source !== `input_n${dotIndex}` && line.target !== `input_n${dotIndex}`)

        setEdges([...newLines]);
        setInputs(newInputs);
        setRealGraph(rG)
      } else {
        const oldInputs = [...inputs];
        const targetInput = oldInputs.filter(i => i.cNode === dotIndex)[0];
        targetInput.activated = !targetInput.activated
        const newInputs = oldInputs.filter(i => i.cNode !== dotIndex);

        const oldLines = [...edges];
        const targetLine = oldLines.filter(line => line.source === `input_n${dotIndex}` || line.target === `input_n${dotIndex}`)
        
        for (let i = 0; i < targetLine.length; i++) {
          if (targetLine[i].color === '#fff') targetLine[i].color = '#ec2239'
          else targetLine[i].color = '#fff'
        }

        const newLines = oldLines.filter(line => line.source !== `input_n${dotIndex}` && line.target !== `input_n${dotIndex}`)

        setEdges([...newLines, ...targetLine])
        setInputs([...newInputs, targetInput]);
      }
    } else if (e.target.classList.contains('small_dot')) {
      // I COULD TRY TO DO STH HERE
    } else {
      //add node to graph
      const rG = {...realGraph}
      const keyNum = rG.attributes.n_input_Nodes
      const newNode = {key: `input_n${keyNum}`};
      rG.attributes.n_input_Nodes++;
      rG.nodes.push(newNode);
      //Position of mouse - parentDiv offsetTop - circle.height/2
      const relativeTop = e.clientY - e.target.offsetTop - 10;
      const newDot = {cNode: keyNum, top: relativeTop, left: '-10px', activated: false}
      setRealGraph(rG)
      setInputs([...inputs, newDot]);
    }
  }
  function customOutputFn (e) { //Create output circle and node in graph
    if (e.target.classList.contains('output_circle')) {
      const dotIndex = e.target.attributes.key_num.value*1;
      const oldOutputs = [...outputs];
      const newOutputs = oldOutputs.filter(i => i.cNode !== dotIndex);
      // remove node and edge from graph
      const rG = {...realGraph}
      const oldOutputNodes = [...rG.nodes];
      const newNodes = oldOutputNodes.filter(node => node.key !== `output_n${dotIndex}`)
      rG.nodes = [...newNodes];
      const oldEdges = [...rG.edges]
      const newEdges = oldEdges.filter(edge => edge.source !== `output_n${dotIndex}` && edge.target !== `output_n${dotIndex}`)
      rG.edges = [...newEdges]
      //should remove edges from state
      const oldLines = [...edges];
      const newLines = oldLines.filter(line => line.source !== `output_n${dotIndex}` && line.target !== `output_n${dotIndex}`)

      setEdges([...newLines]);
      setRealGraph(rG)
      setOutputs(newOutputs);
    } else if (e.target.classList.contains('small_output_dot')) {
      // I COULD TRY TO DO STH HERE
    } else {
      //add node to graph
      const rG = {...realGraph}
      const keyNum = rG.attributes.n_output_Nodes;
      const newNode = {key: `output_n${keyNum}`}
      rG.attributes.n_output_Nodes++;
      rG.nodes.push(newNode);

      //Position of mouse - parentDiv offsetTop - circle.height/2
      const relativeTop = e.clientY - e.target.offsetTop - 10;
      const newDot = {cNode: keyNum, top: relativeTop, right: '-10px', activated: false}
      setRealGraph(rG)
      setOutputs([...outputs, newDot]);
    }
  }
  function customBoardFn (e) { //Removes component from board
    if(e.target.className === 'board_item'){
      const boardItemID = e.target.attributes.board_item_id.value;
      if (e.ctrlKey) {
        const newBoard = [...board];
        // eslint-disable-next-line no-unused-vars
        const removeIndexItem = newBoard.splice(boardItemID, 1);
        setBoard(newBoard)
      }
    }
  }
  function customSelectorFn (e) { //Removes component from selector
    const name = e.target.innerText;
    if (name === 'And' || name === 'Not') return
    if (e.ctrlKey) {
      const list = [...componentList];
      const newList = list.filter(comp => comp.name !== name);
      const tBoard = [...board]
      const newBoard = tBoard.filter(item => item.name !== name);
      setComponentList(newList);
      setBoard(newBoard);
    }
  }

  // // Handlers
  function handleTextInput (e) { //Sets the componentName state (input text)
    setComponentName(e.target.value)
  }
  function handleSubmitInput (e) { //Actions to be done when press btn "Create"
    e.preventDefault();

    const g = graph.import(realGraph)
    console.log('Graph Nodes: ',g.nodes(), 'Graph Edges: ',g.edges());
    // I can work with the graph here to make checks

    if (componentName.length < 1 || componentName === 'And' || componentName === 'Not') {
      alert('Please write a valid name');
      // I should also check that nInputs and nOutputs is bigger than 0 and is connected!
    } else {
      const palette = [
        '#F94144',
        '#F3722C',
        '#F8961E',
        '#F9844A',
        '#F9C74F',
        '#90BE6D',
        '#43AA8B',
        '#4D908E',
        '#577590',
        '#277DA1'
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
      setEdges([])
      setBoard([])
      setRealGraph(defaultGraph)
    }
  }
  function handleDragStart(e) { //Handle DragStart from selector
    dragItem.current = e;
    dragItem.current.target.addEventListener('dragend', handleDragEnd);
  }
  function handleDragEnter (e) { //Checks if you enter the board while dragging
    if (e.target.parentNode.classList.contains('creator_board')) {
      dropZone.current = e;
    }
  }
  function handleDragEnd(e) { //Fires when "drop"
    if(!dropZone.current) {
      return;
    }
    //dragItem && dropZone are the events, to acces the div need to check .target
    //and also .target.parent node as the svg is on front
    const a = dragItem.current
    const b = dropZone.current
    const {ninputs, noutputs, formula, bgcolor} = a.target.attributes;

    const tmpBoard = [...board];
    const name = a.target.innerText;
    const counter = tmpBoard.filter(n => n.name === name);

    const node = {
      name: name,
      nComponent: counter.length,
      relTop: e.clientY- b.target.parentNode.offsetTop,
      relLeft: e.clientX - b.target.parentNode.offsetLeft,
      ninputs, 
      noutputs, 
      formula: formula.value,
      bgcolor: bgcolor.value
    }

    //add node to graph
    const componentNodes = [];
    const nI = ninputs.value
    const nO = noutputs.value

    for (let i = 0; i < nI; i++) {
      componentNodes.push({key:`nodeComponent_${name}_${counter.length}_I_${i}`})
    }
    for (let i = 0; i < nO; i++) {
      componentNodes.push({key:`nodeComponent_${name}_${counter.length}_O_${i}`})
    }
    const rG = {...realGraph};
    const rGNodes = [...rG.nodes];
    rG.nodes = [...rGNodes, ...componentNodes];

    setRealGraph(rG)
    setBoard([...board,node])

    dragItem.current.target.removeEventListener('dragend', handleDragEnd);
    dragItem.current = null;
    dropZone.current = null;
  }
  function edgeCreator(e) {
    // I know the offSet is x:30 y:166 cause the board offSet but I should be able to get it anyway
    const boardOffset = {x: 30, y: 166}
    const identifier = e.target.attributes.identifier.value;

    if (firstCoord.x < 0 && firstCoord.y < 0) {
      setFirstCoord({x:e.clientX - boardOffset.x , y:e.clientY - boardOffset.y, source: identifier});
    } else {
      const secondCoord = {x:e.clientX - boardOffset.x, y:e.clientY - boardOffset.y, target: identifier}
      const newLine = {
        x1 : firstCoord.x,
        x2 : secondCoord.x,
        y1 : firstCoord.y,
        y2 : secondCoord.y,
        key: `${firstCoord.source}->${secondCoord.target}`,
        source: firstCoord.source,
        target: secondCoord.target,
        color: '#fff'
      }

      const edge = {
        key: `${firstCoord.source}->${secondCoord.target}`,
        source: firstCoord.source,
        target: secondCoord.target,
      }
      const rG = {...realGraph};
      rG.edges.push(edge);

      setEdges([...edges, newLine])
      setFirstCoord({x: -1, y: -1, source: ''})
      setRealGraph(rG)
    }
  }


  //Massive object to pass props
  const magicProps = {
    edgeCreator, //common for lc_inputs lc_outputs lc_board
    inputs, customInputFn, //lc_inputs component props
    outputs, customOutputFn, //lc_outputs component props
    board, edges, customBoardFn, handleDragEnter, handleDragEnd,//lc_board component props
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