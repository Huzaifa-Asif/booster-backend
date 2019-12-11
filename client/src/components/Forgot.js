import React, { Component } from 'react'
import { forgot } from './UserFunctions'
import Navbar from './Navbar';

class Forgot extends Component {
  constructor() {
    super()
    this.state = {
      email: '',
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

    const email = this.state.email

    forgot(email).then(res => {
      if (res) {
        alert('Password sent to your mail : '+email)
        this.props.history.push(`/`)
      }
    })
  }

  render() {
    return (
      <div className="container"  id="bgImage1" style={{paddingBottom:"80px"}}>
          <Navbar/>
        <div className="row" style={{marginTop:"100px"}}>
          <div className="col-md-6 mt-5 mx-auto" style={{marginBottom:"50px"}}>
            <form noValidate onSubmit={this.onSubmit}>
              <h1 className="h3 mb-3 font-weight-normal text-white">Enter your email address</h1>
              <div className="form-group">
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  placeholder="Enter email"
                  value={this.state.email}
                  onChange={this.onChange}
                />
              </div>
              <button
                type="submit"
                id="btnAnimate"
                className="btn btn-lg btn-primary btn-block"
                style={{height:"45px", minWidth:"170px"}}
              >
                Send Password
              </button>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default Forgot