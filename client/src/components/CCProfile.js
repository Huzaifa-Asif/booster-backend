import React, { Component } from 'react'
import jwt_decode from 'jwt-decode'
import Navbar from './Navbar';
import ChangePassCC from './ChangePassCC';

class CCProfile extends Component {
  constructor() {
    super()
    this.state = {
      id:'',
      first_name: '',
      last_name: '',
      email: '',
      igLink: '',
      fbLink:'',
      errors: {}
    }
  }

  componentDidMount() {
    const token = localStorage.cctoken
    const decoded = jwt_decode(token)
    this.setState({
      _id: decoded._id,
      oldPassword:decoded.password,
      name: decoded.name,
      last_name: decoded.last_name,
      email: decoded.email,
      igLink: decoded.igLink,
      fbLink:decoded.fbLink
    })
    console.log(decoded)
  }

  myFunctionP() {
    var x = document.getElementById("PmyDIV");
    if (x.style.display === "none") {
      x.style.display = "block";
    } else {
      x.style.display = "none";
    }
  }

  render() {
    return (
      <div>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <Navbar />
        <div className="container">
          <div className="jumbotron mt-5">
            <div className="col-sm-8 mx-auto">
              <h1 className="text-center">PROFILE</h1>
            </div>
            <table className="table col-md-6 mx-auto">
              <tbody>
                <tr>
                  <td>User ID</td>
                  <td>{this.state._id}</td>
                </tr>
                <tr>
                  <td>Name</td>
                  <td>{this.state.name}</td>
                </tr>
                <tr>
                  <td>Email</td>
                  <td>{this.state.email}</td>
                </tr>
                <tr>
                  <td>Instagram Link</td>
                  <a>https://.www.{this.state.igLink}</a>
                </tr>
                <tr>
                  <td>Facebook Link</td>
                  <a>https://.www.{this.state.fbLink}</a>
                </tr>
              </tbody>
            </table>



            <div className="col-sm-1">
              <div class="row" style={{ width: "100%", textAlign: "center" }}>
                <button type="submit" onClick={this.myFunctionP} className="btn btn-md">Change Password</button>
              </div>
            </div>

            <div id="PmyDIV" style={{ display: "none" }}>
              <ChangePassCC />
            </div>

          </div>
        </div>
      </div>
    )
  }
}

export default CCProfile
