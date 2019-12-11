import React, { Component } from 'react';
import Navbar from './Navbar'
import Domain from './Domain'
import Hosting from './Hosting'
import WebPackages from './WebPackages'


class website extends Component {
    constructor() {
        super()
        this.domainPage = this.domainPage.bind(this)
        this.webPage = this.webPage.bind(this)
    }

    domainPage(e) {
        e.preventDefault()
        this.props.history.push(`/domain`)
    }

    webPage(e) {
        this.props.history.push(`/webpackages`)
    }
    hostingPage(e) {
        this.props.history.push(`/hostingpackages`)
    }


    myFunctionD() {
        var x = document.getElementById("DmyDIV");
        if (x.style.display === "none") {
            x.style.display = "block";
        } else {
            x.style.display = "none";
        }
    }

    myFunctionW() {
        var x = document.getElementById("WmyDIV");
        if (x.style.display === "none") {
            x.style.display = "block";
        } else {
            x.style.display = "none";
        }
    }

    myFunctionH() {
        var x = document.getElementById("HmyDIV");
        if (x.style.display === "none") {
            x.style.display = "block";
        } else {
            x.style.display = "none";
        }
    }



    render() {
        return (
            <div className="container1" data-reactroot data-reactid='1'>
                <div className="container">
                    <Navbar />

                    <div className="slider-sec w3-animate-left">
                        <div className="slider single-item">
                            <div ><img src={require('./images/banner-web-development.png')} alt=" " /></div>

                        </div>
                    </div>
                    <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css"></link>

                    <div className="content-sec w3-animate-zoom">
                        <div className="row">
                            <div className="large-12 columns text-center">
                                <h2>Booster Web Development</h2>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                            </div></div>
                    </div>


                    <div class="btn-group-justified" style={{ width: "100%", textAlign: "center" }}>
                        <div class="btn-group col-md-4"style={{ width: "33%", textAlign: "center" }}>
                            <button href="/domain" onClick={this.myFunctionD} className="btn btn-lg btn-primary btn-block">Domain</button>
                        </div>
                        <div class="btn-group col-md-4"style={{ width: "33%", textAlign: "center" }}>
                            <button type="submit" onClick={this.myFunctionH} className="btn btn-lg btn-primary btn-block">Hosting</button>
                        </div>
                        <div class="btn-group col-md-4"style={{ width: "33%", textAlign: "center" }}>
                            <button type="submit" onClick={this.myFunctionW} className="btn btn-lg btn-primary btn-block">Build Your Website</button>
                        </div>
                    </div>
                    <hr/>
 
                    
                    <div id="DmyDIV" style={{ display: "none" }}>
                        <Domain />
                    </div>

                    <div id="HmyDIV" style={{ display: "none" }}>
                        <Hosting />
                    </div>

                    <div id="WmyDIV" style={{ display: "none" }}>
                        <WebPackages />
                    </div>







                    <hr></hr>

                </div>
            </div>

        );
    }
}

export default website;