import './main.css'
import React from 'react'

import Navbar from './../navbar/navbar'

function Main (props) {

  return (
    <div className="main">
      <Navbar/>
      <div className="wrapper">
        <h1>Digital Logic Simulator</h1>
        <img src="https://thumbs.gfycat.com/LastGiganticArmedcrab-max-1mb.gif" alt=""/>
      </div>
    </div>
  )
}

export default Main;