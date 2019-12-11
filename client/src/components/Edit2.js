import React, { Component } from 'react';
import Navbar from './Navbar'
import { fabric } from 'fabric';
import { SketchPicker } from 'react-color';
import { ColorPicker } from 'react-color-picker'
import './stylin.css'
import abra from './assets/img/abra.svg'
import bellsprout from './assets/img/bellsprout.svg'
import bullbasaur from './assets/img/bullbasaur.svg'
import caterpie from './assets/img/caterpie.svg'
import charmander from './assets/img/charmander.svg'
import "animate.css"
class Edit2 extends React.Component {

  constructor() {
    super()
    this.state = {
      canvas: '',
      canvasFill: '#ffffff',
      canvasImage: '',
      id: "",
      opacity: "",
      fill: '#000000',
      fontSize: '',
      lineHeight: '',
      charSpacing: '',
      fontWeight: '',
      fontStyle: '',
      textAlign: '',
      fontFamily: '',
      TextDecoration: '',
      textString: "",
      url: '',
      size: '',
      width: 500,
      height: 500,
      globalEditor: false,
      textEditor: false,
      imageEditor: false,
      figureEditor: false,
      selected: '',
      width: '',
      height: '',
      id: ''
    }
    this.extend = this.extend.bind(this);
    this.resetPanels = this.resetPanels.bind(this);
  }

  changeSize(event) {
    console.log(event.currentTarget.value)
    this.setState({
      height: event.currentTarget.value
    })
    this.canvas.setWidth(this.state.width);
    this.canvas.setHeight(this.state.height);
  }
  componentDidMount() {
    this.canvas = new fabric.Canvas('canvas', {
      hoverCursor: 'pointer',
      selection: true,
      selectionBorderColor: 'blue',
      isDrawingMode: false
    });
    this.canvas.setHeight(600);
    this.canvas.setWidth(700);
    this.canvas.on({
      'object:moving': (e) => { },
      'object:modified': (e) => { },
      'selected': (e) => {

        let selectedObject = e.target;
        this.state.selected = selectedObject;
        selectedObject.hasRotatingPoint = true;
        selectedObject.transparentCorners = false;
        // selectedObject.cornerColor = 'rgba(255, 87, 34, 0.7)';

        this.resetPanels();

        if (selectedObject.type !== 'group' && selectedObject) {

          this.getId();
          this.getOpacity();

          switch (selectedObject.type) {
            case 'rect':
            case 'circle':
            case 'triangle':
              this.figureEditor = true;
              this.getFill();
              break;
            case 'i-text':
              this.textEditor = true;
              this.getLineHeight();
              this.getCharSpacing();
              this.getBold();
              this.getFontStyle();
              this.getFill();
              this.getTextDecoration();
              this.getTextAlign();
              this.getFontFamily();
              break;
            case 'image':
              console.log('image');
              break;
          }
        }
      },
      'selection:cleared': (e) => {
        this.setState({ selected: null });
        this.resetPanels();
      }
    })
  }

  readUrl(event) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.onload = (event) => {
        this.state.url = event.target['result'];
      }
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  setId() {
    let val = this.state.id;
    let complete = this.canvas.getActiveObject().toObject();
    console.log(this.canvas.getActiveObject().toObject());
    this.canvas.getActiveObject().toObject = () => {
      complete.id = val;
      return complete;
    };
  }

  addImageOnCanvas(event) {
    if (this.state.url) {
      fabric.Image.fromURL(this.state.url, (image) => {
        image.set({
          left: 10,
          top: 10,
          angle: 0,
          padding: 10,
          cornersize: 10,
          hasRotatingPoint: true
        });
        this.extend(image, this.randomId());
        this.canvas.add(image);
        this.canvas.setActiveObject(image);
      });
    }
  }

