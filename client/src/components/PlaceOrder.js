import React, { Component, useState } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import {showNotificationOnAdd, errorNotificationOnAdd, incompleteFormNotification} from './UserFunctions'
import Container from '@material-ui/core/Container';
import Navbar from './Navbar';
import axios from 'axios';
import ReactNotification from 'react-notifications-component'
import { Link, withRouter } from 'react-router-dom'
import { addToCart } from './UserFunctions'
import jwt_decode from 'jwt-decode'
const API = 'http://localhost:5000/orders/addorder';



class PlaceOrder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            _id: '',
            first_name: '',
            last_name: '',
            email: '',
            age: '',
            data: '',
            image: '',
            setImage: '',
            loading: false,
            setLoading: false,
            selectedFile: '',
            postType: '',
            description: ''
        }
    }

    componentDidMount() {
        if (this.props.history.action === "PUSH") {
            this.setState({ data: this.props.history.location.contentCreator.cc })
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
        else if (this.props.history.action === "POP") {
            this.setState({ data: '' })
        }
        console.log(this.props.history)
    }

    uploadImage = async e => {
        this.setState({ loading: true })
        const fd = new FormData();
        fd.append('file', e.target.files[0])
        fd.append("api_key", '748379222569347');
        fd.append("api_secret", 'TUd8nJDCu2WFSGfSNOeWhMdakEU');
        fd.append("cloud_name", 'dq13q6ddj');
        fd.append('upload_preset', 'worzzv8t')
        axios.post('https://api.cloudinary.com/v1_1/dq13q6ddj/image/upload', fd).then(
            response => {
                const file = response.json
                console.log(response.data.url)
                console.log(response)
                this.setState({ image: response.data.url })
                this.setState({ loading: false })
            }
        )
    }

    showNotification(){
    }

    onSubmit(e) {
        e.preventDefault()
        const token = localStorage.usertoken
        const decoded = jwt_decode(token)
        let type;
        let price;
        if(this.state.data.igShoutoutPrice!=null)
        {
            type="Instagram - "+this.state.postType
            price=this.state.data.igShoutoutPrice
        }
        else
        {
            type="Facebook - "+this.state.postType
            price=this.state.data.fbShoutoutPrice
        }
        let cartItem = {
            _id: this.state._id,
            userName: this.state.first_name + this.state.last_name,
            email: this.state.email,
            userId:decoded._id,
            user: localStorage.usertoken,
            description: this.state.description,
            price: price,
            type:type,
            image: this.state.image,
            contentCreator: this.state.data.name,
            contentCreatorId: this.state.data._id,
            status:"Pending",
            payment:false
        }
        if(this.state.postType!=""&& this.state.image!=""){
                fetch(API, {
                    method: "POST",
                    body: JSON.stringify(cartItem),
                    headers: {
                      "Content-Type": "application/json"
                    }}).then(function(response) {
                      if (response.ok) {
                        console.log(response)
                        showNotificationOnAdd("Added to cart")
                      }
                       else {
                          errorNotificationOnAdd("Error")
                      }
                    })
            }
            else{
                incompleteFormNotification("Incomplete Form")
            }
        
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }

    displayPage() {
        if (this.state.data != '') {
            const { data } = this.state;
            return (
                <div>
                    <Navbar />
                    <ReactNotification/>
                    <React.Fragment>
                                <h4>Let {data.name} Promote You</h4>
                                <select name="postType" onChange={this.onChange.bind(this)}>
                                    <option value='null'>Choose Post Type</option>
                                    <option value="Post">Post</option>
                                    <option value="Story">Story</option>
                                </select>
                                <input type="file"
                                    accept="image"
                                    name="file"
                                    placeholder="Upload Image for Shootout"
                                    onChange={this.uploadImage.bind(this)}
                                />
                                {
                                    this.state.loading ? (<h3>Loading...</h3>) : (<img width="80" height="80" alt="upload an image" src={this.state.image} />)
                                }
                                <textarea name="description" onChange={this.onChange.bind(this)} placeholder="Enter Description" />
                                <button onClick={this.onSubmit.bind(this)}>Add To Cart</button>
                    </React.Fragment>
                </div>
            );
        }
        else {
            return (
                <div>
                    <h3>Timeout Error -
                        <Link to={{ pathname: '/' }}>
                            Go Back
                             </Link>
                    </h3>
                </div>
            )
        }
    }

    render() {
        return (<div>{this.displayPage()}</div>)
    }
}

export default PlaceOrder;