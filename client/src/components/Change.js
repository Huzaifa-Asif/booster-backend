import React, { Component } from 'react'
import Navbar from './Navbar';
import jwt_decode from 'jwt-decode'
import ReactNotification from 'react-notifications-component'
import axios from 'axios'
import './css/animation.css';
import { errorNotificationOnAdd, showNotificationOnAdd } from './UserFunctions';
let token = localStorage.usertoken

const API = 'http://localhost:4000/users/changepassword/';


class Change extends Component {
  constructor() {
    super()
    this.state = {
      oldPassword:'',
      password:'',
      newPassword:'',
      confirm:'',
      errors: {}
    }

    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }
  onSubmit(e) {
    e.preventDefault()
    const token = localStorage.usertoken
    const decoded = jwt_decode(token)
    if(this.state.newPassword!=="")
    {
      axios.put('http://localhost:5000/users/changepass/'+decoded._id, {password:this.state.password,newPassword:this.state.newPassword})
    .then(res =>{
      if(res.data==="Mismatch"){
        errorNotificationOnAdd("Incorrect Password")
      }
      else{
        showNotificationOnAdd("Password Changed")
      }
    })
    }
    else{
      errorNotificationOnAdd("Empty Field")
    }
  }

  componentDidMount() {
  }

  render() {
    return (
      <div className="container">
      <ReactNotification/>
        <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css"></link>
        <div className="col">
          <div className="domainForm w3-animate-right" style={{padding:"20px", marginLeft:"0%"}}>
            <form noValidate onSubmit={this.onSubmit}>
              <h1 className="h3 mb-3 font-weight-normal">Please Enter Your Password</h1>
              <div className="form-group">
                <label htmlFor="password">Old Password</label>
                <input
                  type="password"
                  className="form-control"
                  name="password"
                  placeholder="Old Password"
                  value={this.state.password}
                  onChange={this.onChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="newPassword">New Password</label>
                <input
                  type="password"
                  className="form-control"
                  name="newPassword"
                  placeholder="Password"
                  value={this.state.newPassword}
                  onChange={this.onChange}
                />
              </div>
              <button
              onSubmit={this.onSubmit.bind(this)}
                type="submit"
                className="btn btn-lg btn-primary btn-block"
              >
                Change Password
              </button>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default Change
