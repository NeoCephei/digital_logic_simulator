import './navbar.css'
import React, {useContext} from 'react'
import { Link } from "react-router-dom";

import globalContext from '../../../services/globalContext'

function Navbar (props) {

  const {customProps} = useContext(globalContext);
  const {toggleModal} = customProps;

  return (
    <div className="navbar">
      <h1>Magí Solo Project</h1>
      <div className="navbar-pages">
        <Link to='/canvas'>
          <p id="try_me">Try me</p>
        </Link>
        <p id="how_it_works" onClick={() => toggleModal()}>How it works?</p>
        <p id="register_p" className="not_working" onClick={() => alert("I dont work yet")}>Register</p>
        <p id="login_p" className="not_working" onClick={() => alert("I dont work yet")}>Login</p>
      </div>
    </div>
  )
}

export default Navbar;