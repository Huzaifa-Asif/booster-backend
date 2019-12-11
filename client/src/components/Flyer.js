import React, { Component } from 'react'
import Navbar from './Navbar'
import { SingleSided, DoubleSided } from './Distribution'
import axios from 'axios'
import jwt_decode from 'jwt-decode'
import { showNotificationOnAdd, errorNotificationOnAdd, incompleteFormNotification } from './UserFunctions'
const API = 'http://localhost:5000/orders/addorder';

class Flyer extends Component {
  constructor() {
    super()
    this.state = {
      _id: '',
      first_name: '',
      last_name: '',
      email: '',
      age: '',
      side: '',
      sideOne: '',
      sideTwo: '',
      total:'0',
      copies:'',
      loading: false,
      cities:["Select","Islamabad","Lahore","Karachi"],
      area:["Select City First"],
      city:'',
      selectedArea:''
    }
  }

  componentDidMount(){
    const token = localStorage.usertoken
    const decoded = jwt_decode(token)
    this.setState({
        _id: decoded._id,
        first_name: decoded.first_name,
        last_name: decoded.last_name,
        email: decoded.email,
        age: decoded.age
    })

  }
  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }
  uploadImage = async e => {
    let name = e.target.name
    this.setState({ loading: true })
    const fd = new FormData();
    fd.append('file', e.target.files[0])
    fd.append("api_key", '748379222569347');
    fd.append("api_secret", 'TUd8nJDCu2WFSGfSNOeWhMdakEU');
    fd.append("cloud_name", 'dq13q6ddj');
    fd.append('upload_preset', 'worzzv8t')
    axios.post('https://api.cloudinary.com/v1_1/dq13q6ddj/image/upload', fd).then(
      response => {
        const file = response.json
        console.log(response.data.url)
        console.log(response)
        this.setState({ [name]: response.data.url })
        this.setState({ loading: false })
      }
    )
  }

generateTotal(e){
  if(this.state.side==="single"){
    this.setState({
      copies:e.target.value,
      total:e.target.value * 2
    })
  }
  else if(this.state.side==="double"){
    this.setState({
      copies:e.target.value,
      total:e.target.value * 4
    })
  }
  else{
    alert("Select Number of Sides First")
  }
}

citySelection(e){
  e.preventDefault()
  this.setState({[e.target.name]:e.target.value})
  if(e.target.value="Lahore"){
    this.setState({area: ["Gulberg","DHA","MM Alam"]})
  }
  else if(e.target.value="Karachi"){
    this.setState({area: ["Chotta Bukhari","Baloch ka Pull","Liyari","Gulshan e Iqbal","Sea View"]})
  }
  else{
    this.setState({area: ["Select City Again"]})
  }
}

areaSelection(e){
  e.preventDefault()
  this.setState({[e.target.name]:e.target.value})
  console.log([e.target.value])
}

addToCart(e){
  e.preventDefault()
  const token = localStorage.usertoken
  const decoded = jwt_decode(token)
  let cartItem = {
      _id: this.state._id,
      userName: this.state.first_name + this.state.last_name,
      email: this.state.email,
      userId:decoded._id,
      user: localStorage.usertoken,
      city: this.state.city +' - '+this.state.selectedArea,
      price: this.state.total,
      type:"Distribution",
      image: this.state.sideOne,
      status:"Pending",
      payment:false
  }
  if(this.state.side!=""&&this.state.sideOne!=""&&this.state.copies!="")
  {
    fetch(API, {
        method: "POST",
        body: JSON.stringify(cartItem),
        headers: {
          "Content-Type": "application/json"
        }}).then(function(response) {
          if (response.ok) {
            console.log(response)
            showNotificationOnAdd('Added to cart')
            window.location.reload();
          } else {
              errorNotificationOnAdd("Error")
          }
    })
  }
  else{
    incompleteFormNotification("Incomplete Form")
  }
  console.log(this.state.selectedArea)
  console.log(this.state.city)
}

  render() {
    const {cities} = this.state;
    const {area} =this.state;
    const selectedSide = this.state.side;
    let pkg;

    if (selectedSide === "single") {
      pkg = <SingleSided
        uploadImage={this.uploadImage.bind(this)}
        sideOne={this.state.sideOne}
        loading={this.state.loading}
      />
    }
    if (selectedSide === "double") {
      pkg = <DoubleSided
        uploadImage={this.uploadImage.bind(this)}
        sideOne={this.state.sideOne}
        sideTwo={this.state.sideTwo}
        loading={this.state.loading}
      />
    }
    return (
      <div>
        <Navbar />
        <div className="slider-sec w3-animate-left">
          <div className="slider single-item">
            <div ><img src={require('./images/PrintBanner.gif')} alt=" " style={{width:"100%"}}/></div>
            
          </div>
        </div>
        <div className="content-sec w3-animate-zoom">
          <div className="row">
            <div className="large-12 columns text-center">
              <h2>Printing & Distribution</h2>
              </div></div>
        </div> 
        <div className="contentMainContainer">
        <div className="container">
        <div className="table col-md-6 padding-right-20">
        <form onChange={this.handleChange.bind(this)}>
          <input type="radio" name="side" value="single" /> Single Sided<br />
          <input type="radio" name="side" value="double" /> Double Sided<br />
        </form>
        {pkg}
        <label>
          Select City:
          <select name='city' onChange={this.citySelection.bind(this)}>
            {
              cities.map(city=>
              <option value={city} onClick={()=>this.setState({city:city})} key={city}>{city}</option>
                )
            }
          </select>
        </label>
        <label>
          Select Area:
          <select name="selectedArea" onChange={this.areaSelection.bind(this)}>
            {
              area.map(selectArea =>
              <option value={selectArea} onClick={()=>this.setState({selectedArea:selectArea})} key={selectArea}>{selectArea}</option>
                )
            }
          </select>
        </label>
        <label>Input Number of Copies:</label>
        <input type='number' placeholder="Enter Number" value={this.state.copies} onChange={this.generateTotal.bind(this)}></input>
        <label>Total:{this.state.total}</label>
        <button onClick={this.addToCart.bind(this)}>Add to Cart</button>
      </div></div>
      </div></div>
    )
  }
}

export default Flyer