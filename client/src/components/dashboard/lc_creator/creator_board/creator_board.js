import './creator_board.css'
import React, {useContext}from 'react'

import globalContext from '../../../../services/globalContext'

function CreatorBoard (props) {

  const {magicProps} = useContext(globalContext);
  const {board, customBoardFn, handleDragEnter, handleDragEnd} = magicProps;

  function entering (e) {
    handleDragEnter(e);
  }
  function dropping (e) {
    handleDragEnd(e);
  }

  return (
    <div id="creator_board" className="creator_board" onDragEnter={entering} onDragEnd={dropping}>
      {board.map((item,index) => {
        return (
          <div 
            key = {index}
            dot_id = {index}
            className = 'board_item' 
            style = {{
              top: item.relTop, 
              left: item.relLeft,
              backgroundColor: item.bgcolor
              }}>
            {item.name}
          </div>
        )
      })}
    </div>
  )
}

export default CreatorBoard;