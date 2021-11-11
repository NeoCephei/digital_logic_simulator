import './creator_board.css'
import React, {useContext}from 'react'

import globalContext from '../../../../services/globalContext'

function CreatorBoard (props) {

  const {magicProps} = useContext(globalContext);
  const {board, customBoardFn, handleDragEnter, handleDragEnd} = magicProps;

  return (
    <div id="creator_board" className="creator_board" onDragEnter={(e)=>{handleDragEnter(e)}} onDragEnd={(e)=>{handleDragEnd(e)}}>
      {board.map((item,index) => {
        const itemHeight = `${Math.max(item.ninputs.value,item.noutputs.value)*30}px`;
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
              }}>
            {item.name}
            
          </div>
        )
      })}
    </div>
  )
}

export default CreatorBoard;