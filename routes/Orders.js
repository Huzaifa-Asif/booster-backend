var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();
var db = mongoose.connection;
var Schema = mongoose.Schema;
var dbUrl = 'mongodb://localhost:27017/emp';
var Order = Schema({
    userId: String,
    userName: String,
    email: String,
    user: String,
    description: String,
    price: Number,
    image: String,
    contentCreator: String,
    contentCreatorId: String,
    type: String,
    city: String,
    text: String,
    numberOfMessages: Number,
    template: String,
    category: String,
    additionalInfo: Array,
    emailAddresses: Array,
    status: String,
    payment: Boolean,
    url: String,
    date: {
        type: Date,
        default: Date.now
    }
});
var Order = mongoose.model('Order', Order);
db.on('error', function () {
    console.log('there was an error communicating with the database');
});
mongoose.connect(dbUrl, function (err) {
    if (err) {
        return console.log('there was a problem connecting to the database!' + err);
    }
});
var setpermission = function (req, res, next) {

    res.setHeader('Access-Control-Allow-Methods', '*')

    res.setHeader('Access-Control-Allow-Origin', '*')

    //        res.setHeader('Access-Control-Allow-Headers', 'origin, x-requested-with, content-type,Authentication,Accept')
    res.setHeader('Access-Control-Allow-Headers', '*')
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
}
router.get('/orders', setpermission, function (req, res, next) {

    Order.find({payment:true}).sort('date').exec(function (error, results) {
        if (error) {
            return next(error);
        }
        // Respond with valid data
        res.json(results);
    });
});

router.put('/updatepayment/:user', (req, res, next) => {
    Order.updateMany({
        user : req.params.user
    },
    { $set: { payment: true } }, (error, result) => 
    {
        if (error) {
            throw error;
        }
        else{
            res.send(result)
        }
    })})

router.put('/editorder/:_id', (req, res, next) => {

    Order.findOneAndUpdate({ _id: req.params._id }, { $set: { url: req.body.url, status: "Complete" } }, (error, result) => {
        if (error) {
            throw error;
        }
        else{
            
    var nodemailer = require('nodemailer');
    var smtpTransport = require('nodemailer-smtp-transport');
    var transporter = nodemailer.createTransport(smtpTransport(
        {
        service: 'gmail',
        host: 'smtp.gmail.com',
        secure: true,
        auth: 
        {
            user: 'rnajam47@gmail.com',
            pass: 'Crisis777'
        }
    }));
    var mailOptions = {
        from: 'rnajam47@gmail.com',
        to: req.body.email,
        subject: 'Order Completed',
        text: 'Your order of ' + req.body.type + ' was completed. Kindly check your orders summary'
};
    transporter.sendMail(mailOptions, function (error, info) 
    {
        if (error) 
        {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
            console.log(req.body)
            res.send(result);
        }
    });
});

router.put('/complete/:_id/:email/:type', (req, res, next) => {

    Order.findOneAndUpdate({ _id: req.params._id }, { $set: { status: "Complete" } }, (error, result) => {
        if (error) {
            throw error;
        }
        else 
        {
            
    var nodemailer = require('nodemailer');
    var smtpTransport = require('nodemailer-smtp-transport');
    var transporter = nodemailer.createTransport(smtpTransport(
        {
        service: 'gmail',
        host: 'smtp.gmail.com',
        secure: true,
        auth: 
        {
            user: 'rnajam47@gmail.com',
            pass: 'Crisis777'
        }
    }));
    var mailOptions = {
        from: 'rnajam47@gmail.com',
        to: req.params.email,
        subject: 'Order Completed',
        text: 'Your order of ' + req.params.type + ' was completed. Kindly check your orders summary'
};
    transporter.sendMail(mailOptions, function (error, info) 
    {
        if (error) 
        {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
            console.log(req.body)
            res.send(result);
        }
    });
});


router.post('/addorder', setpermission, function (req, res, next) {
    const today = new Date()
    ord = new Order();
    ord.userId = req.body.userId;
    ord.userName = req.body.userName;
    ord.email = req.body.email;
    ord.user = req.body.user;
    ord.description = req.body.description;
    ord.price = req.body.price;
    ord.type = req.body.type;
    ord.city = req.body.city;
    ord.text = req.body.text;
    ord.numberOfMessages = req.body.numberOfMessages;
    ord.template = req.body.template;
    ord.category = req.body.category;
    ord.additionalInfo = req.body.additionalInfo;
    ord.emailAddresses = req.body.emailAddresses;
    ord.image = req.body.image;
    ord.contentCreator = req.body.contentCreator;
    ord.contentCreatorId = req.body.contentCreatorId;
    ord.status = req.body.status;
    ord.payment = req.body.payment;
    ord.date = today

    ord.save(function (error, results) {
        if (error) {
            return next(error);
        }
        // Respond with valid data
        res.json(results);
        console.log(ord._id)
    });
});
router.delete('/delorder/:_id', setpermission, function (req, res, next) {
    e_id = req.params._id;
    Order.deleteOne({ _id: e_id }, function (error, results) {
        if (error) {
            return next(error);
        }
        // Respond with valid data
        res.json(results);
    });
});


router.get('/userorders/:_id', setpermission, function (req, res, next) {
    Order.find({
        userId: req.params._id,
        payment:true
    }, function (error, results) {
        if (error) {
            return next(error);
        }
        // Respond with valid data
        res.json(results);
        console.log(results)
    });
});

router.get('/:_id', setpermission, function (req, res, next) {
    e_id = req.params._id;
    Order.findOne({ _id: e_id }, function (error, results) {
        if (error) {
            return next(error);
        }
        // Respond with valid data
        res.json(results);
    });
});

router.get('/orders/:user', setpermission, function (req, res, next) {
    Order.find({
        user: req.params.user,
        payment: false
    }).populate('Order').exec(function (error, results) {
        if (error) {
            return next(error);
        }
        // If valid user was not found, send 404
        if (!results) {
            res.status(404).send('No Record Found');
        }
        else {
            // Respond with valid data
            res.json(results);
        }
    });
});

router.get('/social/:contentCreatorId', setpermission, function (req, res, next) {
    Order.find({
        contentCreatorId: req.params.contentCreatorId
    }).populate('Order').exec(function (error, results) {
        if (error) {
            return next(error);
        }
        // If valid user was not found, send 404
        if (!results) {
            res.status(404).send('No Record Found');
        }
        else {
            // Respond with valid data
            res.json(results);
        }
    });
});

router.get('/type/:type', setpermission, function (req, res, next) {
    Order.find({
        type: req.params.type,
        payment: true
    }).populate('Order').exec(function (error, results) {
        if (error) {
            return next(error);
        }
        // If valid user was not found, send 404
        if (!results) {
            res.status(404).send('No Record Found');
        }
        else {
            // Respond with valid data
            res.json(results);
        }
    });
});

router.get('/', function (req, res, next) {
    res.end("Hello");
});


module.exports = router;