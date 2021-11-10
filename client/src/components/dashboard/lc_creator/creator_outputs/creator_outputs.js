import './creator_outputs.css'
import React, {useState} from 'react'


function CreatorOutputs (props) {

  const [outputs, setOutputs] = useState([])

  function customFn (e) {
    if (e.target.classList.contains('output_circle')) {
      const dotIndex = e.target.attributes.dot_id.value;
      const newOutputs = [...outputs]
      // eslint-disable-next-line no-unused-vars
      const removeIndexItem = newOutputs.splice(dotIndex, 1);
      setOutputs(newOutputs);
    } else {
      //Position of mouse - parentDiv offsetTop - circle.height/2
      const relativeTop = e.clientY - e.target.offsetTop - 10;
      const newDot = {top: relativeTop, right: '-10px', activated: false}
      setOutputs([...outputs, newDot]);
    }
  }

  return (
    <div className="creator_outputs creator_redzone" onClick={customFn}>
      {outputs.map((dot,index) => {
        return (
          <div 
            key = {index}
            dot_id = {index}
            className = 'output_circle' 
            style = {{
              top: dot.top, 
              right: dot.right,
              }}>
          </div>
        )
      })}
    </div>
  )
}

export default CreatorOutputs;