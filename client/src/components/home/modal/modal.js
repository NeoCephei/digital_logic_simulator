import './modal.css'
import React, {useState, useContext} from 'react'

import globalContext from '../../../services/globalContext'

function Modal (props) {

  const {customProps} = useContext(globalContext);
  const {toggleModal} = customProps;

  const [pointer, setPointer] = useState(0)

  const rules = [
    {
      name: 'Rule 1',
      description: 'Create inputs and ouputs clicking on the edges of the board'
    },
    {
      name: 'Rule 2',
      description: 'You can activate the inputs by clickling them'
    },
    {
      name: 'Rule 3',
      description: 'You can remove the inputs or outputs by holding "Ctrl" and clicking them'
    },
    {
      name: 'Rule 4',
      description: 'You can drag and drop the chips from the bottom bar that works as selector'
    },
    {
      name: 'Rule 5',
      description: 'You can create your own custom chips that stores the logic you create'
    },
    {
      name: 'Rule 6',
      description: 'Get crazy!!'
    }
  ]

  const changeDescription = (i) => {
    setPointer(i)
  }

  return (
    <div className="modal">
      <div className="modal_wrapper">
        <div className="modal_close" onClick={() => toggleModal()}>X</div>
        <div className="modal_selector">
          {rules.map((rule, i) => {
            return <div key={i} className="modal_option" onClick={() =>{changeDescription(i)}}>{rule.name}</div>;
          })}
        </div>
        <div className="modal_description">
          {rules[pointer].description}
        </div>
      </div>
    </div>
  )
}

export default Modal;