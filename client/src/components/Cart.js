import React, { Component } from 'react';
import Navbar from'./Navbar'
import Axios from 'axios';
import ReactNotification from 'react-notifications-component'
import jwt_decode from 'jwt-decode'
import PaypalButton from './PaypalButton';
import {delorder, incompleteFormNotification, errorNotificationOnAdd, showNotificationOnAdd} from './UserFunctions';

let token = localStorage.usertoken

const CLIENT = {
  sandbox: 'Ac-QK_Lkar46qQDWcp1kega6aPk13SxXv3dkCVX7A2Nlw7BViP3JyDUQQg-6W386yjgaeEHTuaO9BxGx',
  production: 'xxxXXX',
};
const ENV = process.env.NODE_ENV === 'production'
  ? 'production'
  : 'sandbox';

const API = 'http://localhost:5000/orders/orders/'+token;


class cart extends Component {
  constructor() {
    super()
    this.state = {
      total:0,
      Orders:[],
      first_name: '',
      last_name: '',
      email: '',
      age: '',
      errors: {},
      result:'',
      id:'',
      price:'',
      serviceTag:"",
      priceTag:''
    }
  }

  onClick(e){
    e.preventDefault()
    console.log(e.target.id)
    delorder(e.target.id)
    window.location.reload()
  }

  componentDidMount() {

    const token = localStorage.usertoken
            const decoded = jwt_decode(token)
            this.setState({
                id: decoded._id,
                first_name: decoded.first_name,
                last_name: decoded.last_name,
                email: decoded.email,
                age: decoded.age
            })

    fetch(API)
    .then(response => response.json())
  .then(data => {
    console.log(data)
    data.forEach(orders=>
      {
      this.setState({
        total:this.state.total+orders.price
      })
    })
    this.setState({ Orders: data })
  }
  )}

    render() {

      
    const onSuccess = (payment) =>
    {
      console.log(payment)
      let token = localStorage.usertoken
      Axios.put('http://localhost:5000/orders/updatepayment/'+token)
      .then(function(response) 
            {
                if (response) {
                  console.log(response.data)
                  showNotificationOnAdd("Payment Succesful")
                  window.location.reload()
                } else {
                  alert("NOT")
                }
              })
    }
    // console.log('Successful payment!', payment);
  const onError = (error) =>{
    console.log('Erroneous payment OR failed to load script!', error)
    incompleteFormNotification("Payment Error")
    ;}
  const onCancel = (data) =>{
    console.log('Cancelled payment!', data);
    errorNotificationOnAdd("Payment Cancelled")
  }


      const {Orders} = this.state;
        return (
            <div>
        <Navbar />
        <ReactNotification/>
        <div className="contentMainContainer">
      <div className="container">
      <div className="content-sec">
            <h2>Your Cart</h2>
          </div>
        
          
          <table className="table col-md-6 padding-right-20">
            <h6><b>Cart Items for : {this.state.first_name} {this.state.last_name}</b></h6>
            <tbody>
              <tr style={{backgroundColor:"steelblue"}}>
                <th width ="20%"><b>Order ID</b> </th>
                <th width ="20%"><b>Service Type</b></th>
                <th width ="20%"><b>Price</b></th>
                <th width ="20%"></th>
              </tr>
              {Orders.map(emp =>
              <tr>
                <td key={emp._id}>{emp._id}</td>
                <td key={emp.type}>{emp.type}</td>
                <td key={emp.price}>${(emp.price / 148).toFixed(2)}</td>
                <td key={emp.price}><button className="btn btn-danger"id={emp._id} onClick={this.onClick.bind(this)}>Delete Item</button></td>
              </tr>
              )}
            </tbody>
          </table>
          <hr/>
          <div className="col-lg-10 text-right"style={{marginLeft:"1.5%"}}>
          <h5><b>Total: ${(this.state.total / 148).toFixed(2)}</b></h5>
          </div>

          <div className="col-xl-10 text-right" style={{marginLeft:"3%"}}>
          <PaypalButton
          client={CLIENT}
          env={ENV}
          commit={true}
          currency={'USD'}
          total={(this.state.total / 148).toFixed(2)}
          onSuccess={onSuccess}
          onError={onError}
          onCancel={onCancel}
        />
        </div>
        </div>
      </div>
      </div>
        );
    }
}

export default cart;