import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import GlobalContext from './services/globalContext'

import Home from "./components/home"
import Index from "./components/canvas/index"

function App() {


  //Massive object to pass props
  const customProps = { }
  return (
    <GlobalContext.Provider value = {{customProps}} >
    <Router>
      <Routes>
        <Route path="/" exact element={<Index/>} />
        {/* The endpoints of the components are inverted, but Its jus to see canvas easier and faster, I will change later */}
        <Route path="/canvas" exact element={<Home/>} /> 
      </Routes>
    </Router>
    </GlobalContext.Provider>
  );
}

export default App;
