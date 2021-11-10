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
      console.log('From LC_Form: This is the name', componentName);
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