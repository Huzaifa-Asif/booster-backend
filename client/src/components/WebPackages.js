import React, { Component } from 'react';
import Navbar from './Navbar'
import './website_packages/image.css'
import pkg1 from './website_packages/pkg1.png'
import pkg2 from './website_packages/pkg2.png'
import pkg3 from './website_packages/pkg3.png'
import { Standard, Business } from './PackageWebsite'
import { Professional } from './PackageWebsite'
import { Advanced } from './PackageWebsite'
import { Portfolio } from './PackageWebsite'
import { ECommerce } from './PackageWebsite'
import { addToCart, showNotificationOnAdd } from './UserFunctions'
import jwt_decode from 'jwt-decode'
import './css/animation.css';


class WebPackages extends Component {
  constructor() {
    super()
    this.state = {
      _id: '',
      first_name: '',
      last_name: '',
      email: '',
      age: '',
      errors: {},
      pkg: '',
      category: '',
      additionalInfo: [],
      template: '',
      price: '',
      emailAddresses: ["", "", "", "", "", "", "", "", "", ""],
      companyName: '',
      domainName: ''
    }
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

  onClick(e) {
    this.setState({ pkg: e.target.name })
    if (e.target.name === 'pkg1') {
      this.setState({ price: 39250 })
    }
    else if (e.target.name === 'pkg2') {
      this.setState({ price: 70650 })
    }
    else {
      this.setState({ price: 117750 })
    }
  }

  addInfoChild(e) {
    this.setState({ additionalInfo: [...this.state.additionalInfo, ""] })
  }

  removeInfo(index) {
    this.state.additionalInfo.splice(index, 1)
    console.log(this.state.additionalInfo, "$$$$")
    this.setState({ additionalInfo: this.state.additionalInfo })
  }

  handleChildChange(e, index) {
    this.state.additionalInfo[index] = e.target.value
    this.setState({ addInfoChild: this.state.additionalInfo })
  }

  categoryChange(e) {
    this.setState({ category: e.target.value })
  }

  selectTemplateChild(e) {
    this.setState({ template: e.target.value })
  }

  addToCart(e) {
    e.preventDefault()
    const token = localStorage.usertoken
    let cartItem = {
      _id: this.state._id,
      userName: this.state.first_name + this.state.last_name,
      email: this.state.email,
      user: token,
      description: this.state.pkg,
      price: this.state.price,
      type: "Website",
      template: this.state.template,
      category: this.state.category,
      additionalInfo: this.state.additionalInfo,
      emailAddresses: this.state.emailAddresses,
      text: this.state.companyName
    }
    addToCart(cartItem)
    showNotificationOnAdd("Added to cart!")
    window.location.reload();
  }
  addEmail(e, index) {
    this.state.emailAddresses[index] = e.target.value
    this.setState({ emailAddresses: this.state.emailAddresses })
  }

  companyName(e) {
    this.setState({ companyName: e.target.value })
  }
  domainName(e) {
    this.setState({ domainName: e.target.value })
  }
  render() {
    const pkg = this.state.pkg
    let packages;
    let category;

    if (pkg === "pkg1") {
      console.log("standard")
      packages = <Standard
        handleChange={this.handleChildChange.bind(this)}
        addInfo={this.addInfoChild.bind(this)}
        onChange={this.categoryChange.bind(this)}
        additionalInfo={this.state.additionalInfo} 
        removeInfo={this.removeInfo.bind(this)}
        addEmail={this.addEmail.bind(this)}
        emailAddresses={this.state.emailAddresses}
        companyName={this.companyName.bind(this)}
        domainName={this.domainName.bind(this)}
      />
      if (this.state.category === "Portfolio") {
        category = <Portfolio
          addToCart={this.addToCart.bind(this)}
          selectTemplate={this.selectTemplateChild.bind(this)} />
      }
      else if (this.state.category === "Business") {
        category = <Business
          addToCart={this.addToCart.bind(this)}
          selectTemplate={this.selectTemplateChild.bind(this)} />
      }

    }
    else if (pkg === "pkg2") {
      console.log("professional")
      packages = <Professional
        handleChange={this.handleChildChange.bind(this)}
        addInfo={this.addInfoChild.bind(this)}
        onChange={this.categoryChange.bind(this)}
        additionalInfo={this.state.additionalInfo}
        removeInfo={this.removeInfo.bind(this)}
        addEmail={this.addEmail.bind(this)}
        emailAddresses={this.state.emailAddresses}
      />
      if (this.state.category === "E-Commerce") {
        category = <ECommerce
          addToCart={this.addToCart.bind(this)}
          selectTemplate={this.selectTemplateChild.bind(this)} />
      }
      else if (this.state.category === "Portfolio") {
        category = <Portfolio
          addToCart={this.addToCart.bind(this)}
          selectTemplate={this.selectTemplateChild.bind(this)} />
      }
      else if (this.state.category === "Business") {
        category = <Business
          addToCart={this.addToCart.bind(this)}
          selectTemplate={this.selectTemplateChild.bind(this)} />
      }
    }
    else if (pkg === "pkg3") {
      console.log("advanced")
      packages = <Advanced
        handleChange={this.handleChildChange.bind(this)}
        addInfo={this.addInfoChild.bind(this)}
        onChange={this.categoryChange.bind(this)}
        additionalInfo={this.state.additionalInfo}
        removeInfo={this.removeInfo.bind(this)}
        addEmail={this.addEmail.bind(this)}
        emailAddresses={this.state.emailAddresses}
      />
      if (this.state.category === "E-Commerce") {
        category = <ECommerce
          addToCart={this.addToCart.bind(this)}
          selectTemplate={this.selectTemplateChild.bind(this)} />
      }
      else if (this.state.category === "Portfolio") {
        category = <Portfolio
          addToCart={this.addToCart.bind(this)}
          selectTemplate={this.selectTemplateChild.bind(this)} />
      }
      else if (this.state.category === "Business") {
        category = <Business
          addToCart={this.addToCart.bind(this)}
          selectTemplate={this.selectTemplateChild.bind(this)} />
      }
    }
    else {
      packages = <h6><b>...</b></h6>
    }

    return (
      <div className=" text-center w3-animate-right">
        <div className="container">

          <div className="w3container content-sec">
            <h2 className="text-center">Booster Website Packages</h2>
          </div>
          <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css"></link>
        </div>
        <h6 style={{ textAlign: "center", marginTop: "-30px" }}><b>(Click on a package to select)</b></h6>
        <div className="row">


          <div className="packages" style={{ width: "33%", padding: "5px" }}><img onClick={this.onClick.bind(this)} name="pkg1" style={{height:"500px"}} src={pkg1} /> </div>
          <div className="packages" style={{ width: "33%", padding: "5px" }}><img style={{height:"500px"}} name="pkg2" onClick={this.onClick.bind(this)} src={pkg2} /></div>
          <div className="packages" style={{ width: "33%", padding: "5px" }}><img style={{height:"500px"}} name="pkg3" onClick={this.onClick.bind(this)} src={pkg3} /></div>

          {/* <div className="packages" style={{width:"33%",padding:"5px"}}><img src={require('./website_packages/pkg1.png')} onClick={this.onClick.bind(this)} style={{height:"600px"}}/></div>
<div className="packages" style={{width:"33%",padding:"5px"}}><img src={require('./website_packages/pkg2.png')} name="pkg2" className="images-item" onClick={this.onClick.bind(this)} style={{height:"600px"}}/></div>              
<div className="packages" style={{width:"33%",padding:"5px"}}><img  className="images-item" name="pkg3" onClick={this.onClick.bind(this)} src= {require('./website_packages/pkg3.png')} style={{height:"600px"}}/></div>
               */}

        </div>


        
        <div className="formContainer" style={{width:"80%", marginTop:"20px"}}>
            <div className="col-sm-8 mx-auto" style={{marginBottom:"50px"}}>
              {packages}
              {category}
            </div></div>
      </div>
    );
  }
}

export default WebPackages;