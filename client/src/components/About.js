import React, { Component } from 'react'
import {
  Link,
} from 'react-router-dom';
import Navbar from './Navbar';

import './css/foundation.css';

//import './slick/slick.css';
import './css/style.css';
import './css/responsive.css';
//import './image/x-icon';

import ReactCSSTransitionGroup from 'react-addons-css-transition-group'; 
class About extends Component {
  render() {
    return (
      <div >
      <Navbar/>        
     
      <div>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Booster</title>
        <link rel="stylesheet" href="css/foundation.css" />
        <link rel="stylesheet" type="text/css" href="slick/slick.css" />
        <link rel="stylesheet" href="css/style.css" />
        <link rel="stylesheet" href="css/responsive.css" />
        <link rel="shortcut icon" type="image/x-icon" href="favicon.ico" />
        <div className="row">
          <div className="large-4 medium-4 small-12 columns">
            <div id="logo"><a href=""></a></div>
          
       
          </div>
          
        </div>
        <div className="slider-sec">
          <div className="slider single-item">
          <div style={{textAlign:"center", width:"100%"}}><img src={require('./images/sourceBanner23.gif')} alt=" " /></div>
            {/*<div><img src={require('./images/slide2.jpg')} alt=" " /></div>*/}
          </div>
          
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
        <div className="footer-sec">
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
        </div>
        <div className="copy">
          <div className="row">
            <div className="large-12 columns">
              <a href=""></a> Website By <a href="">Booster</a>
            </div>
          </div>
        </div>
      </div>
      </div>
    )
  }
}

export default About