  newText(e) {
    this.setState({ textString: e.target.value })
  }
  addText(e) {
    let textString = this.state.textString;
    let text = new fabric.IText(textString, {
      left: 10,
      top: 10,
      fontFamily: 'helvetica',
      angle: 0,
      fill: '#000000',
      scaleX: 0.5,
      scaleY: 0.5,
      fontWeight: '',
      hasRotatingPoint: true
    });
    this.extend(text, this.randomId());
    this.canvas.add(text);
    this.canvas.setActiveObject(text);
    this.setState.textString = '';
  }
  getImgPolaroid(event) {
    fabric.Image.fromURL(event.target.src, (image) => {
      image.set({
        left: 10,
        top: 10,
        angle: 0,
        padding: 10,
        cornersize: 10,
        hasRotatingPoint: true
      });
      this.extend(image, this.randomId());
      this.canvas.add(image);
      this.canvas.setActiveObject(image);
    });
  }
  extend(Object, id) {
    fabric.Object.prototype.toObject = (function (toObject) {
      return function () {
        return fabric.util.object.extend(toObject.call(this), {
          id: this.id
        });
      };
    })(fabric.Object.prototype.toObject);
  }
  selectItemAfterAdded(obj) {
    this.canvas.deactivateAllWithDispatch().requestRenderAll();
    this.canvas.setActiveObject(obj);
  }
  randomId() {
    return Math.floor(Math.random() * 999999) + 1;
  }
  resetPanels() {
    this.textEditor = false;
    this.imageEditor = false;
    this.figureEditor = false;
  }
  cleanSelect(e) {
    if (this.canvas.isDrawingMode === false) {
      this.canvas.isDrawingMode = true;
    }
    else {
      this.canvas.isDrawingMode = false;
    }
  }
  setCanvasFill(color) {
    this.canvas.backgroundColor = color.hex;
    this.canvas.renderAll();
  }
  setCanvasImage(e) {
    this.setState({ canvasImage: e.target.value })
    this.canvas.setBackgroundImage({ source: e.target.value, repeat: 'repeat' }, function () {
      // this.canvas.building.objectCaching = false
      // this.canvas.renderAll();
    });
  }
  getActiveStyle(styleName, object) {
    object = object || this.canvas.getActiveObject();
    if (!object) return '';

    return (object.getSelectionStyles && object.isEditing)
      ? (object.getSelectionStyles()[styleName] || '')
      : (object[styleName] || '');
  }


  setActiveStyle(styleName, value, object1) {
    let object = this.canvas.getActiveObject();
    if (!object) { return; }

    if (object.setSelectionStyles && object.isEditing) {
      let style = {};
      style[styleName] = value;
      object.setSelectionStyles(style);
      object.setCoords();
    }
    else {
      object.set(styleName, value);
    }

    object.setCoords();
    this.canvas.renderAll();
  }


  getActiveProp(name) {
    var object = this.canvas.getActiveObject();
    if (!object) return '';

    return object[name] || '';
  }

  setActiveProp(name, value) {
    console.log(this.canvas.getActiveObject())
    let object = this.canvas.getActiveObject();
    if (!object) { return; }
    else {
      object.textAlign = value;
      this.canvas.renderAll()
    }
  }

  clone() {
    let activeObject = this.canvas.getActiveObject(),
      activeGroup = this.canvas.getActiveGroup;

    if (activeObject) {
      let clone;
      switch (activeObject.type) {
        case 'rect':
          clone = new fabric.Rect(activeObject.toObject());
          break;
        case 'circle':
          clone = new fabric.Circle(activeObject.toObject());
          break;
        case 'triangle':
          clone = new fabric.Triangle(activeObject.toObject());
          break;
        case 'i-text':
          clone = new fabric.IText('', activeObject.toObject());
          break;
        case 'image':
          clone = fabric.util.object.clone(activeObject);
          break;
      }
      if (clone) {
        clone.set({ left: 10, top: 10 });
        this.canvas.add(clone);
        this.canvas.setActiveObject(clone);
      }
    }
  }

  getId() {
    this.setState.id = this.canvas.getActiveObject().toObject().id;
  }


  getOpacity() {
    this.setState.opacity = this.getActiveStyle('opacity', null) * 100;
  }

  setOpacity(e) {
    this.setState({ opacity: e.target.value })
    this.setActiveStyle('opacity', parseInt(e.target.value) / 100, null);
  }

  getFill() {
    this.setState.fill = this.getActiveStyle('fill', null);
  }

  setFill(color) {
    console.log(color.hex)
    this.setState({ fill: color.hex })
    this.setActiveStyle('fill', color.hex, null);
  }

