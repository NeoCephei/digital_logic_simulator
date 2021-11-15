import './modal.css'
import React, {useContext} from 'react'

import globalContext from '../../../services/globalContext'

function Modal (props) {

  const {customProps} = useContext(globalContext);
  const {toggleModal} = customProps;

  return (
    <div className="modal">
      <p onClick={() => toggleModal()}>go back</p>
    </div>
  )
}

export default Modal;