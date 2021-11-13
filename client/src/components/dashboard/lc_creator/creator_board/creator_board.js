import './creator_board.css'
import React, {useContext}from 'react'

import globalContext from '../../../../services/globalContext'

function CreatorBoard () {

  const {magicProps} = useContext(globalContext);
  const {realGraph, customBoardFn, handleDragEnter, handleDragEnd, edgeCreator} = magicProps;

  const nodes = [...realGraph.nodes]
  const edges = [...realGraph.edges]

  // I need to figure it out how to get all the nodes that are nodeComponent only
  // were its attributes will be the nodes I need for board, so I can get rid of board
  const components = nodes.filter(node => node.key.split('_').includes('nodeComponent'))
  const uniqueElements = filterNodes(components)

  // Gets array of components node and returns unique values
  function filterNodes(components) {
    const keys = [];
    components.forEach(input => keys.push(input.key.split('_').slice(0, 3).join('_')));
    const filter = [...new Set(keys)]
    const uniqComponents = []
    filter.forEach(key => {
      uniqComponents.push(components.find(i => i.key.split('_').slice(0, 3).join('_') === key))
    })
    return uniqComponents;
  }

  // Creates a board based on the attributes
  const board = []
  uniqueElements.forEach(i => board.push(i.attributes))

  return (
    <div id="creator_board" className="creator_board" onDragEnter={(e)=>{handleDragEnter(e)}} onDragEnd={(e)=>{handleDragEnd(e)}}>
      {board.map((item,index) => {
        const nInputs = item.ninputs.value;
        const nOutputs = item.noutputs.value;
        const itemHeight = `${Math.max(nInputs,nOutputs)*30}px`;

        const inputDiv = [];
        for (let i = 0; i < nInputs; i++) {
          inputDiv.push(<div className="nodeComponent" id={i} key={i} 
          identifier={`nodeComponent_${item.name}_${item.nComponent}_I_${i}`}
          onClick={(e)=>{edgeCreator(e)}}/>);
        }
        const outputDiv = [];
        for (let i = 0; i < nOutputs; i++) {
          outputDiv.push(<div className="nodeComponent" id={i} key={i} 
          identifier={`nodeComponent_${item.name}_${item.nComponent}_O_${i}`}
          onClick={(e)=>{edgeCreator(e)}}/>);
        }

        return (
          <div 
            key = {index}
            board_item_id = {index}
            board_item_identifier = {`${item.name}_${item.nComponent}`}
            ninputs = {nInputs}
            noutputs = {nOutputs}
            className = 'board_item'
            onClick={(e)=>{customBoardFn(e)}}
            style = {{
              top: item.relTop, 
              left: item.relLeft,
              backgroundColor: item.bgcolor,
              height: itemHeight,
              lineHeight: itemHeight,
            }}
          >
            {item.name}
          <div className="item_inputs" 
            style = {{
              height: itemHeight,
            }}
          >
            {inputDiv}
          </div>
          <div className="item_outputs" 
            style = {{
              height: itemHeight,
            }}
          >
            {outputDiv}
          </div>
          </div>
        )
      })}
      <svg className="line_holder">
        {edges.map((line,i) => {
          return (
            <line key={i} 
              x1={line.attributes.x1} y1={line.attributes.y1} x2={line.attributes.x2} y2={line.attributes.y2}
              identifier = {line.attributes.key}
              style={{stroke: line.attributes.color, strokeWidth: 1.5}}
            />
          )
        })}
      </svg>
    </div>
  )
}

export default CreatorBoard;