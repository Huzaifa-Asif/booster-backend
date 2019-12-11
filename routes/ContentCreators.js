const express = require('express')
const contentcreators = express.Router()
const cors = require('cors')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const ContentCreator = require('../models/ContentCreator')
contentcreators.use(cors())

process.env.SECRET_KEY = 'secret'

contentcreators.post('/register', (req, res) => {
  const today = new Date()
  const userData = {
    name:req.body.name,
    email: req.body.email,
    password:req.body.password,
    igShoutoutPrice: req.body.igShoutoutPrice,
    igLink:req.body.igLink,
    igCategory:req.body.igCategory,
    fbShoutoutPrice: req.body.fbShoutoutPrice,
    fbLink:req.body.fbLink,
    fbCategory:req.body.fbCategory,
    paypalId:req.body.paypalId,
    profilePic:req.body.profilePic,
  }

  ContentCreator.findOne({
    email: req.body.email
  })
    .then(contentcreator => {
      if (!contentcreator) {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          // userData.password = hash
          ContentCreator.create(userData)
            .then(user => {
              res.json({ status: contentcreator.email + 'Registered!' })
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


contentcreators.post('/login', (req, res) => {
  console.log(req.body)
  if(req.body.email!="admin"){
    ContentCreator.findOne({
      email: req.body.email
    })
      .then(user => {
        if (user) {
          if (req.body.password=== user.password) {
            // Passwords match
            const payload = {
              _id: user._id,
              name: user.name,
              igLink: user.igLink,
              email: user.email,
              igCategory: user.igCategory,
              fbLink:user.fbLink,
              fbCategory:user.fbCategory,
              profilePic:user.profilePic
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
        console.log(err)
      })}
      else{
        if(req.body.password==="admin"){
          const payload = {
            _id: 1,
            name: "Rana Najam",
            admin:true
          }
          let token = jwt.sign(payload, process.env.SECRET_KEY, {
            expiresIn: 1440
          })
          res.send(token)
        }
      }
})


contentcreators.put('/changepass/:_id', (req, res)=>{
  ContentCreator.findOneAndUpdate({
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

contentcreators.get('/name/:name', function(req, res, next) {
  ContentCreator.find({
    name:req.params.name
  }).sort({name:1}).exec(function(error, results) {
if (error) {
return next(error);
}
// Respond with valid data
res.json(results);
});
});

contentcreators.get('/', function(req, res, next) {
  ContentCreator.find().sort({name:1}).exec(function(error, results) {
if (error) {
return next(error);
}
// Respond with valid data
res.json(results);
});
});

contentcreators.get('/instagram', function(req, res, next) {
  ContentCreator.find(
    {igShoutoutPrice:!null}
  ).exec(function(error, results) {
if (error) {
return next(error);
}
// Respond with valid data
res.json(results)
});
});


contentcreators.get('/facebook', function(req, res, next) {
  ContentCreator.find(
    {fbShoutoutPrice:!null}
  ).exec(function(error, results) {
if (error) {
return next(error);
}
// Respond with valid data
res.json(results)
});
});
module.exports = contentcreators













// var express = require('express');
// var mongoose = require('mongoose');
// var router = express.Router();
// var db = mongoose.connection;
// var Schema = mongoose.Schema;
// var dbUrl = 'mongodb://localhost:27017/emp';
// var ContentCreator = Schema({
//     name: String,
//     email: String,
//     password: String,
//     igShoutPrice: Number,
//     igVidPrice: Number,
//     igLink:String,
//     igCategory:String,
//     fbShoutPrice: Number,
//     fbVidPrice:Number,
//     fbLink:String,
//     fbCategory:String,
// });


// var ContentCreator = mongoose.model('ContentCreator', ContentCreator);
// db.on('error', function () {
// console.log('there was an error communicating with the database');
// });

// mongoose.connect(dbUrl, function (err) {
// if (err) {
// return console.log('there was a problem connecting to the database!' + err);
// }
// });


// var setpermission = function(req,res,next)
// {  
    
//         res.setHeader('Access-Control-Allow-Methods', '*')
    
//         res.setHeader('Access-Control-Allow-Origin', '*')

// //        res.setHeader('Access-Control-Allow-Headers', 'origin, x-requested-with, content-type,Authentication,Accept')
// res.setHeader('Access-Control-Allow-Headers', '*')        
//         res.setHeader('Access-Control-Allow-Credentials', true);  
// next();    
// }

    
// router.post('/register',setpermission, function(req, res, next) {
//     cc= new ContentCreator();
//     cc.name= req.body.name;
//     cc.email= req.body.email;
//     cc.igShoutPrice= req.body.igShoutPrice;
//     cc.igVidPrice= req.body.igVidPrice;
//     cc.igLink=req.body.igLink;
//     cc.igCategory=req.body.igCategory;
//     cc.fbShoutPrice= req.body.fbShoutPrice;
//     cc.fbVidPrice=req.body.fbVidPrice;
//     cc.fbLink=req.body.fbLink;
//     cc.fbCategory=req.body.fbCategory;
//         cc.save(function(err, results) {
// if (err) {
// return next(err);
// }
// // Respond with valid data
// res.json(results);
// console.log(cc.name)
// });
// });


// router.get('/', function(req, res, next) {
//     res.end("Hello");
//     });
    

// module.exports = router;




// cc= new ContentCreator();
// cc.name= req.body.name;
// cc.email= req.body.email;
// cc.igShoutPrice= req.body.igShoutPrice;
// cc.igVidPrice= req.body.igVidPrice;
// cc.igLink=req.body.igLink;
// cc.igCategory=req.body.igCategory;
// cc.fbShoutPrice= req.body.fbShoutPrice;
// cc.fbVidPrice=req.body.fbVidPrice;
// cc.fbLink=req.body.fbLink;
// cc.fbCategory=req.body.fbCategory;