  getLineHeight() {
    this.setState.lineHeight = this.getActiveStyle('lineHeight', null);
  }

  setLineHeight() {
    this.setActiveStyle('lineHeight', parseFloat(this.setState.lineHeight), null);
  }

  getCharSpacing() {
    this.state.charSpacing = this.getActiveStyle('charSpacing', null);
  }

  setCharSpacing() {
    this.setActiveStyle('charSpacing', this.setState.charSpacing, null);
  }

  getFontSize() {
    this.setState.fontSize = this.getActiveStyle('fontSize', null);
  }

  setFontSize(e) {
    this.setState({ fontSize: e.target.value })
    this.setActiveStyle('fontSize', parseInt(e.target.value), null);
  }

  getBold() {
    this.state.fontWeight = this.getActiveStyle('fontWeight', null);
  }

  setBold() {
    this.state.fontWeight = !this.state.fontWeight;
    this.setActiveStyle('fontWeight', this.state.fontWeight ? 'bold' : '', null);
  }

  getFontStyle() {
    this.state.fontStyle = this.getActiveStyle('fontStyle', null);
  }

  setFontStyle() {
    this.state.fontStyle = !this.props.fontStyle;
    this.setActiveStyle('fontStyle', this.state.fontStyle ? 'italic' : '', null);
  }


  getTextDecoration() {
    this.setState.TextDecoration = this.getActiveStyle('textDecoration', null);
  }

  setTextDecoration(value) {
    let iclass = this.state.TextDecoration;
    if (iclass.includes(value)) {
      iclass = iclass.replace(RegExp(value, "g"), "");
    }
    else {
      iclass += ` ${value}`
    }
    this.setActiveStyle('textDecoration', this.state.TextDecoration ? value : '', null);
  }

  hasTextDecoration(value) {
    return this.state.TextDecoration.includes(value);
  }


  getTextAlign() {
    this.state.textAlign = this.getActiveProp('textAlign');
  }

  setTextAlign = value => {
    console.log(value)
    this.setState({ textAlign: value });
    // this.canvas.getActiveObject().set('textAlign',value).setCoords();
    // this.canvas.renderAll();
    this.setActiveProp('textAlign', value);
  }

  getFontFamily() {
    this.setState.fontFamily = this.getActiveProp('fontFamily');
  }

  setFontFamily(e) {
    let activeObject = this.canvas.getActiveObject();
    console.log(this.canvas.getActiveObject())
    if (activeObject) {
      activeObject.set('fontFamily', e.target.value)
      this.canvas.renderAll()
    }
    else {
      console.log("/")
    }
  }

  /*System*/


  removeSelected() {
    let activeObject = this.canvas.getActiveObject();
    let activeGroup = this.canvas.getActiveGroup;

    if (activeObject) {
      this.canvas.remove(activeObject);
    }
    else if (activeGroup) {
      let objectsInGroup = activeGroup.getObjects();
      this.canvas.discardActiveGroup();
      let self = this;
      objectsInGroup.forEach(function (object) {
        self.canvas.remove(object);
      });
    }
  }

  bringToFront() {
    let activeObject = this.canvas.getActiveObject(),
      activeGroup = this.canvas.getActiveGroup;

    if (activeObject) {
      activeObject.bringToFront();
      activeObject.opacity = 1;
    }
    else if (activeGroup) {
      let objectsInGroup = activeGroup.getObjects();
      this.canvas.discardActiveGroup();
      objectsInGroup.forEach((object) => {
        object.bringToFront();
      });
    }
  }

  sendToBack() {
    let activeObject = this.canvas.getActiveObject(),
      activeGroup = this.canvas.getActiveGroup;

    if (activeObject) {
      activeObject.sendToBack();
      activeObject.opacity = 0.65;
    }
    else if (activeGroup) {
      let objectsInGroup = activeGroup.getObjects();
      this.canvas.discardActiveGroup();
      objectsInGroup.forEach((object) => {
        object.sendToBack();
      });
    }
  }

  confirmClear() {
    this.canvas.clear();
  }

