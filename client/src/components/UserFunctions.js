import React, { Component }  from 'react';
import './css/animation.css';
import ReactNotification from 'react-notifications-component'
import { store } from 'react-notifications-component';
import "animate.css"
import 'react-notifications-component/dist/theme.css'
import axios from 'axios'

let cartItem;

export const showNotificationOnAdd = (message) => {
  store.addNotification({
    title:message,
    message:"Success",
    type:"success",
    container:"top-right",
    insert:"top",
    animationIn:["animated","fadeIn"],
    animationOut:["animated","fadeOut"],
    width: 400,
    dismiss:{
      duration: 2000,
      showIcon: true
    },
  })
}

export const incompleteFormNotification = (message) => {
  store.addNotification({
    title:message,
    message:"Success",
    type:"warning",
    container:"top-right",
    insert:"top",
    animationIn:["animated","fadeIn"],
    animationOut:["animated","fadeOut"],
    width: 400,
    dismiss:{
      duration: 2000,
      showIcon: true
    },
  })
}

export const errorNotificationOnAdd = (message) => {
  store.addNotification({
    title:message,
    message:"Oops",
    type:"danger",
    container:"top-right",
    insert:"top",
    animationIn:["animated","fadeIn"],
    animationOut:["animated","fadeOut"],
    width: 400,
    dismiss:{
      duration: 2000,
      showIcon: true
    },
  })
}


export const register = newUser => {
  return axios
    .post('users/register', {
      first_name: newUser.first_name,
      last_name: newUser.last_name,
      email: newUser.email,
      password: newUser.password,
      age: newUser.age
    })
    .then(response => {
      return response
    })
}

export const registerContentCreator = newUser => {
  return axios
    .post('contentcreators/register', {
      name: newUser.name,
      email: newUser.email,
      password:newUser.password,
      igShoutoutPrice: newUser.igShoutoutPrice,
      igLink:newUser.igLink,
      igCategory:newUser.igCategory,
      fbShoutoutPrice: newUser.fbShoutoutPrice,
      fbLink:newUser.fbLink,
      fbCategory:newUser.fbCategory,
      paypalId:newUser.paypalId,
      profilePic:newUser.profilePic
    })
    .then(response => {
      return response
    })
}
export const loginContentCreator = user => {
  return axios
    .post('contentcreators/login', {
      email: user.email,
      password: user.password
    })
    .then(response => {
      // localStorage.setItem('cctoken', response.data)
      console.log(response);
      return response
    })
    .catch(err => {
      if(err){  
        console.log(err)
        // window.location.reload()
      }
    })
}


export const login = user => {
  return axios
    .post('users/login', {
      email: user.email,
      password: user.password
    })
    .then(response => {
      localStorage.setItem('usertoken', response.data)
      console.log(response);
      return response
    })
    .catch(err => {
      if(err){  
        console.log(err)
        // window.location.reload()
      }
    })
}

export const forgot = email => {
  return axios
    .get('users/forgot/'+email)
    .then(response => {
      console.log(response)
      return response.data
    })
    .catch(err => {
      console.log(err)
    })
}

export const domain = name => {
  return axios
    .get('users/domain/'+name)
    .then(response => {
      console.log(response)
      return response.data
    })
    .catch(err => {
      console.log(err)
    })
}

export const delorder = _id => {
  return axios
    .delete('orders/delorder/'+_id)
    .then(response => {
      console.log(response)
      return response.data
    })
    .catch(err => {
      console.log(err)
    })
}

export const addToCart = item =>{
  return axios
  .post('orders/addorder',{
    userId:item._id,
    userName:item.userName,
    email:item.email,
    user:item.user,
    description: item.description,
    price: item.price,
    type: item.type,
    city: item.city,
    text: item.text,
    numberOfMessages:item.numberOfMessages,
    template:item.template,
    category:item.category,
    additionalInfo:item.additionalInfo,
    emailAddresses:item.emailAddresses,
    status:"Pending",
    payment:false
  })
  .then(response =>{
    return response
  })
}
