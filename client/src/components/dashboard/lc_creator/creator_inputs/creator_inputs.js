import './creator_inputs.css'
import React, {useContext} from 'react'

import globalContext from '../../../../services/globalContext'

function CreatorInputs (props) {

  const {magicProps} = useContext(globalContext)
  const {inputs, customInputFn, edgeCreator} = magicProps

  return (
    <div id="creator_inputs" className="creator_inputs creator_redzone" onClick={(e)=>{customInputFn(e)}}>
      {inputs.map((dot,index) => {
        return (
          <div 
            key = {index}
            key_num = {dot.cNode}
            dot_id = {index}
            className = {!dot.activated ? 'input_circle' : 'input_circle circle_activated'} 
            style = {{
              top: dot.top, 
              left: dot.left,
            }}>
            <div className = {!dot.activated ? 'small_dot' : 'small_dot dot_activated'} 
              key_num = {dot.cNode}
              onClick={(e)=>{edgeCreator(e)}}
            />
          </div>
        )
      })}
    </div>
  )
}

export default CreatorInputs;