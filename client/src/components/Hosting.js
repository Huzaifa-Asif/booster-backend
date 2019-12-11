import React, { Component } from 'react';
import Navbar from './Navbar';
import './css/animation.css';
import ReactNotification from 'react-notifications-component'
import { addToCart, showNotificationOnAdd, errorNotificationOnAdd } from './UserFunctions';
import jwt_decode from 'jwt-decode'
const API = 'http://localhost:5000/orders/addorder';

class Hosting extends Component {
    constructor(props) {
        super(props);
        this.state={
            _id: '',
            first_name: '',
            last_name: '',
            email: '',
            age: '',
            price:"",
            description:''
        }
    }
    

    setPrice(e){
        if(e.target.value==="1000")
        {
            this.addToCart(1000,"Basic")
        }
        else if(e.target.value==="4000"){
            this.addToCart(4000,"Pro")
        }
        else{
            this.addToCart(7000,"Premium")
        }
    }

    addToCart = (price,pkg ) =>{
        const token = localStorage.usertoken
        const decoded = jwt_decode(token)
        let cartItem = {
            userName: decoded.first_name +" "+ decoded.last_name,
            email: decoded.email,
            userId:decoded._id,
            user: localStorage.usertoken,
            description:pkg,
            price: price,
            type:"Hosting",
            status:"Pending",
            payment:false
        }
            fetch(API, {
                method: "POST",
                body: JSON.stringify(cartItem),
                headers: {
                  "Content-Type": "application/json"
                }}).then(function(response) {
                  if (response.ok) {
                    console.log(response)
                    showNotificationOnAdd('Added to cart')
                  } else {
                      errorNotificationOnAdd("Failed to add in cart")
                  }
            })
    }

    render() {
        return (
            <div>
                <ReactNotification/>
                <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css"></link>
                <div className='contentMainContainer'>
                    
                        <div className="col-md w3-animate-left" style={{padding:"7px",border:"2px", borderStyle:"solid", borderColor:"steelblue", boxShadow:"0px 0px 6px 2px grey"}}>
                            <div className="text-center"><h3>Basic Package</h3></div>
                            <ul className="pricew text-left">
                                <li className="row" style={{backgroundColor:"steelblue", textAlign:"center"}}><h5 style={{marginLeft:"35%"}}><b> PKR 1000 / Year</b></h5></li>
                                <li>10GB Storage</li>
                                <li>Upto 10 Emails</li>
                                <li>10 Domains</li>
                                <li>1GB Bandwidth</li>
                                </ul>
                                <button className="btn btn-lg btn-primary btn-block"style={{textAlign:"center", height:"50px", width:"100%"}} value='1000'  onClick={this.setPrice.bind(this)}>Add to Cart</button>
                            
                        </div>

                        <div className="col-md w3-animate-opacity" style={{padding:"7px", border:"2px", borderStyle:"solid", borderColor:"steelblue", boxShadow:"0px 0px 6px 2px grey", marginLeft:"5px"}}>
                        <div className="text-center"><h3>Pro Package</h3></div>
                            <ul className="price">
                            <li className="row" style={{backgroundColor:"steelblue", textAlign:"center"}}><h5 style={{marginLeft:"35%"}}><b> PKR 4000 / Year</b></h5></li>
                                
                                <li>25GB Storage</li>
                                <li>Upto 25 Emails</li>
                                <li>25 Domains</li>
                                <li>2GB Bandwidth</li>
                                </ul>
                                <button className="btn btn-lg btn-primary btn-block"style={{textAlign:"center", height:"50px", width:"100%"}} value='4000' onClick={this.setPrice.bind(this)}>Add to Cart</button>
                            
                        </div>

                        <div className="col-md w3-animate-right" style={{padding:"7px",border:"2px", borderStyle:"solid", borderColor:"steelblue", boxShadow:"0px 0px 6px 2px grey", marginLeft:"5px"}}>
                        <div className="text-center"><h3>Premium Package</h3></div>
                            <ul className="price">
                            <li className="row" style={{backgroundColor:"steelblue", textAlign:"center"}}><h5 style={{marginLeft:"35%"}}><b> PKR 7000 / Year</b></h5></li>
                                
                                <li>50GB Storage</li>
                                <li>50 Emails</li>
                                <li>50 Domains</li>
                                <li>5GB Bandwidth</li>
                                </ul>
                                <button className="btn btn-lg btn-primary btn-block"style={{textAlign:"center", height:"50px", width:"100%"}} value='7000' onClick={this.setPrice.bind(this)}>Add to Cart</button>
                            
                        </div>
                    
                </div>
            </div>
        );
    }
}

export default Hosting;