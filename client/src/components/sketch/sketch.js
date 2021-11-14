import React, {useEffect} from 'react'
import p5 from 'p5'

export default function Sketch(props) {
  // I wanted to create the Sketch component as functional component instead of class but...
  // I think I will keep going with the class as I know it works at least
  let myRef = React.createRef()
  let myP5;

  const inputs = [];
  const outputs = [];
  const pins = [];
  const wires = [];
  const chips = [];

  const concepts = {
    "And": { name: "And", inputs: 2, outputs: 1, exec: x => [x[0] && x[1]] },
    "Not": { name: "Not", inputs: 1, outputs: 1, exec: x => [!x[0]] }
  };
  const circuits = {};
  const buttons = [];
  let create;
  let chipName = "Nand";
  let chipNameInput;

  let wiringMode = false;
  let wireA = null;
  const waypoints = [];

  useEffect(()=> {
    myP5 = new p5(Sketch, myRef.current)
  },[])

  const Sketch = (p) => {

    class Circuit {
      constructor(name, col, inputs=[], outputs=[], wires=[], chips=[]) {
        this.name = name;
        this.col = col
        this.inputs = inputs;
        this.outputs = outputs;
        this.wires = wires;
        this.chips = chips;
      }
      
      addInput(input) {
        this.inputs.push(input);
      }
      
      addOutput(output) {
        this.outputs.push(output);
      }
      
      addWire(wire) {
        this.wires.push(wire);
      }
      
      addChip(chip) {
        this.chips.push(chip);
      }
    }

    class Button {
      constructor(x, y, name, action) {
        this.x = x;
        this.y = y;
        this.name = name.toUpperCase();
        p.textSize(16);
        this.w = p.textWidth(this.name) + 16;
        this.h = 30;
        this.action = action;
      }
      
      contains(x, y) {
        return x >= this.x && x <= this.x + this.w && y >= this.y && y <= this.y + this.h;
      }
      
      render() {
        p.textAlign(p.LEFT, p.TOP);
        p.textSize(16);
        p.noStroke();
        p.fill(0, 0, 30);
        p.rectMode(p.CORNER);
        p.rect(this.x, this.y, this.w, this.h);
        p.fill(0, 0, 100);
        p.text(this.name, this.x+8, this.y+8);
      }
    }

    class DragButton {
      constructor(x, y, name, chipConcept) {
        this.x = x;
        this.y = y;
        this.name = name.toUpperCase();
        p.textSize(16);
        this.w = p.textWidth(this.name) + 16;
        this.h = 30;
        this.currentChip = null;
        this.chipConcept = chipConcept;
      }
      
      contains(x, y) {
        return x >= this.x && x <= this.x + this.w && y >= this.y && y <= this.y + this.h;
      }
      
      press() {
        this.currentChip = new Chip(p.mouseX, p.mouseY, this.chipConcept);
      }
      
      move() {
        this.currentChip.move(p.mouseX, p.mouseY);
      }
      
      release() {
        chips.push(this.currentChip);
        this.currentChip = null;
      }
      
      render() {
        p.textAlign(p.LEFT, p.TOP);
        p.textSize(16);
        p.noStroke();
        p.fill(0, 0, 30);
        p.rectMode(p.CORNER);
        p.rect(this.x, this.y, this.w, this.h);
        p.fill(0, 0, 100);
        p.text(this.name, this.x+8, this.y+8);
        if (this.currentChip) {
          this.currentChip.render();
        }
      }
    }

    class Chip {
      constructor(x, y, concept) {
        this.x = x;
        this.y = y;
        
        this.definedByCircuit = concept instanceof Circuit;
        this.name = concept.name.toUpperCase();
        this.inputs = this.definedByCircuit ? concept.inputs.length : concept.inputs;
        this.outputs = this.definedByCircuit ? concept.outputs.length : concept.outputs;
        if (!this.definedByCircuit) {
          this.exec = concept.exec;
        } else {
          this.circuit = concept;
        }
        this.col = concept.col;
        
        p.textSize(12);
        const maxIO = p.max(this.inputs, this.outputs);
        this.h = maxIO * 18;
        this.w = p.textWidth(this.name) + 24;
        
        this.inputPins = [];
        for (let i = 0; i < this.inputs; i++) {
          const x = this.x - this.w/2;
          const y = this.inputs === 1 ? this.y : p.map(i, 0, this.inputs-1, this.y - this.h/2 + 9, this.y + this.h/2 - 9);
          this.inputPins.push(new Pin(x, y, this));
        }
        
        this.outputPins = [];
        for (let i = 0; i < this.outputs; i++) {
          const x = this.x + this.w/2;
          const y = this.outputs === 1 ? this.y : p.map(i, 0, this.outputs-1, this.y - this.h/2 + 12, this.y + this.h/2 - 9);
          this.outputPins.push(new Pin(x, y, this));
        }
      }
      
      execute() {
        const inpVals = this.inputPins.map(pin => pin.state);
        if (this.definedByCircuit) {
          for (let i = 0; i < this.inputPins.length; i++) {
            if (inpVals[i] !== this.circuit.inputs[i].state) {
              this.circuit.inputs[i].toggle();
            }
          }
          for (let i = 0; i < this.outputPins.length; i++) {
            const pin = this.outputPins[i];
            const out = this.circuit.outputs[i].state;
            if (pin.state !== out) {
              pin.state = this.circuit.outputs[i].state;
              pin.propagate();
            }
          }
        } else {
          const outVals = this.exec(inpVals);
          for (let i = 0; i < this.outputPins.length; i++) {
            const pin = this.outputPins[i];
            if (pin.state !== outVals[i]) {
              pin.state = outVals[i];
              pin.propagate();
            }
          }
        }
      }
      
      move(x, y) {
        const dx = x - this.x;
        const dy = y - this.y;
        this.x += dx;
        this.y += dy;
        for (const pin of this.inputPins) {
          pin.x += dx;
          pin.y += dy;
        }
        for (const pin of this.outputPins) {
          pin.x += dx;
          pin.y += dy;
        }
      }
      
      render() {
        p.textAlign(p.CENTER, p.CENTER);
        p.textSize(12);
        p.noStroke();
        p.fill(this.col);
        p.rectMode(p.CENTER);
        p.rect(this.x, this.y, this.w, this.h);
        p.fill(0, 0, 100);
        p.text(this.name, this.x, this.y);
        for (const pin of this.inputPins) {
          pin.render();
        }
        for (const pin of this.outputPins) {
          pin.render();
        }
      }
    }

    class Pin {
      constructor(x, y, parent) {
        this.x = x;
        this.y = y;
        this.r = 6;
        this.state = false;
        this.wires = [];
        this.parent = parent;
        pins.push(this);
      }
      
      contains(x, y) {
        return p.dist(this.x, this.y, x, y) <= this.r;
      }
      
      propagate() {
        for (const wire of this.wires) {
          wire.updateB();
          wire.b.parent.execute();
        }
      }
      
      render() {
        p.noStroke();
        p.fill(0, 0, 0);
        p.circle(this.x, this.y, this.r*2);
      }
    }

    class InOut {
      constructor(inp, pinY, name) {
        this.inp = inp;
        this.nodeX = inp ? 40 : p.width-40;
        this.nodeY = pinY;
        this.nodeR = 15;
        this.pin   = new Pin(inp ? 80 : p.width-80, pinY, this);
        this.name  = name;
        this.bool = false;
      }
      
      execute() {
        this.bool = this.pin.state;
      }
      
      toggle() {
        this.bool = !this.bool;
        this.pin.state = this.bool;
        this.pin.propagate();
      }
      
      nodeContains(x, y) {
        return p.dist(this.nodeX, this.nodeY, x, y) <= this.nodeR;
      } 
      
      render() {
        p.stroke(0, 0, 40);
        p.strokeWeight(2);
        p.line(this.nodeX, this.nodeY, this.pin.x, this.pin.y);
        p.noStroke();
        if (this.bool) {
          p.fill(340, 80, 100);
        } else {
          p.fill(0, 0, 35);
        }
        p.circle(this.nodeX, this.nodeY, this.nodeR*2);
        this.pin.render();
      }
    }

    class Wire {
      constructor(a, b, waypoints) {
        this.a = a;
        this.b = b;
        this.waypoints = waypoints;
      }
      
      updateB() {
        this.b.state = this.a.state;
      }
    
      render() {
        if (this.a.state) {
          p.stroke(340, 80, 100);
        } else {
          p.stroke(0, 0, 35);
        }
        p.strokeWeight(2);
        p.noFill();
        p.beginShape();
        p.vertex(this.a.x, this.a.y);
        for (const w of this.waypoints) {
          p.vertex(w.x, w.y);
        }
        p.vertex(this.b.x,this.b.y);
        p.endShape();
      }
    }

    p.setup = () => {
      //Everyhting that normally happens in setup works
      p.createCanvas(props.windowWidth, props.windowHeight);
      p.colorMode(p.HSB);
      let x = 8;
      create = new Button(x, p.height-34, "Create", () => {
        chipName = chipNameInput.value();
        const col = p.color(p.random(360), 100, 80);
        circuits[chipName] = new Circuit(chipName, col, inputs.slice(), outputs.slice(), wires.slice(), chips.slice());
        inputs.splice(0);
        outputs.splice(0);
        pins.splice(0);
        wires.splice(0);
        chips.splice(0);
        const button = new DragButton(x, p.height-34, chipName, circuits[chipName]);
        buttons.push(button);
        x += button.w + 4;
      });
      x += create.w + 4;
      for (const name in concepts) {
        const c = concepts[name];
        c.col = p.color(p.random(360), 100, 80);
        const button = new DragButton(x, p.height-34, c.name, c);
        buttons.push(button);
        x += button.w + 4;
      }
      chipNameInput = p.createInput();
      chipNameInput.style("font-size", "48px");
      chipNameInput.position(40, 9);
    }

    p.keyPressed = () => {
      if (p.key === "w") {
        waypoints.push(p.createVector(p.mouseX, p.mouseY));
      }
    }
    p.mousePressed = () => {
      if (create.contains(p.mouseX, p.mouseY)) {
        create.action();
        return;
      }
      for (const button of buttons) {
        if (button.contains(p.mouseX, p.mouseY)) {
          button.press();
          return;
        }
      }
      for (const inp of inputs) {
        if (inp.nodeContains(p.mouseX, p.mouseY))  {
          inp.toggle();
          return;
        }
      }
      for (const pin of pins) {
        if (pin.contains(p.mouseX, p.mouseY)) {
          wiringMode = true;
          wireA = pin;
          return;
        }
      }
      if (p.mouseY >= 80 && p.mouseY <= p.height-80) {
        if (p.mouseX >= 34 && p.mouseX <= 46) {
          inputs.push(new InOut(true, p.mouseY));
        } else if (p.mouseX >= p.width-46 && p.mouseX <= p.width-34) {
          outputs.push(new InOut(false, p.mouseY));
        }
      }
    }
    p.mouseDragged = () => {
      for (const button of buttons) {
        if (button.currentChip) button.move();
      }
    }
    p.mouseReleased = () => {
      for (const button of buttons) {
        if (button.currentChip) button.release();
      }
      if (wiringMode) {
        for (const pin of pins) {
          if (pin.contains(p.mouseX, p.mouseY) && pin !== wireA) {
            wiringMode = false;
            const wire = new Wire(wireA, pin, waypoints.slice());
            wires.push(wire);
            wireA.wires.push(wire);
            pin.wires.push(wire);
            wire.a.propagate();
            waypoints.splice(0);
            return;
          }
        }
        wiringMode = false;
      }
    }

    p.draw = () => {
      p.background(0, 0, 40);
      p.rectMode(p.CORNER);
      p.noStroke();
      p.fill(0, 0, 35);
      p.rect(0, p.height-40, p.width, 40);
      p.stroke(0, 0, 50);
      p.strokeWeight(1);
      p.fill(0, 0, 45);
      p.rect(40, 80, p.width-80, p.height-160);
    
      for (const wire of wires) {
        wire.render();
      }
      if (wiringMode) {
        p.stroke(0, 0, 35);
        p.strokeWeight(2);
        p.noFill();
        p.beginShape();
        p.vertex(wireA.x, wireA.y);
        for (const w of waypoints) {
          p.vertex(w.x, w.y);
        }
        p.vertex(p.mouseX, p.mouseY);
        p.endShape();
      }
      
      for (const inp of inputs) {
        inp.render();
      }
      for (const out of outputs) {
        out.render();
      }
      for (const chip of chips) {
        chip.render();
      }
      
      create.render();
      for (const button of buttons) {
        button.render();
      }
    }

  }

  return  <div ref={myRef}></div>;
}