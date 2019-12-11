import React, { Component } from 'react';
import { fabric } from 'fabric';
import { SketchPicker } from 'react-color';
import './stylin.css'
var FontFaceObserver = require('fontfaceobserver');

class Edit extends Component {

  constructor(){
      super()
      this.state={
        fonts:["Times New Roman","Pacifico", "VT323", "Quicksand", "Inconsolata"],
        value:'',
        circle : new fabric.Circle({
          radius: 20, fill: 'green', left: 100, top: 100
        }),
        textbox : new fabric.Textbox('HELLO', {
          left: 50,
          top: 50,
          width: 150,
          fontSize: 20,
          fill: 'black'
        })
      }
      this.loadAndUse = this.loadAndUse.bind(this);
  }
  removeSelected() {
    let activeObject = this.canvas.getActiveObject()

    if (activeObject) {
      this.canvas.remove(activeObject);
    }
  }
    addSquare(){
      this.canvas.add(new fabric.Rect({
        left: 200,
        top: 100,
        fill: 'red',
        width: 20,
        height: 20,
        angle: 24

      }))
    }
    drawingMode(){
      if(this.canvas.isDrawingMode ===true)
      this.canvas.isDrawingMode = false;
      else
      this.canvas.isDrawingMode = true;
    }
    addText() {

        this.canvas.add(new fabric.Textbox('HHHH', {
          fontFamily: 'helvetica',
          fill: 'black',
          left: 100,
          top: 100
      }))
    }

  componentDidUpdate(){
  }

  componentDidMount() {
     this.canvas = new fabric.Canvas('c',{
  preserveObjectStacking: true,      
  backgroundColor: 'white',
  selectionColor: 'blue',
  selectionLineWidth:1,
  isDrawingMode: true
    });
    this.canvas.setHeight(400);
    this.canvas.setWidth(900);
    
    var rect = new fabric.Rect({
        left: 200,
        top: 100,
        fill: 'red',
        width: 20,
        height: 20,
        angle: 24

      });
      var triangle = new fabric.Triangle({
        width: 20, height: 30, fill: 'blue', left: 50, top: 50
      });
      
      this.canvas.add(rect, this.state.circle, triangle);

      rect.set('selectable',true);
      
      this.state.circle.set('selectable',false);
      
      triangle.set('selectable',false);

this.canvas.add(this.state.textbox);

this.canvas.hoverCursor = 'pointer';


  }
  changeColor = (color,event) => {
    let activeObject = this.canvas.getActiveObject()

    if (activeObject) {
      activeObject.fill=color.hex
    }
  };
  FontList = function(X) {
    return <option>{X}</option>;
};
onChange(e) {
  console.log(`onChange fired with value: '${e.currentTarget.value}'`)
  this.setState({
    value:e.target.value
  })
  console.log(e.target.value)
    if (this.state.value !== 'Times New Roman') {
      this.loadAndUse(this.state.value);
    } else {
      this.canvas.getActiveObject().set("fontFamily", e.target.value);
    }
  
  
} 
loadAndUse(font) {
  let activeObject = this.canvas.getActiveObject();
  var myfont = new FontFaceObserver(font)
  myfont.load()
    .then(setTimeout(function() {
      activeObject.set("fontFamily", font);
    }),5000).catch((e) => {
      console.log(e)
      alert('font loading failed ' + font);
    });}

  render() {
    return (
      <div class="container">
      <div class="grid content">Editor
        <canvas id="c" />
        </div>
        <div class="grid sidebar">
        <SketchPicker
        onChangeComplete={ this.changeColor }
      />
      <select onChange={this.onChange.bind(this)} value={this.state.value}>
      {this.state.fonts.map(this.FontList)}
      </select>
        <h2>Actions</h2>
        <button onClick={this.addText.bind(this)}>Add Text</button>
        <button onClick={this.drawingMode.bind(this)}>Drawing Mode</button>
        <button onClick={this.addSquare.bind(this)}>Add Square</button>
        <button onClick={this.removeSelected.bind(this)}>Remove</button>
      </div>
    </div>
    )
  }
}

export default Edit;