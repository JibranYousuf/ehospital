const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const User = require('../models/user');

//Register
router.post('/register', (req,res,next) =>{
let newUser = new User({
    constName: req.body.constName,
    constEmail: req.body.constEmail,
    constUsername: req.body.constUsername,
    password: req.body.password,
    constUserType: req.body.constUserType,
    constCnic: req.body.constCnic,
});
    User.addUser(newUser, (err, user)=>{
        if(err){
                res.json(
                    {
                    success: false, msg: 'failed to register user'
                    });
                }
        else{
            res.json(
                {
                    success: true, msg: 'User Registered'
                });
            }
    });
});

//Authenticate
router.post('/authenticate', (req,res) =>{
   
        const constCnic = req.body.constCnic;
        const password = req.body.password; 
        User.getUserByCnic(constCnic, (err, user) =>{
        if(err) throw err;
        if(!user){
            return res.json({
                success: false, msg: 'user not found'
                            });
        }
        User.comparePassword(password, user.password, (err, isMatch) =>{
            if(err) throw err;
            if(isMatch){
                let payload = {
                    _id: user._id,
                    constName: user.constName,
                    constUsername: user.constUsername,
                    constEmail: user.constEmail,
                    password: user.password,
                    constUserType: user.constUserType,
                    constCnic: user.constCnic
                };
                const token = jwt.sign(payload, config.secret, {
                    expiresIn: 604800  //1 week
                });
                return res.json({
                    success: true,
                    token: 'bearer '+ token,
                    user: {
                        id: user._id,
                        constName: user.constName,
                        constUsername: user.constUsername,
                        constEmail : user.constEmail,
                        constUserType : user.constUserType,
                        constCnic: user.constCnic
                    }
                });
            } else {
                return res.json({success: false, msg: 'wrong password'});
            }
        });
    });
});

//Profile
router.get('/profile', passport.authenticate('jwt', {session:false}), (req, res, next) => {
    res.json({user: req.user});
  });

router.get('/get', (req, res, next) => {
    User.findOne(function(err, getData) {

        // if there is an error retrieving, send the error. 
                        // nothing after res.send(err) will execute
        if (err)
            res.send(err);
        else{
        res.json({ getData: getData }); 
    }
    });
});

router.get('/getall', (req, res, next) => {
    User.find(function(err, getData) {

        // if there is an error retrieving, send the error. 
                        // nothing after res.send(err) will execute
        if (err)
            res.send(err);
        else{
        res.json({ getData: getData }); 
    }
    });
});

router.get('/getuser/:constUsername', function (req, res, next) {
      
    User.findOne({ constUsername: req.params.constUsername })
    .populate('Challan')
    .exec ((err, user) => {
        if (err) {
            console.log("constUsername err", err)
            return res.status(500).send(err)
            // return err
        }
        if(user.constUsername !== req.params.constUsername){
            return res.status(404).send('constUsername invalid');
          }
          console.log("You are Successfully Searched: Welcome ", user.constUsername)
          console.log("User_id: ", user._id)
          console.log("User Password: ", user.password)
          console.log("You created account on: ", user.constUserType)
               return res.status(200).send(user);
  });
})

router.put('/update/:id', function (req, res, next) {
      
    User.findByIdAndUpdate( req.params.id, req.body, {new: true}, function (err, user) {
        console.log(user);
        if (err) return res.status(500).send("There was a problem updating the user.");
        res.status(200).send(user);
  });
});

router.delete('/delete/:id', function (req, res) {
    User.findby(req.params.id, function (err, user) {
        if (err) { 
        return res.status(500).send("There was a problem deleting the user.");
    } else {
        return res.status(200).send("User "+ user.constUsername +" was deleted.");
        res.json({ user: user });
    }
    });
});

module.exports = router;