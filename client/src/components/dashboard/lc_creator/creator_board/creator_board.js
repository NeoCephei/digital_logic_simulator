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
      <h1>Hello from CREATOR_BOARD</h1>
    </div>
  )
}

export default CreatorBoard;