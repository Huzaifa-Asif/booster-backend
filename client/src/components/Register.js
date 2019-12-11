import React, { Component } from 'react'
import { register, errorNotificationOnAdd, showNotificationOnAdd } from './UserFunctions'
import ReactNotification from 'react-notifications-component'
import Navbar from './Navbar';
import './css/animation.css';

class Register extends Component {
  constructor() {
    super()
    this.state = {
      first_name: '',
      last_name: '',
      email: '',
      password: '',
      age: '',
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
    if(this.state.first_name!=''&&this.state.last_name!=''&&this.state.password!=''&&this.state.age!=''&&this.state.email!=''){
      const newUser = {
        first_name: this.state.first_name,
        last_name: this.state.last_name,
        email: this.state.email,
        age: this.state.age,
        password: this.state.password
      }
      register(newUser).then(response => {
      if(response.data.error==="User already exists")
      {
        errorNotificationOnAdd("This email is already registered. Try a different email")
      }
      else
      {
        showNotificationOnAdd("User Registered")
        this.props.history.push(`/login`)
      }
    })
    }
    else{
      errorNotificationOnAdd("Incomplete Form")
    }
  }

  render() {
    return (
      <div>
        <Navbar />
        <ReactNotification/>
      <div className="container" id="bgImage1">
        <div className="row">
          <div className="col-md-6 mt-5 mx-auto">
            <form noValidate onSubmit={this.onSubmit}>
              <h1 className="h3 mb-3 font-weight-heavy "style={{color:"white"}}>Register with booster</h1>
              <div className="form-group">
                <label htmlFor="name" style={{color:"white"}}>First name</label>
                <input
                  type="text"
                  className="form-control"
                  name="first_name"
                  placeholder="Enter your first name"
                  value={this.state.first_name}
                  onChange={this.onChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="name" style={{color:"white"}}>Last name</label>
                <input
                  type="text"
                  className="form-control"
                  name="last_name"
                  placeholder="Enter your lastname name"
                  value={this.state.last_name}
                  onChange={this.onChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="email" style={{color:"white"}}>Email address</label>
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  placeholder="Enter email"
                  value={this.state.email}
                  onChange={this.onChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="password" style={{color:"white"}}>Password</label>
                <input
                  type="password"
                  className="form-control"
                  name="password"
                  placeholder="Password"
                  value={this.state.password}
                  onChange={this.onChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="age" style={{color:"white"}}>Age</label>
                <input
                  type="age"
                  className="form-control"
                  name="age"
                  placeholder="Age"
                  value={this.state.age}
                  onChange={this.onChange}
                />
              </div>
              <button
                type="submit"
                id="btnAnimate"
                className="btn btn-lg btn-primary btn-block"
                style={{height:"50px", minWidth:"150px"}}
              >
                Register!
              </button>
            </form>
          </div>
        </div>
      </div>
      </div>
    )
  }
}

export default Register
