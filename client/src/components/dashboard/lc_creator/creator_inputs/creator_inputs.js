import './creator_inputs.css'
import React, {useState} from 'react'


function CreatorInputs (props) {

  const [inputs, setInputs] = useState([])

  function customFn (e) {
    if (e.target.classList.contains('input_circle')) {
      const dotIndex = e.target.attributes.dot_id.value;
      if (e.ctrlKey) {
        const newInputs = [...inputs]
        // eslint-disable-next-line no-unused-vars
        const removeIndexItem = newInputs.splice(dotIndex, 1);
        setInputs(newInputs);
      } else {
        const newInputs = [...inputs];
        newInputs[dotIndex].activated = !newInputs[dotIndex].activated
        setInputs(newInputs);
      }
    } else {
      //Position of mouse - parentDiv offsetTop - circle.height/2
      const relativeTop = e.clientY - e.target.offsetTop - 10;
      const newDot = {top: relativeTop, left: '-10px', activated: false}
      setInputs([...inputs, newDot]);
    }
  }

  return (
    <div className="creator_inputs creator_redzone" onClick={customFn}>
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