import './creator_board.css'
import React, {useContext}from 'react'

import globalContext from '../../../../services/globalContext'

function CreatorBoard (props) {

  const {magicProps} = useContext(globalContext)

  return (
    <div id="creator_board" className="creator_board">
      <h1>Hello from CREATOR_BOARD</h1>
    </div>
  )
}

export default CreatorBoard;