  rasterize() {
    // if (!fabric.Canvas.supports('toDataURL')) {
    //   alert('This browser doesn\'t provide means to serialize canvas to an image');
    // }
    console.log(this.canvas.toDataURL('png'))
    //window.open(this.canvas.toDataURL('png'));
    var image = new Image();
    image.src = this.canvas.toDataURL('png')
    var w = window.open("");
    w.document.write(image.outerHTML);

  }

  rasterizeSVG() {
    console.log(this.canvas.toSVG())
    // window.open(
    //   'data:image/svg+xml;utf8,' +
    //   encodeURIComponent(this.canvas.toSVG()));
    // console.log(this.canvas.toSVG())
    // var image = new Image();
    // image.src = this.canvas.toSVG()
    var w = window.open("");
    w.document.write(this.canvas.toSVG());
  };


  saveCanvasToJSON() {
    let json = JSON.stringify(this.canvas);
    localStorage.setItem('Kanvas', json);
    console.log('json');
    console.log(json);

  }

  loadCanvasFromJSON() {
    let CANVAS = localStorage.getItem('Kanvas');
    console.log('CANVAS');
    console.log(CANVAS);

    // and load everything from the same json
    this.canvas.loadFromJSON(CANVAS, () => {
      console.log('CANVAS untar');
      console.log(CANVAS);

      // making sure to render canvas at the end
      this.canvas.renderAll();

      // and checking if object's "name" is preserved
      console.log('this.canvas.item(0).name');
      console.log(this.canvas);
    });

  };

  rasterizeJSON() {
    this.json = JSON.stringify(this.canvas, null, 2);
  }
  removeWhite() {
    this.setState({ url: '' });
    let activeObject = this.canvas.getActiveObject()
    if (activeObject) {
      this.canvas.remove(activeObject);
    }
  };


  addFigure(figure) {
    var add;
    switch (figure) {
      case 'rectangle':
        add = new fabric.Rect({
          width: 200, height: 100, left: 10, top: 10, angle: 0,
          fill: '#3f51b5'
        });
        break;
      case 'square':
        add = new fabric.Rect({
          width: 100, height: 100, left: 10, top: 10, angle: 0,
          fill: '#4caf50'
        });
        break;
      case 'triangle':
        add = new fabric.Triangle({
          width: 100, height: 100, left: 10, top: 10, fill: '#2196f3'
        });
        break;
      case 'circle':
        add = new fabric.Circle({
          radius: 50, left: 10, top: 10, fill: '#ff5722'
        });
        break;
    }
    this.extend(add, this.randomId());
    this.canvas.add(add);
    this.canvas.setActiveObject(add);
  }


