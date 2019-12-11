import React, { Component } from 'react';
import Table from 'react-bootstrap/Table'
import jwt_decode from 'jwt-decode'
import Axios from 'axios';
import { Link, withRouter } from 'react-router-dom'
import Modal from 'react-bootstrap/Modal'
import Navbar from './Navbar';

class CCOrderSummary extends Component {
    constructor(props) {
        super(props);
        this.state = {
            url: '',
            contentCreator: [],
            order: [],
            count: 1,
            show: false,
            pending: false
        }
    }

    componentDidMount() {
        let token = localStorage.cctoken
        const decoded = jwt_decode(token)
        console.log(decoded)
        Axios.get('http://localhost:5000/orders/social/' + decoded._id)
            .then(response => {
                console.log(response.data)
                this.setState({ contentCreator: response.data })
            })
    }

    onClick(e) {
        Axios.get('http://localhost:5000/orders/' + e.target.value)
            .then(response => {
                console.log(response.data.type)
                this.setState({ order: response.data })
                this.setState({ show: true })
                if (response.data.status == 'Pending') {
                    this.setState({ pending: true })
                }
                else {
                    this.setState({ pending: false })
                }
            })
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }

    completeOrder(e) {
        console.log(e.target.value)
        let _id = e.target.value;
        let url = this.state.url;
        if (this.state.url !== "") {
            Axios.put('http://localhost:5000/orders/editorder/' + e.target.value, { url })
                .then(function (response) {
                    if (response) {
                        console.log(response.data)
                    } else {
                        alert("NOT")
                    }
                }).then(function () {
                    window.location.reload()
                })
        }
        else {
            alert("Please Provide a URL")
        }
        this.setState({ show: false })
    }


    mapOrders() {
        let {count} = this.state
        let { contentCreator } = this.state
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
                        <label>Order ID:{this.state.order._id}</label><hr />
                        <label>User Name:{this.state.order.userName}</label><hr />
                        <label>User Email:{this.state.order.email}</label><hr />
                        <label>Order Type:{this.state.order.type}</label><hr />
                        <label>Order Date:{this.state.order.date}</label><hr />
                        <label>Status:{this.state.order.status}</label><hr />
                        <label>Shoutout Image:</label>
                        <img src={this.state.order.image}></img>
                        {
                            this.state.pending ? (
                                <div>
                                    <input value={this.state.url} name="url" onChange={this.onChange.bind(this)} type="text" placeholder="Enter Url" />
                                    <button value={this.state.order._id} onClick={this.completeOrder.bind(this)}>Complete Order</button>
                                </div>
                                ) : (<p>Proof Url : {this.state.order.url}</p>)
                        }
                    </Modal.Body>
                </Modal>
            )


        return (
            contentCreator.map(order => (
                <tbody>
                    <tr>
                        <td>{count++}</td>
                        <td>
                            <button href='#' value={order._id} onClick={this.onClick.bind(this)}>{order._id}</button>
                        </td>
                        <td>{order.userName}</td>
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

        const { contentCreator } = this.state;

        return (
            <div>
                <Navbar />
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Order ID</th>
                            <th>User Name</th>
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

export default CCOrderSummary;