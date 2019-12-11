import React, { Component } from 'react'
import Navbar from './Navbar';


// import './css/foundation.css';

// //import './slick/slick.css';
// import './css/style.css';
import './css/animation.css';
import ReactNotification from 'react-notifications-component'
import { store } from 'react-notifications-component';
import "animate.css"
import 'react-notifications-component/dist/theme.css'
import { showNotificationOnAdd } from './UserFunctions';



class Guide extends Component {
  
  constructor() {
    super()
    this.state = {
      mBudget: '',
      errors: {},
      opted: [],
      sms: '',
      website: '',
      hosting: '',
      domain: '',
      flyer: '',
      social: '',
      logo: '',
      services:
        [
          {
            id: 1,
            name: "Bulk SMS",
            price: 300
          },
          {
            id: 6,
            name: "Build Your Website",
            price: 35500
          },
          {
            id: 7,
            name: "Get Domain",
            price: 775
          },
          {
            id: 2,
            name: "Logo",
            price: 200
          },
          {
            id: 3,
            name: "Social Media Boost",
            price: 600
          },
          {
            id: 4,
            name: "Hosting for your Website",
            price: 1400
          },
          {
            id: 5,
            name: "Flyer Design",
            price: 200
          }
        ],
      text: [],
      greet: '',
      sum: 0
    }

    this.handleInputChange = this.handleInputChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.assign;
    this.assignOpted;
    this.temp;
  }

 

  assign(x) {
    this.setState({
      opted: [...this.state.opted, x]
    })
    return this.state.opted
  }
  async assignOpted(n) {
    let b = await this.assign(n)
    return b;
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    var arr = this.state.opted;

    if (value === true) {
      if (name === "website") {
        this.assignOpted("Build Your Website")
        this.setState({ website: true })
      }
      if (name === "domain") {
        this.assignOpted("Get Domain")
        this.setState({ domain: true })
      }
      if (name === "sms") {
        this.assignOpted("Bulk SMS")
        this.setState({ sms: true })
      }
      else if (name === "hosting") {
        this.assignOpted("Hosting for your Website")
        this.setState({ hosting: true })
      }
      else if (name === "logo") {
        this.assignOpted("Logo")
        this.setState({ logo: true })
      }
      else if (name === "social") {
        this.assignOpted("Social Media Boost")
        this.setState({ social: true })
      }
      else if (name === "flyer") {
        this.assignOpted("Flyer Design")
        this.setState({ flyer: true })
      }
    }
    else {
      for (var i = 0; i < this.state.opted.length; i++) {
        if (name === this.state.opted[i]) {
          arr.splice(i, 1);
          this.setState({
            opted: arr
          })
        }
      }
    }
  }

  guide() {
    let results = this.state.services;
    let i = 0;
    this.state.services.forEach(services => {
      this.state.opted.forEach(opted => {
        if (services.name === opted) {
          delete results[i]
        }
      });
      if (services.price >= this.state.mBudget) {
        delete results[i]
        console.log(services.price)
      }
      i = i + 1;
    });
    this.setState({
      text: this.state.services
    })
    return results;
  }

  
  
  onSubmit(e) {
    e.preventDefault()
    let p = this.guide()
    if (this.state.mBudget <= 10000 && this.state.mBudget > 5000) {
      this.setState({
        services: p,
        greet: "Welcome, you can acquire the following services to uplift your campaign:"
      });
      showNotificationOnAdd("Budget Plan Generated")
    }
    else if (this.state.mBudget <= 5000 && this.state.mBudget > 499) {
      this.setState({
        services: p,
        greet: "Following services are under your budget:"
      });
      showNotificationOnAdd("Budget Plan Generated")
    }
    else if (this.state.mBudget > 360000) {
      this.setState({
        services: p,
        greet: "Welcome, your budget is great!You can launch a massive campaign for your product(s) by acquiring the following services:"
      });
      showNotificationOnAdd("Budget Plan Generated")
    }
    else if (this.state.mBudget < 500) {
      this.setState({
        greet: "Enter Budget greater than 500 PKR"
      })
      showNotificationOnAdd("Budget Plan Generated")
    }
  }
  handleChange(e) {
    console.log(`onChange fired with value: '${e.currentTarget.value}'`)
    this.setState({ mBudget: e.target.value })
  }

 

