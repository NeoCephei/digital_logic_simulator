import './lc_form.css';
import React, {useContext} from 'react'

//Import components here: (LC means LogicComponent)

/*
LC form ---> This one have a form with text input and create submit
*/
import globalContext from '../../../services/globalContext'

function LcForm (props) {

  const {magicProps} = useContext(globalContext);
  const {componentName, handleTextInput, handleSubmitInput} = magicProps
  
  function handleNameChange (e) {
    handleTextInput(e)
  }
  
  function handleSubmit (e) {
    handleSubmitInput(e)
  }

  return (
    <form onSubmit={handleSubmit} className="lc_form">
      <input 
        type="text"
        placeholder="Name your component"
        value={componentName}
        onChange ={handleNameChange}
        className="form_componentName"
      ></input>
      <button type="submit">Create</button>
    </form>
  )
}

export default LcForm;