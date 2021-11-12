import './creator_board.css'
import React, {useContext}from 'react'

import globalContext from '../../../../services/globalContext'

function CreatorBoard (props) {

  const {magicProps} = useContext(globalContext);
  const {board, edges, customBoardFn, handleDragEnter, handleDragEnd, edgeCreator} = magicProps;

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
              x1={line.x1} y1={line.y1} x2={line.x2} y2={line.y2}
              identifier = {line.key}
              style={{stroke: line.color, strokeWidth: 1.5}}
            />
          )
        })}
      </svg>
    </div>
  )
}

export default CreatorBoard;