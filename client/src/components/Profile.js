import React, { Component } from 'react'
import jwt_decode from 'jwt-decode'
import Navbar from './Navbar';
import Change from './Change';
import './css/animation.css';

class Profile extends Component {
  constructor() {
    super()
    this.state = {
      id:'',
      first_name: '',
      last_name: '',
      email: '',
      age: '',
      errors: {}
    }
  }

  componentDidMount() {
    const token = localStorage.usertoken
    const decoded = jwt_decode(token)
    this.setState({
      _id: decoded._id,
      oldPassword:decoded.password,
      first_name: decoded.first_name,
      last_name: decoded.last_name,
      email: decoded.email,
      age: decoded.age
    })
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
      {/* <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" /> */}
        <Navbar />
        <div className="contentMainContainer">
      <div className="container">
      <div className="content-sec">
            <h2><b>Profile Panel</b></h2>
          </div>
        
          

<div className="col-md-12">
          <table className="table col-md-8 max-auto ">
            <tbody>
              <tr style={{backgroundColor:"steelblue"}}> 
              <td>.</td>
              <td>.</td>
              </tr>
              <tr>
                <td>User ID</td>
                <td>{this.state._id}</td>
              </tr>
              <tr>
                <td>Fist Name</td>
                <td>{this.state.first_name}</td>
              </tr>
              <tr>
                <td>Last Name</td>
                <td>{this.state.last_name}</td>
              </tr>
              <tr>
                <td>Email</td>
                <td>{this.state.email}</td>
              </tr>
              <tr>
                <td>Age</td>
                <td>{this.state.age}</td>
              </tr>
            </tbody>
          </table>

          <div className="col-sm-1">
          <div class="row"style={{ width: "100%", textAlign: "center" }}>
          <button type="submit" onClick={this.myFunctionP} className="btn btn-md btn-warning">Change Password</button>
          </div>
          </div>
          </div>

  <div className="col-md-12 max-auto">
  <div id="PmyDIV" style={{ display: "none"}}>
                        <Change />
                    </div>

  </div>

  
          



          

          

                    </div>
      </div>
      </div>
      

    )
  }
}

export default Profile
