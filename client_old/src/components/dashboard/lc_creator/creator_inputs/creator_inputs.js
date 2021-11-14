import './creator_inputs.css'
import React, {useContext} from 'react'

import globalContext from '../../../../services/globalContext'

function CreatorInputs () {
  // console.clear()
  const {magicProps} = useContext(globalContext)
  const {realGraph, customInputFn, edgeCreator} = magicProps

  const nodes = [...realGraph.nodes]
  const inputs = nodes.filter(node => node.key.split('_').includes('input'))

  return (
    <div id="creator_inputs" className="creator_inputs creator_redzone" onClick={(e)=>{customInputFn(e)}}>
      {inputs.map((dot,index) => {
        return (
          <div 
            key = {index}
            key_num = {dot.attributes.cNode}
            dot_id = {index}
            className = {!dot.attributes.activated ? 'input_circle' : 'input_circle circle_activated'} 
            style = {{
              top: dot.attributes.top, 
              left: dot.attributes.left,
            }}>
            <div className = {!dot.attributes.activated ? 'small_dot' : 'small_dot dot_activated'} 
              key_num = {dot.attributes.cNode}
              identifier = {`input_n${dot.attributes.cNode}`}
              onClick={(e)=>{edgeCreator(e)}}
            />
          </div>
        )
      })}
    </div>
  )
}

export default CreatorInputs;