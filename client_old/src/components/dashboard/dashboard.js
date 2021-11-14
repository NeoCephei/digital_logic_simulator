import './dashboard.css'
import React from 'react'

//Import components here: (LC means LogicComponent)

/*
LC form ---> This one have a form with text input and create submit
LC board/creator ---> This one have 3 sections (input, board, output)
LC list/selector ---> This one displays a list of the LG availables
*/
import LcForm from './lc_form/lc_form'
import LcCreator from './lc_creator/lc_creator'
import LcSelector from './lc_selector/lc_selector'

function Dashboard (props) {

  return (
    <div className="dashboard">
      <LcForm />
      <LcCreator />
      <LcSelector />
    </div>
  )
}

export default Dashboard;