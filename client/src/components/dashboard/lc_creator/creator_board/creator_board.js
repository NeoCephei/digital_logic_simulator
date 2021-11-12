import './creator_board.css'
import React, {useContext}from 'react'

import globalContext from '../../../../services/globalContext'

function CreatorBoard (props) {

  const {magicProps} = useContext(globalContext);
  const {board, customBoardFn, handleDragEnter, handleDragEnd} = magicProps;

  return (
    <div id="creator_board" className="creator_board" onDragEnter={(e)=>{handleDragEnter(e)}} onDragEnd={(e)=>{handleDragEnd(e)}}>
      {board.map((item,index) => {
        const nInputs = item.ninputs.value;
        const nOutputs = item.noutputs.value;
        const itemHeight = `${Math.max(nInputs,nOutputs)*30}px`;

        const inputDiv = [];
        for (let i = 0; i < nInputs; i++) {
          inputDiv.push(<div className="nodeComponent" id={i} key={i} />);
        }

        const outputDiv = [];
        for (let i = 0; i < nOutputs; i++) {
          outputDiv.push(<div className="nodeComponent" id={i} key={i} />);
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
      <svg className="line_holder"></svg>
    </div>
  )
}

export default CreatorBoard;