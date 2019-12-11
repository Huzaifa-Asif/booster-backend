import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import Landing from './components/Landing'
import Login from './components/Login'
import Register from './components/Register'
import Profile from './components/Profile'
import Change from './components/Change'
import Forgot from './components/Forgot'
import Guide from './components/guide'
import About from './components/About'
import SMS from './components/SMS'
import Website from './components/Website'
import Cart from './components/Cart'
import Domain from './components/Domain'
import AdminProfile from './components/AdminProfile'
import Flyer from './components/Flyer'
import WebPackages from './components/WebPackages'
import Edit2 from './components/Edit2'
import Edit from './components/Edit'
import CCRegister from './components/CCRegister'
import PlaceOrder from './components/PlaceOrder'
import CCLogin from './components/CCLogin'
import CCProfile from './components/CCProfile'
import CCOrderSummary from './components/CCOrderSummary'
import AdminOrders from './components/AdminOrders'
import Navbar from './components/Navbar'
import UserOrders from './components/UserOrders'
import Hosting from './components/Hosting'
import Ibm from './components/Ibm'
import CClist from './components/CCList'
import CCFacebook from './components/CCFacebook'

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">        
          <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
          <Route exact path="/" component={Landing} />
          <div className="container">
            <Route exact path="/admin" component={AdminProfile} />
            <Route exact path="/orders" component={AdminOrders}/>
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/profile" component={Profile} />
            <Route exact path="/change" component={Change} />
            <Route exact path="/forgot" component={Forgot} />
            <Route exact path="/guide" component={Guide} />
            <Route exact path="/about" component={About} />
            <Route exact path="/sms" component={SMS} />
            <Route exact path="/website" component={Website} />
            <Route exact path="/domain" component={Domain} />
            <Route exact path="/hosting" component={Hosting}/>
            <Route exact path="/cart" component={Cart} />
            <Route exact path="/flyer" component={Flyer} />
            <Route exact path="/webpackages" component={WebPackages} />
            <Route exact path="/editor" component={Edit2} />
            <Route exact path="/edit" component={Edit} />
            <Route exact path="/contentcreator" component={CCRegister} />
            <Route exact path="/cclist" component={CClist} />
            <Route exact path="/ccfb" component={CCFacebook} />
            <Route exact path="/placeorder/" component={PlaceOrder}/>
            <Route exact path="/cclogin/" component={CCLogin}/>
            <Route exact path="/ccprofile/" component={CCProfile}/>
            <Route exact path="/ccordersummary" component={CCOrderSummary}/>
            <Route exact path="/userorders" component={UserOrders}/>
            <Route exact path="/ibm" component={Ibm}/>
          </div>


          <div className="newsletter">
          <div className="row">
            <div className="large-12 columns">
              <h2 className="white">Subscribe to our newsletter</h2>
              <p>Sign up for our mailing list to get latest updates and offers.</p>
            </div>
            <div className="large-2 medium-2 columns hide-for-small">&nbsp;</div>
            <div className="large-8 medium-8 small-12 columns">
              <form action>
                <input placeholder="Email Address..." className="radius" type="text" />
                <input name className="button radius" defaultValue="Subscribe" type="submit" />
              </form>
            </div>
            <div className="large-2 medium-2 columns hide-for-small">&nbsp;</div>
          </div>
        </div>
        {/* <div className="footer-sec">
          <div className="row">
            <div className="large-3 medium-3 small-12 columns">
              <div className="foot-1">
                <h4>Quick Links</h4>
                <ul>
                  <li><a href="" title="Home">Home</a></li>
                  <li><a href="" title="About Us">About Us</a></li>
                  <li><a href="" title="FAQs">Booster Guide</a></li>
                  <li><a href="" title="Services">Login</a></li>
                  <li><a href="" title="Contact">Register</a></li>
                  <li><a href="" title="Contact">Forgot Password</a></li>
                </ul>
              </div>
            </div>
            <div className="large-3 medium-3 small-12 columns">
              <div className="foot-1">
                <h4>Services</h4>
                <ul>
                  <li><a href="" title="Services">Lorem Ipsum</a></li>
                  <li><a href="" title="Services">Lorem Ipsum</a></li>
                  <li><a href="" title="Services">Lorem Ipsum</a></li>
                  <li><a href="" title="Services">Lorem Ipsum</a></li>
                  <li><a href="" title="Services">Lorem Ipsum</a></li>
                </ul>
              </div>
            </div>
            <div className="large-4 medium-3 small-12 columns">
              <div className="foot-1">
                <h4>Address</h4>
                <p>add your address here! <br />
                  +1 (123) 456-7890-321</p>
                <ul>
                  <li><a href="mailto:info@companyname.com" target="_blank">info@booster.com</a></li>
                  <li><a href="tel:(01) 800 854 633" target="_blank">(01) 800 854 633</a></li>
                </ul>
              </div>
            </div>
            <div className="large-2 medium-3 small-12 columns">
              <div className="foot-1">
                <h4>Follow Us</h4>
                <div className="social">
                  <div className="facebook"><a href="#" className="facebook" /></div>
                  <div className="twitter"><a href="#" className="twitter" /></div>
                  <div className="gplus"><a href="#" className="gplus" /></div>
                </div>
              </div>
            </div>
          </div>
        </div> */}
        <div className="copy">
          <div className="row">
            <div className="large-12 columns">
              <a href=""></a> Website By <a href="">Booster</a>
            </div>
          </div>
        </div>

          
        </div>
      </Router>
    )
  }
}

export default App
