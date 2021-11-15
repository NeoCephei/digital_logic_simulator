import './App.css';
import React, {useState} from 'react';
// eslint-disable-next-line no-unused-vars
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import GlobalContext from './services/globalContext'

import Home from "./components/home/home"
import Index from "./components/sketch/index"

function App() {

  const [modal, setModal] = useState(false);

  const toggleModal = () => {
    setModal(!modal)
  }

  //Massive object to pass props
  const customProps = {
    modal, toggleModal
  }
  return (
    <GlobalContext.Provider value = {{customProps}} >
      <Router>
        <Routes>
          <Route path="/" exact element={<Home/>} /> 
          {/* The endpoints of the components are inverted, but Its jus to see canvas easier and faster, I will change later */}
          <Route path="/canvas" exact element={<Index/>} />
        </Routes>
      </Router>
    </GlobalContext.Provider>
  );
}

export default App;
