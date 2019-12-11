import React, { Component } from 'react'
import { loginContentCreator, errorNotificationOnAdd } from './UserFunctions'
import ReactNotification from 'react-notifications-component'
import Navbar from './Navbar';

class CCLogin extends Component {
  constructor() {
    super()
    this.state = {
      email: '',
      password: '',
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

    const user = {
      email: this.state.email,
      password: this.state.password
    }

    loginContentCreator(user).then(res => {
      if (res.data==="error: ReferenceError: results is not defined") {
          console.log(res)
          errorNotificationOnAdd("Incorrect Email")
      }
      else if(res.data.error==="User does not exist"){
        console.log(res)
        errorNotificationOnAdd("Incorrect Password")
      }
      else if(res.data==="No Record Found"){
        console.log(res)
        errorNotificationOnAdd("No record found")
      }
      else{
        if(this.state.email==="admin")
        {
          localStorage.setItem('admintoken', res.data)
          this.props.history.push(`/orders`)
        }
        else{
          localStorage.setItem('cctoken', res.data)
          this.props.history.push(`/ccprofile`)
          console.log(res)
        }
      }
    })
  }

  render() {
    return (
      <div>
        <Navbar />
        <ReactNotification/>
        <div className="container" id="bgImage1" style={{paddingBottom:"80px"}}>
        <div className="row">
          <div className="col-md-6 mt-5 mx-auto"style={{paddingTop:"80px"}}>
            <form noValidate onSubmit={this.onSubmit}>
              <h1 className="h3 mb-3 font-weight-normal"style={{color:"white"}}>Please sign in</h1>
              <div className="form-group">
                <label htmlFor="email"style={{color:"white"}}>Email address</label>
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
                <label htmlFor="password"style={{color:"white"}}>Password</label>
                <input
                  type="password"
                  className="form-control"
                  name="password"
                  placeholder="Password"
                  value={this.state.password}
                  onChange={this.onChange}
                />
              </div>
              <button
                type="submit"
                id="btnAnimate"
                className="btn btn-lg btn-primary btn-block"
                style={{height:"40px", minWidth:"100px", maxWidth:"180px"}}
              >
                Sign in
              </button>
            </form>
          </div>
        </div>
      </div>
      </div>
    )
  }
}

export default CCLogin