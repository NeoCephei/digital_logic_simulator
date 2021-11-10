import './creator_inputs.css'
import React, {useContext} from 'react'

import globalContext from '../../../../services/globalContext'

function CreatorInputs (props) {

  const {magicProps} = useContext(globalContext)
  const {inputs, customInputFn} = magicProps

  function customFn (e) {
    customInputFn(e);
  }

  return (
    <div id="creator_inputs" className="creator_inputs creator_redzone" onClick={customFn}>
      {inputs.map((dot,index) => {
        return (
          <div 
            key = {index}
            dot_id = {index}
            className = {!dot.activated ? 'input_circle' : 'input_circle circle_activated'} 
            style = {{
              top: dot.top, 
              left: dot.left,
              }}>
          </div>
        )
      })}
    </div>
  )
}

export default CreatorInputs;