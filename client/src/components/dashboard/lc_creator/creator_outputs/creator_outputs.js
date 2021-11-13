import './creator_outputs.css'
import React, {useContext} from 'react'

import globalContext from '../../../../services/globalContext'

function CreatorOutputs () {

  const {magicProps} = useContext(globalContext)
  const {realGraph, customOutputFn, edgeCreator} = magicProps

  const nodes = [...realGraph.nodes]
  const outputs = nodes.filter(node => node.key.split('_').includes('output'))

  return (
    <div id="creator_outputs" className="creator_outputs creator_redzone" onClick={(e)=>{customOutputFn(e)}}>
      {outputs.map((dot,index) => {
        return (
          <div 
            key = {index}
            key_num = {dot.attributes.cNode}
            dot_id = {index}
            className = 'output_circle' 
            style = {{
              top: dot.attributes.top, 
              right: dot.attributes.right,
            }}>
            <div className = 'small_output_dot' 
              key_num = {dot.attributes.cNode}
              identifier = {`output_n${dot.attributes.cNode}`}
              onClick={(e)=>{edgeCreator(e)}}
            />
          </div>
        )
      })}
    </div>
  )
}

export default CreatorOutputs;