import './lc_selector.css'
import React, {useContext}from 'react'

import globalContext from '../../../services/globalContext'
//Import components here: (LC means LogicComponent)

/*
LC list/selector ---> This one displays a list of the LG availables

components have these properties:
  name: string, 
  nInputs: number,
  nOutputs: number,
  formula: undefined
*/

function LcSelector (props) {

  const {magicProps} = useContext(globalContext);
  const {componentList, customSelectorFn} = magicProps;

  function customFn (e) {
    customSelectorFn(e);
  }

  return (
    <div className="lc_selector" onClick={customFn}>
      {componentList.map((item,index) => {
        return (
          <div key = {index} className = 'selector_item' noutputs = {item.nOutput} ninputs = {item.nInputs}>
            {item.name}
          </div>
        )
      })}
    </div>
  )
}

export default LcSelector;