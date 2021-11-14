import React from 'react'
import p5 from 'p5'

class Sketch extends React.Component {
  constructor(props) {
      super(props)
      //p5 instance mode requires a reference on the DOM to mount the sketch
      //So we use react's createRef function to give p5 a reference
      this.myRef = React.createRef()
      this.inputs = []
      this.outputs = []
      this.pins = []
      this.wires = []
      this.chips = []

      this.concepts = {
        "And": { name: "And", inputs: 2, outputs: 1, exec: x => [x[0] && x[1]] },
        "Not": { name: "Not", inputs: 1, outputs: 1, exec: x => [!x[0]] }
      }

      this.circuits = {};
      this.conceptsArr = ["And", "Not"];
      this.buttons = [];
      this.chipName = "Nand";

      this.wiringMode = false;
      this.wireA = null;
      this.waypoints = [];
  }

  // This uses p5's instance mode for sketch creation and namespacing
  Sketch = (p) => {
      p.setup = () => {
        //Everyhting that normally happens in setup works
        p.createCanvas(this.props.windowWidth,this.props.windowHeight)




      }

      p.draw = () => {
          // And everything that normally goes in draw in here
          p.background(0, 0, 40);
          p.rectMode(p.CORNER);
          p.noStroke();
          p.fill(0, 0, 35);
          p.rect(0, p.height-40, p.width, 40);
          p.stroke(0, 0, 50);
          p.strokeWeight(1);
          p.fill(0, 0, 45);
          p.rect(40, 80, p.width-80, p.height-160);
          
          for (const wire of this.wires) {
            wire.render();
          }
          if (this.wiringMode) {
            p.stroke(0, 0, 35);
            p.strokeWeight(2);
            p.noFill();
            p.beginShape();
            p.vertex(this.wireA.x, this.wireA.y);
            for (const w of this.waypoints) {
              p.vertex(w.x, w.y);
            }
            p.vertex(p.mouseX, p.mouseY);
            p.endShape();
          }
          
          for (const inp of this.inputs) {
            inp.render();
          }
          for (const out of this.outputs) {
            out.render();
          }
          for (const chip of this.chips) {
            chip.render();
          }
          
          // this.create.render();
          for (const button of this.buttons) {
            button.render();
          }
      }

      p.keyPressed = () => {}
      p.mousePressed = () => {}
      p.mouseDragged = () => {}
      p.mouseReleased = () => {}
  }

  componentDidMount() {
      this.myP5 = new p5(this.Sketch, this.myRef.current)
  }

  render() {
      return <div ref={this.myRef}></div>
  }
}

export default Sketch