  render() {
    let logo
    let flyer
    let website
    let domain
    let hosting
    let sms
    let social

    // if (this.state.logo) {
    //   logo = <p>Register to build your website and market your business via SMS, Flyer Distribution and Social Media Posts</p>
    // }
    
    // if (this.state.flyer) {
    //   flyer = <p>Register to build your website and market your business via SMS, Flyer Distribution and Social Media Posts</p>
    // }
    // if (this.state.website) {
    //   website = <p>Great! You can still enhance your business via our services of Bulk SMS, Flyer Distribution and Social Media Posts</p>
    // }

    return (
      <div className="container1" data-reactroot data-reactid='1'>
        <Navbar />
        <ReactNotification />

        <div className="slider-sec w3-animate-left">
          <div className="slider single-item">
            <div ><img src={require('./images/guide2.jpg')} alt=" " style={{width:"100%"}}/></div>
            
          </div>
        </div>

        {/* <div className="Row" style={{ width: "100%", height: "250px", display: "block", backgroundColor: "grey", }}> */}
          {/* <div className="column" style={{ width: "50%", height: "235px", display: "inline-block", backgroundColor: "red", marginBttom: "10px", marginTop: "10px", marginLeft: "10px" }}>
            <h1 style={{ fontSize: "14px", textAlign: "center" }}>

              Some Text
            </h1>
            <p style={{ width: "50%", height: "200px", padding: "10px" }}>
              hellohuihiubuibuihuiiuhiuhiuhiuhiuhuihiuhiuhiuhuiuhiiuihiuhiuiuhiuhiuhiuhi
              uhiuhewiuhfrweferhkfejrkfhklfasjdkfsdkfhskjfhskldvhsdkljvhskjvhdsfkhxvkjshck
                  xhskdchkdjfhxkcjvhskdv</p>
          </div> */}




          {/* <div className="page-Data">
          
            <h1 style={{textDecorationStyle:"wavy", textAlign:"center", color:"grey", }}>
              Booster guide
            </h1>
            <p style={{textAlign:"center", fontSize: "24px"}}>
              here we have the perfect guide for you, just sign up with booster and get started
            </p>
          </div> */}
          
          <div className="content-sec w3-animate-zoom">
          <div className="row">
            <div className="large-12 columns text-center">
              <h2>Welcome to Booster Guide</h2>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            </div></div>
        </div> 

        <div className="content-sec">
          <h2>Generate a Business Plan</h2>
        
        
        {/* </div> */}
         
        <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css"></link>
          <div className="contentMainContainer" >
            <div className="formContainer">
              <form onSubmit={this.onSubmit} style={{marginLeft:"15px"}}>
                <h3 className="text-center">Launch a campaign with budget as low as 500pkr</h3>
                <h5 style={{marginLeft:"15px"}}>Please select from the following services you already are using:</h5>
<div className="row">
  
  <div className="col-sm-4">
  <div className="img-box"><img src={require('./images/thanks-adobe.gif')} alt="Service1" /></div>
  <div className="txt-box text-left"style={{marginTop:"-15px"}}>
                <h5><b>Brand Identity</b></h5>
                <label style={{ color: "black", fontSize:"14px"}}>
                 <b> Logo</b>
               <i title="information about logo" class="fas fa-info-circle" style={{ marginLeft: "6px" }}></i>
                </label>

                <input
                  name="logo"
                  type="checkbox"
                  onChange={this.handleInputChange} />
                {logo}
                <br />
                <label style={{ color: "black", fontSize:"14px"}}
                ><b>Flyer & Brochure Design</b>
                <i title="information about Flyer" class="fas fa-info-circle" style={{ marginLeft: "6px" }}></i>
                </label>
                <input
                  name="flyer"
                  type="checkbox"
                  onChange={this.handleInputChange} />{flyer}<br />
                </div>
                </div>
<div className="col-sm-4">
<div className="img-box"><img src={require('./images/webserviceEdit.gif')} alt="Service1" /></div>
<div className="txt-box text-left"style={{marginTop:"-15px"}}>
               <h5><b>Website Services</b></h5>
                <label style={{ color: "black", fontSize:"14px"}}
                ><b>Website</b>
                <i title="information about Flyer" class="fas fa-info-circle" style={{ marginLeft: "6px" }}></i>
                </label>
                <input
                  name="website"
                  type="checkbox"
                  onChange={this.handleInputChange} />{website}<br />
                <label style={{ color: "black", fontSize:"14px"}}
                ><b>Domain</b>
                <i title="information about Flyer" class="fas fa-info-circle" style={{ marginLeft: "6px" }}></i>
                </label>
                <input
                  name="domain"
                  type="checkbox"
                  onChange={this.handleInputChange} /><br />
                <label style={{ color: "black", fontSize:"14px"}}
                ><b>Hosting</b>
                <i title="information about Flyer" class="fas fa-info-circle" style={{ marginLeft: "6px" }}></i>
                </label>
                <input
                  name="hosting"
                  type="checkbox"
                  onChange={this.handleInputChange} />
                </div>
                </div>
<div className="col-sm-4">
<div className="img-box"><img src={require('./images/service3.gif')} alt="Service1" /></div>
<div className="txt-box text-left"style={{marginTop:"-15px"}}>
                <h5><b>Marketing Services</b></h5>
                <label style={{ color: "black", fontSize:"14px"}}
                ><b>Bulk SMS</b>
                <i title="information about Flyer" class="fas fa-info-circle" style={{ marginLeft: "6px" }}></i>
                </label>
                <input
                  name="sms"
                  type="checkbox"
                  onChange={this.handleInputChange} /><br />
                <label style={{ color: "black", fontSize:"14px"}}
                ><b>Social Media Boost</b>
                <i title="information about Flyer" class="fas fa-info-circle" style={{ marginLeft: "6px" }}></i>
                </label>
                <input
                  name="social"
                  type="checkbox"
                  onChange={this.handleInputChange} />
                <br/>
                </div>
                </div>
                </div>
                <b style={{color: "black", fontSize:"18px", marginLeft:"15px"}}>Budget:</b>
                    <input style={{marginLeft:"15px", width:"96%"}}
                  type="number"
                  min="500"
                  max="100000"
                  placeholder="Enter your budget"
                  value={this.state.mBudget}
                  onChange={this.handleChange}
                />

                <button style={{marginLeft:"15px"}}
                  type="submit"
                  id="btnAnimate"
                  className="btn btn-lg btn-primary btn-block"
                  style={{marginBottom:"15px" , marginLeft:"15px"}}>
                  Submit
               </button>

              </form>
              </div>
              
           <div className="formContainer2" id="bgImage">
           <h3 style={{textAlign:"center"}}>Your Ideal Business Plan</h3>
              <div className="generatedPlan">
                
            <h4>
              {this.state.greet}
            </h4>
            <span>
              {
                this.state.text.map((text, key) => {
                  return (
                    <div>
                      <div key={key}>
                        <b>{text.name}</b><br />
                        Price Starting From {text.price} pkr
                            </div>
                      <hr />
                    </div>
                  )
                })
              }
            </span>
          </div>
          </div>

          </div>
          
                    
          
        </div>
        <hr style={{width: "50%", margin:"auto",borderwidth: "20px" }}></hr>

        
        <div className="content-sec">

        <div className="guide-thumbs" style={{ width:"100%", textAlign:"center"}}>
            <h2> Booster Guides for you </h2>
            <div className="Web Guide" style={{width:"33%", display:"inline-block"}}>
            <img src={require('./images/developguide.gif')} alt="" style={{width:"80%", borderRadius:"10px"}}/>
           
              <div className="txt-box text-center">
              <h3>Launch a Website</h3>
                <p>sdfgsdgsdfg
                  sdgsdgsdg
                </p>
                <a href="#" className="button radius" id="btnAnimate"> View</a>
              </div>
              
            </div>
          
          
            <div className="Market Guide" style={{width:"33%", display:"inline-block"}}>
            <img src={require('./images/socialguide.gif')} alt="" style={{width:"80%", borderRadius:"10px"}}/>
            <div className="txt-box text-center">
              <h3>Grow with Digital Marketing</h3>
                <p>sdfgsdgsdfg
                  sdgsdgsdg
                </p>
                <a href="#" className="button radius" id="btnAnimate"> View</a>
              </div>
            </div>

            <div className="Brand Guide" style={{width:"33%", display:"inline-block"}}>
            <img src={require('./images/strongbrand.gif')} alt="" style={{width:"80%", borderRadius:"10px"}}/>
            <div className="txt-box text-center">
              <h3>Build a Strong Brand</h3>
                <p>sdfgsdgsdfg
                  sdgsdgsdg
                </p>
                <a href="#" className="button radius" id="btnAnimate"> View</a>
              </div>
            </div>

          </div>

          </div>
      </div>
      

    )
  }
}

export default Guide
