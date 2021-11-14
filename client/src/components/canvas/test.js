import React, {useEffect} from 'react'
import p5 from 'p5'

export default function Sketch(props) {
  // I wanted to create the Sketch component as functional component instead of class but...
  // I think I will keep going with the class as I know it works at least
  let myRef = React.createRef()
  let myP5;

  useEffect(()=> {
    myP5 = new p5(Sketch, myRef.current)
  },[])

  const Sketch = (p) => {
    p.setup = () => {
        //Everyhting that normally happens in setup works
        p.createCanvas(props.windowWidth, props.windowHeight)
    }

    p.draw = () => {
        // And everything that normally goes in draw in here
        p.background(0)
        p.circle(p.width / 2, p.height / 2, 50)
    }
}

  return ;
}