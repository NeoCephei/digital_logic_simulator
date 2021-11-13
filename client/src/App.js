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
      /*{
        key: 'input_n0 || output_n0' || 'nodeComponent_name_number_I||O_number', --> nodeComponent_And_0_I_1
        attributes: {}
      }*/
    ],
    edges: [
      /* {
        key: 'n0->n1',
        source: 'n0',
        target: 'n1',
        attributes: {
          x1 : firstCoord.x,
          x2 : secondCoord.x,
          y1 : firstCoord.y,
          y2 : secondCoord.y,
          key: `${firstCoord.source}->${secondCoord.target}`,
          source: firstCoord.source,
          target: secondCoord.target,
          color: '#fff'
        }
      }*/
    ]
  }
  //Refs
  const dragItem = useRef(null)
  const dropZone = useRef(null)

  //States
  const [realGraph , setRealGraph] = useState(defaultGraph)
  
  const [firstCoord, setFirstCoord] = useState({x: -1, y: -1, source: ''})
  const [componentName, setComponentName] = useState('');
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
  function activateNode(keyNode) {
    const tKey = keyNode.split('_').slice(0, 4).join('_');
    console.log(tKey)
    const rG = {...realGraph}
    const oldNodes = [...rG.nodes]; 
    // targetNodes = oldNodes.filter(node => node.key.split('_').slice(0, 5).join('_'))
  }


  //Injected functions
  function customInputFn (e) { //Create input node in graph
    if (e.target.classList.contains('input_circle')) { //Have to activate or remove node
      const dotIndex = Number(e.target.attributes.key_num.value);
      const rG = {...realGraph}
      const oldInputNodes = [...rG.nodes];

      if (e.ctrlKey) { //remove node
        // remove node graph
        const newNodes = oldInputNodes.filter(node => node.key !== `input_n${dotIndex}`)
        rG.nodes = [...newNodes];
        // remove edge from graph
        const oldEdges = [...rG.edges]
        const newEdges = oldEdges.filter(edge => edge.source !== `input_n${dotIndex}` && edge.target !== `input_n${dotIndex}`)
        rG.edges = [...newEdges]
        setRealGraph(rG)

      } else { //activate node
        const targetInput = oldInputNodes.filter(i => i.key === `input_n${dotIndex}`)[0];
        targetInput.attributes.activated = !targetInput.attributes.activated
        const newInputs = oldInputNodes.filter(i => i.key !== `input_n${dotIndex}`);

        //This should create a path of all the nodes and edges connected to input and activate them
        const edges = [...rG.edges]
        const targetLine = edges.filter(line => line.source === `input_n${dotIndex}`)
        // const targetLine = oldLines.filter(line => line.source === `input_n${dotIndex}` || line.target === `input_n${dotIndex}`)
        
        for (let i = 0; i < targetLine.length; i++) {
          if (targetLine[i].attributes.color === '#fff') targetLine[i].attributes.color = '#ec2239';
          else targetLine[i].attributes.color = '#fff';

          activateNode(targetLine[i].target)
        }

        const newLines = edges.filter(line => line.source !== `input_n${dotIndex}`)
        // const newLines = oldLines.filter(line => line.source !== `input_n${dotIndex}` && line.target !== `input_n${dotIndex}`)

        rG.edges = [...newLines, ...targetLine];
        rG.nodes = [...newInputs, targetInput];
        setRealGraph(rG);










        
      }
    } else if (e.target.classList.contains('small_dot')) { //Prevent default and overlapping
      // I COULD TRY TO DO STH HERE
    } else { //Create input node
      //add node to graph
      const rG = {...realGraph}
      const keyNum = rG.attributes.n_input_Nodes
      //Position of mouse - parentDiv offsetTop - circle.height/2
      const relativeTop = e.clientY - e.target.offsetTop - 10;
      const newNode = {
        key: `input_n${keyNum}`,
        attributes: {
          cNode: keyNum, 
          top: relativeTop, 
          left: '-10px', 
          activated: false
        }
      };
      rG.attributes.n_input_Nodes++;
      rG.nodes.push(newNode);

      setRealGraph(rG)
    }
  }
  function customOutputFn (e) { //Create output node in graph
    if (e.target.classList.contains('output_circle')) { //Have to remove node
      const dotIndex = Number(e.target.attributes.key_num.value);
      const rG = {...realGraph}
      // remove node from graph
      const oldOutputNodes = [...rG.nodes];
      const newNodes = oldOutputNodes.filter(node => node.key !== `output_n${dotIndex}`)
      rG.nodes = [...newNodes];
      // remove edge from graph
      const oldEdges = [...rG.edges]
      const newEdges = oldEdges.filter(edge => edge.source !== `output_n${dotIndex}` && edge.target !== `output_n${dotIndex}`)
      rG.edges = [...newEdges]
      setRealGraph(rG)
    } else if (e.target.classList.contains('small_output_dot')) { //Prevent default and overlapping
      // I COULD TRY TO DO STH HERE
    } else { //Create input node
      //add node to graph
      const rG = {...realGraph}
      const keyNum = rG.attributes.n_output_Nodes;
      const relativeTop = e.clientY - e.target.offsetTop - 10; //Position of mouse - parentDiv offsetTop - circle.height/2
      const newNode = {
        key: `output_n${keyNum}`,
        attributes: {
          cNode: keyNum, 
          top: relativeTop, 
          right: '-10px', 
          activated: false}
      }
      rG.attributes.n_output_Nodes++;
      rG.nodes.push(newNode);
      setRealGraph(rG)
    }
  }
  function customBoardFn (e) { //Removes component from board

    if(e.target.className === 'board_item'){      
      if (e.ctrlKey) {
        //should find all the nodes of the item, and remove all the edges attach to them
        const itemIdentifier = e.target.attributes.board_item_identifier.value;
        const itemInputs = e.target.attributes.ninputs.value;
        const itemOutputs = e.target.attributes.noutputs.value;

        // Removing from graph and removing from lines
        const rG = {...realGraph}
        let oldNodes = [...rG.nodes];
        let oldEdges = [...rG.edges]


        for (let i = 0; i < itemInputs; i++) {
          const identifier = `nodeComponent_${itemIdentifier}_I_${i}`;
          //Remove Edges from rGEdges
          const midEdges = oldEdges.filter(edge => edge.source !== identifier && edge.target !== identifier);
          oldEdges = [...midEdges]
          //Remove Nodes from rGNodes
          const midNodes = oldNodes.filter(node => node.key !== identifier)
          oldNodes = [...midNodes];
        }

        for (let i = 0; i < itemOutputs; i++) {
          const identifier = `nodeComponent_${itemIdentifier}_O_${i}`;
          //Remove Edges from rGEdges
          const midEdges = oldEdges.filter(edge => edge.source !== identifier && edge.target !== identifier);
          oldEdges = [...midEdges]
          //Remove Nodes from rGNodes
          const midNodes = oldNodes.filter(node => node.key !== identifier)
          oldNodes = [...midNodes];
        }

        rG.nodes = [...oldNodes];
        rG.edges = [...oldEdges];

        setRealGraph(rG)
      }
    }
  }
  function edgeCreator(e) { //Creates an edge in state and graph
    // I know the offSet is x:30 y:166 cause the board offSet but I should be able to get it anyway from event
    const boardOffset = {x: 30, y: 166}
    const identifier = e.target.attributes.identifier.value;

    if (firstCoord.x < 0 && firstCoord.y < 0) {
      setFirstCoord({x:e.clientX - boardOffset.x , y:e.clientY - boardOffset.y, source: identifier});
    } else {
      const secondCoord = {x:e.clientX - boardOffset.x, y:e.clientY - boardOffset.y, target: identifier}
      const edge = {
        key: `${firstCoord.source}->${secondCoord.target}`,
        source: firstCoord.source,
        target: secondCoord.target,
        attributes: {
          x1 : firstCoord.x,
          x2 : secondCoord.x,
          y1 : firstCoord.y,
          y2 : secondCoord.y,
          key: `${firstCoord.source}->${secondCoord.target}`,
          source: firstCoord.source,
          target: secondCoord.target,
          color: '#fff'
        }
      }
      const rG = {...realGraph};
      rG.edges.push(edge);

      setFirstCoord({x: -1, y: -1, source: ''})
      setRealGraph(rG)
    }
  }
  function customSelectorFn (e) { //Removes component from selector
    const name = e.target.innerText;
    if (name === 'And' || name === 'Not') return
    if (e.ctrlKey) {
      const list = [...componentList];
      const newList = list.filter(comp => comp.name !== name);

      // Have to remove nodes from graph





      setComponentList(newList);
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
      // And also be sure that there are inputs >= outputs
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

      const rG = {...realGraph}
      const rGNodes = [...rG.nodes]
      const inputs = rGNodes.filter(node => node.key.split('_').includes('input'))
      const outputs = rGNodes.filter(node => node.key.split('_').includes('output'))

      const newComponent = {
        name: componentName, 
        nInputs: inputs.length,
        nOutputs: outputs.length,
        formula: 'customFormula', //The formula should be connected based on the path and the components used
        bgColor: palette[Math.floor(Math.random()*palette.length)]
      }

      setComponentList([...componentList, newComponent])
      setComponentName('')
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
    //and also .target.parent node as the svg behind it to draw edges
    const a = dragItem.current
    const b = dropZone.current
    const {ninputs, noutputs, formula, bgcolor} = a.target.attributes;

    const name = a.target.innerText;
    const relTop = e.clientY- b.target.parentNode.offsetTop;
    const relLeft  = e.clientX - b.target.parentNode.offsetLeft;

    const rG = {...realGraph}
    const nodes = [...rG.nodes]

    const components = nodes.filter(node => node.key.split('_').includes('nodeComponent'))
    const counter = filterInputs(components)

    // This function keeps track of numbers of same item on board using graph nodes
    function filterInputs(components) {
      const keys = [];
      components.forEach(input => keys.push(input.key.split('_').slice(0, 3).join('_')));
      const uniques = [...new Set(keys)]
      const filter = uniques.filter(el => el.split('_')[1] === name)
      return filter;
    }

    //add nodes to graph
    const componentNodes = [];
    const nI = ninputs.value
    const nO = noutputs.value
    const inputState = Array(Number(nI)).fill(false)
    // output should be calculated from input based on formula?
    let x;
    if (Number(nI) === 1) {
      x = !inputState[0]
    } else {
      x = inputState.reduce((a,b) => a*b)
    }
    // This only works for not and and
    const outputState = Array(Number(nO)).fill(x);

    for (let i = 0; i < nI; i++) {
      componentNodes.push({
        key:`nodeComponent_${name}_${counter.length}_I_${i}`,
        attributes: {
          name: name,
          nComponent: counter.length,
          relTop,
          relLeft,
          ninputs, 
          noutputs, 
          formula: formula.value,
          bgcolor: bgcolor.value,
          inputState,
          outputState
        }
      })
    }
    for (let i = 0; i < nO; i++) {
      componentNodes.push({
        key:`nodeComponent_${name}_${counter.length}_O_${i}`,
        attributes: {
          name: name,
          nComponent: counter.length,
          relTop: e.clientY- b.target.parentNode.offsetTop,
          relLeft: e.clientX - b.target.parentNode.offsetLeft,
          ninputs, 
          noutputs, 
          formula: formula.value,
          bgcolor: bgcolor.value,
          inputState,
          outputState
        }
      })
    }

    rG.nodes = [...nodes, ...componentNodes];

    setRealGraph(rG)

    dragItem.current.target.removeEventListener('dragend', handleDragEnd);
    dragItem.current = null;
    dropZone.current = null;
  }


  //Massive object to pass props
  const magicProps = {
    realGraph, edgeCreator, //common for lc_inputs lc_outputs lc_board
    customInputFn, //lc_inputs component props ... inputs
    customOutputFn, //lc_outputs component props
    customBoardFn, handleDragEnter, handleDragEnd,//lc_board component props
    componentList, customSelectorFn, handleDragStart, //lc_selector component props
    componentName, handleTextInput, handleSubmitInput, //lc_form component props
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