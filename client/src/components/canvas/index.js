import React from 'react'
// import Sketch from './sketch'
import Sketch from './test'
import useWindowDimensions from '../../hooks/useWindowDimensions';

export default function Index() {
  const { height, width } = useWindowDimensions();

  return <Sketch windowWidth = {width} windowHeight = {height}/>
}
