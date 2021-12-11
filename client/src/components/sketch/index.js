import React from 'react'
import Sketch from './sketch'
import useWindowDimensions from '../../hooks/useWindowDimensions';

export default function Index() {
  const { height, width } = useWindowDimensions();

  return <Sketch windowWidth = {width} windowHeight = {height}/>
}
