import React, { Component } from 'react';
import Table from 'react-bootstrap/Table'
import jwt_decode from 'jwt-decode'
import Axios from 'axios';
import { Link, withRouter } from 'react-router-dom'
import Modal from 'react-bootstrap/Modal'
import Navbar from './Navbar';

class AdminOrders extends Component {

    constructor(props) {
        super(props);
        this.state = {
            url: '',
            orders: [],
            order: [],
            count: 1,
            show: false,
            pending: false
        }
    }

    getOrdersSummary(){
        Axios.get('http://localhost:5000/orders/orders/')
            .then(response => {
                this.setState({orders:response.data})
                return response.data
            })
        }

    componentDidMount() {
        let token = localStorage.admintoken
        const decoded = jwt_decode(token)
        console.log(decoded)
        this.getOrdersSummary()
    }

    onClick(e) {
        Axios.get('http://localhost:5000/orders/' + e.target.value)
            .then(response => {
                console.log(response.data)
                this.setState({ order: response.data })
                this.setState({ show: true })
                if (response.data.status == 'Pending'&& response.data.type!="Instagram - Story") {
                    this.setState({ pending: true })
                }
                else {
                    this.setState({ pending: false })
                }
            })
    }

    changeType(e){
        if(e.target.value==="all"){
            this.getOrdersSummary()
        }
        else{
            Axios.get('http://localhost:5000/orders/type/'+e.target.value).then(response=>{
                this.setState({orders:response.data})
            })
        }
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }

    completeOrder(e) {
        //     let _id=e.target.value;
        //   let url=this.state.url;
        //   Axios.put('http://localhost:5000/orders/editorder/'+e.target.value,{url})
        //   .then(function(response) {
        //       if (response) {
        //         console.log(response.data)
        //       } else {
        //         alert("NOT")
        //       }
        //     }).then(function() {
        //         this.setState({show:false})
        //         window.location.reload()
        //     })
    }

    mapOrders() {
        let { order } = this.state
        let { count } = this.state
        const showModal =
            (
                <Modal
                    show={this.state.show}
                    onHide={() => this.setState({ show: false })}
                    dialogClassName="modal-90w"
                    aria-labelledby="example-custom-modal-styling-title">
                    <Modal.Header closeButton>
                        <Modal.Title id="example-custom-modal-styling-title">
                            Order Summary {this.state.order._id}
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {
                            Object.entries(order).map(([itemKeys, item]) => (
                                <label>{itemKeys}:{item}</label>
                            )
                            )
                        }
                        {
                            this.state.pending ? (<button>Complete</button>) : null
                        }
                    </Modal.Body>
                </Modal>
            )


        return (
            this.state.orders.map(order => (
                <tbody>
                    <tr>
                        <td>{count++}</td>
                        <td>
                            <button href='#' value={order._id} name={order} onClick={this.onClick.bind(this)}>{order._id}</button>
                        </td>
                        <td>{order.userName}</td>
                        <td>{order.type}</td>
                        <td>{order.date}</td>
                        <td>{order.status}</td>
                    </tr>
                    {
                        this.state.show ? showModal : null
                    }
                </tbody>
            ))
        )
    }

    render() {

        return (
            <div style={{paddingBottom:"5%"}}>
                <Navbar />
                <div className="row" style={{marginTop:"10px"}}>
                <select onChange={this.changeType.bind(this)}>
                    <option value='all'>All Orders</option>
                    <option value='SMS'>SMS Orders</option>
                    <option value='Website'>Website Orders</option>
                    <option value='Instagram - Post'>Instagram Post Orders</option>
                    <option value='Instagram - Story'>Instagram Story Orders</option>
                    <option value='Facebook - Post'>Facebook Post Orders</option>
                    <option value='Facebook - Story'>Facebook Story Orders</option>
                </select>
                </div>
                <Table striped bordered hover>
                    <thead>
                        <tr style={{backgroundColor:"steelblue"}}>
                            <th>#</th>
                            <th>Order ID</th>
                            <th>User Name</th>
                            <th>Type</th>
                            <th>Date</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    {this.mapOrders()}
                </Table>
            </div>
        );
    }
}

export default AdminOrders;