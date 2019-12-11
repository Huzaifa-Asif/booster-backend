import React, { Component } from 'react'
import jwt_decode from 'jwt-decode'
import Navbar from './Navbar';

class AdminProfile extends Component {
  constructor() {
    super()
    this.state = {
    }
  }

  componentDidMount() {
    const token = localStorage.admintoken
    const decoded = jwt_decode(token)
    this.setState({
      _id: decoded._id,
      name: decoded.name
    })
    console.log(decoded)
  }

  render() {
    return (
      <div>
          <Navbar/>
      <div className="container">
        <div className="jumbotron mt-5">
          <div className="col-sm-8 mx-auto">
            <h1 className="text-center">PROFILE</h1>
          </div>
          <table className="table col-md-6 mx-auto">
            <tbody>
              <tr>
                <td>Admin ID</td>
                <td>{this.state._id}</td>
              </tr>
              <tr>
                <td>Admin Name</td>
                <td>{this.state.name}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      </div>
    )
  }
}

export default AdminProfile
