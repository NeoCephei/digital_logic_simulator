import './lc_form.css';
import React, {useState} from 'react'

//Import components here: (LC means LogicComponent)

/*
LC form ---> This one have a form with text input and create submit
*/


function LcForm (props) {
  
  const [componentName, setComponentName] = useState('');
  
  function handleNameChange (e) {
    setComponentName(e.target.value)
  }
  
  function handleSubmit (e) {
    e.preventDefault();
    if (componentName.length < 1) {
      alert('Please write a name');
    } else {
      // const inputs = document.getElementsById('creator_inputs');
      // const outputs = document.getElementsById('creator_outsputs');
      // const board = document.getElementById('creator_board');
      // console.log(inputs)
      // console.log(outputs)
      // console.log(board)
      // console.log('From LC_Form: This is the name', componentName);
      setComponentName('')
    }
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