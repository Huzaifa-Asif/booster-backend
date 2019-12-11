const express = require('express')
const users = express.Router()
const cors = require('cors')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const User = require('../models/User')
users.use(cors())

process.env.SECRET_KEY = 'secret'

users.post('/register', (req, res) => {
  const today = new Date()
  const userData = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    password: req.body.password,
    age: req.body.age,
    created: today
  }

  User.findOne({
    email: req.body.email
  })
    .then(user => {
      if (!user) {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          // userData.password = hash
          User.create(userData)
            .then(user => {
              res.json({ status: user.email + 'Registered!' })
            })
            .catch(err => {
              res.send('error: ' + err)
            })
        })
      } else {
        res.json({ error: 'User already exists' })
      }
    })
    .catch(err => {
      res.send('error: ' + err)
    })
})

users.put('/changepass/:_id', (req, res)=>{
  User.findOneAndUpdate({
    _id:req.params._id,
    password:req.body.password}, { $set: { password: req.body.newPassword } }
  ).then(user => {
    if(user){
      res.send("Changed")
    }
    else{
      res.send("Mismatch")
    }
  })
})

users.post('/login', (req, res) => {
  User.findOne({
    email: req.body.email
  })
    .then(user => {
      if (user) {
        if (req.body.password=== user.password) {
          // Passwords match
          const payload = {
            _id: user._id,
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            password: user.password,
            age: user.age
          }
          let token = jwt.sign(payload, process.env.SECRET_KEY, {
            expiresIn: 1440
          })
          res.send(token)
          console.log(user._id)
        } else {
          // Passwords don't match
          res.json({ error: 'User does not exist' })
        }
      } else if (!results) {
        res.status(404).send('No Record Found');
        }
    })
    .catch(err => {
      res.send('error: ' + err)
    })
})

users.get('/profile', (req, res) => {
  var decoded = jwt.verify(req.headers['authorization'], process.env.SECRET_KEY);

  User.findOne({
    _id: decoded._id
  })
    .then(user => {
      if (user) {
        
        res.json(user)
      } else {
        res.send('User does not exist')
      }
    })
    .catch(err => {
      res.send('error: ' + err)
    })
})

users.get('/forgot/:email', (req, res) => {
  var nodemailer = require('nodemailer');
  var smtpTransport = require('nodemailer-smtp-transport');

  console.log(req.params.email)
  
User.findOne({email:req.params.email},function(err,user)
{
  if(err)
  res.json(err);
  else if(user)
  {
    let password=user.password;
    var transporter = nodemailer.createTransport(smtpTransport({
            service: 'gmail',
            host: 'smtp.gmail.com',
            secure: true,
            auth: {
              user: 'rnajam47@gmail.com',
              pass: 'Crisis777'
            }
          }));
          var mailOptions = {
                  from: 'rnajam47@gmail.com',
                  to: req.params.email,
                  subject: 'Sending Email using Node.js[nodemailer]',
                  text:  'Your password is: '+password
                }; 
                transporter.sendMail(mailOptions, function(error, info){
                        if (error) {
                          console.log(error);
                        } else {
                          console.log('Email sent: ' + info.response);
                        }
                      });   
                      res.json(user.password)
                      res.send;     
  }
  else
  res.json('User not Found')
});

users.get('/domain/:url', (req, res) =>  {
  
var dns = require ( 'dns' )
var url = ''
console.log(req.params.url)
url = req.params.url;
function checkAvailable(name) {
  //uses the core modules to run an IPv4 resolver that returns 'err' on error
  dns.resolve4( name, function (err, addresses) {
    if (err) console.log (name + " is possibly available : " + err)
  })
}
// calls the function of a given url        
checkAvailable( url );
res.send;
}) 

  });
module.exports = users