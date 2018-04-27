const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const Challan = require('../models/challan');

//Register
router.post('/register', (req,res,next) =>{
let newChallan = new Challan({
      challanNo: req.body.challanNo,
      challanDateCreated: req.body.challanDateCreated,
      challanType: req.body.challanType,
      challanDatePaid: req.body.challanDatePaid,
      contactnum: req.body.contactnum,
      user: req.body.user
});
    Challan.create(newChallan, (err, challan)=>{
        if(err){
                res.json(
                    {
                    success: false, msg: 'failed to register challan'
                    });
                }
        else{
            res.json(
                {
                    success: true, msg: 'Challan Added'
                });
            }
    });
});


router.post('/new',(req,res) => {
    var challan = new Challan(req.body);
    Challan.create(function(err){
      // if (err) res.json({message: "Creating a user failed."});
      // res.json({user: user});
    });
  });


//Profile
router.get('/profile', passport.authenticate('jwt', {session:false}), (req, res, next) => {
    res.json({challan: req.challan});
  });

router.get('/getall', (req, res, next) => {
    Challan.find(function(err, getAppointmentData) {

        // if there is an error retrieving, send the error. 
                        // nothing after res.send(err) will execute
        if (err)
            res.send(err);
        else{
        res.json({ getAppointmentData: getAppointmentData }); 
    }
    });
});

router.get('/getchallan', function (req, res, next) {
      
    Challan.findOne({ name: req.query.name },function (err, challan) {
        if (err) {
            console.log("patient name err", err)
            return res.status(500).send(err)
            // return err
        }
        if(challan.name !== req.query.name){
            return res.status(404).send('username invalid');
          }
          console.log("You are Successfully Searched: Welcome ", challan.name)
          console.log("User_id: ", challan._id)
          console.log("Challan Password: ", challan.password)
          console.log("You created account on: ", challan.userType)
               return res.status(200).send(challan);
  });
})

router.put('/update/:id', function (req, res, next) {
      
    Challan.findByIdAndUpdate( req.params.id, req.body, {new: true}, function (err, challan) {
        if (err) return res.status(500).send("There was a problem updating the challan.");
        res.status(200).send(challan);
  });
});

router.delete('/delete/:id', function (req, res) {
    Challan.findByIdAndRemove(req.params.id, function (err, challan) {
        if (err) { 
        return res.status(500).send("There was a problem deleting the challan.");
    } else {
        return res.status(200).send("Challan "+ challan.drname +" was deleted.");
        res.json({ challan: challan });
    }
    });
});

module.exports = router;

