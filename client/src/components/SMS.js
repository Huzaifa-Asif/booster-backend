import React, { Component } from 'react'
import Navbar from './Navbar';
import ReactNotification from 'react-notifications-component'
import { addToCart, showNotificationOnAdd, errorNotificationOnAdd, incompleteFormNotification } from './UserFunctions'
import jwt_decode from 'jwt-decode'


class SMS extends Component {
  constructor() {
    super()
    this.state = {
      _id: '',
      first_name: '',
      last_name: '',
      email: '',
      age: '',
      package: [
        { description: "Select Package" },
        { description: "Package 1 - Minimum 500 0.6/sms", price: 0.6, min: 500, max: 999 },
        { description: "Package 2 - Minimum 1000 0.5/sms", price: 0.5, min: 1000, max: 1999 },
        { description: "Package 3 - Minimum 2000 0.3/sms", price: 0.3, min: 2000, max: 10000 }
      ],
      city: ["Islamabad", "Karachi", "Lahore", "Peshawar", "Quetta"],
      errors: {},
      value: '',
      budget: '',
      msg: '',
      total: '',
      min: 300,
      max: 500,
      description: '',
      rule: ''
    }

    this.handleChange = this.handleChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
    this.MakeItem = this.MakeItem.bind(this)
    this.displayPackage = this.displayPackage.bind(this)
    this.onChange = this.onChange.bind(this)
    this.handleChangeCity = this.handleChangeCity.bind(this)
    this.handleMessageChange = this.handleMessageChange.bind(this)
    this.rulesDisplay = this.rulesDisplay.bind(this)
  }
  componentDidMount() {
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

  rulesDisplay(e) {
    this.setState({ rule: <p style={{ fontSize: "12px", color: "red" }}>No explicit words <br /> Avoid promoting contraband <br /> Content will be reviewed by the admin <br /> Violation of rules will result in a permanent ban</p> })
  }

  handleChange(e) {
    this.state.package.forEach(packages => {
      if (packages.description === e.target.value) {
        this.setState({
          value: packages.price,
          min: packages.min,
          max: packages.max,
          description: packages.description,
          rule: "",
          total: packages.min * packages.price
        })
        let f1 = document.getElementById("f1")
        f1.value = packages.min
      }
    })
  }
  onSubmit(e) {
    e.preventDefault()
    const token = localStorage.usertoken
    let cartItem = {
      _id: this.state._id,
      userName: this.state.first_name + this.state.last_name,
      email: this.state.email,
      user: token,
      description: this.state.description,
      price: this.state.total,
      type: "SMS",
      city: this.state.target,
      text: this.state.msg,
      numberOfMsg: this.state.budget
    }
    if (this.state.msg !== '' && this.state.description !== "Select Package" && this.state.target !== "") {
      addToCart(cartItem)
      showNotificationOnAdd("Added To Cart")
      window.location.reload();
    }
    else {
      errorNotificationOnAdd("Incomplete Details")
    }

  }
  onChange(e) {
    console.log(`onChange fired with value: '${e.currentTarget.value}'`)
    if (e.target.value < this.state.min) {
      e.target.value = this.state.min
      this.setState({
        total: this.state.min * this.state.value,
        rule: ""
      })
    }
    else if (e.target.value > this.state.max) {
      e.target.value = this.state.max
      this.setState({
        total: this.state.max * this.state.value,
        rule: ''
      })
    }
    else {
      this.setState({
        budget: e.currentTarget.value,
        total: this.state.value * e.currentTarget.value,
        rule: ''
      })
    }
  }
  MakeItem = function (X) {
    return <option>{X}</option>;
  };
  displayPackage(X) {
    return <option>{X.description}</option>
  }
  handleChangeCity(e) {
    this.setState({ target: e.target.value, rule: '' });
  }
  handleMessageChange(e) {
    this.setState({ msg: e.target.value, rule: '' })
  }
  render() {
    return (
      <div>
        <div className="container">
          <Navbar />
          <ReactNotification />
          <div className="slider-sec w3-animate-left">
            <div className="slider single-item">
              <div ><img src={require('./images/bulksms2.gif')} alt=" " /></div>

            </div>
          </div>
          <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css"></link>
          <div className="content-sec w3-animate-zoom">
            <div className="row">
              <div className="large-12 columns text-center">
                <h2>Booster SMS Marketing Tool</h2>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
              </div></div>
          </div>
          <div className="content-sec">
            <h2>Send SMS in Bulk</h2></div>
          <div className="contentMainContainer" style={{ marginTop: "-20px" }}>
            <div className="formContainer" style={{ width: "75%", border: "none" }}>

              <div className="row" style={{ padding: "2%" }}>


                <form onSubmit={this.onSubmit}>

                  <div className="row">
                    <div className="col-sm-3">
                      <div className="img-box"><img src={require('./images/packagesmsbulk.gif')} alt="Service1" /></div>
                      <label><b style={{ fontSize: "13px" }}>
                        Select a desired package:
          <select onChange={this.handleChange} style={{ height: "150%" }}>
                          {this.state.package.map(this.displayPackage)}
                        </select>
                      </b>
                      </label></div>

                    <div className="col-sm-3">
                      <div className="img-box"><img src={require('./images/area.gif')} alt="Service1" /></div>
                      <label><b style={{ fontSize: "13px" }}>
                        Pick your target audience city:
          <select value={this.state.target} onChange={this.handleChangeCity}>
                          {this.state.city.map(this.MakeItem)}
                        </select>
                      </b></label>
                    </div>

                    <div className="col-sm-3">
                      <div className="img-box"><img src={require('./images/typingtext.gif')} alt="Service1" /></div>
                      <label><b style={{ fontSize: "13px" }}>
                        Input Text Message: <i title="information about logo" class="fas fa-info-circle" style={{ marginLeft: "6px" }} ></i> </b>
                        <textarea name="message" placeholder="Enter Message..." onChange={this.handleMessageChange} onClick={this.rulesDisplay} maxLength="120" />
                        {this.state.rule}
                      </label>
                    </div>

                    <div className="col-sm-3">
                      <div className="img-box"><img src={require('./images/quantity.gif')} alt="Service1" /></div>
                      <b style={{ fontSize: "13px" }}> Number of Messages:(Minimum:{this.state.min} Maximum:{this.state.max})
                    <input
                          id="f1"
                          type="number"
                          min={this.state.min}
                          max={this.state.max}
                          step="100"
                          placeholder="Enter number of messages you want to send"
                          onChange={this.onChange}
                        /></b></div>
                  </div>
                </form>

              </div></div>
            <div className="col-sm-3 text-center" style={{ marginLeft: "5%", marginRight: "5%" }}>
              <div className="img-box"><img src={require('./images/receipt.gif')} alt="Service1" /></div>
              <div className="txt-box text-left" style={{ marginTop: "-15px" }}>

                <hr /> <b>Your Total:{this.state.total}</b>
              </div>
              <button
                onClick={this.onSubmit.bind(this)}
                id="b1"
                type="submit"
                className="btn btn-md btn-primary btn-block">
                Add to Cart
                      </button>
            </div>

          </div></div></div>
    )
  }
}

export default SMS
