import './home.css'
import React, {useContext, useEffect} from 'react'

import Main from './main/main'
import Modal from './modal/modal'

import globalContext from '../../services/globalContext'

export default function Home() {

  const {customProps} = useContext(globalContext);
  const {modal} = customProps;

  useEffect(() => {
  },[modal])

  const display = modal 
  ? <Modal />
  : <Main />  

  return (
    <div id="home_page">
      {display}
    </div>
  )
}
