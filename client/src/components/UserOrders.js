import React, { Component } from 'react';
import Table from 'react-bootstrap/Table'
import jwt_decode from 'jwt-decode'
import Axios from 'axios';
import { Link, withRouter } from 'react-router-dom'
import Modal from 'react-bootstrap/Modal'
import Navbar from './Navbar';

class UserOrders extends Component {
    constructor(props) {
        super(props);
        this.state = {
            url: '',
            userOrder: [],
            order: [],
            count: 1,
            show: false,
            pending: false
        }
    }

    componentDidMount() {
        let token = localStorage.usertoken
        const decoded = jwt_decode(token)
        console.log(decoded)
        Axios.get('http://localhost:5000/orders/userorders/' + decoded._id)
            .then(response => {
                console.log(response.data)
                this.setState({ userOrder: response.data })
            })
    }

    onClick(e) {
        console.log(e.target.value)
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
                    </Modal.Body>
                </Modal>
            )


        return (
            this.state.userOrder.map(order => (
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

        const { userOrder } = this.state;

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

export default UserOrders;