  render() {
    return (
      <div class="container">
        <Navbar />
        <div className="slider-sec w3-animate-left">
          <div className="slider single-item">
            <div ><img src={require('./images/banner-graphic-design.png')} alt=" " style={{ width: "100%" }} /></div>

          </div>
        </div>
        <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css"></link>
        <div className="content-sec w3-animate-zoom text-center" style={{ height: "20%" }}>
          <h2>Booster Graphic Design Tool</h2>
          <hr></hr>
        </div>

        <div class="col-xl-12" style={{ marginTop: "-30px" }}>
          <div className="row">
            <div className="col-lg-12" style={{ marginLeft: "22%", marginTop: "20px" }}>
              <div class="btn-group-horizontal " role="group" aria-label="...">
                <button data-toggle="tooltip" data-placement="bottom" title="Delete element" type="button" class="btn btn-outline-danger"
                  onClick={this.removeSelected.bind(this)}>Remove Selected
                            <i class="fa fa-trash" aria-hidden="true"></i>
                </button>
                <button data-toggle="tooltip" data-placement="bottom" title="Send to back" type="button" class="btn btn-outline-primary"
                  onClick={this.sendToBack.bind(this)}>Send To Back
                            <i class="fa fa-level-down" aria-hidden="true"></i>
                </button>
                <button data-toggle="tooltip" data-placement="bottom" title="Send to front" type="button" class="btn btn-outline-primary"
                  onClick={this.bringToFront.bind(this)}>Bring To Front
                            <i class="fa fa-level-up" aria-hidden="true"></i>
                </button>
                <button data-toggle="tooltip" data-placement="bottom" title="Clone" type="button" class="btn btn-outline-primary"
                  onClick={this.clone.bind(this)}>Clone
                            <i class="fa fa-clone" aria-hidden="true"></i>
                </button>
                <button data-toggle="tooltip" data-placement="bottom" title="Unselect" type="button" class="btn btn-outline-primary"
                  onClick={this.cleanSelect.bind(this)}>Enter Free Drawing
                            <i class="fa fa-remove" aria-hidden="true"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* </div> */}
        <hr />
        <div class="contentMainContainer" style={{ marginBottom: "50px" }}>
          <div class="col-xl-3">
            <div class="card">
            </div>
            <br />
            <div class="card">
              <div class="card-header">
                <a class="collapsed d-block" data-toggle="collapse" href="#textcollapse-collapsed" aria-expanded="true" aria-controls="textcollapse-collapsed" id="textheading-collapsed">
                  <i class="fa fa-chevron-down pull-right"></i>
                  Add Text
                </a>
              </div>
              <div id="textcollapse-collapsed" class="collapse" aria-labelledby="heading-collapsed">
                <div class="card-body">
                  <div class="input-group">
                    <input type="text" class="form-control" onChange={this.newText.bind(this)} />
                    <div class="input-group-append">
                      <span class="input-group-text">
                        <button id="add-text" data-toggle="tooltip" data-placement="bottom" title="Add text" class="btn btn-primary" onClick={this.addText.bind(this)}>
                          <i class="fa fa-plus" aria-hidden="true"></i>
                        </button>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <br />
            <div class="card">
              <div class="card-header">
                <a class="collapsed d-block" data-toggle="collapse" href="#imagecollapse-collapsed" aria-expanded="true" aria-controls="imagecollapse-collapsed" id="imageheading-collapsed">
                  <i class="fa fa-chevron-down pull-right"></i>
                  Add images
                </a>
              </div>
              <div id="imagecollapse-collapsed" class="collapse" aria-labelledby="heading-collapsed">
                <div class="card-body max-height">
                  <img class="images-item" onClick={this.getImgPolaroid.bind(this)} src={bellsprout} />
                  <img class="images-item" onClick={this.getImgPolaroid.bind(this)} src={bullbasaur} />
                  <img class="images-item" onClick={this.getImgPolaroid.bind(this)} src={caterpie} />
                  {/* <img class="images-item"   src= {charmander}/>
                    <img class="images-item"   src= "./assets/img/bellsprout.svg"/>
                    <img class="images-item"   src= "./assets/img/caterpie.svg"/>
                    <img class="images-item"   src= "./assets/img/dratini.svg"/>
                    <img class="images-item"   src= "./assets/img/eevee.svg"/>
                    <img class="images-item"   src= "./assets/img/jigglypuff.svg"/>
                    <img class="images-item"   src= "./assets/img/mankey.svg"/>
                    <img class="images-item"   src= "./assets/img/meowth.svg"/>
                    <img class="images-item"   src= "./assets/img/pidgey.svg"/>
                    <img class="images-item"   src= "./assets/img/psyduck.svg"/>
                    <img class="images-item"   src= "./assets/img/rattata.svg"/> */}
                  <img class="images-item" onClick={this.getImgPolaroid.bind(this)} src={abra} />
                  {/* <img class="images-item"   src= "./assets/img/snorlax.svg"/> */}
                  {/* <img class="images-item"   src= "./assets/img/zubat.svg"/> */}
                </div>
              </div>
            </div>
            <br />
            <div class="card">
              <div class="card-header">
                <a class="collapsed d-block" data-toggle="collapse" href="#uploadcollapse-collapsed" aria-expanded="true" aria-controls="uploadcollapse-collapsed" id="uploadheading-collapsed">
                  <i class="fa fa-chevron-down pull-right"></i>
                  Upload Image
                </a>
              </div>
              <div id="uploadcollapse-collapsed" class="collapse" aria-labelledby="heading-collapsed">
                <div class="card-body text-center">
                  <input type="file" onChange={this.readUrl.bind(this)} />
                  <img width="33" height="33" src={this.state.url} onClick={this.addImageOnCanvas.bind(this)} class="images-item-upload" />
                  <br />
                  <br />
                  <div class="btn-group btn-group-justified" role="group" aria-label="...">
                    <div class="btn-group" role="group">
                      <button type="button" class="btn btn-outline-danger btn-sm" onClick={this.removeWhite.bind(this)}>
                        <i class="fa fa-times" aria-hidden="true" ></i> Remove</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <br />
            <div class="card">
              <div class="card-header">
                <a class="collapsed d-block" data-toggle="collapse" href="#figurecollapse-collapsed" aria-expanded="true" aria-controls="figurecollapse-collapsed" id="figureheading-collapsed">
                  <i class="fa fa-chevron-down pull-right"></i>
                  Add Figure
                </a>
              </div>
              <div id="figurecollapse-collapsed" class="collapse" aria-labelledby="heading-collapsed">
                <div class="card-body text-center max-height">
                  <div class="btn-group-lg btn-group-vertical" role="group" aria-label="...">
                    <button type="button" class="btn btn-primary" onClick={this.addFigure.bind(this, 'rectangle')}>Rectangle</button>
                    <button type="button" class="btn btn-primary" onClick={this.addFigure.bind(this, 'square')}>Square</button>
                    <button type="button" class="btn btn-primary" onClick={this.addFigure.bind(this, 'triangle')}>Triangle</button>
                    <button type="button" class="btn btn-primary" onClick={this.addFigure.bind(this, 'circle')}>Circle</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-xl-6">
            <canvas id="canvas"></canvas>
          </div>
          <div class="col-xl-3">
            {/* <div class="card">
              <div class="card-header">
                <a class="collapsed d-block" data-toggle="collapse" href="#optionscollapse-collapsed" aria-expanded="true" aria-controls="optionscollapse-collapsed" id="optionsheading-collapsed">
                  <i class="fa fa-chevron-down pull-right"></i>
                  Layer Options
                </a>
              </div>
              <div id="optionscollapse-collapsed" class="collapse" aria-labelledby="heading-collapsed">
                <div class="card-body text-center">
                  <div class="btn-group-horizontal" role="group" aria-label="...">
                    <button data-toggle="tooltip" data-placement="bottom" title="Delete element" type="button" class="btn btn-outline-danger"
                      onClick={this.removeSelected.bind(this)}>Remove Selected
                            <i class="fa fa-trash" aria-hidden="true"></i>
                    </button>
                    <button data-toggle="tooltip" data-placement="bottom" title="Send to back" type="button" class="btn btn-outline-primary"
                      onClick={this.sendToBack.bind(this)}>Send To Back
                            <i class="fa fa-level-down" aria-hidden="true"></i>
                    </button>
                    <button data-toggle="tooltip" data-placement="bottom" title="Send to front" type="button" class="btn btn-outline-primary"
                      onClick={this.bringToFront.bind(this)}>Bring To Front
                            <i class="fa fa-level-up" aria-hidden="true"></i>
                    </button>
                    <button data-toggle="tooltip" data-placement="bottom" title="Clone" type="button" class="btn btn-outline-primary"
                      onClick={this.clone.bind(this)}>Clone
                            <i class="fa fa-clone" aria-hidden="true"></i>
                    </button>
                    <button data-toggle="tooltip" data-placement="bottom" title="Unselect" type="button" class="btn btn-outline-primary"
                      onClick={this.cleanSelect.bind(this)}>Enter Free Drawing
                            <i class="fa fa-remove" aria-hidden="true"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div> */}
            <br />
            <div class="card" >
              <div class="card-header">
                <a class="collapsed d-block" data-toggle="collapse" href="#canvascollapse-collapsed" aria-expanded="true" aria-controls="canvascollapse-collapsed" id="canvasheading-collapsed">
                  <i class="fa fa-chevron-down pull-right"></i>
                  Canvas Controls
                </a>
              </div>
              <div id="canvascollapse-collapsed" class="collapse" aria-labelledby="heading-collapsed">
                <div class="card-body">
                  <div class="custom-item" >
                    <div class="custom-item-title" >Background Color</div>
                    <div class="custom-item-body">
                      <SketchPicker value={this.state.canvasFill} onChange={this.setCanvasFill.bind(this)} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <br />
            <div class="card">
              <div class="card-header">
                <a class="collapsed d-block" data-toggle="collapse" href="#propertiescollapse-collapsed" aria-expanded="true" aria-controls="propertiescollapse-collapsed" id="propertiesheading-collapsed">
                  <i class="fa fa-chevron-down pull-right"></i>
                  Properties
                </a>
              </div>
              <div id="propertiescollapse-collapsed" class="collapse" aria-labelledby="heading-collapsed">
                <div class="card-body"><div class="custom-item" >
                  <div class="custom-item-title"></div>
                </div>
                  <div class="custom-item" >
                    <div class="custom-item-title">Opacity</div>
                    <div class="custom-item-body">
                      <input type="range" value={this.state.opacity} onChange={this.setOpacity.bind(this)} />{this.state.opacity}</div>
                  </div>
                  <div class="custom-item" >
                    <div class="custom-item-title">Fill</div>
                    <SketchPicker value={this.state.fill} onChange={this.setFill.bind(this)} />
                  </div>
                  <div class="custom-item" >
                    <div class="custom-item-title">Font family</div>
                    <div class="custom-item-body">
                      <select onChange={this.setFontFamily.bind(this)} class="form-control" >
                        <option value="arial">Arial</option>
                        <option value="helvetica" selected>Helvetica</option>
                        <option value="verdana">Verdana</option>
                        <option value="courier">Courier</option>
                        <option value="Roboto">Roboto</option>
                        <option value="Open Sans">Open Sans</option>
                        <option value="Zilla Slab">Zilla Slab</option>
                        <option value="Lato">Lato</option>
                        <option value="Bellefair">Bellefair</option>
                        <option value="Fresca">Fresca</option>
                        <option value="Raleway">Raleway</option>
                        <option value="Open Sans Condensed">Open Sans Condensed</option>
                        <option value="Indie Flower">Indie Flower</option>
                        <option value="Josefin Sans">Josefin Sans</option>
                        <option value="Inconsolata">Inconsolata</option>
                        <option value="Pacifico">Pacifico</option>
                        <option value="Gloria Hallelujah">Gloria Hallelujah</option>
                      </select>
                    </div>
                  </div>
                  <div class="custom-item" >
                    <div class="custom-item-title">Style</div>
                    <div class="custom-item-body text-center">
                      <div class="btn-group" role="group" aria-label="...">
                        <button type="button" class="btn btn-primary btn-sm" onClick={this.setBold.bind(this)}>
                          <i class="fa fa-bold"></i>
                        </button>
                        <button type="button" class="btn btn-primary btn-sm" onClick={this.setFontStyle.bind(this)}>
                          <i class="fa fa-italic"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                  <div class="custom-item" >
                    <div class="custom-item-title">Font Size</div>
                    <div class="custom-item-body">
                      <input type="range" step="1" min="1" max="120"
                        value={this.state.fontSize}
                        onChange={this.setFontSize.bind(this)
                        }
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-xl-12 text-center">
            <button onClick={this.rasterize.bind(this)} data-toggle="tooltip" data-placement="bottom" title="Export to image" type="button" class="btn btn-primary" >
              <i class="fa fa-download" aria-hidden="true"></i> Download PNG</button>
            <button onClick={this.rasterizeSVG.bind(this)} data-toggle="tooltip" data-placement="bottom" title="Export to SVG" type="button" class="btn btn-primary" >
              <i class="fa fa-download" aria-hidden="true"></i> Download SVG</button>
            <button onClick={this.saveCanvasToJSON.bind(this)} data-toggle="tooltip" data-placement="bottom" title="Save in localStorage" type="button" class="btn btn-primary"
            >
              <i class="fa fa-save" aria-hidden="true"></i> Save local</button>
            <button onClick={this.loadCanvasFromJSON.bind(this)} data-toggle="tooltip" data-placement="bottom" title="Load from localStorage" type="button" class="btn btn-primary">
              <i class="fa fa-save" aria-hidden="true"></i> Load local</button>
            <button onClick={this.confirmClear.bind(this)} data-toggle="tooltip" data-placement="bottom" title="Clean Canvas" type="button" class="btn btn-danger" >
              <i class="fa fa-ban" aria-hidden="true"></i> Clean</button>
          </div>
        </div>
        <br />
      </div>
    );
  };
}

export default Edit2;