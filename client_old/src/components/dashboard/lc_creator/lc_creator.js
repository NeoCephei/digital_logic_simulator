import './lc_creator.css'
import React from 'react'

//Import components here: (LC means LogicComponent)

/*
LC board/creator ---> This one have 3 sections (input, board, output)
*/
import CreatorInputs from './creator_inputs/creator_inputs'
import CreatorBoard from './creator_board/creator_board'
import CreatorOutputs from './creator_outputs/creator_outputs'


function LcCreator (props) {

  return (
    <div className="lc_creator">
      <CreatorInputs />
      <CreatorBoard />
      <CreatorOutputs />
    </div>
  )
}

export default LcCreator;