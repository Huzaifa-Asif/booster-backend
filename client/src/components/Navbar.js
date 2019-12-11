import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom' 



class Landing extends Component {
  logOut(e) {
    e.preventDefault()
    localStorage.removeItem('usertoken')
    localStorage.removeItem('cctoken')
    localStorage.removeItem('admintoken')
    this.props.history.push(`/`)
  }

  render() {

    const ccLink = (
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link to="/ccordersummary" className="nav-link">
          Orders History
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/ccprofile" className="nav-link">
          Profile
          </Link>
        </li>
        <li className="nav-item">
            <Link to="/" onClick={this.logOut.bind(this)} className="nav-link">
            Logout
          </Link>
        </li>
      </ul>
    )

    const adminLink = (
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link to="/orders" className="nav-link">
          Orders History
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/admin" className="nav-link">
          Profile
          </Link>
        </li>
        <li className="nav-item">
            <Link to="/" onClick={this.logOut.bind(this)} className="nav-link">
            Logout
          </Link>
        </li>
      </ul>
    )

    const loginRegLink = (
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link to="/guide" className="nav-link">
            Booster Guide
          </Link>
        </li>
        
        <li className="dropdown">
          <Link to="/cclogin" className="nav-link dropdown-toggle" data-toggle="dropdown" id="mydropdown">
            Partner Programme
          </Link>
        <div className= "dropdown-menu">
          
          <Link to="/contentcreator">
          <a href="#" className= "dropdown-item" style={{color:"black", marginTop:"5px"}}>
          <i class="fas fa-address-card" style={{fontSize:"20px", marginRight:"5px",color:"steelblue"}}></i>  
          Register</a>
          </Link>
          {/* <Link to="/change">
          <a href="#" className= "dropdown-item">Change Password</a>
          </Link> */}
          <Link to="/cclogin">
          <a href="#" className= "dropdown-item" style={{color:"black", marginTop:"5px"}}>
          <i class="fas fa-address-card" style={{fontSize:"20px", marginRight:"5px",color:"steelblue"}}></i>  
          Login
          </a>
          </Link>
          
        </div>
        </li>

          <li className="dropdown">
          <Link to="/sms" className="nav-link dropdown-toggle" data-toggle="dropdown" id="mydropdown">
            Services
          </Link>
          <div className= "dropdown-menu">
          
          <Link to="/editor">
          <a href="#" className= "dropdown-item">Brand Identity</a>
          </Link>
          
          </div>
        </li>
        <a href="https://www.theaweb.net/booster/support" style={{color:"#909D90", marginTop:"7px", marginLeft:"5px"}}><b>Support</b></a>
        
        <li className="nav-item">
          <Link to="/" className="nav-link">
            
          </Link>
        </li>
        {/* <li className="nav-item">
          <Link to="/login" className="nav-link">
            Login
          </Link>
        </li> */}
        {/* <li className="nav-item">
          <Link to="/register" className="nav-link">
            Register
          </Link>
        </li> */}
        {/* <li className="nav-item">
          <Link to="/forgot" className="nav-link">
            Forgot Password?
          </Link>
        </li> */}
      </ul>
    )

    const userLink = (
      <ul className="navbar-nav">
        
        <li className="nav-item">
          <Link to="/guide" className="nav-link">
            Booster Guide
          </Link>
        </li>
        
        <li className="dropdown">
          <Link to="/sms" className="nav-link dropdown-toggle" data-toggle="dropdown" id="mydropdown">
            Services
          </Link>
        <div className= "dropdown-menu">
          
          <Link to="/editor">
          <a href="#" className= "dropdown-item">Logo Editor</a>
          </Link>
          <Link to="/website">
          <a href="#" className= "dropdown-item">Website Services</a>
          </Link>
          <Link to="/sms">
          <a href="#" className= "dropdown-item">SMS Marketing</a>
          </Link>
          <Link to="/cclist">
          <a href="#" className= "dropdown-item">Instagram Promotions</a>
          </Link>
          <Link to="/ccfb">
          <a href="#" className= "dropdown-item">Facebook Promotions</a>
          </Link>
          <Link to="/flyer">
          <a href="#" className= "dropdown-item">Printing and Distribution</a>
          </Link>
          
        </div>
        </li>
        
        <li className="dropdown">
          <Link to="/profile" className="nav-link dropdown-toggle" data-toggle="dropdown" id="mydropdown">
            Settings
          </Link>
        <div className= "dropdown-menu">
          
          <Link to="/profile">
          <a href="#" className= "dropdown-item" style={{color:"black", marginTop:"5px"}}>
          <i class="fas fa-address-card" style={{fontSize:"20px", marginRight:"5px",color:"steelblue"}}></i>  
          User Profile</a>
          </Link>
          {/* <Link to="/change">
          <a href="#" className= "dropdown-item">Change Password</a>
          </Link> */}
          <a href="#" onClick={this.logOut.bind(this)} className="nav-link" style={{color:"black", marginLeft: "18px"}}>
          <i class="fas fa-sign-out-alt" style={{fontSize:"20px", marginRight:"5px", color:"steelblue"}}></i>
           Logout
          </a>
          
        </div>
        </li>

        <li className="nav-item">
          {/* <Link to="/cart" className="nav-link">
            View Cart
          </Link> */}
          <a href="/cart"><i class="fas fa-shopping-cart" style={{marginTop:"12px",marginLeft:"5px",marginRight:"5px",height:"20px", width:"20px", color:"grey",}}></i></a>
          
          
        </li>

        <li className="nav-item">
          <Link to="/userorders" className="nav-link">
            Orders History
          </Link>
        </li>

        <a href="https://www.theaweb.net/booster/support" style={{color:"#909D90", marginTop:"7px", marginLeft:"5px", fontSize:"16px"}}>Support</a>


        {/* <li className="nav-item">
          <Link to="/editor" className="nav-link">
            Logo Editor
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/website" className="nav-link">
            Website Marketing
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/sms" className="nav-link">
            SMS Marketing
          </Link>
        </li> */}

        
        {/* <li className="nav-item">
          <Link to="/change" className="nav-link">
            Change Password
          </Link>
        </li> */}
        
        {/* <li className="nav-item">
          <a href="" onClick={this.logOut.bind(this)} className="nav-link">
            Logout
          </a>
        </li> */}
      </ul>
    )

    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark"> 
      {/* <a className="navbar-brand" href="#"> <img src={require('./images/logobooster1.png')} alt="logo"></img> </a> */}
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarsExample10"
          aria-controls="navbarsExample10"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div
          className="collapse navbar-collapse justify-content-md-center"
          id="navbarsExample10"
        >
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link to="/" className="nav-link">
                Home
              </Link>
            </li>
          </ul>
          {localStorage.usertoken ? userLink : localStorage.admintoken ? adminLink :localStorage.cctoken ? ccLink :  loginRegLink}
        </div>
      </nav>
    )
  }
}

export default withRouter(Landing)
