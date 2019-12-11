import React, { Component } from 'react'
import { registerContentCreator, errorNotificationOnAdd, showNotificationOnAdd } from './UserFunctions'
import Navbar from './Navbar';
import './css/animation.css';
import ReactNotification from 'react-notifications-component'
import axios from 'axios'

class CCRegister extends Component {
  constructor() {
    super()
    this.state = {
      name: '',
      email: '',
      password: '',
      instagram: false,
      facebook: false,
      igShoutoutPrice: '',
      fbShoutoutPrice: '',
      fbCategory: '',
      igCategory: '',
      igLink: 'instagram.com/',
      fbLink: 'facebook.com/',
      paypalId: '',
      loading:false,
      image:''
    }

    this.onChange = this.onChange.bind(this)
    this.register = this.register.bind(this)
  }

  uploadImage = async e => {
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
            this.setState({ image: response.data.url })
            this.setState({ loading: false })
        }
    )
}

  handleInstagramCheckbox(e) {
    if (this.state.instagram != false) {
      return (
        <div>
          <h5 style={{ color: "white" }}>Instagram Shoutout Price</h5>
          <input name="igShoutoutPrice" type="number" value={this.state.igShoutoutPrice} onChange={this.onChange.bind(this)} placeholder="Price" />
          <select name="igCategory" onChange={this.onChange.bind(this)} >
            <option value="">Choose Category</option>
            <option value="Comedy">Comedy</option>
            <option value="Media">Media</option>
            <option value="Media">IT</option>
            <option value="Music">Music</option>
          </select>
          <label style={{ color: "white" }}>Enter Instagram URL</label>
          <input value={this.state.igLink} name="igLink" placeholder="Enter Instagram Account URL" onChange={this.onChange.bind(this)} type="text" />
        </div>

      )
    }
  }

  handleFacebookCheckbox(e) {
    if (this.state.facebook != false) {
      return (<div>
        <h5 style={{ color: "white" }}>Facebook Shoutout Price</h5>
        <input name="fbShoutoutPrice" type="number" value={this.state.fbShoutoutPrice} onChange={this.onChange.bind(this)} placeholder="Price" />
        <select name="fbCategory" onChange={this.onChange.bind(this)} >
          <option value="">Choose Category</option>
          <option value="Comedy">Comedy</option>
          <option value="Media">Media</option>
          <option value="Media">IT</option>
          <option value="Music">Music</option>
        </select>
        <label style={{ color: "white" }}>Enter Facebook URL</label>
        <input value={this.state.fbLink} name="fbLink" placeholder="Enter Facebook Account Link" onChange={this.onChange.bind(this)} type="text" />
      </div>

      )
    }
  }
  onChange(e) {
    if (e.target.type === 'checkbox') {
      if (e.target.name == 'instagram') {
        this.setState({ instagram: e.target.checked })
      }
      if (e.target.name == 'facebook') {
        this.setState({ facebook: e.target.checked })
      }
    }
    else {
      this.setState({ [e.target.name]: e.target.value })
    }
  }
  submitForm() {
    if (this.state.name !== "" && this.state.email !== "" && this.state.password !== "" && this.state.paypalId !== ""&&this.state.image!=="") {
      console.log(this.state.igShoutoutPrice)
      console.log(this.state.fbShoutoutPrice)
      if (this.state.fbShoutoutPrice != "" || this.state.igShoutoutPrice != "") {
        console.log(this.state.igLink)
        if (this.state.fbLink !== "" || this.state.igLink !== "") {
          this.register()
        }
      }
      else {
        errorNotificationOnAdd("Input Social Media Details")
      }
    }
    else {
      errorNotificationOnAdd("incomplete form")
    }
  }
  register() {
    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      igShoutoutPrice: this.state.igShoutoutPrice,
      igLink: this.state.igLink,
      igCategory: this.state.igCategory,
      fbShoutoutPrice: this.state.fbShoutoutPrice,
      fbLink: this.state.fbLink,
      fbCategory: this.state.fbCategory,
      paypalId: this.state.paypalId,
      profilePic:this.state.image
    }

    registerContentCreator(newUser).then(response => {
      if (response.data.error === "User already exists") {
        errorNotificationOnAdd("This email is already registered. Try a different email")
      }
      else {
        showNotificationOnAdd("Content Creator Registered")
        window.location.reload()
      }
    })
  }

  render() {
    return (
      <div>
        <Navbar />
        <ReactNotification />
        <div className="container" id="bgImage2" style={{ paddingBottom: "80px" }}>
          <div className="row">
            <div className="col-md-6 mt-5 mx-auto">
              <div >
                <h1 className="h3 mb-3 font-weight-heavy " style={{ color: "white" }}>Register with booster</h1>
                <label style={{ color: "white" }} >Name </label>
                <input
                  type="text"
                  onChange={this.onChange.bind(this)}
                  placeholder="Enter Your Full Name"
                  name="name"
                  value={this.state.name} />
                <label style={{ color: "white" }}>Email</label>
                <input
                  type="text"
                  onChange={this.onChange.bind(this)}
                  placeholder="Enter Your Email Address"
                  name="email"
                  value={this.state.email} />
                <label style={{ color: "white" }}>Password</label>
                <input
                  onChange={this.onChange.bind(this)}
                  placeholder="Enter Your Password"
                  type="password"
                  name="password"
                  value={this.state.password} />
                <label style={{ color: "white" }}>Social Media Accounts:</label>
                <label style={{ color: "white" }}>Instagram</label>
                <input style={{ color: "white" }}
                  type="checkbox"
                  name="instagram"
                  value={this.state.instagram}
                  onChange={this.onChange.bind(this)}
                />
                <br />
                {this.handleInstagramCheckbox()}
                <label style={{ color: "white" }} >Facebook</label>
                <input
                  type="checkbox"
                  name="facebook"
                  value={this.state.facebook}
                  onChange={this.onChange.bind(this)}
                />
                <br />
                {this.handleFacebookCheckbox()}
                <hr />
                <input type="file"
                  accept="image"
                  name="file"
                  placeholder="Upload Image for Shootout"
                  onChange={this.uploadImage.bind(this)}
                />
                {
                  this.state.loading ? (<h3>Loading...</h3>) : (<img width="80" alt="upload an image" src={this.state.image} />)
                }
                <hr />
                <label style={{ color: "white" }}>Enter PayPal ID</label>
                <input
                  type="text"
                  onChange={this.onChange.bind(this)}
                  placeholder="Enter Your PayPal ID"
                  name="paypalId"
                  value={this.state.paypalId} />
                <hr />
                <button
                  type="submit"
                  id="btnAnimate"
                  className="btn btn-lg btn-primary btn-block"
                  style={{ height: "45px", minWidth: "150px" }}
                  onClick={this.submitForm.bind(this)}>Register!</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default CCRegister
