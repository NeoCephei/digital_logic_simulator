import React from 'react'
import p5 from 'p5'

class Sketch extends React.Component {
  constructor(props) {
      super(props)
      //p5 instance mode requires a reference on the DOM to mount the sketch
      //So we use react's createRef function to give p5 a reference
      this.myRef = React.createRef()
      this.x = 1
  }

  // This uses p5's instance mode for sketch creation and namespacing
  Sketch = (p) => {
      p.setup = () => {
          //Everyhting that normally happens in setup works
          p.createCanvas(this.props.windowWidth,this.props.windowHeight)
      }

      p.draw = () => {
          // And everything that normally goes in draw in here
          p.background(0)
          p.circle(p.width / 2, p.height / 2, 50)
      }
  }

  componentDidMount() {
      this.myP5 = new p5(this.Sketch, this.myRef.current)
  }

  render() {
      return <div ref={this.myRef}></div>
  }
}

export default Sketch