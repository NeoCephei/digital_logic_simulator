import './creator_outputs.css'
import React, {useContext} from 'react'

import globalContext from '../../../../services/globalContext'

function CreatorOutputs (props) {

  const {magicProps} = useContext(globalContext)
  const {outputs, customOutputFn} = magicProps

  return (
    <div id="creator_outputs" className="creator_outputs creator_redzone" onClick={(e)=>{customOutputFn(e)}}>
      {outputs.map((dot,index) => {
        return (
          <div 
            key = {index}
            key_num = {dot.cNode}
            dot_id = {index}
            className = 'output_circle' 
            style = {{
              top: dot.top, 
              right: dot.right,
            }}>
            <div className = 'small_output_dot' key_num = {dot.cNode}/>
          </div>
        )
      })}
    </div>
  )
}

export default CreatorOutputs;